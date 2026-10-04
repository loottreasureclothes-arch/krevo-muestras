/* La tabla: personas + parrillada + entradas/cortes -> tabla visual + WhatsApp armado */
(function () {
  "use strict";
  var WA = "524495881528";
  var PAR = {
    clasica: { n: "Clásica", p2: 340, p4: 670, d: "Para 4: arrachera, chuleta, adobada, pollo, chorizos, chistorra y 2 chiles momias." },
    select: { n: "Select", p2: 550, p4: 990, d: "Cortes a elegir, tuétano, chistorra, papa al horno, elote dulce y chile momia." },
    mar: { n: "Mar y Tierra", p2: 650, p4: 1200, d: "Carne y marisco a elegir, tuétano, chistorra, papa al horno, chorizos y elote dulce." }
  };
  var IT = {
    tuetanos: ["Tuétanos", 150, "Tuétanos"], mollejas: ["Mollejas de res", 160, "Mollejas"], provoleta: ["Queso provoleta", 150, "Provoleta"],
    guacamole: ["Guacamole Margarito", 145, "Guacamole"], costillas: ["Costillas BBQ", 245, "Costillas"], alitas: ["Alitas", 160, "Alitas"],
    arrachera: ["Arrachera 300 g", 240, "Arrachera"], ribeye: ["Rib eye 350 g", 280, "Rib eye"], picana: ["Picaña 300 g", 295, "Picaña"],
    bife: ["Bife de chorizo 350 g", 220, "Bife"], prime: ["Prime rib 400 g", 270, "Prime rib"], sirloin: ["Sirloin 300 g", 195, "Sirloin"],
    vacio: ["Vacío orgánico 450 g", 600, "Vacío"], tomahawk: ["Tomahawk Black Angus 1.2 kg", 1400, "Tomahawk"]
  };
  var st = { n: 4, par: "clasica", day: "", items: {} };
  var $ = function (s) { return document.querySelector(s); };
  var board = $("#board"), nEl = $("#mesa-n"), descEl = $("#mesa-desc"), totEl = $("#mesa-total"), ppEl = $("#mesa-pp"),
      sumEl = $("#mesa-sum"), waEl = $("#mesa-wa"), bar = $("#mesa-bar"), barN = $("#mesa-bar-n"), barT = $("#mesa-bar-t"), right = $("#mesa-right");
  if (!board) return;
  var money = function (v) { return "$" + v.toLocaleString("es-MX"); };
  var seen = {};

  function combo() {
    var even = st.n % 2 ? st.n + 1 : st.n, fours = Math.floor(even / 4), twos = (even % 4) / 2, p = PAR[st.par];
    return { fours: fours, twos: twos, price: fours * p.p4 + twos * p.p2 };
  }
  function itemsList() { var a = []; for (var k in st.items) if (st.items[k] > 0) a.push(k); return a; }
  function money2(c) {
    var total = c.price; itemsList().forEach(function (k) { total += IT[k][1] * st.items[k]; }); return total;
  }
  function message(c, total) {
    var p = PAR[st.par], parts = [];
    if (c.fours) parts.push(c.fours + " Parrillada " + p.n + " para 4 (" + money(c.fours * p.p4) + ")");
    if (c.twos) parts.push(c.twos + " Parrillada " + p.n + " para 2 (" + money(c.twos * p.p2) + ")");
    itemsList().forEach(function (k) { parts.push(IT[k][0] + " x" + st.items[k] + " (" + money(IT[k][1] * st.items[k]) + ")"); });
    var m = "Hola, quiero reservar mesa en Asadero Bar La Carnicería. Somos " + st.n + " personas. Mi tabla: " + parts.join(", ") + ". Total aprox: " + money(total) + " (" + money(Math.round(total / st.n)) + " por persona). ";
    m += st.day ? "Día: " + st.day + ". ¿Qué hora tienen?" : "¿Qué día y hora tienen mesa?";
    return m;
  }
  function render() {
    var c = combo(), total = money2(c), p = PAR[st.par], html = "", i, plats = c.fours + c.twos;
    var now = {}, fr = function (key) { now[key] = 1; return seen[key] ? "" : " fresh"; };
    var seats = "";
    for (i = 0; i < st.n; i++) seats += '<i class="seat' + fr("s" + i) + '" style="--d:' + (i * 40) + 'ms"></i>';
    html += '<div class="seats" aria-label="' + st.n + ' lugares en la mesa">' + seats + '</div>';
    for (i = 0; i < c.fours; i++) html += '<div class="plat plat-4' + fr("f" + i + st.par) + '"><b>Para 4</b><span>' + p.n + "</span></div>";
    for (i = 0; i < c.twos; i++) html += '<div class="plat plat-2' + fr("t" + i + st.par) + '"><b>Para 2</b><span>' + p.n + "</span></div>";
    var ks = itemsList();
    ks.forEach(function (k) {
      html += '<button type="button" class="plate' + fr("k" + k + st.items[k]) + '" data-rm="' + k + '" aria-label="Quitar ' + IT[k][0] + ' de tu tabla"><b>' + IT[k][2] + "</b><i>x" + st.items[k] + "</i></button>";
    });
    board.innerHTML = html;
    var hint = document.getElementById("board-hint");
    if (hint) hint.textContent = ks.length ? "Toca un plato para quitarlo." : "Toca Agregar en la carta y cae aquí.";
    seen = now;
    nEl.textContent = st.n;
    descEl.textContent = p.d;
    totEl.textContent = money(total);
    ppEl.textContent = money(Math.round(total / st.n));
    var note = st.n % 2 ? "La parrillada va por pares: para " + st.n + " se arma de " + (st.n + 1) + ". " : "";
    sumEl.textContent = note + (ks.length ? "Más " + ks.length + (ks.length === 1 ? " extra" : " extras") + " en tu tabla." : "");
    waEl.setAttribute("data-wa", message(c, total));
    waEl.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(message(c, total));
    var cnt = 0; ks.forEach(function (k) { cnt += st.items[k]; });
    Array.prototype.forEach.call(document.querySelectorAll("[data-add]"), function (b) {
      var q = st.items[b.getAttribute("data-add")] || 0, em = b.querySelector(".cnt");
      if (em) em.textContent = q ? "x" + q : "";
      b.classList.toggle("has", q > 0);
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-par]"), function (b) { b.setAttribute("aria-checked", b.getAttribute("data-par") === st.par ? "true" : "false"); });
    Array.prototype.forEach.call(document.querySelectorAll("[data-day]"), function (b) { b.setAttribute("aria-checked", b.getAttribute("data-day") === st.day ? "true" : "false"); });
    if (bar) { bar.hidden = !cnt || barHide; barN.textContent = cnt + (cnt === 1 ? " extra" : " extras"); barT.textContent = money(total); }
  }
  var barHide = false;
  function watchBar() {
    function upd() {
      var r = right.getBoundingClientRect(), vh = window.innerHeight;
      var inView = r.top < vh * 0.85 && r.bottom > vh * 0.15;
      if (inView !== barHide) { barHide = inView; if (bar) bar.hidden = barHide || !cntNow(); }
    }
    function cntNow() { var c = 0; for (var k in st.items) c += st.items[k]; return c; }
    window.addEventListener("scroll", function () { requestAnimationFrame(upd); }, { passive: true });
    window.addEventListener("resize", upd); upd();
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("button") : null; if (!t) return;
    var a = t.getAttribute("data-add"), rm = t.getAttribute("data-rm"), pp = t.getAttribute("data-p"), par = t.getAttribute("data-par"), day = t.getAttribute("data-day");
    if (a) { st.items[a] = (st.items[a] || 0) + 1; render(); }
    else if (rm) { st.items[rm] = Math.max(0, (st.items[rm] || 0) - 1); render(); }
    else if (pp) { st.n = Math.min(24, Math.max(1, st.n + parseInt(pp, 10))); render(); }
    else if (par) { st.par = par; render(); }
    else if (day) { st.day = st.day === day ? "" : day; render(); }
  });
  render(); watchBar();
})();
