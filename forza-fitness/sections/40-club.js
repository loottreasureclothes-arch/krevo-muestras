/* 40-club: el rayo del logo se llena de rojo de abajo hacia arriba con el avance del scroll (rAF, reversible, sin pin) */
(function () {
  "use strict";
  var sec = document.getElementById("club");
  var bolt = document.getElementById("fz-bolt");
  if (!sec || !bolt) return;
  var fill = bolt.querySelector(".fz-bolt-fill");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { sec.classList.add("is-full"); return; }
  var raf = null;
  function update() {
    raf = null;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    /* avance ligado a la posicion REAL del rayo: arranca cuando su centro cruza el 80 % de la
       pantalla (ya se ve completo) y termina al 40 %, asi el llenado entero ocurre a la vista */
    var r = bolt.getBoundingClientRect();
    var c = r.top + r.height / 2;
    var p = (vh * 0.8 - c) / (vh * 0.4);
    p = Math.max(0, Math.min(1, p));
    bolt.style.setProperty("--p", p.toFixed(3));
    sec.classList.toggle("is-full", p >= 0.97);
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(update); }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  update();
  /* red: si el navegador no entrega scroll, al cuarto segundo el rayo queda como lo dejó el cálculo */
})();
