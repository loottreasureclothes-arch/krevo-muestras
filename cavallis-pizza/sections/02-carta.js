(function () {
  "use strict";
  var WA = "524499134949";
  var cards = document.querySelectorAll(".cd"), list = document.querySelector(".pedido-l"), btn = document.querySelector(".pedido-wa");
  if (!cards.length || !list || !btn) return;
  var order = {}, names = {}, seq = [];
  Array.prototype.forEach.call(cards, function (c) { names[c.getAttribute("data-id")] = c.getAttribute("data-name"); });
  function render() {
    var lines = [], html = "";
    seq.forEach(function (id) {
      if (!order[id]) return;
      html += "<li><span>" + names[id] + "</span><b>x" + order[id] + "</b></li>";
      lines.push("- " + order[id] + " " + names[id]);
    });
    list.innerHTML = html || '<li class="vacio">Todavía vacío. Toca Agregar en lo que se te antoje.</li>';
    var msg = lines.length ? "Hola Cavalli's, quiero hacer este pedido:\n" + lines.join("\n") + "\n¿Me confirman precio y tiempo?" : "Hola Cavalli's, quiero hacer un pedido.";
    btn.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg);
    Array.prototype.forEach.call(cards, function (c) {
      var id = c.getAttribute("data-id"), n = order[id] || 0;
      c.classList.toggle("is-on", n > 0);
      c.querySelector(".cd-add").hidden = n > 0;
      c.querySelector(".cd-step").hidden = n === 0;
      c.querySelector(".cd-step b").textContent = n;
    });
  }
  function bump(id, d) {
    if (seq.indexOf(id) < 0) seq.push(id);
    order[id] = Math.max(0, Math.min(20, (order[id] || 0) + d));
    render();
  }
  Array.prototype.forEach.call(cards, function (c) {
    var id = c.getAttribute("data-id");
    c.querySelector(".cd-add").addEventListener("click", function () { bump(id, 1); });
    c.querySelector(".cd-p").addEventListener("click", function () { bump(id, 1); });
    c.querySelector(".cd-m").addEventListener("click", function () { bump(id, -1); });
  });
  window.CVPedidoAdd = function (id) { bump(id, 1); };
})();
