/* Ficha de cita: tono, servicio, cuando, nombre -> mensaje de WhatsApp. Estado en vivo del salon. */
(function () {
  "use strict";
  var MR = window.MR; if (!MR) return;
  var root = document.getElementById("cita"); if (!root) return;
  var tiles = Array.prototype.slice.call(root.querySelectorAll(".mr-tile"));
  var readT = document.getElementById("mr-read-tono"), mini2 = document.getElementById("mr-mini2");
  var wa = document.getElementById("mr-wa-cita"), prev = document.getElementById("mr-preview");
  var nombre = document.getElementById("mr-nombre"), fecha = document.getElementById("mr-fecha"), fechaI = document.getElementById("mr-fecha-i");
  var state = { servicio: "", cuando: "", nombre: "" };
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

  /* tile "sin elegir" */
  var grid = document.getElementById("mr-tiles");
  var none = document.createElement("button");
  none.type = "button"; none.className = "mr-tile mr-tile--none"; none.setAttribute("aria-pressed", "false"); none.setAttribute("aria-label", "Sin elegir tono, que me asesore"); none.textContent = "Sin elegir";
  grid.appendChild(none);
  none.addEventListener("click", function () { MR.clear && MR.clear(); });

  function fechaTxt() {
    if (!fechaI.value) return "";
    var p = fechaI.value.split("-"); if (p.length !== 3) return "";
    return parseInt(p[2], 10) + " de " + MESES[parseInt(p[1], 10) - 1];
  }
  function ficha() {
    var c = state.cuando;
    if (c === "Tengo un evento") { var f = fechaTxt(); c = f ? "Tengo un evento el " + f : "Tengo un evento"; }
    return { servicio: state.servicio, cuando: c, nombre: (state.nombre || "").trim() };
  }
  MR.ficha = ficha;
  function refresh() {
    var t = MR.tone();
    readT.textContent = t ? t.name : "Sin elegir, asesórame";
    if (t) { mini2.style.setProperty("--r", t.r); mini2.style.setProperty("--m", t.m); mini2.style.setProperty("--t", t.t); }
    else { mini2.style.setProperty("--r", "#4A2C1F"); mini2.style.setProperty("--m", "#8E6A48"); mini2.style.setProperty("--t", "#D9B27A"); }
    tiles.forEach(function (b) { var i = parseInt(b.getAttribute("data-i"), 10); b.setAttribute("aria-pressed", t && MR.sel === i ? "true" : "false"); });
    none.setAttribute("aria-pressed", t ? "false" : "true");
    var m = MR.msg(ficha());
    prev.textContent = m;
    wa.setAttribute("data-wa", m);
    wa.href = MR.waUrl(m);
  }
  /* el href real se confirma justo antes de abrir (sin preventDefault, sin window.open) */
  ["pointerdown", "click", "touchstart", "focus"].forEach(function (ev) { wa.addEventListener(ev, function () { wa.href = MR.waUrl(MR.msg(ficha())); }, { passive: true }); });

  tiles.forEach(function (b) { b.addEventListener("click", function () { MR.pick(parseInt(b.getAttribute("data-i"), 10), false); }); });
  MR.onTono(refresh);

  function group(id, key) {
    var btns = Array.prototype.slice.call(document.querySelectorAll("#" + id + " .mr-ficha-b"));
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        var v = b.getAttribute("data-v"), on = b.getAttribute("aria-pressed") !== "true";
        btns.forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        if (on) { b.setAttribute("aria-pressed", "true"); state[key] = v; } else state[key] = "";
        if (key === "cuando") fecha.hidden = state.cuando !== "Tengo un evento";
        refresh();
      });
    });
  }
  group("mr-f-serv", "servicio"); group("mr-f-cuando", "cuando");
  nombre.addEventListener("input", function () { state.nombre = nombre.value; refresh(); });
  fechaI.addEventListener("input", refresh); fechaI.addEventListener("change", refresh);

  /* ---------- estado en vivo (hora de Aguascalientes) ---------- */
  var est = document.getElementById("mr-estado"), estT = document.getElementById("mr-estado-t");
  function ahora() {
    try {
      var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
      var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
      var d = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
      var h = parseInt(o.hour, 10) % 24, m = parseInt(o.minute, 10);
      return { d: d, mins: h * 60 + m };
    } catch (e) { return null; }
  }
  function estado() {
    var n = ahora(); if (!n) return;
    var txt = "", open = false, show = true;
    if (n.d >= 2 && n.d <= 5) {
      if (n.mins >= 600 && n.mins < 1140) { open = true; txt = "Abierto ahora. Cierra a las 19:00."; }
      else if (n.mins < 600) txt = "Cerrado ahora. Abre hoy a las 10:00.";
      else if (n.d < 5) txt = "Cerrado ahora. Abre mañana a las 10:00.";
      else txt = "Cerrado ahora. Sábado: pregunta el horario.";
    } else if (n.d === 6) { show = false; }
    else txt = "Cerrado hoy. Abre el martes a las 10:00.";
    if (!show) { est.hidden = true; return; }
    est.hidden = false; est.classList.toggle("is-open", open); estT.textContent = txt;
  }
  estado(); setInterval(estado, 60000);

  refresh();
})();
