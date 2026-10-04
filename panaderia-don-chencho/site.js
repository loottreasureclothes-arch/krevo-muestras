(function(){
  var WA="524491887033";
  var root=document.documentElement,body=document.body;
  var rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.DC={WA:WA,url:function(m){return "https://wa.me/"+WA+"?text="+encodeURIComponent(m)}};
  document.querySelectorAll("[data-wa]").forEach(function(a){a.href=DC.url(a.getAttribute("data-wa"))});
  // menu
  var btn=document.querySelector(".hd-btn"),menu=document.getElementById("menu"),lbl=btn.querySelector(".hd-lbl");
  function setMenu(o){menu.hidden=!o;body.classList.toggle("menu-open",o);btn.setAttribute("aria-expanded",o);lbl.textContent=o?"Cerrar":"Menú"}
  btn.addEventListener("click",function(){setMenu(menu.hidden)});
  menu.addEventListener("click",function(e){if(e.target.closest("a"))setMenu(false)});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")setMenu(false)});
  // reveal visible a 1.6 s pase lo que pase
  if(!rm){
    root.classList.add("js-reveal");
    var els=document.querySelectorAll("[data-reveal]");
    if("IntersectionObserver" in window){
      var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
      els.forEach(function(el){io.observe(el)});
    }
    setTimeout(function(){els.forEach(function(el){el.classList.add("in")})},1600);
  }
  // flotante se esconde donde hay wa propio
  var zones=document.querySelectorAll("[data-hide-wa]"),fl=document.querySelector(".wa-float"),raf=0;
  function upd(){raf=0;var h=innerHeight,off=false;zones.forEach(function(z){var r=z.getBoundingClientRect();if(r.top<h*.85&&r.bottom>h*.15)off=true});fl.classList.toggle("off",off)}
  function sch(){if(!raf)raf=requestAnimationFrame(upd)}
  addEventListener("scroll",sch,{passive:true});addEventListener("resize",sch);upd();
})();
