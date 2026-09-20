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

  /* El boton es un <a href="wa.me/..."> REAL: funciona aunque el navegador de
     Instagram o Facebook bloquee window.open, y aunque este JS no corra (el
     HTML ya trae el mensaje base). Aqui solo se ENRIQUECE el href con medida,
     fecha y feria cada vez que cambia un campo. */
  function initForm() {
    var form = document.getElementById("s-fecha-form");
    var send = document.getElementById("s-fecha-send");
    if (!form || !send) return;
    function val(id) { return ((document.getElementById(id) || {}).value || "").trim(); }
    function update() {
      var medida = val("s-fecha-medida"), fecha = val("s-fecha-fecha"), nombre = val("s-fecha-nombre");
      var msg = "Hola Stand Up, quiero cotizar un stand.";
      if (medida) msg += "\nMedida: " + medida;
      if (fecha) msg += "\nFecha de montaje: " + SU.fechaLarga(fecha);
      if (nombre) msg += "\nFeria o evento: " + nombre;
      send.href = SU.waUrl(msg);
    }
    form.addEventListener("input", update);
    form.addEventListener("change", update);
    send.addEventListener("pointerdown", update); /* por si la medida se precargo del carrito */
    send.addEventListener("focus", update);
    form.addEventListener("submit", function (e) { e.preventDefault(); update(); send.click(); }); /* Enter en un campo */
    update();
  }

  function init() { prefill(); initForm(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
