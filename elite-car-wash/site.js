(function(){
  var d=document,root=d.documentElement;root.classList.add('js');
  var WA='524491378480';
  function wa(t){return 'https://wa.me/'+WA+'?text='+encodeURIComponent(t)}
  /* menú */
  var b=d.getElementById('burger'),m=d.getElementById('menu');
  function close(){b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Abrir menú');m.hidden=true}
  b.addEventListener('click',function(){var o=b.getAttribute('aria-expanded')==='true';if(o){close()}else{b.setAttribute('aria-expanded','true');b.setAttribute('aria-label','Cerrar menú');m.hidden=false}});
  m.addEventListener('click',function(e){if(e.target.tagName==='A')close()});
  d.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  /* reveal (visible a 1.6 s pase lo que pase) */
  var els=[].slice.call(d.querySelectorAll('[data-reveal],.bleed'));
  function show(e){e.classList.add('in')}
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){show(x.target);io.unobserve(x.target)}})},{threshold:.12});
    els.forEach(function(e){io.observe(e)});
  }
  function sweep(){els.forEach(function(e){var r=e.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)show(e)})}
  var tm;addEventListener('scroll',function(){clearTimeout(tm);tm=setTimeout(sweep,250)},{passive:true});
  setTimeout(sweep,1600);
  setTimeout(function(){if(!('IntersectionObserver' in window))els.forEach(show)},1600);
  /* flotante de WhatsApp: se esconde cuando hay botón verde a la vista */
  var wf=d.getElementById('waf');
  function chk(){var gs=d.querySelectorAll('.btn-wa'),hide=false;gs.forEach(function(g){var r=g.getBoundingClientRect();if(r.top<innerHeight-20&&r.bottom>20)hide=true});wf.classList.toggle('off',hide)}
  addEventListener('scroll',chk,{passive:true});addEventListener('resize',chk);chk();
  /* componente firma: el carril */
  var road=d.getElementById('road'),car=d.getElementById('car');if(!road||!car)return;
  var P=[
    {n:'Elite',s:['Enjuague de chasis','Espuma blanca'],at:37,st:1,cls:'foam'},
    {n:'Premier',s:['Enjuague de chasis','Espuma de colores','Aroma'],at:63,st:2,cls:'foam colores'},
    {n:'Lux',s:['Enjuague de chasis','Espuma de colores','Cera','Aroma'],at:88,st:3,cls:'foam colores shine'}
  ];
  var sts=[].slice.call(road.querySelectorAll('.st')),pos=7,veh='auto chico o mediano',drag=false,off=0;
  var tn=d.getElementById('tk-n'),tl=d.getElementById('tk-l'),tp=d.getElementById('tk-p'),tw=d.getElementById('tk-wa'),hint=d.getElementById('hint');
  function W(){return road.clientWidth}
  function put(p){pos=Math.max(7,Math.min(93,p));car.style.transform='translateX('+(pos/100*W()-car.offsetWidth/2)+'px)';car.setAttribute('aria-valuenow',Math.round((pos-7)/86*100))}
  function prog(){var k=null;P.forEach(function(x){if(pos>=x.at-12)k=x});return k}
  function refresh(){
    var k=prog();
    sts.forEach(function(s){s.classList.toggle('on',pos>=parseFloat(s.style.left)-1)});
    car.className='car'+(k?' '+k.cls:'');
    if(!k){tn.textContent='Elige arriba';tl.innerHTML='<li class="mut">Sin pasos todavía</li>';tp.textContent='Elige arriba';tw.href=wa('Hola Elite Car Wash, quiero lavar mi coche ('+veh+'). ¿Qué programa me recomiendan?');car.setAttribute('aria-valuetext','Entrada, sin programa');hint.textContent='Arrastra el coche hacia la derecha';return}
    tn.textContent=k.n;tl.innerHTML=k.s.map(function(x){return '<li>'+x+'</li>'}).join('');tp.textContent='Pregunta el precio';
    tw.href=wa('Hola Elite Car Wash, quiero el programa '+k.n+' ('+k.s.join(', ').toLowerCase()+') para mi '+veh+'. ¿Cuánto es y cuánto hay de fila?');
    car.setAttribute('aria-valuetext','Programa '+k.n);hint.textContent='Programa '+k.n+'. Muévelo para cambiar.';
  }
  function setP(p){put(p);refresh()}
  function snap(){var k=prog();car.style.transition='transform .25s';put(k?k.at:7);setTimeout(function(){car.style.transition=''},260);refresh()}
  function px(e){return e.clientX-road.getBoundingClientRect().left}
  car.addEventListener('pointerdown',function(e){drag=true;car.setPointerCapture(e.pointerId);off=px(e)-pos/100*W();car.style.transition='';e.preventDefault()});
  car.addEventListener('pointermove',function(e){if(!drag)return;setP((px(e)-off)/W()*100)});
  function up(){if(drag){drag=false;snap()}}
  car.addEventListener('pointerup',up);car.addEventListener('pointercancel',up);
  road.addEventListener('pointerdown',function(e){if(e.target===car||car.contains(e.target))return;car.style.transition='transform .25s';setP(px(e)/W()*100);snap()});
  car.addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key==='ArrowUp'){var n=P.filter(function(x){return x.at>pos+1})[0];if(n)setP(n.at);e.preventDefault()}else if(e.key==='ArrowLeft'||e.key==='ArrowDown'){var l=P.filter(function(x){return x.at<pos-1});setP(l.length?l[l.length-1].at:7);e.preventDefault()}});
  d.querySelectorAll('.veh button').forEach(function(bt){bt.addEventListener('click',function(){d.querySelectorAll('.veh button').forEach(function(o){o.classList.remove('on');o.setAttribute('aria-pressed','false')});bt.classList.add('on');bt.setAttribute('aria-pressed','true');veh=bt.getAttribute('data-v');refresh()})});
  addEventListener('resize',function(){put(pos);refresh()});
  put(7);refresh();
})();
