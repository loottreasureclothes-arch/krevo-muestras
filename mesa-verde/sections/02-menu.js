(function () {
  "use strict";
  var MV = window.MV = window.MV || {};
  var q = {}, names = {};
  var list = document.getElementById("dishes"); if (!list) return;
  var rows = list.querySelectorAll(".dish");
  [].forEach.call(rows, function (r) {
    names[r.getAttribute("data-id")] = r.getAttribute("data-name");
    var step = r.querySelector(".step");
    var qty = document.createElement("div"); qty.className = "qty";
    qty.innerHTML = '<button type="button" data-d="-1" aria-label="Quitar uno"><svg aria-hidden="true"><use href="#i-minus"/></svg></button><b>1</b><button type="button" data-d="1" aria-label="Agregar uno"><svg aria-hidden="true"><use href="#i-plus"/></svg></button>';
    step.appendChild(qty);
  });
  MV.items = function () { var o = []; for (var k in names) if (q[k]) o.push({ id: k, name: names[k], n: q[k] }); return o; };
  MV.count = function () { return MV.items().reduce(function (a, b) { return a + b.n; }, 0); };
  MV.itemsText = function () {
    var it = MV.items(); if (!it.length) return "";
    return it.map(function (i) { return "- " + i.n + " x " + i.name; }).join("\n");
  };
  function paint(bump) {
    [].forEach.call(rows, function (r) {
      var n = q[r.getAttribute("data-id")] || 0; r.classList.toggle("has", n > 0); r.querySelector(".qty b").textContent = n || 1;
    });
    var c = MV.count(), b = document.getElementById("hd-count");
    if (b) { b.textContent = c; if (bump) { b.classList.add("bump"); setTimeout(function () { b.classList.remove("bump"); }, 260); } }
    var a = document.getElementById("send-order"), note = document.getElementById("send-note"), t = MV.itemsText();
    var msg = t ? "Hola Mesa Verde, quiero pedir:\n" + t + "\n¿Cuánto es y en cuánto tiempo está?" : "Hola Mesa Verde, quiero pedir.";
    a.setAttribute("data-wa", msg); a.href = MV.wa(msg);
    note.textContent = c ? c + (c === 1 ? " plato en tu pedido." : " platos en tu pedido.") + " Ya va armado el mensaje." : "Agrega lo que se te antoje y lo mandamos armado.";
    document.dispatchEvent(new CustomEvent("mv:items"));
  }
  list.addEventListener("click", function (e) {
    var row = e.target.closest(".dish"); if (!row) return;
    var id = row.getAttribute("data-id");
    if (e.target.closest(".add")) q[id] = 1;
    else { var b = e.target.closest("[data-d]"); if (!b) return; q[id] = Math.max(0, (q[id] || 0) + (+b.getAttribute("data-d"))); }
    paint(true);
  });
  paint(false);
})();
