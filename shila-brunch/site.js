/* Shila Brunch: menu, reveal, WhatsApp flotante, horario en vivo, "¿Cómo amaneciste?" */
(function () {
  "use strict";
  var WA = "524495494089";
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(m) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(m); }
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* menu */
  var btn = $("#mbtn"), menu = $("#menu");
  function setMenu(o) {
    document.body.classList.toggle("menu-open", o);
    btn.setAttribute("aria-expanded", o ? "true" : "false");
    $(".mbtn-l", btn).textContent = o ? "Cerrar" : "Menú";
    document.body.style.overflow = o ? "hidden" : "";
  }
  if (btn && menu) {
    menu.hidden = false;
    btn.addEventListener("click", function () { setMenu(!document.body.classList.contains("menu-open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  }
  /* anclas sin scroll-behavior en CSS */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var h = a.getAttribute("href"); if (h.length < 2) return;
    var el = $(h); if (!el) return;
    e.preventDefault(); setMenu(false);
    var top = el.getBoundingClientRect().top + window.scrollY - (h === "#top" ? 0 : 62);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  });

  /* reveal: CSS base = visible; solo se esconde si hay JS y movimiento permitido */
  var els = $$("[data-reveal]");
  if (!reduce && "IntersectionObserver" in window && els.length) {
    root.classList.add("js-rv");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* momento firma: el sol sale detras de la foto y sube un poco con el scroll (reversible) */
  var sol = $(".sol");
  if (sol && !reduce) {
    sol.classList.add("sol-pre");
    requestAnimationFrame(function () { requestAnimationFrame(function () { sol.classList.remove("sol-pre"); }); });
    setTimeout(function () { sol.classList.remove("sol-pre"); }, 1500);
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var y = Math.min(window.scrollY, 500);
        sol.style.transition = "none";
        sol.style.transform = "translateY(" + (-y * 0.18).toFixed(1) + "px)";
      });
    }, { passive: true });
  }

  /* WhatsApp flotante: se esconde donde ya hay un boton grande */
  var zones = $$("[data-hide-wa]");
  function waVis() {
    var vh = window.innerHeight, on = false;
    zones.forEach(function (z) { var r = z.getBoundingClientRect(); if (r.top < vh * 0.75 && r.bottom > 0) on = true; });
    document.body.classList.toggle("wa-off", on);
  }
  window.addEventListener("scroll", waVis, { passive: true }); window.addEventListener("resize", waVis); waVis();

  /* horario en vivo (hora de Aguascalientes) */
  function mx() {
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      var d = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
      return { d: d, m: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
    } catch (e) { var n = new Date(); return { d: n.getDay(), m: n.getHours() * 60 + n.getMinutes() }; }
  }
  var DN = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  function opens(d) { return d !== 2; }
  function paintOpen() {
    var t = mx(), open = opens(t.d) && t.m >= 480 && t.m < 900, txt, sub = "";
    if (open) { txt = "Abierto ahora"; sub = " · cerramos a las 3 p.m."; }
    else {
      txt = "Cerrado ahora"; var n = t.d, add = 0;
      if (opens(t.d) && t.m < 480) { sub = " · abrimos hoy a las 8 a.m."; }
      else { do { n = (n + 1) % 7; add++; } while (!opens(n)); sub = " · abrimos " + (add === 1 ? "mañana" : "el " + DN[n]) + " a las 8 a.m."; }
    }
    $$("[data-open]").forEach(function (el) {
      el.classList.toggle("is-open", open); el.classList.toggle("is-closed", !open);
      var b = $("b", el), s = el.lastElementChild;
      if (el.classList.contains("open-lg")) { b.textContent = txt; s.textContent = sub; }
    });
    $$("#hours li").forEach(function (li) { li.classList.toggle("today", parseInt(li.getAttribute("data-d"), 10) === t.d); });
  }
  paintOpen(); setInterval(paintOpen, 60000);

  /* ¿Cómo amaneciste? */
  var st = { dish: "Hotcakes con fresas", mood: "dulce", n: 2, h: 9 }, MI = ["dulce", "salado", "yuca", "hambre", "caldo"];
  function paintAm() {
    if (!$("#amWa")) return;
    $$(".m-ph").forEach(function (p) { p.classList.toggle("on", p.getAttribute("data-m") === st.mood); });
    $$("[data-mood]").forEach(function (c) { var on = c.getAttribute("data-mood") === st.mood; c.classList.toggle("on", on); c.setAttribute("aria-pressed", on); });
    $$("[data-hora]").forEach(function (c) { var on = +c.getAttribute("data-hora") === st.h; c.classList.toggle("on", on); c.setAttribute("aria-pressed", on); });
    $("#amDish").textContent = st.dish; $("#tkD").textContent = st.dish;
    $("#amN").textContent = st.n; $("#tkN").textContent = st.n;
    $("#amU").textContent = st.n === 1 ? "persona" : "personas";
    $("#tkH").textContent = st.h + ":00 h";
    $("#amSun").style.transform = "rotate(" + (MI.indexOf(st.mood) * 72) + "deg)";
    $("#amWa").href = waUrl("Hola Shila, se me antoja " + st.dish + ". Somos " + st.n + " y llegamos a las " + st.h + ":00 h. ¿Nos apartan mesa?");
  }
  $$("[data-mood]").forEach(function (c) { c.addEventListener("click", function () { st.mood = c.getAttribute("data-mood"); st.dish = c.getAttribute("data-dish"); paintAm(); }); });
  $$("[data-hora]").forEach(function (c) { c.addEventListener("click", function () { st.h = +c.getAttribute("data-hora"); paintAm(); }); });
  var mas = $("#amMas"), menos = $("#amMenos");
  if (mas) mas.addEventListener("click", function () { st.n = Math.min(12, st.n + 1); paintAm(); });
  if (menos) menos.addEventListener("click", function () { st.n = Math.max(1, st.n - 1); paintAm(); });
  paintAm();
  window.__shila = st;
})();
