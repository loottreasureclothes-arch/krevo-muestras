/* Comanda: la papeleta que se escribe sola y termina en un wa.me ya armado. */
(function(){
  "use strict";
  var WA = "524493319024";
  var items = {}, order = [];
  var list = document.getElementById("tk-list"), totalEl = document.getElementById("tk-total"),
      pendEl = document.getElementById("tk-pend"), send = document.getElementById("tk-send"),
      clear = document.getElementById("tk-clear"), mini = document.getElementById("mini-comanda"),
      miniN = document.getElementById("mini-n"), miniT = document.getElementById("mini-t"),
      fecha = document.getElementById("tk-fecha");
  if (!list) return;
  var DIAS = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
  var MES = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  var d = new Date(); fecha.textContent = DIAS[d.getDay()] + " " + d.getDate() + " " + MES[d.getMonth()];
  var PZ = { rojo:{junior:65,chico:75,grande:85}, verde:{junior:65,chico:80,grande:90}, blanco:{junior:60,chico:80,grande:90} };
  var SOLO = { verde:" (solo viernes)", blanco:" (solo sábado)", rojo:"" };

  function money(n){ return "$" + n; }
  function modo(){ var c = document.querySelector('input[name="tk-modo"]:checked'); return c ? c.value : "para llevar"; }
  function message(){
    if (!order.length) return "Hola, quiero pedir en El Rincón del Sabor.";
    var lines = ["Hola, quiero pedir en El Rincón del Sabor (" + modo() + "):"], tot = 0, pend = false;
    order.forEach(function(id){ var it = items[id]; if (!it || !it.q) return;
      if (it.price == null) { pend = true; lines.push("- " + it.q + " x " + it.name + " (precio por confirmar)"); }
      else { tot += it.price * it.q; lines.push("- " + it.q + " x " + it.name + " (" + money(it.price * it.q) + ")"); } });
    lines.push("Total: " + money(tot) + (pend ? " más lo que falta por confirmar" : ""));
    return lines.join("\n");
  }
  function render(){
    var count = 0, tot = 0, pend = false, html = "";
    order = order.filter(function(id){ return items[id] && items[id].q > 0; });
    order.forEach(function(id){
      var it = items[id]; count += it.q;
      if (it.price == null) pend = true; else tot += it.price * it.q;
      html += '<li class="tk-li" data-id="' + id + '"><div class="tk-q"><button type="button" data-dec aria-label="Quitar uno"><svg><use href="#i-minus"/></svg></button><output>' + it.q + '</output><button type="button" data-inc aria-label="Agregar uno"><svg><use href="#i-plus"/></svg></button></div><span class="tk-n">' + it.name + '</span>' +
        (it.price == null ? '<span class="tk-p q">Pregunta el precio</span>' : '<span class="tk-p">' + money(it.price * it.q) + '</span>') + '</li>';
    });
    list.innerHTML = html || '<li class="tk-empty">Aquí se va escribiendo lo que pidas.</li>';
    totalEl.textContent = money(tot);
    document.getElementById("tk-total-box").hidden = !count;
    pendEl.hidden = !pend;
    clear.hidden = !count;
    send.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(message());
    mini.hidden = !count; miniN.textContent = count; miniT.textContent = tot ? money(tot) : "";
  }
  function add(id, name, price){
    if (!items[id]) items[id] = { name: name, price: price, q: 0 };
    if (items[id].q === 0 && order.indexOf(id) < 0) order.push(id);
    items[id].q += 1;
    render();
  }
  function flash(btn){
    var s = btn.querySelector("span"), old = s ? s.textContent : null;
    btn.classList.add("ok"); if (s) s.textContent = "Listo";
    setTimeout(function(){ btn.classList.remove("ok"); if (s && old) s.textContent = old; }, 800);
  }
  /* pozole: tipo + tamaño */
  function pozPrices(){
    var t = document.querySelector('input[name="pz-tipo"]:checked').value;
    [].forEach.call(document.querySelectorAll("[data-p]"), function(el){ el.textContent = money(PZ[t][el.getAttribute("data-p")]); });
  }
  document.addEventListener("change", function(e){ if (e.target.name === "pz-tipo") pozPrices(); if (e.target.name === "tk-modo") render(); });
  pozPrices();
  document.addEventListener("click", function(e){
    var b = e.target.closest && e.target.closest("button");
    if (!b) return;
    if (b.hasAttribute("data-add-pozole")) {
      var t = document.querySelector('input[name="pz-tipo"]:checked').value, z = document.querySelector('input[name="pz-tam"]:checked').value;
      add("pozole-" + t + "-" + z, "Pozole " + t + " " + z + SOLO[t], PZ[t][z]); flash(b); return;
    }
    if (b.hasAttribute("data-add")) {
      var p = b.getAttribute("data-price");
      add(b.getAttribute("data-id"), b.getAttribute("data-name"), p === null ? null : Number(p)); flash(b); return;
    }
    var li = b.closest(".tk-li");
    if (li) { var id = li.getAttribute("data-id"); if (b.hasAttribute("data-inc")) items[id].q += 1; if (b.hasAttribute("data-dec")) items[id].q -= 1; render(); return; }
    if (b.id === "tk-clear") { order.forEach(function(id){ items[id].q = 0; }); order = []; render(); }
  });
  render();
  window.Comanda = { message: message, order: function(){ return order.slice(); } };
})();
