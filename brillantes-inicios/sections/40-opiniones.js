/* Las estrellitas que suben: 5 estrellas que se llenan con el scroll (reversible, sin pin). La quinta se queda al 80 %.
   Honestas en cualquier punto: el llenado arranca cuando el 4.8 asoma por abajo y TERMINA (4.8 completo) en cuanto
   la fila de estrellas se ve entera. Nunca se ve la fila completa a medio llenar. */
(function () {
  "use strict";
  var MAX = 4.8;
  function init() {
    var box = document.getElementById("bi-bigstars");
    if (!box) return;
    var big = document.querySelector("#bi-score .bi-big") || box;
    var fills = box.querySelectorAll(".fill");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function paint(v) {
      for (var i = 0; i < fills.length; i++) {
        var f = Math.max(0, Math.min(1, v - i));
        fills[i].style.width = (f * 100).toFixed(1) + "%";
      }
    }
    if (reduce) { paint(MAX); return; }
    var raf = null;
    function update() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var rs = box.getBoundingClientRect();
      /* distancia sin transformaciones (el 4.8 rebota al caer): del tope del 4.8 al tope de las estrellas */
      var D = Math.max(0, box.offsetTop - big.offsetTop);
      var start = rs.top - D - vh;                  /* <0 cuando el 4.8 ya asomo */
      var end = rs.bottom - rs.height * 0.35 - vh;  /* <=0 antes de que la fila se vea entera */
      var p;
      if (end <= 0) p = 1;
      else if (start >= 0) p = 0;
      else p = (-start) / (end - start);
      paint(Math.max(0, Math.min(1, p)) * MAX);
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(update); }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    update();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
