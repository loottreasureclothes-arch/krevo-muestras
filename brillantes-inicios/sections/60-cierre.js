/* Cierre: muestra lo que se marco en la cartilla; sin nada marcado, donde y cuando (correccion 3: sin instrucciones en el momento emotivo). */
(function () {
  "use strict";
  function init() {
    var C = window.BI && window.BI.cartilla, el = document.getElementById("bi-cierre-doc");
    if (!C || !el) return;
    var seal = document.querySelector("#cierre .bi-seal");
    var base = el.innerHTML; /* donde y cuando, tal como viene en el HTML */
    function paint() {
      var n = C.count();
      if (seal) seal.classList.toggle("is-on", n === C.TOTAL);
      if (n > 0) el.textContent = "Llevas " + n + " de " + C.TOTAL + " documentos. Se suman a tu mensaje.";
      else if (el.innerHTML !== base) el.innerHTML = base;
    }
    window.addEventListener("bi:cartilla", paint);
    paint();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
