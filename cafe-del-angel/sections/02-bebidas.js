(function () {
  "use strict";
  var root = document.getElementById("bebidas"); if (!root) return;
  var layers = root.querySelector(".layers"), vaso = root.querySelector(".vaso");
  var nameEl = root.querySelector(".taza-name"), priceEl = root.querySelector(".taza-price");
  var list = root.querySelector(".ticket-list"), totalEl = root.querySelector(".ticket-total b");
  var go = root.querySelector(".ticket-go"), modoBtns = root.querySelectorAll(".modo button");
  var NS = "http://www.w3.org/2000/svg", items = {}, order = [], modo = "aqui";
  var VASO = { aqui: 0, "12": 7, "16": 15 };
  var rows = root.querySelectorAll(".row");

  function paint(row) {
    for (var i = 0; i < rows.length; i++) rows[i].classList.toggle("on", rows[i] === row);
    nameEl.textContent = row.getAttribute("data-name");
    priceEl.textContent = "$" + row.getAttribute("data-price");
    vaso.setAttribute("data-hot", row.getAttribute("data-hot"));
    var parts = row.getAttribute("data-l").split(","), cum = 0, base = 212, H = 150, made = [];
    layers.textContent = "";
    for (var j = 0; j < parts.length; j++) {
      var p = parts[j].split(":"), h = parseFloat(p[1]) * H; cum += h;
      var r = document.createElementNS(NS, "rect");
      r.setAttribute("x", 40); r.setAttribute("width", 120);
      r.setAttribute("y", (base - cum).toFixed(1)); r.setAttribute("height", (h + 2).toFixed(1));
      r.setAttribute("fill", p[0]);
      if (!CDA.reduce) r.setAttribute("class", "pre");
      layers.insertBefore(r, layers.firstChild); made.push(r);
    }
    if (!CDA.reduce) {
      made.reverse();
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        made.forEach(function (r, k) { r.style.transitionDelay = (k * 0.09) + "s"; r.classList.remove("pre"); });
      }); });
    }
  }
  function money(n) { return "$" + n; }
  function render() {
    var total = 0, cups = 0, html = "";
    list.textContent = "";
    if (!order.length) { var e = document.createElement("li"); e.className = "ticket-empty"; e.textContent = "Toca Agregar en cualquier bebida."; list.appendChild(e); }
    order.forEach(function (n) {
      var it = items[n], li = document.createElement("li"); li.className = "t-it";
      li.innerHTML = "<span></span><div class=\"t-q\"><button type=\"button\" aria-label=\"Quitar uno\">&minus;</button><b></b><button type=\"button\" aria-label=\"Agregar uno\">+</button></div><span class=\"t-m\"></span>";
      li.firstChild.textContent = n; li.querySelector("b").textContent = it.q; li.querySelector(".t-m").textContent = money(it.q * it.p);
      var bs = li.querySelectorAll("button");
      bs[0].addEventListener("click", function () { it.q--; if (it.q <= 0) { delete items[n]; order.splice(order.indexOf(n), 1); } render(); });
      bs[1].addEventListener("click", function () { it.q++; render(); });
      list.appendChild(li); total += it.q * it.p; cups += it.q;
    });
    total += cups * VASO[modo];
    totalEl.classList.toggle("vacio", !order.length); totalEl.textContent = order.length ? money(total) : "Elige tu bebida";
    var msg;
    if (!order.length) msg = "Hola Café del Ángel, quiero pedir.";
    else {
      var lines = order.map(function (n) { return items[n].q + " x " + n + " ($" + items[n].p + ")"; });
      var d = modo === "aqui" ? "Lo tomamos aquí en el café." : "Para llevar, vaso de " + modo + " oz ($" + VASO[modo] + " c/u).";
      msg = "Hola Café del Ángel, quiero pedir:\n" + lines.join("\n") + "\n" + d + "\nTotal estimado: $" + total + ".";
    }
    go.setAttribute("data-wa", msg); go.href = CDA.wa(msg);
  }
  function add(row) {
    var n = row.getAttribute("data-name");
    if (!items[n]) { items[n] = { p: parseInt(row.getAttribute("data-price"), 10), q: 0 }; order.push(n); }
    items[n].q++; paint(row); render();
  }
  Array.prototype.forEach.call(rows, function (row) {
    row.querySelector(".row-n").addEventListener("click", function () { paint(row); });
    row.querySelector(".row-add").addEventListener("click", function () { add(row); });
  });
  Array.prototype.forEach.call(modoBtns, function (b) {
    b.addEventListener("click", function () {
      modo = b.getAttribute("data-modo");
      Array.prototype.forEach.call(modoBtns, function (x) { x.setAttribute("aria-checked", x === b ? "true" : "false"); });
      render();
    });
  });
  paint(root.querySelector('.row[data-name="Latte natural"]')); render();
})();
