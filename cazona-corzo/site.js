/* Cazona Corzo: menu, reveal, arco que se abre, abierto ahora, telefono flotante */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var body = document.body;

  /* ---------- menu ---------- */
  var btn = document.querySelector(".hdr-menu-btn"), menu = document.getElementById("menu");
  var lbl = btn && btn.querySelector(".hdr-menu-lbl");
  function setMenu(open) {
    if (!btn || !menu) return;
    if (open === body.classList.contains("menu-open")) return;
    body.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    menu.setAttribute("aria-hidden", open ? "false" : "true");
    if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
  }
  if (btn && menu) {
    btn.addEventListener("click", function () { setMenu(!body.classList.contains("menu-open")); });
    menu.addEventListener("click", function (e) {
      var t = e.target;
      if ((t.closest && t.closest("a")) || t.classList.contains("menu-scrim") || t.classList.contains("menu-panel") || t.classList.contains("menu-nav") || t.classList.contains("menu-foot")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  }

  /* ---------- anclas con scroll suave (sin scroll-behavior en CSS) ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented) return;
    var href = a.getAttribute("href"); if (href.length < 2) return;
    var el = document.querySelector(href); if (!el) return;
    e.preventDefault(); setMenu(false);
    var top = el.getBoundingClientRect().top + window.scrollY - (href === "#vista" ? 0 : 0);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
    if (history.replaceState) history.replaceState(null, "", href);
  });

  /* ---------- reveal por sondeo ---------- */
  var pend = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  var raf = null;
  function tick() {
    raf = null;
    var vh = window.innerHeight;
    for (var i = pend.length - 1; i >= 0; i--) {
      var r = pend[i].getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) { pend[i].classList.add("is-in"); pend.splice(i, 1); }
    }
    arco(); fab();
  }
  function sched() { if (!raf) raf = requestAnimationFrame(tick); }
  window.addEventListener("scroll", sched, { passive: true });
  window.addEventListener("resize", sched);

  /* ---------- momento firma: el arco de la terraza se abre al llegar ---------- */
  var wins = document.querySelectorAll("[data-arco]");
  function arco() {
    if (reduce) return;
    var vh = window.innerHeight;
    for (var i = 0; i < wins.length; i++) {
      var r = wins[i].getBoundingClientRect();
      var p = (vh * 0.95 - r.top) / (vh * 0.55);
      p = Math.max(0, Math.min(1, p));
      wins[i].style.setProperty("--p", p.toFixed(3));
    }
  }

  /* ---------- telefono flotante: se esconde donde ya hay botones grandes de llamada ---------- */
  var zones = document.querySelectorAll("#visitanos, #pie, #mesa-app .ticket");
  function fab() {
    var vh = window.innerHeight, on = false;
    for (var i = 0; i < zones.length; i++) { var r = zones[i].getBoundingClientRect(); if (r.top < vh * 0.85 && r.bottom > vh * 0.1) { on = true; break; } }
    body.classList.toggle("fab-off", on);
  }

  /* ---------- abierto ahora (hora de Aguascalientes) ---------- */
  var HR = { 0: [8, 19], 1: null, 2: null, 3: null, 4: [8, 23], 5: [8, 23], 6: [8, 23] };
  var NOM = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  function ahora() {
    var d = new Date(), wd = d.getDay(), h = d.getHours() + d.getMinutes() / 60;
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(d), o = {};
      p.forEach(function (x) { o[x.type] = x.value; });
      wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday]; h = (+o.hour % 24) + (+o.minute) / 60;
    } catch (e) {}
    return { wd: wd, h: h };
  }
  function abierto() {
    var n = ahora(), t = HR[n.wd], open = !!t && n.h >= t[0] && n.h < t[1], txt;
    if (open) txt = "Abierto ahora, hasta las " + t[1] + ":00";
    else {
      var d = n.wd, add = 0;
      if (t && n.h < t[0]) txt = "Cerrado ahora, abre hoy a las " + t[0] + ":00";
      else { do { d = (d + 1) % 7; add++; } while (!HR[d] && add < 7); txt = "Cerrado ahora, abre " + (add === 1 ? "mañana" : "el " + NOM[d]) + " a las " + HR[d][0] + ":00"; }
    }
    var v = document.getElementById("vis-open");
    if (v) { v.innerHTML = "<i></i><span></span>"; v.lastChild.textContent = txt; v.classList.toggle("is-closed", !open); }
    var hd = document.getElementById("hdr-open");
    if (hd) { hd.innerHTML = "<i></i><span></span>"; hd.lastChild.textContent = open ? "Abierto ahora" : "Cerrado ahora"; hd.classList.toggle("is-closed", !open); }
    var rows = document.querySelectorAll("#vis-hr li");
    for (var i = 0; i < rows.length; i++) rows[i].classList.toggle("is-today", +rows[i].getAttribute("data-d") === n.wd);
  }
  abierto(); setInterval(abierto, 60000);
  tick();
})();
