/* KREVO kit: slider horizontal. Vanilla, sin dependencias.
   Uso: <div class="k-slider" data-mode="object|photo" data-autoplay="4500"> con hijos .k-slide
   API: el.kSlider.go(i) / .next() / .prev() / .index / .pause() / .play()
        window.KSlider.init(el)  (para sliders agregados después)
        evento "k-slide-change" en el .k-slider con detail {index, total} */
(function () {
  'use strict';

  var EASE = 'cubic-bezier(0.23, 1, 0.32, 1)';
  var EASE_IO = 'cubic-bezier(0.77, 0, 0.175, 1)';
  var SPRING = 'cubic-bezier(0.34, 1.32, 0.5, 1)'; // resorte leve (sobrepasa poquito)
  var THRESHOLD = 40;      // px para cambiar de slide
  var VELOCITY = 0.45;     // px/ms para cambiar aunque no llegue al umbral
  var IDLE_RESUME = 7000;  // ms sin tocar para retomar el autoplay
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var uid = 0;

  var ARROW_L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
  var ARROW_R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function splitWords(h) {
    if (!h || h.getAttribute('data-k-split')) return;
    var text = h.textContent.replace(/\s+/g, ' ').trim();
    h.setAttribute('data-k-split', '1');
    h.setAttribute('aria-label', text);
    h.textContent = '';
    text.split(' ').forEach(function (w, i) {
      if (i) h.appendChild(document.createTextNode(' '));
      var o = document.createElement('span');
      o.className = 'k-w';
      o.setAttribute('aria-hidden', 'true');
      var inner = document.createElement('span');
      inner.className = 'k-wi';
      inner.textContent = w;
      o.appendChild(inner);
      h.appendChild(o);
    });
  }

  function Slider(root) {
    if (root.kSlider) return root.kSlider;
    var self = this;
    this.root = root;
    this.mode = root.getAttribute('data-mode') === 'photo' ? 'photo' : 'object';
    this.fxBase = null; // filtro base del CSS (p. ej. brightness/contrast del modo objeto)
    root.setAttribute('data-mode', this.mode);
    this.slides = Array.prototype.slice.call(root.querySelectorAll(':scope > .k-slide, :scope > .k-slider-viewport > .k-slide'));
    this.total = this.slides.length;
    this.index = 0;
    this.anims = [];
    this.finishFn = null;
    this.autoplay = reduce ? 0 : parseInt(root.getAttribute('data-autoplay') || '0', 10) || 0;
    this.visible = false;
    this.hover = false;
    this.userPaused = false;
    this.idleTimer = null;
    this.progress = null;
    this.id = 'ks' + (++uid);
    root.kSlider = this;
    if (!this.total) return;

    this.build();
    this.bind();
    this.setActive(0, true);
    this.observe();
  }

  Slider.prototype.build = function () {
    var root = this.root, self = this;
    root.setAttribute('role', 'region');
    root.setAttribute('aria-roledescription', 'carrusel');
    if (!root.getAttribute('aria-label')) root.setAttribute('aria-label', root.getAttribute('data-label') || 'Galería');
    if (!root.hasAttribute('tabindex')) root.tabIndex = 0;

    var vp = root.querySelector(':scope > .k-slider-viewport');
    if (!vp) {
      vp = document.createElement('div');
      vp.className = 'k-slider-viewport';
      this.slides.forEach(function (s) { vp.appendChild(s); });
      root.insertBefore(vp, root.firstChild);
    }
    this.viewport = vp;

    this.slides.forEach(function (s, i) {
      s.setAttribute('role', 'group');
      s.setAttribute('aria-roledescription', 'slide');
      s.setAttribute('aria-label', (i + 1) + ' de ' + self.total);
      s.id = s.id || self.id + '-s' + (i + 1);
      var img = s.querySelector(':scope > img, :scope > picture');
      var media = s.querySelector(':scope > .k-slide-media');
      if (!media && img) {
        media = document.createElement('div');
        media.className = 'k-slide-media';
        s.insertBefore(media, img);
        media.appendChild(img);
      }
      var im = media ? media.querySelector('img') : null;
      if (im && i > 0 && !im.hasAttribute('loading')) im.loading = 'lazy';
      if (im) im.draggable = false;
      var copy = s.querySelector('.k-slide-copy');
      var h = copy ? copy.querySelector('h1,h2,h3,h4') : null;
      splitWords(h);
      s._k = {
        media: media,
        img: im,
        copy: copy,
        words: h ? Array.prototype.slice.call(h.querySelectorAll('.k-wi')) : [],
        rest: copy ? Array.prototype.slice.call(copy.children).filter(function (c) { return c !== h; }) : []
      };
    });

    // controles
    var ui = document.createElement('div');
    ui.className = 'k-ui';
    var dots = document.createElement('div');
    dots.className = 'k-dots';
    this.dots = this.slides.map(function (s, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'k-dot';
      b.setAttribute('aria-label', 'Ir a la ' + (i + 1));
      b.setAttribute('aria-controls', s.id);
      b.innerHTML = '<span class="k-dot-track"><span class="k-dot-fill"></span></span>';
      b.addEventListener('click', function () { self.interact(); self.go(i); });
      dots.appendChild(b);
      return b;
    });
    var count = document.createElement('div');
    count.className = 'k-count';
    count.setAttribute('aria-live', 'polite');
    count.setAttribute('aria-atomic', 'true');
    this.count = count;

    var arrows = document.createElement('div');
    arrows.className = 'k-arrows';
    var prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'k-arrow k-arrow--prev';
    prev.setAttribute('aria-label', 'Anterior');
    prev.innerHTML = ARROW_L;
    var next = document.createElement('button');
    next.type = 'button';
    next.className = 'k-arrow k-arrow--next';
    next.setAttribute('aria-label', 'Siguiente');
    next.innerHTML = ARROW_R;
    prev.addEventListener('click', function () { self.interact(); self.prev(); });
    next.addEventListener('click', function () { self.interact(); self.next(); });
    arrows.appendChild(prev);
    arrows.appendChild(next);

    ui.appendChild(dots);
    ui.appendChild(count);
    ui.appendChild(arrows);
    root.appendChild(ui);
    if (this.total < 2) ui.hidden = true;
    if (this.autoplay) root.classList.add('has-autoplay');
  };

  Slider.prototype.setActive = function (i, first) {
    var self = this;
    this.slides.forEach(function (s, k) {
      var on = k === i;
      s.classList.toggle('is-active', on);
      if (on) { s.removeAttribute('aria-hidden'); s.inert = false; }
      else { s.setAttribute('aria-hidden', 'true'); s.inert = true; }
    });
    this.dots.forEach(function (d, k) {
      if (k === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
    });
    this.count.innerHTML = '<b>' + pad(i + 1) + '</b> / ' + pad(this.total);
    var bg = this.slides[i].getAttribute('data-bg');
    if (bg) this.root.style.backgroundColor = bg;
    this.index = i;
    if (!first) {
      this.root.dispatchEvent(new CustomEvent('k-slide-change', { detail: { index: i, total: this.total } }));
    }
  };

  /* ---------------- animación ---------------- */

  Slider.prototype.anim = function (el, kf, opt) {
    if (!el || !el.animate) return null;
    opt.fill = 'both';
    var a = el.animate(kf, opt);
    this.anims.push(a);
    return a;
  };

  Slider.prototype.finishNow = function () {
    if (this.finishFn) { var f = this.finishFn; this.finishFn = null; f(); }
  };

  Slider.prototype.textIn = function (s, base) {
    var self = this, k = s._k;
    k.words.forEach(function (w, j) {
      self.anim(w, [{ transform: 'translateY(105%)' }, { transform: 'translateY(0)' }],
        { duration: 620, delay: base + j * 60, easing: EASE });
    });
    var after = base + 120 + k.words.length * 60;
    k.rest.forEach(function (el, j) {
      self.anim(el, [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 520, delay: after + j * 80, easing: EASE });
    });
  };

  Slider.prototype.textOut = function (s, dir) {
    var k = s._k;
    if (!k.copy) return;
    this.anim(k.copy, [{ opacity: 1, transform: 'translateX(0)' }, { opacity: 0, transform: 'translateX(' + (-24 * dir) + 'px)' }],
      { duration: 220, easing: EASE });
  };

  Slider.prototype.currentTransform = function (el) {
    var t = el && el.style.transform;
    return t && t !== 'none' ? t : null;
  };

  Slider.prototype.go = function (to, dirHint) {
    if (this.total < 2) return;
    to = ((to % this.total) + this.total) % this.total;
    if (to === this.index) { this.snapBack(); return; }
    this.finishNow();
    var self = this;
    var from = this.index;
    var dir = dirHint || (to > from ? 1 : -1);
    var out = this.slides[from], inn = this.slides[to];
    var ko = out._k, ki = inn._k;

    out.classList.add('is-leaving');
    this.setActive(to);
    this.restartProgress();

    if (reduce) {
      out.classList.remove('is-leaving');
      if (ko.img) ko.img.style.transform = '';
      return;
    }

    var dragT = this.currentTransform(ko.img);
    var dragF = ko.img ? ko.img.style.filter : '';

    if (this.mode === 'object') {
      // sale el actual: a la izquierda, gira y se desenfoca
      this.anim(ko.img, [
        { transform: dragT || 'translateX(0) rotate(0deg)', opacity: 1, filter: dragF || this.fx(0) },
        { transform: 'translateX(' + (-60 * dir) + '%) rotate(' + (-8 * dir) + 'deg) scale(0.96)', opacity: 0, filter: this.fx(6) }
      ], { duration: 520, easing: EASE });
      // entra el nuevo: desde la derecha con resorte leve
      this.anim(ki.img, [
        { transform: 'translateX(' + (55 * dir) + '%) rotate(' + (7 * dir) + 'deg) scale(0.94)', opacity: 0, filter: this.fx(6), offset: 0 },
        { opacity: 1, filter: this.fx(0), offset: 0.55 },
        { transform: 'translateX(0) rotate(0deg) scale(1)', opacity: 1, filter: this.fx(0), offset: 1 }
      ], { duration: 720, delay: 90, easing: SPRING });
      try {
        this.anim(ko.media, [{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: EASE, pseudoElement: '::after' });
        this.anim(ki.media, [{ opacity: 0, transform: 'translateX(-50%) scaleX(0.6)' }, { opacity: 1, transform: 'translateX(-50%) scaleX(1)' }],
          { duration: 600, delay: 260, easing: EASE, pseudoElement: '::after' });
      } catch (e) { /* navegadores sin pseudoElement: sin sombra animada */ }
    } else {
      // foto: la saliente se corre un poco (parallax) y la nueva entra con cortinilla
      var rd = this.round(ki.media);
      var clipFrom = (dir > 0 ? 'inset(0 0 0 100%' : 'inset(0 100% 0 0') + rd + ')';
      this.anim(ko.img, [
        { transform: dragT || 'translateX(0) scale(1)' },
        { transform: 'translateX(' + (-10 * dir) + '%) scale(1)' }
      ], { duration: 780, easing: EASE_IO });
      this.anim(ki.media, [{ clipPath: clipFrom }, { clipPath: 'inset(0 0 0 0' + rd + ')' }], { duration: 780, easing: EASE_IO });
      this.anim(ki.img, [{ transform: 'scale(1.06)' }, { transform: 'scale(1)' }], { duration: 900, easing: EASE });
    }

    this.textOut(out, dir);
    this.textIn(inn, this.mode === 'object' ? 200 : 260);

    var list = this.anims.slice();
    var done = false;
    var finish = function () {
      if (done) return;
      done = true;
      list.forEach(function (a) { try { a.cancel(); } catch (e) {} });
      self.anims = self.anims.filter(function (a) { return list.indexOf(a) < 0; });
      out.classList.remove('is-leaving');
      if (ko.img) { ko.img.style.transform = ''; ko.img.style.filter = ''; ko.img.style.opacity = ''; }
      if (self.finishFn === finish) self.finishFn = null;
    };
    this.finishFn = finish;
    Promise.all(list.map(function (a) { return a.finished; })).then(finish, function () {});
  };

  // Filtro base del CSS + blur, para que las animaciones no borren el ajuste
  // de blancos (si no, durante el blur reaparece el recuadro de la foto).
  Slider.prototype.fx = function (px) {
    if (this.fxBase === null) {
      var im = null;
      for (var i = 0; i < this.slides.length && !im; i++) im = this.slides[i]._k && this.slides[i]._k.img;
      var f = '';
      if (im) {
        var prev = im.style.filter; im.style.filter = '';
        f = getComputedStyle(im).filter; im.style.filter = prev;
      }
      this.fxBase = (!f || f === 'none') ? '' : f + ' ';
    }
    return this.fxBase + 'blur(' + px + 'px)';
  };

  // Radio de esquina de la media, para que las cortinillas no lo pierdan
  Slider.prototype.round = function (el) {
    var r = el ? getComputedStyle(el).borderTopLeftRadius : '';
    return r && r !== '0px' ? ' round ' + r : '';
  };

  Slider.prototype.next = function () { this.go(this.index + 1, 1); };
  Slider.prototype.prev = function () { this.go(this.index - 1, -1); };

  // Primera vez que se ve: el texto del slide actual entra
  Slider.prototype.intro = function () {
    if (this.introDone || reduce) return;
    this.introDone = true;
    var s = this.slides[this.index];
    if (this.mode === 'object' && s._k.img) {
      this.anim(s._k.img, [
        { transform: 'translateX(18%) rotate(5deg) scale(0.95)', opacity: 0, filter: this.fx(6) },
        { transform: 'translateX(0) rotate(0deg) scale(1)', opacity: 1, filter: this.fx(0) }
      ], { duration: 760, easing: SPRING });
    } else if (s._k.media) {
      var rd0 = this.round(s._k.media);
      this.anim(s._k.media, [{ clipPath: 'inset(0 0 0 100%' + rd0 + ')' }, { clipPath: 'inset(0 0 0 0' + rd0 + ')' }], { duration: 820, easing: EASE_IO });
      this.anim(s._k.img, [{ transform: 'scale(1.06)' }, { transform: 'scale(1)' }], { duration: 950, easing: EASE });
    }
    this.textIn(s, 160);
    var list = this.anims.slice(), self = this;
    Promise.all(list.map(function (a) { return a.finished; })).then(function () {
      list.forEach(function (a) { try { a.cancel(); } catch (e) {} });
      self.anims = self.anims.filter(function (a) { return list.indexOf(a) < 0; });
    }, function () {});
  };

  /* ---------------- arrastre ---------------- */

  Slider.prototype.dragTo = function (dx) {
    var img = this.slides[this.index]._k.img;
    if (!img) return;
    var w = this.root.clientWidth || 1;
    var r = dx / w; // -1..1
    if (this.mode === 'object') {
      var x = dx * 0.55;
      img.style.transform = 'translateX(' + x.toFixed(1) + 'px) rotate(' + (r * 10).toFixed(2) + 'deg)';
      img.style.filter = this.fx(Math.min(4, Math.abs(r) * 8).toFixed(2));
    } else {
      // escala justa para cubrir el corrimiento: sin franja vacia ni borde recto
      // dentro de la esquina redondeada
      var px = dx * 0.22, mw = (img.parentNode && img.parentNode.clientWidth) || w;
      var sc = 1 + (2 * Math.abs(px) + 2) / mw;
      img.style.transform = 'translateX(' + px.toFixed(1) + 'px) scale(' + sc.toFixed(4) + ')';
    }
  };

  Slider.prototype.snapBack = function () {
    var img = this.slides[this.index]._k.img;
    if (!img || !this.currentTransform(img)) return;
    var t = img.style.transform, f = img.style.filter || this.fx(0);
    img.style.transform = '';
    img.style.filter = '';
    if (reduce || !img.animate) return;
    img.animate([{ transform: t, filter: f }, { transform: this.mode === 'object' ? 'translateX(0) rotate(0deg)' : 'translateX(0) scale(1)', filter: this.fx(0) }],
      { duration: 480, easing: SPRING });
  };

  Slider.prototype.bind = function () {
    var self = this, root = this.root;
    var st = null;

    root.addEventListener('pointerdown', function (e) {
      if (self.total < 2) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (e.target.closest('.k-ui')) return;
      st = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId, drag: false, dead: false, lx: e.clientX, lt: performance.now(), v: 0 };
    });

    root.addEventListener('pointermove', function (e) {
      if (!st || st.dead || e.pointerId !== st.id) return;
      var dx = e.clientX - st.x, dy = e.clientY - st.y;
      if (!st.drag) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        if (Math.abs(dy) > Math.abs(dx)) { st.dead = true; return; } // scroll vertical, lo dejamos pasar
        st.drag = true;
        self.finishNow();
        self.interact();
        root.classList.add('is-dragging');
        try { root.setPointerCapture(e.pointerId); } catch (err) {}
      }
      var now = performance.now();
      var dt = Math.max(16, now - st.lt);
      st.v = 0.7 * ((e.clientX - st.lx) / dt) + 0.3 * st.v;
      st.lx = e.clientX; st.lt = now;
      self.dragTo(dx);
    });

    function end(e) {
      if (!st || e.pointerId !== st.id) return;
      var s = st; st = null;
      root.classList.remove('is-dragging');
      if (!s.drag) return;
      var dx = e.clientX - s.x;
      var fast = Math.abs(s.v) > VELOCITY && Math.sign(s.v) === Math.sign(dx);
      if (Math.abs(dx) > THRESHOLD || (fast && Math.abs(dx) > 10)) {
        if (dx < 0) self.next(); else self.prev();
      } else {
        self.snapBack();
      }
      // evita que el arrastre dispare un click en el botón del slide
      var block = function (ev) { ev.preventDefault(); ev.stopPropagation(); };
      root.addEventListener('click', block, { capture: true, once: true });
      setTimeout(function () { root.removeEventListener('click', block, { capture: true }); }, 0);
    }
    root.addEventListener('pointerup', end);
    root.addEventListener('pointercancel', function (e) {
      if (!st || e.pointerId !== st.id) return;
      var drag = st.drag; st = null;
      root.classList.remove('is-dragging');
      if (drag) self.snapBack();
    });

    // Trackpad: scroll horizontal (deltaX) cambia de slide
    var acc = 0, locked = false, lastWheel = 0, lockTimer = null;
    root.addEventListener('wheel', function (e) {
      if (self.total < 2) return;
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // vertical: la página sigue
      e.preventDefault();
      var now = performance.now();
      if (now - lastWheel > 220) acc = 0;
      lastWheel = now;
      clearTimeout(lockTimer);
      if (locked) { lockTimer = setTimeout(function () { locked = false; acc = 0; }, 200); return; }
      acc += e.deltaX;
      if (Math.abs(acc) > THRESHOLD) {
        self.interact();
        if (acc > 0) self.next(); else self.prev();
        acc = 0;
        locked = true; // espera a que termine la inercia del trackpad
        lockTimer = setTimeout(function () { locked = false; acc = 0; }, 200);
        setTimeout(function () { if (performance.now() - lastWheel > 150) locked = false; }, 900);
      }
    }, { passive: false });

    root.addEventListener('keydown', function (e) {
      if (e.target.closest('input,textarea,select')) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); self.interact(); self.next(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); self.interact(); self.prev(); }
    });

    // pausas del autoplay
    root.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { self.hover = true; self.sync(); } });
    root.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { self.hover = false; self.sync(); } });
    root.addEventListener('dragstart', function (e) { e.preventDefault(); });
    // solo el foco de teclado pausa (un tap/click no deja el autoplay congelado)
    root.addEventListener('focusin', function (e) {
      var fv = false;
      try { fv = e.target.matches(':focus-visible'); } catch (err) {}
      if (fv) { self.focus = true; self.sync(); }
    });
    root.addEventListener('focusout', function (e) { if (!root.contains(e.relatedTarget)) { self.focus = false; self.sync(); } });
    document.addEventListener('visibilitychange', function () { self.sync(); });
  };

  Slider.prototype.observe = function () {
    var self = this;
    if (!('IntersectionObserver' in window)) { this.visible = true; this.intro(); this.sync(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        self.visible = en.isIntersecting && en.intersectionRatio > 0.25;
        if (self.visible) self.intro();
        self.sync();
      });
    }, { threshold: [0, 0.25, 0.5] });
    io.observe(this.root);
  };

  /* ---------------- autoplay + barrita de progreso ---------------- */

  Slider.prototype.interact = function () {
    if (!this.autoplay) return;
    var self = this;
    this.userPaused = true;
    this.sync();
    clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(function () { self.userPaused = false; self.restartProgress(); }, IDLE_RESUME);
  };

  Slider.prototype.restartProgress = function () {
    if (!this.autoplay) return;
    var self = this;
    if (this.progress) { this.progress.onfinish = null; this.progress.cancel(); }
    var fill = this.dots[this.index].querySelector('.k-dot-fill');
    if (!fill.animate) return;
    this.progress = fill.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
      { duration: this.autoplay, easing: 'linear', fill: 'forwards' });
    this.progress.onfinish = function () { self.next(); };
    this.sync();
  };

  Slider.prototype.running = function () {
    return this.autoplay && this.visible && !this.hover && !this.focus && !this.userPaused && !document.hidden;
  };

  Slider.prototype.sync = function () {
    if (!this.autoplay) return;
    if (!this.progress) { if (this.visible) this.restartProgress(); return; }
    if (this.running()) { if (this.progress.playState !== 'running') this.progress.play(); }
    else if (this.progress.playState === 'running') this.progress.pause();
  };

  Slider.prototype.pause = function () { this.userPaused = true; clearTimeout(this.idleTimer); this.sync(); };
  Slider.prototype.play = function () { this.userPaused = false; this.sync(); };

  function initAll() {
    Array.prototype.forEach.call(document.querySelectorAll('.k-slider'), function (el) { new Slider(el); });
  }

  window.KSlider = { init: function (el) { return new Slider(el); }, initAll: initAll };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll);
  else initAll();
})();
