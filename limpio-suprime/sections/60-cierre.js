/* 60 · Cierre: resumen en vivo de lo elegido en el cotizador + envío final por WhatsApp */
(function () {
  "use strict";
  function resumenTexto(state) {
    if (!state) return "Cuéntanos qué necesitas y armamos tu mensaje.";
    var partes = [];
    var esp = window.LSCotiza && window.LSCotiza.espacioTexto ? window.LSCotiza.espacioTexto() : state.tipo;
    if (esp) partes.push(esp);
    if (state.noSabe) partes.push("metros por confirmar");
    else if (state.m2) partes.push(state.m2 + " m² aprox.");
    if (state.frecuencia) partes.push(state.frecuencia);
    return partes.length ? partes.join(" · ") : "Cuéntanos qué necesitas y armamos tu mensaje.";
  }
  function init() {
    var resumen = document.getElementById("ci-resumen");
    var send = document.getElementById("ci-send");
    if (!resumen || !send) return;
    function render() {
      var state = window.LSCotiza ? window.LSCotiza.state : null;
      resumen.textContent = resumenTexto(state);
    }
    /* send ya es un <a href> real: aqui solo se mantiene el href al dia con lo que se elige
       en el cotizador (mismo mensaje que arma #cq-send). */
    function updateHref() {
      var msg = window.LSCotiza && window.LSCotiza.message ? window.LSCotiza.message() : "Hola Limpio Suprime, quiero cotizar una limpieza.";
      if (window.LSWa) send.href = window.LSWa.url(msg);
    }
    render();
    updateHref();
    window.addEventListener("ls:cotiza", function () { render(); updateHref(); });
    window.addEventListener("ls:espacio", function () { setTimeout(function () { render(); updateHref(); }, 0); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
