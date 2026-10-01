/* 50 · Horario: marca el dia de hoy y dice si estan abiertos (hora de America/Mexico_City) */
(function () {
  "use strict";
  var CS = window.CS;
  if (!CS) return;
  var st = CS.estado();
  var rows = document.querySelectorAll("#hor-body tr");
  Array.prototype.forEach.call(rows, function (r) { if (+r.getAttribute("data-d") === st.dow) r.classList.add("hoy"); });
  var t = document.getElementById("hor-estado-t"), box = document.getElementById("hor-estado");
  if (t) t.textContent = st.texto;
  if (box) box.classList.toggle("cerr", !st.abierto);
})();
