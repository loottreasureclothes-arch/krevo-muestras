(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) root.classList.add("motion");

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

  /* abierto ahora (hora de Aguascalientes) */
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
  var n = ahora(), abierto = n.dia !== 0 && n.min >= 480 && n.min < 870;
  var txt = abierto ? "Abierto ahora · cierra a las 14:30" : (n.dia === 0 ? "Cerrado hoy · abren el lunes a las 8:00" : (n.min < 480 ? "Cerrado ahora · abren a las 8:00" : (n.dia === 6 ? "Cerrado ahora · abren el lunes a las 8:00" : "Cerrado ahora · abren mañana a las 8:00")));
  Array.prototype.forEach.call(document.querySelectorAll("[data-abierto]"), function (el) {
    if (el.classList.contains("big")) {
      el.lastElementChild.innerHTML = "<b>" + txt.split(" · ")[0] + "</b> · " + txt.split(" · ")[1];
    } else {
      el.lastElementChild.innerHTML = "<b>" + txt.split(" · ")[0] + "</b> · " + txt.split(" · ")[1];
    }
    el.firstElementChild.className = "dot " + (abierto ? "on" : "off");
  });
  var hoy = document.querySelector('.horario li[data-dia="' + n.dia + '"]');
  if (hoy) hoy.classList.add("hoy");

  /* flotante Llamar: se esconde donde ya hay botón de Llamar a la vista */
  var fab = document.getElementById("fab"), zonas = document.querySelectorAll("[data-hide-fab], #inicio .hero-btns, #consome .olla-act");
  var raf = 0;
  function upd() {
    raf = 0;
    var vh = window.innerHeight, hide = false;
    Array.prototype.forEach.call(zonas, function (z) {
      var r = z.getBoundingClientRect();
      if (r.top < vh * 0.9 && r.bottom > vh * 0.1) hide = true;
    });
    fab.classList.toggle("off", hide);
  }
  function sched() { if (!raf) raf = requestAnimationFrame(upd); }
  window.addEventListener("scroll", sched, { passive: true });
  window.addEventListener("resize", sched);
  upd();
})();
