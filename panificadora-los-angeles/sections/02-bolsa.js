(function () {
  var cards = document.querySelectorAll("#cards .card"), q = {}, modo = "paso";
  var send = document.getElementById("send"), badge = document.getElementById("badge"), peek = document.getElementById("peek"), bag = document.getElementById("bag");
  var lines = document.getElementById("lines"), sumT = document.getElementById("sumT"), money = document.getElementById("money");
  var chip = document.getElementById("bagChip"), chipN = document.getElementById("chipN"), box = document.getElementById("bagbox"), inBox = false;
  function vis() { chip.classList.toggle("on", chip.classList.contains("has") && !inBox); }
  if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { inBox = e[0].isIntersecting; vis(); }, { threshold: 0.25 }).observe(box);
  var info = {}, pos = [8, 62, 116, 30, 90, 146];
  Array.prototype.forEach.call(cards, function (c) {
    var id = c.dataset.id; q[id] = 0;
    info[id] = { name: c.dataset.name, price: +c.dataset.price || 0, src: c.querySelector("img").getAttribute("src") };
    var ctl = c.querySelector(".ctl");
    function draw() {
      if (!q[id]) { ctl.innerHTML = '<button type="button" class="add">Agregar</button>'; ctl.firstChild.onclick = function () { q[id] = 1; draw(); upd(); }; return; }
      ctl.innerHTML = '<div class="step"><button type="button" aria-label="Quitar">−</button><b>' + q[id] + '</b><button type="button" aria-label="Agregar uno">+</button></div>';
      var b = ctl.querySelectorAll("button");
      b[0].onclick = function () { q[id]--; draw(); upd(); };
      b[1].onclick = function () { q[id]++; draw(); upd(); };
    }
    draw();
  });
  function plural(n, s) { return n + " " + s + (n > 1 && s.slice(-1) !== "s" ? "s" : ""); }
  function msg() {
    var ids = Object.keys(q).filter(function (k) { return q[k] > 0; });
    var m = "Hola, quiero apartar pan en Panificadora Los Ángeles:\n";
    if (!ids.length) m = "Hola, vi la página de Panificadora Los Ángeles. ¿Qué pan tienen hoy?";
    else {
      ids.forEach(function (k) { m += "- " + q[k] + " x " + info[k].name + "\n"; });
      m += modo === "paso" ? "Paso por él a Venustiano Carranza 110A. ¿Me confirman precio y cuándo está listo?" : "Lo quiero a domicilio. ¿Me confirman precio y envío?";
    }
    return m;
  }
  function upd() {
    var ids = Object.keys(q).filter(function (k) { return q[k] > 0; }), tot = 0, lad = 0, resto = false;
    lines.innerHTML = ""; peek.innerHTML = "";
    ids.forEach(function (k, i) {
      tot += q[k];
      var li = document.createElement("li"); li.textContent = q[k] + " × " + info[k].name; lines.appendChild(li);
      if (info[k].price) lad += q[k] * info[k].price; else resto = true;
      var p = document.createElement("div"); p.className = "pk"; p.style.left = pos[i % 6] + "px"; p.style.bottom = (i < 3 ? 0 : 30) + "px";
      p.innerHTML = '<img src="' + info[k].src + '" alt="">'; peek.appendChild(p);
    });
    badge.textContent = tot;
    bag.style.transform = "scaleY(" + (1 + Math.min(tot, 12) * 0.006) + ")";
    sumT.textContent = tot ? (tot === 1 ? "1 pieza en tu bolsa" : tot + " piezas en tu bolsa") : "Tu bolsa está vacía";
    money.textContent = lad ? "Ladrillos: $" + lad + (resto ? ". Lo demás te lo confirman." : "") : (resto ? "Te confirman el precio por WhatsApp." : "");
    send.textContent = tot ? "Mandar mi bolsa" : "Preguntar qué hay hoy";
    send.href = window.PLA.waUrl(msg());
    chipN.textContent = tot; chip.classList.toggle("has", tot > 0); vis();
    if (tot) { chip.classList.remove("bump"); void chip.offsetWidth; chip.classList.add("bump"); }
  }
  Array.prototype.forEach.call(document.querySelectorAll(".modo button"), function (b) {
    b.onclick = function () {
      modo = b.dataset.m;
      Array.prototype.forEach.call(document.querySelectorAll(".modo button"), function (x) { x.classList.toggle("on", x === b); });
      upd();
    };
  });
  upd();
})();
