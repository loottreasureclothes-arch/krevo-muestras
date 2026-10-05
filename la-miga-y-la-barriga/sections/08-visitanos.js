(function () {
  var D = {
    norte: { dir: "Sierra de Pinos 112, Bosques del Prado Sur, Aguascalientes", q: "La+Miga+y+la+Barriga+Sierra+de+Pinos+112+Aguascalientes",
      h: [["Lunes a viernes", "9:00 a 21:00", [1, 2, 3, 4, 5]], ["Sábado", "10:00 a 16:00", [6]], ["Domingo", "Cerrado", [0]]],
      open: { 1: [9, 21], 2: [9, 21], 3: [9, 21], 4: [9, 21], 5: [9, 21], 6: [10, 16] }, nota: "Pedir en línea, retiro en puerta y entrega a domicilio." },
    sur: { dir: "Miguel Caldera 320 A, Aguascalientes", q: "La+Miga+y+la+Barriga+Sur+Miguel+Caldera+320+A+Aguascalientes",
      h: [["Cierra", "21:00", []]], open: null, nota: "Solo para llevar, sin consumo en el local. Pregúntanos el horario completo del Sur." }
  };
  var tabs = document.querySelectorAll(".vt"), cur = "norte";
  function nowMx() {
    var f = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date()), o = {};
    f.forEach(function (p) { o[p.type] = p.value; });
    return { d: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday), h: (+o.hour % 24) + (+o.minute) / 60 };
  }
  function paint() {
    var c = D[cur], n = nowMx(), ul = document.getElementById("vis-hrs"), op = document.getElementById("vis-open");
    ul.innerHTML = c.h.map(function (r) { return '<li class="' + (r[2].indexOf(n.d) > -1 ? "today" : "") + '"><span>' + r[0] + "</span><span>" + r[1] + "</span></li>"; }).join("");
    document.getElementById("vis-dir").textContent = c.dir;
    document.getElementById("vis-nota").textContent = c.nota;
    document.getElementById("vis-ruta").href = "https://www.google.com/maps/dir/?api=1&destination=" + c.q;
    if (c.open) { var t = c.open[n.d], on = t && n.h >= t[0] && n.h < t[1]; op.textContent = on ? "Abierto ahora" : "Cerrado ahora"; op.className = "vis-open" + (on ? " on" : ""); }
    else { op.textContent = "Cierra a las 9 p.m."; op.className = "vis-open"; }
  }
  [].forEach.call(tabs, function (b) {
    b.addEventListener("click", function () {
      cur = b.getAttribute("data-k");
      [].forEach.call(tabs, function (x) { var on = x === b; x.classList.toggle("is-on", on); x.setAttribute("aria-selected", on); });
      document.getElementById("vis-frame").src = "https://www.google.com/maps?q=" + D[cur].q + "&output=embed";
      paint();
    });
  });
  paint();
})();
