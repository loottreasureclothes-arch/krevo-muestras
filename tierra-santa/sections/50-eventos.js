/* 50 · Eventos: arma el mensaje de cotización por WhatsApp. */
(function () {
  "use strict";
  var sec = document.getElementById("eventos");
  if (!sec) return;
  var f = sec.querySelector(".evt-form"), err = sec.querySelector(".evt-err"), fb = sec.querySelector(".evt-fb");
  if (window.TS) TS.reveal(sec.querySelector(".evt-media img[data-blur]"), "is-blur-in");
  try { var d = new Date(); f.fecha.min = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); } catch (e) {}
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    var bad = [];
    ["fecha", "personas"].forEach(function (n) { var ok = !!f[n].value.trim(); f[n].parentNode.classList.toggle("is-bad", !ok); if (!ok) bad.push(f[n]); });
    err.hidden = !bad.length;
    if (bad.length) { bad[0].focus(); return; }
    var t = "Hola, quiero cotizar un evento en Tierra Santa.\n";
    t += "Evento: " + f.tipo.value + "\n";
    t += "Fecha: " + f.fecha.value + "\n";
    t += "Personas: " + f.personas.value;
    if (f.nombre.value.trim()) t += "\nNombre: " + f.nombre.value.trim();
    t += "\n¿Qué opciones tienen?";
    if (window.TS) TS.openWa(t, fb);
  });
  f.addEventListener("input", function (e) { if (e.target.parentNode) e.target.parentNode.classList.remove("is-bad"); });
})();
