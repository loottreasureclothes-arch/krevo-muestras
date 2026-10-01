/* 6 · Estado en vivo (hora de Aguascalientes) y la mesa que armó el visitante. */
(function () {
  "use strict";
  var ML = window.ML;
  if (!ML) return;
  var est = document.getElementById("cz-estado"), estT = document.getElementById("cz-estado-t");
  var tu = document.getElementById("cz-tu"), cambiar = document.getElementById("cz-cambiar");
  function estado() {
    if (!est) return;
    var e = ML.estado();
    est.hidden = false;
    est.classList.toggle("is-cerrado", !e.abierto);
    estT.textContent = e.abierto ? "Abierto ahora, cierra a las " + e.cierraTxt : (e.cuando === "hoy" ? "Cerrado, abre hoy a las 2:00 pm" : "Cerrado, abre mañana a las 2:00 pm");
  }
  function mesa() {
    if (!tu) return;
    var r = ML.resumen();
    if (r) {
      tu.innerHTML = '<span class="cz-tu-l"></span> <span class="cz-tu-t"></span>';
      tu.firstChild.textContent = "Tu mesa:";
      tu.lastChild.textContent = r;
      cambiar.textContent = "Cambiar mi mesa";
    } else {
      tu.innerHTML = '<span class="cz-tu-l">Falta elegir</span> <span class="cz-tu-t">la primera mitad.</span>';
      cambiar.textContent = "Armar mi mesa";
    }
  }
  estado(); mesa();
  setInterval(estado, 60000);
  window.addEventListener("ml:mesa", mesa);
})();
