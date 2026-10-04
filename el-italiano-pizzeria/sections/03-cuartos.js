(function () {
  "use strict";
  var svg = document.getElementById("pizzaSvg");
  if (!svg) return;
  var NS = "http://www.w3.org/2000/svg", C = 100;
  var P = {
    pavarotti: { nombre: "Pavarotti", precio: 186, base: "Puré de tomate y mozzarella en toda la pizza.", q: [
      { t: "Salami", k: "salami" }, { t: "Jamón de pierna español", k: "jamon" }, { t: "Pepperoni", k: "pepperoni" }, { t: "Jamón serrano", k: "serrano" }] },
    gustos: { nombre: "Cuatro Gustos", precio: 199, base: "Puré de tomate y mozzarella en toda la pizza.", q: [
      { t: "Jamón serrano", k: "serrano" }, { t: "Verduras en aceite", k: "verdura" }, { t: "Cuatro quesos", k: "queso" }, { t: "Salmón", k: "salmon" }] }
  };
  var cur = "pavarotti", sel = 0, seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
  function el(n, a, p) { var e = document.createElementNS(NS, n); for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  function pt(r, deg) { var a = (deg - 90) * Math.PI / 180; return [C + r * Math.cos(a), C + r * Math.sin(a)]; }
  function wedge(r, a0, a1) { var s = pt(r, a0), e = pt(r, a1); return "M" + C + " " + C + " L" + s[0].toFixed(2) + " " + s[1].toFixed(2) + " A" + r + " " + r + " 0 0 1 " + e[0].toFixed(2) + " " + e[1].toFixed(2) + " Z"; }
  function topping(g, k, a0) {
    var n = k === "queso" ? 7 : k === "verdura" ? 16 : k === "salmon" ? 6 : 8, i, r, a, p, x, y;
    for (i = 0; i < n; i++) {
      r = 22 + rnd() * 52; a = a0 + 10 + rnd() * 70; p = pt(r, a); x = p[0]; y = p[1];
      if (k === "salami") { el("circle", { cx: x, cy: y, r: 9, fill: "#a3231c" }, g); el("circle", { cx: x - 2, cy: y - 2, r: 1.4, fill: "#f0b8a6" }, g); el("circle", { cx: x + 3, cy: y + 2, r: 1.2, fill: "#f0b8a6" }, g); }
      else if (k === "pepperoni") { el("circle", { cx: x, cy: y, r: 6.5, fill: "#7d1410" }, g); el("circle", { cx: x, cy: y, r: 6.5, fill: "none", stroke: "#c4453a", "stroke-width": 1 }, g); }
      else if (k === "jamon") { el("rect", { x: x - 9, y: y - 6, width: 18, height: 12, rx: 5, fill: "#f2a7a0", transform: "rotate(" + (rnd() * 90 - 20).toFixed(0) + " " + x + " " + y + ")" }, g); }
      else if (k === "serrano") { el("path", { d: "M" + (x - 10) + " " + y + " q5 -9 10 0 t10 0", fill: "none", stroke: "#8f2a2a", "stroke-width": 5, "stroke-linecap": "round" }, g); }
      else if (k === "verdura") { el("ellipse", { cx: x, cy: y, rx: 4.5, ry: 2.6, fill: i % 3 ? "#4f7a2f" : "#2f4d22", transform: "rotate(" + (rnd() * 180).toFixed(0) + " " + x + " " + y + ")" }, g); }
      else if (k === "queso") { el("ellipse", { cx: x, cy: y, rx: 9, ry: 6, fill: i % 2 ? "#f6e7b3" : "#fff3d1", transform: "rotate(" + (rnd() * 180).toFixed(0) + " " + x + " " + y + ")" }, g); }
      else if (k === "salmon") { el("path", { d: "M" + (x - 11) + " " + y + " q6 -8 11 -1 t11 1 q-6 8 -11 1 t-11 -1z", fill: "#f58b7c" }, g); el("path", { d: "M" + (x - 8) + " " + y + " q5 -3 9 0", fill: "none", stroke: "#fbc5b9", "stroke-width": 1.4 }, g); }
    }
  }
  function draw() {
    seed = cur === "pavarotti" ? 7 : 31;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var defs = el("defs", {}, svg), cp;
    el("ellipse", { cx: 100, cy: 108, rx: 98, ry: 94, class: "pizza-sombra" }, svg);
    P[cur].q.forEach(function (q, i) {
      var a0 = i * 90, a1 = a0 + 90, mid = a0 + 45, g = el("g", { class: "q" + (i === sel ? " on" : ""), tabindex: 0, role: "button", "aria-label": "Cuarto " + (i + 1) + ": " + q.t, "data-i": i }, svg);
      var off = pt(i === sel ? 9 : 3, mid), dx = off[0] - C, dy = off[1] - C;
      g.style.transform = "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px)";
      cp = el("clipPath", { id: "cp" + i }, defs); el("path", { d: wedge(86, a0, a1) }, cp);
      el("path", { d: wedge(99, a0, a1), fill: "#d79a52" }, g);
      for (var s = 0; s < 14; s++) { var p = pt(88 + rnd() * 9, a0 + 4 + rnd() * 82); el("circle", { cx: p[0], cy: p[1], r: 1.2 + rnd() * 1.6, fill: "#6b3a1a", opacity: .55 }, g); }
      el("path", { d: wedge(86, a0, a1), fill: "#c4361f" }, g);
      var t = el("g", { "clip-path": "url(#cp" + i + ")" }, g);
      el("path", { d: wedge(86, a0, a1), fill: "#f6e9c2", opacity: .55 }, t);
      topping(t, q.k, a0);
      el("path", { d: wedge(99, a0, a1), fill: "none", stroke: "rgba(28,8,7,.55)", "stroke-width": 1.2 }, g);
    });
    $tabs();
    info();
  }
  function $tabs() { Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (b) { b.setAttribute("aria-selected", b.getAttribute("data-p") === cur); }); }
  function info() {
    var p = P[cur], q = p.q[sel], l = [], i;
    document.getElementById("qn").textContent = "Cuarto " + (sel + 1) + " de 4";
    document.getElementById("qt").textContent = q.t;
    document.getElementById("qd").textContent = p.base;
    document.getElementById("qp").textContent = "$" + p.precio;
    for (i = 0; i < 4; i++) l.push(p.q[i].t.toLowerCase());
    var m = "Hola, quiero una " + p.nombre + " ($" + p.precio + "). Cuartos: " + l.slice(0, 3).join(", ") + " y " + l[3] + ". El que más se me antoja: " + q.t.toLowerCase() + ".";
    document.getElementById("qwa").href = window.ITA.waUrl(m);
  }
  function pick(i) { sel = i; Array.prototype.forEach.call(svg.querySelectorAll(".q"), function (g, k) {
    var on = k === i, off = pt(on ? 9 : 3, k * 90 + 45);
    g.classList.toggle("on", on); g.style.transform = "translate(" + (off[0] - C).toFixed(1) + "px," + (off[1] - C).toFixed(1) + "px)"; }); info(); }
  svg.addEventListener("click", function (e) { var g = e.target.closest(".q"); if (g) pick(+g.getAttribute("data-i")); });
  svg.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { var g = e.target.closest(".q"); if (g) { e.preventDefault(); pick(+g.getAttribute("data-i")); } } });
  Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (b) { b.addEventListener("click", function () { cur = b.getAttribute("data-p"); sel = 0; draw(); }); });
  draw();
})();
