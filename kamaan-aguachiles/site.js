/* Kamaan Aguachiles: menu, WhatsApp, header, reveal, anclas. */
(function(){
  "use strict";
  var WA="524496351125";
  var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.KWA={num:WA,url:function(m){return "https://wa.me/"+WA+"?text="+encodeURIComponent(m);}};
  function initWa(){
    var l=document.querySelectorAll("[data-wa]");
    for(var i=0;i<l.length;i++){l[i].href=KWA.url(l[i].getAttribute("data-wa"));l[i].target="_blank";l[i].rel="noopener";}
  }
  function watch(list,frac,cb){
    var p=Array.prototype.slice.call(list);if(!p.length)return;var raf=null;
    function tick(){raf=null;var vh=innerHeight;for(var i=p.length-1;i>=0;i--){var r=p[i].getBoundingClientRect();if(r.top<vh*frac&&r.bottom>0){var e=p[i];p.splice(i,1);cb(e);}}if(p.length)sch();}
    function sch(){if(!raf)raf=requestAnimationFrame(tick);}
    sch();addEventListener("scroll",sch,{passive:true});addEventListener("resize",sch);
  }
  var closeMenu=function(){};
  function initMenu(){
    var b=document.querySelector(".kh-burger"),m=document.getElementById("kh-menu");if(!b||!m)return;
    var body=document.body,lbl=b.querySelector(".kh-lbl"),links=m.querySelectorAll("a");
    Array.prototype.forEach.call(m.querySelectorAll(".km-nav a"),function(a,i){a.style.transitionDelay=(i*40)+"ms";});
    function set(o){if(o===body.classList.contains("km-open"))return;body.classList.toggle("km-open",o);b.setAttribute("aria-expanded",o?"true":"false");m.setAttribute("aria-hidden",o?"false":"true");if(lbl)lbl.textContent=o?"Cerrar":"Menú";}
    closeMenu=function(){set(false);};
    b.addEventListener("click",function(){set(!body.classList.contains("km-open"));});
    m.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a");if(a)set(false);else if(e.target===m||e.target.classList.contains("km-panel")||e.target.classList.contains("km-nav"))set(false);});
    document.addEventListener("keydown",function(e){if(e.key==="Escape"&&body.classList.contains("km-open")){e.preventDefault();set(false);b.focus();}});
  }
  function initHeader(){
    var h=document.getElementById("kh");if(!h)return;var t=false;
    function u(){t=false;h.classList.toggle("is-compact",(scrollY||0)>12);}
    addEventListener("scroll",function(){if(!t){t=true;requestAnimationFrame(u);}},{passive:true});u();
  }
  function initWaHide(){
    var z=document.querySelectorAll("[data-hide-wa]");if(!z.length)return;var raf=null;
    function u(){raf=null;var vh=innerHeight,on=false;for(var i=0;i<z.length;i++){var r=z[i].getBoundingClientRect();if(r.top<vh*.75&&r.bottom>vh*.25){on=true;break;}}document.body.classList.toggle("kwa-off",on);}
    function s(){if(!raf)raf=requestAnimationFrame(u);}
    s();addEventListener("scroll",s,{passive:true});addEventListener("resize",s);
  }
  function initReveal(){
    var els=document.querySelectorAll("[data-r]");if(!els.length)return;
    function show(e){e.classList.add("is-in");}
    if(reduce){Array.prototype.forEach.call(els,show);return;}
    watch(els,.92,show);
  }
  function go(el){var h=document.getElementById("kh");var top=el.getBoundingClientRect().top+scrollY-(h?h.offsetHeight+10:0);scrollTo({top:Math.max(0,top),behavior:reduce?"auto":"smooth"});}
  function initAnchors(){
    document.addEventListener("click",function(e){
      var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a||e.defaultPrevented)return;
      var href=a.getAttribute("href");if(href.length<2)return;var el=document.querySelector(href);if(!el)return;
      e.preventDefault();closeMenu();go(el);if(history.replaceState)history.replaceState(null,"",href);
    });
  }
  function init(){initWa();initHeader();initMenu();initWaHide();initReveal();initAnchors();}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
