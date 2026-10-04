/* Visítanos: pestaña por sucursal, mapa, horario de hoy y "Abierto ahora" con la hora de Aguascalientes */
(function () {
  var tabs = document.querySelectorAll(".vis-tabs [role=tab]");
  if (!tabs.length) return;
  var $ = function (id) { return document.getElementById(id); };
  var HOR = { 0: [12, 14.5], 1: [9, 20], 2: [9, 20], 3: [9, 20], 4: [9, 20], 5: [9, 20], 6: [9, 19.5] };
  var S = [
    { n: "Zaragoza", dir: "Prol. Gral. Ignacio Zaragoza 119, Jardines de la Concepción II, 20120 Aguascalientes", num: "524499121601", tel: "449 912 1601",
      map: "https://www.google.com/maps?q=Camen+Reposter%C3%ADa+Matriz,+Prol.+Gral.+Ignacio+Zaragoza+119,+Jardines+de+la+Concepci%C3%B3n+II,+Aguascalientes&output=embed",
      ir: "https://www.google.com/maps/place/Camen+Reposter%C3%ADa+Matriz/@21.921806,-102.3043006,17z/data=!4m6!3m5!1s0x8429ef013a7d5483:0x8ee363fbf883e4b3!8m2!3d21.921806!4d-102.3043006" },
    { n: "Fundición", dir: "Av. Fundición 2019 C, La Fundición, 20016 Aguascalientes", num: "524499149636", tel: "449 914 9636",
      map: "https://www.google.com/maps?q=Camen+Reposter%C3%ADa+Sucursal+Fundici%C3%B3n,+Av.+Fundici%C3%B3n+2019+C,+La+Fundici%C3%B3n,+Aguascalientes&output=embed",
      ir: "https://www.google.com/maps/place/Camen+Reposter%C3%ADa+Sucursal+Fundici%C3%B3n/@21.9002768,-102.3143079,17z/data=!4m6!3m5!1s0x8429eeee5ae189cf:0x7292adaba0df519d!8m2!3d21.9002768!4d-102.3143079" },
    { n: "Américas", dir: "Pregunta por la dirección al llamar.", num: "524495362673", tel: "449 536 2673", map: "", ir: "" }
  ];
  function ahora() {
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date()), d = {};
      p.forEach(function (x) { d[x.type] = x.value; });
      return { w: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(d.weekday), h: (parseInt(d.hour, 10) % 24) + parseInt(d.minute, 10) / 60 };
    } catch (e) { var n = new Date(); return { w: n.getDay(), h: n.getHours() + n.getMinutes() / 60 }; }
  }
  function hh(x) { var h = Math.floor(x), m = Math.round((x - h) * 60); return h + ":" + (m < 10 ? "0" : "") + m; }
  function estado() {
    var a = ahora(), r = HOR[a.w], el = $("vis-estado"), t = $("vis-estado-t"), txt, open = false;
    if (a.h >= r[0] && a.h < r[1]) { open = true; txt = "Abierto ahora · cierra a las " + hh(r[1]); }
    else if (a.h < r[0]) txt = "Cerrado · hoy abre a las " + hh(r[0]);
    else { var nx = HOR[(a.w + 1) % 7]; txt = "Cerrado · mañana abre a las " + hh(nx[0]); }
    t.textContent = txt; el.classList.toggle("open", open);
    var rows = $("vis-horas").children;
    for (var i = 0; i < rows.length; i++) rows[i].classList.toggle("hoy", +rows[i].getAttribute("data-d") === a.w);
  }
  function sel(i) {
    var s = S[i];
    tabs.forEach(function (b, k) { b.setAttribute("aria-selected", k === i ? "true" : "false"); b.tabIndex = k === i ? 0 : -1; });
    $("vis-panel").setAttribute("aria-labelledby", "vt-" + i);
    $("vis-nom").textContent = s.n; $("vis-dir").textContent = s.dir;
    var msg = "Hola Camen Repostería " + s.n + ", quiero pedir un pastel.";
    var wa = $("vis-wa"); wa.setAttribute("data-wa", msg); wa.setAttribute("data-wa-num", s.num); wa.href = "https://wa.me/" + s.num + "?text=" + encodeURIComponent(msg);
    $("vis-tel").href = "tel:+" + s.num; $("vis-tel-t").textContent = s.tel;
    var ir = $("vis-ir"), fr = $("vis-iframe"), sin = $("vis-sin");
    if (s.map) { if (fr.getAttribute("src") !== s.map) fr.setAttribute("src", s.map); fr.title = "Mapa de Camen Repostería " + s.n; fr.hidden = false; sin.hidden = true; ir.href = s.ir; ir.hidden = false; $("vis-horas").hidden = false; $("vis-estado").hidden = false; }
    else { fr.hidden = true; sin.hidden = false; ir.hidden = true; $("vis-horas").hidden = true; $("vis-estado").hidden = true; }
  }
  tabs.forEach(function (b, k) {
    b.addEventListener("click", function () { sel(k); });
    b.addEventListener("keydown", function (e) { var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (!d) return; var n = (k + d + tabs.length) % tabs.length; sel(n); tabs[n].focus(); });
  });
  estado(); setInterval(estado, 60000);
})();
