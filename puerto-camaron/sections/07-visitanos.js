(function(){
  var S={
    a:{name:'Sucursal Américas',addr:'Av. Las Américas 404, La Fuente, 20239 Aguascalientes',
      map:'https://www.google.com/maps?q=Puerto+Camar%C3%B3n+Av.+Las+Am%C3%A9ricas+404+Aguascalientes&output=embed',
      dir:'https://www.google.com/maps/dir/?api=1&destination=21.8715831,-102.3013138',tel:'+524499179428',telt:'449 917 94 28',hours:true,
      wa:'Hola Puerto Camarón, voy a ir a la sucursal Américas. ¿Hay lugar hoy?'},
    c:{name:'Sucursal Campestre',addr:'Blvd. Lic. Miguel de la Madrid Hurtado 152, Lomas del Campestre 2a Sección, 20119 Aguascalientes',
      map:'https://www.google.com/maps?q=Puerto+Camar%C3%B3n+Blvd.+Miguel+de+la+Madrid+152+Aguascalientes&output=embed',
      dir:'https://www.google.com/maps/dir/?api=1&destination=21.9270849,-102.3186375',tel:'+524493927912',telt:'449 392 79 12',hours:false,
      wa:'Hola Puerto Camarón, quiero ir a la sucursal Campestre. ¿Qué horario tienen hoy?'}
  };
  var tabs=[].slice.call(document.querySelectorAll('.vs-tabs button'));
  if(!tabs.length)return;
  var $=function(i){return document.getElementById(i)};
  var now;try{now=new Date(new Date().toLocaleString('en-US',{timeZone:'America/Mexico_City'}))}catch(e){now=new Date()}
  var di=(now.getDay()+6)%7, mins=now.getHours()*60+now.getMinutes();
  var openNow=mins>=11*60&&mins<19*60;
  [].forEach.call(document.querySelectorAll('#vs-hours li'),function(li){if(+li.dataset.i===di)li.classList.add('is-today')});
  function show(k){
    var s=S[k];
    tabs.forEach(function(b){b.setAttribute('aria-selected',b.dataset.s===k)});
    $('vs-name').textContent=s.name;$('vs-addr').textContent=s.addr;
    $('vs-map').src=s.map;$('vs-dir').href=s.dir;
    $('vs-call').href='tel:'+s.tel;$('vs-call').textContent='Llamar '+s.telt;
    $('vs-wa').href='https://wa.me/524499179428?text='+encodeURIComponent(s.wa);
    $('vs-hours').hidden=!s.hours;$('vs-nohours').hidden=s.hours;
    var o=$('vs-open');
    if(s.hours){o.hidden=false;o.dataset.state=openNow?'open':'closed';o.textContent=openNow?'Abierto ahora, hasta las 19:00':'Cerrado ahora, abre a las 11:00'}
    else{o.hidden=true}
  }
  tabs.forEach(function(b){b.addEventListener('click',function(){show(b.dataset.s)})});
  show('a');
})();
