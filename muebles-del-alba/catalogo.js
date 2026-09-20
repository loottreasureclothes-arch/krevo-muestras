/* catalogo.html: las 76 piezas completas. Chips por categoría real (sin tope de 10,
   a diferencia del inicio) + el mismo interruptor de acabado y "+" del catálogo de
   la principal. Se registra en MDA.catalogBlocks para que el buscador (site.js)
   también filtre aquí. */
(function () {
  "use strict";
  var sec = document.getElementById("catalogo");
  if (!sec) return;

  var chips = sec.querySelector("[data-chips]");
  var cards = Array.prototype.slice.call(sec.querySelectorAll("[data-grid] .s-cat-card"));
  var cat = "todos";

  function pinta() {
    cards.forEach(function (li) {
      li.hidden = !(cat === "todos" || li.getAttribute("data-cat") === cat);
    });
  }

  if (chips) {
    chips.addEventListener("click", function (ev) {
      var bt = ev.target.closest(".s-chip");
      if (!bt) return;
      cat = bt.getAttribute("data-chip");
      Array.prototype.forEach.call(chips.querySelectorAll(".s-chip"), function (c) {
        var sel = c === bt;
        c.classList.toggle("is-on", sel);
        c.setAttribute("aria-selected", sel ? "true" : "false");
      });
      pinta();
      if (bt.scrollIntoView) bt.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    });
  }
  pinta();

  window.MDA = window.MDA || {};
  window.MDA.catalogBlocks = window.MDA.catalogBlocks || [];
  window.MDA.catalogBlocks.push({ cards: cards, chipsWrap: chips, restore: pinta });

  /* ---------- Interruptor de acabado (igual que en la principal) ---------- */
  Array.prototype.forEach.call(sec.querySelectorAll("[data-fin-group]"), function (group) {
    var card = group.closest(".s-cat-card");
    var photo = card.querySelector(".s-cat-photo--fin");
    var addBtn = card.querySelector("[data-fin-carry]");
    group.addEventListener("click", function (ev) {
      var b = ev.target.closest(".s-fin-sw");
      if (!b) return;
      var fin = b.getAttribute("data-fin");
      Array.prototype.forEach.call(group.querySelectorAll(".s-fin-sw"), function (s) {
        var on = s === b;
        s.classList.toggle("is-on", on);
        s.setAttribute("aria-pressed", on ? "true" : "false");
      });
      if (photo) Array.prototype.forEach.call(photo.querySelectorAll("[data-fin-img]"), function (img) {
        img.classList.toggle("is-on", img.getAttribute("data-fin-img") === fin);
      });
      var label = card.querySelector("[data-fin-label]");
      if (label) label.textContent = fin;
      if (addBtn) {
        addBtn.setAttribute("data-fin", fin);
        var img = photo && photo.querySelector('[data-fin-img="' + fin + '"]');
        if (img) addBtn.setAttribute("data-img", img.getAttribute("src"));
      }
    });
  });

  /* ---------- Agregar a Mi casa (igual que en la principal) ---------- */
  sec.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-add]");
    if (!b) return;
    var fin = b.getAttribute("data-fin");
    var name = b.getAttribute("data-name") + (fin ? " en " + fin : "");
    window.MDA && MDA.sel.add({
      id: b.getAttribute("data-add") + (fin ? "-" + fin : ""),
      name: name,
      price: Number(b.getAttribute("data-price")) || 0,
      note: b.getAttribute("data-note") || "",
      img: b.getAttribute("data-img") || ""
    });
    b.classList.remove("is-added"); void b.offsetWidth; b.classList.add("is-added");
    setTimeout(function () { b.classList.remove("is-added"); }, 700);
  });
})();
