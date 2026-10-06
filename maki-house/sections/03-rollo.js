/* Componente firma: el platito del Rollo del Día (gira al día elegido, pide por WhatsApp) */
(function () {
  "use strict";
  var D = [
    { n: "Lunes", r: "Beef Roll" }, { n: "Martes", r: "Cheese Roll" }, { n: "Miércoles", r: "Chipo Roll" },
    { n: "Jueves", r: "Capeado Maki" }, { n: "Viernes", r: "Parmesano" }, { n: "Sábado", r: "Chily Maki" }, { n: "Domingo", r: "Hot Roll" }
  ];
  function idxHoy() { var d = window.MakiNow ? window.MakiNow().d : new Date().getDay(); return (d + 6) % 7; }
  var hoy = idxHoy();

  /* Sello del hero: el rollo de hoy */
  var hd = document.getElementById("hb-dia"), hn = document.getElementById("hb-n");
  if (hd && hn) { hd.textContent = D[hoy].n; hn.textContent = D[hoy].r; }

  var plato = document.getElementById("plato"), rot = document.getElementById("plato-rot");
  if (!plato || !rot) return;
  var rods = Array.prototype.slice.call(rot.querySelectorAll(".rod"));
  var day = document.getElementById("rd-day"), name = document.getElementById("rd-name"), hoyTxt = document.getElementById("rd-hoy"),
      wa = document.getElementById("rd-wa"), btn = document.getElementById("rd-btn");
  rods[hoy].classList.add("hoy");

  function pick(i) {
    plato.style.setProperty("--r", -(i * 360 / 7));
    rods.forEach(function (b, k) { b.setAttribute("aria-pressed", k === i ? "true" : "false"); });
    day.textContent = D[i].n; name.textContent = D[i].r;
    var esHoy = i === hoy;
    hoyTxt.textContent = esHoy ? "Es el de hoy" : "Rollo del Día";
    btn.textContent = esHoy ? "Pedir el de hoy" : "Pedir el del " + D[i].n.toLowerCase();
    var msg = esHoy
      ? "Hola Maki House, quiero el Rollo del Día de hoy (" + D[i].n.toLowerCase() + "): " + D[i].r + " a $85. ¿Lo tienen?"
      : "Hola Maki House, quiero el Rollo del Día del " + D[i].n.toLowerCase() + ": " + D[i].r + " a $85. ¿Cómo hago el pedido?";
    wa.setAttribute("data-wa", msg);
    wa.href = window.MakiWa ? window.MakiWa(msg) : wa.href;
  }
  rods.forEach(function (b, k) { b.addEventListener("click", function () { pick(k); }); });
  pick(hoy);
})();
