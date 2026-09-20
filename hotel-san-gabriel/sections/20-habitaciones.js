/* 20 Habitaciones: al tocar una tarjeta (foto o nombre) se abre el detalle en un modal compartido,
   clonado de la <template> de esa tarjeta. El botón "Reservar esta" del modal usa el mecanismo global
   de SG.reservar (site.js initAnchors ya intercepta cualquier a[data-room]); aquí solo le ponemos
   la habitación correcta antes de que el clic llegue a document. "Atrás" cierra el modal (como el lightbox). */
(function () {
  "use strict";
  var sec = document.getElementById("habitaciones"), modal = document.getElementById("hb-modal");
  if (!sec || !modal) return;
  var body = modal.querySelector(".hb-modal-body"), cta = modal.querySelector(".hb-modal-cta"), close = modal.querySelector(".hb-modal-close");
  var pushed = false, last = null;

  function open(tpl, from) {
    last = from;
    body.innerHTML = "";
    body.appendChild(tpl.content.cloneNode(true));
    cta.setAttribute("data-room", tpl.getAttribute("data-room") || "");
    modal.hidden = false;
    requestAnimationFrame(function () { modal.classList.add("is-open"); });
    document.documentElement.classList.add("sg-lock");
    try { history.pushState({ sgHb: 1 }, ""); pushed = true; } catch (e) {}
    close.focus({ preventScroll: true });
  }
  function shut(fromPop, keepHistory) {
    if (!modal.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    document.documentElement.classList.remove("sg-lock");
    setTimeout(function () { modal.hidden = true; }, 320);
    if (pushed && !fromPop && !keepHistory) { try { history.back(); } catch (e) {} }
    pushed = false;
    if (last && !keepHistory) { try { last.focus({ preventScroll: true }); } catch (e) {} }
  }

  sec.addEventListener("click", function (e) {
    var b = e.target.closest("[data-open]");
    if (!b) return;
    var tpl = b.closest(".hb-card").querySelector("[data-tpl]");
    if (tpl) open(tpl, b);
  });
  modal.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]")) shut();
    /* "Reservar esta" ya va a #reserva y hace scroll (SG.goTo, en site.js): cerramos sin history.back()
       para no pelear ese scroll con la restauración automática de posición que hace el navegador al volver. */
    if (e.target.closest(".hb-modal-cta")) shut(false, true);
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && modal.classList.contains("is-open")) shut(); });
  window.addEventListener("popstate", function () { shut(true); });
})();
