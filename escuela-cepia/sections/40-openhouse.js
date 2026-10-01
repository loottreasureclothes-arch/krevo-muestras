/* Open House: cuenta regresiva real al 29 de octubre de 2026, 17:00 (America/Mexico_City). Despues de esa fecha el bloque cambia solo. */
(function () {
  "use strict";
  var sec = document.getElementById("cp-oh");
  if (!sec) return;
  var section = sec.closest(".cp-oh");
  var antes = document.getElementById("cp-oh-antes"), despues = document.getElementById("cp-oh-despues");
  var countEl = document.getElementById("cp-oh-count");
  var EV = CP.dayNumber(2026, 10, 29), EV_MIN = 17 * 60;
  var shown = "", wrote = false;

  function state() {
    var t = CP.mx(CP.now());
    var dd = EV - CP.dayNumber(t.y, t.m, t.d), min = t.h * 60 + t.mi;
    if (dd < 0) return { s: "despues" };
    if (dd > 1) return { s: "antes", t: "Faltan " + dd + " días." };
    if (dd === 1) return { s: "antes", t: "Es mañana, a las 5:00 p.m." };
    if (min < EV_MIN) {
      var left = EV_MIN - min, hh = Math.floor(left / 60), mm = left % 60;
      return { s: "antes", t: "Es hoy, a las 5:00 p.m. Faltan " + (hh ? hh + " h " : "") + mm + " min." };
    }
    return { s: "antes", t: "Hoy es el Open House." };
  }
  function render() {
    var st = state();
    var isAfter = st.s === "despues";
    antes.hidden = isAfter; despues.hidden = !isAfter;
    section.classList.toggle("is-after", isAfter);
    if (!isAfter && st.t !== shown) {
      shown = st.t;
      if (wrote) CP.chalk(countEl, st.t); else countEl.textContent = st.t;
    }
  }
  render();
  CP.watch([countEl], 0.95, function () { wrote = true; if (!antes.hidden) CP.chalk(countEl, shown); });
  setInterval(render, 30000);

  /* Personas que vienen y mensaje */
  var n = 2, out = document.getElementById("cp-oh-n"), lbl = document.getElementById("cp-oh-lbl"), wa = document.getElementById("cp-oh-wa");
  function msg() { return "Hola Colegio CEPIA, quiero ir al Open House del jueves 29 de octubre a las 5:00 p.m. Somos " + n + (n === 1 ? " persona." : " personas."); }
  function paint() { out.textContent = n; lbl.textContent = n === 1 ? "persona" : "personas"; wa.href = CP.waUrl(msg()); }
  document.getElementById("cp-oh-minus").addEventListener("click", function () { n = Math.max(1, n - 1); paint(); });
  document.getElementById("cp-oh-plus").addEventListener("click", function () { n = Math.min(10, n + 1); paint(); });
  CP.bindWa(wa, msg);
  paint();
})();
