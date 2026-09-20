/* 03 PROYECTOS: tercia/coverflow con resorte, adaptado de closetdoor/sections/02-trabajos.js (K=130).
   Una tarjeta al frente, dos atrás a los lados en círculo (SIDE=0.82), arrastre con candado de dirección
   y resorte críticamente amortiguado al soltar; salto de la última a la primera con fundido corto, sin
   rebobinar. Blindaje: sin .s-pr-js (JS no llegó) las tarjetas quedan en flujo normal, todas legibles. */
(function () {
  "use strict";
  function init() {
    var sec = document.getElementById("proyectos");
    if (!sec) return;
    var car = sec.querySelector(".s-pr-car");
    var track = sec.querySelector(".s-pr-track");
    var slides = Array.prototype.slice.call(track.querySelectorAll(".s-pr-card"));
    var N = slides.length;
    if (!N) return;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var count = sec.querySelector(".s-pr-count");
    var live = sec.querySelector(".s-pr-live");
    var names = slides.map(function (s) { return (s.querySelector("figcaption b") || {}).textContent || ""; });
    var medias = slides.map(function (s) { return s.querySelector("figure"); });
    var imgs = slides.map(function (s) { return s.querySelector("img"); });

    var p = 0, vel = 0, target = 0, index = -1, on = -1;
    var raf = 0, last = 0, fired = true, seen = false, auto = 0, touched = false, visible = false;
    var CW = 0, CH = 0, SP = 0, SIDE = 0.82;
    function wrap(i) { return ((Math.round(i) % N) + N) % N; }
    function circ(o) { return ((o % N) + N + N / 2) % N - N / 2; }
    function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
    function pad(n) { return (n < 10 ? "0" : "") + n; }

    function measure() {
      CW = slides[0].offsetWidth || 300;
      CH = medias[0] ? medias[0].offsetHeight : CW * 1.25;
      /* En compu las de los lados iban 59 % tapadas detras de la del frente (SP = CW*SIDE/2+7 = 163 px
         contra 380 px de tarjeta). Ahi se separan de verdad y llenan el carrusel; en celular se queda
         el asomo lateral, que ahi si es lo correcto. */
      SP = window.innerWidth >= 900 ? CW * (1 + SIDE) / 2 + 14 : CW * SIDE / 2 + 7;
      track.style.height = Math.round(CH + 60) + "px";
      render();
    }

    function render() {
      var front = wrap(p);
      for (var k = 0; k < N; k++) {
        var o = circ(k - p), ao = Math.abs(o);
        var sg = o < 0 ? -1 : 1, m1 = Math.min(ao, 1), m2 = Math.max(0, ao - 1);
        var x = sg * (m1 * SP + m2 * SP * 0.55);
        var sc = 1 - m1 * (1 - SIDE) - m2 * 0.08;
        var y = m1 * CH * 0.13 + m2 * CH * 0.04;
        var op = ao <= 1 ? 1 : Math.max(0, 1 - (ao - 1) / 0.6);
        slides[k].style.transform = "translate3d(" + x.toFixed(2) + "px," + y.toFixed(2) + "px,0) scale(" + sc.toFixed(4) + ")";
        slides[k].style.zIndex = String(100 - Math.round(ao * 20));
        slides[k].style.opacity = op.toFixed(3);
        slides[k].style.visibility = op > 0 ? "" : "hidden";
        slides[k].setAttribute("aria-hidden", k === front ? "false" : "true");
        var a = slides[k].querySelector(".s-pr-go"); if (a) a.tabIndex = k === front ? 0 : -1;
      }
      if (count) count.textContent = pad(front + 1) + " / " + pad(N);
      setIndex(front);
    }

    function setIndex(i) {
      if (i === index) return;
      index = i;
    }
    function settle(i) {
      fired = true;
      if (!seen || on === i) return;
      on = i;
      slides.forEach(function (s, k) { s.classList.toggle("is-on", k === i); });
      if (live) live.textContent = names[i] + ", " + (i + 1) + " de " + N;
    }

    // Resorte críticamente amortiguado (sin rebote), en unidades de "tarjetas" — igual a 02-trabajos.js
    var K = 130, C = 2 * Math.sqrt(130);
    function loop(now) {
      var dt = Math.min(0.034, (now - last) / 1000 || 0.016);
      last = now;
      for (var s = 0; s < 4; s++) {
        var h = dt / 4;
        var acc = -K * (p - target) - C * vel;
        vel += acc * h; p += vel * h;
      }
      if (!fired && Math.abs(p - target) < 0.04) settle(wrap(target));
      if (Math.abs(p - target) < 0.0006 && Math.abs(vel) < 0.02) {
        target = wrap(target); p = target; vel = 0; raf = 0; render(); if (!fired) settle(target);
        return;
      }
      render();
      raf = requestAnimationFrame(loop);
    }
    function animateTo(t, v0) {
      target = t; fired = false;
      if (typeof v0 === "number") vel = clamp(v0, -9, 9);
      if (reduce) { p = t; vel = 0; render(); settle(wrap(t)); return; }
      if (!raf) { last = performance.now(); raf = requestAnimationFrame(loop); }
    }
    function stopAnim() { if (raf) cancelAnimationFrame(raf); raf = 0; }
    function go(i) {
      if (!raf && (target < 0 || target >= N)) target = p = wrap(target);
      animateTo(target + circ(i - target));
    }

    // Arrastre: dedo o mouse, con candado de direccion (igual patrón que 02-trabajos.js)
    var drag = null, suppress = false;
    track.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, lock: 0, p0: p, from: target, hist: [[e.timeStamp, e.clientX]] };
    });
    track.addEventListener("pointermove", function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.lock) {
        if (Math.abs(dx) < 7 && Math.abs(dy) < 7) return;
        if (Math.abs(dy) >= Math.abs(dx)) { drag = null; return; }
        drag.lock = 1;
        user();
        stopAnim();
        drag.p0 = p; drag.from = Math.round(target);
        track.classList.add("is-drag");
        try { track.setPointerCapture(e.pointerId); } catch (x) {}
      }
      var step = SP * 1.2 || 1;
      var np = drag.p0 - dx / step;
      var lo = drag.from - 1, hi = drag.from + 1;
      if (np < lo) np = lo - (lo - np) * 0.3;
      if (np > hi) np = hi + (np - hi) * 0.3;
      p = np; vel = 0;
      render();
      drag.hist.push([e.timeStamp, e.clientX]);
      if (drag.hist.length > 12) drag.hist.shift();
    });
    function end(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var d = drag; drag = null;
      track.classList.remove("is-drag");
      if (d.lock !== 1) return;
      suppress = true;
      setTimeout(function () { suppress = false; }, 60);
      var now = d.hist[d.hist.length - 1], old = d.hist[0];
      for (var i = d.hist.length - 1; i >= 0; i--) { old = d.hist[i]; if (now[0] - d.hist[i][0] > 90) break; }
      var dtm = Math.max(1, now[0] - old[0]);
      var v = e.type === "pointercancel" ? 0 : (now[1] - old[1]) / dtm;
      if (now[0] - old[0] > 180 && Math.abs(v) < 0.2) v = 0;
      var moved = p - d.from, dir = 0;
      if (Math.abs(v) > 0.3) dir = v < 0 ? 1 : -1;
      else if (Math.abs(moved) > 0.18) dir = moved > 0 ? 1 : -1;
      var step = SP * 1.2 || 1;
      animateTo(d.from + dir, dir ? clamp(-v * 1000 / step, -6, 6) : 0);
    }
    track.addEventListener("pointerup", end);
    track.addEventListener("pointercancel", end);
    track.addEventListener("lostpointercapture", function (e) { if (e.target === track && drag && drag.lock === 1) end(e); });
    track.addEventListener("dragstart", function (e) { e.preventDefault(); });

    // Tocar una tarjeta de lado la trae al frente; tras arrastrar, no sigue el link
    track.addEventListener("click", function (e) {
      if (suppress) { e.preventDefault(); e.stopPropagation(); return; }
      var s = e.target.closest(".s-pr-card");
      if (!s) return;
      var k = slides.indexOf(s);
      if (k !== wrap(target)) { e.preventDefault(); user(); go(k); }
    }, true);

    sec.addEventListener("click", function (e) {
      var b = e.target.closest(".s-pr-btn");
      if (b) { user(); go(target + parseInt(b.getAttribute("data-dir"), 10)); }
    });
    car.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); user(); go(target + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); user(); go(target - 1); }
      else if (e.key === "Home") { e.preventDefault(); user(); go(0); }
      else if (e.key === "End") { e.preventDefault(); user(); go(N - 1); }
    });

    // Autoplay suave: solo mientras se ve y hasta que la persona toque algo
    function user() { touched = true; if (auto) { clearInterval(auto); auto = 0; } }
    function tick() { if (touched || !visible || document.hidden || drag || raf) return; go(target + 1); }

    sec.classList.add("s-pr-js");
    measure();
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting && en.intersectionRatio >= 0.35 && !seen) { seen = true; on = -1; settle(target); }
          visible = en.isIntersecting && en.intersectionRatio >= 0.5;
        });
      }, { threshold: [0, 0.35, 0.5, 1] }).observe(car);
      if (!reduce) auto = setInterval(tick, 5600);
      var fio = new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) { fio.disconnect(); setTimeout(function () { if (!seen) { seen = true; on = -1; settle(target); } }, 1600); }
      }, { rootMargin: "0px 0px -25% 0px" });
      fio.observe(car);
    } else { seen = true; settle(0); }

    var rz = 0;
    window.addEventListener("resize", function () { cancelAnimationFrame(rz); rz = requestAnimationFrame(measure); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    window.addEventListener("load", measure);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
