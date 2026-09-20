/* Mimo Beauty Room — fundacion de interaccion.
   Header que se esconde al bajar, menu, WhatsApp, reveal, titulos que caen y el ESTADO DE LA CITA
   (que te vas a hacer, que dia, a que hora) compartido por el buscador, los servicios y la cita. */
(function () {
  "use strict";
  var WA = "524495497770";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  window.MimoWa = { url: waUrl, numero: WA };

  /* ==================== Estado de la cita ==================== */
  var MimoCita = (function () {
    var KEY = "mimo_cita";
    /* Sus servicios REALES, tal como los publican. Ningun precio: no publican ninguno. */
    var SERVICIOS = [
      { slug: "combo", nombre: "Combo Cejas Full", busca: "combo cejas full cejas 4k ceja laminado henna diseno depilacion botox" },
      { slug: "lash", nombre: "Lash Botox / Lash lifting", busca: "lash botox lifting pestanas rizado efecto rimel extensiones" },
      { slug: "keratina", nombre: "Keratina japonesa o alaciado", busca: "keratina japonesa alaciado alisado japones lacio frizz multivitaminico" },
      { slug: "bordado", nombre: "Corte bordado", busca: "corte bordado puntas abiertas orzuela" },
      { slug: "color", nombre: "Balayage y color", busca: "balayage color decoloracion rubio diseno de color mechas" },
      { slug: "corte", nombre: "Corte", busca: "corte de cabello pelo" },
      { slug: "powder", nombre: "Powder Brows", busca: "powder brows cejas polvo" },
      { slug: "nails", nombre: "Nails", busca: "nails unas manicure" },
      { slug: "labios", nombre: "Labios", busca: "labios lips" }
    ];
    /* Su horario REAL. [abre, cierra] en horas; domingo cerrado (no lo publican). */
    var HORARIO = { 0: null, 1: [10, 18], 2: [9, 18], 3: [9, 18], 4: [10, 17], 5: [10, 17], 6: [10, 14] };
    var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    var DIAS_C = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
    var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    function load() {
      try { var s = JSON.parse(localStorage.getItem(KEY) || "{}"); return s && typeof s === "object" ? s : {}; }
      catch (e) { return {}; }
    }
    var state = load();
    if (!Array.isArray(state.servicios)) state.servicios = [];
    function persist() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
    function emit(name, detail) {
      try { window.dispatchEvent(new CustomEvent(name, { detail: detail })); }
      catch (e) { var ev = document.createEvent("CustomEvent"); ev.initCustomEvent(name, false, false, detail); window.dispatchEvent(ev); }
    }
    function nombreDe(slug) {
      for (var i = 0; i < SERVICIOS.length; i++) if (SERVICIOS[i].slug === slug) return SERVICIOS[i].nombre;
      return "";
    }
    function tiene(slug) { return state.servicios.indexOf(slug) >= 0; }
    function setServicio(slug, on) {
      if (!nombreDe(slug)) return;
      var i = state.servicios.indexOf(slug);
      var quiero = on === undefined ? i < 0 : !!on;
      if (quiero && i < 0) state.servicios.push(slug);
      if (!quiero && i >= 0) state.servicios.splice(i, 1);
      persist();
      emit("mimo:servicio", { slug: slug, on: quiero, servicios: state.servicios.slice() });
    }
    function setCampo(k, v) { state[k] = v; persist(); emit("mimo:cita", { key: k, value: v }); }

    /* Proximos N dias desde hoy (sin el domingo apagado: se muestra pero no se puede elegir). */
    function proximosDias(n) {
      var out = [];
      var hoy = new Date(); hoy.setHours(0, 0, 0, 0);
      for (var i = 0; i < n; i++) {
        var d = new Date(hoy.getTime() + i * 86400000);
        var wd = d.getDay();
        out.push({
          iso: d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2),
          dia: d.getDate(), wd: wd, corto: DIAS_C[wd], abierto: !!HORARIO[wd], hoy: i === 0
        });
      }
      return out;
    }
    function fmtHora(h) { return (h === 12 ? 12 : h % 12) + ":00 " + (h < 12 ? "am" : "pm"); }
    /* Horas que se ofrecen ese dia, de la hora de apertura a la de cierre de SU horario real. */
    function horasDe(iso) {
      if (!iso) return [];
      var p = iso.split("-");
      var wd = new Date(+p[0], +p[1] - 1, +p[2]).getDay();
      var r = HORARIO[wd];
      if (!r) return [];
      var out = [];
      for (var h = r[0]; h <= r[1]; h++) out.push({ h: h, txt: fmtHora(h) });
      return out;
    }
    function fmtDia(iso) {
      if (!iso) return "";
      var p = iso.split("-");
      var d = new Date(+p[0], +p[1] - 1, +p[2]);
      return DIAS[d.getDay()] + " " + d.getDate() + " de " + MESES[d.getMonth()];
    }
    function listaServicios() {
      var n = state.servicios.map(nombreDe).filter(Boolean);
      if (!n.length) return "";
      if (n.length === 1) return n[0];
      return n.slice(0, -1).join(", ") + " y " + n[n.length - 1];
    }
    function nombre() { return (state.nombre || "").replace(/\s+/g, " ").trim().slice(0, 40); }
    /* El mensaje NO lleva rellenos: lo que no se eligio simplemente no se escribe.
       Nada de "(sin elegir)" ni de "Mi nombre: ___": si no hay dato, hay una frase normal. */
    function message() {
      var p = ["Hola Mimo Beauty Room, quiero agendar una cita."];
      var s = listaServicios();
      if (s) p.push("Servicio: " + s + ".");
      else p.push("¿Me ayudan a elegir?");
      if (state.dia && state.hora) p.push("Día: " + fmtDia(state.dia) + ", " + state.hora + ".");
      else if (state.dia) p.push("Día: " + fmtDia(state.dia) + ". La hora me da igual.");
      else if (state.hora) p.push("Hora: " + state.hora + ".");
      else p.push("Todavía no tengo día ni hora.");
      var n = nombre();
      if (n) p.push("Mi nombre: " + n + ".");
      p.push("¿Me confirman disponibilidad y precio?");
      return p.join(" ");
    }
    return {
      SERVICIOS: SERVICIOS, HORARIO: HORARIO,
      setServicio: setServicio, tiene: tiene, setCampo: setCampo,
      get: function () { return state; }, nombreDe: nombreDe, listaServicios: listaServicios, nombre: nombre,
      proximosDias: proximosDias, horasDe: horasDe, fmtDia: fmtDia, fmtHora: fmtHora,
      message: message, waUrl: function () { return waUrl(message()); },
      on: function (n, cb) { window.addEventListener(n, function (e) { cb(e.detail); }); }
    };
  })();
  window.MimoCita = MimoCita;

  /* ==================== WhatsApp ====================
     Cada boton ya NACE en el HTML con su href real de wa.me (funciona sin JS);
     aqui solo se le mejora el mensaje. Nunca window.open. */
  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      links[i].href = waUrl(links[i].getAttribute("data-wa"));
      links[i].target = "_blank";
      links[i].rel = "noopener";
    }
  }

  /* ==================== Header: se esconde al bajar, vuelve compacto al subir ==================== */
  function initHeader() {
    var header = document.getElementById("mm-header");
    if (!header) return;
    var lastY = window.scrollY || 0, ticking = false;
    function update() {
      ticking = false;
      if (document.body.classList.contains("mm-menu-open")) { header.classList.remove("is-hidden"); return; }
      var y = window.scrollY || window.pageYOffset || 0;
      header.classList.toggle("is-arriba", y < 64);
      if (y < 64) { header.classList.remove("is-hidden"); header.classList.remove("is-compact"); }
      else if (y > lastY + 4) { header.classList.add("is-hidden"); header.classList.remove("is-compact"); }
      else if (y < lastY - 8) { header.classList.remove("is-hidden"); header.classList.add("is-compact"); }
      lastY = y;
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
    var arc = document.querySelector(".mm-arcline");
    if (arc) setTimeout(function () { arc.classList.add("is-in"); }, 120);
  }

  /* ==================== Menu ==================== */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".mm-burger");
    var menu = document.getElementById("mm-menu");
    if (!btn || !menu) return;
    var body = document.body;
    Array.prototype.forEach.call(menu.querySelectorAll(".mm-menu-nav > a"), function (a, i) { a.style.setProperty("--i", i); });
    var focusables = menu.querySelectorAll("a, button");
    function set(open) {
      if (open === body.classList.contains("mm-menu-open")) return;
      body.classList.toggle("mm-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Cerrar menú" : "Menú");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) setTimeout(function () { focusables[0] && focusables[0].focus({ preventScroll: true }); }, 90);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("mm-menu-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a) {
        var slug = a.getAttribute("data-mm-servicio");
        if (slug) MimoCita.setServicio(slug, true);
        set(false);
      }
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("mm-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(Array.prototype.slice.call(focusables));
        var i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* ==================== Vigia por sondeo (rAF + getBoundingClientRect) ====================
     No usa IntersectionObserver: hay vistas previas donde IO nunca llama a su callback y eso
     dejaria bloques invisibles. El sondeo no depende de IO y funciona en cualquier navegador. */
  function watch(list, frac, onVisible) {
    var pending = Array.prototype.slice.call(list);
    if (!pending.length) return;
    var raf = null;
    function tick() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * frac && r.bottom > 0) { var el = pending[i]; pending.splice(i, 1); onVisible(el); }
      }
      if (pending.length) schedule();
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(tick); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  window.MimoWatch = watch;

  /* ==================== WhatsApp flotante: nunca encima de nada ====================
     Se apaga cuando hay un boton verde de seccion o el pie a la vista. */
  function initWaFloat() {
    var f = document.querySelector(".mm-wa-float");
    if (!f) return;
    var zonas = Array.prototype.slice.call(document.querySelectorAll("[data-mm-wa-zona], .mm-foot"));
    var controles = null;
    var raf = null;
    function update() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var on = false;
      /* 1) se apaga donde ya hay un boton verde de seccion o el pie */
      for (var i = 0; i < zonas.length; i++) {
        var r = zonas[i].getBoundingClientRect();
        if (r.top < vh - 40 && r.bottom > 0) { on = true; break; }
      }
      /* 2) y ademas se apaga si su circulo se encima con CUALQUIER control: nunca tapa nada */
      if (!on) {
        f.classList.remove("is-off");
        var c = f.getBoundingClientRect();
        var caja = { l: c.left - 6, r: c.right + 6, t: c.top - 6, b: c.bottom + 6 };
        if (!controles) controles = document.querySelectorAll("a, button, input, select, textarea, label");
        for (var j = 0; j < controles.length; j++) {
          var e = controles[j];
          if (e === f || f.contains(e) || e.closest("#mm-menu") || e.closest("#mm-header")) continue;
          var b = e.getBoundingClientRect();
          if (b.width <= 0 || b.height <= 0) continue;
          if (b.left < caja.r && b.right > caja.l && b.top < caja.b && b.bottom > caja.t) { on = true; break; }
        }
      }
      f.classList.toggle("is-off", on);
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(update); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  /* ==================== Titulos que caen y pegan (respetando el <em> en italica) ==================== */
  function wrapWords(el) {
    if (el.__mmWrapped) return;
    el.__mmWrapped = true;
    var nodos = Array.prototype.slice.call(el.childNodes);
    var frag = document.createDocumentFragment();
    var n = 0;
    function unidad(contenido) {
      var outer = document.createElement("span");
      outer.className = "mm-w";
      outer.style.setProperty("--i", n++);
      var inner = document.createElement("span");
      if (typeof contenido === "string") inner.textContent = contenido; else inner.appendChild(contenido);
      outer.appendChild(inner);
      return outer;
    }
    nodos.forEach(function (nodo) {
      if (nodo.nodeType === 3) {
        nodo.nodeValue.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
          frag.appendChild(unidad(part));
        });
      } else if (nodo.nodeType === 1) {
        frag.appendChild(unidad(nodo));
      }
    });
    el.textContent = "";
    el.appendChild(frag);
  }
  function initDrops() {
    var t = document.querySelectorAll("[data-mm-drop]");
    if (!t.length) return;
    Array.prototype.forEach.call(t, wrapWords);
    if (reduce) { Array.prototype.forEach.call(t, function (el) { el.classList.add("is-in"); }); return; }
    watch(t, 0.92, function (el) { el.classList.add("is-in"); });
  }

  /* ==================== Reveal ==================== */
  function initReveal() {
    var els = document.querySelectorAll("[data-mm-reveal], [data-mm-stagger]");
    if (!els.length) return;
    Array.prototype.forEach.call(document.querySelectorAll("[data-mm-stagger]"), function (g) {
      Array.prototype.forEach.call(g.children, function (c, i) { c.style.setProperty("--i", i); });
    });
    if (reduce) { Array.prototype.forEach.call(els, function (el) { el.classList.add("is-in"); }); return; }
    watch(els, 0.94, function (el) { el.classList.add("is-in"); });
  }

  /* ==================== Scroll suave (nunca scroll-behavior en CSS) ==================== */
  function irA(el, ratio) {
    if (!el) return;
    var h = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h"), 10) || 60;
    var top = el.getBoundingClientRect().top + window.scrollY - (ratio ? (window.innerHeight * ratio) : (h + 14));
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.MimoIr = irA;
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (!href || href.length < 2) return;
      var el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      closeMenu();
      var slug = a.getAttribute("data-mm-servicio");
      if (slug) MimoCita.setServicio(slug, true);
      irA(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  /* ==================== Rieles: la rayita de calibrador que dice donde vas ====================
     Solo pinta: no crea controles ni cambia el scroll. Sin JS queda la primera encendida. */
  function initRieles() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-mm-riel-pie]"), function (pie) {
      var riel = document.getElementById(pie.getAttribute("data-mm-riel-pie"));
      var marcas = pie.querySelectorAll(".mm-riel-marcas i");
      if (!riel || !marcas.length) return;
      var raf = null;
      function update() {
        raf = null;
        var max = riel.scrollWidth - riel.clientWidth;
        var f = max > 4 ? riel.scrollLeft / max : 0;
        var i = Math.round(f * (marcas.length - 1));
        for (var k = 0; k < marcas.length; k++) marcas[k].classList.toggle("is-on", k === i);
      }
      function schedule() { if (!raf) raf = requestAnimationFrame(update); }
      riel.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      update();
    });
  }

  function init() {
    initWa(); initHeader(); initMenu(); initWaFloat(); initDrops(); initReveal(); initAnchors(); initRieles();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
