(function () {
  "use strict";
  var WA = "524493188586";
  var doc = document, root = doc.documentElement, body = doc.body;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  var TB = window.TB = { WA: WA, waUrl: waUrl, carta: [], listeners: [] };
  TB.on = function (fn) { TB.listeners.push(fn); };
  TB.emit = function () { TB.listeners.forEach(function (fn) { fn(TB.carta); }); };

  // [data-wa] reescribe el href (el link ya es un wa.me real)
  Array.prototype.forEach.call(doc.querySelectorAll("[data-wa]"), function (a) { a.href = waUrl(a.getAttribute("data-wa")); });

  // header
  var hd = doc.getElementById("hd");
  function hdState() { hd.classList.toggle("solid", window.scrollY > 40); }
  hdState(); window.addEventListener("scroll", hdState, { passive: true });

  // menu
  var btn = doc.querySelector(".hd-btn"), menu = doc.getElementById("hd-menu"), lbl = btn.querySelector(".hd-lbl");
  function setMenu(open) {
    body.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    lbl.textContent = open ? "Cerrar" : "Menú";
    if (open) menu.removeAttribute("hidden");
  }
  btn.addEventListener("click", function () { setMenu(!body.classList.contains("menu-open")); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  doc.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  // flotante: se esconde donde ya hay un boton verde o no aplica
  var wa = doc.getElementById("wa-float"), zones = doc.querySelectorAll("[data-hide-wa]");
  function waHide() {
    var vh = window.innerHeight, hide = false;
    Array.prototype.forEach.call(zones, function (z) { var r = z.getBoundingClientRect(); if (r.top < vh * .85 && r.bottom > vh * .1) hide = true; });
    wa.classList.toggle("hide", hide);
  }
  waHide(); window.addEventListener("scroll", waHide, { passive: true }); window.addEventListener("resize", waHide);

  // reveal: visible a los 1.6 s pase lo que pase
  var els = doc.querySelectorAll("[data-reveal]");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    root.classList.add("js-rv");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .05 });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
    setTimeout(function () { Array.prototype.forEach.call(els, function (el) { el.classList.add("in"); }); }, 1600);
  }
})();
