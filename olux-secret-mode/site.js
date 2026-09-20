/* Ólux American Style · secret mode — FUNDACIÓN: WhatsApp, panel de menú, títulos que caen, blindaje.
   API para secciones (turno 2 la usa igual):
     window.OS.WA            número real (524491371706)
     window.OS.waUrl(msg)    link wa.me con el texto codificado
     window.OS.openWa(msg)   abre WhatsApp; si el navegador lo bloquea cae a location.href
   [data-wa="mensaje"] en cualquier <a> arma su link solo. [data-hide-wa] esconde el WA flotante. */
(function () {
  "use strict";
  var WA = "524491371706"; /* WhatsApp real de la marca (research/hechos.md) */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + (msg ? "?text=" + encodeURIComponent(msg) : ""); }
  function openWa(msg) {
    var url = waUrl(msg), w = null;
    try { w = window.open(url, "_blank"); if (w) w.opener = null; } catch (e) { w = null; }
    if (!w) { try { location.href = url; } catch (e2) {} }
    return url;
  }
  window.OS = { WA: WA, waUrl: waUrl, openWa: openWa };

  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      var a = links[i], msg = a.getAttribute("data-wa");
      if (a.tagName !== "A") continue;
      a.href = waUrl(msg && msg.length > 3 ? msg : "Hola, vi su página y quiero preguntar por una pieza.");
      a.target = "_blank"; a.rel = "noopener";
    }
  }

  /* Panel de menú ("Carta"): mismo foco/atrás que el resto de KREVO */
  function initNav() {
    var btn = document.querySelector(".os-menu-btn"), nav = document.getElementById("os-nav");
    if (!btn || !nav) return;
    var root = document.documentElement, pushed = false;
    var links = nav.querySelectorAll("a");
    function set(open, fromPop) {
      if (open === root.classList.contains("os-nav-open")) return;
      root.classList.toggle("os-nav-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      nav.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) {
        try { history.pushState({ osNav: 1 }, ""); pushed = true; } catch (e) {}
        setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 90);
      } else {
        if (pushed && !fromPop) { pushed = false; try { history.back(); } catch (e) {} }
        pushed = false;
        btn.focus({ preventScroll: true });
      }
    }
    window.addEventListener("popstate", function () { if (root.classList.contains("os-nav-open")) set(false, true); });
    btn.addEventListener("click", function () { set(!root.classList.contains("os-nav-open")); });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") || e.target.classList.contains("os-nav-scrim")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!root.classList.contains("os-nav-open")) return;
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

  /* WA flotante fuera sobre [data-hide-wa] (el hero) */
  function initWaHide() {
    if (!("IntersectionObserver" in window)) return;
    var on = new Set();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) on.add(e.target); else on.delete(e.target); });
      document.body.classList.toggle("os-wa-off", on.size > 0);
    }, { rootMargin: "0px 0px -12% 0px" });
    var seen = [];
    function scan() {
      Array.prototype.forEach.call(document.querySelectorAll("[data-hide-wa]"), function (z) {
        if (seen.indexOf(z) < 0) { seen.push(z); io.observe(z); }
      });
    }
    scan(); setTimeout(scan, 1200);
  }

  function scrollToEl(el, smooth) {
    var head = document.querySelector(".k-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight : 0) - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: smooth && !reduce ? "smooth" : "auto" });
  }
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (href.length < 2 || href.indexOf("?") > -1) return;
      var el; try { el = document.querySelector(href); } catch (x) { return; }
      if (!el) return; /* huecos del turno 2: si aun no existe la seccion, no hace nada */
      e.preventDefault();
      scrollToEl(el, true);
      try { history.replaceState(history.state, "", href); } catch (x2) {}
    });
  }

  /* Títulos que caen: .os-fall[data-fall]. Una vez por título; blindaje a 1.6 s. */
  function initTitleDrop() {
    var els = document.querySelectorAll('.os-fall[data-fall]');
    if (!els.length) return;
    function show(el) { el.classList.add("is-fallen"); }
    if (reduce || !("IntersectionObserver" in window)) { Array.prototype.forEach.call(els, show); return; }
    var played = new WeakSet();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting || played.has(e.target)) return;
        played.add(e.target); io.unobserve(e.target);
        show(e.target);
      });
    }, { threshold: 0.3, rootMargin: "0px 0px -10% 0px" });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
    function cae(el) { if (played.has(el)) return; played.add(el); io.unobserve(el); show(el); }
    var armado = new WeakSet();
    function armar() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      Array.prototype.forEach.call(els, function (el) {
        if (played.has(el) || armado.has(el)) return;
        var r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < vh) {
          armado.add(el);
          window.setTimeout(function () { cae(el); }, 900);
        }
      });
    }
    var esperando = false;
    window.addEventListener("scroll", function () {
      if (esperando) return;
      esperando = true;
      window.requestAnimationFrame(function () { esperando = false; armar(); });
    }, { passive: true });
    window.setTimeout(function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      Array.prototype.forEach.call(els, function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < vh * 1.2) cae(el);
      });
      armar();
    }, 1600);
  }

  function init() { initWa(); initNav(); initWaHide(); initAnchors(); initTitleDrop(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
