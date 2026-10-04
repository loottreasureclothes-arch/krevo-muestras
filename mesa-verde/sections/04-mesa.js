(function () {
  "use strict";
  var MV = window.MV = window.MV || {};
  var spots = document.getElementById("spots"); if (!spots) return;
  var $ = function (id) { return document.getElementById(id); };
  var fName = $("f-name"), fDia = $("f-dia"), fHora = $("f-hora"), fDog = $("f-dog"), pN = $("p-n"), tickB = $("tick-b"), wa = $("mesa-wa");
  var personas = 2, spot = spots.querySelector(".is-on").getAttribute("data-spot");

  function fechaCorta(d, m) { return d + " de " + ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"][m - 1]; }
  function buildDias() {
    var n = MV.ahora(), opts = [], base = new Date(Date.UTC(n.y, n.mo - 1, n.d));
    for (var i = 0; i < 8 && opts.length < 6; i++) {
      var dt = new Date(base.getTime() + i * 864e5), wd = dt.getUTCDay(), h = MV.HORA[wd];
      if (!h) continue;
      if (i === 0 && n.min > h[1] - 30) continue;
      var lbl = i === 0 ? "hoy" : i === 1 ? "mañana" : MV.DIAS[wd] + " " + fechaCorta(dt.getUTCDate(), dt.getUTCMonth() + 1);
      opts.push({ v: String(wd) + "|" + i, wd: wd, i: i, label: lbl });
    }
    fDia.innerHTML = opts.map(function (o) { return '<option value="' + o.v + '">' + o.label.charAt(0).toUpperCase() + o.label.slice(1) + "</option>"; }).join("");
    MV._dias = opts;
  }
  function buildHoras() {
    var sel = MV._dias[fDia.selectedIndex] || MV._dias[0], h = MV.HORA[sel.wd], n = MV.ahora(), out = [];
    var start = h[0];
    if (sel.i === 0) start = Math.max(start, Math.ceil((n.min + 20) / 30) * 30);
    for (var m = start; m <= h[1] - 30; m += 30) out.push(m);
    fHora.innerHTML = out.map(function (m) { return '<option value="' + m + '">' + MV.fmt(m) + "</option>"; }).join("");
    var pref = out.indexOf(840) >= 0 ? 840 : out[0]; if (pref !== undefined) fHora.value = pref;
  }
  function render() {
    var name = fName.value.trim(), sel = MV._dias[fDia.selectedIndex] || MV._dias[0];
    var hora = fHora.value ? MV.fmt(+fHora.value) : "";
    var dia = sel ? sel.label : "hoy";
    var parts = ["Hola Mesa Verde" + (name ? ", soy " + name : "") + "."];
    parts.push((personas === 1 ? "Voy yo solo" : "Somos " + personas) + " y vamos " + (dia === "hoy" || dia === "mañana" ? dia : "el " + dia) + (hora ? " a las " + hora : "") + ".");
    parts.push((personas === 1 ? "Me gustaría sentarme en " : "Nos gustaría sentarnos en ") + spot + "." + (fDog.checked ? " Va un perro." : ""));
    var msg = parts.join(" ");
    var it = MV.itemsText ? MV.itemsText() : "";
    if (it) msg += "\nQueremos pedir:\n" + it;
    msg += "\n¿Hay lugar?";
    tickB.textContent = msg; wa.setAttribute("data-wa", msg); wa.href = MV.wa(msg);
    var who = name || "tu nombre", cnt = personas + (personas === 1 ? " persona" : " personas");
    [].forEach.call(spots.querySelectorAll(".spot"), function (s) { s.querySelector(".tent-who").textContent = who; s.querySelector(".tent-n").textContent = cnt; });
  }
  spots.addEventListener("click", function (e) {
    var b = e.target.closest(".spot"); if (!b) return;
    [].forEach.call(spots.querySelectorAll(".spot"), function (s) { var on = s === b; s.classList.toggle("is-on", on); s.setAttribute("aria-checked", on ? "true" : "false"); });
    spot = b.getAttribute("data-spot"); render();
  });
  $("p-minus").addEventListener("click", function () { personas = Math.max(1, personas - 1); pN.textContent = personas; render(); });
  $("p-plus").addEventListener("click", function () { personas = Math.min(14, personas + 1); pN.textContent = personas; render(); });
  fName.addEventListener("input", render); fDog.addEventListener("change", render); fHora.addEventListener("change", render);
  fDia.addEventListener("change", function () { buildHoras(); render(); });
  document.addEventListener("mv:items", render);
  window.MV_mesaTest = function () { return { text: tickB.textContent, href: wa.href }; };
  buildDias(); buildHoras(); render();
})();
