/* Dos casas: pinta el estado real (abierto/cierra/descansa) de cada casa con
   window.PETRA.status(), resalta la casa activa del interruptor del header, y arma
   el WhatsApp de "Pregunta por tu mesa" (dia, hora, personas, casa elegida). */
(function () {
  "use strict";

  function paintStatus() {
    var P = window.PETRA;
    if (!P) return;
    document.querySelectorAll("[data-house-status]").forEach(function (el) {
      var id = el.getAttribute("data-house-status");
      var s = P.status(id);
      var base = P.houses[id] ? (id === "jardin" ? "8:00–14:00 y 15:00–23:00" : "Lun, mar, jue y vie 14:00–22:00 · Sáb y dom 14:00–22:30 · Miércoles cerrado") : "";
      el.textContent = s && s.text ? s.text + " · " + base : base;
    });
    document.querySelectorAll("[data-house-card]").forEach(function (card) {
      card.classList.toggle("is-active", card.getAttribute("data-house-card") === P.house);
    });
  }

  /* Aviso de casa cerrada (HOJA §4): "Hoy la Cenaduria descansa. El Jardin abre a las
     15:00." con el link que mueve el interruptor. Sale con los horarios reales, no solo
     en miercoles: si la casa elegida esta cerrada ahora, la pagina lo dice y ofrece la otra. */
  function paintNote() {
    var box = document.querySelector("[data-casas-note]");
    var P = window.PETRA;
    if (!box || !P || !P.closedNote) return;
    var note = P.closedNote();
    if (!note) { box.hidden = true; box.innerHTML = ""; return; }
    box.innerHTML = "";
    var main = document.createTextNode(note.main + " ");
    var btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = note.link;
    btn.addEventListener("click", function () { P.setHouse(note.other); });
    box.appendChild(main);
    box.appendChild(btn);
    box.hidden = false;
  }

  function fmtDia(v) {
    if (!v) return "";
    try {
      var d = new Date(v + "T00:00:00");
      return d.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" });
    } catch (e) { return v; }
  }

  function initAsk() {
    var btn = document.querySelector("[data-ask-send]");
    if (!btn) return;
    var diaEl = document.querySelector('[data-ask="dia"]');
    var horaEl = document.querySelector('[data-ask="hora"]');
    var pEl = document.querySelector('[data-ask="personas"]');

    function render() {
      var P = window.PETRA;
      var house = P ? P.houses[P.house] : null;
      var dia = diaEl && diaEl.value ? fmtDia(diaEl.value) : "un día por confirmar";
      var hora = horaEl && horaEl.value ? horaEl.value : "";
      var personas = pEl && pEl.value ? pEl.value : "2";
      var casaNombre = house ? house.nombre : "Petra";
      var msg = "Hola, ¿me pueden apartar mesa en " + casaNombre + " para " + dia + (hora ? " a las " + hora : "") + ", " + personas + " personas? Gracias.";
      btn.href = P ? P.waUrl(msg) : "#";
    }
    [diaEl, horaEl, pEl].forEach(function (el) { if (el) el.addEventListener("input", render); });
    window.addEventListener("petra:house", render);
    render();
  }

  function init() {
    paintStatus();
    paintNote();
    initAsk();
    window.addEventListener("petra:house", paintStatus);
    window.addEventListener("petra:house", paintNote);
    setInterval(function () { paintStatus(); paintNote(); }, 60000);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
