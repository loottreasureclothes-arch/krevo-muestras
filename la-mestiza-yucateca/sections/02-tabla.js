(function () {
  var cards = [].slice.call(document.querySelectorAll("#cartas .carta"));
  var cnt = document.getElementById("com-cnt"), lst = document.getElementById("com-lst"), wa = document.getElementById("com-wa");
  if (!cards.length) return;
  function update() {
    var on = cards.filter(function (c) { return c.getAttribute("aria-pressed") === "true"; });
    var suma = 0, sinPrecio = 0;
    on.forEach(function (c) { var p = +c.dataset.p; if (p) suma += p; else sinPrecio++; });
    document.getElementById("comanda").classList.toggle("on", on.length > 0);
    cnt.textContent = on.length + (on.length === 1 ? " marcada" : " marcadas");
    if (!on.length) {
      lst.textContent = "Toca y ponle frijol.";
      wa.href = MZ.wa("Hola La Mestiza Yucateca, quiero pedir. ¿Qué tienen hoy?");
      return;
    }
    lst.textContent = on.map(function (c) { return c.dataset.n; }).join(", ") + (suma ? " · desde $" + suma : "");
    var msg = "Hola La Mestiza Yucateca, marqué mi tabla:\n" +
      on.map(function (c) { return "- " + c.dataset.n + (c.dataset.p ? " ($" + c.dataset.p + ")" : ""); }).join("\n") +
      (suma ? "\nSuma de lo que trae precio: $" + suma + "." : "") +
      (sinPrecio ? "\n¿Me confirman el precio de los que no lo traen?" : "") +
      "\n¿Me los preparan para llevar?";
    wa.href = MZ.wa(msg);
  }
  cards.forEach(function (c) {
    c.addEventListener("click", function () {
      c.setAttribute("aria-pressed", c.getAttribute("aria-pressed") === "true" ? "false" : "true");
      update();
    });
  });
  update();
})();
