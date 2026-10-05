(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var NAMES = {}; // id -> nombre
  $$("[data-add]").forEach(function (b) { NAMES[b.getAttribute("data-add")] = b.getAttribute("data-name"); });
  /* Horas abiertas (research): martes a domingo 9:00 a 23:00. Las frases hablan del lugar, no de qué se sirve a qué hora.
     "Lo que más piden" sale de reseñas reales de Google Maps (research/resenas.md). */
  var M = [
    { n: "Abrimos", d: "La fachada amarilla abre a las 9:00, a media cuadra de la plaza.", star: "hamb-papas",
      q: "\u201cLas hamburguesas son lo mejor de allí con carne de verdad.\u201d", c: "Andy Rey, 4 estrellas en Google" },
    { n: "Mediodía", d: "Luz del tragaluz, el árbol de metal y porciones grandes.", star: "postres",
      q: "\u201c\u2026los postres son una delicia.\u201d", c: "Juan Antonio Tapia Escobedo, 5 estrellas en Google" },
    { n: "Tarde", d: "Luz baja en el rincón vino. Calma para platicar.", star: "hamb-aros",
      q: "\u201cEstaban buenas las hamburesas, nos atendieron bien\u2026\u201d", c: "Mariel Medina, 5 estrellas en Google" },
    { n: "Noche", d: "Buena música hasta las 23:00. Luego cierra la puerta.", star: "michelada",
      q: "\u201cbest micheladas in all aguascalientes\u201d", c: "Hugo Hernandez, 5 estrellas en Google", en: true }
  ];
  var TOP = ["hamb-papas", "hamb-aros", "michelada", "postres"];
  function mom(h) { return h < 12 ? 0 : h < 16 ? 1 : h < 20 ? 2 : 3; }

  var order = [], qty = {};
  var list = $("#tkList"), empty = $("#tkEmpty"), say = $("#tkSay"), txt = $("#tkText"), cnt = $("#tkN"), copy = $("#tkCopy"), fine = $("#tkFine");

  function total() { return order.reduce(function (a, id) { return a + qty[id]; }, 0); }
  function phrase() {
    return "Hola, quisiera pedir: " + order.map(function (id) { return qty[id] + " " + NAMES[id]; }).join(", ") + ".";
  }
  function paint() {
    var n = total();
    list.innerHTML = "";
    order.forEach(function (id) {
      var li = document.createElement("li");
      var s = document.createElement("span"); s.textContent = NAMES[id];
      var st = document.createElement("div"); st.className = "tk-step";
      var m = document.createElement("button"); m.type = "button"; m.textContent = "−"; m.setAttribute("aria-label", "Quitar uno de " + NAMES[id]);
      var q = document.createElement("b"); q.textContent = qty[id];
      var p = document.createElement("button"); p.type = "button"; p.textContent = "+"; p.setAttribute("aria-label", "Agregar uno de " + NAMES[id]);
      m.addEventListener("click", function () { change(id, -1); });
      p.addEventListener("click", function () { change(id, 1); });
      st.appendChild(m); st.appendChild(q); st.appendChild(p);
      li.appendChild(s); li.appendChild(st); list.appendChild(li);
    });
    empty.hidden = n > 0; say.hidden = n === 0; copy.disabled = n === 0;
    cnt.textContent = n === 0 ? "Elige arriba" : n + (n === 1 ? " cosa" : " cosas");
    if (n) txt.textContent = phrase();
    $$("[data-add]").forEach(function (b) {
      var id = b.getAttribute("data-add"), q = qty[id] || 0;
      b.classList.toggle("is-added", q > 0);
      if (b.classList.contains("chip")) { b.setAttribute("data-q", q > 0 ? "×" + q : ""); }
      else { b.textContent = q > 0 ? "En tu pedido ×" + q : "Agregar"; }
    });
  }
  function change(id, d) {
    qty[id] = (qty[id] || 0) + d;
    if (qty[id] <= 0) { delete qty[id]; order = order.filter(function (x) { return x !== id; }); }
    else if (order.indexOf(id) < 0) order.push(id);
    paint();
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-add]"); if (b) change(b.getAttribute("data-add"), 1);
  });

  copy.addEventListener("click", function () {
    var t = phrase();
    function ok() { fine.textContent = "Copiado. Pégalo o léelo al contestar."; }
    function fall() {
      var ta = document.createElement("textarea"); ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); ok(); } catch (e) { fine.textContent = "No se pudo copiar, léelo de arriba."; }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok, fall); else fall();
  });

  /* reloj */
  var range = $("#hRange"), clock = $("#hClock"), nm = $("#hName"), desc = $("#hDesc"), chips = $("#hChips"), qt = $("#hQt"), qc = $("#hQc");
  var imgs = $$(".hs"), segs = $$(".hora-seg button"), cur = -1;
  function show(h) {
    clock.textContent = h + ":00";
    var i = mom(h);
    if (i === cur) return; cur = i;
    nm.textContent = M[i].n; desc.textContent = M[i].d;
    imgs.forEach(function (im, k) { im.classList.toggle("is-on", k === i); });
    segs.forEach(function (s, k) { s.classList.toggle("is-on", k === i); });
    chips.innerHTML = "";
    [M[i].star].concat(TOP.filter(function (x) { return x !== M[i].star; })).forEach(function (id) {
      var c = document.createElement("button"); c.type = "button"; c.className = "chip" + (id === M[i].star ? " is-star" : ""); c.setAttribute("data-add", id); c.setAttribute("data-name", NAMES[id]); c.textContent = NAMES[id];
      chips.appendChild(c);
    });
    qt.textContent = M[i].q; qc.textContent = M[i].c;
    if (M[i].en) qt.setAttribute("lang", "en"); else qt.removeAttribute("lang");
    paint();
  }
  range.addEventListener("input", function () { show(+range.value); });
  segs.forEach(function (s) { s.addEventListener("click", function () { range.value = s.getAttribute("data-h"); show(+range.value); }); });
  /* arranca en la hora de ahora si está abierto */
  try { var o = window.BB && window.BB.openNow(); if (o && o.abierto) { var hh = new Date(Date.now() + new Date().getTimezoneOffset() * 60000 - 6 * 3600000).getHours(); range.value = Math.min(23, Math.max(9, hh)); } } catch (e) {}
  show(+range.value); paint();
})();
