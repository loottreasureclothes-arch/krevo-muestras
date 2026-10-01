/* El brillo pasa: una banda de luz cruza la foto con el scroll y detrás se quita el velo de laca opaca.
   A los 1.6 s desde que cualquier parte asoma queda resuelto pase lo que pase (transición de 500 ms). */
(function () {
  "use strict";
  var fig = document.getElementById("bs-brillo"); if (!fig) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var ph = fig.querySelector(".bs-brillo-ph");
  var p = 0, started = false, forced = false, forceAt = 0, forceFrom = 0, timer = null, raf = null;
  fig.classList.add("is-live");
  function paint(v) {
    fig.style.setProperty("--c", (-22 + v * 128).toFixed(2));   /* la banda cruza de fuera a fuera */
    fig.style.setProperty("--lo", v >= 0.995 ? "0" : "1");
  }
  paint(0);
  function target() {
    var r = ph.getBoundingClientRect(), vh = window.innerHeight || 800;
    return Math.max(0, Math.min(1, (vh * 0.9 - r.top) / (vh * 0.5 + r.height / 2)));
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(frame); }
  function frame(now) {
    raf = null;
    var r = ph.getBoundingClientRect(), vh = window.innerHeight || 800;
    if (r.top > vh * 0.9) {                    /* arriba de donde empieza: se reinicia */
      started = false; forced = false; clearTimeout(timer); p = 0; paint(0); return;
    }
    if (r.top < vh && r.bottom > 0 && !started) {
      started = true;
      timer = setTimeout(function () { forced = true; forceAt = performance.now(); forceFrom = p; schedule(); }, 1600);
    }
    if (forced) {
      var k = Math.min(1, ((now || performance.now()) - forceAt) / 500);
      p = forceFrom + (1 - forceFrom) * k; paint(p);
      if (k < 1) schedule();
      return;
    }
    var t = target();
    p += (t - p) * 0.25; if (Math.abs(t - p) < 0.003) p = t;
    paint(p);
    if (p !== t) schedule();
  }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  schedule();
})();
