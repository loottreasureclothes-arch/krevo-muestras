/* Body Shop Rosales: mecánica común (header y rótulo, menú, WhatsApp, anclas, estado de la orden). */
(function () {
  "use strict";
  var WA = "524498921130";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* ---------- Estado de la orden (lo comparten el tablero y el cierre) ---------- */
  var ZONAS = [
    { id: "cofre", nombre: "Cofre" },
    { id: "techo", nombre: "Techo" },
    { id: "cajuela", nombre: "Cajuela" },
    { id: "defdel", nombre: "Defensa delantera" },
    { id: "deftras", nombre: "Defensa trasera" },
    { id: "costizq", nombre: "Costado izquierdo (puertas)" },
    { id: "costder", nombre: "Costado derecho (puertas)" },
    { id: "rines", nombre: "Rines" }
  ];
  var COLORES = {
    rojo: { nombre: "rojo", hex: "#902626" },
    azul: { nombre: "azul", hex: "#1D305D" },
    plata: { nombre: "plata", hex: "#BAC5D4" },
    otro: { nombre: "otro color", hex: "#8C8F92" }
  };
  var KEY = "bsr_orden";
  var Orden = (function () {
    var st = { z: [], c: "", golpe: false, pulido: false, auto: "" };
    try {
      var s = JSON.parse(sessionStorage.getItem(KEY) || "null");
      if (s && typeof s === "object") {
        st.z = Array.isArray(s.z) ? s.z.filter(function (id) { return ZONAS.some(function (q) { return q.id === id; }); }) : [];
        st.c = COLORES[s.c] ? s.c : "";
        st.golpe = !!s.golpe; st.pulido = !!s.pulido;
        st.auto = typeof s.auto === "string" ? s.auto.slice(0, 60) : "";
      }
    } catch (e) {}
    var listeners = [];
    function persist() { try { sessionStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }
    function emit() { persist(); listeners.forEach(function (f) { try { f(st); } catch (e) {} }); }
    function nombreMin(id) {
      var n = ZONAS.filter(function (q) { return q.id === id; })[0].nombre.toLowerCase();
      return n.replace(" (puertas)", "");
    }
    function lista(arr) {
      if (arr.length <= 1) return arr.join("");
      return arr.slice(0, -1).join(", ") + " y " + arr[arr.length - 1];
    }
    function todo() { return st.z.length === ZONAS.length; }
    function piezasTexto() {
      if (!st.z.length) return "";
      if (todo()) return "todo el auto";
      return lista(ZONAS.filter(function (q) { return st.z.indexOf(q.id) > -1; }).map(function (q) { return nombreMin(q.id); }));
    }
    function extrasArr() {
      var a = [];
      if (st.golpe) a.push("golpe");
      if (st.pulido) a.push("pulido y encerado");
      return a;
    }
    function vacia() { return !st.z.length && !st.c && !st.golpe && !st.pulido; }
    function message() {
      var auto = (st.auto || "").trim();
      var base = "Hola Body Shop Rosales, quiero cotizar ";
      if (vacia()) {
        return base + "hojalatería y pintura de mi auto." + (auto ? " Mi auto: " + auto + "." : "") + " ¿Me cotizan gratis?";
      }
      var cuerpo;
      if (st.z.length) cuerpo = todo() ? "pintura general de todo el auto" : "pintura de " + piezasTexto();
      else if (st.c) cuerpo = "pintura de mi auto";
      else cuerpo = (st.golpe && st.pulido) ? "hojalatería y pulido y encerado de mi auto" : st.golpe ? "hojalatería de mi auto" : "pulido y encerado de mi auto";
      if (st.c) cuerpo += ", en " + COLORES[st.c].nombre;
      if ((st.z.length || st.c) && extrasArr().length) cuerpo += ", con " + lista(extrasArr());
      return base + cuerpo + "." + (auto ? " Mi auto: " + auto + "." : "") + " ¿Me cotizan gratis?";
    }
    return {
      ZONAS: ZONAS, COLORES: COLORES, state: function () { return st; },
      on: function (f) { listeners.push(f); },
      toggleZona: function (id) {
        var i = st.z.indexOf(id);
        if (i > -1) st.z.splice(i, 1); else st.z.push(id);
        emit();
      },
      setTodo: function (on) { st.z = on ? ZONAS.map(function (q) { return q.id; }) : []; emit(); },
      setColor: function (c) { st.c = (st.c === c) ? "" : c; emit(); },
      toggleExtra: function (k) { st[k] = !st[k]; emit(); },
      setAuto: function (t) { st.auto = t; persist(); listeners.forEach(function (f) { f(st, "auto"); }); },
      piezasTexto: piezasTexto, extrasArr: extrasArr, vacia: vacia, todo: todo,
      message: message, url: function () { return waUrl(message()); }
    };
  })();
  window.BSR = Orden;

  /* ---------- WhatsApp: cada botón NACE con su href real; aquí solo se confirma ---------- */
  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      links[i].href = waUrl(links[i].getAttribute("data-wa"));
      links[i].target = "_blank";
      links[i].rel = "noopener";
    }
  }

  /* ---------- Header: se compacta; el rótulo cambia según la parte del taller ---------- */
  var closeMenu = function () {};
  function initHeader() {
    var header = document.getElementById("bs-header");
    if (!header) return;
    var rot = document.getElementById("bs-rotulo");
    var rotT = document.getElementById("bs-rotulo-t");
    var secs = Array.prototype.slice.call(document.querySelectorAll("[data-rotulo]"));
    var cur = "INICIO", ticking = false, swapTimer = null;
    function setRotulo(txt, id) {
      if (txt === cur) return;
      cur = txt;
      rot.classList.add("is-swap");
      clearTimeout(swapTimer);
      swapTimer = setTimeout(function () {
        rotT.textContent = txt;
        rot.setAttribute("href", "#" + id);
        rot.classList.remove("is-swap");
      }, 160);
    }
    function update() {
      ticking = false;
      var y = window.scrollY || window.pageYOffset;
      header.classList.toggle("is-compact", y > 40);
      var vh = window.innerHeight || 800, pick = secs[0];
      for (var i = 0; i < secs.length; i++) {
        if (secs[i].getBoundingClientRect().top < vh * 0.42) pick = secs[i];
      }
      if (pick) setRotulo(pick.getAttribute("data-rotulo"), pick.id || "inicio");
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Menú (se cierra con el botón, Escape, tocando fuera o eligiendo una liga) ---------- */
  function initMenu() {
    var btn = document.querySelector(".bs-menu-btn");
    var menu = document.getElementById("bs-menu");
    if (!btn || !menu) return;
    var body = document.body;
    var links = menu.querySelectorAll("a");
    var lbl = btn.querySelector(".bs-menu-lbl");
    function set(open) {
      if (open === body.classList.contains("bs-menu-open")) return;
      body.classList.toggle("bs-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("bs-menu-open")); });
    menu.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) { set(false); return; }
      if (e.target === menu || e.target.classList.contains("bs-menu-nav")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("bs-menu-open")) return;
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

  /* ---------- WhatsApp flotante: se esconde donde ya hay un botón verde a la vista ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]");
    if (!zones.length) return;
    var raf = null;
    function update() {
      var vh = window.innerHeight || 800, on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.top < vh * 0.7 && r.bottom > vh * 0.3) { on = true; break; }
      }
      document.body.classList.toggle("bs-float-off", on);
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(function () { raf = null; update(); }); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  /* ---------- Anclas con scroll suave (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var head = document.querySelector(".bs-bar");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight + 12 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.BSIr = go;
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (href.length < 2) return;
      var el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      closeMenu();
      go(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  function init() { initWa(); initHeader(); initMenu(); initWaHide(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
