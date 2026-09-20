/* 4 · ANTES Y DESPUES: el barrido que descubre la mitad "despues".
   Lo que se recorta es la TAPA de encima, nunca la <img>. Dura 1.2 s y corre una sola vez por
   diptico, cuando ese diptico se asoma. BLINDAJE: si el motor no corre, a los 1.6 s el rescate
   del template no toca esto, asi que aqui va su propio tope duro; y sin JS la tapa ni se pinta. */
(function () {
  "use strict";
  var dips = Array.prototype.slice.call(document.querySelectorAll("[data-dip]"));
  if (!dips.length) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function abrir(el) { el.classList.add("is-abierto"); }
  if (reduce) { dips.forEach(abrir); return; }
  if (window.MimoWatch) window.MimoWatch(dips, 0.85, abrir);
  /* tope duro: pase lo que pase, a los 1.8 s ningun diptico se queda tapado a medias */
  setTimeout(function () {
    dips.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh && r.bottom > 0) abrir(el);
    });
  }, 1800);
  setTimeout(function () { dips.forEach(abrir); }, 9000);
})();
