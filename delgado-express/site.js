/* Delgado Express · fundación de interacción (header, placa, menú, títulos, WhatsApp, anclas). */
(function () {
  "use strict";
  var WA = "524499764042";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  /* rAF con respaldo de temporizador: si la pestaña/vista no corre rAF, el estado se actualiza igual. */
  function sched(fn) { var q = 0; return function () { if (q) return; q = 1; var go = function () { if (q) { q = 0; fn(); } }; requestAnimationFrame(go); setTimeout(go, 120); }; }
  window.DX = { waUrl: waUrl, WA: WA, reduce: reduce, sched: sched };

  /* WhatsApp: el href nace real en el HTML; aquí solo se confirma y se refresca al tocar (sin preventDefault, sin window.open). */
  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      (function (a) {
        function fix() { var m = a.getAttribute("data-wa"); if (m) a.href = waUrl(m); }
        fix();
        a.addEventListener("pointerdown", fix);
        a.addEventListener("click", fix);
      })(links[i]);
    }
  }

  /* Títulos: una palabra por <span class="w"> para que caigan y peguen. */
  function splitTitles() {
    var heads = document.querySelectorAll("[data-drop]");
    for (var h = 0; h < heads.length; h++) {
      var idx = 0;
      var lines = heads[h].querySelectorAll(".ln");
      if (!lines.length) lines = [heads[h]];
      for (var l = 0; l < lines.length; l++) {
        var words = lines[l].textContent.trim().split(/\s+/);
        var html = "";
        for (var k = 0; k < words.length; k++) {
          html += '<span class="w"><span class="wi" style="--i:' + (idx++) + '">' + words[k] + "</span></span> ";
        }
        lines[l].setAttribute("aria-label", lines[l].textContent.trim());
        lines[l].innerHTML = html;
      }
    }
  }
  window.DXsetLine = function (ln, text) {
    var words = text.trim().split(/\s+/), html = "";
    for (var k = 0; k < words.length; k++) html += '<span class="w"><span class="wi" style="--i:' + k + '">' + words[k] + "</span></span> ";
    ln.innerHTML = html;
  };

  /* Header: se compacta; la placa de número económico cambia según la sección (volteo de 220 ms, reversible). */
  function initHeader() {
    var head = document.getElementById("dx-head");
    var plate = document.querySelector(".dx-plate");
    var num = document.getElementById("dx-plate-n");
    var secs = Array.prototype.slice.call(document.querySelectorAll("[data-unit]"));
    var cur = num ? num.textContent : "";
    function update() {
      var y = window.scrollY || 0;
      head.classList.toggle("is-compact", y > 12);
      if (!num || !secs.length) return;
      var line = (window.innerHeight || 800) * 0.4, pick = secs[0];
      for (var i = 0; i < secs.length; i++) { if (secs[i].getBoundingClientRect().top <= line) pick = secs[i]; }
      var n = pick.getAttribute("data-unit");
      if (n !== cur) {
        cur = n;
        if (reduce) { num.textContent = n; return; }
        plate.classList.remove("is-flip"); void plate.offsetWidth; plate.classList.add("is-flip");
        setTimeout(function () { num.textContent = n; }, 110);
      }
    }
    var go = sched(update);
    addEventListener("scroll", go, { passive: true }); addEventListener("resize", go); update();
  }

  /* Menú hamburguesa */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".dx-burger"), menu = document.getElementById("dx-menu"), body = document.body;
    if (!btn || !menu) return;
    var links = menu.querySelectorAll("a");
    function set(open) {
      if (open === body.classList.contains("dx-menu-open")) return;
      body.classList.toggle("dx-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 60);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("dx-menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("a")) set(false); });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("dx-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(Array.prototype.slice.call(links)), i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* El flotante de WhatsApp se esconde donde ya hay datos o un CTA grande ([data-hide-wa]). */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]");
    if (!zones.length) return;
    function update() {
      var vh = window.innerHeight || 800, on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.top < vh - 70 && r.bottom > vh - 90) { on = true; break; }
      }
      document.body.classList.toggle("dx-wa-off", on);
    }
    var go = sched(update);
    addEventListener("scroll", go, { passive: true }); addEventListener("resize", go); update();
  }

  /* Anclas suaves sin scroll-behavior en CSS. */
  function go(el) {
    var head = document.getElementById("dx-head");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight + 8 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.DXgo = go;
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

  function init() { initWa(); splitTitles(); initHeader(); initMenu(); initWaHide(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
