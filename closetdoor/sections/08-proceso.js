/* 08 PROCESO
   - La cinta metrica se desenrolla ligada al scroll: scrub leve (0.6 s de alcance), tramo corto,
     SIN pin (decision de Emanuel: nada de secciones fijas ni scroll eterno).
   - Cada paso se enciende solo cuando la cinta llega a el: marca roja, texto y el icono que se
     dibuja trazo por trazo en secuencia.
   Skills: GSAP ScrollTrigger (scrub numerico, once en los pasos, matchMedia por ancho y reduced
   motion, ScrollTrigger en el timeline y no en tweens hijos), GSAP timeline (defaults + position),
   Emil (dibujar trazos = movimiento en pantalla -> in-out; entradas ease-out; stagger 60-120 ms),
   Impeccable (el estado por defecto es visible: si GSAP no llega, todo queda completo). */
(function () {
  var sec = document.getElementById("proceso");
  if (!sec) return;
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* numeros de la cinta: uno cada 40px, segun el largo real */
  var nums = sec.querySelector(".s-tape-nums");
  var last = -1;
  function fill() {
    if (!nums) return;
    var wide = window.matchMedia("(min-width: 900px)").matches;
    var len = wide ? nums.offsetWidth : nums.offsetHeight;
    var n = Math.max(0, Math.floor(len / 40));
    if (n === last) return;
    last = n;
    var html = "";
    for (var i = 0; i < n; i++) html += "<span>" + (i ? i : "") + "</span>";
    nums.innerHTML = html;
  }
  fill();
  var rt;
  window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(fill, 150); });

  /* titulo, estuche y boton: IntersectionObserver + CSS */
  var blocks = sec.querySelectorAll(".s-proc-h, .s-proc-body, .s-proc-cta");
  if (still || !("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(blocks, function (el) { el.classList.add("is-in"); });
    return;
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
  Array.prototype.forEach.call(blocks, function (el) { io.observe(el); });

  function run(gsap, ST) {
    var body = sec.querySelector(".s-proc-body");
    var strip = sec.querySelector(".s-tape-strip");
    var list = sec.querySelector(".s-proc-steps");
    var steps = gsap.utils.toArray(sec.querySelectorAll(".s-proc-steps li"));
    var mm = gsap.matchMedia();

    mm.add({ wide: "(min-width: 900px)", narrow: "(max-width: 899px)" }, function (ctx) {
      var wide = ctx.conditions.wide;
      list.classList.add("js-anim");

      /* 1) cinta ligada al scroll: tramo corto (unos 55% de pantalla), scrub leve, sin pin */
      gsap.fromTo(strip, wide ? { xPercent: -100 } : { yPercent: -100 }, {
        xPercent: 0, yPercent: 0, ease: "none",
        scrollTrigger: {
          trigger: body,
          start: wide ? "top 88%" : "top 82%",
          end: wide ? "top 38%" : "bottom 70%",
          scrub: 0.6
        }
      });

      /* 2) cada paso se enciende solo, una vez, cuando la cinta lo alcanza */
      steps.forEach(function (li, i) {
        var ico = li.querySelector(".s-proc-ico");
        var paths = li.querySelectorAll(".s-proc-ico path");
        var txt = li.querySelectorAll(".s-proc-n, h3, p");
        /* el icono se oculta hasta que empieza a trazarse (si no, las puntas redondas dejan puntitos) */
        gsap.set(ico, { autoAlpha: 0 });
        gsap.set(paths, { strokeDashoffset: 1 });
        gsap.set(txt, { autoAlpha: 0, y: 14 });
        var tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          /* en compu los 3 pasos estan a la misma altura: se encienden en orden, siguiendo la cinta */
          delay: wide ? i * 0.22 : 0,
          scrollTrigger: { trigger: li, start: wide ? "top 80%" : "top 76%", once: true },
          onStart: function () { li.classList.add("is-on"); }
        });
        tl.set(ico, { autoAlpha: 1 }, 0.08)
          .to(paths, { strokeDashoffset: 0, duration: 0.45, ease: "power2.inOut", stagger: 0.1 }, 0.08)
          .to(txt, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06, clearProps: "transform" }, 0.12);
      });

      return function () {
        list.classList.remove("js-anim");
        steps.forEach(function (li) { li.classList.remove("is-on"); });
      };
    });
  }

  var tries = 0;
  (function boot() {
    if (window.gsap && window.ScrollTrigger) { window.gsap.registerPlugin(window.ScrollTrigger); run(window.gsap, window.ScrollTrigger); return; }
    if (++tries < 40) setTimeout(boot, 100); /* sin GSAP: cinta y pasos quedan completos (estado por defecto) */
  })();
})();
