/* Firma: la copa que se llena. Mediano / grande, de qué, cuántas; alimenta el pedido compartido. */
(function () {
  "use strict";
  var d = document;
  function el(id) { return d.getElementById(id); }
  var TIPOS = [
    { id: "camaron", n: "Camarón" }, { id: "pulpo", n: "Pulpo" }, { id: "ostion", n: "Ostión" },
    { id: "ceviche", n: "Ceviche" }, { id: "jaiba", n: "Jaiba" }, { id: "callo", n: "Callo de almeja", soloG: true },
    { id: "caliente", n: "En caliente" }, { id: "campechana", n: "Campechana de 3", fijo: 125, nota: "tamaño fijo" },
    { id: "vuelve", n: "Vuelve a la vida", fijo: 140, nota: "tamaño fijo" }
  ];
  var PRECIO = { m: 85, g: 105 };
  var NIVEL = { m: 0.6, g: 0.88 };
  var COLOR = {
    rojo: ["#ea5640", "#a8261b"], lima: ["#dfe99a", "#a9bd55"], caldo: ["#e0953f", "#a35a1a"]
  };
  var LIQ = { camaron: "rojo", pulpo: "rojo", ostion: "rojo", jaiba: "rojo", callo: "rojo", ceviche: "lima", caliente: "caldo", campechana: "rojo", vuelve: "rojo" };
  var MEZCLA = { campechana: ["camaron", "pulpo", "ostion"], vuelve: ["camaron", "ostion", "jaiba", "pulpo", "callo"] };
  var st = { size: "g", tipo: "camaron", qty: 1 };
  var NS = "http://www.w3.org/2000/svg";

  function mk(tag, attrs, parent) {
    var e = d.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    parent.appendChild(e); return e;
  }
  /* posiciones fijas (en coordenadas del líquido) para que la copa no "baile" al cambiar */
  var POS = [[92, 78], [128, 70], [158, 84], [110, 98], [142, 104], [100, 118], [126, 124], [86, 92], [152, 120], [118, 88], [136, 92], [104, 76]];
  function dibuja(tipo, g, i, x, y) {
    var r = (i * 37) % 360;
    if (tipo === "camaron") {
      var p = mk("path", { d: "M0 0c8-10 21-7 23 4 1 7-5 11-10 9 3-4 1-8-4-8-4 0-7 2-9-5z", fill: "#ffa27d", stroke: "#ff6a45", "stroke-width": "1.6", transform: "translate(" + x + " " + y + ") rotate(" + r + ")" }, g);
    } else if (tipo === "pulpo") {
      mk("circle", { cx: x, cy: y, r: 6, fill: "#a77ad6", stroke: "#e3d2ff", "stroke-width": "1.5" }, g);
      mk("circle", { cx: x, cy: y, r: 2.2, fill: "#e8dcff" }, g);
    } else if (tipo === "ostion") {
      mk("ellipse", { cx: x, cy: y, rx: 8, ry: 5.5, fill: "#ddd6c4", stroke: "#8f8873", "stroke-width": "1.2", transform: "rotate(" + r + " " + x + " " + y + ")" }, g);
    } else if (tipo === "ceviche") {
      mk("rect", { x: x - 4, y: y - 4, width: 8, height: 8, fill: i % 3 === 0 ? "#6fb85a" : "#fffbd0", stroke: "#b9c86b", "stroke-width": "1", transform: "rotate(" + r + " " + x + " " + y + ")" }, g);
    } else if (tipo === "jaiba") {
      mk("rect", { x: x - 5, y: y - 2.5, width: 10, height: 5, rx: 2, fill: "#ffb36d", stroke: "#e07a2c", "stroke-width": "1", transform: "rotate(" + r + " " + x + " " + y + ")" }, g);
    } else if (tipo === "callo") {
      mk("circle", { cx: x, cy: y, r: 6.5, fill: "#fff1d6", stroke: "#d9bb8a", "stroke-width": "1.4" }, g);
    }
  }
  function llena(tipo) {
    var g = el("pe-tops"); while (g.firstChild) g.removeChild(g.firstChild);
    var base = MEZCLA[tipo] || (tipo === "caliente" ? ["camaron", "pulpo"] : [tipo]);
    var n = MEZCLA[tipo] ? 12 : 9;
    for (var i = 0; i < n; i++) dibuja(base[i % base.length], g, i, POS[i][0], POS[i][1]);
  }
  function def() { return TIPOS.filter(function (t) { return t.id === st.tipo; })[0]; }
  function precio() { var t = def(); return t.fijo || PRECIO[st.size]; }
  function nombre() {
    var t = def();
    if (t.fijo) return t.n;
    var tam = st.size === "g" ? "grande" : "mediano";
    if (t.id === "caliente") return "Cóctel " + tam + " en caliente";
    return "Cóctel " + tam + " de " + t.n.toLowerCase();
  }
  function clave() { var t = def(); return t.fijo ? "esp-" + t.id : "coc-" + st.size + "-" + t.id; }

  function pinta() {
    var t = def(), c = COLOR[LIQ[t.id]];
    el("pe-liq-a").setAttribute("stop-color", c[0]); el("pe-liq-b").setAttribute("stop-color", c[1]);
    var nivel = t.fijo ? (t.id === "vuelve" ? 0.86 : 0.9) : NIVEL[st.size];
    var top = 164 - 118 * nivel;
    el("pe-liq").style.transform = "translateY(" + (top - 46).toFixed(1) + "px)";
    var vapor = d.querySelector(".pe-steam");
    vapor.classList.toggle("on", t.id === "caliente"); vapor.setAttribute("opacity", t.id === "caliente" ? "1" : "0");
    el("pe-cap").textContent = nombre();
    el("pe-qty").textContent = st.qty;
    el("pe-addlbl").textContent = "Agregar · $" + precio() * st.qty;
    d.querySelectorAll("[data-size]").forEach(function (b) {
      var on = b.getAttribute("data-size") === st.size && !t.fijo;
      b.setAttribute("aria-checked", on ? "true" : "false"); b.disabled = !!t.fijo;
    });
    d.querySelectorAll(".pe-type").forEach(function (b) {
      var tt = TIPOS.filter(function (x) { return x.id === b.getAttribute("data-tipo"); })[0];
      b.setAttribute("aria-pressed", tt.id === st.tipo ? "true" : "false");
      b.disabled = !!(tt.soloG && st.size !== "g");
      var s = b.querySelector("span"); s.textContent = "$" + (tt.fijo || PRECIO[st.size]);
    });
  }

  function lineas() {
    var ul = el("pe-lines"), items = window.Pedido ? window.Pedido.items() : [];
    ul.innerHTML = "";
    items.forEach(function (it) {
      var li = d.createElement("li"); li.className = "pe-line";
      li.innerHTML = '<span class="pe-line-n"></span><span class="pe-line-p"></span>' +
        '<span class="pe-line-s"><button type="button" data-d="-1" aria-label="Quitar uno"><svg class="ic" aria-hidden="true"><use href="#i-minus"/></svg></button><output></output><button type="button" data-d="1" aria-label="Agregar uno"><svg class="ic" aria-hidden="true"><use href="#i-plus"/></svg></button></span>';
      li.querySelector(".pe-line-n").textContent = it.name;
      li.querySelector(".pe-line-p").textContent = "$" + it.price * it.qty;
      li.querySelector("output").textContent = it.qty;
      li.setAttribute("data-key", it.key);
      ul.appendChild(li);
    });
    d.querySelector(".pe-ticket").classList.toggle("has", items.length > 0);
  }

  function init() {
    var box = el("pe-types");
    TIPOS.forEach(function (t) {
      var b = d.createElement("button"); b.type = "button"; b.className = "pe-type"; b.setAttribute("data-tipo", t.id);
      b.innerHTML = "<b></b><span></span>" + (t.nota ? "<small>" + t.nota + "</small>" : "");
      b.querySelector("b").textContent = t.n; box.appendChild(b);
    });
    d.querySelectorAll("[data-size]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (b.disabled) return; st.size = b.getAttribute("data-size");
        if (st.size === "m" && def().soloG) st.tipo = "camaron";
        pinta();
      });
    });
    box.addEventListener("click", function (e) {
      var b = e.target.closest(".pe-type"); if (!b || b.disabled) return;
      st.tipo = b.getAttribute("data-tipo"); llena(st.tipo); pinta();
    });
    el("pe-minus").addEventListener("click", function () { st.qty = Math.max(1, st.qty - 1); pinta(); });
    el("pe-plus").addEventListener("click", function () { st.qty = Math.min(20, st.qty + 1); pinta(); });
    el("pe-addcopa").addEventListener("click", function () {
      window.Pedido.add(clave(), nombre(), precio(), st.qty);
      var b = el("pe-addcopa"), l = el("pe-addlbl");
      l.textContent = "Agregada a tu pedido"; b.classList.add("is-added"); clearTimeout(b._t);
      b._t = setTimeout(function () { b.classList.remove("is-added"); st.qty = 1; pinta(); }, 1200);
    });
    el("pe-lines").addEventListener("click", function (e) {
      var b = e.target.closest("button[data-d]"); if (!b) return;
      var k = b.closest("li").getAttribute("data-key");
      window.Pedido.change(k, parseInt(b.getAttribute("data-d"), 10));
    });
    window.Pedido.on(lineas);
    llena(st.tipo); pinta(); lineas();
  }
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", init); else init();
})();
