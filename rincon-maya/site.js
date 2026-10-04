/* Rincón Maya: mecánica base (menú, WhatsApp, reveal, puntada, anclas). */
(function () {
  "use strict";
  var WA = "524499167574";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  function initWa() {
    [].forEach.call(document.querySelectorAll("[data-wa]"), function (a) {
      a.href = waUrl(a.getAttribute("data-wa")); a.target = "_blank"; a.rel = "noopener";
    });
  }

  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".hd-btn"), menu = document.getElementById("hd-menu");
    if (!btn || !menu) return;
    var lbl = btn.querySelector(".hd-btn-lbl"), body = document.body;
    function set(open) {
      body.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      lbl.textContent = open ? "Cerrar" : "Menú";
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a") || e.target === menu) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && body.classList.contains("menu-open")) { set(false); btn.focus(); } });
  }

  /* sondeo con rAF: no depende de IntersectionObserver */
  function watch(list, frac, onIn, onOut) {
    var els = [].slice.call(list), state = new Map(), raf = null;
    if (!els.length) return;
    function tick() {
      raf = null; var vh = innerHeight;
      els.forEach(function (el) {
        var r = el.getBoundingClientRect(), inView = r.top < vh * frac && r.bottom > 0;
        if (inView && !state.get(el)) { state.set(el, true); onIn(el); }
        else if (!inView && state.get(el) && onOut) { state.set(el, false); onOut(el); }
      });
    }
    function sch() { if (!raf) raf = requestAnimationFrame(tick); }
    addEventListener("scroll", sch, { passive: true }); addEventListener("resize", sch); sch();
  }
  function initReveal() {
    var rev = document.querySelectorAll("[data-reveal]");
    if (reduce) { [].forEach.call(rev, function (e) { e.classList.add("is-in"); }); [].forEach.call(document.querySelectorAll(".stitch"), function (e) { e.classList.add("is-in"); }); return; }
    watch(rev, 0.92, function (el) { el.classList.add("is-in"); });
    /* momento firma: la puntada se cose al entrar y se descose al salir (reversible) */
    watch(document.querySelectorAll(".stitch"), 0.98, function (el) { el.classList.remove("is-out"); el.classList.add("is-in"); }, function (el) { el.classList.remove("is-in"); el.classList.add("is-out"); });
  }

  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]");
    if (!zones.length) return;
    var raf = null;
    function upd() {
      raf = null; var vh = innerHeight, on = false;
      [].forEach.call(zones, function (z) { var r = z.getBoundingClientRect(); if (r.top < vh * 0.85 && r.bottom > 0) on = true; });
      document.body.classList.toggle("wa-off", on);
    }
    function sch() { if (!raf) raf = requestAnimationFrame(upd); }
    addEventListener("scroll", sch, { passive: true }); addEventListener("resize", sch); sch();
  }

  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var id = a.getAttribute("href"); if (id.length < 2) return;
      var el = document.querySelector(id); if (!el) return;
      e.preventDefault(); closeMenu();
      var hd = document.getElementById("hd");
      var top = el.getBoundingClientRect().top + scrollY - (hd ? hd.offsetHeight - 2 : 0);
      scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
      if (history.replaceState) history.replaceState(null, "", id);
    });
  }

  function init() { initWa(); initMenu(); initReveal(); initWaHide(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
