/* Petra · FUNDACION: interruptor "El cambio de casa" (JARDIN | MARAVILLAS), header propio,
   WhatsApp, anclas con offset de header, esconder WA flotante sobre [data-hide-wa].
   API para el turno 2 (seccion 6 "Dos casas" y el carrito):
     window.PETRA.WA                  numero unico (524491554787)
     window.PETRA.houses.jardin/.maravillas   { nombre, direccion, mapsUrl, tel, telHref }
     window.PETRA.house               casa activa ahora mismo ("jardin" | "maravillas")
     window.PETRA.setHouse(id)        cambia la casa activa (dispara "petra:house" en window)
     window.PETRA.status(id, date?)   { state: open|closing|closed|before|after, text }
     window.PETRA.waUrl(msg)          link wa.me con texto
     window.PETRA.openWa(msg)         abre WhatsApp, cae a location.href si el navegador lo bloquea
     window.addEventListener("petra:house", e => e.detail.house)
   [data-wa="mensaje"] arma su link solo. [data-hide-wa] esconde el WA flotante. */
(function () {
  "use strict";
  var WA = "524491554787";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var HOUSES = {
    jardin: {
      id: "jardin",
      nombre: "Petra Jardín",
      direccion: "Galeana Sur 382, Obraje, Aguascalientes",
      corta: "Galeana Sur 382",
      tel: "449 186 6250",
      telHref: "+524491866250",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Petra Restaurante Cocina Mexicana, Galeana Sur 382, Obraje, Aguascalientes"),
      waLine: "Pedido para Petra Jardín (Galeana Sur 382)",
      /* diario 8:00-14:00 y 15:00-23:00 (HOJA-DIRECCION §4) */
      hours: function () { return [[480, 840], [900, 1380]]; }
    },
    maravillas: {
      id: "maravillas",
      nombre: "Petra Cenaduría",
      direccion: "Av. Paseo de las Maravillas 100, Trojes del Pedregal, Aguascalientes",
      corta: "Paseo de las Maravillas 100",
      tel: "449 547 3944",
      telHref: "+524495473944",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Petra Cenaduría, Av. Paseo de las Maravillas 100, Trojes del Pedregal, Aguascalientes"),
      waLine: "Pedido para Petra Cenaduría (Paseo de las Maravillas 100)",
      /* lun/mar/jue/vie 14-22h; sab/dom 14-22:30h; miercoles cerrado */
      hours: function (dow) {
        if (dow === 3) return [];
        if (dow === 0 || dow === 6) return [[840, 1350]];
        return [[840, 1320]];
      }
    }
  };

  function waUrl(msg) { return "https://wa.me/" + WA + (msg ? "?text=" + encodeURIComponent(msg) : ""); }
  function openWa(msg) {
    var url = waUrl(msg), w = null;
    try { w = window.open(url, "_blank", "noopener"); } catch (e) { w = null; }
    if (!w) { try { location.href = url; } catch (e2) {} }
    return url;
  }

  function nowInAgs() {
    try {
      var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
      var map = {}; parts.forEach(function (p) { map[p.type] = p.value; });
      var dowMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var hh = parseInt(map.hour, 10) % 24, mm = parseInt(map.minute, 10);
      return { dow: dowMap[map.weekday], minutes: hh * 60 + mm };
    } catch (e) {
      var d = new Date();
      return { dow: d.getDay(), minutes: d.getHours() * 60 + d.getMinutes() };
    }
  }
  function fmt(mins) {
    var h = Math.floor(mins / 60) % 24, m = mins % 60;
    return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m);
  }

  function status(id, at) {
    var house = HOUSES[id];
    if (!house) return { state: "closed", text: "" };
    at = at || nowInAgs();
    var windows = house.hours(at.dow) || [];
    if (!windows.length) return { state: "closed", text: "Hoy descansa" };
    for (var i = 0; i < windows.length; i++) {
      var w = windows[i];
      if (at.minutes >= w[0] && at.minutes < w[1]) {
        var left = w[1] - at.minutes;
        if (left <= 60) return { state: "closing", text: "Cierra en " + left + " min" };
        return { state: "open", text: "Abierto ahora, cierra a las " + fmt(w[1]) };
      }
    }
    for (var j = 0; j < windows.length; j++) {
      if (at.minutes < windows[j][0]) return { state: "before", text: "Abre a las " + fmt(windows[j][0]) };
    }
    return { state: "after", text: "Hoy ya cerramos" };
  }

  var house = "jardin";
  try {
    var saved = sessionStorage.getItem("petraHouse");
    if (saved === "jardin" || saved === "maravillas") house = saved;
    else if (status("jardin").state === "closed" || status("jardin").state === "after") {
      if (status("maravillas").state === "open" || status("maravillas").state === "closing") house = "maravillas";
    }
  } catch (e) {}

  function setHouse(id, opts) {
    if (id !== "jardin" && id !== "maravillas") return;
    house = id;
    try { sessionStorage.setItem("petraHouse", id); } catch (e) {}
    renderSwitch();
    renderWed();
    try { window.dispatchEvent(new CustomEvent("petra:house", { detail: { house: id } })); } catch (e2) {}
    if (opts && opts.scroll) {
      var el = document.getElementById("casas");
      if (el) scrollToEl(el, true);
    }
  }

  /* Aviso de casa cerrada (HOJA §4): en miercoles con MARAVILLAS activa sale textual
     "Hoy la Cenaduria descansa. El Jardin abre a las 15:00."; en cualquier otro momento
     en que la casa activa este cerrada, el mismo renglon lo dice con los horarios reales.
     Lo usan el header (data-pt-wed) y la seccion 6 (60-casas.js) via PETRA.closedNote(). */
  function shortName(id) { return id === "jardin" ? "El Jardín" : "La Cenaduría"; }
  function otherLine(id) {
    var s = status(id);
    if (s.state === "open") return shortName(id) + " está abierto ahora.";
    if (s.state === "closing") return shortName(id) + " " + s.text.toLowerCase() + ".";
    if (s.state === "before") return shortName(id) + " " + s.text.toLowerCase() + ".";
    if (s.state === "after") return shortName(id) + " ya cerró por hoy.";
    return shortName(id) + " hoy descansa.";
  }
  function closedNote(id) {
    id = id || house;
    var at = nowInAgs();
    var s = status(id, at);
    if (s.state === "open" || s.state === "closing") return null;
    var other = id === "jardin" ? "maravillas" : "jardin";
    var main;
    if (id === "maravillas" && at.dow === 3) main = "Hoy la Cenaduría descansa.";
    else if (s.state === "after") main = HOUSES[id].nombre + " ya cerró por hoy.";
    else if (s.state === "before") main = HOUSES[id].nombre + " " + s.text.toLowerCase() + ".";
    else main = HOUSES[id].nombre + " hoy descansa.";
    return { house: id, other: other, main: main, link: otherLine(other) };
  }

  var switchEls, wedNote, wedMain, wedGo;
  function renderSwitch() {
    if (!switchEls) return;
    for (var i = 0; i < switchEls.length; i++) {
      switchEls[i].setAttribute("aria-pressed", switchEls[i].getAttribute("data-house") === house ? "true" : "false");
    }
  }
  function renderWed() {
    if (!wedNote) return;
    var note = closedNote(house);
    if (!note) { wedNote.hidden = true; return; }
    if (wedMain) wedMain.textContent = note.main;
    if (wedGo) {
      wedGo.textContent = note.link;
      wedGo.setAttribute("data-house-go", note.other);
    }
    wedNote.hidden = false;
    try { window.dispatchEvent(new CustomEvent("petra:nota")); } catch (e) {}
  }

  function initSwitch() {
    switchEls = document.querySelectorAll("[data-house]");
    wedNote = document.querySelector("[data-pt-wed]");
    wedMain = document.querySelector("[data-wed-main]");
    wedGo = document.querySelector("[data-wed-go]");
    if (!switchEls.length) return;
    renderSwitch();
    renderWed();
    for (var i = 0; i < switchEls.length; i++) {
      switchEls[i].addEventListener("click", function (e) { setHouse(e.currentTarget.getAttribute("data-house")); });
    }
    setInterval(function () { renderSwitch(); renderWed(); }, 60000);
    var goBtns = document.querySelectorAll("[data-house-go]");
    for (var g = 0; g < goBtns.length; g++) {
      goBtns[g].addEventListener("click", function (e) { setHouse(e.currentTarget.getAttribute("data-house-go"), { scroll: true }); });
    }
  }

  window.PETRA = { WA: WA, houses: HOUSES, status: status, closedNote: closedNote, waUrl: waUrl, openWa: openWa, setHouse: setHouse, get house() { return house; } };

  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      var a = links[i], msg = a.getAttribute("data-wa");
      if (a.tagName !== "A") continue;
      a.href = waUrl(msg && msg.length > 3 ? msg : "Hola, quiero información de Petra.");
      a.target = "_blank"; a.rel = "noopener";
    }
  }

  function initHeader() {
    var header = document.getElementById("pt-header") || document.querySelector(".pt-header");
    if (!header) return;
    var ticking = false;
    function update() { ticking = false; header.classList.toggle("is-solid", (window.scrollY || window.pageYOffset) > 40); }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
    /* el hero empieza DEBAJO del header (y del aviso, cuando sale): si la foto se mete
       atras de la barra, el letrero "Petra" se ve cortado por arriba. */
    function syncH() {
      var h = header.offsetHeight;
      if (h) document.documentElement.style.setProperty("--pt-head-total", h + "px");
    }
    syncH();
    window.addEventListener("resize", syncH, { passive: true });
    window.addEventListener("petra:nota", syncH);
    setTimeout(syncH, 300);
    setTimeout(syncH, 1200);
  }

  function initWaHide() {
    if (!("IntersectionObserver" in window)) return;
    var on = new Set();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) on.add(e.target); else on.delete(e.target); });
      document.body.classList.toggle("pt-wa-off", on.size > 0);
    }, { rootMargin: "0px 0px -12% 0px" });
    var seen = [];
    function scan() {
      Array.prototype.forEach.call(document.querySelectorAll("[data-hide-wa]"), function (z) {
        if (seen.indexOf(z) < 0) { seen.push(z); io.observe(z); }
      });
    }
    scan(); setTimeout(scan, 1200);
  }

  function scrollToEl(el, smooth) {
    var head = document.getElementById("pt-header") || document.querySelector(".pt-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight : 0) - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: smooth && !reduce ? "smooth" : "auto" });
  }
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (href.length < 2 || href.indexOf("?") > -1) return;
      var el; try { el = document.querySelector(href); } catch (x) { return; }
      if (!el) return;
      e.preventDefault();
      scrollToEl(el, true);
      try { history.replaceState(history.state, "", href); } catch (x2) {}
    });
  }

  /* Titulos que caen (.pt-title): cada renglon en <span><i>...</i></span>; se pinta al
     asomarse; con el rescate de 1.6 s de _kit/kit.js si algo falla. */
  function initTitles() {
    var els = document.querySelectorAll(".pt-title");
    if (!els.length) return;
    function show(el) { el.classList.add("is-in"); }
    if (reduce || !("IntersectionObserver" in window)) { Array.prototype.forEach.call(els, show); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -15% 0px" });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
    setTimeout(function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      Array.prototype.forEach.call(document.querySelectorAll(".pt-title:not(.is-in)"), function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < vh * 1.2) show(el);
      });
    }, 1600);
  }

  /* Rescate por scroll (no solo el temporizador de 1.6 s del kit): cualquier bloque que
     quede dentro de la pantalla se pinta, aunque el IntersectionObserver no haya disparado.
     Asi ningun bloque se queda invisible si el visitante se para a media pagina. */
  function initRescue() {
    var ticking = false;
    function pass() {
      ticking = false;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var els = document.querySelectorAll('[data-reveal]:not(.is-in), [data-reveal-stagger]:not(.is-in), .pt-title:not(.is-in)');
      for (var i = 0; i < els.length; i++) {
        var r = els[i].getBoundingClientRect();
        if (r.bottom > 0 && r.top < vh) els[i].classList.add("is-in");
      }
    }
    function ask() { if (!ticking) { ticking = true; requestAnimationFrame(pass); } }
    window.addEventListener("scroll", ask, { passive: true });
    window.addEventListener("resize", ask, { passive: true });
    setTimeout(pass, 400);
    setTimeout(pass, 1700);
  }

  function init() { initWa(); initHeader(); initSwitch(); initWaHide(); initAnchors(); initTitles(); initRescue(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
