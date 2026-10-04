(function () {
  var TB = window.TB; if (!TB) return;
  var $ = function (id) { return document.getElementById(id); };
  var hora = $("hora"), horaO = $("hora-o"), pO = $("p-o"), win = $("win"), tint = $("tint"), orb = $("orb");
  var capT = $("cap-t"), capD = $("cap-d"), sel = $("sel"), go = $("cielo-go");
  var skies = Array.prototype.slice.call(win.querySelectorAll(".sky"));
  var n = 4;
  var FASES = [
    [13, 17, "Tarde de azotea", "Comer, limonada fría y la Catedral de frente."],
    [18, 20, "Se pone el cielo", "Cerveza fría y la ciudad cambiando de color."],
    [21, 23, "Ya prendieron los focos", "Música, tragos y la terraza llena de luz."],
    [24, 25, "Catedral prendida", "Última ronda con las torres encendidas."]
  ];
  function fmt(h) { var x = h % 24, s = x >= 12 ? "p.m." : "a.m."; x = x % 12; if (x === 0) x = 12; return x + " " + s; }
  function render() {
    var h = +hora.value, t = (h - 13) / 12;
    horaO.textContent = fmt(h);
    skies.forEach(function (s) { s.classList.toggle("is-on", h >= +s.dataset.from); });
    FASES.forEach(function (f) { if (h >= f[0] && h <= f[1]) { capT.textContent = f[2]; capD.textContent = f[3]; } });
    tint.style.opacity = String(Math.max(0, (t - .35)) * 1.1);
    var W = win.clientWidth, H = win.clientHeight, x = W * (.12 + .76 * t) - 17, y = H * (.1 + .3 * Math.pow(2 * t - 1, 2)) - 17;
    win.style.setProperty("--ox", (12 + 76 * t).toFixed(1) + "%"); win.style.setProperty("--oy", (10 + 30 * Math.pow(2 * t - 1, 2)).toFixed(1) + "%");
    orb.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
    orb.classList.toggle("moon", h >= 21);
    var pl = n === 1 ? "1 persona" : n + " personas";
    var msg = "Hola, quiero apartar mesa en la terraza para " + pl + " a las " + fmt(h);
    if (TB.carta.length) msg += " Queremos pedir: " + TB.carta.join(", ") + ".";
    msg += " ¿Hay lugar?";
    go.href = TB.waUrl(msg);
    if (TB.carta.length) { sel.innerHTML = "<strong>En tu mesa:</strong> " + TB.carta.join(", ") + ". <a href=\"#carta\">Cambiar</a>"; }
    else { sel.innerHTML = "Aún no agregas nada de la carta. <a href=\"#carta\">Ir a la carta</a>"; }
  }
  hora.addEventListener("input", render);
  $("p-menos").addEventListener("click", function () { n = Math.max(1, n - 1); pO.textContent = n; render(); });
  $("p-mas").addEventListener("click", function () { n = Math.min(20, n + 1); pO.textContent = n; render(); });
  TB.on(render);
  window.addEventListener("resize", render);
  render();

  // momento firma: la tira de focos
  var box = $("lights"), NS = "http://www.w3.org/2000/svg";
  var svg = document.createElementNS(NS, "svg"); svg.setAttribute("viewBox", "0 0 400 70"); svg.setAttribute("preserveAspectRatio", "none");
  var cord = document.createElementNS(NS, "path"); cord.setAttribute("class", "cord");
  var d = "M-5 8 Q50 62 100 14 T205 14 T305 14 T405 8"; cord.setAttribute("d", d); svg.appendChild(cord);
  var bulbs = [];
  var pts = [[22,36],[45,45],[70,40],[96,18],[122,33],[150,40],[178,32],[205,16],[232,32],[258,40],[284,33],[305,16],[330,34],[358,44],[382,34]];
  pts.forEach(function (p, i) {
    var g = document.createElementNS(NS, "g");
    var gl = document.createElementNS(NS, "circle"); gl.setAttribute("class", "glow"); gl.setAttribute("cx", p[0]); gl.setAttribute("cy", p[1] + 7); gl.setAttribute("r", 13);
    var b = document.createElementNS(NS, "ellipse"); b.setAttribute("class", "bulb"); b.setAttribute("cx", p[0]); b.setAttribute("cy", p[1] + 6); b.setAttribute("rx", 3.6); b.setAttribute("ry", 5);
    gl.style.transitionDelay = b.style.transitionDelay = (i * 55) + "ms";
    g.appendChild(gl); g.appendChild(b); svg.appendChild(g);
  });
  box.appendChild(svg);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { es.forEach(function (e) { box.classList.toggle("on", e.isIntersecting); }); }, { threshold: .2 }).observe(box);
  } else box.classList.add("on");
})();
