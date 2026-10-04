/* La Carnicería: header, menu, WhatsApp, reveal, anclas, momento firma del hero */
(function () {
  "use strict";
  var WA = "524495881528";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var body = document.body;

  /* El href ya nace real en el HTML; aqui solo se confirma el mensaje. */
  Array.prototype.forEach.call(document.querySelectorAll("[data-wa]"), function (a) {
    a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(a.getAttribute("data-wa"));
  });

  /* Header compacto */
  var hd = document.getElementById("hd");
  function onScroll() { if (hd) hd.classList.toggle("is-compact", (window.scrollY || 0) > 12); }
  window.addEventListener("scroll", function () { requestAnimationFrame(onScroll); }, { passive: true }); onScroll();

  /* Menu */
  var btn = document.querySelector(".hd-menu-btn"), menu = document.getElementById("hd-menu");
  var closeMenu = function () {};
  if (btn && menu) {
    var links = menu.querySelectorAll("a"), lbl = btn.querySelector(".hd-menu-lbl");
    Array.prototype.forEach.call(links, function (a, i) { a.style.setProperty("--i", i); });
    var set = function (open) {
      if (open === body.classList.contains("menu-open")) return;
      body.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
      if (open) setTimeout(function () { links[0].focus({ preventScroll: true }); }, 80); else btn.focus({ preventScroll: true });
    };
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("menu-open")); });
    menu.addEventListener("click", function (e) {
      var t = e.target; if (t === menu || (t.classList && (t.classList.contains("hd-menu-panel") || t.classList.contains("hd-menu-nav")))) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(Array.prototype.slice.call(links)), i = items.indexOf(document.activeElement);
        e.preventDefault(); if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* Anclas sin scroll-behavior en CSS */
  function go(el) {
    var top = el.getBoundingClientRect().top + window.scrollY - (hd ? hd.offsetHeight + 8 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented) return;
    var h = a.getAttribute("href"); if (h.length < 2) return;
    var el = document.querySelector(h); if (!el) return;
    e.preventDefault(); closeMenu(); go(el);
    if (history.replaceState) history.replaceState(null, "", h);
  });

  /* WA flotante se esconde donde ya hay boton de contacto */
  var zones = document.querySelectorAll("[data-hide-wa]");
  function waCheck() {
    var vh = window.innerHeight, on = false;
    for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh * 0.7 && r.bottom > vh * 0.3) { on = true; break; } }
    body.classList.toggle("wa-off", on);
  }
  window.addEventListener("scroll", function () { requestAnimationFrame(waCheck); }, { passive: true });
  window.addEventListener("resize", waCheck); waCheck();

  /* Reveal: visible a los 1.6 s pase lo que pase (el 1.6 s tambien va inline en el template) */
  var els = document.querySelectorAll("[data-reveal]");
  if (!reduce) {
    Array.prototype.forEach.call(els, function (el) { el.classList.add("rv"); });
    var pending = Array.prototype.slice.call(els), raf = null;
    var tick = function () {
      raf = null; var vh = window.innerHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) { pending[i].classList.add("is-in"); pending.splice(i, 1); }
      }
      if (pending.length) sched();
    };
    var sched = function () { if (!raf) raf = requestAnimationFrame(tick); };
    sched(); window.addEventListener("scroll", sched, { passive: true }); window.addEventListener("resize", sched);
  } else {
    Array.prototype.forEach.call(els, function (el) { el.classList.add("is-in"); });
  }

  /* Momento firma: las marcas de parrilla prenden la portada; se apagan al salir y vuelven a prender al regresar */
  var hero = document.getElementById("portada");
  if (hero) {
    if (reduce) { hero.classList.remove("is-cold"); }
    else {
      var heat = function () {
        var out = hero.getBoundingClientRect().bottom < 0;
        hero.classList.toggle("is-cold", out);
      };
      hero.classList.add("is-cold");
      requestAnimationFrame(function () { requestAnimationFrame(function () { hero.classList.remove("is-cold"); }); });
      setTimeout(function () { hero.classList.remove("is-cold"); }, 1600);
      window.addEventListener("scroll", function () { requestAnimationFrame(heat); }, { passive: true });
    }
  }
})();
