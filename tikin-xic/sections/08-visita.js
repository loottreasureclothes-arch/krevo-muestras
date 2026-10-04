(function(){var e=document.getElementById("ll-estado"),h=document.getElementById("ll-hor");if(!e)return;try{
var p=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date()),w="",H=0;
p.forEach(function(x){if(x.type==="weekday")w=x.value;if(x.type==="hour")H=parseInt(x.value,10)%24});
var d=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(w),s=e.querySelector("span"),t;
if(h){var r=h.querySelector('[data-d="'+d+'"]');if(r)r.classList.add("hoy")}
if(d===1)t="Hoy cerrado. Abrimos mañana 1 p.m.";
else if(H>=13&&H<19){t="Abierto ahora. Cierra a las 7 p.m.";e.classList.add("on")}
else if(H<13)t="Cerrado. Hoy abrimos a la 1 p.m.";
else t=d===0?"Cerrado. Abrimos el martes 1 p.m.":"Cerrado. Abrimos mañana 1 p.m.";
s.textContent=t}catch(x){}})();
