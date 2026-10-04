(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var TEL = "tel:+524499789000", MAIL = "salonfjardin@hotmail.com";
  var root = document.documentElement;
  var motionOK = !window.matchMedia || window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

  /* momento firma: el arco del hero se abre al entrar (resuelto a 1.6 s) */
  if (motionOK) {
    root.classList.add("js-pre");
    var open = function () { root.classList.remove("js-pre"); };
    requestAnimationFrame(function () { requestAnimationFrame(open); });
    setTimeout(open, 1600);
  }

  /* reveal */
  if (motionOK && "IntersectionObserver" in window) {
    root.classList.add("js-rv");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -6% 0px" });
    $$("[data-reveal]").forEach(function (el) { io.observe(el); });
    setTimeout(function () { $$("[data-reveal]").forEach(function (el) { el.classList.add("in"); }); }, 1600);
  }

  /* menu */
  var btn = $("[data-menu-btn]"), menu = $("[data-menu]");
  function setMenu(o) {
    if (!btn || !menu) return;
    btn.setAttribute("aria-expanded", o ? "true" : "false");
    btn.firstElementChild.textContent = o ? "Cerrar" : "Menú";
    if (o) { menu.hidden = false; requestAnimationFrame(function () { menu.classList.add("open"); }); }
    else { menu.classList.remove("open"); setTimeout(function () { if (!menu.classList.contains("open")) menu.hidden = true; }, 260); }
  }
  if (btn) btn.addEventListener("click", function () { setMenu(btn.getAttribute("aria-expanded") !== "true"); });
  if (menu) menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* flotante: se esconde cuando ya hay botones de llamar a la vista */
  var fab = $("[data-fab]");
  var zones = $$("#visitanos, #pie");
  var ctas = $$(".btns, .resumen, .more");
  function fabTick() {
    var vh = window.innerHeight, hide = false;
    zones.forEach(function (z) { var r = z.getBoundingClientRect(); if (r.top < vh * .55 && r.bottom > vh * .2) hide = true; });
    ctas.forEach(function (z) { var r = z.getBoundingClientRect(); if (r.bottom > vh - 96 && r.top < vh) hide = true; });
    if (fab) fab.classList.toggle("hide", hide);
  }
  var raf = 0;
  window.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(function () { raf = 0; fabTick(); }); }, { passive: true });
  fabTick();

  /* componente firma: arma tu montaje */
  var NOM = { infantil: "Fiesta infantil", xv: "XV años", baby: "Baby shower", boda: "Boda", graduacion: "Graduación", cumple: "Cumpleaños" };
  var st = { t: "infantil", n: 80, d: "entre semana" };
  var plan = $("[data-plan]");
  var SVGNS = "http://www.w3.org/2000/svg";
  function el(tag, attrs) { var e = document.createElementNS(SVGNS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }
  var mesas = [];
  function buildPlan() {
    if (!plan) return;
    var cols = 5, rows = 3, cw = 56, ch = 46, ox = (300 - cols * cw) / 2, oy = 22;
    plan.appendChild(el("rect", { x: 112, y: 168, width: 76, height: 20, fill: "#d4b56a", "fill-opacity": ".14" }));
    var lb = el("text", { x: 150, y: 181.5, "text-anchor": "middle", fill: "#e7cf93", "font-size": "8", "letter-spacing": "2", "font-family": "Figtree, sans-serif", "font-weight": "700" }); lb.textContent = "ENTRADA"; plan.appendChild(lb);
    for (var i = 0; i < cols * rows; i++) {
      var cx = ox + (i % cols) * cw + cw / 2, cy = oy + Math.floor(i / cols) * ch + ch / 2 + 10;
      plan.appendChild(el("circle", { cx: cx, cy: cy, r: 17, fill: "none", stroke: "#d4b56a", "stroke-opacity": ".28", "stroke-dasharray": "2 3" }));
      var g = el("g", { "class": "mesa", opacity: 0 });
      g.appendChild(el("circle", { cx: cx, cy: cy, r: 11, fill: "#d4b56a" }));
      g.appendChild(el("circle", { cx: cx, cy: cy, r: 7, fill: "#f4ecd8", opacity: ".9" }));
      var chairs = [];
      for (var k = 0; k < 10; k++) {
        var a = k / 10 * Math.PI * 2 - Math.PI / 2;
        var c = el("circle", { cx: (cx + Math.cos(a) * 17).toFixed(1), cy: (cy + Math.sin(a) * 17).toFixed(1), r: 3, fill: "#e7cf93" });
        g.appendChild(c); chairs.push(c);
      }
      plan.appendChild(g); mesas.push({ g: g, chairs: chairs });
    }
  }
  function paintPlan() {
    var full = Math.floor(st.n / 10), rest = st.n % 10;
    var total = full + (rest ? 1 : 0);
    mesas.forEach(function (m, i) {
      var on = i < total;
      m.g.setAttribute("opacity", on ? 1 : 0);
      m.g.style.transform = on ? "scale(1)" : "scale(.6)";
      var seats = i < full ? 10 : (i === full ? rest : 0);
      m.chairs.forEach(function (c, k) { c.setAttribute("opacity", k < seats ? 1 : .15); });
    });
    return total;
  }
  var PH = {
    infantil: ["img/infantil-960.webp", "Salón con banderines azul y rojo para fiesta infantil", 2048, 1536],
    xv: ["img/xv-960.webp", "Montaje rosa y blanco con moños para XV años", 960, 720],
    baby: ["img/xv-960.webp", "Montaje rosa y blanco para baby shower", 960, 720],
    boda: ["img/elegante-960.webp", "Montaje elegante con luces para boda", 2048, 1536],
    graduacion: ["img/salon-750.webp", "Salón con mesas redondas y sillas vestidas", 750, 753],
    cumple: ["img/jardin-960.webp", "Jardín cubierto con mesas de madera", 1170, 709]
  };
  var shown = "infantil", ph = $("[data-ph]");
  function swapPhoto() {
    if (!ph || shown === st.t) return;
    var want = st.t, d = PH[want];
    shown = want;
    ph.style.opacity = 0; ph.style.transform = "scale(1.05)";
    var pre = new Image();
    var go = function () {
      if (shown !== want) return;
      ph.src = d[0]; ph.alt = d[1]; ph.width = d[2]; ph.height = d[3];
      ph.style.opacity = 1; ph.style.transform = "none";
    };
    pre.onload = function () { setTimeout(go, 160); }; pre.onerror = go;
    pre.src = d[0];
  }
  function render() {
    var total = paintPlan();
    $("[data-n]").textContent = st.n + " invitados";
    $("[data-mesas]").textContent = total + " mesas redondas de 10 personas, aproximado.";
    $("[data-tag]").textContent = NOM[st.t];
    swapPhoto();
    $$(".chip").forEach(function (c) { c.classList.toggle("on", c.getAttribute("data-t") === st.t); });
    $$(".seg").forEach(function (c) { var on = c.getAttribute("data-d") === st.d; c.classList.toggle("on", on); c.setAttribute("aria-checked", on ? "true" : "false"); });
    var note = $("[data-dianote]");
    note.textContent = (st.t === "infantil")
      ? (st.d === "entre semana" ? "Para fiestas infantiles hay precio especial de lunes a jueves." : "El precio especial infantil es de lunes a jueves. Pregunta por tu fecha.")
      : "Pregunta el precio para tu fecha.";
    var art = (st.t === "xv") ? "XV años" : (st.t === "baby" ? "baby shower" : (st.t === "boda" ? "boda" : (st.t === "graduacion" ? "graduación" : (st.t === "cumple" ? "cumpleaños" : "fiesta infantil"))));
    $("[data-resumen]").textContent = NOM[st.t] + " · " + st.n + " invitados · " + st.d;
    var msg = "Hola, quiero cotizar una fiesta (" + art + ") para " + st.n + " invitados, un día " + (st.d === "entre semana" ? "entre semana (lunes a jueves)" : "de viernes a domingo") + ". ¿Qué fechas tienen disponibles?";
    $("[data-mail]").setAttribute("href", "mailto:" + MAIL + "?subject=" + encodeURIComponent("Cotización de fiesta") + "&body=" + encodeURIComponent(msg));
    $("[data-call]").setAttribute("href", TEL);
  }
  if (plan) {
    buildPlan();
    $$(".chip").forEach(function (c) { c.addEventListener("click", function () { st.t = c.getAttribute("data-t"); render(); }); });
    $$(".seg").forEach(function (c) { c.addEventListener("click", function () { st.d = c.getAttribute("data-d"); render(); }); });
    $("[data-range]").addEventListener("input", function (e) { st.n = parseInt(e.target.value, 10); render(); });
    $$("[data-tipo]").forEach(function (a) { a.addEventListener("click", function () { st.t = a.getAttribute("data-tipo"); render(); }); });
    render();
  }

  /* horario: abierto ahora (hora de Aguascalientes) */
  function horario() {
    var ab = $("[data-abierto]"); if (!ab) return;
    var parts;
    try {
      parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
    } catch (e) { parts = null; }
    var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }, d, h = 0, m = 0;
    if (parts) { parts.forEach(function (p) { if (p.type === "weekday") d = map[p.value]; if (p.type === "hour") h = parseInt(p.value, 10) % 24; if (p.type === "minute") m = parseInt(p.value, 10); }); }
    else { var n = new Date(); d = n.getDay(); h = n.getHours(); m = n.getMinutes(); }
    var open = h >= 10 && h < 18;
    ab.classList.add(open ? "si" : "no");
    ab.lastElementChild.textContent = open ? "Abierto ahora · cierra a las 6 p.m." : "Cerrado ahora · abre a las 10 a.m.";
    $$("[data-horas] li").forEach(function (li) { if (parseInt(li.getAttribute("data-d"), 10) === d) li.classList.add("hoy"); });
  }
  horario();
})();
