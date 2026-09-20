/* Closet&Door: WhatsApp, hero, carrusel propio, menu, microinteracciones y cotizador */
(function () {
  "use strict";
  var WA = "524494463411";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      links[i].href = waUrl(links[i].getAttribute("data-wa"));
      links[i].target = "_blank";
      links[i].rel = "noopener";
    }
  }

  /* ---------- Menu hamburguesa (celular y compu) ---------- */
  /* En otras paginas (materiales.html) los links "#seccion" apuntan a index.html#seccion */
  function fixCrossPageLinks() {
    var as = document.querySelectorAll('.k-header a[href^="#"], .cd-menu a[href^="#"], .cd-foot a[href^="#"]');
    for (var i = 0; i < as.length; i++) {
      var id = as[i].getAttribute("href").slice(1);
      if (id && !document.getElementById(id)) as[i].setAttribute("href", "index.html#" + id);
      else if (!id) as[i].setAttribute("href", "index.html");
    }
  }

  function initMenu() {
    var btn = document.querySelector(".cd-menu-btn");
    var menu = document.getElementById("cd-menu");
    if (!btn || !menu) return;
    var body = document.body;
    /* escalonado: cada link grande es un paso; los sub-links de Materiales entran con su papa */
    Array.prototype.forEach.call(menu.querySelectorAll(".cd-menu-nav > *"), function (el, i) {
      var as = el.tagName === "A" ? [el] : el.querySelectorAll("a");
      Array.prototype.forEach.call(as, function (a) { a.style.setProperty("--i", i); });
    });
    var links = menu.querySelectorAll("a");
    var lbl = btn.querySelector(".cd-menu-lbl");
    function set(open) {
      var was = body.classList.contains("cd-menu-open");
      if (open === was) return;
      body.classList.toggle("cd-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
      if (open) setTimeout(function () { links[0].focus({ preventScroll: true }); }, 80);
      else btn.focus({ preventScroll: true });
    }
    btn.addEventListener("click", function () { set(!body.classList.contains("cd-menu-open")); });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a") || e.target.classList.contains("cd-menu-scrim")) set(false);
    });
    /* Foco atrapado: boton del header + links del panel */
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("cd-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(Array.prototype.slice.call(links));
        var i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* ---------- Brillo al tocar botones ---------- */
  function initRipple() {
    if (reduce) return;
    document.addEventListener("pointerdown", function (e) {
      var b = e.target.closest(".k-btn, .cd-btn:not(.cd-btn--link), .cd-hero-list a");
      if (!b) return;
      var r = b.getBoundingClientRect();
      var s = document.createElement("span");
      s.className = "cd-ripple";
      s.style.left = (e.clientX - r.left) + "px";
      s.style.top = (e.clientY - r.top) + "px";
      b.appendChild(s);
      setTimeout(function () { s.remove(); }, 460);
    });
  }

  /* ---------- WA flotante: se esconde donde ya hay botones de contacto ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("#msi, #cotizar, #visitanos, #cta-final, .cd-foot");
    if (!zones.length || !("IntersectionObserver" in window)) return;
    var on = new Set();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) on.add(e.target); else on.delete(e.target); });
      document.body.classList.toggle("cd-wa-off", on.size > 0);
    }, { rootMargin: "0px 0px -18% 0px" });
    Array.prototype.forEach.call(zones, function (z) { io.observe(z); });
    setTimeout(function () { document.body.classList.add("cd-wa-ready"); }, 2000);
  }

  /* ---------- Red de seguridad de [data-reveal] (FEEDBACK-2 #6: "se quedaron en blanco") ----------
     kit.css esconde [data-reveal] con solo tener JS, aunque kit.js no cargue o su observador no dispare
     (umbral 12 %, scroll de golpe, navegador de WhatsApp/Instagram). Aqui, a los 1.6 s de asomarse,
     cada bloque queda visible pase lo que pase. No cambia la animacion normal: el kit dispara antes. */
  function initRevealSafety() {
    var els = document.querySelectorAll("[data-reveal], [data-reveal-stagger]");
    if (!els.length) return;
    function show(el) { el.classList.add("is-in"); }
    if (reduce || !("IntersectionObserver" in window)) { Array.prototype.forEach.call(els, show); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target;
        setTimeout(function () { show(el); }, 1600);
      });
    }, { rootMargin: "0px 0px -25% 0px" });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
  }

  /* ---------- materiales.html#cocina|#closets|#bano|#herrajes (sub-links del menu) ----------
     Activa el chip .mt-chip[data-f] del catalogo y baja hasta el. Corre en DOMContentLoaded,
     despues de que el JS del catalogo (defer, va despues de site.js) ya conecto sus chips. */
  function applyMatHash(scroll) {
    var f = decodeURIComponent((location.hash || "").slice(1));
    if (!f || !/^[\w-]+$/.test(f)) return;
    var chip = document.querySelector('.mt-chip[data-f="' + f + '"]');
    if (!chip || chip.getAttribute("aria-pressed") === "true") return;
    chip.click();
    var cat = document.getElementById("mat-catalogo");
    if (!scroll || !cat) return;
    function go() {
      var h = document.querySelector(".k-header");
      var top = cat.getBoundingClientRect().top + window.scrollY - (h ? h.getBoundingClientRect().height : 0);
      window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
    }
    /* al cargar, el navegador reacomoda el scroll del #ancla que no existe: bajamos despues del load */
    if (document.readyState === "complete") go();
    else window.addEventListener("load", function () { requestAnimationFrame(go); }, { once: true });
  }
  function initMatHash() {
    if (!document.querySelector(".mt-chip")) return;
    applyMatHash(true);
    window.addEventListener("hashchange", function () { applyMatHash(true); });
  }

  function init() {
    fixCrossPageLinks(); initWa(); initMenu(); initRipple(); initWaHide(); initRevealSafety();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
  if (document.readyState === "complete") initMatHash();
  else document.addEventListener("DOMContentLoaded", initMatHash);
})();

/* refreshScrollTrigger: las posiciones de cada ScrollTrigger se calculan con el layout del
   momento en que cada sección corre su script (justo tras el parseo, muy temprano). Si algo
   abajo todavía se mueve después (fuente que entra y cambia altura de línea, imagen que carga
   tarde), esas posiciones quedan desfasadas y una sección puede empezar a animar en el punto
   equivocado. GSAP no relanza esto solo salvo en 'load' (y ahí ya se perdieron ajustes
   posteriores); por eso se refresca a mano al terminar de cargar TODO (fuentes incluidas) y
   otra vez cuando la pestaña vuelve a estar visible (en algunos navegadores el layout se
   recalcula distinto al volver del segundo plano). */
(function () {
  function ref() { if (window.ScrollTrigger) window.ScrollTrigger.refresh(); }
  var waits = [new Promise(function (res) { window.addEventListener("load", res, { once: true }); })];
  if (document.fonts && document.fonts.ready) waits.push(document.fonts.ready);
  Promise.all(waits).then(function () { setTimeout(ref, 60); });
  document.addEventListener("visibilitychange", function () { if (!document.hidden) setTimeout(ref, 60); });
})();

/* smoothAnchors: scroll suave a #anclas sin usar scroll-behavior en CSS (compatibilidad con ScrollTrigger) */
(function () {
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented) return;
    var href = a.getAttribute("href");
    if (href.indexOf("?") > -1 || href.length < 2) return; /* #cotizar?tipo=… lo maneja el cotizador vía hashchange */
    var id = href;
    var el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    var head = document.querySelector(".k-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
    if (history.replaceState) history.replaceState(null, "", href);
  });
})();
