/* El Gran Chava by Darío's · mecánica común: header, menú, WhatsApp, anclas suaves, reveal, flotante. */
(function () {
  "use strict";
  var WA = "524494731508";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  window.GC = { WA: WA, waUrl: waUrl, reduce: reduce };

  /* Links de WhatsApp: ya nacen con su href real; aquí solo se confirma el mensaje fijo.
     Los data-wa="nota" los actualiza la báscula (20-bascula.js). Sin preventDefault ni window.open. */
  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      var m = links[i].getAttribute("data-wa");
      if (m && m !== "nota") links[i].href = waUrl(m);
      links[i].target = "_blank"; links[i].rel = "noopener";
    }
  }

  /* Header: se compacta al bajar 40 px (la placa del horario se esconde, LLAMAR se queda). */
  function initHeader() {
    var header = document.getElementById("gc-header");
    if (!header) return;
    var ticking = false;
    function update() { ticking = false; header.classList.toggle("is-compact", (window.scrollY || window.pageYOffset) > 40); }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* Menú a pantalla completa: Escape, foco atrapado, atrás de Android, tocar una liga. */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".gc-menu-btn");
    var menu = document.getElementById("gc-menu");
    if (!btn || !menu) return;
    var body = document.body;
    var lbl = btn.querySelector(".gc-menu-lbl");
    var links = menu.querySelectorAll("a");
    var pushed = false;
    function set(open, fromPop) {
      var was = body.classList.contains("gc-menu-open");
      if (open === was) return;
      body.classList.toggle("gc-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      if (open) {
        try { history.pushState({ gcMenu: 1 }, ""); pushed = true; } catch (e) { pushed = false; }
        setTimeout(function () { if (links[0]) links[0].focus({ preventScroll: true }); }, 80);
      } else {
        if (pushed && !fromPop) { try { if (history.state && history.state.gcMenu) history.back(); } catch (e) {} }
        pushed = false;
        btn.focus({ preventScroll: true });
      }
    }
    closeMenu = function () { set(false); };
    window.addEventListener("popstate", function () { if (body.classList.contains("gc-menu-open")) { pushed = false; set(false, true); } });
    btn.addEventListener("click", function () { set(!body.classList.contains("gc-menu-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a) { pushed = false; set(false, true); return; }
      var t = e.target;
      if (t === menu || t.classList.contains("gc-menu-panel") || t.classList.contains("gc-menu-nav") || t.classList.contains("gc-menu-foot")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("gc-menu-open")) return;
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

  /* Sondeo con rAF + getBoundingClientRect (no depende de IntersectionObserver). */
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

  /* El flotante se esconde donde ya hay un botón verde a la vista (data-hide-wa) y en el pie; el LLAMAR del header queda siempre. */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa], .gc-foot");
    if (!zones.length) return;
    function update() {
      var vh = window.innerHeight || document.documentElement.clientHeight, on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) { on = true; break; }
      }
      document.body.classList.toggle("gc-wa-off", on);
    }
    var raf = null;
    function schedule() { if (!raf) raf = requestAnimationFrame(function () { raf = null; update(); }); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  function initReveal() {
    var arcs = document.querySelectorAll(".gc-arcada");
    Array.prototype.forEach.call(arcs, function (a) {
      Array.prototype.forEach.call(a.querySelectorAll("svg"), function (s, i) { s.style.setProperty("--i", i); });
    });
    var els = document.querySelectorAll("[data-gc-reveal], .gc-arcada");
    if (!els.length) return;
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { Array.prototype.forEach.call(els, show); return; }
    watchVisible(els, 0.9, show);
  }

  /* Anclas suaves sin scroll-behavior en CSS. */
  function go(el) {
    var head = document.getElementById("gc-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? 48 : 0) - 12;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.GC.go = go;
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
      if (history.replaceState) { try { history.replaceState(null, "", href); } catch (er) {} }
    });
  }

  function init() { initWa(); initHeader(); initMenu(); initWaHide(); initReveal(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
