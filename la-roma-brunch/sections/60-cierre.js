/* 60-cierre: si hay platos en la mesa, el cierre los repite con la suma y el boton verde */
(function () {
  "use strict";
  var M = window.RomaMesa, sec = document.getElementById("cierre");
  if (!M || !sec) return;
  var on = sec.querySelector(".rm-cierre-on"), off = sec.querySelector(".rm-cierre-off");
  var plates = sec.querySelector(".rm-cierre-plates"), suma = sec.querySelector(".rm-cierre-suma"), sub = sec.querySelector(".rm-cierre-sub");
  function render() {
    var items = M.state.items;
    on.hidden = items.length === 0; off.hidden = items.length > 0;
    plates.innerHTML = "";
    items.forEach(function (id) {
      var li = document.createElement("li"), im = document.createElement("img");
      im.src = M.dishes[id].img; im.alt = M.dishes[id].name; im.width = 112; im.height = 112;
      li.appendChild(im); plates.appendChild(li);
    });
    var t = M.total();
    suma.hidden = !(items.length && t.sum > 0);
    if (!suma.hidden) suma.textContent = "SUMA " + M.money(t.sum);
    sub.hidden = t.pending === 0;
    if (!sub.hidden) sub.textContent = t.pending + " por confirmar por WhatsApp";
  }
  window.addEventListener("rm:change", render);
  render();
})();
