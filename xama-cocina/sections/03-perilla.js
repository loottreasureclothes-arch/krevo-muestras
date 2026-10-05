/* La perilla del antojo: 5 paradas (Café, Desayuno, Cocina, Fresco, Bar). Se arrastra, se toca o se mueve con flechas. */
(function () {
  "use strict";
  var DATA = [
    { n: "Café", items: [
      { t: "Moka", q: "“la comida y el moka una delicia”", w: "Marisol", f: "Hola, se me antoja una moka. ¿Cuánto cuesta?" },
      { t: "Matcha latte", q: "“riquísimas al igual que el matcha latte”", w: "Valeria", f: "Hola, se me antoja un matcha latte. ¿Cuánto cuesta?" },
      { t: "Café frío o caliente", q: "“hot & cold coffee choice's”", w: "Carlos", f: "Hola, ¿cuánto cuesta el café frío y el caliente?" } ] },
    { n: "Desayuno", items: [
      { t: "Buffet de desayuno", q: "“el buffet es bueno y a buen precio”", w: "Gerardo", f: "Hola, ¿cuánto cuesta el buffet de desayuno?" },
      { t: "Fruta fresca", q: "Melón, papaya y granola", w: "", f: "Hola, ¿cuánto cuesta el plato de fruta fresca?" } ] },
    { n: "Cocina", items: [
      { t: "Enchiladas suizas del mar", q: "“las enchiladas suizas del mar estan riquísimas”", w: "Valeria", f: "Hola, se me antojan las enchiladas suizas del mar. ¿Cuánto cuestan?" },
      { t: "Tacos gobernador", q: "“muy muy buenos”", w: "Francisco", f: "Hola, se me antojan los tacos gobernador. ¿Cuánto cuestan?" },
      { t: "Baguette de arrachera", q: "“a flavourful fresh choice”", w: "Carlos", f: "Hola, se me antoja el baguette de arrachera. ¿Cuánto cuesta?" } ] },
    { n: "Fresco", items: [
      { t: "Licuados", q: "De frutas naturales, de la casa", w: "", f: "Hola, ¿cuánto cuestan los licuados de frutas naturales?" },
      { t: "Limonada", q: "“la limonada 100% recomendado”", w: "Valeria", f: "Hola, se me antoja una limonada. ¿Cuánto cuesta?" } ] },
    { n: "Bar", items: [
      { t: "Cerveza y vino", q: "“also beers & wine”", w: "Carlos", f: "Hola, ¿qué cervezas y vinos tienen y cuánto cuestan?" },
      { t: "Música en vivo", q: "“super live music”", w: "Maurice", f: "Hola, ¿qué noches hay música en vivo?", precio: "Pregunta qué noche toca" } ] }
  ];
  var ANG = [-72, -36, 0, 36, 72];
  var dial = document.getElementById("dial"), knob = document.getElementById("knob");
  if (!dial || !knob) return;
  var stops = dial.querySelectorAll(".stop"), photos = document.querySelectorAll(".pr-photo .pf");
  var title = document.getElementById("pr-title"), opts = document.getElementById("opts");
  var tkItem = document.getElementById("tk-item"), tkPrice = document.getElementById("tk-price"), tkSay = document.getElementById("tk-say"), tkCopy = document.getElementById("tk-copy");
  var cur = -1, pick = null;

  /* marcas de la perilla */
  var svg = document.getElementById("dial-ticks"), NS = "http://www.w3.org/2000/svg";
  for (var a = -84; a <= 84; a += 12) {
    var big = ANG.indexOf(a) > -1, r1 = 66, r2 = big ? 82 : 76, rad = a * Math.PI / 180;
    var ln = document.createElementNS(NS, "line");
    ln.setAttribute("x1", 170 + r1 * Math.sin(rad)); ln.setAttribute("y1", 166 - r1 * Math.cos(rad));
    ln.setAttribute("x2", 170 + r2 * Math.sin(rad)); ln.setAttribute("y2", 166 - r2 * Math.cos(rad));
    ln.setAttribute("stroke", big ? "#efe4c8" : "rgba(239,228,200,.4)"); ln.setAttribute("stroke-width", big ? 3 : 2); ln.setAttribute("stroke-linecap", "round");
    svg.appendChild(ln);
  }

  function renderTicket() {
    if (!pick) {
      tkItem.textContent = "Elige arriba"; tkPrice.textContent = "Pregunta el precio";
      tkSay.textContent = "Toca un platillo y aquí queda lo que vas a decir."; tkCopy.disabled = true; return;
    }
    var it = DATA[pick.s].items[pick.i];
    tkItem.textContent = it.t; tkPrice.textContent = it.precio || "Pregunta el precio";
    tkSay.textContent = "Dile a quien conteste: “" + it.f + "”"; tkCopy.disabled = false;
  }
  function renderOpts(s) {
    opts.innerHTML = "";
    DATA[s].items.forEach(function (it, i) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "opt"; b.setAttribute("role", "radio");
      var on = pick && pick.s === s && pick.i === i;
      b.setAttribute("aria-checked", on ? "true" : "false");
      b.innerHTML = '<span class="opt-box" aria-hidden="true"></span><span class="opt-n"></span><span class="opt-q"></span><span class="opt-p"></span>';
      b.querySelector(".opt-n").textContent = it.t;
      b.querySelector(".opt-q").textContent = it.q + (it.w ? ", dice " + it.w : "");
      b.querySelector(".opt-p").textContent = it.precio || "Pregunta el precio";
      b.addEventListener("click", function () { pick = { s: s, i: i }; renderOpts(s); renderTicket(); });
      opts.appendChild(b);
    });
  }
  function setStop(s, rot) {
    if (s !== cur) {
      cur = s;
      Array.prototype.forEach.call(stops, function (el, i) { el.setAttribute("aria-checked", i === s ? "true" : "false"); });
      Array.prototype.forEach.call(photos, function (el, i) { el.classList.toggle("is-on", i === s); });
      title.textContent = DATA[s].n;
      renderOpts(s);
      knob.setAttribute("aria-valuenow", s); knob.setAttribute("aria-valuetext", DATA[s].n);
    }
    knob.style.setProperty("--rot", (rot == null ? ANG[s] : rot) + "deg");
  }
  Array.prototype.forEach.call(stops, function (el) {
    el.addEventListener("click", function () { setStop(parseInt(el.getAttribute("data-i"), 10)); });
  });

  /* arrastre */
  var drag = false;
  function angleOf(e) {
    var r = knob.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    var ang = Math.atan2(e.clientX - cx, -(e.clientY - cy)) * 180 / Math.PI;
    return Math.max(-80, Math.min(80, ang));
  }
  knob.addEventListener("pointerdown", function (e) {
    drag = true; knob.classList.add("is-drag");
    try { knob.setPointerCapture(e.pointerId); } catch (x) {}
    e.preventDefault();
  });
  knob.addEventListener("pointermove", function (e) {
    if (!drag) return;
    var ang = angleOf(e), s = Math.max(0, Math.min(4, Math.round((ang + 72) / 36)));
    setStop(s, ang);
  });
  function up() { if (!drag) return; drag = false; knob.classList.remove("is-drag"); setStop(cur); }
  knob.addEventListener("pointerup", up); knob.addEventListener("pointercancel", up);
  knob.addEventListener("keydown", function (e) {
    var k = e.key, s = cur;
    if (k === "ArrowRight" || k === "ArrowUp") s = Math.min(4, cur + 1);
    else if (k === "ArrowLeft" || k === "ArrowDown") s = Math.max(0, cur - 1);
    else if (k === "Home") s = 0; else if (k === "End") s = 4; else return;
    e.preventDefault(); setStop(s);
  });

  /* copiar */
  tkCopy.addEventListener("click", function () {
    if (!pick) return;
    var txt = DATA[pick.s].items[pick.i].f, old = tkCopy.textContent;
    function ok() { tkCopy.textContent = "Copiado"; setTimeout(function () { tkCopy.textContent = old; }, 1600); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, fb);
    else fb();
    function fb() {
      var ta = document.createElement("textarea"); ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); ok(); } catch (e) {} document.body.removeChild(ta);
    }
  });

  setStop(2); renderTicket();
})();
