/** Cardápio: categorias, produtos, preços e imagens. */
(function (root) {
  "use strict";

  var IMG = "assets/img/";

  var CATEGORIES = [
    {
      id: "brownieria",
      label: "Brownieria",
      products: [
        { name: "Brownie Kinder", description: "Creme de Ninho, Nutella e Kinder.", price: 15.9, image: "brownie-kinder", badge: "Queridinho" },
        { name: "Brownie Ninho/Nut e Morango", description: "Brownie quadradinho com cobertura de Ninho, Nutella e morango.", price: 15.9, image: "hero-brownie" },
        { name: "Brownie Ferrero", description: "Brownie quadradinho com cobertura de brigadeiro, Nutella e Ferrero.", price: 15.9, image: "brownie-ferrero" },
        { name: "Brownie M&M", description: "Brownie quadradinho com cobertura de brigadeiro e M&M.", price: 14.9, image: "brownie-mm" },
        { name: "Brownie Duo", description: "Cobertura metade brigadeiro de chocolate e metade Ninho.", price: 14.9, image: "brownie-kinder" },
        { name: "Brownie de Doce de Leite", description: "Brownie quadradinho coberto com doce de leite cremoso.", price: 13.9, image: "brownie-doce-de-leite" },
      ],
    },
    {
      id: "tortas",
      label: "Tortas",
      products: [
        { name: "Cheesecake de Doce de Leite", description: "Cheesecake irresistível com base crocante e cremosa, coberta com doce de leite.", price: 18.9, image: "cheesecake-doce-de-leite", badge: "Destaque" },
        { name: "Torta Alemã", description: "Base de biscoitos tipo maisena, creme leve e cobertura de chocolate.", price: 18.9, image: "torta-alema" },
        { name: "Torta de Limão", description: "Uma fatia da nossa deliciosa torta com base de biscoito e mousse de limão.", price: 17.0, image: "torta-limao" },
        { name: "Torta Cookie com Nutella", description: "Base de cookie perfeitamente assada, recheada com Nutella.", price: 16.5, image: "torta-cookie" },
      ],
    },
    {
      id: "sanduiches",
      label: "Sanduíches",
      products: [
        { name: "Baguete Dona do Doce", description: "Baguete com fraldinha desfiada, molho da casa, queijo muçarela, catupiry e geleia de pimenta.", price: 30.0, image: "baguete-dona-do-doce", badge: "Da casa" },
        { name: "Baguete Tatas", description: "Baguete com fraldinha desfiada, molho da casa, queijo muçarela, alface, tomate e cebola roxa.", price: 28.0, image: "baguete-tatas" },
        { name: "Sanduíche de Frango", description: "Pão de forma levemente tostado, frango desfiado e queijo.", price: 22.0, image: "sanduiche-frango" },
        { name: "Sanduíche de Lombo e Queijo Branco", description: "Fatias de pão de forma cuidadosamente tostadas, lombo e queijo branco.", price: 20.0, image: "sanduiche-lombo" },
      ],
    },
    {
      id: "sobremesas",
      label: "Sobremesas",
      products: [
        { name: "Copo da Felicidade Ferrero", description: "Chantilly, brownie, brigadeiro, amendoim, Nutella e chocolate.", price: 27.9, image: "copo-ferrero", badge: "Mais pedido" },
        { name: "Copo da Felicidade Morango", description: "Chantilly, brownie, brigadeiro tradicional, morango e creme de Ninho.", price: 25.5, image: "copo-morango" },
        { name: "Copo da Felicidade Oreo", description: "Chantilly, brownie, brigadeiro tradicional, creme de Ninho e biscoito Oreo.", price: 25.5, image: "copo-oreo" },
      ],
    },
    {
      id: "bebidas",
      label: "Bebidas",
      products: [
        { name: "Coca-Cola Lata 350ml", price: 7.0, image: "coca-cola" },
        { name: "Coca-Cola Zero Lata 350ml", price: 7.0, image: "coca-zero" },
        { name: "Água com Gás", price: 5.0, image: "agua-com-gas" },
        { name: "Água sem Gás", price: 5.0, image: "agua-sem-gas" },
      ],
    },
  ];

  CATEGORIES.forEach(function (c) {
    c.products.forEach(function (p) {
      p.image = IMG + p.image + ".webp";
    });
  });

  function formatPrice(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  root.DD = root.DD || {};
  root.DD.menu = { CATEGORIES: CATEGORIES, formatPrice: formatPrice };
})(self);
