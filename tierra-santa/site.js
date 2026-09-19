/* Tierra Santa Parrilla & Bistro · FUNDACIÓN (clonada de lamexico/site.js): WhatsApp, menú hamburguesa, WA flotante, blindaje, anclas, ?mesa=N
   API para secciones:
     window.TS.WA            número (524493894792)
     window.TS.waUrl(msg)    link wa.me con el texto codificado
     window.TS.openWa(msg, fallbackEl?)  abre WhatsApp; si el navegador lo bloquea cae a location.href
     window.TS.today()       0-6 (domingo = 0) en hora de Aguascalientes
     window.TS.mesa          número de mesa si la URL trae ?mesa=N (o null)
   [data-wa="mensaje"] en cualquier <a> arma su link solo. [data-hide-wa] esconde el WA flotante. */
(function () {
  "use strict";
  var WA = "524493894792";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + (msg ? "?text=" + encodeURIComponent(msg) : ""); }
  function openWa(msg, fb) {
    var url = waUrl(msg), w = null;
    if (fb) { fb.href = url; fb.hidden = false; }
    try { w = window.open(url, "_blank", "noopener"); } catch (e) { w = null; }
    if (!w) { try { location.href = url; } catch (e2) {} }
    return url;
  }
  function today() {
    try {
      var n = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short" }).format(new Date());
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(n);
    } catch (e) { return new Date().getDay(); }
  }
  var mesa = null;
  try { var m = new URLSearchParams(location.search).get("mesa"); if (m && /^\d{1,3}$/.test(m)) mesa = parseInt(m, 10); } catch (e) {}
  /* Capas con "Atrás" (Android): cada hoja abierta mete una entrada al historial y Atrás cierra la de arriba.
     window.tsLayer.open(nombre, cerrar) / .close(nombre). La usan hoja de accesos, platillo, pedido, mesero y lightbox. */
  window.tsLayer = window.tsLayer || (function () {
    var stack = [], skip = 0;
    window.addEventListener('popstate', function () {
      if (skip > 0) { skip--; return; }
      var top = stack.pop();
      if (top) top.fn();
    });
    return {
      open: function (name, fn) {
        stack = stack.filter(function (x) { return x.name !== name; });
        stack.push({ name: name, fn: fn });
        try { history.pushState({ tsLayer: name }, ''); } catch (e) {}
      },
      close: function (name) {
        var i = -1;
        for (var k = stack.length - 1; k >= 0; k--) if (stack[k].name === name) { i = k; break; }
        if (i < 0) return;
        stack.splice(i, 1);
        skip++;
        try { history.back(); } catch (e) { skip--; }
      }
    };
  })();
  window.TS = { WA: WA, waUrl: waUrl, openWa: openWa, today: today, mesa: mesa };

  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      var a = links[i], msg = a.getAttribute("data-wa");
      if (a.tagName !== "A") continue;
      a.href = waUrl(msg && msg.length > 3 ? msg : "Hola, quiero información de Tierra Santa Parrilla & Bistro.");
      a.target = "_blank"; a.rel = "noopener";
    }
  }

  function initNav() {
    var btn = document.querySelector(".ts-menu-btn"), nav = document.getElementById("ts-nav");
    if (!btn || !nav) return;
    var body = document.body, pushed = false;
    Array.prototype.forEach.call(nav.querySelectorAll(".ts-nav-list > a"), function (a, i) { a.style.setProperty("--i", i); });
    var links = nav.querySelectorAll("a");
    function set(open, fromPop) {
      if (open === body.classList.contains("ts-nav-open")) return;
      body.classList.toggle("ts-nav-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Cerrar navegación" : "Abrir navegación");
      nav.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) {
        try { history.pushState({ tsNav: 1 }, ""); pushed = true; } catch (e) {}
        setTimeout(function () { links[0].focus({ preventScroll: true }); }, 80);
      } else {
        if (pushed && !fromPop) { pushed = false; try { history.back(); } catch (e) {} }
        pushed = false;
        btn.focus({ preventScroll: true });
      }
    }
    window.addEventListener("popstate", function () { if (body.classList.contains("ts-nav-open")) set(false, true); });
    btn.addEventListener("click", function () { set(!body.classList.contains("ts-nav-open")); });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") || e.target.classList.contains("ts-nav-scrim")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("ts-nav-open")) return;
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

  /* WA flotante: fuera sobre [data-hide-wa], #menu, #reserva y el footer; con una hoja abierta lo esconde site.css (html.ts-mm-lock) */
  function initWaHide() {
    setTimeout(function () { document.body.classList.add("ts-wa-ready"); }, 2000);
    if (!("IntersectionObserver" in window)) return;
    var on = new Set();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) on.add(e.target); else on.delete(e.target); });
      document.body.classList.toggle("ts-wa-off", on.size > 0);
    }, { rootMargin: "0px 0px -12% 0px" });
    var seen = [];
    function scan() {
      Array.prototype.forEach.call(document.querySelectorAll("[data-hide-wa], #menu, #reserva, #eventos, .ts-foot"), function (z) {
        if (seen.indexOf(z) < 0) { seen.push(z); io.observe(z); }
      });
    }
    scan(); setTimeout(scan, 1500);
  }

  /* Blindaje: a los 1.6 s de asomarse, todo [data-reveal] queda visible pase lo que pase */
  function initRevealSafety() {
    var els = document.querySelectorAll("[data-reveal], [data-reveal-stagger]");
    function show(el) { el.classList.add("is-in"); }
    if (reduce || !("IntersectionObserver" in window)) { Array.prototype.forEach.call(els, show); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target;
        setTimeout(function () { show(el); }, 1600);
      });
    }, { rootMargin: "0px 0px -25% 0px" });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
  }

  /* Brillo al tocar */
  function initRipple() {
    if (reduce) return;
    document.addEventListener("pointerdown", function (e) {
      var b = e.target.closest && e.target.closest(".ts-btn:not(.ts-btn--link), .k-btn");
      if (!b) return;
      var r = b.getBoundingClientRect(), s = document.createElement("span");
      s.className = "ts-ripple"; s.style.left = (e.clientX - r.left) + "px"; s.style.top = (e.clientY - r.top) + "px";
      b.appendChild(s); setTimeout(function () { s.remove(); }, 460);
    });
  }

  function scrollToEl(el, smooth) {
    var head = document.querySelector(".k-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: smooth && !reduce ? "smooth" : "auto" });
  }
  /* anclas con scroll suave por JS (nada de scroll-behavior en html) */
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (href.length < 2 || href.indexOf("?") > -1) return;
      var el; try { el = document.querySelector(href); } catch (x) { return; }
      if (!el) return;
      e.preventDefault();
      go(href, true);
    });
  }
  /* ir a un ancla: avisa antes (el menú muestra la categoría pedida) y luego baja */
  function go(href, smooth) {
    var el; try { el = document.querySelector(href); } catch (x) { return; }
    if (!el) return;
    try { document.dispatchEvent(new CustomEvent("ts:goto", { detail: href })); } catch (x) {}
    scrollToEl(el, smooth);
    try { history.replaceState(history.state, "", href); } catch (x2) {}
  }
  window.TS.go = go;
  /* ?mesa=N abre directo en el menú de mesa */
  function initMesa() {
    if (mesa === null) return;
    document.documentElement.classList.add("ts-mesa");
    function go() { var el = document.getElementById("menu"); if (el) scrollToEl(el, false); }
    if (document.readyState === "complete") go();
    else window.addEventListener("load", function () { requestAnimationFrame(go); }, { once: true });
    setTimeout(go, 60);
  }

  function init() { initWa(); initNav(); initWaHide(); initRevealSafety(); initRipple(); initAnchors(); initMesa(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
