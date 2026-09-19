/* 02b · Catálogo de muebles: filtros por tipo y entrada escalonada con GSAP (solo toca #catalogo) */
(function () {
  "use strict";
  var sec = document.getElementById("catalogo");
  if (!sec) return;
  var grid = sec.querySelector(".s-muebles-grid");
  var items = Array.prototype.slice.call(sec.querySelectorAll(".s-muebles-item"));
  var chips = Array.prototype.slice.call(sec.querySelectorAll(".s-muebles-chip"));
  var status = sec.querySelector(".s-muebles-status");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var NAMES = { todos: "todos los muebles", closets: "closets", muebles: "muebles", muros: "muros y celosías", cocinas: "cocinas", banos: "baños", puertas: "puertas" };
  var current = "todos";
  var busy = null;

  sec.classList.add("is-js");

  function gs() { return window.gsap || null; }

  /* ---------- Filtros ---------- */
  function apply(cat) {
    var shown = [];
    items.forEach(function (it) {
      var on = cat === "todos" || it.getAttribute("data-cat") === cat;
      it.hidden = !on;
      it.classList.remove("is-first");
      if (on) shown.push(it);
    });
    if (shown[0]) shown[0].classList.add("is-first");
    grid.classList.toggle("is-filtered", cat !== "todos");
    grid.setAttribute("data-n", String(shown.length));
    if (status) status.textContent = "Mostrando " + shown.length + (shown.length === 1 ? " mueble" : " muebles") + ": " + NAMES[cat] + ".";
    return shown;
  }

  function select(cat) {
    if (cat === current) return;
    current = cat;
    chips.forEach(function (c) { c.setAttribute("aria-pressed", c.getAttribute("data-cat") === cat ? "true" : "false"); });
    var g = gs();
    var visible = items.filter(function (it) { return !it.hidden; });
    if (!g || reduce) {
      var s = apply(cat);
      if (g && reduce) g.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, overwrite: true });
      return;
    }
    if (busy) busy.kill();
    // salida rápida (respuesta del sistema) y entrada escalonada un poco más lenta
    busy = g.timeline()
      .to(visible, { autoAlpha: 0, y: 8, duration: 0.16, ease: "power2.out", stagger: 0.015, overwrite: true })
      .add(function () {
        var s = apply(cat);
        g.set(items, { clearProps: "transform,opacity,visibility" });
        g.fromTo(s, { autoAlpha: 0, y: 18, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.42, ease: "power3.out", stagger: 0.05, clearProps: "transform,opacity,visibility" });
      });
  }

  chips.forEach(function (c) {
    c.addEventListener("click", function () { select(c.getAttribute("data-cat")); });
  });

  /* ---------- Entrada con GSAP + ScrollTrigger (se dispara una vez, con poco scroll) ---------- */
  function intro() {
    var g = gs();
    if (!g || reduce) return;
    var ST = window.ScrollTrigger;
    if (ST && g.registerPlugin) g.registerPlugin(ST);
    var lines = sec.querySelectorAll(".s-muebles-line");
    var lead = sec.querySelector(".s-muebles-lead");
    var ruler = sec.querySelector(".s-muebles-ruler");
    var photos = items.map(function (it) { return it.querySelector(".s-muebles-ph"); });

    var head = g.timeline({ paused: true, defaults: { ease: "power3.out" } })
      .from(lines, { yPercent: 60, autoAlpha: 0, duration: 0.7, stagger: 0.08 })
      .from(lead, { y: 14, autoAlpha: 0, duration: 0.6 }, "-=0.45")
      .from(ruler, { scaleX: 0, duration: 0.8, ease: "power2.out" }, "-=0.55");

    // collage: cada pieza sube y la foto se asienta (escala 1.08 → 1), cascada corta
    var body = g.timeline({ paused: true, defaults: { ease: "power3.out" } })
      .from(items, { y: 36, autoAlpha: 0, duration: 0.7, stagger: { each: 0.06, from: "start" } })
      .from(photos, { scale: 1.08, duration: 1.0, stagger: { each: 0.06, from: "start" }, clearProps: "transform" }, 0);

    if (ST) {
      ST.create({ trigger: sec, start: "top 82%", once: true, onEnter: function () { head.play(); } });
      ST.create({ trigger: grid, start: "top 88%", once: true, onEnter: function () { body.play(); } });
    } else if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          (e.target === grid ? body : head).play();
          io.unobserve(e.target);
        });
      }, { rootMargin: "0px 0px -12% 0px" });
      io.observe(sec.querySelector(".s-muebles-head"));
      io.observe(grid);
    } else { head.progress(1); body.progress(1); }

    /* Red de seguridad (FEEDBACK-2 #6): .from() esconde las piezas desde que carga la página; si
       ScrollTrigger mide mal (fotos lazy arriba) o el reloj de GSAP se atora (WhatsApp/Instagram),
       a los 1.6 s de asomarse cada bloque queda en su estado final, sin depender del tween. */
    function force(tl, els) {
      if (tl.progress() < 1) { tl.progress(1); tl.kill(); }
      Array.prototype.forEach.call(els, function (el) {
        if (!el) return;
        ["opacity", "visibility", "transform", "translate", "rotate", "scale"].forEach(function (p) { el.style.removeProperty(p); });
      });
    }
    if ("IntersectionObserver" in window) {
      var sio = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          sio.unobserve(e.target);
          var isGrid = e.target === grid;
          setTimeout(function () {
            if (isGrid) force(body, items.concat(photos));
            else force(head, Array.prototype.slice.call(lines).concat([lead, ruler]));
          }, 1600);
        });
      }, { rootMargin: "0px 0px -25% 0px" });
      sio.observe(sec.querySelector(".s-muebles-head"));
      sio.observe(grid);
    }
  }

  intro(); // gsap y ScrollTrigger van antes (defer en orden); ScrollTrigger se recalcula solo al cargar
})();
