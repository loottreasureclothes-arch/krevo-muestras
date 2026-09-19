/* 15 Aparta tu kilo: arma el mensaje de WhatsApp para la sucursal elegida.
   Precios: menú impreso 2025, columna "P/llevar". Solo se suma lo que tiene precio publicado;
   maciza y pancita solo traen precio por kilo; las tortillas no traen precio en el menú 2025. */
(function () {
  "use strict";
  var form = document.getElementById("ki-form");
  if (!form) return;
  var SUC = {
    "santa-anita": { n: "Santa Anita", wa: "524495542823", dias: [5, 6, 0] },
    "chicahuales": { n: "Chicahuales", wa: "524492310357", dias: [6, 0] },
    "poniente": { n: "López Mateos", wa: "524492310357", dias: [6] }
  };
  var TIPO = {
    barbacoa: { n: "barbacoa de borrego", kg: 740, frac: { "0.25": 185, "0.5": 370 } },
    maciza: { n: "barbacoa especial, pura maciza", kg: 770, frac: {} },
    pancita: { n: "pancita o montalayo", kg: 740, frac: {} }
  };
  var CONSOME = 100;
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var MES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  var x = { consome: 0, tortillas: 0 };
  var $ = function (s) { return form.querySelector(s); };
  var dia = $("#ki-dia"), hora = $("#ki-hora"), nombre = $("#ki-nombre"), hint = $(".ki-hint"), sumT = $(".ki-sum-t"), fb = $(".ki-fallback");

  function val(name) { var r = form.querySelector('input[name="' + name + '"]:checked'); return r ? r.value : ""; }
  function money(n) { return "$" + Math.round(n).toLocaleString("es-MX"); }
  function cantTxt(c) { return c === "0.25" ? "1/4 kg" : c === "0.5" ? "1/2 kg" : c + " kg"; }

  function mxNow() {
    try {
      var p = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Mexico_City", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()).split("-");
      return new Date(+p[0], +p[1] - 1, +p[2]);
    } catch (e) { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  }
  function fillDias() {
    var s = SUC[val("ki-suc")] || SUC["santa-anita"], keep = dia.value, out = [], d = mxNow();
    for (var i = 0; i < 21 && out.length < 4; i++) {
      var t = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
      if (s.dias.indexOf(t.getDay()) > -1) out.push(t);
    }
    dia.innerHTML = out.map(function (t) {
      var txt = DIAS[t.getDay()] + " " + t.getDate() + " " + MES[t.getMonth()];
      txt = txt.charAt(0).toUpperCase() + txt.slice(1);
      return '<option value="' + txt + '">' + txt + "</option>";
    }).join("");
    if (keep && dia.querySelector('option[value="' + keep + '"]')) dia.value = keep;
  }
  function fillHoras() {
    var h = [];
    for (var m = 8 * 60; m <= 16 * 60 + 30; m += 30) h.push(Math.floor(m / 60) + ":" + (m % 60 ? "30" : "00"));
    hora.innerHTML = h.map(function (t) { return '<option value="' + t + '"' + (t === "10:00" ? " selected" : "") + ">" + t + "</option>"; }).join("");
  }

  function calc() {
    var t = TIPO[val("ki-tipo")], c = val("ki-cant"), p = null;
    if (c === "0.25" || c === "0.5") p = t.frac[c] != null ? t.frac[c] : null;
    else p = t.kg * (+c);
    return { tipo: t, cant: c, precio: p, total: (p || 0) + x.consome * CONSOME };
  }
  function paint() {
    var r = calc();
    if (r.precio == null) { hint.hidden = false; hint.textContent = "El " + cantTxt(r.cant) + " de " + r.tipo.n + " no trae precio en el menú; la sucursal te lo confirma."; }
    else hint.hidden = true;
    var pend = [];
    if (r.precio == null) pend.push("barbacoa");
    if (x.tortillas) pend.push("tortillas");
    sumT.innerHTML = money(r.total) + (pend.length ? "<small>+ " + pend.join(" y ") + " por confirmar</small>" : "");
  }
  function msg() {
    var r = calc(), s = SUC[val("ki-suc")];
    var t = "Hola, quiero apartar barbacoa para llevar en Los Arroyo (" + s.n + ").\n\n";
    t += "- " + cantTxt(r.cant) + " de " + r.tipo.n + (r.precio != null ? " (" + money(r.precio) + ")" : "") + "\n";
    if (x.consome) t += "- " + x.consome + (x.consome === 1 ? " litro" : " litros") + " de consomé (" + money(x.consome * CONSOME) + ")\n";
    if (x.tortillas) t += "- " + x.tortillas + (x.tortillas === 1 ? " docena" : " docenas") + " de tortillas a mano\n";
    t += "\nPaso a recoger el " + dia.value.toLowerCase() + " a las " + hora.value + ".";
    if (nombre.value.trim()) t += "\nA nombre de: " + nombre.value.trim();
    t += "\nEstimado: " + money(r.total) + (r.precio == null || x.tortillas ? " (más lo que me confirmen)" : "") + ". ¿Me lo confirman?";
    return { text: t, wa: s.wa };
  }

  form.addEventListener("change", function (e) {
    if (e.target.name === "ki-suc") fillDias();
    paint();
  });
  Array.prototype.forEach.call(form.querySelectorAll(".ki-step-ctl"), function (ctl) {
    var k = ctl.getAttribute("data-x"), out = ctl.querySelector("output");
    ctl.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      x[k] = Math.max(0, Math.min(20, x[k] + (+b.getAttribute("data-d"))));
      out.textContent = x[k]; paint();
    });
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var m = msg(), url = "https://wa.me/" + m.wa + "?text=" + encodeURIComponent(m.text), w = null;
    fb.hidden = false; fb.querySelector("a").href = url;
    try { w = window.open(url, "_blank"); if (w) w.opener = null; } catch (er) { w = null; }
    if (!w) { try { location.href = url; } catch (er2) {} }
  });
  window.laKilo = { msg: msg };
  fillDias(); fillHoras(); paint();
})();
