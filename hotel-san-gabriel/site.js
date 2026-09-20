/* Hotel San Gabriel Justin · FUNDACIÓN: WhatsApp, menú, WA flotante, blindaje, anclas, lightbox
   API para secciones:
     SG.WA / SG.waUrl(msg) / SG.openWa(msg, fbEl?)  abre WhatsApp; si se bloquea cae a location.href y muestra fbEl
     SG.goTo(el)           scroll a un elemento descontando el header
     SG.reservar(room)     preselecciona la habitación en #reserva y baja al formulario (lo implementa 30-reserva.js)
   [data-wa="mensaje"] en cualquier <a> arma su link. [data-hide-wa] esconde el WA flotante. [data-lb] abre lightbox. */
(function () {
  "use strict";
  var WA = "523173892964";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + (msg ? "?text=" + encodeURIComponent(msg) : ""); }
  function openWa(msg, fb) {
    var url = waUrl(msg), w = null;
    try { w = window.open(url, "_blank", "noopener"); } catch (e) { w = null; }
    if (!w) { try { location.href = url; } catch (e2) {} }
    if (fb) { var a = fb.querySelector("a"); if (a) { a.href = url; a.target = "_blank"; a.rel = "noopener"; } fb.hidden = false; }
    return url;
  }
  function goTo(el, smooth) {
    var head = document.querySelector(".k-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight : 0) + 1;
    window.scrollTo({ top: Math.max(0, top), behavior: smooth !== false && !reduce ? "smooth" : "auto" });
  }

  /* Fechas con máscara de diagonales (00/00/0000), como en la recepción de un hotel: el input es de texto,
     se autocompletan las "/" al escribir y solo se acepta una fecha de calendario real.
     SG.maskDate(input) engancha el input. SG.parseDMY("dd/mm/aaaa") -> Date o null. SG.formatDMY(Date) -> string.
     SG.prettyDMY("dd/mm/aaaa") -> "lunes 3 de marzo" para el mensaje de WhatsApp. */
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function parseDMY(v) {
    var m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(v || "");
    if (!m) return null;
    var d = +m[1], mo = +m[2], y = +m[3];
    var dt = new Date(y, mo - 1, d);
    if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d) return null;
    return dt;
  }
  function formatDMY(dt) { return pad2(dt.getDate()) + "/" + pad2(dt.getMonth() + 1) + "/" + dt.getFullYear(); }
  function prettyDMY(v) { var d = parseDMY(v); try { return d ? d.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" }) : v; } catch (e) { return v; } }
  function maskDate(input) {
    input.type = "text";
    input.classList.add("sg-date-mask");
    input.setAttribute("inputmode", "numeric");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("maxlength", "10");
    input.setAttribute("placeholder", "00/00/0000");
    input.addEventListener("input", function () {
      var digits = input.value.replace(/\D/g, "").slice(0, 8);
      var out = digits;
      if (digits.length > 4) out = digits.slice(0, 2) + "/" + digits.slice(2, 4) + "/" + digits.slice(4);
      else if (digits.length > 2) out = digits.slice(0, 2) + "/" + digits.slice(2);
      input.value = out;
    });
  }
  window.SG = {
    WA: WA, waUrl: waUrl, openWa: openWa, goTo: goTo,
    maskDate: maskDate, parseDMY: parseDMY, formatDMY: formatDMY, prettyDMY: prettyDMY,
    reservar: function () { var r = document.getElementById("reserva"); if (r) goTo(r); }
  };

  function initWa() {
    Array.prototype.forEach.call(document.querySelectorAll("a[data-wa]"), function (a) {
      var msg = a.getAttribute("data-wa");
      a.href = waUrl(msg && msg.length > 3 ? msg : "Hola, quiero información de Hotel San Gabriel Justin.");
      a.target = "_blank"; a.rel = "noopener";
    });
  }

  function initNav() {
    var btn = document.querySelector(".sg-menu-btn"), nav = document.getElementById("sg-nav");
    if (!btn || !nav) return;
    var body = document.body, pushed = false;
    Array.prototype.forEach.call(nav.querySelectorAll(".sg-nav-list > a"), function (a, i) { a.style.setProperty("--i", i); });
    var links = nav.querySelectorAll("a");
    function set(open, fromPop) {
      if (open === body.classList.contains("sg-nav-open")) return;
      body.classList.toggle("sg-nav-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      nav.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) {
        try { history.pushState({ sgNav: 1 }, ""); pushed = true; } catch (e) {}
        setTimeout(function () { links[0].focus({ preventScroll: true }); }, 80);
      } else {
        if (pushed && !fromPop) { try { history.back(); } catch (e) {} }
        pushed = false;
        btn.focus({ preventScroll: true });
      }
    }
    window.addEventListener("popstate", function () { if (body.classList.contains("sg-nav-open")) set(false, true); });
    btn.addEventListener("click", function () { set(!body.classList.contains("sg-nav-open")); });
    nav.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (a || e.target.classList.contains("sg-nav-scrim")) {
        if (a && a.getAttribute("href").charAt(0) === "#") {
          e.preventDefault();
          var el = document.querySelector(a.getAttribute("href"));
          set(false);
          if (el) setTimeout(function () { goTo(el, false); }, pushed ? 60 : 0);
          return;
        }
        set(false);
      }
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("sg-nav-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(Array.prototype.slice.call(links));
        var i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });

    /* Estado activo: resalta en el panel la sección que se está leyendo, para que el menú se sienta
       navegación de verdad y no solo un salto ciego. Un link de #sub también enciende a su padre (01/03/05). */
    var byId = {};
    Array.prototype.forEach.call(links, function (a) {
      var href = a.getAttribute("href");
      if (!href || href.charAt(0) !== "#" || href.length < 2) return;
      var sub = a.closest(".sg-nav-sub");
      var parent = sub && sub.previousElementSibling && sub.previousElementSibling.classList.contains("sg-nav-parent") ? sub.previousElementSibling : null;
      (byId[href.slice(1)] = byId[href.slice(1)] || []).push({ a: a, parent: parent });
    });
    var spyIds = Object.keys(byId), spyTargets = [];
    spyIds.forEach(function (id) { var t = document.getElementById(id); if (t) spyTargets.push(t); });
    if (spyTargets.length && "IntersectionObserver" in window) {
      var curId = null;
      function markActive(id) {
        if (id === curId) return;
        curId = id;
        Array.prototype.forEach.call(links, function (a) { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
        (byId[id] || []).forEach(function (e) {
          e.a.classList.add("is-active"); e.a.setAttribute("aria-current", "true");
          if (e.parent) e.parent.classList.add("is-active");
        });
      }
      var spy = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) markActive(e.target.id); });
      }, { rootMargin: "-42% 0px -50% 0px", threshold: 0 });
      spyTargets.forEach(function (t) { spy.observe(t); });
    }
  }

  function initWaHide() {
    setTimeout(function () { document.body.classList.add("sg-wa-ready"); }, 2000);
    if (!("IntersectionObserver" in window)) return;
    var on = new Set();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) on.add(e.target); else on.delete(e.target); });
      document.body.classList.toggle("sg-wa-off", on.size > 0);
    }, { rootMargin: "0px 0px -12% 0px" });
    Array.prototype.forEach.call(document.querySelectorAll("[data-hide-wa]"), function (z) { io.observe(z); });
  }

  /* Blindaje: el reveal arranca 60 % de pantalla ANTES de llegar (las fotos ya están cuando el visitante llega)
     y, por si acaso, a los 1.6 s de asomarse todo [data-reveal] queda visible */
  function initRevealSafety() {
    var els = document.querySelectorAll("[data-reveal], [data-reveal-stagger], [data-blur]");
    function show(el) { el.classList.add("is-in"); }
    if (reduce || !("IntersectionObserver" in window)) { Array.prototype.forEach.call(els, show); return; }
    var early = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { early.unobserve(e.target); show(e.target); } });
    }, { rootMargin: "0px 0px 60% 0px" });
    Array.prototype.forEach.call(els, function (el) { early.observe(el); });
    /* red de seguridad: si algo se atora, a los 1.6 s de asomarse queda visible aunque no haya disparado antes */
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (!e.isIntersecting) return; io.unobserve(e.target); var el = e.target; setTimeout(function () { show(el); }, 1600); });
    }, { rootMargin: "0px 0px 0px 0px" });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
  }


  /* Títulos de sección: caen desde arriba y pegan con rebote corto (resorte muestreado, WAAPI, como el
     4.7 de closetdoor/10-msi.js pero más ligero). Una vez al asomar; red de seguridad a 1.6 s. */
  function initTitleDrop() {
    var els = document.querySelectorAll("[data-drop]");
    if (!els.length) return;
    function spring(n, amp, turns, decay, fmt) {
      var k = [];
      for (var i = 0; i <= n; i++) { var t = i / n, v = i === n ? 0 : amp * Math.exp(-decay * t) * Math.sin(turns * Math.PI * 2 * t); k.push({ transform: fmt(v) }); }
      return k;
    }
    function play(el) {
      if (el.classList.contains("dd-done")) return;
      el.classList.add("dd-done");
      var DROP = 420, BOUNCE = 280;
      el.animate([{ transform: "translateY(-60px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }], { duration: DROP, easing: "cubic-bezier(0.55, 0.06, 0.68, 0.19)", fill: "backwards" });
      el.animate(spring(12, 7, 1.4, 4.6, function (v) { return "translateY(" + v.toFixed(2) + "px)"; }), { duration: BOUNCE, delay: DROP, easing: "linear" });
    }
    if (reduce || !("IntersectionObserver" in window) || !els[0].animate) { Array.prototype.forEach.call(els, function (el) { el.classList.add("dd-done"); }); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); play(e.target); } }); }, { threshold: 0.3 });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
    var sio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (!e.isIntersecting) return; sio.unobserve(e.target); var el = e.target; setTimeout(function () { play(el); }, 1600); }); });
    Array.prototype.forEach.call(els, function (el) { sio.observe(el); });
  }

  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (href.length < 2) return;
      var el; try { el = document.querySelector(href); } catch (x) { return; }
      if (!el) return;
      e.preventDefault();
      if (a.hasAttribute("data-room") && window.SG.reservar) { window.SG.reservar(a.getAttribute("data-room"), a.getAttribute("data-extra")); return; }
      goTo(el);
      try { history.replaceState(history.state, "", href); } catch (x2) {}
    });
  }

  /* Lightbox: [data-lb] (img o su contenedor). Se monta en <body>; "atrás" lo cierra. */
  function initLightbox() {
    var items = document.querySelectorAll("[data-lb]");
    if (!items.length) return;
    var box = document.createElement("div");
    box.className = "sg-lb"; box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-label", "Foto ampliada");
    box.innerHTML = '<img alt=""><p></p><button type="button">Cerrar</button>';
    document.body.appendChild(box);
    var img = box.querySelector("img"), cap = box.querySelector("p"), close = box.querySelector("button"), pushed = false, last = null;
    function open(src, alt, from) {
      last = from; img.src = src; img.alt = alt || ""; cap.textContent = alt || "";
      box.classList.add("is-open"); document.documentElement.classList.add("sg-lock");
      try { history.pushState({ sgLb: 1 }, ""); pushed = true; } catch (e) {}
      close.focus({ preventScroll: true });
    }
    function shut(fromPop) {
      if (!box.classList.contains("is-open")) return;
      box.classList.remove("is-open"); document.documentElement.classList.remove("sg-lock");
      if (pushed && !fromPop) { try { history.back(); } catch (e) {} }
      pushed = false; if (last) last.focus({ preventScroll: true });
    }
    Array.prototype.forEach.call(items, function (it) {
      if (!it.hasAttribute("tabindex") && it.tagName !== "BUTTON" && it.tagName !== "A") { it.setAttribute("tabindex", "0"); it.setAttribute("role", "button"); }
      function go(e) {
        var im = it.tagName === "IMG" ? it : it.querySelector("img");
        if (!im) return;
        if (e) e.preventDefault();
        open(it.getAttribute("data-lb") || im.currentSrc || im.src, im.alt, it);
      }
      it.addEventListener("click", go);
      it.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") go(e); });
    });
    close.addEventListener("click", function () { shut(); });
    box.addEventListener("click", function (e) { if (e.target === box) shut(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") shut(); });
    window.addEventListener("popstate", function () { shut(true); });
  }

  function init() { initWa(); initNav(); initWaHide(); initRevealSafety(); initTitleDrop(); initAnchors(); initLightbox(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
