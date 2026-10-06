(function(){
  var S=[
    ["4 Cenizas",225,"#3a3f46","Receta de la casa","Reducción del asado de 4 chiles al carbón, en jugo de naranja agria, limón con hierbas y especias. Totalmente artesanal."],
    ["Rojo Chiltepín",215,"#d8332e"],["Verde",215,"#2f9e48"],["Mezcal Jamaica",215,"#8e1f5b"],["Mango Habanero",215,"#f2a81d"],
    ["Guayaba",215,"#ee7c8e"],["Montejo (Yucateco)",225,"#222","","Adobo negro de la cocina de Mérida con un toque de habanero y pimientos."],
    ["Fresa, Tequila y Chiltepín",225,"#e0476a"],["Habanero Blanco",215,"#f1ead4"],["Tamarindo Chiltepín",225,"#8a4b25"],["Coco Ron Habanero",225,"#e8d6a8"]
  ];
  var BASE="Camarón fresco mezclado al momento en jugos cítricos para su cocción y reposado en la salsa de tu preferencia.";
  var chips=document.getElementById("chips");if(!chips)return;
  var desc=document.getElementById("chip-desc"),tl=document.getElementById("ticket-l"),sum=document.getElementById("ticket-sum"),go=document.getElementById("ticket-go");
  var sel=0,ex={pulpo:0,callo:0,tostada:0};
  function money(n){return "$"+n;}
  S.forEach(function(s,i){
    var b=document.createElement("button");b.type="button";b.className="chip";b.setAttribute("role","radio");
    b.innerHTML='<i style="--c:'+s[2]+'"></i>'+s[0]+"<small>"+(s[3]||money(s[1]))+"</small>";
    if(s[3])b.querySelector("small").textContent=s[3]+" · "+money(s[1]);
    b.addEventListener("click",function(){sel=i;render();});
    chips.appendChild(b);
  });
  Array.prototype.forEach.call(document.querySelectorAll(".ex"),function(b){
    b.addEventListener("click",function(){var k=b.dataset.k;ex[k]=ex[k]?0:1;render();});
  });
  function render(){
    var s=S[sel],total=s[1],lines=[["Aguachile "+s[0],money(s[1])]],names={pulpo:"Porción de pulpo",callo:"Callo de hacha",tostada:"Tostada de aguachile"};
    var msg=["Hola Kamaan, quiero un aguachile "+s[0]+" ("+money(s[1])+")"];
    Array.prototype.forEach.call(chips.children,function(c,i){c.setAttribute("aria-checked",i===sel?"true":"false");c.tabIndex=i===sel?0:-1;});
    desc.textContent=s[4]||BASE;
    Array.prototype.forEach.call(document.querySelectorAll(".ex"),function(b){
      var k=b.dataset.k,on=!!ex[k];b.setAttribute("aria-pressed",on?"true":"false");
      if(on){var p=+b.dataset.p;total+=p;lines.push([names[k],"+"+money(p)]);msg.push("con "+names[k].toLowerCase()+" (+"+money(p)+")");}
    });
    tl.innerHTML="";
    lines.forEach(function(l){var li=document.createElement("li"),a=document.createElement("span"),c=document.createElement("span");a.textContent=l[0];c.textContent=l[1];li.appendChild(a);li.appendChild(c);tl.appendChild(li);});
    sum.textContent=money(total);
    go.href=KWA.url(msg.join(", ")+". Total: "+money(total)+". ¿Me lo preparan?");
  }
  chips.addEventListener("keydown",function(e){
    var k=e.key,n=S.length;
    if(k==="ArrowRight"||k==="ArrowDown"){sel=(sel+1)%n;}else if(k==="ArrowLeft"||k==="ArrowUp"){sel=(sel+n-1)%n;}else return;
    e.preventDefault();render();chips.children[sel].focus();
  });
  render();
})();
