
(function(){
function init(){
  var f=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date()),o={};
  f.forEach(function(p){o[p.type]=p.value});
  var dias={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6},d=dias[o.weekday],h=(+o.hour%24)*60+ +o.minute;
  var cierre={0:21*60,1:22.5*60,2:22.5*60,3:22.5*60,4:23*60,5:23*60,6:23*60}[d],ab=h>=13.5*60&&h<cierre;
  var li=document.querySelector('.hor li[data-d="'+d+'"]');if(li)li.classList.add("hoy");
  var el=document.getElementById("abierto");
  if(el){el.classList.toggle("on",ab);el.textContent=ab?"Abierto ahora":"Cerrado ahora · abre hoy a la 1:30 pm"}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
