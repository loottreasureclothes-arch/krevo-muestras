/* Mariscos El Pescadito: menú, reveal (1.6 s), flotante, pedido compartido y horario. */
(function () {
  "use strict";
  var WA = "524494991972";
  var d = document, root = d.documentElement, body = d.body;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function q(s, c) { return (c || d).querySelector(s); }
  function qa(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }
  function money(n) { return "$" + n; }

  /* ---------- Pedido compartido (carta, copa y botones de WhatsApp) ---------- */
  var items = []; /* {key,name,price,qty} */
  var subs = [];
  function find(k) { for (var i = 0; i < items.length; i++) if (items[i].key === k) return items[i]; return null; }
  function total() { return items.reduce(function (s, i) { return s + i.price * i.qty; }, 0); }
  function count() { return items.reduce(function (s, i) { return s + i.qty; }, 0); }
  function message() {
    if (!items.length) return "Hola Mariscos El Pescadito, quiero hacer un pedido. ¿Qué me recomiendan hoy?";
    var l = ["Hola Mariscos El Pescadito, quiero pedir:"];
    items.forEach(function (i) { l.push("- " + i.qty + " x " + i.name + " (" + money(i.price * i.qty) + ")"); });
    l.push("Total: " + money(total()));
    l.push("¿Me confirman, por favor?");
    return l.join("\n");
  }
  function url() { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(message()); }
  function emit() {
    qa("[data-pedido-wa]").forEach(function (a) { a.href = url(); });
    qa("[data-pedido-wa-label]").forEach(function (s) { s.textContent = items.length ? "Mandar mi pedido · " + money(total()) : "Pedir por WhatsApp"; });
    qa("[data-pedido-count]").forEach(function (s) { s.textContent = count() ? "(" + count() + ")" : ""; });
    qa("[data-pedido-total]").forEach(function (s) { s.textContent = items.length ? money(total()) : "Elige arriba"; });
    subs.forEach(function (f) { f(); });
  }
  var Pedido = {
    add: function (key, name, price, qty) {
      var it = find(key);
      if (it) it.qty += qty || 1; else items.push({ key: key, name: name, price: price, qty: qty || 1 });
      emit();
    },
    change: function (key, delta) {
      var it = find(key); if (!it) return;
      it.qty += delta;
      if (it.qty <= 0) items.splice(items.indexOf(it), 1);
      emit();
    },
    items: function () { return items; }, total: total, count: count, message: message, url: url,
    on: function (f) { subs.push(f); }
  };
  window.Pedido = Pedido;

  /* botones "Agregar" de la carta: data-add="clave|Nombre|precio" */
  function initAdd() {
    d.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("[data-add]") : null;
      if (!b) return;
      var p = b.getAttribute("data-add").split("|");
      Pedido.add(p[0], p[1], parseInt(p[2], 10), 1);
      var lbl = b.querySelector(".lbl"), old = b.getAttribute("data-lbl") || (lbl ? lbl.textContent : "");
      if (lbl) {
        b.setAttribute("data-lbl", old);
        var it = find(p[0]);
        lbl.textContent = "En tu pedido x" + it.qty;
        b.classList.add("is-added");
        clearTimeout(b._t);
        b._t = setTimeout(function () { lbl.textContent = old; b.classList.remove("is-added"); }, 1400);
      }
    });
  }

  /* ---------- Menú ---------- */
  function initMenu() {
    var btn = q(".pe-menu-btn"), menu = q("#pe-menu");
    if (!btn || !menu) return;
    var lbl = q(".pe-menu-lbl", btn);
    function set(open) {
      body.classList.toggle("pe-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
    }
    btn.addEventListener("click", function () { set(!body.classList.contains("pe-menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  /* ---------- Anclas con scroll corto (sin scroll-behavior en CSS) ---------- */
  function initAnchors() {
    d.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a || e.defaultPrevented) return;
      var h = a.getAttribute("href"); if (h.length < 2) return;
      var el = q(h); if (!el) return;
      e.preventDefault();
      var head = q(".pe-head");
      var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight : 0) + 1;
      window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
      if (history.replaceState) history.replaceState(null, "", h);
    });
  }

  /* ---------- Vigía por sondeo (rAF + getBoundingClientRect) ---------- */
  function watch(list, frac, onIn, onOut) {
    var els = list.slice(), raf = null, state = els.map(function () { return false; });
    function tick() {
      raf = null;
      var vh = window.innerHeight || root.clientHeight;
      els.forEach(function (el, i) {
        var r = el.getBoundingClientRect(), inside = r.top < vh * frac && r.bottom > 0;
        if (inside && !state[i]) { state[i] = true; onIn(el); }
        else if (!inside && state[i] && onOut) { state[i] = false; onOut(el); }
      });
    }
    function sch() { if (!raf) raf = requestAnimationFrame(tick); }
    sch();
    window.addEventListener("scroll", sch, { passive: true });
    window.addEventListener("resize", sch);
  }

  function initReveal() {
    var els = qa("[data-reveal]");
    function show(el) { el.classList.add("in"); }
    if (reduce) { els.forEach(show); return; }
    watch(els, 1.0, function (el) { show(el); setTimeout(function () { show(el); }, 1600); });
    /* a los 1.6 s del primer vistazo todo lo que ya se asomó está visible; lo demás sigue por scroll */
    var toldo = qa(".pe-toldo");
    watch(toldo, 0.85, function (el) { el.classList.add("in"); }, function (el) { el.classList.remove("in"); });
    window.__peOk = true;
  }

  /* ---------- El flotante se esconde donde ya hay un verde grande ---------- */
  function initWaHide() {
    var zones = qa("[data-hide-wa]");
    if (!zones.length) return;
    function upd() {
      var vh = window.innerHeight, on = false;
      zones.forEach(function (z) { var r = z.getBoundingClientRect(); if (r.top < vh * 0.9 && r.bottom > vh * 0.05) on = true; });
      body.classList.toggle("pe-wa-off", on);
    }
    var raf = null;
    function sch() { if (!raf) raf = requestAnimationFrame(function () { raf = null; upd(); }); }
    sch(); window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch);
  }

  /* ---------- Horario: hoy resaltado y "Abierto ahora" (hora de Aguascalientes) ---------- */
  var HORAS = { 0: [11 * 60, 19 * 60 + 30], 1: [11 * 60, 19 * 60 + 30], 2: null, 3: [9 * 60, 20 * 60], 4: [11 * 60, 19 * 60 + 30], 5: [11 * 60, 19 * 60 + 30], 6: [11 * 60, 19 * 60 + 30] };
  function ahoraAgs() {
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      var wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
      return { dia: wd, min: parseInt(o.hour, 10) * 60 + parseInt(o.minute, 10) };
    } catch (e) { var n = new Date(); return { dia: n.getDay(), min: n.getHours() * 60 + n.getMinutes() }; }
  }
  function fmt(m) { var h = Math.floor(m / 60), mm = m % 60; return h + ":" + (mm < 10 ? "0" : "") + mm; }
  function initHorario() {
    var rows = qa("[data-dia]"), badge = q("[data-abierto]");
    if (!rows.length) return;
    var n = ahoraAgs();
    rows.forEach(function (r) { r.classList.toggle("is-hoy", parseInt(r.getAttribute("data-dia"), 10) === n.dia); });
    if (!badge) return;
    var h = HORAS[n.dia], txt, cls;
    if (!h) { txt = "Hoy: horario por confirmar"; cls = "is-dudo"; }
    else if (n.min >= h[0] && n.min < h[1]) { txt = "Abierto ahora · cierra a las " + fmt(h[1]); cls = "is-abierto"; }
    else if (n.min < h[0]) { txt = "Cerrado ahora · abre a las " + fmt(h[0]); cls = "is-cerrado"; }
    else { txt = "Cerrado ahora"; cls = "is-cerrado"; }
    badge.textContent = txt; badge.className = (badge.getAttribute("data-base") || "") + " " + cls;
  }

  function init() {
    emit(); initAdd(); initMenu(); initAnchors(); initReveal(); initWaHide(); initHorario();
  }
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", init); else init();
})();
