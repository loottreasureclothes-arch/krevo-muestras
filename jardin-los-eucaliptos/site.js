(function(){
  var d=document,reduce=false;
  try{reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
  d.documentElement.classList.add('js');
  /* reveal y arco */
  var els=[].slice.call(d.querySelectorAll('[data-reveal],[data-arch]'));
  if(!reduce&&'IntersectionObserver' in window){
    els.forEach(function(e){e.classList.add('pre')});
    var io=new IntersectionObserver(function(es){es.forEach(function(x){
      if(x.target.hasAttribute('data-arch')){x.target.classList.toggle('in',x.isIntersecting&&x.intersectionRatio>0.3)}
      else if(x.isIntersecting){x.target.classList.add('in')}
    })},{threshold:[0,.3,.6]});
    els.forEach(function(e){io.observe(e)});
    setTimeout(function(){els.forEach(function(e){e.classList.add('in')})},1600);
  }
  /* Abierto ahora (lunes 14 a 19, hora de Aguascalientes) */
  (function(){
    var box=d.getElementById('open-now');if(!box)return;
    var day,hr;
    try{
      var p=new Intl.DateTimeFormat('en-US',{timeZone:'America/Mexico_City',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());
      var m={};p.forEach(function(x){m[x.type]=x.value});
      day={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[m.weekday];hr=(+m.hour%24)+(+m.minute)/60;
    }catch(e){var n=new Date();day=n.getDay();hr=n.getHours()+n.getMinutes()/60}
    var li=d.querySelector('#hrs li[data-d="'+day+'"]');if(li)li.classList.add('today');
    var t=d.getElementById('open-txt');
    if(day===1&&hr>=14&&hr<19){box.className='open on';t.textContent='Abierto ahora · hoy hasta las 7:00 pm'}
    else if(day===1&&hr<14){box.className='open off';t.textContent='Hoy lunes abre a las 2:00 pm'}
    else if(day===1){box.className='open off';t.textContent='Hoy ya cerró · otros días con cita'}
    else{box.className='open';t.textContent='Hoy se visita con cita: llámanos'}
  })();
  /* Las nueve horas */
  var nh=d.getElementById('nh');if(!nh)return;
  var B={
    cer:{n:'Ceremonia',c:'#f0c987',img:'img/altar-960.webp',alt:'La capilla en A del jardín al atardecer',cap:'La capilla'},
    coc:{n:'Cóctel de bienvenida',c:'#9fb0ff',img:'img/noche-960.webp',alt:'El jardín de noche con luminarias',cap:'El jardín de noche'},
    bri:{n:'Fotos y brindis',c:'#c9a7ff',img:'img/fuente-960.webp',alt:'La fuente iluminada del jardín',cap:'La fuente'},
    ban:{n:'Banquete',c:'#f6efe0',img:'img/redonda-960.webp',alt:'Mesa redonda montada con velas y flores',cap:'La mesa'},
    bai:{n:'Baile',c:'#e08aa8',img:'img/salon-960.webp',alt:'La carpa con mesas largas y luces colgantes',cap:'La carpa y la pista'},
    des:{n:'Cena de desvelados',c:'#7fd0b4',img:'img/larga-960.webp',alt:'Mesa larga con follaje y luz morada',cap:'La mesa larga'}
  };
  var ORDER=['cer','coc','bri','ban','bai','des'];
  var PRE={'Boda':['cer','coc','ban','bai'],'XV años':['coc','bri','ban','bai'],'Bautizo o comunión':['cer','ban','bri'],'Cumpleaños o empresa':['coc','ban','bai']};
  var st={ev:'Boda',ini:16,inv:150,on:{},bai:3};
  PRE['Boda'].forEach(function(k){st.on[k]=1});
  var $=function(i){return d.getElementById(i)};
  var bar=$('nh-bar'),clock=$('nh-clock').children,left=$('nh-left'),lines=$('tk-lines'),foot=$('tk-foot'),meta=$('tk-meta'),img=$('nh-img'),cap=$('nh-cap'),ph=$('nh-ph'),ok=$('tk-ok');
  var cells=[];for(var i=0;i<9;i++){var c=d.createElement('i');bar.appendChild(c);cells.push(c)}
  function fmt(h){h=((h%24)+24)%24;var s=h>=12?'pm':'am',x=h%12;if(x===0)x=12;return x+':00 '+s}
  function hrs(k){return k==='bai'?st.bai:+nh.querySelector('.blk[data-k="'+k+'"]').getAttribute('data-h')}
  function seq(){var t=st.ini,out=[];ORDER.forEach(function(k){if(st.on[k]){var h=hrs(k);out.push({k:k,s:t,h:h});t+=h}});return out}
  function show(k){
    var b=B[k];if(!b||img.getAttribute('src')===b.img)return;
    if(reduce){img.src=b.img;img.alt=b.alt;cap.textContent=b.cap;return}
    ph.classList.add('sw');
    setTimeout(function(){img.src=b.img;img.alt=b.alt;cap.textContent=b.cap;ph.classList.remove('sw')},200);
  }
  function render(){
    var s=seq(),tot=0;s.forEach(function(x){tot+=x.h});
    cells.forEach(function(c,i){c.className='';c.style.removeProperty('--c');c.removeAttribute('title')});
    var pos=0;
    s.forEach(function(x){for(var j=0;j<x.h;j++){var c=cells[pos+j];if(pos+j<9){c.className='f';c.style.setProperty('--c',B[x.k].c);c.title=B[x.k].n}}pos+=x.h});
    if(tot>9){cells[8].className='o'}
    for(var a=0;a<4;a++)clock[a].textContent=fmt(st.ini+Math.round(a*3));
    var res=9-tot;
    if(tot===0){left.className='nh-left';left.textContent='Elige arriba lo que quieres vivir.'}
    else if(res<0){left.className='nh-left warn';left.textContent='Te pasas '+(-res)+' h de las 9 de renta. Quita algo o pregunta por hora extra.'}
    else if(res===0){left.className='nh-left';left.textContent='Justo las 9 horas del jardín.'}
    else{left.className='nh-left';left.textContent='Llevas '+tot+' h. Te quedan '+res+' h libres.'}
    lines.innerHTML='';
    if(!s.length){var li=d.createElement('li');li.className='tk-empty';li.textContent='Elige arriba';lines.appendChild(li)}
    s.forEach(function(x){var li=d.createElement('li'),b=d.createElement('b'),sp=d.createElement('span');b.textContent=B[x.k].n;sp.textContent=fmt(x.s)+' · '+x.h+' h';li.appendChild(b);li.appendChild(sp);lines.appendChild(li)});
    meta.textContent=st.ev+' · '+st.inv+' invitados';
    if(st.on.ban){foot.textContent='Menús desde $499, pregunta qué incluye.'}
    else if(s.length){foot.textContent='Pregunta el precio de lo que elegiste.'}
    else foot.textContent='';
    $('nh-inv-v').textContent=st.inv;$('bai-h').textContent=st.bai+' h';
    [].forEach.call(nh.querySelectorAll('.blk'),function(b){var on=!!st.on[b.getAttribute('data-k')];b.classList.toggle('is-on',on);b.setAttribute('aria-pressed',on)});
    var bs=$('bai-step');bs.style.visibility=st.on.bai?'visible':'hidden';
  }
  function seg(id,fn){var g=$(id);g.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;[].forEach.call(g.children,function(x){x.setAttribute('aria-checked',x===b)});fn(b.getAttribute('data-v'))})}
  seg('nh-evento',function(v){st.ev=v;st.on={};PRE[v].forEach(function(k){st.on[k]=1});st.bai=v==='Cumpleaños o empresa'?2:3;render();show(PRE[v][0])});
  seg('nh-inicio',function(v){st.ini=+v;render()});
  $('nh-inv').addEventListener('input',function(e){st.inv=+e.target.value;render()});
  $('nh-blocks').addEventListener('click',function(e){
    var st2=e.target.closest('.step button');
    if(st2){st.bai=Math.max(2,Math.min(4,st.bai+(+st2.getAttribute('data-d'))));st.on.bai=1;render();show('bai');return}
    var b=e.target.closest('.blk');if(!b)return;var k=b.getAttribute('data-k');
    if(st.on[k])delete st.on[k];else{st.on[k]=1;show(k)}
    render();
  });
  $('tk-copy').addEventListener('click',function(){
    var s=seq(),t=['Mi día en Jardín Los Eucaliptos ('+st.ev+', '+st.inv+' invitados)'];
    if(!s.length){ok.textContent='Elige arriba lo que quieres vivir.';return}
    s.forEach(function(x){t.push(fmt(x.s)+' '+B[x.k].n+' ('+x.h+' h)')});
    var end=s[s.length-1].s+s[s.length-1].h;t.push('Termina a las '+fmt(end));
    if(st.on.ban)t.push('Menús desde $499, pregunta qué incluye');
    t.push('Camino Antiguo a San Ignacio 222. Tel 449 545 5102');
    var txt=t.join('\n');
    function done(){ok.textContent='Copiado. Pégalo en un mensaje o dilo por teléfono.'}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(done,function(){fallback()})}else fallback();
    function fallback(){var ta=d.createElement('textarea');ta.value=txt;ta.style.position='fixed';ta.style.opacity='0';d.body.appendChild(ta);ta.select();try{d.execCommand('copy');done()}catch(e){ok.textContent='No pude copiar. Llama al 449 545 5102.'}d.body.removeChild(ta)}
  });
  render();
})();
