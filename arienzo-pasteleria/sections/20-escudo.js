(function () {
  "use strict";
  var svg = document.getElementById("esc-svg");
  if (!svg) return;
  var A = window.Arienzo;
  var qs = [].slice.call(svg.querySelectorAll(".q"));
  var ficha = document.getElementById("ficha"), h = document.getElementById("ficha-h"), p = document.getElementById("ficha-p"), lnk = document.getElementById("ficha-lnk");
  var wa = document.getElementById("esc-wa");
  var DATA = {
    pasteles: { t: "Pasteles", p: "Condesa de frutas, chocolate, fresas, nuez, piñón, queso y piña, chantilly fresa. Y el de piñón y tres leches.", link: true,
      wa: "Hola Arienzo, quiero preguntar por sus pasteles. ¿Qué sabores tienen y para cuántas personas?" },
    postres: { t: "Postres", p: "Cupcakes, muffins y galletas.", wa: "Hola Arienzo, quiero preguntar por sus postres (cupcakes, muffins y galletas). ¿Qué tienen hoy?" },
    pan: { t: "Pan", p: "Conchas, concha rellena de frutos rojos, medialunas y pan de muerto de temporada.", wa: "Hola Arienzo, quiero preguntar por el pan. ¿Qué tienen hoy?" },
    cafeteria: { t: "Cafetería", p: "Sándwich club, saludable y croissant; capuchino y té frío.", wa: "Hola Arienzo, quiero preguntar por la cafetería. ¿Qué sándwiches y bebidas tienen?" }
  };
  var DEF = { t: "Toca un cuartel.", p: "Pasteles, postres y pan recién horneados, y la cafetería.", wa: "Hola Arienzo, quiero preguntar por sus pasteles, postres, pan y cafetería." };
  var last = "__";
  function paint() {
    var q = A.state().q || "";
    qs.forEach(function (g) { var on = g.getAttribute("data-q") === q; g.classList.toggle("is-sel", on); g.setAttribute("aria-pressed", String(on)); });
    if (q) svg.setAttribute("data-sel", q); else svg.removeAttribute("data-sel");
    var d = DATA[q] || DEF;
    h.textContent = d.t; p.textContent = d.p; lnk.hidden = !(d.link);
    A.setWa(wa, d.wa);
    if (q !== last && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) { ficha.classList.remove("is-swap"); void ficha.offsetWidth; ficha.classList.add("is-swap"); }
    last = q;
  }
  function toggle(g) { var q = g.getAttribute("data-q"); A.set("q", A.state().q === q ? null : q); }
  qs.forEach(function (g, i) {
    g.addEventListener("click", function () { toggle(g); });
    g.addEventListener("focus", function () { svg.setAttribute("data-foc", g.getAttribute("data-q")); });
    g.addEventListener("blur", function () { svg.removeAttribute("data-foc"); });
    g.addEventListener("keydown", function (e) {
      var k = e.key;
      if (k === "Enter" || k === " ") { e.preventDefault(); toggle(g); return; }
      var to = null;
      if (k === "ArrowRight") to = i ^ 1;           /* 0<->1, 2<->3 */
      else if (k === "ArrowLeft") to = i ^ 1;
      else if (k === "ArrowDown") to = (i + 2) % 4;
      else if (k === "ArrowUp") to = (i + 2) % 4;
      if (to !== null) { e.preventDefault(); qs[to].focus(); }
    });
  });
  window.addEventListener("arienzo:cambio", paint);
  paint();
})();
