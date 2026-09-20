/* 2 · LA CEJA QUE SE DIBUJA (componente firma).
   Un solo avance --p (0 a 1) que sale de la posición de la escena en la pantalla: ligado al
   scroll, reversible, SIN pin y con requestAnimationFrame. De --p salen los cinco pasos.
   BLINDAJE: el CSS ya deja los cinco pasos en 1 (ceja terminada). Este archivo los pone en 0
   nada más arrancar y los sube con el scroll. Si el motor nunca alcanza a dar una vuelta
   (o algo truena), a los 1.6 s de asomarse se devuelve la ceja TERMINADA. El rescate no mata
   la animación que todavía no se usa: solo entra si el motor no tickeó ni una vez. */
(function () {
  "use strict";
  var scene = document.getElementById("s-ceja");
  if (!scene) return;
  var pasos = Array.prototype.slice.call(document.querySelectorAll("#s-pasos .s-paso"));
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Cinco tramos IGUALES dentro de --p, uno por paso. Dentro de cada tramo el dibujo se
     hace en el primer 74 % y el 26 % restante es MESETA: el paso se queda quieto, encendido
     y legible, antes de que arranque el siguiente. */
  var TRAMOS = [[0, 0.2], [0.2, 0.4], [0.4, 0.6], [0.6, 0.8], [0.8, 1]];
  var MESETA = 0.74;

  function terminada() {
    scene.style.setProperty("--p", "1");
    for (var i = 1; i <= 5; i++) scene.style.setProperty("--s" + i, "1");
    scene.style.setProperty("--mm-i1", "0");
    pasos.forEach(function (li) { li.classList.add("is-on"); });
  }
  if (reduce) { terminada(); return; }

  function clamp(v) { return v < 0 ? 0 : (v > 1 ? 1 : v); }
  function suave(v) { return v * v * (3 - 2 * v); }          /* arranque y final sin brincos */

  var ticks = 0;
  function pinta(p) {
    ticks++;
    scene.style.setProperty("--p", p.toFixed(3));
    for (var i = 0; i < 5; i++) {
      var t = TRAMOS[i];
      var s = suave(clamp((p - t[0]) / ((t[1] - t[0]) * MESETA)));
      scene.style.setProperty("--s" + (i + 1), s.toFixed(3));
      var on = p >= t[0] - 0.015;
      if (on !== pasos[i].classList.contains("is-on")) pasos[i].classList.toggle("is-on", on);
    }
    /* cuánto le falta al laminado para terminar de peinar (1 = revuelto, 0 = peinado) */
    scene.style.setProperty("--mm-i1", (1 - suave(clamp(p / (TRAMOS[0][1] * MESETA)))).toFixed(3));
  }
  pinta(0);                                                   /* arranca en cero, sin parpadeo */

  var raf = null, cerca = false;
  var lista = document.getElementById("s-pasos");
  var esc = document.getElementById("s-esc");
  var viz = scene.querySelector(".s-ceja-viz");
  var hueco = scene.querySelector(".s-ceja-hueco");
  /* El avance sale de la VENTANA PEGAJOSA de la escena, que es justo lo que dura la
     lectura: 0 cuando las dos zonas se pegan, 1 cuando la escena las suelta (con el paso 05
     ya encendido). El recorrido es el HUECO de la escena: en un 390x844 son 700 px, o sea
     140 px de scroll por paso. Nada que medir contra la pantalla y nada que se tape.
     La referencia es la zona MAS ALTA, que es la que se suelta primero.
     OJO: offsetTop de un pegajoso trae el corrimiento, asi que aqui solo se usan alturas
     (offsetHeight, que no se mueve) y los bordes de abajo del rectangulo. */
  function ref() { return (viz && lista && viz.offsetHeight > lista.offsetHeight) ? viz : lista; }
  function avance() {
    var r = scene.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    cerca = r.bottom > -vh * 0.5 && r.top < vh * 1.5;
    if (!esc || !hueco) return 1;
    var largo = hueco.offsetHeight;
    if (largo < 1) return 1;
    return clamp(1 - (esc.getBoundingClientRect().bottom - ref().getBoundingClientRect().bottom) / largo);
  }
  function bucle() {
    raf = null;
    try { pinta(avance()); } catch (e) { terminada(); return; }
    if (cerca) schedule();
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(bucle); }
  schedule();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);

  /* rescate: si a los 1.6 s de asomarse el motor no ha tickeado NI UNA VEZ, ceja terminada */
  (function rescate() {
    var visto = 0, r2 = null;
    function mira() {
      r2 = null;
      var r = scene.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh && r.bottom > 0) {
        var base = ticks;
        setTimeout(function () { if (ticks === base && ticks < 2) terminada(); }, 1600);
        return;
      }
      if (++visto < 4000) { r2 = requestAnimationFrame(mira); }
    }
    mira();
    window.addEventListener("scroll", function () { if (!r2) mira(); }, { passive: true });
  })();
})();
