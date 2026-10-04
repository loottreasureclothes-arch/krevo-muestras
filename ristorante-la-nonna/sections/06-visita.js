(function(){
  var ul=document.getElementById("horas"),est=document.getElementById("v-estado");
  if(!ul||!est)return;
  var now=new Date(),d=now.getDay(),h=now.getHours()+now.getMinutes()/60;
  [].forEach.call(ul.children,function(li){if(li.getAttribute("data-d").split(",").indexOf(String(d))>=0)li.classList.add("hoy")});
  var cierra=d===0?22:23;
  if(h>=14&&h<cierra){est.textContent="Hoy abrimos hasta las "+(cierra-12)+":00 p.m.";est.classList.add("on")}
  else if(h<14){est.textContent="Hoy abrimos a las 2:00 p.m.";est.classList.add("on")}
  else est.textContent="Hoy ya cerramos. Mañana desde las 2:00 p.m.";
})();
