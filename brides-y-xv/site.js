/* Brides & XV: fundación de interacción (estado de la visita, WhatsApp, header, menú, reveal, anclas).
   El estado del probador (percha elegida, para quién, fecha del evento, cuántas vienen) vive en window.Bx
   y en sessionStorage; lo leen la ficha de la sección 2, el header y el remate de la sección 6. */
(function () {
  "use strict";
  var WA = "524495417295";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var MES3 = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
  var KEY = "bx_estado";

  /* ---------- Estado compartido ---------- */
  var state = { sel: [], para: "", fecha: "", vienen: "", acc: false, nombre: "" };
  try {
    var saved = JSON.parse(sessionStorage.getItem(KEY) || "null");
    if (saved && typeof saved === "object") {
      if (Array.isArray(saved.sel)) state.sel = saved.sel.filter(function (x) { return /^0[1-6]$/.test(x); }).slice(0, 3);
      ["para", "fecha", "vienen", "nombre"].forEach(function (k) { if (typeof saved[k] === "string") state[k] = saved[k]; });
      state.acc = !!saved.acc;
    }
  } catch (e) {}
  var listeners = [];
  function persist() { try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function emit() { listeners.forEach(function (cb) { try { cb(state); } catch (e) {} }); }
  function set(patch) { for (var k in patch) state[k] = patch[k]; persist(); emit(); }

  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  function fmtFecha(iso) {
    var p = (iso || "").split("-");
    if (p.length !== 3) return "";
    return parseInt(p[2], 10) + " de " + MESES[parseInt(p[1], 10) - 1] + " de " + p[0];
  }
  var descs = {};   /* id -> "percha 04 (XV bordado dorado y volantes)" */
  function registerPercha(id, text) { descs[id] = text; }
  function join(list) {
    if (list.length <= 1) return list.join("");
    return list.slice(0, -1).join(", ") + " y " + list[list.length - 1];
  }
  function viennenTxt() {
    var v = state.vienen;
    if (!v) return "";
    if (v === "1") return "Venimos: 1 persona.";
    if (v === "5") return "Venimos: 5 o más personas.";
    return "Venimos: " + v + " personas.";
  }
  function message() {
    var out = ["Hola Brides & XV, quiero agendar mi prueba de vestido."];
    if (state.para) out.push("Es para: " + state.para + ".");
    if (state.fecha) { var f = fmtFecha(state.fecha); if (f) out.push("Fecha del evento: " + f + "."); }
    if (state.sel.length) {
      var l = state.sel.map(function (id) { return descs[id] || ("percha " + id); });
      out.push("Del perchero me gustaron: " + join(l) + ".");
    }
    var v = viennenTxt(); if (v) out.push(v);
    if (state.acc) out.push("También quiero ver accesorios.");
    if (state.nombre && state.nombre.trim()) out.push("Mi nombre: " + state.nombre.trim() + ".");
    return out.join(" ");
  }
  /* días que faltan (calendario de America/Mexico_City) */
  function diasFaltan(iso) {
    var p = (iso || "").split("-"); if (p.length !== 3) return null;
    var hoy;
    try {
      var s = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Mexico_City", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
      hoy = s.split("-");
    } catch (e) { var d = new Date(); hoy = [d.getFullYear(), d.getMonth() + 1, d.getDate()]; }
    var a = Date.UTC(+hoy[0], +hoy[1] - 1, +hoy[2]);
    var b = Date.UTC(+p[0], +p[1] - 1, +p[2]);
    return Math.round((b - a) / 86400000);
  }
  function hoyISO() {
    try { return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Mexico_City", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()); }
    catch (e) { var d = new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  }
  window.Bx = {
    state: state, set: set, message: message, waUrl: function () { return waUrl(message()); },
    registerPercha: registerPercha, fmtFecha: fmtFecha, diasFaltan: diasFaltan, hoyISO: hoyISO,
    on: function (cb) { listeners.push(cb); }, reduce: reduce, MES3: MES3, MESES: MESES
  };

  /* ---------- Links de WhatsApp: el href NACE real en el HTML; aquí solo se reescribe el mensaje ---------- */
  function paintWa() {
    var url = waUrl(message());
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      var own = links[i].getAttribute("data-wa");
      links[i].href = own ? waUrl(own) : url;
    }
  }

  /* ---------- Header: se compacta, la línea se encoge al ancho del nombre, "FALTAN N DÍAS" ---------- */
  function initHeader() {
    var header = document.getElementById("bx-header"); if (!header) return;
    var img = document.getElementById("bx-logo-img");
    var ticking = false;
    function measure() { if (img) header.style.setProperty("--logo-w", (img.getBoundingClientRect().width || 132) + "px"); }
    function update() { ticking = false; header.classList.toggle("is-compact", (window.scrollY || window.pageYOffset) > 40); }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", measure);
    if (img) { if (img.complete) measure(); else img.addEventListener("load", measure); }
    measure(); update();

    var t = document.getElementById("bx-strip-t");
    var current = t ? t.textContent : "";
    function stripText() {
      var n = state.fecha ? diasFaltan(state.fecha) : null;
      if (n == null || n <= 0) return "¿Cuándo es tu día?";
      var pre = "TU DÍA";
      if (state.para === "Novia" || state.para === "Civil") pre = "TU BODA";
      else if (state.para === "Mis XV") pre = "TUS XV";
      else if (state.para === "XV de mi hija") pre = "SUS XV";
      var p = state.fecha.split("-");
      return pre + " · " + parseInt(p[2], 10) + " " + MES3[parseInt(p[1], 10) - 1] + " " + p[0] + " · " + (n === 1 ? "FALTA 1 DÍA" : "FALTAN " + n + " DÍAS");
    }
    function paint(first) {
      if (!t) return;
      var next = stripText();
      if (next === current) return;
      current = next;
      if (first || reduce) { t.textContent = next; return; }
      t.classList.add("is-swap");
      setTimeout(function () { t.textContent = next; t.classList.remove("is-swap"); }, 150);
    }
    paint(true);
    window.Bx.on(function () { paint(false); });
  }

  /* ---------- Menú a pantalla completa ---------- */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".bx-menu-btn"), menu = document.getElementById("bx-menu");
    if (!btn || !menu) return;
    var body = document.body, links = menu.querySelectorAll("a"), lbl = btn.querySelector(".bx-menu-lbl"), pushed = false;
    function set(open, fromPop, viaLink) {
      var was = body.classList.contains("bx-menu-open");
      if (open === was) return;
      body.classList.toggle("bx-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
      if (open) {
        try { history.pushState({ bxMenu: 1 }, ""); pushed = true; } catch (e) {}
        setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      } else {
        if (pushed && !fromPop && !viaLink) { pushed = false; try { history.back(); } catch (e) {} } else pushed = false;
        btn.focus({ preventScroll: true });
      }
    }
    closeMenu = function (viaLink) { set(false, false, !!viaLink); };
    btn.addEventListener("click", function () { set(!body.classList.contains("bx-menu-open")); });
    window.addEventListener("popstate", function () { if (body.classList.contains("bx-menu-open")) set(false, true); });
    menu.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) { set(false, false, true); return; }
      if (e.target === menu || e.target.classList.contains("bx-menu-panel")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("bx-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(Array.prototype.slice.call(links));
        var i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* ---------- Vigía por sondeo (rAF + getBoundingClientRect) ---------- */
  function watchVisible(list, vhFrac, onVisible) {
    var pending = Array.prototype.slice.call(list);
    if (!pending.length) return;
    var raf = null;
    function tick() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * vhFrac && r.bottom > 0) onVisible(pending.splice(i, 1)[0]);
      }
      if (pending.length) schedule();
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(tick); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  window.BxWatch = watchVisible;

  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]");
    if (!zones.length) return;
    var raf = null;
    function update() {
      var vh = window.innerHeight || document.documentElement.clientHeight, on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.top < vh * 0.85 && r.bottom > vh * 0.15) { on = true; break; }
      }
      document.body.classList.toggle("bx-wa-off", on);
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(function () { raf = null; update(); }); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { Array.prototype.forEach.call(els, show); return; }
    watchVisible(els, 0.92, function (el) {
      var img = el.getAttribute("data-reveal") === "photo" ? el.querySelector("img") : null;
      if (!img || img.complete) { show(el); return; }
      var done = false;
      function go() { if (done) return; done = true; show(el); }
      if (img.decode) img.decode().then(go, go); else { img.addEventListener("load", go); img.addEventListener("error", go); }
      setTimeout(go, 1100);
    });
  }

  /* ---------- Anclas con scroll suave por JS (nunca scroll-behavior en CSS) ---------- */
  function go(el) {
    var head = document.querySelector(".bx-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight + 10 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.BxIr = go;
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (href.length < 2) return;
      var el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      closeMenu(true);
      go(el);
      if (history.replaceState) { try { history.replaceState(null, "", href); } catch (er) {} }
    });
  }

  function init() {
    paintWa(); window.Bx.on(paintWa);
    initHeader(); initMenu(); initWaHide(); initReveal(); initAnchors();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
