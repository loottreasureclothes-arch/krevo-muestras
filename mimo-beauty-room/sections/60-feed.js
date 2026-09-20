/* 6 · MOSAICO VIVO: cambia UNA foto a la vez (nunca todas juntas) entre las fotos reales de su
   Instagram. Se para cuando el mosaico no se ve y con prefers-reduced-motion. Si el JS no corre,
   el mosaico se queda con sus seis fotos: no hay hueco en blanco. */
(function () {
  "use strict";
  var caja = document.getElementById("s-mosaico");
  if (!caja) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  var slots = Array.prototype.slice.call(caja.querySelectorAll(".s-tile"));
  if (slots.length < 2) return;

  /* Las -m (675 a 900 px): a 390 @2x cada loseta pide ~466 px, las -s (360) se veian suaves. */
  var POOL = [];
  for (var i = 1; i <= 10; i++) POOL.push("img/ig/feed-" + i + "-m.webp");
  var precargado = false;

  /* Hay fotos que son de la MISMA sesion (dos manicuras rojas sobre el mismo mantel, dos
     verdes fantasia, dos lacios). Se marcan con su grupo y nunca salen dos del mismo grupo
     a la vez: el mosaico jamas se ve repetido, ni al arrancar ni despues de rotar. */
  var GRUPO = { "feed-3": "nails", "feed-5": "nails", "feed-2": "verde", "feed-8": "verde", "feed-7": "lacio", "feed-9": "lacio" };
  function grupoDe(src) { return GRUPO[(src.split("/").pop() || "").replace("-m.webp", "")] || null; }

  function enUso() { return slots.map(function (s) { return s.querySelector("img").getAttribute("src"); }); }
  var turno = 0;
  function cambia() {
    var r = caja.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top > vh || r.bottom < 0 || document.hidden) return;             /* fuera de vista: no gasta */
    /* se precargan al llegar al cierre, no al abrir la pagina: no le cuestan al hero */
    if (!precargado) { precargado = true; POOL.forEach(function (src) { var im = new Image(); im.src = src; }); }
    var usadas = enUso();
    var slot = slots[turno % slots.length];
    turno++;                                                               /* el turno avanza siempre: nunca se atora */
    var img = slot.querySelector("img");
    /* los grupos que ya estan en pantalla, sin contar la loseta que se va a cambiar */
    var ocupados = usadas.filter(function (s, i) { return slots[i] !== slot; }).map(grupoDe).filter(Boolean);
    var libres = POOL.filter(function (s) {
      if (usadas.indexOf(s) >= 0) return false;
      var g = grupoDe(s);
      return !g || ocupados.indexOf(g) < 0;
    });
    if (!libres.length) return;
    var nueva = libres[Math.floor(Math.random() * libres.length)];
    slot.classList.add("is-cambiando");
    setTimeout(function () {
      img.src = nueva;
      slot.classList.remove("is-cambiando");
    }, 270);
  }
  setInterval(cambia, 1800);
})();
