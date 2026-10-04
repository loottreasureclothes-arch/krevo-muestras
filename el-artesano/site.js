/* El Artesano: header, menu, WhatsApp, azulejos, flotante. */
(function () {
  "use strict";
  var WA = "524499159386";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(m) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(m); }
  function initWa() {
    var l = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < l.length; i++) { l[i].href = waUrl(l[i].getAttribute("data-wa")); l[i].target = "_blank"; l[i].rel = "noopener"; }
  }
  function initMenu() {
    var btn = document.querySelector(".ar-menu-btn"), menu = document.getElementById("ar-menu"), body = document.body;
    if (!btn || !menu) return;
    var lbl = btn.querySelector(".ar-menu-lbl");
    function set(o) { body.classList.toggle("ar-open", o); btn.setAttribute("aria-expanded", o ? "true" : "false"); menu.setAttribute("aria-hidden", o ? "false" : "true"); lbl.textContent = o ? "Cerrar" : "Menú"; }
    btn.addEventListener("click", function () { set(!body.classList.contains("ar-open")); });
    menu.addEventListener("click", function (e) { if (e.target === menu || e.target.closest("a")) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
    window.arCloseMenu = function () { set(false); };
  }
  function watch(list, frac, cb) {
    var p = Array.prototype.slice.call(list); if (!p.length) return; var raf = null;
    function tick() { raf = null; var vh = window.innerHeight; for (var i = p.length - 1; i >= 0; i--) { var r = p[i].getBoundingClientRect(); if (r.top < vh * frac && r.bottom > 0) { var el = p[i]; p.splice(i, 1); cb(el); } } if (p.length) sch(); }
    function sch() { if (!raf) raf = requestAnimationFrame(tick); }
    sch(); window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch);
  }
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    function show(el) { el.classList.add("is-in"); }
    if (reduce) { Array.prototype.forEach.call(els, show); return; }
    watch(els, 0.92, show);
  }
  function initWaHide() {
    var z = document.querySelectorAll("#visita, #completar, .ar-foot, #azulejos .mesa");
    function up() { var vh = window.innerHeight, on = false; for (var i = 0; i < z.length; i++) { var r = z[i].getBoundingClientRect(); if (r.top < vh * .85 && r.bottom > 0) { on = true; break; } } document.body.classList.toggle("ar-wa-off", on); }
    var raf = null; function s() { if (!raf) raf = requestAnimationFrame(function () { raf = null; up(); }); }
    s(); window.addEventListener("scroll", s, { passive: true }); window.addEventListener("resize", s);
  }
  function go(el) {
    var top = el.getBoundingClientRect().top + window.scrollY - 58 - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
  }
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a) return;
      var h = a.getAttribute("href"); if (h.length < 2) return; var el = document.querySelector(h); if (!el) return;
      e.preventDefault(); if (window.arCloseMenu) window.arCloseMenu(); go(el);
    });
  }
  /* azulejos: voltear, agregar a mi mesa, mensaje de WhatsApp */
  function initAz() {
    var tiles = document.querySelectorAll(".az"); if (!tiles.length) return;
    var list = document.getElementById("mesa-lista"), link = document.getElementById("mesa-wa"), pick = [];
    function render() {
      list.innerHTML = "";
      if (!pick.length) { var v = document.createElement("li"); v.className = "vacio"; v.textContent = "Voltea un azulejo y agrégalo."; list.appendChild(v); }
      pick.forEach(function (n) { var li = document.createElement("li"); li.textContent = n; var s = document.createElement("span"); s.textContent = "Pregunta el precio"; li.appendChild(s); list.appendChild(li); });
      var m = "Hola El Artesano, quiero una mesa" + (pick.length ? " y probar: " + pick.join(", ") : "") + ". ¿A qué hora puedo llegar?";
      link.href = waUrl(m); link.setAttribute("data-wa", m);
    }
    Array.prototype.forEach.call(tiles, function (t) {
      var name = t.getAttribute("data-n");
      t.querySelector(".az-f").addEventListener("click", function () { t.classList.add("is-flip"); });
      t.querySelector(".az-x").addEventListener("click", function () { t.classList.remove("is-flip"); });
      var add = t.querySelector(".az-add");
      add.addEventListener("click", function () {
        var i = pick.indexOf(name);
        if (i < 0) { pick.push(name); t.classList.add("is-pick"); add.textContent = "Quitar"; } else { pick.splice(i, 1); t.classList.remove("is-pick"); add.textContent = "Agregar a mi mesa"; }
        render();
      });
    });
    render();
  }
  function init() { initWa(); initMenu(); initReveal(); initWaHide(); initAnchors(); initAz(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
