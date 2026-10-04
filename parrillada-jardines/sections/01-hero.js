/* La parrilla se abre: barras que se levantan al entrar y se cierran al salir del hero (reversible). */
(function () {
  "use strict";
  var g = document.getElementById("pj-grill");
  var hero = document.getElementById("hero");
  if (!g || !hero) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  var armed = false, ticking = false;
  function arm() { if (armed) return; armed = true; g.classList.add("is-armed"); }
  function open() { if (!armed) return; armed = false; g.classList.remove("is-armed"); }
  function check() {
    ticking = false;
    var r = hero.getBoundingClientRect();
    if (r.bottom < -20) arm();               /* ya salió: se cierra, sin que se vea */
    else if (r.bottom > 60 && armed) open(); /* volvió: se abre */
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(check); } }, { passive: true });
  /* entrada: cerrada un instante y se abre (resuelta antes de 1.2 s pase lo que pase) */
  arm();
  requestAnimationFrame(function () { requestAnimationFrame(function () { setTimeout(open, 120); }); });
  setTimeout(function () { var r = hero.getBoundingClientRect(); if (r.bottom > 60) open(); }, 900);
})();
