/* iPrint · FUNDACIÓN: WhatsApp, menú, hoja/visor compartido, reveal con blindaje, anclas.
   Clonado de closetdoor/site.js. API para las secciones: window.IP
     IP.waUrl(msg)                 -> https://wa.me/...?text=
     IP.openWa(msg, fallbackLink)  -> abre WhatsApp; si window.open da null cae a location.href (L15)
     IP.sheet({t, d, fotos:[{src, srcset, alt, cap}], cta:{txt, tipo|wa}}) -> hoja movida a <body> (L12, L13)
     IP.cotizar(tipo)              -> baja al cotizador con el tipo elegido (evento "ip:cotizar")
     IP.go(el)                     -> scroll a un elemento restando el header */
(function () {
  "use strict";
  var WA = "524495802910";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var doc = document.documentElement;
  doc.classList.add("ip-anim");
  /* raya lima del header: "se imprime" de izq. a der. una vez, 600ms tras el primer paint (L: sin JS ya está completa) */
  requestAnimationFrame(function () { requestAnimationFrame(function () { doc.classList.add("ip-rule-on"); }); });
  var IP = window.IP = window.IP || {};
  IP.WA = WA;
  IP.reduce = reduce;
  IP.waUrl = function (msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); };
  IP.openWa = function (msg, fb) {
    var url = IP.waUrl(msg), w = null;
    try { w = window.open(url, "_blank"); } catch (e) { w = null; }
    if (w) { try { w.opener = null; } catch (e) {} }
    if (fb) { fb.href = url; fb.classList.add("is-on"); }
    /* bloqueado (navegador de Instagram/Facebook, popup): se abre en la misma pestaña */
    if (!w) location.href = url;
    IP.lastWa = url;
    return url;
  };
  IP.go = function (el) {
    if (!el) return;
    var h = document.querySelector(".k-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (h ? h.offsetHeight : 0) + 2;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  };
  IP.cotizar = function (tipo) {
    document.dispatchEvent(new CustomEvent("ip:cotizar", { detail: { tipo: tipo || "" } }));
    IP.go(document.getElementById("cotizar"));
  };

  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      links[i].href = IP.waUrl(links[i].getAttribute("data-wa"));
      links[i].target = "_blank";
      links[i].rel = "noopener";
    }
  }

  /* ---------- Menú hamburguesa ---------- */
  function initMenu() {
    var btn = document.querySelector(".cd-menu-btn");
    var menu = document.getElementById("cd-menu");
    if (!btn || !menu) return;
    var body = document.body;
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
      var a = e.target.closest("a");
      if (a && a.hasAttribute("data-cat-f")) document.dispatchEvent(new CustomEvent("ip:catfilter", { detail: { f: a.getAttribute("data-cat-f") } }));
      if (a || e.target.classList.contains("cd-menu-scrim")) set(false);
    });
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

  /* Estado activo del menu/nav mientras se hace scroll (NOTA GLOBAL, FEEDBACK-1.md: que la navegacion
     "se sienta de verdad"). Marca is-active + aria-current en el renglon de la seccion visible,
     tanto en el nav de header como en el panel de la hamburguesa. */
  function initActiveNav() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.k-nav a[href^="#"], .cd-menu-nav > a[href^="#"]'));
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      if (id) (map[id] = map[id] || []).push(a);
    });
    var idEls = [];
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) idEls.push(el); });
    idEls.sort(function (a, b) { return (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1; });
    var ids = idEls.map(function (el) { return el.id; });
    if (!ids.length) return;
    var seen = {};
    function mark(id) {
      links.forEach(function (a) {
        var on = a.getAttribute("href") === "#" + id;
        a.classList.toggle("is-active", on);
        if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      });
    }
    var headerH = (document.querySelector(".k-header") || {}).offsetHeight || 72;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { seen[e.target.id] = e.isIntersecting; });
      var active = null;
      ids.forEach(function (id) { if (seen[id]) active = id; });
      if (active) mark(active);
    }, { rootMargin: "-" + (headerH + 12) + "px 0px -65% 0px", threshold: 0 });
    idEls.forEach(function (el) { io.observe(el); });
  }

  function initRipple() {
    if (reduce) return;
    document.addEventListener("pointerdown", function (e) {
      var b = e.target.closest(".k-btn, .cd-btn:not(.cd-btn--link)");
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

  /* WA flotante: se esconde donde ya hay botones de contacto */
  function initWaHide() {
    var zones = document.querySelectorAll("#cotizar, #visitanos, .cd-foot, #comparar-cta");
    if (!zones.length || !("IntersectionObserver" in window)) return;
    var on = new Set();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) on.add(e.target); else on.delete(e.target); });
      document.body.classList.toggle("cd-wa-off", on.size > 0);
    }, { rootMargin: "0px 0px -18% 0px" });
    Array.prototype.forEach.call(zones, function (z) { io.observe(z); });
    setTimeout(function () { document.body.classList.add("cd-wa-ready"); }, 2000);
  }

  /* Reveal con blindaje: IO (-25 %) + rescate a los 1.6 s; sin JS o con reduced-motion todo se ve */
  function initReveal() {
    var els = document.querySelectorAll("[data-ip-reveal], .ip-mask, [data-reveal], [data-reveal-stagger], [data-blur-in]");
    Array.prototype.forEach.call(document.querySelectorAll(".ip-mask"), function (m) {
      Array.prototype.forEach.call(m.querySelectorAll(".ln"), function (l, i) { l.style.setProperty("--l", i); });
    });
    function show(el) { el.classList.add("is-in"); }
    if (reduce || !("IntersectionObserver" in window)) { Array.prototype.forEach.call(els, show); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        show(e.target);
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
    /* rescate: lo que se asomó y no entró a los 1.6 s entra igual */
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        io2.unobserve(e.target);
        var el = e.target;
        setTimeout(function () { show(el); }, 1600);
      });
    });
    Array.prototype.forEach.call(els, function (el) { io2.observe(el); });
  }

  /* ---------- Hoja / visor compartido ---------- */
  var sheet, sBox, sT, sD, sCar, sGo, sFb, sLast, sOpen = false, sCta = null;
  function buildSheet() {
    sheet = document.createElement("div");
    sheet.className = "ip-sheet"; sheet.hidden = true;
    sheet.innerHTML =
      '<div class="ip-sheet-veil" data-close></div>' +
      '<div class="ip-sheet-box" role="dialog" aria-modal="true" aria-labelledby="ip-sheet-t" tabindex="-1">' +
        '<header class="ip-sheet-head"><div><h2 class="ip-sheet-t" id="ip-sheet-t"></h2><p class="ip-sheet-d"></p></div>' +
        '<button type="button" class="ip-sheet-x" data-close aria-label="Cerrar"><svg aria-hidden="true"><use href="#i-x"/></svg></button></header>' +
        '<div class="ip-sheet-car" role="region" aria-label="Fotos de trabajos reales" tabindex="0"></div>' +
        '<div class="ip-sheet-foot"><button type="button" class="cd-btn cd-btn--primary ip-sheet-go"><svg aria-hidden="true"><use href="#i-wa"/></svg><span></span></button>' +
        '<a class="ip-wa-fallback" href="#" target="_blank" rel="noopener">¿No se abrió WhatsApp? Toca aquí</a></div>' +
      '</div>';
    document.body.appendChild(sheet);
    sBox = sheet.querySelector(".ip-sheet-box"); sT = sheet.querySelector(".ip-sheet-t"); sD = sheet.querySelector(".ip-sheet-d");
    sCar = sheet.querySelector(".ip-sheet-car"); sGo = sheet.querySelector(".ip-sheet-go"); sFb = sheet.querySelector(".ip-wa-fallback");
    sheet.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) closeSheet(); });
    sGo.addEventListener("click", function () {
      if (!sCta) return;
      if (sCta.tipo != null) { closeSheet(); setTimeout(function () { IP.cotizar(sCta.tipo); }, 60); }
      else IP.openWa(sCta.wa, sFb);
    });
    document.addEventListener("keydown", function (e) {
      if (!sOpen) return;
      if (e.key === "Escape") closeSheet();
      if (e.key === "Tab") {
        var f = sBox.querySelectorAll("button, a.is-on, [tabindex='0']");
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    window.addEventListener("popstate", function () { if (sOpen) closeSheet(true); });
  }
  function closeSheet(fromPop) {
    if (!sOpen) return;
    sOpen = false;
    sheet.classList.remove("is-open");
    document.body.classList.remove("ip-modal-open");
    document.documentElement.style.overflow = "";
    setTimeout(function () { if (!sOpen) sheet.hidden = true; }, 380);
    if (!fromPop && history.state && history.state.ipSheet) history.back();
    if (sLast) sLast.focus({ preventScroll: true });
  }
  IP.sheet = function (o) {
    if (!sheet) buildSheet();
    sLast = document.activeElement;
    sT.textContent = o.t || ""; sD.textContent = o.d || "";
    sCar.innerHTML = "";
    (o.fotos || []).forEach(function (f) {
      var fig = document.createElement("figure");
      var img = document.createElement("img");
      img.src = f.src; if (f.srcset) { img.srcset = f.srcset; img.sizes = "(min-width: 900px) 64vw, 88vw"; }
      img.alt = f.alt || ""; img.decoding = "async";
      fig.appendChild(img);
      if (f.cap) { var c = document.createElement("figcaption"); c.textContent = f.cap; fig.appendChild(c); }
      sCar.appendChild(fig);
    });
    sCta = o.cta || null;
    /* verde solo si de verdad manda el WhatsApp; si nada más baja al cotizador, va en color de marca */
    var navega = !!(sCta && sCta.tipo != null);
    sGo.classList.toggle("cd-btn--marca", navega);
    sGo.classList.toggle("cd-btn--primary", !navega);
    sGo.querySelector("svg use").setAttribute("href", navega ? "#i-arrow" : "#i-wa");
    sGo.hidden = !sCta; sGo.querySelector("span").textContent = sCta ? sCta.txt : "";
    sFb.classList.remove("is-on");
    sheet.hidden = false;
    document.body.classList.add("ip-modal-open");
    document.documentElement.style.overflow = "hidden";
    requestAnimationFrame(function () { requestAnimationFrame(function () { sheet.classList.add("is-open"); }); });
    sOpen = true;
    try { history.pushState({ ipSheet: 1 }, ""); } catch (e) {}
    setTimeout(function () { sBox.focus({ preventScroll: true }); }, 60);
  };

  /* Títulos de sección: caen desde arriba y pegan con rebote corto (resorte muestreado, como
     closetdoor/10-msi), una vez al asomar. Blindaje: si nunca corre, el CSS base ya los deja visibles
     (la clase que los esconde solo la pone este JS, justo antes de animar) + rescate a 1.6 s. */
  function initTitleDrop() {
    if (reduce) return;
    var els = document.querySelectorAll(".ip-h2.ip-mask");
    if (!els.length || !("IntersectionObserver" in window) || !els[0].animate) return;
    function spring(n, amp, turns, decay) {
      var k = [];
      for (var i = 0; i <= n; i++) {
        var t = i / n, v = i === n ? 0 : -amp * Math.exp(-decay * t) * Math.cos(turns * Math.PI * 2 * t);
        k.push({ transform: "translateY(" + v.toFixed(2) + "px)", offset: t });
      }
      return k;
    }
    Array.prototype.forEach.call(els, function (el) {
      el.classList.add("ip-drop-armed");
      var done = false;
      function drop() {
        if (done) return;
        done = true;
        el.classList.remove("ip-drop-armed");
        el.animate(spring(22, 60, 1.15, 4.6), { duration: 700, easing: "linear", fill: "backwards" });
        el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, easing: "ease-out", fill: "backwards" });
      }
      var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); drop(); } }, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
      io.observe(el);
      var fio = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { fio.disconnect(); setTimeout(drop, 1600); } });
      fio.observe(el);
    });
  }

  function init() { initWa(); initMenu(); initRipple(); initWaHide(); initReveal(); initTitleDrop(); initActiveNav(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

/* Anclas con scroll suave por JS (sin scroll-behavior en CSS, L4) */
(function () {
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented) return;
    var href = a.getAttribute("href");
    if (href.length < 2) return;
    var el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    window.IP.go(el);
    if (history.replaceState) history.replaceState(history.state, "", href);
  });
})();
