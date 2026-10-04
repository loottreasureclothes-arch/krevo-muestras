/* Pedido: arma el mensaje de WhatsApp con los platillos elegidos. */
(function(){
  "use strict";
  var PHONE="524499167574";
  var cards=[].slice.call(document.querySelectorAll(".dish"));
  if(!cards.length)return;
  var qty={},bar=document.getElementById("pedido"),n=document.getElementById("pedido-n"),lbl=document.getElementById("pedido-lbl"),wa=document.getElementById("pedido-wa");
  function sync(){
    var total=0,parts=[];
    cards.forEach(function(c){var q=qty[c.dataset.name]||0;total+=q;if(q)parts.push(q+" "+c.dataset.name);});
    n.textContent=total;lbl.textContent=total===1?"platillo":"platillos";
    var msg=total?"Hola Rincón Maya, quiero pedir: "+parts.join(", ")+". ¿Me confirman precio y tiempo? Gracias.":"Hola Rincón Maya, quiero hacer un pedido.";
    wa.href="https://wa.me/"+PHONE+"?text="+encodeURIComponent(msg);
    document.body.classList.toggle("pedido-on",total>0);
    bar.setAttribute("aria-hidden",total>0?"false":"true");
    wa.tabIndex=total>0?0:-1;
  }
  cards.forEach(function(c){
    var name=c.dataset.name,add=c.querySelector(".dish-add"),step=c.querySelector(".dish-step"),out=step.querySelector("output");
    function set(q){
      q=Math.max(0,Math.min(20,q));qty[name]=q;out.textContent=q;
      add.hidden=q>0;step.hidden=q===0;c.classList.toggle("is-in-order",q>0);
      sync();
    }
    add.addEventListener("click",function(){set(1);step.querySelector(".dish-more").focus({preventScroll:true});});
    step.querySelector(".dish-more").addEventListener("click",function(){set((qty[name]||0)+1);});
    step.querySelector(".dish-less").addEventListener("click",function(){var q=(qty[name]||0)-1;set(q);if(q===0)add.focus({preventScroll:true});});
  });
  /* la barra se esconde cuando el paquete o el contacto ya tienen su propio boton verde */
  var zones=[].slice.call(document.querySelectorAll("[data-hide-wa]"));
  function chk(){var vh=innerHeight,on=false;zones.forEach(function(z){var r=z.getBoundingClientRect();if(r.top<vh*.85&&r.bottom>0)on=true;});document.body.classList.toggle("pedido-hide",on);}
  var t=null;function sch(){if(!t)t=requestAnimationFrame(function(){t=null;chk();});}
  addEventListener("scroll",sch,{passive:true});addEventListener("resize",sch);sch();
  sync();
})();
