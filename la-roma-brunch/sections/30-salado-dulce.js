/* 30-salado-dulce: la foto de RO sube y la de MA baja dentro de su letra (reversible, rAF, sin pin) */
(function () {
  "use strict";
  var sec = document.getElementById("salado");
  var iro = document.getElementById("rm-i-ro"), ima = document.getElementById("rm-i-ma");
  if (!sec || !iro || !ima) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var ticking = false;
  function update() {
    ticking = false;
    var r = sec.getBoundingClientRect(), vh = window.innerHeight || 800;
    var p = (vh - r.top) / (vh + r.height);
    p = Math.max(0, Math.min(1, p));
    var s = (p - 0.5) * 2;               /* -1 a 1 */
    iro.setAttribute("y", String(-40 - 40 * s));   /* RO sube */
    ima.setAttribute("y", String(-40 + 40 * s));   /* MA baja */
  }
  function schedule() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  update();
})();
