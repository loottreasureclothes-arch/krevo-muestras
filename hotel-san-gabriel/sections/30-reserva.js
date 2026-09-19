/* 30 Reserva: fechas (mín. hoy), noches, huéspedes, extras; SG.reservar(room) preselecciona y baja; manda a WhatsApp 523173892964 */
(function () {
  "use strict";
  var sec = document.getElementById("reserva"), form = document.getElementById("rs-form");
  if (!sec || !form) return;
  var fIn = form.elements["in"], fOut = form.elements.out, room = form.elements.room;
  var nights = form.querySelector(".rs-nights"), err = form.querySelector(".rs-err"), fb = form.querySelector(".sg-wa-fb");
  var cnt = { ad: 2, ni: 0 };
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function iso(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function parse(v) { var p = v.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function bonita(v) { try { return parse(v).toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" }); } catch (e) { return v; } }
  var t = new Date(); fIn.min = iso(t); fOut.min = iso(new Date(t.getFullYear(), t.getMonth(), t.getDate() + 1));
  function calc() {
    if (fIn.value) { var m = parse(fIn.value); m.setDate(m.getDate() + 1); fOut.min = iso(m); if (!fOut.value || fOut.value <= fIn.value) fOut.value = iso(m); }
    var n = fIn.value && fOut.value ? Math.round((parse(fOut.value) - parse(fIn.value)) / 864e5) : 0;
    nights.textContent = n > 0 ? n + (n === 1 ? " noche" : " noches") : "";
    return n;
  }
  fIn.addEventListener("change", calc); fOut.addEventListener("change", calc);
  form.addEventListener("click", function (e) {
    var b = e.target.closest(".rs-step-in button");
    if (b) { var f = b.getAttribute("data-f"); cnt[f] = Math.max(f === "ad" ? 1 : 0, Math.min(12, cnt[f] + +b.getAttribute("data-s"))); form.elements[f].value = cnt[f]; return; }
    var c = e.target.closest(".sg-chip");
    if (c) c.setAttribute("aria-pressed", c.getAttribute("aria-pressed") === "true" ? "false" : "true");
  });
  if (window.SG) SG.reservar = function (r, extra) {
    if (extra) { var xc = form.querySelector('.sg-chip[data-v="' + extra + '"]'); if (xc) xc.setAttribute("aria-pressed", "true"); }
    if (r) {
      var has = Array.prototype.some.call(room.options, function (o) { return o.value === r || o.text === r; });
      if (!has) { var o = document.createElement("option"); o.text = r; room.add(o); }
      room.value = r;
      if (r.indexOf("romántica") > -1) { var ch = form.querySelector('[data-v="Decoración romántica"]'); if (ch) ch.setAttribute("aria-pressed", "true"); }
    }
    SG.goTo(sec);
    setTimeout(function () { try { (fIn.value ? form.querySelector(".rs-send") : fIn).focus({ preventScroll: true }); } catch (e) {} }, 700);
  };
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var n = calc(), ok = n > 0;
    fIn.closest(".sg-field").classList.toggle("is-bad", !fIn.value);
    fOut.closest(".sg-field").classList.toggle("is-bad", !ok);
    err.textContent = !fIn.value ? "Elige tu fecha de llegada y de salida." : "Revisa las fechas: la salida va después de la llegada.";
    err.hidden = ok;
    if (!ok) { (fIn.value ? fOut : fIn).focus(); return; }
    var ex = Array.prototype.map.call(form.querySelectorAll('.sg-chip[aria-pressed="true"]'), function (c) { return c.getAttribute("data-v"); });
    var nombre = form.elements.nombre.value.trim();
    var mz = room.value === "Hotel Matriz";
    var msg = "Hola, quiero reservar en Hotel San Gabriel " + (mz ? "Matriz" : "Justin") + ".\n" +
      "Habitación: " + (!room.value || mz ? "la que me recomienden" : room.value) + "\n" +
      "Llegada: " + bonita(fIn.value) + "\nSalida: " + bonita(fOut.value) + " (" + n + (n === 1 ? " noche" : " noches") + ")\n" +
      "Huéspedes: " + cnt.ad + (cnt.ad === 1 ? " adulto" : " adultos") + (cnt.ni ? " y " + cnt.ni + (cnt.ni === 1 ? " niño" : " niños") : "") +
      (ex.length ? "\nExtras: " + ex.join(", ") : "") +
      (nombre ? "\nNombre: " + nombre : "") + "\n¿Tienen disponibilidad y cuál es la tarifa?";
    if (window.SG) SG.openWa(msg, fb); else window.open("https://wa.me/523173892964?text=" + encodeURIComponent(msg), "_blank");
  });
  form.addEventListener("input", function (e) { var f = e.target.closest(".sg-field"); if (f) f.classList.remove("is-bad"); });
})();
