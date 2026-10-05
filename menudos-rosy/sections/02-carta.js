(function(){
"use strict";
var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
function money(n){return "$"+n.toLocaleString("es-MX")}
var board=$("#board"),bowl=$("#bowl");
if(!board)return;
var items={},order=[];
function cur(){
 var t=$('input[name="tipo"]:checked'),z=$('input[name="tam"]:checked');
 var prices=t.dataset.p.split(",").map(Number),idx=prices.length===1?0:+z.value;
 var parte=t.value==="especial"?$('input[name="parte"]:checked').value:"";
 var nombre=t.dataset.n+(parte?" de "+parte:"");
 var tam=prices.length===1?"":z.dataset.tn;
 return{tipo:t.value,prices:prices,price:prices[idx],nombre:nombre,tam:tam,idx:idx}}
function paint(){var c=cur();
 $("#o-parte").hidden=c.tipo!=="especial";
 $("#o-tam").style.display=c.prices.length===1?"none":"";
 for(var i=0;i<3;i++){var e=$("#pr"+i);if(e&&c.prices[i]!=null)e.textContent=money(c.prices[i])}
 bowl.dataset.kind=c.tipo;bowl.dataset.size=c.prices.length===1?0:c.idx;
 $("#bowl-name").textContent=(c.tipo==="micro"?"Plato micro, para niños":"Plato "+c.nombre)+(c.tam?", "+c.tam:"");
 $("#bowl-price").textContent=money(c.price);
 var bn=$("#bowl-note");if(c.tipo==="birria"){bn.hidden=false;bn.textContent="Solo sábados y domingos."}else if(c.tipo==="especial"){bn.hidden=false;bn.textContent="Solo "+$('input[name="parte"]:checked').value+"."}else bn.hidden=true}
board.addEventListener("change",paint);paint();
/* rellenar caldo */
var rf=$("#refill"),rsay=$("#refill-say"),busy=false;
rf.addEventListener("click",function(){if(busy)return;busy=true;bowl.classList.add("low");rsay.textContent="Se acabó el caldito...";
 setTimeout(function(){bowl.classList.remove("low");rsay.textContent="Te lo rellenan. Así se come aquí."},reduce?50:1100);
 setTimeout(function(){busy=false;rsay.textContent="Pásale el tazón vacío: te sirven más."},reduce?900:2900)});
/* mesa */
var lines=$("#t-lines"),totalEl=$("#t-total"),noteEl=$("#t-note"),say=$("#t-say"),copyBtn=$("#t-copy"),nombre=$("#t-nombre"),mesa=$("#mesa");
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
function setN(id,n,meta){n=Math.max(0,Math.min(40,n));if(!items[id]){if(!meta||n===0)return;items[id]=meta;order.push(id)}
 items[id].n=n;if(n===0){delete items[id];order=order.filter(function(k){return k!==id})}
 syncRows();render()}
function syncRows(){$$("#extras .row").forEach(function(r){var id=r.dataset.id,n=items[id]?items[id].n:0,st=$(".stp",r),add=$(".add",r);
 r.classList.toggle("on",n>0);
 if(n>0){add.style.display="none";if(!st){st=document.createElement("div");st.className="stp";st.innerHTML='<button type="button" class="minus" aria-label="Quitar uno">−</button><output>0</output><button type="button" class="plus" aria-label="Agregar uno">+</button>';r.appendChild(st)}$("output",st).textContent=n}
 else{if(st)st.remove();add.style.display=""}})}
$$("#extras .row").forEach(function(r){var id=r.dataset.id;
 r.addEventListener("click",function(e){var n=items[id]?items[id].n:0;
  var meta={s:r.dataset.s,p:r.dataset.p,price:+r.dataset.price,label:cap(r.dataset.s)};
  if(e.target.closest(".add")){setN(id,1,meta);var pl=$(".plus",r);if(pl)pl.focus()}
  else if(e.target.closest(".minus"))setN(id,n-1,meta);
  else if(e.target.closest(".plus"))setN(id,n+1,meta)})});
$("#add-plate").addEventListener("click",function(){var c=cur();
 var id="p-"+c.tipo+"-"+c.nombre+"-"+c.tam;
 var base=c.tipo==="micro"?"plato micro para niños":(c.tipo==="especial"||c.tipo==="birria")?"plato "+c.nombre:"plato de "+c.nombre;
 var s=base+(c.tam?" "+c.tam:""),p=s.replace(/^plato/,"platos");
 var n=(items[id]?items[id].n:0)+1;
 setN(id,n,{s:s,p:p,price:c.price,label:cap(s)});
 var bt=this;bt.classList.add("ok");bt.firstChild.textContent="✓";setTimeout(function(){bt.classList.remove("ok");bt.firstChild.textContent="+"},900)});
lines.addEventListener("click",function(e){var li=e.target.closest("li[data-id]");if(!li)return;var id=li.dataset.id,it=items[id];if(!it)return;
 if(e.target.closest(".minus"))setN(id,it.n-1);else if(e.target.closest(".plus"))setN(id,it.n+1)});
function render(){lines.innerHTML="";
 if(!order.length){lines.innerHTML='<li class="t-empty">Elige arriba</li>';totalEl.textContent="Elige arriba";noteEl.textContent="Precios de la carta en mostrador. Pueden cambiar.";say.textContent="Dile esto por teléfono: elige arriba lo que se te antoja.";copyBtn.disabled=true;copyBtn.textContent="Copiar pedido";return}
 var total=0,parts=[];
 order.forEach(function(id){var it=items[id],li=document.createElement("li");li.dataset.id=id;
  var a=document.createElement("span");a.textContent=it.n+" × "+cap(it.n>1?it.p:it.s);
  var st=document.createElement("div");st.className="stp";st.innerHTML='<button type="button" class="minus" aria-label="Quitar uno">−</button><output>'+it.n+'</output><button type="button" class="plus" aria-label="Agregar uno">+</button>';
  var c=document.createElement("span");c.textContent=money(it.price*it.n);
  li.appendChild(a);li.appendChild(st);li.appendChild(c);lines.appendChild(li);
  total+=it.price*it.n;parts.push(it.n+" "+(it.n>1?it.p:it.s))});
 totalEl.textContent=money(total);noteEl.textContent="Precios de la carta en mostrador. Pueden cambiar.";
 var nm=(nombre.value||"").trim();
 var msg="Hola, quiero pedir: "+parts.join(", ")+"."+(nm?" A nombre de "+nm+".":"");
 say.textContent="Dile esto por teléfono: "+msg;copyBtn.disabled=false;copyBtn.dataset.msg=msg;
 mesa.classList.remove("print");void mesa.offsetWidth;if(!reduce)mesa.classList.add("print")}
nombre.addEventListener("input",function(){if(order.length)render()});
copyBtn.addEventListener("click",function(){var m=copyBtn.dataset.msg;if(!m)return;
 function ok(){copyBtn.textContent="Copiado";setTimeout(function(){copyBtn.textContent="Copiar pedido"},1800)}
 if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(m).then(ok,ok);else{var t=document.createElement("textarea");t.value=m;document.body.appendChild(t);t.select();try{document.execCommand("copy")}catch(e){}t.remove();ok()}});
})();
