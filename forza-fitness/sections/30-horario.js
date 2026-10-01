/* 30-horario: calcula la proxima clase con la hora de America/Mexico_City, enciende su celda,
   actualiza el texto vivo cada minuto y mete la clase tocada al mensaje de WhatsApp. */
(function () {
  "use strict";
  var FZ = window.FZ;
  var board = document.querySelector(".fz-tbl");
  if (!FZ || !board) return;
  var NOMBRES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var ABREV = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
  var cells = Array.prototype.slice.call(board.querySelectorAll(".fz-cell"));
  var heads = Array.prototype.slice.call(board.querySelectorAll(".fz-dh"));
  var classes = cells.map(function (c) {
    return { el: c, dow: +c.getAttribute("data-dow"), h: +c.getAttribute("data-h"), coach: c.getAttribute("data-coach") };
  });
  var nextBox = document.getElementById("fz-next");
  var nextTitle = document.getElementById("fz-h-next");
  var selBox = document.getElementById("fz-sel");

  function labelOf(c) { return ABREV[c.dow] + " " + FZ.fmt12(c.h, 0); }

  function nextClass() {
    var t = FZ.mx();
    var best = null;
    for (var off = 0; off <= 7 && !best; off++) {
      var dow = (t.dow + off) % 7;
      var today = classes.filter(function (c) { return c.dow === dow; }).sort(function (a, b) { return a.h - b.h; });
      for (var i = 0; i < today.length; i++) {
        var start = today[i].h * 60;
        if (off === 0 && start <= t.min) continue;
        var secs = off * 86400 + start * 60 - (t.min * 60 + t.s);
        best = { c: today[i], off: off, mins: Math.floor(secs / 60) };
        break;
      }
    }
    return best;
  }
  function countdown(m) {
    if (m < 60) return "en " + Math.max(m, 1) + " min";
    if (m < 1440) { var h = Math.floor(m / 60), r = m % 60; return "en " + h + " h" + (r ? " " + r + " min" : ""); }
    var d = Math.floor(m / 1440), hh = Math.floor((m % 1440) / 60);
    return "en " + d + (d === 1 ? " día" : " días") + (hh ? " " + hh + " h" : "");
  }
  function dayWord(off, dow) { return off === 0 ? "hoy" : off === 1 ? "mañana" : "el " + NOMBRES[dow]; }

  var last = "";
  function render() {
    var t = FZ.mx();
    heads.forEach(function (h) { h.classList.toggle("is-today", +h.getAttribute("data-dow") === t.dow); });
    var n = nextClass();
    cells.forEach(function (c) { c.classList.toggle("is-next", !!n && c === n.c.el); });
    if (!n) return;
    var when = dayWord(n.off, n.c.dow) + " " + FZ.fmt12(n.c.h, 0);
    var line = "CrossFit " + when + " con " + n.c.coach;
    var cd = countdown(n.mins);
    var key = line + "|" + cd;
    if (key !== last) {
      last = key;
      nextBox.classList.add("is-live");
      nextBox.innerHTML = "";
      var k = document.createElement("span"); k.className = "fz-next-k"; k.textContent = "Próxima clase:";
      var v = document.createElement("span"); v.className = "fz-next-v"; v.textContent = line;
      var d = document.createElement("span"); d.className = "fz-next-d"; d.textContent = " · ";
      var tt = document.createElement("span"); tt.className = "fz-next-t";
      var s = document.createElement("span"); s.textContent = cd; tt.appendChild(s);
      nextBox.appendChild(k); nextBox.appendChild(document.createTextNode(" "));
      nextBox.appendChild(v); nextBox.appendChild(d); nextBox.appendChild(tt);
    }
    if (nextTitle) {
      var l2 = n.off === 0 ? "es a las " + FZ.fmt12(n.c.h, 0) + "." : "es " + dayWord(n.off, n.c.dow) + " " + FZ.fmt12(n.c.h, 0) + ".";
      FZ.setLine(nextTitle, l2);
    }
  }

  function paintSel() {
    cells.forEach(function (c) {
      var on = !!FZ.clase && +c.getAttribute("data-dow") === FZ.clase.dow && +c.getAttribute("data-h") === FZ.clase.h;
      c.classList.toggle("is-sel", on);
      c.setAttribute("aria-pressed", on ? "true" : "false");
    });
    if (!selBox) return;
    selBox.textContent = "";
    if (FZ.clase) {
      selBox.appendChild(document.createTextNode("Me interesa: "));
      var b = document.createElement("b"); b.textContent = "CrossFit " + FZ.clase.label;
      selBox.appendChild(b);
    } else selBox.textContent = "Aún no eliges clase.";
  }

  cells.forEach(function (c) {
    c.addEventListener("click", function () {
      var o = { dow: +c.getAttribute("data-dow"), h: +c.getAttribute("data-h"), coach: c.getAttribute("data-coach") };
      o.label = labelOf(o);
      if (FZ.clase && FZ.clase.dow === o.dow && FZ.clase.h === o.h) FZ.set("clase", null);
      else FZ.set("clase", o);
    });
  });
  FZ.on(paintSel);
  FZ.onTick(render);
  paintSel();
  render();
})();
