/* Carta: en celular y tableta se ve por partes (pestañas). Sin JS, o en compu, se ve toda. */
(function () {
  "use strict";
  var sec = document.getElementById("carta");
  if (!sec) return;
  var tabs = [].slice.call(sec.querySelectorAll(".ctab")), panels = [].slice.call(sec.querySelectorAll(".ct"));
  if (!tabs.length) return;
  sec.classList.add("tabs-on");
  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      tabs.forEach(function (x) { var on = x === t; x.classList.toggle("on", on); x.setAttribute("aria-selected", on ? "true" : "false"); });
      panels.forEach(function (p) { p.classList.toggle("on", p.getAttribute("data-panel") === t.getAttribute("data-tab")); });
    });
  });
})();
