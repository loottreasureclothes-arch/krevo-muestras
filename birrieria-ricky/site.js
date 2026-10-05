/* Birriería Ricky: menú, reveal, momento firma, horario y La mesa de Ricky */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* menú */
  var btn = $("#hd-btn"), menu = $("#hd-menu");
  function setMenu(open) {
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    if (open) menu.removeAttribute("hidden"); else menu.setAttribute("hidden", "");
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (btn && menu) {
    btn.addEventListener("click", function () { setMenu(btn.getAttribute("aria-expanded") !== "true"); });
    $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    window.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    window.addEventListener("resize", function () { if (innerWidth >= 760) setMenu(false); });
  }

  /* reveal y momento firma: visibles a los 1.6 s pase lo que pase */
  var els = $$("[data-reveal], .fach-ph");
  if (!reduce && "IntersectionObserver" in window) {
    document.documentElement.classList.add("rv");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.target.classList.contains("fach-ph")) e.target.classList.toggle("in", e.isIntersecting);
        else if (e.isIntersecting) e.target.classList.add("in");
      });
    }, { threshold: 0.18 });
    els.forEach(function (el) { io.observe(el); });
    setTimeout(function () {
      els.forEach(function (el) { if (!el.classList.contains("fach-ph")) el.classList.add("in"); });
    }, 1600);
  }

  /* horario y abierto ahora (hora de Aguascalientes) */
  var H = { 0: [8.5, 15], 1: [9, 16.5], 2: [9, 16.5], 3: [9, 16.5], 4: null, 5: [9, 16.5], 6: [8.5, 16] };
  function fmt(h) { var m = Math.round((h % 1) * 60), hh = Math.floor(h); return hh + ":" + (m < 10 ? "0" : "") + m; }
  function nowMx() {
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      var d = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
      return { d: d, h: (parseInt(o.hour, 10) % 24) + parseInt(o.minute, 10) / 60 };
    } catch (e) { var n = new Date(); return { d: n.getDay(), h: n.getHours() + n.getMinutes() / 60 }; }
  }
  function horario() {
    var t = nowMx(), s = H[t.d], el = $("#v-now");
    $$("#hor tr").forEach(function (tr) { tr.classList.toggle("hoy", +tr.getAttribute("data-d") === t.d); });
    if (!el) return;
    var txt, cls;
    if (s && t.h >= s[0] && t.h < s[1]) { txt = "Abierto ahora, hasta las " + fmt(s[1]); cls = "open"; }
    else if (s && t.h < s[0]) { txt = "Cerrado ahora, abre hoy a las " + fmt(s[0]); cls = "closed"; }
    else {
      var n = 1; while (n < 7 && !H[(t.d + n) % 7]) n++;
      var nd = (t.d + n) % 7, dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
      txt = "Cerrado ahora, abre " + (n === 1 ? "mañana" : "el " + dias[nd]) + " a las " + fmt(H[nd][0]); cls = "closed";
    }
    el.textContent = txt; el.className = "v-now " + cls;
  }
  horario(); setInterval(horario, 60000);

  /* La mesa de Ricky */
  var app = $("#mesa-app");
  if (app) {
    var NOM = { tacos: "tacos de birria", consome: "consomé", plato: "plato de birria", dorados: "tacos dorados" };
    var EXN = { cebolla: "cebolla", cilantro: "cilantro", limon: "limón", salsa: "salsa", tortillas: "más tortillas" };
    var st = { plato: null, cant: 1, extras: {} };
    var a = $("#plato-a"), plato = $("#plato"), cap = $("#plato-cap");
    var imgNow = "12c";
    plato.classList.add("empty");
    function swap(name) {
      if (name === imgNow) return;
      imgNow = name; st.spin = (st.spin || 0) + 14;
      a.style.opacity = "0.15";
      setTimeout(function () { a.src = "img/" + name + "-960.webp"; a.style.opacity = ""; }, 160);
      plato.style.transform = "rotate(" + st.spin + "deg)";
      a.style.transform = "rotate(" + (-st.spin) + "deg)";
    }
    function lista(arr) { return arr.length < 2 ? arr.join("") : arr.slice(0, -1).join(", ") + " y " + arr[arr.length - 1]; }
    function texto() {
      if (!st.plato) return "";
      var ex = Object.keys(EXN).filter(function (k) { return st.extras[k]; }).map(function (k) { return EXN[k]; });
      return st.cant + " de " + NOM[st.plato] + (ex.length ? ", con " + lista(ex) : "");
    }
    function pinta() {
      var t = texto(), has = !!t;
      $("#papel-t").textContent = has ? t.charAt(0).toUpperCase() + t.slice(1) + "." : "Elige arriba";
      $("#papel-tot").textContent = has ? "Pregunta el precio" : "Elige arriba";
      $("#cant").textContent = st.cant;
      cap.textContent = has ? NOM[st.plato] : "Elige arriba";
      plato.classList.toggle("empty", !has);
      $("#copiar").setAttribute("aria-disabled", has ? "false" : "true");
      $$(".orb", plato).forEach(function (o) { o.classList.toggle("on", !!st.extras[o.getAttribute("data-orb")]); });
      $("#papel-ok").textContent = "";
    }
    $$(".opt", app).forEach(function (o) {
      o.addEventListener("click", function () {
        st.plato = o.getAttribute("data-plato");
        $$(".opt", app).forEach(function (x) { x.setAttribute("aria-pressed", x === o ? "true" : "false"); });
        swap(o.getAttribute("data-img")); pinta();
      });
    });
    $("#menos").addEventListener("click", function () { st.cant = Math.max(1, st.cant - 1); pinta(); });
    $("#mas").addEventListener("click", function () { st.cant = Math.min(20, st.cant + 1); pinta(); });
    $$(".tazon", app).forEach(function (t) {
      t.addEventListener("click", function () {
        var k = t.getAttribute("data-extra"); st.extras[k] = !st.extras[k];
        t.setAttribute("aria-pressed", st.extras[k] ? "true" : "false"); pinta();
      });
    });
    $("#copiar").addEventListener("click", function (e) {
      e.preventDefault();
      var ok = $("#papel-ok"), t = texto();
      if (!t) { ok.textContent = "Elige arriba tu plato primero."; ok.style.color = "#a60819"; return; }
      var msg = "Hola, Birriería Ricky. Mi pedido: " + t + ". ¿Cuánto es?";
      ok.style.color = "";
      function listo() { ok.textContent = "Copiado. Dícteselo al mesero o por teléfono."; }
      function viejo() {
        var ta = document.createElement("textarea"); ta.value = msg; ta.setAttribute("readonly", "");
        ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy") ? listo() : (ok.textContent = msg); } catch (x) { ok.textContent = msg; }
        document.body.removeChild(ta);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(msg).then(listo, viejo); else viejo();
    });
    pinta();
  }
})();
