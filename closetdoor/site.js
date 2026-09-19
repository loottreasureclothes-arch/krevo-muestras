/* Closet&Door: WhatsApp, hero, carrusel propio, menu, microinteracciones y cotizador */
(function () {
  "use strict";
  var WA = "524494463411";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }

  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      links[i].href = waUrl(links[i].getAttribute("data-wa"));
      links[i].target = "_blank";
      links[i].rel = "noopener";
    }
  }

  /* ---------- Hero: titulo por palabras, espera foto y fuentes ---------- */
  function initHero() {
    var hero = document.querySelector(".cd-hero");
    if (!hero) return;
    var h = hero.querySelector("[data-split]");
    if (h) {
      var label = h.textContent.replace(/\s+/g, " ").trim();
      var n = 0;
      Array.prototype.slice.call(h.childNodes).forEach(function (node) {
        if (node.nodeType === 3) {
          var frag = document.createDocumentFragment();
          node.textContent.split(/(\s+)/).forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
            var o = document.createElement("span"); o.className = "cd-split-w";
            var i = document.createElement("span"); i.textContent = p; i.style.setProperty("--w", n++);
            o.appendChild(i); frag.appendChild(o);
          });
          h.replaceChild(frag, node);
        } else if (node.nodeType === 1) {
          var o2 = document.createElement("span"); o2.className = "cd-split-w";
          var i2 = document.createElement("span"); i2.style.setProperty("--w", n++);
          h.replaceChild(o2, node); i2.appendChild(node); o2.appendChild(i2);
        }
      });
      h.setAttribute("aria-label", label);
    }
    var li = 0, fi = 0;
    Array.prototype.forEach.call(hero.querySelectorAll(".cd-hero-list li, .cd-hero-facts li"), function (el) {
      el.style.setProperty("--i", el.parentNode.classList.contains("cd-hero-facts") ? fi++ : li++);
    });
    var img = hero.querySelector(".cd-hero-fig img");
    var done = false;
    function go() {
      if (done) return; done = true;
      requestAnimationFrame(function () { requestAnimationFrame(function () { hero.classList.add("is-go"); }); });
    }
    var waits = [];
    if (img && !img.complete && img.decode) waits.push(img.decode().catch(function () {}));
    if (document.fonts && document.fonts.ready) waits.push(document.fonts.ready);
    Promise.all(waits).then(go, go);
    setTimeout(go, 1200);

    // parallax de una vez al primer scroll
    function onScroll() {
      if ((window.scrollY || window.pageYOffset) > 40) { hero.classList.add("is-moved"); window.removeEventListener("scroll", onScroll); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Carrusel propio: scroll nativo con snap, la tarjeta sigue al dedo ---------- */
  function initCarousel() {
    var root = document.querySelector(".cd-car");
    if (!root) return null;
    var track = root.querySelector(".cd-car-track");
    var slides = Array.prototype.slice.call(track.querySelectorAll(".cd-slide"));
    var dotsWrap = document.querySelector(".cd-dots");
    var count = document.getElementById("cd-count");
    var index = 0, raf = 0, auto = 0, lastUser = 0;
    var AUTOPLAY = 5000;

    var dots = slides.map(function (s, i) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "cd-dot"; b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "Ir a " + (s.querySelector("h3") || {}).textContent);
      b.innerHTML = "<i></i>";
      b.addEventListener("click", function () { user(); go(i); });
      dotsWrap.appendChild(b);
      return b;
    });

    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function slideLeft(i) { return slides[i].offsetLeft - parseFloat(getComputedStyle(track).scrollPaddingLeft || 0); }
    function go(i, instant) {
      i = (i + slides.length) % slides.length;
      track.scrollTo({ left: slideLeft(i), behavior: instant || reduce ? "auto" : "smooth" });
    }
    function setActive(i) {
      if (i === index && dots[i].getAttribute("aria-selected") === "true") return;
      index = i;
      dots.forEach(function (d, k) { d.setAttribute("aria-selected", k === i ? "true" : "false"); });
      slides.forEach(function (s, k) { s.classList.toggle("is-active", k === i); });
      if (count) count.textContent = pad(i + 1);
    }
    // escala y opacidad segun la distancia al centro de la posicion activa
    function frame() {
      raf = 0;
      var base = parseFloat(getComputedStyle(track).scrollPaddingLeft || 0);
      var x = track.scrollLeft + base;
      var best = 0, bestD = Infinity;
      slides.forEach(function (s, k) {
        var w = s.offsetWidth || 1;
        var d = (s.offsetLeft - x) / w;
        var ad = Math.min(Math.abs(d), 1);
        if (Math.abs(d) < bestD) { bestD = Math.abs(d); best = k; }
        if (!reduce) {
          s.style.setProperty("--s", (1 - ad * 0.06).toFixed(4));
          s.style.setProperty("--o", Math.max(0, d < 0 ? 1 - ad * 2.2 : 1 - ad * 0.75).toFixed(3));
        }
      });
      setActive(best);
    }
    track.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(frame); }, { passive: true });
    window.addEventListener("resize", function () { if (!raf) raf = requestAnimationFrame(frame); });

    // arrastre con mouse en compu (en celular es scroll nativo)
    var drag = null;
    track.addEventListener("pointerdown", function (e) {
      user();
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      drag = { x: e.clientX, left: track.scrollLeft, moved: false, start: index };
      track.classList.add("is-dragging");
    });
    window.addEventListener("pointermove", function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.x;
      if (Math.abs(dx) > 4) drag.moved = true;
      track.scrollLeft = drag.left - dx;
    });
    window.addEventListener("pointerup", function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.x, d = drag;
      drag = null;
      track.classList.remove("is-dragging");
      var target = d.start;
      if (dx < -60) target = d.start + 1; else if (dx > 60) target = d.start - 1;
      target = Math.max(0, Math.min(slides.length - 1, target));
      go(target);
      if (d.moved) {
        var stop = function (ev) { ev.preventDefault(); ev.stopPropagation(); track.removeEventListener("click", stop, true); };
        track.addEventListener("click", stop, true);
        setTimeout(function () { track.removeEventListener("click", stop, true); }, 50);
      }
    });
    track.addEventListener("wheel", user, { passive: true });
    track.addEventListener("touchstart", user, { passive: true });

    Array.prototype.forEach.call(document.querySelectorAll(".cd-arrow"), function (b) {
      b.addEventListener("click", function () { user(); go(index + parseInt(b.getAttribute("data-dir"), 10)); });
    });
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); user(); go(index + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); user(); go(index - 1); }
    });

    // autoplay: solo cuando se ve y nadie lo toco en 8 s
    var visible = false;
    function user() { lastUser = Date.now(); }
    function tick() {
      if (visible && !document.hidden && Date.now() - lastUser > 8000 && !drag) go(index + 1);
    }
    if (!reduce && "IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting && es[0].intersectionRatio > 0.5; }, { threshold: [0, 0.5, 1] }).observe(root);
      auto = setInterval(tick, AUTOPLAY);
    }
    frame();
    return { go: function (i) { user(); go(i); } };
  }

  /* ---------- Menu de celular ---------- */
  function initMenu() {
    var btn = document.querySelector(".cd-menu-btn");
    var menu = document.getElementById("cd-menu");
    if (!btn || !menu) return;
    var body = document.body;
    Array.prototype.forEach.call(menu.querySelectorAll(".cd-menu-nav a"), function (a, i) { a.style.setProperty("--i", i); });
    function set(open) {
      body.classList.toggle("cd-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      btn.querySelector(".cd-menu-lbl").textContent = open ? "Cerrar" : "Menú";
    }
    btn.addEventListener("click", function () { set(!body.classList.contains("cd-menu-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
    window.addEventListener("resize", function () { if (window.innerWidth >= 900) set(false); });
  }

  /* ---------- Brillo al tocar botones ---------- */
  function initRipple() {
    if (reduce) return;
    document.addEventListener("pointerdown", function (e) {
      var b = e.target.closest(".k-btn, .cd-card-cta, .cd-hero-list a");
      if (!b) return;
      var r = b.getBoundingClientRect();
      var s = document.createElement("span");
      s.className = "cd-ripple";
      s.style.left = (e.clientX - r.left) + "px";
      s.style.top = (e.clientY - r.top) + "px";
      b.appendChild(s);
      setTimeout(function () { s.remove(); }, 460);
    });
  }

  /* ---------- Chips del hero: saltan a su trabajo en el carrusel ---------- */
  function initGo(car) {
    Array.prototype.forEach.call(document.querySelectorAll("[data-go]"), function (a) {
      a.addEventListener("click", function () {
        var i = parseInt(a.getAttribute("data-go"), 10);
        if (car) setTimeout(function () { car.go(i); }, 450);
      });
    });
  }

  function initSteps() {
    var ol = document.querySelector(".cd-steps");
    if (!ol) return;
    Array.prototype.forEach.call(ol.children, function (li, i) { li.style.setProperty("--i", i); });
    if (!("IntersectionObserver" in window)) { ol.classList.add("is-run"); return; }
    var io = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) { ol.classList.add("is-run"); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(ol);
  }

  function initClip() {
    var els = document.querySelectorAll(".cd-clip");
    if (!("IntersectionObserver" in window)) { Array.prototype.forEach.call(els, function (e) { e.classList.add("is-in"); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.2 });
    Array.prototype.forEach.call(els, function (e) { io.observe(e); });
  }

  /* ---------- Cotizador ---------- */
  function initForm() {
    var f = document.getElementById("cd-form");
    if (!f) return;
    var err = document.getElementById("cd-err");
    var btn = f.querySelector(".cd-submit");
    var t = 0;
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var tipo = f.querySelector('input[name="tipo"]:checked');
      var med = f.medidas.value.trim();
      var col = f.colonia.value.trim();
      var nom = f.nombre.value.trim();
      var miss = [];
      f.colonia.classList.toggle("is-bad", !col);
      f.nombre.classList.toggle("is-bad", !nom);
      if (!tipo) miss.push("el mueble");
      if (!col) miss.push("tu colonia");
      if (!nom) miss.push("tu nombre");
      if (miss.length) {
        err.textContent = "Falta " + miss.join(", ").replace(/, ([^,]*)$/, " y $1") + ".";
        err.hidden = false;
        return;
      }
      err.hidden = true;
      var msg = "Hola Closet&Door, soy " + nom + ". Quiero cotizar: " + tipo.value + "." +
        (med ? "\nMedidas aprox.: " + med + "." : "") +
        "\nColonia: " + col + ".";
      var url = waUrl(msg);
      var w = window.open(url, "_blank");
      if (w) { try { w.opener = null; } catch (x) {} } else { location.href = url; }
      btn.classList.add("is-sent");
      clearTimeout(t);
      t = setTimeout(function () { btn.classList.remove("is-sent"); }, 3000);
    });
    f.addEventListener("input", function (e) {
      if (e.target.classList) e.target.classList.remove("is-bad");
    });
  }

  function init() {
    initWa(); initHero(); initMenu(); initRipple();
    var car = initCarousel();
    initGo(car); initSteps(); initClip(); initForm();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
