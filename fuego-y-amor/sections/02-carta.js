(function(){
var sec=document.getElementById("carta");if(!sec)return;
var WA="524494353108";
var cart={},per=2,dia="hoy";
var $=function(s,r){return (r||sec).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||sec).querySelectorAll(s))};
var money=function(n){return "$"+n.toLocaleString("es-MX")};
/* tabs y foto */
var vistaMap={ens:"ens",pas:"pas",fue:"fue",nin:"pas"};
function tab(k){
  $$(".tab").forEach(function(t){var on=t.dataset.cat===k;t.classList.toggle("on",on);t.setAttribute("aria-selected",on)});
  $$(".panel").forEach(function(p){p.hidden=p.id!=="p-"+k});
  var v=vistaMap[k];$$(".vista-img").forEach(function(i){i.classList.toggle("on",i.dataset.v===v)});
}
$$(".tab").forEach(function(t){t.addEventListener("click",function(){tab(t.dataset.cat)})});
/* comanda */
function pl(row){return {id:row.dataset.id,n:row.dataset.n,p:+row.dataset.p}}
function setQ(row,q){
  var id=row.dataset.id;if(q<=0)delete cart[id];else cart[id]={n:row.dataset.n,p:+row.dataset.p,q:Math.min(q,20)};
  paint();
}
$$(".plato").forEach(function(row){
  $(".add",row).addEventListener("click",function(){setQ(row,1)});
  $(".q-",row).addEventListener("click",function(){setQ(row,((cart[row.dataset.id]||{}).q||0)-1)});
  $(".q\\+",row).addEventListener("click",function(){setQ(row,((cart[row.dataset.id]||{}).q||0)+1)});
});
function totals(){var n=0,t=0;for(var k in cart){n+=cart[k].q;t+=cart[k].q*cart[k].p}return {n:n,t:t}}
function message(){
  var s="Hola Fuego y Amor, ¿tienen mesa para "+per+(per===1?" persona ":" personas ")+dia+" a las "+$("#hora").value+"?";
  var ls=[];for(var k in cart)ls.push(cart[k].q+" x "+cart[k].n);
  if(ls.length){var T=totals();s+=" Nos late: "+ls.join(", ")+". Total aproximado: "+money(T.t)+".";}
  return s;
}
function paint(){
  $$(".plato").forEach(function(row){
    var c=cart[row.dataset.id],q=$(".qty",row);
    row.classList.toggle("has",!!c);q.hidden=!c;if(c)$("b",q).textContent=c.q;
  });
  var ul=$("#lineas"),T=totals();
  if(!T.n){ul.innerHTML='<li class="vacio">Aún no escoges nada. También puedes reservar sin elegir.</li>';$("#total").hidden=true}
  else{ul.innerHTML=Object.keys(cart).map(function(k){var c=cart[k];return "<li><span>"+c.q+" x "+c.n.replace(/&/g,"&amp;")+"</span><b>"+money(c.q*c.p)+"</b></li>"}).join("");
    $("#total").hidden=false;$("#total b").textContent=money(T.t)}
  $("#per").textContent=per;
  $("#reservar").href="https://wa.me/"+WA+"?text="+encodeURIComponent(message());
  var bar=document.getElementById("bar");
  if(bar){bar.hidden=!T.n;document.body.classList.toggle("has-bar",!!T.n);
    document.getElementById("bar-t").textContent=T.n+(T.n===1?" platillo":" platillos")+" · "+money(T.t)}
}
$("#per-").addEventListener("click",function(){per=Math.max(1,per-1);paint()});
$("#per\\+").addEventListener("click",function(){per=Math.min(20,per+1);paint()});
$$(".chip").forEach(function(c){c.addEventListener("click",function(){
  dia=c.dataset.v;$$(".chip").forEach(function(x){var on=x===c;x.classList.toggle("on",on);x.setAttribute("aria-checked",on)});paint()})});
$("#hora").addEventListener("change",paint);
/* la barra se esconde cuando ya estás viendo tu mesa */
var mesa=$("#mesa"),bar=document.getElementById("bar");
if(mesa&&bar&&"IntersectionObserver" in window){new IntersectionObserver(function(es){es.forEach(function(e){bar.style.display=e.isIntersecting?"none":""})},{threshold:.15}).observe(mesa)}
paint();
})();
