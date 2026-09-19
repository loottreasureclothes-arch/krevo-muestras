/* 09 · Galería: masonry, filtros con FLIP y lightbox con swipe (agente GALERÍA) */
(function () {
  "use strict";
  var sec = document.getElementById("galeria");
  if (!sec) return;
  var WA = "524494463411";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var EASE = "cubic-bezier(0.23,1,0.32,1)";
  // resortes (Emil: gestos y elementos "vivos", bounce 0.15-0.2); si el navegador no entiende linear(), cae a EASE
  var hasLinear = window.CSS && CSS.supports && CSS.supports("transition-timing-function", "linear(0, 1)");
  var SPRING_OPEN = hasLinear ? "linear(0, 0.028, 0.098, 0.19, 0.292, 0.396, 0.495, 0.585, 0.666, 0.736, 0.795, 0.844, 0.884, 0.916, 0.941, 0.96, 0.975, 0.986, 0.994, 0.999, 1.003, 1.005, 1.006, 1.006, 1.006, 1.006, 1.005, 1.005, 1.004, 1.003, 1.003, 1.002, 1)" : EASE;
  var SPRING_BACK = hasLinear ? "linear(0, 0.028, 0.098, 0.191, 0.296, 0.403, 0.505, 0.6, 0.684, 0.756, 0.817, 0.868, 0.908, 0.94, 0.964, 0.983, 0.996, 1.004, 1.01, 1.013, 1.015, 1.015, 1.014, 1.013, 1.012, 1.01, 1.009, 1.007, 1.006, 1.004, 1.003, 1.003, 1)" : EASE;
  var grid = sec.querySelector(".s-galeria-grid");
  var items = Array.prototype.slice.call(sec.querySelectorAll(".s-galeria-item"));
  var chips = Array.prototype.slice.call(sec.querySelectorAll(".s-galeria-chip"));
  var status = sec.querySelector(".s-galeria-status");
  var NAMES = { closets: "Closets", cocinas: "Cocinas", puertas: "Puertas", muebles: "Muebles", banos: "Baños" };
  var ONE = { closets: "un closet", cocinas: "una cocina", puertas: "una puerta", muebles: "un mueble", banos: "un mueble de baño" };
  var current = "todos";

  sec.classList.add("is-js");

  /* ---------- Carga diferida con fundido ---------- */
  items.forEach(function (it) {
    var img = it.querySelector("img");
    function done() { img.classList.add("is-loaded"); }
    if (img.complete && img.naturalWidth) done();
    else img.addEventListener("load", done, { once: true });
  });

  /* ---------- Masonry: filas de 1px, cada pieza toma su alto ---------- */
  function gapPx() { return parseFloat(getComputedStyle(grid).columnGap) || 0; }
  function layout() {
    grid.classList.add("is-masonry");
    var g = gapPx();
    items.forEach(function (it) {
      if (it.classList.contains("is-out") || it.classList.contains("is-leaving")) return;
      var h = it.firstElementChild.getBoundingClientRect().height;
      it.style.gridRowEnd = "span " + Math.max(1, Math.round(h + g));
    });
  }
  layout();
  if ("ResizeObserver" in window) {
    var lastW = 0;
    new ResizeObserver(function (en) {
      var w = en[0].contentRect.width;
      if (Math.abs(w - lastW) > 0.5) { lastW = w; layout(); }
    }).observe(grid);
  } else window.addEventListener("resize", layout);

  /* ---------- Entrada escalonada al verse ---------- */
  function markDone(it) { setTimeout(function () { it.classList.add("is-done"); }, 1300); }
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (it) { it.classList.add("is-in", "is-done"); });
    sec.querySelector(".s-galeria-head").classList.add("is-in");
    sec.querySelector(".s-galeria-ruler").classList.add("is-in");
  } else {
    // Cortina por foto (FEEDBACK-2 #6): antes el botón arrancaba con clip-path al 100% y Safari/WhatsApp no
    // descargaban la foto lazy de adentro. Ahora la foto carga normal y una cortina crema se recoge encima.
    items.forEach(function (it) {
      var v = document.createElement("span");
      v.className = "s-galeria-veil"; v.setAttribute("aria-hidden", "true");
      it.querySelector(".s-galeria-open").appendChild(v);
    });
    // Red de seguridad: a los 1.6 s de asomarse, cada foto (y el título) queda en su estado final.
    var fio = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (!e.isIntersecting) return;
        fio.unobserve(e.target);
        var t = e.target;
        setTimeout(function () {
          t.classList.add("is-in");
          if (t.classList.contains("s-galeria-head")) sec.querySelector(".s-galeria-ruler").classList.add("is-in");
          else { t.classList.add("is-done"); var im = t.querySelector("img"); if (im) im.classList.add("is-loaded"); }
        }, 1600);
      });
    }, { rootMargin: "0px 0px -25% 0px" });
    items.forEach(function (it) { fio.observe(it); });
    fio.observe(sec.querySelector(".s-galeria-head"));
    // Stagger por columnas: la columna 1 arranca, la 2 le sigue a 70 ms, etc.; dentro de cada columna,
    // de arriba hacia abajo a 110 ms. Tope de 400 ms para que ninguna foto tarde más de ~1.1 s en total.
    function colOf(el) {
      var gr = grid.getBoundingClientRect(), r = el.getBoundingClientRect();
      var cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length || 2;
      var cw = (gr.width + gapPx()) / cols;
      return Math.max(0, Math.min(cols - 1, Math.round((r.left - gr.left) / cw)));
    }
    var io = new IntersectionObserver(function (en) {
      var batch = en.filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left; });
      var perCol = {};
      batch.forEach(function (e) {
        var t = e.target;
        var d = 0;
        if (t.classList.contains("s-galeria-item")) {
          var c = colOf(t), k = perCol[c] || 0;
          perCol[c] = k + 1;
          d = Math.min(c * 70 + k * 110, 400);
        }
        t.style.setProperty("--d", d + "ms");
        t.classList.add("is-in");
        io.unobserve(t);
        // la regla está recortada con clip-path y el observer no la ve: entra con el título
        if (t.classList.contains("s-galeria-head")) sec.querySelector(".s-galeria-ruler").classList.add("is-in");
        if (t.classList.contains("s-galeria-item")) markDone(t);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (it) { io.observe(it); });
    io.observe(sec.querySelector(".s-galeria-head"));
  }

  /* ---------- Filtros con FLIP (+ tope de 8 fotos en celular) ---------- */
  var mq = window.matchMedia("(max-width: 899px)");
  var LIMIT = 8, expanded = false;
  var moreBtn = sec.querySelector(".s-galeria-showall");
  function matches(it) { return current === "todos" || it.getAttribute("data-type") === current; }
  function matching() { return items.filter(matches); }
  function visible() { return items.filter(function (it) { return !it.classList.contains("is-out"); }); }
  function update(animate) {
    var want = new Set();
    matching().forEach(function (it, i) { if (expanded || !mq.matches || i < LIMIT) want.add(it); });
    var total = matching().length, hiddenN = total - want.size;
    moreBtn.hidden = hiddenN <= 0;
    moreBtn.querySelector("span").textContent = "Ver las " + total + " fotos";
    var gr = grid.getBoundingClientRect();
    var first = new Map();
    visible().forEach(function (it) { first.set(it, it.getBoundingClientRect()); });

    var leaving = [], entering = [], staying = [];
    items.forEach(function (it) {
      var shown = !it.classList.contains("is-out");
      if (shown && !want.has(it)) leaving.push(it);
      else if (!shown && want.has(it)) entering.push(it);
      else if (shown) staying.push(it);
    });

    if (reduce || !animate) {
      leaving.forEach(function (it) { it.classList.add("is-out"); });
      entering.forEach(function (it) { it.classList.remove("is-out"); it.classList.add("is-in", "is-done"); });
      layout(); announce(); return;
    }

    // las que se van salen del flujo y se quedan en su lugar mientras se desvanecen
    leaving.forEach(function (it) {
      var r = first.get(it);
      it.getAnimations().forEach(function (a) { a.cancel(); });
      it.classList.add("is-leaving");
      it.style.left = (r.left - gr.left) + "px";
      it.style.top = (r.top - gr.top) + "px";
      it.style.width = r.width + "px";
    });
    entering.forEach(function (it) { it.classList.remove("is-out"); it.classList.add("is-in", "is-done"); });
    layout();

    staying.forEach(function (it) {
      var a = first.get(it), b = it.getBoundingClientRect();
      var dx = a.left - b.left, dy = a.top - b.top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
      it.animate([{ transform: "translate(" + dx + "px," + dy + "px)" }, { transform: "none" }], { duration: 620, easing: EASE });
    });
    entering.forEach(function (it, i) {
      it.animate([{ opacity: 0, transform: "scale(0.94)" }, { opacity: 1, transform: "none" }],
        { duration: 520, delay: 140 + Math.min(i, 8) * 45, easing: EASE, fill: "backwards" });
    });
    leaving.forEach(function (it) {
      var an = it.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "scale(0.94)" }], { duration: 260, easing: EASE, fill: "forwards" });
      an.onfinish = function () {
        it.classList.remove("is-leaving"); it.classList.add("is-out");
        it.style.left = it.style.top = it.style.width = "";
        an.cancel();
      };
    });
    announce();
  }
  function announce() {
    var n = visible().length, t = matching().length;
    status.textContent = (current === "todos" ? "Todas las fotos" : NAMES[current]) + ": " + n + " de " + t + (t === 1 ? " foto" : " fotos");
  }
  function setFilter(type) {
    if (type === current) return;
    current = type;
    chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c.getAttribute("data-filter") === type)); });
    update(true);
  }
  chips.forEach(function (c) {
    c.addEventListener("click", function () { setFilter(c.getAttribute("data-filter")); });
  });
  moreBtn.addEventListener("click", function () {
    expanded = true; update(true);
    var nxt = visible()[LIMIT];
    if (nxt) nxt.firstElementChild.focus({ preventScroll: true });
  });
  update(false);
  if (mq.addEventListener) mq.addEventListener("change", function () { update(false); });

  /* ---------- Lightbox ---------- */
  var lb = sec.querySelector(".s-galeria-lb");
  // al body, para que ningún transform/overflow de la página lo recorte
  document.body.appendChild(lb);
  var bg = lb.querySelector(".s-galeria-lb-bg");
  var stage = lb.querySelector(".s-galeria-lb-stage");
  // la foto grande se crea al abrir por primera vez: nada de <img> sin src en la página
  var big = document.createElement("img");
  big.className = "s-galeria-lb-img"; big.alt = ""; big.decoding = "async";
  var countB = lb.querySelector(".s-galeria-lb-count b");
  var countT = lb.querySelector(".s-galeria-lb-count span");
  var capB = lb.querySelector(".s-galeria-lb-cap b");
  var capS = lb.querySelector(".s-galeria-lb-cap span");
  var cta = lb.querySelector(".s-galeria-lb-cta");
  var btnClose = lb.querySelector(".s-galeria-lb-close");
  var list = [], idx = 0, isOpen = false, opener = null, pushed = false;
  var box = { w: 0, h: 0 };
  var cache = {};

  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function data(it) {
    var img = it.querySelector("img");
    return {
      thumb: img.currentSrc || img.src, full: img.getAttribute("data-full"),
      w: +img.getAttribute("data-fw"), h: +img.getAttribute("data-fh"),
      alt: img.alt, type: it.getAttribute("data-type"), el: it
    };
  }
  function preload(i) {
    var d = list[(i + list.length) % list.length];
    if (!d || cache[d.full]) return;
    var im = new Image(); im.decoding = "async"; im.src = d.full; cache[d.full] = im;
  }
  // tamaño "contain" dentro del escenario
  function fit(d) {
    var r = stage.getBoundingClientRect();
    var pad = window.innerWidth >= 900 ? 12 : 0;
    var s = Math.min((r.width - pad * 2) / d.w, (r.height - pad * 2) / d.h);
    box.w = Math.round(d.w * s); box.h = Math.round(d.h * s);
    big.style.width = box.w + "px"; big.style.height = box.h + "px";
    big.style.marginLeft = -box.w / 2 + "px"; big.style.marginTop = -box.h / 2 + "px";
  }
  function fill(d) {
    countB.textContent = pad(idx + 1); countT.textContent = pad(list.length);
    capB.textContent = NAMES[d.type]; capS.textContent = d.alt;
    big.alt = d.alt;
    var msg = "Hola Closet&Door, vi en su galería este trabajo (" + d.alt.toLowerCase() + ") y quiero cotizar " + ONE[d.type] + " así.";
    cta.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg);
    fit(d);
    // muestra la miniatura ya cargada y cambia a la grande cuando llegue
    big.src = d.thumb;
    var hi = cache[d.full] || new Image();
    if (!cache[d.full]) { hi.src = d.full; cache[d.full] = hi; }
    function swap() { if (list[idx] === d) big.src = d.full; }
    if (hi.complete && hi.naturalWidth) swap(); else hi.addEventListener("load", swap, { once: true });
    preload(idx + 1); preload(idx - 1);
  }
  function thumbRect(d) {
    var r = d.el.firstElementChild.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight || d.el.classList.contains("is-out")) return null;
    return r;
  }
  // transformación que lleva la foto grande a la caja de la miniatura (con recorte cover)
  function fromThumb(r) {
    var s = Math.max(r.width / box.w, r.height / box.h);
    var sr = stage.getBoundingClientRect();
    var cx = sr.left + sr.width / 2, cy = sr.top + sr.height / 2;
    var tx = r.left + r.width / 2 - cx, ty = r.top + r.height / 2 - cy;
    var iw = (box.w * s - r.width) / 2 / s, ih = (box.h * s - r.height) / 2 / s;
    return { transform: "translate(" + tx + "px," + ty + "px) scale(" + s + ")", clipPath: "inset(" + ih + "px " + iw + "px round " + (12 / s) + "px)", borderRadius: "0px" };
  }
  var FULL = { transform: "none", clipPath: "inset(0px 0px round 6px)" };

  function open(it) {
    if (isOpen) return;
    list = matching().map(data);
    idx = Math.max(0, list.findIndex(function (d) { return d.el === it; }));
    opener = it.firstElementChild;
    if (!big.parentNode) stage.appendChild(big);
    lb.hidden = false;
    document.documentElement.classList.add("s-galeria-lock");
    isOpen = true;
    fill(list[idx]);
    try { history.pushState({ sGaleria: 1 }, ""); pushed = true; } catch (e) { pushed = false; }
    requestAnimationFrame(function () {
      lb.classList.add("is-open");
      var r = thumbRect(list[idx]);
      if (!reduce && r) {
        opener.style.visibility = "hidden";
        var a = big.animate([fromThumb(r), FULL], { duration: 650, easing: SPRING_OPEN });
        a.onfinish = function () { opener.style.visibility = ""; };
      } else if (!reduce) {
        big.animate([{ opacity: 0, transform: "scale(0.96)" }, { opacity: 1, transform: "none" }], { duration: 360, easing: EASE });
      }
      btnClose.focus({ preventScroll: true });
    });
  }
  function close(fromPop) {
    if (!isOpen) return;
    settleNav();
    isOpen = false;
    if (pushed && !fromPop) { pushed = false; ignorePop = true; history.back(); }
    pushed = false;
    var d = list[idx];
    // si el filtro no la muestra o no está en pantalla, sólo se desvanece
    var r = thumbRect(d);
    bg.style.opacity = "";
    lb.classList.remove("is-open", "is-dragging");
    function end() {
      lb.hidden = true;
      big.style.transform = ""; big.style.opacity = "";
      bg.style.opacity = "";
      lb.classList.remove("is-dragging");
      document.documentElement.classList.remove("s-galeria-lock");
      d.el.firstElementChild.style.visibility = "";
      var f = d.el.firstElementChild;
      if (f && !d.el.classList.contains("is-out")) f.focus({ preventScroll: true });
      else if (opener) opener.focus({ preventScroll: true });
    }
    if (reduce) { end(); return; }
    var cur = getComputedStyle(big).transform;
    var start = { transform: cur === "none" ? "none" : cur, opacity: big.style.opacity || 1 };
    var a;
    if (r) {
      d.el.firstElementChild.style.visibility = "hidden";
      var t = fromThumb(r); t.opacity = 1; start.clipPath = "inset(0px 0px round 6px)";
      a = big.animate([start, t], { duration: 400, easing: EASE, fill: "forwards" });
    } else {
      a = big.animate([start, { transform: "scale(0.94)", opacity: 0 }], { duration: 260, easing: EASE, fill: "forwards" });
    }
    a.onfinish = function () { end(); a.cancel(); };
  }
  var ignorePop = false;
  window.addEventListener("popstate", function () {
    if (ignorePop) { ignorePop = false; return; }
    if (isOpen) { pushed = false; close(true); }
  });

  // Cambio de foto: la actual sale rápido hacia su lado y la nueva entra del contrario.
  // Interrumpible (Emil): un segundo toque a media transición salta al final y arranca la siguiente, sin bloquear.
  var navOut = null, navIn = null, navNext = null;
  var capBox = lb.querySelector(".s-galeria-lb-cap");
  function settleNav() {
    if (navOut) { navOut.onfinish = null; navOut.cancel(); navOut = null; if (navNext) { var n = navNext; navNext = null; n(true); } }
    if (navIn) { navIn.finish(); navIn = null; }
  }
  function go(dir) {
    if (list.length < 2) return;
    settleNav();
    var cur = big.style.transform || "none";
    var outX = -dir * Math.min(window.innerWidth * 0.45, 380);
    navNext = function (skip) {
      idx = (idx + dir + list.length) % list.length;
      big.style.transform = ""; big.style.opacity = "";
      fill(list[idx]);
      if (reduce) return;
      if (!skip) {
        navIn = big.animate([{ transform: "translateX(" + (-outX * 0.6) + "px)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 380, easing: EASE });
        navIn.onfinish = function () { navIn = null; };
      }
      // el pie y el contador acompañan el cambio (estado legible, no decorativo)
      [capBox, countB].forEach(function (el) {
        el.animate([{ opacity: 0, transform: "translateX(" + (dir * 10) + "px)" }, { opacity: 1, transform: "none" }], { duration: 260, easing: EASE });
      });
    };
    if (reduce) { var n0 = navNext; navNext = null; n0(true); return; }
    navOut = big.animate([{ transform: cur, opacity: big.style.opacity || 1 }, { transform: "translateX(" + outX + "px)", opacity: 0 }], { duration: 150, easing: EASE, fill: "forwards" });
    navOut.onfinish = function () { var a = navOut; navOut = null; var n = navNext; navNext = null; n(false); a.cancel(); };
  }

  items.forEach(function (it) {
    it.firstElementChild.addEventListener("click", function () { open(it); });
  });
  btnClose.addEventListener("click", function () { close(false); });
  lb.querySelector(".s-galeria-lb-prev").addEventListener("click", function () { go(-1); });
  lb.querySelector(".s-galeria-lb-next").addEventListener("click", function () { go(1); });
  window.addEventListener("resize", function () { if (isOpen) fit(list[idx]); });

  document.addEventListener("keydown", function (e) {
    if (!isOpen) return;
    if (e.key === "Escape") { e.preventDefault(); close(false); }
    else if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    else if (e.key === "Tab") {
      // foco atrapado dentro del lightbox
      var f = Array.prototype.slice.call(lb.querySelectorAll("button, a[href]"));
      var i = f.indexOf(document.activeElement);
      if (e.shiftKey && (i <= 0)) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && (i === f.length - 1 || i === -1)) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* Gestos: horizontal cambia de foto, hacia abajo cierra */
  var p = null;
  stage.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    settleNav();
    p = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), axis: null, dx: 0, dy: 0 };
    try { stage.setPointerCapture(e.pointerId); } catch (err) {}
  });
  stage.addEventListener("pointermove", function (e) {
    if (!p || e.pointerId !== p.id) return;
    p.dx = e.clientX - p.x; p.dy = e.clientY - p.y;
    if (!p.axis) {
      if (Math.abs(p.dx) < 8 && Math.abs(p.dy) < 8) return;
      p.axis = Math.abs(p.dx) > Math.abs(p.dy) ? "x" : "y";
      lb.classList.add("is-dragging");
    }
    if (p.axis === "x") {
      big.style.transform = "translateX(" + p.dx + "px) rotate(" + (p.dx / 60) + "deg)";
    } else {
      var dy = p.dy < 0 ? p.dy * 0.25 : p.dy;
      var k = Math.min(1, Math.abs(dy) / 420);
      big.style.transform = "translate(" + p.dx * 0.4 + "px," + dy + "px) scale(" + (1 - k * 0.22) + ")";
      bg.style.opacity = String(1 - k * 0.85);
    }
  });
  function release(e) {
    if (!p || e.pointerId !== p.id) return;
    var q = p; p = null;
    var dt = Math.max(1, performance.now() - q.t);
    lb.classList.remove("is-dragging");
    if (!q.axis) {
      // toque fuera de la foto: cierra
      var r = big.getBoundingClientRect();
      if (e.type === "pointerup" && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) close(false);
      return;
    }
    if (q.axis === "x") {
      if (Math.abs(q.dx) > 70 || Math.abs(q.dx) / dt > 0.45) { go(q.dx < 0 ? 1 : -1); return; }
    } else if (q.dy > 110 || (q.dy > 30 && q.dy / dt > 0.5)) {
      close(false); return;
    }
    // regresa a su lugar
    var cur = big.style.transform;
    big.style.transform = ""; bg.style.opacity = "";
    if (!reduce) {
      big.animate([{ transform: cur }, { transform: "none" }], { duration: 580, easing: SPRING_BACK });
      bg.animate([{ opacity: getComputedStyle(bg).opacity }, { opacity: 1 }], { duration: 300, easing: EASE });
    }
  }
  stage.addEventListener("pointerup", release);
  stage.addEventListener("pointercancel", release);
})();
