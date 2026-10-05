(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var body = document.body;

  /* menu */
  var btn = document.querySelector(".hd-menu-btn"), menu = document.getElementById("hd-menu");
  function setMenu(o) {
    body.classList.toggle("hd-menu-open", o);
    btn.setAttribute("aria-expanded", o ? "true" : "false");
    menu.setAttribute("aria-hidden", o ? "false" : "true");
    btn.querySelector(".hd-menu-lbl").textContent = o ? "Cerrar" : "Menú";
  }
  if (btn && menu) {
    btn.addEventListener("click", function () { setMenu(!body.classList.contains("hd-menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  }

  /* anclas con scroll suave por JS */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var h = a.getAttribute("href"); if (h.length < 2) return;
    var el = document.querySelector(h); if (!el) return;
    e.preventDefault();
    var top = el.getBoundingClientRect().top + window.scrollY - 58;
    window.scrollTo({ top: h === "#top" ? 0 : Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  });

  /* vigia por sondeo: momento firma (reversible) y flotante */
  var mf = document.querySelectorAll("[data-mf]");
  var zonas = document.querySelectorAll("#visitanos, #pie");
  var raf = null;
  function tick() {
    raf = null;
    var vh = window.innerHeight;
    Array.prototype.forEach.call(mf, function (el) {
      var r = el.getBoundingClientRect();
      el.classList.toggle("open", r.top < vh * 0.82 && r.bottom > vh * 0.12);
    });
    var off = false;
    Array.prototype.forEach.call(zonas, function (z) {
      var r = z.getBoundingClientRect();
      if (r.top < vh * 0.7 && r.bottom > 0) off = true;
    });
    body.classList.toggle("fab-off", off);
    var els = document.querySelectorAll("[data-reveal]:not(.in)");
    Array.prototype.forEach.call(els, function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add("in");
    });
  }
  function sched() { if (!raf) raf = requestAnimationFrame(tick); }
  window.addEventListener("scroll", sched, { passive: true });
  window.addEventListener("resize", sched);
  sched();
  setTimeout(function () { Array.prototype.forEach.call(mf, function (el) { var r = el.getBoundingClientRect(); if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("open"); }); }, 1600);

  /* horario real: hora de Aguascalientes */
  function ahoraAgs() {
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      var dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      return { d: dias[o.weekday], m: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
    } catch (e) { var n = new Date(); return { d: n.getDay(), m: n.getHours() * 60 + n.getMinutes() }; }
  }
  var t = ahoraAgs(), ABRE = 540, CIERRA = 900, DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var abierto = t.d !== 2 && t.m >= ABRE && t.m < CIERRA, txt, sub;
  if (abierto) { var falta = CIERRA - t.m; txt = "Abierto ahora, cierra a las 15:00"; sub = txt; }
  else if (t.d !== 2 && t.m < ABRE) txt = "Cerrado ahora, abre hoy a las 9:00";
  else {
    var sig = (t.d + 1) % 7; if (sig === 2) sig = 3;
    txt = "Cerrado ahora, abre " + (sig === (t.d + 1) % 7 ? "mañana" : "el " + DIAS[sig]) + " a las 9:00";
  }
  var h = document.querySelector("[data-abierto]");
  if (h) { h.textContent = abierto ? "Abierto ahora, hasta las 15:00" : "Cerrado ahora"; h.classList.toggle("off", !abierto); }
  var a = document.querySelector("[data-ahora]");
  if (a) { a.querySelector("span").textContent = txt; a.classList.toggle("off", !abierto); }
  var li = document.querySelector('[data-horas] [data-dia="' + t.d + '"]'); if (li) li.classList.add("hoy");
})();
