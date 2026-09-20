/* 04 COTIZA: arma el mensaje y abre WhatsApp (con respaldo si el navegador bloquea la ventana). */
(function () {
  "use strict";
  var f = document.querySelector("#cotiza .s-cot-form");
  if (!f || !window.EQ) return;
  var err = f.querySelector(".s-cot-err");
  /* "Quiero algo así" en Proyectos: deja elegido "Equipar mi restaurante" y anota el proyecto */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-proyecto]"); if (!a) return;
    f.busca.value = "Equipar mi restaurante o bar"; f.dataset.proyecto = a.getAttribute("data-proyecto");
    setTimeout(function () { f.nombre.focus({ preventScroll: true }); }, 500);
  });
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    var n = f.nombre.value.trim(), b = f.busca.value, cp = f.cp.value.trim();
    if (!n || !b || !cp) { err.hidden = false; (!n ? f.nombre : !b ? f.busca : f.cp).focus(); return; }
    err.hidden = true;
    EQ.send("Hola Equipales Imperial, soy " + n + ". Quiero cotizar: " + b + ". Envío a: " + cp + "." + (f.dataset.proyecto ? " Vi el proyecto de " + f.dataset.proyecto + "." : ""), f.querySelector(".s-cot-send"));
  });
})();
