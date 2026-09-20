/* El portón: la persiana sube UNA sola vez, cuando la sección ya está a la
   vista del visitante (no antes: ese era el pecado de la ronda 1, un
   setTimeout de 1.6 s desde la carga que la subía a ciegas).
   Blindaje L5: sin JS o con prefers-reduced-motion el tablero ya está visible
   desde el CSS base y la persiana ni existe. Si el IntersectionObserver falla,
   la palanca de scroll la abre con el mismo umbral, y nunca se queda tapando
   el tablero. */
(function () {
  "use strict";
  var shutter = document.getElementById("porton-shutter");
  if (!shutter) return;
  var sec = shutter.closest(".s-porton");
  if (!sec) return;

  var reduced = false;
  try { reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
  if (reduced) return; // CSS base ya muestra el tablero

  try {
    shutter.classList.add("is-armed");
    var opened = false;

    function open() {
      if (opened) return;
      opened = true;
      shutter.classList.add("is-open");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }

    // Umbral unico: la seccion tiene que haber subido hasta el 65 % de la
    // pantalla para que al visitante le de tiempo de ver el movimiento.
    function visibleEnough() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var r = sec.getBoundingClientRect();
      return r.bottom > 0 && r.top < vh * 0.65;
    }

    var queued = false;
    function check() { queued = false; if (visibleEnough()) open(); }
    function onScroll() { if (!queued) { queued = true; requestAnimationFrame(check); } }

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) { open(); io.disconnect(); }
        }
      }, { rootMargin: "0px 0px -35% 0px", threshold: 0 });
      io.observe(sec);
    }

    // Palanca: si el IO no existe o no dispara, el scroll la abre igual. Pase
    // lo que pase, la persiana nunca se queda tapando el tablero.
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    check();
  } catch (e) {
    shutter.classList.remove("is-armed");
  }
})();
