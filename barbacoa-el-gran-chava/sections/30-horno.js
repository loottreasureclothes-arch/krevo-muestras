/* 30-horno · "TATEMADA." pasa de hueso crudo a rojo brasa con el scroll (--p de 0 a 1), reversible y sin pin.
   Blindaje: el CSS base ya es el estado final; a los 1.6 s de asomar la banda, si --p no llegó a 1, se completa solo en 400 ms. */
(function () {
  "use strict";
  var el = document.getElementById("tatemada"), sec = document.getElementById("horno");
  if (!el || !sec) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var p = 1, forced = false, seen = false, timer = null, animating = false, raf = null;
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function set(v) { p = v; el.style.setProperty("--p", v.toFixed(3)); }
  function raw() { var r = sec.getBoundingClientRect(), vh = window.innerHeight; return clamp((vh - r.top) / (vh / 2 + r.height / 2)); }
  function complete() {
    timer = null;
    var r = sec.getBoundingClientRect(), vh = window.innerHeight;
    if (!(r.top < vh && r.bottom > 0)) return;
    forced = true;
    if (p >= 1) return;
    animating = true;
    var from = p, t0 = null;
    (function step(ts) {
      if (t0 === null) t0 = ts;
      var k = Math.min(1, (ts - t0) / 400);
      set(from + (1 - from) * k);
      if (k < 1) requestAnimationFrame(step); else animating = false;
    })(performance.now());
  }
  function update() {
    raf = null;
    var r = sec.getBoundingClientRect(), vh = window.innerHeight;
    var inView = r.top < vh && r.bottom > 0;
    if (!inView) {
      if (r.top >= vh) { forced = false; seen = false; clearTimeout(timer); timer = null; animating = false; set(0); }
      return;
    }
    if (!seen) { seen = true; clearTimeout(timer); timer = setTimeout(complete, 1600); }
    if (animating) return;
    set(forced ? 1 : raw());
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(update); }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  set(raw());
  schedule();
})();
