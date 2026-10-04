/* Abierto ahora, con la hora de Aguascalientes */
(function () {
  "use strict";
  var el = document.getElementById("vis-hoy"); if (!el) return;
  var p = {}; try { new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; }); } catch (e) { return; }
  var d = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[p.weekday], m = (+p.hour) * 60 + (+p.minute);
  var li = document.querySelectorAll(".horas li"), by = {};
  li.forEach(function (x) { by[x.dataset.d] = x; });
  if (by[d]) by[d].classList.add("hoy");
  function mm(s) { var a = s.split(":"); return a[0] * 60 + (+a[1]); }
  var t = by[d], a = t && t.dataset.a, c = t && t.dataset.c;
  if (a && m >= mm(a) && m < mm(c)) { el.textContent = "Abierto ahora · cierra a las " + c; el.classList.add("abierto"); return; }
  if (a && m < mm(a)) { el.textContent = "Cerrado ahora · hoy abre a las " + a; return; }
  for (var i = 1; i <= 7; i++) { var n = by[(d + i) % 7]; if (n && n.dataset.a) { el.textContent = "Cerrado ahora · abre " + (i === 1 ? "mañana" : n.firstChild.textContent.toLowerCase()) + " a las " + n.dataset.a; return; } }
})();
