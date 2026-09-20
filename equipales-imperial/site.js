/* ---------- EQ: helpers compartidos por las secciones ----------
   EQ.waUrl(msg) · EQ.send(msg, nearEl)  abre WhatsApp; si el navegador bloquea la ventana (null),
   cae a location.href y deja visible "¿No se abrió WhatsApp?" junto al botón (L15).
   EQ.layer.open(name, closeFn) / close(name)  "atrás" en Android cierra la hoja, no la página (L13).
   EQ.store.get/set  localStorage en try/catch (modo privado, L16).
   EQ.money(n)  $2,500 */
window.EQ = (function () {
  var WA = "523312670824";
  /* Link de cobro con tarjeta (Mercado Pago o Stripe) del negocio. Vacío = el pedido pide el link por WhatsApp. */
  window.EQ_PAGO_LINK = window.EQ_PAGO_LINK || "";
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  function send(msg, near) {
    var url = waUrl(msg), w = null;
    try { w = window.open(url, "_blank", "noopener"); } catch (e) { w = null; }
    if (near) {
      var fb = near.parentNode && near.parentNode.querySelector(".eq-wa-fallback");
      if (!fb) { fb = document.createElement("a"); fb.className = "eq-wa-fallback"; fb.target = "_blank"; fb.rel = "noopener"; fb.textContent = "¿No se abrió WhatsApp? Toca aquí"; near.insertAdjacentElement("afterend", fb); }
      fb.href = url;
    }
    if (!w) { try { location.href = url; } catch (e) {} }
    return url;
  }
  var layer = (function () {
    var stack = [], skip = 0;
    window.addEventListener("popstate", function () {
      if (skip > 0) { skip--; return; }
      var top = stack.pop(); if (top) top.fn();
    });
    return {
      open: function (name, fn) { stack = stack.filter(function (x) { return x.name !== name; }); stack.push({ name: name, fn: fn }); try { history.pushState({ eq: name }, ""); } catch (e) {} },
      close: function (name) { for (var k = stack.length - 1; k >= 0; k--) if (stack[k].name === name) { stack.splice(k, 1); skip++; try { history.back(); } catch (e) { skip--; } return; } }
    };
  })();
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  function money(n) { return "$" + Number(n).toLocaleString("es-MX"); }
  function priceTxt(p) { return p.length > 1 && p[1] !== p[0] ? money(p[0]) + " a " + money(p[1]) : money(p[0]); }
  /* aviso chico "Agregado a tu pedido · Ver" (2 s); onView abre Mi pedido */
  var toastEl = null, toastT = null;
  function toast(msg, onView) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "eq-toast";
      toastEl.setAttribute("role", "status");
      toastEl.innerHTML = '<span class="eq-toast-msg"></span><button type="button" class="eq-toast-view">Ver</button>';
      document.body.appendChild(toastEl);
    }
    toastEl.querySelector(".eq-toast-msg").textContent = msg;
    toastEl.querySelector(".eq-toast-view").onclick = function () { hideToast(); if (onView) onView(); };
    clearTimeout(toastT);
    requestAnimationFrame(function () { toastEl.classList.add("is-on"); });
    toastT = setTimeout(hideToast, 2000);
  }
  function hideToast() { if (toastEl) toastEl.classList.remove("is-on"); clearTimeout(toastT); }
  /* foto que entra desde blur (receta 14, catalogo-motion.md): quita el blur al decodificar o a los 1.6 s (blindaje) */
  function blurIn(img) {
    if (!img) return;
    var go = function () { img.classList.remove("is-pre"); };
    if (img.decode) img.decode().then(go, go);
    else if (img.complete) go();
    else img.addEventListener("load", go, { once: true });
    setTimeout(go, 1600);
  }
  /* hoja inferior: mueve a <body>, bloquea scroll, atrás cierra, Escape cierra, foco dentro */
  function sheet(el, name) {
    if (el.parentNode !== document.body) document.body.appendChild(el);
    var last = null, open = false;
    function close(fromPop) {
      if (!open) return; open = false;
      el.classList.remove("is-open"); document.body.classList.remove("eq-lock");
      setTimeout(function () { if (!open) el.hidden = true; }, 320);
      if (!fromPop) layer.close(name);
      if (last && last.focus) last.focus({ preventScroll: true });
    }
    function show() {
      if (open) return; open = true; last = document.activeElement;
      el.hidden = false; void el.offsetWidth;
      el.classList.add("is-open"); document.body.classList.add("eq-lock");
      layer.open(name, function () { close(true); });
      var box = el.querySelector("[tabindex='-1']") || el; setTimeout(function () { box.focus({ preventScroll: true }); }, 60);
    }
    el.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) close(); });
    document.addEventListener("keydown", function (e) { if (open && e.key === "Escape") close(); });
    return { open: show, close: function () { close(); }, isOpen: function () { return open; } };
  }
  return { wa: WA, waUrl: waUrl, send: send, layer: layer, store: store, money: money, priceTxt: priceTxt, sheet: sheet, blurIn: blurIn, toast: toast };
})();

