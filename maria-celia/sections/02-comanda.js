(function(){
  "use strict";
  var TEL="+524499167922";
  var dishes=document.querySelectorAll(".mc-dish");
  if(!dishes.length) return;
  var linesEl=document.getElementById("mc-t-lines"),emptyEl=document.getElementById("mc-t-empty"),totalEl=document.getElementById("mc-t-total"),copyBtn=document.getElementById("mc-t-copy"),noteEl=document.getElementById("mc-t-note"),fab=document.getElementById("mc-fab");
  var cart=[]; /* {id,name,vn,price,qty} */
  var mode="Para comer aquí";
  var NOTE0=noteEl.textContent;
  function money(n){return "$"+n}
  function find(id,vn){for(var i=0;i<cart.length;i++){if(cart[i].id===id&&cart[i].vn===vn)return cart[i]}return null}
  function total(){var t=0;cart.forEach(function(c){t+=c.price*c.qty});return t}
  function count(){var t=0;cart.forEach(function(c){t+=c.qty});return t}
  function text(){
    var parts=cart.map(function(c){return c.qty+" "+c.name+(c.vn?" ("+c.vn.toLowerCase()+")":"")});
    return "Hola, quiero pedir: "+parts.join(", ")+". "+mode+". Total aprox. "+money(total())+".";
  }
  function render(){
    linesEl.innerHTML="";
    cart.forEach(function(c,i){
      var li=document.createElement("li");
      li.innerHTML='<span class="mc-t-n"></span><span class="mc-t-m"></span><div class="mc-t-q"><button type="button" aria-label="Quitar uno">−</button><span></span><button type="button" aria-label="Agregar uno">+</button></div>';
      var n=li.querySelector(".mc-t-n");n.textContent=c.name;
      if(c.vn){var s=document.createElement("small");s.textContent=c.vn;n.appendChild(s)}
      li.querySelector(".mc-t-m").textContent=money(c.price*c.qty);
      var b=li.querySelectorAll(".mc-t-q button");
      li.querySelector(".mc-t-q span").textContent=c.qty;
      b[0].addEventListener("click",function(){c.qty--;if(c.qty<=0)cart.splice(cart.indexOf(c),1);render()});
      b[1].addEventListener("click",function(){c.qty++;render()});
      li.style.animation="none";
      linesEl.appendChild(li);
    });
    emptyEl.style.display=cart.length?"none":"block";
    totalEl.textContent=money(total());
    copyBtn.disabled=!cart.length;
    noteEl.textContent=NOTE0;
    var n=count();
    fab.classList.toggle("has-items",n>0);
    var ft=fab.querySelector(".mc-fab-t");
    if(ft)ft.textContent=n>0?"Comanda · "+n+" · "+money(total()):"Llamar";
    fab.setAttribute("href",n>0?"#ticket":"tel:"+TEL);
    fab.setAttribute("aria-label",n>0?"Ir a tu comanda, "+n+" platillos":"Llamar al restaurante");
  }
  Array.prototype.forEach.call(dishes,function(d){
    var vars=JSON.parse(d.getAttribute("data-vars")),sel=parseInt(d.getAttribute("data-sel"),10)||0;
    var price=d.querySelector("[data-price]"),chips=d.querySelectorAll(".mc-var");
    Array.prototype.forEach.call(chips,function(ch){
      ch.addEventListener("click",function(){
        sel=parseInt(ch.getAttribute("data-v"),10);
        Array.prototype.forEach.call(chips,function(o){var on=o===ch;o.classList.toggle("is-on",on);o.setAttribute("aria-checked",on?"true":"false")});
        price.textContent=money(vars[sel][1]);
      });
    });
    var add=d.querySelector(".mc-add");
    add.addEventListener("click",function(){
      var vn=vars.length>1?vars[sel][0]:"",p=vars[sel][1],id=d.getAttribute("data-id")+"|"+sel;
      var c=find(id,vn);
      if(c)c.qty++;else cart.push({id:id,name:d.getAttribute("data-name"),vn:vn,price:p,qty:1});
      render();
      var last=linesEl.lastElementChild;
      if(last&&!c){last.style.animation="";}
      add.classList.remove("is-pop");void add.offsetWidth;add.classList.add("is-pop");
    });
  });
  Array.prototype.forEach.call(document.querySelectorAll(".mc-t-mode button"),function(b){
    b.addEventListener("click",function(){
      mode=b.getAttribute("data-mode");
      Array.prototype.forEach.call(document.querySelectorAll(".mc-t-mode button"),function(o){var on=o===b;o.classList.toggle("is-on",on);o.setAttribute("aria-checked",on?"true":"false")});
    });
  });
  copyBtn.addEventListener("click",function(){
    if(!cart.length)return;
    var t=text();
    function ok(){noteEl.textContent="Copiada. Ahora llama al 449 916 7922 y dícteles tu comanda."}
    function fallback(){var ta=document.createElement("textarea");ta.value=t;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();try{document.execCommand("copy");ok()}catch(e){noteEl.textContent=t}document.body.removeChild(ta)}
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(ok,fallback);else fallback();
  });
  window.McComanda={text:text,add:function(i){dishes[i].querySelector(".mc-add").click()}};
  render();
})();
