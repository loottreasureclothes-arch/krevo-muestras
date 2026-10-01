/* El Palacio del Ropón: fundación de interacción (WhatsApp, header, menú, reveal, anclas, flotante). */
(function () {
  "use strict";
  var WA = "524491790170";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  var PR = window.PR = { WA: WA, waUrl: waUrl, reduce: reduce, listonOn: false, onHeader: function () {} };

  /* Los botones ya nacen con su href real de wa.me; aquí solo se confirma el mensaje. Nunca preventDefault ni window.open. */
  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      links[i].href = waUrl(links[i].getAttribute("data-wa"));
      links[i].target = "_blank";
      links[i].rel = "noopener";
    }
  }

  function initHeader() {
    var header = document.getElementById("pr-header");
    if (!header) return;
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY || window.pageYOffset;
      header.classList.toggle("is-compact", y > 40 || PR.listonOn);
    }
    PR.onHeader = update;
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Menú a pantalla completa ---------- */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".pr-menu-btn");
    var menu = document.getElementById("pr-menu");
    if (!btn || !menu) return;
    var body = document.body, lbl = btn.querySelector(".pr-menu-lbl");
    var links = menu.querySelectorAll("a");
    var pushed = false;
    function set(open, fromPop) {
      var was = body.classList.contains("pr-menu-open");
      if (open === was) return;
      body.classList.toggle("pr-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
      if (open) {
        try { history.pushState({ prMenu: 1 }, ""); pushed = true; } catch (e) {}
        setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      } else {
        if (pushed && !fromPop) { pushed = false; try { history.back(); } catch (e) {} }
        pushed = false;
        btn.focus({ preventScroll: true });
      }
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("pr-menu-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a) { if (a.getAttribute("href").charAt(0) === "#") closeMenu(); return; }
      if (e.target === menu || e.target.classList.contains("pr-menu-nav")) closeMenu();
    });
    window.addEventListener("popstate", function () { if (body.classList.contains("pr-menu-open")) { pushed = false; set(false, true); } });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("pr-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); closeMenu(); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(Array.prototype.slice.call(links));
        var i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* ---------- Títulos palabra por palabra ---------- */
  function splitWords() {
    var heads = document.querySelectorAll("[data-words]");
    Array.prototype.forEach.call(heads, function (h) {
      var n = 0;
      (function walk(node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (c) {
          if (c.nodeType === 3) {
            var parts = c.nodeValue.split(/(\s+)/), frag = document.createDocumentFragment();
            parts.forEach(function (p) {
              if (!p) return;
              if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
              var s = document.createElement("span"); s.className = "w"; s.style.setProperty("--i", n++); s.textContent = p; frag.appendChild(s);
            });
            node.replaceChild(frag, c);
          } else if (c.nodeType === 1 && c.tagName !== "BR") walk(c);
        });
      })(h);
    });
  }

  function watchVisible(list, frac, cb) {
    var pending = Array.prototype.slice.call(list);
    if (!pending.length) return;
    var raf = null;
    function tick() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * frac && r.bottom > 0) cb(pending.splice(i, 1)[0]);
      }
      if (pending.length) schedule();
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(tick); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  PR.watchVisible = watchVisible;

  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { Array.prototype.forEach.call(els, show); return; }
    watchVisible(els, 0.92, show);
  }

  /* ---------- Flotante: se esconde donde ya hay un botón verde a la vista ---------- */
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
      document.body.classList.toggle("pr-wa-off", on);
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(function () { raf = null; update(); }); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  /* ---------- Anclas (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var head = document.querySelector(".pr-bar");
    var lis = document.getElementById("pr-liston");
    var off = (head ? head.offsetHeight : 60) + 5 + (lis && !lis.hidden ? 30 : 0) + 16;
    var top = el.getBoundingClientRect().top + window.scrollY - off;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  PR.go = go;
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (href.length < 2) { if (href === "#") e.preventDefault(); return; }
      var el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      closeMenu();
      setTimeout(function () { go(el); if (history.replaceState) { try { history.replaceState(null, "", href); } catch (er) {} } }, document.body.classList.contains("pr-menu-open") ? 60 : 0);
    });
  }

  function init() { splitWords(); initWa(); initHeader(); initMenu(); initReveal(); initWaHide(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
