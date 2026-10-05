/* Casa Victoria: reveal, barra compacta, boton de llamada flotante, arco que se abre con el scroll, abierto ahora. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;
  if (!reduce) root.classList.add("mo");

  var bar = document.getElementById("bar");
  var fab = document.getElementById("fab");
  var open = document.querySelectorAll("[data-arch]");
  var rv = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  var hide = document.querySelectorAll("[data-hide-fab]");
  var raf = null;

  function tick() {
    raf = null;
    var vh = window.innerHeight || 700;
    var y = window.scrollY || 0;
    if (bar) bar.classList.toggle("is-compact", y > 12);
    for (var i = rv.length - 1; i >= 0; i--) {
      var r = rv[i].getBoundingClientRect();
      if (r.top < vh * 0.92) { rv[i].classList.add("in"); rv.splice(i, 1); }
    }
    if (!reduce) {
      for (var k = 0; k < open.length; k++) {
        var b = open[k].getBoundingClientRect();
        /* 0 cuando el bloque asoma por abajo, 1 cuando su centro llega al 45% de la pantalla */
        var p = (vh - b.top) / (vh * 0.55 + b.height * 0.2);
        p = Math.max(0, Math.min(1, p));
        open[k].style.setProperty("--p", p.toFixed(3));
      }
    }
    var off = false;
    for (var j = 0; j < hide.length; j++) {
      var h = hide[j].getBoundingClientRect();
      if (h.top < vh * 0.85 && h.bottom > 0) { off = true; break; }
    }
    if (fab) fab.classList.toggle("is-off", off);
  }
  function sched() { if (!raf) raf = requestAnimationFrame(tick); }
  window.addEventListener("scroll", sched, { passive: true });
  window.addEventListener("resize", sched);
  document.addEventListener("DOMContentLoaded", sched);
  sched();

  /* anclas con scroll controlado (sin scroll-behavior en CSS) */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute("href").length < 2) return;
    var el = document.querySelector(a.getAttribute("href"));
    if (!el) return;
    e.preventDefault();
    var top = el.getBoundingClientRect().top + window.scrollY - (bar ? bar.offsetHeight : 0) - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  });

  /* Abierto ahora: solo se conoce el horario del lunes (ficha de Maps) */
  var st = document.getElementById("abierto");
  if (st) {
    var fmt = new Intl.DateTimeFormat("es-MX", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false });
    var parts = {}; fmt.formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    var wd = (parts.weekday || "").toLowerCase().replace(".", "");
    var hh = parseInt(parts.hour, 10) % 24;
    if (wd.indexOf("lun") === 0) {
      var isOpen = hh >= 10 && hh < 20;
      st.textContent = isOpen ? "Hoy lunes: abierto ahora, hasta las 20:00" : "Hoy lunes: cerrado ahora (abre de 10:00 a 20:00)";
      st.className = "abierto " + (isOpen ? "si" : "no");
    } else {
      st.textContent = "Horario de hoy sin confirmar: llama antes de ir";
      st.className = "abierto";
    }
  }
})();
