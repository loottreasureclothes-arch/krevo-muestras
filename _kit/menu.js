/* KREVO kit: menu (restaurantes / bares). Vanilla, sin dependencias. */
(function(){
  'use strict';
  var uid = 0;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  function noMotion(){ return !!(reduce && reduce.matches); }

  function init(root){
    if (root.__kMenu) return;
    root.__kMenu = true;
    var tablist = root.querySelector('.k-menu-tabs');
    if (!tablist) return;
    tablist.setAttribute('role', 'tablist');
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"], button'));
    var panels = Array.prototype.slice.call(root.querySelectorAll(':scope > .k-menu-panel'));
    if (!tabs.length || !panels.length) return;
    var id = 'kmenu' + (++uid);

    // Pila de paneles para el crossfade
    var stack = document.createElement('div');
    stack.className = 'k-menu-stack';
    panels[0].parentNode.insertBefore(stack, panels[0]);
    panels.forEach(function(p){ stack.appendChild(p); });

    // Indicador
    var ind = document.createElement('span');
    ind.className = 'k-menu-ind';
    ind.setAttribute('aria-hidden', 'true');
    tablist.appendChild(ind);

    // Clases de items (sin precio / con miniatura)
    panels.forEach(function(p){
      p.querySelectorAll('li').forEach(function(li){
        if (!li.querySelector('.k-mi-price')) li.classList.add('k-mi--noprice');
        if (li.querySelector('.k-mi-img')) li.classList.add('k-mi--img');
      });
    });

    // ARIA
    var current = 0;
    tabs.forEach(function(t, i){
      t.setAttribute('role', 'tab');
      t.setAttribute('type', 'button');
      if (!t.id) t.id = id + '-tab-' + i;
      var p = panels[i];
      if (p){
        p.setAttribute('role', 'tabpanel');
        if (!p.id) p.id = id + '-panel-' + i;
        p.setAttribute('aria-labelledby', t.id);
        p.setAttribute('tabindex', '0');
        t.setAttribute('aria-controls', p.id);
      }
      if (t.getAttribute('aria-selected') === 'true') current = i;
    });
    if (current >= panels.length) current = 0;
    tabs.forEach(function(t, i){
      var on = i === current;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.setAttribute('tabindex', on ? '0' : '-1');
      if (panels[i]) panels[i].hidden = !on;
    });

    function place(tab){
      // posicion final en coordenadas del contenido del tablist (scrolla con el)
      ind.style.width = tab.offsetWidth + 'px';
      ind.style.left = tab.offsetLeft + 'px';
    }

    function moveIndicator(from, to){
      if (noMotion() || !from || from === to){ ind.classList.remove('is-anim'); ind.style.transform = ''; place(to); return; }
      // FLIP: First
      var first = { x: from.offsetLeft, w: from.offsetWidth };
      // Last
      place(to);
      var last = { x: to.offsetLeft, w: to.offsetWidth || 1 };
      // Invert
      ind.classList.remove('is-anim');
      ind.style.transform = 'translateX(' + (first.x - last.x) + 'px) scaleX(' + (first.w / last.w) + ')';
      ind.getBoundingClientRect(); // reflow: fija el estado invertido
      // Play
      ind.classList.add('is-anim');
      ind.style.transform = 'translateX(0) scaleX(1)';
    }

    function centerTab(tab, smooth){
      if (tablist.scrollWidth <= tablist.clientWidth + 1) return;
      var left = tab.offsetLeft - (tablist.clientWidth - tab.offsetWidth) / 2;
      left = Math.max(0, Math.min(left, tablist.scrollWidth - tablist.clientWidth));
      try { tablist.scrollTo({ left: left, behavior: smooth && !noMotion() ? 'smooth' : 'auto' }); }
      catch(e){ tablist.scrollLeft = left; }
    }

    var leaveTimer = null;
    function swapPanels(oldP, newP){
      if (!newP || oldP === newP) return;
      clearTimeout(leaveTimer);
      panels.forEach(function(p){
        if (p !== oldP && p !== newP){ p.hidden = true; p.classList.remove('is-leaving','is-entering','is-entered'); }
      });
      if (noMotion() || !oldP){
        if (oldP){ oldP.hidden = true; oldP.classList.remove('is-leaving'); }
        newP.hidden = false;
        return;
      }
      oldP.classList.remove('is-entering','is-entered');
      oldP.classList.add('is-leaving');
      newP.classList.remove('is-leaving','is-entered');
      newP.classList.add('is-entering');
      newP.hidden = false;
      newP.getBoundingClientRect(); // reflow
      newP.classList.remove('is-entering');
      newP.classList.add('is-entered');
      leaveTimer = setTimeout(function(){
        oldP.hidden = true;
        oldP.classList.remove('is-leaving');
        newP.classList.remove('is-entered');
      }, 340);
    }

    function select(i, opts){
      opts = opts || {};
      if (i < 0 || i >= tabs.length) return;
      var prev = current;
      var tab = tabs[i];
      if (i !== prev){
        tabs.forEach(function(t, k){
          var on = k === i;
          t.setAttribute('aria-selected', on ? 'true' : 'false');
          t.setAttribute('tabindex', on ? '0' : '-1');
        });
        moveIndicator(tabs[prev], tab);
        swapPanels(panels[prev], panels[i]);
        current = i;
        root.dispatchEvent(new CustomEvent('k-menu:change', { detail: { index: i, tab: tab } }));
      }
      if (opts.focus) tab.focus({ preventScroll: true });
      centerTab(tab, true);
    }

    tabs.forEach(function(t, i){
      t.addEventListener('click', function(){ select(i); });
    });

    tablist.addEventListener('keydown', function(e){
      var idx = tabs.indexOf(document.activeElement);
      if (idx < 0) return;
      var n = tabs.length, next = null;
      switch (e.key){
        case 'ArrowRight': next = (idx + 1) % n; break;
        case 'ArrowLeft':  next = (idx - 1 + n) % n; break;
        case 'Home':       next = 0; break;
        case 'End':        next = n - 1; break;
        default: return;
      }
      e.preventDefault();
      select(next, { focus: true });
    });

    // Colocacion inicial y en resize
    function sync(){ ind.classList.remove('is-anim'); ind.style.transform = ''; place(tabs[current]); }
    sync();
    centerTab(tabs[current], false);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(sync);
    if ('ResizeObserver' in window){
      new ResizeObserver(sync).observe(tablist);
    } else {
      window.addEventListener('resize', sync);
    }
    root.classList.add('is-ready');
  }

  function boot(){
    document.querySelectorAll('.k-menu').forEach(init);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  window.KrevoMenu = { init: init };
})();
