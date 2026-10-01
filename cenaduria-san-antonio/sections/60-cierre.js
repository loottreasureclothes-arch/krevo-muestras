/* 60 · Cierre: repite la cuenta armada y el boton verde manda ese mismo mensaje */
(function () {
  "use strict";
  var CS = window.CS;
  if (!CS) return;
  var C = CS.Cuenta;
  var h3 = document.getElementById("c-h3"), p = document.getElementById("c-p"), lnk = document.getElementById("c-lnk");
  function paint() {
    if (C.vacia()) {
      h3.textContent = "Falta armar la cuenta.";
      p.textContent = "Elige tu platillo, tu tamal y tu atole, y pregunta a qué hora puedes pasar.";
      lnk.firstChild.nodeValue = "Armar la cuenta";
    } else {
      h3.textContent = "Tu cuenta ya está lista.";
      var r = C.resumen(), t = C.total();
      p.textContent = r.join(", ") + ". " + (t > 0 ? "Aprox. " + CS.money(t) + (C.haySinPrecio() ? " y lo que pregunten" : "") + ". " : "") + "Te confirman todo por WhatsApp.";
      lnk.firstChild.nodeValue = "Cambiar la cuenta";
    }
  }
  C.on(paint);
  paint();
})();
