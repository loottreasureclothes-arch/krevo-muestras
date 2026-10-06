(function(){
  var cards=document.querySelectorAll(".card[data-id]");if(!cards.length)return;
  var q={};
  var list=document.getElementById("order-list"),empty=document.getElementById("order-empty"),total=document.getElementById("order-total"),go=document.getElementById("order-go");
  function money(n){return "$"+n.toLocaleString("es-MX");}
  function render(){
    var lines=[],sum=0,ask=0,msg=["Hola Kamaan, quiero pedir:"];
    Array.prototype.forEach.call(cards,function(c){
      var n=q[c.dataset.id]||0,p=+c.dataset.price,name=c.dataset.name;
      var box=c.querySelector(".qty");box.classList.toggle("on",n>0);c.querySelector(".n").textContent=n;
      if(!n)return;
      if(p){sum+=p*n;lines.push([n+" × "+name,money(p*n)]);msg.push("- "+n+" x "+name+" ("+money(p*n)+")");}
      else{ask+=n;lines.push([n+" × "+name,"precio por confirmar"]);msg.push("- "+n+" x "+name+" (¿cuánto es?)");}
    });
    var has=lines.length>0;
    empty.hidden=has;list.hidden=!has;total.hidden=!has;
    list.innerHTML="";
    lines.forEach(function(l){var li=document.createElement("li");var a=document.createElement("span"),b=document.createElement("span");a.textContent=l[0];b.textContent=l[1];li.appendChild(a);li.appendChild(b);list.appendChild(li);});
    if(has){
      total.innerHTML="Total con precio: "+money(sum)+(ask?"<small>Los que dicen \"por confirmar\" te los cotizamos en el chat.</small>":"");
      msg.push("Total de lo que ya tiene precio: "+money(sum)+". ¿Me confirman?");
      go.href=KWA.url(msg.join("\n"));
    }else{go.href=KWA.url("Hola Kamaan, quiero hacer un pedido.");}
  }
  Array.prototype.forEach.call(cards,function(c){
    c.addEventListener("click",function(e){
      var b=e.target.closest("button");if(!b)return;var id=c.dataset.id;
      if(b.classList.contains("add")||b.classList.contains("p"))q[id]=(q[id]||0)+1;
      else if(b.classList.contains("m"))q[id]=Math.max(0,(q[id]||0)-1);
      render();
    });
  });
  render();
})();
