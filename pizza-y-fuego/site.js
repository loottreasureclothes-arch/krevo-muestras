/* Pizza y Fuego · FUNDACIÓN: WhatsApp, menú hamburguesa, WA flotante, blindaje, anclas, ?mesa=N
   API para secciones:
     window.PF.WA            número (524498974488)
     window.PF.waUrl(msg)    link wa.me con el texto codificado
     window.PF.openWa(msg, fallbackEl?)  abre WhatsApp; si el navegador lo bloquea cae a location.href
     window.PF.today()       0-6 (domingo = 0) en hora de Aguascalientes
     window.PF.mesa          número de mesa si la URL trae ?mesa=N (o null)
   [data-wa="mensaje"] en cualquier <a> arma su link solo. [data-hide-wa] esconde el WA flotante. */
(function () {
  "use strict";
  var WA = "524498974488";
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
      var n = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short" }).format(new Date());
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(n);
    } catch (e) { return new Date().getDay(); }
  }
  var mesa = null;
  try { var m = new URLSearchParams(location.search).get("mesa"); if (m && /^\d{1,3}$/.test(m)) mesa = parseInt(m, 10); } catch (e) {}
  window.PF = { WA: WA, waUrl: waUrl, openWa: openWa, today: today, mesa: mesa };

  /* Pago con tarjeta (PENDIENTE-DUEÑO): mientras no haya link, el botón secundario
     "Pagar con tarjeta" queda oculto en pedido y reunión. Cuando exista, se llena aquí. */
  window.PF_PAGO_LINK = window.PF_PAGO_LINK || "";
  function initPago() {
    var els = document.querySelectorAll("[data-pago-btn]");
    if (!els.length) return;
    var link = window.PF_PAGO_LINK || "";
    Array.prototype.forEach.call(els, function (a) {
      if (link) { a.href = link; a.hidden = false; }
      else { a.hidden = true; a.removeAttribute("href"); }
    });
  }

  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      var a = links[i], msg = a.getAttribute("data-wa");
      if (a.tagName !== "A") continue;
      a.href = waUrl(msg && msg.length > 3 ? msg : "Hola Pizza y Fuego, quiero información.");
      a.target = "_blank"; a.rel = "noopener";
    }
  }

  function initNav() {
    var btn = document.querySelector(".pf-menu-btn"), nav = document.getElementById("pf-nav");
    if (!btn || !nav) return;
    var body = document.body, pushed = false;
    Array.prototype.forEach.call(nav.querySelectorAll(".pf-nav-list > a"), function (a, i) { a.style.setProperty("--i", i); });
    var links = nav.querySelectorAll("a");
    function set(open, fromPop) {
      if (open === body.classList.contains("pf-nav-open")) return;
      body.classList.toggle("pf-nav-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Cerrar navegación" : "Abrir navegación");
      nav.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) {
        try { history.pushState({ pfNav: 1 }, ""); pushed = true; } catch (e) {}
        setTimeout(function () { links[0].focus({ preventScroll: true }); }, 80);
      } else {
        if (pushed && !fromPop) { pushed = false; try { history.back(); } catch (e) {} }
        pushed = false;
        btn.focus({ preventScroll: true });
      }
    }
    window.addEventListener("popstate", function () { if (body.classList.contains("pf-nav-open")) set(false, true); });
    btn.addEventListener("click", function () { set(!body.classList.contains("pf-nav-open")); });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") || e.target.classList.contains("pf-nav-scrim")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("pf-nav-open")) return;
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

  /* WA flotante: fuera sobre [data-hide-wa], #menu, #reserva y el footer; con una hoja abierta lo esconde site.css (html.pf-mm-lock) */
  function initWaHide() {
    setTimeout(function () { document.body.classList.add("pf-wa-ready"); }, 2000);
    if (!("IntersectionObserver" in window)) return;
    var on = new Set();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) on.add(e.target); else on.delete(e.target); });
      document.body.classList.toggle("pf-wa-off", on.size > 0);
    }, { rootMargin: "0px 0px -12% 0px" });
    var seen = [];
    function scan() {
      Array.prototype.forEach.call(document.querySelectorAll("[data-hide-wa], #menu, #reunion, .pf-foot"), function (z) {
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
    }, { rootMargin: "0px 0px 0px 0px" });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
  }

  /* Fotos que entran desde blur: reveal rápido por IO + red de seguridad a 1.6 s (nunca se quedan borrosas) */
  function initBlurIn() {
    var els = document.querySelectorAll("[data-blur-in]");
    if (!els.length) return;
    function show(el) { el.classList.add("is-in"); }
    if (reduce || !("IntersectionObserver" in window)) { Array.prototype.forEach.call(els, show); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); show(e.target); } });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.15 });
    Array.prototype.forEach.call(els, function (el) {
      io.observe(el);
      var fio = new IntersectionObserver(function (es2) {
        if (es2[0].isIntersecting) { fio.disconnect(); setTimeout(function () { show(el); }, 1600); }
      }, { rootMargin: "0px 0px 0px 0px" });
      fio.observe(el);
    });
  }

  /* Brillo al tocar */
  function initRipple() {
    if (reduce) return;
    document.addEventListener("pointerdown", function (e) {
      var b = e.target.closest && e.target.closest(".pf-btn:not(.pf-btn--link), .k-btn");
      if (!b) return;
      var r = b.getBoundingClientRect(), s = document.createElement("span");
      s.className = "pf-ripple"; s.style.left = (e.clientX - r.left) + "px"; s.style.top = (e.clientY - r.top) + "px";
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
      scrollToEl(el, true);
      try { history.replaceState(history.state, "", href); } catch (x2) {}
    });
  }
  /* ?mesa=N abre directo en el menú de mesa */
  function initMesa() {
    if (mesa === null) return;
    document.documentElement.classList.add("pf-mesa");
    function go() { var el = document.getElementById("menu"); if (el) scrollToEl(el, false); }
    if (document.readyState === "complete") go();
    else window.addEventListener("load", function () { requestAnimationFrame(go); }, { once: true });
    setTimeout(go, 60);
  }

  function init() { initWa(); initNav(); initWaHide(); initRevealSafety(); initRipple(); initAnchors(); initMesa(); initPago(); initBlurIn(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
