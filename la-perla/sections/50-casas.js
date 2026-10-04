(function () {
  "use strict";
  // Horario con la hora de Aguascalientes (America/Mexico_City)
  var H = { centro: { c: 3, a: 12 }, poniente: { c: 2, a: 11 } };
  var DN = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var d, h;
  try {
    var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
    var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
    d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday); h = (+o.hour % 24) + (+o.minute) / 60;
  } catch (e) { var n = new Date(); d = n.getDay(); h = n.getHours() + n.getMinutes() / 60; }
  function fmt(a) { return a === 12 ? "12 p.m" : a + " a.m"; }
  function next(x) { for (var i = 1; i < 8; i++) { var m = (d + i) % 7; if (m !== x.c) return i === 1 ? "mañana" : "el " + DN[m]; } }
  Array.prototype.forEach.call(document.querySelectorAll("[data-hoy]"), function (el) {
    var k = el.getAttribute("data-hoy"), x = H[k], t, open = false;
    if (d === x.c) t = "Hoy cerrado. Abre " + next(x) + " a las " + fmt(x.a) + ".";
    else if (h < x.a) t = "Hoy abre a las " + fmt(x.a) + ".";
    else if (h < 19) { t = "Abierto ahora · cierra a las 7 p.m."; open = true; }
    else t = "Cerrado. Abre " + next(x) + " a las " + fmt(x.a) + ".";
    el.textContent = t; if (open) el.classList.add("is-open");
  });
  Array.prototype.forEach.call(document.querySelectorAll("[data-week]"), function (ul) {
    var x = H[ul.getAttribute("data-week")];
    Array.prototype.forEach.call(ul.children, function (li) {
      var dd = +li.getAttribute("data-d");
      if (dd === x.c) li.classList.add("is-closed");
      if (dd === d) li.classList.add("is-today");
    });
  });
  // pestañas por sucursal
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".lp-tabs [role=tab]"));
  function sel(t) {
    tabs.forEach(function (b) {
      var on = b === t; b.setAttribute("aria-selected", on); b.tabIndex = on ? 0 : -1;
      document.getElementById(b.getAttribute("aria-controls")).hidden = !on;
    });
  }
  tabs.forEach(function (b, i) {
    b.addEventListener("click", function () { sel(b); });
    b.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") { var n = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length]; sel(n); n.focus(); }
    });
  });
  // abre en la casa que esté abierta hoy si la otra cierra
  if (d === H.centro.c) sel(tabs[1]);
})();
