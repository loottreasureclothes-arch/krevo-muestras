(function(){"use strict";
var el=document.getElementById("pj-now");if(!el)return;
function tick(){var p;try{p=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date());}catch(e){return;}
var o={};p.forEach(function(x){o[x.type]=x.value});var d=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(o.weekday);var m=(+o.hour%24)*60+(+o.minute);
var openDay=function(x){return x!==2};var open=openDay(d)&&m>=540&&m<1425;var s=el.querySelector("span");
if(open){s.textContent="Abierto ahora · Cierra a las 11:45 p.m.";el.className="pj-now is-open";}
else{var txt;if(openDay(d)&&m<540)txt="Cerrado · Abre hoy a las 9 a.m.";else{var n=(d+1)%7;txt=n===2?"Cerrado · Abre el miércoles a las 9 a.m.":"Cerrado · Abre mañana a las 9 a.m.";}s.textContent=txt;el.className="pj-now is-closed";}
document.querySelectorAll("#pj-hrs li").forEach(function(li){li.classList.toggle("is-today",+li.dataset.d===d)});}
tick();setInterval(tick,60000);})();
