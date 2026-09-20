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
  var dia = $("#ki-dia"), hora = $("#ki-hora"), nombre = $("#ki-nombre"), hint = $(".ki-hint"), sumT = $(".ki-sum-t"), fb = $(".ki-fallback"), pagar = $("#ki-pagar");
  var PAGO = { efectivo: "Efectivo al recoger", tarjeta: "Tarjeta en línea" };

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
  function paintPago() {
    if (!pagar) return;
    var on = val("ki-pago") === "tarjeta" && window.LA_PAGO_LINK;
    pagar.hidden = !on;
    if (on) pagar.href = window.LA_PAGO_LINK;
  }
  function msg() {
    var r = calc(), s = SUC[val("ki-suc")];
    var t = "Hola, quiero apartar barbacoa para llevar en Los Arroyo (" + s.n + ").\n\n";
    t += "- " + cantTxt(r.cant) + " de " + r.tipo.n + (r.precio != null ? " (" + money(r.precio) + ")" : "") + "\n";
    if (x.consome) t += "- " + x.consome + (x.consome === 1 ? " litro" : " litros") + " de consomé (" + money(x.consome * CONSOME) + ")\n";
    if (x.tortillas) t += "- " + x.tortillas + (x.tortillas === 1 ? " docena" : " docenas") + " de tortillas a mano\n";
    t += "\nPago: " + (PAGO[val("ki-pago")] || PAGO.efectivo) + ".";
    t += "\nPaso a recoger el " + dia.value.toLowerCase() + " a las " + hora.value + ".";
    if (nombre.value.trim()) t += "\nA nombre de: " + nombre.value.trim();
    t += "\nEstimado: " + money(r.total) + (r.precio == null || x.tortillas ? " (más lo que me confirmen)" : "") + ". ¿Me lo confirman?";
    return { text: t, wa: s.wa };
  }

  form.addEventListener("change", function (e) {
    if (e.target.name === "ki-suc") fillDias();
    if (e.target.name === "ki-pago") paintPago();
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
  fillDias(); fillHoras(); paint(); paintPago();
})();

/* Caidita del precio "$740 el kilo para llevar": cae y pega con rebote muestreado, una vez, blindada.
   Misma receta que la cinta de closetdoor/sections/10-msi.js (resorte amortiguado por keyframes:
   amp * e^-decay*t * sin(turns*2*PI*t)), pero cayendo en vertical en vez de correr en horizontal. */
(function () {
  "use strict";
  var sec = document.getElementById("kilo");
  var tag = sec && sec.querySelector(".ki-ph figcaption");
  var flash = tag && tag.querySelector(".ki-flash"); // elemento aparte: no compite por "opacity" con la caída de figcaption
  var num = tag && tag.querySelector("b");
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!sec || !tag || reduce || !tag.animate || !("IntersectionObserver" in window)) return;
  sec.classList.add("ki-js");

  function spring(n, amp, turns, decay, fmt) {
    var k = [];
    for (var i = 0; i <= n; i++) {
      var t = i / n, v = i === n ? 0 : amp * Math.exp(-decay * t) * Math.sin(turns * Math.PI * 2 * t);
      k.push({ transform: fmt(v) });
    }
    return k;
  }

  var played = false;
  function play() {
    if (played) return; played = true;
    var h = tag.getBoundingClientRect().height || 40, start = -(h + 24);
    var ND = 14, NB = 20, total = ND + NB, frames = [], i, t, e, y;
    for (i = 0; i <= ND; i++) { // caída: acelera como gravedad (ease-in), llega con velocidad
      t = i / ND; e = t * t * t; y = start * (1 - e);
      frames.push({ transform: "translateY(" + y.toFixed(2) + "px)", opacity: i === 0 ? 0 : 1, offset: i / total });
    }
    var bounce = spring(NB, 12, 1.6, 4.3, function (v) { return v; }); // rebote muestreado (resorte amortiguado), en px sobre el reposo
    for (i = 1; i <= NB; i++) {
      y = bounce[i - 1].transform; // spring() ya devuelve { transform: v } con v numérico
      frames.push({ transform: "translateY(" + Number(y).toFixed(2) + "px)", opacity: 1, offset: (ND + i) / total });
    }
    sec.classList.add("ki-in");
    tag.animate(frames, { duration: 1100, easing: "linear" });
    if (flash) flash.animate(
      [{ opacity: 0 }, { opacity: 0.9, offset: 0.5 }, { opacity: 0 }],
      { duration: 620, delay: (ND / total) * 1100 - 30, easing: "cubic-bezier(.23,1,.32,1)" }
    );
    if (num) num.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.32)", offset: 0.3 }, { transform: "scale(0.96)", offset: 0.62 }, { transform: "scale(1)" }],
      { duration: 480, delay: (ND / total) * 1100 - 20, easing: "cubic-bezier(.23,1,.32,1)" }
    );
  }
  var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { play(); io.disconnect(); } }, { threshold: 0.5 });
  io.observe(tag);
  /* blindaje: si el observer nunca dispara (o se traba), a los 1.6 s el precio queda puesto */
  setTimeout(function () { sec.classList.add("ki-in"); }, 1600);
})();

/* Cortina guinda del hero a "Aparta tu kilo": dispara cada vez que #kilo cruza al asomar (reversible, no una sola vez). */
(function () {
  "use strict";
  var sec = document.getElementById("kilo");
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!sec || reduce || !("IntersectionObserver" in window)) return;
  var last = 0;
  var io = new IntersectionObserver(function (es) {
    if (!es[0].isIntersecting) return;
    var now = Date.now();
    if (now - last < 900) return;
    last = now;
    if (window.LM && typeof window.LM.curtain === "function") window.LM.curtain();
  }, { threshold: 0 });
  io.observe(sec);
})();
