/* La Miga y la Barriga: mecanica comun */
(function () {
  "use strict";
  var WA = "524491066875";
  function waUrl(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  window.KREVO = { wa: waUrl };
  document.documentElement.classList.add("js");
  var body = document.body;
  function each(sel, fn) { [].forEach.call(document.querySelectorAll(sel), fn); }
  each("[data-wa]", function (a) { a.href = waUrl(a.getAttribute("data-wa")); a.target = "_blank"; a.rel = "noopener"; });
  // header
  var bar = document.getElementById("bar");
  function solid() { bar.classList.toggle("is-solid", window.scrollY > 40); }
  solid(); window.addEventListener("scroll", solid, { passive: true });
  // menu
  var btn = document.querySelector(".bar-btn"), menu = document.getElementById("menu");
  function setMenu(o) { menu.hidden = !o; body.classList.toggle("menu-open", o); btn.setAttribute("aria-expanded", o); btn.querySelector(".bar-lbl").textContent = o ? "Cerrar" : "Menú"; }
  btn.addEventListener("click", function () { setMenu(menu.hidden); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) setMenu(false); });
  // anclas (sin scroll suave) con la altura del header
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]'); if (!a) return;
    var id = a.getAttribute("href"); if (id.length < 2) return;
    var t = document.querySelector(id); if (!t) return;
    e.preventDefault(); window.scrollTo(0, t.getBoundingClientRect().top + window.scrollY - 56);
    history.replaceState(null, "", id);
  });
  // flotante de WhatsApp se esconde donde ya hay boton grande
  var zones = [].slice.call(document.querySelectorAll("[data-hide-wa]")), raf = 0;
  function upd() {
    raf = 0; var vh = window.innerHeight, on = zones.some(function (z) { var r = z.getBoundingClientRect(); return r.top < vh * .8 && r.bottom > vh * .2; });
    body.classList.toggle("wa-off", on);
  }
  function sch() { if (!raf) raf = requestAnimationFrame(upd); }
  window.addEventListener("scroll", sch, { passive: true }); window.addEventListener("resize", sch); upd();
  // reveal: entra al verse y siempre queda visible a los 1.6 s
  var els = [].slice.call(document.querySelectorAll("[data-reveal],[data-arch]"));
  els.forEach(function (el, i) { if (el.hasAttribute("data-reveal")) el.style.setProperty("--d", ((i % 3) * 0.08) + "s"); });
  function show(el) { el.classList.add("is-in"); }
  function check() {
    var vh = window.innerHeight;
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (el.hasAttribute("data-arch")) { // reversible
        if (r.top < vh * .86 && r.bottom > 0) { if (!el.classList.contains("is-in")) { show(el); } }
        else if (r.top >= vh) el.classList.remove("is-in");
      } else if (r.top < vh * .92) show(el);
      if (r.top < vh && r.bottom > 0 && !el._t) el._t = setTimeout(function () { show(el); }, 1600);
    });
  }
  window.addEventListener("scroll", check, { passive: true }); window.addEventListener("resize", check);
  check(); window.addEventListener("load", check);
})();
