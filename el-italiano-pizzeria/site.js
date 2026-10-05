(function () {
  "use strict";
  var WA = document.body.getAttribute("data-wa") || "";
  window.ITA = { WA: WA, waUrl: function (m) { return WA ? "https://wa.me/" + WA + "?text=" + encodeURIComponent(m) : "tel:+52" + (document.body.getAttribute("data-tel") || ""); } };
  var root = document.documentElement, body = document.body;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* menu hamburguesa */
  var btn = $("#hdBtn"), menu = $("#menu");
  function setMenu(o) { body.classList.toggle("menu-open", o); btn.setAttribute("aria-expanded", o); btn.setAttribute("aria-label", o ? "Cerrar menú" : "Abrir menú"); }
  if (btn) {
    btn.addEventListener("click", function () { setMenu(!body.classList.contains("menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  }

  /* anclas con compensación del header, sin smooth */
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var t = document.getElementById(a.getAttribute("href").slice(1));
    if (!t) return;
    e.preventDefault();
    window.scrollTo(0, t.getBoundingClientRect().top + window.pageYOffset - 60);
  });

  /* flotante de WhatsApp: se esconde si hay un verde a la vista */
  var fl = $("#waFloat"), greens = $$("[data-hide-wa]");
  function updFloat() {
    var vh = window.innerHeight, hide = false;
    greens.forEach(function (g) { var r = g.getBoundingClientRect(); if (r.top < vh * 0.9 && r.bottom > vh * 0.1) hide = true; });
    fl.classList.toggle("hide", hide);
  }
  var raf = 0;
  window.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(function () { raf = 0; updFloat(); }); }, { passive: true });
  window.addEventListener("resize", updFloat);
  updFloat();

  /* reveal: visible a 1.6 s pase lo que pase */
  var rm = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var rv = $$("[data-reveal]"), mesa = $("#mesa");
  if (!rm && "IntersectionObserver" in window) {
    root.classList.add("js-rv");
    if (mesa) mesa.classList.add("armed");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    rv.forEach(function (el) { io.observe(el); });
    if (mesa) {
      var im = new IntersectionObserver(function (es) {
        es.forEach(function (en) { mesa.classList.toggle("in", en.isIntersecting); });
      }, { threshold: 0.35 });
      im.observe(mesa);
    }
    setTimeout(function () { rv.forEach(function (el) { el.classList.add("in"); }); }, 1600);
    setTimeout(function () { if (mesa && !mesa.classList.contains("in")) { var r = mesa.getBoundingClientRect(); if (r.top < window.innerHeight && r.bottom > 0) mesa.classList.add("in"); } }, 1600);
  }

  /* horario y "Abierto ahora" (hora de Aguascalientes) */
  var H = { 0: [15, 19.5], 1: null, 2: [15, 22], 3: [15, 22], 4: [15, 22], 5: [15, 22], 6: [15, 22] };
  function ahora() {
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      var d = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
      return { d: d, h: (parseInt(o.hour, 10) % 24) + parseInt(o.minute, 10) / 60 };
    } catch (e) { var n = new Date(); return { d: n.getDay(), h: n.getHours() + n.getMinutes() / 60 }; }
  }
  var n = ahora(), hr = H[n.d], on = !!hr && n.h >= hr[0] && n.h < hr[1];
  var txt = on ? "Abierto ahora" : (n.d === 1 ? "Hoy cerrado, abrimos mañana 3 p.m." : "Cerrado ahora");
  $$(".abierto").forEach(function (el) { el.textContent = txt; el.classList.toggle("on", on); });
  var hoy = $('#hor li[data-d="' + n.d + '"]'); if (hoy) hoy.classList.add("hoy");
})();
