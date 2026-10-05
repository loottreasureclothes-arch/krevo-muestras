(function(){"use strict";
var WA="524492005979";
var rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
if(rm)document.documentElement.classList.add("rm");
function $(s,r){return (r||document).querySelector(s)}function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
window.GW={wa:function(m){return "https://wa.me/"+WA+"?text="+encodeURIComponent(m)},money:function(n){return "$"+n.toLocaleString("es-MX")}};
/* header */
var bar=$(".bar");function sc(){bar.classList.toggle("solid",window.scrollY>40)}sc();addEventListener("scroll",sc,{passive:true});
/* menu */
var btn=$(".bar-btn"),menu=$("#menu"),lbl=$(".bar-btn-l");
function setMenu(o){menu.hidden=!o;btn.setAttribute("aria-expanded",o);lbl.textContent=o?"Cerrar":"Menú";document.body.style.overflow=o?"hidden":""}
btn.addEventListener("click",function(){setMenu(menu.hidden)});
menu.addEventListener("click",function(e){if(e.target.closest("a"))setMenu(false)});
addEventListener("keydown",function(e){if(e.key==="Escape"&&!menu.hidden)setMenu(false)});
/* reveal */
var rv=$$("[data-reveal]");
if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle("is-in",e.isIntersecting||e.target.classList.contains("once-in"));if(e.isIntersecting&&!e.target.hasAttribute("data-rev"))e.target.classList.add("once-in")})},{threshold:.12,rootMargin:"0px 0px -6% 0px"});
rv.forEach(function(el){io.observe(el)})
/* blindaje: lo que esta en pantalla queda visible a los 1.6 s pase lo que pase */
var gt;function guard(){clearTimeout(gt);gt=setTimeout(function(){var vh=innerHeight;rv.forEach(function(el){var r=el.getBoundingClientRect();if(r.top<vh&&r.bottom>0)el.classList.add("is-in")})},1600)}
guard();addEventListener("scroll",guard,{passive:true})}else rv.forEach(function(el){el.classList.add("is-in")});
/* flotante se esconde donde ya hay CTA grande */
var fl=$(".wa-float"),zones=$$("[data-hide-wa]");
function wf(){var vh=innerHeight,on=false;zones.forEach(function(z){var r=z.getBoundingClientRect();if(r.top<vh*.75&&r.bottom>vh*.2)on=true});fl.classList.toggle("off",on)}
wf();addEventListener("scroll",wf,{passive:true});addEventListener("resize",wf);
/* abierto ahora (Maps: lun y mie a dom 12 a 20, martes cerrado) */
var DAYS=["dom","lun","mar","mié","jue","vie","sáb"];
function now(){var p=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"2-digit",minute:"2-digit",hour12:false}).formatToParts(new Date()),o={};p.forEach(function(x){o[x.type]=x.value});
var wd={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[o.weekday];return{d:wd,h:(parseInt(o.hour,10)%24)+parseInt(o.minute,10)/60}}
function status(){var n=now(),open=n.d!==2&&n.h>=12&&n.h<20;var txt;
 if(open)txt="Abierto ahora · cierra a las 8 pm";else{var nd=n.d,add=0;if(n.d!==2&&n.h<12)add=0;else add=1;nd=(n.d+add)%7;if(nd===2){nd=3;add++}txt="Cerrado ahora · abre "+(add===0?"hoy":add===1?"mañana":"el "+DAYS[nd])+" a las 12:00"}
 return{open:open,txt:txt,d:n.d}}
window.GW.status=status;
var s=status();$$("[data-open-now]").forEach(function(el){el.textContent=s.txt;el.classList.toggle("is-open",s.open)});
$$("[data-day]").forEach(function(el){if(+el.getAttribute("data-day")===s.d)el.classList.add("hoy")});
})();
