/* El salsero y la comanda: platos con cantidad, salsas tocables y un WhatsApp armado con lo elegido. */
(function () {
  "use strict";
  var WA = "524499787878";
  var dishes = document.querySelectorAll(".pj-dish");
  var sals = document.querySelectorAll(".pj-sal");
  if (!dishes.length) return;
  var list = document.getElementById("pj-tk-list");
  var empty = document.getElementById("pj-tk-empty");
  var salLine = document.getElementById("pj-tk-sal");
  var salNow = document.getElementById("pj-sal-now");
  var send = document.getElementById("pj-send");
  var peek = document.getElementById("pj-peek");
  var peekN = document.getElementById("pj-peek-n");
  var modeBtns = document.querySelectorAll(".pj-mode button");
  var qty = {}, order = [], salsas = [], mode = "para llevar";

  function join(arr) {
    if (arr.length < 2) return arr.join("");
    return arr.slice(0, -1).join(", ") + " y " + arr[arr.length - 1];
  }
  function message() {
    var parts = [];
    var items = order.filter(function (id) { return qty[id] > 0; }).map(function (id) {
      var el = document.querySelector('.pj-dish[data-id="' + id + '"]');
      return el.getAttribute("data-name") + " x" + qty[id];
    });
    if (!items.length) return "Hola Parrillada Jardines, quiero hacer un pedido " + mode + ".";
    parts.push("Hola Parrillada Jardines, quiero pedir " + mode + ": " + items.join(", ") + ".");
    if (salsas.length) parts.push("Con " + join(salsas) + ".");
    parts.push("¿Cuánto sería?");
    return parts.join(" ");
  }
  function render(newId) {
    var total = 0;
    list.innerHTML = "";
    order.forEach(function (id) {
      if (!(qty[id] > 0)) return;
      total += qty[id];
      var name = document.querySelector('.pj-dish[data-id="' + id + '"]').getAttribute("data-name");
      var li = document.createElement("li");
      if (id !== newId) li.style.animation = "none";
      li.innerHTML = "<span></span><b></b>";
      li.firstChild.textContent = name;
      li.lastChild.textContent = "x" + qty[id];
      list.appendChild(li);
    });
    Array.prototype.forEach.call(dishes, function (d) {
      var id = d.getAttribute("data-id"), q = qty[id] || 0;
      d.classList.toggle("has-qty", q > 0);
      d.querySelector(".pj-qty").textContent = q;
      d.querySelector(".pj-q-n").textContent = q || 1;
      d.querySelector(".pj-step").setAttribute("data-state", q > 0 ? "on" : "idle");
    });
    empty.hidden = total > 0;
    if (salsas.length) { salLine.hidden = false; salLine.innerHTML = "Salsas: <b></b>"; salLine.lastChild.textContent = join(salsas); }
    else salLine.hidden = true;
    salNow.textContent = salsas.length ? join(salsas).replace(/^./, function (c) { return c.toUpperCase(); }) : "Sin salsa por ahora";
    peek.hidden = total === 0;
    peekN.textContent = total;
    send.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(message());
  }
  Array.prototype.forEach.call(dishes, function (d) {
    var id = d.getAttribute("data-id");
    function bump(n) {
      if (order.indexOf(id) < 0 && n > 0) order.push(id);
      qty[id] = Math.max(0, Math.min(20, (qty[id] || 0) + n));
      render(id);
    }
    d.querySelector(".pj-add").addEventListener("click", function () { bump(1); });
    d.querySelector(".pj-q-plus").addEventListener("click", function () { bump(1); });
    d.querySelector(".pj-q-minus").addEventListener("click", function () { bump(-1); });
  });
  Array.prototype.forEach.call(sals, function (b) {
    b.addEventListener("click", function () {
      var s = b.getAttribute("data-sal"), i = salsas.indexOf(s), on = i < 0;
      if (on) salsas.push(s); else salsas.splice(i, 1);
      b.setAttribute("aria-pressed", on ? "true" : "false");
      render();
    });
  });
  Array.prototype.forEach.call(modeBtns, function (b) {
    b.addEventListener("click", function () {
      mode = b.getAttribute("data-mode");
      Array.prototype.forEach.call(modeBtns, function (x) { x.setAttribute("aria-checked", x === b ? "true" : "false"); });
      render();
    });
  });
  render();
})();
