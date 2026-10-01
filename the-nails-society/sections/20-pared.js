/* LA PARED DE CUADROS: mira, cuelga hasta 3, elige servicio y sucursal; todo viaja al WhatsApp. */
(function () {
  "use strict";
  function start() {
    var NS = window.NS, root = document.getElementById("pared");
    if (!NS || !root) return;
    var S = NS.state;
    var figs = [].slice.call(root.querySelectorAll(".ns-cuadro"));
    var thumbs = [].slice.call(root.querySelectorAll(".ns-thumb"));
    var btn = root.querySelector("#ns-colgar"), rail = root.querySelector("#ns-rail");
    var dir = root.querySelector("#ns-dir"), dia = root.querySelector("#ns-dia"), nombre = root.querySelector("#ns-nombre");
    var ficha = root.querySelector(".ns-ficha");
    var F = { d: root.querySelector("#ns-f-d"), p: root.querySelector("#ns-f-p"), s: root.querySelector("#ns-f-s"), dia: root.querySelector("#ns-f-dia"), n: root.querySelector("#ns-f-n") };
    var chipsSrv = [].slice.call(root.querySelectorAll('input[name="srv"]')), chipsSuc = [].slice.call(root.querySelectorAll('input[name="suc"]'));
    var prevHung = S.d.join(",");
    var ready = false;

    function hung(id) { return S.d.indexOf(id) > -1; }

    function typeInto(el, text) {
      if (!el || el._t === text) return;
      el._t = text;
      if (NS.reduce || !ready || !text || text.length < 3) { el.textContent = text; return; }
      var len = text.length, dur = Math.min(420, len * 20), t0 = performance.now();
      function step(now) {
        if (el._t !== text) return;
        var k = Math.min(len, Math.ceil((now - t0) / dur * len));
        el.textContent = text.slice(0, k);
        if (k < len) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      setTimeout(function () { el.textContent = el._t; }, dur + 140);
    }

    function render() {
      /* cuadro grande */
      figs.forEach(function (f) {
        var on = f.getAttribute("data-id") === S.cur;
        f.classList.toggle("is-active", on);
        if (on) f.removeAttribute("aria-hidden"); else f.setAttribute("aria-hidden", "true");
        var c = f.querySelector(".ns-cartela"); if (c) c.classList.toggle("is-hung", hung(f.getAttribute("data-id")));
      });
      /* las otras tres */
      thumbs.forEach(function (t) {
        var id = t.getAttribute("data-id");
        t.hidden = id === S.cur;
        t.classList.toggle("is-hung", hung(id));
      });
      /* colgar / quitar */
      var h = hung(S.cur), lleno = !h && S.d.length >= 3;
      btn.textContent = h ? "Quitar de mi pared" : (lleno ? "Quita uno para colgar este" : "Colgar en mi pared");
      btn.setAttribute("aria-pressed", h ? "true" : "false");
      btn.setAttribute("aria-disabled", lleno ? "true" : "false");
      /* riel */
      var nuevo = S.d.join(",");
      if (nuevo !== rail._k) {
        rail._k = nuevo;
        var out = "";
        for (var i = 0; i < 3; i++) {
          var id = S.d[i], inner;
          if (id) {
            var item = NS.byId(id), k = figs.filter(function (f) { return f.getAttribute("data-id") === id; })[0];
            var src = k ? k.querySelector("img").getAttribute("src").replace(/-\d+\.webp$/, "-240.webp") : "";
            var isNew = prevHung.split(",").indexOf(id) < 0 && ready;
            inner = '<button type="button" class="ns-hung' + (isNew ? " is-new" : "") + '" data-id="' + id + '" aria-label="Ver «' + item.n + '», colgado en tu pared"><span class="ns-frame ns-frame--lite" style="--band:var(--marmol)"><span class="ns-frame-in" style="display:block"><img src="' + src + '" width="240" height="300" alt=""></span></span></button>';
          } else inner = '<span class="ns-hole' + (i === S.d.length ? ' is-next' : '') + '"><b>' + (i + 1) + '</b>' + (i === S.d.length ? '<em>Cuelga aquí</em>' : '') + '</span>';
          out += '<div class="ns-slot"><i class="ns-nail"></i><svg class="ns-v" viewBox="0 0 76 22" preserveAspectRatio="none" aria-hidden="true"><path d="M38 0 L5 22 M38 0 L71 22"/></svg>' + inner + "</div>";
        }
        rail.innerHTML = out;
        prevHung = nuevo;
      }
      /* fichas */
      chipsSrv.forEach(function (c) { c.checked = S.s.indexOf(c.value) > -1; });
      chipsSuc.forEach(function (c) { c.checked = S.suc === c.value; });
      if (dir) dir.textContent = S.suc ? NS.DIR[S.suc] : "";
      /* ficha de la cita */
      typeInto(F.d, NS.nombres().join("\n"));
      var para = NS.lista(S.s.map(function (k) { return NS.SERVICIOS[k]; }));
      typeInto(F.p, para ? para.charAt(0).toUpperCase() + para.slice(1) : "");
      typeInto(F.s, S.suc ? NS.SUC[S.suc].charAt(0).toUpperCase() + NS.SUC[S.suc].slice(1) : "");
      typeInto(F.dia, NS.fmtDia(S.dia));
      typeInto(F.n, (S.nombre || "").trim());
      ficha.classList.toggle("has-data", !NS.vacio());
    }

    function setCur(id) { S.cur = id; NS.emit(); }
    thumbs.forEach(function (t) { t.addEventListener("click", function () { setCur(t.getAttribute("data-id")); }); });
    rail.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest(".ns-hung"); if (b) setCur(b.getAttribute("data-id")); });
    btn.addEventListener("click", function () {
      var i = S.d.indexOf(S.cur);
      if (i > -1) S.d.splice(i, 1);
      else if (S.d.length < 3) S.d.push(S.cur);
      else return; /* "Quita uno para colgar este": no hace nada */
      NS.emit();
    });
    chipsSrv.forEach(function (c) { c.addEventListener("change", function () { S.s = chipsSrv.filter(function (x) { return x.checked; }).map(function (x) { return x.value; }); NS.emit(); }); });
    chipsSuc.forEach(function (c) { c.addEventListener("change", function () { if (c.checked) { S.suc = c.value; NS.emit(); } }); });
    if (dia) {
      var hoy = new Date(), p2 = function (n) { return (n < 10 ? "0" : "") + n; };
      dia.min = hoy.getFullYear() + "-" + p2(hoy.getMonth() + 1) + "-" + p2(hoy.getDate());
      if (S.dia) dia.value = S.dia;
      dia.addEventListener("input", function () { S.dia = dia.value; NS.emit(); });
      dia.addEventListener("change", function () { S.dia = dia.value; NS.emit(); });
    }
    if (nombre) {
      if (S.nombre) nombre.value = S.nombre;
      nombre.addEventListener("input", function () { S.nombre = nombre.value; NS.emit(); });
    }
    NS.on(render);
    render(); ready = true;
    NS.emit(); /* pinta wa y cartelas con lo guardado */
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
