/* Abierto ahora con la hora de Aguascalientes (8:30 a 14:00 todos los días) */
(function () {
  var el = document.getElementById("vi-now"); if (!el) return;
  var d;
  try { d = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" })); } catch (e) { d = new Date(); }
  var day = d.getDay(), m = d.getHours() * 60 + d.getMinutes(), open = 510, close = 840;
  var li = document.querySelector('#vi-days li[data-day="' + day + '"]'); if (li) li.classList.add("today");
  var s = el.querySelector("span");
  if (m >= open && m < close) { el.classList.add("on"); s.textContent = "Abierto ahora · Cierra a las 2:00 p. m."; }
  else { el.classList.add("off"); s.textContent = m < open ? "Cerrado ahora · Abre hoy a las 8:30 a. m." : "Cerrado ahora · Abre mañana a las 8:30 a. m."; }
})();
