/* Kinesthetics: base de interaccion (header, lema que navega, menu, WhatsApp, revelado, anclas, area preelegida). */
(function () {
  "use strict";
  var WA = "524492426877";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* ---------- Estado compartido: area preelegida (vive en memoria, nada se guarda) ---------- */
  var KS = window.KS = { area: null, WA: WA, waUrl: waUrl, reduce: reduce };
  KS.setArea = function (a) {
    KS.area = a;
    try { window.dispatchEvent(new CustomEvent("ks:area", { detail: { area: a } })); } catch (e) { /* nada */ }
  };

  /* Los href de wa.me ya nacen reales en el HTML; aqui solo se confirma el mensaje. */
  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      if (links[i].hasAttribute("data-wa-live")) continue;
      links[i].href = waUrl(links[i].getAttribute("data-wa"));
    }
  }

  var closeMenu = function () {};
  function headerH() { var h = document.getElementById("ks-header"); return h ? h.offsetHeight : 64; }
  function go(el) {
    var top = el.getBoundingClientRect().top + window.scrollY - headerH() - 10;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  KS.go = go;

  /* ---------- Header: se compacta al bajar 40 px; la palabra del lema del area visible se enciende ---------- */
  function initHeader() {
    var header = document.getElementById("ks-header");
    if (!header) return;
    var areas = ["movimiento", "salud", "belleza"].map(function (id) { return document.getElementById(id); });
    var links = document.querySelectorAll("#ks-lema a");
    var ticking = false;
    function update() {
      ticking = false;
      header.classList.toggle("is-compact", (window.scrollY || window.pageYOffset) > 40);
      var vh = window.innerHeight || 800, on = -1;
      for (var i = 0; i < areas.length; i++) {
        if (!areas[i]) continue;
        var r = areas[i].getBoundingClientRect();
        if (r.top < vh * 0.55 && r.bottom > vh * 0.45) on = i;
      }
      for (var j = 0; j < links.length; j++) links[j].classList.toggle("is-on", j === on);
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Menu a pantalla completa ---------- */
  function initMenu() {
    var btn = document.querySelector(".ks-menu-btn");
    var menu = document.getElementById("ks-menu");
    if (!btn || !menu) return;
    var body = document.body, lbl = btn.querySelector(".ks-menu-lbl");
    var links = menu.querySelectorAll("a");
    Array.prototype.forEach.call(menu.querySelectorAll(".ks-menu-nav a"), function (a, i) { a.style.setProperty("--i", i); });
    function set(open) {
      var was = body.classList.contains("ks-menu-open");
      if (open === was) return;
      body.classList.toggle("ks-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("ks-menu-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a) { if (a.getAttribute("href").charAt(0) !== "#") { set(false); } return; }
      if (e.target === menu || e.target.classList.contains("ks-menu-panel")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("ks-menu-open")) return;
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

  /* ---------- Vigia de visibilidad por sondeo (rAF + getBoundingClientRect) ---------- */
  function watchVisible(list, vhFrac, onVisible) {
    var pending = Array.prototype.slice.call(list);
    if (!pending.length) return;
    var raf = null;
    function tick() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * vhFrac && r.bottom > 0) { var el = pending.splice(i, 1)[0]; onVisible(el); }
      }
      if (pending.length) schedule();
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(tick); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  KS.watchVisible = watchVisible;

  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { Array.prototype.forEach.call(els, show); return; }
    watchVisible(els, 0.92, show);
  }

  /* ---------- El WhatsApp flotante se esconde donde ya hay un boton verde a la vista ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa], .ks-foot");
    if (!zones.length) return;
    var raf = null;
    function update() {
      raf = null;
      var vh = window.innerHeight || 800, on = false;
      for (var i = 0; i < zones.length; i++) {
        var z = zones[i].getAttribute("data-hide-wa") === "all" ? zones[i] : (zones[i].querySelector(".ks-btn--wa") || zones[i]);
        var r = z.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) { on = true; break; }
      }
      document.body.classList.toggle("ks-wa-off", on);
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(update); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  /* ---------- Anclas: bajan suave y, si traen area, la dejan preelegida en la frase ---------- */
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (href.length < 2) return;
      var el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      var area = a.getAttribute("data-area");
      if (area) KS.setArea(area);
      var wasOpen = document.body.classList.contains("ks-menu-open");
      closeMenu();
      if (wasOpen) document.body.classList.remove("ks-menu-open");
      go(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  function init() { initWa(); initHeader(); initMenu(); initWaHide(); initReveal(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
