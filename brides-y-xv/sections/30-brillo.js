/* 30 · La luz de aparador: --p (0 a 1) = avance de la foto por la pantalla; reversible, sin pin, con rAF */
(function () {
  "use strict";
  var photo = document.getElementById("bx-brillo-photo");
  var copy = document.getElementById("bx-brillo-copy");
  if (!photo) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;                              /* estado final: banda al 60 % */
  var raf = null, started = false;
  function update() {
    raf = null;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var r = photo.getBoundingClientRect();
    if (r.bottom < -40 || r.top > vh + 40) return;
    var p = (vh * 0.95 - r.top) / (vh * 0.6 + r.height);
    p = Math.max(0, Math.min(1, p));
    photo.style.setProperty("--p", p.toFixed(4));
    if (p > 0.82 && copy && !copy.classList.contains("is-in")) copy.classList.add("is-in");  /* al terminar el barrido cae el título */
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(update); }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  update();
})();
