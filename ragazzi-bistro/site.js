/* Ragazzi Bistro: header, menú, WhatsApp, reveal, hero. */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var NUM = { centro: "524493792337", arcos: "524499965555" };
  var NOM = { centro: "el Centro", arcos: "Arcos Campestre" };
  var RZ = window.RZ = { suc: "centro", NUM: NUM, NOM: NOM };
  function waUrl(msg, suc) { return "https://wa.me/" + NUM[suc || RZ.suc] + "?text=" + encodeURIComponent(msg); }
  RZ.waUrl = waUrl;

  function initWa() {
    var l = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < l.length; i++) {
      l[i].href = waUrl(l[i].getAttribute("data-wa").replace("{suc}", NOM[RZ.suc]));
    }
  }
  RZ.setSuc = function (s) { RZ.suc = s; initWa(); };

  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".rz-menu-btn"), menu = document.getElementById("rz-menu");
    if (!btn || !menu) return;
    var body = document.body, lbl = btn.querySelector(".rz-menu-lbl");
    function set(open) {
      if (open === body.classList.contains("hd-open")) return;
      body.classList.toggle("hd-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("hd-open")); });
    menu.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) set(false);
      else if (e.target === menu || /rz-menu-(panel|nav|foot)/.test(e.target.className)) set(false);
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  function watchVisible(list, frac, cb) {
    var pend = Array.prototype.slice.call(list); if (!pend.length) return;
    var raf = null;
    function tick() {
      raf = null; var vh = innerHeight;
      for (var i = pend.length - 1; i >= 0; i--) {
        var r = pend[i].getBoundingClientRect();
        if (r.top < vh * frac && r.bottom > 0) { var el = pend[i]; pend.splice(i, 1); cb(el); }
      }
      if (pend.length) sched();
    }
    function sched() { if (!raf) raf = requestAnimationFrame(tick); }
    sched(); addEventListener("scroll", sched, { passive: true }); addEventListener("resize", sched);
  }

  function initReveal() {
    var els = document.querySelectorAll("[data-rv]");
    if (reduce) { for (var i = 0; i < els.length; i++) els[i].classList.add("is-in"); return; }
    watchVisible(els, 0.92, function (el) { el.classList.add("is-in"); });
  }

  /* momento firma: el arco se abre al entrar; al bajar se cierra un poco (reversible) */
  function initHero() {
    var ph = document.getElementById("rz-ph"), hero = document.querySelector(".rz-hero");
    if (!ph) return;
    requestAnimationFrame(function () { requestAnimationFrame(function () { ph.classList.add("is-open"); }); });
    if (reduce || !hero) return;
    var t = false;
    function upd() {
      t = false;
      var p = Math.min(1, Math.max(0, (window.scrollY || 0) / (innerHeight * 0.8)));
      hero.style.setProperty("--p", p.toFixed(3));
    }
    addEventListener("scroll", function () { if (!t) { t = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }

  function initFab() {
    var fab = document.getElementById("rz-fab"), z = document.querySelectorAll(".cn-ticket,#pie,#casas .rz-btns");
    if (!fab) return;
    var raf = null;
    function upd() {
      raf = null; var vh = innerHeight, on = false;
      for (var i = 0; i < z.length; i++) { var r = z[i].getBoundingClientRect(); if (r.top < vh * 0.85 && r.bottom > vh * 0.1) { on = true; break; } }
      fab.classList.toggle("is-off", on);
    }
    function s() { if (!raf) raf = requestAnimationFrame(upd); }
    s(); addEventListener("scroll", s, { passive: true }); addEventListener("resize", s);
  }

  function go(el) {
    var bar = document.getElementById("rz-bar");
    var top = el.getBoundingClientRect().top + scrollY - (bar ? bar.offsetHeight + 14 : 0);
    scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var h = a.getAttribute("href"); if (h.length < 2) return;
      var el = document.querySelector(h); if (!el) return;
      e.preventDefault(); closeMenu(); go(el);
      if (history.replaceState) history.replaceState(null, "", h);
    });
  }

  function init() { initWa(); initMenu(); initReveal(); initHero(); initFab(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
