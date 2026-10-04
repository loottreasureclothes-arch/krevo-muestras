(function(){
 var now=document.getElementById("lug-now"); if(!now) return;
 var p={}; try{new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value})}catch(e){return}
 var days={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}, d=days[p.weekday], m=(+p.hour%24)*60+(+p.minute);
 var li=document.querySelector('#lug-hr li[data-d="'+d+'"]'); if(li) li.classList.add("hoy");
 var abre=d!==0, open=abre&&m>=720&&m<1140, t;
 if(open) t="Abierto ahora · Cierra a las 7 p. m.";
 else if(abre&&m<720) t="Cerrado · Abre hoy a las 12 p. m.";
 else t="Cerrado · Abre "+(d===6?"el lunes":"mañana")+" a las 12 p. m.";
 now.className="lug-now "+(open?"on":"off"); now.querySelector("span").textContent=t;
})();
