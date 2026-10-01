/* EL MARCO SE ARMA: un solo avance --p ligado al scroll, reversible, sin pin.
   Sin JS o con reduced-motion el marco se ve armado. A los 1.6 s de asomarse queda completo. */
(function () {
  "use strict";
  function start() {
    var sec = document.getElementById("opiniones"), arma = document.getElementById("ns-arma");
    if (!sec || !arma) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var seenAt = 0, locked = false, shown = 1, tween = null, timer = null, raf = null;
    function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
    function apply(p) {
      shown = p;
      arma.style.setProperty("--v", clamp(p / .5).toFixed(3));
      arma.style.setProperty("--m", clamp((p - .35) / .5).toFixed(3));
      arma.style.setProperty("--pa", clamp((p - .7) / .3).toFixed(3));
    }
    function scrollP() {
      var vh = window.innerHeight || 700, top = sec.getBoundingClientRect().top;
      /* de cuando el borde alto cruza el 85 % de la pantalla a cuando cruza el 40 % */
      return clamp((vh * .85 - top) / (vh * .45));
    }
    function finish() {
      locked = true;
      var from = shown, t0 = performance.now(), dur = 380;
      if (tween) cancelAnimationFrame(tween);
      function step(now) {
        var k = clamp((now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        apply(from + (1 - from) * e);
        if (k < 1) tween = requestAnimationFrame(step);
      }
      tween = requestAnimationFrame(step);
      setTimeout(function () { apply(1); }, dur + 60);
    }
    function update() {
      raf = null;
      var vh = window.innerHeight || 700, r = sec.getBoundingClientRect();
      var peeking = r.top < vh && r.bottom > 0;
      var p = scrollP();
      if (!peeking || (p <= 0 && locked)) {
        /* volvió arriba de donde empieza: se reinicia */
        if (locked && r.top > vh * .85) { locked = false; if (tween) cancelAnimationFrame(tween); }
        if (timer) { clearTimeout(timer); timer = null; }
        if (!locked) apply(!peeking ? (r.top > 0 ? 0 : 1) : p);
        return;
      }
      if (!timer && !locked) timer = setTimeout(function () { timer = null; finish(); }, 1600);
      if (!locked) apply(p);
    }
    function sched() { if (!raf) raf = requestAnimationFrame(update); }
    apply(0);
    addEventListener("scroll", sched, { passive: true }); addEventListener("resize", sched);
    sched();
    /* red: si rAF no corre, a los 4 s se completa lo que ya se asomó */
    setTimeout(function () { var r = sec.getBoundingClientRect(), vh = window.innerHeight || 700; if (r.top < vh && r.bottom > 0 && !locked) finish(); }, 4200);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
