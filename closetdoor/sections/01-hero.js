/* 01 HERO
   Una sola idea de movimiento: TABLAS. La primera foto entra con tablas que suben desde el nogal,
   y cada cambio de foto repite el gesto con profundidad (la foto que sale sube y se oscurece,
   la que entra baja de escala). Titulo letra por letra. Con GSAP: parallax por capas al bajar,
   foto que sigue al mouse y boton magnetico (solo compu). En celular: swipe cambia de proyecto.
   VIDEO: hecho con sus fotos reales. Vive dentro de la primera foto (las tablas lo revelan) y la
   regla y el nombre del proyecto siguen su tiempo. Si no puede reproducirse, vuelven las fotos. */
(function () {
  "use strict";
  var hero = document.getElementById("hero");
  if (!hero) return;
  var mqReduce = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  var reduce = mqReduce.matches;
  var slides = Array.prototype.slice.call(hero.querySelectorAll(".s-hero-slide"));
  var ticks = Array.prototype.slice.call(hero.querySelectorAll(".s-hero-ticks button"));
  var numEl = hero.querySelector(".s-hero-n");
  var lblEl = hero.querySelector(".s-hero-lbl");
  var media = hero.querySelector(".s-hero-media");
  var par = hero.querySelector(".s-hero-par");
  var inner = hero.querySelector(".s-hero-in");
  var copy = hero.querySelector(".s-hero-copy");
  var DUR = 6000, WIPE = 900, STAG = 45;
  var index = 0, timer = 0, busy = false, visible = true, stopped = false;

  /* ---- video (sus fotos reales montadas con ffmpeg): se decide antes de la entrada ---- */
  var video = hero.querySelector(".s-hero-video"), vmode = false, segs = [], vloop = 0, vfade = 0, vraf = 0;
  (function () {
    if (!video || reduce || !slides[0]) return;
    var wide = window.matchMedia && window.matchMedia("(min-aspect-ratio: 1/1)").matches;
    var src = video.getAttribute(wide ? "data-src-d" : "data-src-m");
    var c = navigator.connection;
    if (!src || (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || "")))) return;
    segs = (video.getAttribute("data-segs") || "").split(",").map(parseFloat);
    vfade = parseFloat(video.getAttribute("data-fade")) || 0;
    if (segs.length !== slides.length + 1) return;
    vmode = true;
    video.setAttribute("data-src", src);
    video.poster = video.getAttribute(wide ? "data-poster-d" : "data-poster-m") || "";
    video.hidden = false;
    slides[0].appendChild(video);          // lo revelan las tablas de la entrada
    hero.classList.add("has-video");
  })();

  /* ---- titulo: letras con indice para escalonar (el h1 conserva aria-label) ---- */
  var ci = 0;
  Array.prototype.forEach.call(hero.querySelectorAll(".s-w > span"), function (w) {
    var host = w.querySelector("em") || w;
    var txt = host.textContent;
    host.textContent = "";
    for (var k = 0; k < txt.length; k++) {
      var c = document.createElement("span");
      c.className = "s-c"; c.textContent = txt.charAt(k);
      c.style.setProperty("--c", ci++);
      host.appendChild(c);
    }
    w.setAttribute("aria-hidden", "true");
  });
  Array.prototype.forEach.call(hero.querySelectorAll(".s-hero-chips li"), function (s, i) { s.style.setProperty("--i", i); });

  /* ---- capas que crea el JS: juntas de tabla y velo de la foto que sale ---- */
  var dim = document.createElement("div");
  dim.className = "s-hero-dim"; dim.setAttribute("aria-hidden", "true");
  par.appendChild(dim);
  var seams = document.createElement("div");
  seams.className = "s-hero-seams"; seams.setAttribute("aria-hidden", "true");
  par.appendChild(seams);
  function planks() { return window.innerWidth >= 900 ? 7 : 4; }
  function easeOut(t) { return 1 - Math.pow(1 - t, 4); }            // entrada de cada tabla
  function easeIO(t) { return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2; } // camara

  /* tablas verticales que suben desde abajo, escalonadas; from puede ser null (entrada) */
  function wipe(from, to, done) {
    var n = planks(), ys = [], i, bars = [];
    var toPic = Array.prototype.slice.call(to.querySelectorAll("picture, .s-hero-video:not([hidden])"));
    seams.innerHTML = "";
    for (i = 0; i < n; i++) {
      var b = document.createElement("i");
      b.style.left = (i * 100 / n) + "%"; b.style.width = (100 / n) + "%";
      seams.appendChild(b); bars.push(b);
    }
    /* la foto que entra se pide ya (lazy + recorte total = Safari/WhatsApp no la descargan) */
    Array.prototype.forEach.call(to.querySelectorAll('img[loading="lazy"]'), function (im) { im.loading = "eager"; });
    to.style.clipPath = "polygon(0 100%,100% 100%,100% 100%,0 100%)";
    if (from) { from.classList.remove("is-on"); from.classList.add("is-out"); }
    to.classList.add("is-in");
    seams.classList.add("is-run");
    var t0 = performance.now(), total = WIPE + STAG * (n - 1);
    function frame(now) {
      if (ended) return;
      var el = now - t0, pts = [], k, g = Math.min(el / total, 1), gc = easeIO(g);
      for (k = 0; k < n; k++) {
        var p = Math.min(Math.max((el - k * STAG) / WIPE, 0), 1);
        ys[k] = (1 - easeOut(p)) * 100;
        bars[k].style.transform = "translate3d(0," + ys[k].toFixed(2) + "%,0)";
      }
      pts.push("0% 100%");
      for (k = 0; k < n; k++) {
        var x0 = (k * 100 / n).toFixed(3), x1 = ((k + 1) * 100 / n).toFixed(3), y = ys[k].toFixed(2);
        pts.push(x0 + "% " + y + "%", x1 + "% " + y + "%");
      }
      pts.push("100% 100%");
      to.style.clipPath = "polygon(" + pts.join(",") + ")";
      // profundidad: la que entra baja de escala, la que sale sube y se apaga
      for (k = 0; k < toPic.length; k++) toPic[k].style.transform = "scale(" + (1.16 - 0.16 * gc).toFixed(4) + ")";
      if (from) {
        from.style.transform = "translate3d(0," + (-7 * gc).toFixed(2) + "%,0) scale(" + (1 - 0.04 * gc).toFixed(4) + ")";
        dim.style.opacity = (0.7 * gc).toFixed(3);
      }
      if (el < total) { requestAnimationFrame(frame); return; }
      finish();
    }
    /* estado final; lo llama el ultimo cuadro o, si rAF se atora (navegador de WhatsApp/Instagram), el temporizador */
    var ended = false;
    function finish() {
      if (ended) return; ended = true;
      clearTimeout(safe);
      var k;
      for (k = 0; k < bars.length; k++) bars[k].style.transform = "";
      to.style.clipPath = ""; for (k = 0; k < toPic.length; k++) toPic[k].style.transform = "";
      to.classList.remove("is-in"); to.classList.add("is-on");
      if (from) { from.classList.remove("is-out"); from.style.transform = ""; }
      dim.style.opacity = "";
      seams.classList.remove("is-run");
      done();
    }
    var safe = setTimeout(finish, total + 700);
    requestAnimationFrame(function (now) { if (!ended) frame(now); });
  }

  /* ---- entrada: espera la primera foto y las fuentes (tope 1.2 s) ---- */
  var started = false;
  function start() {
    if (started) return; started = true;
    hero.classList.add("is-go");
    if (vmode) loadVideo();
    if (reduce || !slides[0]) { if (slides.length > 1 && !reduce) schedule(); return; }
    busy = true;
    slides[0].classList.remove("is-on");
    wipe(null, slides[0], function () { busy = false; if (slides.length > 1 && !vmode) { hero.classList.add("is-auto"); schedule(); } });
  }
  hero.classList.add("is-js");
  var first = slides[0] && slides[0].querySelector("img");
  var waits = [];
  if (first && !first.complete && first.decode) waits.push(first.decode().catch(function () {}));
  if (document.fonts && document.fonts.ready) waits.push(document.fonts.ready);
  Promise.all(waits).then(start, start);
  setTimeout(start, 1200);

  function setUi(i) {
    ticks.forEach(function (t, k) {
      t.classList.toggle("is-on", k === i);
      t.classList.toggle("is-done", k < i);
      if (k === i) t.setAttribute("aria-current", "true"); else t.removeAttribute("aria-current");
      var bar = t.querySelector("i");
      if (!bar) return;
      bar.style.transform = vmode && k === i ? "scaleX(0)" : "";
      if (k === i) { bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = ""; }
    });
    if (numEl) numEl.textContent = ("0" + (i + 1)).slice(-2);
    if (lblEl) {
      lblEl.innerHTML = "";
      var s = document.createElement("span");
      s.textContent = slides[i].getAttribute("data-label") || "";
      lblEl.appendChild(s);
    }
  }

  function go(i) {
    if (vmode) { seekSeg(i); return; }
    if (busy || i === index || !slides[i]) return;
    var from = slides[index], to = slides[i];
    index = i; setUi(i);
    if (reduce) { from.classList.remove("is-on"); to.classList.add("is-on"); schedule(); return; }
    busy = true;
    var img = to.querySelector("img");
    var run = function () { wipe(from, to, function () { busy = false; schedule(); }); };
    if (img && !img.complete && img.decode) img.decode().then(run, run); else run();
  }

  function schedule() {
    clearTimeout(timer);
    if (vmode) return;
    if (reduce || stopped || !visible || document.hidden || slides.length < 2) { hero.classList.add("is-paused"); return; }
    hero.classList.remove("is-paused");
    timer = setTimeout(function () { go((index + 1) % slides.length); }, DUR);
  }

  ticks.forEach(function (t, k) { t.addEventListener("click", function () { go(k); }); });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      if (started && !busy) schedule();
      if (vmode && video && video.src) { if (visible) playVideo(); else video.pause(); }
    }, { threshold: 0.15 }).observe(hero);
  }
  document.addEventListener("visibilitychange", function () { if (started && !busy) schedule(); });

  /* ---- celular: swipe horizontal sobre el hero cambia de foto (el vertical sigue siendo scroll) ---- */
  var sw = null;
  hero.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 1 || e.target.closest("a, button, .s-hero-chips")) { sw = null; return; }
    sw = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: e.timeStamp };
  }, { passive: true });
  hero.addEventListener("touchend", function (e) {
    if (!sw) return;
    var t = e.changedTouches[0], dx = t.clientX - sw.x, dy = t.clientY - sw.y, dt = e.timeStamp - sw.t;
    sw = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4 && dt < 800) {
      go((index + (dx < 0 ? 1 : -1) + slides.length) % slides.length);
    }
  }, { passive: true });

  /* ---- GSAP (lo carga FUNDACION): parallax por capas, foto que sigue al mouse, boton magnetico ---- */
  function withGsap(cb) {
    var t0 = Date.now();
    (function poll() {
      if (window.gsap && window.ScrollTrigger) { cb(window.gsap, window.ScrollTrigger); return; }
      if (Date.now() - t0 < 6000) { setTimeout(poll, 150); return; }
      hero.classList.add("s-hero--css"); // sin GSAP: parallax con CSS scroll-driven donde exista
    })();
  }
  withGsap(function (gsap, ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    hero.classList.add("s-hero--gs");
    var mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", function () {
      /* al bajar: la foto se queda atras, el texto se adelanta y se apaga. SIN ScrollTrigger a proposito:
         kit.css pone html{scroll-behavior:smooth} y en cada ScrollTrigger.refresh() (lo llaman otras secciones)
         su "scroll a 0 para medir" se anima, mide mal el inicio (start=-scrollY) y al volver arriba el texto
         se quedaba al 20-50 %. Aqui el avance sale solo de scrollY / alto del hero: siempre reversible. */
      var setPy = gsap.quickSetter(par, "yPercent"), setIy = gsap.quickSetter(inner, "y", "px"), setIo = gsap.quickSetter(inner, "opacity");
      var hH = hero.offsetHeight || window.innerHeight, pend = 0;
      function upd() {
        pend = 0;
        var k = Math.min(Math.max(window.scrollY / hH, 0), 1);
        setPy(14 * k); setIy(-70 * k); setIo(1 - 0.85 * k);
      }
      function onScroll() { if (!pend) pend = requestAnimationFrame(upd); }
      function onResize() { hH = hero.offsetHeight || window.innerHeight; onScroll(); }
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      window.addEventListener("pageshow", onResize);
      upd();
      return function () {
        window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); window.removeEventListener("pageshow", onResize);
        cancelAnimationFrame(pend); gsap.set([par, inner], { clearProps: "transform,opacity" });
      };
    });
    mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine) and (min-width: 900px)", function () {
      gsap.set(media, { scale: 1.045 });
      var mx = gsap.quickTo(media, "x", { duration: 1.1, ease: "power3" });
      var my = gsap.quickTo(media, "y", { duration: 1.1, ease: "power3" });
      var cx = gsap.quickTo(copy, "x", { duration: 1.1, ease: "power3" });
      var act = hero.querySelector(".s-hero-actions");
      var btn = act && act.querySelector(".k-btn");
      var bx = act && gsap.quickTo(act, "x", { duration: 0.5, ease: "power3" });
      var by = act && gsap.quickTo(act, "y", { duration: 0.5, ease: "power3" });
      function move(e) {
        var nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5;
        mx(-nx * 22); my(-ny * 14); cx(nx * 8);
        if (btn) {
          var r = btn.getBoundingClientRect();
          var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
          var d = Math.sqrt(dx * dx + dy * dy), reach = r.width / 2 + 70;
          if (d < reach) { bx(dx * 0.22); by(dy * 0.3); } else { bx(0); by(0); }
        }
      }
      function leave() { mx(0); my(0); cx(0); if (bx) { bx(0); by(0); } }
      hero.addEventListener("mousemove", move);
      hero.addEventListener("mouseleave", leave);
      return function () {
        hero.removeEventListener("mousemove", move); hero.removeEventListener("mouseleave", leave);
        gsap.set([media, copy, act], { clearProps: "transform" });
      };
    });
  });

  /* ---- video: carga, regla sincronizada, salto por proyecto y vuelta a fotos si falla ---- */
  function loadVideo() {
    video.preload = "auto";
    video.src = video.getAttribute("data-src");
    video.addEventListener("loadedmetadata", function () { vloop = video.duration || 0; }, { once: true });
    video.addEventListener("error", unVideo, { once: true });
    playVideo();
  }
  function playVideo() {
    var p = video.play();
    if (p && p.then) p.then(function () { if (!vraf) vraf = requestAnimationFrame(vtick); }, function (err) {
      if (err && err.name === "NotAllowedError") unVideo(); // ahorro de energia o autoplay bloqueado
    });
  }
  function unVideo() {
    if (!vmode) return;
    vmode = false; cancelAnimationFrame(vraf); vraf = 0;
    video.pause(); video.removeAttribute("src"); video.hidden = true;
    hero.classList.remove("has-video");
    index = 0; setUi(0);
    if (started && !busy && slides.length > 1) { hero.classList.add("is-auto"); schedule(); }
  }
  function segOf(t) {
    var n = slides.length, k;
    if (t >= segs[n]) return 0;
    for (k = n - 1; k >= 0; k--) if (t >= segs[k]) return k;
    return 0;
  }
  function vtick() {
    vraf = 0;
    if (!vmode || video.paused) return;
    var t = video.currentTime, n = slides.length, i = segOf(t), loop = vloop || video.duration || segs[n];
    var len, local;
    if (i === 0) { len = (loop - segs[n]) + segs[1]; local = t >= segs[n] ? t - segs[n] : t + (loop - segs[n]); }
    else { len = segs[i + 1] - segs[i]; local = t - segs[i]; }
    if (i !== index) { index = i; setUi(i); }
    var bar = ticks[i] && ticks[i].querySelector("i");
    if (bar) bar.style.transform = "scaleX(" + Math.min(Math.max(local / len, 0), 1).toFixed(4) + ")";
    vraf = requestAnimationFrame(vtick);
  }
  function seekSeg(i) {
    if (!slides[i] || !video.src) return;
    var t = i === 0 ? 0 : segs[i] + vfade / 2, ok = false, r;
    try { for (r = 0; r < video.seekable.length; r++) if (t >= video.seekable.start(r) && t <= video.seekable.end(r)) ok = true; } catch (x) {}
    if (!ok) return; // servidor sin rangos: no se puede saltar, el video sigue solo
    try { video.currentTime = t; } catch (x) {}
    index = i; setUi(i); playVideo();
  }

  // gancho para capturas de prueba
  window.__cdHero = { go: go, pause: function () { stopped = true; clearTimeout(timer); } };
})();

