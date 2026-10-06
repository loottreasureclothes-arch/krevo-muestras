/* Visitanos: tabs de sucursal + horario por dia + Abierto ahora (hora de Aguascalientes) */
(function () {
  "use strict";
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".vtabs button"));
  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      tabs.forEach(function (x) {
        var on = x === t; x.setAttribute("aria-selected", on ? "true" : "false");
        var p = document.getElementById("vp-" + x.getAttribute("data-t")); if (p) p.hidden = !on;
      });
    });
  });
  var H = { norte: { dom: [14 * 60, 20 * 60] }, heb: { dom: [13 * 60 + 30, 20 * 60] } };
  var now = window.MakiNow ? window.MakiNow() : { d: new Date().getDay(), m: new Date().getHours() * 60 + new Date().getMinutes() };
  function fmt(m) { var h = Math.floor(m / 60), mm = m % 60, h12 = h % 12 || 12; return h12 + (mm ? ":" + (mm < 10 ? "0" : "") + mm : "") + (h >= 12 ? " pm" : " am"); }
  Object.keys(H).forEach(function (k) {
    var ul = document.querySelector('[data-hrs="' + k + '"]'), st = document.querySelector('[data-open="' + k + '"]');
    if (!ul || !st) return;
    var hoyLi = ul.querySelector('li[data-d="' + now.d + '"]'); if (hoyLi) hoyLi.classList.add("hoy");
    var rango = now.d === 0 ? H[k].dom : [13 * 60 + 30, 22 * 60];
    var abierto = now.m >= rango[0] && now.m < rango[1];
    st.className = "vopen " + (abierto ? "on" : "off");
    st.querySelector("span").textContent = abierto ? "Abierto ahora, cierra a las " + fmt(rango[1]) : "Cerrado ahora";
  });
})();
