(function(){"use strict";
var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var body=document.body,btn=document.getElementById("hd-btn"),menu=document.getElementById("menu");
var lbl=btn&&btn.querySelector(".hd-lbl");
function set(o){if(o===body.classList.contains("menu-open"))return;body.classList.toggle("menu-open",o);btn.setAttribute("aria-expanded",o);menu.setAttribute("aria-hidden",!o);if(lbl)lbl.textContent=o?"Cerrar":"Menú"}
if(btn){btn.addEventListener("click",function(){set(!body.classList.contains("menu-open"))});
document.addEventListener("keydown",function(e){if(e.key==="Escape")set(false)});
Array.prototype.forEach.call(menu.querySelectorAll("a"),function(a){a.addEventListener("click",function(){set(false)})})}
/* anclas sin scroll-behavior en CSS */
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;var h=a.getAttribute("href");if(h.length<2)return;var el=document.querySelector(h);if(!el)return;e.preventDefault();
var top=el.getBoundingClientRect().top+window.scrollY-(h==="#mesa"?80:0)-(h==="#inicio"||h==="#salon"?0:60);
window.scrollTo({top:Math.max(0,top),behavior:reduce?"auto":"smooth"})});
/* WhatsApp flotante se esconde donde ya hay un botón verde grande */
var zones=document.querySelectorAll("[data-hide-wa],#mesa");
function upd(){var vh=window.innerHeight,on=false;for(var i=0;i<zones.length;i++){var r=zones[i].getBoundingClientRect();if(r.top<vh*.75&&r.bottom>vh*.1){on=true;break}}body.classList.toggle("wa-off",on)}
var t=null;function sch(){if(!t)t=requestAnimationFrame(function(){t=null;upd()})}
window.addEventListener("scroll",sch,{passive:true});window.addEventListener("resize",sch);upd();
/* reveal */
var els=document.querySelectorAll("[data-reveal]");
function show(e){e.classList.add("in")}
if(reduce||!("IntersectionObserver" in window)){Array.prototype.forEach.call(els,show)}
else{var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){show(e.target);io.unobserve(e.target)}})},{rootMargin:"0px 0px -6% 0px"});
Array.prototype.forEach.call(els,function(e){io.observe(e)});
window.addEventListener("load",function(){setTimeout(function(){Array.prototype.forEach.call(els,function(e){var r=e.getBoundingClientRect();if(r.top<window.innerHeight*1.2)show(e)})},1600)})}
})();
