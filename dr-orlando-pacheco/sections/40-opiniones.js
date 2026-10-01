/* LA PALABRA QUE SE REPITE: un solo path SVG. Se calcula con la posición real de cada frase subrayada,
   se dibuja con el avance del scroll (rAF, reversible, sin pin, sin GSAP). Completo con reduced-motion. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var box, svg, path, total = 0, lens = [], ys = [], ready = false, raf = null;

  function lineFragments(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var rects = Array.prototype.slice.call(range.getClientRects()).filter(function (r) { return r.width > 4 && r.height > 6; });
    // une rects del mismo renglón
    var out = [];
    rects.sort(function (a, b) { return a.top - b.top || a.left - b.left; });
    rects.forEach(function (r) {
      var last = out[out.length - 1];
      if (last && Math.abs(r.bottom - last.bottom) < 4) { last.left = Math.min(last.left, r.left); last.right = Math.max(last.right, r.right); }
      else out.push({ left: r.left, right: r.right, bottom: r.bottom, top: r.top });
    });
    return out;
  }

  // Catmull-Rom -> cúbicas
  function smooth(pts) {
    var d = "M" + pts[0][0].toFixed(1) + " " + pts[0][1].toFixed(1);
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      var c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      var c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += " C" + c1x.toFixed(1) + " " + c1y.toFixed(1) + " " + c2x.toFixed(1) + " " + c2y.toFixed(1) + " " + p2[0].toFixed(1) + " " + p2[1].toFixed(1);
    }
    return d;
  }

  function build() {
    box = document.getElementById("pc-thread");
    svg = document.getElementById("pc-thread-svg");
    path = document.getElementById("pc-thread-path");
    if (!box || !svg || !path) return false;
    var br = box.getBoundingClientRect();
    var W = br.width, H = br.height;
    svg.setAttribute("viewBox", "0 0 " + W.toFixed(0) + " " + H.toFixed(0));
    var targets = Array.prototype.slice.call(box.querySelectorAll(".pc-u"));
    var ex = document.getElementById("pc-explica-w");
    if (ex) targets.push(ex);
    var quotes = Array.prototype.slice.call(box.querySelectorAll(".pc-q"));
    var xl = 10, xr = W - 10;
    var pts = [];
    var prevEnd = null, prevBottom = 0;
    targets.forEach(function (t, idx) {
      var fr = lineFragments(t).map(function (f) { return { l: f.left - br.left, r: f.right - br.left, y: f.bottom - br.top + (t === ex ? 6 : 3) }; });
      if (!fr.length) return;
      var first = fr[0];
      if (prevEnd) {
        // del final de la frase anterior: bajar por el margen derecho, lazo en el hueco, cruzar y bajar por el margen izquierdo
        var E = prevEnd;
        var q = quotes[idx - 1];
        var qb = q ? q.getBoundingClientRect().bottom - br.top : E.y + 40;
        var nextQ = quotes[idx];
        var nt = nextQ ? nextQ.getBoundingClientRect().top - br.top : (ex ? ex.getBoundingClientRect().top - br.top : first.y - 30);
        var gapMid = (qb + nt) / 2;
        var cx = Math.max(60, Math.min(W - 60, W * (idx % 2 ? 0.34 : 0.62)));
        pts.push([E.x + 14, E.y + 5]);
        pts.push([xr - 6, E.y + 26]);
        pts.push([xr, Math.max(E.y + 60, qb - 6)]);
        pts.push([xr - 14, gapMid - 14]);
        // lazo (trocoide): de derecha a izquierda
        var a = 7, b = 15, steps = 12;
        for (var s = 0; s <= steps; s++) {
          var tt = -Math.PI + (2 * Math.PI * s / steps);
          var px = cx - (a * tt - b * Math.sin(tt));
          var py = gapMid - b * 0.9 * Math.cos(tt);
          pts.push([px, py]);
        }
        pts.push([xl + 10, gapMid + 6]);
        pts.push([xl, Math.min(first.y - 40, gapMid + 40)]);
        pts.push([xl + 4, first.y - 14]);
        pts.push([first.l - 6, first.y - 2]);
      } else {
        pts.push([first.l - 8, first.y + 1]);
      }
      pts.push([first.l, first.y]);
      fr.forEach(function (f, i) {
        pts.push([(f.l + f.r) / 2, f.y + 0.5]);
        pts.push([f.r, f.y]);
        if (fr[i + 1]) {
          var n = fr[i + 1];
          pts.push([f.r + 12, f.y + 6]);
          pts.push([n.l - 12, n.y - 8]);
          pts.push([n.l, n.y]);
        }
      });
      var last = fr[fr.length - 1];
      prevEnd = { x: last.r, y: last.y };
      prevBottom = last.y;
    });
    if (pts.length < 4) return false;
    path.setAttribute("d", smooth(pts));
    total = path.getTotalLength();
    // muestras (largo, y acumulada máxima) para ligar el scroll al hilo
    lens = []; ys = [];
    var maxY = -1;
    for (var l = 0; l <= total; l += 5) {
      var p = path.getPointAtLength(l);
      maxY = Math.max(maxY, p.y);
      lens.push(l); ys.push(maxY);
    }
    lens.push(total); ys.push(1e9);
    path.style.strokeDasharray = total.toFixed(1);
    return true;
  }

  function update() {
    raf = null;
    if (!ready) return;
    var br = box.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var yTarget = vh * 0.72 - br.top;
    var len = 0;
    if (yTarget >= br.height) len = total;
    else if (yTarget > 0) {
      var lo = 0, hi = ys.length - 1;
      while (lo < hi) { var m = (lo + hi + 1) >> 1; if (ys[m] <= yTarget) lo = m; else hi = m - 1; }
      len = lens[lo];
    }
    path.style.strokeDashoffset = (total - len).toFixed(1);
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(update); }

  function start() {
    var okb = false;
    try { okb = build(); } catch (e) { okb = false; }
    if (!okb) { ready = false; box && box.classList.remove("pc-thread-on"); return; }
    box.classList.add("pc-thread-on");
    ready = true;
    if (reduce) { path.style.strokeDashoffset = "0"; return; }
    path.style.strokeDashoffset = total.toFixed(1);
    schedule();
  }
  function rebuild() { if (!box) return; var okb = false; try { okb = build(); } catch (e) {} ready = okb; if (okb) { if (reduce) path.style.strokeDashoffset = "0"; else schedule(); } }

  function init() {
    box = document.getElementById("pc-thread");
    if (!box) return;
    var begin = function () {
      start();
      window.addEventListener("scroll", schedule, { passive: true });
      var rt = null, lastW = window.innerWidth;
      window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { lastW = window.innerWidth; rebuild(); }, 120); });
      // respaldo: si a los 1.6 s el hilo no se pudo armar, quedan los subrayados simples (completos)
      setTimeout(function () { if (!ready) box.classList.remove("pc-thread-on"); else rebuild(); }, 1600);
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(begin, begin); else begin();
    window.addEventListener("load", function () { rebuild(); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
