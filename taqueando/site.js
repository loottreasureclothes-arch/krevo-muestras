/* Taqueando: estado de la charola, header, menu, WhatsApp, anclas. */
(function () {
  "use strict";
  var WA = "524492018515";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* ---------- La carta (literal de maps-centro-16) ---------- */
  var MENU = [
    { id: "pastor", n: "pastor", t: "Pastor", p: 28 },
    { id: "chorizo", n: "chorizo", t: "Chorizo", p: 28 },
    { id: "bistec", n: "bistec", t: "Bistec", p: 30 },
    { id: "sirloin", n: "sirloin", t: "Sirloin", p: 39 },
    { id: "arrachera", n: "arrachera", t: "Arrachera", p: 49 },
    { id: "champinones", n: "champiñones", t: "Champiñones", p: 24 },
    { id: "chicharron", n: "chicharrón prensado", t: "Chicharrón Prensado", p: 26 },
    { id: "chichi", n: "chichi planchada", t: "Chichi Planchada", p: 28 },
    { id: "regio", n: "El Regio", t: "El Regio", p: 59 },
    { id: "barbacha", n: "Barbacha", t: "Barbacha", p: 59 },
    { id: "sabanita", n: "sabanita de rib eye", t: "Sabanita de Rib eye", p: 59 }
  ];
  var BY = {}; MENU.forEach(function (m) { BY[m.id] = m; });
  var SUC = { centro: "Centro", norte: "Norte", sur: "Sur" };
  var BEB = { cheve: "cheve", agua: "agua de sabor", nada: "" };
  var KEY = "tq_charola";

  var S = { orden: [], q: {}, modo: "normal", bebida: "", suc: "", nombre: "" };
  try {
    var raw = sessionStorage.getItem(KEY);
    if (raw) {
      var o = JSON.parse(raw);
      if (o && typeof o === "object") {
        (o.orden || []).forEach(function (id) { if (BY[id] && o.q && o.q[id] > 0) { S.orden.push(id); S.q[id] = Math.min(20, o.q[id] | 0); } });
        if (["normal", "queso", "volcan"].indexOf(o.modo) > -1) S.modo = o.modo;
        if (BEB.hasOwnProperty(o.bebida)) S.bebida = o.bebida;
        if (SUC[o.suc]) S.suc = o.suc;
        if (typeof o.nombre === "string") S.nombre = o.nombre.slice(0, 40);
      }
    }
  } catch (e) {}
  var subs = [];
  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function emit(info) { save(); subs.forEach(function (f) { try { f(info || {}); } catch (e) {} }); }
  function count() { var n = 0; S.orden.forEach(function (id) { n += S.q[id]; }); return n; }
  function total() {
    var t = 0; S.orden.forEach(function (id) { t += BY[id].p * S.q[id]; });
    if (S.modo !== "normal") t += 10 * count();
    return t;
  }
  function list() {
    var parts = S.orden.map(function (id) { return S.q[id] + " de " + BY[id].n; });
    if (parts.length > 1) return parts.slice(0, -1).join(", ") + " y " + parts[parts.length - 1];
    return parts[0] || "";
  }
  function message() {
    var m = "Hola Taqueando, quiero pedir";
    if (!S.orden.length) m += " tacos.";
    else m += ": " + list() + ".";
    if (S.orden.length && S.modo === "queso") m += " Los quiero con queso.";
    if (S.orden.length && S.modo === "volcan") m += " Los quiero en volcán.";
    if (S.bebida && BEB[S.bebida]) m += " Para tomar: " + BEB[S.bebida] + ".";
    if (S.suc) m += " Sucursal: " + SUC[S.suc] + ".";
    if (S.nombre && S.nombre.trim()) m += " Mi nombre: " + S.nombre.trim() + ".";
    return m;
  }
  var Tq = window.Tq = {
    MENU: MENU, BY: BY, SUC: SUC, state: S, count: count, total: total, list: list, message: message,
    url: function () { return waUrl(message()); },
    on: function (f) { subs.push(f); },
    add: function (id) { if (!BY[id]) return; if (!S.q[id]) { S.q[id] = 0; S.orden.push(id); } if (S.q[id] < 20) S.q[id]++; emit({ added: id }); },
    remove: function (id) {
      if (!S.q[id]) return; S.q[id]--;
      if (S.q[id] <= 0) { delete S.q[id]; S.orden.splice(S.orden.indexOf(id), 1); }
      emit({ removed: id });
    },
    set: function (k, v) { S[k] = v; emit({ key: k }); },
    waUrl: waUrl, go: go
  };

  /* ---------- Links de WhatsApp: ya nacen con href real; aqui solo se confirma ---------- */
  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      links[i].href = waUrl(links[i].getAttribute("data-wa"));
      links[i].target = "_blank"; links[i].rel = "noopener";
    }
  }
  function refreshPedidoLinks() {
    var u = Tq.url(), els = document.querySelectorAll("[data-wa-pedido]");
    for (var i = 0; i < els.length; i++) { els[i].href = u; els[i].target = "_blank"; els[i].rel = "noopener"; }
  }
  Tq.on(refreshPedidoLinks);

  /* ---------- Header: compacto + charolita ---------- */
  function initHeader() {
    var header = document.getElementById("tq-header");
    var discs = document.getElementById("tq-mini-discs");
    var empty = document.getElementById("tq-mini-empty");
    var suc = document.getElementById("tq-mini-suc");
    var mini = document.getElementById("tq-mini");
    var ticking = false, lastLen = 0;
    function onScroll() { ticking = false; header.classList.toggle("is-compact", (window.scrollY || window.pageYOffset) > 12); }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();
    function paint(info) {
      var units = []; S.orden.forEach(function (id) { for (var i = 0; i < S.q[id]; i++) units.push(id); });
      var total = units.length, shown = units.slice(0, 6);
      discs.textContent = "";
      shown.forEach(function (id, i) {
        var im = document.createElement("img");
        im.src = "img/taco-" + id + ".webp"; im.alt = ""; im.width = 22; im.height = 22;
        if (info && info.added && i === shown.length - 1 && total > lastLen && total <= 6) im.className = "is-new";
        discs.appendChild(im);
      });
      if (total > 6) { var p = document.createElement("span"); p.className = "tq-mini-plus"; p.textContent = "+" + (total - 6); discs.appendChild(p); }
      empty.hidden = total > 0;
      suc.textContent = S.suc ? SUC[S.suc] : "";
      mini.setAttribute("aria-label", total ? "Mi charola: " + total + (total === 1 ? " taco" : " tacos") : "Mi charola, vacía");
      if (info && info.added) { mini.classList.remove("is-ping"); void mini.offsetWidth; mini.classList.add("is-ping"); }
      lastLen = total;
    }
    Tq.on(paint); paint({});
  }

  /* ---------- Menu ---------- */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".tq-burger"), menu = document.getElementById("tq-menu");
    if (!btn || !menu) return;
    var body = document.body, lbl = btn.querySelector(".tq-burger-lbl"), links = menu.querySelectorAll("a");
    function set(open) {
      var was = body.classList.contains("tq-menu-open");
      if (open === was) return;
      body.classList.toggle("tq-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 60);
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("tq-menu-open")); });
    menu.addEventListener("click", function (e) { var a = e.target.closest ? e.target.closest("a") : null; if (a) set(false); });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("tq-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); btn.focus(); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(Array.prototype.slice.call(links)), i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* ---------- Flotante: se esconde donde ya hay boton verde a la vista ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa], .tq-foot");
    if (!zones.length) return;
    var raf = null;
    function update() {
      var vh = window.innerHeight || document.documentElement.clientHeight, on = false;
      for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh * 0.92 && r.bottom > vh * 0.08) { on = true; break; } }
      document.body.classList.toggle("tq-wa-off", on);
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(function () { raf = null; update(); }); }
    schedule(); window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", schedule);
    Tq.on(schedule);
  }

  /* ---------- Anclas suaves (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var h = document.getElementById("tq-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (h ? h.offsetHeight + 10 : 0);
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
      e.preventDefault(); closeMenu(); go(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  function init() { initWa(); refreshPedidoLinks(); initHeader(); initMenu(); initWaHide(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
