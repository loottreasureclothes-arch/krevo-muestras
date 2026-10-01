(function () {
  "use strict";
  var res = document.getElementById("fp-resumen"), wa = document.getElementById("fp-cierre-wa"), rem = document.querySelector(".fp-remate");
  if (!res || !wa) return;
  function render() {
    var t = FP.resumen();
    res.hidden = !t; res.textContent = t;
    if (rem) rem.classList.toggle("has-datos", !!t);
    wa.href = FP.waUrl(FP.msgBuffet());
  }
  FP.on(render); render();
})();
