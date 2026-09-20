/* Everclean Ags — motor base: WhatsApp, header (LA OLA QUE SE PLANCHA), menú, reveal + blindaje,
   títulos que caen, EL PAR QUE EMBONA (componente firma). Vanilla, sin dependencias. */
(function () {
  "use strict";
  var WA = "524491925369";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* ---------- WhatsApp: arma el href de cualquier [data-ec-wa] ---------- */
  function initWa() {
    var links = document.querySelectorAll("[data-ec-wa]");
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var href = waUrl(a.getAttribute("data-ec-wa"));
      a.addEventListener("click", function (e) {
        var url = this.href;
        var w = window.open(url, "_blank", "noopener");
        if (!w) { e.preventDefault(); location.href = url; }
      });
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener";
    }
  }
  window.ECWa = { url: waUrl };

  /* ---------- Header: banda 64->48px, el arco se plancha a línea recta cian ----------
     Reversible, 240ms. No se esconde el header (a diferencia de otras muestras): aquí el
     truco es solo el planchado del arco, pedido explícito de la hoja de dirección. */
  function initHeader() {
    var header = document.getElementById("ec-header");
    if (!header) return;
    var ticking = false;
    function update() {
      ticking = false;
      header.classList.toggle("is-compact", (window.scrollY || 0) > 40);
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- WhatsApp flotante: se esconde si un botón verde de sección o el pie ya se ven ---------- */
  function initWaFloatHide() {
    var float = document.querySelector(".ec-wa-float");
    if (!float || !("IntersectionObserver" in window)) return;
    /* ID que empieza con digito: no se puede pasar a querySelector, va por getElementById. */
    var targets = Array.prototype.slice.call(document.querySelectorAll(".ec-btn--wa, .ec-foot"));
    var completar = document.getElementById("70-completar"); // tapaba el renglon de honestidad
    if (completar) targets.push(completar);
    if (!targets.length) return;
    var visibles = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) visibles.add(e.target); else visibles.delete(e.target);
      });
      float.classList.toggle("is-hidden-by-btn", visibles.size > 0);
    }, { threshold: 0.01 });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---------- Menú pantalla completa ---------- */
  function initMenu() {
    var toggles = document.querySelectorAll(".ec-menu-toggle");
    var closeBtn = document.querySelector(".ec-menu-close");
    var menu = document.getElementById("ec-menu");
    if (!menu || !toggles.length) return;
    var body = document.body;
    var focusables = menu.querySelectorAll("a, button");
    function set(open) {
      var was = body.classList.contains("ec-menu-open");
      if (open === was) return;
      body.classList.toggle("ec-menu-open", open);
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      Array.prototype.forEach.call(toggles, function (b) { b.setAttribute("aria-expanded", open ? "true" : "false"); });
      if (open) setTimeout(function () { closeBtn && closeBtn.focus({ preventScroll: true }); }, 80);
      else toggles[0].focus({ preventScroll: true });
    }
    Array.prototype.forEach.call(toggles, function (b) {
      b.addEventListener("click", function () { set(!body.classList.contains("ec-menu-open")); });
    });
    if (closeBtn) closeBtn.addEventListener("click", function () { set(false); });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a") || e.target.classList.contains("ec-menu-scrim")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("ec-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [closeBtn].concat(Array.prototype.slice.call(focusables));
        var i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
    /* Piezas del menú: turno 2 conecta esto a "Mi visita" (evento ec:pieza) cuando exista el
       catálogo (#20-catalogo). Por ahora solo cierra el menú y baja, sin tronar si no existe. */
    menu.querySelectorAll("[data-ec-pieza]").forEach(function (b) {
      b.addEventListener("click", function () {
        window.dispatchEvent(new CustomEvent("ec:pieza", { detail: { pieza: b.getAttribute("data-ec-pieza") || "" } }));
        set(false);
        setTimeout(function () { scrollToId("20-catalogo"); }, 260);
      });
    });
  }

  /* ---------- Menu: en que seccion va el visitante (aria-current + costura cian) ----------
     Lo unico que Emanuel pidio del menu: que se sienta navegacion de verdad. Marca el renglon
     de la seccion que esta en pantalla, se actualiza al bajar y al girar el telefono. */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".ec-menu-nav a[href^='#']"));
    var mapa = [];
    links.forEach(function (a) {
      var el = document.getElementById(a.getAttribute("href").slice(1));
      if (el) mapa.push({ a: a, el: el });
    });
    if (!mapa.length) return;
    var ticking = false;
    function marca() {
      ticking = false;
      var linea = (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 56) + 14;
      var activo = mapa[0];
      for (var i = 0; i < mapa.length; i++) {
        if (mapa[i].el.getBoundingClientRect().top - linea <= 0) activo = mapa[i];
      }
      var fondo = window.innerHeight + (window.scrollY || 0) >= document.documentElement.scrollHeight - 4;
      if (fondo) activo = mapa[mapa.length - 1];
      for (var j = 0; j < mapa.length; j++) {
        if (mapa[j] === activo) mapa[j].a.setAttribute("aria-current", "true");
        else mapa[j].a.removeAttribute("aria-current");
      }
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(marca); }
    }, { passive: true });
    window.addEventListener("resize", marca, { passive: true });
    marca();
  }

  /* ---------- Scroll suave a #anclas ---------- */
  function scrollToId(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var top = el.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 64) - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.ECScroll = scrollToId;
  function initSmoothAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (!href || href.length < 2) return;
      var id = href.slice(1);
      if (!document.getElementById(id)) return; // seccion aun no existe (turno 2): no truena
      e.preventDefault();
      scrollToId(id);
      if (history.replaceState) history.replaceState(null, "", "#" + id);
    });
  }

  /* ---------- Títulos que caen y pegan ---------- */
  function wrapWords(el) {
    if (el.__ecWrapped) return;
    el.__ecWrapped = true;
    var n = 0;
    function wrapText(container) {
      var text = container.textContent;
      container.textContent = "";
      text.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { container.appendChild(document.createTextNode(part)); return; }
        var outer = document.createElement("span");
        outer.className = "ec-drop-w";
        outer.style.setProperty("--i", n++);
        var inner = document.createElement("span");
        inner.textContent = part;
        outer.appendChild(inner);
        container.appendChild(outer);
      });
    }
    /* Si el título trae líneas propias (spans de dos tonos, ej. ec-tono2), se envuelve el texto
       DENTRO de cada línea para no perder su color; si no, se envuelve el título completo. */
    var lineEls = Array.prototype.filter.call(el.childNodes, function (c) { return c.nodeType === 1; });
    if (lineEls.length) lineEls.forEach(wrapText);
    else wrapText(el);
  }
  function initDropTitles() {
    var titles = document.querySelectorAll("[data-ec-drop]");
    if (!titles.length) return;
    titles.forEach(wrapWords);
    armReveal(Array.prototype.slice.call(titles));
  }
  function armReveal(els) {
    if (!els.length) return;
    function show(el) { el.classList.add("is-in"); }
    if (reduce || !("IntersectionObserver" in window)) { els.forEach(show); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        show(e.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.1 });
    els.forEach(function (el) {
      io.observe(el);
      setTimeout(function () { show(el); }, 1600); // tope duro anti-blanco
    });
  }
  function initReveal() {
    armReveal(Array.prototype.slice.call(document.querySelectorAll("[data-ec-reveal]")));
  }

  /* ---------- EL PAR QUE EMBONA: motor del componente firma ----------
     Base CSS = estado final (las dos mitades ya juntas, costura fina siempre visible): blindaje.
     Con JS + motion ok: se separan (.ec-embona-pre, por media query en CSS) y este motor las
     vuelve a juntar con IntersectionObserver, reversible, sin pin, sin scrub, sin manija. */
  function initEmbona() {
    var els = Array.prototype.slice.call(document.querySelectorAll(".ec-embona"));
    if (!els.length) return;
    els.forEach(function (el, i) { el.style.setProperty("--stagger", (i * 180) + "ms"); });
    function show(el) { el.classList.add("is-in"); }
    function hide(el) { el.classList.remove("is-in"); }
    if (reduce || !("IntersectionObserver" in window)) { els.forEach(show); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) show(e.target); else hide(e.target); // reversible
      });
    }, { rootMargin: "0px 0px -25% 0px", threshold: 0.01 });
    els.forEach(function (el) {
      io.observe(el);
      setTimeout(function () { show(el); }, 1600); // tope duro anti-blanco
    });
  }

  function init() {
    document.documentElement.classList.add("js");
    initWa();
    initHeader();
    initWaFloatHide();
    initMenu();
    initScrollSpy();
    initSmoothAnchors();
    initDropTitles();
    initReveal();
    initEmbona();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
