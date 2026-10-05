(function(){
  var d=document,h=d.documentElement;
  var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // reveal: base visible; se esconde solo con JS y movimiento permitido; a los 1.6 s todo visible
  if(!rm&&'IntersectionObserver' in window){
    h.classList.add('js-rv');
    var els=[].slice.call(d.querySelectorAll('[data-reveal],.flags'));
    var io=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('in',e.isIntersecting||e.target.classList.contains('in')&&false)})},{threshold:.15});
    els.forEach(function(el){io.observe(el)});
    setTimeout(function(){els.forEach(function(el){el.classList.add('in')});io.disconnect()},1600);
  }
  // menú
  var btn=d.querySelector('.hd-btn'),menu=d.getElementById('hd-menu'),fab=d.querySelector('.fab');
  function setMenu(o){btn.setAttribute('aria-expanded',o);menu.hidden=!o;btn.querySelector('.hd-lbl').textContent=o?'Cerrar':'Menú';h.style.overflow=o?'hidden':'';fab.classList.toggle('off',o)}
  btn.addEventListener('click',function(){setMenu(menu.hidden)});
  menu.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
  d.addEventListener('keydown',function(e){if(e.key==='Escape'&&!menu.hidden){setMenu(false);btn.focus()}});
  // flotante: se aparta cuando ya hay botones Llamar a la vista
  if('IntersectionObserver' in window){
    var vis=0,zs=d.querySelectorAll('.hero .end,#visitanos .end,#completar .end,.tk-btns');
    var io2=new IntersectionObserver(function(es){es.forEach(function(e){e.target._v=e.isIntersecting});var any=[].some.call(zs,function(z){return z._v});fab.classList.toggle('off',any||!menu.hidden)},{threshold:.3});
    [].forEach.call(zs,function(z){io2.observe(z)});
  }
  // Abierto ahora (hora de Aguascalientes)
  (function(){
    var el=d.getElementById('open-now');if(!el)return;
    var day,mins;
    try{
      var p=new Intl.DateTimeFormat('en-US',{timeZone:'America/Mexico_City',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date()),o={};
      p.forEach(function(x){o[x.type]=x.value});
      day={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[o.weekday];mins=(+o.hour%24)*60+(+o.minute);
    }catch(e){var n=new Date();day=n.getDay();mins=n.getHours()*60+n.getMinutes()}
    var on=mins>=510&&mins<1080;
    el.textContent=on?'Abierto ahora':(mins<510?'Cerrado, abre a las 8:30':'Cerrado, abre mañana a las 8:30');
    el.classList.toggle('on',on);
    var li=d.querySelector('#days li[data-d="'+day+'"]');if(li)li.classList.add('hoy');
  })();
  // El cordón
  var flags=d.getElementById('cord-flags');if(!flags)return;
  var names={div:'Chilaquiles divorciados',verde:'Chilaquiles verdes con huevo',enchi:'Enchiladas',jamon:'Huevo con jamón',frij:'Frijoles con queso',churro:'Churros',licu:'Licuados'};
  var colors={div:'#ecb23e',verde:'#c2459a',enchi:'#3d9bc4',jamon:'#5fb58a',frij:'#d9534a',churro:'#ecb23e',licu:'#c2459a'};
  var order=Object.keys(names),sel={};
  var tk=d.getElementById('tk'),empty=d.getElementById('tk-empty'),tot=d.getElementById('tk-total'),bun=d.getElementById('bunting'),clr=d.getElementById('tk-clear'),msg=d.getElementById('tk-msg');
  function show(id){[].forEach.call(d.querySelectorAll('.mp'),function(i){i.classList.toggle('on',i.dataset.id===id)})}
  function total(){return order.reduce(function(a,k){return a+(sel[k]||0)},0)}
  function render(){
    var n=total();tk.innerHTML='';bun.innerHTML='';
    order.forEach(function(k){
      if(!sel[k])return;
      var li=d.createElement('li');
      li.innerHTML='<b></b><small>Pregunta el precio</small><div class="step"><button type="button" aria-label="Quitar uno">&minus;</button><output></output><button type="button" aria-label="Agregar uno">+</button></div>';
      li.querySelector('b').textContent=names[k];li.querySelector('output').textContent=sel[k];
      var bs=li.querySelectorAll('button');
      bs[0].onclick=function(){sel[k]--;if(sel[k]<1){delete sel[k];sync(k)}render()};
      bs[1].onclick=function(){sel[k]++;render()};
      tk.appendChild(li);
      for(var i=0;i<sel[k];i++){var f=d.createElement('i');f.style.setProperty('--c',colors[k]);bun.appendChild(f)}
    });
    empty.hidden=n>0;clr.hidden=n===0;
    tot.textContent=n?(n+(n===1?' platillo · Pregunta el precio':' platillos · Pregunta el precio')):'Elige arriba';
    msg.textContent='';
  }
  function sync(k){var b=flags.querySelector('[data-id="'+k+'"]');if(b){b.setAttribute('aria-pressed',!!sel[k]);b.querySelector('.cf-s').textContent=sel[k]?'Colgada':'Colgar'}}
  flags.addEventListener('click',function(e){
    var b=e.target.closest('.cflag');if(!b)return;var k=b.dataset.id;
    if(sel[k])delete sel[k];else sel[k]=1;
    sync(k);show(k);render();
  });
  clr.onclick=function(){order.forEach(function(k){delete sel[k];sync(k)});render()};
  function text(){
    var l=order.filter(function(k){return sel[k]}).map(function(k){return '- '+sel[k]+' x '+names[k]});
    return 'Mi mesa para Los Antojos de Carranza:\n'+l.join('\n')+'\nPrecios: los pregunto al llamar (449 994 1977).';
  }
  d.getElementById('tk-copy').onclick=function(){
    if(!total()){msg.textContent='Elige arriba';return}
    var t=text();
    function ok(){msg.textContent='Copiado. Léelo por teléfono o pégalo donde quieras.'}
    function fb(){var a=d.createElement('textarea');a.value=t;a.style.cssText='position:fixed;opacity:0';d.body.appendChild(a);a.select();try{d.execCommand('copy');ok()}catch(e){msg.textContent=t}d.body.removeChild(a)}
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(ok,fb);else fb();
  };
  render();
})();
