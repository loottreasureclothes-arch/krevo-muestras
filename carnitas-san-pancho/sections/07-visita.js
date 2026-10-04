(function(){
  var el=document.getElementById('now');if(!el)return;
  var p={};try{new Intl.DateTimeFormat('en-US',{timeZone:'America/Mexico_City',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value})}catch(e){return}
  var D={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[p.weekday],m=(parseInt(p.hour,10)%24)*60+parseInt(p.minute,10);
  var close=D===0?1080:1050,closeT=D===0?'6 p.m.':'5:30 p.m.',open=480;
  var tr=document.querySelector('#hrs tr[data-d="'+D+'"]');if(tr)tr.classList.add('today');
  var s=el.querySelector('span');
  if(m>=open&&m<close){el.classList.add('on');s.textContent='Abierto ahora · Cierra a las '+closeT}
  else if(m<open){s.textContent='Cerrado · Abre hoy a las 8 a.m.'}
  else{s.textContent='Cerrado · Abre mañana a las 8 a.m.'}
})();
