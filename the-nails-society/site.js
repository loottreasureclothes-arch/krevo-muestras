/* The Nail Society: fundación de interacción (header, menú, WhatsApp, anclas y estado compartido de la cita). */
(function () {
  "use strict";
  var WA = "524492733769";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* ---------- Estado compartido: la pared de cuadros y la cita ---------- */
  var DISENOS = [
    { id: "frances", n: "Francés negro con florecitas" },
    { id: "caritas", n: "Colores y caritas" },
    { id: "almendra", n: "Almendra blanca con brillo" },
    { id: "perlas", n: "Perlas y flores" }
  ];
  var SERVICIOS = { unas: "uñas", pedicure: "pedicure", facial: "facial", novias: "novias" };
  var SUC = { colosio: "Colosio", sur: "Sur", cerca: "la que me quede cerca" };
  var DIR = {
    colosio: "Blvd. Colosio 400, Plazita Emporium",
    sur: "Av. Aguascalientes Sur 117, dentro de Walmart Mahatma Gandhi",
    cerca: "Te decimos cuál te queda más cerca."
  };
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var KEY = "ns_cita";
  var state = { cur: "frances", d: [], s: [], suc: "", dia: "", nombre: "" };
  try {
    var saved = JSON.parse(sessionStorage.getItem(KEY) || "null");
    if (saved && typeof saved === "object") {
      if (Array.isArray(saved.d)) state.d = saved.d.filter(function (id) { return byId(id); }).slice(0, 3);
      if (Array.isArray(saved.s)) state.s = saved.s.filter(function (k) { return SERVICIOS[k]; });
      if (SUC[saved.suc]) state.suc = saved.suc;
      if (typeof saved.dia === "string") state.dia = saved.dia;
      if (typeof saved.nombre === "string") state.nombre = saved.nombre.slice(0, 40);
      if (byId(saved.cur)) state.cur = saved.cur;
    }
  } catch (e) { }
  function byId(id) { for (var i = 0; i < DISENOS.length; i++) if (DISENOS[i].id === id) return DISENOS[i]; return null; }
  function persist() { try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { } }
  function lista(a) { if (a.length < 2) return a[0] || ""; return a.slice(0, -1).join(", ") + " y " + a[a.length - 1]; }
  function fmtDia(iso) {
    var p = (iso || "").split("-");
    if (p.length !== 3) return "";
    var m = parseInt(p[1], 10) - 1;
    if (!(m >= 0 && m < 12)) return "";
    return parseInt(p[2], 10) + " de " + MESES[m] + " de " + p[0];
  }
  function nombres() { return state.d.map(function (id) { return byId(id).n; }); }
  function vacio() { return !state.d.length && !state.s.length && !state.suc && !state.dia && !(state.nombre || "").trim(); }
  function message() {
    if (vacio()) return "Hola The Nail Society, quiero pedir una cita.";
    var out = ["Hola The Nail Society, quiero una cita."];
    var n = nombres().map(function (x) { return "«" + x + "»"; });
    if (n.length === 1) out.push("Me gusta el diseño " + n[0] + " de su página.");
    else if (n.length > 1) out.push("Me gustan estos diseños de su página: " + lista(n) + ".");
    if (state.s.length) out.push("Para: " + lista(state.s.map(function (k) { return SERVICIOS[k]; })) + ".");
    if (state.suc) out.push("Sucursal: " + SUC[state.suc] + ".");
    var d = fmtDia(state.dia); if (d) out.push("Día: " + d + ".");
    var nm = (state.nombre || "").trim(); if (nm) out.push("Mi nombre: " + nm + ".");
    return out.join(" ");
  }
  var listeners = [];
  function emit() { persist(); paintWa(); paintCartelas(); listeners.forEach(function (f) { try { f(state); } catch (e) { } }); }
  window.NS = {
    DISENOS: DISENOS, SERVICIOS: SERVICIOS, SUC: SUC, DIR: DIR, state: state, byId: byId,
    message: message, waUrl: function () { return waUrl(message()); }, fmtDia: fmtDia, nombres: nombres, lista: lista, vacio: vacio,
    on: function (f) { listeners.push(f); }, emit: emit, reduce: reduce,
    go: go
  };

  /* ---------- Links de WhatsApp: nacen con href real; el JS solo lo reescribe ---------- */
  function paintWa() {
    var url = waUrl(message());
    var a = document.querySelectorAll("[data-wa-cita],[data-wa-cita-foot]");
    for (var i = 0; i < a.length; i++) a[i].setAttribute("href", url);
  }
  function paintCartelas() {
    var c = document.querySelectorAll(".ns-cart[data-suc]");
    for (var i = 0; i < c.length; i++) c[i].classList.toggle("is-on", c[i].getAttribute("data-suc") === state.suc);
  }

  /* ---------- Header: se compacta ---------- */
  function initHeader() {
    var h = document.getElementById("ns-header"); if (!h) return;
    var ticking = false;
    function upd() { ticking = false; h.classList.toggle("is-compact", (window.scrollY || 0) > 40); }
    addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }

  /* ---------- Menú ---------- */
  var closeMenu = function () { };
  function initMenu() {
    var btn = document.querySelector(".ns-menu-btn"), menu = document.getElementById("ns-menu"); if (!btn || !menu) return;
    var body = document.body, lbl = btn.querySelector(".ns-menu-lbl");
    var links = menu.querySelectorAll("a");
    [].forEach.call(menu.querySelectorAll(".ns-menu-nav a"), function (a, i) { a.style.setProperty("--i", i); });
    function set(open) {
      if (open === body.classList.contains("ns-menu-open")) return;
      body.classList.toggle("ns-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("ns-menu-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a");
      if (a) { set(false); return; }
      if (e.target === menu || e.target.classList.contains("ns-menu-panel") || e.target.classList.contains("ns-menu-nav") || e.target.classList.contains("ns-menu-foot")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("ns-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat([].slice.call(links)), i = items.indexOf(document.activeElement);
        e.preventDefault(); if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* ---------- Flotante: se esconde donde ya hay un botón verde a la vista ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]"); if (!zones.length) return;
    var raf = null;
    function upd() {
      raf = null; var vh = window.innerHeight || 700, on = false;
      for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh * .92 && r.bottom > vh * .08) { on = true; break; } }
      document.body.classList.toggle("ns-wa-off", on);
    }
    function sch() { if (!raf) raf = requestAnimationFrame(upd); }
    sch(); addEventListener("scroll", sch, { passive: true }); addEventListener("resize", sch);
  }

  /* ---------- Anclas suaves (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var top = el.getBoundingClientRect().top + window.scrollY - 66;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href"); if (href.length < 2) return;
      var el = document.querySelector(href); if (!el) return;
      e.preventDefault(); closeMenu(); go(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  function init() { paintWa(); paintCartelas(); initHeader(); initMenu(); initWaHide(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
