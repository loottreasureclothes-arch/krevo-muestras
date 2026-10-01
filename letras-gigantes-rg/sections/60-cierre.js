(function () {
  "use strict";
  function init() {
    var LG = window.LG; if (!LG) return;
    var tilesEl = document.getElementById("lg-remate-tiles");
    var h = document.getElementById("lg-remate-h");
    var sum = document.getElementById("lg-remate-sum");
    if (!tilesEl || !h || !sum) return;
    function line(t, cls) { var s = document.createElement("span"); if (cls) s.className = cls; s.textContent = t; return s; }
    function paint() {
      var nombre = LG.state.nombre;
      var has = nombre.replace(/ /g, "").length > 0;
      tilesEl.textContent = "";
      sum.textContent = "";
      if (!has) {
        h.innerHTML = '<span class="lg-ln"><span>FALTA</span></span><span class="lg-ln lg-ln--2"><span>ESCRIBIR EL</span></span><span class="lg-ln lg-ln--2"><span>NOMBRE.</span></span>';
        var a = document.createElement("a"); a.className = "lg-link"; a.href = "#nombre"; a.innerHTML = 'Escribe el nombre<svg aria-hidden="true"><use href="#i-arrow"/></svg>';
        sum.appendChild(a);
        return;
      }
      h.innerHTML = '<span class="lg-ln"><span>TU NOMBRE</span></span><span class="lg-ln lg-ln--2"><span>YA ESTÁ ARMADO.</span></span>';
      LG.parse(nombre).forEach(function (t) {
        if (t.sp) { var s = document.createElement("span"); s.className = "lg-sp"; tilesEl.appendChild(s); return; }
        if (!t.key) { var d = document.createElement("span"); d.style.cssText = "width:34px;height:45px;border:1.5px dashed #A99BFF;border-radius:2px;display:inline-block"; tilesEl.appendChild(d); return; }
        var im = document.createElement("img"); im.src = LG.tileSrc(t.key); im.alt = ""; im.width = Math.round(52 * (LG.AR[t.key] || .5)); im.height = 52; tilesEl.appendChild(im);
      });
      var s = LG.state;
      sum.appendChild(line(nombre, "lg-sum-n"));
      sum.lastChild.style.cssText = "font-weight:600";
      if (s.evento) sum.appendChild(line("Evento: " + s.evento));
      var f = LG.fmtFecha(s.fecha); if (f) sum.appendChild(line("Fecha: " + f));
      if (s.modo) sum.appendChild(line(s.modo === "Aún no sé" ? "Renta o compra: aún no sé" : "En " + s.modo.toLowerCase()));
      if (s.lista.length) sum.appendChild(line("Y: " + s.lista.map(function (x) { return x.disp || x.msg; }).join(", ")));
    }
    LG.on("nombre", paint); LG.on("campo", paint); LG.on("lista", paint);
    paint();
  }
  if (window.LG) init(); else document.addEventListener("DOMContentLoaded", init);
})();
