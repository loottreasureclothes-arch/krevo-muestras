(function () {
  "use strict";
  var tabla = document.getElementById("fp-tabla");
  if (!tabla) return;
  var S = FP.S, rows = Array.prototype.slice.call(tabla.querySelectorAll("tbody tr"));
  var n = document.getElementById("fp-dis-n"), m = document.getElementById("fp-dis-m"), p = document.getElementById("fp-dis-p"), wa = document.getElementById("fp-dis-wa");
  function render() {
    rows.forEach(function (r, i) { r.classList.toggle("is-on", i === S.paq); r.setAttribute("aria-selected", i === S.paq ? "true" : "false"); });
    n.textContent = S.paq < 0 ? "Elige" : "Hasta " + FP.PAQ[S.paq].max;
    n.classList.toggle("is-vacio", S.paq < 0);
    m.disabled = S.paq < 0; m.style.opacity = S.paq < 0 ? .35 : 1;
    p.disabled = S.paq >= FP.PAQ.length - 1; p.style.opacity = S.paq >= FP.PAQ.length - 1 ? .35 : 1;
    wa.href = FP.waUrl(FP.msgDiscada());
  }
  m.addEventListener("click", function () { FP.set({ paq: S.paq <= 0 ? -1 : S.paq - 1 }); });
  p.addEventListener("click", function () { FP.set({ paq: Math.min(FP.PAQ.length - 1, S.paq + 1) }); });
  rows.forEach(function (r, i) {
    r.tabIndex = 0;
    r.addEventListener("click", function () { FP.set({ paq: S.paq === i ? -1 : i }); });
    r.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); FP.set({ paq: S.paq === i ? -1 : i }); } });
  });
  FP.on(render); render();
})();
