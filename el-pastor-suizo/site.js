(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* menu */
  var btn = document.getElementById("hdr-menu"), menu = document.getElementById("menu");
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    menu.hidden = !open;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }
  btn.addEventListener("click", function () { setMenu(menu.hidden); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) setMenu(false); });
  window.addEventListener("resize", function () { if (innerWidth >= 820) { document.body.classList.remove("menu-open"); } });

  /* reveal: CSS base = visible; se esconde solo con JS y sin reduced-motion */
  var els = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  function show(el) { el.classList.add("in"); }
  if (!reduce && "IntersectionObserver" in window) {
    root.classList.add("rvon");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
    setTimeout(function () {
      var vh = window.innerHeight;
      els.forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < vh && r.bottom > 0) show(el); });
    }, 1600);
    setTimeout(function () { els.forEach(show); }, 6000);
  }

  /* abierto ahora (hora de Aguascalientes). Lun a jue y dom 17:00 a 24:00; vie y sab 17:00 a 1:00 */
  var CIERRE = { 0: 24, 1: 24, 2: 24, 3: 24, 4: 24, 5: 25, 6: 25 };
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  function ahora() {
    var d = new Date(), dia = d.getDay(), min = d.getHours() * 60 + d.getMinutes();
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(d);
      var h = 0, m = 0, w = "";
      p.forEach(function (x) { if (x.type === "hour") h = +x.value % 24; if (x.type === "minute") m = +x.value; if (x.type === "weekday") w = x.value; });
      dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(w);
      min = h * 60 + m;
    } catch (e) {}
    return { dia: dia, min: min };
  }
  var n = ahora(), ayer = (n.dia + 6) % 7, abierto = false, txt;
  if (n.min >= 17 * 60 && n.min < CIERRE[n.dia] * 60) abierto = true;
  else if (CIERRE[ayer] > 24 && n.min < (CIERRE[ayer] - 24) * 60) { abierto = true; n.dia = ayer; }
  if (abierto) {
    var c = CIERRE[n.dia];
    txt = "Abierto ahora|cierra a las " + (c > 24 ? "1:00 am" : "12:00 am");
  } else if (n.min < 17 * 60) {
    txt = "Cerrado ahora|abren hoy a las 5:00 pm";
  } else {
    txt = "Cerrado ahora|abren mañana a las 5:00 pm";
  }
  Array.prototype.forEach.call(document.querySelectorAll("[data-abierto]"), function (el) {
    var t = txt.split("|");
    el.lastElementChild.innerHTML = "<b>" + t[0] + "</b> · " + t[1];
    el.firstElementChild.className = "dot " + (abierto ? "on" : "off");
  });
  var hoy = document.querySelector('.horario li[data-dia="' + ahora().dia + '"]');
  if (hoy) hoy.classList.add("hoy");

  /* flotante de WhatsApp: se esconde donde ya hay botón de WhatsApp a la vista */
  var fab = document.getElementById("fab"), zonas = document.querySelectorAll("[data-hide-fab], .hero-btns, .carta-cta, #tr-wa, #combos .btn.wa, .ft-cta, .vis-btns");
  var raf = 0;
  function upd() {
    raf = 0;
    var vh = window.innerHeight, hide = false;
    Array.prototype.forEach.call(zonas, function (z) {
      var r = z.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > vh * 0.08) hide = true;
    });
    fab.classList.toggle("off", hide);
  }
  function sched() { if (!raf) raf = requestAnimationFrame(upd); }
  window.addEventListener("scroll", sched, { passive: true });
  window.addEventListener("resize", sched);
  upd();
})();
