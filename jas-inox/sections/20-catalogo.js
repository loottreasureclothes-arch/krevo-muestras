/* 20-catalogo: filtro por categoria y "Cotizar" que preselecciona el tipo en el cotizador. */
(function () {
  "use strict";
  function init() {
    var grid = document.getElementById("cat-grid");
    if (!grid) return;
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".card"));
    var tags = Array.prototype.slice.call(document.querySelectorAll(".cat-tags .tag"));
    var live = document.getElementById("cat-live");
    tags.forEach(function (b) {
      b.addEventListener("click", function () {
        var f = b.getAttribute("data-f"), n = 0;
        tags.forEach(function (t) { t.setAttribute("aria-pressed", t === b ? "true" : "false"); });
        cards.forEach(function (c) {
          var ok = f === "all" || c.getAttribute("data-cat") === f;
          c.hidden = !ok;
          if (ok) { n++; c.classList.add("is-in"); }
        });
        if (live) live.textContent = n + (n === 1 ? " pieza" : " piezas") + " en " + b.textContent.trim();
      });
    });
    var sec = document.getElementById("catalogo") || grid;
    sec.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a[data-tipo]") : null;
      if (!a) return;
      if (window.JasCotiza) window.JasCotiza.setTipo(a.getAttribute("data-tipo"), a.getAttribute("data-otro") || "");
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
