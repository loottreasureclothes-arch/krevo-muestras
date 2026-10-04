/* Parrillada Jardines: fundación de interacción (header, menú, WhatsApp, reveal, estado del pase). */
(function () {
  "use strict";
  var WA = "524499787878";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* Estado minimo (sin pase de abordar en este sitio). */
  var HodoPase = { getState: function () { return null; }, on: function () {}, setDestino: function () {}, setField: function () {} };

  /* ---------- Links de WhatsApp ----------
     OJO: cada boton ya NACE en el HTML con su href real de wa.me (ya codificado), para que
     la pagina sirva aunque el JS no cargue. Aqui solo se confirma/actualiza el mensaje. */
  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      links[i].href = waUrl(links[i].getAttribute("data-wa"));
      links[i].target = "_blank";
      links[i].rel = "noopener";
    }
  }

  /* ---------- Header: se compacta, ruta en vivo, avance de scroll ---------- */
  function initHeader() {
    var header = document.getElementById("hd-header");
    if (!header) return;
    var fill = document.getElementById("hd-progress-fill");
    var plane = document.getElementById("hd-progress-plane");
    var routeB = document.getElementById("hd-route-b");
    var routeBtn = document.getElementById("hd-route");
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY || window.pageYOffset;
      /* 12 px y no 30: la barra tiene que pegarse al borde ANTES de que el titulo del hero
         empiece a pasar por debajo, si no se ve media letra arriba de la barra. */
      header.classList.toggle("is-compact", y > 12);
      var max = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
      var pct = max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0;
      if (fill) fill.style.width = pct + "%";
      if (plane) plane.style.left = pct + "%";
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();

    function paint(detail) { if (routeB && detail && detail.codigo) routeB.textContent = detail.codigo; }
    var saved = HodoPase.getState();
    if (saved && saved.destinoCodigo) paint({ codigo: saved.destinoCodigo });
    HodoPase.on("hodo:destino", paint);

    if (routeBtn) routeBtn.addEventListener("click", function () {
      closeMenu();
      var pase = document.getElementById("pase");
      if (pase) go(pase);
    });
  }

  /* ---------- Menu hamburguesa (celular y compu) ----------
     Se cierra de CUATRO formas: con el mismo boton (que pasa a decir "Cerrar" y muestra
     la X porque el header va arriba del panel, z-index 90), con Escape, tocando fuera
     (scrim en compu, fondo del panel en celular) y al elegir cualquier link. */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".hd-menu-btn");
    var menu = document.getElementById("hd-menu");
    if (!btn || !menu) return;
    var body = document.body;
    Array.prototype.forEach.call(menu.querySelectorAll(".hd-menu-nav > *"), function (el, i) {
      var as = el.tagName === "A" ? [el] : el.querySelectorAll("a");
      Array.prototype.forEach.call(as, function (a) { a.style.setProperty("--i", i); });
    });
    var links = menu.querySelectorAll("a");
    var lbl = btn.querySelector(".hd-menu-lbl");
    function set(open) {
      var was = body.classList.contains("hd-menu-open");
      if (open === was) return;
      body.classList.toggle("hd-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("hd-menu-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a) {
        var slug = a.getAttribute("data-hd-destino");
        if (slug) HodoPase.setDestino(slug);
        set(false);
        return;
      }
      /* tocar fuera: el velo (compu) o el fondo vacio del panel (celular) */
      var t = e.target;
      if (t === menu || t.classList.contains("hd-menu-scrim") || t.classList.contains("hd-menu-panel") ||
          t.classList.contains("hd-menu-nav") || t.classList.contains("hd-menu-foot")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("hd-menu-open")) return;
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

  /* ---------- Vigia de visibilidad por sondeo (rAF + getBoundingClientRect) ----------
     Nota tecnica: IntersectionObserver no dispara sus callbacks en algunos entornos
     de vista previa/automatizacion (confirmado en pruebas), lo que dejaria TODO el
     blindaje anti-blanco sin arrancar nunca (ni el disparo normal ni el de 1.6 s,
     porque ambos dependian de que IO llamara al menos una vez). El sondeo con
     requestAnimationFrame + getBoundingClientRect no depende de IO y funciona en
     cualquier navegador real. Barato: son unos cuantos elementos y para de sondear
     en cuanto no queda nada pendiente. */
  function watchVisible(list, vhFrac, onVisible) {
    var pending = Array.prototype.slice.call(list);
    if (!pending.length) return;
    var raf = null;
    function tick() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * vhFrac && r.bottom > 0) {
          var el = pending[i];
          pending.splice(i, 1);
          onVisible(el);
        }
      }
      if (pending.length) schedule();
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(tick); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  /* ---------- WA flotante: se esconde donde ya hay un CTA de contacto grande ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("#hero, #pedido, #cierre, .hd-foot");
    if (!zones.length) return;
    function update() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.top < vh * 0.8 && r.bottom > 0) { on = true; break; }
      }
      document.body.classList.toggle("hd-wa-off", on);
    }
    var raf = null;
    function schedule() { if (!raf) raf = requestAnimationFrame(function () { raf = null; update(); }); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  /* ---------- Reveal (disparo normal; el 1.6s de seguridad va tambien inline en template.html) ---------- */
  function initReveal() {
    var els = document.querySelectorAll("[data-hd-reveal], .hd-drop");
    if (!els.length) return;
    function show(el) { el.classList.add("is-in"); }
    /* Las fotitos no se revelan hasta que su <img> decodifique: si no, el marco aparece
       "terminado" (con su sombra y giro) antes de que la foto real haya pintado, y por una
       fraccion de segundo se ve un rectangulo en blanco que parece una foto vacia. */
    function reveal(el) {
      var img = el.classList.contains("hd-fotito") ? el.querySelector("img") : null;
      if (!img || img.complete) { show(el); return; }
      var done = false;
      function go() { if (done) return; done = true; show(el); }
      if (img.decode) img.decode().then(go, go); else { img.addEventListener("load", go); img.addEventListener("error", go); }
      setTimeout(go, 1200); /* respaldo corto: nunca depende solo del decode */
    }
    if (reduce) { Array.prototype.forEach.call(els, show); return; }
    watchVisible(els, 0.9, reveal);
  }

  /* ---------- Scroll suave a #anclas (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var head = document.querySelector(".hd-bar");
    var extra = (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--hd-gap"), 10) || 10) * 2 + 14;
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight + extra : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  /* Lo usan el buscador del hero y los planes para bajar a una seccion sin
     scroll-behavior: smooth en el CSS (regla L4). */
  window.HodoIr = go;
  function initSmoothAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (href.length < 2) return;
      var el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      closeMenu();
      var slug = a.getAttribute("data-hd-destino");
      if (slug) HodoPase.setDestino(slug);
      var tipo = a.getAttribute("data-hd-tipo");
      if (tipo) HodoPase.setField("tipo", tipo);
      go(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  function init() {
    initWa(); initHeader(); initMenu(); initWaHide(); initReveal(); initSmoothAnchors();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
