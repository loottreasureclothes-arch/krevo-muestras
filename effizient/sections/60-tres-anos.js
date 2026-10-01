/* 60 remate: resume la ficha del goniómetro y manda el mismo mensaje armado. Nada se guarda. */
(function () {
  "use strict";
  var wa = document.getElementById("remate-wa");
  var empty = document.getElementById("res-empty");
  var list = document.getElementById("res-list");
  if (!wa || !empty || !list) return;
  function frase(v) { return v === 0 ? "Nada, es preventivo" : v <= 3 ? "Me molesta" : v <= 6 ? "Me limita" : "No me deja hacer mi día"; }
  function render(S, msg) {
    wa.setAttribute("data-wa", msg);
    wa.href = window.EffWa ? window.EffWa.url(msg) : wa.href;
    var items = [];
    if (S.zonaTxt) items.push(["Zona", S.zonaTxt]);
    if (S.hoy !== null) items.push(["Hoy", S.hoy + " / 10 · " + frase(S.hoy)]);
    if (S.entTxt) items.push(["Entreno", S.entTxt]);
    if (S.tbTxt) items.push(["También", S.tbTxt]);
    if (S.hoy === null) { empty.hidden = false; } else { empty.hidden = true; }
    list.innerHTML = "";
    items.forEach(function (it) {
      var li = document.createElement("li");
      var b = document.createElement("b"); b.textContent = it[0];
      li.appendChild(b); li.appendChild(document.createTextNode(it[1]));
      list.appendChild(li);
    });
    list.hidden = items.length === 0;
    if (S.hoy === null && items.length) { empty.hidden = false; }
  }
  window.addEventListener("eff:cita", function (e) { if (e.detail) render(e.detail.S, e.detail.msg); });
  if (window.EffCita) render(window.EffCita.state, window.EffCita.message());
})();
