(function () {
  var el = document.getElementById("hh-now"); if (!el) return;
  var h;
  try { h = +new Intl.DateTimeFormat("es-MX", { timeZone: "America/Mexico_City", hour: "numeric", hourCycle: "h23" }).format(new Date()); } catch (e) { h = new Date().getHours(); }
  var t = el.querySelector("span");
  if (h >= 14 && h < 18) { el.classList.add("on"); t.textContent = "Hora feliz ahora. Termina a las 6 p.m."; }
  else if (h >= 13 && h < 14) { t.textContent = "La hora feliz empieza a las 2 p.m."; }
})();
