/* 20 Recorrido: compu = pin por sticky (+120 %), parada activa según el scroll (reversible), zoom leve ligado al scroll,
   etiquetas que saltan a su parada. Celular = sin pin; cada foto hace un zoom leve ligado al scroll y la etiqueta activa sigue la parada. */
(function () {
  "use strict";
  var sec = document.getElementById("recorrido");
  if (!sec) return;
  var track = sec.querySelector(".rc-track"), stops = sec.querySelectorAll(".rc-stop"), tags = sec.querySelectorAll(".rc-tags a[data-i]");
  var bar = sec.querySelector(".rc-bar"), n = stops.length, root = document.documentElement;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mqD = window.matchMedia("(min-width: 900px)");
  var pin = false, cur = -1, ticking = false;
  function setOn(i) {
    if (i === cur) return; cur = i;
    for (var k = 0; k < n; k++) {
      stops[k].classList.toggle("is-on", k === i);
      if (tags[k]) { tags[k].classList.toggle("is-on", k === i); if (k === i) tags[k].setAttribute("aria-current", "step"); else tags[k].removeAttribute("aria-current"); }
    }
    if (!pin && tags[i] && tags[i].parentNode.scrollWidth > tags[i].parentNode.clientWidth) {
      var nav = tags[i].parentNode; nav.scrollTo({ left: tags[i].offsetLeft - 16, behavior: reduce ? "auto" : "smooth" });
    }
  }
  function mode() {
    pin = mqD.matches && !reduce;
    root.classList.toggle("rc-pin-on", pin);
    if (!pin) for (var k = 0; k < n; k++) { stops[k].querySelector("img").style.removeProperty("--z"); }
    cur = -1; update();
  }
  function update() {
    ticking = false;
    var vh = window.innerHeight;
    if (pin) {
      var r = track.getBoundingClientRect(), len = track.offsetHeight - vh;
      var p = Math.min(1, Math.max(0, -r.top / (len || 1)));
      var i = Math.min(n - 1, Math.floor(p * n));
      setOn(i);
      var local = p * n - i;
      if (!reduce) stops[i].querySelector("img").style.setProperty("--z", (1.02 + local * 0.08).toFixed(4));
      if (bar) bar.style.setProperty("--p", p.toFixed(4));
    } else {
      var best = 0, bestD = 1e9;
      for (var k = 0; k < n; k++) {
        var fr = stops[k].getBoundingClientRect();
        var mid = fr.top + fr.height / 2, d = Math.abs(mid - vh * 0.5);
        if (d < bestD) { bestD = d; best = k; }
        if (!reduce && fr.bottom > 0 && fr.top < vh) {
          var q = Math.min(1, Math.max(0, (vh - fr.top) / (vh + fr.height)));
          stops[k].querySelector("img").style.setProperty("--z", (1.12 - q * 0.12).toFixed(4));
        }
      }
      setOn(best);
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  sec.querySelector(".rc-tags").addEventListener("click", function (e) {
    var a = e.target.closest("a[data-i]"); if (!a) return;
    e.preventDefault();
    var i = +a.getAttribute("data-i");
    if (pin) {
      var vh = window.innerHeight, len = track.offsetHeight - vh;
      var top = track.getBoundingClientRect().top + window.scrollY + len * ((i + 0.5) / n);
      window.scrollTo({ top: top, behavior: reduce ? "auto" : "smooth" });
    } else if (window.SG) SG.goTo(stops[i]);
  });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  if (mqD.addEventListener) mqD.addEventListener("change", mode); else if (mqD.addListener) mqD.addListener(mode);
  mode();
})();
