(function(){
"use strict";
var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
var WA={plaza:"524499790707",meridian:"524496880101"};
var NAME={plaza:"Plaza Patio",meridian:"Meridian Park"};
var TT=window.TT={suc:"plaza",listeners:[],on:function(f){this.listeners.push(f)},emit:function(){for(var i=0;i<this.listeners.length;i++)this.listeners[i]()},
 wa:function(msg,suc){return "https://wa.me/"+WA[suc||this.suc]+"?text="+encodeURIComponent(msg)},NAME:NAME,WA:WA};
function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}

/* header: se vuelve sólido al bajar */
var bar=$("#bar");
function onScroll(){bar.classList.toggle("solid",window.scrollY>40)}
window.addEventListener("scroll",onScroll,{passive:true});onScroll();

/* menú */
var mb=$("#menu-btn"),menu=$("#menu");
function setMenu(o){menu.classList.toggle("open",o);mb.setAttribute("aria-expanded",o);mb.textContent=o?"Cerrar":"Menú";document.documentElement.style.overflow=o?"hidden":"";if(o){bar.style.zIndex=70}else{bar.style.zIndex=""}}
mb.addEventListener("click",function(){setMenu(!menu.classList.contains("open"))});
$$("a",menu).forEach(function(a){a.addEventListener("click",function(){setMenu(false)})});
document.addEventListener("keydown",function(e){if(e.key==="Escape")setMenu(false)});

/* reveal */
var rv=$$("[data-reveal]");
if("IntersectionObserver" in window&&!reduce){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("is-in");io.unobserve(e.target)}})},{threshold:.12,rootMargin:"0px 0px -6% 0px"});
  rv.forEach(function(el){io.observe(el)});
}else rv.forEach(function(el){el.classList.add("is-in")});

/* anclas sin scroll-behavior en CSS */
$$('a[href^="#"]').forEach(function(a){a.addEventListener("click",function(e){
  var h=a.getAttribute("href");if(h.length<2)return;var el=$(h);if(!el)return;e.preventDefault();
  var y=el.getBoundingClientRect().top+window.scrollY-(h==="#top"?0:62);window.scrollTo(0,Math.max(0,y));history.replaceState(null,"",h)})});

/* WhatsApp: los data-wa siguen la sucursal elegida; el flotante también */
function refreshWa(){
  $$("[data-wa]").forEach(function(a){a.href=TT.wa(a.getAttribute("data-wa"));a.target="_blank";a.rel="noopener"});
  var f=$("#wa-float");if(f)f.href=TT.wa("Hola Trastévere "+NAME[TT.suc]+", quiero hacer un pedido.");
}
TT.on(refreshWa);
/* el flotante se esconde cuando ya hay un botón de pedido a la vista */
var fl=$("#wa-float"),near=$$("[data-wa-primary]");
if(fl&&"IntersectionObserver" in window&&near.length){
  var seen={};var io2=new IntersectionObserver(function(es){es.forEach(function(e){seen[e.target.id||e.target.className]=e.isIntersecting});fl.classList.toggle("off",Object.keys(seen).some(function(k){return seen[k]}))},{threshold:.3});
  near.forEach(function(n){io2.observe(n)});
}
})();
