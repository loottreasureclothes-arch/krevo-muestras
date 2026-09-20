/* 30 · Menú de mesa (clonado de lamexico/25-menu, SIN precios): una categoría a la vez (chips que filtran) + buscador, "+" / "− n +" por tarjeta y hoja de detalle.
 * El carrito vive en 26-pedido.js (window.tsPedido). Sin JS el menú completo se lee igual. */
(function () {
  'use strict';
  function init() {
    var root = document.getElementById('menu');
    var P = window.tsPedido;
    if (!root || !P || root.__lmMM) return;
    root.__lmMM = true;
    var money = P.money;
    var cards = Array.prototype.slice.call(root.querySelectorAll('.ts-mm-card'));
    var byId = {};

    function data(card) {
      if (card.__d) return card.__d;
      var d = card.dataset, opts = null;
      try { opts = d.opts ? JSON.parse(d.opts) : null; } catch (e) {}
      card.__d = { id: d.id, name: d.name, price: 0, desc: d.desc || '', img: d.img || '', ia: d.ia === '1', tag: d.tag || '', opts: opts };
      return card.__d;
    }

    /* ---------- Controles por tarjeta ---------- */
    function renderCtl(card) {
      var it = data(card), ctl = card.querySelector('.ts-mm-ctl'), q = P.qtyOf(it.id);
      card.classList.toggle('is-in', q > 0);
      if (it.opts || q === 0) {
        ctl.innerHTML = '<button class="ts-mm-add" type="button" aria-label="Agregar ' + esc(it.name) + '">+</button>' +
          (q > 0 ? '<span class="ts-mm-count" aria-label="' + q + ' en tu pedido">' + q + '</span>' : '');
        ctl.firstChild.addEventListener('click', function () {
          if (it.opts) openDlg(card); else P.add({ id: it.id, name: it.name, price: 0 }, 1);
        });
      } else {
        ctl.innerHTML = '<div class="ts-mm-step"><button type="button" data-d="-1" aria-label="Quitar uno de ' + esc(it.name) + '">&minus;</button><output>' + q + '</output><button type="button" data-d="1" aria-label="Agregar otro ' + esc(it.name) + '">+</button></div>';
        ctl.querySelectorAll('button').forEach(function (b) {
          b.addEventListener('click', function () { P.setQty(it.id, P.qtyOf(it.id) + (+b.dataset.d)); });
        });
      }
    }
    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    cards.forEach(function (c) {
      byId[data(c).id] = c;
      renderCtl(c);
      c.querySelector('.ts-mm-hit').addEventListener('click', function () { openDlg(c); });
    });
    // Sólo repinta las tarjetas cuyo conteo cambió
    var last = {};
    P.onChange(function () {
      cards.forEach(function (c) {
        var id = data(c).id, q = P.qtyOf(id);
        if (last[id] !== q) { last[id] = q; renderCtl(c); }
      });
    });
    cards.forEach(function (c) { last[data(c).id] = P.qtyOf(data(c).id); });

    /* ---------- Hoja de detalle ---------- */
    var dlg = document.createElement('div');
    dlg.className = 'ts-mm-dlg';
    dlg.hidden = true;
    dlg.setAttribute('role', 'dialog');
    dlg.setAttribute('aria-modal', 'true');
    dlg.setAttribute('aria-labelledby', 'ts-mm-dlg-name');
    dlg.innerHTML = '<button class="ts-mm-dlg-bg" type="button" tabindex="-1" aria-label="Cerrar"></button>' +
      '<div class="ts-mm-dlg-box"><button class="ts-mm-dlg-x" type="button" aria-label="Cerrar">&times;</button>' +
      '<div class="ts-mm-dlg-ph"></div><div class="ts-mm-dlg-in">' +
      '<div class="ts-mm-dlg-top"><h3 class="ts-mm-dlg-name" id="ts-mm-dlg-name"></h3><b class="ts-mm-dlg-price"></b></div>' +
      '<p class="ts-mm-dlg-desc"></p><a class="ts-mm-dlg-ask" href="#" target="_blank" rel="noopener">Pregunta el precio por WhatsApp</a><span class="ts-mm-tag" hidden></span><fieldset class="ts-mm-opts" hidden><legend>Elige</legend></fieldset>' +
      '<div class="ts-mm-dlg-row"><div class="ts-mm-step"><button type="button" data-d="-1" aria-label="Menos">&minus;</button><output>1</output><button type="button" data-d="1" aria-label="Más">+</button></div>' +
      '<button class="ts-mm-dlg-add" type="button">Agregar</button></div></div></div>';
    document.body.appendChild(dlg);
    var $d = function (s) { return dlg.querySelector(s); };
    var cur = null, qty = 1, opt = null, lastFocus = null;

    function price() { return opt ? opt[1] : cur.price; }
    function paint() {
      $d('.ts-mm-dlg-step output, .ts-mm-step output').textContent = qty;
      $d('.ts-mm-dlg-price').textContent = '';
      $d('.ts-mm-dlg-add').textContent = 'Agregar ' + qty + ' a mi pedido';
      var ask = $d('.ts-mm-dlg-ask');
      if (ask && window.TS) ask.href = TS.waUrl('Hola, ¿qué precio tiene ' + cur.name + ' en Tierra Santa?');
    }
    function openDlg(card) {
      cur = data(card); qty = 1; opt = cur.opts ? cur.opts[0] : null; lastFocus = document.activeElement;
      var ph = $d('.ts-mm-dlg-ph');
      ph.className = 'ts-mm-dlg-ph' + (cur.img ? '' : ' ts-mm-dlg-ph--tx');
      ph.innerHTML = '';
      if (cur.img) {
        var im = new Image(); im.src = cur.img; im.alt = (cur.ia ? 'Ilustración: ' : '') + cur.name; im.width = 1200; im.height = 900; ph.appendChild(im);
        if (cur.ia) { var lb = document.createElement('span'); lb.className = 'ts-mm-ill'; lb.textContent = 'Foto ilustrativa'; ph.appendChild(lb); }
      } else {
        var s = document.createElement('span'); s.textContent = cur.name; ph.appendChild(s);
      }
      $d('.ts-mm-dlg-name').textContent = cur.name;
      $d('.ts-mm-dlg-desc').textContent = cur.desc;
      var tg = $d('.ts-mm-dlg-in > .ts-mm-tag'); tg.hidden = !cur.tag; tg.textContent = cur.tag;
      var fs = $d('.ts-mm-opts');
      fs.querySelectorAll('.ts-mm-opt').forEach(function (n) { n.remove(); });
      fs.hidden = !cur.opts;
      if (cur.opts) {
        cur.opts.forEach(function (o, i) {
          var l = document.createElement('label'); l.className = 'ts-mm-opt';
          l.innerHTML = '<input type="radio" name="ts-mm-opt"' + (i === 0 ? ' checked' : '') + '><span></span>';
          var multi = cur.opts.some(function (x) { return x[1] !== cur.opts[0][1]; });
          l.querySelector('span').textContent = o[0];
          l.querySelector('input').addEventListener('change', function () { opt = o; paint(); });
          fs.appendChild(l);
        });
      }
      paint();
      dlg.hidden = false;
      document.documentElement.classList.add('ts-mm-lock');
      if (window.tsLayer) window.tsLayer.open('platillo', function () { closeDlg(true); });
      requestAnimationFrame(function () { dlg.classList.add('is-open'); });
      setTimeout(function () { $d('.ts-mm-dlg-add').focus({ preventScroll: true }); }, 30);
    }
    function closeDlg(fromPop) {
      if (dlg.hidden) return;
      if (fromPop !== true && window.tsLayer) window.tsLayer.close('platillo');
      dlg.classList.remove('is-open');
      dlg.hidden = true;
      document.documentElement.classList.remove('ts-mm-lock');
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
    dlg.querySelectorAll('.ts-mm-dlg-row .ts-mm-step button').forEach(function (b) {
      b.addEventListener('click', function () { qty = Math.max(1, Math.min(50, qty + (+b.dataset.d))); paint(); });
    });
    $d('.ts-mm-dlg-add').addEventListener('click', function () {
      P.add({ id: cur.id, name: cur.name, opt: opt ? opt[0] : '', price: 0 }, qty);
      closeDlg();
    });
    $d('.ts-mm-dlg-x').addEventListener('click', closeDlg);
    $d('.ts-mm-dlg-bg').addEventListener('click', closeDlg);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !dlg.hidden) closeDlg(); });

    /* ---------- Una categoría a la vez: los chips filtran, el buscador busca en todo ---------- */
    var bar = root.querySelector('.ts-mm-chips'), strip = root.querySelector('.ts-mm-chips-in');
    var chips = Array.prototype.slice.call(root.querySelectorAll('.ts-mm-chip'));
    var cats = chips.map(function (c) { return document.getElementById(c.getAttribute('href').slice(1)); });
    var q = root.querySelector('#ts-mm-q'), qx = root.querySelector('.ts-mm-search-x'), none = root.querySelector('.ts-mm-noresult');
    var body = root.querySelector('.ts-mm-body');
    function headerH() { return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--k-header-h')) || 64; }
    var on = 0;
    var next = document.createElement('button');
    next.type = 'button'; next.className = 'ts-mm-next'; next.hidden = true;
    var legal = root.querySelector('.ts-mm-legal');
    if (legal && body) body.insertBefore(next, legal);
    next.addEventListener('click', function () { setOn(+next.dataset.k); toTop(true); });
    root.classList.add('ts-mm--one');
    function setOn(i) {
      on = i;
      chips.forEach(function (c, j) { c.classList.toggle('is-on', j === i); if (j === i) c.setAttribute('aria-current', 'true'); else c.removeAttribute('aria-current'); });
      cats.forEach(function (c, j) { if (c) c.classList.toggle('is-shown', j === i); });
      if (next) {
        var k = (i + 1) % chips.length;
        next.hidden = false;
        next.innerHTML = '<span>Sigue: <b></b></span>';
        next.querySelector('b').textContent = chips[k].textContent;
        next.dataset.k = k;
      }
      var c = chips[i];
      if (c && strip) strip.scrollLeft = Math.max(0, c.offsetLeft - (strip.clientWidth - c.offsetWidth) / 2);
    }
    // Si la barra de chips ya está pegada arriba, sube al inicio de la categoría (sin smooth)
    function toTop(force) {
      if (!bar || !body) return;
      var stuck = force || bar.getBoundingClientRect().top <= headerH() + 1;
      if (stuck) window.scrollTo(0, body.getBoundingClientRect().top + window.pageYOffset - headerH() - bar.offsetHeight);
    }
    chips.forEach(function (c, i) {
      c.addEventListener('click', function (e) {
        if (!cats[i]) return;
        e.preventDefault();
        if (q && q.value) { q.value = ''; search(); }
        setOn(i);
        toTop();
      });
    });
    function norm(t) { return String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
    cards.forEach(function (c) { var d = data(c); c.__txt = norm(d.name + ' ' + d.desc + ' ' + (d.tag || '')); });
    function search() {
      var t = q ? norm(q.value.trim()) : '';
      if (qx) qx.hidden = !t;
      if (t.length < 2) {
        root.classList.remove('ts-mm--q');
        cards.forEach(function (c) { c.hidden = false; });
        if (none) none.hidden = true;
        setOn(on);
        return;
      }
      root.classList.add('ts-mm--q');
      next.hidden = true;
      var words = t.split(/\s+/), n = 0;
      cards.forEach(function (c) { var hit = words.every(function (w) { return c.__txt.indexOf(w) > -1; }); c.hidden = !hit; if (hit) n++; });
      cats.forEach(function (c) { if (c) c.classList.toggle('is-shown', !!c.querySelector('.ts-mm-card:not([hidden])')); });
      chips.forEach(function (c) { c.classList.remove('is-on'); c.removeAttribute('aria-current'); });
      if (none) { none.hidden = n > 0; none.textContent = n ? '' : 'No encontramos "' + q.value.trim() + '". Prueba con otra palabra o elige una categoría.'; }
    }
    if (q) {
      q.addEventListener('input', search);
      q.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); q.blur(); } });
      qx.addEventListener('click', function () { q.value = ''; search(); q.focus(); });
    }
    // Arranca en Cortes (primera categoría), salvo que la URL ya llegue con #m-xxx (deep link desde index.html
    // o desde la hoja de accesos): en ese caso abre esa categoría desde el primer pintado.
    var startAt = 0;
    if (location.hash) {
      for (var si = 0; si < chips.length; si++) if (chips[si].getAttribute('href') === location.hash) { startAt = si; break; }
    }
    setOn(startAt);
    document.addEventListener('ts:goto', function (e) {
      var h = e.detail || '';
      for (var i = 0; i < chips.length; i++) if (chips[i].getAttribute('href') === h) { if (q && q.value) { q.value = ''; search(); } setOn(i); return; }
    });
    // Los botones "Pregunta el precio" no abren la hoja del platillo
    root.querySelectorAll('.ts-mm-ask').forEach(function (a) { a.addEventListener('click', function (e) { e.stopPropagation(); }); });
  }
  // Los scripts diferidos corren en orden (25 antes que 26): si el carrito aún no existe, espera a DOMContentLoaded.
  if (window.tsPedido && document.readyState !== 'loading') init();
  else if (document.readyState === 'complete') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
