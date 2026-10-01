/* Cierre: el título sabe si ya elegiste algo ("Tu antojo / ya está anotado.") o falta ("Falta elegir / tu antojo."). */
(function () {
  "use strict";
  function init() {
    var QC = window.QC, a = document.getElementById("qc-fin-1"), b = document.getElementById("qc-fin-2"), p = document.getElementById("qc-fin-p");
    if (!QC || !a || !b || !p) return;
    function paint() {
      var it = QC.item();
      if (it) { a.textContent = "Tu antojo"; b.textContent = "ya está anotado."; p.textContent = "Va en tu mensaje: " + it + "."; }
      else { a.textContent = "Falta elegir"; b.textContent = "tu antojo."; p.textContent = "Elige qué quieres y te armamos el mensaje."; }
    }
    QC.on(paint); paint();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
