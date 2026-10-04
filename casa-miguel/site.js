/* Casa Miguel: header, menu, WhatsApp, reveal, estado abierto */
(function(){
  "use strict";
  var WA="524491827393";
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function waUrl(m){return "https://wa.me/"+WA+"?text="+encodeURIComponent(m);}
  window.CM={waUrl:waUrl,reduce:reduce};
  function hoyAgs(){
    var p={};try{new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value});}catch(e){var d=new Date();return {dow:d.getDay(),h:d.getHours()+d.getMinutes()/60};}
    var map={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};
    return {dow:map[p.weekday],h:(parseInt(p.hour,10)%24)+parseInt(p.minute,10)/60};
  }
  window.CM.hoy=hoyAgs;
  function horario(dow){return dow===0?{a:9,c:18}:{a:8,c:21};}
  window.CM.horario=horario;
  function initWa(){
    var l=document.querySelectorAll("[data-wa]");
    for(var i=0;i<l.length;i++){l[i].href=waUrl(l[i].getAttribute("data-wa"));l[i].target="_blank";l[i].rel="noopener";}
  }
  function initHeader(){
    var h=document.getElementById("cm-bar"),t=false;
    function u(){t=false;h.classList.toggle("is-compact",(window.scrollY||0)>12);}
    window.addEventListener("scroll",function(){if(!t){t=true;requestAnimationFrame(u);}},{passive:true});u();
    var est=document.getElementById("cm-estado");
    function paint(){
      var n=hoyAgs(),hr=horario(n.dow),abierto=n.h>=hr.a&&n.h<hr.c;
      est.classList.toggle("on",abierto);est.classList.toggle("off",!abierto);
      est.querySelector("span").textContent=abierto?("Abierto hasta "+(hr.c>12?hr.c-12:hr.c)+" pm"):("Abre "+(hr.a)+" am");
      if(!abierto&&n.h>=hr.c){var m=horario((n.dow+1)%7);est.querySelector("span").textContent="Abre mañana "+m.a+" am";}
    }
    paint();setInterval(paint,60000);
  }
  var closeMenu=function(){};
  function initMenu(){
    var btn=document.querySelector(".cm-menu-btn"),menu=document.getElementById("cm-menu"),b=document.body;
    var links=menu.querySelectorAll("a"),lbl=btn.querySelector(".cm-menu-lbl");
    function set(o){
      if(o===b.classList.contains("hm-open"))return;
      b.classList.toggle("hm-open",o);btn.setAttribute("aria-expanded",o?"true":"false");menu.setAttribute("aria-hidden",o?"false":"true");
      lbl.textContent=o?"Cerrar":"Menú";
      if(o)setTimeout(function(){links[0].focus({preventScroll:true});},80);else btn.focus({preventScroll:true});
    }
    closeMenu=function(){set(false);};
    btn.addEventListener("click",function(){set(!b.classList.contains("hm-open"));});
    menu.addEventListener("click",function(e){if(e.target.closest("a")||e.target===menu||e.target.classList.contains("cm-menu-panel"))set(false);});
    document.addEventListener("keydown",function(e){
      if(!b.classList.contains("hm-open"))return;
      if(e.key==="Escape"){e.preventDefault();set(false);return;}
      if(e.key==="Tab"){var it=[btn].concat([].slice.call(links));var i=it.indexOf(document.activeElement);e.preventDefault();if(i<0)i=e.shiftKey?0:-1;it[(i+(e.shiftKey?-1:1)+it.length)%it.length].focus();}
    });
  }
  function watch(list,frac,cb){
    var p=[].slice.call(list);if(!p.length)return;var raf=null;
    function tick(){raf=null;var vh=window.innerHeight;
      for(var i=p.length-1;i>=0;i--){var r=p[i].getBoundingClientRect();if(r.top<vh*frac&&r.bottom>0){var el=p[i];p.splice(i,1);cb(el);}}
      if(p.length)sch();}
    function sch(){if(!raf)raf=requestAnimationFrame(tick);}
    sch();window.addEventListener("scroll",sch,{passive:true});window.addEventListener("resize",sch);
  }
  window.CM.watch=watch;
  function initReveal(){
    var els=document.querySelectorAll("[data-reveal]");
    if(reduce){[].forEach.call(els,function(e){e.classList.add("in")});return;}
    watch(els,1,function(e){e.classList.add("in")});
  }
  function initFab(){
    var fab=document.getElementById("cm-fab"),z=document.querySelectorAll("[data-hide-wa]");
    function u(){var vh=innerHeight,on=false;for(var i=0;i<z.length;i++){var r=z[i].getBoundingClientRect();if(r.top<vh*.85&&r.bottom>0){on=true;break;}}fab.classList.toggle("is-off",on);}
    var raf=null;function s(){if(!raf)raf=requestAnimationFrame(function(){raf=null;u();});}
    s();addEventListener("scroll",s,{passive:true});addEventListener("resize",s);
  }
  function go(el){
    var bar=document.getElementById("cm-bar");
    var top=el.getBoundingClientRect().top+window.scrollY-(bar?bar.offsetHeight+8:0);
    window.scrollTo({top:Math.max(0,top),behavior:reduce?"auto":"smooth"});
  }
  window.CM.ir=go;
  function initAnchors(){
    document.addEventListener("click",function(e){
      var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a||e.defaultPrevented)return;
      var h=a.getAttribute("href");if(h.length<2)return;var el=document.querySelector(h);if(!el)return;
      e.preventDefault();closeMenu();go(el);if(history.replaceState)history.replaceState(null,"",h);
    });
  }
  function init(){initWa();initHeader();initMenu();initReveal();initFab();initAnchors();}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
