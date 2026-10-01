/* Effizient: mecánica de la página (links de WhatsApp, header, menú, anclas, WhatsApp flotante). */
(function () {
  "use strict";
  var WA = "524494137277";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  window.EffWa = { url: waUrl };

  /* Cada botón NACE con su href real de wa.me; aquí solo se confirma el mensaje (sin preventDefault ni window.open). */
  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      links[i].href = waUrl(links[i].getAttribute("data-wa"));
      links[i].target = "_blank";
      links[i].rel = "noopener";
    }
  }

  function initHeader() {
    var hd = document.getElementById("hd");
    if (!hd) return;
    var ticking = false;
    function update() { ticking = false; hd.classList.toggle("is-compact", (window.scrollY || 0) > 40); }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".hd-menu-btn");
    var menu = document.getElementById("menu");
    if (!btn || !menu) return;
    var body = document.body;
    var lbl = btn.querySelector(".hd-menu-lbl");
    var links = menu.querySelectorAll("a");
    var pushed = false;
    function set(open, fromPop) {
      if (open === body.classList.contains("menu-open")) return;
      body.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
      if (open) {
        try { history.pushState({ menu: 1 }, "", location.href); pushed = true; } catch (e) {}
        setTimeout(function () { if (links[0]) links[0].focus({ preventScroll: true }); }, 80);
      } else {
        if (pushed && !fromPop) { pushed = false; try { history.back(); } catch (e) {} }
        pushed = false;
        btn.focus({ preventScroll: true });
      }
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("menu-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a) { set(false); }
    });
    window.addEventListener("popstate", function () { if (body.classList.contains("menu-open")) set(false, true); });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("menu-open")) return;
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

  function go(el) {
    var bar = document.querySelector(".hd-bar");
    var top = el.getBoundingClientRect().top + (window.scrollY || 0) - ((bar ? bar.offsetHeight : 60) + 14);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
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
      setTimeout(function () { go(el); }, 20);
    });
  }

  /* El flotante se esconde donde ya hay un botón verde a la vista ([data-hide-wa]). */
  function initFab() {
    var zones = document.querySelectorAll("[data-hide-wa]");
    if (!zones.length) return;
    var raf = null;
    function update() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight, on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > vh * 0.08) { on = true; break; }
      }
      document.body.classList.toggle("wa-off", on);
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(update); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  function init() { initWa(); initHeader(); initMenu(); initAnchors(); initFab(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
