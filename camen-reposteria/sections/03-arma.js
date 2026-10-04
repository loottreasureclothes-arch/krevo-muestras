/* Componente firma: el pastel que se parte en tantas porciones como personas. */
(function () {
  var svg = document.getElementById("cake");
  if (!svg) return;
  var SIZES = [{ n: 1, t: "Mini mini" }, { n: 4, t: "Mini" }, { n: 8, t: "" }, { n: 12, t: "" }, { n: 16, t: "" }, { n: 20, t: "" }, { n: 25, t: "" }];
  var R = { 1: 34, 4: 58, 8: 84, 12: 98, 16: 108, 20: 118, 25: 128 };
  var SAB = [["Chocolate", "#4a2a1c"], ["Moro de Venecia", "#5a3524"], ["Mármol", "#8a6a55"], ["Zanahoria", "#c98b4e"], ["Moka", "#8a6246"], ["Tres leches", "#f1e4cc"], ["Nuez", "#e4cfa6"], ["Naranja", "#f0cf8a"], ["Vainilla, chocolate y almendra", "#b88a64"], ["Piña-coco", "#f4ecd6"], ["Moro Valenciano", "#6b4330"]];
  var DIAS = ["Hoy", "Mañana", "Otro día"];
  var SUC = [{ n: "Zaragoza", full: "Matriz Zaragoza", num: "524499121601", tel: "449 912 1601" }, { n: "Fundición", full: "Fundición", num: "524499149636", tel: "449 914 9636" }, { n: "Américas", full: "Américas", num: "524495362673", tel: "449 536 2673" }];
  /* Únicos precios publicados (Uber Eats, sucursal Zaragoza) */
  var PRECIOS = { "Chocolate|16": 602, "Tres leches|8": 401 };
  var st = { n: 8, s: 5, d: 0, c: 0 };
  var $ = function (id) { return document.getElementById(id); };

  function tam(n) { var o = SIZES.filter(function (x) { return x.n === n; })[0]; return o.t ? o.t + ", " + (n === 1 ? "1 persona" : n + " personas") : n + " personas"; }

  function shade(hex, k) { var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; r = Math.round(r * k); g = Math.round(g * k); b = Math.round(b * k); return "rgb(" + Math.min(255, r) + "," + Math.min(255, g) + "," + Math.min(255, b) + ")"; }
  function lum(hex) { var n = parseInt(hex.slice(1), 16); return ((n >> 16) * 0.3 + ((n >> 8) & 255) * 0.59 + (n & 255) * 0.11) / 255; }
  function wedge(cx, cy, r, a0, a1) { var x0 = cx + Math.cos(a0) * r, y0 = cy + Math.sin(a0) * r, x1 = cx + Math.cos(a1) * r, y1 = cy + Math.sin(a1) * r; return "M" + cx.toFixed(1) + " " + cy.toFixed(1) + "L" + x0.toFixed(1) + " " + y0.toFixed(1) + "A" + r + " " + r + " 0 " + (a1 - a0 > Math.PI ? 1 : 0) + " 1 " + x1.toFixed(1) + " " + y1.toFixed(1) + "Z"; }
  function rosettes(cx, cy, r, col, a0, a1) { var h = "", bumps = Math.max(14, Math.round(r / 4.2)), i, a, rr = (r * 0.075 + 2.4).toFixed(1); for (i = 0; i < bumps; i++) { a = i / bumps * Math.PI * 2 - Math.PI / 2; if (a1 !== undefined && !(a >= a0 && a <= a1)) continue; h += '<circle cx="' + (cx + Math.cos(a) * (r - 2)).toFixed(1) + '" cy="' + (cy + Math.sin(a) * (r - 2)).toFixed(1) + '" r="' + rr + '" fill="' + col + '" stroke="rgba(42,22,19,.3)" stroke-width="1"/>'; } return h; }

  function draw() {
    var n = st.n, r = R[n], col = SAB[st.s][1], i, a, x, y, h = "", H = Math.max(8, r * 0.13);
    var light = lum(col) > 0.62, side = shade(col, light ? 0.8 : 0.72), bet = light ? "#c98b4e" : "#f6eadb";
    h += '<g class="pop">';
    /* plato de servicio: vino con filo crema */
    h += '<circle cx="150" cy="154" r="146" fill="#2a1613" opacity=".22"/>';
    h += '<circle cx="150" cy="150" r="144" fill="#a0475a"/>';
    h += '<circle cx="150" cy="150" r="128" fill="#8f3c4f"/>';
    h += '<circle cx="150" cy="150" r="136" fill="none" stroke="#f6eadb" stroke-width="1.5" stroke-dasharray="2 7" stroke-linecap="round" opacity=".55"/>';
    /* costado del pastel (volumen) y sombra */
    h += '<ellipse cx="153" cy="' + (150 + H + 4) + '" rx="' + (r + 6) + '" ry="' + (r + 4) + '" fill="#2a1613" opacity=".35"/>';
    h += '<circle cx="150" cy="' + (150 + H) + '" r="' + r + '" fill="' + side + '"/>';
    h += '<circle cx="150" cy="150" r="' + r + '" fill="' + col + '" stroke="rgba(42,22,19,.35)" stroke-width="1.2"/>';
    h += '<circle cx="150" cy="150" r="' + (r * 0.62).toFixed(1) + '" fill="#fff" opacity=".07"/>';
    if (n === 1) {
      h += rosettes(150, 150, r, bet);
    } else {
      var step = Math.PI * 2 / n, a0 = -Math.PI / 2 - step / 2, a1 = a0 + step, mid = -Math.PI / 2, d = Math.max(10, r * 0.16);
      /* hueco donde sale la rebanada */
      h += '<path d="' + wedge(150, 150, r + 0.5, a0, a1) + '" fill="#8f3c4f"/>';
      h += rosettes(150, 150, r, bet).replace(/<circle[^>]*>/g, function (c) { var m = c.match(/cx="([\d.]+)" cy="([\d.]+)"/), ang = Math.atan2(+m[2] - 150, +m[1] - 150); return (ang > a0 - 0.05 && ang < a1 + 0.05) ? "" : c; });
      for (i = 1; i < n; i++) { a = a0 + i * step; x = 150 + Math.cos(a) * r; y = 150 + Math.sin(a) * r; h += '<line class="cut" x1="150" y1="150" x2="' + x.toFixed(1) + '" y2="' + y.toFixed(1) + '" stroke="#2a1613" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>'; }
      /* la rebanada servida, jalada hacia afuera */
      var ox = Math.cos(mid) * d, oy = Math.sin(mid) * d;
      h += '<g transform="translate(' + ox.toFixed(1) + " " + oy.toFixed(1) + ')"><g class="slice" style="--d:' + d.toFixed(1) + 'px">';
      h += '<path d="' + wedge(150, 150 + H * 0.7, r, a0, a1) + '" fill="' + side + '"/>';
      h += '<path d="' + wedge(150, 150, r, a0, a1) + '" fill="' + col + '" stroke="#2a1613" stroke-opacity=".5" stroke-width="1.5" stroke-linejoin="round"/>';
      h += rosettes(150, 150, r, bet, a0 - 0.02, a1 + 0.02);
      h += '</g></g>';
    }
    h += '<circle cx="150" cy="150" r="' + (n === 1 ? 8 : 9) + '" fill="#a0475a" stroke="#fff" stroke-opacity=".6" stroke-width="1.5"/><circle cx="147" cy="147" r="2.4" fill="#fff" opacity=".75"/>';
    h += '</g>';
    svg.innerHTML = h;
    var sab = SAB[st.s][0];
    $("cake-cap").textContent = sab + " para " + (n === 1 ? "1" : n);
  }

  function precio() {
    var p = PRECIOS[SAB[st.s][0] + "|" + st.n], el = $("precio");
    el.innerHTML = p ? '<b>$' + p + '</b>en Uber Eats, sucursal Zaragoza' : 'Pregunta el precio. Te lo confirman por WhatsApp.';
  }

  function msg() {
    var sab = SAB[st.s][0], suc = SUC[st.c];
    var m = "Hola Camen Repostería, quiero un pastel de " + sab + " para " + (st.n === 1 ? "1 persona" : st.n + " personas") + (tam(st.n).indexOf(",") > 0 ? " (" + tam(st.n).split(",")[0] + ")" : "") + ". Lo necesito para " + DIAS[st.d].toLowerCase() + ", sucursal " + suc.n + ".";
    var ex = window.CamenExtras || [];
    if (ex.length) m += " También quiero: " + ex.join(", ") + ".";
    return m + " ¿Me confirman precio y disponibilidad?";
  }

  function link() {
    var suc = SUC[st.c], a = $("arma-wa"), t = $("arma-tel");
    a.href = window.CamenWa ? window.CamenWa(suc.num, msg()) : a.href;
    t.href = "tel:+52" + suc.tel.replace(/\s/g, "");
    t.textContent = "O llama a " + suc.n + ": " + suc.tel;
    var ex = window.CamenExtras || [], e = $("extras");
    e.hidden = !ex.length;
    if (ex.length) e.textContent = "También llevas: " + ex.join(", ") + ".";
  }

  function btns(id, items, cls, cur, html) {
    var box = $(id); box.innerHTML = "";
    items.forEach(function (it, i) {
      var b = document.createElement("button");
      b.type = "button"; b.className = cls; b.innerHTML = html(it, i);
      b.setAttribute("aria-pressed", i === cur ? "true" : "false");
      box.appendChild(b);
    });
  }
  function press(id, idx) { var bs = $(id).children; for (var i = 0; i < bs.length; i++) bs[i].setAttribute("aria-pressed", i === idx ? "true" : "false"); }

  btns("sizes", SIZES, "sz", 2, function (o) { return "<b>" + o.n + "</b><small>" + (o.t || (o.n === 1 ? "persona" : "personas")) + "</small>"; });
  btns("sabs", SAB, "sb", st.s, function (o) { return '<i style="background:' + o[1] + '"></i>' + o[0]; });
  btns("dias", DIAS, "dy", st.d, function (o) { return o; });
  btns("sucs", SUC, "sc", st.c, function (o) { return o.n; });

  $("sizes").addEventListener("click", function (e) { var b = e.target.closest(".sz"); if (!b) return; var i = [].indexOf.call($("sizes").children, b); st.n = SIZES[i].n; press("sizes", i); draw(); precio(); link(); });
  $("sabs").addEventListener("click", function (e) { var b = e.target.closest(".sb"); if (!b) return; var i = [].indexOf.call($("sabs").children, b); st.s = i; press("sabs", i); draw(); precio(); link(); });
  $("dias").addEventListener("click", function (e) { var b = e.target.closest(".dy"); if (!b) return; var i = [].indexOf.call($("dias").children, b); st.d = i; press("dias", i); link(); });
  $("sucs").addEventListener("click", function (e) { var b = e.target.closest(".sc"); if (!b) return; var i = [].indexOf.call($("sucs").children, b); st.c = i; press("sucs", i); link(); });
  window.addEventListener("camen:extras", link);
  draw(); precio(); link();
})();
