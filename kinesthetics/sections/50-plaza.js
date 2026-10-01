/* Marca el dia de hoy (hora de Mexico) en la tabla del horario. Sin "abierto ahora" ni cuenta regresiva. */
(function () {
  "use strict";
  var rows = document.querySelectorAll(".ks-hours tr[data-dow]");
  if (!rows.length) return;
  var dow = null;
  try {
    var wd = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short" }).format(new Date());
    dow = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[wd];
  } catch (e) { dow = new Date().getDay(); }
  Array.prototype.forEach.call(rows, function (r) {
    if (String(dow) === r.getAttribute("data-dow")) {
      r.classList.add("is-today");
      var th = r.querySelector("th"); if (th) th.insertAdjacentHTML("beforeend", '<span class="ks-sr"> (hoy)</span>');
    }
  });
})();
