/* Arienzo: mecánica común (estado del pedido, header, menú, WhatsApp, reveal, anclas). */
(function () {
  "use strict";
  var WA = "524495536331";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* ---------- Estado del pedido (sessionStorage, siempre en try/catch) ---------- */
  var PRECIOS = { 6: 295, 10: 425, 14: 590, 20: 815 };
  var SABORES = ["Condesa de frutas", "Chocolate", "Fresas", "Nuez", "Piñón", "Queso y piña", "Chantilly fresa"];
  var CUARTELES = {
    pasteles: { nombre: "Pasteles", frase: "los pasteles" },
    postres: { nombre: "Postres", frase: "los postres" },
    pan: { nombre: "Pan", frase: "el pan" },
    cafeteria: { nombre: "Cafetería", frase: "la cafetería" }
  };
  var KEY = "arienzo_pedido";
  var state = (function () {
    try { var s = JSON.parse(sessionStorage.getItem(KEY) || "{}"); return s && typeof s === "object" ? s : {}; }
    catch (e) { return {}; }
  })();
  if (!PRECIOS[state.size]) delete state.size;
  if (SABORES.indexOf(state.sabor) < 0) delete state.sabor;
  if (!CUARTELES[state.q]) delete state.q;
  if (typeof state.ded !== "string") state.ded = "";
  function persist() { try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function emit() {
    var ev;
    try { ev = new CustomEvent("arienzo:cambio", { detail: state }); }
    catch (e) { ev = document.createEvent("CustomEvent"); ev.initCustomEvent("arienzo:cambio", false, false, state); }
    window.dispatchEvent(ev);
  }
  function lower(s) { return s.charAt(0).toLowerCase() + s.slice(1); }
  var Pedido = {
    PRECIOS: PRECIOS, SABORES: SABORES, CUARTELES: CUARTELES,
    state: function () { return state; },
    set: function (k, v) {
      if (v === undefined || v === null || v === "") delete state[k]; else state[k] = v;
      persist(); emit();
    },
    /* "Pastel de piñón para 14 personas, $590*" */
    resumenPastel: function () {
      if (!state.size && !state.sabor) return "";
      var t = "Pastel" + (state.sabor ? " de " + lower(state.sabor) : "");
      if (state.size) t += " para " + state.size + " personas, $" + PRECIOS[state.size] + "*";
      return t;
    },
    fraseMensajePastel: function () {
      var t = "un pastel" + (state.sabor ? " de " + lower(state.sabor) : "");
      if (state.size) t += " para " + state.size + " personas";
      return t;
    },
    mensajePastel: function () {
      if (!state.size && !state.sabor) return "Hola Arienzo, quiero encargar un pastel. ¿Me confirman tamaños, sabores y precios vigentes?";
      var m = "Hola Arienzo, quiero " + Pedido.fraseMensajePastel() + ".";
      var d = (state.ded || "").trim();
      if (d) m += " Dedicatoria: " + d + ".";
      return m + " ¿Me confirman precio vigente y para cuándo pueden tenerlo?";
    },
    hayPedido: function () { return !!(state.q || state.size || state.sabor); },
    mensajeCierre: function () {
      var partes = [];
      var hayPastel = !!(state.size || state.sabor);
      if (state.q && !(state.q === "pasteles" && hayPastel)) partes.push(CUARTELES[state.q].frase);
      if (hayPastel) partes.push(Pedido.fraseMensajePastel());
      if (!partes.length) return "Hola Arienzo, vi su página y quiero hacer un pedido. ¿Me ayudan?";
      var m = "Hola Arienzo, me interesa " + partes.join(", ") + ".";
      var d = (state.ded || "").trim();
      if ((state.size || state.sabor) && d) m += " Dedicatoria: " + d + ".";
      return m + " ¿Me confirman precio vigente y disponibilidad?";
    },
    waUrl: waUrl,
    setWa: function (el, msg) { if (!el) return; el.setAttribute("data-wa", msg); el.href = waUrl(msg); }
  };
  window.Arienzo = Pedido;

  /* ---------- WhatsApp: cada botón NACE con su href real; aquí solo se confirma ---------- */
  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) { links[i].href = waUrl(links[i].getAttribute("data-wa")); links[i].target = "_blank"; links[i].rel = "noopener"; }
  }

  /* ---------- Scroll a #anclas (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var head = document.getElementById("ar-head");
    var compact = head && head.classList.contains("is-compact");
    var off = compact ? 62 : 64;
    var top = el.getBoundingClientRect().top + window.scrollY - off;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.ArienzoIr = go;
  var closeMenu = function () {};
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (href.length < 2) return;
      var el = document.getElementById(href.slice(1));
      if (!el) return;
      e.preventDefault();
      closeMenu();
      go(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  /* ---------- Header: la cinta se pliega al bajar, reversible ---------- */
  function initHeader() {
    var head = document.getElementById("ar-head");
    if (!head) return;
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY || window.pageYOffset;
      var on = head.classList.contains("is-compact");
      if (!on && y > 80) head.classList.add("is-compact");
      else if (on && y <= 30) head.classList.remove("is-compact");
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
    /* cinta de tamaños: elegir uno y bajar a la sección de pasteles */
    var btns = head.querySelectorAll(".ar-cs");
    function paint() {
      for (var i = 0; i < btns.length; i++) btns[i].setAttribute("aria-pressed", String(+btns[i].getAttribute("data-size") === state.size));
    }
    for (var i = 0; i < btns.length; i++) btns[i].addEventListener("click", function (e) {
      var n = +e.currentTarget.getAttribute("data-size");
      Pedido.set("size", n);
      var sec = document.getElementById("30-pasteles");
      if (sec) go(sec);
    });
    window.addEventListener("arienzo:cambio", paint);
    paint();
  }

  /* ---------- Menú hamburguesa ---------- */
  function initMenu() {
    var btn = document.querySelector(".ar-menu-btn");
    var menu = document.getElementById("ar-menu");
    if (!btn || !menu) return;
    var body = document.body, lbl = btn.querySelector(".ar-menu-lbl");
    var links = menu.querySelectorAll("a");
    function set(open) {
      var was = body.classList.contains("ar-menu-open");
      if (open === was) return;
      body.classList.toggle("ar-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 60);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("ar-menu-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a) { set(false); return; }
      if (e.target === menu || e.target.classList.contains("ar-menu-in")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("ar-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat([].slice.call(links));
        var i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* ---------- Vigía por sondeo (rAF + getBoundingClientRect) ---------- */
  function watchVisible(list, vhFrac, onVisible) {
    var pending = [].slice.call(list);
    if (!pending.length) return;
    var raf = null;
    function tick() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * vhFrac && r.bottom > 0) { var el = pending[i]; pending.splice(i, 1); onVisible(el); }
      }
      if (pending.length) sch();
    }
    function sch() { if (!raf) raf = requestAnimationFrame(tick); }
    sch();
    window.addEventListener("scroll", sch, { passive: true });
    window.addEventListener("resize", sch);
  }
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    function show(el) {
      var hs = el.querySelectorAll ? el.querySelectorAll(".l") : [];
      for (var i = 0; i < hs.length; i++) hs[i].style.setProperty("--i", i);
      el.classList.add("is-in");
    }
    if (reduce) { [].forEach.call(els, show); return; }
    [].forEach.call(els, function (el) { var hs = el.querySelectorAll(".l"); for (var i = 0; i < hs.length; i++) hs[i].style.setProperty("--i", i); });
    var now = [], later = [];
    [].forEach.call(els, function (el) { (el.getAttribute("data-reveal") === "now" ? now : later).push(el); });
    setTimeout(function () { now.forEach(show); }, 60);
    watchVisible(later, 0.9, show);
  }

  /* ---------- WA flotante: se esconde donde ya hay un verde a la vista ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]");
    if (!zones.length) return;
    var raf = null;
    function update() {
      var vh = window.innerHeight || document.documentElement.clientHeight, on = false;
      for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh * 0.92 && r.bottom > 0) { on = true; break; } }
      document.body.classList.toggle("ar-wa-off", on);
    }
    function sch() { if (!raf) raf = requestAnimationFrame(function () { raf = null; update(); }); }
    sch();
    window.addEventListener("scroll", sch, { passive: true });
    window.addEventListener("resize", sch);
  }

  function init() { initWa(); initHeader(); initMenu(); initAnchors(); initReveal(); initWaHide(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
