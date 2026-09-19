/* 40 Banquetes: arma el mensaje y abre WhatsApp de Chicahuales (la lona de "Banquetes y servicio a domicilio" trae ese número). */
(function () {
  "use strict";
  var f = document.getElementById("bq-form");
  if (!f) return;
  var WA = "524492310357";
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    var fecha = f.querySelector("#bq-fecha").value, per = f.querySelector("#bq-personas").value.trim(), lugar = f.querySelector("#bq-lugar").value.trim();
    var pl = Array.prototype.map.call(f.querySelectorAll(".bq-pl input:checked"), function (i) { return i.value; });
    var fd = "";
    if (fecha) { var p = fecha.split("-"); fd = p[2] + "/" + p[1] + "/" + p[0]; }
    var t = "Hola, quiero cotizar un banquete con Los Arroyo.";
    if (fd) t += "\nFecha: " + fd;
    if (per) t += "\nPersonas: " + per;
    if (lugar) t += "\nLugar: " + lugar;
    if (pl.length) t += "\nMe gustaría: " + pl.join(", ");
    t += "\n¿Me pasan precio y disponibilidad?";
    var url = "https://wa.me/" + WA + "?text=" + encodeURIComponent(t), w = null;
    var fb = f.querySelector(".bq-fallback"); fb.hidden = false; fb.querySelector("a").href = url;
    try { w = window.open(url, "_blank"); if (w) w.opener = null; } catch (er) { w = null; }
    if (!w) { try { location.href = url; } catch (er2) {} }
  });
})();
