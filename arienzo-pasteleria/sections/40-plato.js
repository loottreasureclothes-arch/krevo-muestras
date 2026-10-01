(function () {
  "use strict";
  var plate = document.getElementById("plato");
  if (!plate) return;
  var svg = document.getElementById("plato-svg");
  var r1 = document.getElementById("w1r"), r2 = document.getElementById("w2r"), gota = document.getElementById("gota");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var L1 = { x0: 29, w: 232, y: 120 }, L2 = { x0: 66, w: 158, y: 160 };   /* tramo de cada renglón en unidades del viewBox */
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  if (reduce) return;                                   /* frase completa, sin gota */
  var P = 0, forced = false, fStart = 0, fFrom = 0, raf = null, appeared = false, done = false;
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function draw(p) {
    var p1 = clamp(p / 0.5), p2 = clamp((p - 0.5) / 0.5);
    r1.setAttribute("width", p1 >= 1 ? 290 : (L1.x0 + p1 * L1.w).toFixed(1));
    r2.setAttribute("width", p2 >= 1 ? 290 : (L2.x0 + p2 * L2.w).toFixed(1));
    if (p <= 0.002 || p >= 0.998) { gota.setAttribute("opacity", "0"); return; }
    var on1 = p < 0.5, pp = on1 ? p1 : p2, L = on1 ? L1 : L2;
    gota.setAttribute("transform", "translate(" + (L.x0 + 2 + pp * (L.w - 4)).toFixed(1) + " " + (L.y - 3).toFixed(1) + ")");
    gota.setAttribute("opacity", "1");
  }
  function scrollP() {
    var r = plate.getBoundingClientRect(), vh = window.innerHeight || document.documentElement.clientHeight;
    var start = vh * 0.85, end = vh * 0.40 - r.height / 2;
    return clamp((start - r.top) / (start - end));
  }
  function frame(now) {
    raf = null;
    var r = plate.getBoundingClientRect(), vh = window.innerHeight || document.documentElement.clientHeight;
    if (!appeared && r.top < vh && r.bottom > 0) {
      appeared = true;
      setTimeout(function () { forced = true; fStart = performance.now(); fFrom = P; schedule(); }, 1600);
      /* respaldo sin rAF: a los 2.2 s de asomarse la frase está completa, pase lo que pase */
      setTimeout(function () { done = true; P = 1; draw(1); }, 2200);
    }
    var p = scrollP();
    if (forced) { var t = clamp((now - fStart) / 450); p = Math.max(p, fFrom + (1 - fFrom) * ease(t)); if (t >= 1) done = true; }
    if (done) p = 1;
    P = p; draw(p);
    if (forced && !done) schedule();
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(frame); }
  draw(0);
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  schedule();
})();
