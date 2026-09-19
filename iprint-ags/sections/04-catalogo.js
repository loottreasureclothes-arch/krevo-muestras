/* 04 catálogo: filtros, flechas + contador del carril, "Cotizar esto" preselecciona el cotizador */
(function () {
  "use strict";
  var sec = document.getElementById("catalogo");
  if (!sec) return;
  var rail = sec.querySelector(".s-cat-rail"), items = sec.querySelectorAll(".s-cat-item"), count = sec.querySelector(".s-cat-count");
  var chips = sec.querySelectorAll(".s-cat-chips button");
  function vis() { return Array.prototype.filter.call(items, function (i) { return !i.hidden; }); }
  function upd() {
    var v = vis(); if (!v.length || !count) return;
    var x = rail.scrollLeft, n = 0;
    v.forEach(function (it, i) { if (it.offsetLeft - 20 <= x + 1) n = i; });
    if (rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4) n = v.length - 1;
    count.textContent = (n + 1) + " / " + v.length;
  }
  function filter(f) {
    Array.prototype.forEach.call(chips, function (c) { c.setAttribute("aria-pressed", c.getAttribute("data-f") === f ? "true" : "false"); });
    Array.prototype.forEach.call(items, function (it) { it.hidden = f !== "all" && (" " + it.getAttribute("data-cat") + " ").indexOf(" " + f + " ") < 0; });
    rail.scrollLeft = 0; upd();
  }
  Array.prototype.forEach.call(chips, function (c) { c.addEventListener("click", function () { filter(c.getAttribute("data-f")); }); });
  document.addEventListener("ip:catfilter", function (e) { filter(e.detail.f); });
  rail.addEventListener("scroll", function () { requestAnimationFrame(upd); }, { passive: true });
  Array.prototype.forEach.call(sec.querySelectorAll(".s-cat-nav button"), function (b) {
    b.addEventListener("click", function () {
      var v = vis(); if (!v.length) return;
      var w = v[0].getBoundingClientRect().width + 14;
      rail.scrollBy({ left: w * parseInt(b.getAttribute("data-dir"), 10), behavior: IP.reduce ? "auto" : "smooth" });
    });
  });
  Array.prototype.forEach.call(sec.querySelectorAll(".s-cat-go"), function (b) {
    b.addEventListener("click", function () { IP.cotizar(b.getAttribute("data-tipo")); });
  });
  upd();
})();
