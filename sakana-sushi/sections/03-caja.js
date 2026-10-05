(function(){
 "use strict";
 var WA=window.SAKANA_WA||""; /* sin WhatsApp publicado: vacío. Si el dueño da uno, solo dígitos con 52 */
 var TEL="+524491016863";
 var $=function(id){return document.getElementById(id)};
 var tray=$("tray"); if(!tray) return;
 var box=$("box"), ctl=$("ctl"), lns=$("lns"), tot=$("tot"), hint=$("box-hint"), cerrar=$("cerrar"), nom=$("nom"), tick=$("tick"), tickT=$("tick-t"), ok=$("tick-ok"), waBtn=$("wa"), lidN=$("lid-n");
 var hdN=$("hd-n"), pill=$("caja-pill");
 var units=[];            /* una entrada por rollo: id */
 var info={};             /* id -> {name,price,t} */
 var justAdded=-1;
 function money(n){return "$"+n.toLocaleString("es-MX")}
 function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}

 var COL={e:["#d9953a","#b9742a","#f2693a"],a:["#f2ead4","#2b2418","#86bf5a"],s:["#1c2a20","#2f4a36","#f08a4b"],n:["#f7f1e1","#f08a30","#e6563c"]};
 function roll(t){
  var c=COL[t]||COL.e, dots="";
  for(var i=0;i<10;i++){var a=i*36*Math.PI/180;dots+='<circle cx="'+(20+16*Math.cos(a)).toFixed(1)+'" cy="'+(20+16*Math.sin(a)).toFixed(1)+'" r="1.5" fill="'+c[1]+'"/>';}
  return '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="'+c[0]+'"/>'+(t==="s"?"":dots)+'<circle cx="20" cy="20" r="12.5" fill="#f9f6ec"/><circle cx="20" cy="20" r="5.2" fill="'+c[2]+'"/><circle cx="17.6" cy="18.6" r="1.6" fill="#86bf5a" opacity="'+(t==="s"?0:.9)+'"/></svg>';
 }
 function groups(){
  var g={},order=[];
  units.forEach(function(id){if(!g[id]){g[id]=0;order.push(id)} g[id]++});
  return order.map(function(id){return {id:id,qty:g[id],i:info[id]}});
 }
 function sum(){return units.reduce(function(s,id){return s+info[id].price},0)}
 function render(){
  var n=units.length, html="";
  /* hueco 12 = "+N" si hay más de 12 */
  var show=n>12?11:n;
  for(var i=0;i<12;i++){
   if(i<show) html+='<span class="slot'+(i===justAdded?" new":"")+'">'+roll(info[units[i]].t)+'</span>';
   else if(i===11&&n>12) html+='<span class="slot mas">+'+(n-11)+'</span>';
   else if(i===n&&n<12) html+='<a class="slot go" href="#carta" aria-label="Escoger un rollo de la carta">+</a>';
   else html+='<span class="slot vac"></span>';
  }
  tray.innerHTML=html; justAdded=-1;
  var gs=groups(), h="";
  gs.forEach(function(g){
   h+='<li data-id="'+esc(g.id)+'"><span class="q"><button type="button" data-d="-1" aria-label="Quitar uno">&minus;</button><b>'+g.qty+'</b><button type="button" data-d="1" aria-label="Agregar uno">+</button></span><span class="t">'+esc(g.i.name)+'</span><span class="p">'+money(g.i.price*g.qty)+'</span></li>';
  });
  lns.innerHTML=h; tot.textContent=n<1?"Vacía":money(sum()); cerrar.disabled=n<1;
  hint.textContent=n<1?"Tu caja está vacía. Toca el + naranja o el + de cualquier rollo.":(n===1?"1 rollo en tu caja.":n+" rollos en tu caja.");
  lidN.textContent=n+(n===1?" rollo":" rollos")+" · "+money(sum());
  document.body.classList.toggle("has-n",n>0);
  hdN.textContent=n;
  if(pill){pill.hidden=n<1;pill.querySelector("b").textContent=n;pill.querySelector("span").textContent=money(sum())}
 }
 function add(id){units.push(id);justAdded=units.length-1;render()}
 Array.prototype.forEach.call(document.querySelectorAll(".plato"),function(li){
  info[li.getAttribute("data-id")]={name:li.getAttribute("data-name"),price:+li.getAttribute("data-p"),t:li.getAttribute("data-t")};
  li.querySelector(".add").addEventListener("click",function(){
   li.classList.add("is-hit");setTimeout(function(){li.classList.remove("is-hit")},260);
   if(box.classList.contains("shut")) abrir();
   add(li.getAttribute("data-id"));
  });
 });
 lns.addEventListener("click",function(e){
  var b=e.target.closest&&e.target.closest("button[data-d]"); if(!b) return;
  var id=b.closest("li").getAttribute("data-id"), dlt=+b.getAttribute("data-d");
  if(dlt>0){add(id);return}
  var k=units.lastIndexOf(id); if(k>-1) units.splice(k,1); render();
 });

 function modo(){var r=document.querySelector('input[name="modo"]:checked');return r?r.value:"llevar"}
 function texto(){
  var nm=(nom.value||"").trim(), lines=groups().map(function(g){return "- "+g.qty+" x "+g.i.name+" ("+money(g.i.price*g.qty)+")"});
  var m=modo(), es=m==="aqui"?"Es para comer ahí.":(m==="domicilio"?"Es a domicilio.":"Es para llevar.");
  return "Hola, soy "+(nm||"(mi nombre)")+". Mi caja en Sakana Sushi:\n"+lines.join("\n")+"\nSuma: "+money(sum())+".\n"+es;
 }
 function waUrl(msg){return "https://wa.me/"+WA+"?text="+encodeURIComponent(msg)}
 function cerrarCaja(){
  var t=texto(); tickT.textContent=t; ok.textContent="";
  if(WA){waBtn.hidden=false;waBtn.href=waUrl(t)}else{waBtn.hidden=true}
  box.classList.add("shut"); ctl.classList.add("ctl-shut"); tick.hidden=false;
 }
 function abrir(){box.classList.remove("shut");ctl.classList.remove("ctl-shut");tick.hidden=true}
 cerrar.addEventListener("click",cerrarCaja);
 $("otra").addEventListener("click",abrir);
 $("copiar").addEventListener("click",function(){
  var t=tickT.textContent;
  function good(){ok.textContent="Copiado. Pégalo o díctalo al llamar."}
  function bad(){var r=document.createRange();r.selectNodeContents(tickT);var s=window.getSelection();s.removeAllRanges();s.addRange(r);ok.textContent="Selecciónalo y cópialo."}
  if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(good,bad); else bad();
 });
 window.SakanaCaja={texto:texto,waUrl:waUrl,tel:TEL};
 render();
})();
