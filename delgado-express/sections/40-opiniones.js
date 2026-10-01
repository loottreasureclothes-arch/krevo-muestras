/* 40 · las puertas se abren con el scroll (rAF, reversible, sin pin).
   Seguro: si la caja lleva 1.6 s a la vista, terminan de abrirse solas y se quedan abiertas
   hasta que la caja sale de la pantalla (al volver a entrar, otra vez ligadas al scroll).
   Con reduced-motion: abiertas desde el principio. */
(function () {
  "use strict";
  var box = document.getElementById("op-box");
  if (!box) return;
  var doors = box.querySelectorAll(".op-door");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var forced = false, timer = 0, cur = -1;
  function set(p) {
    if (Math.abs(p - cur) < 0.0005) return; cur = p;
    box.style.setProperty("--p", p.toFixed(4));
    for (var i = 0; i < doors.length; i++) doors[i].classList.toggle("is-gone", p >= 0.995);
  }
  if (reduce) { set(1); return; }
  function ease(t) { return t * t * (3 - 2 * t); }
  function force() {
    timer = 0; forced = true; box.classList.add("is-auto"); set(1);
    setTimeout(function () { box.classList.remove("is-auto"); }, 700);
  }
  function update() {
    var vh = window.innerHeight || 800, r = box.getBoundingClientRect();
    var visible = r.top < vh && r.bottom > 0;
    if (!visible) {
      if (timer) { clearTimeout(timer); timer = 0; }
      forced = false;
    } else if (!forced && !timer) {
      timer = setTimeout(force, 1600);
    }
    if (forced) { set(1); return; }
    var t = (vh * 0.75 - r.top) / (vh * 0.55);
    set(ease(Math.max(0, Math.min(1, t))));
  }
  var q = 0;
  function sched() { if (q) return; q = 1; var go = function () { if (q) { q = 0; update(); } }; requestAnimationFrame(go); setTimeout(go, 120); }
  addEventListener("scroll", sched, { passive: true }); addEventListener("resize", sched);
  sched();
  /* respaldo duro: aunque no corra nada de lo anterior, a los 1.6 s de cargar con la caja a la vista quedan abiertas */
  setTimeout(function () { var r = box.getBoundingClientRect(); if (!forced && r.top < (window.innerHeight || 800) && r.bottom > 0) force(); }, 1600);
})();
