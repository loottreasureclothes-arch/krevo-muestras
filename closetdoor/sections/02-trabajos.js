/* 02 Trabajos: slider propio. La tarjeta sigue al dedo 1:1, un flick avanza solo 1,
   el vertical deja pasar el scroll, resorte al soltar, parallax interno y cinta metrica.
   Profundidad: las tarjetas entran desde el fondo al llegar a la seccion (una vez), se inclinan
   con la velocidad del arrastre y, en compu, la del frente sigue al mouse. */
(function () {
  "use strict";
  function init() {
    var sec = document.getElementById("trabajos");
    if (!sec) return;
    var car = sec.querySelector(".tj-car");
    var track = sec.querySelector(".tj-track");
    var slides = Array.prototype.slice.call(track.querySelectorAll(".tj-slide"));
    var N = slides.length;
    if (!N) return;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var tape = sec.querySelector(".tj-tape");
    var rail = sec.querySelector(".tj-rail");
    var stopsWrap = sec.querySelector(".tj-stops");
    var live = sec.querySelector(".tj-live");
    var names = slides.map(function (s) { return (s.querySelector(".tj-title") || {}).textContent || ""; });
    var medias = slides.map(function (s) { return s.querySelector(".tj-media"); });
    var imgs = slides.map(function (s) { return s.querySelector(".tj-media img"); });
    var copies = slides.map(function (s) { return s.querySelector(".tj-copy"); });
    var tilt = 0, tiltGoal = 0, hov = { x: 0, y: 0, gx: 0, gy: 0 }, entering = false;

    var p = 0, vel = 0, target = 0, index = -1, on = -1, step = 1, railW = 0;
    var raf = 0, last = 0, fired = true, seen = false, auto = 0, touched = false, visible = false;

    function pad(n) { return (n < 10 ? "0" : "") + n; }
    // Celular: "tercia" tipo coverflow (una al frente, dos atras a los lados, en circulo).
    var mqCover = window.matchMedia ? window.matchMedia("(max-width: 899px)") : { matches: false };
    var cover = false, CW = 0, CH = 0, SP = 0, SIDE = 0.82;
    function wrap(i) { return ((Math.round(i) % N) + N) % N; }
    function circ(o) { return cover ? ((o % N) + N + N / 2) % N - N / 2 : o; }
    function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

    // Cinta: un tope por proyecto
    var stops = slides.map(function (s, i) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "tj-stop";
      b.setAttribute("aria-label", "Ver " + names[i]);
      b.innerHTML = "<span>" + pad(i + 1) + "</span>";
      b.addEventListener("click", function () { user(); go(i); });
      stopsWrap.appendChild(b);
      return b;
    });

    function measure() {
      var was = cover;
      cover = !!mqCover.matches && N > 2;
      sec.classList.toggle("tj-cover", cover);
      if (was && !cover) { // volver a la fila normal: limpiar lo que puso la tercia
        slides.forEach(function (s) { s.style.transform = ""; s.style.zIndex = ""; s.style.opacity = ""; s.style.visibility = ""; s.classList.remove("tj-l", "tj-r"); });
        track.style.height = ""; p = target = wrap(target);
      }
      if (cover) {
        CW = slides[0].offsetWidth; CH = medias[0] ? medias[0].offsetHeight : CW * 1.25;
        SP = CW * SIDE / 2 + 7;                  // las de atras quedan a 7px del centro: sus talones no se enciman
        step = SP * 1.2;                         // el dedo mueve una tarjeta cada ~1.2 separaciones
        track.style.height = Math.round(CH + CH * 0.2) + "px";
        railW = rail.offsetWidth;
        render();
        return;
      }
      step = N > 1 ? (slides[1].offsetLeft - slides[0].offsetLeft) : slides[0].offsetWidth;
      if (!step) step = slides[0].offsetWidth || 1;
      railW = rail.offsetWidth;
      render();
    }

    function render() {
      track.style.transform = cover ? "none" : "translate3d(" + (-p * step).toFixed(2) + "px,0,0)";
      // inclinacion por velocidad: se suaviza para que no tiemble
      tilt += (tiltGoal - tilt) * 0.3;
      if (Math.abs(tilt) < 0.02) tilt = 0;
      var front = cover ? wrap(p) : Math.round(p);
      for (var k = 0; k < N; k++) {
        var o = circ(k - p), ao = Math.abs(o), a = reduce ? (k === front ? 0 : 1) : Math.min(ao, 1);
        if (cover) {
          // frente: escala 1. Lados: 0.82, hundidas (bajan) y detras. Mas alla de 1.6 se desvanecen.
          var sg = o < 0 ? -1 : 1, m1 = Math.min(ao, 1), m2 = Math.max(0, ao - 1);
          var x = sg * (m1 * SP + m2 * SP * 0.55);
          var sc = 1 - m1 * (1 - SIDE) - m2 * 0.08;
          var y = m1 * CH * 0.13 + m2 * CH * 0.04;
          var op = ao <= 1 ? 1 : Math.max(0, 1 - (ao - 1) / 0.6);
          slides[k].style.transform = "translate3d(" + x.toFixed(2) + "px," + y.toFixed(2) + "px,0) scale(" + sc.toFixed(4) + ")";
          slides[k].style.zIndex = String(100 - Math.round(ao * 20));
          slides[k].style.opacity = op.toFixed(3);
          slides[k].style.visibility = op > 0 ? "" : "hidden";
          slides[k].classList.toggle("tj-l", o < -0.5);
          slides[k].classList.toggle("tj-r", o > 0.5);
          if (ao > 1.7) continue;
        } else if (ao > 2.2) continue;
        slides[k].style.setProperty("--a", a.toFixed(4)); // solo lo usa el velo (::after)
        var ry = reduce ? 0 : tilt, rx = 0;
        if (k === front && !reduce) { ry += hov.x * 5; rx = -hov.y * 4; }
        if (medias[k] && !entering) medias[k].style.transform = "perspective(1100px) rotateX(" + rx.toFixed(3) + "deg) rotateY(" + ry.toFixed(3) + "deg) scale(" + (cover ? 1 : 1 - a * 0.075).toFixed(4) + ")";
        if (imgs[k]) imgs[k].style.transform = "translate3d(" + (reduce ? 0 : clamp(o, -1, 1) * -9 - hov.x * 2).toFixed(3) + "%," + (reduce ? 0 : -hov.y * 1.5).toFixed(3) + "%,0)";
        // el nombre se ve SIEMPRE en todas las tarjetas (Emanuel); descripcion y "Cotizar" solo en la del frente (CSS)
      }
      var prog = ((cover ? ((p % N) + N) % N : clamp(p, 0, N - 1)) + 1) / N;
      if (cover && prog > 1) prog = 1;
      tape.style.setProperty("--tj-p", (prog * 100).toFixed(3) + "%");
      tape.style.setProperty("--tj-px", (prog * railW).toFixed(1) + "px");
      setIndex(cover ? wrap(p) : clamp(Math.round(p), 0, N - 1));
    }

    function setIndex(i) {
      if (i === index) return;
      index = i;
      stops.forEach(function (b, k) { b.setAttribute("aria-current", k === i ? "true" : "false"); });
      slides.forEach(function (s, k) {
        var off = k !== i;
        s.setAttribute("aria-hidden", off ? "true" : "false");
        var a = s.querySelector(".tj-cta");
        if (a) a.tabIndex = off ? -1 : 0;
      });
    }

    // El titulo entra cuando la tarjeta se asienta
    function settle(i) {
      fired = true;
      if (!seen) return;
      if (on === i) return;
      on = i;
      slides.forEach(function (s, k) { s.classList.toggle("is-on", k === i); });
      if (live) live.textContent = names[i] + ", " + (i + 1) + " de " + N;
    }

    // Resorte criticamente amortiguado (sin rebote), en unidades de "tarjetas"
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
      tiltGoal = clamp(-vel * 3.2, -9, 9);
      if (Math.abs(p - target) < 0.0006 && Math.abs(vel) < 0.02) {
        if (cover) target = wrap(target);
        p = target; vel = 0; raf = 0; tiltGoal = tilt = 0; render(); if (!fired) settle(target);
        return;
      }
      render();
      raf = requestAnimationFrame(loop);
    }
    function animateTo(t, v0) {
      target = t; fired = false;
      if (typeof v0 === "number") vel = clamp(v0, -9, 9);
      if (reduce) { p = t; vel = 0; render(); settle(t); return; }
      if (!raf) { last = performance.now(); raf = requestAnimationFrame(loop); }
    }
    function stopAnim() { if (raf) cancelAnimationFrame(raf); raf = 0; }

    // Saltar de la ultima a la primera (y al reves): fundido, sin rebobinar
    var fading = false;
    function jump(i) {
      if (reduce) { stopAnim(); target = p = i; vel = 0; render(); settle(i); return; }
      fading = true;
      track.classList.add("is-fade");
      setTimeout(function () {
        stopAnim(); target = p = i; vel = 0; render(); fired = false; settle(i);
        var back = function () { if (!fading) return; track.classList.remove("is-fade"); fading = false; };
        requestAnimationFrame(back);
        setTimeout(back, 120); /* si rAF se atora, el carril no se queda en blanco */
      }, 220);
    }
    function go(i) {
      if (fading) return;
      if (cover) { // en circulo: la de un lado pasa al frente, sin rebobinar
        if (!raf && (target < 0 || target >= N)) { target = p = wrap(target); }
        animateTo(target + circ(i - target)); return;
      }
      if (i < 0 || i >= N) { jump((i + N) % N); return; }
      animateTo(i);
    }

    // Arrastre: dedo o mouse, con candado de direccion
    var drag = null, suppress = false;
    track.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (fading) return;
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, lock: 0, p0: p, from: target, hist: [[e.timeStamp, e.clientX]] };
      if (e.pointerType === "mouse") e.preventDefault();
    });
    track.addEventListener("pointermove", function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.lock) {
        if (Math.abs(dx) < 7 && Math.abs(dy) < 7) return;
        if (Math.abs(dy) >= Math.abs(dx)) { drag = null; return; } // es scroll vertical: no tocamos nada
        drag.lock = 1;
        user();
        stopAnim();
        drag.p0 = p; drag.from = cover ? Math.round(target) : clamp(Math.round(target), 0, N - 1);
        track.classList.add("is-drag");
        try { track.setPointerCapture(e.pointerId); } catch (x) {}
      }
      var np = drag.p0 - dx / step;
      // limite suave: a lo mucho una tarjeta desde donde empezaste, y liga en las orillas
      var lo = cover ? drag.from - 1 : Math.max(0, drag.from - 1), hi = cover ? drag.from + 1 : Math.min(N - 1, drag.from + 1);
      if (np < lo) np = lo - (lo - np) * 0.3;
      if (np > hi) np = hi + (np - hi) * 0.3;
      var prev = drag.hist[drag.hist.length - 1], dtd = Math.max(8, e.timeStamp - prev[0]);
      tiltGoal = clamp(((e.clientX - prev[1]) / step) / (dtd / 1000) * 3.2, -9, 9);
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
      // velocidad de los ultimos ~90 ms (px/ms)
      var now = d.hist[d.hist.length - 1], old = d.hist[0];
      for (var i = d.hist.length - 1; i >= 0; i--) { old = d.hist[i]; if (now[0] - d.hist[i][0] > 90) break; }
      var dtm = Math.max(1, now[0] - old[0]);
      var v = e.type === "pointercancel" ? 0 : (now[1] - old[1]) / dtm;
      if (now[0] - old[0] > 180 && Math.abs(v) < 0.2) v = 0;
      var moved = p - d.from, dir = 0;
      if (Math.abs(v) > 0.3) dir = v < 0 ? 1 : -1;
      else if (Math.abs(moved) > 0.18) dir = moved > 0 ? 1 : -1;
      var t = cover ? d.from + dir : clamp(d.from + dir, 0, N - 1);
      animateTo(t, dir ? clamp(-v * 1000 / step, -6, 6) : 0);
    }
    track.addEventListener("pointerup", end);
    track.addEventListener("pointercancel", end);
    track.addEventListener("lostpointercapture", function (e) { if (e.target === track && drag && drag.lock === 1) end(e); });
    track.addEventListener("dragstart", function (e) { e.preventDefault(); });

    // Tras arrastrar, no abrir el link; tocar una tarjeta de lado la trae
    track.addEventListener("click", function (e) {
      if (suppress) { e.preventDefault(); e.stopPropagation(); return; }
      var s = e.target.closest(".tj-slide");
      if (!s) return;
      var k = slides.indexOf(s);
      if (k !== (cover ? wrap(target) : target)) { e.preventDefault(); user(); go(k); }
    }, true);

    // Trackpad horizontal (dos dedos): un paso por gesto
    var wheelAcc = 0, wheelLock = 0;
    track.addEventListener("wheel", function (e) {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      user();
      var now = Date.now();
      if (now < wheelLock) return;
      wheelAcc += e.deltaX;
      if (Math.abs(wheelAcc) > 40) {
        var t = clamp(target + (wheelAcc > 0 ? 1 : -1), 0, N - 1);
        wheelAcc = 0; wheelLock = now + 520;
        animateTo(t);
      }
    }, { passive: false });

    Array.prototype.forEach.call(sec.querySelectorAll("[data-tj]"), function (b) {
      b.addEventListener("click", function () { user(); go(target + parseInt(b.getAttribute("data-tj"), 10)); });
    });
    car.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); user(); go(target + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); user(); go(target - 1); }
      else if (e.key === "Home") { e.preventDefault(); user(); go(0); }
      else if (e.key === "End") { e.preventDefault(); user(); go(N - 1); }
    });

    // Chips del hero (data-go) y API para otras secciones
    Array.prototype.forEach.call(document.querySelectorAll("[data-go]"), function (a) {
      a.addEventListener("click", function () {
        var i = parseInt(a.getAttribute("data-go"), 10);
        if (isNaN(i)) return;
        user();
        setTimeout(function () { enter(); seen = true; go(clamp(i, 0, N - 1)); }, 450);
      });
    });
    window.cdTrabajos = { go: function (i) { user(); seen = true; go(i); }, count: N };

    // Compu: la tarjeta del frente sigue al mouse (se inclina poquito). Resorte con lerp.
    var hovRaf = 0;
    function hovLoop() {
      hov.x += (hov.gx - hov.x) * 0.14; hov.y += (hov.gy - hov.y) * 0.14;
      render();
      if (Math.abs(hov.gx - hov.x) > 0.002 || Math.abs(hov.gy - hov.y) > 0.002) hovRaf = requestAnimationFrame(hovLoop);
      else { hov.x = hov.gx; hov.y = hov.gy; hovRaf = 0; render(); }
    }
    function hovKick() { if (!hovRaf) hovRaf = requestAnimationFrame(hovLoop); }
    if (!reduce && window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      medias.forEach(function (m, k) {
        m.addEventListener("pointermove", function (e) {
          if (drag || k !== Math.round(p)) return;
          var r = m.getBoundingClientRect();
          hov.gx = clamp((e.clientX - r.left) / r.width - 0.5, -0.5, 0.5) * 2;
          hov.gy = clamp((e.clientY - r.top) / r.height - 0.5, -0.5, 0.5) * 2;
          hovKick();
        });
        m.addEventListener("pointerleave", function () { hov.gx = hov.gy = 0; hovKick(); });
      });
    }

    // Entrada con profundidad (una vez): las tarjetas llegan desde el fondo a la derecha.
    // Explica que el carril se desliza. GSAP si esta; si no, WAAPI con los mismos valores.
    var entered = reduce;
    function enter() {
      if (entered) return; entered = true;
      // solo las fotos: el texto entra aparte (el titulo sube al asentarse)
      var list = medias.slice(0, 3).filter(Boolean);
      sec.classList.remove("tj-pre");
      entering = true;
      var done = function () { entering = false; render(); };
      if (window.gsap) {
        window.gsap.fromTo(list, {
          x: function (k) { return 90 + k * 40; }, rotationY: -18, scale: 0.92, opacity: 0, transformPerspective: 1100, transformOrigin: "0% 50%"
        }, {
          x: 0, rotationY: 0, scale: function (k) { return k === 0 ? 1 : 0.925; }, opacity: 1,
          duration: 0.95, ease: "expo.out", stagger: 0.09, clearProps: "opacity", onComplete: done
        });
      } else if (list[0] && list[0].animate) {
        list.forEach(function (m, k) {
          var a = m.animate([
            { transform: "perspective(1100px) translateX(" + (90 + k * 40) + "px) rotateY(-18deg) scale(0.92)", opacity: 0 },
            { transform: "perspective(1100px) scale(" + (k === 0 ? 1 : 0.925) + ")", opacity: 1 }
          ], { duration: 950, delay: k * 90, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "backwards" });
          if (k === list.length - 1) a.onfinish = done;
        });
      } else done();
    }
    if (!reduce && "IntersectionObserver" in window) {
      sec.classList.add("tj-pre");
      var eio = new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) { eio.disconnect(); enter(); }
      }, { threshold: 0.18 });
      eio.observe(car);
    }

    /* Red de seguridad (FEEDBACK-2 #6): si el tween de entrada o los observadores se atoran
       (rAF pausado en el navegador de WhatsApp/Instagram), a los 1.6 s de asomarse todo queda visible. */
    function forceShow() {
      if (!entered || entering || sec.classList.contains("tj-pre")) {
        entered = true; entering = false;
        sec.classList.remove("tj-pre");
        if (window.gsap) window.gsap.killTweensOf(medias);
        medias.forEach(function (m) { if (m) { m.style.removeProperty("opacity"); m.getAnimations && m.getAnimations().forEach(function (a) { a.finish(); }); } });
        render();
      }
      if (!seen) { seen = true; on = -1; settle(target); }
    }
    if ("IntersectionObserver" in window) {
      var fio = new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) { fio.disconnect(); setTimeout(forceShow, 1600); }
      }, { rootMargin: "0px 0px -25% 0px" });
      fio.observe(car);
    }

    // Autoplay suave: solo mientras se ve y hasta que la persona toque algo
    function user() { touched = true; if (auto) { clearInterval(auto); auto = 0; } }
    function tick() {
      if (touched || !visible || document.hidden || drag || raf || fading) return;
      go(target + 1);
    }

    sec.classList.add("tj-js");
    measure();
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting && en.intersectionRatio >= 0.35 && !seen) { seen = true; on = -1; settle(target); }
          visible = en.isIntersecting && en.intersectionRatio >= 0.5;
        });
      }, { threshold: [0, 0.35, 0.5, 1] }).observe(car);
      if (!reduce) auto = setInterval(tick, 5200);
    } else { seen = true; settle(0); }

    var rz = 0;
    window.addEventListener("resize", function () { cancelAnimationFrame(rz); rz = requestAnimationFrame(measure); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    window.addEventListener("load", measure);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
