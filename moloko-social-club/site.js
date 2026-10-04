(function(){
  var WA="524495835385";
  function waUrl(m){return "https://wa.me/"+WA+"?text="+encodeURIComponent(m);}
  window.MK={waUrl:waUrl};
  var root=document.documentElement;
  function initWa(){var l=document.querySelectorAll("[data-wa]");for(var i=0;i<l.length;i++)l[i].href=waUrl(l[i].getAttribute("data-wa"));}
  function initBar(){var b=document.getElementById("mk-bar");function u(){b.classList.toggle("solid",window.scrollY>40);}u();window.addEventListener("scroll",u,{passive:true});}
  function initMenu(){
    var btn=document.querySelector(".mk-menu-btn"),menu=document.getElementById("mk-menu");if(!btn||!menu)return;
    function set(o){document.body.classList.toggle("mk-menu-open",o);btn.setAttribute("aria-expanded",o?"true":"false");btn.setAttribute("aria-label",o?"Cerrar menú":"Abrir menú");}
    btn.addEventListener("click",function(){set(!document.body.classList.contains("mk-menu-open"));});
    menu.addEventListener("click",function(e){if(e.target.closest("a"))set(false);});
    document.addEventListener("keydown",function(e){if(e.key==="Escape")set(false);});
  }
  function initWaHide(){
    var fl=document.querySelector(".wa-float"),zones=document.querySelectorAll("[data-hide-wa]");if(!fl||!zones.length)return;
    var raf=0;function u(){raf=0;var vh=window.innerHeight,hide=false;
      for(var i=0;i<zones.length;i++){var r=zones[i].getBoundingClientRect();if(r.top<vh*.75&&r.bottom>vh*.25){hide=true;break;}}
      fl.classList.toggle("off",hide);}
    function s(){if(!raf)raf=requestAnimationFrame(u);}
    window.addEventListener("scroll",s,{passive:true});window.addEventListener("resize",s);u();
  }
  function initReveal(){
    var rm=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var els=document.querySelectorAll("[data-reveal]");if(rm||!("IntersectionObserver" in window)||!els.length)return;
    root.classList.add("rv-on");
    var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add("is-in");io.unobserve(e.target);}});},{threshold:.12,rootMargin:"0px 0px -6% 0px"});
    for(var i=0;i<els.length;i++)io.observe(els[i]);
    setTimeout(function(){for(var i=0;i<els.length;i++)els[i].classList.add("is-in");},1600);
  }
  function init(){initWa();initBar();initMenu();initWaHide();initReveal();}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
