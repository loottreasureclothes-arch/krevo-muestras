/* 50 · Diez años: la caidita del "2014" (misma técnica que closetdoor/10-msi, adaptada a una caída vertical).
 * Cae con ease-in de gravedad (~620 ms) y pega con un rebote muestreado tipo resorte (~480 ms). Total ~1.1 s, una sola vez.
 * Reposo del CSS = visible en su lugar; solo se arma con scripting + movimiento. Blindaje a 1.6 s si el IO no dispara. */
(function () {
  "use strict";
  var s = document.getElementById("nosotros");
  if (!s) return;
  var wrap = s.querySelector(".nos-y-wrap"), drop = s.querySelector(".nos-y-drop"), bounce = s.querySelector(".nos-y-bounce");
  if (!wrap || !drop || !bounce) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !drop.animate) return; // CSS ya lo deja visible y quieto

  s.classList.add("nos-armed");

  function spring(n, amp, turns, decay, fmt) {
    var k = [];
    for (var i = 0; i <= n; i++) {
      var t = i / n, v = i === n ? 0 : amp * Math.exp(-decay * t) * Math.sin(turns * Math.PI * 2 * t);
      k.push({ transform: fmt(v) });
    }
    return k;
  }

  var played = false;
  function play() {
    if (played) return;
    played = true;
    s.classList.remove("nos-armed");
    drop.animate(
      [{ transform: "translateY(-160%)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }],
      { duration: 620, easing: "cubic-bezier(.55,0,1,.45)", fill: "both" }
    );
    bounce.animate(
      spring(16, 8, 1.4, 4.4, function (v) { return "translateY(" + v.toFixed(2) + "px)"; }),
      { duration: 480, delay: 610, easing: "linear" }
    );
  }

  /* Ojo (L9 del catálogo de motion): nunca observar el elemento que uno mismo recorta con su propio
     transform (Chrome mide el área ya recortada: ratio 0, nunca dispara). Se observa el envoltorio
     (.nos-y-wrap, que no se mueve) y se anima el hijo (.nos-y-drop). */
  var io = new IntersectionObserver(function (es) {
    if (es[0].isIntersecting) { io.disconnect(); play(); }
  }, { threshold: 0.5 });
  io.observe(wrap);

  /* Red de seguridad: si a los 1.6 s de asomarse no ha jugado, se muestra ya en su lugar final */
  var fio = new IntersectionObserver(function (es) {
    if (es[0].isIntersecting) {
      fio.disconnect();
      setTimeout(function () {
        if (!played) { played = true; s.classList.remove("nos-armed"); }
      }, 1600);
    }
  }, { rootMargin: "0px 0px 0px 0px" });
  fio.observe(wrap);

  /* 5 estrellas grandes del 4.6: se encienden una por una (mismo blindaje a 1.6 s) */
  var stars = s.querySelector(".nos-stars");
  if (stars) {
    var sio = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) { stars.classList.add("is-in"); sio.disconnect(); }
    }, { threshold: 0.4 });
    sio.observe(stars);
    var sfio = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) { sfio.disconnect(); setTimeout(function () { stars.classList.add("is-in"); }, 1600); }
    });
    sfio.observe(stars);
  }
})();
