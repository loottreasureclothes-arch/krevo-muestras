/* 30 · La sala: estado del boleto (día de la programación semanal, fecha, lugares, nombre), plano y mensaje de WhatsApp.
   Las fichas son la PROGRAMACIÓN SEMANAL real (research/hechos.md). La fecha de cada ficha es la próxima de ese día,
   calculada con la fecha real del visitante: hoy cuenta solo antes de abrir (16:00). Nunca se pide una fecha pasada.
   Guarda en localStorage "ep_boleto". Emite "epica:boleto" y "epica:funcion". */
(function () {
  "use strict";
  var DIAS = {
    mie: { wd: 3, corto: "MIÉ", nombre: "Stand-up", msg: "el stand-up" },
    jue: { wd: 4, corto: "JUE", nombre: "Teatro experimental y arte urbano", msg: "el teatro experimental y arte urbano" },
    vie: { wd: 5, corto: "VIE", nombre: "Teatro", msg: "el teatro" },
    sab: { wd: 6, corto: "SÁB", nombre: "Teatro", msg: "el teatro" },
    dom: { wd: 0, corto: "DOM", nombre: "Teatro infantil y música", msg: "el teatro infantil y música" }
  };
  var MES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  /* Corrección 2: la función de HOY se puede apartar mientras no empiece: mié a dom antes de las 20:30
     (corte solo de la interfaz; el equipo confirma por WhatsApp si aún quedan lugares). */
  var CORTE = 20 * 60 + 30;
  var KEY = "ep_boleto";

  function pad(n) { return ("0" + n).slice(-2); }
  function isoOf(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function fromIso(s) { var p = String(s).split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function todayIso() { return isoOf(new Date()); }
  /* próximas fechas de ese día de la semana; hoy cuenta solo antes de abrir */
  function proximas(dia, cuantas) {
    var D = DIAS[dia], now = new Date(), d = new Date(now.getFullYear(), now.getMonth(), now.getDate()), out = [];
    var add = (D.wd - d.getDay() + 7) % 7;
    if (add === 0 && now.getHours() * 60 + now.getMinutes() >= CORTE) add = 7;
    d.setDate(d.getDate() + add);
    for (var i = 0; i < cuantas; i++) { out.push(isoOf(d)); d.setDate(d.getDate() + 7); }
    return out;
  }
  function valida(dia, iso) {
    if (!DIAS[dia] || !/^\d{4}-\d{2}-\d{2}$/.test(iso || "")) return false;
    return fromIso(iso).getDay() === DIAS[dia].wd && iso >= proximas(dia, 1)[0];
  }
  function etiqueta(iso, dia) { var d = fromIso(iso); return (iso === todayIso() ? "HOY · " : "") + DIAS[dia].corto + " " + d.getDate() + " " + MES[d.getMonth()].toUpperCase(); }
  function enMsg(iso, dia) { var d = fromIso(iso); return (iso === todayIso() ? "hoy " : "") + DIAS[dia].corto.toLowerCase() + " " + d.getDate() + " " + MES[d.getMonth()]; }

  var state = { dia: "", iso: "", seats: [], name: "" };
  try {
    var s = JSON.parse(localStorage.getItem(KEY) || "null");
    if (s && typeof s === "object") {
      if (s.dia && DIAS[s.dia]) { state.dia = s.dia; state.iso = valida(s.dia, s.iso) ? s.iso : proximas(s.dia, 1)[0]; }
      if (Array.isArray(s.seats)) state.seats = s.seats.filter(function (x) { return /^[A-E]\d{1,2}$/.test(x); });
      if (typeof s.name === "string") state.name = s.name.slice(0, 40);
    }
  } catch (e) {}
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function emit(name, detail) {
    try { window.dispatchEvent(new CustomEvent(name, { detail: detail })); }
    catch (e) { var ev = document.createEvent("CustomEvent"); ev.initCustomEvent(name, false, false, detail); window.dispatchEvent(ev); }
  }
  function cur() {
    var D = DIAS[state.dia];
    if (!D) return null;
    if (!valida(state.dia, state.iso)) state.iso = proximas(state.dia, 1)[0];
    return { dia: state.dia, sh: { nombre: D.nombre, corto: D.corto }, f: { l: etiqueta(state.iso, state.dia), iso: state.iso, msg: enMsg(state.iso, state.dia) } };
  }

  function message() {
    var n = state.seats.length, c = cur();
    var m = "Hola Épica, quiero apartar " + (n ? n + (n === 1 ? " lugar" : " lugares") : "lugares");
    if (c) m += " para " + DIAS[c.dia].msg + (c.f.iso === todayIso() ? " de " : " del ") + c.f.msg;
    m += ".";
    if (n) m += " Lugares de referencia: " + state.seats.join(", ") + ".";
    if (state.name.trim()) m += " Nombre: " + state.name.trim();
    if (!c) m += " ¿Qué funciones tienen esta semana?";
    return m;
  }
  window.EpBoleto = { get: function () { return state; }, dias: DIAS, message: message, current: cur, setDia: function (d, iso) { setDia(d, iso); } };

  var $ = function (id) { return document.getElementById(id); };
  var seatEls = {};
  function seatList() { return Array.prototype.slice.call(document.querySelectorAll(".ep-seat")); }

  /* fichas en orden cronológico real desde hoy (la próxima función primero) */
  function pintaFichas() {
    var box = document.querySelector(".ep-fichas");
    Array.prototype.forEach.call(document.querySelectorAll("[data-dia-fecha]"), function (el) {
      var k = el.getAttribute("data-dia-fecha");
      if (!DIAS[k]) return;
      var iso = state.dia === k && state.iso ? state.iso : proximas(k, 1)[0];
      el.textContent = etiqueta(iso, k);
      var b = el.parentNode; b.setAttribute("data-iso", proximas(k, 1)[0]);
      var h = b.querySelector(".ep-ficha-hoy"); if (h) h.hidden = iso !== todayIso();
    });
    if (box && !box.getAttribute("data-orden")) {
      var list = Array.prototype.slice.call(box.querySelectorAll(".ep-ficha"));
      list.sort(function (a, b) { return a.getAttribute("data-iso") < b.getAttribute("data-iso") ? -1 : 1; });
      list.forEach(function (b) { box.appendChild(b); });
      box.setAttribute("data-orden", "1");
    }
  }

  function paint(fromUser) {
    var n = state.seats.length, c = cur();
    Object.keys(seatEls).forEach(function (id) {
      var on = state.seats.indexOf(id) >= 0;
      seatEls[id].classList.toggle("is-on", on);
      seatEls[id].setAttribute("aria-checked", on ? "true" : "false");
    });
    /* la mesa toma anillo rojo si tiene alguna silla elegida */
    Array.prototype.forEach.call(document.querySelectorAll(".ep-mesa-g"), function (g) { g.classList.toggle("is-on", !!g.querySelector(".ep-seat.is-on")); });
    var out = $("ep-cuenta-n"); if (out) { out.textContent = n ? n + (n === 1 ? " lugar" : " lugares") : "Elige cuántos"; out.classList.toggle("is-empty", !n); }
    var pista = $("ep-pista"); if (pista) pista.classList.toggle("is-done", n > 0);
    Array.prototype.forEach.call(document.querySelectorAll(".ep-ficha"), function (b) { b.setAttribute("aria-checked", b.getAttribute("data-dia") === state.dia ? "true" : "false"); });
    pintaFichas();
    /* fechas: las 2 próximas de ese día (y la que llegó de la cartelera, si es otra) */
    var fe = $("ep-fechas");
    if (fe) {
      if (c) {
        var ops = proximas(state.dia, 2);
        if (ops.indexOf(state.iso) < 0) ops.push(state.iso);
        var sig = state.dia + "|" + ops.join(",");
        fe.hidden = false;
        if (fe.getAttribute("data-sig") !== sig) {
          fe.setAttribute("data-sig", sig);
          fe.innerHTML = "";
          ops.forEach(function (iso) {
            var b = document.createElement("button"); b.type = "button"; b.className = "ep-fecha"; b.setAttribute("role", "radio"); b.setAttribute("data-iso", iso);
            b.textContent = (iso === todayIso() ? "HOY · " : "") + etiqueta(iso, state.dia);
            fe.appendChild(b);
          });
        }
        Array.prototype.forEach.call(fe.children, function (b) { b.setAttribute("aria-checked", b.getAttribute("data-iso") === state.iso ? "true" : "false"); });
      } else { fe.hidden = true; fe.removeAttribute("data-sig"); }
    }
    function set(id, val) { var el = $(id); if (!el) return; el.textContent = val || el.getAttribute("data-empty") || ""; el.classList.toggle("is-empty", !val); }
    set("b-fn", c ? c.sh.nombre : ""); set("b-fecha", c ? c.f.l : ""); set("b-lug", n ? state.seats.join(" · ") : ""); set("b-precio", "");
    var bn = $("b-n"); if (bn) bn.textContent = n ? n : "___";
    var falta = $("b-falta");
    if (falta) {
      if (!c) { falta.hidden = false; falta.textContent = "Falta elegir función."; }
      else if (!n) { falta.hidden = false; falta.textContent = "Toca tus lugares en el plano (o usa + y −)."; }
      else falta.hidden = true;
    }
    refreshWa();
    var inp = $("b-nombre"); if (inp && inp.value !== state.name && document.activeElement !== inp) inp.value = state.name;
    var detail = { dia: state.dia, nombre: c ? c.sh.nombre : "", iso: c ? c.f.iso : "", hoy: !!(c && c.f.iso === todayIso()), seats: state.seats.slice(), n: n };
    emit("epica:boleto", { state: state, cur: c, message: message() });
    emit("epica:funcion", detail);
    if (fromUser) persist();
  }
  function refreshWa() {
    var a = $("b-wa"); if (!a) return;
    var m = message();
    a.setAttribute("data-wa", m);
    a.href = window.EpWaUrl ? window.EpWaUrl(m) : "https://wa.me/524491577858?text=" + encodeURIComponent(m);
    a.target = "_blank"; a.rel = "noopener";
  }

  function setDia(dia, iso) {
    if (!DIAS[dia]) return;
    state.dia = dia;
    state.iso = valida(dia, iso) ? iso : proximas(dia, 1)[0];
    paint(true);
  }
  function toggleSeat(id, force) {
    var i = state.seats.indexOf(id), on = force === undefined ? i < 0 : force;
    if (on && i < 0) state.seats.push(id);
    if (!on && i >= 0) state.seats.splice(i, 1);
    var el = seatEls[id];
    if (el && on) { el.classList.remove("is-clic"); void el.getBoundingClientRect(); el.classList.add("is-clic"); setTimeout(function () { el.classList.remove("is-clic"); }, 160); }
    paint(true);
  }
  function nextSeat() {
    var free = Object.keys(seatEls).filter(function (id) { return state.seats.indexOf(id) < 0; });
    if (!free.length) return null;
    var ref = state.seats.length ? seatEls[state.seats[state.seats.length - 1]] : null;
    var rx = ref ? +ref.getAttribute("data-x") : 180, ry = ref ? +ref.getAttribute("data-y") : 216;
    free.sort(function (a, b) {
      var A = seatEls[a], B = seatEls[b];
      var da = Math.pow(+A.getAttribute("data-x") - rx, 2) + Math.pow(+A.getAttribute("data-y") - ry, 2);
      var db = Math.pow(+B.getAttribute("data-x") - rx, 2) + Math.pow(+B.getAttribute("data-y") - ry, 2);
      return da - db;
    });
    return free[0];
  }

  function init() {
    seatList().forEach(function (el) { seatEls[el.getAttribute("data-seat")] = el; });
    state.seats = state.seats.filter(function (id) { return seatEls[id]; });
    var plano = document.querySelector(".ep-plano");
    if (plano) {
      plano.addEventListener("click", function (e) { var s = e.target.closest && e.target.closest(".ep-seat"); if (s) toggleSeat(s.getAttribute("data-seat")); });
      plano.addEventListener("keydown", function (e) {
        var s = e.target.closest && e.target.closest(".ep-seat");
        if (s && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); toggleSeat(s.getAttribute("data-seat")); }
      });
    }
    Array.prototype.forEach.call(document.querySelectorAll(".ep-step"), function (b) {
      b.addEventListener("click", function () {
        if (b.getAttribute("data-step") === "1") { var n = nextSeat(); if (n) toggleSeat(n, true); }
        else if (state.seats.length) toggleSeat(state.seats[state.seats.length - 1], false);
      });
    });
    var fichas = document.querySelector(".ep-fichas");
    if (fichas) fichas.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest(".ep-ficha"); if (b) setDia(b.getAttribute("data-dia")); });
    var fe = $("ep-fechas");
    if (fe) fe.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest(".ep-fecha"); if (b) setDia(state.dia, b.getAttribute("data-iso")); });
    /* links de otras secciones (cartelera vigente): data-ep-dia="sab" data-ep-iso="2026-10-03" */
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("[data-ep-dia]");
      if (a) setDia(a.getAttribute("data-ep-dia"), a.getAttribute("data-ep-iso") || "");
    });
    var inp = $("b-nombre");
    if (inp) { inp.value = state.name; inp.addEventListener("input", function () { state.name = inp.value.slice(0, 40); persist(); refreshWa(); emit("epica:boleto", { state: state, cur: cur(), message: message() }); }); }
    var wa = $("b-wa");
    if (wa) ["click", "pointerdown", "touchstart", "focus"].forEach(function (t) { wa.addEventListener(t, refreshWa, { passive: true }); });
    paint(false);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
