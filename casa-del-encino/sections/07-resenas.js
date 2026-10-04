/* Carrusel de reseñas: flechas, contador y swipe nativo */
(function () {
  var t = document.getElementById("res-track"); if (!t) return;
  var items = t.children, iEl = document.getElementById("rc-i");
  function idx() { var x = t.scrollLeft, best = 0, d = 1e9; for (var i = 0; i < items.length; i++) { var dd = Math.abs(items[i].offsetLeft - items[0].offsetLeft - x); if (dd < d) { d = dd; best = i; } } return best; }
  function go(n) { n = Math.max(0, Math.min(items.length - 1, n)); t.scrollTo({ left: items[n].offsetLeft - items[0].offsetLeft, behavior: "smooth" }); }
  document.getElementById("rc-prev").addEventListener("click", function () { go(idx() - 1); });
  document.getElementById("rc-next").addEventListener("click", function () { go(idx() + 1); });
  var raf = 0;
  t.addEventListener("scroll", function () { if (raf) return; raf = requestAnimationFrame(function () { raf = 0; var n = idx() + 1; iEl.textContent = (n < 10 ? "0" : "") + n; }); }, { passive: true });
})();
