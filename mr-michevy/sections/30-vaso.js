/* LLENA EL VASO: cada dato llena un nivel. Evento = hielos; invitados = mitad; fecha = tres cuartos; lugar = lleno.
   Con los 4: escarchado del borde y pajilla. Si se borra un dato, baja. sessionStorage. */
(function () {
  "use strict";
  var KEY = "michevy_vaso_v1";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var MESES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var form = $("#vaso-form"), glass = $("#glass"), liq = $("#liq"), iceG = $("#ice"), frostG = $("#frost"), sec = $("#vaso");
  if (!form || !glass) return;
  var NS = "http://www.w3.org/2000/svg";
  var state = { evento: "", eventoOtro: "", inv: null, fecha: "", lugar: "", colonia: "", nombre: "" };
  try { var s = JSON.parse(sessionStorage.getItem(KEY) || "null"); if (s && typeof s === "object") for (var k in state) if (k in s) state[k] = s[k]; } catch (e) {}
  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

  /* ---------- hielos (4 cubos) ---------- */
  var cubes = [[78, 370], [118, 376], [150, 366], [98, 336]];
  cubes.forEach(function (c, i) {
    var g = document.createElementNS(NS, "g"); g.setAttribute("class", "cube"); g.dataset.x = c[0]; g.dataset.rest = c[1];
    var inn = document.createElementNS(NS, "g"); inn.setAttribute("class", "cube-in"); inn.style.setProperty("--k", i);
    var rot = [-8, 6, -4, 10][i];
    inn.innerHTML = '<g transform="rotate(' + rot + ' 18 18)"><rect x="0" y="0" width="36" height="36" rx="6"/><path d="M7 9 q5 -3 10 -2"/></g>';
    g.appendChild(inn); iceG.appendChild(g);
  });
  /* ---------- granitos de chile del borde ---------- */
  (function () {
    var seed = 7; function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    for (var i = 0; i < 70; i++) {
      var th = rnd() * Math.PI * 2, jitter = (rnd() - .5) * 9;
      var x = 120 + (84 + jitter * .6) * Math.cos(th), y = 58 + (11 + jitter * .5) * Math.sin(th) + (rnd() - .35) * 4;
      var c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", x.toFixed(1)); c.setAttribute("cy", y.toFixed(1)); c.setAttribute("r", (0.9 + rnd() * 2.3).toFixed(1));
      c.setAttribute("fill", rnd() < .25 ? "#8E1B15" : rnd() < .7 ? "#B3261E" : "#C93A2C");
      c.style.setProperty("--d", (((x - 36) / 168) * 0.45).toFixed(2) + "s");
      frostG.appendChild(c);
    }
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
  var LOW = 444, HIGH = 74;
  function level() { return (state.inv != null ? .5 : 0) + (state.fecha ? .25 : 0) + (state.lugar ? .19 : 0); }
  function complete() { return !!(state.evento && state.inv != null && state.fecha && state.lugar); }
  function renderGlass() {
    var L = level(), surface = LOW - L * (LOW - HIGH);
    liq.style.setProperty("--y", surface.toFixed(1));
    Array.prototype.forEach.call(iceG.querySelectorAll(".cube"), function (c, i) {
      var rest = +c.dataset.rest, float = surface - 16 + i * 9, y = Math.min(rest, float);
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
