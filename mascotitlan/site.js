/* Mascotitlán: mecánica base (header de escalones, menú, WhatsApp, anclas, reveal, papel picado). */
(function () {
  "use strict";
  var WA = "524495666644";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  window.MascoWa = waUrl;

  /* Los links [data-wa] ya nacen con su href real; aquí solo se confirma en el toque (sin preventDefault, sin window.open). */
  function initWa() {
    function sync(e) {
      var a = e.target.closest && e.target.closest("[data-wa]");
      if (a && !a.hasAttribute("data-wa-dyn")) a.href = waUrl(a.getAttribute("data-wa"));
    }
    document.addEventListener("pointerdown", sync, true);
    document.addEventListener("click", sync, true);
  }

  /* ---------- Header: compacto, y la pirámide de 5 escalones se pinta por sección ---------- */
  var secIds = ["hero", "piramide", "peces", "tienda", "opiniones", "visitanos"];
  function initHeader() {
    var head = document.getElementById("hz-head");
    if (!head) return;
    var steps = document.querySelectorAll("#hz-pir i");
    var secs = secIds.map(function (id) { return document.getElementById(id); });
    var ticking = false, last = -1;
    function update() {
      ticking = false;
      var y = window.scrollY || window.pageYOffset;
      head.classList.toggle("is-compact", y > 12);
      var vh = window.innerHeight, cur = 0;
      for (var i = 0; i < secs.length; i++) {
        if (secs[i] && secs[i].getBoundingClientRect().top <= vh * 0.45) cur = i;
      }
      if (cur !== last) {
        last = cur;
        Array.prototype.forEach.call(steps, function (el) {
          var k = parseInt(el.getAttribute("data-s"), 10);
          el.classList.toggle("is-past", k < cur);
          el.classList.toggle("is-now", k === cur);
        });
      }
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Menú ---------- */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".hz-burger"), menu = document.getElementById("hz-menu");
    if (!btn || !menu) return;
    var body = document.body, lbl = btn.querySelector(".hz-burger-lbl");
    var links = menu.querySelectorAll("a");
    Array.prototype.forEach.call(menu.querySelectorAll(".hz-menu-nav a"), function (a, i) { a.style.setProperty("--i", i); });
    function set(open) {
      if (open === body.classList.contains("hz-menu-open")) return;
      body.classList.toggle("hz-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("hz-menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("a")) set(false); });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("hz-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(Array.prototype.slice.call(links)), i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* ---------- Vigía por sondeo ---------- */
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

  /* ---------- WhatsApp flotante: se esconde donde ya hay un CTA grande ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]");
    if (!zones.length) return;
    var raf = null;
    function update() {
      raf = null;
      var vh = window.innerHeight, on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.top < vh * 0.98 && r.bottom > 0) { on = true; break; }
      }
      document.body.classList.toggle("hz-wa-off", on);
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(update); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;
    if (reduce) { Array.prototype.forEach.call(els, function (e) { e.classList.add("is-in"); }); return; }
    watchVisible(els, 0.92, function (e) { e.classList.add("is-in"); });
  }

  /* ---------- Anclas suaves ---------- */
  function go(el) {
    var head = document.querySelector(".hz-bar");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight + 8 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.MascoIr = go;
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
      var b = a.getAttribute("data-marca");
      if (b && window.MascoLista) window.MascoLista.marca(b);
      go(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  /* ---------- El papel picado: se cuelga al entrar, se mece con el scroll (reversible, sin pin) ---------- */
  function initPapel() {
    var strip = document.getElementById("papel");
    if (!strip) return;
    var flags = strip.querySelectorAll(".pp-f");
    var hung = false;
    function hang() { if (hung) return; hung = true; strip.classList.add("is-hung"); }
    if (reduce) { hang(); strip.classList.add("is-still"); return; }
    watchVisible([strip], 0.9, function () { hang(); });
    setTimeout(hang, 4000);
    var ticking = false;
    function sway() {
      ticking = false;
      var y = window.scrollY || 0;
      for (var i = 0; i < flags.length; i++) {
        var a = 2 * Math.sin(y / 140 + i * 0.85);
        flags[i].style.transform = "rotate(" + a.toFixed(2) + "deg)";
      }
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(sway); } }, { passive: true });
    sway();
  }

  function init() { initWa(); initHeader(); initMenu(); initWaHide(); initReveal(); initAnchors(); initPapel(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
