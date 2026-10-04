/* Café del Ángel: mecánica base (menú, WhatsApp, reveal, flotante). */
(function () {
  "use strict";
  var WA = "524499155713";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var body = document.body;
  window.CDA = { WA: WA, wa: function (msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }, reduce: reduce };

  function initWa() {
    var l = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < l.length; i++) { l[i].href = CDA.wa(l[i].getAttribute("data-wa")); l[i].target = "_blank"; l[i].rel = "noopener"; }
  }
  function go(el) {
    var hd = document.getElementById("hd");
    var top = el.getBoundingClientRect().top + window.scrollY - (hd ? hd.offsetHeight + 6 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  function initMenu() {
    var btn = document.querySelector(".hd-btn"), menu = document.getElementById("hd-menu");
    if (!btn || !menu) return;
    var lbl = btn.querySelector(".hd-btn-l");
    function set(o) {
      body.classList.toggle("menu-open", o);
      btn.setAttribute("aria-expanded", o ? "true" : "false");
      menu.setAttribute("aria-hidden", o ? "false" : "true");
      lbl.textContent = o ? "Cerrar" : "Menú";
    }
    btn.addEventListener("click", function () { set(!body.classList.contains("menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a") || e.target === menu || e.target.classList.contains("menu-nav")) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }
  function watch(list, frac, cb) {
    var p = Array.prototype.slice.call(list); if (!p.length) return; var raf = null;
    function tick() { raf = null; var vh = innerHeight; for (var i = p.length - 1; i >= 0; i--) { var r = p[i].getBoundingClientRect(); if (r.top < vh * frac && r.bottom > 0) { var el = p[i]; p.splice(i, 1); cb(el); } } if (p.length) sch(); }
    function sch() { if (!raf) raf = requestAnimationFrame(tick); }
    sch(); addEventListener("scroll", sch, { passive: true }); addEventListener("resize", sch);
  }
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { Array.prototype.forEach.call(els, show); return; }
    watch(els, 0.92, show);
  }
  function initWaHide() {
    var z = document.querySelectorAll("[data-hide-wa]"); if (!z.length) return; var raf = null;
    function up() { raf = null; var on = false, vh = innerHeight; for (var i = 0; i < z.length; i++) { var r = z[i].getBoundingClientRect(); if (r.top < vh * .8 && r.bottom > 0) { on = true; break; } } body.classList.toggle("wa-off", on); }
    function sch() { if (!raf) raf = requestAnimationFrame(up); }
    sch(); addEventListener("scroll", sch, { passive: true }); addEventListener("resize", sch);
  }
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a || e.defaultPrevented) return;
      var h = a.getAttribute("href"); if (h.length < 2) return; var el = document.querySelector(h); if (!el) return;
      e.preventDefault(); go(el); if (history.replaceState) history.replaceState(null, "", h);
    });
  }
  function init() { initWa(); initMenu(); initReveal(); initWaHide(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
