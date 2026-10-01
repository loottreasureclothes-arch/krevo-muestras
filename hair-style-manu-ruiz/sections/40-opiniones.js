/* El balayage: 14 mechones; cada uno comparte UN degradado cuyo corte sube con el scroll (punta -> raiz) con su
   propio desfase. rAF, reversible, sin pin. Termina SI O SI: 1.6 s despues de asomarse el campo, se completa en
   600 ms aunque la visitante se haya quedado quieta a media banda. Despues, si regresa hacia arriba, vuelve a
   seguir al scroll (se oscurece de regreso); al bajar otra vez se aclara con el scroll. */
(function () {
  "use strict";
  var field = document.getElementById("mr-bal-field"), svg = document.getElementById("mr-bal");
  if (!field || !svg) return;
  var grads = Array.prototype.slice.call(svg.querySelectorAll("linearGradient[data-phase]")).map(function (g) {
    var st = g.querySelectorAll("stop");
    return { phase: parseFloat(g.getAttribute("data-phase")) || 0, a: st[1], b: st[2] };
  });
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var shown = -1, floor = 0, done = false, armed = true, seenAt = 0, anim = null, raf = null;
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function apply(p) {
    p = clamp(p);
    if (Math.abs(p - shown) < 0.0015 && p !== 1 && p !== 0) return;
    shown = p;
    for (var i = 0; i < grads.length; i++) {
      var g = grads[i];
      /* p=0: todo castano (corte pasado el final del trazo); p=1: rubio miel con raiz oscura */
      var c = clamp(1.06 - 0.78 * p + g.phase);
      g.a.setAttribute("offset", c.toFixed(3));
      g.b.setAttribute("offset", clamp(c + 0.15).toFixed(3));
    }
  }
  function rect() { return field.getBoundingClientRect(); }
  function vh() { return window.innerHeight || document.documentElement.clientHeight; }
  /* 0 cuando el campo apenas asoma abajo; 1 cuando su parte de abajo (las puntas) ya esta a la vista */
  function progress() { var r = rect(), h = vh(); return (h - r.top) / Math.min(h * 0.95, r.height + h * 0.12); }
  function visible() { var r = rect(); return r.top < vh() && r.bottom > 0; }
  function frame() {
    raf = null;
    if (anim) return;
    var t = clamp(progress());
    if (!visible()) { seenAt = 0; armed = true; if (t <= 0) done = false; }
    if (done) { if (t < floor) floor = t; apply(Math.max(t, floor)); }
    else apply(t);
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(frame); }
  function finish() {
    if (anim || shown >= 1) { done = true; floor = 1; return; }
    var from = shown < 0 ? 0 : shown, t0 = 0;
    anim = true;
    function step(ts) {
      if (!t0) t0 = ts;
      var k = Math.min(1, (ts - t0) / 600), e = 1 - Math.pow(1 - k, 3);
      apply(from + (1 - from) * e);
      if (k < 1) requestAnimationFrame(step); else { anim = null; done = true; floor = 1; }
    }
    requestAnimationFrame(step);
    /* si el navegador no da cuadros (pestana en segundo plano, captura), queda terminado igual */
    setTimeout(function () { if (anim) { anim = null; apply(1); done = true; floor = 1; } }, 760);
  }
  if (reduce) { apply(1); return; }
  apply(clamp(progress()));
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  setInterval(function () {
    if (!visible()) { seenAt = 0; return; }
    var now = Date.now();
    if (!seenAt) { seenAt = now; return; }
    if (armed && now - seenAt >= 1600 && shown < 1) { armed = false; finish(); }
  }, 100);
})();
