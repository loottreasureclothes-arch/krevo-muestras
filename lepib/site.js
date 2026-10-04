/* LePib: header, menu, WhatsApp, reveal, hoja (momento firma) y plato (componente firma). */
(function () {
  "use strict";
  var WA = "524493869601"; /* PENDIENTE: confirmar cual es el WhatsApp de pedidos (ver PENDIENTES.md) */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement, body = document.body;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  function money(n) { return "$" + n; }

  function initWa() {
    var l = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < l.length; i++) { l[i].href = waUrl(l[i].getAttribute("data-wa")); l[i].target = "_blank"; l[i].rel = "noopener"; }
  }

  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".lp-menu-btn"), menu = document.getElementById("lp-menu");
    if (!btn || !menu) return;
    var lbl = btn.querySelector(".lp-lbl"), links = menu.querySelectorAll("a");
    function set(open) {
      if (open === body.classList.contains("lp-menu-open")) return;
      body.classList.toggle("lp-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!body.classList.contains("lp-menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("a") || e.target === menu) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  function watch(list, frac, cb) {
    var pend = Array.prototype.slice.call(list), raf = null;
    if (!pend.length) return;
    function tick() {
      raf = null;
      var vh = window.innerHeight;
      for (var i = pend.length - 1; i >= 0; i--) {
        var r = pend[i].getBoundingClientRect();
        if (r.top < vh * frac && r.bottom > 0) { var el = pend[i]; pend.splice(i, 1); cb(el); }
      }
      if (pend.length) sched();
    }
    function sched() { if (!raf) raf = requestAnimationFrame(tick); }
    sched(); window.addEventListener("scroll", sched, { passive: true }); window.addEventListener("resize", sched);
  }

  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (reduce) { for (var i = 0; i < els.length; i++) els[i].classList.add("is-in"); return; }
    root.classList.add("lp-rv");
    watch(els, 0.92, function (el) { el.classList.add("is-in"); });
  }

  function initWaHide() {
    var zones = document.querySelectorAll("#listo, .lp-foot, #hero .lp-acts, #menu .lp-order");
    function upd() {
      var vh = window.innerHeight, on = false;
      for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh * .85 && r.bottom > 0) { on = true; break; } }
      body.classList.toggle("lp-wa-off", on);
    }
    var raf = null;
    function s() { if (!raf) raf = requestAnimationFrame(function () { raf = null; upd(); }); }
    s(); window.addEventListener("scroll", s, { passive: true }); window.addEventListener("resize", s);
  }

  function go(el) {
    var top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var h = a.getAttribute("href");
      if (h.length < 2) return;
      var el = document.querySelector(h);
      if (!el) return;
      e.preventDefault(); closeMenu();
      if (h === "#inicio") window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); else go(el);
    });
  }

  /* Momento firma: las hojas de platano cierran el tamal y se abren al llegar. Reversible. */
  function initHoja() {
    var s = document.getElementById("hoja");
    if (!s || reduce) return;
    var armedOnce = false;
    function upd() {
      var r = s.getBoundingClientRect(), vh = window.innerHeight;
      var inView = r.top < vh * .55 && r.bottom > vh * .25;
      var far = r.top > vh * 1.05 || r.bottom < -vh * .05;
      if (inView) s.classList.remove("is-armed");
      else if (far) s.classList.add("is-armed");
    }
    var raf = null;
    function sc() { if (!raf) raf = requestAnimationFrame(function () { raf = null; upd(); }); }
    var r0 = s.getBoundingClientRect();
    if (r0.top > window.innerHeight) s.classList.add("is-armed");
    window.addEventListener("scroll", sc, { passive: true }); window.addEventListener("resize", sc);
    setTimeout(function () {
      var r = s.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) s.classList.remove("is-armed");
    }, 1600);
  }

  /* Componente firma: el plato de barro. Cada platillo es un lugar en el plato; el mensaje sale literal. */
  var MENU = [
    { id: "taco", n: "Taco", p: 32, img: "taco" },
    { id: "salbute", n: "Salbute", p: 70, img: "salbute" },
    { id: "tamal", n: "Tamal yucateco", p: 55, img: "tamal" },
    { id: "quesadilla", n: "Quesadilla al comal", p: 87, ini: "Q" },
    { id: "burrito", n: "Burrito", p: 90, img: "burrito" },
    { id: "mixto", n: "Plato mixto", p: 189, img: "mixto" },
    { id: "chamorro", n: "Chamorro al pibil", p: 270, ini: "C" }
  ];
  function initPlato() {
    var plate = document.getElementById("lp-plate"), list = document.getElementById("lp-items"),
        tot = document.getElementById("lp-total"), order = document.getElementById("lp-order");
    if (!plate || !list) return;
    var qty = {}, slots = {}, rows = {};
    var n = MENU.length, R = 36; /* radio en % del plato */
    MENU.forEach(function (m, i) {
      qty[m.id] = 0;
      var ang = (-90 + i * 360 / n) * Math.PI / 180;
      var w = document.createElement("div"); w.className = "lp-slot-w";
      w.style.left = (50 + R * Math.cos(ang)) + "%"; w.style.top = (50 + R * Math.sin(ang)) + "%";
      var d = document.createElement("button"); d.type = "button"; d.className = "lp-slot"; d.setAttribute("aria-label", "Agregar " + m.n); d.addEventListener("click", function () { set(m.id, qty[m.id] + 1); });
      d.innerHTML = m.img ? '<img src="img/' + m.img + '-96.webp" alt="" width="96" height="96">' : '<span class="lp-ini">' + m.ini + "</span>";
      var b = document.createElement("b"); b.textContent = "0";
      w.appendChild(d); w.appendChild(b); plate.appendChild(w); slots[m.id] = { w: w, b: b };

      var li = document.createElement("li"); li.className = "lp-item";
      li.innerHTML = '<span class="lp-item-ph">' + (m.img ? '<img src="img/' + m.img + '-96.webp" srcset="img/' + m.img + '-96.webp 1x, img/' + m.img + '-192.webp 2x" alt="" width="56" height="56">' : m.ini) + '</span>' +
        '<span><span class="lp-item-n">' + m.n + '</span><br><span class="lp-item-p">' + money(m.p) + '</span></span>' +
        '<span><button class="lp-add" type="button" aria-label="Agregar ' + m.n + '">Agregar</button>' +
        '<span class="lp-step"><button type="button" data-d="-1" aria-label="Quitar uno">&minus;</button><output>0</output><button type="button" data-d="1" aria-label="Agregar uno">+</button></span></span>';
      list.appendChild(li); rows[m.id] = li;
      li.querySelector(".lp-add").addEventListener("click", function () { set(m.id, 1); });
      Array.prototype.forEach.call(li.querySelectorAll(".lp-step button"), function (bt) {
        bt.addEventListener("click", function () { set(m.id, qty[m.id] + parseInt(bt.getAttribute("data-d"), 10)); });
      });
    });
    function message() {
      var lines = [], total = 0;
      MENU.forEach(function (m) { if (qty[m.id] > 0) { lines.push(qty[m.id] + " x " + m.n + " (" + money(qty[m.id] * m.p) + ")"); total += qty[m.id] * m.p; } });
      if (!lines.length) return "Hola LePib, vi su página y quiero pedir cochinita.";
      return "Hola LePib, vi su página y quiero pedir:\n" + lines.join("\n") + "\nTotal: " + money(total) + "\n¿Me confirman y a qué hora estaría listo?";
    }
    function paint() {
      var total = 0, any = false;
      MENU.forEach(function (m) {
        var q = qty[m.id]; total += q * m.p; if (q > 0) any = true;
        slots[m.id].w.classList.toggle("on", q > 0); slots[m.id].b.textContent = q;
        rows[m.id].classList.toggle("on", q > 0); rows[m.id].querySelector("output").textContent = q;
      });
      tot.textContent = any ? money(total) : "platillo"; tot.classList.toggle("is-word", !any); document.getElementById("lp-mid-k").textContent = any ? "Tu plato" : "Toca un";
      order.href = waUrl(message());
      order.querySelector("span").textContent = any ? "Pedir mi plato, " + money(total) : "Pedir mi plato";
    }
    function set(id, v) { qty[id] = Math.max(0, Math.min(20, v)); paint(); }
    paint();
    window.LePibPlato = { message: message, set: set };
  }

  function init() { initWa(); initMenu(); initReveal(); initWaHide(); initAnchors(); initHoja(); initPlato(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
