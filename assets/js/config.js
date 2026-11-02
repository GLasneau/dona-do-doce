/**
 * Configuração central da Dona do Doce.
 * TODOS os dados da loja ficam aqui: links, WhatsApp, endereço, avaliação e mensagens.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else {
    root.DD = root.DD || {};
    root.DD.config = api;
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  // Vazio = o botão "Nosso Delivery" cai no WhatsApp.
  var YOOGA_URL = "https://delivery.yooga.app/dona-do-doce/tabs/home";
  var DELIVERYON_URL = "https://web.deliveryon.com.br/cardapio/donadodoce";
  var WHATSAPP_NUMBER = "5524999243025";
  var INSTAGRAM_URL = "https://www.instagram.com/adonadodoce_/";
  var INSTAGRAM_HANDLE = "@adonadodoce_";
  var STORE_TIMEZONE = "America/Sao_Paulo";

  var ADDRESS = {
    street: "Rua Dr. Morais Barbosa, 138",
    district: "Centro",
    city: "Barra do Piraí",
    state: "RJ",
  };
  var ADDRESS_ONE_LINE =
    ADDRESS.street + " - " + ADDRESS.district + ", " + ADDRESS.city + " - " + ADDRESS.state;

  return {
    YOOGA_URL: YOOGA_URL,
    DELIVERYON_URL: DELIVERYON_URL,
    WHATSAPP_NUMBER: WHATSAPP_NUMBER,
    INSTAGRAM_URL: INSTAGRAM_URL,
    INSTAGRAM_HANDLE: INSTAGRAM_HANDLE,
    STORE_TIMEZONE: STORE_TIMEZONE,
    ADDRESS: ADDRESS,
    ADDRESS_ONE_LINE: ADDRESS_ONE_LINE,
    MAPS_EMBED_URL:
      "https://www.google.com/maps?q=" + encodeURIComponent(ADDRESS_ONE_LINE) + "&output=embed",
    MAPS_DIRECTIONS_URL:
      "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(ADDRESS_ONE_LINE),
    RATING: { score: "4,9", count: 436, source: "DeliveryOn" },
    WHATSAPP_MESSAGES: {
      duvida: "Olá! Gostaria de tirar uma dúvida sobre o cardápio.",
      encomenda: "Olá! Gostaria de fazer uma encomenda personalizada.",
      contato: "Olá, Dona do Doce! Vim pelo site e gostaria de falar com vocês.",
    },
  };
});
