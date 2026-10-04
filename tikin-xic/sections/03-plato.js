/* momento firma: abre/cierra el plato segun este en pantalla (reversible) */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var el = document.getElementById("plato"); if (!el || reduce) return;
  var raf = null;
  function up() {
    raf = null;
    var r = el.getBoundingClientRect(), vh = window.innerHeight;
    var vis = Math.min(r.bottom, vh) - Math.max(r.top, 0);
    var on = vis > Math.min(r.height, vh) * 0.45;
    if (on) el.classList.add("is-in"); else if (vis < Math.min(r.height, vh) * 0.15) el.classList.remove("is-in");
  }
  function sch() { if (!raf) raf = requestAnimationFrame(up); }
  window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch); sch();
})();
