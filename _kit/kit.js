/* KREVO kit base: header solido, boton WhatsApp, reveal. Vanilla, sin dependencias. */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("k-js");

  var WA_SVG =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>';

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initHeader() {
    var header = document.querySelector(".k-header");
    if (!header) return;
    var ticking = false;
    function update() {
      ticking = false;
      header.classList.toggle("is-solid", (window.scrollY || window.pageYOffset) > 40);
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  function initWhatsApp() {
    var btns = document.querySelectorAll(".k-wa");
    for (var i = 0; i < btns.length; i++) {
      var a = btns[i];
      if (!a.querySelector("svg")) a.insertAdjacentHTML("afterbegin", WA_SVG);
      if (!a.hasAttribute("aria-label")) a.setAttribute("aria-label", "WhatsApp");
      if (/wa\.me|whatsapp\.com/.test(a.getAttribute("href") || "")) {
        if (!a.hasAttribute("target")) a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener");
      }
    }
  }

  function showAll(els) {
    for (var i = 0; i < els.length; i++) els[i].classList.add("is-in");
  }

  function initReveal() {
    var els = document.querySelectorAll("[data-reveal], [data-reveal-stagger]");
    if (!els.length) return;

    // Hijos escalonados: indice para el retraso de 70 ms
    var groups = document.querySelectorAll("[data-reveal-stagger]");
    for (var g = 0; g < groups.length; g++) {
      var kids = groups[g].children;
      for (var k = 0; k < kids.length; k++) kids[k].style.setProperty("--k-i", k);
    }
    // Retraso manual en ms
    for (var d = 0; d < els.length; d++) {
      var ms = parseInt(els[d].getAttribute("data-reveal-delay"), 10);
      if (ms > 0) {
        if (els[d].hasAttribute("data-reveal-stagger")) {
          var ch = els[d].children;
          for (var c = 0; c < ch.length; c++) ch[c].style.transitionDelay = (ms + c * 70) + "ms";
        } else {
          els[d].style.transitionDelay = ms + "ms";
        }
      }
    }

    if (reduced || !("IntersectionObserver" in window)) { showAll(els); return; }

    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add("is-in");
          io.unobserve(entries[i].target);
        }
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });

    // Chrome recorta el area de interseccion con el clip-path del propio
    // elemento: con inset(0 0 100% 0) mide 0 y el IO nunca dispara. Los
    // [data-reveal="clip"] se vigilan por su caja (getBoundingClientRect no
    // aplica clip-path), con la misma regla: 12 % dentro del 90 % de arriba.
    var clips = [];
    for (var j = 0; j < els.length; j++) {
      if (els[j].getAttribute("data-reveal") === "clip") clips.push(els[j]);
      else io.observe(els[j]);
    }
    if (clips.length) {
      var queued = false;
      var checkClips = function () {
        queued = false;
        var vh = window.innerHeight || doc.clientHeight;
        for (var n = clips.length - 1; n >= 0; n--) {
          var r = clips[n].getBoundingClientRect();
          var need = Math.min(r.height * 0.12, vh * 0.2);
          if (r.bottom - need > 0 && r.top + need < vh * 0.9 && (r.width || r.height)) {
            clips[n].classList.add("is-in");
            clips.splice(n, 1);
          }
        }
        if (!clips.length) {
          window.removeEventListener("scroll", onClipScroll);
          window.removeEventListener("resize", onClipScroll);
        }
      };
      var onClipScroll = function () {
        if (!queued) { queued = true; requestAnimationFrame(checkClips); }
      };
      window.addEventListener("scroll", onClipScroll, { passive: true });
      window.addEventListener("resize", onClipScroll, { passive: true });
      checkClips(); // lo que ya se ve al cargar entra sin esperar a un scroll
    }

    // Red de seguridad: si a los 1.6 s algo sigue escondido pero ya esta
    // dentro de la pantalla, se muestra a la fuerza. Sin esto, cuando el IO
    // no dispara (clip-path, img lazy, seccion medida en cero) el bloque se
    // queda en blanco para siempre. Regla 7 del criterio: nada en blanco.
    window.setTimeout(function () {
      var vh = window.innerHeight || doc.clientHeight;
      var todos = document.querySelectorAll("[data-reveal]:not(.is-in), [data-reveal-stagger]:not(.is-in)");
      for (var t = 0; t < todos.length; t++) {
        var c = todos[t].getBoundingClientRect();
        if (c.bottom > 0 && c.top < vh * 1.2) todos[t].classList.add("is-in");
      }
    }, 1600);
  }

  function init() {
    initHeader();
    initWhatsApp();
    initReveal();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  window.KrevoKit = { waSvg: WA_SVG, reveal: initReveal };
})();
