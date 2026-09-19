/* 40 Promos: marca hoy (hora de Aguascalientes), sube lo que aplica y deja revisar otro día. Sin JS: todas visibles. */
(function () {
  "use strict";
  var sec = document.getElementById("promos");
  if (!sec) return;
  var list = sec.querySelector(".pr-list"), cards = Array.prototype.slice.call(sec.querySelectorAll(".pr-card"));
  var chips = sec.querySelectorAll(".pr-day"), dayEl = sec.querySelector(".pr-today-day"), txtEl = sec.querySelector(".pr-today-txt");
  var DN = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var today = window.LM && LM.today ? LM.today() : new Date().getDay();
  var order = cards.slice();
  function names(arr) {
    var n = arr.map(function (c) { return c.getAttribute("data-say"); });
    return n.length > 1 ? n.slice(0, -1).join(", ") + " y " + n[n.length - 1] : n[0];
  }
  function show(d) {
    var hits = [];
    cards.forEach(function (c) {
      var hit = c.getAttribute("data-days").split(",").indexOf(String(d)) > -1;
      c.classList.toggle("is-hoy", hit);
      c.querySelector(".pr-flag").textContent = d === today ? "Aplica hoy" : "Aplica el " + DN[d];
      if (hit) hits.push(c);
    });
    list.classList.toggle("is-filter", hits.length > 0);
    /* lo que aplica, primero */
    hits.concat(order.filter(function (c) { return hits.indexOf(c) < 0; })).forEach(function (c) { list.appendChild(c); });
    Array.prototype.forEach.call(chips, function (b) { b.setAttribute("aria-pressed", String(+b.getAttribute("data-d") === d)); });
    dayEl.textContent = d === today ? "Hoy, " + DN[d] : DN[d].charAt(0).toUpperCase() + DN[d].slice(1);
    txtEl.textContent = hits.length ? names(hits).charAt(0).toUpperCase() + names(hits).slice(1) + "." : "Sin promo publicada. Pregunta la del día por WhatsApp.";
    hits.forEach(function (c) { var b = c.querySelector(".pr-big"); b.classList.remove("is-stamp"); void b.offsetWidth; b.classList.add("is-stamp"); });
  }
  Array.prototype.forEach.call(chips, function (b) {
    if (+b.getAttribute("data-d") === today) b.classList.add("is-today");
    b.addEventListener("click", function () { show(+b.getAttribute("data-d")); });
  });
  show(today);
})();
