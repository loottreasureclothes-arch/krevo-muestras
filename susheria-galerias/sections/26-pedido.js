/* 26 · Pedido de mesa: carrito, hoja de resumen, WhatsApp y "Mostrar a mi mesero".
 *
 * API pública (la usa 25-menu.js y, a futuro, el pago):
 *   window.lmPedido = {
 *     items      -> [{key, id, name, opt, price, qty}]   (copia)
 *     total      -> número (suma de price * qty; total ESTIMADO)
 *     mesa       -> "7" o ""
 *     add(item, qty), setQty(key, qty), qtyOf(id), onChange(fn), onCheckout(fn), open()
 *   }
 *
 * PAGO FUTURO (NO implementado): onCheckout(fn) recibe el pedido cuando el cliente
 * lo manda por WhatsApp o se lo muestra al mesero. Ahí se conectaría:
 *   - Stripe Checkout: fn -> fetch('/api/checkout', {method:'POST', body: JSON.stringify(pedido)})
 *     y redirigir a session.url.
 *   - Mercado Pago (Checkout Pro): fn -> backend crea la "preferencia" y se redirige a init_point.
 * El backend (p. ej. un Cloudflare Worker) guarda la llave secreta; nunca va en este archivo.
 * El botón de pago iría en la hoja, junto a "Enviar por WhatsApp" (ver 26-pedido.html, .lm-pd-actions).
 */
