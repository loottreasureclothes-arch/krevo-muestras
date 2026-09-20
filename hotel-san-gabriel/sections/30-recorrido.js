/* 20 Momento firma: pin corto (220svh) y reversible. Solo con JS y sin reduced-motion; si no, se queda apilado y visible.
   La foto 0 siempre está a opacidad 1 y data-step="0" viene en el HTML: nunca queda en blanco. */
(function () {
  "use strict";
  var sec = document.getElementById("recorrido");
  if (!sec) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  var track = sec.querySelector(".rc-track"), figs = sec.querySelectorAll(".rc-fig");
  document.documentElement.classList.add("rc-on");
  var T = [0.32, 0.66], W = 0.18, ticking = false;
  function cl(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function upd() {
    ticking = false;
    var r = track.getBoundingClientRect(), tot = r.height - innerHeight;
    var p = tot > 0 ? cl(-r.top / tot) : 0, step = 0;
    for (var i = 0; i < T.length; i++) {
      var o = cl((p - (T[i] - W / 2)) / W);
      figs[i + 1].style.setProperty("--o", o.toFixed(3));
      if (p >= T[i]) step = i + 1;
    }
    for (var j = 0; j < figs.length; j++) figs[j].style.setProperty("--z", (1.08 - 0.08 * cl(p * 4 - j)).toFixed(4));
    if (sec.getAttribute("data-step") !== String(step)) sec.setAttribute("data-step", step);
  }
  function req() { if (!ticking) { ticking = true; (window.requestAnimationFrame || setTimeout)(upd); setTimeout(function () { if (ticking) upd(); }, 120); } }
  addEventListener("scroll", req, { passive: true });
  addEventListener("resize", req);
  upd();
})();
