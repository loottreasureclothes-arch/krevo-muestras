/* La grúa baja al agua: --p (0 a 1) lo mueve el scroll del tanque; reversible; sin pin.
   p = 0 cuando el colgador (en su lugar real, 35 % de la foto) cruza el 80 % de la pantalla;
   p = 1 cuando el agua (67 % de la foto) llega al 55 %. Si el visitante se detiene 1.6 s con la foto a la vista,
   termina de bajar sola (y se queda abajo hasta que vuelva a subir por encima del punto de arranque). */
(function () {
  "use strict";
  var el = document.getElementById("mv-grua"); if (!el) return;
  if (!(window.matchMedia && window.matchMedia("(scripting: enabled)").matches !== false)) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  var raf = null, floor = 0, idle = null, anim = null, cur = 0;
  function scrollP() {
    var r = el.getBoundingClientRect(), vh = window.innerHeight || document.documentElement.clientHeight, h = r.height;
    var start = 0.8 * vh - 0.35 * h, end = 0.55 * vh - 0.67 * h;
    return Math.min(1, Math.max(0, (r.top - start) / (end - start)));
  }
  function apply(p) {
    cur = p; el.style.setProperty("--p", p.toFixed(4));
    el.classList.toggle("is-hit", p >= 0.995);
  }
  function update() {
    raf = null;
    if (anim) return;
    var s = scrollP();
    if (s <= 0.02) floor = 0;
    apply(Math.max(s, floor));
    // seguro: a los 1.6 s quieto con la foto a la vista, termina de bajar
    clearTimeout(idle);
    var r = el.getBoundingClientRect(), vh = window.innerHeight;
    var vis = r.top < vh * 0.7 && r.bottom > vh * 0.3;
    if (vis && cur < 0.995) idle = setTimeout(finish, 1600);
  }
  function finish() {
    var from = cur, t0 = performance.now();
    anim = true;
    (function step(now) {
      var k = Math.min(1, (now - t0) / 900), e = 1 - Math.pow(1 - k, 3);
      apply(from + (1 - from) * e);
      if (k < 1) requestAnimationFrame(step); else { floor = 1; anim = null; }
    })(t0);
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(update); }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  schedule();
})();
