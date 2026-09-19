/* La México Gran Cantina: formulario de reservación a WhatsApp */
(function () {
  "use strict";
  var WA = "524491201728";

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function fechaBonita(iso) {
    var p = iso.split("-");
    if (p.length !== 3) return iso;
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    try {
      return d.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" });
    } catch (e) { return iso; }
  }

  function init() {
    var form = document.getElementById("lm-form");
    if (!form) return;
    var dia = form.elements.dia;
    var now = new Date();
    dia.min = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());

    var err = form.querySelector(".lm-form-err");

    form.addEventListener("input", function (e) {
      var f = e.target.closest(".lm-field");
      if (f) f.classList.remove("is-bad");
    });
    form.addEventListener("change", function (e) {
      var f = e.target.closest(".lm-field");
      if (f) f.classList.remove("is-bad");
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nombre = form.elements.nombre.value.trim();
      var personas = form.elements.personas.value;
      var d = form.elements.dia.value;
      var h = form.elements.hora.value;
      var ok = true;
      [["nombre", nombre], ["personas", personas], ["dia", d], ["hora", h]].forEach(function (x) {
        var bad = !x[1];
        form.elements[x[0]].closest(".lm-field").classList.toggle("is-bad", bad);
        if (bad) ok = false;
      });
      err.hidden = ok;
      if (!ok) return;

      var msg =
        "Hola, quiero reservar una mesa en La México Gran Cantina (Colosio).\n" +
        "Nombre: " + nombre + "\n" +
        "Personas: " + personas + "\n" +
        "Día: " + (/am/.test(h) ? "noche del " : "") + fechaBonita(d) + "\n" +
        "Hora: " + h + (h === "12:00 am" ? " (medianoche)" : /^12:30 am/.test(h) ? " (madrugada)" : "");
      window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    });
  }

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Header: tinto sobre secciones oscuras [data-dark], crema sobre las claras */
  function initHeaderTone() {
    var header = document.querySelector(".k-header");
    var darks = Array.prototype.slice.call(document.querySelectorAll("[data-dark]"));
    if (!header || !darks.length) return;
    var ticking = false;
    function update() {
      ticking = false;
      var y = header.getBoundingClientRect().bottom - 1;
      var on = darks.some(function (el) { var r = el.getBoundingClientRect(); return r.top <= y && r.bottom > y; });
      header.classList.toggle("lm-on-dark", on);
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* Carrusel: scroll nativo con snap, la tarjeta sigue al dedo y asoma la vecina */
  function initCarousel() {
    var root = document.querySelector(".lm-car");
    if (!root) return;
    var track = root.querySelector(".lm-car-track");
    var slides = Array.prototype.slice.call(track.querySelectorAll(".lm-slide"));
    var dotsWrap = root.querySelector(".lm-dots");
    var count = document.getElementById("lm-count");
    var index = -1, raf = 0, lastUser = 0, visible = false, drag = null;

    var dots = slides.map(function (s, i) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "lm-dot"; b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "Ver " + (s.querySelector("h3") || {}).textContent);
      b.innerHTML = "<i></i>";
      b.addEventListener("click", function () { user(); go(i); });
      dotsWrap.appendChild(b);
      return b;
    });
    var spacer = document.createElement("div");
    spacer.className = "lm-car-spacer"; spacer.setAttribute("aria-hidden", "true");
    track.appendChild(spacer);
    function sizeSpacer() {
      var cs = getComputedStyle(track), last = slides[slides.length - 1];
      var w = track.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0) - last.offsetWidth - (parseFloat(cs.columnGap || cs.gap) || 0);
      spacer.style.flex = "0 0 " + Math.max(0, w) + "px";
    }
    sizeSpacer();
    window.addEventListener("resize", sizeSpacer);
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function base() { return parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0; }
    function go(i) {
      i = (i + slides.length) % slides.length;
      track.scrollTo({ left: slides[i].offsetLeft - base(), behavior: reduce ? "auto" : "smooth" });
    }
    function setActive(i) {
      if (i === index) return;
      index = i;
      dots.forEach(function (d, k) { d.setAttribute("aria-selected", k === i ? "true" : "false"); });
      if (count) count.textContent = pad(i + 1);
    }
    function frame() {
      raf = 0;
      var x = track.scrollLeft + base(), best = 0, bestD = Infinity;
      slides.forEach(function (s, k) {
        var d = (s.offsetLeft - x) / (s.offsetWidth || 1), ad = Math.min(Math.abs(d), 1);
        if (Math.abs(d) < bestD) { bestD = Math.abs(d); best = k; }
        if (!reduce) {
          s.style.setProperty("--s", (1 - ad * 0.06).toFixed(4));
          s.style.setProperty("--o", Math.max(0, d < 0 ? 1 - ad * 3 : 1 - ad * 0.75).toFixed(3));
          s.style.visibility = d < -0.6 ? "hidden" : "";
        }
      });
      setActive(best);
    }
    track.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(frame); }, { passive: true });
    window.addEventListener("resize", function () { if (!raf) raf = requestAnimationFrame(frame); });

    // arrastre con mouse en compu (en celular es scroll nativo con el dedo)
    track.addEventListener("pointerdown", function (e) {
      user();
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      drag = { x: e.clientX, left: track.scrollLeft, moved: false, start: index };
      track.classList.add("is-dragging");
    });
    window.addEventListener("pointermove", function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.x;
      if (Math.abs(dx) > 4) drag.moved = true;
      track.scrollLeft = drag.left - dx;
    });
    window.addEventListener("pointerup", function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.x, d = drag;
      drag = null;
      track.classList.remove("is-dragging");
      var t = d.start;
      if (dx < -60) t = d.start + 1; else if (dx > 60) t = d.start - 1;
      go(Math.max(0, Math.min(slides.length - 1, t)));
      if (d.moved) {
        var stop = function (ev) { ev.preventDefault(); ev.stopPropagation(); track.removeEventListener("click", stop, true); };
        track.addEventListener("click", stop, true);
        setTimeout(function () { track.removeEventListener("click", stop, true); }, 60);
      }
    });
    track.addEventListener("touchstart", user, { passive: true });
    track.addEventListener("wheel", user, { passive: true });
    Array.prototype.forEach.call(root.querySelectorAll(".lm-arrow"), function (b) {
      b.addEventListener("click", function () { user(); go(index + parseInt(b.getAttribute("data-dir"), 10)); });
    });
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); user(); go(index + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); user(); go(index - 1); }
    });
    function user() { lastUser = Date.now(); }
    if (!reduce && "IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { visible = es[0].intersectionRatio > 0.5; }, { threshold: [0, 0.5, 1] }).observe(root);
      setInterval(function () {
        if (visible && !document.hidden && !drag && Date.now() - lastUser > 7000) go(index + 1);
      }, 4500);
    }
    frame();
  }

  /* En celular el boton flotante se esconde mientras hay CTAs de WhatsApp en pantalla */
  function initWaHide() {
    if (!("IntersectionObserver" in window)) return;
    var targets = document.querySelectorAll("#reserva .lm-form, .lm-car");
    var on = new Set();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) on.add(e.target); else on.delete(e.target); });
      document.body.classList.toggle("lm-hide-wa", on.size > 0);
    }, { threshold: 0.15 });
    Array.prototype.forEach.call(targets, function (t) { io.observe(t); });
  }

  function boot() { init(); initHeaderTone(); initCarousel(); initWaHide(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
