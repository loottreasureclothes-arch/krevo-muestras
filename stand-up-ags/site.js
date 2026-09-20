/* Stand Up Diseño · FUNDACIÓN: WhatsApp, menú, header propio (compacta y
   cambia el logo por el círculo "up"), reveal con blindaje, y el generador
   compartido de la "Planta que se levanta" (SU.plantaHTML), que alimenta el
   momento firma (03-firma) y, en el turno 2, el catálogo (02-catalogo).
   API para las secciones:
     SU.waUrl(msg) / SU.openWa(msg, fallbackLink) / SU.go(el)
     SU.plantaHTML(w, d, tipo, opts) -> string de un plano SVG + paredes listo
       para animar con la clase .is-vol en su .su-plan-3d (ver site.css) */
(function () {
  "use strict";
  var WA = "524494579759";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var doc = document.documentElement;
  var SU = window.SU = window.SU || {};
  SU.WA = WA;
  SU.reduce = reduce;
  SU.waUrl = function (msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); };
  SU.openWa = function (msg, fb) {
    var url = SU.waUrl(msg), w = null;
    try { w = window.open(url, "_blank"); } catch (e) { w = null; }
    if (w) { try { w.opener = null; } catch (e) {} }
    if (fb) { fb.href = url; fb.classList.add("is-on"); }
    if (!w) location.href = url; /* navegador de IG/FB sin popup: misma pestana (L15) */
    return url;
  };
  /* El input type=date entrega "2026-10-04". Al dueno le llega el WhatsApp en
     cristiano: "4 de octubre de 2026". Se arma a mano (sin new Date) para que
     no se recorra un dia por zona horaria. */
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
               "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  SU.fechaLarga = function (iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || "").trim());
    if (!m) return iso || "";
    var mes = MESES[parseInt(m[2], 10) - 1];
    if (!mes) return iso;
    return parseInt(m[3], 10) + " de " + mes + " de " + m[1];
  };

  SU.go = function (el) {
    if (!el) return;
    var h = document.querySelector(".k-header");
    var top = el.getBoundingClientRect().top + window.scrollY - (h ? h.offsetHeight : 0) + 2;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  };

  function initWa() {
    var links = document.querySelectorAll("[data-wa]");
    for (var i = 0; i < links.length; i++) {
      links[i].href = SU.waUrl(links[i].getAttribute("data-wa"));
      links[i].target = "_blank";
      links[i].rel = "noopener";
    }
  }

  /* ---------- Header propio: compacta a los 40px, cambia el logo por el
     circulo "up" y la hairline se vuelve barra de avance de lectura ---------- */
  function initHeader() {
    var header = document.getElementById("su-header");
    var rule = document.getElementById("su-header-rule");
    if (!header) return;
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY || window.pageYOffset;
      var compact = y > 40;
      header.classList.toggle("is-compact", compact);
      if (compact && rule) {
        var doc2 = document.documentElement;
        var max = (doc2.scrollHeight - window.innerHeight) || 1;
        var p = Math.min(1, Math.max(0, y / max));
        rule.style.transform = "scaleX(" + p + ")";
      } else if (rule) {
        rule.style.transform = "";
      }
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- Menú hamburguesa (panel completo, foco atrapado, Escape, historial) ---------- */
  function initMenu() {
    var btn = document.querySelector(".su-burger");
    var menu = document.getElementById("cd-menu");
    if (!btn || !menu) return;
    var body = document.body;
    var links = menu.querySelectorAll("a");
    function set(open) {
      var was = body.classList.contains("cd-menu-open");
      if (open === was) return;
      body.classList.toggle("cd-menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) {
        history.pushState({ suMenu: true }, "");
        setTimeout(function () { links[0].focus({ preventScroll: true }); }, 80);
      } else {
        btn.focus({ preventScroll: true });
      }
    }
    btn.addEventListener("click", function () { set(!body.classList.contains("cd-menu-open")); });
    menu.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (a || e.target.classList.contains("cd-menu-scrim")) set(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!body.classList.contains("cd-menu-open")) return;
      if (e.key === "Escape") { e.preventDefault(); set(false); return; }
      if (e.key === "Tab") {
        var items = [btn].concat(Array.prototype.slice.call(links));
        var i = items.indexOf(document.activeElement);
        e.preventDefault();
        if (i < 0) i = e.shiftKey ? 0 : -1;
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
      }
    });
    window.addEventListener("popstate", function () {
      if (body.classList.contains("cd-menu-open")) set(false);
    });
  }

  /* ---------- Reveal con blindaje (IO -12% + rescate 1.6s; el kit ya trae
     su propia red de seguridad para [data-reveal]; esto cubre .su-mask) ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".su-mask, [data-su-reveal]");
    if (!els.length) return;
    function show(el) { el.classList.add("is-in"); }
    if (reduce || !("IntersectionObserver" in window)) { Array.prototype.forEach.call(els, show); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        show(e.target);
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
    window.setTimeout(function () {
      var vh = window.innerHeight || doc.clientHeight;
      Array.prototype.forEach.call(els, function (el) {
        if (el.classList.contains("is-in")) return;
        var r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < vh * 1.2) show(el);
      });
    }, 1600);
  }

  /* =====================================================================
     SU.plantaHTML: genera el plano SVG a escala + los divs de pared del
     componente firma "Planta que se levanta" (HOJA §4). Un solo grosor de
     trazo (1.5px). Trazo lleno verde = pared; punteado = lado abierto.
       tipo: "cajon" (3 paredes, 1 lado abierto: frente)
             "esquina" (2 paredes adyacentes: fondo+izq; abiertos: frente+der)
             "cabecera" (1 pared: fondo; abiertos: frente+izq+der)
             "isla" / "especiales" (0 paredes; los 4 lados punteados)
     opts.sistema: "OCTANORM" dibuja las juntas de panel cada 1 m sobre la
       linea de pared (tick de 1px perpendicular) y raya las paredes del
       volumen cada modulo; "CUSTOM" deja la pared de trazo continuo, sin
       juntas. Es lo que de verdad distingue lo que compra el cliente, y hace
       que "3x3 Cabecera Custom" y "3x3 Cabecera Octanorm" dejen de ser el
       mismo dibujo con otro sello.
     Devuelve el HTML de <div class="su-plan-scene"><div class="su-plan-3d">…
     para insertar en el DOM; las paredes ya vienen con estilo inline (left/
     width/bottom en %) calculado sobre el mismo rect que dibuja el SVG, asi
     que quedan alineadas sin importar el tamaño real en pantalla. ===== */
  var SCALE = 30, ML = 30, MT = 30, MR = 8, MB = 8, WALL_H_PCT = 42; // alto visual de la pared, % del ancho del rect corto
  // MT=30 (no 22): dejaba muy poco aire arriba y el SVG recorta por default lo
  // que se sale del viewBox, asi que la cota superior ("3.00", "6.00") perdia
  // el remate de arriba y se leia mal (turno 2, 20 sep: verificado con
  // krevo-shot, el "3.00" del catalogo se veia como "5.00"). Con MT=30 el
  // numero cabe completo antes de la linea de cota.
  function wallsFor(tipo) {
    // true = pared cerrada (trazo lleno); false = lado abierto (punteado)
    switch (tipo) {
      case "cajon": return { top: true, left: true, right: true, bottom: false };
      case "esquina": return { top: true, left: true, right: false, bottom: false };
      case "cabecera": return { top: true, left: false, right: false, bottom: false };
      default: return { top: false, left: false, right: false, bottom: false }; // isla / especiales
    }
  }
  SU.plantaHTML = function (w, d, tipo, opts) {
    opts = opts || {};
    var walls = wallsFor(tipo);
    var rectW = w * SCALE, rectH = d * SCALE;
    var vbW = ML + rectW + MR, vbH = MT + rectH + MB;
    var rx = ML, ry = MT;
    var lines = [];
    // reticula de modulo de 1m dentro del rect (piso de la feria)
    for (var i = 1; i < w; i++) lines.push('<line x1="' + (rx + i * SCALE) + '" y1="' + ry + '" x2="' + (rx + i * SCALE) + '" y2="' + (ry + rectH) + '" stroke="currentColor" stroke-width="1" opacity=".14"/>');
    for (var j = 1; j < d; j++) lines.push('<line x1="' + rx + '" y1="' + (ry + j * SCALE) + '" x2="' + (rx + rectW) + '" y2="' + (ry + j * SCALE) + '" stroke="currentColor" stroke-width="1" opacity=".14"/>');
    var octanorm = String(opts.sistema || "").toUpperCase() === "OCTANORM";
    function joints(x1, y1, x2, y2) {
      // juntas de panel cada 1 m: tick de 1px perpendicular a la linea de pared
      if (!octanorm) return "";
      var dx = x2 - x1, dy = y2 - y1;
      var len = Math.sqrt(dx * dx + dy * dy);
      var n = Math.round(len / SCALE);
      if (n < 2) return "";
      var ux = dx / len, uy = dy / len;      // a lo largo de la pared
      var px = -uy, py = ux;                  // perpendicular
      var T = 3.5, out = "";
      for (var k = 1; k < n; k++) {
        var cx = x1 + ux * SCALE * k, cy = y1 + uy * SCALE * k;
        out += '<line x1="' + (cx - px * T) + '" y1="' + (cy - py * T) +
               '" x2="' + (cx + px * T) + '" y2="' + (cy + py * T) +
               '" stroke="#51913d" stroke-width="1"/>';
      }
      return out;
    }
    function edge(side, x1, y1, x2, y2) {
      var closed = walls[side];
      var dash = closed ? "" : ' stroke-dasharray="4 4"';
      var line = '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#51913d" stroke-width="1.5"' + dash + ' stroke-linecap="round"/>';
      return closed ? line + joints(x1, y1, x2, y2) : line;
    }
    var edges = [
      edge("top", rx, ry, rx + rectW, ry),
      edge("right", rx + rectW, ry, rx + rectW, ry + rectH),
      edge("bottom", rx + rectW, ry + rectH, rx, ry + rectH),
      edge("left", rx, ry + rectH, rx, ry),
    ].join("");
    // cotas: linea con topes en T + numero tabular
    var cotaTop =
      '<g class="su-cota">' +
      '<line x1="' + rx + '" y1="' + (ry - 10) + '" x2="' + (rx + rectW) + '" y2="' + (ry - 10) + '" stroke="#51913d" stroke-width="1"/>' +
      '<line x1="' + rx + '" y1="' + (ry - 14) + '" x2="' + rx + '" y2="' + (ry - 6) + '" stroke="#51913d" stroke-width="1"/>' +
      '<line x1="' + (rx + rectW) + '" y1="' + (ry - 14) + '" x2="' + (rx + rectW) + '" y2="' + (ry - 6) + '" stroke="#51913d" stroke-width="1"/>' +
      '<text class="su-cota-label" x="' + (rx + rectW / 2) + '" y="' + (ry - 16) + '" text-anchor="middle">' + w.toFixed(2) + '</text>' +
      '</g>';
    var cotaLeft =
      '<g class="su-cota">' +
      '<line x1="' + (rx - 10) + '" y1="' + ry + '" x2="' + (rx - 10) + '" y2="' + (ry + rectH) + '" stroke="#51913d" stroke-width="1"/>' +
      '<line x1="' + (rx - 14) + '" y1="' + ry + '" x2="' + (rx - 6) + '" y2="' + ry + '" stroke="#51913d" stroke-width="1"/>' +
      '<line x1="' + (rx - 14) + '" y1="' + (ry + rectH) + '" x2="' + (rx - 6) + '" y2="' + (ry + rectH) + '" stroke="#51913d" stroke-width="1"/>' +
      '<text class="su-cota-label" x="' + (rx - 18) + '" y="' + (ry + rectH / 2) + '" text-anchor="middle" transform="rotate(-90 ' + (rx - 18) + ' ' + (ry + rectH / 2) + ')">' + d.toFixed(2) + '</text>' +
      '</g>';
    var svg = '<svg class="su-plan-floor" viewBox="0 0 ' + vbW + ' ' + vbH + '" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" color="#eef1ee">' +
      lines.join("") + edges + cotaTop + cotaLeft + "</svg>";
    // divs de pared (solo lados cerrados), posicion en % sobre el mismo rect
    function pct(v, total) { return (v / total * 100).toFixed(3) + "%"; }
    /* Las paredes cuelgan TODAS de la linea de fondo (la de cabecera) y se
       levantan desde ahi. Los retornos laterales giran ademas en Y para que
       corran hacia el frente abierto, como el cajon real. */
    var wallDivs = "";
    var wallH = WALL_H_PCT; // % del alto de la escena (visual, no a escala real)
    var base = pct(vbH - ry, vbH);
    var retorno = rectH * 0.62; // fondo del retorno, proporcional a la profundidad
    function wall(extra, left, width, mods, wy) {
      var h = wy ? wallH * 0.93 : wallH; // el retorno va un pelo mas bajo: en perspectiva su canto cercano crece
      return '<div class="su-wall' + (octanorm ? " is-octanorm" : "") + extra +
        '" style="left:' + left + ';width:' + width + ';bottom:' + base + ';height:' + h + '%' +
        (wy ? ';--wy:' + wy + 'deg' : "") +
        (octanorm ? ';--su-mods:' + mods : "") + '"></div>';
    }
    if (walls.left) {
      wallDivs += wall(" su-wall--izq", pct(rx, vbW), pct(retorno, vbW), Math.max(1, Math.round(retorno / SCALE)), -66);
    }
    if (walls.right) {
      wallDivs += wall(" su-wall--der", pct(rx + rectW - retorno, vbW), pct(retorno, vbW), Math.max(1, Math.round(retorno / SCALE)), 66);
    }
    if (walls.top) {
      wallDivs += wall("", pct(rx, vbW), pct(rectW, vbW), w, 0);
    }
    return (
      '<div class="su-plan-scene"><div class="su-plan-3d">' +
      '<div class="su-plan-box" style="aspect-ratio:' + vbW + '/' + vbH + '">' + svg + wallDivs + "</div>" +
      "</div></div>"
    );
  };

  function init() {
    initWa();
    initHeader();
    initMenu();
    initReveal();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
