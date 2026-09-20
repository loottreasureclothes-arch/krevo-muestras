/* La Cochera Food & Beer — header propio, menú, y el cálculo de horario en
   vivo compartido (lo usan el chip del hero y, en el turno 2, el tablero del
   portón). Vanilla, sin dependencias. Todo en try/catch: si algo falla, no
   rompe la página (regla de blindaje). */
(function () {
  "use strict";

  /* ---------- Horario real: miércoles a domingo, 4:00 p.m.–12:30 a.m. ---------- */
  function lcHoursState() {
    try {
      var d = new Date();
      var day = d.getDay(); // 0 domingo ... 6 sábado
      var mins = d.getHours() * 60 + d.getMinutes();
      var OPEN_START = 16 * 60; // 4:00 p.m.
      var startDays = [3, 4, 5, 6, 0]; // mié, jue, vie, sáb, dom
      var isStartDay = startDays.indexOf(day) !== -1;
      var prevDay = (day + 6) % 7;
      var prevWasStart = startDays.indexOf(prevDay) !== -1;

      var open = (isStartDay && mins >= OPEN_START) || (prevWasStart && mins < 30);

      if (open) {
        return { open: true, label: "ABIERTO AHORA", sub: "cerramos 12:30" };
      }
      var sub;
      if (day === 1 || day === 2) {
        sub = "abrimos el miércoles a las 4:00";
      } else if (isStartDay && mins < OPEN_START) {
        sub = "abrimos hoy a las 4:00";
      } else {
        sub = "abrimos mañana a las 4:00";
      }
      return { open: false, label: "CERRADO", sub: sub };
    } catch (e) {
      return { open: null, label: "MIÉ A DOM", sub: "4:00 p.m.–12:30 a.m." };
    }
  }
  window.LCHours = { state: lcHoursState };

  function paintHourChips() {
    try {
      var st = lcHoursState();
      var chips = document.querySelectorAll("[data-lc-hours]");
      for (var i = 0; i < chips.length; i++) {
        var el = chips[i];
        el.classList.remove("is-open", "is-closed");
        el.classList.add(st.open ? "is-open" : "is-closed");
        var dot = el.querySelector("[data-lc-dot]");
        var lab = el.querySelector("[data-lc-label]");
        var sub = el.querySelector("[data-lc-sub]");
        if (lab) lab.textContent = st.label;
        if (sub) sub.textContent = st.sub;
        if (dot) dot.setAttribute("data-on", st.open ? "1" : "0");
      }
    } catch (e) {}
  }

  /* ---------- Header: se compacta y la línea roja crece ---------- */
  function initHeader() {
    var header = document.getElementById("lc-header");
    if (!header) return;
    var ticking = false;
    function update() {
      ticking = false;
      header.classList.toggle("is-scrolled", (window.scrollY || window.pageYOffset) > 40);
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- Menú a pantalla completa ---------- */
  function initNav() {
    var btn = document.querySelector(".lc-burger");
    var nav = document.getElementById("lc-nav");
    if (!btn || !nav) return;
    var open = false, pushed = false;

    function paint(v) {
      open = v;
      btn.setAttribute("aria-expanded", v ? "true" : "false");
      nav.setAttribute("aria-hidden", v ? "false" : "true");
      document.documentElement.style.overflow = v ? "hidden" : "";
    }
    function setOpen(v) {
      if (v) {
        paint(true);
        try { history.pushState({ lcNav: true }, ""); pushed = true; } catch (e) { pushed = false; }
        return;
      }
      // Cerrar: sacamos nuestra propia entrada del historial para que el
      // "atras" de Android siga sirviendo para salir de la pagina (L13).
      if (pushed) {
        pushed = false;
        try { history.back(); return; } catch (e) {}
      }
      paint(false);
    }

    btn.addEventListener("click", function () { setOpen(!open); });
    var scrim = nav.querySelector(".lc-nav-scrim");
    if (scrim) scrim.addEventListener("click", function () { setOpen(false); });
    nav.querySelectorAll("[data-nav-close]").forEach(function (el) {
      el.addEventListener("click", function () { setOpen(false); });
    });
    nav.querySelectorAll(".lc-nav-list a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    window.addEventListener("popstate", function () { if (open) { pushed = false; paint(false); } });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && open) setOpen(false);
    });
  }

  /* ---------- WhatsApp: mensaje prellenado desde data-wa ---------- */
  function initWaText() {
    try {
      var links = document.querySelectorAll("a[data-wa]");
      for (var i = 0; i < links.length; i++) {
        var a = links[i];
        var txt = a.getAttribute("data-wa");
        if (!txt) continue;
        var base = (a.getAttribute("href") || "").split("?")[0];
        if (!base) continue;
        a.setAttribute("href", base + "?text=" + encodeURIComponent(txt));
      }
    } catch (e) {}
  }

  /* ---------- Red de seguridad propia del sitio para los reveals ----------
     El kit corre su red UNA sola vez a los 1.6 s desde la carga y su
     IntersectionObserver usa rootMargin -10% abajo + threshold .12, asi que
     un bloque que entra por la orilla de abajo se puede quedar en blanco
     para siempre. Aqui volvemos a revisar en cada scroll (con
     requestAnimationFrame) hasta que no quede ninguno escondido.
     No se toca _kit/ (regla dura 15): esto vive en el sitio. */
  function initRevealNet() {
    try {
      var pend = [];
      var all = document.querySelectorAll("[data-reveal], [data-reveal-stagger]");
      for (var i = 0; i < all.length; i++) pend.push(all[i]);
      if (!pend.length) return;
      var queued = false;

      function check() {
        queued = false;
        var vh = window.innerHeight || document.documentElement.clientHeight;
        for (var n = pend.length - 1; n >= 0; n--) {
          var el = pend[n];
          if (el.classList.contains("is-in")) { pend.splice(n, 1); continue; }
          var r = el.getBoundingClientRect();
          if (r.bottom > 0 && r.top < vh * 0.98) {
            el.classList.add("is-in");
            pend.splice(n, 1);
          }
        }
        if (!pend.length) {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
        }
      }
      function onScroll() {
        if (!queued) { queued = true; requestAnimationFrame(check); }
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      check();
      window.setTimeout(check, 1800);
    } catch (e) {}
  }

  function init() {
    initHeader();
    initNav();
    initWaText();
    initRevealNet();
    paintHourChips();
    window.setInterval(paintHourChips, 60000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
