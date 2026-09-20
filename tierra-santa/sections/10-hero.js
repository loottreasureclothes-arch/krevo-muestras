/* 10 Hero: foto fija (sin video) + accesos con hoja de fotos reales. */
(function () {
  "use strict";
  var sec = document.getElementById("hero");
  if (!sec) return;

  /* Blindaje: a 1.6 s el título ya quedó en su lugar pase lo que pase */
  setTimeout(function () { sec.getAnimations && sec.getAnimations({ subtree: true }).forEach(function (a) { try { a.finish(); } catch (e) {} }); }, 1600);

  /* ---- Hoja de fotos de los accesos ---- */
  var DATA = {
    cortes: { t: "Cortes", d: "Rib eye sellado a alta temperatura, T-bone y arrachera para tu parrillada.", go: "Ver cortes", href: "#m-cortes",
      wa: "Hola, quiero reservar una mesa en Tierra Santa para comer cortes.",
      f: [["img/hd/ribeye-mesa-1200.webp", "Rib eye"], ["img/hd/tbone-1200.webp", "T-bone"], ["img/hd/arrachera-1200.webp", "Arrachera"]] },
    bistro: { t: "Bistro", d: "El lado italiano: pastas, salmón y carpaccio de atún.", go: "Ver bistro", href: "#m-bistro",
      wa: "Hola, quiero reservar una mesa en Tierra Santa.",
      f: [["img/hd/pasta-bolonesa-1200.webp", "Pasta boloñesa"], ["img/hd/carpaccio-1200.webp", "Carpaccio de atún"], ["img/hd/guacamole-1200.webp", "Guacamole recién hecho"]] },
    bebidas: { t: "Bebidas", d: "Agua Santa de coco y maracuyá, hecha en la barra, y smoothies frappé.", go: "Ver bebidas", href: "#m-bebidas",
      wa: "Hola, quiero reservar una mesa en Tierra Santa.",
      f: [["img/hd/agua-santa-1200.webp", "Agua Santa"], ["img/hd/jamaica-1200.webp", "Smoothie de jamaica"], ["img/hd/maracuya-1200.webp", "Smoothie de maracuyá"]] },
    terraza: { t: "Terraza", d: "Enredadera, focos cálidos y calentador de torre para las noches frías.", go: "Ver la terraza", href: "#terraza",
      wa: "Hola, quiero reservar una mesa en la terraza de Tierra Santa.",
      f: [["img/hd/terraza-noche-1200.webp", "La terraza de noche"], ["img/hd/terraza-dia-1200.webp", "La terraza de día"], ["img/hd/terraza-jardineras-1200.webp", "Las jardineras de la terraza"]] }
  };
  var tiles = document.querySelectorAll("#accesos [data-sheet]");
  if (!tiles.length) return;
  var sh = document.createElement("div");
  sh.className = "acc-sheet"; sh.hidden = true;
  sh.innerHTML = '<button class="acc-sheet-bg" type="button" tabindex="-1" aria-label="Cerrar"></button>' +
    '<div class="acc-sheet-box" role="dialog" aria-modal="true" aria-labelledby="acc-sheet-t" tabindex="-1">' +
    '<div class="acc-sheet-head"><div><h2 class="acc-sheet-t" id="acc-sheet-t"></h2><p class="acc-sheet-d"></p></div><button class="acc-sheet-x" type="button" aria-label="Cerrar">&times;</button></div>' +
    '<div class="acc-sheet-car" role="region" aria-label="Fotos reales" tabindex="0"></div>' +
    '<div class="acc-sheet-foot"><a class="ts-btn ts-btn--wa acc-sheet-wa" href="#" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg>Reservar mesa</a><a class="ts-btn ts-btn--line acc-sheet-go" href="#"></a></div></div>';
  document.body.appendChild(sh);
  var q = function (s) { return sh.querySelector(s); };
  var last = null, cur = null;
  function open(key, from) {
    var d = DATA[key]; if (!d) return;
    cur = d; last = from;
    q(".acc-sheet-t").textContent = d.t;
    q(".acc-sheet-d").textContent = d.d;
    var car = q(".acc-sheet-car"); car.innerHTML = "";
    d.f.forEach(function (f) {
      var fig = document.createElement("figure"), im = new Image();
      im.src = f[0]; im.alt = f[1] + " en Tierra Santa"; im.width = 960; im.height = 1200; im.decoding = "async";
      var cap = document.createElement("figcaption"); cap.textContent = f[1];
      fig.appendChild(im); fig.appendChild(cap); car.appendChild(fig);
    });
    q(".acc-sheet-wa").href = window.TS ? TS.waUrl(d.wa) : "https://wa.me/524493894792";
    var go = q(".acc-sheet-go"); go.textContent = d.go; go.setAttribute("href", d.href);
    sh.hidden = false;
    document.documentElement.classList.add("ts-mm-lock");
    if (window.tsLayer) tsLayer.open("accesos", function () { close(true); });
    requestAnimationFrame(function () { sh.classList.add("is-open"); });
    setTimeout(function () { q(".acc-sheet-x").focus({ preventScroll: true }); }, 30);
  }
  function close(fromPop) {
    if (sh.hidden) return;
    if (fromPop !== true && window.tsLayer) tsLayer.close("accesos");
    sh.classList.remove("is-open"); sh.hidden = true;
    document.documentElement.classList.remove("ts-mm-lock");
    if (last && last.focus && fromPop !== "go") last.focus({ preventScroll: true });
  }
  Array.prototype.forEach.call(tiles, function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); open(a.getAttribute("data-sheet"), a); });
  });
  q(".acc-sheet-x").addEventListener("click", close);
  q(".acc-sheet-bg").addEventListener("click", close);
  /* "Ver ..." cierra la hoja y deja que el ancla haga su trabajo */
  q(".acc-sheet-go").addEventListener("click", function (e) {
    e.preventDefault(); e.stopPropagation();
    var href = this.getAttribute("href");
    close("go");
    setTimeout(function () { if (window.TS && TS.go) TS.go(href, false); }, 140);
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !sh.hidden) close(); });
})();
