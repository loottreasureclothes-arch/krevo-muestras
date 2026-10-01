/* La Roma Brunch: mecanica comun (header, menu, WhatsApp, reveal, anclas, estado de la mesa). */
(function () {
  "use strict";
  var WA = "524498067600";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* ---------- LA MESA: estado compartido (sessionStorage en try/catch) ---------- */
  var KEY = "rm_mesa";
  var MAX = 4;
  var dishes = {};   /* id -> {id, name, price, img}  (se leen del HTML de la carta) */
  var state = { items: [], branch: "", name: "" };
  function load() {
    try {
      var s = JSON.parse(sessionStorage.getItem(KEY) || "null");
      if (s && typeof s === "object") {
        state.items = Array.isArray(s.items) ? s.items.slice(0, MAX) : [];
        state.branch = typeof s.branch === "string" ? s.branch : "";
        state.name = typeof s.name === "string" ? s.name.slice(0, 60) : "";
      }
    } catch (e) {}
  }
  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function readDishes() {
    $$(".rm-row[data-id]").forEach(function (row) {
      var p = row.getAttribute("data-price");
      dishes[row.getAttribute("data-id")] = { id: row.getAttribute("data-id"), name: row.getAttribute("data-name"), price: p ? parseInt(p, 10) : null, img: row.getAttribute("data-img") };
    });
    state.items = state.items.filter(function (id) { return dishes[id]; });
  }
  function emit(detail) {
    try { window.dispatchEvent(new CustomEvent("rm:change", { detail: detail || {} })); }
    catch (e) { var ev = document.createEvent("CustomEvent"); ev.initCustomEvent("rm:change", false, false, detail || {}); window.dispatchEvent(ev); }
  }
  function listNames() {
    var n = state.items.map(function (id) { return dishes[id].name; });
    if (n.length <= 1) return n.join("");
    return n.slice(0, -1).join(", ") + " y " + n[n.length - 1];
  }
  function message() {
    var m = state.items.length ? "Hola La Roma Brunch, quiero pedir: " + listNames() + "." : "Hola La Roma Brunch, quiero preguntar por el menú.";
    if (state.branch) m += " Sucursal: " + state.branch + ".";
    if (state.name && state.name.trim()) m += " Mi nombre: " + state.name.trim();
    return m;
  }
  function total() {
    var sum = 0, pending = 0;
    state.items.forEach(function (id) { var d = dishes[id]; if (d.price != null) sum += d.price; else pending++; });
    return { sum: sum, pending: pending };
  }
  var Mesa = {
    MAX: MAX, state: state, dishes: dishes,
    has: function (id) { return state.items.indexOf(id) >= 0; },
    full: function () { return state.items.length >= MAX; },
    add: function (id) { if (!dishes[id] || Mesa.has(id) || Mesa.full()) return false; state.items.push(id); save(); emit({ added: id }); return true; },
    remove: function (id) { var i = state.items.indexOf(id); if (i < 0) return; state.items.splice(i, 1); save(); emit({ removed: id }); },
    setBranch: function (b) { state.branch = b; save(); emit({}); },
    setName: function (n) { state.name = n; save(); emit({ typing: true }); },
    message: message, url: function () { return waUrl(message()); }, total: total,
    money: function (n) { return "$" + n.toLocaleString("es-MX"); }
  };
  window.RomaMesa = Mesa;

  /* Todos los botones verdes dinamicos: el JS solo reescribe el href */
  function syncWa() {
    var u = Mesa.url();
    $$("[data-wa-dyn]").forEach(function (a) { a.href = u; });
  }

  /* ---------- Cinta de platos del header ---------- */
  function initCinta() {
    var cinta = $("#rm-cinta");
    if (!cinta) return;
    var slots = $$(".rm-slot", cinta);
    var prev = [];
    function paint(d) {
      slots.forEach(function (s, i) {
        var id = state.items[i];
        var cur = s.getAttribute("data-id") || "";
        if ((id || "") === cur) return;
        s.setAttribute("data-id", id || "");
        s.innerHTML = "";
        s.classList.toggle("is-on", !!id);
        if (id) {
          var im = document.createElement("img");
          im.src = dishes[id].img; im.alt = ""; im.width = 56; im.height = 56;
          s.appendChild(im);
          s.classList.remove("is-new"); void s.offsetWidth; s.classList.add("is-new");
        }
      });
      cinta.setAttribute("aria-label", "Tu mesa, " + state.items.length + " de " + MAX + " platos. Ir a la mesa");
    }
    window.addEventListener("rm:change", paint);
    paint();
  }

  /* ---------- Header: la placa se sube a la barra ---------- */
  function initHeader() {
    var head = $("#rm-head");
    if (!head) return;
    var ticking = false;
    function update() { ticking = false; head.classList.toggle("is-compact", (window.scrollY || window.pageYOffset) > 40); }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Menu hamburguesa ---------- */
  var closeMenu = function () {};
  function initMenu() {
    var btn = $(".rm-menu-btn"), menu = $("#rm-menu");
    if (!btn || !menu) return;
    var body = document.body, links = $$("a", menu);
    var lbl = $(".rm-menu-lbl", btn);
    function set(open) {
      if (open === body.classList.contains("rm-menu-open")) return;
      body.classList.toggle("rm-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "CERRAR" : "MENÚ";
      if (open) setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, 80);
      else btn.focus({ preventScroll: true });
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("rm-menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("a")) set(false); });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("rm-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(links), i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
  }

  /* ---------- Vigia de visibilidad por sondeo ---------- */
  function watchVisible(list, vhFrac, cb) {
    var pending = list.slice();
    if (!pending.length) return;
    var raf = null;
    function tick() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * vhFrac && r.bottom > 0) cb(pending.splice(i, 1)[0]);
      }
      if (pending.length) schedule();
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(tick); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  window.RomaWatch = watchVisible;

  /* ---------- WhatsApp flotante: se esconde donde ya hay un verde a la vista ---------- */
  function initWaHide() {
    var zones = $$("[data-hide-wa]");
    if (!zones.length) return;
    var raf = null;
    function update() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight, on = false;
      for (var i = 0; i < zones.length; i++) {
        var r = zones[i].getBoundingClientRect();
        if (r.height > 0 && r.top < vh * 0.9 && r.bottom > 0) { on = true; break; }
      }
      document.body.classList.toggle("rm-wa-off", on);
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(update); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("rm:change", schedule);
  }

  /* ---------- Titulos: las palabras bajan una a una ---------- */
  function splitWords() {
    $$("[data-words]").forEach(function (el) {
      var n = 0;
      (function walk(node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (c) {
          if (c.nodeType === 3) {
            var parts = c.nodeValue.split(/(\s+)/), frag = document.createDocumentFragment();
            parts.forEach(function (p) {
              if (!p) return;
              if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
              var s = document.createElement("span"); s.className = "rm-w"; s.style.setProperty("--i", n++); s.textContent = p; frag.appendChild(s);
            });
            node.replaceChild(frag, c);
          } else if (c.nodeType === 1) walk(c);
        });
      })(el);
    });
  }

  /* ---------- Reveal ---------- */
  function initReveal() {
    var els = $$("[data-reveal]");
    if (!els.length) return;
    function show(el) { el.classList.add("is-in"); }
    function reveal(el) {
      var img = el.hasAttribute("data-blur") ? $("img", el) : null;
      if (!img || img.complete) { show(el); return; }
      var done = false;
      function go() { if (done) return; done = true; show(el); }
      if (img.decode) img.decode().then(go, go); else { img.addEventListener("load", go); img.addEventListener("error", go); }
      setTimeout(go, 1200);
    }
    if (reduce) { els.forEach(show); return; }
    watchVisible(els, 0.92, reveal);
  }

  /* ---------- Anclas suaves (sin scroll-behavior en CSS) ---------- */
  function go(el) {
    var head = $(".rm-bar");
    var top = el.getBoundingClientRect().top + window.scrollY - (head ? head.offsetHeight + 14 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  window.RomaIr = go;
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href");
      if (href.length < 2) return;
      var el = $(href);
      if (!el) return;
      e.preventDefault();
      closeMenu();
      go(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  function init() {
    load(); readDishes();
    splitWords();
    initHeader(); initMenu(); initCinta(); initWaHide(); initReveal(); initAnchors();
    syncWa();
    window.addEventListener("rm:change", syncWa);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
