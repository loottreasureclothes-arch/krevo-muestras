/* Cierre: muestra lo que se marco en la cartilla. */
(function () {
  "use strict";
  function init() {
    var C = window.BI && window.BI.cartilla, el = document.getElementById("bi-cierre-doc");
    if (!C || !el) return;
    var seal = document.querySelector("#cierre .bi-seal");
    function paint() {
      var n = C.count();
      if (seal) seal.classList.toggle("is-on", n === C.TOTAL);
      el.textContent = n > 0
        ? "Llevas " + n + " de " + C.TOTAL + " documentos. Se suman a tu mensaje."
        : "Marca lo que ya tienes en la cartilla y se suma a tu mensaje.";
    }
    window.addEventListener("bi:cartilla", paint);
    paint();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
