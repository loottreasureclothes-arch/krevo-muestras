/* KREVO _kit · heroobjeto.js
   Vanilla + Web Animations API. No depende de GSAP ni de otros componentes.
   - Carga: el objeto cae desde -40vh con resorte corto, rotación -10deg a 0, sombra de contacto
     que crece al aterrizar. Título por palabras con máscara (60 ms de escalón). Botones fade-up.
   - Primer scroll (40px): clase .is-open; el objeto gira y se corre, los facts entran uno por uno
     (todo por transiciones CSS, < 1.5 s). Si regresas hasta arriba, se revierte suave.
   - Parallax sutil con el mouse solo en (hover:hover) and (pointer:fine).
   - prefers-reduced-motion: todo visible y quieto. */
(function () {
  "use strict";
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canAnimate = !reduce && typeof Element !== "undefined" && "animate" in Element.prototype;
  if (canAnimate) root.classList.add("k-ho-js");

  var EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
  var THRESHOLD = 40;

  function wrap(el, cls) {
    var w = document.createElement("div");
    w.className = cls;
    el.parentNode.insertBefore(w, el);
    w.appendChild(el);
    return w;
  }

  /* Parte el título en palabras con máscara. Los elementos internos (em, span) cuentan
     como una palabra; los <br> se respetan. */
  function splitTitle(h) {
    var words = [];
    var label = h.textContent.replace(/\s+/g, " ").trim();
    var nodes = Array.prototype.slice.call(h.childNodes);
    nodes.forEach(function (n) {
      if (n.nodeType === 3) {
        var parts = n.textContent.split(/(\s+)/);
        var frag = document.createDocumentFragment();
        parts.forEach(function (p) {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
          var outer = document.createElement("span");
          outer.className = "k-ho-w";
          var inner = document.createElement("span");
          inner.textContent = p;
          outer.appendChild(inner);
          frag.appendChild(outer);
          words.push(inner);
        });
        h.replaceChild(frag, n);
      } else if (n.nodeType === 1 && n.tagName !== "BR") {
        var o = document.createElement("span");
        o.className = "k-ho-w";
        var i = document.createElement("span");
        h.replaceChild(o, n);
        i.appendChild(n);
        o.appendChild(i);
        words.push(i);
      }
    });
    h.setAttribute("aria-label", label);
    Array.prototype.forEach.call(h.querySelectorAll(".k-ho-w"), function (w) { w.setAttribute("aria-hidden", "true"); });
    return words;
  }

  function init(sec) {
    if (sec.__kho) return;
    sec.__kho = true;

    var bg = sec.getAttribute("data-bg");
    if (bg) sec.style.backgroundColor = bg;

    var img = sec.querySelector(".k-ho-img");
    var title = sec.querySelector("[data-ho-title]");
    var actions = sec.querySelector(".k-ho-actions");
    var lead = sec.querySelector(".k-ho-copy p");
    var facts = sec.querySelectorAll(".k-ho-facts li");
    Array.prototype.forEach.call(facts, function (li, i) { li.style.setProperty("--i", i); });

    var shift, para, drop, shadow;
    if (img) {
      drop = wrap(img, "k-ho-drop");
      para = wrap(drop, "k-ho-para");
      shift = wrap(para, "k-ho-shift");
      shadow = document.createElement("div");
      shadow.className = "k-ho-shadow";
      shadow.setAttribute("aria-hidden", "true");
      para.insertBefore(shadow, drop);
    }

    if (!canAnimate) {
      sec.classList.add("ho-live", "is-open");
      return;
    }

    var words = title ? splitTitle(title) : [];

    function intro() {
      sec.classList.add("ho-live");
      var vh = window.innerHeight;

      if (drop) {
        img.style.opacity = "1";
        drop.animate([
          { transform: "translateY(" + (-0.4 * vh) + "px) rotate(-10deg)", opacity: 0, easing: "cubic-bezier(0.55, 0, 0.9, 0.5)" },
          { transform: "translateY(" + (-0.3 * vh) + "px) rotate(-8deg)", opacity: 1, offset: 0.12, easing: "cubic-bezier(0.5, 0, 0.9, 0.6)" },
          { transform: "translateY(0) rotate(0.6deg) scaleY(0.975)", offset: 0.55, easing: "cubic-bezier(0.2, 0.6, 0.35, 1)" },
          { transform: "translateY(-2.2%) rotate(-0.5deg) scaleY(1.01)", offset: 0.75, easing: "cubic-bezier(0.45, 0, 0.55, 1)" },
          { transform: "translateY(0) rotate(0deg) scaleY(1)", opacity: 1 }
        ], { duration: 900, fill: "backwards" });

        shadow.animate([
          { transform: "translateY(50%) scale(0.35)", opacity: 0, easing: "cubic-bezier(0.55, 0, 0.9, 0.5)" },
          { transform: "translateY(50%) scale(1.1)", opacity: 1, offset: 0.55, easing: "cubic-bezier(0.2, 0.6, 0.35, 1)" },
          { transform: "translateY(50%) scale(0.92)", opacity: 0.85, offset: 0.75, easing: "cubic-bezier(0.45, 0, 0.55, 1)" },
          { transform: "translateY(50%) scale(1)", opacity: 1 }
        ], { duration: 900, fill: "backwards" });
      }

      words.forEach(function (w, i) {
        w.animate([
          { transform: "translateY(105%)" },
          { transform: "translateY(0)" }
        ], { duration: 720, delay: 120 + i * 60, easing: EASE_OUT, fill: "backwards" });
      });

      var after = 120 + words.length * 60 + 220;
      [lead, actions].forEach(function (el, i) {
        if (!el) return;
        el.style.opacity = "1";
        el.animate([
          { opacity: 0, transform: "translateY(16px)" },
          { opacity: 1, transform: "translateY(0)" }
        ], { duration: 640, delay: after + i * 90, easing: EASE_OUT, fill: "backwards" });
      });
    }

    /* Primer scroll: abre una vez; arriba del todo se cierra suave. */
    var open = false;
    var introEnd = performance.now() + 820;
    var pending = 0;
    function setOpen(v) {
      if (v === open) return;
      open = v;
      sec.classList.toggle("is-open", v);
    }
    function onScroll() {
      var y = window.pageYOffset || root.scrollTop || 0;
      var want = open ? y > 2 : y > THRESHOLD;
      if (want === open) return;
      var wait = introEnd - performance.now();
      clearTimeout(pending);
      if (want && wait > 0) { pending = setTimeout(onScroll, wait); return; }
      setOpen(want);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    /* Parallax con mouse, solo con puntero fino. */
    var fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (para && fine.matches) {
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
      var tick = function () {
        cx += (tx - cx) * 0.08;
        cy += (ty - cy) * 0.08;
        para.style.transform = "translate3d(" + (cx * 16).toFixed(2) + "px," + (cy * 10).toFixed(2) + "px,0) rotate(" + (cx * 1.6).toFixed(2) + "deg)";
        if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(tick);
        else raf = 0;
      };
      sec.addEventListener("pointermove", function (e) {
        if (e.pointerType && e.pointerType !== "mouse") return;
        var r = sec.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
        if (!raf) raf = requestAnimationFrame(tick);
      });
      sec.addEventListener("pointerleave", function () {
        tx = 0; ty = 0;
        if (!raf) raf = requestAnimationFrame(tick);
      });
    }

    var start = function () {
      requestAnimationFrame(function () {
        intro();
        introEnd = performance.now() + 820;
        onScroll();
      });
    };
    if (img && !img.complete && img.decode) {
      var done = false;
      var go = function () { if (!done) { done = true; start(); } };
      img.decode().then(go, go);
      setTimeout(go, 1200);
    } else {
      start();
    }
  }

  function boot() {
    Array.prototype.forEach.call(document.querySelectorAll(".k-hero-obj"), init);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
