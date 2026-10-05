(function () {
  var html = document.documentElement, body = document.body;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* header: se vuelve solido al bajar */
  var hd = document.getElementById("hd");
  function onScroll() { hd.classList.toggle("is-solid", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* menu */
  var btn = document.querySelector(".hd-btn"), menu = document.getElementById("menu");
  function setMenu(open) {
    body.classList.toggle("hd-menu-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    menu.setAttribute("aria-hidden", open ? "false" : "true");
    btn.querySelector(".lbl").textContent = open ? "Cerrar" : "Menú";
  }
  btn.addEventListener("click", function () { setMenu(!body.classList.contains("hd-menu-open")); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* reveal: visible a los 1.6 s pase lo que pase */
  var els = document.querySelectorAll("[data-reveal], [data-roof]");
  if (!reduce && "IntersectionObserver" in window) {
    html.classList.add("rv");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        var el = en.target;
        if (el.hasAttribute("data-roof")) el.classList.toggle("is-in", en.isIntersecting);
        else if (en.isIntersecting) { el.classList.add("is-in"); io.unobserve(el); }
      });
    }, { threshold: 0.18 });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
    setTimeout(function () { Array.prototype.forEach.call(els, function (el) { el.classList.add("is-in"); }); }, 1600);
  }

  /* flotante de llamar: se esconde cuando ya hay un boton de llamar a la vista */
  var fab = document.getElementById("fab"), seen = new Set();
  if ("IntersectionObserver" in window && fab) {
    var fo = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) seen.add(en.target); else seen.delete(en.target); });
      fab.classList.toggle("is-off", seen.size > 0);
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-hide-fab]"), function (el) { fo.observe(el); });
  }

  /* abierto ahora: 12:00 a 19:30 todos los dias, hora de Aguascalientes */
  function ahora() {
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      var dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      return { dow: dias[o.weekday], min: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
    } catch (e) { var d = new Date(); return { dow: d.getDay(), min: d.getHours() * 60 + d.getMinutes() }; }
  }
  var n = ahora(), abierto = n.min >= 720 && n.min < 1170;
  Array.prototype.forEach.call(document.querySelectorAll("[data-open]"), function (el) {
    el.classList.add(abierto ? "is-open" : "is-closed");
    el.textContent = abierto ? "Abierto ahora, hasta las 19:30" : (n.min < 720 ? "Cerrado ahora, abren hoy a las 12:00" : "Cerrado ahora, abren mañana a las 12:00");
  });
  Array.prototype.forEach.call(document.querySelectorAll(".horas li"), function (li) {
    if (parseInt(li.getAttribute("data-dow"), 10) === n.dow) li.classList.add("is-today");
  });
})();
