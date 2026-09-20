/* 60 · Reseñas + Visítanos: entrada del copy y encendido de las 5 estrellas doradas (una vez al asomar).
   Blindaje a 1.6 s: si el IntersectionObserver no dispara a tiempo, 60-resenas.css ya deja todo visible
   por default (regla "CSS base = estado final") y aquí solo se agrega la clase que arranca la animación. */
(function () {
  "use strict";
  var s = document.getElementById("resenas");
  if (!s) return;
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (still || !("IntersectionObserver" in window)) { s.classList.add("res-in"); return; }
  s.classList.add("res-js");
  var io = new IntersectionObserver(function (es) {
    if (es[0].isIntersecting) { s.classList.add("res-in"); io.disconnect(); }
  }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
  io.observe(s);
  /* red de seguridad: con solo asomar un poco (margen 0, igual que site.js initRevealSafety) ya arma
     el temporizador de 1.6 s, para que un scroll que se detenga justo con el titulo apenas visible
     (p. ej. entrando por abajo) no lo deje invisible para siempre. */
  var fio = new IntersectionObserver(function (es) {
    if (es[0].isIntersecting) { fio.disconnect(); setTimeout(function () { s.classList.add("res-in"); }, 1600); }
  }, { rootMargin: "0px 0px 0px 0px" });
  fio.observe(s);
})();
