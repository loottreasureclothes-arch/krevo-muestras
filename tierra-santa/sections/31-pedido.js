/* 31 · Pedido de mesa (clonado de lamexico/26-pedido; SIN precios: el mensaje pregunta cuánto sería): carrito, hoja de resumen, WhatsApp y "Mostrar a mi mesero".
 *
 * API pública (la usa 25-menu.js y, a futuro, el pago):
 *   window.tsPedido = {
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
 * El botón de pago iría en la hoja, junto a "Enviar por WhatsApp" (ver 26-pedido.html, .ts-pd-actions).
 */
(function () {
  'use strict';
  var WA = '524493894792'; // WhatsApp público (posts de FB: "Reserva tu mesa por llamada o WhatsApp")
  var KEY = 'ts_pedido';
  var TTL = 12 * 60 * 60 * 1000; // un pedido viejo (más de 12 h) se descarta

  /* Capas con "Atrás" (Android): cada hoja o pantalla abierta mete una entrada al historial;
   * el botón Atrás cierra la capa de arriba en vez de sacar al cliente de la página.
   * window.tsLayer.open(nombre, cerrar) / .close(nombre). Lo usan también el diálogo del platillo (25-menu.js). */
  var layer = window.tsLayer;

  var S = { lines: [], note: '', mode: 'mesa', mesa: '', hora: '', fecha: '', personas: '', ts: 0 };
  function sucName() { return ''; }
  var subs = [], checkoutFns = [];

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return;
      var d = JSON.parse(raw);
      if (!d || !d.ts || Date.now() - d.ts > TTL) return;
      for (var k in S) if (d[k] !== undefined) S[k] = d[k];
      if (!Array.isArray(S.lines)) S.lines = [];
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
  window.tsPedido = api;

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
    var t = 'Hola, quiero hacer un pedido en Tierra Santa.\n';
    if (S.mode === 'mesa') t += 'Estoy en la mesa ' + (S.mesa || '(sin número)') + '.\n';
    else if (S.mode === 'llevar') t += 'Es para llevar' + (S.hora ? ', paso a las ' + S.hora : '') + '.\n';
    else t += 'Quiero reservar' + (S.personas ? ' para ' + S.personas + ' personas' : '') + (S.fecha ? ' el ' + S.fecha : '') + (S.hora ? ' a las ' + S.hora : '') + ' y dejar este pedido.\n';
    t += '\n';
    S.lines.forEach(function (l) { t += l.qty + ' x ' + lineLabel(l) + '\n'; });
    if (S.note.trim()) t += '\nNota: ' + S.note.trim();
    t += '\n¿Cuánto sería?';
    return t;
  }
  function waUrl() { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(waText()); }

  function render() {
    if (!bar) return;
    var n = count(), tot = total();
    bar.hidden = n === 0;
    document.documentElement.classList.toggle('ts-pd-has', n > 0);
    $('.ts-pd-bar-n', bar).textContent = n;
    $('.ts-pd-bar-mesa', bar).textContent = S.mode === 'mesa' && S.mesa ? 'Mesa ' + S.mesa : '';
    $('.ts-pd-mini-n', mini).textContent = n;
    mini.hidden = n === 0;
    mini.setAttribute('aria-label', 'Ver mi pedido: ' + n + (n === 1 ? ' producto' : ' productos'));
    var sb = document.getElementById('ts-mm-mesa');
    if (sb && S.mode === 'mesa' && S.mesa) { sb.textContent = 'Mesa ' + S.mesa; sb.hidden = false; }
    bar.setAttribute('aria-label', 'Ver mi pedido: ' + n + (n === 1 ? ' producto' : ' productos'));

    list.innerHTML = '';
    if (!S.lines.length) {
      var e = document.createElement('li');
      e.className = 'ts-pd-empty';
      e.textContent = 'Tu pedido está vacío. Agrega platillos o bebidas desde el menú.';
      list.appendChild(e);
    }
    S.lines.forEach(function (l) {
      var li = document.createElement('li');
      li.className = 'ts-pd-line';
      li.innerHTML = '<div class="ts-pd-line-tx"><b></b><small></small></div>' +
        '<div class="ts-mm-step ts-pd-step"><button type="button" data-d="-1" aria-label="Quitar uno">&minus;</button><output></output><button type="button" data-d="1" aria-label="Agregar uno">+</button></div>' +
        '';
      $('b', li).textContent = l.name;
      $('small', li).textContent = l.opt || '';
      $('output', li).textContent = l.qty;
      li.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () { setQty(l.key, l.qty + (+b.dataset.d)); });
      });
      list.appendChild(li);
    });
    waBtn.href = waUrl();
    sheet.querySelectorAll('[data-mode-f]').forEach(function (f) { f.hidden = f.dataset.modeF !== S.mode; });
    meseroBtn.hidden = S.mode !== 'mesa';
    var dis = !S.lines.length;
    waBtn.classList.toggle('is-off', dis);
    waBtn.setAttribute('aria-disabled', dis ? 'true' : 'false');
    meseroBtn.disabled = dis;
  }

  function lock(on) { document.documentElement.classList.toggle('ts-mm-lock', on); }
  function openSheet() {
    lastFocus = document.activeElement;
    err.hidden = true;
    sheet.hidden = false;
    lock(true);
    layer.open('sheet', function () { closeSheet(true); });
    requestAnimationFrame(function () { sheet.classList.add('is-open'); });
    setTimeout(function () { var c = $('.ts-pd-x', sheet); c && c.focus({ preventScroll: true }); }, 30);
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
    if (S.mode === 'mesa' && !String(S.mesa).trim()) {
      err.hidden = false;
      var m = $('#ts-pd-mesa'); m.focus();
      return true;
    }
    err.hidden = true;
    return false;
  }
  function showMesero() {
    if (!S.lines.length || needMesa()) return;
    $('.ts-ms-mesa', mesero).textContent = S.mesa;
    var ul = $('.ts-ms-list', mesero);
    ul.innerHTML = '';
    S.lines.forEach(function (l) {
      var li = document.createElement('li');
      li.innerHTML = '<b></b><span></span>';
      $('b', li).textContent = l.qty;
      $('span', li).textContent = lineLabel(l);
      ul.appendChild(li);
    });
    var nt = $('.ts-ms-note', mesero);
    nt.hidden = !S.note.trim();
    nt.textContent = S.note.trim() ? 'Nota: ' + S.note.trim() : '';
    $('.ts-ms-hora', mesero).textContent = hhmm();
    mesero.hidden = false;
    lock(true);
    layer.open('mesero', function () { closeMesero(true); });
    fireCheckout('mesero');
    setTimeout(function () { $('.ts-ms-x', mesero).focus({ preventScroll: true }); }, 30);
  }
  function closeMesero(fromPop) { if (mesero.hidden) return; if (fromPop !== true) layer.close('mesero'); mesero.hidden = true; if (sheet.hidden) lock(false); meseroBtn.focus({ preventScroll: true }); }

  function scrollToMenu() {
    var m = document.querySelector('#menu .ts-mm-head') || document.getElementById('menu');
    if (!m) return;
    var hh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--k-header-h')) || 64;
    window.scrollTo(0, Math.max(0, m.getBoundingClientRect().top + window.pageYOffset - hh - 16));
  }

  function init() {
    bar = $('#ts-pd-bar'); mini = $('#ts-pd-mini'); sheet = $('#ts-pd-sheet'); mesero = $('#ts-pd-mesero');
    if (!bar || !mini || !sheet || !mesero) return;
    list = $('.ts-pd-list', sheet);
    waBtn = $('#ts-pd-wa'); meseroBtn = $('#ts-pd-mesero-btn'); err = $('#ts-pd-err');
    load();

    // ?mesa=N preselecciona la mesa y abre directo en el menú
    var qm = (location.search.match(/[?&]mesa=([0-9]{1,3})\b/) || [])[1];
    if (qm) {
      S.mode = 'mesa'; S.mesa = String(+qm); save();
      var badge = document.getElementById('ts-mm-mesa');
      if (badge) { badge.textContent = 'Mesa ' + S.mesa; badge.hidden = false; }
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
    var note = $('#ts-pd-note'), mesa = $('#ts-pd-mesa'), hora = $('#ts-pd-hora'), fecha = $('#ts-pd-fecha'), hora2 = $('#ts-pd-hora2'), pers = $('#ts-pd-personas');
    note.value = S.note; mesa.value = S.mesa; hora.value = S.mode === 'llevar' ? S.hora : ''; fecha.value = S.fecha; hora2.value = S.mode === 'reservar' ? S.hora : ''; pers.value = S.personas;
    var radios = sheet.querySelectorAll('input[name="ts-pd-mode"]');
    radios.forEach(function (r) {
      r.checked = r.value === S.mode;
      r.addEventListener('change', function () { if (r.checked) { S.mode = r.value; S.hora = r.value === 'llevar' ? hora.value : hora2.value; emit(); } });
    });
    note.addEventListener('input', function () { S.note = note.value; save(); waBtn.href = waUrl(); });
    mesa.addEventListener('input', function () { S.mesa = mesa.value.replace(/[^0-9]/g, '').slice(0, 3); if (mesa.value !== S.mesa) mesa.value = S.mesa; err.hidden = true; emit(); });
    hora.addEventListener('input', function () { S.hora = hora.value; save(); waBtn.href = waUrl(); });
    hora2.addEventListener('input', function () { S.hora = hora2.value; save(); waBtn.href = waUrl(); });
    fecha.addEventListener('input', function () { S.fecha = fecha.value; save(); waBtn.href = waUrl(); });
    pers.addEventListener('input', function () { S.personas = pers.value; save(); waBtn.href = waUrl(); });

    bar.addEventListener('click', openSheet);
    mini.addEventListener('click', openSheet);
    // La barra grande solo con el menú en pantalla; afuera queda el botón compacto
    var menuSec = document.getElementById('menu');
    if (menuSec && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        document.documentElement.classList.toggle('ts-pd-far', !es[0].isIntersecting);
      }, { rootMargin: '0px 0px -30% 0px' }).observe(menuSec);
    }
    // En el hero tampoco: ahí van los datos del lugar y el botón "Ver menú"
    var hero = document.getElementById('hero');
    if (hero && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        document.documentElement.classList.toggle('ts-pd-hero', es[0].isIntersecting);
      }, { rootMargin: '0px 0px -25% 0px' }).observe(hero);
    }
    sheet.querySelectorAll('[data-pd-close]').forEach(function (b) { b.addEventListener('click', closeSheet); });
    waBtn.addEventListener('click', function (e) {
      if (!S.lines.length || needMesa()) { e.preventDefault(); return; }
      waBtn.href = waUrl();
      var fbk = $('#ts-pd-fbk'); if (fbk) { fbk.href = waUrl(); fbk.hidden = false; }
      fireCheckout('whatsapp');
    });
    meseroBtn.addEventListener('click', showMesero);
    $('.ts-ms-x', mesero).addEventListener('click', closeMesero);
    $('#ts-pd-clear').addEventListener('click', function () {
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
