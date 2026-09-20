/* 60 Reserva: arma el mensaje y abre WhatsApp (524494384900). Horas según sucursal (Colosio cierra 1 am, Américas 2 am). */
(function () {
  "use strict";
  var form = document.getElementById("rs-form");
  if (!form) return;
  var state = { sucursal: "Colosio", ocasion: "" };
  var hora = form.elements.hora, dia = form.elements.dia, pers = form.elements.personas;
  var err = form.querySelector(".rs-err"), fb = form.querySelector(".rs-fallback"), bday = form.querySelector(".rs-bday");
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function fmt(h, m) { var ap = h >= 12 && h < 24 ? "pm" : "am", hh = h % 12 || 12; return hh + ":" + pad(m) + " " + ap; }
  function fillHours() {
    var end = state.sucursal === "Américas" ? 25 : 24, prev = hora.value; /* última mesa 1 h antes del cierre */
    hora.innerHTML = '<option value="" disabled selected>¿A qué hora?</option>';
    for (var h = 13; h <= end; h++) for (var m = 0; m < 60; m += 30) {
      if (h === end && m > 0) break;
      var o = document.createElement("option"), label = fmt(h % 24, m);
      o.value = label; o.textContent = h >= 24 ? label + " (madrugada)" : label;
      if (h >= 24) o.setAttribute("data-late", "1");
      hora.appendChild(o);
    }
    if (prev) hora.value = prev;
  }
  var now = new Date();
  dia.min = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());
  dia.value = dia.min;
  fillHours();
  Array.prototype.forEach.call(form.querySelectorAll(".rs-chips"), function (g) {
    var name = g.getAttribute("data-name");
    g.addEventListener("click", function (e) {
      var b = e.target.closest(".dp-chip"); if (!b) return;
      var was = b.getAttribute("aria-pressed") === "true";
      Array.prototype.forEach.call(g.children, function (c) { c.setAttribute("aria-pressed", "false"); });
      if (name === "ocasion" && was) { state.ocasion = ""; }
      else { b.setAttribute("aria-pressed", "true"); state[name] = b.getAttribute("data-v"); }
      if (name === "sucursal") fillHours();
      bday.hidden = state.ocasion !== "Cumpleaños";
      if (state.ocasion === "Sábado de música en vivo") nextSat();
    });
  });
  function nextSat() {
    var d = new Date(); var add = (6 - d.getDay() + 7) % 7; d.setDate(d.getDate() + add);
    dia.value = d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }
  form.addEventListener("click", function (e) {
    var b = e.target.closest(".rs-step-b"); if (!b) return;
    var v = Math.max(1, Math.min(60, (parseInt(pers.value, 10) || 0) + +b.getAttribute("data-step")));
    pers.value = v;
  });
  function bonita(iso, plus) {
    var p = iso.split("-"); var d = new Date(+p[0], +p[1] - 1, +p[2] + (plus || 0));
    try { return d.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" }); } catch (e) { return iso; }
  }
  /* Después de medianoche: "noche del sábado 19, 1:00 am (ya domingo 20)" para que no se lea como la madrugada ANTES del sábado */
  function cuando() {
    var o = hora.options[hora.selectedIndex], late = o && o.getAttribute("data-late") === "1";
    if (!late) return "Día: " + bonita(dia.value) + "\nHora: " + hora.value;
    return "Día: noche del " + bonita(dia.value) + "\nHora: " + hora.value + " (ya de madrugada, " + bonita(dia.value, 1) + ")";
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nombre = form.elements.nombre.value.trim();
    var ok = !!(dia.value && hora.value && nombre);
    [["dia", dia.value], ["hora", hora.value], ["nombre", nombre]].forEach(function (x) {
      form.elements[x[0]].closest(".dp-field").classList.toggle("is-bad", !x[1]);
    });
    err.hidden = ok;
    if (!ok) return;
    var msg = "Hola, quiero reservar una mesa en La México Gran Cantina (" + state.sucursal + ").\n" +
      "Nombre: " + nombre + "\nPersonas: " + (parseInt(pers.value, 10) || 1) + "\n" +
      cuando() +
      (state.ocasion ? "\nOcasión: " + state.ocasion : "");
    var url = window.DP ? DP.openWa(msg) : "https://wa.me/524494384900?text=" + encodeURIComponent(msg);
    if (!window.DP) window.open(url, "_blank");
    var a = fb.querySelector("a"); a.href = url; a.target = "_blank"; a.rel = "noopener"; fb.hidden = false;
  });
  form.addEventListener("input", function (e) { var f = e.target.closest(".dp-field"); if (f) f.classList.remove("is-bad"); });
})();
