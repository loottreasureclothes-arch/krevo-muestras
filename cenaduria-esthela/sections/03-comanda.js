(function(){
 "use strict";
 var TEL="+524499180751";
 var WA=window.ESTHELA_WA||""; /* sin WhatsApp publicado: vacío. Si el dueño da uno, poner solo dígitos con 52 */
 var items={}, order=[]; /* key -> {key,name,variant,unit,price,qty} */
 var pad=document.getElementById("pad"); if(!pad) return;
 var ul=document.getElementById("hoja-lineas"), tot=document.getElementById("hoja-total"), aviso=document.getElementById("hoja-aviso");
 var arrancar=document.getElementById("pad-arrancar"), nombre=document.getElementById("pad-nombre");
 var talonTxt=document.getElementById("talon-txt"), copyBtn=document.getElementById("talon-copy"), otra=document.getElementById("talon-otra"), ok=document.getElementById("talon-ok"), waBtn=document.getElementById("talon-wa");
 var pill=document.getElementById("com-pill");
 function money(n){return "$"+n.toLocaleString("es-MX")}
 function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}

 /* precios en la carta */
 function curPrice(li){
  var sel=li.querySelector("select");
  if(sel){var o=sel.options[sel.selectedIndex];return {price:+o.getAttribute("data-p"),variant:o.value}}
  var p=li.getAttribute("data-p");return {price:p?+p:null,variant:""};
 }
 function paintPrice(li){
  var el=li.querySelector(".plato-p"); if(!el) return;
  var c=curPrice(li), u=li.getAttribute("data-unit");
  if(c.price==null){el.className="plato-p ask";el.textContent="Pregunta el precio";}
  else{el.className="plato-p";el.innerHTML=money(c.price)+(u?"<small>"+esc(u)+"</small>":"");}
 }
 var lis=document.querySelectorAll(".plato");
 Array.prototype.forEach.call(lis,function(li){
  paintPrice(li);
  var sel=li.querySelector("select"); if(sel) sel.addEventListener("change",function(){paintPrice(li)});
  var b=li.querySelector(".add");
  if(b) b.addEventListener("click",function(){
   var c=curPrice(li), key=li.getAttribute("data-id")+"|"+c.variant;
   if(!items[key]){items[key]={key:key,name:li.getAttribute("data-name"),variant:c.variant,unit:li.getAttribute("data-unit")||"",price:c.price,qty:0};order.push(key);}
   items[key].qty++; items[key].fresh=true;
   li.classList.add("is-hit"); setTimeout(function(){li.classList.remove("is-hit")},260);
   render();
  });
 });

 function label(it){return it.name+(it.variant?" "+it.variant.toLowerCase():"")+(it.unit?" ("+it.unit+")":"")}
 function render(){
  var html="",sum=0,unk=false,n=0;
  order.forEach(function(k){
   var it=items[k]; if(!it||it.qty<1) return; n+=it.qty;
   var sub=it.price!=null?it.price*it.qty:null; if(sub==null)unk=true; else sum+=sub;
   html+='<li class="'+(it.fresh?"nuevo":"")+'" data-k="'+esc(k)+'"><span class="ln-q"><button type="button" data-d="-1" aria-label="Quitar uno">&minus;</button><b>'+it.qty+'</b><button type="button" data-d="1" aria-label="Agregar uno">+</button></span><span class="ln-t">'+esc(it.name)+(it.variant?" "+esc(it.variant.toLowerCase()):"")+(it.unit?"<small>"+esc(it.unit)+"</small>":"")+'</span><span class="ln-p'+(sub==null?" ask":"")+'">'+(sub==null?"precio al pedir":money(sub))+'</span></li>';
   it.fresh=false;
  });
  ul.innerHTML=html; tot.textContent=money(sum); aviso.hidden=!unk; arrancar.disabled=n<1;
  if(pill){pill.hidden=n<1;pill.querySelector("b").textContent=n;pill.querySelector("span").textContent=money(sum)+(unk?" +":"");}
 }
 ul.addEventListener("click",function(e){
  var b=e.target.closest&&e.target.closest("button[data-d]"); if(!b) return;
  var k=b.closest("li").getAttribute("data-k"); items[k].qty+=+b.getAttribute("data-d"); if(items[k].qty<1){delete items[k];order=order.filter(function(x){return x!==k})}
  render();
 });

 function texto(){
  var nm=(nombre.value||"").trim(), lines=[], sum=0, unk=false;
  order.forEach(function(k){var it=items[k]; if(!it)return; lines.push("- "+it.qty+" x "+label(it)+(it.price!=null?" ($"+(it.price*it.qty)+")":" (precio por confirmar)")); if(it.price!=null)sum+=it.price*it.qty; else unk=true;});
  return "Hola, soy "+(nm||"(mi nombre)")+". Mi comanda:\n"+lines.join("\n")+"\nSuma: $"+sum+(unk?" + lo que falte por precio":"")+".\n¿Para llevar o en mesa?";
 }
 function waUrl(msg){return "https://wa.me/"+WA+"?text="+encodeURIComponent(msg)}
 arrancar.addEventListener("click",function(){
  var t=texto(); talonTxt.textContent=t; ok.textContent="";
  if(WA){waBtn.hidden=false;waBtn.href=waUrl(t)}else{waBtn.hidden=true}
  pad.classList.add("done"); document.getElementById("talon").setAttribute("aria-hidden","false");
 });
 otra.addEventListener("click",function(){pad.classList.remove("done");document.getElementById("talon").setAttribute("aria-hidden","true");});
 copyBtn.addEventListener("click",function(){
  var t=talonTxt.textContent;
  function good(){ok.textContent="Copiada. Pégala o léela al llamar."}
  function bad(){var r=document.createRange();r.selectNodeContents(talonTxt);var s=window.getSelection();s.removeAllRanges();s.addRange(r);ok.textContent="Selecciónala y cópiala."}
  if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(good,bad); else bad();
 });
 window.EsthelaComanda={texto:texto,tel:TEL};
 render();
})();
