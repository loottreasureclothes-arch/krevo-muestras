(function () {
  "use strict";
  var ITEMS = [
    { id: "narros", n: "Hamburguesa Narros", d: "La de la casa", p: 162, img: "t-narros" },
    { id: "mexi", n: "Mexiquense", d: "Doble carne", p: 180, img: "t-mexiquense" },
    { id: "club", n: "Club Sandwich", d: "Con papas a la francesa", p: 150, img: "t-club" },
    { id: "chow", n: "Hot dog Chow Chow", d: "", p: 84, img: "t-chow" },
    { id: "alambre", n: "Alambre", d: "", p: 132, img: "t-alambre" },
    { id: "alitas", n: "Alitas x6", d: "Seis piezas", p: 132, img: "t-alitas" },
    { id: "aros", n: "Aros de cebolla", d: "Orden", p: 132, img: "t-aros" },
    { id: "papas", n: "Papas a la francesa", d: "Medianas", p: 75, img: "t-papas" },
    { id: "refresco", n: "Refresco", d: "", p: 40, img: null }
  ];
  var q = {}; ITEMS.forEach(function (i) { q[i.id] = 0; });
  var $ = function (id) { return document.getElementById(id); };
  var list = $("cm-list"), lines = $("tk-lines"), sendBtn = $("cm-send");
  function money(n) { return "$" + n.toLocaleString("es-MX"); }

  list.innerHTML = ITEMS.map(function (i) {
    var ph = i.img ? '<div class="cm-ph"><img src="img/' + i.img + '.webp" width="240" height="240" alt="' + i.n + '"></div>' : '<div class="cm-ph nop" aria-hidden="true">N</div>';
    return '<li class="cm-it" data-id="' + i.id + '">' + ph +
      '<div><div class="cm-nm">' + i.n + '</div>' + (i.d ? '<div class="cm-ds">' + i.d + '</div>' : '') + '<div class="cm-pr">' + money(i.p) + '</div></div>' +
      '<div class="cm-ctl"><button type="button" class="minus" aria-label="Quitar ' + i.n + '" disabled>&minus;</button><span class="cm-q" aria-live="polite">0</span><button type="button" class="plus" aria-label="Agregar ' + i.n + '">+</button></div></li>';
  }).join("");

  function modo() { return document.querySelector('input[name="modo"]:checked').value; }
  function suc() { return $("cm-suc").value; }
  function total() { return ITEMS.reduce(function (s, i) { return s + i.p * q[i.id]; }, 0); }
  function count() { return ITEMS.reduce(function (s, i) { return s + q[i.id]; }, 0); }

  function message() {
    var sel = ITEMS.filter(function (i) { return q[i.id] > 0; });
    if (!sel.length) return "Hola Narros Burger " + suc() + ", ¿me pasan la carta con precios? Quiero pedir " + modo() + ".";
    return "Hola Narros Burger " + suc() + ", quiero pedir " + modo() + ":\n" +
      sel.map(function (i) { return "- " + q[i.id] + " " + i.n + (i.d && i.id !== "alitas" ? " (" + i.d.toLowerCase() + ")" : ""); }).join("\n") +
      "\nTotal de carta: " + money(total()) + ". ¿Me confirman?";
  }
  function paint(printId) {
    var sel = ITEMS.filter(function (i) { return q[i.id] > 0; });
    lines.innerHTML = sel.length ? sel.map(function (i) {
      return '<li' + (i.id === printId ? ' class="print"' : '') + '><span>' + q[i.id] + ' x ' + i.n + '</span><span>' + money(i.p * q[i.id]) + '</span></li>';
    }).join("") : '<li class="tk-empty">Aún no hay nada. Toca + en lo que se te antoje.</li>';
    $("tk-total").textContent = total() ? money(total()) : "Por armar"; $("tk-total").classList.toggle("is-empty", !total());
    $("tk-sub").textContent = "COMANDA · " + suc().toUpperCase();
    $("cm-bar-n").textContent = count() + (count() === 1 ? " producto" : " productos");
    $("cm-bar-t").textContent = total() ? money(total()) : "";
    sendBtn.textContent = sel.length ? "Mandar comanda por WhatsApp" : "Preguntar por la carta";
    sendBtn.href = window.NB.waUrl(message());
    Array.prototype.forEach.call(list.children, function (li) {
      var id = li.getAttribute("data-id"); li.classList.toggle("on", q[id] > 0);
      li.querySelector(".cm-q").textContent = q[id]; li.querySelector(".minus").disabled = q[id] === 0;
    });
  }
  list.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    var id = b.closest(".cm-it").getAttribute("data-id");
    if (b.classList.contains("plus") && q[id] < 20) q[id]++; else if (b.classList.contains("minus") && q[id] > 0) q[id]--; else return;
    paint(id);
  });
  $("cm-side").addEventListener("change", function () { paint(); });
  paint();
  window.NBComanda = { message: message };
})();