/* Equipales Imperial: base clonada de Closet&Door (WhatsApp, menú, microinteracciones, blindaje) + helpers EQ */
(function () {
  "use strict";
  var WA = "523312670824";
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
    var zones = document.querySelectorAll("#catalogo, #cotiza, #personaliza, #visitanos, #cierre, .cd-foot");
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
    }, { rootMargin: "0px 0px 0px 0px" });
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

  /* ---------- Barra de tienda (eq-topbar): se compacta al bajar, mismo umbral que .is-solid del kit ---------- */
  function initTopbar() {
    if (!document.querySelector(".eq-topbar")) return;
    var ticking = false;
    function update() { ticking = false; document.body.classList.toggle("eq-bar-off", (window.scrollY || window.pageYOffset) > 40); }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Ícono "Mi pedido" del header: abre la misma hoja que la barra fija del catálogo ---------- */
  function initMiniPedido() {
    var btn = document.querySelector(".eq-mp-btn");
    if (!btn) return;
    btn.addEventListener("click", function () { if (window.EQpedido) window.EQpedido.open(); });
  }

  /* ---------- Títulos de sección: caen desde arriba y pegan con rebote corto (misma técnica que el
     "8" de #nosotros: resorte muestreado e^(-z t) sin(w t) por WAAPI, no CSS). Una vez por título,
     blindaje a 1.6 s (si el observador no dispara, el título ya está en su lugar por el CSS de reposo). ---------- */
  function initTitleDrop() {
    var els = Array.prototype.slice.call(document.querySelectorAll("[data-title-drop]"));
    if (!els.length) return;
    if (reduce || !els[0].animate) return;
    els.forEach(function (el) { el.classList.add("td-pre"); });
    function spring(n, amp, turns, decay, fmt) {
      var k = [];
      for (var i = 0; i <= n; i++) {
        var t = i / n, v = i === n ? 0 : amp * Math.exp(-decay * t) * Math.sin(turns * Math.PI * 2 * t);
        k.push({ transform: fmt(v) });
      }
      return k;
    }
    var DROP = 60, RUN = 460, HIT = 240;
    var done = new WeakSet();
    function play(el) {
      if (done.has(el)) return; done.add(el);
      el.classList.remove("td-pre");
      var run = el.animate(
        [{ transform: "translateY(-" + DROP + "px)", opacity: 0 },
         { transform: "translateY(-" + (DROP * 0.12).toFixed(1) + "px)", opacity: 1, offset: 0.82 },
         { transform: "translateY(0)", opacity: 1 }],
        { duration: RUN, easing: "cubic-bezier(0.55,0,0.85,0.35)", fill: "backwards" }
      );
      el.animate(spring(16, 6, 1.4, 4, function (v) { return "translateY(" + v.toFixed(2) + "px)"; }), { duration: HIT, delay: RUN, easing: "linear" });
      setTimeout(function () { if (run.playState === "running") run.finish(); }, RUN + HIT + 700);
    }
    /* Disparo por posición de scroll (no IntersectionObserver: en algunos Chrome headless/in-app
       no dispara con saltos de scroll instantáneos). Mismo patrón que la línea de #nosotros. */
    var pending = els.slice(), q = false;
    function check() {
      q = false;
      if (!pending.length) return;
      var vh = window.innerHeight || document.documentElement.clientHeight || 800;
      pending = pending.filter(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top > vh || r.bottom < 0) return true; /* aún no asoma o ya se fue por arriba: sigue pendiente */
        /* (el umbral es la orilla de abajo exacta: con 0.92 un título que asomaba en el último 8 % de la
           pantalla se quedaba en opacidad 0 a la vista, y eso se leía como un hueco) */
        play(el);
        return false;
      });
      if (!pending.length) { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); }
    }
    function on() { if (!q) { q = true; requestAnimationFrame(check); } }
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    check();
    setTimeout(check, 400);
    window.addEventListener("load", check);
    /* Blindaje: a 1.6 s, solo los títulos que YA están en pantalla quedan en su lugar (sin animar).
       Los de abajo del pliegue siguen pendientes para que caigan cuando el usuario llegue a ellos:
       marcarlos todos aquí era lo que tenía muerto el efecto en las 7 secciones. */
    setTimeout(function () {
      var vh = window.innerHeight || document.documentElement.clientHeight || 800;
      els.forEach(function (el) {
        if (done.has(el)) return;
        if (el.getBoundingClientRect().top < vh) { done.add(el); el.classList.remove("td-pre"); }
      });
    }, 1600);
  }

  function init() {
    fixCrossPageLinks(); initWa(); initMenu(); initRipple(); initWaHide(); initRevealSafety(); initTopbar(); initMiniPedido(); initTitleDrop();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
  if (document.readyState === "complete") initMatHash();
  else document.addEventListener("DOMContentLoaded", initMatHash);
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
