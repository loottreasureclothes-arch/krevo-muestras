(function () {
  "use strict";
  function init() {
    var C = window.Cantina, root = document.getElementById("cantinas");
    if (!root || !C) return;
    var cards = Array.prototype.slice.call(root.querySelectorAll(".cc"));
    var car = document.getElementById("car"), strip = document.getElementById("strip");

    /* Abierta ahora, por sucursal, con sus horarios reales y la hora de Aguascalientes */
    function estados() {
      var t = C.ahora();
      cards.forEach(function (c) {
        var e = C.estadoTxt(c.dataset.suc, t.dow, t.min), el = c.querySelector("[data-estado]");
        el.textContent = e.t;
        el.classList.toggle("is-open", e.open); el.classList.toggle("is-closed", !e.open);
      });
    }
    estados(); setInterval(estados, 30000);

    /* Las perforaciones corren con el carrusel */
    if (car && strip) car.addEventListener("scroll", function () { strip.style.setProperty("--cx", car.scrollLeft); }, { passive: true });

    /* Elegir esta: la guarda para el mensaje de la mesa */
    function paint() {
      var s = C.state.suc;
      cards.forEach(function (c) {
        var on = c.dataset.suc === s && picked;
        c.classList.toggle("is-pick", on);
        var b = c.querySelector(".cc-pick"); b.setAttribute("aria-pressed", on ? "true" : "false");
        b.querySelector(".lnk-t").textContent = on ? "Tu cantina" : "Elegir esta";
      });
    }
    var picked = false;
    root.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("[data-pick]"); if (!b) return;
      picked = true; C.set("suc", b.dataset.pick); paint();
    });
    C.on(paint);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
