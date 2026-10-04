/* Carrusel de opiniones: swipe nativo + flechas + contador */
(function () {
  var tr = document.getElementById("op-track"), cnt = document.getElementById("op-cnt");
  if (!tr || !cnt) return;
  var items = tr.children, n = items.length;
  function cur() { var c = tr.scrollLeft + tr.clientWidth / 2, best = 0, d = 1e9; for (var i = 0; i < n; i++) { var it = items[i], m = it.offsetLeft + it.offsetWidth / 2, k = Math.abs(m - c); if (k < d) { d = k; best = i; } } return best; }
  var raf = null;
  tr.addEventListener("scroll", function () { if (raf) return; raf = requestAnimationFrame(function () { raf = null; cnt.textContent = (cur() + 1) + " / " + n; }); }, { passive: true });
  document.querySelectorAll(".op-arr").forEach(function (b) {
    b.addEventListener("click", function () {
      var i = Math.max(0, Math.min(n - 1, cur() + parseInt(b.getAttribute("data-d"), 10))), it = items[i];
      tr.scrollTo({ left: it.offsetLeft - (tr.clientWidth - it.offsetWidth) / 2, behavior: "smooth" });
    });
  });
})();
