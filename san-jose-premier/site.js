/* Constructora San José Premier: fundación (header con hilada, menú, WhatsApp, reveal, estado del mensaje). */
(function () {
  "use strict";
  var WA = "524491552309";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* ---------- Estado compartido: qué busca, con qué crédito, nombre ---------- */
  var SJ = (function () {
    var KEY = "sj_estado";
    var MODELOS = {
      una: { frase: "una casa de una planta, modelo Granada (88.91 m² de construcción)", etiqueta: "Una planta · Granada", medida: "88.91 m² de construcción · 129.50 m² de terreno" },
      dos: { frase: "una casa de dos plantas (130.36 m² de construcción)", etiqueta: "Dos plantas", medida: "130.36 m² de construcción · 141.75 m² de terreno" },
      excedente: { frase: "una casa con terreno excedente", etiqueta: "Casa con terreno excedente", medida: "Pregunta disponibilidad" },
      terrenos: { frase: "un terreno al sur de Aguascalientes", etiqueta: "Terreno al sur de Aguascalientes", medida: "Pregunta disponibilidad" },
      nose: { frase: "conocer sus opciones, todavía no sé cuál busco", etiqueta: "Todavía no sé", medida: "" }
    };
    var st = { modelo: null, credito: null, nombre: "" };
    try { var s = JSON.parse(localStorage.getItem(KEY) || "{}"); if (s && typeof s === "object") { if (MODELOS[s.modelo]) st.modelo = s.modelo; if (typeof s.credito === "string") st.credito = s.credito; if (typeof s.nombre === "string") st.nombre = s.nombre; } } catch (e) {}
    function persist() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }
    function emit() { try { window.dispatchEvent(new CustomEvent("sj:estado", { detail: st })); } catch (e) { var ev = document.createEvent("CustomEvent"); ev.initCustomEvent("sj:estado", false, false, st); window.dispatchEvent(ev); } }
    function set(k, v) { st[k] = v; persist(); emit(); }
    function message() {
      var p = ["Hola San José Premier, " + (st.modelo && MODELOS[st.modelo] ? "me interesa " + MODELOS[st.modelo].frase + "." : "quiero información de sus casas.")];
      if (st.credito) p.push("Compro con: " + st.credito + ".");
      p.push("Me gustaría agendar una visita.");
      if (st.nombre && st.nombre.trim()) p.push("Mi nombre: " + st.nombre.trim());
      return p.join(" ");
    }
    return { MODELOS: MODELOS, state: st, set: set, message: message, url: function () { return waUrl(message()); }, waUrl: waUrl, on: function (cb) { window.addEventListener("sj:estado", function () { cb(st); }); } };
  })();
  window.SJ = SJ;

  /* ---------- Links de WhatsApp: nacen con href real; aquí solo se confirman ---------- */
  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) links[i].href = waUrl(links[i].getAttribute("data-wa"));
    var dyn = document.querySelectorAll("[data-wa-dyn]");
    function refresh() { for (var j = 0; j < dyn.length; j++) dyn[j].href = SJ.url(); }
    for (var k = 0; k < dyn.length; k++) {
      dyn[k].addEventListener("pointerdown", refresh);
      dyn[k].addEventListener("click", refresh);
    }
    refresh();
    SJ.on(refresh);
  }

  /* ---------- Header: se compacta y la línea dorada se vuelve hilada con el scroll ---------- */
  function initHeader() {
    var header = document.getElementById("sj-header");
    if (!header) return;
    var fill = document.getElementById("sj-course-fill");
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY || window.pageYOffset;
      header.classList.toggle("is-compact", y > 12);
      var max = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
      var pct = max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0;
      if (fill) fill.style.width = pct + "%";
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Menú: se cierra con el botón, Escape o al elegir un link ---------- */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".sj-menu-btn");
    var menu = document.getElementById("sj-menu");
    if (!btn || !menu) return;
    var body = document.body;
    Array.prototype.forEach.call(menu.querySelectorAll(".sj-menu-nav a"), function (a, i) { a.style.setProperty("--i", i); });
    var links = menu.querySelectorAll("a");
    function set(open) {
      var was = body.classList.contains("sj-menu-open");
      if (open === was) return;
      body.classList.toggle("sj-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("sj-menu-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a) { set(false); return; }
      if (e.target === menu || e.target.classList.contains("sj-menu-panel")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("sj-menu-open")) return;
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

  /* ---------- Sondeo de visibilidad (rAF + getBoundingClientRect, sin IntersectionObserver) ---------- */
  function watchVisible(list, vhFrac, onVisible) {
    var pending = Array.prototype.slice.call(list);
    if (!pending.length) return;
    var raf = null;
    function tick() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * vhFrac && r.bottom > 0) { var el = pending[i]; pending.splice(i, 1); onVisible(el); }
      }
      if (pending.length) schedule();
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(tick); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  /* ---------- WhatsApp flotante: se esconde donde ya hay un CTA grande ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]");
    if (!zones.length) return;
    var raf = null;
    function update() {
      var vh = window.innerHeight || document.documentElement.clientHeight, on = false;
      for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh * 0.8 && r.bottom > 0) { on = true; break; } }
      document.body.classList.toggle("sj-wa-off", on);
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(function () { raf = null; update(); }); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  /* ---------- Títulos: cada palabra cae y pega ---------- */
  function splitTitles() {
    var heads = document.querySelectorAll(".sj-drop");
    Array.prototype.forEach.call(heads, function (h) {
      var n = 0;
      var lines = h.querySelectorAll(".sj-ln");
      if (!lines.length) lines = [h];
      Array.prototype.forEach.call(lines, function (ln) {
        var txt = ln.textContent.replace(/\s+/g, " ").trim();
        ln.setAttribute("aria-label", txt);
        ln.textContent = "";
        txt.split(" ").forEach(function (w, i, arr) {
          var s = document.createElement("span");
          s.className = "sj-w"; s.setAttribute("aria-hidden", "true"); s.style.setProperty("--i", n++); s.textContent = w;
          ln.appendChild(s);
          if (i < arr.length - 1) ln.appendChild(document.createTextNode(" "));
        });
      });
    });
  }
  function initReveal() {
    var els = document.querySelectorAll("[data-sj-reveal], .sj-drop");
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { Array.prototype.forEach.call(els, show); return; }
    var auto = Array.prototype.filter.call(els, function (e) { return !e.hasAttribute("data-sj-manual"); });
    watchVisible(auto, 0.92, show);
  }

  /* ---------- Scroll suave a #anclas (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var head = document.getElementById("sj-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? 50 + 12 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.SJIr = go;
  function initSmoothAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (href.length < 2) return;
      var el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      closeMenu();
      go(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  function init() {
    splitTitles(); initWa(); initHeader(); initMenu(); initWaHide(); initReveal(); initSmoothAnchors();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
