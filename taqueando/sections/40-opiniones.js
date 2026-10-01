/* EL RESALTADOR: el scroll pasa el marcador amarillo sobre las frases que cada cliente subrayo.
   --p va de 0 (centro de la hoja al 90 % del alto) a 1 (al 55 %). Reversible. A los 1.6 s de entrar la seccion,
   las hojas que se ven completas quedan en 1 pase lo que pase. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function init() {
    var notas = Array.prototype.slice.call(document.querySelectorAll("[data-nota]"));
    var sec = document.getElementById("opiniones");
    if (!notas.length || !sec) return;
    var hl = notas.map(function (n) { return Array.prototype.slice.call(n.querySelectorAll(".tq-hl")); });
    var forced = notas.map(function () { return false; });
    function setP(i, p) { hl[i].forEach(function (s) { s.style.setProperty("--p", p.toFixed(3)); }); }
    if (reduce) { notas.forEach(function (n, i) { setP(i, 1); }); return; }
    /* Cada hoja: si se ve completa 1.6 s seguidos, su resaltador queda en 1 (con cruce corto).
       Si la hoja sale por completo de la pantalla, vuelve a mandar el scroll (reversible). */
    var raf = null, timers = notas.map(function () { return null; });
    function vhNow() { return window.innerHeight || document.documentElement.clientHeight; }
    function update() {
      raf = null;
      var vh = vhNow();
      notas.forEach(function (n, i) {
        var r = n.getBoundingClientRect();
        var full = r.top >= 0 && r.bottom <= vh, out = r.bottom <= 0 || r.top >= vh;
        if (out && forced[i]) { forced[i] = false; n.classList.remove("is-done"); }
        if (full && !forced[i] && !timers[i]) {
          timers[i] = setTimeout(function () {
            timers[i] = null;
            var q = n.getBoundingClientRect(), h = vhNow();
            if (q.top < h && q.bottom > 0) { forced[i] = true; n.classList.add("is-done"); setP(i, 1); }
          }, 1600);
        }
        if (!full && timers[i]) { clearTimeout(timers[i]); timers[i] = null; }
        if (forced[i]) { setP(i, 1); return; }
        var c = r.top + r.height / 2, a = vh * 0.9, b = vh * 0.55;
        setP(i, Math.max(0, Math.min(1, (a - c) / (a - b))));
      });
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(update); }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();

    /* Pedir este: agrega el taco que nombra la resena */
    document.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("[data-add-este]") : null;
      if (!b || !window.Tq) return;
      Tq.add(b.getAttribute("data-add-este"));
      var s = b.querySelector("span"), old = s.textContent;
      s.textContent = "Va a tu charola"; setTimeout(function () { s.textContent = old; }, 1600);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
