(function(){"use strict";
var G=window.GW,O=G.order;
var SAUCE={cajun:"#c98a4b",pimienta:"#e6d25a",gustoso:"#c23a32",habanero:"#f26a1b",none:"#e8a58a"};
var HL={0:"Sin picante",2:"Picante",3:"Muy picante"};
var SP=[[70,290],[130,292],[190,290],[236,284],[96,262],[158,262],[214,258],[72,234],[126,232],[184,230],[232,226],[100,204],[160,200],[210,198],[130,172],[184,168]];
var CP={papitas:[78,314],salchichas:[150,316],elotitos:[210,312],panecillos:[112,308],arroz:[170,310],brocoli:[60,300],bastones:[238,300]};
var N={chica:6,grande:10,kilo:15};
var NS="http://www.w3.org/2000/svg",items=document.getElementById("bag-items");
function el(n,a,p){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}
function comp(k,x,y){var g=el("g",{class:"it in",transform:"translate("+x+","+y+")"});
 if(k==="papitas"){el("circle",{r:11,fill:"#d9b56a"},g);el("circle",{cx:14,cy:-3,r:9,fill:"#c9a25a"},g)}
 else if(k==="salchichas"){el("rect",{x:-18,y:-6,width:36,height:12,rx:6,fill:"#a9482f"},g);el("rect",{x:-14,y:-3,width:20,height:3,rx:2,fill:"#cf6d4d"},g)}
 else if(k==="elotitos"){el("rect",{x:-20,y:-8,width:40,height:16,rx:8,fill:"#f2c230"},g);for(var i=-14;i<=14;i+=7)el("circle",{cx:i,cy:0,r:2,fill:"#d79f12"},g)}
 else if(k==="panecillos"){el("rect",{x:-22,y:-9,width:44,height:18,rx:9,fill:"#d79a4a"},g);el("path",{d:"M-12-4l6 8M0-4l6 8M12-4l6 8",stroke:"#a8702a","stroke-width":2},g)}
 else if(k==="arroz"){el("ellipse",{rx:22,ry:11,fill:"#f4efe4"},g);el("circle",{cx:-6,cy:-3,r:2,fill:"#fff"},g)}
 else if(k==="brocoli"){el("circle",{cx:-6,r:9,fill:"#3d8a45"},g);el("circle",{cx:6,cy:-2,r:10,fill:"#47a050"},g);el("rect",{x:-3,y:6,width:6,height:8,fill:"#6bbd6e"},g)}
 else if(k==="bastones"){el("rect",{x:-20,y:-3,width:40,height:6,rx:3,fill:"#ec8a2e",transform:"rotate(-18)"},g);el("rect",{x:-18,y:-3,width:36,height:6,rx:3,fill:"#e9e4c8",transform:"rotate(14)"},g)}
 return g}
function shrimp(x,y,c,i,mus){var g=el("g",{class:"it in",transform:"translate("+x+","+y+")"});
 if(mus){var m=el("g",{transform:"rotate("+(i*37%50-25)+")"},g);el("ellipse",{rx:16,ry:11,fill:"#262b46",stroke:"#10131f","stroke-width":1.5},m);el("path",{d:"M-12 0q12-8 24 0",fill:"none",stroke:"#6f7aa8","stroke-width":2},m);return g}
 var r=el("g",{transform:"rotate("+((i*53)%60-30)+")"+((i%2)?" scale(-1,1)":"")},g);var d="M-14 6C-14-10 8-16 16-4C20 4 14 10 8 8";
 el("path",{d:d,fill:"none",stroke:c,"stroke-width":11,"stroke-linecap":"round"},r);el("path",{d:d,fill:"none",stroke:"rgba(50,10,5,.38)","stroke-width":11,"stroke-dasharray":"1.5 6","stroke-linecap":"butt"},r);
 el("path",{d:"M-15 8l-6 7M-15 8l-9 2",fill:"none",stroke:c,"stroke-width":4,"stroke-linecap":"round"},r);el("circle",{cx:8,cy:7,r:1.6,fill:"#1a0a08"},r);
 return g}
var st={sal:null,tipo:"camarones",tam:null,qty:1,comps:[]};
var last="";
function draw(){var key=[st.sal,st.tipo,st.tam,st.comps.join()].join("|");if(key===last)return;
 var prevSig=last.split("|");last=key;items.innerHTML="";
 var c=SAUCE[st.sal||"none"],n=st.tam?N[st.tam]:0;
 for(var i=0;i<n;i++){var p=SP[i];items.appendChild(shrimp(p[0],p[1],c,i,st.tipo==="mix"&&i%3===1))}
 st.comps.forEach(function(k){var p=CP[k];items.appendChild(comp(k,p[0],p[1]))});
 if(!n||!st.sal){var t=el("text",{x:150,y:n?118:200,"text-anchor":"middle",fill:"rgba(244,236,230,.62)","font-size":15,"font-family":"Sora,sans-serif","font-weight":700},items);t.textContent=st.sal?"Ahora elige la porción":(n?"Falta la salsa":"Elige salsa y porción")}
 // el orden de pintado: camarones al fondo, complementos encima
}
function heat(){var h=+((document.querySelector('input[name=sal]:checked')||{getAttribute:function(){return -1}}).getAttribute("data-heat"));
 var is=document.querySelectorAll(".heat i");for(var i=0;i<3;i++)is[i].classList.toggle("on",h>i&&h>0);
 document.getElementById("heat-l").textContent=h<0?"Elige tu salsa":(h===0?"Sin picante":h===2?"Picante":"Muy picante")}
var NAMES={cajun:"Cajún",pimienta:"Pimienta limón",gustoso:"Gustoso",habanero:"Habanero"},TN={chica:"chica (220 g)",grande:"grande (440 g)",kilo:"kilo"};
var cprice={};
function bag(){if(!st.tam||!st.sal)return null;var b=+document.querySelector('input[name=tam][value='+st.tam+']').getAttribute("data-price");
 var cs=st.comps.map(function(k){var i=document.querySelector('input[name=comp][value='+k+']');cprice[k]=+i.getAttribute("data-price");return{k:k,n:i.getAttribute("data-name"),p:cprice[k]}});
 var per=b+cs.reduce(function(a,c){return a+c.p},0);
 return{b:b,cs:cs,per:per,label:(st.tipo==="mix"?"Mix mejillón y camarón ":"Bolsa de camarones ")+TN[st.tam]+", salsa "+NAMES[st.sal]}}
function sum(){var b=bag(),ul=document.getElementById("ord-list"),tot=0,msg=["Hola, quiero pedir en El Gustoso:"],html="",any=false;
 if(b){any=true;tot+=b.per*st.qty;html+='<li><span>'+st.qty+' × '+b.label+(b.cs.length?'<small>Con '+b.cs.map(function(c){return c.n.toLowerCase()}).join(", ")+'</small>':'')+'</span><b>'+G.money(b.per*st.qty)+'</b></li>';
  msg.push("- "+st.qty+" "+b.label+(b.cs.length?" (con "+b.cs.map(function(c){return c.n.toLowerCase()}).join(", ")+")":""))}
 var ds=O.dishes;for(var k in ds){any=true;var d=ds[k];tot+=d.price*d.qty;html+='<li><span>'+d.qty+' × '+d.name+'</span><b>'+G.money(d.price*d.qty)+'</b></li>';msg.push("- "+d.qty+" "+d.name)}
 var hint="";if(!b&&(st.sal||st.tam)){hint=st.sal?"Ya tienes la salsa: ahora elige la porción.":"Ya tienes la porción: ahora elige la salsa."}
 if(hint)html='<li class="vacio">'+hint+'</li>'+html;
 if(!any&&!hint){html='<li class="vacio">Elige arriba: salsa y porción, o agrega un platillo de la carta.</li>'}
 ul.innerHTML=html;
 document.getElementById("ord-total").textContent=any?G.money(tot):"Elige arriba";
  if(any)msg.push("Total aproximado: "+G.money(tot)+".");msg.push("Gracias.");
 document.getElementById("ord-wa").href=any?G.wa(msg.join("\n")):G.wa("Hola, quiero pedir en El Gustoso.");
 window.GW.lastMsg=msg.join("\n")}
function read(){var s=document.querySelector('input[name=sal]:checked'),t=document.querySelector('input[name=tipo]:checked'),z=document.querySelector('input[name=tam]:checked');
 st.sal=s?s.value:null;st.tipo=t.value;st.tam=z?z.value:null;st.comps=[].slice.call(document.querySelectorAll('input[name=comp]:checked')).map(function(i){return i.value});
 draw();heat();sum()}
document.querySelector(".bl").addEventListener("change",read);
document.getElementById("q-").addEventListener("click",function(){st.qty=Math.max(1,st.qty-1);document.getElementById("q").textContent=st.qty;sum()});
document.getElementById("q+").addEventListener("click",function(){st.qty=Math.min(20,st.qty+1);document.getElementById("q").textContent=st.qty;sum()});
document.getElementById("ord-clr").addEventListener("click",function(){[].forEach.call(document.querySelectorAll(".bl input:checked"),function(i){i.checked=false});document.querySelector('input[name=tipo][value=camarones]').checked=true;st.qty=1;document.getElementById("q").textContent=1;O.clear();read()});
O.on(sum);read();
})();
