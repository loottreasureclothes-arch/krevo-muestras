/* Abierto ahora (hora de Aguascalientes) + día de hoy resaltado */
(function () {
  var now = document.getElementById("vis-now"), list = document.getElementById("vis-hours");
  if (!now || !list) return;
  var H = { 0: null, 1: [13, 20.5], 2: [13, 20.5], 3: [13, 20.5], 4: [13, 20.5], 5: [13, 20.5], 6: [10, 20.5] };
  function mx() {
    try {
      var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      var dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      return { d: dias[o.weekday], t: (parseInt(o.hour, 10) % 24) + parseInt(o.minute, 10) / 60 };
    } catch (e) { var n = new Date(); return { d: n.getDay(), t: n.getHours() + n.getMinutes() / 60 }; }
  }
  function pinta() {
    var m = mx(), h = H[m.d];
    Array.prototype.forEach.call(list.children, function (li) { li.classList.toggle("is-today", parseInt(li.getAttribute("data-d"), 10) === m.d); });
    var abierto = h && m.t >= h[0] && m.t < h[1];
    now.classList.toggle("is-open", !!abierto);
    if (abierto) now.textContent = "Abierto ahora, cerramos 8:30 pm";
    else if (h && m.t < h[0]) now.textContent = "Cerrado ahora, abrimos hoy " + (h[0] === 13 ? "1:00 pm" : "10:00 am");
    else now.textContent = "Cerrado ahora";
  }
  pinta(); setInterval(pinta, 60000);
})();
