/* 25 · Reserva: arma el mensaje de WhatsApp con los datos; [data-zona] en otros botones preselecciona la zona. */
(function () {
  "use strict";
  var sec = document.getElementById("reserva");
  if (!sec) return;
  var f = sec.querySelector(".rsv-form"), err = sec.querySelector(".rsv-err"), fb = sec.querySelector(".rsv-fb");
  if (window.TS) TS.reveal(sec.querySelector(".rsv-ph img[data-blur]"), "is-blur-in");
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  function hoy() { var d = new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  f.fecha.min = hoy();
  function bonita(v) { var p = v.split("-"); if (p.length !== 3) return v; var d = new Date(+p[0], +p[1] - 1, +p[2]); return DIAS[d.getDay()] + " " + (+p[2]) + " de " + MESES[+p[1] - 1]; }
  function msg() {
    var oc = (f.querySelector('input[name="ocasion"]:checked') || {}).value || "";
    var t = "Hola, quiero reservar una mesa en Tierra Santa.\n";
    t += "Nombre: " + f.nombre.value.trim() + "\n";
    t += "Fecha: " + bonita(f.fecha.value) + "\n";
    t += "Hora: " + f.hora.value + "\n";
    t += "Personas: " + f.personas.value + "\n";
    t += "Zona: " + f.zona.value;
    if (oc) t += "\nOcasión: " + oc;
    return t;
  }
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    var bad = [];
    ["fecha", "hora", "nombre"].forEach(function (n) { var ok = !!f[n].value.trim(); f[n].parentNode.classList.toggle("is-bad", !ok); if (!ok) bad.push(f[n]); });
    if (!f.personas.value) bad.push(f.personas);
    err.hidden = !bad.length;
    if (bad.length) { bad[0].focus(); return; }
    if (window.TS) TS.openWa(msg(), fb);
  });
  f.addEventListener("input", function (e) { if (e.target.parentNode) e.target.parentNode.classList.remove("is-bad"); });
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-zona]");
    if (!a) return;
    var z = a.getAttribute("data-zona");
    Array.prototype.forEach.call(f.zona.options, function (o) { if (o.text === z) f.zona.value = o.value; });
  }, true);
})();
