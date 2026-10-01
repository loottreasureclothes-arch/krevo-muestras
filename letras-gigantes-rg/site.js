/* Letras Gigantes RG: fundación de interacción (estado, letras reales, header, menú, WhatsApp, reveal). */
(function () {
  "use strict";
  var WA = "524494054395";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* ---------- Mapa de letras reales: cada variante es un mosaico recortado de una foto de sus montajes ---------- */
  var VAR = {
    "A": ["a", "a2", "a3"], "B": ["b"], "C": ["c"], "D": ["d"], "E": ["e", "e2"], "G": ["g", "g2"], "H": ["h"],
    "I": ["i", "i2"], "J": ["j"], "K": ["k"], "L": ["l"], "M": ["m", "m2"], "N": ["n", "n2"], "O": ["o", "o2"],
    "P": ["p"], "R": ["r", "r2"], "S": ["s"], "T": ["t"], "V": ["v"], "X": ["x"], "Y": ["y"],
    "&": ["amp"], "¿": ["qi"], "?": ["qd"]
  };
  /* proporción ancho/alto de cada recorte (cada letra con su ancho real, sin vecinas) */
  var AR = {"a": 0.486, "a2": 0.647, "a3": 0.428, "b": 0.383, "c": 0.55, "d": 0.472, "e": 0.592, "e2": 0.528, "g": 0.511, "g2": 0.381, "h": 0.461, "i": 0.297, "i2": 0.283, "j": 0.478, "k": 0.639, "l": 0.381, "m": 0.508, "m2": 0.503, "n": 0.647, "n2": 0.478, "o": 0.378, "o2": 0.489, "p": 0.486, "r": 0.531, "r2": 0.547, "s": 0.522, "t": 0.542, "v": 0.431, "x": 0.433, "y": 0.517, "amp": 0.606, "qi": 0.575, "qd": 0.522};
  /* clave -> [nombre de la foto de donde salió, escena] */
  var SRC = {
    a: ["A & O", "en jardín, al atardecer"], a2: ["E & A", "en jardín"], a3: ["A & J", "con flores y piso brillante"],
    b: ["BABY", "en un patio"], c: ["CAMI XV", "en pasto, con seto"], d: ["DEIMY", "frente a un muro de cantera"],
    e: ["E & A", "en jardín"], e2: ["KEITY", "en piedra con flores"], g: ["R & G", "en jardín"], g2: ["MAGGY", "con piso brillante"],
    h: ["PANCHO", "junto a una alberca"], i: ["REGIS", "en pasto, con árboles"], i2: ["KEITY", "en piedra con flores"],
    j: ["A & J", "con flores y piso brillante"], k: ["KEITY", "en piedra con flores"], l: ["NATALIE", "en pasto"],
    m: ["DEIMY", "frente a un muro de cantera"], m2: ["MAGGY", "con piso brillante"], n: ["NATALIE", "en pasto"], n2: ["XIMENA", "en un salón con piso de duela"],
    o: ["A & O", "en jardín, al atardecer"], o2: ["PANCHO", "junto a una alberca"], p: ["PANCHO", "junto a una alberca"],
    q: ["QUIERES", "en la calle, al atardecer"], r: ["R & G", "en jardín"], r2: ["REGIS", "en pasto, con árboles"], s: ["REGIS", "en pasto, con árboles"],
    t: ["KEITY", "en piedra con flores"], u: ["QUIERES", "en la calle, al atardecer"], v: ["XV", "en pasto, frente a una casa"],
    x: ["XV", "en pasto, frente a una casa"], y: ["KEITY", "en piedra con flores"], amp: ["R & G", "en jardín"],
    qi: ["¿NOVIOS?", "en un patio blanco"], qd: ["¿NOVIOS?", "en un patio blanco"]
  };
  var ACC = { "Á": "A", "É": "E", "Í": "I", "Ó": "O", "Ú": "U", "Ü": "U" };
  function norm(ch) {
    var u = ch.toLocaleUpperCase("es-MX");
    return ACC[u] || u;
  }
  /* Limpia lo que escribe el visitante: letras, números, espacio, &, ¿ y ?, máximo 12 */
  function clean(v) {
    v = String(v || "").toLocaleUpperCase("es-MX").replace(/[^A-ZÑÁÉÍÓÚÜ0-9&¿? ]/g, "").replace(/\s{2,}/g, " ");
    if (v.charAt(0) === " ") v = v.slice(1);
    return v.slice(0, 12);
  }
  /* Convierte el nombre en lista de mosaicos; las letras repetidas alternan con su respaldo */
  function parse(name) {
    var out = [], seen = {};
    for (var i = 0; i < name.length; i++) {
      var ch = name.charAt(i);
      if (ch === " ") { out.push({ ch: " ", sp: true }); continue; }
      var base = norm(ch);
      var vs = VAR[base];
      if (!vs) { out.push({ ch: ch, base: base, key: null }); continue; }
      var n = seen[base] || 0; seen[base] = n + 1;
      var key = vs[n % vs.length];
      out.push({ ch: ch, base: base, key: key });
    }
    return out;
  }
  function tileSrc(key, small) { return "img/letras/" + key + (small ? "-s" : "") + ".webp"; }

  /* ---------- Estado compartido (sessionStorage lg_estado) ---------- */
  var KEY = "lg_estado_v1";
  var state = { nombre: "", evento: "", fecha: "", modo: "", contacto: "", lista: [] };
  try { var s = JSON.parse(sessionStorage.getItem(KEY) || "{}"); if (s && typeof s === "object") { for (var k in state) if (k in s) state[k] = s[k]; if (!Array.isArray(state.lista)) state.lista = []; state.nombre = clean(state.nombre); } } catch (e) {}
  function persist() { try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  var subs = {};
  function on(name, cb) { (subs[name] = subs[name] || []).push(cb); }
  function emit(name, d) { (subs[name] || []).forEach(function (cb) { try { cb(d); } catch (e) {} }); }
  function setNombre(v, from) { v = clean(v); if (v === state.nombre) return; state.nombre = v; persist(); emit("nombre", { value: v, from: from }); }
  function setField(k, v) { state[k] = v; persist(); emit("campo", { key: k, value: v }); }
  function hasItem(k) { for (var i = 0; i < state.lista.length; i++) if (state.lista[i].k === k) return true; return false; }
  function toggleItem(it) {
    var idx = -1;
    for (var i = 0; i < state.lista.length; i++) if (state.lista[i].k === it.k) idx = i;
    if (idx >= 0) state.lista.splice(idx, 1); else state.lista.push(it);
    persist(); emit("lista", state.lista);
  }

  /* ---------- Mensaje de WhatsApp ---------- */
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  function fmtFecha(iso) {
    var p = String(iso || "").split("-");
    if (p.length !== 3) return "";
    var m = parseInt(p[1], 10) - 1, d = parseInt(p[2], 10);
    if (!(m >= 0 && m < 12) || !d) return "";
    return d + " de " + MESES[m] + " de " + p[0];
  }
  function listaTexto(arr) {
    if (arr.length <= 1) return arr.join("");
    return arr.slice(0, -1).join(", ") + " y " + arr[arr.length - 1];
  }
  function message() {
    var s = state, partes = [];
    var letras = s.nombre.replace(/ /g, "").length;
    var intro;
    if (s.nombre.replace(/ /g, "")) intro = "Hola Letras Gigantes RG, quiero cotizar letras gigantes iluminadas con el nombre " + s.nombre + " (" + letras + (letras === 1 ? " letra" : " letras") + ").";
    else if (s.lista.length) intro = "Hola Letras Gigantes RG, quiero cotizar mobiliario para mi evento.";
    else intro = "Hola Letras Gigantes RG, quiero cotizar letras gigantes iluminadas para mi evento.";
    partes.push(intro);
    if (s.evento) partes.push("Evento: " + s.evento + ".");
    var f = fmtFecha(s.fecha); if (f) partes.push("Fecha: " + f + ".");
    if (s.modo === "Renta") partes.push("Lo quiero en renta.");
    else if (s.modo === "Compra") partes.push("Lo quiero en compra.");
    else if (s.modo === "Aún no sé") partes.push("Aún no sé si rentar o comprar.");
    if (s.lista.length) partes.push((s.nombre.replace(/ /g, "") ? "También me interesa: " : "Me interesa: ") + listaTexto(s.lista.map(function (x) { return x.msg; })) + ".");
    if (s.contacto && String(s.contacto).trim()) partes.push("Mi nombre: " + String(s.contacto).trim() + ".");
    if (s.nombre.replace(/ /g, "") || s.lista.length || s.evento) partes.push("¿Me confirman precio y disponibilidad?");
    return partes.join(" ");
  }
  function refreshWa() {
    var els = document.querySelectorAll("[data-wa-live]");
    var u = waUrl(message());
    for (var i = 0; i < els.length; i++) els[i].href = u;
  }
  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) { links[i].href = waUrl(links[i].getAttribute("data-wa")); links[i].target = "_blank"; links[i].rel = "noopener"; }
    refreshWa();
    on("nombre", refreshWa); on("campo", refreshWa); on("lista", refreshWa);
  }

  /* ---------- Anclas suaves (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var head = document.querySelector(".lg-bar");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight + 14 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  var closeMenu = function () {};
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

  /* ---------- Header: se compacta; la fila de letras repite el nombre ---------- */
  function initHeader() {
    var header = document.getElementById("lg-header");
    if (!header) return;
    var ticking = false;
    function update() { ticking = false; header.classList.toggle("is-compact", (window.scrollY || window.pageYOffset) > 40); }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
    var wrap = document.getElementById("lg-row-tiles");
    var prev = "";
    function paint() {
      if (!wrap) return;
      var items = parse(state.nombre).filter(function (t) { return !t.sp; });
      var sig = items.map(function (t) { return t.key || ("_" + t.ch); }).join(",");
      if (sig === prev) return;
      var prevArr = prev ? prev.split(",") : [];
      var curArr = sig ? sig.split(",") : [];
      var firstDiff = 0; while (firstDiff < prevArr.length && firstDiff < curArr.length && prevArr[firstDiff] === curArr[firstDiff]) firstDiff++;
      prev = sig;
      wrap.textContent = "";
      var max = window.innerWidth < 900 ? 6 : 8;
      if (!items.length) {
        ["r", null, "g"].forEach(function (k) {
          if (!k) { var d = document.createElement("i"); d.className = "lg-row-dot"; d.setAttribute("aria-hidden", "true"); wrap.appendChild(d); return; }
          var im = document.createElement("img"); im.src = tileSrc(k, true); im.alt = ""; im.width = 16; im.height = 22; wrap.appendChild(im);
        });
        return;
      }
      var show = items.length > max ? max - 1 : items.length;
      for (var i = 0; i < show; i++) {
        var t = items[i];
        var el;
        if (t.key) { el = document.createElement("img"); el.src = tileSrc(t.key, true); el.alt = ""; el.width = 16; el.height = 22; }
        else { el = document.createElement("span"); el.className = "lg-row-tile-empty"; el.textContent = ""; el.style.cssText = "flex:none;width:16px;height:22px;border:1px dashed #A99BFF;border-radius:2px;"; }
        if (!reduce && i >= firstDiff) { el.classList.add("is-in"); el.style.setProperty("--i", i - firstDiff); }
        wrap.appendChild(el);
      }
      if (items.length > show) { var m = document.createElement("span"); m.className = "lg-more"; m.textContent = "+" + (items.length - show); wrap.appendChild(m); }
    }
    on("nombre", paint);
    paint();
    window.addEventListener("resize", function () { prev = "\u0000"; paint(); });
  }

  /* ---------- Menú ---------- */
  function initMenu() {
    var btn = document.querySelector(".lg-menu-btn");
    var menu = document.getElementById("lg-menu");
    if (!btn || !menu) return;
    var body = document.body;
    Array.prototype.forEach.call(menu.querySelectorAll(".lg-menu-nav a"), function (a, i) { a.style.setProperty("--i", i); });
    var links = menu.querySelectorAll("a");
    var lbl = btn.querySelector(".lg-menu-lbl");
    function set(open) {
      var was = body.classList.contains("lg-menu-open");
      if (open === was) return;
      body.classList.toggle("lg-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("lg-menu-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a) { if (a.getAttribute("href").charAt(0) !== "#") set(false); return; }
      if (e.target === menu || e.target.classList.contains("lg-menu-panel")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("lg-menu-open")) return;
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

  /* ---------- Vigía de visibilidad por sondeo (rAF + getBoundingClientRect) ---------- */
  function watchVisible(list, vhFrac, onVisible) {
    var pending = Array.prototype.slice.call(list);
    if (!pending.length) return;
    var raf = null;
    function tick() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * vhFrac && r.bottom > 0) onVisible(pending.splice(i, 1)[0]);
      }
      if (pending.length) schedule();
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(tick); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  function initReveal() {
    var els = document.querySelectorAll("[data-r]");
    if (!els.length) return;
    function show(el) { el.classList.add("is-in"); }
    function reveal(el) {
      var img = el.classList.contains("lg-blur") ? el.querySelector("img") : null;
      if (!img || img.complete) { show(el); return; }
      var done = false;
      function fin() { if (done) return; done = true; show(el); }
      if (img.decode) img.decode().then(fin, fin); else { img.addEventListener("load", fin); img.addEventListener("error", fin); }
      setTimeout(fin, 1200);
    }
    if (reduce) { Array.prototype.forEach.call(els, show); return; }
    watchVisible(els, 0.92, reveal);
  }

  /* ---------- WhatsApp flotante: se esconde mientras un botón verde está a la vista ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]");
    if (!zones.length) return;
    var raf = null;
    function update() {
      var vh = window.innerHeight || document.documentElement.clientHeight, on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) { on = true; break; }
      }
      document.body.classList.toggle("lg-wa-off", on);
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(function () { raf = null; update(); }); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  window.LG = { AR: AR, persist: persist, state: state, VAR: VAR, SRC: SRC, parse: parse, clean: clean, tileSrc: tileSrc, setNombre: setNombre, setField: setField, toggleItem: toggleItem, hasItem: hasItem, on: on, emit: emit, message: message, waUrl: waUrl, go: go, reduce: reduce, fmtFecha: fmtFecha, watchVisible: watchVisible };

  function init() { initWa(); initHeader(); initMenu(); initAnchors(); initReveal(); initWaHide(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
