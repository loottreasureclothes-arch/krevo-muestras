/* Abierto ahora: hora de Aguascalientes, todos los días 15:00 a 02:00 */
(function(){
  var el=document.getElementById("estado"); if(!el) return;
  var f=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false});
  var p={}; f.formatToParts(new Date()).forEach(function(x){p[x.type]=x.value;});
  var d=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(p.weekday), h=parseInt(p.hour,10)%24, m=parseInt(p.minute,10), t=h*60+m;
  var open=t>=900||t<120, txt;
  if(open) txt=t<120?"Abierto ahora · cierra a las 2 a.m.":"Abierto ahora · hasta las 2 a.m.";
  else txt="Cerrado ahora · abre hoy a las 3 p.m.";
  el.classList.add(open?"abierto":"cerrado"); el.querySelector("span").textContent=txt;
  var hoy=t<120?(d+6)%7:d; var li=document.querySelector('#horas li[data-d="'+hoy+'"]'); if(li) li.classList.add("hoy");
})();
