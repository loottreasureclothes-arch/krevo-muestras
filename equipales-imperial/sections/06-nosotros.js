/* 06 DESDE 1915: la línea del tiempo se dibuja con el scroll (reversible). Sin JS o con movimiento reducido
   la línea ya está completa y todos los años en color: nada se queda en blanco. */
(function () {
  "use strict";
  var t = document.querySelector("#nosotros .s-nos-time");
  if (!t || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var items = Array.prototype.slice.call(t.querySelectorAll(".s-nos-line > li")), q = false;
  t.classList.add("s-nos-js");
  function upd() {
    q = false;
    var r = t.getBoundingClientRect(), vh = window.innerHeight || 800;
    var p = (vh * 0.8 - r.top) / r.height; p = Math.max(0, Math.min(1, p));
    t.style.setProperty("--p", (p * 100).toFixed(1));
    items.forEach(function (li) { li.classList.toggle("is-on", p >= (li.offsetTop + 22) / r.height); });
  }
  function on() { if (!q) { q = true; requestAnimationFrame(upd); } }
  window.addEventListener("scroll", on, { passive: true });
  window.addEventListener("resize", on);
  upd(); setTimeout(upd, 400);
})();
