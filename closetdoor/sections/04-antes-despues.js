/* 04 · Antes / después
   - Toggle Cocina / Closet (la cocina va primero: FEEDBACK-2 #5) (tabs accesibles con flechas).
   - Entrada: una puerta de nogal se corre y descubre el comparador; después el kit hace el barrido de la manija.
   - Toggle con morph: la pastilla se estira hacia la pestaña nueva (borde delantero rápido, trasero lo alcanza)
     y el panel nuevo entra con un barrido en la misma dirección.
   El comparador lo arma ../_kit/antesdespues.js. Sin GSAP todo funciona con transiciones CSS. */
(function () {
  "use strict";
  /* limpia estilos en línea sin depender de GSAP (si su reloj se atora, gsap.set tampoco corre) */
  function clr(els, props) {
    if (!els) return;
    if (els.nodeType) els = [els];
    Array.prototype.forEach.call(els, function (el) {
      props.forEach(function (p) { el.style.removeProperty(p); });
      if (el._gsap) { el._gsap.uncache = 1; }
    });
  }
  function init() {
    var sec = document.getElementById("antes-despues");
    if (!sec) return;
    var list = sec.querySelector(".s-ad-tabs");
    if (!list) return;
    var pill = list.querySelector(".s-ad-pill");
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    var gsap = window.gsap;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var motion = !!(gsap && !reduce);
    var current = 0;

    if (motion) {
      list.classList.add("is-gsap");
      gsap.set(pill, { "--l": 0, "--r": 50 });
    }

    function morphPill(to) {
      if (!motion) return;
      var right = to === 1;
      gsap.killTweensOf(pill);
      /* borde delantero sale primero (rápido), el trasero lo alcanza: se lee como una gota que se estira */
      gsap.to(pill, { "--r": right ? 0 : 50, duration: right ? 0.26 : 0.4, delay: right ? 0 : 0.07, ease: "power3.out" });
      gsap.to(pill, { "--l": right ? 50 : 0, duration: right ? 0.4 : 0.26, delay: right ? 0.07 : 0, ease: "power3.out" });
    }

    function enterPanel(panel, fromRight) {
      if (!motion) return;
      var ba = panel.querySelector(".k-ba");
      var imgs = panel.querySelectorAll(".k-ba img");
      gsap.killTweensOf([ba, imgs]);
      gsap.fromTo(ba,
        { clipPath: fromRight ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "expo.out", clearProps: "clipPath" });
      gsap.fromTo(imgs, { scale: 1.06 }, { scale: 1, duration: 0.8, ease: "expo.out", clearProps: "transform" });
      /* red de seguridad: si el tween se atora, el panel nunca se queda recortado */
      setTimeout(function () { gsap.killTweensOf([ba, imgs]); clr(ba, ["clip-path"]); clr(imgs, ["transform", "translate", "rotate", "scale"]); }, 1200);
    }

    function select(i, focus) {
      if (i === current) { if (focus) tabs[i].focus(); return; }
      var goingRight = i > current;
      tabs.forEach(function (t, j) {
        var on = j === i;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        if (!panel) return;
        if (on) { panel.hidden = false; enterPanel(panel, goingRight); }
        else panel.hidden = true;
      });
      current = i;
      list.setAttribute("data-on", String(i));
      morphPill(i);
      if (focus) tabs[i].focus();
    }

    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(i, false); });
      t.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          var n = (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
          select(n, true);
        }
      });
    });
    list.setAttribute("data-on", "0");

    /* Precarga del closet (segunda pestaña) cuando la cocina ya está cerca: al cambiar no se ve vacío */
    function warmCloset() {
      Array.prototype.forEach.call(sec.querySelectorAll("#ad-closet img"), function (img) {
        var pre = new Image(); pre.decoding = "async"; pre.src = img.currentSrc || img.src;
      });
    }

    /* Entrada: la puerta de nogal se corre a la derecha (ease-in-out: es movimiento en pantalla).
       A prueba de fallas (FEEDBACK-2 #6): la puerta es invisible por CSS y solo se enciende EN EL
       MOMENTO del disparo, que lo da un IntersectionObserver nativo (no depende de posiciones
       precalculadas de ScrollTrigger). Si GSAP no llega o el tween se atora (rAF pausado en el
       navegador de WhatsApp/Instagram), un setTimeout quita la puerta: nunca se queda tapado. */
    var door = sec.querySelector(".s-ad-door");
    var ba0 = door ? door.parentNode : null;
    if (!ba0 || !("IntersectionObserver" in window)) { if (door) door.remove(); warmCloset(); return; }
    var fired = false;
    function play() {
      if (fired) return; fired = true;
      warmCloset();
      if (!motion) { door.remove(); return; }
      var imgs0 = ba0.querySelectorAll("img");
      var handle = door.querySelector("i");
      gsap.set(door, { autoAlpha: 1, xPercent: 0 });
      var tl = gsap.timeline({ onComplete: function () { door.remove(); } });
      tl.to(handle, { x: -6, duration: 0.14, ease: "power2.out" })
        .to(door, { xPercent: 101, duration: 0.85, ease: "power3.inOut" }, 0.08)
        .fromTo(imgs0, { scale: 1.08 }, { scale: 1, duration: 1.05, ease: "expo.out", clearProps: "transform" }, 0.2);
      setTimeout(function () {
        if (door.parentNode) { tl.kill(); door.remove(); clr(imgs0, ["transform", "translate", "rotate", "scale"]); }
      }, 1800);
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { io.disconnect(); play(); } });
    }, { rootMargin: "0px 0px -22% 0px" });
    io.observe(ba0);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
