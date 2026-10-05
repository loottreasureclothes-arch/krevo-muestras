(function () {
  var box = document.getElementById("mont");
  if (!box) return;
  var st = { ev: "", sp: "" };
  var rg = document.getElementById("rg"), fecha = document.getElementById("fecha");
  var $ = function (id) { return document.getElementById(id); };
  var MESES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  function money(n) { return "$" + n.toLocaleString("es-MX"); }
  function fechaTxt() {
    if (!fecha.value) return "";
    var p = fecha.value.split("-"); if (p.length !== 3) return "";
    return parseInt(p[2], 10) + " de " + MESES[parseInt(p[1], 10) - 1] + " de " + p[0];
  }
  function mesas(n) {
    var m = Math.ceil(n / 10), el = $("mesas");
    if (el.children.length === m) return;
    el.textContent = "";
    for (var i = 0; i < m; i++) { var d = document.createElement("i"); d.style.animationDelay = Math.min(i * 6, 240) + "ms"; el.appendChild(d); }
  }
  function summary() {
    var n = parseInt(rg.value, 10), f = fechaTxt();
    if (!st.ev || !st.sp) return null;
    var t = "Hola, me interesa Casa Victoria para " + (st.ev.indexOf("XV") === 0 ? st.ev : st.ev.toLowerCase()) + " en " + st.sp + ", para unos " + n + " invitados.";
    t += " Vi menús de $300 a $380 por invitado (" + money(n * 300) + " a " + money(n * 380) + " de menú).";
    if (f) t += " Fecha que tengo en mente: " + f + ".";
    t += " ¿Me pueden dar precio y disponibilidad?";
    return t;
  }
  function waHref(t) {
    return "https://wa.me/5214491552866?text=" + encodeURIComponent(t || "Hola, me interesa Casa Victoria para mi evento. ¿Me pueden dar información?");
  }
  function paint() {
    var n = parseInt(rg.value, 10), f = fechaTxt();
    $("n").textContent = n; mesas(n);
    $("mcap").textContent = Math.ceil(n / 10) + " mesas de 10";
    $("m-wa").setAttribute("href", waHref(summary()));
    if (st.ev && st.sp) {
      $("nota-r").textContent = st.ev + " en " + st.sp + ", " + n + " invitados" + (f ? ", " + f : "");
      $("nota-m").textContent = "Menú " + money(n * 300) + " a " + money(n * 380);
    } else {
      $("nota-r").textContent = "Elige arriba";
      $("nota-m").textContent = "Elige arriba";
    }
  }
  box.addEventListener("click", function (e) {
    var b = e.target.closest("[data-k]"); if (!b) return;
    var k = b.getAttribute("data-k");
    st[k] = b.getAttribute("data-v");
    Array.prototype.forEach.call(box.querySelectorAll('[data-k="' + k + '"]'), function (x) { x.setAttribute("aria-checked", x === b ? "true" : "false"); });
    $("m-ok").textContent = ""; paint();
  });
  rg.addEventListener("input", paint); fecha.addEventListener("input", paint);
  $("m-copy").addEventListener("click", function () {
    var t = summary(), ok = $("m-ok");
    if (!t) { ok.textContent = "Primero elige tu evento y el espacio."; return; }
    function done() { ok.textContent = "Copiado. Pégalo cuando te contesten."; }
    function fb() {
      var ta = document.createElement("textarea"); ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (er) { ok.textContent = t; }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, fb); else fb();
  });
  paint();
})();
