/* Café del Codo: header, menú, WhatsApp, reveal, charola, luces del patio, horario en vivo. */
(function () {
  "use strict";
  var WA = "524495206792";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  function $all(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  function initWa() {
    $all("[data-wa]").forEach(function (a) { a.href = waUrl(a.getAttribute("data-wa")); a.target = "_blank"; a.rel = "noopener"; });
  }

  function watchVisible(list, vhFrac, onVisible) {
    var pending = list.slice(); if (!pending.length) return;
    var raf = null;
    function tick() {
      raf = null; var vh = window.innerHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * vhFrac && r.bottom > 0) { var el = pending[i]; pending.splice(i, 1); onVisible(el); }
      }
      if (pending.length) schedule();
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(tick); }
    schedule(); window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", schedule);
  }

  function initHeader() {
    var hd = document.getElementById("hd"); if (!hd) return;
    var t = false;
    function up() { t = false; hd.classList.toggle("is-compact", (window.scrollY || 0) > 12); }
    window.addEventListener("scroll", function () { if (!t) { t = true; requestAnimationFrame(up); } }, { passive: true }); up();
  }

  var closeMenu = function () {};
  function initMenu() {
    var btn = document.querySelector(".hd-menu-btn"), menu = document.getElementById("hd-menu"); if (!btn || !menu) return;
    var lbl = btn.querySelector(".hd-lbl");
    function set(o) {
      document.body.classList.toggle("menu-open", o); btn.setAttribute("aria-expanded", o ? "true" : "false"); lbl.textContent = o ? "Cerrar" : "Menú";
    }
    closeMenu = function () { set(false); };
    btn.addEventListener("click", function () { set(!document.body.classList.contains("menu-open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  function go(el) {
    var h = document.querySelector(".hd"); var top = el.getBoundingClientRect().top + window.scrollY - (h ? h.offsetHeight + 8 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a || e.defaultPrevented) return;
      var href = a.getAttribute("href"); if (href.length < 2) return;
      var el = document.querySelector(href); if (!el) return;
      e.preventDefault(); closeMenu(); go(el);
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  function initWaHide() {
    var zones = $all("[data-hide-wa]"); if (!zones.length) return;
    var raf = null;
    function update() {
      var vh = window.innerHeight, on = false;
      zones.forEach(function (z) { var r = z.getBoundingClientRect(); if (r.top < vh * 0.85 && r.bottom > vh * 0.1) on = true; });
      document.body.classList.toggle("wa-off", on);
    }
    function s() { if (!raf) raf = requestAnimationFrame(function () { raf = null; update(); }); }
    s(); window.addEventListener("scroll", s, { passive: true }); window.addEventListener("resize", s);
  }

  function initReveal() {
    var els = $all("[data-reveal]"); if (!els.length) return;
    if (reduce) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
    watchVisible(els, 0.92, function (e) { e.classList.add("is-in"); });
  }

  /* Momento firma: se prende el callejón (luces del patio) */
  function initNoche() {
    var f = document.getElementById("noche-foto"); if (!f || reduce) { if (f) f.classList.remove("is-pre"); return; }
    var raf = null;
    function update() {
      var r = f.getBoundingClientRect(), vh = window.innerHeight;
      var inView = r.top < vh * 0.7 && r.bottom > vh * 0.2;
      f.classList.toggle("is-pre", !inView && r.top > 0);
    }
    function s() { if (!raf) raf = requestAnimationFrame(function () { raf = null; update(); }); }
    s(); window.addEventListener("scroll", s, { passive: true }); window.addEventListener("resize", s);
    setTimeout(function () { if (f.getBoundingClientRect().top < window.innerHeight) f.classList.remove("is-pre"); }, 1600);
  }

  /* Componente firma: la charola */
  function initCharola() {
    var box = document.getElementById("charola"); if (!box) return;
    var fotos = document.getElementById("charola-fotos"), txt = document.getElementById("charola-txt"), btn = document.getElementById("charola-wa");
    var sel = [];
    var BASE_MSG = "Hola Café del Codo, vi su página. Quiero pedir";
    function find(n) { for (var i = 0; i < sel.length; i++) if (sel[i].nombre === n) return i; return -1; }
    function setPressed(n, on) {
      $all("[data-nombre]").forEach(function (b) {
        if (b.getAttribute("data-nombre") !== n) return;
        b.setAttribute("aria-pressed", on ? "true" : "false");
        var t = b.querySelector(".cd-add-t"); if (t) t.textContent = on ? "En la charola" : "Agregar";
        var card = b.closest(".cd-card"); if (card) card.classList.toggle("is-on", on);
      });
    }
    function render() {
      box.classList.toggle("is-empty", sel.length === 0);
      box.classList.remove("is-bump"); void box.offsetWidth; if (sel.length) box.classList.add("is-bump");
      fotos.innerHTML = "";
      sel.forEach(function (it) {
        var s = document.createElement("span"); s.className = "ch-ph" + (it.img ? "" : " ch-ph-t");
        if (it.img) { var im = document.createElement("img"); im.src = "img/" + it.img + "-480.webp"; im.alt = ""; s.appendChild(im); } else s.textContent = it.nombre.charAt(0);
        fotos.appendChild(s);
      });
      var names = sel.map(function (i) { return i.nombre + (i.precio ? " ($" + i.precio + ")" : ""); });
      for (var k = sel.length; k < 3; k++) { var v = document.createElement("span"); v.className = "ch-ph ch-vacio"; fotos.appendChild(v); }
      txt.innerHTML = "";
      var bt = document.createElement("b"); bt.textContent = sel.length ? "En tu charola (" + sel.length + ")" : "Tu charola"; txt.appendChild(bt);
      txt.appendChild(document.createTextNode(sel.length ? names.join(" + ") : "Toca Agregar: una bebida y un antojo."));
      var msg = sel.length ? BASE_MSG + ": " + names.join(", ") + ". ¿Me confirmas el precio y cuánto tardan?" : BASE_MSG + " un café y algo de comer. ¿Me confirmas el precio y cuánto tardan?";
      btn.setAttribute("data-wa", msg); btn.href = waUrl(msg);
    }
    document.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("[data-item]"); if (!b) return;
      var n = b.getAttribute("data-nombre"), i = find(n);
      if (i >= 0) { sel.splice(i, 1); setPressed(n, false); }
      else {
        var kind = b.getAttribute("data-item");
        var same = sel.filter(function (x) { return x.kind === kind; });
        if (same.length >= 3) { var old = same[0]; sel.splice(sel.indexOf(old), 1); setPressed(old.nombre, false); }
        sel.push({ nombre: n, precio: b.getAttribute("data-precio"), img: b.getAttribute("data-img"), kind: kind }); setPressed(n, true);
      }
      render();
    });
  }

  /* Horario en vivo (hora de Aguascalientes) */
  function initHorario() {
    var t = document.getElementById("vis-estado-t"), w = document.getElementById("vis-estado"); if (!t) return;
    try {
      var p = new Intl.DateTimeFormat("en-GB", { timeZone: "America/Mexico_City", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()).split(":");
      var m = parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
      var open = m >= 570;
      w.classList.add(open ? "is-open" : "is-closed");
      t.textContent = open ? "Abierto ahora, cerramos a las 12 de la noche" : "Cerrado ahora, abrimos a las 9:30 a.m.";
    } catch (e) {}
  }

  function init() { initWa(); initHeader(); initMenu(); initAnchors(); initWaHide(); initReveal(); initNoche(); initCharola(); initHorario(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
