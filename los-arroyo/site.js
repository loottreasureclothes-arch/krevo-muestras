/* Los Arroyo · FUNDACIÓN (clonada de La México): WhatsApp, menú hamburguesa, WA flotante, blindaje, anclas, ?mesa=N
   API para secciones:
     window.LM.WA            número (524495542823, Santa Anita)
     window.LM.waUrl(msg)    link wa.me con el texto codificado
     window.LM.openWa(msg, fallbackEl?)  abre WhatsApp; si el navegador lo bloquea cae a location.href
     window.LM.today()       0-6 (domingo = 0) en hora de Aguascalientes
     window.LM.mesa          número de mesa si la URL trae ?mesa=N (o null)
     window.LA_PAGO_LINK     link de pago con tarjeta (vacío = botón "Pagar con tarjeta" oculto en 15-kilo y 26-pedido)
   [data-wa="mensaje"] en cualquier <a> arma su link solo. [data-hide-wa] esconde el WA flotante. */
(function () {
  "use strict";
  var WA = "524495542823";
  window.LA_PAGO_LINK = window.LA_PAGO_LINK || ""; // link de pago con tarjeta (Stripe/Mercado Pago); vacío = el botón "Pagar con tarjeta" queda oculto
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* El menú hamburguesa y la hoja de los cuadritos meten una entrada al historial y la sacan con
     history.back() al cerrarse. Con scrollRestoration "auto" el navegador aprovecha ese back para
     devolver el scroll a donde estaba, y se comía el scroll suave del ancla recién tocada: tocabas
     "Banquetes" en la hamburguesa, se cerraba el menú y la página no se movía. En manual, el scroll
     lo manda solo el sitio. */
  try { if ("scrollRestoration" in history) history.scrollRestoration = "manual"; } catch (e) {}
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

  /* 19 sep: la cortina guinda de cambio de capítulo se borró completa (Emanuel: "cuadro rojo bien gacho"):
     la función, la regla .lm-curtain y los dos observers que la llamaban (15-kilo.js y 60-sabado.js). */

  window.LM = { WA: WA, waUrl: waUrl, openWa: openWa, today: today, mesa: mesa };

  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      var a = links[i], msg = a.getAttribute("data-wa");
      if (a.tagName !== "A") continue;
      var to = ((a.getAttribute("href") || "").match(/wa\.me\/(\d{10,13})/) || [])[1] || WA;
      a.href = "https://wa.me/" + to + "?text=" + encodeURIComponent(msg && msg.length > 3 ? msg : "Hola, quiero hacer un pedido en Los Arroyo.");
      a.target = "_blank"; a.rel = "noopener";
    }
  }

  function initNav() {
    var btn = document.querySelector(".lm-menu-btn"), nav = document.getElementById("lm-nav");
    if (!btn || !nav) return;
    var body = document.body, pushed = false;
    Array.prototype.forEach.call(nav.querySelectorAll(".lm-nav-list > a"), function (a, i) { a.style.setProperty("--i", i); });
    var links = nav.querySelectorAll("a");
    function set(open, fromPop) {
      if (open === body.classList.contains("lm-nav-open")) return;
      body.classList.toggle("lm-nav-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Cerrar navegación" : "Abrir navegación");
      nav.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) {
        try { history.pushState({ lmNav: 1 }, ""); pushed = true; } catch (e) {}
        setTimeout(function () { links[0].focus({ preventScroll: true }); }, 80);
      } else {
        if (pushed && !fromPop) { pushed = false; try { history.back(); } catch (e) {} }
        pushed = false;
        btn.focus({ preventScroll: true });
      }
    }
    window.addEventListener("popstate", function () { if (body.classList.contains("lm-nav-open")) set(false, true); });
    btn.addEventListener("click", function () { set(!body.classList.contains("lm-nav-open")); });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") || e.target.classList.contains("lm-nav-scrim")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("lm-nav-open")) return;
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

  /* WA flotante: fuera sobre [data-hide-wa], #menu, #reserva y el footer; con una hoja abierta lo esconde site.css (html.lm-mm-lock) */
  function initWaHide() {
    setTimeout(function () { document.body.classList.add("lm-wa-ready"); }, 2000);
    if (!("IntersectionObserver" in window)) return;
    var on = new Set();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) on.add(e.target); else on.delete(e.target); });
      document.body.classList.toggle("lm-wa-off", on.size > 0);
    }, { rootMargin: "0px 0px -12% 0px" });
    var seen = [];
    function scan() {
      Array.prototype.forEach.call(document.querySelectorAll("[data-hide-wa], #menu, #kilo, .lm-foot"), function (z) {
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

  /* Brillo al tocar */
  function initRipple() {
    if (reduce) return;
    document.addEventListener("pointerdown", function (e) {
      var b = e.target.closest && e.target.closest(".lm-btn:not(.lm-btn--link), .k-btn");
      if (!b) return;
      var r = b.getBoundingClientRect(), s = document.createElement("span");
      s.className = "lm-ripple"; s.style.left = (e.clientX - r.left) + "px"; s.style.top = (e.clientY - r.top) + "px";
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
    document.documentElement.classList.add("lm-mesa");
    function go() { var el = document.getElementById("menu"); if (el) scrollToEl(el, false); }
    if (document.readyState === "complete") go();
    else window.addEventListener("load", function () { requestAnimationFrame(go); }, { once: true });
    setTimeout(go, 60);
  }

  /* Topbar (horario + WhatsApp): se esconde al bajar 40 px, mismo umbral que kit.js usa para .k-header.is-solid,
     para que el header se compacte a una sola línea al mismo tiempo. body.la-scrolled mueve --la-bar-h/--la-head-row-h (site.css). */
  function initTopbar() {
    var ticking = false;
    function update() { ticking = false; document.body.classList.toggle("la-scrolled", (window.scrollY || window.pageYOffset) > 40); }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* Estrellas reales: arma fondo (5 apagadas) + capa recortada al % de data-r/5 sobre [data-r] .la-stars.
     Sin inventar calificación: el número/★ de texto que ya trae cada lugar sigue ahí, esto solo lo ilustra. */
  function initStars() {
    var els = document.querySelectorAll(".la-stars[data-r]");
    if (!els.length) return;
    var ICONS = '<svg aria-hidden="true"><use href="#i-star"/></svg>'.repeat(5);
    Array.prototype.forEach.call(els, function (el) {
      var r = Math.max(0, Math.min(5, parseFloat(el.getAttribute("data-r")) || 0));
      var bg = document.createElement("span"); bg.className = "la-stars-row la-stars-bg"; bg.innerHTML = ICONS;
      var fgWrap = document.createElement("span"); fgWrap.className = "la-stars-fg"; fgWrap.style.width = (r / 5 * 100) + "%";
      var fg = document.createElement("span"); fg.className = "la-stars-row"; fg.innerHTML = ICONS;
      fgWrap.appendChild(fg);
      el.appendChild(bg); el.appendChild(fgWrap);
    });
  }

  function init() { initWa(); initNav(); initWaHide(); initRevealSafety(); initRipple(); initAnchors(); initMesa(); initTopbar(); initStars(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

/* Títulos de sección [data-drop]: caen desde arriba (-60px) y pegan con rebote corto, una vez al asomar.
   Resorte muestreado: misma receta que el sello del kilo (15-kilo.js), copiada de closetdoor/10-msi.js.
   Blindaje: reposo del CSS ya trae el título puesto; solo se esconde con body.la-titles-js (scripting +
   sin prefers-reduced-motion, site.css), y 1.6 s después de asomarse queda puesto pase lo que pase. */
(function () {
  "use strict";
  var els = document.querySelectorAll("[data-drop]");
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!els.length || reduce || !document.body.animate || !("IntersectionObserver" in window)) return;
  document.body.classList.add("la-titles-js");

  function spring(n, amp, turns, decay) {
    var k = [];
    for (var i = 0; i <= n; i++) {
      var t = i / n;
      k.push(i === n ? 0 : amp * Math.exp(-decay * t) * Math.sin(turns * Math.PI * 2 * t));
    }
    return k;
  }
  function play(el) {
    var ND = 10, NB = 16, total = ND + NB, frames = [], i, t, e, y, start = -60;
    for (i = 0; i <= ND; i++) { t = i / ND; e = t * t * t; y = start * (1 - e); frames.push({ transform: "translateY(" + y.toFixed(2) + "px)", opacity: i === 0 ? 0 : 1, offset: i / total }); }
    var bounce = spring(NB, 8, 1.5, 4.6);
    for (i = 1; i <= NB; i++) { frames.push({ transform: "translateY(" + bounce[i - 1].toFixed(2) + "px)", opacity: 1, offset: (ND + i) / total }); }
    el.animate(frames, { duration: 700, easing: "linear" });
    el.classList.add("is-dropped");
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      play(e.target);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });
  Array.prototype.forEach.call(els, function (el) { io.observe(el); });

  /* Blindaje aparte, con su propio observador sin margen: el de arriba solo dispara cuando el título
     entra un 8% por encima del borde, así que si el cliente se queda con el título asomado justo
     abajo, nunca arrancaba el temporizador y el hueco se quedaba en blanco. Este mira "¿se ve aunque
     sea un pixel?" y a los 1.6 s lo deja puesto pase lo que pase. */
  var safe = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      safe.unobserve(e.target);
      var el = e.target;
      setTimeout(function () { el.classList.add("is-dropped"); }, 1600);
    });
  }, { threshold: 0 });
  Array.prototype.forEach.call(els, function (el) { safe.observe(el); });
})();
