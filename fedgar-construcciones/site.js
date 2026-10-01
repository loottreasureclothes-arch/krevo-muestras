/* FEDGAR Construcciones: fundación de interacción (header y trazo, menú, WhatsApp, reveal, estado de la cita). */
(function () {
  "use strict";
  var WA = "524493932124";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* ---------- Estado compartido de la cita (formulario, lámina de cierre) ---------- */
  var Fedgar = (function () {
    var state = { tipo: "", m2: "", terreno: "", proyecto: "", obra: "", ciudad: "", nombre: "" };
    var ART = { "Residencia": "una residencia", "Nave": "una nave", "Oficinas": "unas oficinas", "Local comercial": "un local comercial", "Otro": "una obra" };
    function emit() {
      try { window.dispatchEvent(new CustomEvent("fedgar:estado", { detail: state })); }
      catch (e) { var ev = document.createEvent("CustomEvent"); ev.initCustomEvent("fedgar:estado", false, false, state); window.dispatchEvent(ev); }
    }
    function set(k, v) { state[k] = v; emit(); }
    function message() {
      var s = state, p = [];
      var t = s.tipo ? ART[s.tipo] : "";
      var m2 = String(s.m2 || "").replace(/[^0-9.,]/g, "");
      if (t) p.push("Hola Fedgar, quiero construir " + t + (m2 ? " de unos " + m2 + " m²" : "") + ".");
      else p.push("Hola Fedgar, quiero cotizar una obra" + (m2 ? " de unos " + m2 + " m²" : "") + ".");
      if (s.terreno === "Sí") p.push("Ya tengo terreno.");
      else if (s.terreno === "No") p.push("Todavía no tengo terreno.");
      if (s.proyecto === "Sí") p.push("Ya tengo proyecto.");
      else if (s.proyecto === "No") p.push("Todavía no tengo proyecto.");
      else if (s.proyecto === "Quiero que lo hagan ustedes") p.push("Quiero que ustedes hagan el proyecto.");
      if (s.obra) p.push("Me gustó: " + s.obra + ".");
      if (s.ciudad && s.ciudad.trim()) p.push("Ciudad: " + s.ciudad.trim() + ".");
      if (s.nombre && s.nombre.trim()) p.push("Mi nombre: " + s.nombre.trim());
      return p.join(" ");
    }
    return { state: state, set: set, message: message, waUrl: function () { return waUrl(message()); }, on: function (cb) { window.addEventListener("fedgar:estado", function () { cb(state); }); } };
  })();
  window.Fedgar = Fedgar;

  /* ---------- Links de WhatsApp: nacen con su href real; aquí solo se confirma ---------- */
  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      links[i].href = waUrl(links[i].getAttribute("data-wa"));
      links[i].target = "_blank"; links[i].rel = "noopener";
    }
    /* Los botones que arman el mensaje con el formulario: el href se reescribe al tocar, sin preventDefault. */
    function refresh(e) {
      var a = e.target.closest ? e.target.closest("[data-wa-form]") : null;
      if (a) a.href = Fedgar.waUrl();
    }
    document.addEventListener("pointerdown", refresh, true);
    document.addEventListener("click", refresh, true);
    function paint() {
      var els = document.querySelectorAll("[data-wa-form]");
      var u = Fedgar.waUrl();
      for (var i = 0; i < els.length; i++) els[i].href = u;
    }
    Fedgar.on(paint); paint();
  }

  /* ---------- Header: se compacta y el trazo de pincel se dibuja con el scroll ---------- */
  function initHeader() {
    var header = document.getElementById("fg-header");
    if (!header) return;
    var trazo = document.getElementById("fg-trazo-m");
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY || window.pageYOffset;
      header.classList.toggle("is-compact", y > 12);
      var max = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
      var pct = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      if (trazo) trazo.setAttribute("stroke-dashoffset", String(1 - pct));
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Menú hamburguesa: se cierra con el botón, Escape, tocando fuera y al elegir un link ---------- */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".fg-burger");
    var menu = document.getElementById("fg-menu");
    if (!btn || !menu) return;
    var body = document.body;
    Array.prototype.forEach.call(menu.querySelectorAll(".fg-menu-nav a"), function (a, i) { a.style.setProperty("--i", i); });
    menu.querySelector(".fg-menu-foot").style.setProperty("--i", 5);
    var links = menu.querySelectorAll("a");
    function set(open) {
      var was = body.classList.contains("fg-menu-open");
      if (open === was) return;
      body.classList.toggle("fg-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Cerrar menú" : "Menú");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("fg-menu-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a) { set(false); return; }
      if (e.target === menu || e.target.classList.contains("fg-menu-nav") || e.target.classList.contains("fg-menu-foot")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("fg-menu-open")) return;
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

  /* ---------- Vigía de visibilidad por sondeo (rAF + getBoundingClientRect) ---------- */
  function watchVisible(list, vhFrac, onVisible) {
    var pending = Array.prototype.slice.call(list);
    if (!pending.length) return;
    var raf = null;
    function tick() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * vhFrac && r.bottom > 0) onVisible(pending.splice(i, 1)[0]);
      }
      if (pending.length) schedule();
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(tick); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  /* ---------- WhatsApp flotante: se esconde donde ya hay datos o CTA de contacto ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]");
    if (!zones.length) return;
    var raf = null;
    function update() {
      var vh = window.innerHeight || document.documentElement.clientHeight, on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.top < vh * 0.85 && r.bottom > vh * 0.1) { on = true; break; }
      }
      document.body.classList.toggle("fg-wa-off", on);
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(function () { raf = null; update(); }); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  /* ---------- Reveal (el 1.6 s de seguridad va también inline en template.html) ---------- */
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal], .fg-drop:not(.fg-drop--manual)");
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { Array.prototype.forEach.call(document.querySelectorAll("[data-reveal], .fg-drop"), show); return; }
    watchVisible(els, 0.92, show);
  }

  /* ---------- Scroll suave a #anclas (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var top = el.getBoundingClientRect().top + window.scrollY - (document.querySelector(".fg-bar") ? 50 + 14 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.FedgarIr = go;
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (href.length < 2) return;
      var el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      closeMenu();
      var chip = a.getAttribute("data-chip");
      if (chip) window.dispatchEvent(new CustomEvent("fedgar:chip", { detail: chip }));
      var obra = a.getAttribute("data-obra");
      if (obra) window.dispatchEvent(new CustomEvent("fedgar:obra", { detail: obra }));
      go(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  function init() { initWa(); initHeader(); initMenu(); initWaHide(); initReveal(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
