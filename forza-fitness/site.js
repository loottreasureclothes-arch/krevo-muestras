/* Forza Fitness Club: fundación de interacción (header, menú, WhatsApp, reveal, estado compartido, hora de México). */
(function () {
  "use strict";
  var WA = "524491538877";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  /* ---------- Estado compartido: plan y clase elegidos ---------- */
  var FZ = (window.FZ = { plan: "", clase: null, _l: [], _t: [] });
  (function restore() {
    try {
      var s = JSON.parse(sessionStorage.getItem("fz_estado") || "{}");
      if (s && typeof s === "object") { FZ.plan = s.plan || ""; FZ.clase = s.clase || null; }
    } catch (e) {}
  })();
  FZ.on = function (fn) { FZ._l.push(fn); };
  FZ.onTick = function (fn) { FZ._t.push(fn); };
  FZ.set = function (k, v) {
    FZ[k] = v;
    try { sessionStorage.setItem("fz_estado", JSON.stringify({ plan: FZ.plan, clase: FZ.clase })); } catch (e) {}
    FZ._l.forEach(function (fn) { try { fn(FZ); } catch (e) {} });
    FZ.syncWa();
  };
  FZ.msg = function () {
    var p = ["Hola Forza Fitness Club, quiero pedir mi inscripción."];
    if (FZ.plan) {
      var b = document.querySelector('[data-pick="' + FZ.plan + '"]');
      var pr = b && b.getAttribute("data-price");
      p.push(pr ? "Me interesa el " + (FZ.plan.indexOf("Plan") === 0 ? "" : "plan ") + FZ.plan + " (" + pr + ")." : "Me interesa saber el precio de otros paquetes.");
    }
    if (FZ.clase) p.push("Clase: CrossFit " + FZ.clase.label + (FZ.clase.coach ? " con " + FZ.clase.coach : "") + ".");
    return p.join(" ");
  };
  FZ.waUrl = function () { return waUrl(FZ.msg()); };
  FZ.syncWa = function () {
    var links = document.querySelectorAll("a[data-wa-dyn]");
    for (var i = 0; i < links.length; i++) links[i].href = waUrl(FZ.msg());
  };

  /* ---------- Hora de America/Mexico_City (no la del visitante) ---------- */
  var dtf = null;
  try {
    dtf = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", second: "numeric", hourCycle: "h23" });
  } catch (e) { dtf = null; }
  var DOWS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  FZ.now = function () { return typeof window.__fzNow === "number" ? window.__fzNow : Date.now(); };
  FZ.mx = function (ms) {
    var d = new Date(typeof ms === "number" ? ms : FZ.now());
    if (!dtf) { var u = new Date(d.getTime() - 6 * 3600 * 1000); return { dow: u.getUTCDay(), h: u.getUTCHours(), m: u.getUTCMinutes(), s: u.getUTCSeconds(), min: u.getUTCHours() * 60 + u.getUTCMinutes() }; }
    var o = {};
    dtf.formatToParts(d).forEach(function (x) { o[x.type] = x.value; });
    var h = parseInt(o.hour, 10) % 24, m = parseInt(o.minute, 10);
    return { dow: DOWS[o.weekday], h: h, m: m, s: parseInt(o.second, 10), min: h * 60 + m };
  };
  FZ.fmt12 = function (h, m) { var ap = h >= 12 ? "pm" : "am"; var hh = h % 12 || 12; return hh + ":" + ("0" + (m || 0)).slice(-2) + " " + ap; };
  FZ.tick = function () { FZ._t.forEach(function (fn) { try { fn(); } catch (e) {} }); };
  /* Gancho de prueba: FZ.setNow(ms) simula otra hora sin tocar el reloj del equipo */
  FZ.setNow = function (ms) { window.__fzNow = ms; FZ.tick(); };

  /* ---------- Titulares por palabra (caen y pegan) ---------- */
  FZ.words = function (root) {
    var lines = root.classList && root.classList.contains("fz-l") ? [root] : root.querySelectorAll(".fz-l");
    var n = 0;
    Array.prototype.forEach.call(lines, function (l) {
      var txt = l.textContent.replace(/\s+/g, " ").trim();
      l.textContent = "";
      var parts = txt.split(" ");
      parts.forEach(function (w, i) {
        var s = document.createElement("span");
        s.className = "fz-w"; s.textContent = w; s.style.setProperty("--i", n++);
        l.appendChild(s);
        if (i < parts.length - 1) l.appendChild(document.createTextNode(" "));
      });
    });
  };
  FZ.setLine = function (el, text) {
    if (el.getAttribute("data-txt") === text) return false;
    el.setAttribute("data-txt", text);
    el.textContent = text;
    var root = el.closest("[data-drop]");
    var idx = root ? Array.prototype.indexOf.call(root.querySelectorAll(".fz-l"), el) : 0;
    el.textContent = "";
    text.split(" ").forEach(function (w, i, arr) {
      var s = document.createElement("span");
      s.className = "fz-w"; s.textContent = w; s.style.setProperty("--i", idx * 3 + i);
      el.appendChild(s);
      if (i < arr.length - 1) el.appendChild(document.createTextNode(" "));
    });
    return true;
  };

  /* ---------- Links de WhatsApp: el href ya nace real; aquí solo se mantiene al día ---------- */
  function initWa() {
    FZ.syncWa();
    function upd(e) {
      var a = e.target && e.target.closest ? e.target.closest("a[data-wa-dyn]") : null;
      if (a) a.href = waUrl(FZ.msg()); /* sin preventDefault: el navegador abre el href */
    }
    document.addEventListener("pointerdown", upd, true);
    document.addEventListener("click", upd, true);
  }

  /* ---------- Header: se compacta y la barra de carga sigue al scroll ---------- */
  function initHeader() {
    var header = document.getElementById("fz-header");
    if (!header) return;
    var fill = document.getElementById("fz-load-fill");
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY || window.pageYOffset;
      header.classList.toggle("is-compact", y > 12);
      var max = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
      var pct = max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0;
      if (fill) fill.style.width = pct + "%";
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Menú hamburguesa ---------- */
  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".fz-burger");
    var menu = document.getElementById("fz-menu");
    if (!btn || !menu) return;
    var body = document.body;
    var links = menu.querySelectorAll("a");
    function set(open) {
      if (open === body.classList.contains("fz-menu-open")) return;
      body.classList.toggle("fz-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("fz-menu-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (a) { set(false); return; }
      if (e.target === menu || e.target.classList.contains("fz-menu-panel")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("fz-menu-open")) return;
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
        if (r.top < vh * vhFrac && r.bottom > 0) { var el = pending[i]; pending.splice(i, 1); onVisible(el); }
      }
      if (pending.length) schedule();
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(tick); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  /* WhatsApp flotante: se esconde donde ya hay un CTA grande (data-hide-wa) y en el pie */
  function initWaHide() {
    var zones = document.querySelectorAll("[data-hide-wa], .fz-foot");
    if (!zones.length) return;
    var raf = null;
    function update() {
      var vh = window.innerHeight || document.documentElement.clientHeight, on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.top < vh * 0.85 && r.bottom > vh * 0.1) { on = true; break; }
      }
      document.body.classList.toggle("fz-wa-off", on);
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(function () { raf = null; update(); }); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  function initReveal() {
    var heads = document.querySelectorAll("[data-drop]");
    Array.prototype.forEach.call(heads, function (h) { FZ.words(h); });
    var els = document.querySelectorAll("[data-reveal], [data-drop]");
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { Array.prototype.forEach.call(els, show); return; }
    watchVisible(els, 0.92, show);
  }

  /* ---------- Scroll suave a #anclas (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var head = document.getElementById("fz-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight + 6 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  FZ.go = go;
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

  function init() {
    initWa(); initHeader(); initMenu(); initWaHide(); initReveal(); initAnchors();
    setInterval(FZ.tick, 15000);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
