/* Marca el renglón de hoy en el horario (hora de America/Mexico_City). */
(function () {
  "use strict";
  var rows = document.querySelectorAll("#pr-hrs-t tr[data-d]");
  if (!rows.length) return;
  var dia = null;
  try {
    var w = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "America/Mexico_City" }).format(new Date());
    dia = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[w];
  } catch (e) { dia = new Date().getDay(); }
  if (dia == null) return;
  Array.prototype.forEach.call(rows, function (r) {
    var on = r.getAttribute("data-d").split(",").indexOf(String(dia)) > -1;
    r.classList.toggle("is-hoy", on);
    var th = r.querySelector("th"); if (on && th) th.setAttribute("aria-label", th.textContent + ", hoy");
  });
})();
