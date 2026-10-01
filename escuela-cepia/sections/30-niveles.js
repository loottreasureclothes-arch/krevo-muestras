/* La marca en la pared: un trazo de lapiz sube con el scroll de un nivel al siguiente (reversible, sin pin).
   Si la familia ya calculo el grado (cepia_grado), la etiqueta dice el grado de su hijo y esa marca se queda pintada. */
(function () {
  "use strict";
  var wrap = document.getElementById("cp-marca");
  var live = document.getElementById("cp-live");
  if (!wrap || !live) return;
  var rail = live.parentNode, liveL = document.getElementById("cp-live-l");
  var nvs = Array.prototype.slice.call(wrap.querySelectorAll(".cp-nv"));
  if (!nvs.length) return;
  var names = nvs.map(function (n) { var h = n.querySelector(".cp-nv-h"); return h ? h.textContent.trim() : ""; });
  var STROKE = live.querySelector("svg").outerHTML;
  var KEY = "cepia_grado";

  /* grados del hijo agrupados por nivel: 0 inicial, 1 preescolar, 2 primaria, 3 secundaria */
  var byLevel = [[], [], [], []];
  function levelOf(label) {
    var l = label.toLowerCase();
    if (l.indexOf("secundaria") >= 0) return 3;
    if (l.indexOf("primaria") >= 0) return 2;
    if (l.indexOf("preescolar") >= 0) return 1;
    return 0;
  }
  function join(l) { return l.length < 2 ? l.join("") : l.slice(0, -1).join(", ") + " y " + l[l.length - 1]; }
  function setGrades(list) {
    byLevel = [[], [], [], []];
    (list || []).forEach(function (g) { var k = levelOf(g); if (byLevel[k].indexOf(g) < 0) byLevel[k].push(g); });
    buildMarks();
  }
  function kidText(k) {
    var g = byLevel[k];
    if (!g.length) return "";
    if (k === 0) return "Inicial";
    return join(g);
  }

  var marks = [];
  function buildMarks() {
    marks.forEach(function (m) { if (m.el.parentNode) m.el.parentNode.removeChild(m.el); });
    marks = [];
    byLevel.forEach(function (g, k) {
      if (!g.length) return;
      var el = document.createElement("span");
      el.className = "cp-kidmark";
      el.innerHTML = STROKE + "<b></b>";
      el.querySelector("b").textContent = kidText(k);
      rail.appendChild(el);
      marks.push({ el: el, k: k, painted: false });
    });
    place();
  }

  var ticks = [], queued = false;
  function measure() {
    var rr = rail.getBoundingClientRect();
    ticks = nvs.map(function (n) {
      var i = n.querySelector(".cp-tick i");
      var r = (i || n).getBoundingClientRect();
      return r.top + r.height / 2 - rr.top;
    });
    place();
  }
  function place() { marks.forEach(function (m) { if (ticks.length) m.el.style.top = ticks[m.k].toFixed(1) + "px"; }); }

  if (CP.reduce) {
    /* sin animacion: la marca viva se queda en el nivel de su hijo o en Inicial */
    live.style.display = "none";
  } else {
    document.querySelector(".cp-niv").classList.add("cp-niv-live");
  }

  function update() {
    queued = false;
    if (!ticks.length) return;
    var rr = rail.getBoundingClientRect();
    var m = window.innerHeight * 0.62 - rr.top;
    var lo = ticks[0], hi = ticks[ticks.length - 1];
    m = Math.max(lo, Math.min(hi, m));
    var cur = 0;
    nvs.forEach(function (n, i) { var on = m >= ticks[i] - 1; if (CP.reduce) on = true; n.classList.toggle("is-on", on); if (on) cur = i; });
    if (CP.reduce) { marks.forEach(function (mk) { mk.el.classList.add("is-on"); }); return; }
    /* la marca salta de rayita en rayita (con transicion) segun el nivel que va pasando: nunca queda flotando sobre el texto */
    live.style.transform = "translateY(" + ticks[cur].toFixed(1) + "px)";
    var kt = kidText(cur);
    var txt = kt || names[cur];
    if (liveL.textContent !== txt) liveL.textContent = txt;
    live.classList.toggle("is-kid", !!kt);
    marks.forEach(function (mk) {
      if (m >= ticks[mk.k] - 1) mk.painted = true;
      mk.el.classList.toggle("is-on", mk.painted && mk.k !== cur);
    });
  }
  function schedule() { if (queued) return; queued = true; CP.frame(update); }
  function all() { measure(); update(); }

  try { var s = JSON.parse(localStorage.getItem(KEY) || "null"); if (s && s.grados) setGrades(s.grados); } catch (e) {}
  window.addEventListener("cepia:grado", function (e) {
    var g = (e.detail || []).filter(function (r) { return r.estado === "ok"; }).map(function (r) { return r.label; });
    if (g.length) { setGrades(g); all(); }
  });
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", all);
  window.addEventListener("load", all);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(all);
  Array.prototype.forEach.call(wrap.querySelectorAll("img"), function (im) { im.addEventListener("load", all); });
  all();
})();
