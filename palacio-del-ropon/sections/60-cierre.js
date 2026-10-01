/* Cierre: repite la elección de la galería (coronas, celebración y fecha) y arma el mismo mensaje de WhatsApp. */
(function () {
  "use strict";
  var sum = document.getElementById("pr-rem-sum"), ir = document.getElementById("pr-rem-ir");
  if (!sum) return;
  function paint() {
    var P = window.PalacioCorte; if (!P) return;
    var t = P.resumen();
    if (P.count() && t) { sum.textContent = t; sum.classList.remove("is-empty"); if (ir) ir.hidden = true; }
    else { sum.textContent = "Tu corte está vacía."; sum.classList.add("is-empty"); if (ir) ir.hidden = false; }
  }
  window.addEventListener("palacio:corte", paint);
  paint();
})();
