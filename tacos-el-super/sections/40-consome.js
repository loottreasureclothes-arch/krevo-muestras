/* Componente firma: La olla del consomé. Solo lo que cuentan los clientes: es gratis y se acaba temprano; a medio día es muy probable que ya no haya. Termina en Llamar. */
(function () {
  var root = document.getElementById("olla");
  if (!root) return;
  var r = document.getElementById("olla-r"), liq = document.getElementById("olla-liq"), cuch = document.getElementById("olla-cuch");
  var hTxt = document.getElementById("olla-h"), msg = document.getElementById("olla-msg"), tag = document.getElementById("olla-tag");
  var call = document.getElementById("olla-call");
  // nivel dibujado: ilustración, no inventario
  var F = [
    { lv: 1, h: "Temprano", t: "Hay consomé", m: "El consomé va por la casa, pero se acaba temprano. Ven temprano.", c: "Llamar y preguntar" },
    { lv: .22, h: "Medio día", t: "Ya baja", m: "Nuestros clientes cuentan que a medio día es muy probable que ya no haya.", c: "Llamar antes de venir" },
    { lv: .03, h: "Al cierre", t: "Pregunta antes", m: "Para el consomé, mejor llámanos. Los tacos siguen hasta las 2:30 de la tarde.", c: "Llamar y preguntar" }
  ];
  function paint() {
    var f = F[+r.value] || F[0], lv = f.lv;
    liq.style.transform = "translateY(" + ((1 - lv) * 128).toFixed(1) + "px)";
    cuch.style.transform = "rotate(" + (-6 + (1 - lv) * 20).toFixed(1) + "deg) translateY(" + ((1 - lv) * 36).toFixed(1) + "px)";
    hTxt.textContent = f.h;
    msg.textContent = f.m;
    tag.textContent = f.t;
    call.lastChild.nodeValue = f.c;
    root.classList.toggle("vacia", lv < .1);
    r.setAttribute("aria-valuetext", f.h + ", " + f.t);
  }
  r.addEventListener("input", paint);
  paint();
})();
