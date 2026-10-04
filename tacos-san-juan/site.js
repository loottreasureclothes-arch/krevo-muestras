/* Tacos San Juan: header, menu, WhatsApp, reveal (1.6 s), horarios y "abierto ahora". */
(function () {
  "use strict";
  var WA = "524495460014"; /* PENDIENTE: confirmar que es WhatsApp (viene de la ficha de Maps de Ferrocarril) */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* minutos desde 00:00; cierre mayor a 1440 = pasa de medianoche */
  var D = [0, 1, 2, 3, 4, 5, 6];
  function semana(f) { return D.map(f); }
  var SUC = {
    ferrocarril: { nombre: "Ferrocarril", calle: "Av. Ferrocarril 901, IV Centenario", cp: "20260", q: "Tacos San Juan de los Lagos Av. Ferrocarril 901 IV Centenario Aguascalientes", tel: "449 546 0014", telh: "+524495460014",
      h: semana(function (d) { return d === 0 ? [960, 1440] : d >= 5 ? [960, 1515] : [960, 1455]; }) },
    independencia: { nombre: "Independencia", calle: "Av. Independencia 3006", cp: "20908", q: "Tacos San Juan de los Lagos Av Independencia 3006 Aguascalientes", tel: "", telh: "",
      h: semana(function (d) { return d >= 5 ? [960, 1515] : [960, 1440]; }) },
    chavez: { nombre: "Chávez", calle: "Blvd. José María Chávez 3005, Centro de Abastos", cp: "", q: "Tacos San Juan de los Lagos Blvd. José María Chávez 3005 Aguascalientes", tel: "", telh: "",
      h: semana(function () { return [930, 1500]; }) }
  };
  var DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  function ahoraMx() {
    var p = {};
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
        .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
      var dw = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[p.weekday];
      return { d: dw, m: parseInt(p.hour, 10) * 60 + parseInt(p.minute, 10) };
    } catch (e) { var n = new Date(); return { d: n.getDay(), m: n.getHours() * 60 + n.getMinutes() }; }
  }
  function hora(min) {
    var m = min % 1440, h = Math.floor(m / 60), mm = m % 60, ap = h >= 12 ? "pm" : "am", h12 = h % 12 || 12;
    return h12 + ":" + (mm < 10 ? "0" : "") + mm + " " + ap;
  }
  function estado(suc) {
    var n = ahoraMx(), hoy = suc.h[n.d], ayer = suc.h[(n.d + 6) % 7];
    if (n.m >= hoy[0] && n.m < Math.min(hoy[1], 1440 + 1440)) return { abierto: true, texto: "Abierto ahora · cierra " + hora(hoy[1]) };
    if (ayer[1] > 1440 && n.m < ayer[1] - 1440) return { abierto: true, texto: "Abierto ahora · cierra " + hora(ayer[1]) };
    if (n.m < hoy[0]) return { abierto: false, texto: "Cerrado · abre hoy a las " + hora(hoy[0]) };
    return { abierto: false, texto: "Cerrado · abre mañana a las " + hora(suc.h[(n.d + 1) % 7][0]) };
  }
  window.TSJ = { WA: WA, waUrl: waUrl, SUC: SUC, DIAS: DIAS, ahoraMx: ahoraMx, hora: hora, estado: estado };

  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) { links[i].href = waUrl(links[i].getAttribute("data-wa")); links[i].target = "_blank"; links[i].rel = "noopener"; }
  }
  function initHeader() {
    var h = document.getElementById("hd"); if (!h) return;
    var t = false;
    function u() { t = false; h.classList.toggle("is-compact", (window.scrollY || 0) > 12); }
    window.addEventListener("scroll", function () { if (!t) { t = true; requestAnimationFrame(u); } }, { passive: true }); u();
  }
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".hd-menu"), menu = document.getElementById("hd-nav"); if (!btn || !menu) return;
    var body = document.body, lbl = btn.querySelector(".hd-lbl"), links = menu.querySelectorAll("a");
    Array.prototype.forEach.call(links, function (a, i) { a.style.setProperty("--i", i); });
    function set(o) {
      if (o === body.classList.contains("menu-open")) return;
      body.classList.toggle("menu-open", o); btn.setAttribute("aria-expanded", o ? "true" : "false"); menu.setAttribute("aria-hidden", o ? "false" : "true");
      if (lbl) lbl.textContent = o ? "Cerrar" : "Menú";
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target === menu || e.target.tagName === "P") set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }
  function watch(list, frac, cb) {
    var p = Array.prototype.slice.call(list); if (!p.length) return; var raf = null;
    function tick() { raf = null; var vh = window.innerHeight || 800;
      for (var i = p.length - 1; i >= 0; i--) { var r = p[i].getBoundingClientRect(); if (r.top < vh * frac && r.bottom > 0) { var el = p[i]; p.splice(i, 1); cb(el); } }
      if (p.length) sch(); }
    function sch() { if (!raf) raf = requestAnimationFrame(tick); }
    sch(); window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch);
  }
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (reduce) { Array.prototype.forEach.call(els, function (e) { e.classList.add("is-in"); }); return; }
    watch(els, 0.92, function (el) { el.classList.add("is-in"); });
  }
  /* momento firma: el rótulo se prende al llegar y se apaga al irse (reversible) */
  function initRotulo() {
    var s = document.querySelector("[data-rotulo]"); if (!s) return;
    function u() { var r = s.getBoundingClientRect(), vh = window.innerHeight || 800, on = r.top < vh * 0.62 && r.bottom > vh * 0.25; s.classList.toggle("is-in", on); }
    if (reduce) { s.classList.add("is-in"); return; }
    var raf = null; function sch() { if (!raf) raf = requestAnimationFrame(function () { raf = null; u(); }); }
    window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch);
    setTimeout(u, 1700);
  }
  function initWaHide() {
    var z = document.querySelectorAll("#plato, #visitanos, .pie"); if (!z.length) return;
    function u() { var vh = window.innerHeight || 800, on = false;
      for (var i = 0; i < z.length; i++) { var r = z[i].getBoundingClientRect(); if (r.top < vh * 0.7 && r.bottom > vh * 0.2) { on = true; break; } }
      document.body.classList.toggle("wa-off", on); }
    var raf = null; function sch() { if (!raf) raf = requestAnimationFrame(function () { raf = null; u(); }); }
    sch(); window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch);
  }
  function go(el) {
    var head = document.querySelector(".hd");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight + 8 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.TSJ.ir = go;
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href"); if (href.length < 2) return; var el = document.querySelector(href); if (!el) return;
      e.preventDefault(); closeMenu(); go(el); if (history.replaceState) history.replaceState(null, "", href);
    });
  }
  function initEstadoHero() {
    var els = document.querySelectorAll("[data-estado]");
    Array.prototype.forEach.call(els, function (el) { var e = estado(SUC[el.getAttribute("data-estado")]); el.textContent = e.texto; el.classList.toggle("is-open", e.abierto); });
  }
  function init() { initWa(); initHeader(); initMenu(); initReveal(); initRotulo(); initWaHide(); initAnchors(); initEstadoHero(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
