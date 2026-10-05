(function(){
  "use strict";
  var D=[
    {id:"baby",g:"ah",n:"Baby back ribs",s:"400 g",p:275,d:"Cerdo ahumado en leña de mezquite 8 h"},
    {id:"short",g:"ah",n:"Short beef ribs",s:"350 g",p:425,d:"Res ahumada 6 h, rub de canela"},
    {id:"prime",g:"ah",n:"Prime Rib",s:"600 g",p:1348,d:"Rib eye con hueso ahumado 3 h"},
    {id:"d10",g:"pa",n:"Parrishada D10",s:"2 personas",pers:2,p:729,d:"Chorizo argentino, arrachera y rib eye"},
    {id:"roman",g:"pa",n:"Parrishada Roman",s:"3 personas",pers:3,p:1049,d:"Chorizo argentino, new york, T-bone y arrachera"},
    {id:"angus",g:"pa",n:"Parrishada An-gus",s:"4 personas",pers:4,p:1249,d:"Chistorra, vacío, new york, salmón y pulpo"},
    {id:"vdl",g:"po",n:"Volcán de dulce de leche",s:"",p:109,d:""},
    {id:"chee",g:"po",n:"Cheesecake",s:"",p:129,d:""},
    {id:"vq",g:"po",n:"Volcán de queso",s:"",p:119,d:""},
    {id:"tarta",g:"po",n:"Tarta de chocolate",s:"",p:109,d:""}
  ];
  var G={ah:"Ahumados",pa:"Parrishadas",po:"Postres"},GN={ah:"hasta agotar",pa:"para compartir",po:""};
  var by={};D.forEach(function(x){by[x.id]=x});
  var st={};
  function $(s,r){return (r||document).querySelector(s)}
  function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
  function money(n){return "$"+n.toLocaleString("es-MX")}
  var ICP='<svg class="ic" aria-hidden="true"><use href="#i-plus"/></svg>',ICM='<svg class="ic" aria-hidden="true"><use href="#i-minus"/></svg>';
  var pick=$("#pa-pick"),pieces=$("#pa-pieces");
  if(!pick||!pieces) return;

  /* botones de elegir */
  ["ah","pa","po"].forEach(function(g){
    var box=document.createElement("div");box.className="pk-g";
    var h='<h3>'+G[g]+(GN[g]?'<em>'+GN[g]+'</em>':'')+'</h3><div class="pk-l">';
    D.filter(function(x){return x.g===g}).forEach(function(x){
      h+='<button class="pk" type="button" data-pk="'+x.id+'"><b>'+x.n+'</b><span class="pp"><span class="q"></span>'+money(x.p)+ICP+'</span>'+(x.s?'<small>'+x.s+(x.d?' · '+x.d:'')+'</small>':'')+'</button>';
    });
    box.innerHTML=h+'</div>';pick.appendChild(box);
  });

  function add(id,n){
    var q=(st[id]||0)+n;
    if(q<=0){delete st[id]}else{st[id]=Math.min(q,9)}
    render(id,n>0);
  }
  function lines(){return D.filter(function(x){return st[x.id]})}
  function total(){return lines().reduce(function(a,x){return a+x.p*st[x.id]},0)}
  function personas(){return lines().reduce(function(a,x){return a+(x.pers||0)*st[x.id]},0)}
  function message(){
    var L=lines().map(function(x){return st[x.id]+" x "+x.n+(x.s&&x.pers?" ("+x.s+")":"")+" "+money(x.p*st[x.id])});
    return "Hola, quiero pedir en Pibe's Parrisha:\n"+L.join("\n")+"\nTotal: "+money(total())+"\n¿Qué hay hoy y a qué hora me lo tienen?";
  }
  var rendered={};
  function render(changed,added){
    /* piezas en la parrilla */
    D.forEach(function(x){
      var q=st[x.id],el=rendered[x.id];
      if(q&&!el){
        el=document.createElement("li");el.className="pc pc--"+x.g;el.dataset.id=x.id;
        el.innerHTML='<h4>'+x.n+'</h4><div class="qty"><button type="button" data-m="-1" aria-label="Quitar uno de '+x.n+'">'+ICM+'</button><b></b><button type="button" data-m="1" aria-label="Agregar otro de '+x.n+'">'+ICP+'</button></div><p>'+(x.d||x.s)+'</p><span class="sub"></span>';
        /* mantener el orden de la carta */
        var next=null;for(var i=D.indexOf(x)+1;i<D.length&&!next;i++){if(rendered[D[i].id]) next=rendered[D[i].id]}
        pieces.insertBefore(el,next);rendered[x.id]=el;
      }
      if(q&&el){$("b",el).textContent=q;$(".sub",el).textContent=money(x.p*q)}
      if(!q&&el){
        (function(e,id){e.classList.add("out");setTimeout(function(){if(e.parentNode&&!st[id]) e.parentNode.removeChild(e)},300);delete rendered[id]})(el,x.id);
      }
    });
    $$("[data-pk]").forEach(function(b){
      var q=st[b.dataset.pk]||0;b.classList.toggle("on",q>0);
      var qq=$(".q",b);qq.textContent=q||"";
    });
    $$("[data-add]").forEach(function(b){
      var q=st[b.dataset.add]||0;b.classList.toggle("on",q>0);
      $("span",b).textContent=q?"En la parrilla ("+q+")":"Agregar";
    });
    var n=lines().length,t=total(),p=personas();
    var any=n>0;
    $("#pa-cold").style.display=any?"none":"";
    $("#pa-grate").classList.toggle("hot",any);
    $("#pa-n").textContent=any?lines().reduce(function(a,x){return a+st[x.id]},0)+" piezas":"Elige arriba";
    $("#pa-total").textContent=any?money(t):"Elige arriba";
    var pr=$("#pa-pers-row");pr.hidden=!(p>0);$("#pa-pers").textContent=p+(p===1?" persona":" personas");
    $("#pa-copy").disabled=!any;
    $("#pa-clear").hidden=!any;
    if(!any) $("#pa-st").textContent="";
    var go=$("[data-go-parrilla]");
    if(go) go.textContent=any?"Ver mi parrilla ("+money(t)+")":"Armar mi parrilla";
  }
  pick.addEventListener("click",function(e){var b=e.target.closest("[data-pk]");if(b) add(b.dataset.pk,1)});
  document.addEventListener("click",function(e){var b=e.target.closest("[data-add]");if(b) add(b.dataset.add,1)});
  pieces.addEventListener("click",function(e){
    var b=e.target.closest("[data-m]");if(!b) return;
    add(b.closest(".pc").dataset.id,+b.dataset.m);
  });
  $("#pa-clear").addEventListener("click",function(){st={};render()});
  function fallback(t){var a=document.createElement("textarea");a.value=t;a.style.position="fixed";a.style.opacity="0";document.body.appendChild(a);a.select();var ok=false;try{ok=document.execCommand("copy")}catch(e){}document.body.removeChild(a);return ok}
  $("#pa-copy").addEventListener("click",function(){
    var t=message(),msg=$("#pa-st");
    function ok(){msg.textContent="Copiado. Dícelo por teléfono o pégalo donde lo mandes."}
    function no(){msg.textContent=fallback(t)?"Copiado. Dícelo por teléfono o pégalo donde lo mandes.":"No se pudo copiar. Dile el pedido a quien conteste."}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(ok,no)}else{no()}
  });
  window.PibesParrilla={message:message,total:total,add:add};
  render();
})();
