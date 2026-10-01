/* 20-modelos: interruptor una/dos plantas + "Me interesa" que guarda el modelo para el mensaje */
(function () {
  "use strict";
  var ficha = document.getElementById("sj-ficha");
  if (!ficha || !window.SJ) return;
  var radios = document.querySelectorAll('input[name="plantas"]');
  var buttons = document.querySelectorAll(".sj-interesa");
  var saved = document.getElementById("sj-saved");

  function setPlantas(v) { ficha.setAttribute("data-p", v); paint(); }
  Array.prototype.forEach.call(radios, function (r) {
    r.addEventListener("change", function () { if (r.checked) setPlantas(r.value); });
  });
  /* la silueta en punteado también cambia a dos plantas al tocarla */
  var sil = ficha.querySelector(".sj-sil");
  if (sil) sil.addEventListener("click", function () {
    if (ficha.getAttribute("data-p") !== "1") return;
    var r2 = document.getElementById("sj-pl-2"); r2.checked = true; setPlantas("2");
  });
  function modeloDe(btn) {
    var m = btn.getAttribute("data-modelo");
    return m === "plantas" ? (ficha.getAttribute("data-p") === "2" ? "dos" : "una") : m;
  }
  function paint() {
    var cur = SJ.state.modelo, any = false;
    Array.prototype.forEach.call(buttons, function (b) {
      var on = modeloDe(b) === cur;
      if (on) any = true;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.querySelector(".sj-interesa-t").textContent = on ? "Guardada" : "Me interesa";
      var card = b.closest(".sj-card"); if (card) card.classList.toggle("is-saved", on);
    });
    if (saved) saved.hidden = !any;
  }
  Array.prototype.forEach.call(buttons, function (b) {
    b.addEventListener("click", function () {
      var m = modeloDe(b);
      SJ.set("modelo", SJ.state.modelo === m ? null : m);
    });
  });
  SJ.on(paint);
  /* si ya había una elección guardada de dos plantas, el interruptor arranca ahí */
  if (SJ.state.modelo === "dos") { document.getElementById("sj-pl-2").checked = true; setPlantas("2"); }
  else paint();
})();
