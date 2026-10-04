/* La Fragua (Calvillo): menú, reveal, anclas, flotante, carta, hora de tu mesa, mapa por casa, abierto ahora. */
(function () {
  "use strict";
  var WA = ""; /* PENDIENTE: WhatsApp del negocio (no publicado). Con número, el aviso pasa a wa.me verde. */
  var TEL = "+524959582200";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---- menú ---- */
  var body = document.body, btn = $(".menu-btn"), menu = $("#menu");
  function setMenu(open) {
    body.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    menu.setAttribute("aria-hidden", open ? "false" : "true");
    $(".menu-lbl").textContent = open ? "Cerrar" : "Menú";
  }
  btn.addEventListener("click", function () { setMenu(!body.classList.contains("menu-open")); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---- anclas sin scroll-behavior en CSS ---- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var el = document.querySelector(a.getAttribute("href"));
    if (!el) return;
    e.preventDefault(); setMenu(false);
    var top = el.getBoundingClientRect().top + window.scrollY - (document.getElementById("bar").offsetHeight - 1);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  });

  /* ---- reveal por sondeo ---- */
  var pend = $$("[data-reveal]");
  function tick() {
    var vh = window.innerHeight;
    pend = pend.filter(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) { el.classList.add("is-in"); return false; }
      return true;
    });
  }

  /* ---- flotante de llamar: se esconde donde ya hay acción grande ---- */
  var zones = $$("#mesa, #visitanos, #listo, #pie");
  function fab() {
    var vh = window.innerHeight, on = false;
    zones.forEach(function (z) { var r = z.getBoundingClientRect(); if (r.top < vh * 0.7 && r.bottom > vh * 0.2) on = true; });
    body.classList.toggle("fab-off", on);
  }

  /* ---- momento firma: la presa se abre al scroll (reversible) ---- */
  var ph = $("#presa-ph"), sec = $("#presa");
  function presa() {
    if (!ph || reduce) return;
    var r = sec.getBoundingClientRect(), vh = window.innerHeight, p = 1;
    if (r.top < vh && r.bottom > 0) p = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.85)));
    var x = ((1 - p) * 16).toFixed(2), rad = ((1 - p) * 50).toFixed(1);
    ph.style.clipPath = p >= 1 ? "inset(0 0 0 0)" : "inset(0 " + x + "% 0 " + x + "% round " + rad + "% " + rad + "% 0 0)";
  }

  var raf = null;
  function onScroll() { if (!raf) raf = requestAnimationFrame(function () { raf = null; tick(); fab(); presa(); }); }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---- carta: Agregar ---- */
  var mesa = [];
  function mesaTxt() { return mesa.length ? "Tu mesa: " + mesa.join(", ") : "Tu mesa: aún vacía"; }
  $$(".add").forEach(function (b) {
    b.addEventListener("click", function () {
      var n = b.getAttribute("data-dish"), i = mesa.indexOf(n);
      if (i < 0) mesa.push(n); else mesa.splice(i, 1);
      var on = i < 0;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.textContent = on ? "En tu mesa" : "Agregar";
      $("#mesa-count").textContent = mesaTxt();
      firma();
    });
  });

  /* ---- firma: la hora de tu mesa ---- */
  var hora = $("#hora"), pers = 4, dia = "entre semana";
  var BANDAS = [
    { n: "Terraza", t: "Abren a las 11. Buena hora para escoger mesa en la terraza.", msg: "¿Hay mesa en la terraza?" },
    { n: "Mesa con vista", t: "Mesa con vista a la presa. Aquí caen el aguachile y la michelada.", msg: "¿Me guardan mesa con vista a la presa?" },
    { n: "Atardecer", t: "Luz de atardecer sobre el agua. Cierran a las 7: pide el postre con tiempo.", msg: "¿Me guardan mesa con vista a la presa?" }
  ];
  function fmt(h) {
    var hh = Math.floor(h), mm = h % 1 ? "30" : "00", ap = hh >= 12 ? "pm" : "am", h12 = hh > 12 ? hh - 12 : hh;
    return h12 + ":" + mm + " " + ap;
  }
  function money(n) { return "$" + n.toLocaleString("es-MX"); }
  function firma() {
    if (!hora) return;
    var h = parseFloat(hora.value), b = h < 14 ? 0 : h < 17 ? 1 : 2, t = (h - 11) / 8;
    var x = 160 - 140 * Math.cos(Math.PI * t), y = 110 - 140 * Math.sin(Math.PI * t);
    var dot = $("#dot"); dot.setAttribute("cx", x.toFixed(1)); dot.setAttribute("cy", y.toFixed(1));
    $("#arc-on").setAttribute("stroke-dasharray", (t * 100).toFixed(1) + " 100");
    $$(".hora-ph img").forEach(function (im) { im.classList.toggle("on", +im.getAttribute("data-b") === b); });
    $("#hora-txt").textContent = fmt(h); $("#hora-sub").textContent = BANDAS[b].n;
    hora.setAttribute("aria-valuetext", fmt(h));
    $("#nota").textContent = BANDAS[b].t + (dia === "domingo" ? " Domingo es el día más lleno: mejor llama antes." : "");
    $("#pers").textContent = pers;
    $("#cuenta").innerHTML = "Para " + pers + ": de " + money(pers * 200) + " a " + money(pers * 300) + "<small>Según el rango de Google, $200 a $300 por persona.</small>";
    var m = "Hola, La Fragua (Presa de la Codorniz). Voy a llegar " + (dia === "domingo" ? "el domingo" : "entre semana") + " a las " + fmt(h) + ", somos " + pers + "." +
      (mesa.length ? " Quiero pedir: " + mesa.join(", ") + "." : "") + " " + BANDAS[b].msg;
    $("#msg").textContent = m;
    var a = $("#avisa");
    if (WA) { a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(m); a.className = "btn btn-wa"; a.textContent = "Avisar por WhatsApp"; a.target = "_blank"; a.rel = "noopener"; }
    else { a.href = "tel:" + TEL; }
  }
  if (hora) {
    hora.addEventListener("input", firma);
    $("#menos").addEventListener("click", function () { pers = Math.max(1, pers - 1); firma(); });
    $("#mas").addEventListener("click", function () { pers = Math.min(20, pers + 1); firma(); });
    $$("#dia button").forEach(function (b) {
      b.addEventListener("click", function () {
        dia = b.getAttribute("data-d");
        $$("#dia button").forEach(function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
        firma();
      });
    });
    $("#copia").addEventListener("click", function () {
      var txt = $("#msg").textContent, out = $("#copied");
      function ok() { out.textContent = "Mensaje copiado. Pégalo donde quieras."; setTimeout(function () { out.textContent = ""; }, 2600); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, function () { out.textContent = "Selecciona el texto y cópialo."; });
      else { var ta = document.createElement("textarea"); ta.value = txt; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); ok(); } catch (e) {} document.body.removeChild(ta); }
    });
    firma();
  }

  /* ---- visítanos: casa por pestaña + abierto ahora ---- */
  function ahoraMX() {
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date()), o = {};
      p.forEach(function (x) { o[x.type] = x.value; });
      var dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      return { d: dias[o.weekday], h: (parseInt(o.hour, 10) % 24) + parseInt(o.minute, 10) / 60 };
    } catch (e) { var n = new Date(); return { d: n.getDay(), h: n.getHours() + n.getMinutes() / 60 }; }
  }
  function abre() {
    var n = ahoraMX();
    $$(".vis").forEach(function (v) {
      var r = v.getAttribute("data-open").split("-"), a = +r[0], c = +r[1];
      var el = $("[data-abre]", v), on = n.h >= a && n.h < c;
      el.classList.toggle("on", on);
      $("span", el).textContent = on ? "Abierto ahora, cierra a las " + fmt(c) : (n.h < a ? "Cerrado ahora, abre hoy a las " + fmt(a) : "Cerrado ahora, abre mañana a las " + fmt(a));
      $$(".hor li", v).forEach(function (li) { li.classList.toggle("hoy", +li.getAttribute("data-dia") === n.d); });
    });
  }
  abre();
  var tabs = $$(".tabs button");
  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      tabs.forEach(function (o) {
        var on = o === t; o.setAttribute("aria-selected", on ? "true" : "false");
        document.getElementById(o.getAttribute("aria-controls")).hidden = !on;
      });
    });
  });
  setTimeout(tick, 400);
})();
