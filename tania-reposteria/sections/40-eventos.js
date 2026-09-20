/* 40-eventos: cotizador de 2 campos -> mensaje de WhatsApp. Precio: "Pregunta el precio", nunca inventado. */
(function () {
  "use strict";
  var sec = document.getElementById("eventos");
  if (!sec) return;
  var festeja = document.getElementById("eventosFesteja");
  var invitados = document.getElementById("eventosInvitados");
  var send = document.getElementById("eventosSend");
  if (!send) return;

  function render() {
    var f = (festeja && festeja.value.trim()) || "un evento";
    var i = (invitados && invitados.value.trim()) || "";
    var msg = "Hola Tania, quiero cotizar mi evento. ¿Qué festejo?: " + f +
      (i ? ". Invitados: " + i : ". Invitados: por confirmar") +
      ". ¿Me pasas precio de la mesa de postres o el brunch?";
    send.setAttribute("data-wa", msg);
    send.href = window.TR ? window.TR.waUrl(msg) : send.href;
  }

  if (festeja) festeja.addEventListener("input", render);
  if (invitados) invitados.addEventListener("input", render);
  render();
})();
