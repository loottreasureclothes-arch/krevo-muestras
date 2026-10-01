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

  function signRows() {
    var r = { serv: S.servicio ? SERV[S.servicio].sign : "ELIGE SERVICIO", pax: "", when: "", route: "" };
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
  function setRow(el, txt, key) {
    if (!el) return;
    var had = lastRows[key];
    if (txt) { el.hidden = false; if (el.textContent !== txt) { el.textContent = txt; if (!reduce) { el.classList.remove("clac"); void el.offsetWidth; el.classList.add("clac"); } } }
    else { el.hidden = true; el.textContent = ""; }
    lastRows[key] = txt;
  }
  var EJ = { serv: "PERSONAL EMPRESARIAL", pax: "45 PASAJEROS", when: "L A V", route: "" };
  var FOTO = {
    "": ["flotilla", "SUS UNIDADES, CON GPS 24 H"],
    personal: ["personal", "FILA DE HIACE Y URVAN"],
    aeropuerto: ["aeropuerto", "SPRINTER LISTA PARA ABORDAR"],
    turismo: ["turismo", "URVAN EN CARRETERA"],
    ejecutivo: ["ejecutivo", "FOTO DE SU UNIDAD EJECUTIVA: PENDIENTE"]
  };
  function paintSign(box, r, k) {
    var sv = $(".js-serv", box);
    if (sv && sv.textContent !== r.serv) { sv.textContent = r.serv; if (!reduce) { var row = sv.parentNode; row.classList.remove("clac"); void row.offsetWidth; row.classList.add("clac"); } }
    setRow($(".js-pax", box), r.pax, "pax" + k);
    setRow($(".js-when", box), r.when, "when" + k);
    setRow($(".js-route", box), r.route, "route" + k);
  }
  function renderSign() {
    var r = signRows(), has = !!S.servicio;
    var main = $("#senal .pt"); if (main) paintSign(main, r, 0);
    var cr = $(".pt--cr");
    if (cr) { cr.classList.toggle("is-ej", !has); paintSign(cr, has ? r : EJ, 1); }
    var t = $(".js-cr-t"), empty = $(".js-empty"), want = has ? "on" : "off";
    if (t && t.getAttribute("data-st") !== want) {
      t.setAttribute("data-st", want);
      t.innerHTML = has ? 'Tu ruta <span class="y">ya está rotulada.</span>' : 'Falta rotular <span class="y">tu ruta.</span>';
    }
    if (empty) empty.hidden = has;
    var ph = $(".js-ptph"), cap = $(".js-ptcap"), fo = FOTO[S.servicio] || FOTO[""];
    if (ph && ph.getAttribute("data-k") !== fo[0]) {
      ph.setAttribute("data-k", fo[0]);
      ph.src = "img/" + fo[0] + "-480.webp";
      var big = fo[0] === "turismo" ? "900" : "960";
      ph.srcset = "img/" + fo[0] + "-480.webp 480w, img/" + fo[0] + "-" + big + ".webp " + big + "w";
      if (cap) cap.textContent = fo[1];
    }
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
     EL CONVOY: las unidades entran rodando en fila, ligadas al scroll (rAF, reversible, sin pin).
     Todas avanzan en el mismo sentido; la de atrás siempre trae más distancia que la de adelante,
     así los huecos solo se cierran al frenar y nunca se atraviesan ni se enciman los rótulos.
     ==================================================================== */
  var cv = $("#cv");
  if (cv) {
    var vans = $$(".cv-van", cv).map(function (el) {
      return { el: el, wh: $$(".wh", el), cap: $("figcaption", el), off: 0, r: 14 };
    });
    var n = vans.length, pending = false;
    function measure() {
      var maxR = 0;
      vans.forEach(function (v) { v.el.style.transform = "none"; var r = v.el.getBoundingClientRect(); if (r.right > maxR) maxR = r.right; });
      var gap = cv.getBoundingClientRect().width * 0.22;
      vans.forEach(function (v, i) {
        v.off = maxR + 40 + (n - 1 - i) * gap;
        var svg = $("svg", v.el), sc = svg.getBoundingClientRect().width / svg.viewBox.baseVal.width;
        v.r = 14 * (sc || 1);
      });
    }
    function ease(t) { return 1 - Math.pow(1 - t, 3); }
    function paint() {
      pending = false;
      var vh = window.innerHeight, rc = cv.getBoundingClientRect();
      var p = (vh * 0.98 - rc.top) / (vh * 0.98 - vh * 0.34);
      p = reduce ? 1 : Math.max(0, Math.min(1, p));
      var e = ease(p);
      vans.forEach(function (v) {
        var x = -(1 - e) * v.off;
        v.el.style.transform = e >= 0.999 ? "none" : "translate3d(" + x.toFixed(1) + "px,0,0)";
        var ang = (e * v.off / v.r) * 57.2958;
        v.wh.forEach(function (w) { w.style.transform = "rotate(" + ang.toFixed(1) + "deg)"; });
        if (v.cap) v.cap.style.opacity = e > 0.97 ? "1" : "0";
      });
    }
    function req() { if (!pending) { pending = true; requestAnimationFrame(paint); } }
    if (!reduce) { measure(); window.addEventListener("scroll", req, { passive: true }); window.addEventListener("resize", function () { measure(); req(); }); }
    paint();
    window.addEventListener("load", function () { if (!reduce) measure(); req(); });
  }
})();
