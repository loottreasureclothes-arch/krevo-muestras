/* 01 hero: video de IA opcional (data-src-m / data-src-d) y cuadritos que abren la hoja de fotos reales */
(function () {
  "use strict";
  var hero = document.getElementById("hero");
  if (!hero) return;
  var H = function (n) { return { src: "img/hd/" + n + "-1200.webp", srcset: "img/hd/" + n + "-1200.webp 1200w, img/hd/" + n + "-2400.webp 2400w" }; };
  function F(n, alt, cap) { var o = H(n); o.alt = alt; o.cap = cap; return o; }
  var DATA = {
    fachada: { t: "Letras 3D", d: "En acrílico, aluminio o latón. Logos 3D para interior y fachada.", tipo: "Letras 3D",
      fotos: [F("ip07", "Letras 3D verdes de ad ambientes", "ad ambientes · letras 3D"), F("ip18", "Letras doradas de Barbería Tres46", "Barbería Tres46 · letras doradas"), F("ip10", "Logo 3D metálico de Kapital Bank sobre muro de madera", "Kapital Bank · logo 3D")] },
    micro: { t: "Vinil microperforado", d: "Tu marca en los cristales y la fachada, impresa e instalada.", tipo: "Microperforado",
      fotos: [F("ip33", "Instalación de microperforado en Burdo, Rosa y Santino", "Burdo, Rosa, Santino · instalación"), F("ip05", "Fachada de TractoZone con vinil microperforado", "Grupo TractoZone · terminado"), F("ip34c", "Fachada de Kapital Bank con vinil impreso", "Kapital Bank · fachada")] },
    lona: { t: "Lonas", d: "Lona 13 oz, desde tamaños pequeños para un cumpleaños hasta lonas gigantes para espectacular y edificios.", tipo: "Lona",
      fotos: [F("ip26", "Espectacular de Rancho Santa Mónica", "Rancho Santa Mónica · espectacular"), F("ip25", "Espectacular unipolar en carretera", "Espectacular unipolar")] },
    rotula: { t: "Rotulación", d: "Vehículos, refrigeradores y cortinas con tu marca.", tipo: "Rotulación de vehículo",
      fotos: [F("ip23", "Camioneta rotulada de Hacienda San Marcos", "Hacienda San Marcos · camioneta"), F("ip24", "Refrigerador comercial rotulado", "Refrigerador rotulado")] },
    luminoso: { t: "Anuncios luminosos", d: "Cajas de luz y letreros que se ven de noche.", tipo: "Anuncio luminoso / caja de luz",
      fotos: [F("ip08", "Caja de luz de Comex", "Comex · caja de luz"), F("ip06", "Letrero luminoso de iPrint encendido de noche", "Nuestro letrero, de noche")] }
  };
  Array.prototype.forEach.call(hero.querySelectorAll("[data-sheet]"), function (b) {
    b.addEventListener("click", function () {
      var d = DATA[b.getAttribute("data-sheet")];
      if (!d || !window.IP || !IP.sheet) return;
      IP.sheet({ t: d.t, d: d.d, fotos: d.fotos, cta: { txt: "Cotizar " + d.t.toLowerCase(), tipo: d.tipo } });
    });
  });

  /* video: solo si el orquestador ya puso las rutas */
  var v = hero.querySelector(".s-hero-video");
  if (!v) return;
  var wide = matchMedia("(min-aspect-ratio: 1/1)").matches;
  var src = v.getAttribute(wide ? "data-src-d" : "data-src-m");
  var c = navigator.connection;
  if (!src || (window.IP && IP.reduce) || (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || "")))) return;
  if (wide && v.getAttribute("data-poster-d")) v.poster = v.getAttribute("data-poster-d");
  function off() { v.pause(); v.removeAttribute("src"); v.hidden = true; hero.classList.remove("has-video"); }
  v.addEventListener("error", off, { once: true });
  v.addEventListener("playing", function () { hero.classList.add("has-video"); }, { once: true });
  v.src = src; v.hidden = false; v.preload = "auto";
  var p = v.play();
  if (p && p.catch) p.catch(off);
  if ("IntersectionObserver" in window) new IntersectionObserver(function (es) {
    if (!v.src) return;
    if (es[0].isIntersecting) { var q = v.play(); if (q && q.catch) q.catch(function () {}); } else v.pause();
  }).observe(hero);
})();
