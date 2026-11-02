(function () {
  "use strict";

  var C = window.DD.config;
  var getStoreStatus = window.DD.storeHours.getStoreStatus;
  var CATEGORIES = window.DD.menu.CATEGORIES;
  var formatPrice = window.DD.menu.formatPrice;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Ícones (lucide + WhatsApp oficial + cupcake da marca) ---------- */
  var LUCIDE = {
    "shopping-bag": '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    "arrow-down": '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
    "arrow-up-right": '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    "party-popper": '<path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98-.7.1-1.22.72-1.22 1.43V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
    sparkles: '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>',
    "map-pin": '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    navigation: '<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
    bike: '<circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/>',
    store: '<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2 2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/>',
    instagram: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
  };

  var WHATSAPP_PATH =
    "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z";

  var CUPCAKE =
    '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M14 7l3 3 3-4 3 4 3-3-1 6H15z" fill="currentColor"/>' +
    '<path d="M10 20c0-4 4-7 10-7s10 3 10 7c0 1.5-1.2 2.5-2.6 2.5H12.6C11.2 22.5 10 21.5 10 20Z"/>' +
    '<path d="M12 22.5 15 34h10l3-11.5"/>' +
    '<path d="M17 23l1 11M23 23l-1 11M20 23v11"/></svg>';

  function icon(name) {
    if (name === "cupcake") return CUPCAKE;
    if (name === "whatsapp") {
      return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="' + WHATSAPP_PATH + '"/></svg>';
    }
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      LUCIDE[name] + "</svg>"
    );
  }

  function hydrateIcons(scope) {
    scope.querySelectorAll("[data-icon]").forEach(function (el) {
      el.innerHTML = icon(el.dataset.icon);
      el.removeAttribute("data-icon");
    });
  }

  /* ---------- Helpers ---------- */
  function whatsappUrl(message) {
    return "https://wa.me/" + C.WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  /* ---------- Dados da config no HTML ---------- */
  var BINDINGS = {
    "rating-score": C.RATING.score,
    "rating-count": String(C.RATING.count),
    "rating-source": C.RATING.source,
    "instagram-handle": C.INSTAGRAM_HANDLE,
  };
  document.querySelectorAll("[data-bind]").forEach(function (el) {
    el.textContent = BINDINGS[el.dataset.bind];
  });

  document.querySelectorAll("[data-wa]").forEach(function (el) {
    el.href = whatsappUrl(C.WHATSAPP_MESSAGES[el.dataset.wa]);
  });

  var LINKS = {
    directions: C.MAPS_DIRECTIONS_URL,
    instagram: C.INSTAGRAM_URL,
    yooga: C.YOOGA_URL || whatsappUrl(C.WHATSAPP_MESSAGES.duvida),
    deliveryon: C.DELIVERYON_URL,
  };
  document.querySelectorAll("[data-link]").forEach(function (el) {
    el.href = LINKS[el.dataset.link];
  });

  var map = document.querySelector("[data-map]");
  if (map) map.src = C.MAPS_EMBED_URL;

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Fotos ausentes → placeholder elegante ---------- */
  function markMissing(img) {
    var media = img.closest(".media");
    if (media) media.classList.add("is-missing");
  }
  document.addEventListener("error", function (e) {
    if (e.target.tagName === "IMG") markMissing(e.target);
  }, true);
  document.querySelectorAll(".media img").forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) markMissing(img);
  });

  /* ---------- Header ---------- */
  var header = document.querySelector("[data-header]");
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu móvel ---------- */
  var menuToggle = document.querySelector("[data-menu-toggle]");
  var mobileMenu = document.getElementById("menu-mobile");

  function setMenu(open) {
    mobileMenu.hidden = !open;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    header.classList.toggle("is-menu-open", open);
  }

  menuToggle.addEventListener("click", function () {
    setMenu(mobileMenu.hidden);
  });
  mobileMenu.addEventListener("click", function (e) {
    if (e.target.closest("a, button")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !mobileMenu.hidden) {
      setMenu(false);
      menuToggle.focus();
    }
  });
  document.addEventListener("click", function (e) {
    if (!mobileMenu.hidden && !header.contains(e.target)) setMenu(false);
  });
  window.matchMedia("(min-width: 1024px)").addEventListener("change", function (e) {
    if (e.matches) setMenu(false);
  });

  /* ---------- Entrada suave das seções ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Status Aberto/Fechado (só no cliente, na virada de cada minuto) ---------- */
  var pills = document.querySelectorAll("[data-status]");
  var lastStatus = "";
  function renderStatus() {
    var s = getStoreStatus(new Date());
    var key = s.label + "|" + s.detail;
    if (key === lastStatus) return; // não repete o anúncio do leitor de tela à toa
    lastStatus = key;
    pills.forEach(function (pill) {
      pill.classList.toggle("is-open", s.isOpen);
      pill.querySelector(".status__dot").classList.toggle("animate-pulse-dot", s.isOpen);
      pill.querySelector(".status__label").textContent = s.label;
      pill.querySelector(".status__detail").textContent = s.detail ? "· " + s.detail : "";
      pill.classList.add("is-ready");
    });
  }
  function scheduleStatus() {
    renderStatus();
    var now = new Date();
    setTimeout(scheduleStatus, 60000 - (now.getSeconds() * 1000 + now.getMilliseconds()) + 50);
  }
  scheduleStatus();
  // celular congela timers em segundo plano: atualiza ao voltar para a aba
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) renderStatus();
  });

  /* ---------- Marquee (lista duplicada para o loop sem emenda) ---------- */
  var MARQUEE_ITEMS = [
    "Brownie Kinder",
    "Cheesecake de Doce de Leite",
    "Torta Alemã",
    "Copo da Felicidade",
    "Torta Cookie com Nutella",
    "Baguete Dona do Doce",
    "Torta de Limão",
  ];
  var marquee = document.querySelector("[data-marquee]");
  var marqueeHtml = MARQUEE_ITEMS.map(function (item) {
    return '<span class="marquee__item">' + item + '<span class="marquee__flower">✿</span></span>';
  }).join("");
  marquee.innerHTML = marqueeHtml + marqueeHtml;

  /* ---------- Cardápio ---------- */
  var tablist = document.querySelector("[data-tabs]");
  var panel = document.querySelector("[data-panel]");

  tablist.innerHTML = CATEGORIES.map(function (c, i) {
    return (
      '<button type="button" class="tab" role="tab" id="tab-' + c.id + '" data-category="' + c.id + '"' +
      ' aria-controls="cardapio-painel" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' +
      c.label + '<span class="tab__count">' + c.products.length + "</span></button>"
    );
  }).join("");
  var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));

  function productCard(p, index) {
    var price = formatPrice(p.price);
    return (
      '<button type="button" class="card tilt-card animate-rise" style="animation-delay:' + index * 60 + 'ms"' +
      ' data-order="' + escapeHtml(p.name) + '" aria-label="' + escapeHtml(p.name + ", " + price + ". Pedir") + '">' +
      '<span class="card__media media">' +
      '<img src="' + p.image + '" alt="" width="640" height="640" loading="lazy" decoding="async">' +
      (p.badge ? '<span class="card__badge eyebrow">' + escapeHtml(p.badge) + "</span>" : "") +
      "</span>" +
      '<span class="card__body">' +
      '<span class="card__name">' + escapeHtml(p.name) + "</span>" +
      (p.description ? '<span class="card__desc">' + escapeHtml(p.description) + "</span>" : "") +
      '<span class="card__foot"><span class="card__price">' + price + "</span>" +
      '<span class="card__plus"><span class="i" data-icon="plus"></span></span></span>' +
      "</span></button>"
    );
  }

  function attachTilt(card) {
    card.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty("--ry", x * 10 + "deg");
      card.style.setProperty("--rx", -y * 10 + "deg");
      card.style.setProperty("--ty", "-6px");
    });
    card.addEventListener("pointerleave", function () {
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ty", "0px");
    });
  }

  function selectCategory(tab, focus) {
    tabs.forEach(function (t) {
      var active = t === tab;
      t.setAttribute("aria-selected", String(active));
      t.tabIndex = active ? 0 : -1;
    });
    var category = CATEGORIES.filter(function (c) { return c.id === tab.dataset.category; })[0];
    panel.setAttribute("aria-labelledby", tab.id);
    panel.innerHTML = category.products.map(productCard).join("");
    hydrateIcons(panel);
    if (!reducedMotion) panel.querySelectorAll(".tilt-card").forEach(attachTilt);
    if (focus) tab.focus();
    tab.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reducedMotion ? "auto" : "smooth" });
  }

  tablist.addEventListener("click", function (e) {
    var tab = e.target.closest('[role="tab"]');
    if (tab) selectCategory(tab, false);
  });

  tablist.addEventListener("keydown", function (e) {
    var index = tabs.indexOf(document.activeElement);
    if (index < 0) return;
    var next = null;
    if (e.key === "ArrowRight") next = tabs[(index + 1) % tabs.length];
    else if (e.key === "ArrowLeft") next = tabs[(index - 1 + tabs.length) % tabs.length];
    else if (e.key === "Home") next = tabs[0];
    else if (e.key === "End") next = tabs[tabs.length - 1];
    if (next) {
      e.preventDefault();
      selectCategory(next, true);
    }
  });

  // Primeira renderização sem rolar a página até as abas
  (function () {
    var first = tabs[0];
    var category = CATEGORIES[0];
    panel.setAttribute("aria-labelledby", first.id);
    panel.innerHTML = category.products.map(productCard).join("");
    if (!reducedMotion) panel.querySelectorAll(".tilt-card").forEach(attachTilt);
  })();

  /* ---------- Modal de pedido ---------- */
  var dialog = document.getElementById("order-dialog");
  var orderDesc = document.getElementById("order-desc");
  var yoogaLink = dialog.querySelector('[data-channel="yooga"]');
  var deliveryOnLink = dialog.querySelector('[data-channel="deliveryon"]');
  var doubtLink = dialog.querySelector('[data-channel="whatsapp"]');

  var orderTrigger = null;

  function openOrder(productName, trigger) {
    setOrderLinks(productName);
    // Navegador sem <dialog> (iOS < 15.4): vai direto para o delivery
    if (typeof dialog.showModal !== "function") {
      window.open(yoogaLink.href, "_blank", "noopener");
      return;
    }
    orderTrigger = trigger || null;
    if (!dialog.open) dialog.showModal();
  }

  // Ao fechar, devolve o foco a algo visível (o botão do menu móvel some junto com o menu)
  dialog.addEventListener("close", function () {
    if (orderTrigger && orderTrigger.closest("[hidden]")) menuToggle.focus();
    orderTrigger = null;
  });

  function setOrderLinks(productName) {
    if (productName) {
      orderDesc.innerHTML =
        "Você escolheu <strong>" + escapeHtml(productName) + "</strong>. Escolha o canal e finalize por lá.";
    } else {
      orderDesc.textContent = "Escolha o canal de delivery e finalize seu pedido por lá.";
    }

    yoogaLink.href =
      C.YOOGA_URL ||
      whatsappUrl(productName ? "Olá! Gostaria de fazer um pedido: " + productName + "." : "Olá! Gostaria de fazer um pedido.");
    deliveryOnLink.href = C.DELIVERYON_URL;
    doubtLink.href = whatsappUrl(
      productName ? "Olá! Gostaria de tirar uma dúvida sobre o " + productName + "." : C.WHATSAPP_MESSAGES.duvida
    );
  }
  setOrderLinks();

  document.addEventListener("click", function (e) {
    var trigger = e.target.closest("[data-order]");
    if (!trigger) return;
    e.preventDefault();
    openOrder(trigger.dataset.order || undefined, trigger);
  });

  dialog.addEventListener("click", function (e) {
    var r = dialog.getBoundingClientRect();
    var onBackdrop =
      e.target === dialog &&
      (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom);
    if (onBackdrop || e.target.closest("[data-close]") || e.target.closest("[data-channel]")) {
      dialog.close();
    }
  });

  /* ---------- Recibo impresso uma única vez ---------- */
  var printer = document.querySelector("[data-printer]");
  var paper = printer.querySelector(".receipt-print");

  document.querySelector("[data-receipt-date]").textContent = new Intl.DateTimeFormat("pt-BR", {
    timeZone: C.STORE_TIMEZONE,
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());

  function printReceipt() {
    paper.dataset.printed = "true";
    printer.classList.add("is-printed");
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      if (entries.some(function (entry) { return entry.isIntersecting; })) {
        printReceipt();
        io.disconnect();
      }
    }, { threshold: 0.05 });
    io.observe(printer);
  } else {
    printReceipt();
  }

  hydrateIcons(document);
})();
