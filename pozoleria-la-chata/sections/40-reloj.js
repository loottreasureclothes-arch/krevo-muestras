/* Reloj de la esquina (HOJA §4). Tres estados reales, nada de inventar horas:
     abierto  -> sábado o domingo entre 3:30 y 10:00 pm
     antes    -> sábado o domingo, todavía no son las 3:30
     cerrado  -> entre semana, o fin de semana después de las 10:00 pm
   Blindaje: si esto no corre, la tira y el horario fijo "Sábado y domingo, 3:30 a 10:00 pm"
   ya están en el HTML, y el botón (ancla real a #chata-sheet-wrap, con :target en site.css)
   sigue abriendo la hoja sin JS. */
(function () {
  "use strict";
  var section = document.getElementById("reloj");
  if (!section || !window.Chata) return;

  function markToday() {
    var wd = Chata.today();
    var days = section.querySelectorAll("[data-wd]");
    for (var i = 0; i < days.length; i++) {
      if (parseInt(days[i].getAttribute("data-wd"), 10) === wd) days[i].setAttribute("data-today", "");
      else days[i].removeAttribute("data-today");
    }
  }

  function updateLive() {
    var t1 = section.querySelector("[data-reloj-t1]"),
        t2 = section.querySelector("[data-reloj-t2]"),
        live = section.querySelector("[data-reloj-live]");
    var estado = Chata.openState();
    var next = Chata.nextDay(); // "sabado" | "domingo"
    var txt;
    if (estado === "abierto") {
      txt = ["Estamos sirviendo,", "hasta las 10.", "Abierto ahora. Cierran a las 10:00."];
    } else if (estado === "antes") {
      txt = ["Hoy abrimos,", "a las 3:30.", "Todavía no abrimos. Hoy de 3:30 a 10:00 pm."];
    } else {
      txt = ["Hoy no abrimos,", next === "sabado" ? "El sábado sí." : "El domingo sí.",
             "Hoy no abrimos. Sábado y domingo, de 3:30 a 10:00 pm."];
    }
    if (t1) t1.textContent = txt[0];
    if (t2) t2.textContent = txt[1];
    if (live) live.textContent = txt[2];
    var cta = document.getElementById("reloj-cta");
    if (cta) cta.setAttribute("data-wa-day", "Hola, quiero apartar mi pedido para el " + (next === "sabado" ? "sábado" : "domingo") + ".");
  }

  function wireCta() {
    var cta = document.getElementById("reloj-cta");
    if (!cta) return;
    cta.addEventListener("click", function (e) {
      if (window.Chata && Chata.openSheet) {
        Chata.setDia(cta.getAttribute("data-wa-day"));
        e.preventDefault();
        Chata.openSheet();
      }
      // sin JS, el href="#chata-sheet-wrap" + :target de site.css abre la hoja igual
    });
  }

  markToday();
  updateLive();
  wireCta();
  setInterval(function () { markToday(); updateLive(); }, 60000);
})();
