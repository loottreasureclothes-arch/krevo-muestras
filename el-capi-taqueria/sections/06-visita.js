/* Abierto ahora / cierra a las X, con la hora de Aguascalientes */
(function(){
  var H={0:[17,22.5],1:null,2:[17,23.5],3:[17,23.5],4:[17,23.5],5:[17,23.5],6:[17,23.5]};
  var N=['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
  function f(h){var hh=Math.floor(h),m=Math.round((h-hh)*60),p=hh>=12?'pm':'am';hh=hh%12||12;return hh+(m?':'+(m<10?'0':'')+m:'')+' '+p}
  function run(){
    var el=document.getElementById('estado');if(!el)return;
    var p={};try{new Intl.DateTimeFormat('en-US',{timeZone:'America/Mexico_City',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value})}catch(e){return}
    var d=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(p.weekday),h=(+p.hour%24)+(+p.minute)/60,t=H[d],txt,open=false;
    var row=document.querySelector('#hrs tr[data-d="'+d+'"]');if(row)row.classList.add('hoy');
    if(t&&h>=t[0]&&h<t[1]){open=true;txt='Abierto ahora · cierra a las '+f(t[1])}
    else if(t&&h<t[0]){txt='Hoy abrimos a las '+f(t[0])}
    else{var n=d,i=0;do{n=(n+1)%7;i++}while(!H[n]&&i<7);txt='Cerrado ahora · abrimos '+(i===1?'mañana':'el '+N[n])+' a las '+f(H[n][0])}
    el.classList.toggle('is-open',open);el.querySelector('span').textContent=txt;
  }
  run();setInterval(run,60000);
})();
