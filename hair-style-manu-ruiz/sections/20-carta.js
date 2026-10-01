/* La carta de color: elegir mechon, cambiar foto con cruce, guardar el tono. */
(function () {
  "use strict";
  var MR = window.MR; if (!MR) return;
  var fan = document.getElementById("mr-fan"); if (!fan) return;
  var strands = Array.prototype.slice.call(fan.querySelectorAll(".mr-strand"));
  var photos = Array.prototype.slice.call(document.querySelectorAll("#mr-stage .mr-ph"));
  var cur = -1;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function show(i, fromUser) {
    i = (i + strands.length) % strands.length;
    if (i === cur) return;
    cur = i;
    strands.forEach(function (s, k) {
      var on = k === i;
      s.classList.toggle("is-sel", on);
      s.setAttribute("aria-checked", on ? "true" : "false");
      s.tabIndex = on ? 0 : -1;
    });
    photos.forEach(function (p, k) { p.classList.toggle("is-on", k === i); });
    if (fromUser) {
      /* centra el mechon en la tira (solo la tira, sin mover la pagina) */
      var s = strands[i];
      if (fan.scrollWidth > fan.clientWidth + 2) {
        var left = s.offsetLeft - (fan.clientWidth - s.offsetWidth) / 2;
        try { fan.scrollTo({ left: left, behavior: reduce ? "auto" : "smooth" }); } catch (e) { fan.scrollLeft = left; }
      }
    }
  }
  strands.forEach(function (s, k) {
    s.addEventListener("click", function () { show(k, true); });
    s.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); show(cur + 1, true); strands[cur].focus({ preventScroll: true }); }
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); show(cur - 1, true); strands[cur].focus({ preventScroll: true }); }
      else if (e.key === "Home") { e.preventDefault(); show(0, true); strands[0].focus({ preventScroll: true }); }
      else if (e.key === "End") { e.preventDefault(); show(strands.length - 1, true); strands[cur].focus({ preventScroll: true }); }
    });
  });
  var prev = document.getElementById("mr-prev"), next = document.getElementById("mr-next");
  if (prev) prev.addEventListener("click", function () { show(cur - 1, true); });
  if (next) next.addEventListener("click", function () { show(cur + 1, true); });

  /* swipe horizontal sobre la foto */
  var stage = document.getElementById("mr-stage"), sx = null, sy = null;
  stage.addEventListener("touchstart", function (e) { var t = e.changedTouches[0]; sx = t.clientX; sy = t.clientY; }, { passive: true });
  stage.addEventListener("touchend", function (e) {
    if (sx === null) return; var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy; sx = null;
    if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.4) show(cur + (dx < 0 ? 1 : -1), true);
  }, { passive: true });

  /* "Quiero este tono": guarda, repinta el header (barrido) y la liga baja a #cita */
  var pick = document.getElementById("mr-pick");
  if (pick) pick.addEventListener("click", function () { MR.pick(cur); });

  /* si eligen otro tono desde la ficha, la carta lo refleja en silencio */
  MR.onTono(function (d) { if (d.i >= 0 && d.i !== cur) show(d.i, false); });

  /* arranque: el tono guardado, o el Rubio dorado ya "sacado" */
  var start = MR.sel >= 0 ? MR.sel : 1;
  show(start, false);
  strands[cur].tabIndex = 0;
})();
