/* Almendra Beauty SPA — motor base: WhatsApp, header (medallón que se esconde), menú,
   títulos que caen y pegan, reveal con tope duro, EL NEÓN y EL MOTOR DE LA CITA.
   Vanilla, sin dependencias. Todo usable sin animación y con teclado. */
(function () {
  "use strict";
  var WA = "524494677371";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  window.AlmWa = waUrl;

  function guarda(k, v) { try { localStorage.setItem(k, v); } catch (e) { } }
  function lee(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  /* ============ WhatsApp: el HTML ya trae <a href> real; el JS solo lo mejora ============ */
  function initWa() {
    var l = document.querySelectorAll("[data-al-wa]");
    for (var i = 0; i < l.length; i++) {
      l[i].href = waUrl(l[i].getAttribute("data-al-wa"));
      l[i].target = "_blank";
      l[i].rel = "noopener";
    }
  }

  /* ============ Header: franja completa -> se esconde al bajar -> compacta al subir ============ */
  function initHeader() {
    var h = document.getElementById("al-header");
    if (!h) return;
    var ultima = window.scrollY || 0, pide = false;
    function paso() {
      pide = false;
      if (document.body.classList.contains("al-nav-abierto")) { h.classList.remove("is-oculto"); return; }
      var y = window.scrollY || window.pageYOffset || 0;
      if (y < 70) { h.classList.remove("is-oculto"); h.classList.remove("is-compacto"); }
      else if (y > ultima + 4) { h.classList.add("is-oculto"); h.classList.remove("is-compacto"); }
      else if (y < ultima - 8) { h.classList.remove("is-oculto"); h.classList.add("is-compacto"); }
      ultima = y;
    }
    window.addEventListener("scroll", function () { if (!pide) { pide = true; requestAnimationFrame(paso); } }, { passive: true });
    paso();
  }

  /* ============ "Abierto hoy hasta las 8 pm" con su horario real (lun a sáb 10 a 20) ============ */
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  window.AlmDias = DIAS; window.AlmMeses = MESES;
  function initAbierto() {
    var el = document.getElementById("al-abierto");
    if (!el) return;
    var d = new Date(), dia = d.getDay(), hora = d.getHours() + d.getMinutes() / 60, txt, corto, cerrado = true;
    if (dia === 0) { txt = "Cerrado hoy, abrimos lunes 10 am"; corto = "Hoy cerrado · lunes 10 am"; }
    else if (hora < 10) { txt = "Abrimos hoy a las 10 am"; corto = "Hoy abrimos 10 am"; }
    else if (hora < 20) { txt = "Abierto hoy hasta las 8 pm"; corto = "Abierto hoy hasta 8 pm"; cerrado = false; }
    else { txt = "Cerrado, abrimos " + (dia === 6 ? "lunes" : "mañana") + " 10 am"; corto = "Cerrado · " + (dia === 6 ? "lunes" : "mañana") + " 10 am"; }
    window.AlmEstado = txt;
    /* la barra de cita a 360 px no aguanta el texto largo: ahí va el corto, sin cortarse */
    window.AlmEstadoCorto = corto;
    el.setAttribute("data-cerrado", cerrado ? "si" : "no");
    var p = el.querySelector(".al-punto");
    el.textContent = txt;
    if (p) el.insertBefore(p, el.firstChild);
  }

  /* ============ Menú de la página ============ */
  function initNav() {
    var botones = document.querySelectorAll(".al-menu-toggle");
    var panel = document.getElementById("al-menu");
    if (!panel || !botones.length) return;
    var body = document.body;
    var abre = botones[0];
    var foco = panel.querySelectorAll("a, button");
    function set(v) {
      if (v === body.classList.contains("al-nav-abierto")) return;
      body.classList.toggle("al-nav-abierto", v);
      panel.setAttribute("aria-hidden", v ? "false" : "true");
      Array.prototype.forEach.call(botones, function (b) { if (b.getAttribute("aria-controls")) b.setAttribute("aria-expanded", v ? "true" : "false"); });
      if (v) setTimeout(function () { var c = panel.querySelector(".al-nav-cerrar"); c && c.focus({ preventScroll: true }); }, 80);
      else abre.focus({ preventScroll: true });
    }
    Array.prototype.forEach.call(botones, function (b) {
      b.addEventListener("click", function () { set(!body.classList.contains("al-nav-abierto")); });
    });
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a") || e.target.classList.contains("al-nav-velo")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("al-nav-abierto")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = Array.prototype.slice.call(foco);
        var i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* ============ Scroll suave (nunca scroll-behavior:smooth en CSS) ============ */
  function irA(id) {
    var el = typeof id === "string" ? document.getElementById(id) : id;
    if (!el) return;
    var alto = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 62;
    var top = el.getBoundingClientRect().top + window.scrollY - alto - 10;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.AlmIr = irA;
  function initAnclas() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var id = a.getAttribute("href").slice(1);
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      irA(id);
      if (history.replaceState) history.replaceState(null, "", "#" + id);
    });
  }

  /* ============ Títulos que caen y pegan + reveal (tope duro de 1.6 s) ============ */
  function parte(el) {
    if (el.__alm) return;
    el.__alm = true;
    var n = 0;
    Array.prototype.slice.call(el.childNodes).forEach(function (nodo) {
      if (nodo.nodeType === 3) {
        var frag = document.createDocumentFragment();
        nodo.textContent.split(/(\s+)/).forEach(function (p) {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
          var w = document.createElement("span");
          w.className = "al-w"; w.style.setProperty("--i", n++);
          var s = document.createElement("span"); s.textContent = p;
          w.appendChild(s); frag.appendChild(w);
        });
        el.replaceChild(frag, nodo);
      } else if (nodo.nodeType === 1) {
        var w2 = document.createElement("span");
        w2.className = "al-w"; w2.style.setProperty("--i", n++);
        var s2 = document.createElement("span");
        nodo.parentNode.insertBefore(w2, nodo);
        s2.appendChild(nodo); w2.appendChild(s2);
      }
    });
  }
  function arma(els) {
    if (!els.length) return;
    function ver(el) { el.classList.add("is-in"); }
    if (reduce || !("IntersectionObserver" in window)) { els.forEach(ver); return; }
    var io = new IntersectionObserver(function (ent) {
      ent.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); ver(e.target); } });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
    els.forEach(function (el) {
      io.observe(el);
      setTimeout(function () { ver(el); }, 1600); // tope duro anti-blanco
    });
  }
  function initTextos() {
    var t = Array.prototype.slice.call(document.querySelectorAll("[data-al-cae]"));
    t.forEach(parte);
    arma(t);
    document.querySelectorAll("[data-al-esc]").forEach(function (g) {
      Array.prototype.forEach.call(g.children, function (c, i) { c.style.setProperty("--i", i); });
    });
    arma(Array.prototype.slice.call(document.querySelectorAll("[data-al-ap], [data-al-esc]")));
  }

  /* ============ EL NEÓN ============
     modo "prende": se dibuja y parpadea corto al entrar (una vez).
     modo "scroll": ligado al dedo y reversible.
     Si algo falla, a los 1.6 s se queda ENCENDIDO (el blindaje es rescate, no estado final). */
  function enPantalla(el) {
    var r = el.getBoundingClientRect(), vh = window.innerHeight || document.documentElement.clientHeight;
    return r.bottom > 0 && r.top < vh && r.width > 0;
  }
  function initNeon() {
    /* el apagado del CSS solo aplica a lo que el motor ya tomó: si este archivo no corre,
       el letrero se queda encendido (el blindaje es rescate, no estado final) */
    document.querySelectorAll(".al-neon").forEach(function (n) { n.classList.add("js-armado"); });
    document.querySelectorAll('[data-al-neon="prende"]').forEach(function (n) {
      var listo = false;
      function corre() {
        if (listo || !enPantalla(n)) return false;
        listo = true; n.classList.add("is-on"); return true;
      }
      if (!corre()) {
        var t = setInterval(function () { if (corre()) clearInterval(t); }, 200);
        window.addEventListener("scroll", function () { if (corre()) clearInterval(t); }, { passive: true });
      }
      setTimeout(function () { if (!listo) { listo = true; n.classList.add("is-on"); } }, 1600);
    });
    document.querySelectorAll('[data-al-neon="scroll"]').forEach(function (n) {
      if (reduce) { n.style.setProperty("--al-p", 1); return; }
      n.classList.add("is-scroll");
      var pide = false;
      function paso() {
        if (!enPantalla(n)) return;
        var r = n.getBoundingClientRect(), vh = window.innerHeight || document.documentElement.clientHeight;
        var p = (vh * 0.9 - r.top) / (vh * 0.62);
        n.style.setProperty("--al-p", Math.max(0, Math.min(1, p)).toFixed(3));
      }
      window.addEventListener("scroll", function () { if (!pide) { pide = true; requestAnimationFrame(function () { paso(); pide = false; }); } }, { passive: true });
      window.addEventListener("resize", paso, { passive: true });
      setInterval(paso, 280); // navegadores embebidos que no mandan scroll
      paso();
    });
  }

  /* ============ EL MOTOR DE LA CITA (componente firma) ============
     Estado en localStorage alm_cita. Cada cambio avisa con el evento alm:cita.
     El total SOLO suma lo que tiene precio publicado; lo que no lo tiene dice
     "Pregunta el precio" y el total lo aclara. Nunca aparece un "$0". */
  var cita = { items: [], dia: null, hora: null };
  (function cargar() {
    var raw = lee("alm_cita");
    if (!raw) return;
    try {
      var d = JSON.parse(raw);
      if (d && Array.isArray(d.items)) {
        cita.items = d.items.filter(function (i) { return i && i.id && i.nombre; });
        cita.dia = d.dia && d.dia.iso ? d.dia : null;
        cita.hora = typeof d.hora === "string" ? d.hora : null;
      }
    } catch (e) { }
  })();

  function avisa() {
    guarda("alm_cita", JSON.stringify(cita));
    window.dispatchEvent(new CustomEvent("alm:cita", { detail: resumen() }));
  }
  function total() {
    return cita.items.reduce(function (s, i) { return s + (typeof i.precio === "number" ? i.precio : 0); }, 0);
  }
  function sinPrecio() {
    return cita.items.filter(function (i) { return typeof i.precio !== "number"; }).length;
  }
  function pesos(n) { return "$" + n.toLocaleString("es-MX"); }
  function resumen() {
    return { items: cita.items.slice(), dia: cita.dia, hora: cita.hora, total: total(), sinPrecio: sinPrecio() };
  }
  /* El texto del total, sin "$0" jamás:
     cita vacía -> "Elige tus servicios" · todo sin precio -> "Te lo confirmamos por WhatsApp"
     mezcla     -> "$320" + "lo que te confirmemos por WhatsApp" */
  function totalTexto() {
    var n = cita.items.length, t = total(), s = sinPrecio();
    if (!n) return { txt: "Elige tus servicios", mas: "", cifra: false };
    if (!t) return { txt: "Te lo confirmamos por WhatsApp", mas: "", cifra: false };
    return { txt: pesos(t), mas: s ? "+ lo que te confirmemos por WhatsApp" : "", cifra: true };
  }
  function sinPrecioNombres() {
    return cita.items.filter(function (i) { return typeof i.precio !== "number"; }).map(function (i) { return i.nombre; });
  }
  function mensaje() {
    if (!cita.items.length) return "Hola Almendra Beauty SPA, quiero agendar una cita. Mi nombre: ___";
    var lista = cita.items.map(function (i) {
      return i.nombre + " (" + (typeof i.precio === "number" ? pesos(i.precio) : "precio por confirmar") + ")";
    }).join(", ");
    var t = "Hola Almendra Beauty SPA, quiero agendar una cita. Servicios: " + lista + ".";
    if (total() > 0) t += " Total aproximado: " + pesos(total()) + ".";
    if (sinPrecio()) t += " Los precios que faltan me los confirman, por favor.";
    t += " Día: " + (cita.dia ? cita.dia.largo : "el que tengan disponible") + ".";
    t += " Hora: " + (cita.hora || "la que tengan disponible") + ".";
    return t + " Mi nombre: ___";
  }
  var API = {
    get: resumen,
    tiene: function (id) { return cita.items.some(function (i) { return i.id === id; }); },
    agregar: function (it) {
      if (!it || !it.id || API.tiene(it.id)) return false;
      cita.items.push({ id: it.id, nombre: it.nombre, precio: typeof it.precio === "number" ? it.precio : null, detalle: it.detalle || "" });
      avisa(); return true;
    },
    quitar: function (id) {
      var n = cita.items.length;
      cita.items = cita.items.filter(function (i) { return i.id !== id; });
      if (cita.items.length !== n) avisa();
    },
    alterna: function (it) { if (API.tiene(it.id)) { API.quitar(it.id); return false; } API.agregar(it); return true; },
    reemplaza: function (viejo, it) { API.quitar(viejo); return API.agregar(it); },
    setDia: function (d) { cita.dia = d; avisa(); },
    setHora: function (h) { cita.hora = h; avisa(); },
    limpiar: function () { cita.items = []; cita.dia = null; cita.hora = null; avisa(); },
    total: total,
    pesos: pesos,
    totalTexto: totalTexto,
    sinPrecioNombres: sinPrecioNombres,
    mensaje: mensaje,
    url: function () { return waUrl(mensaje()); }
  };
  /* pinta el total en cualquier <b>: la cifra grande y, si falta algún precio, el renglón chico */
  window.AlmPintaTotal = function (el) {
    if (!el) return;
    var t = totalTexto();
    el.textContent = t.txt;
    el.classList.toggle("es-texto", !t.cifra);
    if (t.mas) {
      var s = document.createElement("small");
      s.textContent = t.mas;
      el.appendChild(s);
    }
  };
  window.AlmCita = API;

  /* Barra de cita de abajo (en compu vive como panel pegajoso en el menú) */
  function initBarra() {
    var barra = document.getElementById("al-cita");
    if (!barra) return;
    var t = document.getElementById("al-cita-t"), d = document.getElementById("al-cita-d"),
      wa = document.getElementById("al-cita-wa"), res = document.getElementById("al-cita-res");
    function pinta() {
      var r = resumen();
      var n = r.items.length;
      if (!n) {
        barra.setAttribute("data-estado", "vacia");
        t.textContent = "Arma tu cita";
        /* aquí vive el "Abierto hoy hasta las 8 pm" en celular, que en la franja no cabe */
        d.textContent = window.AlmEstadoCorto || window.AlmEstado || "Precios a la vista";
        res.setAttribute("aria-label", "Arma tu cita: ir al menú de servicios");
      } else {
        barra.setAttribute("data-estado", "llena");
        t.textContent = "Mi cita · " + n + (n === 1 ? " servicio" : " servicios") + (r.total ? " · " + pesos(r.total) : "");
        var sub = [];
        if (r.sinPrecio) sub.push("+ " + r.sinPrecio + " sin precio");
        sub.push(r.dia ? r.dia.corto + (r.hora ? " · " + r.hora : "") : "Elige día y hora");
        d.textContent = sub.join(" · ");
        res.setAttribute("aria-label", "Mi cita, " + n + " servicios: ir a elegir día y hora");
      }
      wa.href = API.url();
      wa.setAttribute("data-al-wa", mensaje());
    }
    res.addEventListener("click", function () { irA(resumen().items.length ? "dia" : "menu"); });
    window.addEventListener("alm:cita", pinta);
    pinta();
  }

  function init() {
    initWa();
    initHeader();
    initAbierto();
    initNav();
    initAnclas();
    initTextos();
    initNeon();
    initBarra();
    window.dispatchEvent(new CustomEvent("alm:cita", { detail: resumen() }));
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
