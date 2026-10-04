(function(){
  /* pestañas por sucursal: el mapa se carga al abrir su pestaña */
  var tabs=document.querySelectorAll(".vt");
  Array.prototype.forEach.call(tabs,function(t){t.addEventListener("click",function(){
    Array.prototype.forEach.call(tabs,function(o){var on=o===t;o.classList.toggle("on",on);o.setAttribute("aria-selected",on?"true":"false");
      var p=document.getElementById(o.getAttribute("aria-controls"));p.hidden=!on;
      if(on){var f=p.querySelector("iframe");if(f&&!f.getAttribute("src"))f.src=f.getAttribute("data-src");}});
  });});
  /* abierto ahora, con la hora de Aguascalientes */
  var est=document.getElementById("estado");if(!est)return;
  var d,h,m;
  try{var parts=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"2-digit",minute:"2-digit",hour12:false}).formatToParts(new Date());
    var o={};parts.forEach(function(p){o[p.type]=p.value;});
    d=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(o.weekday);h=+o.hour%24;m=+o.minute;}catch(e){var n=new Date();d=n.getDay();h=n.getHours();m=n.getMinutes();}
  var li=document.querySelector('#horas li[data-d="'+d+'"]');if(li)li.classList.add("hoy");
  var t=h*60+m,ab=630,ci=1320,s=est.querySelector("span");
  if(t>=ab&&t<ci){est.classList.add("abierto");s.textContent="Abierto ahora · cierra a las 22:00";}
  else{est.classList.add("cerrado");s.textContent=(t<ab?"Cerrado · abre hoy a las 10:30":"Cerrado · abre mañana a las 10:30");}
})();
