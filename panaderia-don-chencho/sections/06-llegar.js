(function(){
  var now=document.getElementById("lgHr");if(!now)return;
  var p={};try{new Intl.DateTimeFormat("es-MX",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"2-digit",hour12:true}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value})}catch(e){}
  var d=new Date(new Date().toLocaleString("en-US",{timeZone:"America/Mexico_City"})).getDay();
  var li=document.querySelector('#lgH li[data-d="'+d+'"]');if(li){li.classList.add("hoy");li.querySelector("span").textContent+=" (hoy)"}
  if(p.hour)now.textContent="son las "+p.hour+":"+p.minute+" "+(p.dayPeriod||"")+" · nunca cerramos";
})();
