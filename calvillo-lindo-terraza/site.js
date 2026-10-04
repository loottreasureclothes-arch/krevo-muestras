/* Calvillo Lindo Terraza: header, menu, WhatsApp, reveal, escalones del hero, carta y "La subida". */
(function () {
  "use strict";
  var WA = "524959562971";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var body = document.body;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* ---------- Estado compartido de la subida ---------- */
  var LC = window.LC = { items: {}, names: {}, modo: "", personas: 2, listeners: [] };
  LC.on = function (cb) { LC.listeners.push(cb); };
  LC.emit = function () { LC.listeners.forEach(function (cb) { cb(LC); }); };
  LC.count = function () { var n = 0; for (var k in LC.items) n += LC.items[k]; return n; };
  LC.setQty = function (id, q) { q = Math.max(0, Math.min(20, q)); if (q) LC.items[id] = q; else delete LC.items[id]; LC.emit(); };
  LC.message = function () {
    var n = LC.personas, m;
    if (LC.modo === "terraza") m = "Quiero apartar para " + n + " en la terraza.";
    else if (LC.modo === "puerta") m = "Quiero pasar por mi pedido a la puerta (para " + n + ").";
    else if (LC.modo === "domicilio") m = "Lo quiero a domicilio (para " + n + ").";
    else m = "Quiero pedir, somos " + n + ".";
    var parts = [];
    for (var k in LC.items) parts.push(LC.items[k] + " " + LC.names[k]);
    var s = "Hola, Calvillo Lindo Terraza. " + m;
    s += parts.length ? " Se antoja: " + parts.join(", ") + "." : " ¿Qué me recomiendan?";
    return s + " ¿Me confirman disponibilidad y precio?";
  };

  function initWa() {
    $$("[data-wa]").forEach(function (a) { a.href = waUrl(a.getAttribute("data-wa")); a.target = "_blank"; a.rel = "noopener"; });
  }

  function initHeader() {
    var bar = $("#bar");
    function upd() { bar.classList.toggle("is-solid", (window.scrollY || 0) > 30); }
    upd(); window.addEventListener("scroll", upd, { passive: true });
    var btn = $(".mbtn"), menu = $("#menu");
    function set(open) {
      body.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
    }
    btn.addEventListener("click", function () { set(!body.classList.contains("menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  function watch(list, frac, cb) {
    var pend = list.slice(), raf = null;
    if (!pend.length) return;
    function tick() {
      raf = null;
      var vh = window.innerHeight;
      for (var i = pend.length - 1; i >= 0; i--) {
        var r = pend[i].getBoundingClientRect();
        if (r.top < vh * frac && r.bottom > 0) { var el = pend[i]; pend.splice(i, 1); cb(el); }
      }
      if (pend.length) sch();
    }
    function sch() { if (!raf) raf = requestAnimationFrame(tick); }
    sch(); window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch);
  }

  function initReveal() {
    var els = $$("[data-reveal]");
    if (reduce) { els.forEach(function (e) { e.classList.add("is-in"); }); }
    else watch(els, 0.92, function (e) { e.classList.add("is-in"); });
  }

  /* Momento firma: las columnas bajan como peldaños y descubren el atardecer; se repite al volver arriba */
  function initStairs() {
    var ph = $("[data-stairs]"); if (!ph) return;
    var img = $("img", ph);
    function go() { ph.classList.add("is-in"); }
    if (reduce) { go(); return; }
    if (img && !img.complete && img.decode) img.decode().then(go, go); else setTimeout(go, 120);
    var armed = false;
    window.addEventListener("scroll", function () {
      var r = ph.getBoundingClientRect(), vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) { if (!armed) { armed = true; ph.classList.remove("is-in"); } }
      else if (armed && r.top > -r.height * 0.3 && r.bottom > vh * 0.4) { armed = false; requestAnimationFrame(function () { requestAnimationFrame(go); }); }
    }, { passive: true });
  }

  function initWaHide() {
    var zones = $$("[data-hide-wa]"); if (!zones.length) return;
    function upd() {
      var vh = window.innerHeight, on = false;
      zones.forEach(function (z) { var r = z.getBoundingClientRect(); if (r.top < vh * 0.8 && r.bottom > 0) on = true; });
      body.classList.toggle("wa-off", on);
    }
    var raf = null;
    function sch() { if (!raf) raf = requestAnimationFrame(function () { raf = null; upd(); }); }
    sch(); window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch);
  }

  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]'); if (!a || a.getAttribute("href") === "#") return;
      var el = document.getElementById(a.getAttribute("href").slice(1)); if (!el) return;
      e.preventDefault();
      var top = el.getBoundingClientRect().top + window.scrollY - (el.id === "inicio" ? 0 : 56);
      window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
    });
  }

  /* ---------- Carta: foto que cambia + Agregar ---------- */
  function initCarta() {
    var rows = $$(".row"); if (!rows.length) return;
    rows.forEach(function (r) { LC.names[r.dataset.id] = r.dataset.name; });
    function pick(r) {
      rows.forEach(function (x) { x.classList.toggle("sel", x === r); });
      $$(".cp").forEach(function (c) { c.classList.toggle("on", c.dataset.id === r.dataset.id); });
      $("#cp-name").textContent = r.dataset.name;
      $("#cp-tag").textContent = r.dataset.tag || "";
    }
    rows.forEach(function (r) {
      $(".pick", r).addEventListener("click", function () { pick(r); });
      $("[data-add]", r).addEventListener("click", function () { pick(r); LC.setQty(r.dataset.id, 1); });
      $("[data-inc]", r).addEventListener("click", function () { LC.setQty(r.dataset.id, (LC.items[r.dataset.id] || 0) + 1); });
      $("[data-dec]", r).addEventListener("click", function () { LC.setQty(r.dataset.id, (LC.items[r.dataset.id] || 0) - 1); });
    });
    var sbar = $("#sbar"), zone = $("#pedido");
    function paintRows() {
      rows.forEach(function (r) {
        var q = LC.items[r.dataset.id] || 0, ctl = $(".ctl", r);
        ctl.classList.toggle("has", q > 0); $(".qty", r).hidden = !(q > 0); $(".qty output", r).textContent = q;
      });
      var n = LC.count();
      $("#sbar-t").textContent = "Tu subida: " + n + (n === 1 ? " platillo" : " platillos");
      sbar.hidden = n === 0 || inZone();
    }
    function inZone() { var r = zone.getBoundingClientRect(); return r.top < window.innerHeight * 0.7 && r.bottom > 0; }
    LC.on(paintRows);
    window.addEventListener("scroll", function () { if (LC.count()) sbar.hidden = inZone(); }, { passive: true });
  }

  /* ---------- La subida (componente firma) ---------- */
  function initSubida() {
    var root = $("#pedido"); if (!root) return;
    var p1 = $("#p1"), p2 = $("#p2"), p3 = $("#p3"), touchedP = false;
    var segs = $$("[data-modo]", root);
    segs.forEach(function (b) {
      b.addEventListener("click", function () { LC.modo = b.dataset.modo; LC.emit(); });
    });
    $("#pm").addEventListener("click", function () { touchedP = true; LC.personas = Math.max(1, LC.personas - 1); LC.emit(); });
    $("#pp").addEventListener("click", function () { touchedP = true; LC.personas = Math.min(30, LC.personas + 1); LC.emit(); });
    function money(n) { return "$" + n.toLocaleString("es-MX"); }
    function paint() {
      segs.forEach(function (b) { b.setAttribute("aria-checked", b.dataset.modo === LC.modo ? "true" : "false"); });
      $("#pn").textContent = LC.personas;
      $("#pl").textContent = LC.personas === 1 ? "persona" : "personas";
      $("#rango").innerHTML = "Calcula de <b>" + money(LC.personas * 100) + "</b> a <b>" + money(LC.personas * 200) + "</b> en total.<small>De $100 a $200 por persona.</small>";
      var ul = $("#sub-items"); ul.innerHTML = "";
      Object.keys(LC.items).forEach(function (id) {
        var li = document.createElement("li");
        var sp = document.createElement("span"); sp.textContent = LC.names[id];
        var q = document.createElement("div"); q.className = "qty";
        var m = document.createElement("button"); m.type = "button"; m.textContent = "−"; m.setAttribute("aria-label", "Quitar uno de " + LC.names[id]);
        var o = document.createElement("output"); o.textContent = LC.items[id];
        var p = document.createElement("button"); p.type = "button"; p.textContent = "+"; p.setAttribute("aria-label", "Agregar otro " + LC.names[id]);
        m.addEventListener("click", function () { LC.setQty(id, LC.items[id] - 1); });
        p.addEventListener("click", function () { LC.setQty(id, LC.items[id] + 1); });
        q.appendChild(m); q.appendChild(o); q.appendChild(p); li.appendChild(sp); li.appendChild(q); ul.appendChild(li);
      });
      p1.classList.toggle("lit", !!LC.modo);
      p2.classList.toggle("lit", touchedP);
      p3.classList.toggle("lit", LC.count() > 0);
      var msg = LC.message();
      $("#sub-prev").textContent = msg;
      var a = $("#sub-wa"); a.setAttribute("data-wa", msg); a.href = waUrl(msg);
    }
    LC.on(paint); paint();
  }

  function init() { initWa(); initHeader(); initReveal(); initStairs(); initWaHide(); initAnchors(); initCarta(); initSubida(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
