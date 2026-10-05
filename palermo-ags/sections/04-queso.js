/* Momento firma: la rebanada se abre de punta a charola con el scroll. Reversible; el CSS base ya es el final. */
(function () {
  "use strict";
  var ph = document.getElementById("pl-queso-ph");
  if (!ph || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
  var raf = null;
  function ease(t) { return t * t * (3 - 2 * t); }
  function update() {
    raf = null;
    var r = ph.getBoundingClientRect(), vh = window.innerHeight;
    var t = (vh * 0.98 - r.top) / (vh * 0.5);
    t = Math.max(0, Math.min(1, t));
    ph.style.setProperty("--p", ease(t).toFixed(3));
  }
  function sched() { if (!raf) raf = requestAnimationFrame(update); }
  window.addEventListener("scroll", sched, { passive: true });
  window.addEventListener("resize", sched);
  update();
})();
