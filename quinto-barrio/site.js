/* Quinto Barrio: menu, reveal, pasaporte (firma), horario, flotante de WhatsApp. */
(function () {
  "use strict";
  var WA = "524493714122";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var body = document.body;

  /* menu */
  var mb = $(".hd-menu"), nav = $("#hd-nav"), lbl = $(".hd-lbl");
  function setMenu(o) {
    body.classList.toggle("menu-open", o);
    mb.setAttribute("aria-expanded", o ? "true" : "false");
    nav.setAttribute("aria-hidden", o ? "false" : "true");
    lbl.textContent = o ? "Cerrar" : "Menú";
  }
  mb.addEventListener("click", function () { setMenu(!body.classList.contains("menu-open")); });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  $$(".hd a, main a[href^='#']").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* reveal (la red de seguridad de 1.6 s va en el head) */
  var els = $$("[data-reveal]");
  function tick() {
    var vh = window.innerHeight;
    els = els.filter(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) { el.classList.add("is-in"); return false; }
      return true;
    });
    $$(".nave").forEach(function (n) {
      var r = n.getBoundingClientRect();
      n.classList.toggle("lit", r.top < vh * 0.55 && r.bottom > vh * 0.2);
    });
  }
  var raf = null;
  function sched() { if (!raf) raf = requestAnimationFrame(function () { raf = null; tick(); }); }
  window.addEventListener("scroll", sched, { passive: true });
  window.addEventListener("resize", sched);
  sched();

  /* flotante: se esconde donde ya hay botones grandes de contacto */
  var zones = $$("[data-hide-wa],#pasaporte");
  function wa() {
    var vh = window.innerHeight, on = false;
    zones.forEach(function (z) { var r = z.getBoundingClientRect(); if (r.top < vh * 0.7 && r.bottom > vh * 0.15) on = true; });
    body.classList.toggle("hide-wa", on);
  }
  window.addEventListener("scroll", function () { requestAnimationFrame(wa); }, { passive: true });
  wa();

  /* pasaporte */
  var st = { n: 2, dia: "hoy", items: [] };
  var stamps = $("[data-stamps]"), msg = $("[data-msg]"), ppl = $("[data-ppl]"), link = $("[data-wa-pas]"), chip = $("[data-pass-n]"), pas = $("#pasaporte");
  function texto() {
    var t = "Hola Quinto Barrio, vamos " + st.n + (st.n === 1 ? " persona" : " personas") + ".";
    if (st.items.length) t += " Queremos probar: " + st.items.map(function (i) { return i.name; }).join(", ") + ".";
    t += " Es para " + st.dia + ". ¿Hay lugar?";
    return t;
  }
  function paint() {
    ppl.textContent = st.n;
    msg.textContent = texto();
    link.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(texto());
    pas.classList.toggle("has-stamps", st.items.length > 0);
    chip.textContent = st.items.length;
  }
  function stampsRender(newId) {
    stamps.innerHTML = "";
    st.items.forEach(function (it, i) {
      var d = document.createElement("div");
      d.className = "stamp";
      d.style.setProperty("--r", ((i * 37) % 17 - 8) + "deg");
      if (it.id !== newId) d.style.animation = "none";
      d.innerHTML = '<img alt="" src="img/' + it.id + '-480.webp"><span></span>';
      d.lastChild.textContent = it.name.split(" ")[0];
      stamps.appendChild(d);
    });
  }
  $$("[data-add]").forEach(function (b) {
    b.addEventListener("click", function () {
      var card = b.closest("[data-id]"), id = card.getAttribute("data-id"), name = card.getAttribute("data-name");
      var idx = st.items.findIndex(function (x) { return x.id === id; });
      if (idx > -1) { st.items.splice(idx, 1); stampsRender(); } else { st.items.push({ id: id, name: name }); stampsRender(id); }
      $$("[data-id='" + id + "'] [data-add]").forEach(function (x) { x.setAttribute("aria-pressed", idx > -1 ? "false" : "true"); x.textContent = idx > -1 ? "Agregar" : "Agregado"; });
      chip.classList.add("pop"); setTimeout(function () { chip.classList.remove("pop"); }, 280);
      paint();
    });
  });
  $$("[data-quick]").forEach(function (g) {
    g.addEventListener("click", function () { var b = $("#carta [data-id='" + g.getAttribute("data-quick") + "'] [data-add]"); if (b) b.click(); });
  });
  $$("[data-pm]").forEach(function (b) {
    b.addEventListener("click", function () { st.n = Math.max(1, Math.min(30, st.n + parseInt(b.getAttribute("data-pm"), 10))); paint(); });
  });
  $$("[data-day]").forEach(function (b) {
    b.addEventListener("click", function () {
      st.dia = b.getAttribute("data-day");
      $$("[data-day]").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      paint();
    });
  });
  paint();

  /* horario: Abierto ahora (hora de Aguascalientes). Cierra 11 pm lun-jue, 1 am vie y sab, 10 pm dom; abre 2 pm. */
  var H = { 0: [14, 22], 1: [14, 23], 2: [14, 23], 3: [14, 23], 4: [14, 23], 5: [14, 25], 6: [14, 25] };
  function ahora() {
    var d, h, m;
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      d = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday]; h = parseInt(o.hour, 10) % 24; m = parseInt(o.minute, 10);
    } catch (e) { var n = new Date(); d = n.getDay(); h = n.getHours(); m = n.getMinutes(); }
    return { d: d, t: h + m / 60 };
  }
  function horario() {
    var n = ahora(), open = false, a = H[n.d];
    if (n.t >= a[0] && n.t < a[1]) open = true;
    var prev = H[(n.d + 6) % 7];
    if (prev[1] > 24 && n.t < prev[1] - 24) open = true;
    var box = $("[data-open]");
    box.classList.toggle("is-open", open); box.classList.toggle("is-closed", !open);
    $("[data-open-t]").textContent = open ? "Abierto ahora" : "Cerrado ahora";
    $$("[data-hours] li").forEach(function (li) { li.classList.toggle("today", parseInt(li.getAttribute("data-d"), 10) === n.d); });
  }
  horario();
})();
