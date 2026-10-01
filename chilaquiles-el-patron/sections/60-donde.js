/* 60-donde: la nota ya llena del componente, repetida en el cierre. */
(function () {
  "use strict";
  var EPx = window.EP, t = document.getElementById("ep-res-t"), p = document.getElementById("ep-res-p"), send = document.getElementById("ep-send2");
  if (!EPx || !t || !p || !send) return;
  var base = { t: '<span class="ep-ln">Falta decir</span><span class="ep-ln ep-red">cuánto traes.</span>', p: p.innerHTML };
  EPx.subscribe(function (s) {
    var c = EPx.comboById(s.combo);
    if (!c) { t.innerHTML = base.t; p.innerHTML = base.p; send.href = EPx.waUrl(EPx.message()); return; }
    t.innerHTML = '<span class="ep-ln">Tu desayuno</span><span class="ep-ln ep-red">ya está anotado.</span>';
    var extra = (s.cafe ? " + café por confirmar" : "");
    p.innerHTML = "<b>" + c.name + "</b>. Suma $" + c.total + extra + ", sin IVA.";
    send.href = EPx.waUrl(EPx.message());
  });
})();
