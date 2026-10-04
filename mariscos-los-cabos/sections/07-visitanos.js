/* Visitanos: pestañas por sucursal y "Abierto ahora" con la hora de Aguascalientes */
(function () {
  var H = [[12, 20], [12, 19], [12, 19], [12, 19], [12, 19], [12, 20], [12, 20]]; /* dom..sab, Google Maps 4 oct 2026 */
  var N = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  function h12(h) { return (h > 12 ? h - 12 : h) + (h >= 12 ? " pm" : " am"); }
  var now = new Date(), d = now.getDay(), hr = now.getHours() + now.getMinutes() / 60;
  try {
    var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(now), o = {};
    for (var i = 0; i < p.length; i++) o[p[i].type] = p[i].value;
    d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday); hr = (parseInt(o.hour, 10) % 24) + parseInt(o.minute, 10) / 60;
  } catch (e) {}
  var t = H[d], open = hr >= t[0] && hr < t[1], txt;
  if (open) txt = "Abierto ahora · cierra a las " + h12(t[1]);
  else if (hr < t[0]) txt = "Cerrado · abre hoy a las " + h12(t[0]);
  else txt = "Cerrado · abre mañana a las " + h12(H[(d + 1) % 7][0]);
  var order = [1, 2, 3, 4, 5, 6, 0], lis = "";
  for (var j = 0; j < 7; j++) { var k = order[j]; lis += '<li' + (k === d ? ' class="is-today"' : '') + '><span>' + N[k] + '</span><span>' + h12(H[k][0]).replace(" pm", "") + " a " + h12(H[k][1]) + '</span></li>'; }
  var u = document.querySelectorAll("[data-days]"); for (var a = 0; a < u.length; a++) u[a].innerHTML = lis;
  var s = document.querySelectorAll("[data-now]"); for (var b = 0; b < s.length; b++) { s[b].classList.add(open ? "is-open" : "is-closed"); s[b].querySelector("span").textContent = txt; }
  var tabs = document.querySelectorAll('.lc-tabs [role="tab"]');
  function sel(x) {
    for (var i = 0; i < tabs.length; i++) {
      var on = tabs[i] === x, pan = document.getElementById(tabs[i].getAttribute("aria-controls"));
      tabs[i].setAttribute("aria-selected", on ? "true" : "false"); tabs[i].tabIndex = on ? 0 : -1; pan.hidden = !on;
      if (on) { var f = pan.querySelector("iframe[data-src]"); if (f) { f.src = f.getAttribute("data-src"); f.removeAttribute("data-src"); } }
    }
  }
  for (var c = 0; c < tabs.length; c++) {
    tabs[c].addEventListener("click", function () { sel(this); });
    tabs[c].addEventListener("keydown", function (e) { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { var n = tabs[(Array.prototype.indexOf.call(tabs, this) + 1) % tabs.length]; sel(n); n.focus(); } });
  }
})();
