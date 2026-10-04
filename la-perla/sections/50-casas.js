(function () {
  "use strict";
  var H = { centro: { c: 3, a: 12 }, poniente: { c: 2, a: 11 } };
  var now = new Date(), d = now.getDay(), h = now.getHours() + now.getMinutes() / 60;
  function fmt(a) { return a === 12 ? "12 p.m" : a + " a.m"; }
  Array.prototype.forEach.call(document.querySelectorAll("[data-hoy]"), function (el) {
    var k = el.getAttribute("data-hoy"), x = H[k], t;
    if (d === x.c) t = "Hoy no abre.";
    else if (h < x.a) t = "Hoy abre a las " + fmt(x.a) + ".";
    else if (h < 19) t = "Abierto ahora, hasta las 7 p.m.";
    else { var m = (d + 1) % 7; t = m === x.c ? "Abre el " + ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"][(d + 2) % 7] + " desde las " + fmt(x.a) + "." : "Mañana abre a las " + fmt(x.a) + "."; }
    el.textContent = t;
  });
})();
