/* Momento firma: la guayaba partida se abre y deja ver el plato; se cierra al salir (reversible). Sin JS o con movimiento reducido ya nace abierta. */
(function () {
  "use strict";
  var sec = document.getElementById("guayaba");
  if (!sec) return;
  var stage = sec.querySelector(".gua-stage");
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  sec.classList.add("gua-js");
  var pairOpen = false, raf = null;
  function check() {
    raf = null;
    var r = stage.getBoundingClientRect(), vh = window.innerHeight || 800;
    var mid = r.top + r.height / 2;
    var open = mid < vh * 0.62 && r.bottom > vh * 0.2;
    if (open !== pairOpen) { pairOpen = open; sec.classList.toggle("gua-open", open); }
  }
  function sched() { if (!raf) raf = requestAnimationFrame(check); }
  window.addEventListener("scroll", sched, { passive: true });
  window.addEventListener("resize", sched);
  check();
  /* seguro: a los 1.6 s del arranque queda resuelto (abierto) si el visitante sigue ahi */
  setTimeout(function () { var r = stage.getBoundingClientRect(); if (r.top < (window.innerHeight || 800) && r.bottom > 0) { pairOpen = true; sec.classList.add("gua-open"); } }, 1600);
})();
