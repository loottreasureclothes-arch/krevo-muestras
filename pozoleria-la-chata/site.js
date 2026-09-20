/* La Chata Pozolería · FUNDACIÓN
   API para secciones:
     window.Chata.WA                 número real de WhatsApp (449 256 3283)
     window.Chata.waUrl(msg)         link wa.me con el texto codificado
     window.Chata.today()            0-6 (domingo=0) en hora de Aguascalientes (America/Mexico_City)
     window.Chata.openState()        "abierto" | "antes" (fin de semana antes de las 3:30) | "cerrado"
     window.Chata.isOpenNow()        true si openState() === "abierto"
     window.Chata.nextDay()          "sabado" | "domingo": el próximo día de apertura real
     window.Chata.stateFor(d,min) / nextDayFor(d,min)   la misma lógica, pura y probable
     window.Chata.openSheet()/closeSheet()              hoja del pedido
     window.Chata.add(nombre)        agrega un platillo al pedido (lo usan los "+" de la carta)
     window.Chata.setDia(msg)        guarda el día que calculó el reloj para el mensaje
   [data-wa="mensaje"] en cualquier <a> arma su link solo. */
(function () {
  "use strict";
  var WA = "524492563283"; // 449 256 3283, WhatsApp real (research/hechos.md)
  var ABRE = 15 * 60 + 30, CIERRA = 22 * 60; // 3:30 pm y 10:00 pm, de su propio Facebook
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  try { if ("scrollRestoration" in history) history.scrollRestoration = "manual"; } catch (e) {}

  function waUrl(msg) { return "https://wa.me/" + WA + (msg ? "?text=" + encodeURIComponent(msg) : ""); }

  function nowParts() {
    try {
      var f = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Mexico_City", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false
      }).formatToParts(new Date());
      var map = {}; f.forEach(function (p) { map[p.type] = p.value; });
      var wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(map.weekday);
      var hh = parseInt(map.hour, 10) % 24, mm = parseInt(map.minute, 10);
      return { day: wd, minutes: hh * 60 + mm };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), minutes: d.getHours() * 60 + d.getMinutes() };
    }
  }
  /* Lógica pura (día 0-6, minutos desde medianoche). Solo compara contra 3:30 y 10:00 de sábado y domingo. */
  function stateFor(day, minutes) {
    if (day !== 0 && day !== 6) return "cerrado";
    if (minutes < ABRE) return "antes";
    if (minutes < CIERRA) return "abierto";
    return "cerrado";
  }
  function nextDayFor(day, minutes) {
    if ((day === 6 || day === 0) && minutes < CIERRA) return day === 6 ? "sabado" : "domingo";
    if (day === 6) return "domingo";   // sábado ya cerrado: mañana domingo
    return "sabado";                   // domingo ya cerrado, o entre semana
  }
  function today() { return nowParts().day; }
  function openState() { var n = nowParts(); return stateFor(n.day, n.minutes); }
  function isOpenNow() { return openState() === "abierto"; }
  function nextDay() { var n = nowParts(); return nextDayFor(n.day, n.minutes); }

  /* ---------------- Pedido (carrito) ---------------- */
  var cart = [];                       // [{nombre, n}]
  var diaMsg = "";                     // lo escribe el reloj: "...para el sábado."
  function setDia(msg) { diaMsg = msg || ""; }
  function find(nombre) { for (var i = 0; i < cart.length; i++) if (cart[i].nombre === nombre) return cart[i]; return null; }
  function add(nombre) { var it = find(nombre); if (it) it.n++; else cart.push({ nombre: nombre, n: 1 }); render(); }
  function menos(nombre) {
    var it = find(nombre); if (!it) return;
    it.n--; if (it.n <= 0) cart.splice(cart.indexOf(it), 1);
    render();
  }
  function count() { var t = 0; for (var i = 0; i < cart.length; i++) t += cart[i].n; return t; }
  function mensaje() {
    var base = diaMsg || "Hola, quiero apartar mi pedido en La Chata Pozolería.";
    if (!cart.length) return base;
    var l = [base, ""];
    for (var i = 0; i < cart.length; i++) l.push(cart[i].n + " x " + cart[i].nombre);
    l.push("");
    l.push("¿Me confirman el total, por favor?");
    return l.join("\n");
  }
  function render() {
    var lista = document.getElementById("chata-cart");
    var vacio = document.querySelector("[data-sheet-empty]");
    var bar = document.getElementById("chata-cartbar");
    var barN = document.getElementById("chata-cartbar-n");
    var send = document.getElementById("chata-sheet-send");
    var n = count();
    if (lista) {
      lista.innerHTML = "";
      for (var i = 0; i < cart.length; i++) {
        var it = cart[i];
        var li = document.createElement("li");
        li.className = "chata-cart-row";
        li.innerHTML =
          '<div class="chata-cart-id"><span class="chata-cart-name"></span><span class="chata-cart-price">Pregunta el precio</span></div>' +
          '<div class="chata-cart-qty">' +
            '<button type="button" class="chata-qty" data-menos aria-label="Quitar uno">&minus;</button>' +
            '<span class="chata-cart-n"></span>' +
            '<button type="button" class="chata-qty" data-mas aria-label="Agregar uno">+</button>' +
          '</div>';
        li.querySelector(".chata-cart-name").textContent = it.nombre;
        li.querySelector(".chata-cart-n").textContent = it.n;
        li.querySelector("[data-menos]").setAttribute("data-menos", it.nombre);
        li.querySelector("[data-mas]").setAttribute("data-mas", it.nombre);
        lista.appendChild(li);
      }
      lista.hidden = !cart.length;
    }
    if (vacio) vacio.hidden = !!cart.length;
    if (bar) { bar.hidden = !n; if (barN) barN.textContent = n; }
    if (send) { send.setAttribute("data-wa", mensaje()); send.href = waUrl(mensaje()); }
    var adds = document.querySelectorAll("[data-add]");
    for (var k = 0; k < adds.length; k++) {
      adds[k].classList.toggle("is-added", !!find(adds[k].getAttribute("data-add")));
    }
  }
  function initCart() {
    document.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target.closest("[data-add],[data-mas],[data-menos]") : null;
      if (!t) return;
      if (t.hasAttribute("data-add")) { e.preventDefault(); add(t.getAttribute("data-add")); }
      else if (t.hasAttribute("data-mas")) { e.preventDefault(); add(t.getAttribute("data-mas")); }
      else { e.preventDefault(); menos(t.getAttribute("data-menos")); }
    });
    render();
  }

  window.Chata = {
    WA: WA, waUrl: waUrl, today: today, isOpenNow: isOpenNow, openState: openState, nextDay: nextDay,
    stateFor: stateFor, nextDayFor: nextDayFor,
    add: add, setDia: setDia, mensaje: mensaje, cart: cart,
    openSheet: openSheet, closeSheet: closeSheet
  };

  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      var a = links[i], msg = a.getAttribute("data-wa");
      if (a.tagName !== "A") continue;
      a.href = waUrl(msg && msg.length > 3 ? msg : "Hola, quiero apartar mi pedido en La Chata Pozolería.");
      a.target = "_blank"; a.rel = "noopener";
    }
  }

  /* Header: la placa se compacta y aparece la raya tricolor al pasar 40 px */
  function initHeader() {
    var ticking = false;
    function update() { ticking = false; document.body.classList.toggle("chata-scrolled", (window.scrollY || window.pageYOffset) > 40); }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* Menú hamburguesa: panel completo con history back (L13 del kit) */
  function initNav() {
    var btn = document.querySelector(".chata-burger"), nav = document.getElementById("chata-nav"), close = document.querySelector(".chata-nav-close");
    if (!btn || !nav) return;
    var body = document.body, pushed = false;
    var links = nav.querySelectorAll("a, button");
    function set(open, fromPop) {
      if (open === body.classList.contains("chata-nav-open")) return;
      body.classList.toggle("chata-nav-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      nav.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) {
        try { history.pushState({ chataNav: 1 }, ""); pushed = true; } catch (e) {}
        setTimeout(function () { if (links[0]) links[0].focus({ preventScroll: true }); }, 60);
      } else {
        if (pushed && !fromPop) { pushed = false; try { history.back(); } catch (e) {} }
        pushed = false;
        btn.focus({ preventScroll: true });
      }
    }
    window.addEventListener("popstate", function () {
      if (body.classList.contains("chata-nav-open")) set(false, true);
      else if (document.documentElement.classList.contains("chata-sheet-open")) closeSheet(true);
    });
    btn.addEventListener("click", function () { set(!body.classList.contains("chata-nav-open")); });
    if (close) close.addEventListener("click", function () { set(false); });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") || e.target.classList.contains("chata-nav-scrim")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && body.classList.contains("chata-nav-open")) { e.preventDefault(); set(false); }
    });
  }

  /* Hoja del pedido */
  var sheetPushed = false;
  function openSheet() {
    render();
    document.documentElement.classList.add("chata-sheet-open");
    try { history.pushState({ chataSheet: 1 }, ""); sheetPushed = true; } catch (e) {}
    var closeBtn = document.querySelector(".chata-sheet-close");
    setTimeout(function () { if (closeBtn) closeBtn.focus({ preventScroll: true }); }, 60);
  }
  function closeSheet(fromPop) {
    document.documentElement.classList.remove("chata-sheet-open");
    if (sheetPushed && !fromPop) { sheetPushed = false; try { history.back(); } catch (e) {} }
    sheetPushed = false;
  }
  function initSheet() {
    var wrap = document.querySelector(".chata-sheet-wrap");
    if (!wrap) return;
    wrap.addEventListener("click", function (e) {
      if (e.target.classList.contains("chata-sheet-scrim") || e.target.closest(".chata-sheet-close")) { e.preventDefault(); closeSheet(); }
    });
    var bar = document.getElementById("chata-cartbar");
    if (bar) bar.addEventListener("click", function (e) { e.preventDefault(); openSheet(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.documentElement.classList.contains("chata-sheet-open")) closeSheet();
    });
  }

  /* [data-reveal]/[data-reveal-stagger] entran AL VERSE. Lo que ya está dentro de la primera
     pantalla al cargar se revela de golpe (nada de la portada depende de un temporizador).
     El plazo de 1.6 s se queda solo como red de seguridad, no como único disparador. */
  function initRevealSafety() {
    var groups = document.querySelectorAll("[data-reveal-stagger]");
    for (var g = 0; g < groups.length; g++) {
      var kids = groups[g].children;
      for (var k = 0; k < kids.length; k++) kids[k].style.setProperty("--k-i", k);
    }
    var els = document.querySelectorAll("[data-reveal], [data-reveal-stagger]");
    function show(el) { el.classList.add("is-in"); }
    if (reduce || !("IntersectionObserver" in window)) { Array.prototype.forEach.call(els, show); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        show(e.target);
      });
    }, { rootMargin: "0px", threshold: 0 });
    var vh = window.innerHeight || document.documentElement.clientHeight || 800;
    Array.prototype.forEach.call(els, function (el) {
      if (el.getBoundingClientRect().top < vh) show(el); else io.observe(el);
    });
    setTimeout(function () {
      var v = window.innerHeight || document.documentElement.clientHeight || 800;
      Array.prototype.forEach.call(els, function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < v && r.bottom > 0) show(el);
      });
    }, 1600);
  }

  function scrollToEl(el) {
    var head = document.querySelector(".chata-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight - 8 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (href.length < 2 || href === "#chata-sheet-wrap") return;
      var el; try { el = document.querySelector(href); } catch (x) { return; }
      if (!el) return;
      e.preventDefault();
      scrollToEl(el);
      try { history.replaceState(history.state, "", href); } catch (x2) {}
    });
  }

  function init() { initWa(); initHeader(); initNav(); initSheet(); initCart(); initRevealSafety(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
