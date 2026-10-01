/* Que Conchas! · fundación de interacción: estado del pedido (QC), menú, WhatsApp, anclas, mes real. */
(function () {
  "use strict";
  var WA = "524492063798";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Calendario: el especial de cada mes (SOLO lo que ellos publicaron) ---------- */
  var MES = [
    { a: "ENE", n: "Enero", e: { n: "Rosca de reyes rellena", band: "Rosca de reyes rellena", frase: "Diseñada para quienes aman la parte nevada de la rosca", extra: "También: rosca rellena Nevada.", foto: "ene", alt: "Rosca de reyes rellena con azúcar glass", pedir: "rosca de reyes rellena" } },
    { a: "FEB", n: "Febrero", e: { n: "Roles de canela con 3 leches y conchas de corazón", band: "Rol de canela con 3 leches", frase: "Vive la experiencia con su delicioso 3 leches", extra: "Por la Candelaria, también concha rellena de tamal.", foto: "feb", alt: "Rol de canela con crema, fresa y salsa 3 leches", pedir: "roles de canela con 3 leches" } },
    { a: "MAR", n: "Marzo", e: null },
    { a: "ABR", n: "Abril", e: { n: "Kit para decorar conchitas", band: "Kit para decorar conchitas", frase: "incluye todo lo necesario para que los peques dejen volar su creatividad… ¡y después se lo coman!", extra: "", foto: "abr", alt: "Concha para decorar con duyas y grageas", pedir: "kit para decorar conchitas" } },
    { a: "MAY", n: "Mayo", e: { n: "Desayunos sorpresa de Día de las Madres", band: "Desayuno de Día de las Madres", frase: "Pedidos abiertos para este 10 de mayo / Cupo limitado", extra: "", foto: "may", alt: "Charola de desayuno sorpresa con globo y flores de papel", pedir: "desayuno sorpresa de Día de las Madres" } },
    { a: "JUN", n: "Junio", e: { n: "Desayunos sorpresa de Día del Padre", band: "Desayuno de Día del Padre", frase: "Regálale ese momento donde abra la puerta, ve la sorpresa y entienda que alguien pensó en él.", extra: "", foto: "jun", alt: "Globo con confeti y moño rosa de un desayuno sorpresa", pedir: "desayuno sorpresa de Día del Padre" } },
    { a: "JUL", n: "Julio", e: null },
    { a: "AGO", n: "Agosto", e: { n: "Aniversario: 6 años", band: "Cumplimos 6 años", frase: "En Que Conchas cumplimos 6 años", extra: "", foto: "ago", alt: "Concha dorada con chocolate y 6 años escrito con chocolate", pedir: "concha de aniversario" } },
    { a: "SEP", n: "Septiembre", e: { n: "Concha elote", band: "Concha elote", frase: "Septiembre sabe a México! CONCHA ELOTE", extra: "", foto: "sep", alt: "Concha elote sobre un plato de barro", pedir: "concha elote" } },
    { a: "OCT", n: "Octubre", e: { n: "Pan de muerto relleno", band: "Pan de muerto relleno", frase: "Comenzamos con la temporada de pan de muerto relleno", extra: "Relleno Lotus en tamaño mini y regular.", foto: "pan", alt: "Pan de muerto relleno de Lotus con azúcar", pedir: "pan de muerto relleno" } },
    { a: "NOV", n: "Noviembre", e: { n: "Pan de muerto relleno", band: "Pan de muerto relleno", frase: "Comenzamos con la temporada de pan de muerto relleno", extra: "Relleno Lotus en tamaño mini y regular.", foto: "pan", alt: "Pan de muerto relleno de Lotus con azúcar", pedir: "pan de muerto relleno" } },
    { a: "DIC", n: "Diciembre", e: null }
  ];
  var TODO = { n: "Conchas rellenas todo el año", band: "Conchas rellenas todo el año", frase: "Es una locura todos los rellenos que tenemos para ti, atrévete a probarlos todos", extra: "", foto: "todo", alt: "Tres conchas rellenas de fresas con crema, chocolate y Oreo en un canasto", pedir: "conchas rellenas" };
  var RELLENOS = [
    { n: "Arroz con leche", t: "arroz con leche", c: [243, 231, 207] },
    { n: "Fresas con crema", t: "fresas con crema", c: [229, 127, 151] },
    { n: "Oreo", t: "Oreo", c: [84, 66, 62] },
    { n: "Gansito", t: "Gansito", c: [122, 63, 46] },
    { n: "Lotus", t: "Lotus", c: [184, 122, 69] },
    { n: "Tamal", t: "tamal", c: [243, 222, 150] }
  ];
  var MESES_LC = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

  /* ---------- Hora real de Aguascalientes (America/Mexico_City) ---------- */
  function ahora() {
    var d = new Date(), o = { y: d.getFullYear(), m: d.getMonth(), d: d.getDate(), h: d.getHours(), mi: d.getMinutes(), dow: d.getDay() };
    try {
      var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", weekday: "short", hourCycle: "h23" }).formatToParts(d);
      var g = {}; parts.forEach(function (p) { g[p.type] = p.value; });
      var dows = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      o = { y: +g.year, m: +g.month - 1, d: +g.day, h: (+g.hour) % 24, mi: +g.minute, dow: dows[g.weekday] };
    } catch (e) {}
    return o;
  }
  function especial(i) { return MES[i].e || TODO; }
  function mesTexto(iso) {
    if (!iso) return "";
    var p = iso.split("-"); if (p.length !== 3) return iso;
    return parseInt(p[2], 10) + " de " + MESES_LC[parseInt(p[1], 10) - 1];
  }
  function mañanaISO() {
    var n = ahora(), t = new Date(Date.UTC(n.y, n.m, n.d + 1));
    return t.getUTCFullYear() + "-" + ("0" + (t.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + t.getUTCDate()).slice(-2);
  }

  /* ---------- Estado del pedido (compartido por calendario, rellenos y nota) ---------- */
  var KEY = "qc_pedido";
  var state = { que: null, esp: null, rell: [], fecha: "", modo: "", dedic: "", nombre: "" };
  try { var s = JSON.parse(sessionStorage.getItem(KEY) || "null"); if (s && typeof s === "object") for (var k in state) if (k in s) state[k] = s[k]; } catch (e) {}
  if (!Array.isArray(state.rell)) state.rell = [];
  var subs = [];
  function persist() { try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function emit(src) { for (var i = 0; i < subs.length; i++) { try { subs[i](state, src); } catch (e) {} } }
  function set(patch, src) { for (var k in patch) state[k] = patch[k]; persist(); emit(src); }
  function toggleRell(i) {
    var a = state.rell.slice(), j = a.indexOf(i);
    if (j >= 0) a.splice(j, 1); else a.push(i);
    a.sort(function (x, y) { return x - y; });
    set({ rell: a, que: "conchas" }, "rell");
  }
  function lista(arr) { return arr.length < 2 ? arr.join("") : arr.slice(0, -1).join(", ") + " y " + arr[arr.length - 1]; }
  function item() {
    if (state.que === "conchas") return "conchas rellenas" + (state.rell.length ? " de " + lista(state.rell.map(function (i) { return RELLENOS[i].t; })) : "");
    if (state.que === "especial") { var i = state.esp == null ? ahora().m : state.esp; return especial(i).pedir; }
    if (state.que === "desayuno") return "un desayuno sorpresa";
    if (state.que === "ramo") return "un ramo de pan";
    return "";
  }
  function mensaje() {
    var it = item(), p = ["Hola Que Conchas, " + (it ? "quiero pedir: " + it : "quiero hacer un pedido")];
    if (state.fecha) p.push("Para el " + mesTexto(state.fecha));
    if (state.modo === "entrega") p.push("Entrega a domicilio"); else if (state.modo === "recoger") p.push("Paso a recoger");
    if ((state.que === "desayuno" || state.que === "ramo") && state.dedic && state.dedic.trim()) p.push("Dedicatoria: " + state.dedic.trim());
    var nm = state.nombre && state.nombre.trim();
    if (nm) p.push("Mi nombre: " + nm);
    return p.join(". ") + (nm ? "" : ".");
  }
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  function syncPedidoLinks() {
    var u = waUrl(mensaje());
    var l = document.querySelectorAll("[data-wa-pedido]");
    for (var i = 0; i < l.length; i++) l[i].href = u;
  }
  subs.push(syncPedidoLinks);

  window.QC = { MES: MES, TODO: TODO, RELLENOS: RELLENOS, MESES_LC: MESES_LC, ahora: ahora, especial: especial, mesTexto: mesTexto, mañanaISO: mañanaISO,
    state: state, set: set, toggleRell: toggleRell, on: function (cb) { subs.push(cb); }, item: item, mensaje: mensaje, waUrl: waUrl, reduce: reduce, sync: syncPedidoLinks };

  /* ---------- Links de WhatsApp: cada boton NACE con su wa.me real; aqui solo se confirma ---------- */
  function initWa() {
    var l = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < l.length; i++) { l[i].href = waUrl(l[i].getAttribute("data-wa")); l[i].target = "_blank"; l[i].rel = "noopener"; }
    syncPedidoLinks();
  }

  /* ---------- Menu hamburguesa ---------- */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.getElementById("qc-menu-btn"), menu = document.getElementById("qc-menu");
    if (!btn || !menu) return;
    var body = document.body, lbl = btn.querySelector(".qc-menu-lbl");
    var links = menu.querySelectorAll("a");
    Array.prototype.forEach.call(menu.querySelectorAll(".qc-menu-nav > *"), function (el, i) { el.style.setProperty("--i", i); });
    function setOpen(o) {
      if (o === body.classList.contains("qc-menu-open")) return;
      body.classList.toggle("qc-menu-open", o);
      btn.setAttribute("aria-expanded", o ? "true" : "false");
      menu.setAttribute("aria-hidden", o ? "false" : "true");
      if (lbl) lbl.textContent = o ? "Cerrar" : "Menú";
      if (o) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80); else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { setOpen(false); };
    btn.addEventListener("click", function () { setOpen(!body.classList.contains("qc-menu-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a");
      if (a) { setOpen(false); return; }
      if (e.target === menu || e.target.classList.contains("qc-menu-nav") || e.target.classList.contains("qc-menu-foot")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("qc-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); setOpen(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(Array.prototype.slice.call(links)), i = items.indexOf(document.activeElement);
        e.preventDefault(); if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* ---------- WhatsApp flotante: se esconde cuando ya hay un boton verde a la vista ([data-hide-wa]) ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]");
    if (!zones.length) return;
    var raf = null;
    function update() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight, on = false;
      for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh - 10 && r.bottom > 40) { on = true; break; } }
      document.body.classList.toggle("qc-wa-off", on);
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(update); }
    schedule(); window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", schedule);
  }

  /* ---------- Anclas suaves por JS (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var head = document.getElementById("qc-head");
    var top = el.getBoundingClientRect().top + window.scrollY - ((head ? head.offsetHeight : 70) + 10);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.QC.go = go;
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var h = a.getAttribute("href"); if (h.length < 2) return;
      var el = document.querySelector(h); if (!el) return;
      e.preventDefault(); closeMenu(); go(el);
      if (history.replaceState) history.replaceState(null, "", h);
    });
  }

  function init() { initWa(); initMenu(); initWaHide(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
