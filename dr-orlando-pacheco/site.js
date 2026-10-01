/* Dr. Orlando Pacheco: mecánica base (header, menú, WhatsApp, anclas) y el estado en MEMORIA de "Dilo sin escribirlo".
   Nada se guarda: ni sessionStorage, ni localStorage, ni en la URL. */
(function () {
  "use strict";
  var WA = "524491070751";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* ---------- Estado compartido (solo vive en la memoria de la página) ---------- */
  var listeners = [];
  var PC = window.PC = {
    state: { motivo: "", motivoLibre: false, consultorio: "", cuando: "", nombre: "", ingles: false },
    waUrl: waUrl,
    base: "Hola Dr. Pacheco, quiero agendar una consulta.",
    message: function () {
      var s = PC.state, parts = [];
      if (s.motivo && !s.motivoLibre) parts.push("Motivo: " + s.motivo + ".");
      if (s.consultorio) parts.push("Consultorio: " + s.consultorio + ".");
      if (s.cuando) parts.push("Cuándo: " + s.cuando + ".");
      var name = (s.nombre || "").trim();
      if (name) parts.push("Mi nombre: " + name + ".");
      if (s.ingles) parts.push("Consultation in English, please.");
      return parts.length ? "Hola Dr. Pacheco, quiero una consulta. " + parts.join(" ") : PC.base;
    },
    url: function () { return waUrl(PC.message()); },
    on: function (fn) { listeners.push(fn); },
    set: function (patch) { for (var k in patch) PC.state[k] = patch[k]; sync(); }
  };
  function sync() {
    var els = document.querySelectorAll("[data-wa-dm]");
    for (var i = 0; i < els.length; i++) els[i].href = PC.url();
    for (var j = 0; j < listeners.length; j++) { try { listeners[j](PC.state); } catch (e) {} }
  }
  PC.sync = sync;

  /* ---------- WhatsApp: los href ya nacen reales en el HTML; aquí solo se confirman (sin preventDefault, sin window.open) ---------- */
  function initWa() {
    function refresh(e) {
      var a = e.target.closest ? e.target.closest("a[data-wa],a[data-wa-dm]") : null;
      if (!a) return;
      if (a.hasAttribute("data-wa-dm")) a.href = PC.url(); else a.href = waUrl(a.getAttribute("data-wa"));
      a.target = "_blank"; a.rel = "noopener";
    }
    document.addEventListener("pointerdown", refresh, true);
    document.addEventListener("click", refresh, true);
  }

  /* ---------- Header: se compacta al bajar ---------- */
  function initHeader() {
    var header = document.getElementById("pc-header");
    if (!header) return;
    var ticking = false;
    function update() { ticking = false; header.classList.toggle("is-compact", (window.scrollY || window.pageYOffset) > 12); }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Menú ---------- */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".pc-burger");
    var menu = document.getElementById("pc-menu");
    if (!btn || !menu) return;
    var body = document.body;
    var links = menu.querySelectorAll("a");
    function set(open) {
      if (open === body.classList.contains("pc-menu-open")) return;
      body.classList.toggle("pc-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("pc-menu-open")); });
    menu.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) set(false);
      else if (e.target === menu) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("pc-menu-open")) return;
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

  /* ---------- WhatsApp flotante: se esconde donde hay datos, campos o un verde propio ([data-hide-wa]) ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]");
    if (!zones.length) return;
    var raf = null;
    function update() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.top < vh * 0.85 && r.bottom > vh * 0.08) { on = true; break; }
      }
      document.body.classList.toggle("pc-wa-off", on);
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(update); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  /* ---------- Anclas suaves (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var head = document.getElementById("pc-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight + 14 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.PCGo = go;
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
      /* sin history.replaceState con el motivo; solo el ancla de la sección */
    });
  }

  function init() { initWa(); initHeader(); initMenu(); initWaHide(); initAnchors(); sync(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
