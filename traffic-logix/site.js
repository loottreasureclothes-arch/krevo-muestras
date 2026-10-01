/* GTLO · Grupo Traffic Logix: header El pórtico, menú, anclas, WhatsApp, La señal de tu ruta, El convoy. */
(function () {
  "use strict";
  var WA = "524494683835";
  var d = document, root = d.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  function $(s, c) { return (c || d).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }

  /* ---------- enlaces data-wa (nacen con href real; aquí solo se confirman) ---------- */
  $$("[data-wa]").forEach(function (a) { a.href = waUrl(a.getAttribute("data-wa")); a.target = "_blank"; a.rel = "noopener"; });

  /* ---------- Anclas suaves ---------- */
  function go(el) {
    var hh = (parseInt(getComputedStyle(root).getPropertyValue("--hh"), 10) || 60);
    var top = el.getBoundingClientRect().top + window.pageYOffset - (hh + 10);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  d.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a) return;
    var id = a.getAttribute("href").slice(1);
    if (!id) return;
    var t = d.getElementById(id);
    if (!t) return;
    e.preventDefault();
    if (d.body.classList.contains("mn-open")) setMenu(false);
    go(t);
    try { history.replaceState(null, "", "#" + id); } catch (x) {}
  });

  /* ---------- Menú ---------- */
  var burger = $("#hd-burger"), menu = $("#mn");
  function setMenu(open) {
    d.body.classList.toggle("mn-open", open);
    if (burger) { burger.setAttribute("aria-expanded", open ? "true" : "false"); burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú"); }
    if (menu) menu.setAttribute("aria-hidden", open ? "false" : "true");
  }
  if (menu) $$(".mn-nav a", menu).forEach(function (a, i) { a.style.setProperty("--i", i); });
  if (burger) burger.addEventListener("click", function () { setMenu(!d.body.classList.contains("mn-open")); });
  if (menu) menu.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("a")) setMenu(false); });
  d.addEventListener("keydown", function (e) { if (e.key === "Escape" && d.body.classList.contains("mn-open")) { setMenu(false); if (burger) burger.focus(); } });

  /* ---------- El pórtico: guiones que avanzan + odómetro + compacto ---------- */
  var hd = $("#hd"), odo = $("#hd-odo"), tick = false, lastKm = -1;
  function onScroll() {
    tick = false;
    var y = window.pageYOffset || 0;
    if (hd) {
      hd.classList.toggle("is-compact", y > 12);
      hd.style.setProperty("--lane", (y * 0.6).toFixed(1));
    }
    var max = (root.scrollHeight || d.body.scrollHeight) - window.innerHeight;
    var pct = max > 0 ? Math.min(100, Math.max(0, Math.round((y / max) * 100))) : 0;
    if (odo && pct !== lastKm) { lastKm = pct; odo.textContent = "KM " + ("00" + pct).slice(-3); }
  }
  window.addEventListener("scroll", function () { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
  /* los KM del menú son la posición real de cada sección en la página */
  function kmMenu() {
    var max = (root.scrollHeight || d.body.scrollHeight) - window.innerHeight;
    if (max <= 0) return;
    $$(".mn-nav a[href^='#']").forEach(function (a) {
      var t = d.getElementById(a.getAttribute("href").slice(1)), s = a.querySelector("small");
      if (!t || !s) return;
      var y = t.getBoundingClientRect().top + window.pageYOffset - 70;
      s.textContent = "KM " + Math.max(0, Math.min(100, Math.round(y / max * 100)));
    });
  }
  window.addEventListener("load", kmMenu); window.addEventListener("resize", kmMenu); setTimeout(kmMenu, 1500);

  /* ---------- WhatsApp flotante: se esconde cuando hay un botón verde a la vista ---------- */
  var hiders = $$("[data-hide-wa]");
  function chkWa() {
    var vh = window.innerHeight, on = false;
    hiders.forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < vh - 20 && r.bottom > 20) on = true; });
    d.body.classList.toggle("wa-off", on);
  }
  if (hiders.length) { window.addEventListener("scroll", chkWa, { passive: true }); window.addEventListener("resize", chkWa); chkWa(); }

  /* ---------- Servicios en celular: carrusel de señales, contador 01 / 04 y guiones de carril ---------- */
  var svg = $("#sv-grid"), svn = $(".js-svn"), svd = $$(".sv-dash i"), svLast = 0, svPend = false;
  function svPaint() {
    svPend = false;
    if (!svg) return;
    var cards = $$(".sv-card", svg), x0 = svg.getBoundingClientRect().left + (parseFloat(getComputedStyle(svg).paddingLeft) || 0), best = 0, bd = 1e9;
    cards.forEach(function (c, i) { var dx = Math.abs(c.getBoundingClientRect().left - x0); if (dx < bd) { bd = dx; best = i; } });
    if (svg.scrollLeft + svg.clientWidth >= svg.scrollWidth - 4) best = cards.length - 1;
    if (best === svLast && svn && svn.textContent) return;
    svLast = best;
    if (svn) svn.textContent = ("0" + (best + 1)).slice(-2);
    svd.forEach(function (el, i) { el.classList.toggle("is-on", i === best); });
  }
  if (svg) { svg.addEventListener("scroll", function () { if (!svPend) { svPend = true; requestAnimationFrame(svPaint); } }, { passive: true }); window.addEventListener("resize", svPaint); svPaint(); }

  /* ====================================================================
     LA SEÑAL DE TU RUTA
     ==================================================================== */
  var KEY = "gtlo_ruta";
  var SERV = {
    personal: { sign: "PERSONAL EMPRESARIAL", head: "transporte de personal" },
    aeropuerto: { sign: "AEROPUERTO", head: "traslado al aeropuerto" },
    turismo: { sign: "TURISMO", head: "transporte de turismo" },
    ejecutivo: { sign: "EJECUTIVO", head: "transporte ejecutivo" }
  };
  var DIAS_L = ["L", "M", "M", "J", "V", "S", "D"];
  var DIAS_N = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
  var TURNOS = { m: "matutino", v: "vespertino", n: "nocturno" };
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var MES3 = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

  var S = { servicio: "", pax: 0, dias: [], turnos: [], fecha: "", hora: "", origen: "", destino: "", empresa: "", nombre: "" };
  try { var saved = JSON.parse(localStorage.getItem(KEY) || "null"); if (saved && typeof saved === "object") { for (var k in S) if (saved[k] !== undefined) S[k] = saved[k]; } } catch (e) {}
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

  function sortedDias() { return S.dias.map(Number).filter(function (n) { return n >= 0 && n < 7; }).sort(function (a, b) { return a - b; }); }
  function isRun(ds) { if (ds.length < 3) return false; for (var i = 1; i < ds.length; i++) if (ds[i] !== ds[i - 1] + 1) return false; return true; }
  function diasSign() {
    var ds = sortedDias(); if (!ds.length) return "";
    if (ds.length === 7) return "TODOS LOS DÍAS";
    if (isRun(ds)) return DIAS_L[ds[0]] + " A " + DIAS_L[ds[ds.length - 1]];
    return ds.map(function (n) { return DIAS_L[n]; }).join(" ");
  }
  function diasMsg() {
    var ds = sortedDias(); if (!ds.length) return "";
    if (ds.length === 7) return "todos los días";
    if (isRun(ds)) return "de " + DIAS_N[ds[0]] + " a " + DIAS_N[ds[ds.length - 1]];
    return "los " + list(ds.map(function (n) { return DIAS_N[n]; }));
  }
  function list(a) { return a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " y " + a[a.length - 1]; }
  function turnosOrd() { return ["m", "v", "n"].filter(function (t) { return S.turnos.indexOf(t) > -1; }); }
  function turnosSign() { var t = turnosOrd(); if (!t.length) return ""; return t.length === 1 ? TURNOS[t[0]].toUpperCase() : t.length + " TURNOS"; }
  function turnosMsg() { var t = turnosOrd(); if (!t.length) return ""; return (t.length === 1 ? "turno " : "turnos ") + list(t.map(function (x) { return TURNOS[x]; })); }
  function parseF(iso) { var p = (iso || "").split("-"); if (p.length !== 3) return null; return { d: parseInt(p[2], 10), m: parseInt(p[1], 10) - 1 }; }
  function fechaSign() { var f = parseF(S.fecha); return f && MES3[f.m] ? f.d + " " + MES3[f.m] : ""; }
  function fechaMsg() { var f = parseF(S.fecha); return f && MESES[f.m] ? f.d + " de " + MESES[f.m] : ""; }
  function clean(s) { return (s || "").replace(/\s+/g, " ").trim(); }

  /* renglones fantasma: lo que falta se ve al 25 % y se vuelve sólido (con su "clac") al elegirlo */
  var GHOST = {
    "": { serv: "PERSONAL EMPRESARIAL", pax: "45 PASAJEROS", when: "L A V · 3 TURNOS", route: "" },
    personal: { pax: "45 PASAJEROS", when: "L A V · 3 TURNOS", route: "" },
    otro: { pax: "6 PASAJEROS", when: "12 OCT · 05:30", route: "AGS → GDL" }
  };
  function signRows() {
    var r = { serv: S.servicio ? SERV[S.servicio].sign : "", pax: "", when: "", route: "" };
    if (!S.servicio) return r;
    if (S.pax > 0) r.pax = S.pax + (S.pax === 1 ? " PASAJERO" : " PASAJEROS");
    if (S.servicio === "personal") {
      r.when = [diasSign(), turnosSign()].filter(Boolean).join(" · ");
    } else {
      r.when = [fechaSign(), S.hora].filter(Boolean).join(" · ");
      var o = clean(S.origen).toUpperCase(), de = clean(S.destino).toUpperCase();
      r.route = o && de ? o + " → " + de : o ? o + " →" : de ? "→ " + de : "";
    }
    return r;
  }

  function message() {
    if (!S.servicio) return "Hola GTLO, quiero cotizar transporte.";
    var m = "Hola GTLO, quiero cotizar " + SERV[S.servicio].head;
    if (S.pax > 0) m += " para " + S.pax + (S.pax === 1 ? " pasajero" : " pasajeros");
    if (S.servicio === "personal") {
      var dm = diasMsg(), tm = turnosMsg();
      if (dm) m += ", " + dm;
      if (tm) m += ", " + tm;
    } else {
      var fm = fechaMsg();
      if (fm) m += ", el " + fm;
      if (S.hora) m += (fm ? " " : ", ") + "a las " + S.hora;
      var o = clean(S.origen), de = clean(S.destino);
      if (o && de) m += ", de " + o + " a " + de;
      else if (o) m += ", desde " + o;
      else if (de) m += ", con destino a " + de;
    }
    m += ".";
    if (clean(S.empresa)) m += " Empresa: " + clean(S.empresa) + ".";
    if (clean(S.nombre)) m += " Mi nombre: " + clean(S.nombre) + ".";
    return m.trim();
  }
  function url() { return waUrl(message()); }

  var lastRows = {};
  function setRow(el, txt, key, ghost) {
    if (!el) return;
    var show = txt || ghost || "", isG = !txt && !!ghost, was = el.classList.contains("is-ghost");
    if (show) {
      el.hidden = false;
      el.classList.toggle("is-ghost", isG);
      if (isG) el.setAttribute("aria-hidden", "true"); else el.removeAttribute("aria-hidden");
      if (el.textContent !== show || (was && !isG)) { el.textContent = show; if (!reduce && !isG) { el.classList.remove("clac"); void el.offsetWidth; el.classList.add("clac"); } }
    } else { el.hidden = true; el.textContent = ""; el.classList.remove("is-ghost"); }
    lastRows[key] = txt;
  }
  var FOTO = {
    "": ["fila", "SUS UNIDADES EN FILA, CON GPS 24 H"],
    personal: ["personal", "FILA DE HIACE Y URVAN"],
    aeropuerto: ["aeropuerto", "SPRINTER LISTA PARA ABORDAR"],
    turismo: ["turismo", "URVAN EN CARRETERA"],
    ejecutivo: ["fila", "UNIDADES MONITOREADAS POR GPS 24 H"]
  };
  function paintSign(box, r, k, g) {
    g = g || {};
    var sv = $(".js-serv", box), txt = r.serv || g.serv || "", isG = !r.serv;
    if (sv) {
      var row = sv.parentNode, was = row.classList.contains("is-ghost");
      row.classList.toggle("is-ghost", isG);
      if (isG) row.setAttribute("aria-hidden", "true"); else row.removeAttribute("aria-hidden");
      if (sv.textContent !== txt || (was && !isG)) { sv.textContent = txt; if (!reduce && !isG) { row.classList.remove("clac"); void row.offsetWidth; row.classList.add("clac"); } }
    }
    setRow($(".js-pax", box), r.pax, "pax" + k, g.pax);
    setRow($(".js-when", box), r.when, "when" + k, g.when);
    setRow($(".js-route", box), r.route, "route" + k, g.route);
  }
  function renderSign() {
    var r = signRows(), has = !!S.servicio;
    var g = !has ? GHOST[""] : S.servicio === "personal" ? GHOST.personal : GHOST.otro;
    var main = $("#senal .pt"); if (main) { main.classList.toggle("is-empty", !has); paintSign(main, r, 0, g); }
    /* cierre: sin elección no se repite la señal (ya se vio arriba); con elección, la señal rotulada va arriba de la banda de la 126 */
    var crBox = $(".js-cr-ruta"), cr = $(".pt--cr");
    if (crBox) crBox.hidden = !has;
    if (cr && has) paintSign(cr, r, 1);
    var t = $(".js-cr-t"), want = has ? "on" : "off";
    if (t && t.getAttribute("data-st") !== want) {
      t.setAttribute("data-st", want);
      t.innerHTML = has ? '¿Nos <span class="y">vamos?</span>' : '¿A dónde <span class="y">vamos?</span>';
    }
    var ph = $(".js-ptph"), cap = $(".js-ptcap"), fo = FOTO[S.servicio] || FOTO[""];
    if (ph && ph.getAttribute("data-k") !== fo[0]) {
      ph.setAttribute("data-k", fo[0]);
      ph.src = "img/" + fo[0] + "-480.webp";
      var big = fo[0] === "turismo" ? "900" : "960";
      ph.srcset = "img/" + fo[0] + "-480.webp 480w, img/" + fo[0] + "-" + big + ".webp " + big + "w";
    }
    if (cap && cap.textContent !== fo[1]) cap.textContent = fo[1];
    var href = url();
    $$(".js-waruta").forEach(function (a) { a.href = href; });
  }

  /* --- formulario --- */
  var form = $("#ruta");
  function showFields() {
    var p = $("#f-personal"), o = $("#f-otro");
    if (!p || !o) return;
    var personal = S.servicio === "personal";
    p.hidden = !(personal || !S.servicio);
    o.hidden = personal || !S.servicio;
  }
  function syncForm() {
    if (!form) return;
    $$('input[name="servicio"]', form).forEach(function (i) { i.checked = i.value === S.servicio; });
    var px = $("#pax"); if (px) px.value = S.pax > 0 ? S.pax : "";
    $$('input[name="dia"]', form).forEach(function (i) { i.checked = S.dias.map(String).indexOf(i.value) > -1; });
    $$('input[name="turno"]', form).forEach(function (i) { i.checked = S.turnos.indexOf(i.value) > -1; });
    ["fecha", "hora", "origen", "destino", "empresa", "nombre"].forEach(function (id) { var el = $("#" + id); if (el && el.value !== (S[id] || "")) el.value = S[id] || ""; });
    showFields();
  }
  function readForm() {
    if (!form) return;
    var sv = $('input[name="servicio"]:checked', form); S.servicio = sv ? sv.value : S.servicio;
    var px = parseInt($("#pax").value, 10); S.pax = isNaN(px) ? 0 : Math.max(0, Math.min(200, px));
    S.dias = $$('input[name="dia"]:checked', form).map(function (i) { return i.value; });
    S.turnos = $$('input[name="turno"]:checked', form).map(function (i) { return i.value; });
    ["fecha", "hora", "origen", "destino", "empresa", "nombre"].forEach(function (id) { var el = $("#" + id); if (el) S[id] = el.value; });
  }
  function update() { readForm(); showFields(); persist(); renderSign(); }
  function setState(patch) { for (var k in patch) S[k] = patch[k]; syncForm(); persist(); renderSign(); }
  var sn = $("#senal");
  /* alto real de la señal pegada (celular): el contenedor la suelta un alto de señal antes de que acabe el formulario */
  var ptw = $(".pt-wrap");
  function sth() { if (sn && ptw) sn.style.setProperty("--sth", ptw.offsetHeight + "px"); }
  if (ptw && window.ResizeObserver) new ResizeObserver(sth).observe(ptw); else sth();
  function typing(on) { if (sn) sn.classList.toggle("is-typing", on); }
  if (form) {
    form.addEventListener("focusin", function (e) { var t = e.target; typing(t.tagName === "INPUT" && /^(text|number|date|time)$/.test(t.type)); });
    form.addEventListener("focusout", function () { setTimeout(function () { var a = d.activeElement; if (!a || !form.contains(a) || a.type === "radio" || a.type === "checkbox") typing(false); }, 60); });
    form.addEventListener("input", update);
    form.addEventListener("change", update);
    form.addEventListener("submit", function (e) { e.preventDefault(); });
    var px = $("#pax");
    $("#pax-m").addEventListener("click", function () { S.pax = Math.max(0, (S.pax || 0) - 1); px.value = S.pax > 0 ? S.pax : ""; update(); });
    $("#pax-p").addEventListener("click", function () { S.pax = Math.min(200, (S.pax || 0) + 1); px.value = S.pax; update(); });
  }
  $$("[data-servicio]").forEach(function (a) { a.addEventListener("click", function () { setState({ servicio: a.getAttribute("data-servicio") }); }); });

  /* el href se reescribe al tocar (nunca preventDefault ni window.open) */
  ["pointerdown", "touchstart", "click", "focus", "keydown"].forEach(function (ev) {
    d.addEventListener(ev, function (e) { var a = e.target.closest ? e.target.closest(".js-waruta") : null; if (a) a.href = url(); }, true);
  });

  syncForm(); renderSign();
  window.GTLO = { state: function () { return JSON.parse(JSON.stringify(S)); }, set: setState, message: message, url: url };

  /* ====================================================================
     EL CONVOY: placas-foto grandes de sus unidades (126, 123, 121, 114, 152) entran rodando ligadas al scroll
     (rAF, reversible, sin pin). Si la fila no cabe (celular y compu normal), la fila entera cruza de derecha a
     izquierda y frena con la última unidad alineada; mientras rueda, las placas vienen separadas y se cierran en
     formación al frenar, y el carril de abajo corre con ellas. Si cabe (pantallas muy anchas), cada placa llega
     por la derecha y frena en su lugar.
     ==================================================================== */
  var cv = $("#cv"), cvIn = cv ? $(".cv-in", cv) : null, cvLane = cv ? $(".cv-lane", cv) : null;
  if (cv && cvIn && !reduce) {
    var us = $$(".cv-u", cv), mode = "fit", rowX0 = 0, rowX1 = 0, offs = [], spread = 0, cvPend = false;
    function cvMeasure() {
      cvIn.style.transform = "none"; us.forEach(function (u) { u.style.transform = "none"; });
      var cw = cv.clientWidth, last = us[us.length - 1].getBoundingClientRect(), r0 = cvIn.getBoundingClientRect();
      var rw = (last.right - r0.left) + (parseFloat(getComputedStyle(cvIn).paddingRight) || 0);
      var uw = us[0].getBoundingClientRect().width;
      if (rw > cw + 2) {
        mode = "travel"; rowX0 = cw * (cw >= 900 ? 0.62 : 0.5); rowX1 = cw - rw; spread = uw * 0.26;
      } else {
        mode = "fit";
        var lefts = us.map(function (u) { return u.getBoundingClientRect().left - cv.getBoundingClientRect().left; });
        var pitch = us.length > 1 ? lefts[1] - lefts[0] : 200;
        offs = lefts.map(function (l, i) { return (cw - l) + 40 + i * pitch * 1.3; });
      }
    }
    function cvPaint() {
      cvPend = false;
      var vh = window.innerHeight, rc = cv.getBoundingClientRect();
      var endAt = mode === "travel" ? 0.12 : 0.34;
      var p = Math.max(0, Math.min(1, (vh * 0.98 - rc.top) / (vh * 0.98 - vh * endAt)));
      var e = 1 - Math.pow(1 - p, 2.2), x = 0;
      if (mode === "travel") {
        x = p >= 1 ? rowX1 : rowX0 + (rowX1 - rowX0) * e;
        cvIn.style.transform = "translate3d(" + x.toFixed(1) + "px,0,0)";
        us.forEach(function (u, i) { u.style.transform = p >= 1 ? "none" : "translate3d(" + ((1 - e) * i * spread).toFixed(1) + "px,0,0)"; });
      } else {
        us.forEach(function (u, i) { u.style.transform = e >= 0.999 ? "none" : "translate3d(" + ((1 - e) * offs[i]).toFixed(1) + "px,0,0)"; });
        x = -(1 - e) * 600;
      }
      if (cvLane) cvLane.style.setProperty("--lx", (x * 0.5).toFixed(1));
    }
    function cvReq() { if (!cvPend) { cvPend = true; requestAnimationFrame(cvPaint); } }
    cvMeasure(); cvPaint();
    window.addEventListener("scroll", cvReq, { passive: true });
    window.addEventListener("resize", function () { cvMeasure(); cvReq(); });
    window.addEventListener("load", function () { cvMeasure(); cvReq(); });
  }
})();
