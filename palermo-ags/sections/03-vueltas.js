/* El componente firma de Palermo: la pizza de tus vueltas. */
(function () {
  "use strict";
  var svg = document.getElementById("pl-vu-svg");
  if (!svg) return;
  var NS = "http://www.w3.org/2000/svg";
  var VARS = [
    { id: "queso", name: "Queso", img: "img/r-queso-480.webp" },
    { id: "pepperoni", name: "Pepperoni", img: "img/r-pepperoni-480.webp" },
    { id: "chorizo", name: "Chorizo y carne", img: "img/r-chorizo-480.webp" },
    { id: "hawaiana", name: "Hawaiana", img: "img/r-hawaiana-480.webp" },
    { id: "monterrey", name: "Monterrey", img: null, color: "#c9302a", ini: "M" },
    { id: "nutella", name: "Nutella", img: "img/r-nutella-480.webp" }
  ];
  var N = 8, plan = [], sel = 0, CX = 120, CY = 120, R = 104;
  for (var k = 0; k < N; k++) plan.push(null);
  function byId(id) { for (var i = 0; i < VARS.length; i++) if (VARS[i].id === id) return VARS[i]; return null; }
  function el(n, a, p) { var e = document.createElementNS(NS, n); for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  function pt(r, deg) { var a = deg * Math.PI / 180; return [CX + r * Math.cos(a), CY + r * Math.sin(a)]; }

  var defs = el("defs", {}, svg);
  VARS.forEach(function (v) {
    if (!v.img) return;
    var p = el("pattern", { id: "pl-p-" + v.id, patternUnits: "userSpaceOnUse", x: 0, y: 0, width: 240, height: 240 }, defs);
    var im = el("image", { href: v.img, x: 0, y: 0, width: 240, height: 240, preserveAspectRatio: "xMidYMid slice" }, p);
    im.setAttributeNS("http://www.w3.org/1999/xlink", "href", v.img);
  });
  el("circle", { cx: CX, cy: CY, r: R + 4, fill: "#101a38", stroke: "#e5ad45", "stroke-width": 8 }, svg);
  el("circle", { cx: CX, cy: CY, r: R + 8.5, fill: "none", stroke: "#b87a22", "stroke-width": 1.5 }, svg);
  var gW = el("g", {}, svg), wedges = [];
  for (var i = 0; i < N; i++) {
    var a0 = -90 + i * 45, a1 = a0 + 45, mid = a0 + 22.5;
    var p0 = pt(R, a0), p1 = pt(R, a1), pn = pt(78, mid);
    var g = el("g", { "class": "pl-wd", tabindex: 0, role: "button" }, gW);
    var path = el("path", { d: "M" + CX + "," + CY + " L" + p0[0].toFixed(2) + "," + p0[1].toFixed(2) + " A" + R + "," + R + " 0 0 1 " + p1[0].toFixed(2) + "," + p1[1].toFixed(2) + " Z" }, g);
    el("circle", { "class": "pl-wn", cx: pn[0].toFixed(2), cy: pn[1].toFixed(2), r: 10 }, g);
    var t = el("text", { x: pn[0].toFixed(2), y: pn[1].toFixed(2) }, g); t.textContent = String(i + 1);
    var dx = Math.cos(mid * Math.PI / 180), dy = Math.sin(mid * Math.PI / 180);
    wedges.push({ g: g, path: path, dx: dx, dy: dy });
    (function (idx) {
      g.addEventListener("click", function () { sel = idx; render(false); });
      g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sel = idx; render(false); } });
    })(i);
  }
  var hub = el("g", {}, svg);
  el("circle", { cx: CX, cy: CY, r: 29, fill: "#0f1830", stroke: "#fbf3dc", "stroke-width": 2.5 }, hub);
  var hubN = el("text", { "class": "pl-hub-n", x: CX, y: CY - 3 }, hub);
  var hubT = el("text", { "class": "pl-hub-t", x: CX, y: CY + 15 }, hub); hubT.textContent = "vueltas";

  var chipsBox = document.getElementById("pl-vu-chips"), chips = {};
  VARS.forEach(function (v) {
    var b = document.createElement("button"); b.type = "button"; b.className = "pl-chip"; b.setAttribute("aria-pressed", "false");
    if (v.img) { var im = new Image(); im.src = v.img; im.alt = ""; im.width = 44; im.height = 44; b.appendChild(im); }
    else { var s = document.createElement("span"); s.className = "pl-chip-ph"; s.setAttribute("aria-hidden", "true"); s.textContent = v.ini; b.appendChild(s); }
    var tx = document.createElement("span"); tx.textContent = v.name; b.appendChild(tx);
    b.addEventListener("click", function () { choose(v.id); });
    chipsBox.appendChild(b); chips[v.id] = b;
  });

  var now = document.getElementById("pl-vu-now"), list = document.getElementById("pl-vu-list"), empty = document.getElementById("pl-vu-empty"),
      copy = document.getElementById("pl-vu-copy"), note = document.getElementById("pl-vu-note"), clear = document.getElementById("pl-vu-clear");
  var NOTE0 = note.textContent, fresh = -1, timer = null;

  function choose(id) {
    if (plan[sel] === id) { plan[sel] = null; fresh = -1; render(false); return; }
    plan[sel] = id; fresh = sel;
    for (var s = 1; s <= N; s++) { var n = (sel + s) % N; if (!plan[n]) { sel = n; break; } }
    render(true);
  }
  function filled() { return plan.filter(Boolean).length; }
  function msg() {
    var parts = [];
    plan.forEach(function (id, i) { if (id) parts.push((i + 1) + ") " + byId(id).name); });
    return "Hola, voy al buffet de Palermo (Gral. Álvaro Obregón 236, Centro). Mi plan de vueltas: " + parts.join(", ") + ".";
  }
  function render(anim) {
    wedges.forEach(function (w, i) {
      var id = plan[i], v = id ? byId(id) : null, on = i === sel;
      w.path.setAttribute("fill", v ? (v.img ? "url(#pl-p-" + v.id + ")" : v.color) : "rgba(251,243,220,.10)");
      w.g.setAttribute("aria-label", "Vuelta " + (i + 1) + ", " + (v ? v.name : "vacía") + (on ? ", elegida" : ""));
      w.g.classList.toggle("is-sel", on);
      w.g.style.transform = on ? "translate(" + (w.dx * 7).toFixed(2) + "px," + (w.dy * 7).toFixed(2) + "px)" : "none";
      w.g.classList.remove("is-new");
      if (anim && i === fresh) { void w.g.getBoundingClientRect(); w.g.classList.add("is-new"); }
    });
    var c = filled();
    hubN.textContent = String(c);
    now.textContent = plan[sel] ? "Vuelta " + (sel + 1) + ": " + byId(plan[sel]).name : "Vuelta " + (sel + 1) + ": elige abajo";
    VARS.forEach(function (v) { chips[v.id].setAttribute("aria-pressed", plan[sel] === v.id ? "true" : "false"); });
    list.innerHTML = "";
    plan.forEach(function (id, i) {
      if (!id) return;
      var li = document.createElement("li"); var b = document.createElement("b"); b.textContent = String(i + 1);
      li.appendChild(b); li.appendChild(document.createTextNode(byId(id).name)); list.appendChild(li);
    });
    empty.style.display = c ? "none" : "";
    list.style.display = c ? "" : "none";
    clear.style.visibility = c ? "visible" : "hidden";
    copy.disabled = !c;
    copy.textContent = c ? "Copiar mi plan" : "Elige arriba";
  }
  clear.addEventListener("click", function () { for (var i = 0; i < N; i++) plan[i] = null; sel = 0; fresh = -1; render(false); });
  function said(t) { note.textContent = t; clearTimeout(timer); timer = setTimeout(function () { note.textContent = NOTE0; }, 2600); }
  copy.addEventListener("click", function () {
    if (!filled()) return;
    var t = msg();
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = t; ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;left:-999px;top:0";
      document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta); said(ok ? "Copiado. Pégalo donde lo necesites." : "No se pudo copiar. Mándalo por WhatsApp.");
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(function () { said("Copiado. Pégalo donde lo necesites."); }, fallback);
    else fallback();
  });
  var waBtn = document.getElementById("pl-vu-wa"), WA_BASE = "https://wa.me/5214494120866?text=";
  function genericMsg() { return "Hola, quiero ir al buffet de Palermo (Gral. Álvaro Obregón 236, Centro). ¿Cuál es el precio hoy?"; }
  function syncWa() { if (waBtn) waBtn.href = WA_BASE + encodeURIComponent(filled() ? msg() : genericMsg()); }
  var _render = render;
  render = function (a) { _render(a); syncWa(); };
  render(false);
  window.PalermoVueltas = { mensaje: msg, plan: plan };
})();
