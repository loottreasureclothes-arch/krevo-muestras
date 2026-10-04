(function(){"use strict";
var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
var bar=document.getElementById("bar"),body=document.body;
/* header compacto */
function onScroll(){bar.classList.toggle("is-compact",(window.scrollY||0)>12)}
addEventListener("scroll",onScroll,{passive:true});onScroll();
/* menu */
var btn=document.querySelector(".bar-btn"),menu=document.getElementById("menu"),lbl=btn.querySelector(".bar-lbl");
var links=menu.querySelectorAll("a");
function setMenu(o){body.classList.toggle("menu-open",o);btn.setAttribute("aria-expanded",o);menu.setAttribute("aria-hidden",!o);lbl.textContent=o?"Cerrar":"Menú"}
btn.addEventListener("click",function(){setMenu(!body.classList.contains("menu-open"))});
menu.addEventListener("click",function(e){if(e.target.closest("a")||e.target===menu||e.target.classList.contains("menu-in"))setMenu(false)});
addEventListener("keydown",function(e){if(e.key==="Escape")setMenu(false)});
/* anclas sin scroll-behavior */
function go(el){var t=el.getBoundingClientRect().top+scrollY-bar.offsetHeight-8;scrollTo({top:Math.max(0,t),behavior:reduce?"auto":"smooth"})}
window.AdelaIr=go;
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;var h=a.getAttribute("href");if(h.length<2)return;var el=document.querySelector(h);if(!el)return;e.preventDefault();setMenu(false);go(el);if(history.replaceState)history.replaceState(null,"",h)});
/* reveal por sondeo */
var rv=[].slice.call(document.querySelectorAll("[data-reveal]"));
function chk(){var vh=innerHeight;for(var i=rv.length-1;i>=0;i--){var r=rv[i].getBoundingClientRect();if(r.top<vh*.92&&r.bottom>0){rv[i].classList.add("is-in");rv.splice(i,1)}}}
addEventListener("scroll",chk,{passive:true});addEventListener("resize",chk);chk();
/* flotante de WhatsApp: se esconde donde ya hay CTA grande */
var zones=document.querySelectorAll("[data-hide-wa]");
function wz(){var vh=innerHeight,on=false;for(var i=0;i<zones.length;i++){var r=zones[i].getBoundingClientRect();if(r.top<vh*.85&&r.bottom>vh*.1){on=true;break}}body.classList.toggle("wa-off",on)}
addEventListener("scroll",wz,{passive:true});addEventListener("resize",wz);wz();
/* estado Abierto (Centro, 9 a 4 todos los dias, hora de Aguascalientes) */
var st=document.querySelectorAll("[data-abierto]");
if(st.length){var h=new Date().toLocaleString("en-US",{timeZone:"America/Mexico_City",hour:"numeric",hour12:false});h=parseInt(h,10);if(h===24)h=0;
var txt=h>=9&&h<16?"Abierto ahora, cerramos a las 4 pm":(h<9?"Abrimos hoy a las 9 am":"Hoy ya cerramos, abrimos mañana a las 9 am");
for(var i=0;i<st.length;i++)st[i].textContent=txt}
})();
