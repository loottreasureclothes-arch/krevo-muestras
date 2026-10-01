/* Taller Industrial Independencia: mecánica general (header, paro, menú, WhatsApp, reveal, golpe de punzón). */
(function () {
  "use strict";
  var WA = "524493207238";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  var TI = window.TI = { waUrl: waUrl, WA: WA, reduce: reduce, hooks: [] };

  /* Los href de wa.me nacen reales en el HTML; aquí solo se confirma el mensaje (sin preventDefault ni window.open). */
  function initWa() {
    var links = document.querySelectorAll("a[data-wa]");
    for (var i = 0; i < links.length; i++) links[i].href = waUrl(links[i].getAttribute("data-wa"));
  }

  /* Letras de punzón: cada letra con desfase y giro estables (única técnica de texto especial). */
  function seeded(n) { var x = Math.sin(n * 12.9898 + 4.1414) * 43758.5453; return x - Math.floor(x); }
  TI.punzon = function (el) {
    var txt = el.getAttribute("data-t") || el.textContent;
    el.setAttribute("data-t", txt);
    el.setAttribute("aria-label", txt);
    el.textContent = "";
    var base = 0; for (var k = 0; k < txt.length; k++) base += txt.charCodeAt(k);
    for (var i = 0; i < txt.length; i++) {
      var ch = txt.charAt(i);
      if (ch === " ") { el.appendChild(document.createTextNode(" ")); continue; }
      var s = document.createElement("span");
      s.setAttribute("aria-hidden", "true");
      s.textContent = ch;
      s.style.setProperty("--dx", ((seeded(base + i) - .5) * 1.2).toFixed(2) + "px");
      s.style.setProperty("--dy", ((seeded(base + i * 3 + 7) - .5) * 1.2).toFixed(2) + "px");
      s.style.setProperty("--r", ((seeded(base + i * 5 + 3) - .5) * 3).toFixed(2) + "deg");
      el.appendChild(s);
    }
  };
  function initPunzon() { var els = document.querySelectorAll(".ti-pun"); for (var i = 0; i < els.length; i++) TI.punzon(els[i]); }

  /* ---------- Header ---------- */
  function initHeader() {
    var header = document.getElementById("ti-header");
    if (!header) return;
    var ticking = false;
    function update() { ticking = false; header.classList.toggle("is-compact", (window.scrollY || window.pageYOffset) > 12); }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Menú ---------- */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".ti-menu-btn"), menu = document.getElementById("ti-menu"), body = document.body;
    if (!btn || !menu) return;
    var links = menu.querySelectorAll("a");
    Array.prototype.forEach.call(menu.querySelectorAll(".ti-menu-nav a"), function (a, i) { a.style.setProperty("--i", i); });
    function set(open) {
      if (open === body.classList.contains("ti-menu-open")) return;
      if (open) closeTray();
      body.classList.toggle("ti-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80); else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("ti-menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("a")) set(false); });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("ti-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(Array.prototype.slice.call(links)), i = items.indexOf(document.activeElement);
        e.preventDefault(); if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* ---------- El paro de emergencia ---------- */
  var closeTray = function () {};
  function initParo() {
    var btn = document.getElementById("ti-paro"), tray = document.getElementById("ti-tray");
    if (!btn || !tray) return;
    var pushed = false;
    function open() {
      if (tray.classList.contains("is-open")) return;
      closeMenu();
      tray.classList.add("is-open"); tray.setAttribute("aria-hidden", "false");
      btn.setAttribute("aria-expanded", "true");
      document.body.classList.add("ti-tray-open"); waZones();
      if (TI.setUrgencia) TI.setUrgencia("parada");
      try { history.pushState({ tiTray: 1 }, ""); pushed = true; } catch (e) {}
    }
    function close(fromPop) {
      if (!tray.classList.contains("is-open")) return;
      tray.classList.remove("is-open"); tray.setAttribute("aria-hidden", "true");
      btn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("ti-tray-open"); waZones();
      btn.classList.remove("is-twist"); void btn.offsetWidth; if (!reduce) btn.classList.add("is-twist");
      setTimeout(function () { btn.classList.remove("is-twist"); }, 300);
      if (pushed && !fromPop) { pushed = false; try { history.back(); } catch (e) {} } else pushed = false;
    }
    closeTray = function () { close(false); };
    btn.addEventListener("click", function () { tray.classList.contains("is-open") ? close(false) : open(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && tray.classList.contains("is-open")) { e.preventDefault(); close(false); btn.focus({ preventScroll: true }); } });
    window.addEventListener("popstate", function () { if (tray.classList.contains("is-open")) close(true); });
    document.addEventListener("click", function (e) {
      if (!tray.classList.contains("is-open")) return;
      if (e.target.closest && (e.target.closest("#ti-tray") || e.target.closest("#ti-paro"))) return;
      close(false);
    });
  }

  /* ---------- Reveal por sondeo (sin IntersectionObserver) ---------- */
  function watchVisible(list, frac, cb) {
    var pending = Array.prototype.slice.call(list); if (!pending.length) return;
    var raf = null;
    function tick() {
      raf = null; var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = pending.length - 1; i >= 0; i--) { var r = pending[i].getBoundingClientRect(); if (r.top < vh * frac && r.bottom > 0) cb(pending.splice(i, 1)[0]); }
      if (pending.length) schedule();
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(tick); }
    schedule(); window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", schedule);
  }
  TI.watchVisible = watchVisible;
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { Array.prototype.forEach.call(els, show); return; }
    watchVisible(els, .92, show);
  }

  /* ---------- Flotante de WhatsApp: se esconde donde ya hay un botón verde a la vista ---------- */
  var waZones = function () {};
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa], .ti-foot");
    function update() {
      var vh = window.innerHeight || document.documentElement.clientHeight, on = document.body.classList.contains("ti-tray-open") || document.body.classList.contains("ti-menu-open");
      for (var i = 0; i < zones.length && !on; i++) {
        var z = zones[i], target = z.querySelector("[data-wa-visible]") || z, r = target.getBoundingClientRect();
        if (r.top < vh * .9 && r.bottom > vh * .1) on = true;
      }
      document.body.classList.toggle("ti-wa-off", on);
    }
    var raf = null;
    waZones = function () { if (!raf) raf = requestAnimationFrame(function () { raf = null; update(); }); };
    waZones(); window.addEventListener("scroll", waZones, { passive: true }); window.addEventListener("resize", waZones);
  }

  /* ---------- Anclas con scroll por JS (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var head = document.querySelector(".ti-bar"), top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight + 24 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  TI.go = go;
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href"); if (href.length < 2) return;
      var el = document.querySelector(href); if (!el) return;
      e.preventDefault(); closeMenu(); closeTray();
      var shape = a.getAttribute("data-pz-shape");
      if (shape && TI.setShape) TI.setShape(shape);
      if (href === "#top") window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); else go(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  function init() { initWa(); initPunzon(); initHeader(); initMenu(); initParo(); initWaHide(); initReveal(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
