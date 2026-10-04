(function () {
  "use strict";
  var plate = document.getElementById("cc-plate"); if (!plate) return;
  var NS = "http://www.w3.org/2000/svg";
  var SALSAS = [["Molcajete","#7d3a1c"],["Verde","#5d8a2c"],["Chipotle","#8c3f1b"],["Morita","#7a1b1d"],["Roja","#c4302b"],["Pasilla","#4b2118"],["Jitomate","#dd5a38"]];
  var TOPS = [["Cochinita pibil","#e07a2e"],["Pollo","#f2dfba"],["Res","#6a3a22"],["Chorizo","#b3361f"],["Tocino","#d96b5b"],["Jamón","#eba6a3"],["Salchicha","#c9915f"]];
  var st = { l: 1, r: 3, p: 50, h: 1, t: [] };
  var X0 = 50, X1 = 350; /* extremos del plato */
  function $(id) { return document.getElementById(id); }
  function el(tag, attrs, parent) { var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  var seed = 7; function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
  function hex(c) { return [parseInt(c.substr(1, 2), 16), parseInt(c.substr(3, 2), 16), parseInt(c.substr(5, 2), 16)]; }
  function mix(a, b, t) { var A = hex(a), B = hex(b); return "rgb(" + A.map(function (v, i) { return Math.round(v + (B[i] - v) * t); }).join(",") + ")"; }

  /* frijoles, totopos, cebolla, queso: posiciones fijas */
  var beans = $("cc-beans"); for (var i = 0; i < 16; i++) { el("ellipse", { cx: 191 + rnd() * 18, cy: 56 + i * 20 + rnd() * 6, rx: 5.5, ry: 3.4, fill: "#5a3724", transform: "rotate(" + Math.round(rnd() * 80 - 40) + " 200 " + (56 + i * 20) + ")" }, beans); }
  var chips = [], gc = $("cc-chips");
  for (i = 0; i < 30; i++) {
    var a = rnd() * 6.283, d = 20 + Math.sqrt(rnd()) * 118, cx = 200 + Math.cos(a) * d, cy = 200 + Math.sin(a) * d, s = 17 + rnd() * 8, r = rnd() * 360;
    var t = el("polygon", { points: "0,-" + s + " " + (s * 0.95) + "," + (s * 0.62) + " -" + (s * 0.95) + "," + (s * 0.62), transform: "translate(" + cx.toFixed(1) + " " + cy.toFixed(1) + ") rotate(" + r.toFixed(0) + ")", stroke: "rgba(60,25,10,.35)", "stroke-width": 1.2, "stroke-linejoin": "round" }, gc);
    chips.push({ node: t, x: cx });
  }
  var ceb = $("cc-cebolla"); for (i = 0; i < 7; i++) { var ca = rnd() * 6.283, cd = 40 + rnd() * 92; el("path", { d: "M-9 0 A9 9 0 0 1 9 0", transform: "translate(" + (200 + Math.cos(ca) * cd).toFixed(0) + " " + (200 + Math.sin(ca) * cd).toFixed(0) + ") rotate(" + Math.round(rnd() * 360) + ")", fill: "none", stroke: "#c2559a", "stroke-width": 4, "stroke-linecap": "round" }, ceb); }
  var qs = $("cc-queso"); for (i = 0; i < 34; i++) { var qa = rnd() * 6.283, qd = 15 + Math.sqrt(rnd()) * 128; el("rect", { x: -3.5, y: -2.5, width: 7, height: 5, rx: 2, fill: "#fff6e6", transform: "translate(" + (200 + Math.cos(qa) * qd).toFixed(0) + " " + (200 + Math.sin(qa) * qd).toFixed(0) + ") rotate(" + Math.round(rnd() * 180) + ")", opacity: .95 }, qs); }

  /* toppings: un montoncito por cada uno, en un anillo */
  var topsG = $("cc-tops"), topNodes = [];
  TOPS.forEach(function (tp, k) {
    var ang = -Math.PI / 2 + (k + 0.5) * (6.283 / 7), cx = 200 + Math.cos(ang) * 98, cy = 200 + Math.sin(ang) * 98;
    var g = el("g", { class: "cc-top" }, topsG); g.style.cssText = "transform-box:fill-box;transform-origin:50% 50%;transition:opacity .3s,transform .3s;opacity:0;transform:scale(.4)";
    for (var j = 0; j < 7; j++) {
      var ox = (rnd() - .5) * 34, oy = (rnd() - .5) * 34;
      if (k === 0 || k === 1) el("ellipse", { cx: cx + ox, cy: cy + oy, rx: 8, ry: 4, fill: tp[1], transform: "rotate(" + Math.round(rnd() * 180) + " " + (cx + ox) + " " + (cy + oy) + ")", stroke: "rgba(0,0,0,.2)", "stroke-width": 1 }, g);
      else if (k === 4) el("rect", { x: cx + ox - 9, y: cy + oy - 2.5, width: 18, height: 5, rx: 2, fill: tp[1], transform: "rotate(" + Math.round(rnd() * 180) + " " + (cx + ox) + " " + (cy + oy) + ")", stroke: "#f3c0a8", "stroke-width": 1 }, g);
      else el("circle", { cx: cx + ox, cy: cy + oy, r: k === 3 || k === 6 ? 6.5 : 5.5, fill: tp[1], stroke: "rgba(0,0,0,.25)", "stroke-width": 1 }, g);
    }
    topNodes.push(g);
  });
  var hg = $("cc-huevos"), eggNodes = [];
  [[155, 150], [250, 238]].forEach(function (p) {
    var g = el("g", { class: "cc-egg" }, hg); g.style.cssText = "transform-box:fill-box;transform-origin:50% 50%;transition:opacity .3s,transform .3s;opacity:0;transform:scale(.4)";
    el("path", { d: "M" + (p[0] - 34) + " " + p[1] + " C" + (p[0] - 40) + " " + (p[1] - 30) + " " + (p[0] - 8) + " " + (p[1] - 42) + " " + (p[0] + 18) + " " + (p[1] - 34) + " C" + (p[0] + 44) + " " + (p[1] - 26) + " " + (p[0] + 40) + " " + (p[1] + 18) + " " + (p[0] + 10) + " " + (p[1] + 32) + " C" + (p[0] - 18) + " " + (p[1] + 44) + " " + (p[0] - 30) + " " + (p[1] + 26) + " " + (p[0] - 34) + " " + p[1] + "Z", fill: "#fff8ec", stroke: "rgba(0,0,0,.18)", "stroke-width": 1.5 }, g);
    el("circle", { cx: p[0] + 2, cy: p[1] - 2, r: 15, fill: "#f2a81c" }, g);
    el("circle", { cx: p[0] - 3, cy: p[1] - 8, r: 4.5, fill: "rgba(255,255,255,.55)" }, g);
    eggNodes.push(g);
  });

  function salsaName(i) { return SALSAS[i][0].toLowerCase(); }
  function message() {
    var same = st.l === st.r, nm, how;
    nm = same ? "regulares" : "divorciados";
    if (same) how = "salsa " + salsaName(st.l);
    else if (st.p === 50) how = "mitad salsa " + salsaName(st.l) + ", mitad salsa " + salsaName(st.r);
    else how = st.p + "% salsa " + salsaName(st.l) + " y " + (100 - st.p) + "% salsa " + salsaName(st.r);
    var egg = st.h === 0 ? "sin huevo" : st.h === 1 ? "con un huevo" : "con dos huevos";
    var tp = st.t.length ? ", con " + st.t.map(function (i) { return TOPS[i][0].toLowerCase(); }).join(", ") : "";
    return { name: nm, how: how, text: "Hola, vi su página y quiero chilaquiles " + nm + ": " + how + ", " + egg + tp + ". ¿Me confirman precio y cuánto tardan?" };
  }
  function paint() {
    var x = X0 + (X1 - X0) * st.p / 100, sl = $("cc-sl"), sr = $("cc-sr"), fr = $("cc-frijol");
    sl.setAttribute("width", x); sr.setAttribute("x", x); sr.setAttribute("width", 400 - x);
    sl.setAttribute("fill", SALSAS[st.l][1]); sr.setAttribute("fill", SALSAS[st.r][1]);
    fr.setAttribute("x", x - 13); beans.setAttribute("transform", "translate(" + (x - 200) + " 0)");
    chips.forEach(function (c) { c.node.setAttribute("fill", mix("#ecc66e", SALSAS[c.x < x ? st.l : st.r][1], .42)); });
    eggNodes.forEach(function (g, k) { var on = st.h > k; g.style.opacity = on ? 1 : 0; g.style.transform = on ? "scale(1)" : "scale(.4)"; });
    topNodes.forEach(function (g, k) { var on = st.t.indexOf(k) >= 0; g.style.opacity = on ? 1 : 0; g.style.transform = on ? "scale(1)" : "scale(.4)"; });
    var m = message();
    $("cc-pname").firstChild.nodeValue = m.name.charAt(0).toUpperCase() + m.name.slice(1);
    $("cc-pdesc").textContent = m.how + (st.h === 0 ? ", sin huevo" : "");
    $("cc-pl").textContent = st.p + "% " + SALSAS[st.l][0]; $("cc-pr").textContent = (100 - st.p) + "% " + SALSAS[st.r][0];
    $("cc-range").value = st.p;
    var a = $("cc-div-wa"); a.setAttribute("data-wa", m.text); a.href = CC.waUrl(m.text);
    ["l", "r"].forEach(function (s) {
      Array.prototype.forEach.call($("cc-ch-" + s).children, function (b, i) { b.setAttribute("aria-pressed", st[s] === i ? "true" : "false"); });
    });
    Array.prototype.forEach.call($("cc-ch-h").children, function (b) { b.setAttribute("aria-pressed", String(+b.getAttribute("data-h") === st.h)); });
    Array.prototype.forEach.call($("cc-ch-t").children, function (b, i) { b.setAttribute("aria-pressed", st.t.indexOf(i) >= 0 ? "true" : "false"); });
  }
  /* controles */
  document.getElementById("divorciados").addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".cc-chip"); if (!b) return;
    if (b.hasAttribute("data-side")) st[b.getAttribute("data-side")] = +b.getAttribute("data-i");
    else if (b.hasAttribute("data-h")) st.h = +b.getAttribute("data-h");
    else if (b.hasAttribute("data-top")) { var k = +b.getAttribute("data-top"), j = st.t.indexOf(k); if (j < 0) st.t.push(k); else st.t.splice(j, 1); }
    paint();
  });
  $("cc-range").addEventListener("input", function (e) { st.p = +e.target.value; paint(); });
  /* arrastrar el plato */
  var drag = false;
  function setFromEvent(ev) {
    var r = plate.getBoundingClientRect(), fx = (ev.clientX - r.left) / r.width * 400;
    st.p = Math.max(10, Math.min(90, Math.round((fx - X0) / (X1 - X0) * 100 / 5) * 5)); paint();
  }
  plate.addEventListener("pointerdown", function (ev) { drag = true; try { plate.setPointerCapture(ev.pointerId); } catch (e) {} setFromEvent(ev); });
  plate.addEventListener("pointermove", function (ev) { if (drag) setFromEvent(ev); });
  plate.addEventListener("pointerup", function () { drag = false; });
  plate.addEventListener("pointercancel", function () { drag = false; });
  /* momento firma: el plato se sirve al asomarse y se vuelve a servir si sales y regresas */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) plate.classList.add("is-in");
  else {
    var raf = null;
    function check() {
      raf = null;
      var r = plate.getBoundingClientRect(), vh = window.innerHeight;
      plate.classList.toggle("is-in", r.top < vh * 0.85 && r.bottom > 0);
    }
    function sched() { if (!raf) raf = requestAnimationFrame(check); }
    sched(); window.addEventListener("scroll", sched, { passive: true }); window.addEventListener("resize", sched);
    setTimeout(function () { if (!plate.classList.contains("is-in")) { var r = plate.getBoundingClientRect(); if (r.top < window.innerHeight && r.bottom > 0) plate.classList.add("is-in"); } }, 1600);
  }
  paint();
})();
