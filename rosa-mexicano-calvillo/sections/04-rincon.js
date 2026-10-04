(function () {
  "use strict";
  var R = window.RM; if (!R) return;
  var RIN = {
    mesa: ["Mesa larga con velas", "Para llegar en grupo.", "la mesa larga con velas"],
    piedra: ["Terraza de piedra", "Mesas entre muros de piedra.", "la terraza de piedra"],
    barra: ["Terraza azul con barra", "Techo azul, mosaico y barra.", "la terraza azul con barra"]
  };
  var IMG = { mesa: "Mesa larga con velas y cempasúchil", piedra: "Terraza de piedra con mesas puestas", barra: "Terraza azul con barra y mosaico" };
  var st = { k: "mesa", n: 4, day: null, hour: null, plates: [] };
  var $ = function (id) { return document.getElementById(id); };
  var n0 = R.now(), days = [];
  for (var i = 0; i < 7; i++) {
    var d = new Date(n0.base.getTime() + i * 864e5), dow = d.getUTCDay();
    days.push({ i: i, dow: dow, d: d.getUTCDate(), m: d.getUTCMonth(), open: !!R.HOURS[dow] });
  }
  function lastSeat(dow) { return R.HOURS[dow][1] - 1; }
  function firstHour(day) {
    var a = R.HOURS[day.dow][0];
    if (day.i === 0) a = Math.max(a, n0.h + 1);
    return a;
  }
  function validHours(day) {
    var out = [], a = firstHour(day), b = lastSeat(day.dow);
    for (var h = a; h <= b; h++) out.push(h);
    return out;
  }
  // día inicial: primer día abierto que aún tenga horas
  for (var j = 0; j < days.length; j++) { if (days[j].open && validHours(days[j]).length) { st.day = days[j]; break; } }
  function dayName(d) { return R.DIAS[d.dow]; }
  function paintDays() {
    var box = $("rcDays"); box.innerHTML = "";
    days.forEach(function (d) {
      var b = document.createElement("button"); b.type = "button";
      var ok = d.open && validHours(d).length > 0;
      b.disabled = !ok;
      b.setAttribute("aria-pressed", st.day === d);
      var nm = d.i === 0 ? "Hoy" : d.i === 1 ? "Mañana" : dayName(d).slice(0, 3);
      b.innerHTML = "<small>" + nm + "</small>" + d.d + " " + R.MESES[d.m].slice(0, 3) + (ok ? "" : "<small>Cerrado</small>");
      b.addEventListener("click", function () { st.day = d; var v = validHours(d); if (v.indexOf(st.hour) < 0) st.hour = v.indexOf(14) >= 0 ? 14 : v[0]; render(); });
      box.appendChild(b);
    });
  }
  function paintHours() {
    var box = $("rcHours"); box.innerHTML = "";
    validHours(st.day).forEach(function (h) {
      var b = document.createElement("button"); b.type = "button";
      b.textContent = (h % 12 || 12) + (h < 12 ? " am" : " pm");
      b.setAttribute("aria-pressed", st.hour === h);
      b.addEventListener("click", function () { st.hour = h; render(); });
      box.appendChild(b);
    });
  }
  function lista(a) { return a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " y " + a[a.length - 1]; }
  function message() {
    var d = st.day, r = RIN[st.k][2];
    var m = "Hola, Rosa Mexicano. Quiero reservar mesa para " + st.n + (st.n === 1 ? " persona" : " personas") + " el " + dayName(d) + " " + d.d + " de " + R.MESES[d.m] + " a las " + R.hr(st.hour) + ", en " + r + ".";
    if (st.plates.length) m += " Queremos probar: " + lista(st.plates) + ".";
    return m + " ¿Tienen lugar?";
  }
  function render() {
    paintDays(); paintHours();
    var d = st.day, r = RIN[st.k];
    $("rcN").textContent = st.n;
    $("tkBig").textContent = "Mesa para " + st.n;
    $("tkDia").textContent = dayName(d).charAt(0).toUpperCase() + dayName(d).slice(1) + " " + d.d + " de " + R.MESES[d.m];
    $("tkHora").textContent = R.hr(st.hour);
    $("tkRin").textContent = r[0];
    $("tkPla").textContent = st.plates.length ? "Probar: " + lista(st.plates) : "";
    $("rcName").textContent = r[0]; $("rcSub").textContent = r[1];
    var im = $("rcImg");
    if (im.getAttribute("data-k") !== st.k) {
      var w3 = st.k === "barra" ? 1536 : 1600, ex = IMG[st.k];
      im.style.opacity = 0;
      setTimeout(function () {
        im.src = "img/" + st.k + "-960.webp";
        im.srcset = "img/" + st.k + "-480.webp 480w, img/" + st.k + "-960.webp 960w, img/" + st.k + "-" + w3 + ".webp " + w3 + "w";
        im.alt = ex; im.setAttribute("data-k", st.k); im.style.opacity = 1;
      }, 140);
    }
    var i;
    var rad = document.querySelectorAll(".opts button");
    for (i = 0; i < rad.length; i++) rad[i].setAttribute("aria-checked", rad[i].getAttribute("data-k") === st.k);
    var a = $("rcWa"); a.href = R.waUrl(message());
    $("rcMinus").disabled = st.n <= 1; $("rcPlus").disabled = st.n >= 14;
  }
  st.hour = (function () { var v = validHours(st.day); return v.indexOf(14) >= 0 ? 14 : v[0]; })();
  document.querySelectorAll(".opts button").forEach(function (b) { b.addEventListener("click", function () { st.k = b.getAttribute("data-k"); render(); }); });
  $("rcMinus").addEventListener("click", function () { if (st.n > 1) { st.n--; render(); } });
  $("rcPlus").addEventListener("click", function () { if (st.n < 14) { st.n++; render(); } });
  document.querySelectorAll(".add").forEach(function (b) {
    b.addEventListener("click", function () {
      var p = b.getAttribute("data-plato"), on = b.getAttribute("aria-pressed") !== "true";
      b.setAttribute("aria-pressed", on);
      st.plates = st.plates.filter(function (x) { return x !== p; });
      if (on) st.plates.push(p);
      render();
    });
  });
  render();
})();
