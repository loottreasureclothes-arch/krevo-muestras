/* 30-dia — los próximos 7 días (los domingos salen apagados: está cerrado), las horas
   de 10 am a 7 pm y el resumen que arma el mensaje de WhatsApp. */
(function () {
  "use strict";
  function init() {
    var Cita = window.AlmCita;
    var tira = document.getElementById("al-tira"), cajaHoras = document.getElementById("al-horas");
    if (!Cita || !tira || !cajaHoras) return;
    var DIAS = window.AlmDias, MESES = window.AlmMeses;
    var CORTOS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
    var MCORTOS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

    /* ---- los próximos 7 días ---- */
    var hoy = new Date(); hoy.setHours(0, 0, 0, 0);
    var dias = [];
    for (var i = 0; i < 7; i++) {
      var d = new Date(hoy.getTime() + i * 86400000);
      dias.push({
        iso: d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2),
        dow: d.getDay(),
        corto: CORTOS[d.getDay()] + " " + d.getDate(),
        largo: DIAS[d.getDay()] + " " + d.getDate() + " de " + MESES[d.getMonth()],
        num: d.getDate(),
        mes: MCORTOS[d.getMonth()],
        hoy: i === 0
      });
    }
    tira.innerHTML = "";
    dias.forEach(function (dd) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "al-dia-chip";
      b.setAttribute("data-iso", dd.iso);
      b.innerHTML = "<small></small><b></b><i></i>";
      b.querySelector("small").textContent = dd.hoy ? "hoy" : CORTOS[dd.dow];
      b.querySelector("b").textContent = dd.num;
      b.querySelector("i").textContent = dd.mes;
      if (dd.dow === 0) {
        b.disabled = true;
        b.setAttribute("aria-label", DIAS[0] + " " + dd.num + " de " + dd.mes + ": cerrado");
        b.title = "Domingo: cerrado";
      } else {
        b.setAttribute("aria-pressed", "false");
        b.setAttribute("aria-label", dd.largo);
        b.addEventListener("click", function () { Cita.setDia({ iso: dd.iso, corto: dd.corto, largo: dd.largo }); });
      }
      tira.appendChild(b);
    });

    /* ---- horas de 10 am a 7 pm ---- */
    var horas = [];
    for (var h = 10; h <= 19; h++) horas.push(h < 12 ? h + ":00 am" : (h === 12 ? "12:00 pm" : (h - 12) + ":00 pm"));
    horas.push("Me da igual la hora");
    cajaHoras.innerHTML = "";
    horas.forEach(function (txt) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "al-hora"; b.textContent = txt;
      b.setAttribute("aria-pressed", "false");
      b.setAttribute("data-hora", txt);
      b.addEventListener("click", function () { Cita.setHora(Cita.get().hora === txt ? null : txt); });
      cajaHoras.appendChild(b);
    });

    /* ---- resumen ---- */
    var lista = document.getElementById("al-res-lista"),
      vacia = document.getElementById("al-res-vacia"),
      cuando = document.getElementById("al-res-cuando"),
      tot = document.getElementById("al-res-tot"),
      cot = document.getElementById("al-res-cot"),
      wa = document.getElementById("al-res-wa");

    function pinta() {
      var r = Cita.get();
      lista.innerHTML = "";
      r.items.forEach(function (it) {
        var li = document.createElement("li");
        var b = document.createElement("button");
        b.type = "button"; b.setAttribute("aria-label", "Quitar " + it.nombre);
        b.innerHTML = '<svg aria-hidden="true"><use href="#i-cerrar"/></svg>';
        b.addEventListener("click", function () { Cita.quitar(it.id); });
        var s = document.createElement("span"); s.textContent = it.nombre;
        var p = document.createElement("b"); p.textContent = typeof it.precio === "number" ? Cita.pesos(it.precio) : "Pregunta el precio";
        if (typeof it.precio !== "number") p.className = "es-texto";
        li.appendChild(b); li.appendChild(s); li.appendChild(p);
        lista.appendChild(li);
      });
      vacia.hidden = r.items.length > 0;
      window.AlmPintaTotal(tot);
      cot.hidden = !r.sinPrecio;
      cot.textContent = "Sin precio publicado: " + Cita.sinPrecioNombres().join(", ") + ".";
      cuando.innerHTML = "";
      if (r.dia || r.hora) {
        cuando.appendChild(document.createTextNode("Día y hora: "));
        var b2 = document.createElement("b");
        b2.textContent = (r.dia ? r.dia.largo : "el que tengan") + (r.hora ? " · " + r.hora : "");
        cuando.appendChild(b2);
      } else cuando.textContent = "Día y hora: por definir";
      Array.prototype.forEach.call(tira.querySelectorAll(".al-dia-chip[data-iso]"), function (b3) {
        if (b3.disabled) return;
        b3.setAttribute("aria-pressed", r.dia && r.dia.iso === b3.getAttribute("data-iso") ? "true" : "false");
      });
      Array.prototype.forEach.call(cajaHoras.querySelectorAll(".al-hora"), function (b4) {
        b4.setAttribute("aria-pressed", r.hora === b4.getAttribute("data-hora") ? "true" : "false");
      });
      wa.href = Cita.url();
      wa.setAttribute("data-al-wa", Cita.mensaje());
    }
    window.addEventListener("alm:cita", pinta);
    pinta();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
