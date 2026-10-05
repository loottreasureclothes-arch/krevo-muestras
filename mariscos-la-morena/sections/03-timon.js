(function(){
  var root=document.getElementById('timon'); if(!root) return;
  var $=function(s){return root.querySelector(s)};
  var D=function(n,p,full){return{n:n,p:p,full:full}};
  var CAM=['Empanizado','A la mexicana','A la veracruzana','A la mantequilla','Zarandeados','A la diabla','Al mojo de ajo','Al ajillo','A la plancha','Tocino','Chipotle','Aguachile'].map(function(n){return D(n)});
  CAM.push(D('Cocido para pelar',null,'Camarón cocido para pelar'));
  var PUL=['Enamorado','Empanizado','Al ajillo','A la diabla','A la mantequilla','Zarandeado','A la veracruzana','A la mexicana','Al mojo de ajo','Chipotle'].map(function(n){return D(n)});
  var FIL=[D('Empanizado',{c:110,m:90}),D('A la mexicana'),D('A la veracruzana'),D('A la mantequilla'),D('Zarandeado'),D('A la diabla'),D('Al mojo de ajo'),D('Al ajillo'),D('A la plancha'),D('Empapelado',{c:185,m:160})];
  var FAM={
    camaron:{noun:'Camarones',k:'Estilo',base:{c:195,m:160},lab:{c:'Orden completa',m:'Media orden'},st:CAM},
    pulpo:{noun:'Pulpo',k:'Estilo',base:{c:220,m:180},lab:{c:'Orden completa',m:'Media orden'},st:PUL},
    filete:{noun:'Filete',k:'Estilo',base:{c:110,m:null},lab:{c:'Orden completa',m:'Media orden'},st:FIL,note:'Media orden: solo empanizado y empapelado.'},
    coctel:{noun:'Cóctel de',k:'De qué',base:{c:110,m:85},lab:{c:'Grande',m:'Chico'},st:['Camarón','Pulpo','Ostión'].map(function(n){return D(n)})}
  };
  var fam='camaron',sel=5,size='c',rot=0,cart=[];
  var ring=$('#ring'),wheel=$('#wheel');
  function price(f,i,s){var st=FAM[f].st[i];if(st.p&&s in st.p)return st.p[s];return FAM[f].base[s]}
  function fullName(f,i){var st=FAM[f].st[i];if(st.full)return st.full;var n=st.n.toLowerCase();return FAM[f].noun+' '+(f==='coctel'?n:n)}
  function money(n){return '$'+n.toLocaleString('es-MX')}
  function build(){
    Array.prototype.slice.call(ring.querySelectorAll('.peg')).forEach(function(p){p.remove()});
    var st=FAM[fam].st,n=st.length,step=360/n;
    st.forEach(function(s,i){
      var b=document.createElement('button');b.type='button';b.className='peg';b.style.setProperty('--a',(i*step)+'deg');
      b.setAttribute('aria-label',(FAM[fam].k==='Estilo'?'Estilo ':'')+s.n);b.dataset.i=i;ring.insertBefore(b,ring.firstChild);
    });
  }
  function target(i){var n=FAM[fam].st.length,step=360/n,t=-i*step;var k=Math.round((rot-t)/360);return t+k*360}
  function nearest(r){var n=FAM[fam].st.length,step=360/n;return ((Math.round(-r/step)%n)+n)%n}
  function paint(i){
    var F=FAM[fam],n=F.st.length;
    $('#pick-k').textContent=F.k;$('#pick-v').textContent=F.st[i].n;$('#pick-n').textContent=(i+1)+' de '+n;
    Array.prototype.forEach.call(ring.querySelectorAll('.peg'),function(p){p.classList.toggle('on',+p.dataset.i===i)});
  }
  function sizes(){
    var F=FAM[fam];
    ['c','m'].forEach(function(s){
      var b=$('#sizes [data-s="'+s+'"]'),p=price(fam,sel,s);
      b.querySelector('span').textContent=F.lab[s];
      b.querySelector('b').textContent=p==null?'No hay en este estilo':money(p);
      b.setAttribute('aria-disabled',p==null?'true':'false');
      b.setAttribute('aria-checked',s===size?'true':'false');
    });
    $('#note').textContent=F.note||'';
  }
  function select(i,instant){
    sel=i;rot=target(i);
    if(instant){ring.classList.add('drag')}
    ring.style.transform='rotate('+rot+'deg)';
    if(instant){void ring.offsetWidth;ring.classList.remove('drag')}
    if(price(fam,sel,size)==null)size='c';
    paint(sel);sizes();
  }
  function setFam(f){
    fam=f;sel=0;size='c';rot=0;build();
    Array.prototype.forEach.call(root.querySelectorAll('#tabs button'),function(b){b.setAttribute('aria-selected',b.dataset.f===f?'true':'false')});
    Array.prototype.forEach.call(root.querySelectorAll('.hub [data-h]'),function(h){h.classList.toggle('on',h.dataset.h===f)});
    var start=f==='camaron'?5:0; select(start,true);
  }
  $('#tabs').addEventListener('click',function(e){var b=e.target.closest('button');if(b)setFam(b.dataset.f)});
  ring.addEventListener('click',function(e){var b=e.target.closest('.peg');if(b&&!moved)select(+b.dataset.i)});
  function stepBy(d){var n=FAM[fam].st.length;sel=(sel+d+n)%n;var step=360/n;rot=rot-d*step;ring.style.transform='rotate('+rot+'deg)';if(price(fam,sel,size)==null)size='c';paint(sel);sizes()}
  $('#prev').addEventListener('click',function(){stepBy(-1)});
  $('#next').addEventListener('click',function(){stepBy(1)});
  wheel.tabIndex=0;
  wheel.addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault();stepBy(1)}else if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault();stepBy(-1)}});
  /* arrastre horizontal: gira el timón y suelta en la manija más cercana */
  var drag=null,moved=false;
  wheel.addEventListener('pointerdown',function(e){if(e.button>0)return;drag={x:e.clientX,r:rot,id:e.pointerId};moved=false});
  wheel.addEventListener('pointermove',function(e){
    if(!drag||e.pointerId!==drag.id)return;var dx=e.clientX-drag.x;
    if(!moved&&Math.abs(dx)>6){moved=true;ring.classList.add('drag');try{wheel.setPointerCapture(e.pointerId)}catch(_){}}
    if(moved){var r=drag.r+dx*.55;ring.style.transform='rotate('+r+'deg)';paint(nearest(r))}
  });
  function end(e){
    if(!drag)return;var was=moved,dx=e.clientX-drag.x;var r=drag.r+dx*.55;drag=null;
    if(was){ring.classList.remove('drag');rot=r;var i=nearest(r);select(i);setTimeout(function(){moved=false},0)}
  }
  wheel.addEventListener('pointerup',end);wheel.addEventListener('pointercancel',end);
  $('#sizes').addEventListener('click',function(e){var b=e.target.closest('button');if(!b||b.getAttribute('aria-disabled')==='true')return;size=b.dataset.s;sizes()});
  /* pedido */
  function render(){
    var ul=$('#lines');ul.innerHTML='';var tot=0;
    cart.forEach(function(it,ix){
      tot+=it.p*it.q;
      var li=document.createElement('li');
      li.innerHTML='<div class="q"><button type="button" aria-label="Quitar uno">−</button><span>'+it.q+'</span><button type="button" aria-label="Agregar uno">+</button></div><div class="ln">'+it.n+'<small>'+it.s+'</small></div><div class="lp">'+money(it.p*it.q)+'</div>';
      var bs=li.querySelectorAll('button');
      bs[0].onclick=function(){it.q--;if(it.q<1)cart.splice(ix,1);render()};
      bs[1].onclick=function(){it.q++;render()};
      ul.appendChild(li);
    });
    $('#empty').style.display=cart.length?'none':'';
    $('#tot').textContent=cart.length?money(tot):'Elige arriba';
    $('#copy').setAttribute('aria-disabled',cart.length?'false':'true');
  }
  $('#add').addEventListener('click',function(){
    var p=price(fam,sel,size);if(p==null)return;
    var key=fam+'|'+sel+'|'+size,it=cart.filter(function(c){return c.k===key})[0];
    if(it)it.q++;else cart.push({k:key,n:fullName(fam,sel),s:FAM[fam].lab[size],p:p,q:1});
    render();var b=this;b.textContent='Agregado';setTimeout(function(){b.textContent='Agregar a mi pedido'},1100);
  });
  function msg(){
    var tot=0,l=['Hola, quiero pedir en Mariscos La Morena:'];
    cart.forEach(function(c){tot+=c.p*c.q;l.push(c.q+' x '+c.n+' ('+c.s.toLowerCase()+') '+money(c.p*c.q))});
    l.push('Total: '+money(tot)+' (precios del menú, confirmar al llamar)');return l.join('\n');
  }
  $('#copy').addEventListener('click',function(){
    if(!cart.length){$('#ok').textContent='Elige arriba';return}
    var t=msg(),ok=$('#ok');
    function done(){ok.textContent='Pedido copiado. Léelo al llamar.';setTimeout(function(){ok.textContent=''},2600)}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,fb)}else fb();
    function fb(){var a=document.createElement('textarea');a.value=t;a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(_){}a.remove();done()}
  });
  setFam('camaron');render();
})();
