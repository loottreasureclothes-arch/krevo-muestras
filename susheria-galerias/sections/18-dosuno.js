/* 18 Momento firma: mapea el scroll a --p (0 = rollos separados, 1 = juntos con sello). Reversible. Si algo falla, --p se queda en 1. */
(function () {
  "use strict";
  var sec = document.getElementById("dosuno");
  if (!sec || !window.requestAnimationFrame) return;
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var ticking = false;
  function upd() {
    ticking = false;
    var r = sec.getBoundingClientRect(), vh = window.innerHeight || 1;
    var run = Math.max(1, r.height - vh * 1.05);
    var p = (vh * 0.1 - r.top) / run;
    p = Math.min(1, Math.max(0, p));
    p = 1 - Math.pow(1 - p, 1.6);
    sec.style.setProperty("--p", p.toFixed(3));
  }
  function on() { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }
  window.addEventListener("scroll", on, { passive: true });
  window.addEventListener("resize", on);
  upd();
})();
