/* Manu Ruiz · Hair & Style: fundacion de interaccion (header Tu tono, menu, WhatsApp, anclas, estado compartido del tono). */
(function () {
  "use strict";
  var WA = "524492570525";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var KEY = "mr_tono";
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* ---------- Estado compartido: el tono elegido (sessionStorage) ---------- */
  var MR = window.MR = { tones: [], sel: -1, waUrl: waUrl };
  function readTones() {
    var els = document.querySelectorAll("#mr-fan .mr-strand, .mr-strand[data-slug]");
    var seen = {};
    Array.prototype.forEach.call(els, function (b) {
      var i = parseInt(b.getAttribute("data-i"), 10);
      if (seen[i]) return; seen[i] = 1;
      MR.tones[i] = { i: i, slug: b.getAttribute("data-slug"), name: b.getAttribute("data-name"), r: b.getAttribute("data-r"), m: b.getAttribute("data-m"), t: b.getAttribute("data-t"), l: b.getAttribute("data-l") || b.getAttribute("data-t") };
    });
  }
  function save(i) { try { sessionStorage.setItem(KEY, MR.tones[i] ? MR.tones[i].slug : ""); } catch (e) {} }
  function load() {
    try {
      var s = sessionStorage.getItem(KEY);
      if (!s) return -1;
      for (var i = 0; i < MR.tones.length; i++) if (MR.tones[i] && MR.tones[i].slug === s) return i;
    } catch (e) {}
    return -1;
  }
  MR.pick = function (i, silent) {
    if (!MR.tones[i]) return;
    MR.sel = i; save(i);
    paintHeader(i, !silent);
    try { window.dispatchEvent(new CustomEvent("mr:tono", { detail: { i: i, tone: MR.tones[i], silent: !!silent } })); } catch (e) {}
  };
  MR.clear = function () {
    MR.sel = -1;
    try { sessionStorage.removeItem(KEY); } catch (e) {}
    if (mini) { setVars(miniBase, { r: "#4A2C1F", m: "#8E6A48", t: "#D9B27A" }); if (miniName) miniName.textContent = miniName.getAttribute("data-empty") || "Elige tu tono"; }
    try { window.dispatchEvent(new CustomEvent("mr:tono", { detail: { i: -1, tone: null, silent: true } })); } catch (e) {}
  };
  MR.tone = function () { return MR.sel >= 0 ? MR.tones[MR.sel] : null; };
  MR.onTono = function (cb) { window.addEventListener("mr:tono", function (e) { cb(e.detail); }); };

  /* ---------- Mensaje de WhatsApp ---------- */
  MR.msg = function (ficha) {
    var p = ["Hola Visage, quiero cita con Manu Ruiz."];
    var t = MR.tone();
    if (t) p.push("Tono que me gustó: " + t.name + ".");
    if (ficha) {
      if (ficha.servicio) p.push("Servicio: " + ficha.servicio + ".");
      if (ficha.cuando) p.push("Cuándo: " + ficha.cuando + ".");
      if (ficha.nombre) p.push("Mi nombre: " + ficha.nombre + ".");
    }
    return p.join(" ");
  };
  MR.msgFloat = function () {
    var t = MR.tone();
    return "Hola Visage, vi la página de Manu Ruiz y quiero una cita." + (t ? " Tono que me gustó: " + t.name + "." : "");
  };

  /* Los botones NACEN con su href real de wa.me; aqui solo se confirma. El href se reescribe en
     pointerdown/click (sin preventDefault), nunca con window.open. */
  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    Array.prototype.forEach.call(links, function (a) {
      a.href = waUrl(a.getAttribute("data-wa"));
      a.target = "_blank"; a.rel = "noopener";
    });
    var fl = document.getElementById("mr-wa");
    function refresh() { if (fl) fl.href = waUrl(MR.msgFloat()); }
    if (fl) { ["pointerdown", "click", "touchstart", "focus"].forEach(function (ev) { fl.addEventListener(ev, refresh, { passive: true }); }); }
    MR.onTono(refresh); refresh();
  }

  /* ---------- Header: se compacta, mechon mini con el tono elegido ---------- */
  var mini, miniBase, miniNext, miniName, sweepT = null;
  function setVars(el, t) { el.style.setProperty("--r", t.r); el.style.setProperty("--m", t.m); el.style.setProperty("--t", t.t); }
  function paintHeader(i, animate) {
    var t = MR.tones[i];
    if (!t || !mini) return;
    if (miniName) miniName.textContent = t.name;
    if (!animate || reduce) { setVars(miniBase, t); return; }
    setVars(miniNext, t);
    miniNext.classList.remove("is-sweep"); void miniNext.offsetWidth; miniNext.classList.add("is-sweep");
    clearTimeout(sweepT);
    sweepT = setTimeout(function () { setVars(miniBase, t); miniNext.classList.remove("is-sweep"); miniNext.style.transition = "none"; miniNext.style.transform = "scaleY(0)"; void miniNext.offsetWidth; miniNext.style.transition = ""; miniNext.style.transform = ""; }, 320);
  }
  function initHeader() {
    var header = document.getElementById("mr-hdr");
    if (!header) return;
    mini = document.getElementById("mr-tono");
    miniBase = header.querySelector(".mr-mini-base"); miniNext = header.querySelector(".mr-mini-next"); miniName = document.getElementById("mr-tono-n");
    /* sin elegir: mechon castano a rubio */
    miniBase.style.setProperty("--r", "#4A2C1F"); miniBase.style.setProperty("--m", "#8E6A48"); miniBase.style.setProperty("--t", "#D9B27A");
    var ticking = false;
    function update() { ticking = false; header.classList.toggle("is-compact", (window.scrollY || window.pageYOffset) > 12); }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Menu hamburguesa ---------- */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".mr-burger"), menu = document.getElementById("mr-menu");
    if (!btn || !menu) return;
    var body = document.body, links = menu.querySelectorAll("a");
    function set(open) {
      var was = body.classList.contains("mr-menu-open");
      if (open === was) return;
      body.classList.toggle("mr-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Cerrar el menú" : "Abrir el menú");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("mr-menu-open")); });
    menu.addEventListener("click", function (e) { var a = e.target.closest ? e.target.closest("a") : null; if (a) set(false); });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("mr-menu-open")) return;
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

  /* ---------- Flotante: se esconde donde ya hay un CTA grande ([data-hide-wa]) ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]");
    if (!zones.length) return;
    var raf = null;
    function update() {
      var vh = window.innerHeight || document.documentElement.clientHeight, on = false;
      for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh * 0.85 && r.bottom > vh * 0.12) { on = true; break; } }
      document.body.classList.toggle("mr-wa-off", on);
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(function () { raf = null; update(); }); }
    schedule(); window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", schedule);
  }

  /* ---------- Anclas con scroll suave (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var head = document.getElementById("mr-hdr");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight : 0) - 10;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  MR.go = go;
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (href.length < 2) return;
      var el = document.querySelector(href);
      if (!el) return;
      e.preventDefault(); closeMenu(); go(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  function init() {
    readTones(); initHeader(); initMenu(); initWa(); initWaHide(); initAnchors();
    var s = load();
    if (s >= 0) { MR.sel = s; paintHeader(s, false); }
    window.dispatchEvent(new CustomEvent("mr:ready", { detail: { i: s } }));
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
