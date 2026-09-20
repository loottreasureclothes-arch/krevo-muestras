/* Vet Inn — motor base: WhatsApp (con la placa metida en el mensaje), header (compacta al
   pasar 40px), menu, reveal, titulos que caen y pegan, scroll suave. Vanilla, sin dependencias.
   La PLACA DE CANELA se arma en sections/01-hero.js; aqui solo vive el contrato de lectura
   (window.vetinnPlaca) para que cualquier boton de WhatsApp de la pagina la use igual. */
(function () {
  "use strict";
  var WA = "524492202495"; // 449 220 2495 — el numero real de Vet Inn (Google Maps + Facebook)
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Contrato de la placa (sessionStorage, try/catch, nunca revienta) ---------- */
  function vetinnPlaca() {
    try {
      var raw = sessionStorage.getItem("vetinn-placa");
      if (!raw) return null;
      var p = JSON.parse(raw);
      if (!p || !p.nombre) return null;
      return p;
    } catch (e) { return null; }
  }
  window.vetinnPlaca = vetinnPlaca;

  /* ---------- WhatsApp: arma el href de cualquier [data-vi-wa] con la placa al frente ---------- */
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  function waMsg(base) {
    var p = vetinnPlaca();
    var lead = "Hola. ";
    if (p && p.nombre) {
      lead = "Hola, es por " + p.nombre + (p.especie ? " (" + p.especie + ")" : "") + ". ";
    }
    return lead + base;
  }
  window.VIWa = { url: waUrl, msg: waMsg };
  function initWa() {
    function apply() {
      var links = document.querySelectorAll("[data-vi-wa]");
      for (var i = 0; i < links.length; i++) {
        var l = links[i];
        l.href = waUrl(waMsg(l.getAttribute("data-vi-wa")));
        l.target = "_blank";
        l.rel = "noopener";
      }
    }
    apply();
    /* la placa puede llenarse despues de pintado el header/cierre: se re-arma el href */
    window.addEventListener("vetinn:placa", apply);
  }

  /* ---------- Header: transparente arriba; al pasar 40px compacta a 48px con fondo solido,
     linea punteada y el wordmark se encoge a "V." ---------- */
  function initHeader() {
    var header = document.getElementById("vi-header");
    if (!header) return;
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY || window.pageYOffset || 0;
      header.classList.toggle("is-compact", y > 40);
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- WhatsApp flotante: se esconde si hay un boton verde de seccion a la vista ---------- */
  function initWaFloatHide() {
    var float = document.querySelector(".vi-wa-float");
    if (!float || !("IntersectionObserver" in window)) return;
    var targets = Array.prototype.slice.call(document.querySelectorAll(".vi-btn--wa"));
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

  /* ---------- Menu: panel completo (celular) / tablero desde la derecha (compu) ---------- */
  function initMenu() {
    var toggles = document.querySelectorAll(".vi-menu-toggle");
    var closeBtn = document.querySelector(".vi-menu-close");
    var menu = document.getElementById("vi-menu");
    if (!menu || !toggles.length) return;
    var body = document.body;
    Array.prototype.forEach.call(menu.querySelectorAll(".vi-menu-nav > a"), function (el, i) {
      el.style.setProperty("--i", i);
    });
    var focusables = menu.querySelectorAll("a, button");
    function set(open) {
      var was = body.classList.contains("vi-menu-open");
      if (open === was) return;
      body.classList.toggle("vi-menu-open", open);
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      Array.prototype.forEach.call(toggles, function (b) { b.setAttribute("aria-expanded", open ? "true" : "false"); });
      if (open) setTimeout(function () { closeBtn && closeBtn.focus({ preventScroll: true }); }, 80);
      else toggles[0].focus({ preventScroll: true });
    }
    Array.prototype.forEach.call(toggles, function (b) {
      b.addEventListener("click", function () { set(!body.classList.contains("vi-menu-open")); });
    });
    if (closeBtn) closeBtn.addEventListener("click", function () { set(false); });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a") || e.target.classList.contains("vi-menu-scrim")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("vi-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [closeBtn].concat(Array.prototype.slice.call(focusables));
        var i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* ---------- Estado activo del menu: resalta la seccion a la vista (NOTA GLOBAL 1) ---------- */
  function initMenuActive() {
    var links = document.querySelectorAll(".vi-menu-nav > a[href^='#']");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var porId = {};
    Array.prototype.forEach.call(links, function (a) { porId[a.getAttribute("href").slice(1)] = a; });
    var secciones = Object.keys(porId).map(function (id) { return document.getElementById(id); }).filter(Boolean);
    if (!secciones.length) return;
    function marcar(id) {
      Array.prototype.forEach.call(links, function (a) { a.classList.remove("is-active"); });
      if (porId[id]) porId[id].classList.add("is-active");
    }
    var io = new IntersectionObserver(function (entries) {
      var visible = entries.filter(function (e) { return e.isIntersecting; });
      if (!visible.length) return;
      visible.sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
      marcar(visible[0].target.id);
    }, { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] });
    secciones.forEach(function (s) { io.observe(s); });
  }

  /* ---------- Scroll suave a #anclas ---------- */
  function scrollToId(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var top = el.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 60) - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.VIScroll = scrollToId;
  function initSmoothAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (!href || href.length < 2) return;
      var id = href.slice(1);
      if (!document.getElementById(id)) return; // ancla de una seccion que aun no existe (turno 2)
      e.preventDefault();
      scrollToId(id);
      if (history.replaceState) history.replaceState(null, "", "#" + id);
    });
  }

  /* ---------- Titulos que caen y pegan + reveal generico (con tope duro de 1.6s) ---------- */
  function wrapWords(el) {
    if (el.__viWrapped) return;
    el.__viWrapped = true;
    var text = el.textContent;
    el.textContent = "";
    var n = 0;
    text.split(/(\s+)/).forEach(function (part) {
      if (!part) return;
      if (/^\s+$/.test(part)) { el.appendChild(document.createTextNode(part)); return; }
      var outer = document.createElement("span");
      outer.className = "vi-drop-w";
      outer.style.setProperty("--i", n++);
      var inner = document.createElement("span");
      inner.textContent = part;
      outer.appendChild(inner);
      el.appendChild(outer);
    });
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
      setTimeout(function () { show(el); }, 1600); // tope duro anti-blanco (R8/L5)
    });
  }
  function initDropTitles() {
    var titles = document.querySelectorAll("[data-vi-drop]");
    if (!titles.length) return;
    titles.forEach(wrapWords);
    armReveal(Array.prototype.slice.call(titles));
  }
  function initReveal() {
    armReveal(Array.prototype.slice.call(document.querySelectorAll("[data-vi-reveal], [data-vi-reveal-stagger]")));
    document.querySelectorAll("[data-vi-reveal-stagger]").forEach(function (g) {
      Array.prototype.forEach.call(g.children, function (c, i) { c.style.setProperty("--i", i); });
    });
  }

  function init() {
    initWa();
    initHeader();
    initWaFloatHide();
    initMenu();
    initMenuActive();
    initSmoothAnchors();
    initDropTitles();
    initReveal();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
