(function(){"use strict";
var dishes={},subs=[];
var O=window.GW.order={dishes:dishes,on:function(f){subs.push(f)},emit:function(){subs.forEach(function(f){f()})},
 set:function(id,name,price,q){if(q<=0)delete dishes[id];else dishes[id]={name:name,price:price,qty:q};this.emit()},clear:function(){for(var k in dishes)delete dishes[k];this.emit()}};
function render(box){var id=box.getAttribute("data-id"),q=dishes[id]?dishes[id].qty:0;
 if(!q){box.innerHTML='<button class="add" type="button">Agregar</button>';}
 else box.innerHTML='<span class="sq"><button type="button" data-d="-1" aria-label="Quitar">−</button><span>'+q+'</span><button type="button" data-d="1" aria-label="Agregar uno más">+</button></span>';}
var boxes=[].slice.call(document.querySelectorAll(".stp"));
boxes.forEach(function(b){render(b);b.addEventListener("click",function(e){var bt=e.target.closest("button");if(!bt)return;var id=b.getAttribute("data-id"),cur=dishes[id]?dishes[id].qty:0,d=bt.hasAttribute("data-d")?+bt.getAttribute("data-d"):1;
 O.set(id,b.getAttribute("data-name"),+b.getAttribute("data-price"),cur+d)})});
O.on(function(){boxes.forEach(render)});
})();
