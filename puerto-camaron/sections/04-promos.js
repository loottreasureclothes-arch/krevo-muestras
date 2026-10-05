(function(){
  var P={
    jue:{d:'Jueves',w:'Cubeta de cervezas',p:'$200',s:'6 medias. Válido en Corona, Victoria y Pacífico.',m:'Hola Puerto Camarón, quiero la promo del jueves: cubeta de cervezas $200.'},
    vie:{d:'Viernes',w:'Chicharrón del puerto + cubeta',p:'$399',s:'Cerveza Corona, Victoria o Pacífico.',m:'Hola Puerto Camarón, quiero la promo del viernes: chicharrón del puerto + cubeta de cervezas $399.'},
    sab:{d:'Sábado',w:'Aguachile + cubeta',p:'$399',s:'Válido en cualquier aguachile y en cerveza Corona, Victoria o Pacífico.',m:'Hola Puerto Camarón, quiero la promo del sábado: aguachile + cubeta de cervezas $399.'},
    dom:{d:'Domingo',w:'Aguachile + cubeta',p:'$399',s:'Válido en cualquier aguachile y en cerveza Corona, Victoria o Pacífico.',m:'Hola Puerto Camarón, quiero la promo del domingo: aguachile + cubeta de cervezas $399.'}
  };
  var tabs=[].slice.call(document.querySelectorAll('.pr-days button'));
  if(!tabs.length)return;
  var map=['dom',null,null,null,'jue','vie','sab'];
  var dow;try{dow=new Date(new Date().toLocaleString('en-US',{timeZone:'America/Mexico_City'})).getDay()}catch(e){dow=new Date().getDay()}
  var today=map[dow];
  var card=document.querySelector('.pr-card');
  function show(k,anim){
    var o=P[k];
    tabs.forEach(function(b){b.setAttribute('aria-selected',b.dataset.d===k)});
    document.getElementById('pr-price').textContent=o.p;
    document.getElementById('pr-what').textContent=o.w;
    document.getElementById('pr-sub').textContent=o.s;
    document.getElementById('pr-tag').textContent=(k===today?'Hoy, ':'')+o.d;
    document.getElementById('pr-wa').href='https://wa.me/524499179428?text='+encodeURIComponent(o.m);
    if(anim&&!(window.PC&&window.PC.reduce)){card.classList.remove('swap');void card.offsetWidth;card.classList.add('swap');}
  }
  tabs.forEach(function(b){
    if(b.dataset.d===today)b.classList.add('is-today');
    b.addEventListener('click',function(){show(b.dataset.d,true)});
  });
  show(today||'jue',false);
  if(!today)document.getElementById('pr-tag').textContent='Jueves, la próxima';
})();
