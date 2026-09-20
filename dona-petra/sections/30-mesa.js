/* Momento firma "Una mesa de Petra cuesta $228": 3 etiquetas caen sobre la foto real +
   el total, disparadas por GSAP/ScrollTrigger cuando la sección llega a ~45% del viewport,
   reversible al subir, sin pin. Blindaje: a los 1.6 s todo visible aunque falle GSAP o el CDN. */
(function () {
  "use strict";
  var sec = document.getElementById("mesa");
  if (!sec) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var tags = sec.querySelectorAll("[data-tag]");

  function showAll() { Array.prototype.forEach.call(tags, function (t) { t.classList.add("is-in"); }); }

  if (reduce || !window.gsap || !window.ScrollTrigger) {
    showAll();
  } else {
    gsap.registerPlugin(ScrollTrigger);
    var ordered = sec.querySelectorAll('[data-tag="1"], [data-tag="2"], [data-tag="3"]');
    var total = sec.querySelector('[data-tag="4"]');
    var tl = gsap.timeline({ paused: true });
    tl.call(function () { Array.prototype.forEach.call(ordered, function (t) { t.classList.add("is-in"); }); }, null, 0);
    tl.set({}, {}, 0.42); // separa la entrada escalonada del total (~140ms x 3)
    tl.call(function () { if (total) total.classList.add("is-in"); }, null, 0.9);
    tl.to({}, { duration: 1.16 });
    ScrollTrigger.create({
      trigger: sec, start: "top 60%",
      onEnter: function () { tl.play(); },
      onLeaveBack: function () {
        tl.pause(0);
        Array.prototype.forEach.call(tags, function (t) { t.classList.remove("is-in"); });
      }
    });
  }

  setTimeout(showAll, 1600);

  /* "Agregar esta mesa" es un <button> y lo engancha el motor del carrito (20-carta.js,
     [data-mesa-add]): mete Pozole Verde Mediano + Agua de Horchata y prende la barra
     "Mi pedido". Aqui NO se engancha nada: el enganche doble mandaba al visitante de
     regreso a #carta. */
})();
