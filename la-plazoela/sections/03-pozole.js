/* Componente firma: El pozole a tu modo. Arma el tazón y el mensaje de WhatsApp. */
(function(){
  var f=document.getElementById('pz-ctrl'); if(!f) return;
  var PRECIO={grande:{pierna:82,lengua:85,combinado:88},chico:{pierna:72,lengua:75,combinado:78}};
  var CARNE={pierna:['#e8b98a'],lengua:['#c97a7a'],combinado:['#e8b98a','#c97a7a']};
  var st={tam:'grande',carne:'pierna',modo:'para comer aquí',top:[]};
  var bowl=document.getElementById('pz-bowl'),car=document.getElementById('pz-carne'),n=document.getElementById('pz-tot-n'),t=document.getElementById('pz-tot-t'),a=document.getElementById('pz-send');
  var POS=[[120,98,14,7],[160,92,15,7],[200,100,13,7],[142,106,12,6],[184,86,12,6],[104,102,10,5]];
  function carne(){var h='',c=CARNE[st.carne];for(var i=0;i<POS.length;i++){var p=POS[i];h+='<ellipse cx="'+p[0]+'" cy="'+p[1]+'" rx="'+p[2]+'" ry="'+p[3]+'" fill="'+c[i%c.length]+'" stroke="#8a4a2a" stroke-width="1.5"/>'}car.innerHTML=h}
  function lista(a){if(!a.length)return '';if(a.length===1)return a[0];return a.slice(0,-1).join(', ')+' y '+a[a.length-1]}
  function render(){
    var p=PRECIO[st.tam][st.carne];
    n.textContent='$'+p; t.textContent=(st.tam==='grande'?'Grande':'Chico')+' de '+st.carne;
    bowl.style.transform='scale('+(st.tam==='grande'?1:.86)+')';
    carne();
    var m='Hola La Plazoela, quiero un pozole '+st.tam+' de '+st.carne+(st.top.length?' con '+lista(st.top):'')+', '+st.modo+'. Total de carta: $'+p+'. ¿Me confirman por favor?';
    a.href='https://wa.me/524499153815?text='+encodeURIComponent(m); a.target='_blank'; a.rel='noopener';
  }
  f.addEventListener('click',function(e){
    var b=e.target.closest('button'); if(!b) return;
    var g=b.parentNode,k=g.getAttribute('data-k'),v=b.getAttribute('data-v');
    if(k==='top'){
      var on=b.classList.toggle('on'),i=st.top.indexOf(v);
      if(on&&i<0) st.top.push(v); if(!on&&i>=0) st.top.splice(i,1);
      document.getElementById(b.getAttribute('data-t')).classList.toggle('on',on);
    } else {
      var bs=g.querySelectorAll('button'); for(var j=0;j<bs.length;j++) bs[j].classList.remove('on');
      b.classList.add('on'); st[k]=v;
    }
    render();
  });
  ['rábano','limón'].forEach(function(v){var b=f.querySelector('[data-v="'+v+'"]');if(b)b.click()});
  render();
})();
