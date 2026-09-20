/* #grupos: formulario compacto -> arma el mensaje de WhatsApp directo (no usa la hoja/carrito). */
(function () {
  "use strict";
  function ready(fn) { if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn); else fn(); }
  ready(function () {
    var form = document.getElementById("gr-form");
    if (!form) return;
    var stepper = form.querySelector(".ab-stepper");
    if (stepper) {
      var input = stepper.querySelector("input");
      stepper.addEventListener("click", function (e) {
        var b = e.target.closest("button[data-step]");
        if (!b) return;
        var v = Math.max(2, Math.min(80, (parseInt(input.value, 10) || 2) + parseInt(b.getAttribute("data-step"), 10)));
        input.value = v;
      });
    }
    var send = document.getElementById("gr-send");
    if (!send) return;
    send.addEventListener("click", function () {
      var people = (document.getElementById("gr-people") || {}).value || "10";
      var dateV = (document.getElementById("gr-date") || {}).value || "";
      var hour = (document.getElementById("gr-hour") || {}).value || "9:00";
      var espacioEl = form.querySelector('input[name="gr-espacio"]:checked');
      var espacio = espacioEl ? espacioEl.value : "Salón privado";
      var platillos = (document.getElementById("gr-platillos") || {}).value || "";
      var fechaTxt = dateV ? (function () {
        var p = dateV.split("-");
        return p.length === 3 ? p[2] + "/" + p[1] + "/" + p[0] : dateV;
      })() : "(sin definir)";
      var msg = "Hola, quiero cotizar un desayuno de grupo en Los Abolengos.\n" +
        "Personas: " + people + "\n" +
        "Fecha: " + fechaTxt + " · Hora: " + hour + "\n" +
        "Espacio: " + espacio +
        (platillos.trim() ? "\nPlatillos: " + platillos.trim() : "");
      /* <a href> real: el click sigue su curso; aqui solo se enriquece el href (no window.open). */
      send.href = "https://wa.me/524498050420?text=" + encodeURIComponent(msg);
    });
  });
})();
