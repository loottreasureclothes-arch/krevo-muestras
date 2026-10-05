(function(){
  "use strict";
  var root=document.getElementById("ma"); if(!root) return;
  var V6=[["Sencillas",40],["Con crema o guacamole",45],["Con cueros",50],["Con crema y guacamole",50],["Con 1/2 pata",65],["Con pieza de pollo (pechuga)",75]];
  var DISHES=[
    {id:"enchiladas",n:"Enchiladas",u:"4 piezas · rojas o verdes · queso, cebolla o pollo",img:"enchiladas",big:"enchiladas-960",w:960,h:896,v:V6},
    {id:"flautas",n:"Flautas",u:"4 piezas · deshebrada y pollo",img:"flauta",big:"flauta-720",w:720,h:1280,v:V6},
    {id:"pozole",n:"Pozole rojo",u:"Tostadas extras $5",img:"pozole",big:"pozole-960",w:960,h:960,v:[["Pozole rojo",null]]},
    {id:"sopes",n:"Sopes",u:"Hechos al momento",img:"sopes2",big:"sopes2-960",w:960,h:960,v:[["De cueritos",null],["De lengua",null],["De deshebrada",null]]},
    {id:"quesadilla",n:"Quesadilla de queso",u:"Tortilla frita, crujiente",img:"quesadilla",big:"quesadilla-960",w:960,h:454,v:[["Quesadilla de queso",null]]}
  ];
  var $=function(id){return document.getElementById(id)};
  var elD=$("ma-dishes"),elV=$("ma-vars"),elImg=$("ma-img"),elPlate=$("ma-plate"),elStamp=$("ma-stamp"),elStampV=$("ma-stamp-v");
  var elItems=$("ma-items"),elTotal=$("ma-total"),btnCopy=$("ma-copy"),btnClear=$("ma-clear"),btnAdd=$("ma-add");
  var sel={d:0,v:0},cart=[];
  var IS=3,IQ=4,IP=2;
  function money(n){return "$"+n}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  function buildDishes(){
    elD.innerHTML=DISHES.map(function(d,i){
      return '<button type="button" class="ma-d" data-i="'+i+'" aria-pressed="'+(i===sel.d)+'"><img src="img/'+d.img+'-480.webp" alt="" width="52" height="52" loading="lazy"><span>'+esc(d.n)+'</span></button>';
    }).join("");
  }
  function buildVars(){
    var d=DISHES[sel.d];
    elV.innerHTML=d.v.map(function(v,i){
      return '<button type="button" class="ma-v" data-i="'+i+'" aria-pressed="'+(i===sel.v)+'"><span>'+esc(v[0])+'</span>'+(v[1]==null?'<em>Pregunta el precio</em>':'<b>'+money(v[1])+'</b>')+'</button>';
    }).join("");
  }
  function paintStamp(hit){
    var p=DISHES[sel.d].v[sel.v][1];
    elStampV.textContent=p==null?"Pregunta el precio":money(p);
    elStamp.classList.toggle("is-text",p==null);
    if(hit){elStamp.classList.remove("is-hit");void elStamp.offsetWidth;elStamp.classList.add("is-hit")}
  }
  function paintDish(swap){
    var d=DISHES[sel.d];
    function apply(){
      elImg.src="img/"+d.big+".webp";elImg.width=d.w;elImg.height=d.h;elImg.alt=d.n;
      $("ma-dname").textContent=d.n;$("ma-dunit").textContent=d.u;
    }
    if(swap){elPlate.classList.add("is-swap");setTimeout(function(){apply();elPlate.classList.remove("is-swap")},170)}else apply();
    buildDishes();buildVars();paintStamp(true);
  }
  elD.addEventListener("click",function(e){
    var b=e.target.closest(".ma-d");if(!b)return;
    var i=+b.dataset.i;if(i===sel.d)return;
    sel.d=i;sel.v=0;paintDish(true);
  });
  elV.addEventListener("click",function(e){
    var b=e.target.closest(".ma-v");if(!b)return;
    sel.v=+b.dataset.i;
    Array.prototype.forEach.call(elV.children,function(c,i){c.setAttribute("aria-pressed",i===sel.v)});
    paintStamp(true);
  });
  var lastNew=-1;
  btnAdd.addEventListener("click",function(){
    var key=sel.d+":"+sel.v,f=-1;
    cart.forEach(function(c,i){if(c.k===key)f=i});
    if(f>=0)cart[f].q++;else{cart.push({k:key,d:sel.d,v:sel.v,q:1});f=cart.length-1}
    lastNew=f;render();
    btnAdd.classList.remove("is-pulse");void btnAdd.offsetWidth;btnAdd.classList.add("is-pulse");
  });
  elItems.addEventListener("click",function(e){
    var b=e.target.closest("button[data-act]");if(!b)return;
    var i=+b.dataset.i;
    cart[i].q+=b.dataset.act==="+"?1:-1;
    if(cart[i].q<=0)cart.splice(i,1);
    lastNew=-1;render();
  });
  btnClear.addEventListener("click",function(){cart=[];lastNew=-1;render()});
  function totals(){
    var sum=0,priced=0,unpriced=0;
    cart.forEach(function(c){var p=DISHES[c.d].v[c.v][1];if(p==null)unpriced+=c.q;else{sum+=p*c.q;priced+=c.q}});
    return {sum:sum,priced:priced,unpriced:unpriced};
  }
  function totalText(){
    var t=totals();
    if(!cart.length)return "Elige arriba";
    if(!t.priced)return "Pregunta el precio";
    return money(t.sum)+(t.unpriced?" + por confirmar":"");
  }
  function render(){
    elItems.innerHTML=cart.map(function(c,i){
      var d=DISHES[c.d],v=d.v[c.v],p=v[1];
      var name=c.d===IS?d.n+" "+v[0].toLowerCase().replace("de ","de "):(c.d===IQ?d.n:d.n);
      var sub=c.d===IQ?"Tortilla frita":v[0];
      if(c.d===IS){name=d.n;sub=v[0]}
      if(c.d===IP){name=d.n;sub="Pregunta la medida"}
      return '<li class="ma-it'+(i===lastNew?' is-new':'')+'"><img src="img/'+d.img+'-480.webp" alt="" width="44" height="44"><span class="ma-it-t"><b>'+esc(name)+'</b><span>'+esc(sub)+'</span></span><span class="ma-it-p'+(p==null?' is-text':'')+'">'+(p==null?'Pregunta el precio':money(p*c.q))+'</span><span class="ma-qty"><button type="button" data-act="-" data-i="'+i+'" aria-label="Quitar uno"><svg class="ic" aria-hidden="true"><use href="#i-minus"/></svg></button><output>'+c.q+'</output><button type="button" data-act="+" data-i="'+i+'" aria-label="Agregar uno"><svg class="ic" aria-hidden="true"><use href="#i-plus"/></svg></button></span></li>';
    }).join("");
    elTotal.textContent=totalText();
    btnCopy.disabled=!cart.length;
    btnClear.hidden=!cart.length;
    paintWa();
  }
  function message(){
    var lines=["Hola, quiero pedir en El Sopecito:"];
    cart.forEach(function(c){
      var d=DISHES[c.d],v=d.v[c.v],p=v[1];
      var what=c.d===IS?d.n+" "+v[0].toLowerCase():((c.d===IQ||c.d===IP)?d.n:d.n+" "+v[0].toLowerCase());
      lines.push("- "+c.q+" x "+what+(p==null?" (precio por confirmar)":" ($"+p+" c/u)"));
    });
    var t=totals();
    lines.push(t.priced?("Cuenta: "+money(t.sum)+(t.unpriced?" + lo que falte por confirmar":"")):"Cuenta: por confirmar");
    return lines.join("\n");
  }
  function copy(text){
    if(navigator.clipboard&&navigator.clipboard.writeText)return navigator.clipboard.writeText(text);
    return new Promise(function(res,rej){
      var t=document.createElement("textarea");t.value=text;t.style.position="fixed";t.style.opacity="0";document.body.appendChild(t);t.select();
      try{document.execCommand("copy")?res():rej()}catch(e){rej(e)}
      document.body.removeChild(t);
    });
  }
  btnCopy.addEventListener("click",function(){
    var lbl=$("ma-copy-t");
    copy(message()).then(function(){lbl.textContent="Copiado"},function(){lbl.textContent="Selecciona y copia"});
    setTimeout(function(){lbl.textContent="Copiar pedido"},1800);
  });
  var btnWa=$("ma-wa");
  function paintWa(){
    var t=cart.length?message():"Hola, quiero pedir en El Sopecito.";
    btnWa.href="https://wa.me/524491128659?text="+encodeURIComponent(t);
  }
  window.sopecitoPedido=message;
  buildDishes();buildVars();paintStamp(false);render();
})();
