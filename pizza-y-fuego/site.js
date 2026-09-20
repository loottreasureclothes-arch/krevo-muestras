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

  /* Estado activo del menú (NOTA GLOBAL 20 sep: hamburguesa y nav deben sentirse como navegación de verdad).
     Marca .is-on en el link de nav cuya sección está en pantalla. Solo observa secciones que existen en ESTA página
     (en menu.html casi todos los enlaces del header apuntan a index.html#x y no tienen sección local que observar). */
  function initNavActive() {
    var links = document.querySelectorAll('.k-nav a[href^="#"], .pf-nav-list a[href^="#"]');
    if (!links.length || !("IntersectionObserver" in window)) return;
    var pairs = [];
    Array.prototype.forEach.call(links, function (a) {
      var id = a.getAttribute("href").slice(1), sec = id && document.getElementById(id);
      if (sec) pairs.push({ a: a, sec: sec });
    });
    if (!pairs.length) return;
    function clear() { Array.prototype.forEach.call(links, function (a) { a.classList.remove("is-on"); a.removeAttribute("aria-current"); }); }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        clear();
        pairs.forEach(function (p) {
          if (p.sec !== e.target) return;
          p.a.classList.add("is-on"); p.a.setAttribute("aria-current", "true");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    pairs.forEach(function (p) { io.observe(p.sec); });
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

  /* Header propio de 2 pisos (franja + barra): --k-header-h se mide del alto real, porque
     al compactarse (.is-solid, la alterna _kit/kit.js a los 40 px de scroll) el header cambia
     de alto. Todo lo que ya usaba --k-header-h (menú pegajoso, hoja de la carta, anclas) sigue
     leyendo la variable en el momento, no hace falta tocar nada más. */
  function initHeaderH() {
    var header = document.querySelector(".k-header");
    if (!header) return;
    var root = document.documentElement, raf = null;
    function set() { raf = null; root.style.setProperty("--k-header-h", header.offsetHeight + "px"); }
    function queue() { if (!raf) raf = requestAnimationFrame(set); }
    set();
    window.addEventListener("resize", queue);
    window.addEventListener("scroll", queue, { passive: true });
    header.addEventListener("transitionend", set);
  }

  /* Títulos de sección: caen desde -60px y pegan con rebote corto (misma técnica que el 2014 /
     closetdoor-10-msi: resorte muestreado con WAAPI). Una vez por título; blindaje a 1.6 s.
     Caen los cuatro títulos de sección: menú, ubicación, reunión y quiénes somos. El que tiene
     renglones marcados (.ru-l de la reunión) cae renglón por renglón con 70 ms de diferencia.
     El único que no lleva esta caída es el hero: tiene su propia entrada por renglón con máscara. */
  function initTitleDrop() {
    var els = document.querySelectorAll("#pf-mm-title, #nos-t, #vi-t, #ru-t");
    if (!els.length || reduce || !("IntersectionObserver" in window) || !els[0].animate) return;
    function spring(n, amp, turns, decay, fmt) {
      var k = [];
      for (var i = 0; i <= n; i++) {
        var t = i / n, v = i === n ? 0 : amp * Math.exp(-decay * t) * Math.sin(turns * Math.PI * 2 * t);
        k.push({ transform: fmt(v) });
      }
      return k;
    }
    var played = new WeakSet();
    /* Si el título trae renglones marcados (.ru-l), caen ellos, escalonados; si no, cae el título entero. */
    function parts(el) {
      var ls = el.querySelectorAll(".ru-l");
      return ls.length ? Array.prototype.slice.call(ls) : [el];
    }
    function play(el) {
      if (played.has(el)) return;
      played.add(el);
      parts(el).forEach(function (p, i) {
        var d = i * 70;
        p.animate(
          [{ transform: "translateY(-60px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }],
          { duration: 430, delay: d, easing: "cubic-bezier(.32,0,.67,0)", fill: "forwards" }
        );
        p.animate(
          spring(18, 9, 1.4, 4.4, function (v) { return "translateY(" + v.toFixed(2) + "px)"; }),
          { duration: 320, delay: 420 + d, easing: "linear", composite: "add" }
        );
      });
    }
    function safe(el) {
      if (played.has(el)) return;
      played.add(el);
      parts(el).forEach(function (p) { p.style.opacity = "1"; p.style.transform = "none"; });
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); play(e.target); } });
    }, { threshold: 0.4, rootMargin: "0px 0px -10% 0px" });
    var fio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        fio.unobserve(e.target);
        var el = e.target;
        setTimeout(function () { safe(el); }, 1600);
      });
    });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); fio.observe(el); });
  }

  function init() { initWa(); initNav(); initNavActive(); initWaHide(); initRevealSafety(); initRipple(); initAnchors(); initMesa(); initPago(); initBlurIn(); initHeaderH(); initTitleDrop(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
