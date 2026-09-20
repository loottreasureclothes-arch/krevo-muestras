/* Limpio Suprime — motor base: WhatsApp, header (barra -> burbujas), menu, reveal, títulos que
   caen y pegan, LA PASADA DEL JALADOR (motor reusable), scroll suave. Vanilla, sin dependencias. */
(function () {
  "use strict";
  var WA = "524493989612";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* ---------- WhatsApp: arma el href de cualquier [data-ls-wa] ---------- */
  function initWa() {
    var links = document.querySelectorAll("[data-ls-wa]");
    for (var i = 0; i < links.length; i++) {
      links[i].href = waUrl(links[i].getAttribute("data-ls-wa"));
      links[i].target = "_blank";
      links[i].rel = "noopener";
    }
  }
  window.LSWa = { url: waUrl };

  /* ---------- Header: barra completa <-> se esconde (bajar) <-> barra compacta (subir) ----------
     Arriba del todo (y<72): barra completa. Bajando: se esconde TODO el header (translateY).
     Subiendo mas de ~8px: aparece la barra compacta (burbujas LS + menu adentro). Reversible,
     sin saltos (solo transform/opacity). Con el menu abierto nunca se esconde (CSS lo fuerza). */
  function initHeader() {
    var header = document.getElementById("ls-header");
    if (!header) return;
    var lastY = window.scrollY || 0;
    var ticking = false;
    function update() {
      ticking = false;
      if (document.body.classList.contains("ls-menu-open")) { header.classList.remove("is-hidden"); return; }
      var y = window.scrollY || window.pageYOffset || 0;
      if (y < 72) {
        header.classList.remove("is-hidden");
        header.classList.remove("is-compact");
      } else if (y > lastY + 4) { // bajando: se esconde por completo
        header.classList.add("is-hidden");
        header.classList.remove("is-compact");
      } else if (y < lastY - 8) { // subiendo mas de ~8px: barra compacta
        header.classList.remove("is-hidden");
        header.classList.add("is-compact");
      }
      lastY = y;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- WhatsApp flotante: se esconde si hay un boton verde de seccion o el footer a la
     vista (para que nunca tape nada). Sin IntersectionObserver, se queda visible (respaldo). ---------- */
  function initWaFloatHide() {
    var float = document.querySelector(".ls-wa-float");
    if (!float || !("IntersectionObserver" in window)) return;
    /* pe-btn ya no manda WhatsApp directo (ahora es un boton de color de marca que solo
       baja al cotizador): si sigue en esta lista, el flotante se esconde en #personal sin
       dejar ningun boton verde real a la vista. */
    var targets = Array.prototype.slice.call(document.querySelectorAll(
      ".s-hero-actions .ls-btn--primary, #cq-send, #ci-send, #cq-m2, .ls-foot"
    ));
    if (!targets.length) return;
    var visibles = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) visibles.add(e.target); else visibles.delete(e.target);
      });
      float.classList.toggle("is-hidden-by-btn", visibles.size > 0);
    }, { threshold: 0.01 });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---------- Menú a pantalla completa ---------- */
  function initMenu() {
    var toggles = document.querySelectorAll(".ls-menu-toggle");
    var closeBtn = document.querySelector(".ls-menu-close");
    var menu = document.getElementById("ls-menu");
    if (!menu || !toggles.length) return;
    var body = document.body;
    Array.prototype.forEach.call(menu.querySelectorAll(".ls-menu-nav > *"), function (el, i) {
      el.style.setProperty("--i", i);
    });
    var focusables = menu.querySelectorAll("a, button");
    function set(open) {
      var was = body.classList.contains("ls-menu-open");
      if (open === was) return;
      body.classList.toggle("ls-menu-open", open);
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      Array.prototype.forEach.call(toggles, function (b) { b.setAttribute("aria-expanded", open ? "true" : "false"); });
      if (open) setTimeout(function () { closeBtn && closeBtn.focus({ preventScroll: true }); }, 80);
      else toggles[0].focus({ preventScroll: true });
    }
    Array.prototype.forEach.call(toggles, function (b) {
      b.addEventListener("click", function () { set(!body.classList.contains("ls-menu-open")); });
    });
    if (closeBtn) closeBtn.addEventListener("click", function () { set(false); });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a") || e.target.classList.contains("ls-menu-scrim")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("ls-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [closeBtn].concat(Array.prototype.slice.call(focusables));
        var i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
    /* Servicios del submenú: preseleccionan el cotizador (ls:espacio) y cierran el menú */
    menu.querySelectorAll("[data-ls-preselect]").forEach(function (b) {
      b.addEventListener("click", function () {
        window.dispatchEvent(new CustomEvent("ls:espacio", {
          detail: { tipo: b.getAttribute("data-tipo") || "", necesita: b.getAttribute("data-necesita") || "" }
        }));
        set(false);
        setTimeout(function () { scrollToId("cotiza"); }, 260);
      });
    });
  }

  /* ---------- Scroll suave a #anclas (nunca scroll-behavior:smooth en CSS) ---------- */
  function scrollToId(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var top = el.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 72) - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.LSScroll = scrollToId;
  /* Lleva un ELEMENTO (no la sección) a la mitad de la pantalla y lo enfoca cuando ya se ve. */
  function scrollToEl(el, ratio, focus) {
    if (!el) return;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var headH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 72;
    var margen = Math.max(vh * (ratio || 0.38), headH + 20);
    var top = el.getBoundingClientRect().top + window.scrollY - margen;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
    if (!focus) return;
    var last = -1, tries = 0;
    var t = setInterval(function () {
      var y = window.scrollY;
      tries++;
      if ((y === last && tries > 2) || tries > 40) { // el scroll ya se detuvo (o se acabó el tiempo)
        clearInterval(t);
        el.focus({ preventScroll: true });
        if (!reduce) {
          el.classList.add("is-marcado");
          setTimeout(function () { el.classList.remove("is-marcado"); }, 1400);
        }
      }
      last = y;
    }, 50);
  }
  window.LSScrollEl = scrollToEl;
  function initSmoothAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (!href || href.length < 2) return;
      var id = href.slice(1);
      if (!document.getElementById(id)) return;
      e.preventDefault();
      scrollToId(id);
      if (history.replaceState) history.replaceState(null, "", "#" + id);
    });
  }

  /* ---------- Reveal + títulos que caen (con tope duro de 1.6s) ---------- */
  function wrapWords(el) {
    if (el.__lsWrapped) return;
    el.__lsWrapped = true;
    var text = el.textContent;
    el.textContent = "";
    var n = 0;
    text.split(/(\s+)/).forEach(function (part) {
      if (!part) return;
      if (/^\s+$/.test(part)) { el.appendChild(document.createTextNode(part)); return; }
      var outer = document.createElement("span");
      outer.className = "ls-drop-w";
      outer.style.setProperty("--i", n++);
      var inner = document.createElement("span");
      inner.textContent = part;
      outer.appendChild(inner);
      el.appendChild(outer);
    });
    el.style.setProperty("--drop-shine-delay", (420 + n * 70 + 60) + "ms");
  }
  function initDropTitles() {
    var titles = document.querySelectorAll("[data-ls-drop]");
    if (!titles.length) return;
    titles.forEach(wrapWords);
    var normal = [], sincronizados = [];
    titles.forEach(function (t) {
      (t.hasAttribute("data-ls-drop-sync") ? sincronizados : normal).push(t);
    });
    armReveal(normal);
    sincronizados.forEach(armDropSincronizado);
  }
  /* Titulo que cae junto con LA PASADA DEL JALADOR (p.ej. el del hero): en vez del reveal
     generico (que dispara casi al cargar), espera a que --ls-p de la escena pase el punto
     pedido, para que el titulo "pegue" en el vidrio que el jalador ya dejo limpio. Solo LEE
     --ls-p (nunca toca jaladorRun/easeHand): no altera la pasada real. Con reduce, o si algo
     falla, el tope duro de 1.6s lo muestra igual (misma regla anti-blanco de siempre). */
  function armDropSincronizado(el) {
    var sceneId = el.getAttribute("data-ls-drop-sync");
    var at = parseFloat(el.getAttribute("data-ls-drop-sync-at")) || 0.55;
    var scene = document.getElementById(sceneId);
    function show() { el.classList.add("is-in"); }
    if (reduce || !scene) { show(); return; }
    var shown = false;
    var raf = 0;
    function loop() {
      if (shown) return;
      var p = parseFloat(scene.style.getPropertyValue("--ls-p")) || 0;
      if (p >= at) { shown = true; show(); return; }
      raf = requestAnimationFrame(loop);
    }
    loop();
    setTimeout(function () { if (!shown) { shown = true; cancelAnimationFrame(raf); show(); } }, 1600);
  }
  function armReveal(els) {
    if (!els.length) return;
    function show(el) { el.classList.add("is-in"); }
    if (reduce || !("IntersectionObserver" in window)) { els.forEach(show); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        show(e.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.1 });
    els.forEach(function (el) {
      io.observe(el);
      setTimeout(function () { show(el); }, 1600); // tope duro anti-blanco
    });
  }
  function initReveal() {
    armReveal(Array.prototype.slice.call(document.querySelectorAll("[data-ls-reveal], [data-ls-reveal-stagger]")));
    document.querySelectorAll("[data-ls-reveal-stagger]").forEach(function (g) {
      Array.prototype.forEach.call(g.children, function (c, i) { c.style.setProperty("--i", i); });
    });
  }

  /* ---------- LA PASADA DEL JALADOR: motor reusable ----------
     Regla del blindaje: .is-safe es un RESCATE, no el estado final. Solo se pone si la pasada
     no arrancó o no llegó al final, y cualquier corrida nueva se la quita. Así el vaho de las
     escenas que todavía no se usan (cotizador, cierre) sigue vivo. */
  function easeHand(x) { return 0.78 * (x * x * (3 - 2 * x)) + 0.22 * x; } // mano humana: arranca, mantiene, frena
  function setP(scene, p) { scene.style.setProperty("--ls-p", p); }
  function getP(scene) { return parseFloat(scene.style.getPropertyValue("--ls-p")) || 0; }
  function clearSafety(scene) { if (scene.__lsSafeT) { clearTimeout(scene.__lsSafeT); scene.__lsSafeT = 0; } }
  function enPantalla(el) {
    var r = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    return r.bottom > 0 && r.top < vh && r.width > 0;
  }
  function jaladorSafety(scene, ms) {
    clearSafety(scene);
    scene.__lsSafeT = setTimeout(function () {
      scene.__lsSafeT = 0;
      if (getP(scene) < 0.999) scene.classList.add("is-safe"); // la pasada no llegó: que se vea la foto
    }, ms || 1600);
  }
  function jaladorReset(scene) {
    clearSafety(scene);
    scene.__lsToken = (scene.__lsToken || 0) + 1; // cancela cualquier corrida en vuelo
    scene.classList.remove("is-done");
    scene.classList.remove("is-safe"); // vuelve a empañarse
    setP(scene, 0);
  }
  function jaladorRun(scene, duration, cb) {
    if (!scene) return;
    var token = (scene.__lsToken = (scene.__lsToken || 0) + 1);
    scene.__lsRan = true;
    clearSafety(scene);
    scene.classList.remove("is-safe");
    if (reduce) { setP(scene, 1); scene.classList.add("is-done"); cb && cb(); return; }
    var from = getP(scene);
    var t0 = 0;
    scene.classList.remove("is-done");
    jaladorSafety(scene, duration + 700); // si el rAF muere a medias, la foto igual se ve
    function frame(t) {
      if (scene.__lsToken !== token) return; // otra corrida la reemplazó
      if (!t0) t0 = t;
      var raw = Math.min(1, (t - t0) / duration);
      setP(scene, from + (1 - from) * easeHand(raw));
      if (raw < 1) requestAnimationFrame(frame);
      else { setP(scene, 1); clearSafety(scene); scene.classList.add("is-done"); cb && cb(); }
    }
    requestAnimationFrame(frame);
  }
  /* modo "scroll" (cierre): ligado al dedo, reversible, sin pin. Baja = limpia, sube = se empaña. */
  function jaladorBindScroll(scene) {
    if (reduce) { setP(scene, 1); scene.classList.add("is-safe"); return; }
    function update() {
      if (!enPantalla(scene)) return; // fuera de pantalla no se toca: ni pasada ni rescate
      var r = scene.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var start = vh * 0.88, end = vh * 0.18;
      var p = (start - r.top) / (start - end);
      p = Math.max(0, Math.min(1, p));
      setP(scene, p);
      scene.classList.toggle("is-done", p >= 0.999); // remate de luz cuando el jalador ya termino su pasada
      scene.__lsRan = true;
      clearSafety(scene);
      scene.classList.remove("is-safe"); // el scroll manda mientras se ve
    }
    var ticking = false;
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(function () { update(); ticking = false; }); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    /* red de seguridad: si el navegador no manda scroll (WhatsApp/Instagram in-app), el reloj
       lento lee la posición real de todos modos y la pasada se ve igual. */
    setInterval(update, 260);
    update();
  }
  /* modo "load" (hero) y "trigger" (cotizador): corren al entrar en pantalla, sin IntersectionObserver
     (algunos navegadores embebidos no lo disparan); un reloj lento revisa la posición real. */
  function jaladorWatch(scene, duration) {
    function tryRun() {
      if (scene.__lsRan) return true;
      if (!enPantalla(scene)) return false;
      var r = scene.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      if (Math.min(r.bottom, vh) - Math.max(r.top, 0) < Math.min(r.height, vh) * 0.3) return false;
      jaladorRun(scene, duration);
      return true;
    }
    if (tryRun()) return;
    var t = setInterval(function () { if (tryRun()) clearInterval(t); }, 200);
    window.addEventListener("scroll", function () { if (tryRun()) clearInterval(t); }, { passive: true });
    /* rescate: si a 1.6 s la escena se ve y la pasada nunca arrancó, la foto se enseña limpia */
    setTimeout(function () { if (!scene.__lsRan && enPantalla(scene)) scene.classList.add("is-safe"); }, 1600);
  }
  function initJaladorAuto() {
    document.querySelectorAll('[data-ls-jalador="load"]').forEach(function (s) { jaladorWatch(s, 1150); });
    document.querySelectorAll('[data-ls-jalador="trigger"]').forEach(function (s) { jaladorWatch(s, 750); });
    document.querySelectorAll('[data-ls-jalador="scroll"]').forEach(jaladorBindScroll);
  }
  window.LSJalador = { run: jaladorRun, reset: jaladorReset, safety: jaladorSafety, bindScroll: jaladorBindScroll };

  function init() {
    initWa();
    initHeader();
    initWaFloatHide();
    initMenu();
    initSmoothAnchors();
    initDropTitles();
    initReveal();
    initJaladorAuto();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
