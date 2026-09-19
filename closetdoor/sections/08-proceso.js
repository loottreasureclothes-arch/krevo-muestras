/* 08 PROCESO
   - La cinta metrica se desenrolla ligada al scroll: scrub leve (0.6 s de alcance), tramo corto,
     SIN pin (decision de Emanuel: nada de secciones fijas ni scroll eterno).
   - Cada paso se enciende solo cuando entra a la pantalla (IntersectionObserver): marca roja, texto y el
     icono que se dibuja trazo por trazo. Con red de seguridad: a los 1.8 s todo queda visible.
   Skills: GSAP ScrollTrigger (scrub numerico, once en los pasos, matchMedia por ancho y reduced
   motion, ScrollTrigger en el timeline y no en tweens hijos), GSAP timeline (defaults + position),
   Emil (dibujar trazos = movimiento en pantalla -> in-out; entradas ease-out; stagger 60-120 ms),
   Impeccable (el estado por defecto es visible: si GSAP no llega, todo queda completo). */
(function () {
  /* limpia estilos en línea sin depender de GSAP (si su reloj se atora, gsap.set tampoco corre) */
  function clr(els, props) {
    if (!els) return;
    if (els.nodeType) els = [els];
    Array.prototype.forEach.call(els, function (el) {
      props.forEach(function (p) { el.style.removeProperty(p); });
      if (el._gsap) { el._gsap.uncache = 1; }
    });
  }
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
  sec.classList.add("js-rv");
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
  Array.prototype.forEach.call(blocks, function (el) { io.observe(el); });
  /* red de seguridad (FEEDBACK-2 #6): a los 1.6 s de asomarse, titulo, estuche y boton quedan visibles */
  var fio = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      fio.unobserve(e.target);
      var el = e.target;
      setTimeout(function () { el.classList.add("is-in"); }, 1600);
    });
  }, { rootMargin: "0px 0px -25% 0px" });
  Array.prototype.forEach.call(blocks, function (el) { fio.observe(el); });

  function run(gsap, ST) {
    var body = sec.querySelector(".s-proc-body");
    var strip = sec.querySelector(".s-tape-strip");
    var list = sec.querySelector(".s-proc-steps");
    var steps = gsap.utils.toArray(sec.querySelectorAll(".s-proc-steps li"));
    var mm = gsap.matchMedia();

    mm.add({ wide: "(min-width: 900px)", narrow: "(max-width: 899px)" }, function (ctx) {
      var wide = ctx.conditions.wide;
      var cleanupSteps = [];
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
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var sio = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { sio.unobserve(e.target); e.target.__play(); } });
      }, { rootMargin: "0px 0px -20% 0px" });
      steps.forEach(function (li, i) {
        var ico = li.querySelector(".s-proc-ico");
        var paths = li.querySelectorAll(".s-proc-ico path");
        var txt = li.querySelectorAll(".s-proc-n, h3, p");
        /* ya en pantalla al iniciar: se deja completo, sin esconder */
        if (li.getBoundingClientRect().top < vh * 0.9) { li.classList.add("is-on"); return; }
        /* el icono se oculta hasta que empieza a trazarse (si no, las puntas redondas dejan puntitos) */
        gsap.set(ico, { autoAlpha: 0 });
        gsap.set(paths, { strokeDashoffset: 1 });
        gsap.set(txt, { autoAlpha: 0, y: 14 });
        var done = false;
        function show() {
          if (done) return; done = true;
          gsap.killTweensOf([ico, paths, txt]);
          li.classList.add("is-on");
          clr(ico, ["opacity", "visibility"]);
          clr(paths, ["stroke-dashoffset"]);
          clr(txt, ["opacity", "visibility", "transform", "translate", "rotate", "scale"]);
        }
        li.__play = function () {
          if (li.__played) return; li.__played = true;
          var tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            /* en compu los 3 pasos estan a la misma altura: se encienden en orden, siguiendo la cinta */
            delay: wide ? i * 0.22 : 0,
            onStart: function () { li.classList.add("is-on"); },
            onComplete: show
          });
          tl.set(ico, { autoAlpha: 1 }, 0.08)
            .to(paths, { strokeDashoffset: 0, duration: 0.45, ease: "power2.inOut", stagger: 0.1 }, 0.08)
            .to(txt, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06, clearProps: "transform" }, 0.12);
          setTimeout(show, 1800 + (wide ? i * 220 : 0));
        };
        sio.observe(li);
        /* si el disparo nunca llega, a los 1.8 s de asomarse el paso queda completo */
        var gio = new IntersectionObserver(function (es) {
          if (es[0].isIntersecting) { gio.disconnect(); setTimeout(show, 1800 + (wide ? i * 220 : 0)); }
        }, { rootMargin: "0px 0px -25% 0px" });
        gio.observe(li);
        cleanupSteps.push(function () { gio.disconnect(); });
        cleanupSteps.push(function () { sio.unobserve(li); show(); });
      });

      return function () {
        cleanupSteps.forEach(function (f) { f(); });
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
