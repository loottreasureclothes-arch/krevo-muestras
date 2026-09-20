/* Pastelería León · FUNDACIÓN (20 sep 2026)
   Header que se compacta, panel de navegación, hoja del pedido, carrito SIN precios
   (ninguno está publicado por el negocio: menu-precios.md), WhatsApp flotante y
   títulos que caen. Vanilla, sin librerías.

   Aquí NUNCA se escribe la palabra IA, chatbot ni asistente: contesta una persona.

   API para las secciones:
     window.PL.WA             "524495252371"
     window.PL.waUrl(msg)     link wa.me con el texto codificado
     window.PL.add(id,nombre) agrega una pieza al pedido
     window.PL.setNombre(s)   nombre del festejado (lo comparte #tufoto con la hoja)

   Atributos:
     [data-wa="mensaje"] en un <a>  -> le arma el href (el click NO se cancela)
     [data-add-item][data-item-id][data-item-name] -> "+ Agregar"
     [data-open-sheet] -> abre la hoja del pedido
     [data-hide-wa]    -> esconde el WhatsApp flotante mientras se ve ese bloque
*/
(function () {
  "use strict";
  var WA = "524495252371"; /* 449 525 2371, el que contestó la prospección (research/hechos.md) */
  var NEG = "Pastelería León";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  try { if ("scrollRestoration" in history) history.scrollRestoration = "manual"; } catch (e) {}

  function waUrl(msg) { return "https://wa.me/" + WA + (msg ? "?text=" + encodeURIComponent(msg) : ""); }

  /* ---------------------------------------------------------- Pedido (sin precios) */
  var KEY = "pl_pedido_v1";
  var cart = {};
  var nombre = "";
  function load() { try { var r = localStorage.getItem(KEY); if (r) cart = JSON.parse(r) || {}; } catch (e) { cart = {}; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} }
  function count() { var n = 0; for (var k in cart) n += cart[k].qty; return n; }

  function set(id, qty, name) {
    qty = Math.max(0, Math.min(20, qty));
    if (qty <= 0) delete cart[id];
    else cart[id] = { name: name || (cart[id] && cart[id].name) || id, qty: qty };
    save(); render();
  }

  function render() {
    var n = count();
    document.body.classList.toggle("pl-cart-on", n > 0);

    var bars = document.querySelectorAll("[data-cart-bar]");
    for (var i = 0; i < bars.length; i++) {
      bars[i].classList.toggle("is-visible", n > 0);
      var c = bars[i].querySelector("[data-cart-count]");
      if (c) c.textContent = n;
    }
    var cards = document.querySelectorAll("[data-item-id]");
    for (var j = 0; j < cards.length; j++) {
      var id = cards[j].getAttribute("data-item-id");
      var q = (cart[id] && cart[id].qty) || 0;
      cards[j].classList.toggle("has-qty", q > 0);
      var qEl = cards[j].querySelector("[data-item-qty]");
      if (qEl) qEl.textContent = q > 0 ? q : "";
      var bt = cards[j].querySelector("[data-add-item]");
      if (bt) bt.setAttribute("aria-label", (q > 0 ? "Agregar otro " : "Agregar ") + (cards[j].getAttribute("data-item-label") || ""));
    }

    var list = document.getElementById("pl-cart-list");
    if (list) {
      list.innerHTML = "";
      for (var k in cart) {
        var it = cart[k], li = document.createElement("li");
        li.className = "pl-cart-row";
        li.innerHTML =
          '<span><span class="pl-cart-row-name"></span><br><span class="pl-cart-row-p">Pregunta el precio</span></span>' +
          '<span class="pl-cart-qty">' +
          '<button type="button" data-item-dec="' + k + '" aria-label="Quitar uno">&minus;</button>' +
          '<b>' + it.qty + '</b>' +
          '<button type="button" data-item-inc="' + k + '" aria-label="Agregar otro">+</button>' +
          '</span>';
        li.querySelector(".pl-cart-row-name").textContent = it.name;
        list.appendChild(li);
      }
    }
    var empty = document.getElementById("pl-cart-empty");
    if (empty) empty.hidden = n > 0;
    var totalBox = document.getElementById("pl-cart-total");
    if (totalBox) totalBox.hidden = n === 0;
  }

  function initCart() {
    load();
    document.addEventListener("click", function (e) {
      var t = e.target.closest && e.target.closest("[data-add-item]");
      if (t) {
        e.preventDefault();
        var card = t.closest("[data-item-id]") || t;
        var id = card.getAttribute("data-item-id") || t.getAttribute("data-item-id");
        set(id, ((cart[id] && cart[id].qty) || 0) + 1, t.getAttribute("data-item-name") || card.getAttribute("data-item-name"));
        return;
      }
      var inc = e.target.closest && e.target.closest("[data-item-inc]");
      if (inc) { var a = inc.getAttribute("data-item-inc"); set(a, ((cart[a] && cart[a].qty) || 0) + 1); return; }
      var dec = e.target.closest && e.target.closest("[data-item-dec]");
      if (dec) { var b = dec.getAttribute("data-item-dec"); set(b, ((cart[b] && cart[b].qty) || 0) - 1); return; }
    });
    render();
  }

  /* ---------------------------------------------------------- Mensaje de WhatsApp */
  function pedidoMsg() {
    var L = ["Hola, les escribo por un pastel de " + NEG + "."];
    var n = count();
    if (n > 0) {
      L.push("Me gustaron estos:");
      for (var k in cart) L.push(cart[k].qty + "x " + cart[k].name);
    }
    var f = document.getElementById("pl-fecha");
    var o = document.getElementById("pl-ocasion");
    var nm = document.getElementById("pl-nombre");
    var val = nm && nm.value.trim() ? nm.value.trim() : nombre;
    if (o && o.value) L.push("Ocasión: " + o.value);
    if (val) L.push("Va a nombre de: " + val);
    if (f && f.value) L.push("Lo necesito para: " + fechaMX(f.value));
    L.push("¿Me pasan el precio y me confirman la fecha, por favor?");
    return L.join("\n");
  }
  function fechaMX(iso) {
    var p = String(iso).split("-");
    if (p.length !== 3) return iso;
    return p[2] + "/" + p[1] + "/" + p[0];
  }

  function initWa() {
    var links = document.querySelectorAll("a[data-wa]");
    for (var i = 0; i < links.length; i++) {
      var a = links[i], m = a.getAttribute("data-wa");
      a.href = waUrl(m && m.length > 3 ? m : "Hola, les escribo por un pastel de " + NEG + ".");
      a.target = "_blank"; a.rel = "noopener";
    }
  }

  /* ---------------------------------------------------------- Header */
  function initHeaderScroll() {
    var t = false;
    function up() { t = false; document.body.classList.toggle("pl-scrolled", (window.scrollY || window.pageYOffset) > 40); }
    window.addEventListener("scroll", function () { if (!t) { t = true; requestAnimationFrame(up); } }, { passive: true });
    up();
  }

  /* ---------------------------------------------------------- Navegación */
  var navPushed = false;
  function setNav(open, fromPop) {
    var body = document.body, btn = document.querySelector(".pl-burger"), nav = document.getElementById("pl-nav");
    if (!btn || !nav || open === body.classList.contains("pl-nav-open")) return;
    body.classList.toggle("pl-nav-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    nav.setAttribute("aria-hidden", open ? "false" : "true");
    if (open) {
      try { history.pushState({ plNav: 1 }, ""); navPushed = true; } catch (e) {}
      setTimeout(function () { var f = nav.querySelector("a, button"); if (f) f.focus({ preventScroll: true }); }, 90);
    } else {
      if (navPushed && !fromPop) { navPushed = false; try { history.back(); } catch (e) {} }
      navPushed = false;
      btn.focus({ preventScroll: true });
    }
  }
  function initNav() {
    var btn = document.querySelector(".pl-burger"), nav = document.getElementById("pl-nav");
    if (!btn || !nav) return;
    btn.addEventListener("click", function () { setNav(!document.body.classList.contains("pl-nav-open")); });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") || e.target.classList.contains("pl-nav-scrim")) setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("pl-nav-open")) { e.preventDefault(); setNav(false); }
    });
  }
  function initNavActive() {
    var links = document.querySelectorAll(".pl-nav-list a[data-section]");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (es) {
      var best = null, r = 0;
      for (var i = 0; i < es.length; i++) if (es[i].isIntersecting && es[i].intersectionRatio > r) { r = es[i].intersectionRatio; best = es[i].target.id; }
      if (!best) return;
      for (var j = 0; j < links.length; j++) {
        if (links[j].getAttribute("data-section") === best) links[j].setAttribute("aria-current", "true");
        else links[j].removeAttribute("aria-current");
      }
    }, { threshold: [0.15, 0.35, 0.6] });
    for (var k = 0; k < links.length; k++) {
      var el = document.getElementById(links[k].getAttribute("data-section"));
      if (el) io.observe(el);
    }
  }

  /* ---------------------------------------------------------- Hoja del pedido */
  var sheetPushed = false;
  function closeSheet(fromPop) {
    document.body.classList.remove("pl-sheet-open");
    var s = document.getElementById("pl-sheet");
    if (s) s.setAttribute("aria-hidden", "true");
    if (sheetPushed && !fromPop) { sheetPushed = false; try { history.back(); } catch (e) {} }
    sheetPushed = false;
  }
  function openSheet() {
    document.body.classList.add("pl-sheet-open");
    var s = document.getElementById("pl-sheet");
    if (s) s.setAttribute("aria-hidden", "false");
    var nm = document.getElementById("pl-nombre");
    if (nm && !nm.value && nombre) nm.value = nombre;
    try { history.pushState({ plSheet: 1 }, ""); sheetPushed = true; } catch (e) {}
    setTimeout(function () { var x = document.querySelector(".pl-sheet-x"); if (x) x.focus({ preventScroll: true }); }, 90);
  }
  function initSheet() {
    if (!document.getElementById("pl-sheet")) return;
    document.addEventListener("click", function (e) {
      var o = e.target.closest && e.target.closest("[data-open-sheet]");
      if (o) { e.preventDefault(); openSheet(); return; }
      if (e.target.closest && e.target.closest("[data-sheet-close]")) { closeSheet(); return; }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("pl-sheet-open")) closeSheet();
    });
    /* <a href> REAL: no se cancela el click, solo se reescribe el href justo antes de
       seguirlo. Así funciona dentro del navegador de Facebook / Instagram. */
    var send = document.getElementById("pl-sheet-send");
    if (send) send.addEventListener("click", function () { send.href = waUrl(pedidoMsg()); });
  }

  window.addEventListener("popstate", function () {
    if (document.body.classList.contains("pl-sheet-open")) { closeSheet(true); return; }
    if (document.body.classList.contains("pl-nav-open")) { setNav(false, true); }
  });

  /* ---------------------------------------------------------- WhatsApp flotante */
  function initWaHide() {
    setTimeout(function () { document.body.classList.add("pl-wa-ready"); }, 1400);
    if (!("IntersectionObserver" in window)) return;
    var on = 0, seen = [];
    var io = new IntersectionObserver(function (es) {
      for (var i = 0; i < es.length; i++) {
        if (es[i].isIntersecting) { if (!es[i].target.__on) { es[i].target.__on = 1; on++; } }
        else if (es[i].target.__on) { es[i].target.__on = 0; on--; }
      }
      document.body.classList.toggle("pl-wa-off", on > 0);
    }, { rootMargin: "0px 0px -10% 0px" });
    function scan() {
      var z = document.querySelectorAll("[data-hide-wa], .pl-foot");
      for (var i = 0; i < z.length; i++) if (seen.indexOf(z[i]) < 0) { seen.push(z[i]); io.observe(z[i]); }
    }
    scan(); setTimeout(scan, 1500);
  }

  /* ---------------------------------------------------------- Blindaje del reveal */
  function initRevealSafety() {
    var els = document.querySelectorAll("[data-reveal], [data-reveal-stagger]");
    if (!els.length) return;
    function show(el) { el.classList.add("is-in"); }
    if (reduce || !("IntersectionObserver" in window)) { for (var i = 0; i < els.length; i++) show(els[i]); return; }
    var io = new IntersectionObserver(function (es) {
      for (var j = 0; j < es.length; j++) {
        if (!es[j].isIntersecting) continue;
        io.unobserve(es[j].target);
        (function (el) { setTimeout(function () { show(el); }, 1600); })(es[j].target);
      }
    }, { rootMargin: "0px" });
    for (var k = 0; k < els.length; k++) io.observe(els[k]);
  }

  /* ---------------------------------------------------------- Anclas */
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var h = a.getAttribute("href");
      if (h.length < 2) return;
      var el; try { el = document.querySelector(h); } catch (x) { return; }
      if (!el) return;
      e.preventDefault();
      var head = document.querySelector(".pl-header");
      var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight : 0);
      window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
      try { history.replaceState(history.state, "", h); } catch (x2) {}
    });
  }

  window.PL = {
    WA: WA, NEG: NEG, waUrl: waUrl, pedidoMsg: pedidoMsg,
    add: function (id, name) { set(id, ((cart[id] && cart[id].qty) || 0) + 1, name); },
    setNombre: function (s) { nombre = (s || "").trim(); var nm = document.getElementById("pl-nombre"); if (nm) nm.value = nombre; },
    getNombre: function () { return nombre; },
    openSheet: openSheet
  };

  function init() {
    initWa(); initHeaderScroll(); initNav(); initNavActive(); initSheet();
    initCart(); initWaHide(); initRevealSafety(); initAnchors();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

/* ---------------------------------------------------------------------------
   Títulos que caen: cada renglón baja 30 px y pega con un rebote corto (560 ms),
   una sola vez al asomarse. Reposo del CSS = título PUESTO, así que si no hay JS,
   si GSAP no existe (aquí no se usa) o si el visitante pide menos movimiento, el
   título se ve completo. A 1.6 s de asomarse queda puesto pase lo que pase.
   --------------------------------------------------------------------------- */
(function () {
  "use strict";
  var els = document.querySelectorAll("[data-drop]");
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!els.length || reduce || !document.body.animate || !("IntersectionObserver" in window)) return;
  document.body.classList.add("pl-titles-js");

  function play(el) {
    el.classList.add("is-drop");
    var lines = el.querySelectorAll(":scope > span");
    for (var i = 0; i < lines.length; i++) {
      lines[i].animate(
        [
          { transform: "translateY(-30px)", opacity: 0, offset: 0 },
          { transform: "translateY(4px)", opacity: 1, offset: 0.72 },
          { transform: "translateY(-1px)", opacity: 1, offset: 0.88 },
          { transform: "none", opacity: 1, offset: 1 }
        ],
        { duration: 560, delay: i * 90, easing: "cubic-bezier(.23,1,.32,1)", fill: "both" }
      );
    }
  }
  var io = new IntersectionObserver(function (es) {
    for (var i = 0; i < es.length; i++) {
      if (!es[i].isIntersecting) continue;
      io.unobserve(es[i].target);
      play(es[i].target);
    }
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.2 });
  for (var j = 0; j < els.length; j++) io.observe(els[j]);

  /* Red de seguridad: a 1.6 s de que un título asome, queda PUESTO aunque el observador
     de arriba no haya disparado (umbral, título más alto que la pantalla, salto de scroll). */
  var safe = new IntersectionObserver(function (es) {
    for (var i = 0; i < es.length; i++) {
      if (!es[i].isIntersecting) continue;
      safe.unobserve(es[i].target);
      (function (el) {
        setTimeout(function () { if (!el.classList.contains("is-drop")) play(el); }, 1600);
      })(es[i].target);
    }
  }, { rootMargin: "0px" });
  for (var s = 0; s < els.length; s++) safe.observe(els[s]);
})();
