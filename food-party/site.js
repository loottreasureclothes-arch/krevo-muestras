/* FOOD PARTY: fundación (estado compartido, header con la fecha, menú, WhatsApp flotante, reveal, anclas). */
(function () {
  "use strict";
  var WA = "524494389898";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var MES3 = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var DIA3 = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* ---------- Fecha ---------- */
  function hoyISO() {
    try {
      var p = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Mexico_City", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
      if (/^\d{4}-\d{2}-\d{2}$/.test(p)) return p;
    } catch (e) {}
    var d = new Date();
    return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
  }
  function parts(iso) { var p = (iso || "").split("-"); return p.length === 3 ? { y: +p[0], m: +p[1], d: +p[2] } : null; }
  function utc(iso) { var p = parts(iso); return p ? Date.UTC(p.y, p.m - 1, p.d) : NaN; }
  function dias(iso) { return Math.round((utc(iso) - utc(hoyISO())) / 86400000); }
  function dow(iso) { return new Date(utc(iso)).getUTCDay(); }
  function fechaLarga(iso) { var p = parts(iso); if (!p) return ""; return DIAS[dow(iso)] + " " + p.d + " de " + MESES[p.m - 1] + " de " + p.y; }
  function fechaCorta(iso) { var p = parts(iso); if (!p) return ""; return DIA3[dow(iso)].slice(0, 3).toLowerCase() + " " + p.d + " " + MES3[p.m - 1].toLowerCase(); }

  /* ---------- Estado compartido (sessionStorage, siempre en try/catch) ---------- */
  var KEY = "fp_estado";
  var PLATOS = [
    { id: "fettuccine", nombre: "fettuccine con hierbas", letrero: "Fettuccine con hierbas" },
    { id: "ensalada", nombre: "ensalada con fresa y betabel", letrero: "Ensalada con fresa y betabel" },
    { id: "verduras", nombre: "verduras al vapor", letrero: "Verduras al vapor" },
    { id: "guisado", nombre: "guisado en salsa roja", letrero: "Guisado en salsa roja" },
    { id: "arroz", nombre: "arroz amarillo", letrero: "Arroz amarillo" },
    { id: "col", nombre: "ensalada de col morada", letrero: "Ensalada de col morada" }
  ];
  var PAQ = [
    { p: "4 a 5", kg: "1 kg", g: "¼ L", s: "¼ L", precio: "$449", max: 5 },
    { p: "6 a 10", kg: "2 kg", g: "½ L", s: "½ L", precio: "$849", max: 10 },
    { p: "11 a 15", kg: "3 kg", g: "¾ L", s: "¾ L", precio: "$1,249", max: 15 },
    { p: "16 a 20", kg: "4 kg", g: "1 L", s: "1 L", precio: "$1,649", max: 20 },
    { p: "21 a 25", kg: "5 kg", g: "1¼ L", s: "1¼ L", precio: "$2,049", max: 25 },
    { p: "26 a 30", kg: "6 kg", g: "1½ L", s: "1½ L", precio: "$2,449", max: 30 },
    { p: "31 a 40", kg: "8 kg", g: "2 L", s: "2 L", precio: "$3,199", max: 40 },
    { p: "41 a 50", kg: "10 kg", g: "2½ L", s: "2½ L", precio: "$3,949", max: 50 }
  ];
  var S = { plato: [], evento: "", otro: "", invitados: 0, fecha: "", lugar: "", colonia: "", nombre: "", propuesta: false, veg: false, paq: -1 };
  try { var raw = JSON.parse(sessionStorage.getItem(KEY) || "{}"); if (raw && typeof raw === "object") { for (var k in S) if (k in raw && typeof raw[k] === typeof S[k]) S[k] = raw[k]; if (!Array.isArray(S.plato)) S.plato = []; } } catch (e) {}
  /* una fecha pasada guardada no sirve */
  if (S.fecha && dias(S.fecha) < 0) S.fecha = "";
  var listeners = [];
  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function set(patch, silent) { for (var k in patch) S[k] = patch[k]; save(); if (!silent) listeners.forEach(function (f) { f(S, patch); }); }
  function on(f) { listeners.push(f); }
  function lista(arr) { return arr.length < 2 ? arr.join("") : arr.slice(0, -1).join(", ") + " y " + arr[arr.length - 1]; }
  function platosTxt() { return lista(PLATOS.filter(function (p) { return S.plato.indexOf(p.id) > -1; }).map(function (p) { return p.nombre; })); }
  function lugarTxt() {
    var l = S.lugar ? S.lugar.toLowerCase() : "";
    var c = (S.colonia || "").trim();
    if (l && c) return l + ", " + c;
    return l || c;
  }
  function msgBuffet() {
    var base = "Hola Food Party, quiero cotizar un buffet";
    var out = [];
    var ev = S.evento === "Otro" ? ((S.otro || "").trim() ? "otro (" + S.otro.trim() + ")" : "otro") : S.evento;
    if (ev) out.push("Evento: " + ev + ".");
    if (S.fecha) out.push("Fecha: " + fechaLarga(S.fecha) + ".");
    if (S.invitados) out.push("Invitados: " + (S.invitados >= 300 ? "300 o más" : S.invitados) + ".");
    var lg = lugarTxt(); if (lg) out.push("Lugar: " + lg + ".");
    if (S.plato.length) out.push("En el plato me gustaría: " + platosTxt() + ".");
    if (S.veg) out.push("Hay invitados vegetarianos.");
    if (S.propuesta) out.push("Menú: que ustedes me lo propongan.");
    if ((S.nombre || "").trim()) out.push("Mi nombre: " + S.nombre.trim() + ".");
    if (!out.length) return base + " para mi evento.";
    return base + ". " + out.join(" ");
  }
  function msgDiscada() {
    var m;
    if (S.paq > -1 && PAQ[S.paq]) {
      var q = PAQ[S.paq];
      m = "Hola Food Party, quiero una discada para " + q.p + " personas (" + q.kg + ", con guacamole, salsa roja y tortillas, " + q.precio + "). ¿Siguen los precios de septiembre?";
    } else m = "Hola Food Party, quiero pedir una discada mexicana. ¿Qué paquetes tienen hoy?";
    if (S.fecha) m += " Fecha: " + fechaLarga(S.fecha) + ".";
    return m;
  }
  function resumen() {
    var a = [];
    if (S.plato.length) a.push("Tu plato: " + platosTxt());
    var ev = S.evento === "Otro" ? ((S.otro || "").trim() || "Otro evento") : S.evento; if (ev) a.push(ev);
    if (S.invitados) a.push((S.invitados >= 300 ? "300 o más" : S.invitados) + " invitados");
    if (S.fecha) a.push(fechaCorta(S.fecha));
    if (S.propuesta && !S.plato.length) a.push("Menú a propuesta de Food Party");
    return a.join(" · ");
  }
  window.FP = { WA: WA, S: S, set: set, on: on, PLATOS: PLATOS, PAQ: PAQ, waUrl: waUrl, hoyISO: hoyISO, dias: dias, fechaLarga: fechaLarga, fechaCorta: fechaCorta, msgBuffet: msgBuffet, msgDiscada: msgDiscada, resumen: resumen, platosTxt: platosTxt, lista: lista, reduce: reduce, parts: parts, dow: dow, DIA3: DIA3, MES3: MES3 };

  /* ---------- Header: se compacta y guarda la fecha ---------- */
  function initHeader() {
    var header = document.getElementById("fp-header");
    if (!header) return;
    var ticking = false;
    function upd() { ticking = false; header.classList.toggle("is-compact", (window.scrollY || 0) > 40); }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
    var btn = document.getElementById("fp-fecha"), inp = document.getElementById("fp-fecha-in"), tx = document.getElementById("fp-fecha-t");
    if (!btn || !inp || !tx) return;
    inp.min = hoyISO(); inp.tabIndex = 0; inp.removeAttribute("aria-hidden");
    inp.style.position = "absolute"; 
    var last = null;
    function textos() {
      if (!S.fecha) return ["¿QUÉ DÍA ES TU EVENTO?", "TU FECHA"];
      var n = dias(S.fecha), p = parts(S.fecha);
      var largo = DIA3[dow(S.fecha)] + " " + p.d + " " + MES3[p.m - 1];
      if (n <= 0) return ["ES HOY", "ES HOY"];
      if (n < 15) return ["FALTAN " + n + (n === 1 ? " DÍA" : " DÍAS") + " · ESCRÍBENOS HOY", n + (n === 1 ? " DÍA" : " DÍAS") + " · ESCRÍBENOS"];
      return [largo + " · FALTAN " + n + " DÍAS", p.d + " " + MES3[p.m - 1] + " · " + n + " DÍAS"];
    }
    function paint(first) {
      var t = textos(), key = t.join("|");
      if (key === last) return;
      last = key;
      function put() { tx.innerHTML = '<span class="fp-l"></span><span class="fp-s"></span>'; tx.firstChild.textContent = t[0]; tx.lastChild.textContent = t[1]; btn.setAttribute("aria-label", S.fecha ? "Fecha de tu evento: " + fechaLarga(S.fecha) + ". Cambiar" : "Elegir la fecha de tu evento"); }
      if (first || reduce) { put(); return; }
      tx.classList.add("is-swap");
      setTimeout(function () { put(); tx.classList.remove("is-swap"); }, 100);
    }
    inp.value = S.fecha || "";
    paint(true);
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      try { if (inp.showPicker) { inp.showPicker(); return; } } catch (er) {}
      /* respaldo: llevar al componente */
      var pl = document.getElementById("plato"); if (pl) go(pl);
    });
    inp.addEventListener("change", function () { set({ fecha: inp.value || "" }); });
    on(function (s, patch) { if ("fecha" in patch) { inp.value = s.fecha || ""; paint(false); } });
    /* si cambia el día (medianoche) se repinta */
    setInterval(function () { last = null; paint(false); }, 600000);
  }

  /* ---------- Menú ---------- */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".fp-menu-btn"), menu = document.getElementById("fp-menu");
    if (!btn || !menu) return;
    var body = document.body, links = menu.querySelectorAll("a"), lbl = btn.querySelector(".fp-menu-lbl");
    var pushed = false;
    function set_(open, fromPop) {
      var was = body.classList.contains("fp-menu-open");
      if (open === was) return;
      body.classList.toggle("fp-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "CERRAR" : "MENÚ";
      if (open) { try { history.pushState({ fpMenu: 1 }, ""); pushed = true; } catch (e) {} setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80); }
      else { if (pushed && !fromPop) { pushed = false; try { history.back(); } catch (e) {} } pushed = false; btn.focus({ preventScroll: true }); }
    }
    closeMenu = function () { set_(false); };
    btn.addEventListener("click", function () { set_(!body.classList.contains("fp-menu-open")); });
    menu.addEventListener("click", function (e) { var a = e.target.closest ? e.target.closest("a") : null; if (a) { if (a.getAttribute("href").charAt(0) === "#") return; set_(false); } else set_(false); });
    window.addEventListener("popstate", function () { if (body.classList.contains("fp-menu-open")) set_(false, true); });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("fp-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set_(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(Array.prototype.slice.call(links)), i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* ---------- Sondeo de visibilidad (sin IntersectionObserver) ---------- */
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
      if (pending.length) sch();
    }
    function sch() { if (!raf) raf = requestAnimationFrame(tick); }
    sch();
    window.addEventListener("scroll", sch, { passive: true });
    window.addEventListener("resize", sch);
  }
  window.FP.watchVisible = watchVisible;

  function initReveal() {
    var els = document.querySelectorAll('[data-reveal]:not([data-reveal="b"])');
    function show(el) { el.classList.add("is-in"); }
    Array.prototype.forEach.call(document.querySelectorAll('[data-reveal="t"]'), function (h) {
      Array.prototype.forEach.call(h.querySelectorAll(".fp-ln"), function (ln, i) { ln.style.setProperty("--i", i); });
    });
    if (reduce) { Array.prototype.forEach.call(els, show); return; }
    watchVisible(els, 0.9, show);
  }

  /* ---------- WhatsApp flotante: se esconde donde ya hay un verde a la vista ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]");
    if (!zones.length) return;
    var raf = null;
    function upd() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight, on = false;
      for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh - 20 && r.bottom > 20) { on = true; break; } }
      document.body.classList.toggle("fp-wa-off", on);
    }
    function sch() { if (!raf) raf = requestAnimationFrame(upd); }
    sch(); window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch);
  }

  /* ---------- Anclas suaves (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var bar = document.querySelector(".fp-bar");
    var top = el.getBoundingClientRect().top + window.scrollY - (bar ? bar.offsetHeight + 14 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.FP.go = go;
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented || a.id === "fp-fecha") return;
      var href = a.getAttribute("href");
      if (href.length < 2) return;
      var el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      closeMenu();
      setTimeout(function () { go(el); if (history.replaceState) history.replaceState(null, "", href); }, document.body.classList.contains("fp-menu-open") ? 30 : 0);
    });
  }

  /* ---------- Links genéricos de WhatsApp (flotante, menú, pie): llevan lo que ya eligió ---------- */
  function initWaGeneric() {
    var els = document.querySelectorAll("[data-wa-generic]");
    function upd() { Array.prototype.forEach.call(els, function (a) { a.href = waUrl(msgBuffet()); }); }
    upd(); on(upd);
  }

  function init() { initHeader(); initMenu(); initReveal(); initWaHide(); initAnchors(); initWaGeneric(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
