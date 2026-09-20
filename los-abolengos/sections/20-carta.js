/* #carta: chips como pestañas de categoría (una visible a la vez, tope de alto en celular). */
(function () {
  "use strict";
  function ready(fn) { if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn); else fn(); }
  ready(function () {
    var carta = document.getElementById("carta");
    if (!carta) return;
    var chips = carta.querySelectorAll("[data-cat-tab]");
    if (!chips.length) return;
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var id = chip.getAttribute("data-cat-tab");
        chips.forEach(function (c) { c.setAttribute("aria-selected", c === chip ? "true" : "false"); });
        carta.querySelectorAll(".mn-cat").forEach(function (cat) { cat.hidden = cat.id !== id; });
        var head = document.querySelector(".mn-chips");
        if (head) {
          var top = head.getBoundingClientRect().bottom + window.scrollY - head.offsetHeight - 8;
          window.scrollTo({ top: Math.max(0, top), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        }
      });
    });
  });
})();
