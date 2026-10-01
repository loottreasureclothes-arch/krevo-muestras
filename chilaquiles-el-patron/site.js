/* Chilaquiles El Patrón: fundación de interacción (estado del desayuno, header, menú, anclas, WhatsApp). Sin rAF obligatorio. */
(function () {
  "use strict";
  var WA = "524492644264";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* ---------- Carta de combos (precios literales de su menú impreso, sin IVA) ---------- */
  var ITEMS = {
    s2: ["1/2 Chilaquiles Sencillos", 53], p2: ["1/2 Chilaquiles Patrón", 56],
    s1: ["Chilaquiles Sencillos", 66], p1: ["Chilaquiles Patrón", 75],
    huevo: ["1 pz de huevo", 13], jugo: ["Jugo natural", 29], agua: ["Agua de sabor", 29],
    bistec: ["Bistec", 27], choco: ["Choco, 1/2 litro", 39],
    ench: ["Enchiladas, orden (4 pzas)", 84], rev: ["Huevos revueltos con porción de chilaquiles", 97]
  };
  var COMBOS = [
    { id: "c1", name: "Media orden Sencillos", it: ["s2"], fam: "verde" },
    { id: "c2", name: "Media orden Patrón", it: ["p2"], fam: "rojo" },
    { id: "c3", name: "Orden Sencillos con huevo", it: ["s1", "huevo"], fam: "verde" },
    { id: "c4", name: "Media Sencillos con jugo", it: ["s2", "jugo"], fam: "verde" },
    { id: "c5", name: "Media Patrón con agua", it: ["p2", "agua"], fam: "rojo" },
    { id: "c6", name: "Orden Sencillos con bistec", it: ["s1", "bistec"], fam: "verde" },
    { id: "c7", name: "Orden Patrón con jugo natural", it: ["p1", "jugo"], fam: "rojo" },
    { id: "c8", name: "Enchiladas con jugo natural", it: ["ench", "jugo"], fam: "ench" },
    { id: "c9", name: "Huevos revueltos con chilaquiles y jugo natural", it: ["rev", "jugo"], fam: "huevos" },
    { id: "c10", name: "Orden Patrón con bistec y choco", it: ["p1", "bistec", "choco"], fam: "rojo" }
  ];
  COMBOS.forEach(function (c) { c.total = c.it.reduce(function (a, k) { return a + ITEMS[k][1]; }, 0); });
  function comboById(id) { for (var i = 0; i < COMBOS.length; i++) if (COMBOS[i].id === id) return COMBOS[i]; return null; }

  /* ---------- Estado compartido (sessionStorage, siempre en try/catch) ---------- */
  var KEY = "ep_estado", subs = [];
  var state = { budget: 100, combo: null, salsa: null, modo: null, cafe: false, nombre: "" };
  try { var saved = JSON.parse(sessionStorage.getItem(KEY) || "null"); if (saved && typeof saved === "object") { for (var k in state) if (saved[k] !== undefined) state[k] = saved[k]; } } catch (e) {}
  if (state.combo && !comboById(state.combo)) state.combo = null;
  function persist() { try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function set(patch) {
    for (var k in patch) state[k] = patch[k];
    var c = comboById(state.combo);
    if (c && c.total > state.budget) state.combo = null;
    persist();
    subs.forEach(function (fn) { try { fn(state); } catch (e) {} });
  }
  function lower(s) { return String(s || "").toLowerCase(); }
  function message() {
    var s = state, c = comboById(s.combo);
    var head = "Hola Chilaquiles El Patrón, traigo $" + s.budget + " para desayunar.";
    if (!c) return head + " ¿Qué me recomiendan?";
    var p = [head, "Quiero: " + c.name + "."];
    if (s.salsa === "Sin salsa") p.push("Sin salsa.");
    else if (s.salsa) p.push("Salsa: " + lower(s.salsa) + ".");
    else if (c.fam === "ench" || c.fam === "huevos") p.push("Salsa: la que me recomienden.");
    if (s.modo === "aqui") p.push("Lo como aquí.");
    else if (s.modo === "paso") p.push("Paso por él.");
    else if (s.modo === "dom") p.push("Lo quiero a domicilio (con costo extra).");
    if (s.cafe) p.push("Más un café de olla.");
    if (s.nombre && String(s.nombre).trim()) p.push("Mi nombre: " + String(s.nombre).trim());
    return p.join(" ");
  }
  window.EP = { ITEMS: ITEMS, COMBOS: COMBOS, comboById: comboById, state: state, set: set, message: message, waUrl: waUrl, subscribe: function (fn) { subs.push(fn); fn(state); }, reduce: reduce };

  /* ---------- Links de WhatsApp: el href ya nace real; aquí solo se confirma ---------- */
  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) { links[i].href = waUrl(links[i].getAttribute("data-wa")); links[i].target = "_blank"; links[i].rel = "noopener"; }
  }

  /* ---------- Header: compacto + ficha de precio ---------- */
  function initHeader() {
    var header = document.getElementById("ep-header");
    var t = document.getElementById("ep-ficha-t"), p = document.getElementById("ep-ficha-p"), f = document.getElementById("ep-ficha");
    function upd() { header.classList.toggle("is-compact", (window.scrollY || window.pageYOffset) > 12); }
    window.addEventListener("scroll", upd, { passive: true }); window.addEventListener("resize", upd); upd();
    EP.subscribe(function (s) {
      var c = comboById(s.combo);
      if (c) {
        t.innerHTML = '<small>Tu desayuno</small><span>' + (s.cafe ? "+ café de olla" : "anotado") + "</span>";
        p.textContent = "$" + c.total;
        f.setAttribute("aria-label", "Tu desayuno anotado, " + c.total + " pesos. Ver lo que alcanza");
      } else {
        t.innerHTML = '<small>Desde</small><span><span class="ep-long">1/2 orden de chilaquiles</span><span class="ep-short">1/2 orden</span></span>';
        p.textContent = "$53";
        f.setAttribute("aria-label", "Precio desde 53 pesos la media orden. Ver lo que alcanza");
      }
    });
  }

  /* ---------- Menú a pantalla completa ---------- */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.getElementById("ep-burger"), menu = document.getElementById("ep-menu"), lbl = document.getElementById("ep-burger-lbl");
    if (!btn || !menu) return;
    var body = document.body, links = menu.querySelectorAll("a");
    function set(open) {
      var was = body.classList.contains("ep-menu-open"); if (open === was) return;
      body.classList.toggle("ep-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false"); menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 60); else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("ep-menu-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a) { set(false); return; }
      if (e.target === menu || e.target.classList.contains("ep-menu-in")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("ep-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(Array.prototype.slice.call(links)), i = items.indexOf(document.activeElement);
        e.preventDefault(); if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* ---------- Anclas suaves (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var head = document.getElementById("ep-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight + 12 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.EP.go = go;
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href"); if (href.length < 2) return;
      var el = document.querySelector(href); if (!el) return;
      e.preventDefault(); closeMenu(); go(el);
      if (history.replaceState) { try { history.replaceState(null, "", href); } catch (er) {} }
    });
  }

  /* ---------- WhatsApp flotante: se esconde mientras un botón verde ya está a la vista ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa], .ep-foot");
    function upd() {
      var vh = window.innerHeight || document.documentElement.clientHeight, on = false;
      for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh - 20 && r.bottom > 20) { on = true; break; } }
      document.body.classList.toggle("ep-wa-off", on);
    }
    window.addEventListener("scroll", upd, { passive: true }); window.addEventListener("resize", upd); upd(); setInterval(upd, 700);
  }

  function init() { initWa(); initHeader(); initMenu(); initAnchors(); initWaHide(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
