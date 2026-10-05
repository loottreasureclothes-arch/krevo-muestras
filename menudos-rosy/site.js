(function(){
"use strict";
var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var b=document.body;
/* menu */
var btn=$(".hd-btn"),menu=$("#menu");
function setMenu(o){b.classList.toggle("menu-open",o);btn.setAttribute("aria-expanded",o);menu.setAttribute("aria-hidden",!o);$(".lbl",btn).textContent=o?"Cerrar":"Menú"}
btn.addEventListener("click",function(){setMenu(!b.classList.contains("menu-open"))});
menu.addEventListener("click",function(e){if(e.target.closest("a"))setMenu(false)});
document.addEventListener("keydown",function(e){if(e.key==="Escape")setMenu(false)});
/* anclas sin scroll-behavior */
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;var h=a.getAttribute("href");if(h.length<2)return;var el=$(h);if(!el)return;e.preventDefault();
 var y=el.getBoundingClientRect().top+scrollY-(h==="#inicio"?0:58);window.scrollTo({top:Math.max(0,y),behavior:reduce?"auto":"smooth"})});
/* reveal: visible a los 1.6 s pase lo que pase */
var rv=$$("[data-reveal]");
if(!reduce&&rv.length){document.documentElement.classList.add("rv-on");
 var pend=rv.slice();
 var chk=function(){var vh=innerHeight;for(var i=pend.length-1;i>=0;i--){var r=pend[i].getBoundingClientRect();if(r.top<vh&&r.bottom>0){var el=pend[i];pend.splice(i,1);el.classList.add("in")}}};
 addEventListener("scroll",chk,{passive:true});addEventListener("resize",chk);chk();
 setTimeout(function(){rv.forEach(function(el){var r=el.getBoundingClientRect();if(r.top<innerHeight*1.1)el.classList.add("in")})},1600);
}
/* flotante: se esconde donde ya hay llamada grande */
var zones=$$(".hero,.vis,.foot,.mesa");
function fab(){var vh=innerHeight,on=false;zones.forEach(function(z){var r=z.getBoundingClientRect();if(r.top<vh*.8&&r.bottom>vh*.2)on=true});b.classList.toggle("fab-off",on)}
addEventListener("scroll",fab,{passive:true});addEventListener("resize",fab);fab();
/* abierto ahora (hora de Aguascalientes) */
var HR={0:[270,840],1:[450,780],2:[450,780],3:[450,780],4:[450,780],5:[450,840],6:[300,840]};
function fmt(min){var h=Math.floor(min/60),m=min%60;return h+":"+(m<10?"0":"")+m+" "+(h<12?"a.m.":"p.m.")}
function fmt12(min){var h=Math.floor(min/60),m=min%60,s=h<12?"a.m.":"p.m.";h=h%12||12;return h+":"+(m<10?"0":"")+m+" "+s}
function ahora(){var d=new Date(),dow,t;
 try{var f=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(d),o={};f.forEach(function(p){o[p.type]=p.value});dow={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[o.weekday];t=(parseInt(o.hour,10)%24)*60+parseInt(o.minute,10)}catch(e){dow=d.getDay();t=d.getHours()*60+d.getMinutes()}
 var h=HR[dow],open=t>=h[0]&&t<h[1];
 var next=null;if(!open){if(t<h[0]){next={d:dow,t:h[0],today:true}}else{var n=(dow+1)%7;next={d:n,t:HR[n][0],today:false}}}
 return{dow:dow,open:open,close:h[1],next:next}}
var DN=["el domingo","el lunes","el martes","el miércoles","el jueves","el viernes","el sábado"];
function pinta(){var s=ahora();
 $$("[data-now]").forEach(function(el){el.classList.toggle("open",s.open);var sp=$("span",el);
  sp.textContent=s.open?"Abierto ahora, hasta las "+fmt12(s.close):"Cerrado ahora, abre "+(s.next.today?"hoy":DN[s.next.d])+" a las "+fmt12(s.next.t)});
 $$("#hrs li").forEach(function(li){li.classList.toggle("today",+li.getAttribute("data-d")===s.dow)})}
pinta();setInterval(pinta,60000);
})();
