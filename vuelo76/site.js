/* Vuelo76: menu, estado abierto, reveal, flotante de llamar, momento de la ventanilla y mesa. */
(function () {
  "use strict";
  var TEL = "+524492383438";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var doc = document.documentElement, body = document.body;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* ---------- Menu ---------- */
  var btn = $(".menu-btn"), menu = $("#menu");
  function setMenu(open) {
    body.classList.toggle("menu-open", open);
    if (btn) { btn.setAttribute("aria-expanded", open ? "true" : "false"); $(".menu-lbl", btn).textContent = open ? "Cerrar" : "Menú"; }
    if (menu) menu.setAttribute("aria-hidden", open ? "false" : "true");
  }
  if (btn && menu) {
    btn.addEventListener("click", function () { setMenu(!body.classList.contains("menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  }

  /* ---------- Anclas con scroll suave sin scroll-behavior en CSS ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href");
    if (id.length < 2) { return; }
    var el = $(id);
    if (!el) return;
    e.preventDefault();
    var top = id === "#top" ? 0 : el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  });

  /* ---------- Abierto ahora (hora de Aguascalientes) ---------- */
  var H = { 0: [9, 23], 1: [9, 23], 2: [17, 23], 3: [9, 23], 4: [9, 23], 5: [9, 24], 6: [9, 24] };
  function fmt(h) { var s = h % 24; var ap = s >= 12 ? "p. m." : "a. m."; var x = s % 12 || 12; return x + ":00 " + ap; }
  function ahora() {
    var d = new Date(), dia = d.getDay(), hr = d.getHours() + d.getMinutes() / 60;
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(d), o = {};
      p.forEach(function (x) { o[x.type] = x.value; });
      dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday);
      hr = parseInt(o.hour, 10) % 24 + parseInt(o.minute, 10) / 60;
    } catch (e) {}
    return { dia: dia, hr: hr };
  }
  function estado() {
    var n = ahora(), h = H[n.dia], prev = H[(n.dia + 6) % 7];
    var abierto = n.hr >= h[0] && n.hr < h[1], texto;
    if (abierto) texto = "<b>Abierto ahora</b> · cierra a las " + fmt(h[1]);
    else if (n.hr < h[0]) texto = "Cerrado ahora · abre hoy a las " + fmt(h[0]);
    else { var nx = H[(n.dia + 1) % 7]; texto = "Cerrado ahora · abre mañana a las " + fmt(nx[0]); }
    $$("[data-abierto]").forEach(function (el) { el.innerHTML = texto; });
    $$(".horario tr").forEach(function (tr) { tr.classList.toggle("hoy", +tr.getAttribute("data-dia") === n.dia); });
  }
  estado();

  /* ---------- Reveal: CSS base = estado final; solo se esconde con JS; todo visible a los 1.6 s ---------- */
  var rvEls = $$("[data-reveal]");
  if (!reduce && rvEls.length) {
    doc.classList.add("rv");
    var pend = rvEls.slice(), raf = 0;
    var tick = function () {
      raf = 0;
      var vh = window.innerHeight;
      for (var i = pend.length - 1; i >= 0; i--) {
        var r = pend[i].getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) { pend[i].classList.add("in"); pend.splice(i, 1); }
      }
    };
    var sched = function () { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener("scroll", sched, { passive: true });
    window.addEventListener("resize", sched);
    sched();
    setTimeout(function () { rvEls.forEach(function (el) { el.classList.add("in"); }); }, 1600);
  }

  /* ---------- Flotante de llamar: se esconde donde ya hay botones de contacto ---------- */
  var fab = $(".fab"), zonas = $$("[data-zona]");
  function fabVis() {
    var vh = window.innerHeight, off = false;
    zonas.forEach(function (z) { var r = z.getBoundingClientRect(); if (r.top < vh * 0.9 && r.bottom > 0) off = true; });
    if (fab) fab.classList.toggle("off", off);
  }
  window.addEventListener("scroll", fabVis, { passive: true });
  window.addEventListener("resize", fabVis);
  fabVis();

  /* ---------- Momento firma: la ventanilla se abre con el scroll (reversible) ---------- */
  var vent = $("[data-noche]");
  if (vent && !reduce) {
    var scrolled = false;
    var upd = function () {
      var r = vent.getBoundingClientRect(), vh = window.innerHeight;
      var p = (vh * 0.98 - r.top) / (vh * 0.62);
      p = Math.max(0, Math.min(1, p));
      vent.style.setProperty("--p", p.toFixed(3));
    };
    window.addEventListener("scroll", function () { scrolled = true; upd(); }, { passive: true });
    window.addEventListener("resize", upd);
    /* si nadie ha hecho scroll a los 1.6 s (captura, vista previa), queda abierta */
    var inView = function () { var r = vent.getBoundingClientRect(); return r.top < window.innerHeight && r.bottom > 0; };
    if (inView()) upd(); else vent.style.setProperty("--p", "0");
    setTimeout(function () { if (!scrolled && !inView()) { vent.style.setProperty("--p", "1"); } }, 1600);
  }

  /* ---------- Componente firma: la mesa de rejilla con pase de abordar ---------- */
  var ITEMS = {
    "crepa-platano": { n: "Crepa de plátano", img: "img/crepa-platano-480.webp" },
    "crepa-helado": { n: "Crepa con helado y chocolate", img: "img/crepa-helado-480.webp" },
    "crepa-papas": { n: "Crepa con helado y papas", img: "img/crepa-papas-480.webp" },
    "malteada": { n: "Malteada con crema", img: "img/malteada-480.webp" },
    "frappe": { n: "Frappé", img: "img/frappe-480.webp" },
    "hamburguesa": { n: "Hamburguesa", img: "img/hamburguesa-480.webp" },
    "frappe-moka": { n: "Frappé de moka" },
    "frappe-mordisko": { n: "Frappé Mordisko" },
    "smoothie-mango": { n: "Smoothie de mango" },
    "ham-guadalajara": { n: "Hamburguesa Guadalajara" },
    "ham-honolulu": { n: "Hamburguesa Honolulu" }
  };
  var mesa = {}, orden = [];
  var elPlates = $("[data-mesa-plates]"), elN = $("[data-mesa-n]"), elTot = $("[data-mesa-total]"), elTxt = $("[data-mesa-texto]"), elAv = $("[data-mesa-aviso]");
  function texto() {
    var partes = orden.map(function (id) { return mesa[id] + " " + ITEMS[id].n; });
    return partes.length ? "Pase a la mesa, Vuelo76 (puerta 107): " + partes.join(", ") + ". Precios: los pregunto al llegar." : "";
  }
  function render(nuevo) {
    var total = 0;
    orden.forEach(function (id) { total += mesa[id]; });
    elN.textContent = total;
    elTot.textContent = total ? "Pregunta el precio" : "Elige arriba";
    elTxt.textContent = total ? orden.map(function (id) { return mesa[id] + " " + ITEMS[id].n; }).join(", ") + "." : "Elige arriba";
    var h = "";
    orden.forEach(function (id) {
      var it = ITEMS[id];
      h += '<div class="slot"><button type="button" class="plato" data-quitar="' + id + '" aria-label="Quitar ' + it.n + '">' +
        (it.img ? '<img src="' + it.img + '" alt="" width="104" height="104">' : '<span class="tx">' + it.n + '</span>') +
        (mesa[id] > 1 ? '<span class="q">' + mesa[id] + '</span>' : '') + '</button><span class="slot-n">' + it.n + '</span></div>';
    });
    var vacios = Math.max(0, 3 - orden.length);
    for (var i = 0; i < vacios; i++) h += '<div class="slot vacio-s"><span class="vacio"></span><span class="slot-n">' + (orden.length === 0 && i === 0 ? "Elige arriba" : "") + '</span></div>';
    elPlates.innerHTML = h;
    if (!nuevo || reduce) $$(".plato", elPlates).forEach(function (p) { p.style.animation = "none"; });
    else $$(".plato", elPlates).forEach(function (p) { if (p.getAttribute("data-quitar") !== nuevo) p.style.animation = "none"; });
    $$("[data-item]").forEach(function (li) {
      var id = li.getAttribute("data-item"), b = $(".add", li), q = mesa[id] || 0;
      b.classList.toggle("on", q > 0);
      if (b.classList.contains("add-mini")) b.textContent = q ? "×" + q : "+";
      else b.innerHTML = (q ? "En la mesa ×" + q : "A la mesa") + "<span>" + (q ? "✓" : "+") + "</span>";
    });
  }
  document.addEventListener("click", function (e) {
    var add = e.target.closest && e.target.closest("[data-item] .add");
    if (add) {
      var id = add.closest("[data-item]").getAttribute("data-item");
      if (!mesa[id]) { mesa[id] = 0; orden.push(id); }
      mesa[id] = Math.min(9, mesa[id] + 1);
      render(id);
      if (elAv) elAv.textContent = ITEMS[id].n + " ya está en tu mesa.";
      return;
    }
    var q = e.target.closest && e.target.closest("[data-quitar]");
    if (q) {
      var k = q.getAttribute("data-quitar");
      mesa[k]--; if (mesa[k] <= 0) { delete mesa[k]; orden.splice(orden.indexOf(k), 1); }
      render(null);
      if (elAv) elAv.textContent = "";
      return;
    }
    if (e.target.closest && e.target.closest("[data-mesa-copiar]")) {
      if (!orden.length) { if (elAv) elAv.textContent = "Elige arriba lo que se te antoja."; return; }
      var t = texto();
      var ok = function () { if (elAv) elAv.textContent = "Pedido copiado. Dilo por teléfono: " + TEL.replace("+52", "").replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3") + "."; };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok, function () { if (elAv) elAv.textContent = t; });
      else { try { var ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); ok(); } catch (x) { if (elAv) elAv.textContent = t; } }
    }
  });
  if (elPlates) render(null);
})();
