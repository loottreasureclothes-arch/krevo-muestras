/* Barra "Mi visita": solo refleja el carrito de site.js. Cero animacion de scroll. */
(function () {
  "use strict";
  var bar = document.getElementById("s-lav-bar");
  var num = document.getElementById("s-lav-bar-n");
  if (!bar || !num) return;
  window.addEventListener("ec:visita", function (e) {
    var t = e.detail.total;
    num.textContent = t;
    bar.hidden = t === 0;
    bar.setAttribute("aria-label", t === 1 ? "Mi visita, 1 pieza. Ir a armar la visita" : "Mi visita, " + t + " piezas. Ir a armar la visita");
  });
})();
