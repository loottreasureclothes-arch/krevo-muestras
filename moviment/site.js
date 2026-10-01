/* MoviMent: mecánica común (header, letra grande, menú, WhatsApp, reveal, anclas). */
(function () {
  "use strict";
  var WA = "524493660510";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  window.MVwaUrl = waUrl;

  /* Los botones de WhatsApp NACEN con su href real; aquí solo se confirma el mensaje (sin preventDefault ni window.open). */
  function initWa() {
    var links = document.querySelectorAll("a[data-wa]");
    for (var i = 0; i < links.length; i++) {
      links[i].href = waUrl(links[i].getAttribute("data-wa"));
      links[i].target = "_blank"; links[i].rel = "noopener";
    }
  }

  function initHeader() {
    var header = document.getElementById("mv-header"); if (!header) return;
    var ticking = false;
    function update() { ticking = false; header.classList.toggle("is-compact", (window.scrollY || window.pageYOffset) > 40); }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* Letra grande: html.letra-grande, recordada en localStorage (siempre en try/catch). */
  function initAa() {
    var b = document.getElementById("mv-aa"); if (!b) return;
    function set(on, save) {
      document.documentElement.classList.toggle("letra-grande", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.setAttribute("aria-label", on ? "Letra normal" : "Letra más grande");
      if (save) { try { localStorage.setItem("mv_letra", on ? "1" : "0"); } catch (e) {} }
    }
    var saved = false; try { saved = localStorage.getItem("mv_letra") === "1"; } catch (e) {}
    if (saved) set(true, false);
    b.addEventListener("click", function () { set(!document.documentElement.classList.contains("letra-grande"), true); });
  }

  /* Menú a pantalla completa: foco atrapado, Escape, "atrás" de Android y tocar un link lo cierran. */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.getElementById("mv-menu-btn"), menu = document.getElementById("mv-menu");
    if (!btn || !menu) return;
    var body = document.body, lbl = btn.querySelector(".mv-menu-lbl"), links = menu.querySelectorAll("a"), pushed = false;
    function set(open, fromPop) {
      if (open === body.classList.contains("mv-menu-open")) return;
      body.classList.toggle("mv-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
      if (open) {
        try { history.pushState({ mvMenu: 1 }, ""); pushed = true; } catch (e) {}
        setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      } else {
        if (pushed && !fromPop) { pushed = false; try { history.back(); } catch (e) {} }
        pushed = false;
        btn.focus({ preventScroll: true });
      }
    }
    closeMenu = function () { set(false, true); };
    btn.addEventListener("click", function () { set(!body.classList.contains("mv-menu-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a) { if (a.classList.contains("mv-wa")) { body.classList.remove("mv-menu-open"); btn.setAttribute("aria-expanded", "false"); menu.setAttribute("aria-hidden", "true"); if (lbl) lbl.textContent = "Menú"; return; } return; }
      if (e.target === menu || e.target.classList.contains("mv-menu-nav")) set(false);
    });
    window.addEventListener("popstate", function () { if (body.classList.contains("mv-menu-open")) set(false, true); });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("mv-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(Array.prototype.slice.call(links)), i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  function watchVisible(list, vhFrac, onVisible) {
    var pending = Array.prototype.slice.call(list); if (!pending.length) return;
    var raf = null;
    function tick() {
      raf = null; var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * vhFrac && r.bottom > 0) onVisible(pending.splice(i, 1)[0]);
      }
      if (pending.length) schedule();
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(tick); }
    schedule(); window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", schedule);
  }

  /* WhatsApp flotante: se esconde donde ya hay un botón verde a la vista ([data-hide-wa]). */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]"); if (!zones.length) return;
    var raf = null;
    function update() {
      var vh = window.innerHeight || document.documentElement.clientHeight, on = false;
      for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh && r.bottom > 0) { on = true; break; } }
      document.body.classList.toggle("mv-wa-off", on);
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(function () { raf = null; update(); }); }
    schedule(); window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", schedule);
  }

  /* Reveal normal; el seguro de 1.6 s vive en template.html. Las fotos esperan su decode(). */
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]"); if (!els.length) return;
    function show(el) { el.classList.add("is-in"); }
    function reveal(el) {
      var img = el.hasAttribute("data-blur") ? el.querySelector("img") : null;
      if (!img || img.complete) { show(el); return; }
      var done = false; function go() { if (done) return; done = true; show(el); }
      if (img.decode) img.decode().then(go, go); else { img.addEventListener("load", go); img.addEventListener("error", go); }
      setTimeout(go, 1200);
    }
    if (reduce) { Array.prototype.forEach.call(els, show); return; }
    watchVisible(els, 0.92, reveal);
  }

  function go(el) {
    var bar = document.querySelector(".mv-bar");
    var top = el.getBoundingClientRect().top + window.scrollY - (bar ? bar.offsetHeight + 14 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.MVir = go;
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented || a.hasAttribute("data-door")) return;
      var href = a.getAttribute("href"); if (href.length < 2) return;
      var el = document.querySelector(href); if (!el) return;
      e.preventDefault(); closeMenu(); go(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  function init() { initWa(); initHeader(); initAa(); initMenu(); initWaHide(); initReveal(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
