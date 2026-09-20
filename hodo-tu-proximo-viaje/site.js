/* HODO Tu próximo viaje: fundación de interacción (header, menú, WhatsApp, reveal, estado del pase). */
(function () {
  "use strict";
  var WA = "524494262277";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* ---------- Estado compartido del pase de abordar (localStorage hodo_pase) ---------- */
  var HodoPase = (function () {
    var KEY = "hodo_pase";
    var MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    var DESTINOS = {
      "cancun": { codigo: "CUN", nombre: "Cancún" },
      "riviera-maya": { codigo: "CUN", nombre: "Riviera Maya" },
      "punta-cana": { codigo: "PUJ", nombre: "Punta Cana" },
      "puerto-vallarta": { codigo: "PVR", nombre: "Puerto Vallarta" },
      "punta-mita": { codigo: "PVR", nombre: "Punta Mita" },
      "ixtapa": { codigo: "ZIH", nombre: "Ixtapa" },
      "cdmx": { codigo: "MEX", nombre: "Ciudad de México" }
    };
    function load() {
      try { var s = JSON.parse(localStorage.getItem(KEY) || "{}"); return s && typeof s === "object" ? s : {}; }
      catch (e) { return {}; }
    }
    var state = load();
    function persist() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
    function emit(name, detail) {
      try { window.dispatchEvent(new CustomEvent(name, { detail: detail })); }
      catch (e) { var ev = document.createEvent("CustomEvent"); ev.initCustomEvent(name, false, false, detail); window.dispatchEvent(ev); }
    }
    function fmtFecha(iso) {
      if (!iso) return "";
      var p = iso.split("-");
      if (p.length !== 3) return iso;
      var mi = parseInt(p[1], 10) - 1;
      return parseInt(p[2], 10) + " " + (MESES[mi] || p[1]) + " " + p[0];
    }
    function fmtMes(iso) {
      if (!iso) return "";
      var p = iso.split("-");
      if (p.length !== 2) return iso;
      var mi = parseInt(p[1], 10) - 1;
      return (MESES[mi] || p[1]) + " " + p[0];
    }
    function setDestino(slug, otroTexto) {
      var d = DESTINOS[slug];
      if (d) {
        state.destinoSlug = slug; state.destinoNombre = d.nombre; state.destinoCodigo = d.codigo;
      } else if (slug === "otro") {
        var t = (otroTexto || "").trim();
        var letras = t.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ]/g, "").toUpperCase().slice(0, 3);
        state.destinoSlug = "otro"; state.destinoNombre = t; state.destinoCodigo = letras || "???";
      } else return;
      persist();
      emit("hodo:destino", { slug: state.destinoSlug, nombre: state.destinoNombre, codigo: state.destinoCodigo });
    }
    function setField(key, val) { state[key] = val; persist(); emit("hodo:campo", { key: key, value: val }); }
    function getState() { return state; }
    function message() {
      var s = state;
      var partes = ["Hola HODO, quiero cotizar mi próximo viaje."];
      partes.push("Destino: " + (s.destinoNombre || "(la que me recomienden)") + ".");
      if (s.sinFechas) {
        partes.push("Fechas: todavía no las tengo" + (s.mesAprox ? ", buscamos para " + fmtMes(s.mesAprox) : "") + ".");
      } else {
        partes.push("Salida: " + (s.salida ? fmtFecha(s.salida) : "(sin elegir)") + ".");
        partes.push("Regreso: " + (s.regreso ? fmtFecha(s.regreso) : "(sin elegir)") + ".");
      }
      var adultos = s.adultos != null ? s.adultos : 2;
      var menores = s.menores != null ? s.menores : 0;
      var p = "Viajamos: " + adultos + (adultos === 1 ? " adulto" : " adultos") + (menores > 0 ? " y " + menores + (menores === 1 ? " menor" : " menores") : "") + ".";
      partes.push(p);
      if (s.tipo) partes.push("Tipo de viaje: " + s.tipo + ".");
      partes.push("Mi nombre: " + (s.nombre ? s.nombre : "___"));
      return partes.join(" ");
    }
    function waUrlPase() { return waUrl(message()); }
    return { DESTINOS: DESTINOS, setDestino: setDestino, setField: setField, getState: getState, message: message, waUrl: waUrlPase, on: function (name, cb) { window.addEventListener(name, function (e) { cb(e.detail); }); }, fmtFecha: fmtFecha, fmtMes: fmtMes };
  })();
  window.HodoPase = HodoPase;

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
    var zones = document.querySelectorAll("#pase, #cierre, .hd-foot");
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
    if (reduce) { Array.prototype.forEach.call(els, show); return; }
    watchVisible(els, 0.9, show);
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
