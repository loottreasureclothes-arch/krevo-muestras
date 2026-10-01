/* 20 · Cartelera: sello "YA SE PRESENTÓ" calculado con la fecha real del visitante, link "Apartar" solo
   si la función sigue vigente, indicador "1 / 8" en celular y flechas del riel en compu (swipe nativo). */
(function () {
  "use strict";
  var WD = { 0: "dom", 3: "mie", 4: "jue", 5: "vie", 6: "sab" };
  function pad(n) { return ("0" + n).slice(-2); }
  function hoy() { var d = new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function sellos() {
    var t = hoy();
    Array.prototype.forEach.call(document.querySelectorAll(".ep-card[data-fechas]"), function (card) {
      var fechas = card.getAttribute("data-fechas").split(","), vigentes = fechas.filter(function (f) { return f >= t; });
      var pasada = !vigentes.length;
      card.classList.toggle("is-pasada", pasada);
      var sello = card.querySelector(".ep-pasada"); if (sello) sello.hidden = !pasada;
      /* fechas que ya pasaron: tachadas (el sello "Ya se presentó" va junto a ellas, fuera del arte del poster) */
      Array.prototype.forEach.call(card.querySelectorAll(".ep-card-fechas .ep-sello"), function (s, i) { s.classList.toggle("is-pasado", !!(fechas[i] && fechas[i] < t)); });
      var a = card.querySelector(".ep-apartar");
      if (!a) return;
      a.hidden = pasada;
      if (!pasada) {
        var p = vigentes[0].split("-"), wd = new Date(+p[0], +p[1] - 1, +p[2]).getDay();
        if (WD[wd]) { a.setAttribute("data-ep-dia", WD[wd]); a.setAttribute("data-ep-iso", vigentes[0]); }
      }
    });
  }
  function run() {
    sellos();
    var rail = document.getElementById("ep-cart-rail");
    if (!rail) return;
    var cards = rail.querySelectorAll(".ep-card");
    function paso() { var c = cards[0]; return c ? c.getBoundingClientRect().width + parseFloat(getComputedStyle(rail).columnGap || 22) : 340; }
    Array.prototype.forEach.call(document.querySelectorAll(".ep-ctl"), function (b) {
      b.addEventListener("click", function () {
        var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        rail.scrollBy({ left: paso() * parseInt(b.getAttribute("data-dir"), 10), behavior: reduce ? "auto" : "smooth" });
      });
    });
    var num = document.getElementById("ep-cart-i"), raf = null;
    function pos() {
      raf = null;
      if (!num) return;
      var max = rail.scrollWidth - rail.clientWidth;
      var i = rail.scrollLeft >= max - 4 ? cards.length : Math.round(rail.scrollLeft / paso()) + 1;
      num.textContent = Math.min(cards.length, Math.max(1, i));
    }
    rail.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(pos); }, { passive: true });
    pos();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
