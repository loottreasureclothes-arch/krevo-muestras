(function () {
  "use strict";
  var WA = "524493529241";
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(m) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(m); }
  window.NB = { waUrl: waUrl, WA: WA };

  /* enlaces data-wa: solo reescribe el href */
  Array.prototype.forEach.call(document.querySelectorAll("[data-wa]"), function (a) { a.href = waUrl(a.getAttribute("data-wa")); });

  /* menu */
  var btn = document.querySelector(".nb-menu-btn"), menu = document.getElementById("nb-menu");
  function setMenu(o) { document.body.classList.toggle("nb-menu-open", o); btn.setAttribute("aria-expanded", o ? "true" : "false"); btn.querySelector(".nb-menu-lbl").textContent = o ? "Cerrar" : "Menú"; }
  if (btn) {
    btn.addEventListener("click", function () { setMenu(!document.body.classList.contains("nb-menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  }

  /* anclas con colchon del header */
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]'); if (!a) return;
    var id = a.getAttribute("href"); if (id.length < 2) return;
    var el = document.querySelector(id); if (!el) return;
    e.preventDefault();
    var bar = document.querySelector(".nb-bar");
    window.scrollTo(0, el.getBoundingClientRect().top + window.pageYOffset - (bar ? bar.offsetHeight : 0) + 1);
    if (history.replaceState) history.replaceState(null, "", id);
  });

  /* reveal: CSS base = visible; JS lo esconde y a 1.6 s todo queda visible */
  var items = document.querySelectorAll("[data-reveal]");
  if (!reduce && "IntersectionObserver" in window) {
    root.classList.add("js-rv");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
    setTimeout(function () { Array.prototype.forEach.call(items, function (el) { el.classList.add("is-in"); }); }, 1600);
  }

  /* abierto ahora (hora de Aguascalientes) */
  (function () {
    var el = document.getElementById("open-now"); if (!el) return;
    try {
      var h = parseInt(new Intl.DateTimeFormat("en-US", { hour: "numeric", hour12: false, timeZone: "America/Mexico_City" }).format(new Date()), 10) % 24;
      if (h >= 10 && h < 23) { el.textContent = "Abierto ahora, hasta las 11 p.m."; el.classList.add("is-open"); }
      else el.textContent = "Abre a las 10 a.m. · Aguascalientes";
    } catch (e) {}
  })();

  /* flotante WhatsApp: se esconde donde ya hay otro verde, barra de comanda o pie */
  var wa = document.getElementById("nb-wa"), zones = document.querySelectorAll("[data-hide-wa]"), raf = 0;
  function upd() {
    raf = 0; var h = window.innerHeight, hide = false;
    Array.prototype.forEach.call(zones, function (z) { var r = z.getBoundingClientRect(); if (r.top < h * 0.85 && r.bottom > h * 0.15) hide = true; });
    wa.classList.toggle("is-hidden", hide);
  }
  function sch() { if (!raf) raf = requestAnimationFrame(upd); }
  window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch); upd();
})();
