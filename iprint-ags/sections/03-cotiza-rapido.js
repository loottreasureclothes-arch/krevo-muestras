/* 03 formulario corto -> mensaje de WhatsApp ya armado */
(function () {
  "use strict";
  var f = document.querySelector("#cotiza-rapido form");
  if (!f) return;
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    var n = f.nombre.value.trim(), err = f.querySelector(".s-cr-err");
    if (!n) { err.hidden = false; f.nombre.focus(); return; }
    err.hidden = true;
    var msg = "Hola iPrint, soy " + n + ". Quiero cotizar: " + f.tipo.value + ".";
    if (f.det.value.trim()) msg += "\nMedida o cantidad: " + f.det.value.trim() + ".";
    IP.openWa(msg, f.querySelector(".ip-wa-fallback"));
  });
})();
