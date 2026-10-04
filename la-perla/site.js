/* La Perla: mecanica (menu, WhatsApp, flotante, reveal, anclas) */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var NUMS = { centro: "524499781535", poniente: "524493009138" };
  function waUrl(msg, branch) { return "https://wa.me/" + (NUMS[branch] || NUMS.centro) + "?text=" + encodeURIComponent(msg); }
  window.LP = { NUMS: NUMS, waUrl: waUrl, reduce: reduce };

  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      links[i].href = waUrl(links[i].getAttribute("data-wa"), links[i].getAttribute("data-branch"));
      links[i].target = "_blank"; links[i].rel = "noopener";
    }
  }

  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".lp-menu-btn"), menu = document.getElementById("lp-menu");
    if (!btn || !menu) return;
    var body = document.body, links = menu.querySelectorAll("a"), lbl = btn.querySelector(".lp-menu-lbl");
    function set(open) {
      if (open === body.classList.contains("lp-menu-open")) return;
      body.classList.toggle("lp-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("lp-menu-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a) { set(false); return; }
      if (e.target === menu || e.target.classList.contains("lp-menu-scrim") || e.target.classList.contains("lp-menu-panel")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("lp-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(Array.prototype.slice.call(links)), i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  function watchVisible(list, frac, cb) {
    var pending = Array.prototype.slice.call(list); if (!pending.length) return;
    var raf = null;
    function tick() {
      raf = null; var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * frac && r.bottom > 0) cb(pending.splice(i, 1)[0]);
      }
      if (pending.length) sch();
    }
    function sch() { if (!raf) raf = requestAnimationFrame(tick); }
    sch(); window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch);
  }
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { Array.prototype.forEach.call(els, show); return; }
    watchVisible(els, 0.9, show);
  }

  function initWaHide() {
    var zones = document.querySelectorAll("#mesa-cta, .lp-foot");
    if (!zones.length) return;
    var raf = null;
    function update() {
      var vh = window.innerHeight, on = false;
      for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh * 0.85 && r.bottom > 0) { on = true; break; } }
      document.body.classList.toggle("lp-wa-off", on);
    }
    function sch() { if (!raf) raf = requestAnimationFrame(function () { raf = null; update(); }); }
    sch(); window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch);
  }

  function go(el) {
    var head = document.getElementById("lp-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight + 8 : 0);
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
  function init() { initWa(); initMenu(); initWaHide(); initReveal(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
