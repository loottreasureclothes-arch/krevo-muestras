/* Maki House: hamburguesa, WhatsApp, reveal, tabs de sucursal, horario, platito del rollo del dia. */
(function () {
  "use strict";
  var WA = "524492018094";
  function waUrl(m) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(m); }
  window.MakiWa = waUrl;
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* Todo wa.me real: el JS solo reescribe el href con el texto codificado */
  function initWa() { $$("[data-wa]").forEach(function (a) { a.href = waUrl(a.getAttribute("data-wa")); a.target = "_blank"; a.rel = "noopener"; }); }

  /* Hora de Aguascalientes (America/Mexico_City) */
  function mx() {
    var p = {};
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false })
        .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      return { d: map[p.weekday], m: (parseInt(p.hour, 10) % 24) * 60 + parseInt(p.minute, 10) };
    } catch (e) { var n = new Date(); return { d: n.getDay(), m: n.getHours() * 60 + n.getMinutes() }; }
  }
  window.MakiNow = mx;

  /* Menu */
  function initMenu() {
    var b = $("#hd-btn"), m = $("#hd-menu"); if (!b || !m) return;
    function set(o) { b.setAttribute("aria-expanded", o ? "true" : "false"); m.hidden = !o; document.body.classList.toggle("menu-open", o); }
    b.addEventListener("click", function () { set(b.getAttribute("aria-expanded") !== "true"); });
    m.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  /* Flotante de WhatsApp: se esconde donde ya hay un boton grande */
  function initWaHide() {
    var z = $$("[data-hide-wa]"), f = $("#wa-float"); if (!z.length || !f) return;
    var raf = null;
    function up() {
      raf = null; var vh = window.innerHeight, on = false;
      z.forEach(function (e) { var r = e.getBoundingClientRect(); if (r.top < vh * .75 && r.bottom > vh * .25) on = true; });
      document.body.classList.toggle("wa-off", on);
    }
    function s() { if (!raf) raf = requestAnimationFrame(up); }
    s(); window.addEventListener("scroll", s, { passive: true }); window.addEventListener("resize", s);
  }

  /* Reveal */
  function initReveal() {
    var els = $$("[data-reveal]"); if (!els.length) return;
    if (!document.documentElement.classList.contains("rv")) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
    var pend = els.slice(), raf = null;
    function up() {
      raf = null; var vh = window.innerHeight;
      for (var i = pend.length - 1; i >= 0; i--) { var r = pend[i].getBoundingClientRect(); if (r.top < vh * .92 && r.bottom > 0) { pend[i].classList.add("is-in"); pend.splice(i, 1); } }
    }
    function s() { if (!raf) raf = requestAnimationFrame(up); }
    s(); window.addEventListener("scroll", s, { passive: true }); window.addEventListener("resize", s);
  }

  function init() { initWa(); initMenu(); initWaHide(); initReveal(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
