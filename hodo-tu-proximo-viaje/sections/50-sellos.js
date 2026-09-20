/* 40 · Sellos: indicador de avance del carrusel (perforacion + numero en mono).
   Solo decora: si esto no corre, el carrusel sigue funcionando con puro swipe. */
(function () {
  "use strict";
  function init() {
    var track = document.getElementById("hd-sellos-track");
    var fill = document.getElementById("hd-sellos-fill");
    var num = document.getElementById("hd-sellos-n");
    if (!track || !fill || !num) return;
    var cards = track.querySelectorAll(".hd-stamp--rev");
    var total = cards.length;
    if (!total) return;

    var raf = null;
    function paint() {
      raf = null;
      if (getComputedStyle(track).overflowX !== "auto") return; /* en compu es pagina de pasaporte */
      var max = track.scrollWidth - track.clientWidth;
      var p = max > 0 ? Math.min(1, Math.max(0, track.scrollLeft / max)) : 0;
      var i = Math.round(p * (total - 1));
      num.textContent = (i + 1 < 10 ? "0" : "") + (i + 1);
      fill.style.width = (100 / total + p * (100 - 100 / total)) + "%";
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(paint); }
    track.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    paint();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
