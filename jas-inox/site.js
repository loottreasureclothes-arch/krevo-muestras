/* JAS INOX: fundacion de interaccion (header con punto de soldadura, menu, WhatsApp, reveal, titulos que caen, anclas). */
(function () {
  "use strict";
  var WA = "524494415822";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  window.JAS = window.JAS || {};
  window.JAS.waUrl = waUrl;
  window.JAS.reduce = reduce;

  /* ---------- wa.me: todos nacen con href real; el JS solo lo reescribe en el toque (sin preventDefault) ---------- */
  function initWa() {
    function fix(e) {
      var a = e.target.closest ? e.target.closest("a[data-wa]") : null;
      if (a) a.href = waUrl(a.getAttribute("data-wa"));
    }
    document.addEventListener("pointerdown", fix, true);
    document.addEventListener("click", fix, true);
    document.addEventListener("keydown", function (e) { if (e.key === "Enter") fix(e); }, true);
  }

  /* ---------- Titulos: cada palabra cae y pega ---------- */
  function initDrop() {
    var titles = document.querySelectorAll(".drop");
    Array.prototype.forEach.call(titles, function (h) {
      var n = 0;
      Array.prototype.forEach.call(h.querySelectorAll(".ln"), function (ln) {
        var words = ln.textContent.trim().split(/\s+/);
        ln.textContent = "";
        words.forEach(function (w, i) {
          var s = document.createElement("span");
          s.className = "w"; s.style.setProperty("--i", n++); s.textContent = w;
          ln.appendChild(s);
          if (i < words.length - 1) ln.appendChild(document.createTextNode(" "));
        });
      });
    });
  }

  /* ---------- Header: se compacta y la soldadura avanza con el scroll ---------- */
  function initHeader() {
    var bar = document.getElementById("bar");
    if (!bar) return;
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY || window.pageYOffset;
      bar.classList.toggle("is-compact", y > 12);
      var max = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      bar.style.setProperty("--p", p.toFixed(4));
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Menu ---------- */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".burger");
    var menu = document.getElementById("menu");
    if (!btn || !menu) return;
    var body = document.body;
    var links = menu.querySelectorAll("a");
    Array.prototype.forEach.call(menu.querySelectorAll(".menu-nav a"), function (a, i) { a.style.setProperty("--i", i); });
    function set(open) {
      if (open === body.classList.contains("menu-open")) return;
      body.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 90);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("menu-open")); });
    menu.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) set(false);
      else if (e.target === menu) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("menu-open")) return;
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

  /* ---------- Vigia de visibilidad por sondeo (sin IntersectionObserver) ---------- */
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
  window.JAS.watchVisible = watchVisible;

  function initReveal() {
    var els = document.querySelectorAll("[data-reveal], .drop");
    if (!els.length) return;
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { Array.prototype.forEach.call(els, show); return; }
    watchVisible(els, 1, show);
  }

  /* ---------- WhatsApp flotante: fuera donde ya hay un CTA grande ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]");
    if (!zones.length) return;
    var raf = null;
    function update() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight, on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.top < vh * 0.78 && r.bottom > vh * 0.2) { on = true; break; }
      }
      document.body.classList.toggle("wa-off", on);
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(update); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  /* ---------- Anclas (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var bar = document.getElementById("bar");
    var top = el.getBoundingClientRect().top + window.scrollY - (bar ? bar.offsetHeight + 14 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.JAS.go = go;
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

  function init() { initDrop(); initWa(); initHeader(); initMenu(); initWaHide(); initReveal(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
