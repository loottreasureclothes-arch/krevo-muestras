/* MamaLinda: base de interacción (header con el precio de hoy, menú, WhatsApp, mesa elegida, anclas). */
(function () {
  "use strict";
  var WA = "524492835801";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DIAS = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* ---------- hora de Aguascalientes (America/Mexico_City) ---------- */
  function ahora() {
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
      var o = {};
      p.forEach(function (x) { o[x.type] = x.value; });
      var dow = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
      var h = parseInt(o.hour, 10) % 24;
      return { dow: dow, h: h, m: parseInt(o.minute, 10) || 0 };
    } catch (e) {
      var d = new Date();
      return { dow: d.getDay(), h: d.getHours(), m: d.getMinutes() };
    }
  }
  /* abre 2:00 pm; cierra 11:00 pm (lun a sáb) o 8:00 pm (dom) */
  function estado() {
    var t = ahora(), cierre = t.dow === 0 ? 20 : 23, min = t.h * 60 + t.m;
    var cierraTxt = t.dow === 0 ? "8:00 pm" : "11:00 pm";
    if (min >= 14 * 60 && min < cierre * 60) return { abierto: true, cierraTxt: cierraTxt, t: t };
    if (min < 14 * 60) return { abierto: false, cuando: "hoy", t: t };
    return { abierto: false, cuando: "manana", t: t };
  }
  function precioHoy(dow) { return (dow >= 1 && dow <= 4) ? 219 : 249; }

  /* ---------- la mesa que arma el visitante (se comparte entre secciones) ---------- */
  var NOM = {
    "caprichosa": "Caprichosa", "margarita": "Margarita", "pepperoni": "Pepperoni", "champeroni": "Champeroni",
    "hawaiana": "Hawaiana", "carnes": "Carnes", "fuego-y-miel": "Fuego y miel", "caprese": "Caprese de la casa",
    "consentida": "La consentida", "tutti-frutti": "Tutti frutti", "patagonia": "Patagonia", "crostino": "Crostino",
    "duquesa": "La duquesa", "trufada": "Trufada", "fugazzetta": "Fugazzetta", "de-siempre": "La de siempre", "mar-y-tierra": "Mar y tierra"
  };
  var KEY = "ml_mesa";
  var mesa = { m: [null, null], a: 0, n: null, c: null };
  try {
    var raw = JSON.parse(sessionStorage.getItem(KEY) || "null");
    if (raw && typeof raw === "object") {
      if (raw.m && raw.m.length === 2) mesa.m = [NOM[raw.m[0]] ? raw.m[0] : null, NOM[raw.m[1]] ? raw.m[1] : null];
      if (raw.a === 1) mesa.a = 1;
      if (raw.n >= 1 && raw.n <= 8) mesa.n = raw.n | 0;
      if (raw.c === "hoy" || raw.c === "manana" || raw.c === "otro") mesa.c = raw.c;
    }
  } catch (e) {}
  function guardar() { try { sessionStorage.setItem(KEY, JSON.stringify(mesa)); } catch (e) {} }
  function mensaje() {
    var a = NOM[mesa.m[0]], b = NOM[mesa.m[1]], n = mesa.n, c = mesa.c, pizza = "";
    if (a && b) pizza = mesa.m[0] === mesa.m[1] ? "una pizza " + a : "una pizza mitad " + a + ", mitad " + b;
    else if (a || b) pizza = "una pizza mitad " + (a || b);
    if (!n && !c && !pizza) return "Hola MamaLinda, quiero apartar una mesa en Colosio. ¿Qué día y hora tienen disponible?";
    var s = "Hola MamaLinda, quiero apartar mesa";
    if (n) s += " para " + (n === 8 ? "8 o más personas" : n === 1 ? "1 persona" : n + " personas");
    if (c === "hoy") s += " hoy"; else if (c === "manana") s += " mañana"; else if (c === "otro") s += " otro día";
    s += ".";
    if (pizza) s += " Se nos antoja " + pizza + ".";
    s += (c === "hoy" || c === "manana") ? " ¿Hay lugar?" : " ¿Qué día y hora tienen disponible?";
    return s;
  }
  function resumen() {
    var a = NOM[mesa.m[0]], b = NOM[mesa.m[1]], partes = [];
    if (mesa.n) partes.push(mesa.n === 8 ? "8 o más personas" : mesa.n === 1 ? "1 persona" : mesa.n + " personas");
    if (a && b) partes.push(mesa.m[0] === mesa.m[1] ? "entera " + a : "mitad " + a + ", mitad " + b);
    else if (a || b) partes.push("mitad " + (a || b));
    return partes.join(" · ");
  }
  function pintarLinks() {
    var url = waUrl(mensaje());
    var l = document.querySelectorAll('[data-ml-wa="mesa"]');
    for (var i = 0; i < l.length; i++) { l[i].href = url; l[i].target = "_blank"; l[i].rel = "noopener"; }
  }
  function emit() {
    try { window.dispatchEvent(new CustomEvent("ml:mesa", { detail: mesa })); }
    catch (e) { var ev = document.createEvent("CustomEvent"); ev.initCustomEvent("ml:mesa", false, false, mesa); window.dispatchEvent(ev); }
  }
  function cambiar(fn) { fn(mesa); guardar(); pintarLinks(); emit(); }
  window.ML = { WA: WA, waUrl: waUrl, ahora: ahora, estado: estado, precioHoy: precioHoy, NOM: NOM, mesa: mesa, cambiar: cambiar, mensaje: mensaje, resumen: resumen, DIAS: DIAS };

  /* ---------- header: precio de hoy en el pizarrón, compacto al bajar ---------- */
  function initHeader() {
    var header = document.getElementById("ml-header");
    if (!header) return;
    var t = ahora(), dia = document.getElementById("ml-pz-dia"), pr = document.getElementById("ml-pz-precio");
    if (dia) dia.textContent = "HOY · " + DIAS[t.dow];
    if (pr) pr.textContent = "$" + precioHoy(t.dow);
    var ticking = false;
    function up() { ticking = false; header.classList.toggle("is-compact", (window.scrollY || window.pageYOffset) > 40); }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(up); } }, { passive: true });
    up();
  }

  /* ---------- menú a pantalla completa ---------- */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.getElementById("ml-menu-btn"), menu = document.getElementById("ml-menu");
    if (!btn || !menu) return;
    var body = document.body, links = menu.querySelectorAll("a");
    var lbl = btn.querySelector(".ml-sr");
    function set(open) {
      if (open === body.classList.contains("ml-menu-open")) return;
      body.classList.toggle("ml-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("ml-menu-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a) { set(false); return; }
      if (e.target === menu) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("ml-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(Array.prototype.slice.call(links)), i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* ---------- el flotante se esconde mientras hay un verde (o la carta) a la vista ---------- */
  function initWaHide() {
    var zones = Array.prototype.slice.call(document.querySelectorAll("[data-hide-wa]")).filter(function (z) { return !z.closest("#ml-menu"); });
    var raf = null;
    function update() {
      var vh = window.innerHeight || document.documentElement.clientHeight, on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.height > 0 && r.top < vh - 8 && r.bottom > 62) { on = true; break; }
      }
      document.body.classList.toggle("ml-wa-off", on);
    }
    function sch() { if (!raf) raf = requestAnimationFrame(function () { raf = null; update(); }); }
    sch();
    window.addEventListener("scroll", sch, { passive: true });
    window.addEventListener("resize", sch);
    window.addEventListener("ml:mesa", sch);
  }

  /* ---------- anclas suaves (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var bar = document.getElementById("ml-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (bar ? bar.offsetHeight + 12 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.ML.ir = go;
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (href.length < 2) return;
      var el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      closeMenu();
      go(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  function init() { pintarLinks(); initHeader(); initMenu(); initWaHide(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
