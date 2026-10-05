/* La baraja de antojos: desliza fotos reales; lo que te antoja arma "tu mesa" y se copia para llamar. */
(function () {
  "use strict";
  var root = document.querySelector("[data-baraja]");
  if (!root) return;
  var mesaEl = document.querySelector("[data-mesa]");
  var deck = root.querySelector(".deck");
  var cards = Array.prototype.slice.call(deck.children);
  var fin = root.querySelector(".deck-fin");
  var nEl = root.querySelector("[data-n]");
  var lista = mesaEl.querySelector("[data-lista]");
  var vacia = mesaEl.querySelector("[data-vacia]");
  var totEl = mesaEl.querySelector("[data-total]");
  var copiar = mesaEl.querySelector("[data-copiar]");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var idx = 0, elegidas = [], busy = false;
  var MS = reduce ? 0 : 280;

  function pos() {
    cards.forEach(function (c, i) {
      var d = i - idx;
      c.classList.toggle("top", d === 0);
      c.style.transition = "none";
      c.querySelector(".sel--si").style.opacity = 0;
      c.querySelector(".sel--no").style.opacity = 0;
      if (d < 0) { c.style.visibility = "hidden"; return; }
      if (d > 2) { c.style.visibility = "hidden"; return; }
      c.style.visibility = "visible";
      c.style.zIndex = 10 - d;
      c.style.transform = "translateY(" + (d * 14) + "px) scale(" + (1 - d * 0.05) + ")";
      c.style.pointerEvents = d === 0 ? "auto" : "none";
    });
    nEl.textContent = idx < cards.length ? (idx + 1) + " de " + cards.length : cards.length + " de " + cards.length;
    fin.hidden = idx < cards.length;
    root.classList.toggle("is-fin", idx >= cards.length);
  }
  function nombre(c) { return c.getAttribute("data-name"); }
  function precio(c) { return parseInt(c.getAttribute("data-price"), 10) || 0; }

  function pintaMesa() {
    lista.innerHTML = "";
    var total = 0, sinPrecio = 0;
    elegidas.forEach(function (c) {
      var li = document.createElement("li");
      var n = document.createElement("span"); n.className = "m-n"; n.textContent = nombre(c);
      var p = document.createElement("span");
      if (precio(c)) { p.className = "m-p"; p.textContent = "$" + precio(c); total += precio(c); }
      else { p.className = "m-p m-p--ask"; p.textContent = "Pregunta el precio"; sinPrecio++; }
      var b = document.createElement("button"); b.type = "button"; b.setAttribute("aria-label", "Quitar " + nombre(c));
      b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-x"/></svg>';
      b.addEventListener("click", function () { elegidas.splice(elegidas.indexOf(c), 1); pintaMesa(); });
      li.appendChild(n); li.appendChild(p); li.appendChild(b); lista.appendChild(li);
    });
    vacia.hidden = elegidas.length > 0;
    var t;
    if (!elegidas.length) t = "Elige arriba";
    else if (!total) t = "Pregunta el precio";
    else t = "$" + total + (sinPrecio ? " y pregunta el resto" : "");
    totEl.textContent = t;
    copiar.setAttribute("aria-disabled", elegidas.length ? "false" : "true");
  }

  function fling(dir) {
    if (busy || idx >= cards.length) return;
    busy = true;
    var c = cards[idx];
    if (dir > 0 && elegidas.indexOf(c) < 0) { elegidas.push(c); pintaMesa(); }
    c.style.transition = "transform " + MS + "ms ease-in, opacity " + MS + "ms ease-in";
    c.style.transform = "translateX(" + (dir * 130) + "%) rotate(" + (dir * 18) + "deg)";
    c.style.opacity = 0;
    setTimeout(function () {
      c.style.opacity = ""; idx++; busy = false; pos();
    }, MS + 20);
  }

  /* arrastre */
  var sx = 0, dx = 0, drag = false;
  deck.addEventListener("pointerdown", function (e) {
    if (busy || idx >= cards.length) return;
    var c = cards[idx];
    if (!c.contains(e.target)) return;
    drag = true; sx = e.clientX; dx = 0; c.style.transition = "none";
    try { deck.setPointerCapture(e.pointerId); } catch (x) {}
  });
  deck.addEventListener("pointermove", function (e) {
    if (!drag) return;
    dx = e.clientX - sx;
    var c = cards[idx];
    c.style.transform = "translateX(" + dx + "px) rotate(" + (dx / 16) + "deg)";
    c.querySelector(".sel--si").style.opacity = Math.max(0, Math.min(1, dx / 90));
    c.querySelector(".sel--no").style.opacity = Math.max(0, Math.min(1, -dx / 90));
  });
  function suelta() {
    if (!drag) return; drag = false;
    var c = cards[idx];
    if (Math.abs(dx) > 80) { fling(dx > 0 ? 1 : -1); return; }
    c.style.transition = "transform 220ms ease";
    c.style.transform = "translateY(0) scale(1)";
    c.querySelector(".sel--si").style.opacity = 0; c.querySelector(".sel--no").style.opacity = 0;
  }
  deck.addEventListener("pointerup", suelta);
  deck.addEventListener("pointercancel", suelta);

  root.querySelector("[data-si]").addEventListener("click", function () { fling(1); });
  root.querySelector("[data-no]").addEventListener("click", function () { fling(-1); });
  root.querySelector("[data-rebarajar]").addEventListener("click", function () { idx = 0; pos(); });
  document.addEventListener("keydown", function (e) {
    if (e.target && /input|textarea/i.test(e.target.tagName)) return;
    var r = root.getBoundingClientRect(), vh = window.innerHeight;
    if (r.top > vh * 0.6 || r.bottom < vh * 0.2) return;
    if (e.key === "ArrowRight") fling(1);
    if (e.key === "ArrowLeft") fling(-1);
  });

  function mensaje() {
    var partes = elegidas.map(function (c) { return nombre(c) + (precio(c) ? " ($" + precio(c) + ")" : ""); });
    return "Hola, voy a ir a Towate Brunch & Lunch. Me antoja: " + partes.join(", ") + ". ¿Me confirman precios y mesa?";
  }
  copiar.addEventListener("click", function () {
    if (!elegidas.length) return;
    var txt = mensaje(), lbl = copiar.querySelector("span");
    function ok() { lbl.textContent = "Copiado"; setTimeout(function () { lbl.textContent = "Copiar mi pedido"; }, 1800); }
    function viejo() {
      var ta = document.createElement("textarea"); ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = 0;
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); ok(); } catch (x) {}
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, viejo); else viejo();
  });
  window.TowateMensaje = mensaje;
  pos(); pintaMesa();
})();
