/* Closet&Door: WhatsApp, hero, carrusel propio, menu, microinteracciones y cotizador */
(function () {
  "use strict";
  var WA = "524494463411";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      links[i].href = waUrl(links[i].getAttribute("data-wa"));
      links[i].target = "_blank";
      links[i].rel = "noopener";
    }
  }

  /* ---------- Menu de celular ---------- */
  function initMenu() {
    var btn = document.querySelector(".cd-menu-btn");
    var menu = document.getElementById("cd-menu");
    if (!btn || !menu) return;
    var body = document.body;
    Array.prototype.forEach.call(menu.querySelectorAll(".cd-menu-nav a"), function (a, i) { a.style.setProperty("--i", i); });
    var links = menu.querySelectorAll("a");
    function set(open) {
      var was = body.classList.contains("cd-menu-open");
      body.classList.toggle("cd-menu-open", open);
      if (open && !was) setTimeout(function () { links[0].focus(); }, 60);
      if (!open && was) btn.focus();
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      btn.querySelector(".cd-menu-lbl").textContent = open ? "Cerrar" : "Menú";
    }
    btn.addEventListener("click", function () { set(!body.classList.contains("cd-menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("cd-menu-open")) return;
      if (e.key === "Escape") { set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(Array.prototype.slice.call(links));
        var i = items.indexOf(document.activeElement);
        e.preventDefault();
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
    window.addEventListener("resize", function () { if (window.innerWidth >= 900) set(false); });
  }

  /* ---------- Brillo al tocar botones ---------- */
  function initRipple() {
    if (reduce) return;
    document.addEventListener("pointerdown", function (e) {
      var b = e.target.closest(".k-btn, .cd-btn:not(.cd-btn--link), .cd-hero-list a");
      if (!b) return;
      var r = b.getBoundingClientRect();
      var s = document.createElement("span");
      s.className = "cd-ripple";
      s.style.left = (e.clientX - r.left) + "px";
      s.style.top = (e.clientY - r.top) + "px";
      b.appendChild(s);
      setTimeout(function () { s.remove(); }, 460);
    });
  }

  /* ---------- WA flotante: se esconde donde ya hay botones de contacto ---------- */
  function initWaHide() {
    var zones = document.querySelectorAll("#msi, #cotizar, #visitanos, #cta-final, .cd-foot");
    if (!zones.length || !("IntersectionObserver" in window)) return;
    var on = new Set();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) on.add(e.target); else on.delete(e.target); });
      document.body.classList.toggle("cd-wa-off", on.size > 0);
    }, { rootMargin: "0px 0px -18% 0px" });
    Array.prototype.forEach.call(zones, function (z) { io.observe(z); });
    setTimeout(function () { document.body.classList.add("cd-wa-ready"); }, 2000);
  }

  function init() {
    initWa(); initMenu(); initRipple(); initWaHide();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
