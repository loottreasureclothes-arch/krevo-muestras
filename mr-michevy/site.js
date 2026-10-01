/* Mr. MICHEvy · mecánica base: WhatsApp, header (frase del día), menú, títulos por palabra, reveal, anclas, WhatsApp flotante. */
(function () {
  "use strict";
  var WA = "524495520336";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  window.MVwaUrl = waUrl;

  /* ---------- WhatsApp: cada boton NACE con su href real; aqui solo se refresca en pointerdown/click ---------- */
  function msgFor(el) {
    var fn = el.getAttribute("data-wa-fn");
    if (fn && window.MV && typeof window.MV[fn] === "function") return window.MV[fn]();
    return el.getAttribute("data-wa");
  }
  function refresh(el) {
    var m = msgFor(el);
    if (m) { el.href = waUrl(m); el.target = "_blank"; el.rel = "noopener"; }
  }
  function initWa() {
    var els = document.querySelectorAll("[data-wa]");
    Array.prototype.forEach.call(els, function (el) {
      el.addEventListener("pointerdown", function () { refresh(el); });
      el.addEventListener("click", function () { refresh(el); });
      el.addEventListener("focus", function () { refresh(el); });
    });
    window.MVrefreshWa = function () { Array.prototype.forEach.call(els, refresh); };
  }

  /* ---------- Header: se compacta; frase del dia cada 5 s con cruce de 300 ms ---------- */
  function initHeader() {
    var header = document.getElementById("m-header");
    if (!header) return;
    var ticking = false;
    function update() { ticking = false; header.classList.toggle("is-compact", (window.scrollY || 0) > 12); }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
    var spans = document.querySelectorAll("#m-frase span");
    if (spans.length < 2 || reduce) return;
    var i = 0;
    setInterval(function () {
      if (document.hidden) return;
      spans[i].classList.remove("is-on");
      i = (i + 1) % spans.length;
      spans[i].classList.add("is-on");
    }, 5000);
  }

  /* ---------- Menu ---------- */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".m-burger"), menu = document.getElementById("m-menu");
    if (!btn || !menu) return;
    var body = document.body, links = menu.querySelectorAll("a");
    function set(open) {
      if (open === body.classList.contains("m-menu-open")) return;
      body.classList.toggle("m-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("m-menu-open")); });
    menu.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) set(false);
      else if (e.target === menu || e.target.classList.contains("m-menu-nav")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("m-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(Array.prototype.slice.call(links));
        var k = items.indexOf(document.activeElement);
        e.preventDefault();
        if (k < 0) k = e.shiftKey ? 0 : -1;
        items[(k + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* ---------- Titulos por palabra ---------- */
  function splitWords() {
    var titles = document.querySelectorAll("[data-words]");
    Array.prototype.forEach.call(titles, function (t) {
      var n = 0;
      (function walk(node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (c) {
          if (c.nodeType === 3) {
            var parts = c.nodeValue.split(/(\s+)/), frag = document.createDocumentFragment();
            parts.forEach(function (p) {
              if (!p) return;
              if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
              var s = document.createElement("span"); s.className = "w"; s.style.setProperty("--i", Math.min(n++, 14)); s.textContent = p; frag.appendChild(s);
            });
            node.replaceChild(frag, c);
          } else if (c.nodeType === 1) walk(c);
        });
      })(t);
      t.setAttribute("aria-label", t.textContent.replace(/\s+/g, " ").trim());
      Array.prototype.forEach.call(t.querySelectorAll(".w"), function (w) { w.setAttribute("aria-hidden", "true"); });
      t.classList.add("m-split");
    });
  }

  /* ---------- Vigia por sondeo ---------- */
  function watchVisible(list, frac, cb) {
    var pending = Array.prototype.slice.call(list);
    if (!pending.length) return;
    var raf = null;
    function tick() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * frac && r.bottom > 0) { var el = pending[i]; pending.splice(i, 1); cb(el); }
      }
      if (pending.length) schedule();
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(tick); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal], [data-words], .m-sticker");
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { Array.prototype.forEach.call(els, show); return; }
    watchVisible(els, 0.99, show);
  }

  /* ---------- WhatsApp flotante: se esconde donde ya hay un CTA grande ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa], .m-foot");
    if (!zones.length) return;
    var raf = null;
    function update() {
      raf = null;
      var vh = window.innerHeight, on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.top < vh * 0.85 && r.bottom > vh * 0.15) { on = true; break; }
      }
      document.body.classList.toggle("m-wa-off", on);
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(update); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  /* ---------- anclas suaves (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var head = document.getElementById("m-header");
    var off = head ? 54 + 14 : 0;
    var top = el.getBoundingClientRect().top + window.scrollY - off;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.MVgo = go;
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (href.length < 2) return;
      var el = document.querySelector(href);
      if (!el) return;
      e.preventDefault(); closeMenu(); go(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  function init() { splitWords(); initWa(); initHeader(); initMenu(); initReveal(); initWaHide(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
