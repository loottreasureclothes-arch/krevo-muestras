(function(){
  "use strict";
  var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches,body=document.body;
  var WA="524499166458";
  [].forEach.call(document.querySelectorAll("[data-wa]"),function(a){a.href="https://wa.me/"+WA+"?text="+encodeURIComponent(a.getAttribute("data-wa"));a.target="_blank";a.rel="noopener"});
  /* menu */
  var btn=document.querySelector(".aw-btn"),menu=document.getElementById("aw-menu"),lbl=btn.querySelector(".aw-lbl");
  function set(o){body.classList.toggle("menu-open",o);btn.setAttribute("aria-expanded",o);menu.setAttribute("aria-hidden",!o);lbl.textContent=o?"Cerrar":"Menú"}
  btn.addEventListener("click",function(){set(!body.classList.contains("menu-open"))});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")set(false)});
  /* anclas */
  document.addEventListener("click",function(e){
    var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;
    var el=document.querySelector(a.getAttribute("href"));if(!el)return;
    e.preventDefault();set(false);
    window.scrollTo({top:Math.max(0,el.getBoundingClientRect().top+scrollY-60),behavior:reduce?"auto":"smooth"});
  });
  /* reveal reversible para la ventana; normal para el resto */
  var els=[].slice.call(document.querySelectorAll("[data-reveal],[data-open]"));
  function vis(el,f){var r=el.getBoundingClientRect(),vh=innerHeight;return r.top<vh*f&&r.bottom>0}
  if(!reduce){
    document.documentElement.classList.add("js-rv");
    var win=document.querySelector(".mostr-win");
    var raf=0;
    function tick(){raf=0;
      els.forEach(function(el){
        if(el===win||el.hasAttribute("data-open")){el.classList.toggle("is-in",vis(el,.75))}
        else if(!el.classList.contains("is-in")&&vis(el,1))el.classList.add("is-in");
      });}
    var st=0;function sch(){if(!raf)raf=requestAnimationFrame(tick);clearTimeout(st);st=setTimeout(function(){els.forEach(function(el){if(!el.hasAttribute("data-open")&&vis(el,1))el.classList.add("is-in")})},600)}
    addEventListener("scroll",sch,{passive:true});addEventListener("resize",sch);sch();
    setTimeout(function(){els.forEach(function(el){if(vis(el,1))el.classList.add("is-in")})},1600);
  }
  /* WA flotante se esconde donde ya hay CTA */
  var zones=[].slice.call(document.querySelectorAll("[data-hide-wa],.pie"));
  function wa(){var on=zones.some(function(z){return vis(z,.8)});body.classList.toggle("wa-off",on)}
  addEventListener("scroll",function(){requestAnimationFrame(wa)},{passive:true});wa();
})();
