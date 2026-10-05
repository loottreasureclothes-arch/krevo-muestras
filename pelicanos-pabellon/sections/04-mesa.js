/* Firma: "Pon tu mesa". Platos en una mesa vista desde arriba; el pedido sale para dictarlo por telefono. */
(function () {
  "use strict";
  var D = [
    ["caldo", "Caldo de mariscos", "caldo"], ["camarones", "Camarones en salsa amarilla", "camarones"],
    ["aguachile", "Torre de aguachile", "aguachile"],
    ["sizzler", "Sizzler de carne", "sizzler"], ["sizzlerq", "Sizzler con queso y pimientos", "sizzler-queso"],
    ["hamb", "Hamburguesa con papas", "hamburguesa"], 
    ["michec", "Michelada con camarón", "michelada"], ["michem", "Michelada con mejillones", "michelada-mejillon"],
    ["copa", "Postre en copa", "copa"], ["flan", "Flan con cereza", "flan"]
  ];
  var by = {}; D.forEach(function (d) { by[d[0]] = d; });
  var qty = {}, order = [], pers = 2, plates = {};
  var mesa = document.getElementById("mesa-t"); if (!mesa) return;
  var top = mesa.querySelector(".mesa-top"), vacio = document.getElementById("mesa-v");
  var lst = document.getElementById("tk-l"), tk = document.getElementById("tk"), ok = document.getElementById("tk-ok");
  var persN = document.getElementById("pers-n");

  function total() { return order.length; }
  function pos(i, n) {
    var ring = n > 6 ? (i < Math.ceil(n / 2) ? 0 : 1) : 0;
    var k = n > 6 ? (ring === 0 ? Math.ceil(n / 2) : n - Math.ceil(n / 2)) : n;
    var j = n > 6 && ring === 1 ? i - Math.ceil(n / 2) : i;
    var a = -Math.PI / 2 + (2 * Math.PI * j) / k + (ring ? Math.PI / k : 0);
    if (n === 1) return [50, 50];
    var rx = ring ? 14 : (n > 6 ? 29 : 27), ry = ring ? 13 : (n > 6 ? 27 : 25);
    return [50 + rx * Math.cos(a), 50 + ry * Math.sin(a)];
  }
  function renderTable() {
    var n = total(), size = n > 6 ? 17 : (n > 3 ? 21 : 25);
    if (n === 1) size = 34;
    order.forEach(function (id, i) {
      var el = plates[id], isNew = false;
      if (!el) {
        el = document.createElement("div"); el.className = "plato in"; isNew = true;
        el.innerHTML = '<img alt="" src="img/' + by[id][2] + '-480.webp"><b></b>';
        mesa.appendChild(el); plates[id] = el;
        setTimeout(function () { el.classList.remove("in"); }, 500);
      }
      var p = pos(i, n); el.style.left = p[0] + "%"; el.style.top = p[1] + "%"; el.style.width = size + "%";
      el.querySelector("b").textContent = qty[id] > 1 ? "x" + qty[id] : "1";
      el.setAttribute("title", by[id][1]);
    });
    Object.keys(plates).forEach(function (id) { if (!qty[id]) { plates[id].remove(); delete plates[id]; } });
    vacio.classList.toggle("hide", n > 0);
    /* sillas */
    Array.prototype.forEach.call(mesa.querySelectorAll(".silla"), function (s) { s.remove(); });
    for (var i = 0; i < pers; i++) {
      var th = -90 + (360 * i) / pers, a = th * Math.PI / 180;
      var s = document.createElement("i"); s.className = "silla";
      s.style.left = (50 + 47 * Math.cos(a)) + "%"; s.style.top = (50 + 45 * Math.sin(a)) + "%"; s.style.setProperty("--r", (th - 90) + "deg");
      mesa.insertBefore(s, mesa.firstChild);
    }
    persN.textContent = pers;
    var tm = document.getElementById("tk-m"); if (tm) tm.textContent = "Mesa para " + pers + (pers === 1 ? " persona" : "");
  }
  function text() {
    if (!order.length) return "";
    var l = order.map(function (id) { return qty[id] + " " + by[id][1]; }).join(", ");
    return "Hola, quiero pedir en Pelicanos. Mesa para " + pers + (pers === 1 ? " persona" : " personas") + ": " + l + ". ¿Me confirman los precios?";
  }
  function renderTicket() {
    tk.classList.toggle("vacio", !order.length);
    lst.innerHTML = "";
    order.forEach(function (id) {
      var li = document.createElement("li");
      li.innerHTML = '<span></span><button type="button" aria-label="Quitar uno">&minus;</button><output></output><button type="button" aria-label="Agregar uno">+</button>';
      li.querySelector("span").textContent = by[id][1];
      li.querySelector("output").textContent = qty[id];
      var b = li.querySelectorAll("button");
      b[0].addEventListener("click", function () { change(id, -1); });
      b[1].addEventListener("click", function () { change(id, 1); });
      lst.appendChild(li);
    });
  }
  function renderBtns() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-add]"), function (b) {
      var q = qty[b.getAttribute("data-add")] || 0, t = b.querySelector(".add-t");
      b.classList.toggle("on", q > 0);
      t.textContent = q > 0 ? "En la mesa: " + q + ". Otro" : "Agregar";
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-th]"), function (b) {
      var q = qty[b.getAttribute("data-th")] || 0, el = b.querySelector(".th-q");
      b.classList.toggle("on", q > 0); el.hidden = !q; el.textContent = q;
    });
  }
  function change(id, d) {
    var q = (qty[id] || 0) + d;
    if (q <= 0) { delete qty[id]; order = order.filter(function (x) { return x !== id; }); }
    else { if (!qty[id]) order.push(id); qty[id] = q; }
    ok.textContent = ""; renderAll();
  }
  function renderAll() { renderTable(); renderTicket(); renderBtns(); }

  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-add]"); if (a) { change(a.getAttribute("data-add"), 1); return; }
    var t = e.target.closest("[data-th]"); if (t) { change(t.getAttribute("data-th"), 1); return; }
    var p = e.target.closest("[data-pers]"); if (p) { pers = Math.max(1, Math.min(12, pers + parseInt(p.getAttribute("data-pers"), 10))); ok.textContent = ""; renderTable(); }
  });
  document.getElementById("tk-clr").addEventListener("click", function () { qty = {}; order = []; ok.textContent = ""; renderAll(); });
  document.getElementById("tk-copy").addEventListener("click", function () {
    var t = text();
    if (!t) { ok.textContent = "Elige arriba"; return; }
    function done() { ok.textContent = "Copiado. Llámanos y dicta o pega tu pedido."; }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, fb); else fb();
    function fb() { var x = document.createElement("textarea"); x.value = t; x.style.position = "fixed"; x.style.opacity = "0"; document.body.appendChild(x); x.select(); try { document.execCommand("copy"); done(); } catch (e) { ok.textContent = t; } x.remove(); }
  });
  document.getElementById("tk-call").addEventListener("click", function () {
    var t = text(); if (t) ok.textContent = "Tu pedido: " + t.replace("Hola, quiero pedir en Pelicanos. ", "");
  });
  window.PelMesa = { text: text };
  renderAll();
})();
