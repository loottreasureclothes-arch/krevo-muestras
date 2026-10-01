/* 50-colosio: estado en vivo (Abierto ahora / Abre a las ...) con la hora de America/Mexico_City y el dia de hoy resaltado */
(function () {
  "use strict";
  var FZ = window.FZ;
  if (!FZ) return;
  /* Horario por dia (fuente: Wellhub; ver PENDIENTES): [abre, cierra] en minutos */
  var H = { 0: [8 * 60, 15 * 60], 1: [300, 1320], 2: [300, 1320], 3: [300, 1320], 4: [300, 1320], 5: [300, 1320], 6: [360, 1080] };
  var els = Array.prototype.slice.call(document.querySelectorAll("[data-open-status]"));
  var rows = Array.prototype.slice.call(document.querySelectorAll(".fz-days > div[data-dows]"));
  function state() {
    var t = FZ.mx(), h = H[t.dow];
    if (t.min >= h[0] && t.min < h[1]) return { open: true, long: "Abierto ahora · cierra a las " + FZ.fmt12(Math.floor(h[1] / 60), h[1] % 60), short: "Abierto ahora" };
    if (t.min < h[0]) return { open: false, long: "Cerrado · abre hoy a las " + FZ.fmt12(Math.floor(h[0] / 60), h[0] % 60), short: "Abre a las " + FZ.fmt12(Math.floor(h[0] / 60), h[0] % 60) };
    var n = H[(t.dow + 1) % 7];
    var w = FZ.fmt12(Math.floor(n[0] / 60), n[0] % 60);
    return { open: false, long: "Cerrado · abre mañana a las " + w, short: "Abre mañana a las " + w };
  }
  function render() {
    var s = state(), t = FZ.mx();
    els.forEach(function (el) {
      var mode = el.getAttribute("data-open-status");
      var txt = mode === "long" ? s.long : s.short;
      if (el.getAttribute("data-k") === txt) { return; }
      el.setAttribute("data-k", txt);
      el.textContent = "";
      var d = document.createElement("i"); d.className = "fz-dot"; d.setAttribute("aria-hidden", "true");
      var sp = document.createElement("span");
      if (mode === "dot") { sp.className = "fz-sr"; sp.textContent = txt; }
      else {
        /* la hora nunca queda sola en otro renglon: "cierra a las 10:00 pm" va junto */
        var cut = txt.indexOf(" · ");
        if (cut > 0) {
          /* dos renglones limpios: estado arriba, la hora completa abajo (sin punto colgado) */
          sp.appendChild(document.createTextNode(txt.slice(0, cut)));
          var sep = document.createElement("span"); sep.className = "fz-live-sep"; sep.textContent = " · "; sp.appendChild(sep);
          var nw = document.createElement("span"); nw.className = "fz-nw fz-live-2"; nw.textContent = txt.slice(cut + 3); sp.appendChild(nw);
        }
        else { var nw2 = document.createElement("span"); nw2.className = "fz-nw"; nw2.textContent = txt; sp.appendChild(nw2); }
      }
      el.appendChild(d); el.appendChild(sp);
      el.classList.toggle("is-open", s.open);
    });
    els.forEach(function (el) { el.classList.toggle("is-open", s.open); });
    rows.forEach(function (r) {
      var on = r.getAttribute("data-dows").split(",").indexOf(String(t.dow)) >= 0;
      r.classList.toggle("is-today", on);
    });
  }
  FZ.onTick(render);
  render();
})();
