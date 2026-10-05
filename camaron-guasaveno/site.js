(function(){
var d=document,b=d.body;
/* menú */
var btn=d.querySelector(".hd-m"),lbl=btn.querySelector(".lbl");
function setM(o){b.classList.toggle("menu-open",o);btn.setAttribute("aria-expanded",o);lbl.textContent=o?"Cerrar":"Menú";}
btn.addEventListener("click",function(){setM(!b.classList.contains("menu-open"));});
d.querySelectorAll(".menu a").forEach(function(a){a.addEventListener("click",function(){setM(false);});});
d.addEventListener("keydown",function(e){if(e.key==="Escape")setM(false);});
/* reveal: visible a los 1.6 s pase lo que pase */
var els=[].slice.call(d.querySelectorAll("[data-reveal]"));
function show(e){e.classList.add("is-in");}
if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){show(x.target);io.unobserve(x.target);}});},{threshold:0});els.forEach(function(e){io.observe(e);});
 setTimeout(function(){els.forEach(function(e){var r=e.getBoundingClientRect();if(r.top<innerHeight)show(e);});},1600);}else els.forEach(show);
/* flotante se esconde en pie y donde ya hay botón verde a la vista */
var fw=d.getElementById("fw"),zones=[d.querySelector(".ft"),d.getElementById("picor")];
function fwu(){var h=false;zones.forEach(function(z){if(!z)return;var r=z.getBoundingClientRect();if(z.id==="picor"){var w=z.querySelector("#pc-wa").getBoundingClientRect();if(w.top<innerHeight&&w.bottom>0)h=true;}else if(r.top<innerHeight-60)h=true;});fw.classList.toggle("hide",h);}
addEventListener("scroll",fwu,{passive:true});fwu();
/* abierto ahora (hora de Aguascalientes) */
try{var p=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hourCycle:"h23"}).formatToParts(new Date());
var g={};p.forEach(function(x){g[x.type]=x.value;});var map={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6},day=map[g.weekday],m=(+g.hour)*60+(+g.minute),open=(day>=1&&day<=4?11:10)*60,close=20*60,ok=m>=open&&m<close;
var row=d.querySelector('#hrs [data-d="'+day+'"]');if(row)row.classList.add("hoy");
var a=d.getElementById("abierto");a.textContent=ok?"Abierto ahora · cierra 8 p.m.":"Cerrado ahora";a.classList.toggle("si",ok);}catch(e){}
})();
