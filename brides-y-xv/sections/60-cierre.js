/* 60 · El remate: repite el probador con las perchas elegidas y la fecha; mismo mensaje que la sección 2 */
(function () {
  "use strict";
  function ready(fn) { if (window.Bx) fn(); else window.addEventListener("DOMContentLoaded", fn); }
  ready(function () {
    var Bx = window.Bx;
    var ready_ = document.getElementById("bx-remate-h-ready"), wait = document.getElementById("bx-remate-h-wait");
    var discs = document.getElementById("bx-remate-discs"), fecha = document.getElementById("bx-remate-fecha");
    var link = document.getElementById("bx-remate-pch");
    if (!discs) return;
    function thumb(id) { var li = document.querySelector('.bx-pch[data-id="' + id + '"] .bx-pch-ph img'); return li ? (li.currentSrc || li.src) : ""; }
    var lastKey = "";
    function paint() {
      var s = Bx.state, key = s.sel.join(",") + "|" + s.fecha + "|" + s.para;
      if (key === lastKey) return; lastKey = key;
      var any = s.sel.length > 0;
      ready_.hidden = !any; wait.hidden = any;
      discs.hidden = !any; if (link) link.hidden = any;
      discs.innerHTML = "";
      s.sel.forEach(function (id) {
        var li = document.createElement("li");
        li.innerHTML = '<span class="bx-rd"><img alt="" src="' + thumb(id) + '"></span><span class="bx-rd-c">Percha ' + id + "</span>";
        discs.appendChild(li);
      });
      var n = s.fecha ? Bx.diasFaltan(s.fecha) : null;
      if (s.fecha && n != null && n > 0) {
        fecha.hidden = false;
        fecha.textContent = Bx.fmtFecha(s.fecha) + " · " + (n === 1 ? "falta 1 día" : "faltan " + n + " días");
      } else { fecha.hidden = true; fecha.textContent = ""; }
    }
    Bx.on(paint); paint();
  });
})();
