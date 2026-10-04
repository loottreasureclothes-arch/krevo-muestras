/* Riel de comandas: flechas + contador */
(function () {
  "use strict";
  var r = document.getElementById("op-rail"), c = document.getElementById("op-c");
  if (!r) return;
  var it = r.children, n = it.length;
  function idx() { var x = r.scrollLeft, b = 0, d = 1e9; for (var i = 0; i < n; i++) { var v = Math.abs(it[i].offsetLeft - r.offsetLeft - x - parseFloat(getComputedStyle(r).paddingLeft)); if (v < d) { d = v; b = i; } } return b; }
  function pad(v) { return (v < 10 ? "0" : "") + v; }
  function upd() { if (c) c.textContent = pad(idx() + 1) + " / " + pad(n); }
  document.querySelectorAll(".op-b").forEach(function (b) {
    b.addEventListener("click", function () {
      var i = Math.max(0, Math.min(n - 1, idx() + (+b.dataset.d)));
      r.scrollTo({ left: it[i].offsetLeft - it[0].offsetLeft, behavior: (window.RAME && window.RAME.reduce) ? "auto" : "smooth" });
    });
  });
  var q = null; r.addEventListener("scroll", function () { if (!q) q = requestAnimationFrame(function () { q = null; upd(); }); }, { passive: true });
})();
