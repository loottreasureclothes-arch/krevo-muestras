/* 02 · La carta: chips activos por scroll + botones "+" que mandan al carrito
   compartido (window.LCCart, definido en carrito.js). Todo en try/catch. */
(function () {
  "use strict";
  var sec = document.getElementById("carta");
  if (!sec) return;

  function initAdd() {
    var btns = sec.querySelectorAll(".s-card-add");
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        try {
          var card = btn.closest("[data-item]");
          var name = card.getAttribute("data-item");
          var priceAttr = card.getAttribute("data-price");
          var price = priceAttr && priceAttr.length ? parseInt(priceAttr, 10) : null;
          if (window.LCCart && typeof window.LCCart.add === "function") {
            window.LCCart.add(name, price);
          }
          btn.classList.add("is-added");
          window.setTimeout(function () { btn.classList.remove("is-added"); }, 500);
        } catch (e) {}
      });
    });
  }

  function initChips() {
    var chips = sec.querySelectorAll(".s-carta-chips a");
    var groups = sec.querySelectorAll(".s-carta-group");
    if (!chips.length || !groups.length) return;
    if (!("IntersectionObserver" in window)) return;
    var byId = {};
    chips.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var link = byId[entry.target.id];
        if (!link) return;
        chips.forEach(function (a) { a.classList.remove("is-active"); });
        link.classList.add("is-active");
      });
    }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });
    groups.forEach(function (g) { io.observe(g); });
  }

  try { initAdd(); } catch (e) {}
  try { initChips(); } catch (e) {}
})();
