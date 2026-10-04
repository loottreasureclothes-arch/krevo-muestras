/* Casa Corazón: menú, flotante WhatsApp, reveal, tabla de lotería. */
(function () {
  "use strict";
  var WA = "524492056026";
  var doc = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(m) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(m); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* links data-wa: solo reescribe el href (ya nace real en el HTML) */
  $$("[data-wa]").forEach(function (a) { a.href = waUrl(a.getAttribute("data-wa")); });

  /* menú */
  var body = document.body, btn = $(".hd-btn"), lbl = $(".hd-lbl"), menu = $("#hd-menu");
  function setMenu(o) {
    body.classList.toggle("m-open", o);
    btn.setAttribute("aria-expanded", o ? "true" : "false");
    menu.setAttribute("aria-hidden", o ? "false" : "true");
    lbl.textContent = o ? "Cerrar" : "Menú";
  }
  btn.addEventListener("click", function () { setMenu(!body.classList.contains("m-open")); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* anclas sin scroll-behavior en CSS */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var h = a.getAttribute("href");
    if (h.length < 2) { return; }
    var el = $(h);
    if (!el) return;
    e.preventDefault(); setMenu(false);
    var top = el.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(doc).getPropertyValue("--hd"), 10) || 64) + 4;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  });

  /* reveal */
  var rv = $$("[data-reveal]");
  if (!reduce && rv.length) {
    doc.classList.add("js-rv");
    var pend = rv.slice(), raf = 0;
    var tick = function () {
      raf = 0;
      var vh = window.innerHeight;
      for (var i = pend.length - 1; i >= 0; i--) {
        var r = pend[i].getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) { pend[i].classList.add("in"); pend.splice(i, 1); }
      }
    };
    var sch = function () { if (!raf) raf = requestAnimationFrame(tick); };
    sch(); window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch);
  }

  /* flotante se oculta donde la sección ya trae su verde */
  var zones = $$("[data-hide-wa]");
  function waCheck() {
    var vh = window.innerHeight, on = false;
    zones.forEach(function (z) { var r = z.getBoundingClientRect(); if (r.top < vh * 0.75 && r.bottom > vh * 0.25) on = true; });
    body.classList.toggle("wa-off", on);
  }
  var wr = 0;
  function waSch() { if (!wr) wr = requestAnimationFrame(function () { wr = 0; waCheck(); }); }
  waSch(); window.addEventListener("scroll", waSch, { passive: true }); window.addEventListener("resize", waSch);

  /* tabla de lotería */
  var cells = $$(".cl"), modo = "aquí";
  var count = $("#count"), sum = $("#sum"), stamp = $("#stamp"), wa = $("#tabla-wa");
  var addBtns = $$(".add");
  function marked() { return cells.filter(function (c) { return c.classList.contains("on"); }); }
  function msg() {
    var n = marked().map(function (c) { return c.getAttribute("data-name"); });
    if (!n.length) return "Hola Casa Corazón, quiero hacer un pedido. ¿Qué tienen hoy?";
    var m = modo === "aquí" ? "comer aquí" : modo === "llevar" ? "llevar" : "domicilio";
    return "Hola Casa Corazón, quiero pedir para " + m + ": " + n.join(", ") + ". ¿Me confirman?";
  }
  function refresh() {
    var m = marked(), k = m.length;
    count.textContent = k + (k === 1 ? " ficha" : " fichas");
    stamp.classList.toggle("on", k >= 4);
    if (k === 0) sum.textContent = "Toca las casillas que se te antojan. Con 4 fichas cantas lotería.";
    else sum.textContent = (k >= 4 ? "¡Lotería! " : "") + m.map(function (c) { return c.getAttribute("data-name"); }).join(", ") + ".";
    wa.href = waUrl(msg());
    addBtns.forEach(function (b) {
      var c = cells.filter(function (x) { return x.getAttribute("data-cl") === b.getAttribute("data-add"); })[0];
      var on = c && c.classList.contains("on");
      b.classList.toggle("on", !!on);
      b.textContent = on ? "En tu tabla" : "Agregar";
    });
  }
  function toggle(c) {
    var on = !c.classList.contains("on");
    c.classList.toggle("on", on); c.setAttribute("aria-pressed", on ? "true" : "false");
    refresh();
  }
  cells.forEach(function (c) { c.addEventListener("click", function () { toggle(c); }); });
  addBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      var c = cells.filter(function (x) { return x.getAttribute("data-cl") === b.getAttribute("data-add"); })[0];
      if (c) toggle(c);
    });
  });
  $$(".modo").forEach(function (b) {
    b.addEventListener("click", function () {
      $$(".modo").forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on"); modo = b.getAttribute("data-modo"); refresh();
    });
  });
  refresh();
})();
