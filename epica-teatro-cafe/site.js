/* ÉPICA: fundación de interacción (header-marquesina, menú, WhatsApp, reveal, anclas). */
(function () {
  "use strict";
  var WA = "524491577858";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  window.EpWaUrl = waUrl;

  /* ---------- Links de WhatsApp: cada uno NACE con su href real; aquí solo se confirma ---------- */
  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      links[i].href = waUrl(links[i].getAttribute("data-wa"));
      links[i].target = "_blank";
      links[i].rel = "noopener";
    }
  }

  /* ---------- Header: marquesina de foquitos ---------- */
  function initHeader() {
    var header = document.getElementById("ep-header");
    var box = document.getElementById("ep-bulbs");
    if (!header || !box) return;
    var bulbs = [];
    var lastPct = 0;
    function build() {
      box.innerHTML = "";
      bulbs = [];
      var n = Math.max(14, Math.min(90, Math.floor((window.innerWidth - 20) / 17)));
      for (var i = 0; i < n; i++) { var b = document.createElement("i"); box.appendChild(b); bulbs.push(b); }
      box.classList.add("has-js");
      paintOff(lastPct);
    }
    function sequence() {
      var n = bulbs.length;
      if (reduce) { bulbs.forEach(function (b) { b.classList.add("is-lit"); }); return; }
      bulbs.forEach(function (b, i) { setTimeout(function () { b.classList.add("is-lit"); }, 80 + (1100 * i) / n); });
      setTimeout(function () { bulbs.forEach(function (b) { b.classList.add("is-lit"); }); }, 1600); /* blindaje */
    }
    /* Corrección 2: los foquitos se van PRENDIENDO conforme bajas (de izquierda a derecha) y llegan completos al pie.
       Arriba del todo quedan todos prendidos (la secuencia de entrada). Al llegar al final brillan una vez (aplauso). */
    function paintOff(pct) {
      var n = bulbs.length, y = window.scrollY || window.pageYOffset;
      var on = y <= 12 || pct >= 0.985 ? n : Math.max(1, Math.round(n * pct));
      for (var i = 0; i < n; i++) bulbs[i].classList.toggle("is-off", i >= on);
      box.classList.toggle("is-full", y > 12 && pct >= 0.985);
    }
    build();
    sequence();
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY || window.pageYOffset;
      header.classList.toggle("is-compact", y > 12);
      var max = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
      lastPct = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      paintOff(lastPct);
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { build(); bulbs.forEach(function (b) { b.classList.add("is-lit"); }); paintOff(lastPct); }, 200); });
    update();
    /* titileo suave: uno cada 3 s */
    if (!reduce) setInterval(function () {
      if (document.hidden || !bulbs.length) return;
      var b = bulbs[Math.floor(Math.random() * bulbs.length)];
      if (!b.classList.contains("is-lit") || b.classList.contains("is-off")) return;
      b.classList.add("is-blink"); setTimeout(function () { b.classList.remove("is-blink"); }, 420);
    }, 3000);
    /* "HOY: ..." si la función elegida es hoy */
    window.addEventListener("epica:funcion", function (e) {
      var d = e.detail, hoy = document.getElementById("ep-hoy");
      if (!hoy) return;
      if (d && d.hoy && d.nombre) { hoy.textContent = "HOY: " + d.nombre; hoy.hidden = false; } else { hoy.hidden = true; }
    });
  }

  /* ---------- Menú hamburguesa ---------- */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".ep-burger");
    var menu = document.getElementById("ep-menu");
    if (!btn || !menu) return;
    var body = document.body;
    Array.prototype.forEach.call(menu.querySelectorAll(".ep-menu-nav a"), function (a, i) { a.style.setProperty("--i", i); });
    var links = menu.querySelectorAll("a");
    function set(open) {
      var was = body.classList.contains("ep-menu-open");
      if (open === was) return;
      body.classList.toggle("ep-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("ep-menu-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a) { set(false); return; }
      if (e.target === menu || e.target.classList.contains("ep-menu-in")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("ep-menu-open")) return;
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

  /* ---------- vigía de visibilidad por sondeo (rAF + getBoundingClientRect) ---------- */
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

  /* ---------- WA flotante: se esconde donde ya hay un CTA de WhatsApp grande ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa], .ep-foot");
    if (!zones.length) return;
    function update() {
      var vh = window.innerHeight || document.documentElement.clientHeight, on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.top < vh * 0.75 && r.bottom > vh * 0.25) { on = true; break; }
      }
      document.body.classList.toggle("ep-wa-off", on);
    }
    var raf = null;
    function schedule() { if (!raf) raf = requestAnimationFrame(function () { raf = null; update(); }); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  /* ---------- Reveal (el de 1.6 s de seguridad va también inline en template.html) ---------- */
  function initReveal() {
    var els = document.querySelectorAll("[data-ep-reveal], .ep-drop");
    if (!els.length) return;
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { Array.prototype.forEach.call(els, show); return; }
    watchVisible(els, 0.92, show);
  }

  /* ---------- Scroll suave a #anclas (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var head = document.getElementById("ep-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight + 14 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.EpIr = go;
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
      go(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  function init() { initWa(); initHeader(); initMenu(); initWaHide(); initReveal(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
