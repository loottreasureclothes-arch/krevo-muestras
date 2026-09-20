/* 30-platon: el platón giratorio del pedido. Entrada: gira 18° al asomarse (IntersectionObserver).
   Cada paso completado gira 120° más y escribe la elección en el borde del disco (SVG textPath). */
(function () {
  "use strict";
  var sec = document.getElementById("platon");
  if (!sec) return;
  var disc = document.getElementById("platonDisc");
  var arcText = document.getElementById("platonArcText");
  var legend = document.getElementById("platonLegend");
  var steps = sec.querySelectorAll(".tr-platon-step");
  var summary = document.getElementById("platonSummary");
  var send = document.getElementById("platonSend");
  var tamanoInput = document.getElementById("platonTamano");
  var goBtn = sec.querySelector(".tr-platon-go");
  var chips = sec.querySelectorAll(".tr-chip");
  var fechaInput = document.getElementById("platonFecha");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var choice = { tamano: "", sabor: "", fecha: "" };

  try { if (fechaInput && window.TR) fechaInput.min = window.TR.today(); } catch (e) {}

  function showStep(name) {
    for (var i = 0; i < steps.length; i++) {
      steps[i].classList.toggle("is-active", steps[i].getAttribute("data-step") === name);
    }
  }

  function fechaBonita(iso) {
    if (!iso) return "";
    var p = iso.split("-");
    if (p.length !== 3) return iso;
    var d = parseInt(p[2], 10), m = MESES[parseInt(p[1], 10) - 1] || "";
    return d + " de " + m;
  }

  function updateArc() {
    var parts = [];
    if (choice.tamano) parts.push(choice.tamano.toUpperCase());
    if (choice.sabor) parts.push(choice.sabor.toUpperCase());
    if (choice.fecha) parts.push(fechaBonita(choice.fecha).toUpperCase());
    var label = parts.join(" · ");
    if (arcText) arcText.textContent = label;
    if (disc) disc.classList.toggle("tr-is-writing", !!label);
    if (legend) legend.textContent = label || "Elige tamaño, sabor y fecha. Aquí se va escribiendo tu pedido.";
  }

  var pasos = 0; /* cuantos pasos se han dado; el settle ya no manda despues del primero */
  function setAngle(deg, ms) {
    if (!disc) return;
    disc.style.transitionDuration = ms + "ms";
    disc.style.transform = "rotate(" + deg + "deg)";
  }
  function spin(stepIndex) {
    if (!disc) return;
    pasos = Math.max(pasos, stepIndex);
    disc.classList.remove("tr-is-set");
    setAngle(18 + 120 * stepIndex, 550);
  }

  /* El boton VERDE nunca nace pelon: desde el primer pintado lleva el mensaje base de la hoja
     y se va rellenando con lo que el cliente elige. */
  function renderSend() {
    if (!send) return;
    function campo(v) { return v ? v + "." : "__ ."; }
    var msg = "Hola Tania, quiero encargar un pastel. Tamaño: " + campo(choice.tamano) +
      " Sabor: " + campo(choice.sabor) +
      " Fecha: " + campo(choice.fecha ? fechaBonita(choice.fecha) : "") +
      " ¿Me confirmas precio?";
    send.setAttribute("data-wa", msg);
    send.href = window.TR ? window.TR.waUrl(msg) : send.href;
  }

  function checkDone() {
    renderSend();
    if (summary && choice.tamano && choice.sabor && choice.fecha) summary.hidden = false;
  }

  if (goBtn && tamanoInput) {
    goBtn.addEventListener("click", function () {
      var v = tamanoInput.value.trim();
      choice.tamano = v || "Sin especificar";
      spin(1); updateArc(); showStep("sabor"); checkDone();
    });
    tamanoInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); goBtn.click(); }
    });
  }

  Array.prototype.forEach.call(chips, function (chip) {
    chip.addEventListener("click", function () {
      Array.prototype.forEach.call(chips, function (c) { c.classList.remove("is-on"); });
      chip.classList.add("is-on");
      choice.sabor = chip.getAttribute("data-sabor");
      spin(2); updateArc(); showStep("fecha"); checkDone();
    });
  });

  if (fechaInput) {
    fechaInput.addEventListener("change", function () {
      choice.fecha = fechaInput.value;
      spin(3); updateArc(); checkDone();
    });
  }

  /* Entrada: gira 18° al asomarse a la pantalla; blindaje a 1.6 s */
  function settle() {
    if (!disc || pasos > 0) return;
    disc.classList.add("tr-is-set");
    setAngle(18, 800);
  }
  if (reduce || !("IntersectionObserver" in window)) {
    settle();
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { io.unobserve(e.target); settle(); }
      });
    }, { rootMargin: "0px 0px -25% 0px" });
    io.observe(sec);
    setTimeout(settle, 1600);
  }

  updateArc();
  renderSend();
})();
