(function(){
  var H={2:[780,1140],3:[780,1140],4:[780,1140],5:[780,1140],6:[810,1080]},N=["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
  var p={};try{new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value;});}catch(e){}
  var W={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6},d=W[p.weekday],m=(parseInt(p.hour,10)%24)*60+parseInt(p.minute,10);
  if(d===undefined){var t=new Date();d=t.getDay();m=t.getHours()*60+t.getMinutes();}
  var li=document.querySelector('.horas [data-d="'+d+'"]');if(li)li.classList.add("hoy");
  function hh(x){var h=Math.floor(x/60),mi=x%60;return (h>12?h-12:h)+":"+(mi<10?"0":"")+mi+" p.m.";}
  var el=document.getElementById("ll-estado");if(!el)return;var s=el.querySelector("span"),h=H[d],txt;
  if(h&&m>=h[0]&&m<h[1]){el.classList.add("abierto");txt="Abierto ahora · cierra a las "+hh(h[1]);}
  else if(h&&m<h[0]){txt="Cerrado ahora · hoy abrimos a la "+hh(h[0]);}
  else{for(var i=1;i<=7;i++){var k=(d+i)%7;if(H[k]){txt="Cerrado ahora · abrimos el "+N[k]+" a la "+hh(H[k][0]);break;}}}
  s.textContent=txt;
})();
