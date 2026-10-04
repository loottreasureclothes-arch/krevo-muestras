/* Visítanos: pestañas por sucursal, horario por día y "Abierto ahora" con la hora de Aguascalientes. */
(function () {
  "use strict";
  var sec = document.getElementById("visitanos"); if (!sec) return;
  var DN = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  function hm(m) { var h = Math.floor(m / 60), mm = m % 60, h12 = h % 12 || 12; return h12 + (mm ? ":" + (mm < 10 ? "0" : "") + mm : "") + (h >= 12 ? " pm" : " am"); }
  function now() {
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date()), o = {};
      p.forEach(function (x) { o[x.type] = x.value; });
      return { d: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday), m: (+o.hour % 24) * 60 + (+o.minute) };
    } catch (e) { var n = new Date(); return { d: n.getDay(), m: n.getHours() * 60 + n.getMinutes() }; }
  }
  var t = now();
  sec.querySelectorAll(".vt-panel").forEach(function (p) {
    var H = p.getAttribute("data-h").split(",").map(function (x) { return x.split("-").map(Number); });
    var ul = p.querySelector(".vt-hor"), html = "";
    [1, 2, 3, 4, 5, 6, 0].forEach(function (d) {
      html += '<li' + (d === t.d ? ' class="is-hoy"' : '') + '><span>' + DN[d] + (d === t.d ? ' <em>hoy</em>' : '') + '</span><b>' + hm(H[d][0]) + ' a ' + hm(H[d][1]) + '</b></li>';
    });
    ul.innerHTML = html;
    var h = H[t.d], st = p.querySelector(".vt-now"), msg;
    if (t.m >= h[0] && t.m < h[1]) { st.classList.add("is-open"); msg = "Abierto ahora · Cierra a las " + hm(h[1]); }
    else if (t.m < h[0]) msg = "Cerrado · Abre hoy a las " + hm(h[0]);
    else { var nd = (t.d + 1) % 7; msg = "Cerrado · Abre " + (nd === 0 ? "el domingo" : "mañana") + " a las " + hm(H[nd][0]); }
    st.querySelector("span").textContent = msg;
  });
  var tabs = sec.querySelectorAll(".vt-tab");
  function sel(b) {
    tabs.forEach(function (x) {
      var on = x === b, p = document.getElementById(x.getAttribute("aria-controls"));
      x.classList.toggle("is-on", on); x.setAttribute("aria-selected", on); x.tabIndex = on ? 0 : -1; p.hidden = !on;
      var f = p.querySelector("iframe[data-src]"); if (on && f) { f.src = f.getAttribute("data-src"); f.removeAttribute("data-src"); }
    });
  }
  tabs.forEach(function (b, i) {
    b.addEventListener("click", function () { sel(b); });
    b.addEventListener("keydown", function (e) { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { var n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length]; sel(n); n.focus(); } });
  });
})();
