(function(){
  var ul=document.getElementById("horas"),est=document.getElementById("v-estado");
  if(!ul||!est)return;
  var d,h;
  try{var p=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date()),o={};p.forEach(function(x){o[x.type]=x.value});d=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(o.weekday);h=(+o.hour%24)+(+o.minute)/60}catch(e){var n=new Date();d=n.getDay();h=n.getHours()+n.getMinutes()/60}
  [].forEach.call(ul.children,function(li){if(+li.getAttribute("data-d")===d)li.classList.add("hoy")});
  var cierra=d===0?22:23;
  if(h>=14&&h<cierra){est.textContent="Abierto ahora · cierra a las "+(cierra-12)+":00 p.m.";est.classList.add("on")}
  else if(h<14){est.textContent="Cerrado ahora · hoy abrimos a las 2:00 p.m."}
  else est.textContent="Cerrado ahora · mañana abrimos a las 2:00 p.m.";
})();
