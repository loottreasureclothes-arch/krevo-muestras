(function(){
  var H={0:[14,22],1:null,2:[14,23],3:[14,23],4:[14,23],5:[14,24],6:[14,24]};
  var N=["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
  function hh(h){h=h%24;return h===0?"12 am":(h>12?(h-12)+" pm":h+(h===12?" pm":" am"));}
  function now(){
    try{var p=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date());
      var o={};p.forEach(function(x){o[x.type]=x.value;});
      return {d:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(o.weekday),h:(parseInt(o.hour,10)%24)+parseInt(o.minute,10)/60};
    }catch(e){var d=new Date();return {d:d.getDay(),h:d.getHours()+d.getMinutes()/60};}
  }
  var el=document.getElementById("vi-now"),hr=document.getElementById("vi-hr");if(!el)return;
  var t=now(),s=el.querySelector("span"),r=H[t.d],y=H[(t.d+6)%7];
  var row=hr&&hr.querySelector('[data-d="'+t.d+'"]');if(row)row.classList.add("today");
  if(y&&y[1]>24&&t.h<y[1]-24){el.classList.add("open");s.textContent="Abierto ahora · cierra a las "+hh(y[1]);return;}
  if(r&&t.h>=r[0]&&t.h<r[1]){el.classList.add("open");s.textContent="Abierto ahora · cierra a las "+hh(r[1]);return;}
  el.classList.add("closed");
  if(r&&t.h<r[0]){s.textContent="Cerrado · hoy abre a las "+hh(r[0]);return;}
  for(var i=1;i<8;i++){var d=(t.d+i)%7;if(H[d]){s.textContent="Cerrado · abre el "+N[d]+" a las "+hh(H[d][0]);return;}}
})();
