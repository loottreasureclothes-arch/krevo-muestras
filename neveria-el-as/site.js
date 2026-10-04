(function () {
  "use strict";
  var WA = "524499152651";
  var root = document.documentElement;
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  window.ElAs = { waUrl: waUrl };

  /* wa.me real en el HTML (href base); el JS solo reescribe el href con el texto */
  Array.prototype.forEach.call(document.querySelectorAll("[data-wa]"), function (a) {
    a.href = waUrl(a.getAttribute("data-wa"));
    a.target = "_blank"; a.rel = "noopener";
  });

  /* menu */
  var btn = document.getElementById("hdBtn"), menu = document.getElementById("hdMenu"), body = document.body;
  function setMenu(open) {
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    body.classList.toggle("menu-open", open);
    if (open) { menu.hidden = false; requestAnimationFrame(function () { menu.classList.add("on"); }); }
    else { menu.classList.remove("on"); setTimeout(function () { if (!body.classList.contains("menu-open")) menu.hidden = true; }, 260); }
  }
  btn.addEventListener("click", function () { setMenu(!body.classList.contains("menu-open")); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* anclas con compensacion del header (sin smooth) */
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]'); if (!a) return;
    var id = a.getAttribute("href").slice(1); if (!id) return;
    var t = document.getElementById(id); if (!t) return;
    e.preventDefault();
    window.scrollTo(0, t.getBoundingClientRect().top + window.pageYOffset - 56);
  });

  /* header: fondo al bajar + progreso del sello */
  var hd = document.getElementById("hd"), raf = null;
  function onScroll() {
    raf = null;
    var y = window.pageYOffset;
    hd.classList.toggle("solid", y > 24);
    root.style.setProperty("--sp", Math.min(1, y / 700).toFixed(3));
  }
  window.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(onScroll); }, { passive: true });
  onScroll();

  /* flotante oculto cuando hay un verde propio a la vista */
  var wa = document.getElementById("waFloat");
  var hides = document.querySelectorAll("[data-hide-wa]");
  function waCheck() {
    var vh = window.innerHeight, hide = false;
    for (var i = 0; i < hides.length; i++) { var r = hides[i].getBoundingClientRect(); if (r.top < vh * 0.85 && r.bottom > vh * 0.15) { hide = true; break; } }
    wa.classList.toggle("off", hide);
  }
  window.addEventListener("scroll", waCheck, { passive: true }); window.addEventListener("resize", waCheck); waCheck();

  /* reveal: visible a los 1.6 s pase lo que pase */
  var els = document.querySelectorAll("[data-rv]");
  var motion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
  if (motion && "IntersectionObserver" in window) {
    root.classList.add("rv");
    var io = new IntersectionObserver(function (list) {
      list.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
    setTimeout(function () { Array.prototype.forEach.call(els, function (el) { el.classList.add("in"); }); }, 1600);
  }
})();
