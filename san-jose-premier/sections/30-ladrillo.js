/* 30-ladrillo: plano en línea, hiladas ligadas al scroll (rAF, reversible, sin pin) y cruce de 400 ms a la foto real de la casa.
   Sin JS o con reduced-motion se ve la foto de la casa terminada. */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var house = document.getElementById("sj-house");
  var group = document.getElementById("sj-bricks");
  var fin = document.getElementById("sj-final");
  var title = document.getElementById("sj-h-lad");
  if (!house || !group || !fin) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { house.classList.add("is-done"); if (title) title.classList.add("is-in"); return; }

  var X0 = 40, X1 = 320, Y0 = 274, ROWH = 8, BW = 28, ROWS = 24;
  var cols = Math.ceil((X1 - X0) / BW) + 1;
  var COLORS = ["#9c5a44", "#a8654d", "#8e4f3b", "#a15d47", "#965540"];
  var bricks = [];
  for (var r = 0; r < ROWS; r++) {
    var off = r % 2 ? -BW / 2 : 0;
    for (var c = 0; c < cols; c++) {
      var x = X0 + off + c * BW, w = BW - 1;
      if (x + w <= X0 || x >= X1) continue;
      var xs = Math.max(x, X0), xe = Math.min(x + w, X1);
      var el = document.createElementNS(NS, "rect");
      el.setAttribute("x", xs.toFixed(1)); el.setAttribute("y", (Y0 - (r + 1) * ROWH).toFixed(1));
      el.setAttribute("width", (xe - xs).toFixed(1)); el.setAttribute("height", ROWH - 1);
      el.setAttribute("fill", COLORS[(r * 7 + c * 3) % COLORS.length]);
      el.setAttribute("opacity", "0");
      group.appendChild(el);
      bricks.push({ el: el, r: r, c: c, y: Y0 - (r + 1) * ROWH, last: -1 });
    }
  }

  var ticking = false, lastFinal = -1, lastTitle = null;
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function update() {
    ticking = false;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var r = house.getBoundingClientRect();
    /* toda la obra pasa con la casa completa a la vista: empieza cuando asoma por abajo y termina antes de llegar al header */
    var range = Math.max(vh - r.height - 70, 0.5 * vh);
    var p = clamp((vh - r.bottom) / range);
    var p1 = clamp(p / 0.72);
    var fall = p1 * (ROWS + 1.2);
    for (var i = 0; i < bricks.length; i++) {
      var b = bricks[i];
      var k = clamp((fall - b.r - b.c * 0.06) * 2.5);
      k = Math.round(k * 50) / 50;
      if (k !== b.last) {
        b.last = k;
        b.el.setAttribute("opacity", k.toFixed(2));
        b.el.setAttribute("y", (b.y - (1 - k) * 10).toFixed(1));
      }
    }
    /* muro completo: cruce de 400 ms a la foto de su casa (con histéresis para que no parpadee) */
    var done = lastFinal === 1 ? p >= 0.8 : p >= 0.84;
    if ((done ? 1 : 0) !== lastFinal) { lastFinal = done ? 1 : 0; house.classList.toggle("is-done", done); }
    if (title) {
      var on = lastTitle ? p >= 0.84 : p >= 0.88;
      if (on !== lastTitle) { lastTitle = on; title.classList.toggle("is-in", on); }
    }
  }
  function schedule() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  update();
  /* blindaje: si alguien abre la página ya con esta sección a la vista sin poder hacer scroll, el título no se queda escondido */
  setTimeout(function () { schedule(); }, 400);
})();
