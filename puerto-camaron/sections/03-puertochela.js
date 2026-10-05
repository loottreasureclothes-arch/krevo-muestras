(function () {
  var svg = document.getElementById("pch-svg");
  if (!svg) return;
  var P = window.PC || {};
  var money = function (n) { return "$" + n.toLocaleString("es-MX"); };
  var DATA = [
    { n: "Capitán", p: 149, d: "De puro camarón.", t: [["s", 7]] },
    { n: "Chatarrera", p: 149, d: "Papas y cueritos con un duro de base.", t: [["f", 7], ["q", 4]] },
    { n: "Kraken", p: 160, d: "Con puro pulpito.", t: [["u", 4]] },
    { n: "Chamoyada", p: 149, d: "La de gomitas.", t: [["g", 9]] },
    { n: "Cecina", p: 160, d: "Carne seca sazonada.", t: [["c", 6]] },
    { n: "Marítima", p: 160, d: "Camarón, pulpo y camarón seco.", t: [["s", 3], ["u", 2], ["d", 3]] },
    { n: "Titán", p: 185, d: "Camarón gigante con cabeza, pulpo, aceitunas y más camarón.", t: [["S", 1], ["u", 2], ["o", 3], ["s", 3]] },
    { n: "Matacruda", p: 169, d: "De base cecina y arriba camarón, pulpo y camarón seco.", t: [["c", 3], ["s", 3], ["u", 2], ["d", 2]] },
    { n: "Six del pescador", p: 350, d: "Six con topping de camarones sazonados.", t: [["s", 7]], six: 1 },
    { n: "Catamarán", p: 550, d: "Six con una libra de camarones y deliciosa cecina.", t: [["s", 12], ["c", 4]], six: 1 }
  ];
  var BEER = { Corona: "#f7c948", Victoria: "#d9811a" };
  var sel = -1, beer = "Corona", n = 1;

  /* ---- piezas ---- */
  function piece(k, x, y, r, i) {
    var t = "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") rotate(" + r + ") scale(1.3)";
    var s = "";
    if (k === "s") s = '<path d="M-10 0C-10-9 6-10 10-2C12 3 7 8 1 7L-2 11L-5 6C-9 5-10 3-10 0Z" fill="#ff8a4c" stroke="#a82a12" stroke-width="1.5"/><path d="M-3-5q3 5 0 11M3-6q3 5 0 12" stroke="#a82a12" stroke-width="1" fill="none"/><circle cx="6" cy="-3" r="1.2" fill="#2a0a05"/>';
    if (k === "S") s = '<g transform="scale(1.7)"><path d="M-10 0C-10-9 6-10 10-2C12 3 7 8 1 7L-2 11L-5 6C-9 5-10 3-10 0Z" fill="#ff7a3a" stroke="#a82a12" stroke-width="1.2"/><path d="M-3-5q3 5 0 11M3-6q3 5 0 12" stroke="#a82a12" stroke-width=".8" fill="none"/><circle cx="7" cy="-3" r="1.4" fill="#2a0a05"/><path d="M9-5Q16-12 20-9M9-4Q17-6 21-2" stroke="#a82a12" stroke-width=".9" fill="none"/></g>';
    if (k === "u") s = '<ellipse rx="8" ry="7" fill="#b0618f" stroke="#6e2f58" stroke-width="1.3"/><path d="M-6 5q-4 8-10 6M0 7q0 9-5 11M6 5q5 8 11 5" stroke="#b0618f" stroke-width="3.2" fill="none" stroke-linecap="round"/><circle cx="-3" cy="-1" r="1.3" fill="#2a0a05"/><circle cx="3" cy="-1" r="1.3" fill="#2a0a05"/>';
    if (k === "o") s = '<circle r="5.5" fill="#6f9330" stroke="#3f5a14" stroke-width="1.2"/><circle r="2" fill="#d8232a"/>';
    if (k === "g") { var cl = ["#ff4d6d", "#ffd23f", "#7bd96b", "#ff9a3c"][i % 4]; s = '<rect x="-7" y="-4.5" width="14" height="9" rx="4" fill="' + cl + '" stroke="rgba(0,0,0,.35)" stroke-width="1"/>'; }
    if (k === "c") s = '<rect x="-11" y="-3.2" width="22" height="6.4" rx="2.4" fill="#7a3b1d" stroke="#46210f" stroke-width="1.2"/>';
    if (k === "f") s = '<rect x="-2.6" y="-11" width="5.2" height="22" rx="1.8" fill="#f6b81f" stroke="#b5810a" stroke-width="1"/>';
    if (k === "d") s = '<path d="M-6 3C-6-5 4-7 6 0C3-1 1 1 0 5Z" fill="#e58a3a" stroke="#8c4a12" stroke-width="1"/>';
    if (k === "q") s = '<path d="M-8 2C-8-6 4-6 4 0C4 4-2 4-2 1" fill="none" stroke="#f1d9a8" stroke-width="3.4" stroke-linecap="round"/>';
    return '<g transform="' + t + '"><g class="pch-drop" style="--d:' + (Math.min(i, 14) * 0.035).toFixed(2) + 's">' + s + "</g></g>";
  }
  function pile(item) {
    var list = [];
    item.t.forEach(function (a) { for (var j = 0; j < a[1]; j++) list.push(a[0]); });
    var rows = item.six ? [7, 6, 5, 3] : [6, 5, 3, 2, 1];
    var baseY = item.six ? 168 : 112, stepY = item.six ? 15 : 18, out = "", idx = 0, r = 0;
    while (idx < list.length && r < rows.length) {
      var cnt = Math.min(rows[r], list.length - idx), span = (rows[r] - 1) * 19;
      for (var j = 0; j < cnt; j++) {
        var x = 120 - span / 2 + j * (rows[r] > 1 ? span / (rows[r] - 1) : 0) + Math.sin(idx * 2.3) * 3;
        var y = baseY - r * stepY + Math.cos(idx * 1.7) * 2;
        out += piece(list[idx], x, y, Math.round(Math.sin(idx * 1.3) * 38), idx);
        idx++;
      }
      r++;
    }
    return out;
  }
  /* ---- escena ---- */
  var glass = "M62 118L178 118L160 276Q159 284 150 284L90 284Q81 284 80 276Z";
  var bottles = "";
  [66, 90, 114, 138, 162, 186].forEach(function (x, i) { bottles += '<g><rect x="' + (x - 7) + '" y="128" width="14" height="60" rx="5" fill="#d9a21a" stroke="#6b4a08" stroke-width="1.4"/><rect x="' + (x - 6) + '" y="116" width="12" height="16" rx="2" fill="#d8232a" stroke="#8c1218" stroke-width="1.2"/></g>'; });
  svg.innerHTML =
    '<defs><clipPath id="pch-clip"><path d="' + glass + '"/></clipPath></defs>' +
    '<ellipse cx="120" cy="290" rx="86" ry="7" fill="rgba(0,0,0,.35)"/>' +
    '<g id="pch-glass"><g clip-path="url(#pch-clip)">' +
      '<rect x="40" y="118" width="160" height="170" fill="rgba(255,243,214,.08)"/>' +
      '<rect class="pch-beerfill" id="pch-beer" x="40" y="176" width="160" height="112" fill="#f7c948" style="transform:scaleY(0)"/>' +
      '<g class="pch-redfill" id="pch-red" style="transform:scaleY(0)"><rect x="40" y="124" width="160" height="56" fill="#c4161c"/><path d="M60 146q20-10 40 0t40 0t40 0M60 162q20-10 40 0t40 0t40 0" stroke="#2a0a0c" stroke-width="3" fill="none" opacity=".75"/></g>' +
    '</g><path d="' + glass + '" fill="none" stroke="#fff3d6" stroke-opacity=".7" stroke-width="3"/><path d="M70 128L82 270" stroke="#fff" stroke-opacity=".35" stroke-width="5" stroke-linecap="round"/><path d="M62 118L178 118" stroke="#d8232a" stroke-width="6" stroke-dasharray="4 3"/></g>' +
    '<g id="pch-bucket" style="display:none"><g>' + bottles + '</g><path d="M52 176L188 176L174 282Q173 290 164 290L76 290Q67 290 66 282Z" fill="#b9c4d4" stroke="#2c3a52" stroke-width="3"/><path d="M52 176L188 176" stroke="#e8eef7" stroke-width="6"/><path d="M82 196L90 276M120 196L120 278M158 196L150 276" stroke="#8795ab" stroke-width="3" opacity=".6"/></g>' +
    '<g id="pch-pile"></g>' +
    '<text id="pch-x" x="206" y="40" text-anchor="middle" font-family="Titan One,sans-serif" font-size="30" fill="#f6b81f" stroke="#071438" stroke-width="1"></text>';
  var gGlass = svg.querySelector("#pch-glass"), gBucket = svg.querySelector("#pch-bucket"), gPile = svg.querySelector("#pch-pile");
  var eBeer = svg.querySelector("#pch-beer"), eRed = svg.querySelector("#pch-red"), eX = svg.querySelector("#pch-x");

  /* ---- controles ---- */
  var rail = document.getElementById("pch-rail"), nBox = document.getElementById("pch-n");
  var cap = document.getElementById("pch-cap"), line = document.getElementById("pch-line"), desc = document.getElementById("pch-desc"), total = document.getElementById("pch-total"), wa = document.getElementById("pch-wa");
  DATA.forEach(function (it, i) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "pch-card"; b.setAttribute("role", "option"); b.setAttribute("aria-selected", "false");
    b.innerHTML = "<b>" + it.n + "</b><i>" + it.d + "</i><u>" + money(it.p) + "</u>";
    b.addEventListener("click", function () { choose(i); });
    rail.appendChild(b);
  });
  var glassIcon = '<svg viewBox="0 0 26 32" aria-hidden="true"><path class="g" d="M3 4H23L20 28Q20 29 19 29H7Q6 29 6 28Z"/></svg>';
  for (var k = 1; k <= 4; k++) (function (k) {
    var b = document.createElement("button");
    b.type = "button"; b.setAttribute("aria-label", k + (k === 1 ? " puertochela" : " puertochelas")); b.setAttribute("aria-pressed", k === 1 ? "true" : "false");
    b.innerHTML = glassIcon + (k > 0 ? "" : ""); b.dataset.n = k;
    var lbl = document.createElement("span"); lbl.textContent = k; lbl.style.cssText = "font-weight:900;margin-left:2px"; 
    b.innerHTML = glassIcon; b.style.cssText = "width:auto;min-width:56px;gap:2px;display:flex;align-items:center;justify-content:center;padding:0 10px"; b.appendChild(lbl);
    b.addEventListener("click", function () { n = k; sync(false); });
    nBox.appendChild(b);
  })(k);
  [].forEach.call(document.querySelectorAll(".pch-beer button"), function (b) {
    b.addEventListener("click", function () { beer = b.getAttribute("data-beer"); sync(false); });
  });

  function choose(i) { sel = i; sync(true); }
  function sync(redraw) {
    [].forEach.call(rail.children, function (c, i) { c.setAttribute("aria-selected", i === sel ? "true" : "false"); });
    [].forEach.call(nBox.children, function (c) { c.setAttribute("aria-pressed", (+c.dataset.n === n) ? "true" : "false"); });
    [].forEach.call(document.querySelectorAll(".pch-beer button"), function (c) { c.setAttribute("aria-pressed", c.getAttribute("data-beer") === beer ? "true" : "false"); });
    eBeer.setAttribute("fill", BEER[beer]);
    eX.textContent = n > 1 ? "×" + n : "";
    if (sel < 0) { return; }
    var it = DATA[sel], six = !!it.six;
    gGlass.style.display = six ? "none" : ""; gBucket.style.display = six ? "" : "none";
    eBeer.style.transform = "scaleY(1)"; eRed.style.transform = "scaleY(1)"; eRed.style.transitionDelay = ".18s";
    if (redraw) gPile.innerHTML = pile(it);
    cap.textContent = it.n + " con " + beer;
    var tot = it.p * n;
    line.textContent = n + " × " + it.n;
    desc.textContent = it.d + " Cerveza " + beer + ".";
    total.textContent = money(tot);
    var msg = "Hola Puerto Camarón, quiero " + n + " " + it.n + " (" + it.d.replace(/\.$/, "") + ") con cerveza " + beer + ". Total según su carta: " + money(tot) + ". Sucursal Américas, ¿hay lugar hoy?";
    wa.href = "https://wa.me/524499179428?text=" + encodeURIComponent(msg);
  }
  sync(false);
  if (!P.reduce) { /* el vaso se llena una vez al entrar con el primero de la fila */ }
})();
