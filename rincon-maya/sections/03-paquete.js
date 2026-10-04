/* Canasta del paquete: lo que quitas sale de la canasta y el mensaje de WhatsApp se arma solo. */
(function () {
  "use strict";
  var form = document.getElementById("paq-form");
  if (!form) return;
  var PHONE = "524499167574", PRECIO = 840;
  var st = { coch: true, rosca: true, cafe: true, rosca_sabor: "naranja", dia: "", n: 1 };
  var NOM = { coch: "2 kg de cochinita pibil con frijoles negros", rosca: "1 rosca mediana", cafe: "1 lt de café de olla" };
  var out = document.getElementById("paq-n"), precio = document.getElementById("paq-precio"), nota = document.getElementById("paq-nota"), wa = document.getElementById("paq-wa"), roscaRow = document.getElementById("paq-rosca-row");
  var lastTxt = "";
  function fmt(n) { return "$" + n.toLocaleString("es-MX"); }
  function msg() {
    var n = st.n, full = st.coch && st.rosca && st.cafe, m;
    var rosca = "1 rosca mediana de " + st.rosca_sabor;
    if (full) {
      m = "Hola Rincón Maya, quiero " + n + (n === 1 ? " Paquete Tulum" : " Paquetes Tulum") + " (" + fmt(PRECIO * n) + "): " + n * 2 + " kg de cochinita pibil con frijoles negros, " + (n === 1 ? rosca : n + " roscas medianas de " + st.rosca_sabor) + " y " + n + (n === 1 ? " lt" : " lt") + " de café de olla.";
    } else {
      var parts = [];
      if (st.coch) parts.push(n * 2 + " kg de cochinita pibil con frijoles negros");
      if (st.rosca) parts.push(n === 1 ? rosca : n + " roscas medianas de " + st.rosca_sabor);
      if (st.cafe) parts.push(n + " lt de café de olla");
      m = parts.length ? "Hola Rincón Maya, quiero armar mi paquete con: " + parts.join(", ") + ". ¿Me confirman el precio?" : "Hola Rincón Maya, quiero armar un paquete para llevar. ¿Qué me recomiendan?";
    }
    m += st.dia ? " Lo quiero para el " + st.dia + "." : " ¿Qué día lo tienen?";
    return m + " Gracias.";
  }
  function paint() {
    var full = st.coch && st.rosca && st.cafe, any = st.coch || st.rosca || st.cafe;
    var txt = full ? fmt(PRECIO * st.n) : "Precio a confirmar";
    if (txt !== lastTxt) {
      precio.classList.add("is-swap");
      setTimeout(function () { precio.textContent = txt; precio.classList.toggle("is-text", !full); precio.classList.remove("is-swap"); }, 150);
      lastTxt = txt;
    }
    nota.textContent = full ? (st.n === 1 ? fmt(PRECIO) + " el paquete" : st.n + " × " + fmt(PRECIO)) : (any ? "Te lo confirmamos por WhatsApp" : "Arma tu paquete");
    out.textContent = st.n;
    roscaRow.hidden = !st.rosca;
    ["coch", "rosca", "cafe"].forEach(function (k) {
      var t = document.querySelector('[data-tok="' + k + '"]'); if (t) t.classList.toggle("is-out", !st[k]);
      var inp = form.querySelector('input[name="' + k + '"]'); if (inp) inp.closest(".paq-it").classList.toggle("is-on", st[k]);
    });
    wa.href = "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(msg());
  }
  [].forEach.call(form.querySelectorAll('input[type="checkbox"]'), function (i) {
    i.addEventListener("change", function () { st[i.name] = i.checked; paint(); });
  });
  function seg(attr, key) {
    [].forEach.call(form.querySelectorAll("[" + attr + "]"), function (b) {
      b.addEventListener("click", function () {
        var v = b.getAttribute(attr), same = st[key] === v;
        st[key] = key === "dia" && same ? "" : v;
        [].forEach.call(form.querySelectorAll("[" + attr + "]"), function (o) { o.setAttribute("aria-checked", o.getAttribute(attr) === st[key] ? "true" : "false"); });
        paint();
      });
    });
  }
  seg("data-rosca", "rosca_sabor"); seg("data-dia", "dia");
  document.getElementById("paq-less").addEventListener("click", function () { st.n = Math.max(1, st.n - 1); paint(); });
  document.getElementById("paq-more").addEventListener("click", function () { st.n = Math.min(10, st.n + 1); paint(); });
  paint();
})();
