/* Culichis: menú, reveal, marea, WhatsApp, horario y La tabla del grupo */
(function () {
  "use strict";
  var WA = "5214491967475";
  function waUrl(m) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(m); }
  var d = document, de = d.documentElement;

  function initWa() {
    var l = d.querySelectorAll("[data-wa]");
    for (var i = 0; i < l.length; i++) { l[i].href = waUrl(l[i].getAttribute("data-wa")); l[i].target = "_blank"; l[i].rel = "noopener"; }
  }

  function initMenu() {
    var b = d.querySelector(".hd-burger"), m = d.getElementById("menu");
    if (!b || !m) return;
    function set(o) { d.body.classList.toggle("menu-open", o); b.setAttribute("aria-expanded", o ? "true" : "false"); b.setAttribute("aria-label", o ? "Cerrar menú" : "Abrir menú"); }
    b.addEventListener("click", function () { set(!d.body.classList.contains("menu-open")); });
    m.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  function initReveal() {
    var els = d.querySelectorAll("[data-r]");
    if (!("IntersectionObserver" in window)) { for (var i = 0; i < els.length; i++) els[i].classList.add("in"); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    for (var j = 0; j < els.length; j++) io.observe(els[j]);
  }

  /* Momento firma: la marea sube con la foto y baja al salir; reversible */
  function initMarea() {
    var m = d.querySelector(".marea");
    if (!m || !("IntersectionObserver" in window)) return;
    var seen = false;
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && e.intersectionRatio > 0.25) { seen = true; m.classList.add("in"); m.classList.remove("out"); }
        else if (!e.isIntersecting && seen) { m.classList.remove("in"); m.classList.add("out"); }
      });
    }, { threshold: [0, 0.25, 0.5] }).observe(m);
  }

  function initSmooth() {
    d.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      var h = a.getAttribute("href"); if (h.length < 2) return;
      var el = d.querySelector(h); if (!el) return;
      e.preventDefault();
      var hd = d.querySelector(".hd");
      var top = el.getBoundingClientRect().top + window.scrollY - (hd ? hd.offsetHeight + 8 : 0);
      var red = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: Math.max(0, top), behavior: red ? "auto" : "smooth" });
    });
  }

  function initWaHide() {
    var z = d.querySelectorAll("[data-hide-wa]");
    if (!z.length) return;
    var raf = null;
    function up() {
      raf = null;
      var vh = window.innerHeight, on = false;
      for (var i = 0; i < z.length; i++) { var r = z[i].getBoundingClientRect(); if (r.top < vh * 0.7 && r.bottom > vh * 0.2) { on = true; break; } }
      d.body.classList.toggle("wa-off", on);
    }
    function s() { if (!raf) raf = requestAnimationFrame(up); }
    s(); window.addEventListener("scroll", s, { passive: true }); window.addEventListener("resize", s);
  }

  /* Abierto ahora, hora de Aguascalientes */
  function initHorario() {
    var H = { 0: [12, 20], 1: [12, 19], 2: null, 3: [12, 20], 4: [12, 20], 5: [12, 20], 6: [12, 19] };
    var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    var now = new Date(), day = now.getDay(), hr = now.getHours() + now.getMinutes() / 60;
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(now), o = {};
      p.forEach(function (x) { o[x.type] = x.value; });
      day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday);
      hr = (parseInt(o.hour, 10) % 24) + parseInt(o.minute, 10) / 60;
    } catch (e) {}
    var rows = d.querySelectorAll("#hrs li");
    for (var i = 0; i < rows.length; i++) rows[i].classList.toggle("hoy", parseInt(rows[i].getAttribute("data-d"), 10) === day);
    var box = d.getElementById("ahora"); if (!box) return;
    var t = H[day], span = box.querySelector("span");
    if (t && hr >= t[0] && hr < t[1]) { box.className = "ahora on"; span.textContent = "Abierto ahora, hasta las " + (t[1] - 12) + " pm"; }
    else {
      box.className = "ahora off";
      var nd = day, add = 0;
      if (t && hr < t[0]) { span.textContent = "Cerrado, abrimos hoy a las 12 pm"; return; }
      do { nd = (nd + 1) % 7; add++; } while (!H[nd]);
      span.textContent = "Cerrado, abrimos " + (add === 1 ? "mañana" : "el " + DIAS[nd]) + " a las 12 pm";
    }
  }

  /* Componente firma: La tabla del grupo */
  function initTabla() {
    var board = d.getElementById("board"); if (!board) return;
    var DISH = [
      { n: "La Mazatleca", s: "Mazatleca", p: 235 },
      { n: "La Negra", s: "La Negra", p: 235 },
      { n: "Torre de Guamuchilito", s: "Torre Guamu\u00ADchilito", p: 235 },
      { n: "Medallones de atún a la plancha", s: "Atún plancha", p: 235 },
      { n: "Medallones de camarón y pulpo", s: "Camarón y pulpo", p: 220 },
      { n: "Regañado", s: "Regañado", p: 210 }
    ];
    var seats = [0, 1, 2, 4];
    var out = d.getElementById("n-out"), cuenta = d.getElementById("cuenta"), total = d.getElementById("total"), wa = d.getElementById("tabla-wa");
    function money(n) { return "$" + n.toLocaleString("es-MX"); }
    function draw(changed) {
      board.innerHTML = "";
      seats.forEach(function (di, i) {
        var b = d.createElement("button"); b.type = "button"; b.className = "plate"; b.setAttribute("data-i", i);
        b.setAttribute("aria-label", "Persona " + (i + 1) + ": " + DISH[di].n + ". Toca para cambiar");
        b.innerHTML = "<small>" + (i + 1) + "</small>" + DISH[di].s;
        if (changed !== i && changed !== -1) b.style.animation = "none";
        board.appendChild(b);
      });
      out.textContent = seats.length;
      var cnt = {}, sum = 0;
      seats.forEach(function (di) { cnt[di] = (cnt[di] || 0) + 1; sum += DISH[di].p; });
      cuenta.innerHTML = "";
      Object.keys(cnt).forEach(function (k) {
        var li = d.createElement("li"); li.innerHTML = "<span>" + cnt[k] + " × " + DISH[k].n + "</span><span>" + money(cnt[k] * DISH[k].p) + "</span>"; cuenta.appendChild(li);
      });
      total.textContent = money(sum);
      var lines = Object.keys(cnt).map(function (k) { return cnt[k] + " " + DISH[k].n + " (" + money(DISH[k].p) + " c/u)"; });
      var msg = "Hola Culichis, vamos " + seats.length + (seats.length === 1 ? " persona" : " personas") + ". Queremos: " + lines.join(", ") + ". Total aprox. " + money(sum) + " sin bebidas. ¿Hay lugar hoy?";
      wa.setAttribute("data-wa", msg); wa.href = waUrl(msg);
    }
    board.addEventListener("click", function (e) {
      var b = e.target.closest(".plate"); if (!b) return;
      var i = parseInt(b.getAttribute("data-i"), 10);
      seats[i] = (seats[i] + 1) % DISH.length; draw(i);
    });
    d.getElementById("mas").addEventListener("click", function () { if (seats.length < 8) { seats.push(seats[seats.length - 1] === undefined ? 0 : (seats[seats.length - 1] + 1) % DISH.length); draw(seats.length - 1); } });
    d.getElementById("menos").addEventListener("click", function () { if (seats.length > 1) { seats.pop(); draw(-1); } });
    draw(-1);
  }

  function init() { initWa(); initMenu(); initReveal(); initMarea(); initSmooth(); initWaHide(); initHorario(); initTabla(); }
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", init); else init();
})();
