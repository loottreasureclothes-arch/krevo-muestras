/* Las Antorchas: mecánica común (header, menú, WhatsApp, reveal, anclas, letrero del hero) y comanda "Prende tus antorchas". */
(function () {
  "use strict";
  var WA = "524499189633";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var body = document.body;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* WhatsApp: cada botón nace con su wa.me real; aquí solo se confirma el href */
  function initWa() {
    var l = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < l.length; i++) { l[i].href = waUrl(l[i].getAttribute("data-wa")); l[i].target = "_blank"; l[i].rel = "noopener"; }
  }

  /* Menú */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".at-menu-btn"), menu = document.getElementById("at-menu");
    if (!btn || !menu) return;
    var lbl = btn.querySelector(".at-menu-lbl"), links = menu.querySelectorAll("a");
    function set(open) {
      if (open === body.classList.contains("at-menu-open")) return;
      body.classList.toggle("at-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("at-menu-open")); });
    menu.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) { set(false); return; }
      if (e.target === menu || e.target.classList.contains("at-menu-panel")) set(false);
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  /* Anclas sin scroll-behavior en CSS */
  function go(el) {
    var top = el.getBoundingClientRect().top + window.scrollY - (document.getElementById("at-header").offsetHeight + 12);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var h = a.getAttribute("href");
      if (h.length < 2) return;
      var el = document.querySelector(h);
      if (!el) return;
      e.preventDefault(); closeMenu();
      if (h === "#inicio") window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); else go(el);
    });
  }

  /* Vigía por sondeo (sin IntersectionObserver) */
  function watch(list, frac, cb) {
    var pend = Array.prototype.slice.call(list); if (!pend.length) return;
    var raf = null;
    function tick() {
      raf = null; var vh = window.innerHeight;
      for (var i = pend.length - 1; i >= 0; i--) {
        var r = pend[i].getBoundingClientRect();
        if (r.top < vh * frac && r.bottom > 0) { var el = pend[i]; pend.splice(i, 1); cb(el); }
      }
      if (pend.length) sch();
    }
    function sch() { if (!raf) raf = requestAnimationFrame(tick); }
    sch(); window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch);
  }
  function initReveal() {
    var els = document.querySelectorAll("[data-at-reveal]");
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { Array.prototype.forEach.call(els, show); return; }
    watch(els, 0.92, show);
  }

  /* El flotante se esconde donde ya hay un CTA grande */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]"); if (!zones.length) return;
    var raf = null;
    function upd() {
      raf = null; var vh = window.innerHeight, on = false;
      for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh * 0.7 && r.bottom > vh * 0.15) { on = true; break; } }
      body.classList.toggle("at-wa-off", on);
    }
    function sch() { if (!raf) raf = requestAnimationFrame(upd); }
    sch(); window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch);
  }

  /* Momento firma: el letrero se enciende al entrar y se apaga al salir con el scroll (reversible, resuelto a 1.6 s) */
  function initLetrero() {
    var hero = document.getElementById("hero"), dim = document.getElementById("at-hero-dim");
    if (!hero || !dim) return;
    function scrollDim() {
      var y = window.scrollY || 0, h = hero.offsetHeight || 600;
      var p = Math.min(1, Math.max(0, (y - h * 0.15) / (h * 0.6)));
      dim.style.opacity = (p * 0.88).toFixed(3);
    }
    if (!reduce) {
      hero.classList.add("is-pre");
      var done = false;
      var finish = function () { if (done) return; done = true; hero.classList.remove("is-pre"); dim.classList.remove("is-go"); dim.style.opacity = ""; scrollDim(); };
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        dim.classList.add("is-go"); hero.classList.remove("is-pre"); setTimeout(finish, 1100);
      }); });
      setTimeout(finish, 1500);
    }
    var raf = null;
    window.addEventListener("scroll", function () {
      if (dim.classList.contains("is-go")) return;
      if (!raf) raf = requestAnimationFrame(function () { raf = null; scrollDim(); });
    }, { passive: true });
  }

  /* ---------- Comanda: Prende tus antorchas ---------- */
  var items = {}, order = [], party = 2;
  function msg() {
    var parts = order.map(function (n) { return items[n] + " " + n; });
    if (!parts.length) return "Hola Las Antorchas, somos " + party + " y queremos mesa. ¿Hay lugar hoy?";
    return "Hola Las Antorchas, somos " + party + " y se nos antoja: " + parts.join(", ") + ". ¿Hay mesa hoy?";
  }
  function total() { var t = 0; for (var k in items) t += items[k]; return t; }
  function paint() {
    var wa = document.getElementById("at-wa");
    var t = total();
    body.classList.toggle("at-has", t > 0);
    wa.href = waUrl(msg());
    var n = wa.querySelector(".at-wa-n"); if (n) n.textContent = t;
    Array.prototype.forEach.call(document.querySelectorAll(".at-wa-live"), function (a) { a.href = waUrl(msg()); });
    var ps = document.getElementById("at-party-n"); if (ps) ps.textContent = party;
    Array.prototype.forEach.call(document.querySelectorAll("[data-item]"), function (el) {
      var q = items[el.getAttribute("data-item")] || 0;
      el.classList.toggle("is-lit", q > 0);
      var out = el.querySelector(".at-qn"); if (out) out.textContent = q || 1;
      var tb = el.querySelector(".at-torch, .at-rt"); if (tb) tb.setAttribute("aria-pressed", q > 0 ? "true" : "false");
    });
  }
  function setQty(name, q) {
    q = Math.max(0, Math.min(20, q));
    if (q === 0) { delete items[name]; order = order.filter(function (x) { return x !== name; }); }
    else { if (!items[name]) order.push(name); items[name] = q; }
    paint();
  }
  function initComanda() {
    document.addEventListener("click", function (e) {
      var t = e.target; if (!t.closest) return;
      var el = t.closest("[data-item]");
      if (el) {
        var name = el.getAttribute("data-item");
        if (t.closest(".at-torch, .at-rt")) { setQty(name, 1); return; }
        if (t.closest(".at-qp")) { setQty(name, (items[name] || 0) + 1); return; }
        if (t.closest(".at-qm")) { setQty(name, (items[name] || 0) - 1); return; }
      }
      if (t.closest("#at-party-p")) { party = Math.min(30, party + 1); paint(); }
      if (t.closest("#at-party-m")) { party = Math.max(1, party - 1); paint(); }
    });
    paint();
  }

  /* Horario: abierto ahora con la hora de Aguascalientes */
  var HRS = { 0: [9, 23], 1: [8, 24], 2: [8, 24], 3: [8, 24], 4: [8, 24], 5: [8, 24], 6: [8, 24] };
  function hLabel(h) { if (h === 24 || h === 0) return "12 a.m."; if (h === 12) return "12 p.m."; return (h > 12 ? h - 12 : h) + (h >= 12 ? " p.m." : " a.m."); }
  function initHoras() {
    var now = document.getElementById("at-now"); if (!now) return;
    var d, hh, mm;
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday); hh = parseInt(o.hour, 10) % 24; mm = parseInt(o.minute, 10);
    } catch (e) { var n = new Date(); d = n.getDay(); hh = n.getHours(); mm = n.getMinutes(); }
    var li = document.querySelector('#at-hrs li[data-d="' + d + '"]'); if (li) li.classList.add("is-today");
    var r = HRS[d], t = hh + mm / 60, txt, open = t >= r[0] && t < r[1];
    if (open) txt = "Abierto ahora · Cierra a las " + hLabel(r[1]);
    else { var nx = t < r[0] ? r : HRS[(d + 1) % 7]; txt = "Cerrado · Abre " + (t < r[0] ? "hoy" : "mañana") + " a las " + hLabel(nx[0]); }
    now.querySelector("span").textContent = txt; now.classList.toggle("is-off", !open);
  }

  /* Reseñas: contador del carrusel */
  function initTks() {
    var ul = document.getElementById("at-tks"), out = document.getElementById("at-tks-i"); if (!ul || !out) return;
    var raf = null;
    ul.addEventListener("scroll", function () {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null; var c = ul.scrollLeft + ul.clientWidth / 2, best = 0, bd = 1e9;
        Array.prototype.forEach.call(ul.children, function (li, i) { var m = li.offsetLeft + li.offsetWidth / 2, dd = Math.abs(m - c); if (dd < bd) { bd = dd; best = i; } });
        out.textContent = (best < 9 ? "0" : "") + (best + 1);
      });
    }, { passive: true });
  }

  function init() { initHoras(); initTks(); initWa(); initMenu(); initAnchors(); initReveal(); initWaHide(); initLetrero(); initComanda(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
