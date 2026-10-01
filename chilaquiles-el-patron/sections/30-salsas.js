/* 30-salsas: perillas ligadas al scroll corto de la sección (sin pin). Reversible. A los 1.6 s de asomarse queda en su estado final. */
(function () {
  "use strict";
  var sec = document.getElementById("salsas"), rows = document.getElementById("ep-salsas-rows");
  if (!sec || !rows) return;
  var EPx = window.EP, reduce = EPx && EPx.reduce;
  var seen = 0, timer = null, floor = 0, floorFrom = null, p = 1;
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function paint(v) { p = v; sec.style.setProperty("--p", v.toFixed(3)); }
  function target() {
    var vh = window.innerHeight || 800, r = rows.getBoundingClientRect();
    if (r.top > vh) return null; /* la sección está abajo del inicio: se rearma */
    var span = Math.min(r.height, vh * 0.6);
    return Math.max(0, Math.min(1, (vh * 0.9 - r.top) / span));
  }
  function update() {
    if (reduce) { paint(1); return; }
    var t = target();
    if (t === null) { floor = 0; floorFrom = null; seen = 0; clearTimeout(timer); paint(0); return; }
    if (!seen) {
      seen = 1;
      timer = setTimeout(function () { floorFrom = Date.now(); tick(); }, 1600);
    }
    var f = 0;
    if (floorFrom) f = ease(Math.min(1, (Date.now() - floorFrom) / 500));
    paint(Math.max(t, f));
  }
  function tick() { update(); if (floorFrom && Date.now() - floorFrom < 520) setTimeout(tick, 40); }
  if (reduce) { paint(1); } else { paint(0); update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update); setInterval(update, 500); }
  /* "Anotar esta" fija la salsa en el componente */
  var btns = sec.querySelectorAll("[data-set-salsa]");
  Array.prototype.forEach.call(btns, function (b) { b.addEventListener("click", function () { EPx.set({ salsa: b.getAttribute("data-set-salsa") }); }); });
  if (EPx) EPx.subscribe(function (s) {
    Array.prototype.forEach.call(btns, function (b) {
      var on = b.getAttribute("data-set-salsa") === s.salsa;
      b.classList.toggle("is-on", on); b.firstElementChild.textContent = on ? "Anotada" : "Anotar esta";
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  });
})();