(function () {
  'use strict';
  /* REV1: la hoja vive directo en <body> (no dentro de <main>) para que ningún transform de una sección padre la atrape */
  var pdRoot = document.getElementById('pedido');
  if (pdRoot && pdRoot.parentNode !== document.body) document.body.appendChild(pdRoot);
  var WA = '524491204319'; // WhatsApp de pedidos (flyer público de su Facebook "Susheria SUSHI & BEER")
  var KEY = 'sg_pedido';
  var TTL = 12 * 60 * 60 * 1000; // un pedido viejo (más de 12 h) se descarta

  /* Capas con "Atrás" (Android): cada hoja o pantalla abierta mete una entrada al historial;
   * el botón Atrás cierra la capa de arriba en vez de sacar al cliente de la página.
   * window.lmLayer.open(nombre, cerrar) / .close(nombre). Lo usan también el diálogo del platillo (25-menu.js). */
  var layer = window.lmLayer = (function () {
    var stack = [], skip = 0;
    window.addEventListener('popstate', function () {
      if (skip > 0) { skip--; return; }
      var top = stack.pop();
      if (top) top.fn();
    });
    return {
      open: function (name, fn) {
        stack = stack.filter(function (x) { return x.name !== name; });
        stack.push({ name: name, fn: fn });
        try { history.pushState({ lmLayer: name }, ''); } catch (e) {}
      },
      close: function (name) {
        var i = -1;
        for (var k = stack.length - 1; k >= 0; k--) if (stack[k].name === name) { i = k; break; }
        if (i < 0) return;
        stack.splice(i, 1);
        skip++;
        try { history.back(); } catch (e) { skip--; }
      }
    };
  })();

  var S = { lines: [], note: '', mode: 'domicilio', mesa: '', suc: 'galerias', hora: '', dir: '', nombre: '', ts: 0 };
  var SUC = { galerias: 'Galerías', arqueros: 'Arqueros', presidentes: 'Presidentes', haciendas: 'Haciendas' };
  function sucName() { return SUC[S.suc] || 'Galerías'; }
  var subs = [], checkoutFns = [];

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return;
      var d = JSON.parse(raw);
      if (!d || !d.ts || Date.now() - d.ts > TTL) return;
      for (var k in S) if (d[k] !== undefined) S[k] = d[k];
      if (!Array.isArray(S.lines)) S.lines = [];
      if (!SUC[S.suc]) S.suc = 'galerias';
      if (['domicilio', 'recoger', 'mesa'].indexOf(S.mode) < 0) S.mode = 'domicilio';
    } catch (e) {}
  }
  function save() {
    S.ts = Date.now();
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
  }
  function money(n) { return '$' + Math.round(n).toLocaleString('es-MX'); }
  function total() { return S.lines.reduce(function (t, l) { return t + l.price * l.qty; }, 0); }
  function count() { return S.lines.reduce(function (t, l) { return t + l.qty; }, 0); }
  function emit() { save(); render(); subs.forEach(function (f) { try { f(api); } catch (e) {} }); }

  function add(item, qty) {
    qty = qty || 1;
    var key = item.id + (item.opt ? '|' + item.opt : '');
    var l = S.lines.find(function (x) { return x.key === key; });
    if (l) l.qty += qty;
    else S.lines.push({ key: key, id: item.id, name: item.name, opt: item.opt || '', price: +item.price || 0, qty: qty });
    emit();
  }
  function setQty(key, qty) {
    var i = S.lines.findIndex(function (x) { return x.key === key; });
    if (i < 0) return;
    if (qty <= 0) S.lines.splice(i, 1); else S.lines[i].qty = qty;
    emit();
  }
  function qtyOf(id) { return S.lines.reduce(function (t, l) { return t + (l.id === id ? l.qty : 0); }, 0); }

  var api = {
    get items() { return S.lines.map(function (l) { return Object.assign({}, l); }); },
    get total() { return total(); },
    get mesa() { return S.mesa; },
    get sucursal() { return sucName(); },
    get state() { return JSON.parse(JSON.stringify(S)); },
    add: add, setQty: setQty, qtyOf: qtyOf, money: money,
    onChange: function (fn) { subs.push(fn); },
    onCheckout: function (fn) { checkoutFns.push(fn); },
    open: function () { openSheet(); }
  };
  window.lmPedido = api;

  function fireCheckout(via) {
    var p = { via: via, items: api.items, total: total(), mesa: S.mesa, sucursal: sucName(), modo: S.mode, nota: S.note };
    checkoutFns.forEach(function (f) { try { f(p); } catch (e) {} });
  }

  /* ---------- DOM ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var bar, mini, sheet, list, totalEl, waBtn, meseroBtn, err, mesero, lastFocus, sucFixed = false;

  function lineLabel(l) { return l.name + (l.opt ? ' (' + l.opt + ')' : ''); }
  function hhmm(d) { d = d || new Date(); return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); }

  function waText() {
    var t = 'Hola, quiero hacer un pedido en Sushería Galerías (sucursal ' + sucName() + ').\n';
    if (S.nombre.trim()) t += 'Soy ' + S.nombre.trim() + '.\n';
    if (S.mode === 'domicilio') t += 'Es a domicilio: ' + (S.dir.trim() || '(te paso la dirección)') + '.\n';
    else if (S.mode === 'recoger') t += 'Paso a recogerlo' + (S.hora ? ' a las ' + S.hora : '') + '.\n';
    else t += 'Estoy en la mesa ' + (S.mesa || '(sin número)') + '.\n';
    t += '\n';
    S.lines.forEach(function (l) { t += l.qty + ' x ' + lineLabel(l) + ' (' + money(l.price * l.qty) + ')\n'; });
    t += '\nTotal estimado: ' + money(total());
    if (S.mode === 'domicilio') t += ' + envío';
    if (S.note.trim()) t += '\nNota: ' + S.note.trim();
    t += '\n¿Me confirman el total' + (S.mode === 'domicilio' ? ', el envío' : '') + ' y el tiempo?';
    return t;
  }
  function waUrl() { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(waText()); }

  function render() {
    if (!bar) return;
    var n = count(), tot = total();
    bar.hidden = n === 0;
    document.documentElement.classList.toggle('lm-pd-has', n > 0);
    $('.lm-pd-bar-n', bar).textContent = n;
    $('.lm-pd-bar-t', bar).textContent = money(tot);
    $('.lm-pd-bar-mesa', bar).textContent = S.mode === 'mesa' && S.mesa ? 'Mesa ' + S.mesa : '';
    $('.lm-pd-mini-n', mini).textContent = n;
    mini.hidden = n === 0;
    mini.setAttribute('aria-label', 'Ver mi pedido: ' + n + (n === 1 ? ' producto' : ' productos'));
    sheet.querySelectorAll('input[name="lm-pd-suc"]').forEach(function (r) { r.checked = r.value === S.suc; });
    var sb = document.getElementById('lm-mm-mesa');
    if (sb && S.mode === 'mesa' && S.mesa && sucFixed) { sb.textContent = 'Mesa ' + S.mesa + ' · ' + sucName(); sb.hidden = false; }
    bar.setAttribute('aria-label', 'Ver mi pedido: ' + n + (n === 1 ? ' producto' : ' productos') + ', ' + money(tot));

    list.innerHTML = '';
    if (!S.lines.length) {
      var e = document.createElement('li');
      e.className = 'lm-pd-empty';
      e.textContent = 'Tu pedido está vacío. Agrega rollos, platillos o bebidas desde el menú.';
      list.appendChild(e);
    }
    S.lines.forEach(function (l) {
      var li = document.createElement('li');
      li.className = 'lm-pd-line';
      li.innerHTML = '<div class="lm-pd-line-tx"><b></b><small></small></div>' +
        '<div class="lm-mm-step lm-pd-step"><button type="button" data-d="-1" aria-label="Quitar uno">&minus;</button><output></output><button type="button" data-d="1" aria-label="Agregar uno">+</button></div>' +
        '<span class="lm-pd-line-t"></span>';
      $('b', li).textContent = l.name;
      $('small', li).textContent = (l.opt ? l.opt + ' · ' : '') + money(l.price) + ' c/u';
      $('output', li).textContent = l.qty;
      $('.lm-pd-line-t', li).textContent = money(l.price * l.qty);
      li.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () { setQty(l.key, l.qty + (+b.dataset.d)); });
      });
      list.appendChild(li);
    });
    totalEl.textContent = money(tot);
    waBtn.href = waUrl();
    sheet.querySelectorAll('[data-mode-f]').forEach(function (f) { f.hidden = f.dataset.modeF !== S.mode; });
    meseroBtn.hidden = S.mode !== 'mesa';
    var dis = !S.lines.length;
    waBtn.classList.toggle('is-off', dis);
    waBtn.setAttribute('aria-disabled', dis ? 'true' : 'false');
    meseroBtn.disabled = dis;
  }

  function showRetry() {
    var r = document.getElementById('lm-pd-retry');
    if (!r) { r = document.createElement('a'); r.id = 'lm-pd-retry'; r.className = 'lm-pd-retry'; r.textContent = '¿No se abrió WhatsApp? Toca aquí'; r.target = '_blank'; r.rel = 'noopener'; waBtn.parentNode.insertBefore(r, waBtn.nextSibling); }
    r.href = waUrl();
  }
  function lock(on) { document.documentElement.classList.toggle('lm-mm-lock', on); }
  function openSheet() {
    lastFocus = document.activeElement;
    err.hidden = true;
    sheet.hidden = false;
    lock(true);
    layer.open('sheet', function () { closeSheet(true); });
    requestAnimationFrame(function () { sheet.classList.add('is-open'); });
    setTimeout(function () { var c = $('.lm-pd-x', sheet); c && c.focus({ preventScroll: true }); }, 30);
  }
  function closeSheet(fromPop) {
    if (sheet.hidden) return;
    if (fromPop !== true) layer.close('sheet');
    sheet.classList.remove('is-open');
    sheet.hidden = true;
    lock(false);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  function needMesa() {
    var miss = null, msg = '';
    if (S.mode === 'mesa' && !String(S.mesa).trim()) { miss = '#lm-pd-mesa'; msg = 'Escribe tu número de mesa para que te lo lleven.'; }
    else if (S.mode === 'domicilio' && S.dir.trim().length < 6) { miss = '#lm-pd-dir'; msg = 'Escribe tu dirección y colonia para mandarte el pedido.'; }
    if (miss) { err.textContent = msg; err.hidden = false; var m = $(miss); m.focus(); return true; }
    err.hidden = true;
    return false;
  }
  function showMesero() {
    if (!S.lines.length || needMesa()) return;
    $('.lm-ms-mesa', mesero).textContent = S.mesa;
    $('.lm-ms-suc', mesero).textContent = 'Sushería Galerías · ' + sucName();
    var ul = $('.lm-ms-list', mesero);
    ul.innerHTML = '';
    S.lines.forEach(function (l) {
      var li = document.createElement('li');
      li.innerHTML = '<b></b><span></span>';
      $('b', li).textContent = l.qty;
      $('span', li).textContent = lineLabel(l);
      ul.appendChild(li);
    });
    var nt = $('.lm-ms-note', mesero);
    nt.hidden = !S.note.trim();
    nt.textContent = S.note.trim() ? 'Nota: ' + S.note.trim() : '';
    $('.lm-ms-total', mesero).textContent = money(total());
    $('.lm-ms-hora', mesero).textContent = hhmm();
    mesero.hidden = false;
    lock(true);
    layer.open('mesero', function () { closeMesero(true); });
    fireCheckout('mesero');
    setTimeout(function () { $('.lm-ms-x', mesero).focus({ preventScroll: true }); }, 30);
  }
  function closeMesero(fromPop) { if (mesero.hidden) return; if (fromPop !== true) layer.close('mesero'); mesero.hidden = true; if (sheet.hidden) lock(false); meseroBtn.focus({ preventScroll: true }); }

  function scrollToMenu() {
    var m = document.querySelector('#menu .lm-mm-head') || document.getElementById('menu');
    if (!m) return;
    var hh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--k-header-h')) || 64;
    window.scrollTo(0, Math.max(0, m.getBoundingClientRect().top + window.pageYOffset - hh - 16));
  }

  function init() {
    bar = $('#lm-pd-bar'); mini = $('#lm-pd-mini'); sheet = $('#lm-pd-sheet'); mesero = $('#lm-pd-mesero');
    if (!bar || !mini || !sheet || !mesero) return;
    list = $('.lm-pd-list', sheet); totalEl = $('.lm-pd-total b', sheet);
    waBtn = $('#lm-pd-wa'); meseroBtn = $('#lm-pd-mesero-btn'); err = $('#lm-pd-err');
    load();

    // ?suc=galerias|arqueros|presidentes|haciendas fija la sucursal (el QR de cada mesa la trae); si no viene, se elige en la hoja
    var qs = ((location.search.match(/[?&]suc=([a-z]+)/i) || [])[1] || '').toLowerCase();
    if (SUC[qs]) { S.suc = qs; sucFixed = true; save(); }
    var sucF = $('.lm-pd-suc', sheet);
    if (sucF) sucF.hidden = sucFixed;
    sheet.querySelectorAll('input[name="lm-pd-suc"]').forEach(function (r) {
      r.addEventListener('change', function () { if (r.checked) { S.suc = r.value; emit(); } });
    });

    // ?mesa=N preselecciona la mesa y abre directo en el menú
    var qm = (location.search.match(/[?&]mesa=([0-9]{1,3})\b/) || [])[1];
    if (qm) {
      S.mode = 'mesa'; S.mesa = String(+qm); save();
      var badge = document.getElementById('lm-mm-mesa');
      if (badge) { badge.textContent = 'Mesa ' + S.mesa + (sucFixed ? ' · ' + sucName() : ''); badge.hidden = false; }
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      var moved = false;
      var mark = function () { moved = true; };
      window.addEventListener('wheel', mark, { passive: true, once: true });
      window.addEventListener('touchstart', mark, { passive: true, once: true });
      scrollToMenu();
      window.addEventListener('load', function () { if (!moved) scrollToMenu(); });
      setTimeout(function () { if (!moved) scrollToMenu(); }, 900);
    }

    // Campos de la hoja
    var note = $('#lm-pd-note'), mesa = $('#lm-pd-mesa'), hora = $('#lm-pd-hora'), dir = $('#lm-pd-dir'), nombre = $('#lm-pd-nombre');
    note.value = S.note; mesa.value = S.mesa; hora.value = S.hora; dir.value = S.dir; nombre.value = S.nombre;
    var radios = sheet.querySelectorAll('input[name="lm-pd-mode"]');
    radios.forEach(function (r) {
      r.checked = r.value === S.mode;
      r.addEventListener('change', function () { if (r.checked) { S.mode = r.value; err.hidden = true; emit(); } });
    });
    function bind(el, k, fn) { el.addEventListener('input', function () { S[k] = fn ? fn() : el.value; save(); waBtn.href = waUrl(); }); }
    bind(note, 'note'); bind(hora, 'hora'); bind(nombre, 'nombre');
    dir.addEventListener('input', function () { S.dir = dir.value; err.hidden = true; save(); waBtn.href = waUrl(); });
    mesa.addEventListener('input', function () { S.mesa = mesa.value.replace(/[^0-9]/g, '').slice(0, 3); if (mesa.value !== S.mesa) mesa.value = S.mesa; err.hidden = true; emit(); });

    bar.addEventListener('click', openSheet);
    mini.addEventListener('click', openSheet);
    // La barra grande solo con el menú en pantalla; afuera queda el botón compacto
    var menuSec = document.getElementById('menu');
    if (menuSec && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        document.documentElement.classList.toggle('lm-pd-far', !es[0].isIntersecting);
      }, { rootMargin: '0px 0px -30% 0px' }).observe(menuSec);
    }
    // En el hero tampoco: ahí van los datos del lugar y el botón "Ver menú"
    var hero = document.getElementById('hero');
    if (hero && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        document.documentElement.classList.toggle('lm-pd-hero', es[0].isIntersecting);
      }, { rootMargin: '0px 0px -25% 0px' }).observe(hero);
    }
    sheet.querySelectorAll('[data-pd-close]').forEach(function (b) { b.addEventListener('click', closeSheet); });
    waBtn.addEventListener('click', function (e) {
      if (!S.lines.length || needMesa()) { e.preventDefault(); return; }
      waBtn.href = waUrl();
      fireCheckout('whatsapp');
      if (window.LM && window.LM.openWa) { e.preventDefault(); window.LM.openWa(waText()); showRetry(); }
    });
    meseroBtn.addEventListener('click', showMesero);
    $('.lm-ms-x', mesero).addEventListener('click', closeMesero);
    $('#lm-pd-clear').addEventListener('click', function () {
      if (!S.lines.length) return;
      if (window.confirm('¿Vaciar tu pedido?')) { S.lines = []; S.note = ''; note.value = ''; emit(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (!mesero.hidden) closeMesero(); else if (!sheet.hidden) closeSheet();
    });
    render();
    subs.forEach(function (f) { try { f(api); } catch (e) {} });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
