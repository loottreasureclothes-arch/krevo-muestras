(function () {
  var form = document.getElementById("tr-form");
  if (!form) return;
  var WA = "524495789542";
  var NL = 12;
  var lon = document.getElementById("tr-lonjas"), pina = document.getElementById("tr-pina"), plato = document.getElementById("tr-plato");
  var res = document.getElementById("tr-res"), tot = document.getElementById("tr-tot"), wa = document.getElementById("tr-wa");
  var st = { q: {}, tort: "maiz", queso: 0, modo: "para llevar" };
  for (var k = 0; k < NL; k++) { var d = document.createElement("div"); d.className = "lonja"; var w = 100 - Math.abs(k - 5) * 3; d.style.width = w + "%"; lon.appendChild(d); }
  var rows = Array.prototype.slice.call(form.querySelectorAll(".tr-row"));
  function row(id) { return form.querySelector('.tr-row[data-id="' + id + '"]'); }
  function calc() {
    var total = 0, tacos = 0, lines = [];
    var extra = st.tort === "harina" ? (st.queso ? 24 : 15) : (st.queso ? 3 : 0);
    rows.forEach(function (r) {
      var id = r.getAttribute("data-id"), n = st.q[id] || 0;
      if (!n) return;
      var p = +r.getAttribute("data-p"), nom = r.getAttribute("data-n");
      var esTaco = id.indexOf("t-") === 0;
      if (esTaco) {
        tacos += n;
        var ex = r.getAttribute("data-fijo") ? (st.tort === "harina" ? 15 : 0) : extra;
        total += n * (p + ex);
        lines.push(n + " " + (n === 1 ? "taco " : "tacos ") + nom);
      } else {
        total += n * p;
        lines.push(n + " " + nom);
      }
    });
    return { total: total, tacos: tacos, lines: lines, extra: extra };
  }
  function pintaPlato(n) {
    var c = Math.min(n, 16);
    while (plato.children.length > c) plato.removeChild(plato.lastChild);
    while (plato.children.length < c) plato.appendChild(document.createElement("i"));
  }
  function render() {
    var c = calc();
    rows.forEach(function (r) {
      var n = st.q[r.getAttribute("data-id")] || 0;
      r.querySelector("output").textContent = n;
      r.classList.toggle("has", n > 0);
    });
    var cut = Math.min(NL - 2, Math.ceil(c.tacos / 2));
    var ls = lon.children;
    for (var i = 0; i < ls.length; i++) ls[i].classList.toggle("cut", i < cut);
    pina.style.setProperty("--cut", cut);
    pintaPlato(c.tacos);
    var opt = [];
    if (c.tacos) { opt.push(st.tort === "harina" ? "tortilla de harina" : "tortilla de maíz"); if (st.queso) opt.push("con queso"); }
    var resumen = c.lines.length ? c.lines.join(", ") + (opt.length && c.tacos ? " (" + opt.join(", ") + ")" : "") : "Elige arriba.";
    res.textContent = resumen;
    tot.textContent = c.total ? "$" + c.total : "Elige arriba";
    var msg;
    if (c.lines.length) {
      msg = "Hola, quiero pedir en El Pastor Suizo:\n" + c.lines.map(function (l) { return "- " + l; }).join("\n");
      if (c.tacos) msg += "\nTacos en " + (st.tort === "harina" ? "tortilla de harina" : "tortilla de maíz") + (st.queso ? ", con queso" : "") + ".";
      msg += "\nTotal según la carta: $" + c.total + "\nEs " + st.modo + ". ¿En cuánto tiempo estaría?";
    } else {
      msg = "Hola, quiero hacer un pedido en El Pastor Suizo";
    }
    wa.setAttribute("href", "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg));
    wa.querySelector("span").textContent = c.total ? "Mandar pedido · $" + c.total : "Mandar pedido por WhatsApp";
  }
  form.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    if (b.hasAttribute("data-d")) {
      var id = b.closest(".tr-row").getAttribute("data-id");
      st.q[id] = Math.max(0, Math.min(30, (st.q[id] || 0) + (+b.getAttribute("data-d"))));
    } else if (b.hasAttribute("data-tort")) {
      st.tort = b.getAttribute("data-tort");
    } else if (b.hasAttribute("data-queso")) {
      st.queso = +b.getAttribute("data-queso");
    } else if (b.hasAttribute("data-modo")) {
      st.modo = b.getAttribute("data-modo");
    } else if (b.id === "tr-clear") {
      st.q = {};
    } else return;
    var seg = b.closest(".seg");
    if (seg) Array.prototype.forEach.call(seg.children, function (x) { x.classList.toggle("on", x === b); });
    render();
  });
  /* botones Agregar de la carta */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-add]");
    if (!a) return;
    var id = a.getAttribute("data-add");
    st.q[id] = Math.min(30, (st.q[id] || 0) + 1);
    a.classList.add("ok");
    a.textContent = "Agregado " + st.q[id];
    clearTimeout(a._t);
    a._t = setTimeout(function () { a.classList.remove("ok"); a.textContent = "Agregar"; }, 1400);
    render();
  });
  render();
})();
