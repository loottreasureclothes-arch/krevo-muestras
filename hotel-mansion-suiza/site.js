/* Hotel Mansión Suiza: reveal, barra, boton de llamada, gable que se abre, La llave. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;
  if (!reduce) root.classList.add("mo");
  var bar = document.getElementById("bar"), fab = document.getElementById("fab");
  var arch = document.querySelectorAll("[data-arch]");
  var rv = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  var hide = document.querySelectorAll("[data-hide-fab]");
  var raf = null;
  function tick() {
    raf = null;
    var vh = window.innerHeight || 700, y = window.scrollY || 0;
    if (bar) bar.classList.toggle("is-compact", y > 12);
    for (var i = rv.length - 1; i >= 0; i--) {
      var r = rv[i].getBoundingClientRect();
      if (r.top < vh * 0.92) { rv[i].classList.add("in"); rv.splice(i, 1); }
    }
    if (!reduce) for (var k = 0; k < arch.length; k++) {
      var b = arch[k].getBoundingClientRect();
      var p = (vh - b.top) / (vh * 0.55 + b.height * 0.2);
      arch[k].style.setProperty("--p", Math.max(0, Math.min(1, p)).toFixed(3));
    }
    var off = false;
    for (var j = 0; j < hide.length; j++) {
      var h = hide[j].getBoundingClientRect();
      if (h.top < vh * 0.85 && h.bottom > 0) { off = true; break; }
    }
    if (fab) fab.classList.toggle("is-off", off);
  }
  function sched() { if (!raf) raf = requestAnimationFrame(tick); }
  window.addEventListener("scroll", sched, { passive: true });
  window.addEventListener("resize", sched);
  document.addEventListener("DOMContentLoaded", sched);
  sched();
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute("href").length < 2) return;
    var el = document.querySelector(a.getAttribute("href"));
    if (!el) return;
    e.preventDefault();
    var top = el.getBoundingClientRect().top + window.scrollY - (bar ? bar.offsetHeight : 0) - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  });

  /* La llave */
  var box = document.getElementById("llv");
  if (box) {
    var st = { v: "", n: "", img: "", cant: 1, fecha: "" };
    var tag = document.getElementById("tag"), tn = document.getElementById("tag-n"), tm = document.getElementById("tag-m"), tf = document.getElementById("tag-f");
    var timg = document.getElementById("tag-img"), cant = document.getElementById("cant"), unid = document.getElementById("unid"), q2 = document.getElementById("q2");
    var call = document.getElementById("l-call"), ok = document.getElementById("l-ok");
    var MESES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
    function fmt(d) { return d.getDate() + " de " + MESES[d.getMonth()]; }
    function parse(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
    function resumen() {
      if (!st.v) return "";
      var sala = st.v === "sala", t = "Hola, quiero preguntar por: " + st.n + ", ";
      t += sala ? st.cant + (st.cant === 1 ? " persona" : " personas") : st.cant + (st.cant === 1 ? " noche" : " noches");
      if (st.fecha) {
        var d = parse(st.fecha);
        if (sala) t += ", el " + fmt(d);
        else { var o = new Date(d.getTime()); o.setDate(o.getDate() + st.cant); t += ", llegando el " + fmt(d) + " y saliendo el " + fmt(o); }
      }
      return t + ". ¿Cuál es la tarifa?";
    }
    function paint(swing) {
      var sala = st.v === "sala";
      q2.textContent = sala ? "¿Cuántas personas?" : "¿Cuántas noches?";
      unid.textContent = sala ? (st.cant === 1 ? "persona" : "personas") : (st.cant === 1 ? "noche" : "noches");
      cant.textContent = st.cant;
      if (!st.v) { tn.textContent = "Elige arriba"; tm.textContent = "Pregunta la tarifa"; }
      else {
        tn.textContent = st.n;
        var m = sala ? st.cant + (st.cant === 1 ? " persona" : " personas") : st.cant + (st.cant === 1 ? " noche" : " noches");
        if (st.fecha) {
          var d = parse(st.fecha);
          if (sala) m += ", " + fmt(d);
          else { var o = new Date(d.getTime()); o.setDate(o.getDate() + st.cant); m += ": del " + fmt(d) + " al " + fmt(o); }
        }
        tm.textContent = m + ". Pregunta la tarifa.";
        timg.src = "img/" + st.img + "-480.webp";
      }
      tf.textContent = sala ? "Pregunta qué horarios tiene libres la sala." : "Entrada desde las 15:00 y salida a las 12:00.";
      if (swing && !reduce) { tag.classList.remove("swing"); void tag.offsetWidth; tag.classList.add("swing"); }
    }
    box.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest(".sitio");
      if (b) {
        Array.prototype.forEach.call(box.querySelectorAll(".sitio"), function (x) { x.setAttribute("aria-checked", x === b ? "true" : "false"); });
        var was = st.v; st.v = b.dataset.v; st.n = b.dataset.n; st.img = b.dataset.img;
        if ((was === "sala") !== (st.v === "sala")) st.cant = st.v === "sala" ? 8 : 1;
        paint(true);
      }
    });
    document.getElementById("mas").addEventListener("click", function () { var mx = st.v === "sala" ? 40 : 14; st.cant = Math.min(mx, st.cant + 1); paint(true); });
    document.getElementById("menos").addEventListener("click", function () { var mn = 1; st.cant = Math.max(mn, st.cant - 1); paint(true); });
    var fe = document.getElementById("fecha");
    var hoy = new Date(); fe.min = hoy.getFullYear() + "-" + ("0" + (hoy.getMonth() + 1)).slice(-2) + "-" + ("0" + hoy.getDate()).slice(-2);
    fe.addEventListener("change", function () { st.fecha = fe.value; paint(true); });
    document.getElementById("l-copy").addEventListener("click", function () {
      var t = resumen();
      if (!t) { ok.textContent = "Elige primero un cuarto o la sala."; return; }
      function done() { ok.textContent = "Resumen copiado. Pégalo al llamar o al escribir."; }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, function () { ok.textContent = t; });
      else ok.textContent = t;
    });
    paint(false);
  }
})();
