/* KREVO kit: antes / después. Vanilla, se inicia solo. */
(function(){
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var easeOut = function(t){ return 1 - Math.pow(1 - t, 3); };
  var easeInOut = function(t){ return t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2; };
  var clamp = function(v, a, b){ return Math.max(a, Math.min(b, v)); };
  var ARROWS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 7l-5 5 5 5"/><path d="M15 7l5 5-5 5"/></svg>';

  function init(root){
    if (root.__kba) return;
    root.__kba = true;
    var before = root.querySelector('.k-ba-before');
    var after = root.querySelector('.k-ba-after');
    if (!before || !after) return;
    [before, after].forEach(function(img){ img.setAttribute('draggable','false'); });

    var lb = document.createElement('span');
    lb.className = 'k-ba-label k-ba-label--before';
    lb.textContent = root.getAttribute('data-label-before') || 'Antes';
    lb.setAttribute('aria-hidden','true');
    var la = document.createElement('span');
    la.className = 'k-ba-label k-ba-label--after';
    la.textContent = root.getAttribute('data-label-after') || 'Después';
    la.setAttribute('aria-hidden','true');

    var track = document.createElement('div');
    track.className = 'k-ba-track';
    track.innerHTML = '<span class="k-ba-line"></span><span class="k-ba-handle">' + ARROWS + '</span>';
    var handle = track.querySelector('.k-ba-handle');

    var range = document.createElement('input');
    range.type = 'range'; range.min = '0'; range.max = '100'; range.step = '1'; range.value = '50';
    range.className = 'k-ba-range';
    range.setAttribute('aria-label', root.getAttribute('data-label') || 'Comparar antes y después');

    root.appendChild(lb); root.appendChild(la); root.appendChild(track); root.appendChild(range);

    var cur = 50, target = 50;
    var mode = 'idle';           // idle | follow | tween | sweep
    var tw = null;               // {from,to,start,dur,ease} o lista de segmentos
    var raf = 0;
    var interacted = false;

    function render(p){
      cur = p;
      root.style.setProperty('--p', p.toFixed(2));
      lb.classList.toggle('is-hidden', p < 12);
      la.classList.toggle('is-hidden', p > 88);
      var r = Math.round(p);
      if (range.value != r){ range.value = r; }
      range.setAttribute('aria-valuetext', r + '% antes');
    }

    function loop(now){
      raf = 0;
      if (mode === 'follow'){
        var d = target - cur;
        if (Math.abs(d) < 0.05){ render(target); }
        else { render(cur + d * 0.38); }
        raf = requestAnimationFrame(loop);
        return;
      }
      if ((mode === 'tween' || mode === 'sweep') && tw){
        if (!tw.start) tw.start = now;
        var seg = tw.segs[tw.i];
        var t = clamp((now - tw.start) / seg.dur, 0, 1);
        render(seg.from + (seg.to - seg.from) * seg.ease(t));
        if (t >= 1){
          tw.i++; tw.start = now;
          if (tw.i >= tw.segs.length){ tw = null; mode = 'idle'; return; }
        }
        raf = requestAnimationFrame(loop);
      }
    }
    function kick(){ if (!raf) raf = requestAnimationFrame(loop); }

    function tweenTo(p, dur){
      p = clamp(p, 0, 100);
      if (reduce){ mode = 'idle'; tw = null; render(p); return; }
      mode = 'tween';
      tw = { i:0, start:0, segs:[{ from:cur, to:p, dur:dur || 420, ease:easeOut }] };
      kick();
    }

    function sweep(){
      if (reduce || interacted) return;
      mode = 'sweep';
      tw = { i:0, start:0, segs:[
        { from:cur, to:15, dur:480, ease:easeInOut },
        { from:15,  to:85, dur:720, ease:easeInOut },
        { from:85,  to:50, dur:400, ease:easeInOut }
      ]};
      kick();
    }

    function pct(clientX){
      var r = root.getBoundingClientRect();
      return clamp((clientX - r.left) / r.width * 100, 0, 100);
    }

    // Arrastre con pointer events
    var ptr = null; // {id,x,y,offset,active,onHandle,type}
    root.addEventListener('pointerdown', function(e){
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      if (ptr) return;
      interacted = true;
      var onHandle = handle.contains(e.target);
      ptr = { id:e.pointerId, x:e.clientX, y:e.clientY, onHandle:onHandle, active:false,
              offset: onHandle ? cur - pct(e.clientX) : 0, type:e.pointerType };
      // Con mouse o tomando la manija: arrastre inmediato (sin salto: seguimiento suave)
      if (e.pointerType === 'mouse' || onHandle){
        start(e);
        if (!onHandle){ e.preventDefault(); }
      }
    });

    function start(e){
      ptr.active = true;
      try { root.setPointerCapture(ptr.id); } catch(_){}
      root.classList.add('is-dragging');
      mode = 'follow'; tw = null;
      target = clamp(pct(e.clientX) + ptr.offset, 0, 100);
      kick();
    }

    root.addEventListener('pointermove', function(e){
      if (!ptr || e.pointerId !== ptr.id) return;
      if (!ptr.active){
        var dx = Math.abs(e.clientX - ptr.x), dy = Math.abs(e.clientY - ptr.y);
        if (dx > 6 && dx > dy){ start(e); }
        else if (dy > 8){ ptr = null; } // el usuario está haciendo scroll vertical
        return;
      }
      target = clamp(pct(e.clientX) + ptr.offset, 0, 100);
      kick();
    });

    function end(e){
      if (!ptr || e.pointerId !== ptr.id) return;
      var wasActive = ptr.active;
      var moved = Math.abs(e.clientX - ptr.x) > 6;
      try { root.releasePointerCapture(ptr.id); } catch(_){}
      root.classList.remove('is-dragging');
      if (e.type === 'pointerup' && !ptr.onHandle && (!wasActive || !moved)){
        // Toque en cualquier punto: animación corta hasta ahí
        tweenTo(pct(e.clientX), 380);
      } else if (mode === 'follow'){
        // Deja que el seguimiento termine suave y luego se detiene
        tweenTo(target, 220);
      }
      ptr = null;
    }
    root.addEventListener('pointerup', end);
    root.addEventListener('pointercancel', function(e){
      if (!ptr || e.pointerId !== ptr.id) return;
      root.classList.remove('is-dragging');
      if (mode === 'follow') tweenTo(target, 220);
      ptr = null;
    });
    root.addEventListener('dragstart', function(e){ e.preventDefault(); });

    // Teclado
    range.addEventListener('input', function(){
      interacted = true;
      tweenTo(parseFloat(range.value), 260);
    });
    range.addEventListener('focus', function(){ root.classList.add('is-focus'); });
    range.addEventListener('blur', function(){ root.classList.remove('is-focus'); });
    root.addEventListener('keydown', function(e){
      if (e.target === range) return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight'){ range.focus(); }
    });

    render(50);

    // Barrido de pista la primera vez que entra a la vista
    if ('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if (en.isIntersecting){
            io.disconnect();
            setTimeout(sweep, 250);
          }
        });
      }, { threshold: 0.55 });
      io.observe(root);
    }
  }

  function boot(){ document.querySelectorAll('.k-ba').forEach(init); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  window.KrevoBA = { init: init };
})();
