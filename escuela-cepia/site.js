/* Colegio CEPIA: fundacion de interaccion (header del dia, menu, WhatsApp, reveal, gis, fecha en Mexico). */
(function () {
  "use strict";
  var WA = "524499787180";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  /* rAF con respaldo por temporizador (vistas previas y pestañas en segundo plano pausan rAF) */
  function frame(fn) { var done = false; var f = function () { if (done) return; done = true; fn(); }; requestAnimationFrame(f); setTimeout(f, 120); }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------- Fecha y hora en Ciudad de Mexico (America/Mexico_City) ----------
     ?hoy=2026-11-02 (o 2026-10-29T18:30) simula otro dia para probar el Open House y el horario. */
  function now() {
    try {
      var q = new URLSearchParams(location.search).get("hoy");
      var m = q && q.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?$/);
      if (m) return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], (m[4] ? +m[4] : 12) + 6, m[5] ? +m[5] : 0));
    } catch (e) {}
    return new Date();
  }
  function mx(date) {
    var out = { y: 0, m: 1, d: 1, h: 0, mi: 0, dow: 0 };
    try {
      var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", weekday: "short" }).formatToParts(date);
      var map = {};
      parts.forEach(function (p) { map[p.type] = p.value; });
      out.y = +map.year; out.m = +map.month; out.d = +map.day; out.h = +map.hour % 24; out.mi = +map.minute;
      out.dow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(map.weekday);
    } catch (e) {
      var u = new Date(date.getTime() - 6 * 3600 * 1000);
      out = { y: u.getUTCFullYear(), m: u.getUTCMonth() + 1, d: u.getUTCDate(), h: u.getUTCHours(), mi: u.getUTCMinutes(), dow: u.getUTCDay() };
    }
    return out;
  }
  function dayNumber(y, m, d) { return Math.floor(Date.UTC(y, m - 1, d) / 86400000); }

  /* ---------- Texto que se escribe con gis ---------- */
  function chalk(el, text, done) {
    if (!el) return;
    clearTimeout(el._ct);
    el.setAttribute("data-final", text);
    if (reduce || !text) { el.textContent = text; el.classList.remove("is-writing"); if (done) done(); return; }
    var per = Math.min(18, Math.max(3, 600 / text.length)), i = 0;
    el.classList.add("is-writing");
    el.innerHTML = '<span class="cp-g" aria-hidden="true"></span><span class="cp-t"></span>';
    el.firstChild.textContent = text;
    var typed = el.lastChild;
    (function step() {
      i++;
      typed.textContent = text.slice(0, i);
      if (i < text.length) el._ct = setTimeout(step, per);
      else { el.classList.remove("is-writing"); el.textContent = text; if (done) done(); }
    })();
  }

  /* ---------- Titulos que caen y pegan: se parten en palabras ---------- */
  function splitDrops() {
    var drops = document.querySelectorAll(".cp-drop");
    Array.prototype.forEach.call(drops, function (el) {
      var n = 0;
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      var nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(function (t) {
        if (!t.nodeValue.trim()) return;
        var frag = document.createDocumentFragment();
        t.nodeValue.split(/(\s+)/).forEach(function (tok) {
          if (!tok) return;
          if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(" ")); return; }
          var s = document.createElement("span");
          s.className = "cp-w"; s.style.setProperty("--i", n++); s.textContent = tok;
          frag.appendChild(s);
        });
        t.parentNode.replaceChild(frag, t);
      });
      el.classList.add("cp-split");
    });
  }

  /* ---------- Links de WhatsApp: el href ya nace real; el JS solo lo refresca al tocar ---------- */
  function bindWa(a, getMsg) {
    var f = function () { a.href = waUrl(getMsg()); };
    ["pointerdown", "click", "focus", "touchstart"].forEach(function (ev) { a.addEventListener(ev, f, { passive: true }); });
    return f;
  }
  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    Array.prototype.forEach.call(links, function (a) {
      if (a.hasAttribute("data-wa-dyn")) return;
      bindWa(a, function () { return a.getAttribute("data-wa"); });
    });
  }

  /* ---------- Header: se compacta, linea de cancha ligada al scroll, fecha del dia ---------- */
  function initHeader() {
    var header = document.getElementById("cp-header");
    if (!header) return;
    var fill = document.getElementById("cp-line-fill");
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY || window.pageYOffset;
      header.classList.toggle("is-compact", y > 12);
      var max = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
      var pct = max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0;
      if (fill) fill.style.width = pct + "%";
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; frame(update); } }, { passive: true });
    update();
    var today = document.getElementById("cp-today");
    if (today) {
      var t = mx(now());
      var txt = cap(DIAS[t.dow]) + " " + t.d + " de " + MESES[t.m - 1];
      today.setAttribute("data-final", txt);
      setTimeout(function () { chalk(today, txt); }, 450);
    }
    var dateM = document.getElementById("cp-date");
    if (dateM) {
      var tm = mx(now());
      var dia = cap(DIAS[tm.dow]);
      if (window.innerWidth < 380) dia = dia.slice(0, 3) + ".";
      var txm = dia + " " + tm.d + " de " + MESES[tm.m - 1];
      dateM.textContent = txm;
      if (window.innerWidth < 1000) setTimeout(function () { chalk(dateM, txm); }, 450);
    }
  }

  /* ---------- Menu pantalla completa ---------- */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".cp-menu-btn");
    var menu = document.getElementById("cp-menu");
    if (!btn || !menu) return;
    var body = document.body;
    Array.prototype.forEach.call(menu.querySelectorAll(".cp-menu-nav a"), function (a, i) { a.style.setProperty("--i", i); });
    var links = menu.querySelectorAll("a");
    var lbl = btn.querySelector(".cp-menu-lbl");
    function set(open) {
      var was = body.classList.contains("cp-menu-open");
      if (open === was) return;
      body.classList.toggle("cp-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 90);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("cp-menu-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a) { set(false); return; }
      var t = e.target;
      if (t === menu || t.classList.contains("cp-menu-panel") || t.classList.contains("cp-menu-nav") || t.classList.contains("cp-menu-foot")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("cp-menu-open")) return;
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

  /* ---------- WhatsApp flotante: se esconde donde ya hay un boton verde grande ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa], .cp-foot");
    if (!zones.length) return;
    function update() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        var vis = Math.min(r.bottom, vh) - Math.max(r.top, 0);
        if (vis > vh * 0.3) { on = true; break; }
      }
      document.body.classList.toggle("cp-wa-off", on);
    }
    var q = false;
    function schedule() { if (q) return; q = true; frame(function () { q = false; update(); }); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  /* ---------- Reveal (el temporizador de 1.6 s de seguridad va inline en template.html) ---------- */
  function watchVisible(list, vhFrac, onVisible) {
    var pending = Array.prototype.slice.call(list);
    if (!pending.length) return;
    var queued = false;
    function tick() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * vhFrac && r.bottom > 0) { onVisible(pending.splice(i, 1)[0]); }
      }
    }
    function schedule() {
      if (queued) return; queued = true;
      var f = function () { if (!queued) return; queued = false; tick(); };
      requestAnimationFrame(f); setTimeout(f, 150);
    }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  function initReveal() {
    var els = document.querySelectorAll("[data-cp-reveal], .cp-drop");
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { Array.prototype.forEach.call(els, show); return; }
    watchVisible(els, 0.92, show);
  }

  /* ---------- Scroll suave a #anclas (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var head = document.getElementById("cp-header");
    var top = el.getBoundingClientRect().top + window.scrollY - ((head ? head.offsetHeight : 60) + 12);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
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

  window.CP = { frame: frame, watch: watchVisible, WA: WA, waUrl: waUrl, bindWa: bindWa, now: now, mx: mx, dayNumber: dayNumber, chalk: chalk, go: go, DIAS: DIAS, MESES: MESES, cap: cap, reduce: reduce };

  function init() {
    splitDrops(); initWa(); initHeader(); initMenu(); initWaHide(); initReveal(); initAnchors();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
