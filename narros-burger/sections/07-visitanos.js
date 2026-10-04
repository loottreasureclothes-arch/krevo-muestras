(function () {
  "use strict";
  var tabs = document.querySelectorAll(".vi-tab");
  function show(t) {
    Array.prototype.forEach.call(tabs, function (b) {
      var on = b === t, p = document.getElementById(b.getAttribute("aria-controls"));
      b.setAttribute("aria-selected", on ? "true" : "false"); b.tabIndex = on ? 0 : -1; p.hidden = !on;
      if (on) { var f = p.querySelector("iframe[data-src]"); if (f) { f.src = f.getAttribute("data-src"); f.removeAttribute("data-src"); } }
    });
  }
  Array.prototype.forEach.call(tabs, function (b, i) {
    b.addEventListener("click", function () { show(b); });
    b.addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (!d) return;
      var n = tabs[(i + d + tabs.length) % tabs.length]; show(n); n.focus();
    });
  });
  try {
    var parts = new Intl.DateTimeFormat("en-US", { weekday: "short", hour: "numeric", minute: "numeric", hour12: false, timeZone: "America/Mexico_City" }).formatToParts(new Date());
    var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
    var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday), h = parseInt(o.hour, 10) % 24;
    var li = document.querySelector('[data-hrs] li[data-d="' + day + '"]'); if (li) li.classList.add("is-today");
    var now = document.querySelector("[data-now]");
    if (now) {
      if (h >= 10 && h < 23) { now.textContent = "Abierto ahora · cierra a las 11 p.m."; now.classList.add("is-open"); }
      else { now.textContent = "Cerrado ahora · abre a las 10 a.m."; now.classList.add("is-closed"); }
    }
  } catch (e) {}
})();
