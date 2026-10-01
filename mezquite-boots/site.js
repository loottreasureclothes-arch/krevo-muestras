/* Mezquite Boots · fundación: header (cinto), menú, ojillos, anclas, WhatsApp, estado de "tu pinta". */
(function () {
  "use strict";
  var WA = "524491113361";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* ---------- Estado compartido de "tu pinta" (sessionStorage) ---------- */
  var MZ = (function () {
    var KEY = "mz_pinta_v1";
    var ORDER = ["sombrero", "camisa", "cinto", "pantalon", "botas"];
    var LABEL = { sombrero: "sombrero", camisa: "camisa", cinto: "cinto", pantalon: "pantalón", botas: "botas" };
    var st = { z: [], model: "", num: "", suc: "", name: "" };
    try {
      var raw = sessionStorage.getItem(KEY);
      if (raw) { var p = JSON.parse(raw); if (p && typeof p === "object") { st.z = Array.isArray(p.z) ? p.z.filter(function (k) { return ORDER.indexOf(k) > -1; }) : []; st.model = String(p.model || ""); st.num = String(p.num || ""); st.suc = String(p.suc || ""); st.name = String(p.name || "").slice(0, 40); } }
    } catch (e) {}
    var subs = [];
    function save() { try { sessionStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }
    function emit() { for (var i = 0; i < subs.length; i++) { try { subs[i](st); } catch (e) {} } }
    function list(arr) { return arr.length < 2 ? (arr[0] || "") : arr.slice(0, -1).join(", ") + " y " + arr[arr.length - 1]; }
    function items() {
      return st.z.map(function (k) { return k === "botas" && st.model ? "botas " + st.model : LABEL[k]; });
    }
    function sucText() { return st.suc === "cerca" ? "la que me quede cerca" : st.suc; }
    function lines() {
      var has = st.z.length > 0, bots = st.z.indexOf("botas") > -1;
      var num = "";
      if (bots && st.num) num = st.num === "nose" ? "No sé" : st.num;
      return {
        busco: has ? list(items()) : "",
        num: num,
        suc: st.suc ? (st.suc === "cerca" ? "La que me quede cerca" : st.suc) : "",
        name: st.name.trim()
      };
    }
    function message() {
      var has = st.z.length > 0, bots = st.z.indexOf("botas") > -1, parts = [];
      parts.push(has ? "Hola Mezquite Boots, busco " + list(items()) + "." : "Hola Mezquite Boots, quiero preguntar por botas y ropa vaquera.");
      if (bots && st.num) parts.push(st.num === "nose" ? "No sé qué número calzo." : "Calzo del " + st.num + ".");
      if (st.suc) parts.push(st.suc === "cerca" ? "Voy a la sucursal que me quede cerca." : "Voy a la sucursal " + st.suc + ".");
      if (st.name.trim()) parts.push("Mi nombre: " + st.name.trim());
      return parts.join(" ");
    }
    function toggle(z) {
      var i = st.z.indexOf(z);
      if (i > -1) { st.z.splice(i, 1); if (z === "botas") { st.model = ""; } }
      else st.z.push(z);
      save(); emit();
    }
    function select(z, model) {
      if (st.z.indexOf(z) < 0) st.z.push(z);
      if (z === "botas") st.model = model || "";
      save(); emit();
    }
    return {
      get: function () { return st; },
      has: function (z) { return st.z.indexOf(z) > -1; },
      toggle: toggle, select: select,
      set: function (k, v) { st[k] = v; save(); emit(); },
      setQuiet: function (k, v) { st[k] = v; save(); },
      message: message, lines: lines, waUrl: function () { return waUrl(message()); }, waRaw: waUrl,
      empty: function () { return st.z.length === 0; },
      on: function (cb) { subs.push(cb); }
    };
  })();
  window.MZ = MZ;

  /* ---------- Links de WhatsApp: cada uno NACE con su href real; aquí solo se reescribe el de "tu pinta"
     en pointerdown/click/focus (sin preventDefault, nunca window.open). ---------- */
  function initWa() {
    var dyn = document.querySelectorAll("[data-wa-pinta]");
    function refresh(a) { a.href = MZ.waUrl(); }
    Array.prototype.forEach.call(dyn, function (a) {
      ["pointerdown", "touchstart", "click", "focus", "keydown"].forEach(function (ev) { a.addEventListener(ev, function () { refresh(a); }, { passive: true }); });
      refresh(a);
    });
    MZ.on(function () { Array.prototype.forEach.call(dyn, refresh); });
    var fixed = document.querySelectorAll("[data-wa]");
    Array.prototype.forEach.call(fixed, function (a) { a.target = "_blank"; a.rel = "noopener"; });
  }

  /* ---------- Header: se compacta; ojillos por sección ---------- */
  var closeMenu = function () {};
  function initHeader() {
    var head = document.getElementById("mz-head");
    var eyes = document.querySelectorAll(".mz-eyes li");
    var secs = Array.prototype.slice.call(document.querySelectorAll("[data-eye]"));
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY || window.pageYOffset;
      if (head) head.classList.toggle("is-compact", y > 12);
      var vh = window.innerHeight, cur = 0;
      for (var i = 0; i < secs.length; i++) {
        var r = secs[i].getBoundingClientRect();
        if (r.top <= vh * 0.42) cur = parseInt(secs[i].getAttribute("data-eye"), 10);
      }
      var atEnd = (window.innerHeight + y) >= (document.documentElement.scrollHeight - 4);
      if (atEnd) cur = 4;
      for (var k = 0; k < eyes.length; k++) {
        eyes[k].classList.toggle("is-on", k === cur);
        eyes[k].classList.toggle("is-past", k < cur);
      }
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Menú ---------- */
  function initMenu() {
    var btn = document.querySelector(".mz-burger"), menu = document.getElementById("mz-menu");
    if (!btn || !menu) return;
    var body = document.body, links = menu.querySelectorAll("a");
    function set(open) {
      if (open === body.classList.contains("mz-menu-open")) return;
      body.classList.toggle("mz-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Cerrar el menú" : "Abrir el menú");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 60); else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("mz-menu-open")); });
    menu.addEventListener("click", function (e) { var a = e.target.closest && e.target.closest("a"); if (a) set(false); });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("mz-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(Array.prototype.slice.call(links)), i = items.indexOf(document.activeElement);
        e.preventDefault(); if (i < 0) i = -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* ---------- WhatsApp flotante: se esconde donde ya hay otro verde o datos (data-hide-wa) ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa]");
    if (!zones.length) return;
    var raf = null;
    function update() {
      raf = null;
      var vh = window.innerHeight, on = false;
      for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh * 0.88 && r.bottom > vh * 0.12) { on = true; break; } }
      document.body.classList.toggle("mz-wa-off", on);
    }
    function sch() { if (!raf) raf = requestAnimationFrame(update); }
    sch(); window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch);
  }

  /* ---------- Anclas suaves (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var head = document.getElementById("mz-head");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight : 0) - 6;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.MZgo = go;
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href"); if (href.length < 2) return;
      var el = document.querySelector(href); if (!el) return;
      e.preventDefault(); closeMenu();
      var pick = a.getAttribute("data-pick");
      if (pick) MZ.select(pick, a.getAttribute("data-model") || "");
      var suc = a.getAttribute("data-suc");
      if (suc) MZ.set("suc", suc);
      go(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  function init() { initWa(); initHeader(); initMenu(); initWaHide(); initAnchors(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
