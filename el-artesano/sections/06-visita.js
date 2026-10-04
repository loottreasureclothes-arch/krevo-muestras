(function(){
 var H={0:[540,885],1:[540,810],2:null,3:[540,990],4:[540,990],5:[540,990],6:[540,990]};
 function f(m){return Math.floor(m/60)+":"+("0"+m%60).slice(-2)}
 try{
  var p=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date());
  var o={};p.forEach(function(x){o[x.type]=x.value});
  var d=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(o.weekday),m=(parseInt(o.hour,10)%24)*60+parseInt(o.minute,10);
  var li=document.querySelector('#vi-hor li[data-d="'+d+'"]');if(li)li.classList.add("hoy");
  var el=document.getElementById("vi-now");if(!el)return;var h=H[d];
  if(h&&m>=h[0]&&m<h[1]){el.textContent="Abierto ahora · cierra a las "+f(h[1]);el.classList.add("on");}
  else if(h&&m<h[0]){el.textContent="Cerrado · abrimos hoy a las 9:00";}
  else{var n=(d+1)%7;while(!H[n])n=(n+1)%7;var nm=["domingo","lunes","martes","miércoles","jueves","viernes","sábado"][n];el.textContent="Cerrado · abrimos el "+nm+" a las 9:00";}
 }catch(e){}
})();
