/* 05-fecha: precarga la medida con lo que ya se agrego en el catalogo
   (window.SU.cart, ver 02-catalogo.js) y arma el mensaje de WhatsApp con
   medida + fecha + feria. Sin precio: nunca se manda una cifra. */
(function () {
  "use strict";
  if (!window.SU) return;
  var SU = window.SU;

  function prefill() {
    var sel = document.getElementById("s-fecha-medida");
    if (!sel) return;
    function apply() {
      if (sel.selectedIndex > 0 || !SU.cart || !SU.cart.length) return;
      var name = SU.cart[0].name;
      for (var i = 0; i < sel.options.length; i++) {
        if (sel.options[i].value === name || sel.options[i].text === name) { sel.selectedIndex = i; break; }
      }
    }
    apply(); // por si ya trae algo al cargar
    sel.addEventListener("focus", apply); // se actualiza si agrego algo despues, antes de abrir el select
  }

  function initForm() {
    var form = document.getElementById("s-fecha-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var medida = (document.getElementById("s-fecha-medida") || {}).value || "";
      var fecha = (document.getElementById("s-fecha-fecha") || {}).value || "";
      var nombre = (document.getElementById("s-fecha-nombre") || {}).value || "";
      var msg = "Hola Stand Up, quiero cotizar un stand.";
      if (medida) msg += "\nMedida: " + medida;
      if (fecha) msg += "\nFecha de montaje: " + SU.fechaLarga(fecha);
      if (nombre) msg += "\nFeria o evento: " + nombre;
      var url = SU.openWa(msg);
      // eslint-disable-next-line no-console
      console.log("WA_URL_FECHA:", url);
    });
  }

  function init() { prefill(); initForm(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
