/* Visítanos: estado en vivo (hora de America/Mexico_City) y el cierre que repite la lista armada en la pirámide. */
(function () {
  "use strict";
  var H = { 0: null, 1: [570, 1200], 2: [570, 1200], 3: [570, 1200], 4: [570, 1200], 5: [570, 1200], 6: [570, 1020] };
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  function fmt(m) { var h = Math.floor(m / 60), mi = m % 60, ap = h >= 12 ? "p.m." : "a.m."; var h12 = h % 12 === 0 ? 12 : h % 12; return h12 + ":" + (mi < 10 ? "0" : "") + mi + " " + ap; }
  function ahora() {
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      var wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
      return { d: wd, m: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
    } catch (e) { var n = new Date(); return { d: n.getDay(), m: n.getHours() * 60 + n.getMinutes() }; }
  }
  function estado() {
    var t = document.getElementById("estado-t"); if (!t) return;
    var n = ahora(), h = H[n.d], box = t.parentNode, txt;
    var rows = document.querySelectorAll(".hor tr");
    Array.prototype.forEach.call(rows, function (r) { r.classList.toggle("hoy", r.getAttribute("data-d").split(",").indexOf(String(n.d)) >= 0); });
    if (h && n.m >= h[0] && n.m < h[1]) { txt = "Abierto ahora · cierra a las " + fmt(h[1]); box.classList.remove("is-cerrado"); }
    else {
      box.classList.add("is-cerrado");
      if (h && n.m < h[0]) txt = "Cerrado ahora · abre hoy a las " + fmt(h[0]);
      else {
        var d = (n.d + 1) % 7, k = 1;
        while (!H[d]) { d = (d + 1) % 7; k++; }
        txt = "Cerrado ahora · abre " + (k === 1 ? "mañana" : "el " + DIAS[d]) + " a las " + fmt(H[d][0]);
      }
    }
    t.textContent = txt;
  }
  estado(); setInterval(estado, 60000);

  var ya = document.getElementById("vi-ya"), det = document.getElementById("vi-det"), wa = document.getElementById("vi-wa"), box = wa && wa.closest(".lista");
  function lista() {
    if (!window.MascoLista || !ya) return;
    var g = window.MascoLista.get();
    if (g.hay) {
      ya.textContent = "Tu lista ya está.";
      det.textContent = (g.busco ? "Busco: " + g.busco + ". " : "") + (g.para ? "Para: " + g.para + ". " : "") + (g.nombre ? "Nombre: " + g.nombre + "." : "");
    } else { ya.textContent = "Falta elegir un bloque."; det.textContent = ""; }
    box.classList.toggle("hay", g.hay);
    wa.href = window.MascoLista.url();
  }
  if (window.MascoLista) { window.MascoLista.on(lista); lista(); }
  function sync() { if (window.MascoLista) wa.href = window.MascoLista.url(); }
  if (wa) { wa.addEventListener("pointerdown", sync); wa.addEventListener("click", sync); }
})();
