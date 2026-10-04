(function(){
"use strict";
var S=window.TT;S.modo="dom";
function $(s){return document.querySelector(s)}
function $$(s){return Array.prototype.slice.call(document.querySelectorAll(s))}
var SZ={ind:"individual",gra:"grande"};
var money=function(n){return "$"+n.toLocaleString("es-MX")};
function init(a){return a.replace(/[^A-Za-zÁÉÍÓÚÑ0-9]/g,"").slice(0,2).toUpperCase()}
function message(){
  var t=S.total(),n=S.NAME[S.suc],d=S.modo==="dom"?"a domicilio":"para pasar por ella";
  if(!t.c)return "Hola Trastévere "+n+", quiero hacer un pedido "+d+".";
  var m="Hola Trastévere "+n+", quiero pedir "+d+":\n";
  Object.keys(S.cart).forEach(function(k){var i=S.cart[k];m+="- "+i.q+" x "+i.n+" "+SZ[i.sz]+"\n"});
  m+="Total de carta: "+money(t.t)+".\n";
  m+=S.suc==="meridian"?"(Precio según la carta de Plaza Patio, ¿me confirman el de Meridian Park?)":"¿Me confirman tiempo?";
  return m;
}
function render(){
  var keys=Object.keys(S.cart),t=S.total();
  var ul=$("#lines");ul.innerHTML="";
  if(!keys.length){var li=document.createElement("li");li.className="none";li.textContent="Aún no hay nada. Toca un precio en la carta o un atajo de abajo.";ul.appendChild(li)}
  keys.forEach(function(k){var i=S.cart[k];var li=document.createElement("li");
    li.innerHTML='<div class="ln-n">'+i.n+'<small>'+SZ[i.sz]+' · '+money(i.p)+'</small></div><div class="step"><button type="button" aria-label="Quitar uno" data-k="'+k+'" data-d="-1">&minus;</button><span>'+i.q+'</span><button type="button" aria-label="Agregar uno" data-k="'+k+'" data-d="1">+</button></div><div class="ln-p">'+money(i.p*i.q)+'</div>';ul.appendChild(li)});
  $("#total").textContent=t.c?money(t.t):"Elige";$("#total").classList.toggle("zero",!t.c);
  /* la caja: un disco por pizza, grande o individual */
  var box=$("#box-in"),prev=box.children.length;box.innerHTML="";var shown=0,max=8;
  keys.forEach(function(k){var i=S.cart[k];for(var q=0;q<i.q;q++){if(shown>=max)return;shown++;
    var d=document.createElement("div");d.className="disc "+(i.sz==="gra"?"g":"i");
    if(shown<=prev)d.style.animation="none";
    d.innerHTML='<svg viewBox="0 0 200 200"><use href="#i-pizza"/></svg><b>'+init(i.n)+'</b>';box.appendChild(d)}});
  if(t.c>max){var more=document.createElement("div");more.className="disc i";more.innerHTML='<b style="color:#161717;text-shadow:none;font-size:20px">+'+(t.c-max)+'</b>';box.appendChild(more)}
  $("#box-empty").classList.toggle("hide",t.c>0);
  var a=$("#order-wa");a.href=S.wa(message());
  $("#caja-note").textContent=S.suc==="meridian"?"En Meridian Park la carta puede variar. Ellos te confirman el total.":"Te llega armado a su WhatsApp. Ellos confirman tiempo y total.";
}
document.addEventListener("click",function(e){
  var b=e.target.closest&&e.target.closest("[data-d]");
  if(b){S.step(b.dataset.k,+b.dataset.d);return}
  var s=e.target.closest&&e.target.closest("[data-suc]");
  if(s){S.suc=s.dataset.suc;$$("[data-suc]").forEach(function(x){var on=x===s;x.classList.toggle("on",on);x.setAttribute("aria-checked",on)});S.emit();return}
  var m=e.target.closest&&e.target.closest("[data-modo]");
  if(m){S.modo=m.dataset.modo;$$("[data-modo]").forEach(function(x){var on=x===m;x.classList.toggle("on",on);x.setAttribute("aria-checked",on)});S.emit();return}
  var qb=e.target.closest&&e.target.closest("[data-q]");if(qb){var a=qb.dataset.q.split("|");S.add(a[0],a[1],a[2],+a[3]);return}
});
S.on(render);render();
})();
