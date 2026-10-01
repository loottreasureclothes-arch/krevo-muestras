/* Momento firma: LA CONCHA SE ABRE. Scroll (rAF, reversible, sin pin) abre la tapa y sale el relleno;
   a los 1.6 s con la concha a la vista queda abierta con los seis nombres, pase lo que pase. */
(function () {
  "use strict";
  function init() {
    var QC = window.QC, stage = document.getElementById("qc-rel-stage"), sec = document.getElementById("rellenos");
    if (!QC || !stage || !sec) return;
    var lid = document.getElementById("qc-rel-lid"), fill = document.getElementById("qc-rel-fill"), hi = document.getElementById("qc-rel-hi");
    var btns = Array.prototype.slice.call(sec.querySelectorAll(".qc-rel")), nota = document.getElementById("qc-rel-nota");
    var cur = QC.reduce ? 1 : 0, target = cur, settled = false, seenAt = 0, raf = null, override = -1;
    var cols = QC.RELLENOS.map(function (r) { return r.c; });
    function clamp(v) { return Math.max(0, Math.min(1, v)); }
    function mix(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
    function rgb(c) { return "rgb(" + Math.round(c[0]) + "," + Math.round(c[1]) + "," + Math.round(c[2]) + ")"; }
    function colorAt(p) {
      var t = clamp((p - 0.12) / 0.78) * (cols.length - 1), i = Math.min(cols.length - 2, Math.floor(t));
      return mix(cols[i], cols[i + 1], t - i);
    }
    var shade = document.getElementById("qc-rel-shade"), drip = document.getElementById("qc-rel-drip");
    function render(p) {
      var e = 1 - Math.pow(1 - p, 3);
      lid.setAttribute("transform", "translate(0 " + (-60 * e).toFixed(1) + ") rotate(" + (-13 * e).toFixed(2) + " 46 198)");
      var h = 64 * e, y = 200, F = function (v) { return v.toFixed(1); };
      var d = "M50 " + y + "C52 " + F(y - h * 0.55) + " 132 " + F(y - h) + " 200 " + F(y - h) + "C268 " + F(y - h) + " 348 " + F(y - h * 0.55) + " 350 " + y + "C350 208 290 213 200 213C110 213 50 208 50 " + y + "Z";
      fill.setAttribute("d", d); shade.setAttribute("d", d);
      var op = Math.min(1, e * 5); fill.style.opacity = op; shade.style.opacity = op;
      drip.setAttribute("transform", "translate(0 206) scale(1 " + Math.max(0, (e - 0.35) / 0.65).toFixed(3) + ") translate(0 -206)");
      hi.setAttribute("d", "M92 " + (y - 6) + "C122 " + F(y - 6 - h * 0.62) + " 160 " + F(y - 6 - h * 0.86) + " 196 " + F(y - 6 - h * 0.9));
      hi.style.opacity = p > 0.08 ? 1 : 0;
      var col = rgb(override >= 0 ? cols[override] : colorAt(p));
      fill.style.fill = col; drip.style.fill = col;
      btns.forEach(function (b, i) { b.classList.toggle("on", p >= 0.2 + i * 0.1 - (QC.reduce ? 1 : 0)); });
    }
    function loop() {
      raf = null;
      var d = target - cur;
      if (Math.abs(d) < 0.002) { cur = target; render(cur); return; }
      cur += d * (QC.reduce ? 1 : 0.2); render(cur); raf = requestAnimationFrame(loop);
    }
    function kick() { if (!raf) raf = requestAnimationFrame(loop); }
    function measure() {
      var vh = window.innerHeight || 800, r = stage.getBoundingClientRect(), now = Date.now();
      var visible = r.top < vh * 0.92 && r.bottom > 0;
      if (visible) { if (!seenAt) seenAt = now; if (!settled && now - seenAt >= 1600) settled = true; }
      else { seenAt = 0; if (r.top > vh) settled = false; }
      var p = clamp((vh * 0.9 - r.top) / (vh * 0.55));
      if (r.bottom < 0) p = 1;
      target = settled ? 1 : p; kick();
    }
    var tick = null;
    function sched() { if (!tick) tick = requestAnimationFrame(function () { tick = null; measure(); }); }
    window.addEventListener("scroll", sched, { passive: true }); window.addEventListener("resize", sched);
    setInterval(measure, 250); /* el temporizador de 1.6 s no depende de que haya scroll */
    render(cur); measure();

    /* ---- marcar rellenos: entran al pedido ---- */
    sec.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest(".qc-rel"); if (!b) return;
      var i = +b.getAttribute("data-i"); var was = QC.state.rell.indexOf(i) >= 0;
      QC.toggleRell(i);
      override = was ? (QC.state.rell.length ? QC.state.rell[QC.state.rell.length - 1] : -1) : i;
      render(cur);
    });
    function sync() {
      btns.forEach(function (b, i) { b.setAttribute("aria-pressed", QC.state.rell.indexOf(i) >= 0 ? "true" : "false"); });
      if (QC.state.rell.length) {
        nota.hidden = false;
        nota.innerHTML = "En tu pedido: " + QC.item() + ". <a href=\"#pedido\">Seguir con el pedido</a>";
      } else nota.hidden = true;
    }
    QC.on(function () { sync(); }); sync();
    if (QC.state.rell.length) override = QC.state.rell[QC.state.rell.length - 1];
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
