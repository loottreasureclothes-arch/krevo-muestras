/* Visítanos: pestañas por sucursal y "Abierto ahora" con la hora de Aguascalientes. */
(function(){
  "use strict";
  var tabs = [].slice.call(document.querySelectorAll(".dn-tabs [role=tab]"));
  function sel(t){
    tabs.forEach(function(x){
      var on = x === t, p = document.getElementById(x.getAttribute("aria-controls"));
      x.setAttribute("aria-selected", on ? "true" : "false"); x.classList.toggle("on", on); x.tabIndex = on ? 0 : -1;
      p.hidden = !on;
      if (on) { var f = p.querySelector("iframe[data-src]"); if (f) { f.src = f.getAttribute("data-src"); f.removeAttribute("data-src"); } }
    });
  }
  tabs.forEach(function(t, i){
    t.addEventListener("click", function(){ sel(t); });
    t.addEventListener("keydown", function(e){
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") { var n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length]; sel(n); n.focus(); }
    });
  });
  /* hora de Aguascalientes */
  var now;
  try {
    var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
    var g = {}; p.forEach(function(x){ g[x.type] = x.value; });
    now = { d: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(g.weekday), h: (+g.hour % 24) + (+g.minute) / 60 };
  } catch (e) { var dt = new Date(); now = { d: dt.getDay(), h: dt.getHours() + dt.getMinutes() / 60 }; }
  function fmt(h){ var hh = Math.floor(h), ap = hh >= 12 ? "p.m." : "a.m."; hh = hh % 12 || 12; return hh + " " + ap; }
  [].forEach.call(document.querySelectorAll(".dn-panel"), function(panel){
    var H = JSON.parse(panel.getAttribute("data-hours")), today = H[now.d] || [], msg, open = false;
    for (var i = 0; i < today.length; i++) { if (now.h >= today[i][0] && now.h < today[i][1]) { open = true; msg = "Abierto ahora · cierra a las " + fmt(today[i][1]); } }
    if (!open) {
      var next = today.filter(function(r){ return r[0] > now.h; })[0];
      msg = next ? "Cerrado ahora · abre hoy a las " + fmt(next[0]) : "Cerrado ahora · abre mañana a las " + fmt((H[(now.d + 1) % 7] || [[16]])[0][0]);
    }
    var el = panel.querySelector(".dn-now"); el.classList.add(open ? "open" : "closed"); el.querySelector("span").textContent = msg;
    var li = panel.querySelector('.dn-hrs li[data-d="' + now.d + '"]'); if (li) li.classList.add("hoy");
  });
})();
