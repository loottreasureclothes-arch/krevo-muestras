/* carta: botones + / - ligados a la charola (window.Tq) */
(function () {
  "use strict";
  function init() {
    if (!window.Tq) return;
    var list = document.getElementById("tq-list");
    if (!list) return;
    list.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("[data-add],[data-rm]") : null;
      if (!a) return;
      if (a.hasAttribute("data-add")) Tq.add(a.getAttribute("data-add")); else Tq.remove(a.getAttribute("data-rm"));
    });
    function paint() {
      Tq.MENU.forEach(function (m) {
        var q = Tq.state.q[m.id] || 0, row = list.querySelector('[data-row="' + m.id + '"]');
        if (!row) return;
        var minus = row.querySelector(".tq-minus"), x = row.querySelector(".tq-x");
        minus.hidden = q < 1; x.hidden = q < 1; x.textContent = q ? "×" + q : "";
      });
    }
    Tq.on(paint); paint();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
