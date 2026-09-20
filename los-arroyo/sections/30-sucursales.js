/* 30 · Sucursales: las pestañas enseñan una sucursal a la vez (la sección medía 3,084 px en celular).
   Progresivo: sin JS quedan las 3 tarjetas completas y las pestañas siguen siendo anclas que funcionan.
   Cualquier ancla #suc-* de la página (menú hamburguesa incluido) elige su pestaña antes de que
   site.js haga el scroll suave: por eso el listener va en fase de captura. */
(function () {
  "use strict";
  var sec = document.getElementById("sucursales");
  if (!sec) return;
  var tabs = Array.prototype.slice.call(sec.querySelectorAll(".su-tabs .lm-chip"));
  var cards = Array.prototype.slice.call(sec.querySelectorAll(".su-card"));
  if (!tabs.length || tabs.length !== cards.length) return;
  sec.classList.add("su-js");

  function pick(id) {
    var found = false, i;
    for (i = 0; i < cards.length; i++) if (cards[i].id === id) found = true;
    if (!found) return false;
    for (i = 0; i < cards.length; i++) cards[i].classList.toggle("is-on", cards[i].id === id);
    for (i = 0; i < tabs.length; i++) {
      var on = (tabs[i].getAttribute("href") || "").slice(1) === id;
      tabs[i].classList.toggle("is-on", on);
      if (on) tabs[i].setAttribute("aria-current", "true"); else tabs[i].removeAttribute("aria-current");
    }
    return true;
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#suc-"]');
    if (!a) return;
    pick(a.getAttribute("href").slice(1));
  }, true);

  var hash = (location.hash || "").slice(1);
  if (!pick(hash)) pick(cards[0].id);
})();

/* Un solo botón verde al final. Abre el pedido si ya existe (26-pedido);
   si no está disponible, cae a WhatsApp directo con LM.openWa (site.js). */
(function () {
  "use strict";
  var btn = document.getElementById("su-pedir-wa");
  if (!btn) return;
  btn.addEventListener("click", function () {
    if (window.lmPedido && typeof window.lmPedido.open === "function") { window.lmPedido.open(); return; }
    if (window.LM && typeof window.LM.openWa === "function") { window.LM.openWa("Hola, quiero hacer un pedido en Los Arroyo."); return; }
    location.href = "https://wa.me/524495542823";
  });
})();

/* Fotos de sucursales: entran desde blur (catalogo-motion.md #14), una vez cada una. Nunca se quedan
   borrosas: la imagen ya está nítida en el CSS base, esto solo la anima al aparecer. */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var imgs = document.querySelectorAll("#sucursales .su-ph img");
  if (!imgs.length || reduce || !("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      var img = e.target;
      var run = function () {
        if (!img.animate) return;
        img.animate(
          [{ filter: "blur(16px)", transform: "scale(1.06)", opacity: 0.6 }, { filter: "blur(0px)", transform: "scale(1)", opacity: 1 }],
          { duration: 1100, easing: "cubic-bezier(.23,1,.32,1)" }
        );
      };
      if (img.complete) { img.decode ? img.decode().then(run, run) : run(); }
      else img.addEventListener("load", function () { img.decode ? img.decode().then(run, run) : run(); }, { once: true });
    });
  }, { threshold: 0.15 });
  Array.prototype.forEach.call(imgs, function (im) { io.observe(im); });
})();
