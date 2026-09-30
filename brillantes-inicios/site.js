/* Brillantes Inicios: fundacion (header, menu, WhatsApp, reveal, anclas, estado de la cartilla). */
(function () {
  "use strict";
  var WA = "524491927631";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* ---------- Cartilla: estado compartido (localStorage bi_cartilla) ---------- */
  var KEY = "bi_cartilla";
  var TOTAL = 7;
  var Cart = (function () {
    var state = { docs: [], edad: "", nombre: "" };
    try {
      var s = JSON.parse(localStorage.getItem(KEY) || "{}");
      if (s && typeof s === "object") {
        state.docs = Array.isArray(s.docs) ? s.docs.filter(function (x) { return typeof x === "string"; }) : [];
        state.edad = typeof s.edad === "string" ? s.edad : "";
        state.nombre = typeof s.nombre === "string" ? s.nombre : "";
      }
    } catch (e) {}
    function persist() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
    function emit() {
      var ev;
      try { ev = new CustomEvent("bi:cartilla", { detail: state }); }
      catch (e) { ev = document.createEvent("CustomEvent"); ev.initCustomEvent("bi:cartilla", false, false, state); }
      window.dispatchEvent(ev);
      refreshLinks();
    }
    function clean(v) { return String(v || "").replace(/\s+/g, " ").trim().replace(/[.\s]+$/, ""); }
    function message() {
      var parts = ["Hola Brillantes Inicios, quiero inscribir a mi bebé."];
      var edad = clean(state.edad), nombre = clean(state.nombre), n = state.docs.length;
      if (edad) parts.push("Edad: " + edad + ".");
      if (n > 0) parts.push("Ya tengo: " + n + " de " + TOTAL + " documentos.");
      parts.push("¿Cuándo puedo visitarlos?");
      if (nombre) parts.push("Mi nombre: " + nombre);
      return parts.join(" ");
    }
    return {
      TOTAL: TOTAL,
      state: state,
      count: function () { return state.docs.length; },
      has: function (id) { return state.docs.indexOf(id) >= 0; },
      setDoc: function (id, on) {
        var i = state.docs.indexOf(id);
        if (on && i < 0) state.docs.push(id);
        if (!on && i >= 0) state.docs.splice(i, 1);
        persist(); emit();
      },
      setField: function (k, v) { state[k] = v; persist(); emit(); },
      message: message,
      url: function () { return waUrl(message()); }
    };
  })();
  window.BI = { waUrl: waUrl, cartilla: Cart };

  /* Los links dinamicos (cartilla y cierre) NACEN con href real; aqui solo se actualiza el href
     (al cambiar el estado y otra vez al tocar). Nunca preventDefault ni window.open. */
  function refreshLinks() {
    var list = document.querySelectorAll("[data-wa-cartilla]");
    for (var i = 0; i < list.length; i++) list[i].setAttribute("href", Cart.url());
  }
  function initWa() {
    var list = document.querySelectorAll("a[data-wa-cartilla]");
    function upd(e) { var a = e.currentTarget; a.setAttribute("href", Cart.url()); }
    for (var i = 0; i < list.length; i++) {
      ["pointerdown", "touchstart", "mousedown", "focus", "click"].forEach(function (ev) { list[i].addEventListener(ev, upd, { passive: true }); });
      list[i].setAttribute("target", "_blank"); list[i].setAttribute("rel", "noopener");
    }
    refreshLinks();
  }

  /* ---------- Header: compacta + crayon de avance ---------- */
  function initHeader() {
    var header = document.getElementById("bi-header");
    if (!header) return;
    var fill = document.getElementById("bi-progress");
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY || window.pageYOffset;
      header.classList.toggle("is-compact", y > 12);
      var max = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
      var pct = max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0;
      if (fill) fill.style.width = pct + "%";
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Menu ---------- */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".bi-menu-btn");
    var menu = document.getElementById("bi-menu");
    if (!btn || !menu) return;
    var body = document.body, links = menu.querySelectorAll("a");
    function set(open) {
      var was = body.classList.contains("bi-menu-open");
      if (open === was) return;
      body.classList.toggle("bi-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("bi-menu-open")); });
    menu.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) set(false);
      else if (e.target === menu || e.target.classList.contains("bi-menu-nav")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("bi-menu-open")) return;
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

  /* ---------- Reveal por sondeo (rAF + rect), solo en scroll/resize ----------
     Blindaje: a los 1.6 s de cargar (y al volver a la pestana) todo [data-reveal] que ya este en pantalla
     o arriba de ella queda visible, aunque rAF o el sondeo fallen. */
  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if (!els.length) return;
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { els.forEach(show); return; }
    var raf = null;
    function reveal(el) {
      var img = el.classList.contains("bi-foto") ? el.querySelector("img") : null;
      if (img && !img.complete && img.decode) { var d = false; var g = function () { if (!d) { d = true; show(el); } }; img.decode().then(g, g); setTimeout(g, 1100); }
      else show(el);
    }
    function sweep(line) {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = els.length - 1; i >= 0; i--) {
        var r = els[i].getBoundingClientRect();
        if (r.top < vh * line) reveal(els.splice(i, 1)[0]);
      }
      if (!els.length) off();
    }
    function tick() { raf = null; sweep(0.92); }
    var gt = null;
    function schedule() {
      if (!raf && els.length) raf = requestAnimationFrame(tick);
      /* respaldo sin rAF: 1.6 s despues de moverse, lo que este en pantalla se muestra si o si */
      if (!gt) gt = setTimeout(function () { gt = null; guard(); }, 1600);
    }
    function guard() { sweep(1); }
    function onVis() { if (!document.hidden) setTimeout(guard, 1600); }
    function off() {
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", onVis);
    }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", onVis);
    schedule();
    setTimeout(guard, 1600);
  }

  /* ---------- WhatsApp flotante: se esconde donde ya hay un boton verde grande ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]");
    if (!zones.length) return;
    function update() {
      var vh = window.innerHeight || document.documentElement.clientHeight, on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.top < vh * 0.85 && r.bottom > vh * 0.1) { on = true; break; }
      }
      document.body.classList.toggle("bi-wa-off", on);
    }
    var raf = null;
    function schedule() { if (!raf) raf = requestAnimationFrame(function () { raf = null; update(); }); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  /* ---------- Anclas (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var head = document.querySelector(".bi-bar");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight + 14 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.BI.go = go;
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

  function init() { initWa(); initHeader(); initMenu(); initReveal(); initWaHide(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
