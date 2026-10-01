/* Cenaduría San Antonio: fundación de interacción.
   Header (toldo + atole del día), menú, WhatsApp, reveal, palabras, hora de Aguascalientes y LA CUENTA compartida. */
(function () {
  "use strict";
  var WA = "524499166522"; /* NO CONFIRMADO como WhatsApp: ver PENDIENTES.md */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function money(n) { return "$" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

  /* ---------- Hora de Aguascalientes (America/Mexico_City) ---------- */
  function mxNow() {
    try {
      var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date());
      var o = {};
      parts.forEach(function (p) { o[p.type] = p.value; });
      var dow = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
      return { dow: dow, h: parseInt(o.hour, 10) % 24, m: parseInt(o.minute, 10) };
    } catch (e) {
      var d = new Date();
      return { dow: d.getDay(), h: d.getHours(), m: d.getMinutes() };
    }
  }
  /* Horario de Google Maps: 5 a 11 p.m. (domingo desde las 4), jueves cerrado. */
  var ABRE = { 0: 16, 1: 17, 2: 17, 3: 17, 4: null, 5: 17, 6: 17 };
  var CIERRA = 23;
  var DIAS_L = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  function hr12(h) { return (h > 12 ? h - 12 : h) + ":00 " + (h >= 12 ? "p.m." : "a.m."); }
  function estado() {
    var n = mxNow(), a = ABRE[n.dow];
    if (a != null && n.h >= a && n.h < CIERRA) return { abierto: true, texto: "Abierto ahora, cierra a las " + hr12(CIERRA), dow: n.dow };
    if (a != null && n.h < a) return { abierto: false, texto: "Cerrado, abre hoy a las " + hr12(a), dow: n.dow };
    for (var k = 1; k <= 7; k++) {
      var d = (n.dow + k) % 7;
      if (ABRE[d] != null) {
        var cuando = k === 1 ? "mañana" : "el " + DIAS_L[d];
        return { abierto: false, texto: (a == null ? "Hoy descansan. Abren " : "Cerrado, abre ") + cuando + " a las " + hr12(ABRE[d]), dow: n.dow };
      }
    }
    return { abierto: false, texto: "Cerrado", dow: n.dow };
  }

  /* ---------- Atole del día (cartel de la puerta, leído de la foto de la fachada) ---------- */
  var ATOLES = {
    0: { k: "coco", n: "Coco", c: "#2F6FB8" },
    1: { k: "vainilla", n: "Vainilla", c: "#D9A62E" },
    2: { k: "cacahuate", n: "Cacahuate", c: "#C0392F" },
    3: { k: "chocolate", n: "Chocolate", c: "#4A3A36" },
    4: { k: "cerrado" },
    5: { k: "pregunta" },
    6: { k: "nuez", n: "Nuez", c: "#3F8F4B" }
  };
  function atoleInfo() {
    var n = mxNow(), dow = n.dow, man = false;
    if (n.h >= CIERRA) { dow = (dow + 1) % 7; man = true; }
    var a = ATOLES[dow], cuando = man ? "MAÑANA" : "HOY";
    if (a.k === "cerrado") return { k: "cerrado", c: "#8FA58A", label: man ? "MAÑANA · CERRADO" : "HOY DESCANSAN", nombre: "", cuando: cuando, dow: dow };
    if (a.k === "pregunta") return { k: "pregunta", c: "#8FA58A", label: man ? "MAÑANA · PREGUNTA EL ATOLE" : "VIERNES · PREGUNTA EL ATOLE", nombre: "", cuando: cuando, dow: dow };
    return { k: a.k, c: a.c, nombre: a.n, label: cuando + " · " + a.n.toUpperCase(), cuando: cuando, dow: dow };
  }

  /* ---------- LA CUENTA (compartida por carta, tamal y cierre) ---------- */
  var PRECIO_PLATILLO = 295;
  var TAMALES = {
    pinon: { n: "Piñón con cereza", m: "tamal de piñón con cereza" },
    nuez: { n: "Nuez", m: "tamal de nuez" },
    chocolate: { n: "Chocolate", m: "tamal de chocolate" },
    rompope: { n: "Rompope con almendra", m: "tamal de rompope con almendra" },
    rajas: { n: "Rajas con queso", m: "tamal de rajas con queso" },
    flor: { n: "Flor de calabaza", m: "tamal de flor de calabaza" }
  };
  var TAMAL_ORDEN = ["pinon", "nuez", "chocolate", "rompope", "rajas", "flor"];
  function pl(q, s, p) { return q + " " + (q > 1 ? p : s); }
  /* Cada renglon de la carta: nombre, precio (null = pregunta el precio) y como se dice en el mensaje. */
  var ITEMS = [
    { id: "atole", n: "Taza de atole", pr: 24, msg: function (q) { return q + " " + (q > 1 ? "atoles" : "atole") + " del día"; } },
    { id: "pollo", n: "1/4 de Pollo Frito", pr: 130, msg: function (q) { return pl(q, "cuarto", "cuartos") + " de pollo frito"; } },
    { id: "pozole", n: "Pozole", pr: null, msg: function (q) { return pl(q, "pozole", "pozoles"); } },
    { id: "enchiladas", n: "Enchiladas", pr: null, msg: function (q) { return pl(q, "orden", "órdenes") + " de enchiladas"; } },
    { id: "antojitos", n: "Flautas, sopes y tacos de papa", pr: null, msg: function (q) { return pl(q, "orden", "órdenes") + " de antojitos (flautas, sopes o tacos de papa)"; } },
    { id: "tamales", n: "Tamales dulces y salados", pr: null, msg: function (q) { return pl(q, "tamal", "tamales") + " (dulce o salado)"; } },
    { id: "pata-s", n: "1/2 pata sencilla", pr: 55, msg: function (q) { return pl(q, "media pata sencilla", "medias patas sencillas"); } },
    { id: "pata-p", n: "1/2 pata preparada", pr: 93, msg: function (q) { return pl(q, "media pata preparada", "medias patas preparadas"); } },
    { id: "cueritos", n: "Orden de cueritos", pr: 45, msg: function (q) { return pl(q, "orden", "órdenes") + " de cueritos"; } },
    { id: "verduras", n: "Orden de verduras", pr: 45, msg: function (q) { return pl(q, "orden", "órdenes") + " de verduras"; } },
    { id: "cafe", n: "Café de olla", pr: 22, msg: function (q) { return pl(q, "café de olla", "cafés de olla"); } },
    { id: "agua", n: "Agua fresca", pr: 28, msg: function (q) { return pl(q, "agua fresca", "aguas frescas"); } }
  ];
  var ITEM = {};
  ITEMS.forEach(function (it) { ITEM[it.id] = it; });

  var KEY = "cs_cuenta_v1";
  var S = { p: 0, t: [], x: {} };
  function load() {
    try {
      var s = JSON.parse(sessionStorage.getItem(KEY) || "null");
      if (s && typeof s === "object") {
        S.p = Math.max(0, Math.min(4, s.p | 0));
        S.t = (s.t || []).filter(function (k) { return TAMALES[k]; }).slice(0, S.p);
        S.x = {};
        Object.keys(s.x || {}).forEach(function (k) { if (ITEM[k] && s.x[k] > 0) S.x[k] = Math.min(9, s.x[k] | 0); });
      }
    } catch (e) {}
  }
  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function emit() {
    save();
    try { window.dispatchEvent(new CustomEvent("cs:cuenta")); }
    catch (e) { var ev = document.createEvent("CustomEvent"); ev.initCustomEvent("cs:cuenta", false, false, null); window.dispatchEvent(ev); }
  }
  var Cuenta = {
    get: function () { return S; },
    setP: function (n) {
      n = Math.max(0, Math.min(4, n));
      S.p = n;
      if (S.t.length > n) S.t = S.t.slice(0, n);
      emit();
    },
    toggleTamal: function (k) {
      if (!TAMALES[k]) return;
      var i = S.t.indexOf(k);
      if (i >= 0) { S.t.splice(i, 1); }
      else {
        if (S.p < 1) S.p = 1;
        if (S.t.length < S.p) S.t.push(k); else S.t[S.t.length - 1] = k;
      }
      emit();
    },
    setX: function (id, q) {
      if (!ITEM[id]) return;
      q = Math.max(0, Math.min(9, q));
      if (q) S.x[id] = q; else delete S.x[id];
      emit();
    },
    addX: function (id, d) { Cuenta.setX(id, (S.x[id] || 0) + d); },
    vacia: function () {
      return !S.p && !Object.keys(S.x).length;
    },
    lines: function () {
      var L = [];
      if (S.p) L.push({ key: "p", id: "p", qty: S.p, label: pl(S.p, "Platillo Hidrocálido", "Platillos Hidrocálidos"), total: S.p * PRECIO_PLATILLO });
      S.t.forEach(function (k, i) { L.push({ key: "t-" + k, id: "t", tk: k, sub: true, label: "Tamal " + (i + 1) + ": " + TAMALES[k].n, nota: "incluido" }); });
      ITEMS.forEach(function (it) {
        var q = S.x[it.id];
        if (!q) return;
        var label = (q > 1 ? q + " × " : "") + (it.id === "atole" ? "Taza de atole del día" : it.n);
        L.push({ key: "x-" + it.id + "-" + q, id: it.id, qty: q, label: label, total: it.pr != null ? it.pr * q : null });
      });
      return L;
    },
    total: function () {
      var t = S.p * PRECIO_PLATILLO;
      Object.keys(S.x).forEach(function (k) { if (ITEM[k].pr != null) t += ITEM[k].pr * S.x[k]; });
      return t;
    },
    haySinPrecio: function () { return Object.keys(S.x).some(function (k) { return ITEM[k].pr == null; }); },
    resumen: function () {
      var partes = [];
      if (S.p) {
        var tx = S.t.map(function (k) { return TAMALES[k].m; });
        var tt = tx.length > 1 ? tx.slice(0, -1).join(", ") + " y " + tx[tx.length - 1] : tx.join("");
        partes.push(pl(S.p, "Platillo Hidrocálido", "Platillos Hidrocálidos") + (tt ? " (" + tt + ")" : ""));
      }
      ITEMS.forEach(function (it) { if (S.x[it.id]) partes.push(it.msg(S.x[it.id])); });
      return partes;
    },
    message: function () {
      var r = Cuenta.resumen();
      if (!r.length) return "Hola Cenaduría San Antonio, quiero pedir para llevar. ¿Qué tienen hoy?";
      return "Hola Cenaduría San Antonio, quiero pedir para llevar: " + r.join(", ") + ". ¿A qué hora puedo pasar?";
    },
    on: function (cb) { window.addEventListener("cs:cuenta", cb); }
  };
  load();

  window.CS = { waUrl: waUrl, money: money, mxNow: mxNow, estado: estado, atole: atoleInfo, Cuenta: Cuenta, TAMALES: TAMALES, TAMAL_ORDEN: TAMAL_ORDEN, ITEM: ITEM, ITEMS: ITEMS, PRECIO_PLATILLO: PRECIO_PLATILLO, reduce: reduce, DIAS_L: DIAS_L, ABRE: ABRE, ATOLES: ATOLES, hr12: hr12 };

  /* ---------- Links de WhatsApp: el href NACE real en el HTML; aqui solo se actualiza el mensaje ---------- */
  function initWa() {
    function paint() {
      $$("[data-wa]").forEach(function (a) {
        var msg = a.hasAttribute("data-wa-cuenta") ? Cuenta.message() : a.getAttribute("data-wa");
        a.href = waUrl(msg);
        a.target = "_blank";
        a.rel = "noopener";
      });
    }
    paint();
    Cuenta.on(paint);
  }

  /* ---------- Header: se compacta; atole del dia colgado ---------- */
  function initHeader() {
    var head = $("#cs-head");
    if (!head) return;
    var ticking = false;
    function upd() { ticking = false; head.classList.toggle("is-compact", (window.scrollY || 0) > 12); }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
    var a = $("#cs-atole");
    if (a) {
      var i = $("i", a), b = $("b", a), info = atoleInfo();
      b.textContent = info.label;
      i.style.background = info.c;
      setTimeout(function () { a.classList.add("is-in"); }, 700);
    }
  }

  /* ---------- Menu pantalla completa ---------- */
  var closeMenu = function () {};
  function initMenu() {
    var btn = $(".cs-menu-btn"), menu = $("#cs-menu");
    if (!btn || !menu) return;
    var body = document.body, lbl = $(".cs-menu-lbl", btn);
    $$(".cs-menu-nav > a", menu).forEach(function (a, i) { a.style.setProperty("--i", i); });
    var links = $$("a", menu);
    function set(open) {
      var was = body.classList.contains("cs-menu-open");
      if (open === was) return;
      body.classList.toggle("cs-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "CERRAR" : "MENÚ";
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("cs-menu-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a) { set(false); return; }
      if (e.target === menu || e.target.classList.contains("cs-menu-nav") || e.target.classList.contains("cs-menu-foot")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("cs-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(links), i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* ---------- Vigia de visibilidad por sondeo ---------- */
  function watchVisible(list, frac, cb) {
    var pending = list.slice();
    if (!pending.length) return;
    var raf = null;
    function tick() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * frac && r.bottom > 0) cb(pending.splice(i, 1)[0]);
      }
      if (pending.length) sched();
    }
    function sched() { if (!raf) raf = requestAnimationFrame(tick); }
    sched();
    window.addEventListener("scroll", sched, { passive: true });
    window.addEventListener("resize", sched);
  }

  /* ---------- Titulos por palabra y cuadros que se asientan ---------- */
  function initWords() {
    var els = $$("[data-words]");
    els.forEach(function (el) {
      var i = 0;
      (function walk(node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (c) {
          if (c.nodeType === 3) {
            var frag = document.createDocumentFragment();
            c.textContent.split(/(\s+)/).forEach(function (w) {
              if (!w) return;
              if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
              var s = document.createElement("span");
              s.className = "w"; s.textContent = w; s.style.setProperty("--i", i++);
              frag.appendChild(s);
            });
            node.replaceChild(frag, c);
          } else if (c.nodeType === 1 && !c.classList.contains("w")) walk(c);
        });
      })(el);
    });
    if (reduce) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
    watchVisible(els, 0.95, function (e) { e.classList.add("is-in"); });
  }
  function initReveal() {
    var els = $$("[data-reveal]");
    if (reduce) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
    watchVisible(els, 0.92, function (el) {
      var img = el.querySelector("img");
      if (!img || img.complete) { el.classList.add("is-in"); return; }
      var done = false;
      function go() { if (done) return; done = true; el.classList.add("is-in"); }
      if (img.decode) img.decode().then(go, go); else { img.addEventListener("load", go); img.addEventListener("error", go); }
      setTimeout(go, 1000);
    });
  }

  /* ---------- Scroll a #anclas (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var head = $("#cs-head");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight + 12 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.CS.ir = go;
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (href.length < 2) return;
      var el = document.getElementById(href.slice(1));
      if (!el) return;
      e.preventDefault();
      closeMenu();
      go(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  /* ---------- WhatsApp flotante: se esconde mientras un boton verde ya esta a la vista ---------- */
  function initWaHide() {
    var zones = $$("[data-hide-wa], .cs-foot");
    if (!zones.length) return;
    var raf = null;
    function upd() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight, on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 40) { on = true; break; }
      }
      document.body.classList.toggle("cs-wa-off", on);
    }
    function sched() { if (!raf) raf = requestAnimationFrame(upd); }
    sched();
    window.addEventListener("scroll", sched, { passive: true });
    window.addEventListener("resize", sched);
  }

  function init() { initWa(); initHeader(); initMenu(); initWords(); initReveal(); initAnchors(); initWaHide(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
