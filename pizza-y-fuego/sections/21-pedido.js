/* 26 · Pedido: carrito, hoja de resumen, WhatsApp directo (recoger, domicilio o en el local) y "Mostrar a mi mesero".
 * Sin precios por ahora (price 0): el mensaje pide el total. Si un día llegan precios reales, el total vuelve solo en cada renglón.
 *
 * API pública (la usa 25-menu.js y, a futuro, el pago):
 *   window.pfPedido = {
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
 * El botón de pago iría en la hoja, junto a "Enviar por WhatsApp" (ver 26-pedido.html, .pf-pd-actions).
 */
(function () {
  'use strict';
  var WA = '524498974488'; // WhatsApp que le contestó a KREVO (PENDIENTE-DUEÑO: confirmar que es el de pedidos)
  var KEY = 'pf_pedido';
  var TTL = 12 * 60 * 60 * 1000; // un pedido viejo (más de 12 h) se descarta

  /* Capas con "Atrás" (Android): cada hoja o pantalla abierta mete una entrada al historial;
   * el botón Atrás cierra la capa de arriba en vez de sacar al cliente de la página.
   * window.pfLayer.open(nombre, cerrar) / .close(nombre). Lo usan también el diálogo del platillo (25-menu.js). */
  var layer = window.pfLayer = (function () {
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
        try { history.pushState({ pfLayer: name }, ''); } catch (e) {}
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

  var S = { lines: [], note: '', mode: 'llevar', mesa: '', hora: '', nombre: '', dir: '', pago: 'Efectivo al recibir', ts: 0 };
  var MODES = { llevar: 1, domicilio: 1, mesa: 1 };
  var subs = [], checkoutFns = [];

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return;
      var d = JSON.parse(raw);
      if (!d || !d.ts || Date.now() - d.ts > TTL) return;
      for (var k in S) if (d[k] !== undefined) S[k] = d[k];
      if (!Array.isArray(S.lines)) S.lines = [];
      if (!MODES[S.mode]) S.mode = 'llevar';
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
    get state() { return JSON.parse(JSON.stringify(S)); },
    add: add, setQty: setQty, qtyOf: qtyOf, money: money,
    onChange: function (fn) { subs.push(fn); },
    onCheckout: function (fn) { checkoutFns.push(fn); },
    open: function () { openSheet(); }
  };
  window.pfPedido = api;

  function fireCheckout(via) {
    var p = { via: via, items: api.items, total: total(), mesa: S.mesa, modo: S.mode, nombre: S.nombre, direccion: S.dir, nota: S.note };
    checkoutFns.forEach(function (f) { try { f(p); } catch (e) {} });
  }

  /* ---------- DOM ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var bar, mini, sheet, list, waBtn, meseroBtn, err, mesero, lastFocus, up;

  function lineLabel(l) { return l.name + (l.opt ? ' (' + l.opt + ')' : ''); }
  function hhmm(d) { d = d || new Date(); return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); }

  function waText() {
    var t = 'Hola Pizza y Fuego, quiero hacer un pedido.\n';
    if (S.mode === 'mesa') t += 'Estoy en el restaurante, mesa ' + (S.mesa || '(sin número)') + '.\n';
    else if (S.mode === 'llevar') t += 'Paso por él' + (S.hora ? ' a las ' + S.hora : '') + (S.nombre.trim() ? '. A nombre de ' + S.nombre.trim() : '') + '.\n';
    else t += 'Es a domicilio' + (S.dir.trim() ? ': ' + S.dir.trim().replace(/\s+/g, ' ') : '') + '. ¿Llegan a mi zona y cuánto es el envío?\n';
    t += '\n';
    S.lines.forEach(function (l) { t += l.qty + ' x ' + lineLabel(l) + (l.price ? ' (' + money(l.price * l.qty) + ')' : '') + '\n'; });
    if (S.note.trim()) t += '\nNota: ' + S.note.trim();
    t += '\nPago: ' + (S.pago || 'Efectivo al recibir');
    t += '\n¿Me confirman el total y el tiempo?';
    return t;
  }
  function waUrl() { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(waText()); }

  function render() {
    if (!bar) return;
    var n = count(), tot = total();
    bar.hidden = n === 0;
    document.documentElement.classList.toggle('pf-pd-has', n > 0);
    $('.pf-pd-bar-n', bar).textContent = n;
    $('.pf-pd-bar-t', bar).textContent = 'Enviar';
    $('.pf-pd-bar-mesa', bar).textContent = S.mode === 'mesa' && S.mesa ? 'Mesa ' + S.mesa : '';
    $('.pf-pd-mini-n', mini).textContent = n;
    mini.hidden = n === 0;
    mini.setAttribute('aria-label', 'Ver mi pedido: ' + n + (n === 1 ? ' producto' : ' productos'));
    var sb = document.getElementById('pf-mm-mesa');
    if (sb && S.mode === 'mesa' && S.mesa) { sb.textContent = 'Mesa ' + S.mesa; sb.hidden = false; }
    bar.setAttribute('aria-label', 'Ver mi pedido: ' + n + (n === 1 ? ' producto' : ' productos'));

    list.innerHTML = '';
    if (!S.lines.length) {
      var e = document.createElement('li');
      e.className = 'pf-pd-empty';
      e.textContent = 'Tu pedido está vacío. Agrega platillos o bebidas desde el menú.';
      list.appendChild(e);
    }
    S.lines.forEach(function (l) {
      var li = document.createElement('li');
      li.className = 'pf-pd-line';
      li.innerHTML = '<div class="pf-pd-line-tx"><b></b><small></small></div>' +
        '<div class="pf-mm-step pf-pd-step"><button type="button" data-d="-1" aria-label="Quitar uno">&minus;</button><output></output><button type="button" data-d="1" aria-label="Agregar uno">+</button></div>' +
        '<span class="pf-pd-line-t"></span>';
      $('b', li).textContent = l.name;
      $('small', li).textContent = l.opt || '';
      $('output', li).textContent = l.qty;
      $('.pf-pd-line-t', li).textContent = l.price ? money(l.price * l.qty) : '';
      li.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () { setQty(l.key, l.qty + (+b.dataset.d)); });
      });
      list.appendChild(li);
    });
    if (up) up.hidden = !S.lines.length || S.lines.some(function (l) { return l.id === 'pizza-nutella'; });
    waBtn.href = waUrl();
    sheet.querySelectorAll('[data-mode-f]').forEach(function (f) { f.hidden = f.dataset.modeF !== S.mode; });
    meseroBtn.hidden = S.mode !== 'mesa';
    var dis = !S.lines.length;
    waBtn.classList.toggle('is-off', dis);
    waBtn.setAttribute('aria-disabled', dis ? 'true' : 'false');
    meseroBtn.disabled = dis;
  }

  function lock(on) { document.documentElement.classList.toggle('pf-mm-lock', on); }
  function openSheet() {
    lastFocus = document.activeElement;
    err.hidden = true;
    sheet.hidden = false;
    lock(true);
    layer.open('sheet', function () { closeSheet(true); });
    requestAnimationFrame(function () { sheet.classList.add('is-open'); });
    setTimeout(function () { var c = $('.pf-pd-x', sheet); c && c.focus({ preventScroll: true }); }, 30);
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
      var m = $('#pf-pd-mesa'); m.focus();
      return true;
    }
    err.hidden = true;
    return false;
  }
  function showMesero() {
    if (!S.lines.length || needMesa()) return;
    $('.pf-ms-mesa', mesero).textContent = S.mesa;
    var ul = $('.pf-ms-list', mesero);
    ul.innerHTML = '';
    S.lines.forEach(function (l) {
      var li = document.createElement('li');
      li.innerHTML = '<b></b><span></span>';
      $('b', li).textContent = l.qty;
      $('span', li).textContent = lineLabel(l);
      ul.appendChild(li);
    });
    var nt = $('.pf-ms-note', mesero);
    nt.hidden = !S.note.trim();
    nt.textContent = S.note.trim() ? 'Nota: ' + S.note.trim() : '';
    $('.pf-ms-total', mesero).textContent = count();
    $('.pf-ms-hora', mesero).textContent = hhmm();
    mesero.hidden = false;
    lock(true);
    layer.open('mesero', function () { closeMesero(true); });
    fireCheckout('mesero');
    setTimeout(function () { $('.pf-ms-x', mesero).focus({ preventScroll: true }); }, 30);
  }
  function closeMesero(fromPop) { if (mesero.hidden) return; if (fromPop !== true) layer.close('mesero'); mesero.hidden = true; if (sheet.hidden) lock(false); meseroBtn.focus({ preventScroll: true }); }

  function scrollToMenu() {
    var m = document.querySelector('#menu .pf-mm-head') || document.getElementById('menu');
    if (!m) return;
    var hh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--k-header-h')) || 64;
    window.scrollTo(0, Math.max(0, m.getBoundingClientRect().top + window.pageYOffset - hh - 16));
  }

  function init() {
    bar = $('#pf-pd-bar'); mini = $('#pf-pd-mini'); sheet = $('#pf-pd-sheet'); mesero = $('#pf-pd-mesero');
    if (!bar || !mini || !sheet || !mesero) return;
    list = $('.pf-pd-list', sheet); up = $('#pf-pd-up');
    waBtn = $('#pf-pd-wa'); meseroBtn = $('#pf-pd-mesero-btn'); err = $('#pf-pd-err');
    load();

    // ?mesa=N preselecciona la mesa y abre directo en el menú
    var qm = (location.search.match(/[?&]mesa=([0-9]{1,3})\b/) || [])[1];
    if (qm) {
      S.mode = 'mesa'; S.mesa = String(+qm); save();
      var badge = document.getElementById('pf-mm-mesa');
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
    var note = $('#pf-pd-note'), mesa = $('#pf-pd-mesa'), hora = $('#pf-pd-hora'), nombre = $('#pf-pd-nombre'), dir = $('#pf-pd-dir');
    note.value = S.note; mesa.value = S.mesa; hora.value = S.hora; nombre.value = S.nombre; dir.value = S.dir;
    var radios = sheet.querySelectorAll('input[name="pf-pd-mode"]');
    radios.forEach(function (r) {
      r.checked = r.value === S.mode;
      r.addEventListener('change', function () { if (r.checked) { S.mode = r.value; err.hidden = true; emit(); } });
    });
    var pagoRadios = sheet.querySelectorAll('input[name="pf-pd-pago"]');
    pagoRadios.forEach(function (r) {
      r.checked = r.value === S.pago;
      r.addEventListener('change', function () { if (r.checked) { S.pago = r.value; save(); waBtn.href = waUrl(); } });
    });
    function bind(el, k) { el.addEventListener('input', function () { S[k] = el.value; save(); waBtn.href = waUrl(); }); }
    bind(note, 'note'); bind(hora, 'hora'); bind(nombre, 'nombre'); bind(dir, 'dir');
    mesa.addEventListener('input', function () { S.mesa = mesa.value.replace(/[^0-9]/g, '').slice(0, 3); if (mesa.value !== S.mesa) mesa.value = S.mesa; err.hidden = true; emit(); });
    if (up) up.querySelector('button').addEventListener('click', function () { add({ id: 'pizza-nutella', name: 'Pizza de Nutella', price: 0 }, 1); });

    bar.addEventListener('click', openSheet);
    mini.addEventListener('click', openSheet);
    // La barra grande solo con el menú en pantalla; afuera queda el botón compacto
    var menuSec = document.getElementById('menu');
    if (menuSec && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        document.documentElement.classList.toggle('pf-pd-far', !es[0].isIntersecting);
      }, { rootMargin: '0px 0px -30% 0px' }).observe(menuSec);
    }
    // En el hero tampoco: ahí van los datos del lugar y el botón "Arma tu pedido"
    var hero = document.getElementById('hero');
    if (hero && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        document.documentElement.classList.toggle('pf-pd-hero', es[0].isIntersecting);
      }, { rootMargin: '0px 0px -25% 0px' }).observe(hero);
    }
    sheet.querySelectorAll('[data-pd-close]').forEach(function (b) { b.addEventListener('click', closeSheet); });
    waBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (!S.lines.length || needMesa()) return;
      waBtn.href = waUrl();
      fireCheckout('whatsapp');
      var w = null;
      try { w = window.open(waBtn.href, '_blank'); if (w) w.opener = null; } catch (x) { w = null; }
      if (!w) { try { location.href = waBtn.href; } catch (x2) {} }
      var fb = $('#pf-pd-fb');
      if (fb) { fb.href = waBtn.href; fb.hidden = false; }
    });
    meseroBtn.addEventListener('click', showMesero);
    $('.pf-ms-x', mesero).addEventListener('click', closeMesero);
    $('#pf-pd-clear').addEventListener('click', function () {
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
