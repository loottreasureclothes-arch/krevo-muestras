/* DILO SIN ESCRIBIRLO: elegir motivo, precio publicado, consultorio y cuándo; arma el wa.me. Todo en memoria. */
(function () {
  "use strict";
  function init() {
    var form = document.getElementById("dm");
    if (!form || !window.PC) return;
    var chips = form.querySelectorAll(".dm-chip[data-motivo]");
    var libre = form.querySelector(".dm-chip--libre");
    var libreBox = form.querySelector(".dm-price--libre");
    var prices = {};
    Array.prototype.forEach.call(form.querySelectorAll(".dm-leaf"), function (leaf) { prices[leaf.getAttribute("data-group")] = leaf.querySelector(".dm-price"); });
    var preview = document.getElementById("dm-preview");

    function hidePrice(el) { if (el) { el.hidden = true; el.innerHTML = ""; } }
    function showPrice(group, chip) {
      var box = prices[group]; if (!box) return;
      var pm = chip.getAttribute("data-pm");
      var html;
      if (pm) {
        html = '<p class="dm-price-line"><span>' + chip.getAttribute("data-pn") + '</span><strong class="dm-price-amt">' + pm + '</strong></p><p class="dm-price-src">Precio publicado por él en Doctoralia.</p>';
      } else {
        html = '<p class="dm-price-line"><span>' + chip.getAttribute("data-pn") + '</span><strong class="dm-price-amt" style="font-size:20px">Se cotiza en consulta</strong></p><p class="dm-price-src">Él no publica precio para este caso.</p>';
      }
      box.innerHTML = html; box.hidden = false;
    }
    function clearAll() {
      Array.prototype.forEach.call(chips, function (c) { c.setAttribute("aria-pressed", "false"); });
      libre.setAttribute("aria-pressed", "false");
      for (var k in prices) hidePrice(prices[k]);
      hidePrice(libreBox);
    }
    Array.prototype.forEach.call(chips, function (chip) {
      chip.addEventListener("click", function () {
        var on = chip.getAttribute("aria-pressed") === "true";
        clearAll();
        if (on) { PC.set({ motivo: "", motivoLibre: false }); return; }
        chip.setAttribute("aria-pressed", "true");
        showPrice(chip.closest(".dm-leaf").getAttribute("data-group"), chip);
        PC.set({ motivo: chip.getAttribute("data-motivo"), motivoLibre: false });
      });
    });
    libre.addEventListener("click", function () {
      var on = libre.getAttribute("aria-pressed") === "true";
      clearAll();
      if (on) { PC.set({ motivo: "", motivoLibre: false }); return; }
      libre.setAttribute("aria-pressed", "true");
      libreBox.innerHTML = '<p class="dm-price-line">No mandamos ningún motivo. Lo platicas con él en consulta.</p>'; libreBox.hidden = false;
      PC.set({ motivo: "", motivoLibre: true });
    });
    form.addEventListener("change", function (e) {
      var t = e.target;
      if (t.name === "consultorio") PC.set({ consultorio: t.value });
      else if (t.name === "cuando") PC.set({ cuando: t.value });
      else if (t.name === "ingles") PC.set({ ingles: t.checked });
    });
    form.addEventListener("input", function (e) { if (e.target.name === "nombre") PC.set({ nombre: e.target.value }); });
    PC.on(function () { if (preview) preview.textContent = PC.message(); });
    if (preview) preview.textContent = PC.message();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
