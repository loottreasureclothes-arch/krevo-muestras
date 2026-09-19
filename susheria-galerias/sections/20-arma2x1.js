/* 20 Arma tu 2x1: dos selectores con los rollos del menú (lee #menu), vista de cada rollo y "Agregar mi 2x1" -> carrito (window.lmPedido) */
(function () {
  "use strict";
  var CATS = ["m-clasicos", "m-empanizados", "m-horneados", "m-especiales", "m-nevados"];
  var DEF = ["dorito-roll", "philadelphia-nevado"];
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function init() {
    var sec = document.getElementById("arma2x1"), box = sec && sec.querySelector("[data-ar-box]");
    var P = window.lmPedido;
    if (!box || !P) return;
    var groups = [], by = {};
    CATS.forEach(function (id) {
      var cat = document.getElementById(id);
      if (!cat) return;
      var t = cat.querySelector(".lm-mm-ctitle"), items = [];
      cat.querySelectorAll(".lm-mm-card").forEach(function (c) {
        var ph = c.querySelector(".lm-mm-ph img");
        var it = { id: c.dataset.id, name: c.dataset.name, price: +c.dataset.price, desc: c.dataset.desc || "", img: ph ? ph.getAttribute("src").replace("/t/", "/") : "", cat: t ? t.textContent : "" };
        items.push(it); by[it.id] = it;
      });
      groups.push({ title: t ? t.textContent : id, items: items });
    });
    if (!groups.length) return;
    var opts = groups.map(function (g) {
      return '<optgroup label="' + esc(g.title) + '">' + g.items.map(function (it) { return '<option value="' + esc(it.id) + '">' + esc(it.name) + " · $" + it.price + "</option>"; }).join("") + "</optgroup>";
    }).join("");
    function slot(n) {
      return '<div class="ar-slot" data-slot="' + n + '"><div class="ar-ph"></div><div class="ar-in">' +
        '<label class="ar-lab" for="ar-s' + n + '">Rollo ' + (n + 1) + '</label>' +
        '<select id="ar-s' + n + '" class="ar-sel">' + opts + "</select>" +
        '<p class="ar-desc"></p></div></div>';
    }
    box.innerHTML = '<div class="ar-slots">' + slot(0) + '<span class="ar-plus" aria-hidden="true">+</span>' + slot(1) + "</div>" +
      '<div class="ar-sum"><p class="ar-list"></p><p class="ar-tot"><span>Con el 2x1 pagas</span><b></b></p>' +
      '<p class="ar-fine">Precio de la sucursal Galerías. Te confirmamos el 2x1 y el envío por WhatsApp.</p>' +
      '<div class="ar-acts"><button class="lm-btn lm-btn--wa ar-go" type="button"><svg aria-hidden="true"><use href="#i-wa"/></svg>Pedir mi 2x1</button>' +
      '<a class="lm-btn lm-btn--link" href="#menu">Agregar más del menú<svg aria-hidden="true"><use href="#i-arrow"/></svg></a></div>' +
      '<p class="ar-ok" role="status" aria-live="polite"></p></div>';
    var sels = box.querySelectorAll(".ar-sel");
    sels.forEach(function (s, i) { if (by[DEF[i]]) s.value = DEF[i]; s.addEventListener("change", paint); });
    function money(n) { return P.money ? P.money(n) : "$" + n; }
    function paint() {
      var a = by[sels[0].value], b = by[sels[1].value];
      [a, b].forEach(function (it, i) {
        var sl = box.querySelector('[data-slot="' + i + '"]'), ph = sl.querySelector(".ar-ph");
        sl.querySelector(".ar-desc").textContent = it.desc;
        ph.className = "ar-ph" + (it.img ? "" : " ar-ph--tx");
        ph.innerHTML = it.img ? '<img src="' + esc(it.img) + '" alt="' + esc(it.name) + ' de Sushería Galerías" width="900" height="900" decoding="async">' : "<span>" + esc(it.name) + "</span><small>" + esc(it.cat) + "</small>";
      });
      box.querySelector(".ar-list").textContent = a.name + " $" + a.price + " + " + b.name + " $" + b.price;
      box.querySelector(".ar-tot b").textContent = money(Math.max(a.price, b.price));
    }
    paint();
    box.querySelector(".ar-go").addEventListener("click", function () {
      var a = by[sels[0].value], b = by[sels[1].value];
      var ids = [a.id, b.id].sort();
      P.add({ id: "2x1-" + ids.join("-"), name: "2x1 rollos: " + a.name + " + " + b.name, price: Math.max(a.price, b.price) }, 1);
      box.querySelector(".ar-ok").textContent = "Listo, tu 2x1 está en el pedido.";
      P.open();
    });
    sec.classList.add("is-ready");
  }
  // Los diferidos corren en orden (20 antes que 26): espera a DOMContentLoaded si el carrito aún no existe
  if (window.lmPedido && document.readyState === "complete") init();
  else if (document.readyState === "complete") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
