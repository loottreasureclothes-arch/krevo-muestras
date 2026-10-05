(function () {
  var rows = document.getElementById("tal-rows");
  if (!rows) return;
  var MOSTRADOR = [
    { id: "rol", n: "Rol de canela" }, { id: "concha", n: "Concha", t: "20 h de fermentación" }, { id: "empanada", n: "Empanada" },
    { id: "hogaza", n: "Hogaza", t: "chía o campesino integral" }, { id: "pelo", n: "Pan con pelo" }, { id: "galleta", n: "Galletas veganas" }
  ];
  var ENCARGO = [
    { id: "e1", n: "Hogaza de aceituna con queso", t: "1 kg", p: 190 },
    { id: "e2", n: "Pan de chocolate con arándanos", t: "650 g", p: 125 },
    { id: "e3", n: "Pan de miel, naranja con romero", t: "600 g", p: 170 },
    { id: "e4", n: "Hogazajo", t: "900 g, hogaza de chía con tres quesos", p: 250 },
    { id: "e5", n: "Pastel de roles de canela", t: "5 roles, glaseado de limón", p: 200 },
    { id: "e6", n: "Pastel de roles de guayaba y romero", t: "5 roles", p: 200 },
    { id: "e7", n: "Rol salado de champiñones", t: "5 roles, pesto de albahaca", p: 250 },
    { id: "e8", n: "Rol salado de jamón, tocino y chipotle", t: "4 roles", p: 250 },
    { id: "e9", n: "Panqué marmoleado de chocolate", t: "650 g", p: 250 },
    { id: "e10", n: "Panqué de jengibre, canela y miel", t: "650 g", p: 250 },
    { id: "e11", n: "Panqué de zanahoria", t: "650 g, mermelada de chabacano y nueces", p: 300 }
  ];
  var all = ENCARGO.concat(MOSTRADOR), qty = {}, day = "", casa = "Norte", dir = "Sierra de Pinos 112";
  function money(n) { return "$" + n.toLocaleString("es-MX"); }
  function rowHtml(it) {
    return '<div class="tal-row' + (it.p ? '' : ' m') + '" data-id="' + it.id + '"><div class="tal-nm">' + it.n + (it.t ? "<small>" + it.t + "</small>" : "") + '</div>' +
      '<div class="tal-pr' + (it.p ? "" : " ask") + '">' + (it.p ? money(it.p) : "Pregunta el precio") + '</div>' +
      '<div class="tal-step"><button type="button" class="minus" aria-label="Quitar ' + it.n + '">&minus;</button><output>0</output><button type="button" class="plus" aria-label="Agregar ' + it.n + '">+</button></div></div>';
  }
  rows.innerHTML = '<p class="tal-grp">Por encargo, con precio</p>' + ENCARGO.map(rowHtml).join("") + '<p class="tal-grp">Del mostrador, precio en la casa</p><div class="tal-chips">' + MOSTRADOR.map(function (it) { return '<button type="button" class="tal-chip" data-chip="' + it.id + '">' + it.n + '</button>'; }).join("") + '</div>' + MOSTRADOR.map(rowHtml).join("");
  // dias: desde manana, 6 dias, domingo cerrado (hora de Mexico)
  var DN = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"], DS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    MS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Mexico_City", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()).split("-");
  var base = Date.UTC(+parts[0], +parts[1] - 1, +parts[2]), days = document.getElementById("tal-days"), dh = "";
  for (var i = 1; i <= 6; i++) {
    var d = new Date(base + i * 864e5), w = d.getUTCDay(), full = DN[w] + " " + d.getUTCDate() + " de " + MS[d.getUTCMonth()];
    dh += '<button type="button" class="tal-day" role="radio" aria-checked="false" data-full="' + full + '"' + (w === 0 ? " disabled" : "") + '>' + DS[w] + "<b>" + d.getUTCDate() + "</b>" + (w === 0 ? "cerrado" : MS[d.getUTCMonth()].slice(0, 3)) + "</button>";
  }
  days.innerHTML = dh;
  function render() {
    var sum = 0, lines = [], unp = false, n = 0;
    all.forEach(function (it) {
      var q = qty[it.id] || 0, row = rows.querySelector('[data-id="' + it.id + '"]');
      row.classList.toggle("has", q > 0); row.querySelector("output").textContent = q;
      var ch = rows.querySelector('[data-chip="' + it.id + '"]'); if (ch) ch.classList.toggle("on", q > 0);
      if (q) { n += q; if (it.p) { sum += q * it.p; lines.push("- " + q + " x " + it.n + " (" + money(it.p) + ")"); } else { unp = true; lines.push("- " + q + " x " + it.n + " (precio por confirmar)"); } }
    });
    document.getElementById("tal-sum").textContent = money(sum);
    document.getElementById("tal-note").textContent = unp ? "Lo que dice \"por confirmar\" te lo cotizamos en el chat." : "Lo que no trae precio te lo confirmamos en el chat.";
    var msg = "Hola, La Miga y la Barriga. " + (lines.length ? "Quiero encargar:\n" + lines.join("\n") + (sum ? "\nTotal con precio: " + money(sum) : "") : "Quiero hacer un encargo, ¿qué tienen disponible?") +
      "\n" + (day ? "Para recoger el " + day : "¿Qué día me lo pueden tener listo?") + " en la sucursal " + casa + " (" + dir + ").\n¿Me confirman?";
    document.getElementById("tal-wa").href = window.KREVO.wa(msg);
    document.getElementById("tal-wa").setAttribute("data-msg", msg);
  }
  rows.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    if (b.hasAttribute("data-chip")) { var cid = b.getAttribute("data-chip"); qty[cid] = qty[cid] ? 0 : 1; render(); return; }
    var id = b.closest(".tal-row").getAttribute("data-id");
    qty[id] = Math.max(0, (qty[id] || 0) + (b.classList.contains("plus") ? 1 : -1)); render();
  });
  days.addEventListener("click", function (e) {
    var b = e.target.closest(".tal-day"); if (!b || b.disabled) return;
    [].forEach.call(days.children, function (x) { x.classList.remove("is-on"); x.setAttribute("aria-checked", "false"); });
    b.classList.add("is-on"); b.setAttribute("aria-checked", "true"); day = b.getAttribute("data-full"); render();
  });
  document.querySelector(".tal-casas").addEventListener("click", function (e) {
    var b = e.target.closest(".tal-casa"); if (!b) return;
    [].forEach.call(this.children, function (x) { x.classList.remove("is-on"); x.setAttribute("aria-checked", "false"); });
    b.classList.add("is-on"); b.setAttribute("aria-checked", "true"); casa = b.getAttribute("data-casa"); dir = b.getAttribute("data-dir"); render();
  });
  [].forEach.call(document.querySelectorAll("[data-add]"), function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-add"); qty[id] = (qty[id] || 0) + 1; render();
      btn.classList.add("is-ok");
      btn.textContent = "En tu talón (" + qty[id] + ")";
      setTimeout(function () { btn.classList.remove("is-ok"); btn.textContent = "Agregar"; }, 1600);
    });
  });
  render();
})();
