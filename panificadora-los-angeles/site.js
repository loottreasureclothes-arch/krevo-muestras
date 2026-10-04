(function () {
  "use strict";
  var WA = "524499159943";
  var root = document.documentElement, body = document.body;
  function waUrl(m) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(m); }
  window.PLA = { waUrl: waUrl };
  Array.prototype.forEach.call(document.querySelectorAll("[data-wa]"), function (a) { a.href = waUrl(a.getAttribute("data-wa")); });

  var bar = document.getElementById("bar"), btn = document.querySelector(".menu-btn"), menu = document.getElementById("menu");
  function onScroll() { bar.classList.toggle("solid", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  function setMenu(o) { body.classList.toggle("menu-open", o); btn.setAttribute("aria-expanded", o); menu.setAttribute("aria-hidden", !o); }
  btn.addEventListener("click", function () { setMenu(!body.classList.contains("menu-open")); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href"); if (id.length < 2) return;
    var el = document.querySelector(id); if (!el) return;
    e.preventDefault(); setMenu(false);
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 56);
  });

  /* reveal */
  var els = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  function tick() {
    var vh = window.innerHeight;
    els = els.filter(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) { el.classList.add("is-in"); return false; }
      return true;
    });
  }
  tick(); window.addEventListener("scroll", tick, { passive: true }); window.addEventListener("resize", tick);
  var door = document.querySelector("[data-door]");
  if (door) requestAnimationFrame(function () { requestAnimationFrame(function () { door.classList.add("is-in"); }); });

  /* flotante se esconde donde ya hay un verde grande */
  var zones = Array.prototype.slice.call(document.querySelectorAll("[data-hide-wa]"));
  function wz() {
    var vh = window.innerHeight, on = false;
    zones.forEach(function (z) { var r = z.getBoundingClientRect(); if (r.top < vh * 0.85 && r.bottom > vh * 0.1) on = true; });
    body.classList.toggle("wa-off", on);
  }
  wz(); window.addEventListener("scroll", wz, { passive: true }); window.addEventListener("resize", wz);
})();
