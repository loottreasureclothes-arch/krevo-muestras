/* Everclean Ags — motor. WhatsApp con <a href> real, header, menu, carrito de "Mi visita",
   reveal discreto. Vanilla, sin dependencias, un solo listener de scroll. */
(function () {
  "use strict";
  var WA = "524491925369";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  window.ECWa = { url: waUrl, num: WA };

  /* ---------- WhatsApp: el href ya viene armado del build; aqui solo se refresca ----------
     NUNCA window.open: dentro del navegador de Instagram/Facebook lo bloquean (leccion 20 sep). */
  function initWa() {
    var links = document.querySelectorAll("a[data-ec-wa]");
    for (var i = 0; i < links.length; i++) {
      links[i].href = waUrl(links[i].getAttribute("data-ec-wa"));
    }
  }

  /* ---------- Header: se compacta y el arco de ola se plancha ---------- */
  function initHeader() {
    var header = document.getElementById("ec-header");
    if (!header) return function () {};
    return function () { header.classList.toggle("is-compact", (window.scrollY || 0) > 40); };
  }

  /* ---------- Menu: marca la seccion en pantalla ---------- */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".ec-menu-nav a[href^='#']"));
    var mapa = [];
    links.forEach(function (a) {
      var el = document.getElementById(a.getAttribute("href").slice(1));
      if (el) mapa.push({ a: a, el: el });
    });
    if (!mapa.length) return function () {};
    return function () {
      var linea = (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 62) + 14;
      var activo = mapa[0];
      for (var i = 0; i < mapa.length; i++) {
        if (mapa[i].el.getBoundingClientRect().top - linea <= 0) activo = mapa[i];
      }
      if (window.innerHeight + (window.scrollY || 0) >= document.documentElement.scrollHeight - 4) activo = mapa[mapa.length - 1];
      for (var j = 0; j < mapa.length; j++) {
        if (mapa[j] === activo) mapa[j].a.setAttribute("aria-current", "true");
        else mapa[j].a.removeAttribute("aria-current");
      }
    };
  }

  function initScroll() {
    var tickHeader = initHeader(), tickSpy = initScrollSpy(), ticking = false;
    function tick() { ticking = false; tickHeader(); tickSpy(); }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(tick); }
    }, { passive: true });
    window.addEventListener("resize", tick, { passive: true });
    tick();
  }

  /* ---------- Flotante: se esconde cuando ya hay un verde a la vista o en el pie ---------- */
  function initWaFloatHide() {
    var float = document.querySelector(".ec-wa-float");
    if (!float || !("IntersectionObserver" in window)) return;
    var targets = Array.prototype.slice.call(document.querySelectorAll(".ec-btn--wa, .ec-foot, [data-ec-hide-wa]"));
    if (!targets.length) return;
    var visibles = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) visibles.add(e.target); else visibles.delete(e.target); });
      float.classList.toggle("is-hidden-by-btn", visibles.size > 0);
    }, { threshold: 0.01 });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---------- Menu de pantalla ---------- */
  function initMenu() {
    var toggles = document.querySelectorAll(".ec-menu-toggle");
    var closeBtn = document.querySelector(".ec-menu-close");
    var menu = document.getElementById("ec-menu");
    if (!menu || !toggles.length) return;
    var body = document.body;
    function set(open) {
      if (open === body.classList.contains("ec-menu-open")) return;
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
        var items = [closeBtn].concat(Array.prototype.slice.call(menu.querySelectorAll("a, button")));
        var i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
    window.ECMenu = { cerrar: function () { set(false); } };
  }

  /* ---------- Anclas suaves ---------- */
  function scrollToId(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var top = el.getBoundingClientRect().top + window.scrollY -
      (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 62) - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.ECScroll = scrollToId;
  function initSmoothAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var id = (a.getAttribute("href") || "").slice(1);
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      scrollToId(id);
      if (history.replaceState) history.replaceState(null, "", "#" + id);
    });
  }

  /* ---------- Mi visita: carrito compartido entre secciones ----------
     Cualquier [data-ec-add="Pieza"] suma una pieza. El estado vive aqui y quien
     lo necesite escucha "ec:visita". No usa almacenamiento del navegador. */
  var carrito = [];                 // [{pieza, n}]
  function suma(pieza) {
    if (!pieza) return;
    for (var i = 0; i < carrito.length; i++) {
      if (carrito[i].pieza === pieza) { carrito[i].n++; avisa(); return; }
    }
    carrito.push({ pieza: pieza, n: 1 });
    avisa();
  }
  function resta(pieza) {
    for (var i = 0; i < carrito.length; i++) {
      if (carrito[i].pieza === pieza) {
        carrito[i].n--;
        if (carrito[i].n <= 0) carrito.splice(i, 1);
        avisa(); return;
      }
    }
  }
  function total() { return carrito.reduce(function (a, x) { return a + x.n; }, 0); }
  function avisa() {
    window.dispatchEvent(new CustomEvent("ec:visita", { detail: { items: carrito.slice(), total: total() } }));
  }
  window.ECVisita = {
    suma: suma, resta: resta, total: total,
    items: function () { return carrito.slice(); },
    limpia: function () { carrito = []; avisa(); }
  };

  function initAdd() {
    document.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("[data-ec-add]");
      if (!b) return;
      var pieza = b.getAttribute("data-ec-add");
      if (b.hasAttribute("data-ec-resta")) resta(pieza); else suma(pieza);
      b.classList.add("is-hit");
      setTimeout(function () { b.classList.remove("is-hit"); }, 320);
      if (b.closest(".ec-menu")) {
        window.ECMenu && window.ECMenu.cerrar();
        setTimeout(function () { scrollToId("50-visita"); }, 240);
      }
    });
  }

  /* ---------- Reveal: entra una vez y se queda (nada que se apague al subir) ---------- */
  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll("[data-ec-reveal]"));
    if (!els.length) return;
    function show(el) { el.classList.add("is-in"); }
    if (reduce || !("IntersectionObserver" in window)) { els.forEach(show); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.01 });
    els.forEach(function (el) {
      io.observe(el);
      setTimeout(function () { show(el); }, 1600);   // tope duro anti-blanco
    });
  }

  function init() {
    document.documentElement.classList.add("js");
    initWa();
    initScroll();
    initWaFloatHide();
    initMenu();
    initSmoothAnchors();
    initAdd();
    initReveal();
    avisa();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
