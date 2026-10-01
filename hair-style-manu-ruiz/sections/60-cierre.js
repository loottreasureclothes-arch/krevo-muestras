/* Cierre: el titular y el boton siguen al tono elegido. */
(function () {
  "use strict";
  var MR = window.MR; if (!MR) return;
  var l1 = document.getElementById("mr-cl1"), l2 = document.getElementById("mr-cl2"), nm = document.getElementById("mr-cierre-n"),
      row = document.getElementById("mr-cierre-tono"), mini = document.getElementById("mr-mini3"), lnk = document.getElementById("mr-cierre-carta"), wa = document.getElementById("mr-wa-cierre");
  if (!l1 || !wa) return;
  var ficha = function () { return MR.ficha ? MR.ficha() : null; };
  function refresh() {
    var t = MR.tone();
    if (t) {
      l1.textContent = "Tu tono"; l2.textContent = "ya está elegido.";
      nm.textContent = t.name; row.hidden = false; lnk.hidden = true;
      mini.style.setProperty("--r", t.r); mini.style.setProperty("--m", t.m); mini.style.setProperty("--t", t.t); mini.style.setProperty("--l", t.l);
    } else {
      l1.textContent = "Falta elegir"; l2.textContent = "tu tono.";
      row.hidden = true; lnk.hidden = false;
    }
    var m = MR.msg(ficha()); wa.setAttribute("data-wa", m); wa.href = MR.waUrl(m);
  }
  ["pointerdown", "click", "touchstart", "focus"].forEach(function (ev) { wa.addEventListener(ev, function () { wa.href = MR.waUrl(MR.msg(ficha())); }, { passive: true }); });
  MR.onTono(refresh); refresh();
})();
