/* Tania Repostería · FUNDACIÓN: WhatsApp, panel "Carta", títulos que caen, blindaje
   API para secciones:
     window.TR.WA            número (524494136499)
     window.TR.waUrl(msg)    link wa.me con el texto codificado
     window.TR.openWa(msg)   abre WhatsApp; si el navegador lo bloquea cae a location.href
     window.TR.today()       fecha de hoy en formato YYYY-MM-DD (hora de Aguascalientes), para el min del <input type=date>
   [data-wa="mensaje"] en cualquier <a> arma su link solo. [data-hide-wa] esconde el WA flotante. */
(function () {
  "use strict";
  var WA = "524494136499";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + (msg ? "?text=" + encodeURIComponent(msg) : ""); }
  function openWa(msg) {
    var url = waUrl(msg), w = null;
    try { w = window.open(url, "_blank"); if (w) w.opener = null; } catch (e) { w = null; }
    if (!w) { try { location.href = url; } catch (e2) {} }
    return url;
  }
  function today() {
    try {
      var f = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Mexico_City", year: "numeric", month: "2-digit", day: "2-digit" });
      return f.format(new Date()); // en-CA = YYYY-MM-DD
    } catch (e) {
      var d = new Date(); return d.toISOString().slice(0, 10);
    }
  }
  window.TR = { WA: WA, waUrl: waUrl, openWa: openWa, today: today };

  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      var a = links[i], msg = a.getAttribute("data-wa");
      if (a.tagName !== "A") continue;
      a.href = waUrl(msg && msg.length > 3 ? msg : "Hola Tania, quiero información.");
      a.target = "_blank"; a.rel = "noopener";
    }
  }

  /* Panel "Carta": misma mecánica de foco/atrás que el resto de KREVO, con clase en <html> */
  function initNav() {
    var btn = document.querySelector(".tr-menu-btn"), nav = document.getElementById("tr-nav");
    if (!btn || !nav) return;
    var root = document.documentElement, pushed = false;
    var links = nav.querySelectorAll("a");
    function set(open, fromPop) {
      if (open === root.classList.contains("tr-nav-open")) return;
      root.classList.toggle("tr-nav-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      nav.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) {
        try { history.pushState({ trNav: 1 }, ""); pushed = true; } catch (e) {}
        setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 90);
      } else {
        if (pushed && !fromPop) { pushed = false; try { history.back(); } catch (e) {} }
        pushed = false;
        btn.focus({ preventScroll: true });
      }
    }
    window.addEventListener("popstate", function () { if (root.classList.contains("tr-nav-open")) set(false, true); });
    btn.addEventListener("click", function () { set(!root.classList.contains("tr-nav-open")); });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") || e.target.classList.contains("tr-nav-scrim")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!root.classList.contains("tr-nav-open")) return;
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

  /* WA flotante fuera sobre [data-hide-wa] y el platón (ya trae su propio verde) */
  function initWaHide() {
    if (!("IntersectionObserver" in window)) return;
    var on = new Set();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) on.add(e.target); else on.delete(e.target); });
      document.body.classList.toggle("tr-wa-off", on.size > 0);
    }, { rootMargin: "0px 0px -12% 0px" });
    var seen = [];
    function scan() {
      Array.prototype.forEach.call(document.querySelectorAll("[data-hide-wa], #platon"), function (z) {
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
      if (!el) return;
      e.preventDefault();
      scrollToEl(el, true);
      try { history.replaceState(history.state, "", href); } catch (x2) {}
    });
  }

  /* Títulos que caen: .tr-fall[data-fall]. Una vez por título; blindaje a 1.6 s (nunca en blanco). */
  function initTitleDrop() {
    var els = document.querySelectorAll('.tr-fall[data-fall]');
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
    /* Blindaje: si un titulo lleva 900 ms asomado y el observador no lo disparo (entro apenas
       por el borde de abajo), cae de todos modos. Ningun titulo se queda en blanco. */
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
