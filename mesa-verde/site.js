/* Mesa Verde: mecánica común (menú, WhatsApp, reveal, anclas, horario). */
(function () {
  "use strict";
  var WA = "524496889208";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var body = document.body;
  window.MV = window.MV || {};
  MV.WA = WA;
  MV.wa = function (msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); };

  /* Horario real de Maps: 0=dom ... 6=sáb; martes (2) cerrado. [abre, cierra] en minutos */
  MV.HORA = { 0: [570, 960], 1: [570, 1020], 2: null, 3: [570, 1020], 4: [570, 1020], 5: [570, 1020], 6: [570, 1020] };
  MV.DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  MV.fmt = function (min) {
    var h = Math.floor(min / 60), m = min % 60, ap = h >= 12 ? "pm" : "am", h12 = h % 12 || 12;
    return h12 + ":" + (m < 10 ? "0" : "") + m + " " + ap;
  };
  /* Hora de Aguascalientes aunque el visitante esté en otra zona */
  MV.ahora = function () {
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", hour12: false, weekday: "short" }).formatToParts(new Date()), o = {};
      p.forEach(function (x) { o[x.type] = x.value; });
      var wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
      return { wd: wd, min: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10), d: +o.day, mo: +o.month, y: +o.year };
    } catch (e) {
      var n = new Date(); return { wd: n.getDay(), min: n.getHours() * 60 + n.getMinutes(), d: n.getDate(), mo: n.getMonth() + 1, y: n.getFullYear() };
    }
  };

  function initWa() {
    var l = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < l.length; i++) { l[i].href = MV.wa(l[i].getAttribute("data-wa")); l[i].target = "_blank"; l[i].rel = "noopener"; }
  }

  function initMenu() {
    var btn = document.querySelector(".hd-menu-btn"), menu = document.getElementById("hd-menu");
    if (!btn || !menu) return;
    var lbl = btn.querySelector(".hd-menu-lbl"), links = menu.querySelectorAll("a");
    function set(open) {
      if (open === body.classList.contains("mn-open")) return;
      body.classList.toggle("mn-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      lbl.textContent = open ? "Cerrar" : "Menú";
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      else btn.focus({ preventScroll: true });
    }
    MV.closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("mn-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a");
      if (a) { set(false); return; }
      if (e.target === menu || e.target.classList.contains("mn-scrim") || e.target.classList.contains("mn-panel") || e.target.classList.contains("mn-nav") || e.target.classList.contains("mn-foot")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("mn-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat([].slice.call(links)), i = items.indexOf(document.activeElement);
        e.preventDefault(); if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  function watch(list, frac, cb, both) {
    var pending = [].slice.call(list); if (!pending.length) return; var raf = null;
    function tick() {
      raf = null; var vh = innerHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * frac && r.bottom > 0) { var el = pending[i]; if (!both) pending.splice(i, 1); cb(el, true); }
        else if (both) cb(pending[i], false);
      }
      if (pending.length && !both) sched();
    }
    function sched() { if (!raf) raf = requestAnimationFrame(tick); }
    sched(); addEventListener("scroll", sched, { passive: true }); addEventListener("resize", sched);
  }

  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (reduce) { [].forEach.call(els, function (e) { e.classList.add("is-in"); }); return; }
    watch(els, 0.92, function (el) { el.classList.add("is-in"); });
  }

  /* Momento firma: el letrero se cuelga al entrar y vuelve a colgarse si regresas arriba */
  function initSign() {
    var hero = document.querySelector("[data-hero]"); if (!hero) return;
    if (reduce) { hero.classList.add("is-in"); return; }
    requestAnimationFrame(function () { requestAnimationFrame(function () { hero.classList.add("is-in"); }); });
    setTimeout(function () { hero.classList.add("is-in"); }, 1600);
    var out = false;
    addEventListener("scroll", function () {
      var r = hero.getBoundingClientRect();
      if (r.bottom < innerHeight * 0.1 && !out) { out = true; hero.classList.remove("is-in"); }
      else if (r.bottom > innerHeight * 0.5 && out) { out = false; hero.classList.add("is-in"); }
    }, { passive: true });
  }

  function initWaHide() {
    var z = document.querySelectorAll("[data-hide-wa]"); if (!z.length) return; var raf = null;
    function up() {
      raf = null; var on = false;
      for (var i = 0; i < z.length; i++) { var r = z[i].getBoundingClientRect(); if (r.top < innerHeight * .8 && r.bottom > 0) { on = true; break; } }
      body.classList.toggle("wa-off", on);
    }
    function s() { if (!raf) raf = requestAnimationFrame(up); }
    s(); addEventListener("scroll", s, { passive: true }); addEventListener("resize", s);
  }

  function go(el) {
    var head = document.querySelector(".hd-bar");
    var top = el.getBoundingClientRect().top + scrollY - (head ? head.offsetHeight + 8 : 0);
    scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  MV.go = go;
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var h = a.getAttribute("href"); if (h.length < 2) return;
      var el = document.querySelector(h); if (!el) return;
      e.preventDefault(); MV.closeMenu && MV.closeMenu();
      go(el); if (history.replaceState) history.replaceState(null, "", h);
    });
  }

  /* Estado en vivo: "Hoy abierto hasta..." */
  function initHoy() {
    var out = document.querySelectorAll("[data-hoy]"); if (!out.length) return;
    var n = MV.ahora(), h = MV.HORA[n.wd], txt, abierto = false;
    if (h && n.min >= h[0] && n.min < h[1]) { txt = "Abierto ahora, hasta las " + MV.fmt(h[1]); abierto = true; }
    else if (h && n.min < h[0]) txt = "Hoy abrimos a las " + MV.fmt(h[0]);
    else {
      var k = 1; while (k < 8 && !MV.HORA[(n.wd + k) % 7]) k++;
      var nx = (n.wd + k) % 7; txt = "Hoy cerrado. Abrimos " + (k === 1 ? "mañana" : "el " + MV.DIAS[nx]) + " a las " + MV.fmt(MV.HORA[nx][0]);
    }
    [].forEach.call(out, function (o) { o.textContent = txt; o.classList.toggle("on", abierto); });
    var rows = document.querySelectorAll("[data-dia]");
    [].forEach.call(rows, function (r) { r.classList.toggle("hoy", +r.getAttribute("data-dia") === n.wd); });
  }

  function init() { initWa(); initMenu(); initReveal(); initSign(); initWaHide(); initAnchors(); initHoy(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
