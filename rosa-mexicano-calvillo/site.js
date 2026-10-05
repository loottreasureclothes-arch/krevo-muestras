(function () {
  "use strict";
  var WA = "524959560095";
  var TZ = "America/Mexico_City";
  var HOURS = { 0: [9, 18], 1: null, 2: [9, 22], 3: [9, 22], 4: [9, 22], 5: [9, 22], 6: [9, 22] };
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  function waUrl(m) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(m); }
  function hr(h) { var s = h < 12 ? "a.m." : "p.m."; var x = h % 12 || 12; return x + " " + s; }
  function now() {
    var p = {};
    new Intl.DateTimeFormat("en-US", { timeZone: TZ, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", hourCycle: "h23" })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = +x.value; });
    var d = new Date(Date.UTC(p.year, p.month - 1, p.day));
    return { y: p.year, m: p.month - 1, d: p.day, h: p.hour, min: p.minute, dow: d.getUTCDay(), base: d };
  }
  window.RM = { WA: WA, waUrl: waUrl, hr: hr, now: now, HOURS: HOURS, DIAS: DIAS, MESES: MESES };

  function initWa() {
    var l = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < l.length; i++) l[i].href = waUrl(l[i].getAttribute("data-wa"));
  }
  function initMenu() {
    var b = document.querySelector(".hd-btn"), m = document.getElementById("menu");
    if (!b || !m) return;
    function set(o) { b.setAttribute("aria-expanded", o); m.hidden = !o; document.body.classList.toggle("nomenu", o); b.querySelector(".hd-lbl").textContent = o ? "Cerrar" : "Menú"; }
    b.addEventListener("click", function () { set(b.getAttribute("aria-expanded") !== "true"); });
    m.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }
  function openNow() {
    var n = now(), t = HOURS[n.dow], txt, on = false;
    if (t && n.h >= t[0] && n.h < t[1]) { on = true; txt = "Abierto ahora · cierra a las " + hr(t[1]); }
    else {
      var k = 0, o;
      if (t && n.h < t[0]) o = { d: n.dow, w: "hoy" };
      else { for (k = 1; k < 8; k++) { var dd = (n.dow + k) % 7; if (HOURS[dd]) { o = { d: dd, w: k === 1 ? "mañana" : "el " + DIAS[dd] }; break; } } }
      txt = "Cerrado ahora · abre " + o.w + " a las " + hr(HOURS[o.d][0]);
    }
    var els = document.querySelectorAll("[data-open]");
    for (var i = 0; i < els.length; i++) { els[i].textContent = txt; els[i].classList.toggle("is-on", on); }
    var rows = document.querySelectorAll("[data-dow]");
    for (var j = 0; j < rows.length; j++) rows[j].classList.toggle("hoy", +rows[j].getAttribute("data-dow") === n.dow);
  }
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]"), arcs = document.querySelectorAll(".arco");
    function show(e) { e.classList.add("is-shown"); }
    if (!("IntersectionObserver" in window)) { for (var i = 0; i < els.length; i++) show(els[i]); for (i = 0; i < arcs.length; i++) arcs[i].classList.add("open"); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    for (var a = 0; a < els.length; a++) io.observe(els[a]);
    var ia = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle("open", e.isIntersecting); }); }, { threshold: 0.25 });
    for (var b = 0; b < arcs.length; b++) ia.observe(arcs[b]);
    setTimeout(function () { for (var i = 0; i < els.length; i++) show(els[i]); }, 1600);
    setTimeout(function () { var v = innerHeight; for (var i = 0; i < arcs.length; i++) { var r = arcs[i].getBoundingClientRect(); if (r.top < v && r.bottom > 0) arcs[i].classList.add("open"); } }, 1500);
  }
  function initHide() {
    var f = document.getElementById("waFloat"), z = document.querySelectorAll("[data-hide-wa]");
    if (!f || !z.length || !("IntersectionObserver" in window)) return;
    var vis = {};
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { vis[e.target.id || e.target.className] = e.isIntersecting; }); f.classList.toggle("off", Object.keys(vis).some(function (k) { return vis[k]; })); }, { threshold: 0.35 });
    for (var i = 0; i < z.length; i++) io.observe(z[i]);
  }
  initWa(); initMenu(); openNow(); initReveal(); initHide();
  setInterval(openNow, 60000);
})();
