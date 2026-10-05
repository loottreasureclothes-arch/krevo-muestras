(function () {
  "use strict";
  var TEL = "+524491941346";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* menu */
  var btn = $(".hd-menu-btn");
  function menu(open) { document.body.classList.toggle("menu-open", open); btn.setAttribute("aria-expanded", open); }
  btn.addEventListener("click", function () { menu(!document.body.classList.contains("menu-open")); });
  $$("#menu a").forEach(function (a) { a.addEventListener("click", function () { menu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") menu(false); });

  /* horario: Aguascalientes, UTC-6 sin horario de verano */
  function ahora() {
    var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
    var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
    var dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { d: dias[o.weekday], m: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
  }
  function horario() {
    var t = ahora(), A = 9 * 60 + 30, C = 16 * 60 + 30;
    var abierto = t.d !== 4 && t.m >= A && t.m < C;
    var txt;
    if (abierto) txt = "Abierto ahora · hasta 4:30 pm";
    else if (t.d !== 4 && t.m < A) txt = "Cerrado ahora · abre 9:30 am";
    else txt = t.d === 4 ? "Hoy cerrado · abre mañana 9:30 am" : "Cerrado ahora · abre " + (t.d === 3 ? "el viernes" : "mañana") + " 9:30 am";
    var e = $("#estado"); if (e) { e.classList.toggle("abierto", abierto); $("#estado-txt").textContent = txt; }
    var h = $("#estado-hero"); if (h) h.textContent = abierto ? "Abierto ahora · hasta 4:30 pm" : "Abre 9:30 a 16:30";
    $$("#horario li").forEach(function (li) { li.classList.toggle("hoy", +li.getAttribute("data-d") === t.d); });
  }
  horario(); setInterval(horario, 60000);

  /* la ventanilla: comanda */
  var plats = $$(".plato"), qty = {}, nombres = {}, personas = 2;
  plats.forEach(function (li) { qty[li.dataset.id] = 0; nombres[li.dataset.id] = li.dataset.nombre; });
  function total() { return Object.keys(qty).reduce(function (s, k) { return s + qty[k]; }, 0); }
  function texto() {
    var partes = Object.keys(qty).filter(function (k) { return qty[k] > 0; }).map(function (k) { return qty[k] + " " + nombres[k].toLowerCase(); });
    if (!partes.length) return "";
    return "Hola, somos " + (personas === 6 ? "6 o más" : personas) + ". Quiero: " + partes.join(", ") + ". ¿Cuánto es?";
  }
  function pinta() {
    plats.forEach(function (li) { var n = qty[li.dataset.id]; $("output", li).textContent = n; li.classList.toggle("on", n > 0); });
    var ul = $("#lineas"); ul.innerHTML = "";
    var keys = Object.keys(qty).filter(function (k) { return qty[k] > 0; });
    if (!keys.length) { var v = document.createElement("li"); v.className = "vacio"; v.textContent = "Elige arriba"; ul.appendChild(v); }
    keys.forEach(function (k) {
      var li = document.createElement("li");
      li.innerHTML = '<span class="qty"></span><span class="nm"></span><button class="quita" type="button" aria-label="Quitar uno"></button>';
      $(".qty", li).textContent = qty[k]; $(".nm", li).textContent = nombres[k]; $(".quita", li).textContent = "−";
      $(".quita", li).addEventListener("click", function () { qty[k] = Math.max(0, qty[k] - 1); pinta(); });
      ul.appendChild(li);
    });
    var tx = texto(), d = $("#dicta");
    d.hidden = !tx; d.textContent = tx ? "Dile esto: " + tx : "";
    $("#btn-vaciar").hidden = !tx;
    var n = total(), c = $(".carta-n");
    if (c) c.textContent = n ? "Ver mi papelito (" + n + ")" : "Ver mi papelito";
  }
  plats.forEach(function (li) {
    var k = li.dataset.id;
    $(".mas", li).addEventListener("click", function () { qty[k] = Math.min(20, qty[k] + 1); pinta(); });
    $(".menos", li).addEventListener("click", function () { qty[k] = Math.max(0, qty[k] - 1); pinta(); });
  });
  $$(".para-chips button").forEach(function (b) {
    b.addEventListener("click", function () {
      $$(".para-chips button").forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on"); personas = +b.dataset.n; pinta();
    });
  });
  $("#btn-vaciar").addEventListener("click", function () { Object.keys(qty).forEach(function (k) { qty[k] = 0; }); $("#copiado").textContent = ""; pinta(); });
  $("#btn-copiar").addEventListener("click", function () {
    var tx = texto(), ok = $("#copiado");
    if (!tx) { ok.textContent = "Elige arriba lo que quieres."; return; }
    function listo() { ok.textContent = "Copiado. Llama al 449 194 1346 y díctaselo."; }
    function falla() { ok.textContent = "No pude copiar. Díctaselo así: " + tx; }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(tx).then(listo, falla); else falla();
  });
  pinta();

  /* flotante: se esconde sobre visitanos y pie */
  var fab = $(".fab"), zonas = $$("[data-hide-wa]").filter(function (z) { return z !== fab; });
  function fabTick() {
    var vh = window.innerHeight, ocultar = zonas.some(function (z) { var r = z.getBoundingClientRect(); return r.top < vh - 80 && r.bottom > vh * .5; });
    fab.classList.toggle("is-hidden", ocultar);
  }
  window.addEventListener("scroll", fabTick, { passive: true }); window.addEventListener("resize", fabTick); fabTick();

  /* reveal: visible a 1.6 s pase lo que pase */
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var els = $$("[data-reveal], #tortFoto");
  if (!reduce && "IntersectionObserver" in window) {
    document.documentElement.classList.add("rv-on");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { var on = e.isIntersecting || e.boundingClientRect.top < 0; if (e.target.id === "tortFoto") e.target.classList.toggle("is-in", on); else if (on) e.target.classList.add("is-in"); if (on && e.target.id === "tortFoto") setTimeout(function () { e.target.classList.add("is-in"); }, 1600); });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
    setTimeout(function () { els.forEach(function (el) { if (el.id !== "tortFoto") el.classList.add("is-in"); else { var r = el.getBoundingClientRect(); if (r.top < window.innerHeight * 1.2) el.classList.add("is-in"); } }); }, 1600);
  }
})();
