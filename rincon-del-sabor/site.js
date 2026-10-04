/* El Rincón del Sabor: header, menú, WhatsApp flotante, reveal. */
(function(){
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var doc = document, body = doc.body, root = doc.documentElement;

  /* reveal: el CSS base es el estado final; se esconde solo con JS y sin reduce-motion */
  var items = [].slice.call(doc.querySelectorAll("[data-reveal], #flags"));
  function show(el){ el.classList.add("is-in"); }
  if (!reduce) {
    root.classList.add("rv");
    var pending = items.filter(function(el){ return el.id !== "flags"; });
    var flags = doc.getElementById("flags");
    var raf = null;
    var failsafe = false;
    function tick(){
      raf = null;
      var vh = window.innerHeight || root.clientHeight;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) { show(pending[i]); pending.splice(i, 1); }
      }
      if (flags) {
        var f = flags.getBoundingClientRect();
        var inView = f.top < vh * 0.85 && f.bottom > 0;
        if (inView) show(flags); else if (failsafe && (f.top > vh || f.bottom < 0)) flags.classList.remove("is-in");
      }
      if (pending.length || flags) sched();
    }
    function sched(){ if (!raf) raf = requestAnimationFrame(tick); }
    window.addEventListener("scroll", sched, { passive: true });
    window.addEventListener("resize", sched);
    sched();
    setTimeout(function(){ failsafe = true; items.forEach(function(el){ if (el.id === "flags") { var r = el.getBoundingClientRect(); var vh = window.innerHeight; if (r.top < vh && r.bottom > 0) show(el); } else show(el); }); pending = []; sched(); }, 1600);
  }

  /* header compacto */
  var hd = doc.getElementById("hd");
  function onScroll(){ hd.classList.toggle("is-compact", (window.scrollY || 0) > 12); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* menú hamburguesa */
  var btn = doc.querySelector(".hd-btn"), menu = doc.getElementById("hd-menu"), lbl = btn.querySelector(".hd-lbl");
  function setMenu(open){
    body.classList.toggle("hd-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    menu.setAttribute("aria-hidden", open ? "false" : "true");
    lbl.textContent = open ? "Cerrar" : "Menú";
  }
  btn.addEventListener("click", function(){ setMenu(!body.classList.contains("hd-open")); });
  menu.addEventListener("click", function(e){ if (e.target.closest("a") || e.target === menu || e.target.classList.contains("hd-menu-in")) setMenu(false); });
  doc.addEventListener("keydown", function(e){ if (e.key === "Escape" && body.classList.contains("hd-open")) setMenu(false); });

  /* anclas con scroll suave por JS (sin scroll-behavior en CSS) */
  doc.addEventListener("click", function(e){
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented) return;
    var h = a.getAttribute("href"); if (h.length < 2) return;
    var el = doc.querySelector(h); if (!el) return;
    e.preventDefault();
    var top = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
    if (history.replaceState) history.replaceState(null, "", h);
  });

  /* flotantes se esconden donde ya hay un botón de WhatsApp grande */
  var zones = doc.querySelectorAll("#comanda, #hero, #pie");
  var r2 = null;
  function upd(){
    r2 = null;
    var vh = window.innerHeight, on = false;
    for (var i = 0; i < zones.length; i++) {
      var r = zones[i].getBoundingClientRect();
      var lim = zones[i].id === "hero" ? 0.6 : 0.85;
      if (r.top < vh * lim && r.bottom > vh * (zones[i].id === "hero" ? 0.55 : 0.15)) { on = true; break; }
    }
    body.classList.toggle("wa-off", on);
  }
  function s2(){ if (!r2) r2 = requestAnimationFrame(upd); }
  window.addEventListener("scroll", s2, { passive: true }); window.addEventListener("resize", s2); s2();
})();
