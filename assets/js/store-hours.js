/**
 * Horário de funcionamento + getStoreStatus(date), uma função pura.
 * Roda no navegador (window.DD.storeHours) e no Node (testes).
 */
(function (root, factory) {
  var isNode = typeof module === "object" && module.exports;
  var config = isNode ? require("./config.js") : root.DD.config;
  var api = factory(config);
  if (isNode) module.exports = api;
  else root.DD.storeHours = api;
})(typeof self !== "undefined" ? self : this, function (config) {
  "use strict";

  // 0 = domingo ... 6 = sábado. null = fechado o dia todo.
  var WEEKLY_HOURS = {
    0: null,
    1: { open: "10:30", close: "19:00" },
    2: { open: "10:30", close: "19:00" },
    3: { open: "10:30", close: "19:00" },
    4: { open: "10:30", close: "19:00" },
    5: { open: "10:30", close: "19:00" },
    6: { open: "10:30", close: "17:00" },
  };

  var DAY_NAMES = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
  var WEEKDAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  var formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: config.STORE_TIMEZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  function toMinutes(hhmm) {
    var parts = hhmm.split(":");
    return Number(parts[0]) * 60 + Number(parts[1]);
  }

  /** "10:30" → "10h30" · "19:00" → "19h" */
  function formatHour(hhmm) {
    var parts = hhmm.split(":");
    return Number(parts[0]) + "h" + (parts[1] === "00" ? "" : parts[1]);
  }

  function zonedNow(date) {
    var parts = {};
    formatter.formatToParts(date).forEach(function (p) {
      parts[p.type] = p.value;
    });
    return {
      day: WEEKDAY_INDEX[parts.weekday],
      minutes: Number(parts.hour) * 60 + Number(parts.minute),
    };
  }

  function getStoreStatus(date) {
    var now = zonedNow(date);
    var today = WEEKLY_HOURS[now.day];

    if (today) {
      var open = toMinutes(today.open);
      var close = toMinutes(today.close);
      if (now.minutes >= open && now.minutes < close) {
        return { isOpen: true, label: "Aberto agora", detail: "Fecha às " + formatHour(today.close) };
      }
      if (now.minutes < open) {
        return { isOpen: false, label: "Fechado", detail: "Abre hoje às " + formatHour(today.open) };
      }
    }

    for (var offset = 1; offset <= 7; offset++) {
      var day = (now.day + offset) % 7;
      var hours = WEEKLY_HOURS[day];
      if (hours) {
        var when = offset === 1 ? "amanhã" : DAY_NAMES[day];
        return { isOpen: false, label: "Fechado", detail: "Abre " + when + " às " + formatHour(hours.open) };
      }
    }

    return { isOpen: false, label: "Fechado", detail: "" };
  }

  return {
    WEEKLY_HOURS: WEEKLY_HOURS,
    formatHour: formatHour,
    getStoreStatus: getStoreStatus,
  };
});
