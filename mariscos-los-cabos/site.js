/* Cabos: header, menu, WhatsApp, reveal, anclas, estado compartido. */
(function () {
  "use strict";
  var WA = "524499181146"; /* PENDIENTE: telefono de Google Maps (Americas), sin WhatsApp publicado */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var body = document.body;
  window.Cabos = {
    WA: WA,
    waUrl: function (m) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(m); },
    items: [], ls: [],
    toggle: function (k) { var i = this.items.indexOf(k); if (i < 0) this.items.push(k); else this.items.splice(i, 1); this.emit(); },
    has: function (k) { return this.items.indexOf(k) > -1; },
    on: function (f) { this.ls.push(f); },
    emit: function () { for (var i = 0; i < this.ls.length; i++) this.ls[i](); }
  };

  function initWa() {
    var l = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < l.length; i++) { l[i].href = window.Cabos.waUrl(l[i].getAttribute("data-wa")); l[i].target = "_blank"; l[i].rel = "noopener"; }
  }

  function initHeader() {
    var h = document.getElementById("lc-header"), t = false;
    function u() { t = false; h.classList.toggle("is-compact", (window.scrollY || 0) > 12); }
    window.addEventListener("scroll", function () { if (!t) { t = true; requestAnimationFrame(u); } }, { passive: true });
    u();
  }

  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".lc-menu-btn"), menu = document.getElementById("lc-menu");
    if (!btn || !menu) return;
    var links = menu.querySelectorAll("a"), lbl = btn.querySelector(".lc-menu-lbl");
    function set(o) {
      if (o === body.classList.contains("lc-menu-open")) return;
      body.classList.toggle("lc-menu-open", o);
      btn.setAttribute("aria-expanded", o ? "true" : "false");
      menu.setAttribute("aria-hidden", o ? "false" : "true");
      lbl.textContent = o ? "Cerrar" : "Menú";
      if (o) setTimeout(function () { links[0].focus({ preventScroll: true }); }, 80); else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("lc-menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a") || e.target === menu) set(false); });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("lc-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); }
      if (e.key === "Tab") {
        var it = [btn].concat([].slice.call(links)), i = it.indexOf(document.activeElement);
        e.preventDefault(); if (i < 0) i = -1;
        it[(i + (e.shiftKey ? -1 : 1) + it.length) % it.length].focus();
      }
    });
  }

  function watchVisible(list, frac, cb) {
    var p = [].slice.call(list); if (!p.length) return;
    var raf = null;
    function tick() {
      raf = null;
      var vh = window.innerHeight;
      for (var i = p.length - 1; i >= 0; i--) {
        var r = p[i].getBoundingClientRect();
        if (r.top < vh * frac && r.bottom > 0) { var el = p[i]; p.splice(i, 1); cb(el); }
      }
      if (p.length) sch();
    }
    function sch() { if (!raf) raf = requestAnimationFrame(tick); }
    sch(); window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch);
  }
  window.CabosWatch = watchVisible;

  function initWaHide() {
    var z = document.querySelectorAll("[data-hide-wa]");
    var raf = null;
    function u() {
      raf = null; var vh = window.innerHeight, on = false;
      for (var i = 0; i < z.length; i++) { var r = z[i].getBoundingClientRect(); if (r.top < vh * 0.8 && r.bottom > 0) { on = true; break; } }
      body.classList.toggle("lc-wa-off", on);
    }
    function s() { if (!raf) raf = requestAnimationFrame(u); }
    s(); window.addEventListener("scroll", s, { passive: true }); window.addEventListener("resize", s);
  }

  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { [].forEach.call(els, show); return; }
    watchVisible(els, 0.9, show);
  }

  function go(el) {
    var h = document.getElementById("lc-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (h ? h.offsetHeight + 8 : 0);
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

  function init() { initWa(); initHeader(); initMenu(); initWaHide(); initReveal(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
