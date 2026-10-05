(function(){
 "use strict";
 var d=document, b=d.body, reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 d.documentElement.classList.add("js");

 /* menú: se cierra con el botón, Escape, y al elegir un link */
 var btn=d.querySelector(".hd-btn"), menu=d.getElementById("hd-menu"), lbl=btn&&btn.querySelector(".hd-btn-lbl");
 function setMenu(open){
  if(open===b.classList.contains("menu-open")) return;
  b.classList.toggle("menu-open",open); btn.setAttribute("aria-expanded",open?"true":"false"); menu.setAttribute("aria-hidden",open?"false":"true");
  lbl.textContent=open?"Cerrar":"Menú";
 }
 if(btn&&menu){
  btn.addEventListener("click",function(){setMenu(!b.classList.contains("menu-open"))});
  menu.addEventListener("click",function(e){if(e.target.closest("a")||e.target===menu||e.target.classList.contains("menu-panel"))setMenu(false)});
  d.addEventListener("keydown",function(e){if(e.key==="Escape")setMenu(false)});
 }

 /* anclas sin scroll-behavior en CSS */
 d.addEventListener("click",function(e){
  var a=e.target.closest&&e.target.closest('a[href^="#"]'); if(!a) return;
  var h=a.getAttribute("href"); if(h.length<2) return; var el=d.querySelector(h); if(!el) return;
  e.preventDefault(); setMenu(false);
  var top=el.getBoundingClientRect().top+window.scrollY-(h==="#inicio"?0:70);
  window.scrollTo({top:Math.max(0,top),behavior:reduce?"auto":"smooth"});
  if(history.replaceState) history.replaceState(null,"",h);
 });

 /* reveal por sondeo (no depende de IntersectionObserver) */
 var els=Array.prototype.slice.call(d.querySelectorAll("[data-reveal]"));
 function tick(){
  var vh=window.innerHeight;
  els=els.filter(function(el){var r=el.getBoundingClientRect(); if(r.top<vh*.92&&r.bottom>0){el.classList.add("is-in");return false} return true});
 }
 if(reduce) els.forEach(function(el){el.classList.add("is-in")}); else {tick(); window.addEventListener("scroll",tick,{passive:true}); window.addEventListener("resize",tick);}

 /* flotantes: se esconden donde ya hay llamada o comanda grande */
 var zFab=d.querySelectorAll("#carta,#comanda,#lugar,#pendientes,.pie,.por"), zPill=d.querySelectorAll("#comanda");
 function inView(list,f){var vh=window.innerHeight;for(var i=0;i<list.length;i++){var r=list[i].getBoundingClientRect();if(r.top<vh*f&&r.bottom>vh*(1-f))return true}return false}
 function upd(){b.classList.toggle("fab-off",inView(zFab,.75));b.classList.toggle("pill-off",inView(zPill,.8))}
 var ra=null; function sch(){if(!ra)ra=requestAnimationFrame(function(){ra=null;upd()})}
 window.addEventListener("scroll",sch,{passive:true}); window.addEventListener("resize",sch); sch();

 /* abierto / cerrado en vivo (hora de Aguascalientes) y día de hoy en la tabla */
 function agsNow(){
  try{var p=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date()),o={};p.forEach(function(x){o[x.type]=x.value});
   var days={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return {d:days[o.weekday],m:(+o.hour%24)*60+(+o.minute)};}catch(e){var n=new Date();return {d:n.getDay(),m:n.getHours()*60+n.getMinutes()}}
 }
 function horas(day){ if(day===1) return null; return day===0||day===6?[14*60,23*60+45]:[18*60,23*60+45]; }
 var out=d.getElementById("hd-open");
 function status(){
  var n=agsNow(), h=horas(n.d), msg;
  if(h&&n.m>=h[0]&&n.m<h[1]) msg="<b>Abierto</b> hasta 11:45&nbsp;pm";
  else if(h&&n.m<h[0]) msg="<b>Hoy</b> abrimos "+(h[0]===14*60?"2 pm":"6 pm");
  else{var nd=(n.d+1)%7,nh=horas(nd); msg=nh?"<b>Cerrado</b> · abre "+(nd===1?"":(nd===6||nd===0?"mañana 2 pm":"mañana 6 pm")):"<b>Cerrado</b> · abre martes 6 pm"; if(nd===1) msg="<b>Cerrado</b> · abre martes 6 pm"; else if(!nh) msg="<b>Cerrado</b>";}
  if(n.d===1) msg="<b>Hoy cerrado</b> · abre martes 6 pm";
  if(out) out.innerHTML=msg;
  var ln=d.getElementById("lu-now"); if(ln){var open=h&&n.m>=h[0]&&n.m<h[1]; ln.classList.toggle("on",!!open); ln.innerHTML="<i></i>"+(open?"Abierto ahora · cierra a las 11:45 pm":msg.replace(/<\/?b>/g,""));}
  var li=d.querySelector('#hrs li[data-d="'+n.d+'"]'); Array.prototype.forEach.call(d.querySelectorAll("#hrs li"),function(x){x.classList.remove("hoy")}); if(li) li.classList.add("hoy");
 }
 status(); setInterval(status,60000);
})();