/* 01 HERO · hoja de cada tipo (cuadritos). Fotos reales HD, materiales que se ven en ellas
   (enlazan a materiales.html#lugar) y "Armar mi ..." que baja al cotizador con el tipo ya elegido.
   Se cierra arrastrando hacia abajo, con Esc o tocando afuera. Foco atrapado mientras está abierta. */
(function () {
  "use strict";
  var hero = document.getElementById("hero");
  var root = hero && hero.querySelector(".s-hero-sheet");
  if (!root) return;
  document.body.appendChild(root); // fuera del hero: nada de transform/overflow encima de un fixed

  var P = "img/hero/sheet/";
  var WOOD = "#6b4226", GRAY = "#8a8580", CHAR = "#3b3f45", BLACK = "#1c1a19", LIGHT = "#c89a64", STONE = "#4a4644";
  var DATA = {
    cocinas: {
      t: "Cocinas", d: "Con isla y cubierta de madera.", tipo: "Cocina", go: "Armar mi cocina",
      f: [["cd20", 720, 1059, "Cocina con isla, plafón de madera y campana negra"],
          ["cd20-isla", 900, 458, "Isla con cubierta de madera y repisas abiertas"],
          ["cd20-campana", 720, 712, "Plafón de madera, campana y gabinetes gris grafito"]],
      m: [["Madera clara", LIGHT, "cocina"], ["Gris grafito", CHAR, "cocina"], ["Nogal", WOOD, "cocina"], ["Cubierta de piedra", STONE, "cocina"]]
    },
    closets: {
      t: "Closets", d: "De piso a techo, con luz LED.", tipo: "Closet o vestidor", go: "Armar mi closet",
      f: [["cd09", 720, 832, "Closet con luz LED, cajones y tubo para colgar"],
          ["cd10", 720, 929, "Walk-in con isla de cajones y luz LED"],
          ["cd12", 720, 877, "Muro de closet de nogal de piso a techo"],
          ["cd13", 720, 1133, "Closet gris con veta y jaladeras largas"]],
      m: [["Nogal", WOOD, "closets"], ["Gris con veta", GRAY, "closets"], ["Luz LED", "#e9c98a", "closets"], ["Jaladeras", BLACK, "herrajes"]]
    },
    puertas: {
      t: "Puertas", d: "De madera, residenciales y de interior.", tipo: "Puerta", go: "Armar mi puerta",
      f: [["cd02", 720, 1091, "Puerta interior de nogal con manija negra"],
          ["cd11", 720, 949, "Puerta residencial de nogal con veta horizontal"],
          ["herraje", 640, 800, "Manija negra sobre puerta de nogal"]],
      m: [["Nogal vertical", WOOD, "puertas"], ["Nogal horizontal", "#8a5a34", "puertas"], ["Manija negra", BLACK, "herrajes"]]
    },
    muebles: {
      t: "Muebles", d: "Centros de TV y muebles de baño.", tipo: "Mueble a medida", go: "Armar mi mueble",
      f: [["cd15", 720, 924, "Centro de TV con lambrín ranurado de nogal"],
          ["cd14", 720, 983, "Centro de entretenimiento con gabinetes negros arriba"],
          ["cd01", 720, 1090, "Mueble de baño flotante con cubierta de piedra"]],
      m: [["Nogal", WOOD, "closets"], ["Negro mate", BLACK, "cocina"], ["Cubierta de piedra", STONE, "bano"]]
    },
    remodelaciones: {
      t: "Remodelaciones", d: "Muros de madera y celosías.", tipo: "Remodelación", go: "Armar mi remodelación",
      f: [["cd03", 720, 1091, "Muro de madera de piso a techo con jaladera lineal"],
          ["cd05", 720, 1090, "Celosía de lamas de nogal que divide el vestidor"],
          ["cd07", 720, 1091, "Vestidor de nogal con repisas y cajonera"]],
      m: [["Nogal", WOOD, "closets"], ["Celosía de lamas", "#5a3a24", "closets"], ["Jaladera lineal", BLACK, "herrajes"]]
    }
  };

  var box = root.querySelector(".s-hero-sheet-box");
  var tEl = root.querySelector(".s-hero-sheet-t"), dEl = root.querySelector(".s-hero-sheet-d");
  var car = root.querySelector(".s-hero-sheet-car"), chips = root.querySelector(".s-hero-sheet-chips");
  var goBtn = root.querySelector(".s-hero-sheet-go");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var cur = null, opener = null, closeT = 0, OUT = reduce ? 200 : 240;

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
  function fill(k) {
    var x = DATA[k];
    tEl.textContent = x.t; dEl.textContent = x.d;
    car.innerHTML = x.f.map(function (f) {
      return '<figure><img src="' + P + f[0] + '.webp" width="' + f[1] + '" height="' + f[2] + '" alt="' + esc(f[3]) + '" decoding="async" draggable="false"><figcaption>' + esc(f[3]) + '</figcaption></figure>';
    }).join("");
    car.scrollLeft = 0;
    if (typeof navState === "function") setTimeout(navState, 0);
    chips.innerHTML = x.m.map(function (m) {
      return '<li><a href="materiales.html#' + m[2] + '"><i style="--sw:' + m[1] + '" aria-hidden="true"></i>' + esc(m[0]) + '</a></li>';
    }).join("");
    goBtn.innerHTML = esc(x.go) + '<svg aria-hidden="true"><use href="#i-arrow"/></svg>';
  }

  function focusables() {
    return Array.prototype.filter.call(box.querySelectorAll('a[href], button, [tabindex="0"]'), function (el) { return el.offsetParent !== null; });
  }
  function open(k, from) {
    if (!DATA[k]) return;
    clearTimeout(closeT);
    cur = k; opener = from || null;
    fill(k);
    root.classList.remove("is-closing", "is-drag");
    box.style.removeProperty("--sh-y");
    root.hidden = false;
    document.body.classList.add("s-hero-sheet-open");
    document.documentElement.style.overflow = "hidden";
    void box.offsetHeight; // arranca desde fuera de pantalla
    root.classList.add("is-open");
    var x = root.querySelector(".s-hero-sheet-x");
    setTimeout(function () { x.focus({ preventScroll: true }); }, 30);
  }
  function close(restore) {
    if (!cur) return;
    cur = null;
    root.classList.add("is-closing");
    root.classList.remove("is-open", "is-drag");
    box.style.removeProperty("--sh-y");
    document.body.classList.remove("s-hero-sheet-open");
    document.documentElement.style.overflow = "";
    if (restore !== false && opener) opener.focus({ preventScroll: true });
    closeT = setTimeout(function () { root.hidden = true; root.classList.remove("is-closing"); }, OUT);
  }

  Array.prototype.forEach.call(hero.querySelectorAll("[data-sheet]"), function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); open(a.getAttribute("data-sheet"), a); });
  });
  Array.prototype.forEach.call(root.querySelectorAll("[data-close]"), function (b) {
    b.addEventListener("click", function () { close(); });
  });
  goBtn.addEventListener("click", function () {
    var tipo = DATA[cur] && DATA[cur].tipo;
    close(false);
    try { window.dispatchEvent(new CustomEvent("cd:cotizar", { detail: { tipo: tipo } })); } catch (x) {}
    if (location.hash === "#cotizar") { var c = document.getElementById("cotizar"); if (c) c.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }
    else location.hash = "#cotizar";
  });
  document.addEventListener("keydown", function (e) {
    if (!cur) return;
    if (e.key === "Escape") { e.preventDefault(); close(); return; }
    if (e.key !== "Tab") return;
    var f = focusables(); if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || !box.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && (document.activeElement === last || !box.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
  });

  /* arrastrar hacia abajo para cerrar (celular). El horizontal lo deja a la tira de fotos. */
  var dr = null;
  var mqPhone = window.matchMedia ? window.matchMedia("(max-width: 899px)") : { matches: true };
  box.addEventListener("pointerdown", function (e) {
    if (!cur || !mqPhone.matches || (e.pointerType === "mouse" && e.button !== 0)) return;
    if (box.scrollTop > 0) return;
    dr = { id: e.pointerId, x: e.clientX, y: e.clientY, lock: 0, dy: 0, hist: [[e.timeStamp, e.clientY]] };
  });
  box.addEventListener("pointermove", function (e) {
    if (!dr || e.pointerId !== dr.id) return;
    var dx = e.clientX - dr.x, dy = e.clientY - dr.y;
    if (!dr.lock) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      if (Math.abs(dx) > Math.abs(dy) || dy < 0) { dr = null; return; }
      dr.lock = 1; root.classList.add("is-drag");
      try { box.setPointerCapture(e.pointerId); } catch (x) {}
    }
    dr.dy = Math.max(0, dy);
    box.style.setProperty("--sh-y", dr.dy + "px");
    root.querySelector(".s-hero-sheet-veil").style.opacity = String(Math.max(0, 1 - dr.dy / (box.offsetHeight || 1)));
    dr.hist.push([e.timeStamp, e.clientY]); if (dr.hist.length > 8) dr.hist.shift();
  });
  function end(e) {
    if (!dr || e.pointerId !== dr.id) return;
    var d = dr; dr = null;
    root.querySelector(".s-hero-sheet-veil").style.opacity = "";
    if (!d.lock) return;
    root.classList.remove("is-drag");
    var a = d.hist[0], b = d.hist[d.hist.length - 1], v = (b[1] - a[1]) / Math.max(1, b[0] - a[0]); // px/ms
    if (d.dy > box.offsetHeight * 0.28 || v > 0.45) close();
    else box.style.removeProperty("--sh-y");
  }
  box.addEventListener("pointerup", end);
  box.addEventListener("pointercancel", end);

  /* flechas (solo con mouse): una foto por clic */
  var navs = root.querySelectorAll(".s-hero-sheet-nav button");
  function navState() {
    var max = car.scrollWidth - car.clientWidth - 2;
    if (navs[0]) navs[0].disabled = car.scrollLeft <= 2;
    if (navs[1]) navs[1].disabled = car.scrollLeft >= max;
  }
  Array.prototype.forEach.call(navs, function (b) {
    b.addEventListener("click", function () {
      var f = car.querySelector("figure"), stepX = f ? f.offsetWidth + 8 : 300;
      car.scrollBy({ left: stepX * parseInt(b.getAttribute("data-dir"), 10), behavior: reduce ? "auto" : "smooth" });
    });
  });
  car.addEventListener("scroll", navState, { passive: true });
  car.addEventListener("load", navState, true);

  window.__cdHeroSheet = { open: open, close: close };
})();
