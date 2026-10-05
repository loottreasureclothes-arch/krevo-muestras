(function(){"use strict";
var doc=document,root=doc.documentElement;
/* reveal */
var els=[].slice.call(doc.querySelectorAll("[data-reveal]"));
function show(e){e.classList.add("in")}
if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){show(x.target);io.unobserve(x.target)}})},{rootMargin:"0px 0px -6% 0px",threshold:.05});els.forEach(function(e){io.observe(e)})}else els.forEach(show);
setTimeout(function(){els.forEach(show)},1600);
/* banderines: se recogen un poco al bajar y se despliegan al subir (reversible) */
var flags=doc.querySelector(".ec-flags"),tk=false;
function sc(){tk=false;var y=window.scrollY||0;if(flags)flags.style.setProperty("--u",String(Math.max(.45,1-y/260)))}
window.addEventListener("scroll",function(){if(!tk){tk=true;requestAnimationFrame(sc)}},{passive:true});sc();
/* menu */
var btn=doc.querySelector(".ec-menu-btn"),menu=doc.getElementById("ec-menu");
function setMenu(o){if(!btn||!menu)return;menu.hidden=!o;btn.setAttribute("aria-expanded",o?"true":"false");btn.querySelector(".ec-menu-lbl").textContent=o?"Cerrar":"Menú";doc.body.classList.toggle("menu-open",o)}
if(btn){btn.addEventListener("click",function(){setMenu(menu.hidden)});menu.addEventListener("click",function(e){if(e.target.closest("a"))setMenu(false)});doc.addEventListener("keydown",function(e){if(e.key==="Escape")setMenu(false)})}
/* flotante: se esconde donde ya hay botones de llamar a la vista (data-hide-wa) */
var fl=doc.querySelector(".ec-float"),hides=[].slice.call(doc.querySelectorAll("[data-hide-wa]")).filter(function(e){return e!==fl});
if(fl&&"IntersectionObserver" in window&&hides.length){var vis=new Set();var io2=new IntersectionObserver(function(es){es.forEach(function(x){x.isIntersecting?vis.add(x.target):vis.delete(x.target)});fl.classList.toggle("is-off",vis.size>0)});hides.forEach(function(e){io2.observe(e)})}
/* Abierto ahora (hora de Aguascalientes) */
window.ecAbierto=function(){try{var p=new Intl.DateTimeFormat("es-MX",{timeZone:"America/Mexico_City",hour:"numeric",minute:"numeric",hour12:false,weekday:"long"}).formatToParts(new Date());var h=0,m=0,d="";p.forEach(function(x){if(x.type==="hour")h=+x.value%24;if(x.type==="minute")m=+x.value;if(x.type==="weekday")d=x.value});var t=h*60+m;return{abierto:t>=480&&t<870,dia:d,t:t}}catch(e){return null}};
})();
