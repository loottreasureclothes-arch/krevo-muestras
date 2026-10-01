/* LLENA EL VASO: cada dato llena un nivel. Evento = hielos; invitados = mitad; fecha = tres cuartos; lugar = lleno.
   Con los 4: escarchado del borde y pajilla. Si se borra un dato, baja. sessionStorage. */
(function () {
  "use strict";
  var KEY = "michevy_vaso_v1";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var MESES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var form = $("#vaso-form"), glass = $("#glass"), liq = $("#liq"), iceG = $("#ice"), sec = $("#vaso");
  if (!form || !glass) return;
  var NS = "http://www.w3.org/2000/svg";
  var state = { evento: "", eventoOtro: "", inv: null, fecha: "", lugar: "", colonia: "", nombre: "" };
  try { var s = JSON.parse(sessionStorage.getItem(KEY) || "null"); if (s && typeof s === "object") for (var k in state) if (k in s) state[k] = s[k]; } catch (e) {}
  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

  /* ---------- hielos (4 cubos translúcidos) ---------- */
  var cubes = [[66, 348], [100, 352], [136, 346], [86, 318]];
  cubes.forEach(function (c, i) {
    var g = document.createElementNS(NS, "g"); g.setAttribute("class", "cube"); g.dataset.x = c[0]; g.dataset.rest = c[1];
    var inn = document.createElementNS(NS, "g"); inn.setAttribute("class", "cube-in"); inn.style.setProperty("--k", i);
    var rot = [-9, 7, -4, 12][i];
    inn.innerHTML = '<g transform="rotate(' + rot + ' 16 16)">' +
      '<path d="M3 8 Q4 2 10 2 L25 3 Q30 4 30 10 L29 24 Q28 30 22 30 L8 29 Q2 28 2 22Z" fill="rgba(255,226,210,.13)" stroke="rgba(255,240,232,.38)" stroke-width="1"/>' +
      '<path d="M6 9 Q7 5 11 5 L22 6 Q17 9 15 15 L9 17 Q6 15 6 9Z" fill="rgba(255,255,255,.22)"/>' +
      '<path d="M26 11 L25.5 23 Q25 26 21 26.5 L13 26.5" fill="none" stroke="rgba(255,236,226,.16)" stroke-width="2.2" stroke-linecap="round"/>' +
      '<circle cx="10" cy="8.5" r="1.3" fill="rgba(255,255,255,.75)"/></g>';
    g.appendChild(inn); iceG.appendChild(g);
  });
  /* ---------- borde de chile: banda gruesa, grano irregular ---------- */
  (function () {
    var seed = 11; function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    var CX = 120, TOP = 66, RX = 88, RY = 12, T = 30, RXB = 86;
    var cols = ["#6A170E", "#7A1A10", "#8A2014", "#8E2216", "#9E2A1A", "#9E2A1A", "#A8301D", "#B3261E", "#B3261E", "#BA3A22", "#C4452A"];
    function grain(g, x, y, r, c) {
      var e = document.createElementNS(NS, rnd() < .55 ? "circle" : "rect");
      if (e.tagName === "circle") { e.setAttribute("cx", x.toFixed(1)); e.setAttribute("cy", y.toFixed(1)); e.setAttribute("r", r.toFixed(2)); }
      else { var s2 = r * 1.7; e.setAttribute("x", (x - s2 / 2).toFixed(1)); e.setAttribute("y", (y - s2 / 2).toFixed(1)); e.setAttribute("width", s2.toFixed(2)); e.setAttribute("height", (s2 * (.6 + rnd() * .7)).toFixed(2)); e.setAttribute("transform", "rotate(" + Math.round(rnd() * 180) + " " + x.toFixed(1) + " " + y.toFixed(1) + ")"); }
      e.setAttribute("fill", c); g.appendChild(e);
    }
    function pick() { var r = rnd(); if (r < .012) return "#D9A85A"; if (r < .02) return "#E3C99A"; if (r < .07) return "#CF5A30"; return cols[Math.floor(rnd() * cols.length)]; }
    /* borde de abajo irregular (chile que se pegó desigual) */
    var N = 48, drip = [], prev = 0;
    for (var i = 0; i <= N; i++) { prev = prev * .55 + rnd() * 9 * .45 + (rnd() < .12 ? rnd() * 7 : 0); drip.push(prev); }
    var d = "M" + (CX - RX) + " " + TOP;
    for (i = 0; i <= N; i++) { var th = Math.PI - Math.PI * i / N; d += " L" + (CX + RX * Math.cos(th)).toFixed(1) + " " + (TOP + RY * Math.sin(th)).toFixed(1); }
    for (i = N; i >= 0; i--) { th = Math.PI - Math.PI * i / N; d += " L" + (CX + RXB * Math.cos(th)).toFixed(1) + " " + (TOP + T + RY * Math.sin(th) + drip[i]).toFixed(1); }
    document.getElementById("rim-band").setAttribute("d", d + "Z");
    /* aro de arriba (labio del vaso, se ve atrás) */
    function ell(rx, ry) { return "M" + (CX - rx) + " " + TOP + " a" + rx + " " + ry + " 0 1 0 " + 2 * rx + " 0 a" + rx + " " + ry + " 0 1 0 " + (-2 * rx) + " 0Z"; }
    document.getElementById("rim-top").setAttribute("d", ell(RX, RY) + " " + ell(RX - 9, RY - 3));
    var front = document.getElementById("frost-front"), back = document.getElementById("frost-back");
    for (i = 0; i < 950; i++) {
      th = Math.acos(1 - 2 * rnd()); /* más grano hacia los lados, como el cilindro */
      var t = rnd(), k = Math.round((th / Math.PI) * N);
      var x = CX + (RX - (RX - RXB) * t) * Math.cos(th), y = TOP + RY * Math.sin(th) + t * (T + drip[N - k]) + (rnd() - .5) * 2;
      grain(front, x, y, .45 + Math.pow(rnd(), 2.2) * 1.9, pick());
    }
    for (i = 0; i < 26; i++) { th = .15 + rnd() * (Math.PI - .3); k = Math.round((th / Math.PI) * N); grain(front, CX + RXB * Math.cos(th), TOP + T + RY * Math.sin(th) + drip[N - k] + 2 + rnd() * 9, .5 + rnd() * .8, pick()); }
    for (i = 0; i < 300; i++) { th = Math.PI + rnd() * Math.PI; var rr = RX - rnd() * 9; grain(back, CX + rr * Math.cos(th), TOP + (RY - (RX - rr) / 3) * Math.sin(th), .45 + rnd() * 1.2, pick()); }
    /* pajilla enchilada: grano de chile encima */
    var sg = document.getElementById("straw-grain");
    for (i = 0; i < 420; i++) { var sx = 132.5 + rnd() * 15, sy = 6 + rnd() * 290; grain(sg, sx, sy, .4 + Math.pow(rnd(), 2) * 1.2, rnd() < .55 ? "#6E150F" : rnd() < .85 ? "#A8281D" : "#C2402A"); }
  })();

  /* ---------- lectura de controles ---------- */
  var radios = function (n) { return form.querySelectorAll('input[name="' + n + '"]'); };
  var inv = $("#inv"), fecha = $("#fecha"), colonia = $("#colonia"), nombre = $("#nombre"), otro = $("#evento-otro");
  var t = new Date(); fecha.min = t.getFullYear() + "-" + ("0" + (t.getMonth() + 1)).slice(-2) + "-" + ("0" + t.getDate()).slice(-2);

  function applyToControls() {
    Array.prototype.forEach.call(radios("evento"), function (r) { r.checked = r.value === state.evento; });
    Array.prototype.forEach.call(radios("lugar"), function (r) { r.checked = r.value === state.lugar; });
    if (state.inv != null) inv.value = state.inv;
    fecha.value = state.fecha || ""; colonia.value = state.colonia || ""; nombre.value = state.nombre || ""; otro.value = state.eventoOtro || "";
  }
  function checkedVal(n) { var r = form.querySelector('input[name="' + n + '"]:checked'); return r ? r.value : ""; }

  /* ---------- mensaje ---------- */
  function fmtFecha(iso) { var p = (iso || "").split("-"); if (p.length !== 3) return ""; return parseInt(p[2], 10) + " de " + MESES[parseInt(p[1], 10) - 1] + " de " + p[0]; }
  function eventoTxt() { return state.evento === "otro" ? (state.eventoOtro.trim() || "otro") : state.evento; }
  function invTxt() { return state.inv == null ? "" : (state.inv >= 300 ? "300 o más" : String(state.inv)); }
  function lugarTxt() {
    var c = state.colonia.trim();
    if (state.lugar && c) return state.lugar + ", " + c;
    return state.lugar || c;
  }
  function msg() {
    var parts = [];
    if (state.evento) parts.push("Evento: " + eventoTxt() + ".");
    if (state.inv != null) parts.push("Invitados: " + invTxt() + ".");
    if (state.fecha) parts.push("Fecha: " + fmtFecha(state.fecha) + ".");
    var l = lugarTxt(); if (l) parts.push("Lugar: " + l + ".");
    var n = state.nombre.trim();
    if (!parts.length && !n) return "Hola Mr. MICHEvy, quiero cotizar la barra de micheladas para un evento.";
    var out = "Hola Mr. MICHEvy, quiero cotizar la barra de micheladas. " + parts.join(" ");
    if (n) out += (parts.length ? " " : "") + "Mi nombre: " + n;
    else out = out.replace(/\s+$/, "");
    return out;
  }

  /* ---------- resumen que se escribe solo ---------- */
  var timers = {};
  function typeInto(dd, text) {
    var key = dd.getAttribute("data-r");
    if (dd.dataset.full === text) return;
    dd.dataset.full = text; clearInterval(timers[key]);
    if (!text) { dd.textContent = dd.getAttribute("data-ph") || ""; dd.classList.add("is-empty"); return; }
    dd.classList.remove("is-empty");
    if (reduce) { dd.textContent = text; return; }
    var i = 0; dd.textContent = "";
    timers[key] = setInterval(function () { i++; dd.textContent = text.slice(0, i); if (i >= text.length) clearInterval(timers[key]); }, 22);
  }
  function renderResumen(root) {
    var vals = { evento: eventoTxt(), invitados: state.inv == null ? "" : invTxt() + (state.inv == null ? "" : " invitados"), fecha: fmtFecha(state.fecha), lugar: lugarTxt(), nombre: state.nombre.trim() };
    Array.prototype.forEach.call((root || document).querySelectorAll("[data-r]"), function (dd) { typeInto(dd, vals[dd.getAttribute("data-r")] || ""); });
  }

  /* ---------- el vaso ---------- */
  var LOW = 384, HIGH = 90;
  function level() { return (state.inv != null ? .5 : 0) + (state.fecha ? .25 : 0) + (state.lugar ? .19 : 0); }
  function complete() { return !!(state.evento && state.inv != null && state.fecha && state.lugar); }
  function renderGlass() {
    var L = level(), surface = LOW - L * (LOW - HIGH);
    liq.style.setProperty("--y", surface.toFixed(1));
    Array.prototype.forEach.call(iceG.querySelectorAll(".cube"), function (c, i) {
      var rest = +c.dataset.rest, float = surface - 14 + i * 8, y = Math.min(rest, float);
      c.style.transform = "translate(" + c.dataset.x + "px," + y.toFixed(1) + "px)";
    });
    glass.classList.toggle("has-ice", !!state.evento);
    glass.classList.toggle("is-full", complete());
  }
  function missing() {
    var m = [];
    if (!state.evento) m.push("evento"); if (state.inv == null) m.push("invitados"); if (!state.fecha) m.push("fecha"); if (!state.lugar) m.push("lugar");
    return m;
  }
  function renderStatus() {
    var st = $("#vaso-status"), m = missing();
    if (!m.length) st.textContent = "Vaso lleno. Listo para cotizar.";
    else if (m.length === 4) st.textContent = "Contesta lo que quieras: con cada dato el vaso se llena.";
    else st.textContent = "Falta: " + m.join(", ") + ". Puedes cotizar con lo que ya llenaste.";
    sec.classList.toggle("is-full", !m.length);
  }
  function renderSteps() {
    var done = { evento: !!state.evento, invitados: state.inv != null, fecha: !!state.fecha, lugar: !!state.lugar };
    Array.prototype.forEach.call(form.querySelectorAll(".step[data-step]"), function (s) {
      var k = s.getAttribute("data-step"), d = !!done[k];
      s.classList.toggle("is-done", d);
      var b = s.querySelector(".step-clear"); if (b) b.hidden = !d;
    });
    var box = $(".inv"); box.classList.toggle("is-set", state.inv != null);
    var cur = +inv.value;
    $("#inv-num").textContent = cur >= 300 ? "300 o más" : cur;
    $("#inv-lbl").textContent = state.inv == null ? "mueve el deslizador" : (cur >= 300 ? "" : "invitados");
    var pct = ((+inv.value - 30) / 270) * 100; inv.style.setProperty("--pct", (state.inv == null ? 0 : pct) + "%");
    otro.hidden = state.evento !== "otro";
  }
  var listeners = [];
  function render() {
    renderSteps(); renderGlass(); renderStatus(); renderResumen(document.getElementById("resumen"));
    var wa = $("#vaso-wa"); if (wa) wa.href = window.MVwaUrl ? window.MVwaUrl(msg()) : wa.href;
    listeners.forEach(function (f) { try { f(); } catch (e) {} });
  }
  function read(commit) {
    state.evento = checkedVal("evento"); state.eventoOtro = otro.value; state.lugar = checkedVal("lugar");
    state.fecha = fecha.value; state.colonia = colonia.value; state.nombre = nombre.value;
    save(); render();
  }

  /* ---------- eventos ---------- */
  form.addEventListener("pointerdown", function (e) {
    var chip = e.target.closest && e.target.closest(".chip");
    if (chip) { var i = chip.querySelector("input"); i.dataset.was = i.checked ? "1" : ""; }
  });
  form.addEventListener("click", function (e) {
    var i = e.target;
    if (i.matches && i.matches(".chip input") && i.dataset.was === "1") { i.checked = false; i.dataset.was = ""; }
    if (i.classList && i.classList.contains("step-clear")) clearStep(i.closest(".step").getAttribute("data-step"));
    if (i.matches && i.matches(".chip input")) read();
  });
  form.addEventListener("change", function (e) { if (e.target.matches(".chip input, #fecha")) read(); });
  form.addEventListener("input", function (e) {
    if (e.target === inv) { state.inv = +inv.value; read(); }
    else if (e.target.matches("#fecha, #colonia, #nombre, #evento-otro")) read();
  });
  function markInv() { if (state.inv == null) { state.inv = +inv.value; read(); } }
  inv.addEventListener("pointerup", markInv); inv.addEventListener("keyup", markInv); inv.addEventListener("change", markInv);
  function clearStep(k) {
    if (k === "evento") { state.evento = ""; state.eventoOtro = ""; }
    if (k === "invitados") { state.inv = null; inv.value = 120; }
    if (k === "fecha") state.fecha = "";
    if (k === "lugar") { state.lugar = ""; state.colonia = ""; }
    applyToControls(); save(); render();
  }

  /* ---------- API para el cierre y para el boton de WhatsApp ---------- */
  window.MV = {
    vasoMsg: msg,
    get: function () { return { complete: complete(), missing: missing(), evento: eventoTxt(), invitados: state.inv == null ? "" : invTxt() + " invitados", fecha: fmtFecha(state.fecha), lugar: lugarTxt(), nombre: state.nombre.trim() }; },
    on: function (f) { listeners.push(f); }
  };
  applyToControls(); render();
  if (window.MVrefreshWa) window.MVrefreshWa();
})();
