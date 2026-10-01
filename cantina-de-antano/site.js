/* La Cantina de Antaño · fundación de interacción:
   header que corre como película, menú, WhatsApp flotante, reveal, horarios en vivo y estado de "Mi mesa". */
(function () {
  "use strict";
  var WA = "524491721073";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  function money(n) { return "$" + Math.round(n).toLocaleString("es-MX"); }

  /* ---------- Sucursales y horarios (Google Maps, leído 30 sep 2026) ---------- */
  /* dow: 0 = domingo. Cada tramo [abre, cierra] en minutos; cierra > 1440 = madrugada del día siguiente. */
  var D = 1440, H2 = D + 120;
  var SUC = {
    colosio: { nombre: "Colosio", tel: "449 912 8121", tel2: "+524499128121",
      h: [[810, H2], [810, H2], [810, H2], [810, H2], [810, H2], [810, H2], [810, H2]] },
    anita: { nombre: "Sta. Anita", tel: "449 975 0938", tel2: "+524499750938",
      h: [[810, H2], [810, H2], [810, H2], [810, H2], [810, H2], [810, H2], [810, H2]] },
    nacozari: { nombre: "Nacozari", tel: "449 913 4289", tel2: "+524499134289",
      h: [[840, 1320], [840, 1320], [840, 1320], [840, 1320], [840, H2], [840, H2], [840, 1320]] },
    jpani: { nombre: "J. Pani", tel: "449 918 1964", tel2: "+524499181964",
      h: [[780, H2], [780, H2], [780, H2], [780, H2], [780, H2], [720, H2], [720, H2]] }
  };
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  function fmt(min) {
    min = ((min % D) + D) % D;
    var h = Math.floor(min / 60), m = min % 60, suf = h >= 12 ? "p.m." : "a.m.";
    var h12 = h % 12 === 0 ? 12 : h % 12;
    return h12 + ":" + (m < 10 ? "0" : "") + m + " " + suf;
  }
  function art(min) { min = ((min % D) + D) % D; return Math.floor(min / 60) % 12 === 1 ? "la " : "las "; }
  function dur(min) {
    var h = Math.floor(min / 60), m = min % 60;
    if (h > 0 && m > 0) return h + " h " + m + " min";
    if (h > 0) return h + " h";
    return m + " min";
  }
  /* Hora de Aguascalientes (America/Mexico_City). ?hora=15:00 (y &dia=vie) permite probar cualquier hora. */
  function ahora() {
    var q = {};
    try { location.search.replace(/^\?/, "").split("&").forEach(function (p) { var kv = p.split("="); if (kv[0]) q[kv[0]] = decodeURIComponent(kv[1] || ""); }); } catch (e) {}
    var dow, min;
    try {
      var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
      var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
      dow = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
      min = (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10);
    } catch (e) { var d = new Date(); dow = d.getDay(); min = d.getHours() * 60 + d.getMinutes(); }
    if (/^\d{1,2}:\d{2}$/.test(q.hora || "")) { var hm = q.hora.split(":"); min = parseInt(hm[0], 10) * 60 + parseInt(hm[1], 10); }
    if (q.dia) { var idx = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"].indexOf(q.dia.slice(0, 3).toLowerCase()); if (idx >= 0) dow = idx; }
    return { dow: dow, min: min };
  }
  /* Estado de una sucursal en un día/hora. */
  function estado(key, dow, min) {
    var h = SUC[key].h, hoy = h[dow], ayer = h[(dow + 6) % 7];
    if (ayer[1] > D && min < ayer[1] - D) return { open: true, cierra: ayer[1] - D };
    if (min >= hoy[0] && min < hoy[1]) return { open: true, cierra: hoy[1] };
    if (min < hoy[0]) return { open: false, abre: hoy[0], manana: false };
    var man = h[(dow + 1) % 7];
    return { open: false, abre: man[0], manana: true };
  }
  function estadoTxt(key, dow, min) {
    var e = estado(key, dow, min);
    if (e.open) return { open: true, t: "Abierta ahora · cierra a " + art(e.cierra) + fmt(e.cierra) };
    return { open: false, t: "Cerrada ahora · abre " + (e.manana ? "mañana " : "") + "a " + art(e.abre) + fmt(e.abre) };
  }

  /* ---------- Mi mesa: estado compartido ---------- */
  var KEY = "cantina_mesa";
  var S = { items: {}, suc: "colosio", n: 4, dia: "hoy", hora: "20:00", nombre: "", modo: "mesa" };
  var subs = [];
  (function load() {
    try {
      var d = JSON.parse(sessionStorage.getItem(KEY) || "null");
      if (d && typeof d === "object") { for (var k in S) if (d[k] !== undefined) S[k] = d[k]; if (!SUC[S.suc]) S.suc = "colosio"; }
    } catch (e) {}
  })();
  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function emit() { save(); subs.forEach(function (f) { try { f(api); } catch (e) {} }); }
  function count() { var n = 0; for (var k in S.items) n += S.items[k].qty; return n; }
  function total() { var t = 0; for (var k in S.items) t += S.items[k].qty * S.items[k].price; return t; }
  function horaTxt(v) { var p = v.split(":"); return art(parseInt(p[0], 10) * 60) + fmt(parseInt(p[0], 10) * 60 + parseInt(p[1], 10)); }
  function message() {
    var s = SUC[S.suc].nombre, n = S.n, pers = n + (n === 1 ? " persona" : " personas");
    var msg;
    if (S.modo === "evento") msg = "Hola La Cantina de Antaño, quiero cotizar un evento en " + s + " para " + pers + ".";
    else msg = "Hola La Cantina de Antaño, quiero apartar mesa en " + s + " para " + pers + " " + (S.dia === "manana" ? "mañana" : "hoy") + " a " + horaTxt(S.hora);
    if (!/\.$/.test(msg)) msg += ".";
    var it = [];
    for (var k in S.items) { var x = S.items[k]; it.push((x.qty > 1 ? x.qty + " x " : "") + x.label); }
    if (it.length) msg += " Pensamos pedir: " + it.join(", ") + ".";
    if (S.nombre && S.nombre.trim()) msg += " Nombre: " + S.nombre.trim();
    return msg;
  }
  var api = {
    SUC: SUC, money: money, fmt: fmt, art: art, dur: dur, ahora: ahora, estado: estado, estadoTxt: estadoTxt, DIAS: DIAS,
    get state() { return S; },
    get count() { return count(); }, get total() { return total(); },
    qtyOf: function (id) { return S.items[id] ? S.items[id].qty : 0; },
    add: function (it, q) {
      q = q || 1; var x = S.items[it.id];
      if (x) x.qty += q; else S.items[it.id] = { id: it.id, name: it.name, label: it.label || it.name, price: +it.price, qty: q };
      emit();
    },
    setQty: function (id, q) { if (!S.items[id]) return; if (q <= 0) delete S.items[id]; else S.items[id].qty = q; emit(); },
    set: function (k, v) { S[k] = v; emit(); },
    message: message, waUrl: function () { return waUrl(message()); },
    on: function (f) { subs.push(f); },
    go: function (el) { go(el); }
  };
  window.Cantina = api;

  /* ---------- Links de WhatsApp: nacen con href real; el JS solo reescribe el mensaje ---------- */
  function initWa() {
    $$("[data-wa]").forEach(function (a) { a.href = waUrl(a.getAttribute("data-wa")); a.target = "_blank"; a.rel = "noopener"; });
  }

  /* ---------- Header corre como película y se compacta ---------- */
  function initHeader() {
    var hd = $("#hd"); if (!hd) return;
    var tick = false;
    function upd() {
      tick = false;
      var y = window.scrollY || window.pageYOffset;
      hd.classList.toggle("is-compact", y > 12);
      hd.style.setProperty("--px", (y * 0.6) % 20);
    }
    window.addEventListener("scroll", function () { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }

  /* ---------- Menú ---------- */
  var closeMenu = function () {};
  function initMenu() {
    var btn = $("#burger"), menu = $("#menu"), body = document.body; if (!btn || !menu) return;
    var links = $$("a", menu);
    function set(open) {
      if (open === body.classList.contains("menu-open")) return;
      body.classList.toggle("menu-open", open); body.classList.toggle("lock", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      window.dispatchEvent(new Event("cantina:menu"));
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 60);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("a")) set(false); else if (e.target === menu) set(false); });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(links), i = items.indexOf(document.activeElement);
        e.preventDefault(); if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* ---------- Anclas suaves (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var top = el.getBoundingClientRect().top + window.scrollY - (document.querySelector(".hd") ? document.querySelector(".hd").offsetHeight + 6 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href"); if (href.length < 2) return;
      var el = document.querySelector(href); if (!el) return;
      e.preventDefault(); closeMenu();
      if (a.hasAttribute("data-evento")) api.set("modo", "evento");
      go(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  /* ---------- Vigía por sondeo (rAF + getBoundingClientRect) ---------- */
  function watch(list, frac, cb) {
    var pending = list.slice(); if (!pending.length) return;
    var raf = null;
    function tick() {
      raf = null; var vh = window.innerHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * frac && r.bottom > 0) cb(pending.splice(i, 1)[0]);
      }
      if (pending.length) sched();
    }
    function sched() { if (!raf) raf = requestAnimationFrame(tick); }
    sched(); window.addEventListener("scroll", sched, { passive: true }); window.addEventListener("resize", sched);
  }
  function initReveal() {
    var els = $$("[data-reveal], [data-drop]");
    if (reduce) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
    watch(els, 0.92, function (e) { e.classList.add("is-in"); });
  }

  /* ---------- WhatsApp flotante y barra Mi mesa ---------- */
  function initFloat() {
    var zones = $$("[data-hide-wa]"), mesa = $("#mesa"), bar = $("#mbar"), mb = $("#mbar-n"), mp = $("#mbar-p");
    function paint() {
      var n = count();
      if (mb) mb.textContent = n;
      if (mp) mp.textContent = money(total());
      var vh = window.innerHeight, inMesa = false;
      if (mesa) { var r = mesa.getBoundingClientRect(); inMesa = r.top < vh * 0.75 && r.bottom > vh * 0.25; }
      var showBar = n > 0 && !inMesa;
      if (bar) bar.hidden = !showBar;
      document.body.classList.toggle("has-mbar", showBar);
      var off = false;
      zones.forEach(function (z) { var r = z.getBoundingClientRect(); if (r.top < vh * 0.85 && r.bottom > vh * 0.1) off = true; });
      if (document.body.classList.contains("menu-open")) off = true;
      document.body.classList.toggle("wa-off", off);
    }
    var raf = null;
    function sched() { if (!raf) raf = requestAnimationFrame(function () { raf = null; paint(); }); }
    sched(); window.addEventListener("scroll", sched, { passive: true }); window.addEventListener("resize", sched);
    api.on(sched);
    window.addEventListener("cantina:menu", sched);
  }

  function init() { initWa(); initHeader(); initMenu(); initAnchors(); initReveal(); initFloat(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
