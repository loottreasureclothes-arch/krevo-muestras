(function(){
  var lis=[].slice.call(document.querySelectorAll('#items li')),plate=document.getElementById('plate'),inn=document.getElementById('plate-in'),cta=document.getElementById('plato-wa'),clr=document.getElementById('plato-clear');
  if(!lis.length)return;
  var n={};lis.forEach(function(l){n[l.dataset.k]=0});
  var DEF='Hola San Pancho, quiero hacer un pedido. ¿Qué tienen hoy?';
  function msg(){
    var p=[];lis.forEach(function(l){var c=n[l.dataset.k];if(c>0)p.push(c+' '+(c===1?l.dataset.s:l.dataset.p))});
    if(!p.length)return DEF;
    return 'Hola San Pancho, quiero pedir: '+p.join(', ')+'. ¿Cuánto es y en cuánto está listo?';
  }
  function render(popK){
    var sel=lis.filter(function(l){return n[l.dataset.k]>0}),html='',k=sel.length;
    sel.forEach(function(l,i){
      var x=50,y=50;
      if(k>1){var a=-Math.PI/2+i*2*Math.PI/k,r=k===2?22:30;x=50+r*Math.cos(a);y=50+r*Math.sin(a);}
      var c=l.dataset.img?'background-image:url('+l.dataset.img+')':'';
      html+='<div class="coin" style="left:'+x+'%;top:'+y+'%;'+c+'">'+(l.dataset.img?'':l.dataset.m)+'<i>'+n[l.dataset.k]+'</i></div>';
    });
    inn.innerHTML=html;
    plate.classList.toggle('has',k>0);
    lis.forEach(function(l){var c=n[l.dataset.k];l.querySelector('b').textContent=c;l.classList.toggle('on',c>0)});
    cta.href='https://wa.me/524499166458?text='+encodeURIComponent(msg());
    cta.target='_blank';cta.rel='noopener';
    clr.hidden=k===0;
    if(popK){plate.classList.remove('pop');void plate.offsetWidth;plate.classList.add('pop');}
  }
  document.getElementById('items').addEventListener('click',function(e){
    var b=e.target.closest('button');if(!b)return;
    var l=b.closest('li'),k=l.dataset.k;
    n[k]=Math.max(0,Math.min(9,n[k]+parseInt(b.dataset.d,10)));
    render(true);
  });
  clr.addEventListener('click',function(){for(var k in n)n[k]=0;render(false)});
  render(false);
  window.__plato={msg:msg,add:function(k){n[k]++;render(true)}};
})();
