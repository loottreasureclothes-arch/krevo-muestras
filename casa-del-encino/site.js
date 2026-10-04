/* Casa del Encino: menú, WhatsApp, reveal, puerta del hero, azulejo de la mesa. */
(function () {
  "use strict";
  var WA = "524498068918";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  function initMenu() {
    var hd = $("#hd"), btn = $("#hd-btn"); if (!hd || !btn) return;
    var t = $(".hd-btn-t", btn);
    function set(o) { hd.classList.toggle("open", o); btn.setAttribute("aria-expanded", o ? "true" : "false"); if (t) t.textContent = o ? "Cerrar" : "Menú"; }
    btn.addEventListener("click", function () { set(!hd.classList.contains("open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
    document.addEventListener("click", function (e) { if (hd.classList.contains("open") && !hd.contains(e.target)) set(false); });
    $$("a", $("#hd-nav")).forEach(function (a) { a.addEventListener("click", function () { set(false); }); });
  }

  function go(el) {
    var top = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var h = a.getAttribute("href"); if (h.length < 2) return;
      var el = $(h); if (!el) return;
      e.preventDefault(); go(el);
      if (history.replaceState) history.replaceState(null, "", h);
    });
  }

  function initReveal() {
    var els = $$("[data-r]"), door = $("#hero-ph");
    function show(el) { el.classList.add("is-in"); }
    if (door) { if (reduce) show(door); else requestAnimationFrame(function () { setTimeout(function () { show(door); }, 120); }); }
    if (reduce || !("IntersectionObserver" in window)) { els.forEach(show); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { show(en.target); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
    setTimeout(function () { els.forEach(show); }, 1600);
  }

  function initWaHide() {
    var zones = $$("#tray, #visita .vi-cta, .cs-cta, .carta-cta, #completar, .foot, .hero-cta");
    function upd() {
      var vh = window.innerHeight, on = false;
      zones.forEach(function (z) { var r = z.getBoundingClientRect(); if (r.top < vh * 0.85 && r.bottom > 0) on = true; });
      document.body.classList.toggle("wa-off", on);
    }
    var raf = 0; function s() { if (!raf) raf = requestAnimationFrame(function () { raf = 0; upd(); }); }
    window.addEventListener("scroll", s, { passive: true }); window.addEventListener("resize", s); s();
  }

  /* El azulejo de tu mesa */
  function initMesa() {
    var grid = $("#azulejos"); if (!grid) return;
    var chips = $("#chips"), nEl = $("#p-n"), tEl = $("#p-t"), sel = $("#hora"), wa = $("#mesa-wa");
    var personas = 2, platos = [], imgs = {};
    for (var m = 8 * 60 + 30; m <= 13 * 60 + 30; m += 30) {
      var h = Math.floor(m / 60), mm = m % 60, v = h + ":" + (mm < 10 ? "0" : "") + mm;
      var o = document.createElement("option"); o.value = v; o.textContent = v; if (v === "9:00") o.selected = true; sel.appendChild(o);
    }
    function msg() {
      var t = "Hola Casa del Encino, quiero reservar mesa para " + personas + " a las " + sel.value + ".";
      if (platos.length) t += " Me antojo: " + platos.join(", ") + ".";
      return t;
    }
    function render() {
      nEl.textContent = personas; tEl.textContent = personas === 1 ? "persona" : "personas";
      chips.innerHTML = "";
      if (!platos.length) { var li = document.createElement("li"); li.className = "chips-empty"; li.textContent = "Voltea un azulejo para empezar."; chips.appendChild(li); }
      platos.forEach(function (p) {
        var li = document.createElement("li"); li.className = "chip";
        var im = document.createElement("img"); im.src = imgs[p]; im.alt = ""; im.width = 40; im.height = 40;
        var sp = document.createElement("span"); sp.textContent = p;
        var b = document.createElement("button"); b.type = "button"; b.setAttribute("aria-label", "Quitar " + p); b.innerHTML = "&times;";
        b.addEventListener("click", function () { toggle(p); });
        li.appendChild(im); li.appendChild(sp); li.appendChild(b); chips.appendChild(li);
      });
      wa.href = waUrl(msg());
    }
    function toggle(p) {
      var i = platos.indexOf(p);
      if (i > -1) platos.splice(i, 1); else platos.push(p);
      $$(".az", grid).forEach(function (b) { if (b.getAttribute("data-plato") === p) b.setAttribute("aria-pressed", i > -1 ? "false" : "true"); });
      render();
    }
    $$(".az", grid).forEach(function (b) {
      imgs[b.getAttribute("data-plato")] = b.getAttribute("data-img");
      b.addEventListener("click", function () { toggle(b.getAttribute("data-plato")); });
    });
    $("#p-menos").addEventListener("click", function () { personas = Math.max(1, personas - 1); render(); });
    $("#p-mas").addEventListener("click", function () { personas = Math.min(20, personas + 1); render(); });
    sel.addEventListener("change", render);
    render();
  }

  function initWa() {
    $$("[data-wa]").forEach(function (a) { a.target = "_blank"; a.rel = "noopener"; });
  }
  function init() { initWa(); initMenu(); initAnchors(); initReveal(); initWaHide(); initMesa(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
