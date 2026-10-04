/* Visítanos: "Abierto ahora" con la hora de Aguascalientes (America/Mexico_City) */
(function () {
  "use strict";
  var el = document.getElementById("vis-now"); if (!el) return;
  var H = { 0: [8, 21], 1: [8, 23], 2: [8, 23], 3: [8, 23], 4: [8, 23], 5: [8, 23], 6: [8, 23] };
  var N = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  function f12(h) { return (h > 12 ? h - 12 : h) + (h >= 12 ? " p.m." : " a.m."); }
  function now() {
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      var d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday);
      return { d: d, m: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
    } catch (e) { var t = new Date(); return { d: t.getDay(), m: t.getHours() * 60 + t.getMinutes() }; }
  }
  function upd() {
    var t = now(), h = H[t.d], s = el.querySelector("span");
    [].forEach.call(document.querySelectorAll(".vis-hrs tr"), function (r) { r.classList.toggle("is-today", +r.getAttribute("data-d") === t.d); });
    el.classList.remove("is-open", "is-closed");
    if (t.m >= h[0] * 60 && t.m < h[1] * 60) { el.classList.add("is-open"); s.textContent = "Abierto ahora · cierra a las " + f12(h[1]); }
    else {
      el.classList.add("is-closed");
      if (t.m < h[0] * 60) s.textContent = "Cerrado · abre hoy a las " + f12(h[0]);
      else s.textContent = "Cerrado · abre el " + N[(t.d + 1) % 7] + " a las " + f12(H[(t.d + 1) % 7][0]);
    }
  }
  upd(); setInterval(upd, 60000);
})();
