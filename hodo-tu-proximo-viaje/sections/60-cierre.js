/* 60 · Cierre: reutiliza el estado guardado del pase (localStorage hodo_pase) para el ultimo empujon. */
(function () {
  "use strict";
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function init() {
    var HP = window.HodoPase;
    var ready = document.getElementById("hd-cierre-ready");
    var empty = document.getElementById("hd-cierre-empty");
    var sum = document.getElementById("hd-cierre-sum");
    var send = document.getElementById("hd-cierre-send");
    var img = document.getElementById("hd-cierre-img");
    var code = document.getElementById("hd-cierre-code");
    if (!HP || !ready || !empty) return;

    function fmtPersonas(s) {
      var a = s.adultos != null ? s.adultos : 2, m = s.menores != null ? s.menores : 0;
      return a + (a === 1 ? " adulto" : " adultos") + (m > 0 ? " y " + m + (m === 1 ? " menor" : " menores") : "");
    }
    function fmtFechas(s) {
      if (s.sinFechas) return "Sin fecha aún" + (s.mesAprox ? " · " + HP.fmtMes(s.mesAprox) : "");
      if (s.salida || s.regreso) return (s.salida ? HP.fmtFecha(s.salida) : "?") + " – " + (s.regreso ? HP.fmtFecha(s.regreso) : "?");
      return "Por definir";
    }
    function paint() {
      var s = HP.getState();
      if (code) code.textContent = s.destinoCodigo || "¿?";
      if (s.destinoSlug) {
        ready.hidden = false; empty.hidden = true;
        var rows = [
          ["Destino", s.destinoNombre],
          ["Fechas", fmtFechas(s)],
          ["Viajan", fmtPersonas(s)]
        ];
        if (s.tipo) rows.push(["Tipo de viaje", s.tipo]);
        sum.innerHTML = rows.map(function (r) { return "<div><dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("");
        if (HP.DESTINOS[s.destinoSlug] && img) {
          var base = "img/destinos/" + s.destinoSlug;
          img.srcset = base + "-m.webp 960w, " + base + "-d.webp 1920w";
          img.src = base + "-m.webp";
        }
        if (send) send.href = HP.waUrl();
      } else {
        ready.hidden = true; empty.hidden = false;
      }
    }
    HP.on("hodo:destino", paint);
    HP.on("hodo:campo", paint);
    paint();

    /* El boton es un <a> con href real desde el HTML (funciona sin JS);
       aqui solo se le refresca el mensaje con lo que la persona eligio. */
    if (send) send.addEventListener("click", function () { send.href = HP.waUrl(); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
