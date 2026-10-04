(function(){
  var svg=document.getElementById("pz-svg");if(!svg)return;
  var P=[
   {id:"mexicana",n:"Mexicana huevona",d:"Chorizo, jalapeño, elote, cebolla morada, huitlacoche y huevo.",p:230,b:"r",t:[["chorizo",8],["jalapeno",6],["elote",16],["cebmor",7],["huitla",4],["huevo",3]]},
   {id:"hawaiana",n:"Hawaiana ahumada",d:"Jamón, piña a las brasas con un toque de sal y tocino ahumado.",p:230,b:"r",t:[["jamon",9],["pina",9],["tocino",8]]},
   {id:"berenjena",n:"Berenjena",tag:"V",d:"Salsa de tomate, berenjena, cebolla caramelizada, ajo, mozzarella, albahaca.",p:230,b:"r",t:[["berenjena",8],["cebcar",8],["ajo",5],["albahaca",8]]},
   {id:"suprema",n:"Suprema",d:"Salsa de tomate, mozzarella, cebolla, champiñones, tocino, aceituna negra, jitomate, pepperoni, jamón y salchicha italiana.",p:230,b:"r",t:[["pepperoni",5],["champi",5],["aceituna",5],["jitomate",4],["jamon",4],["salchicha",4],["tocino",3],["cebcar",3]]},
   {id:"habanera",n:"Habanera",d:"Salchicha italiana, cebolla morada, chile habanero.",p:230,b:"r",t:[["salchicha",10],["cebmor",8],["habanero",8]]},
   {id:"carbonara",n:"Carbonara",sub:"blanca",d:"Salsa blanca, mozzarella, parmesano, ajo rostizado, tocino, perejil, huevo y pimienta.",p:null,b:"w",t:[["tocino",8],["ajo",6],["huevo",3],["albahaca",7]]},
   {id:"albero",n:"Albero",tag:"VG",sub:"blanca",d:"Salsa blanca, manzanas horneadas, fontina, gorgonzola, arúgula y vinagre de frambuesa.",p:null,b:"w",t:[["manzana",8],["gorgon",6],["fontina",6],["arugula",9]]}
  ];
  var X=[["Extra básico",30],["Extra gourmet",35],["Extra gourmet+",45],["Queso",35],["Pollo",65],["Camarones",85]];
  X[2][0]="Extra extra gourmet";
  var byId={};P.forEach(function(p){byId[p.id]=p;});
  var st={l:"mexicana",r:"hawaiana",slot:"l",x:[]};
  var $=function(i){return document.getElementById(i);};
  function rng(seed){var s=seed>>>0;return function(){s=(s*1664525+1013904223)>>>0;return s/4294967296;};}
  function hash(str){var h=2166136261;for(var i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
  function shape(k,r){
   switch(k){
    case "moz":return '<ellipse rx="11" ry="8" fill="#f6ecc8" opacity=".95"/>';
    case "berenjena":return '<ellipse rx="8" ry="5" fill="#5b3560" stroke="#3d2142" stroke-width="1"/>';
    case "cebcar":return '<path d="M-7 1Q0-6 7 1" fill="none" stroke="#b9772e" stroke-width="2.4" stroke-linecap="round"/>';
    case "ajo":return '<ellipse rx="3.2" ry="2" fill="#f1e6bd"/>';
    case "albahaca":return '<ellipse rx="7" ry="3.6" fill="#3f7a2a"/><path d="M-6 0H6" stroke="#2b5a1b" stroke-width=".8"/>';
    case "jamon":return '<rect x="-6" y="-5" width="12" height="10" rx="2.5" fill="#e58f93"/>';
    case "pina":return '<path d="M-6 5L0-6 6 5z" fill="#f3d04c" stroke="#d9b32f" stroke-width="1"/>';
    case "tocino":return '<rect x="-8" y="-2.2" width="16" height="4.4" rx="1" fill="#a9442d"/><rect x="-8" y="-.4" width="16" height="1.2" fill="#e8b9a2"/>';
    case "chorizo":return '<circle r="5.6" fill="#b73a22"/><circle cx="-1.5" cy="-1" r="1" fill="#e07a55"/>';
    case "jalapeno":return '<circle r="5" fill="none" stroke="#5f9a3a" stroke-width="2.6"/>';
    case "elote":return '<circle r="2.6" fill="#f6d33c"/>';
    case "cebmor":return '<path d="M-7 1Q0-6 7 1" fill="none" stroke="#9a4f9d" stroke-width="2.6" stroke-linecap="round"/>';
    case "huitla":return '<ellipse rx="6" ry="4" fill="#1a1717"/>';
    case "huevo":return '<circle r="7.5" fill="#fffaf0"/><circle r="3.2" fill="#f2b21f"/>';
    case "champi":return '<path d="M-6 3Q-6-5 0-5T6 3z" fill="#e7ddc8"/><rect x="-1.5" y="2" width="3" height="3.5" fill="#cfc3a6"/>';
    case "aceituna":return '<circle r="3.8" fill="none" stroke="#1e1b1b" stroke-width="2.3"/>';
    case "jitomate":return '<circle r="5.2" fill="#d6402b" opacity=".92"/>';
    case "pepperoni":return '<circle r="7" fill="#a52a22"/><circle cx="2" cy="-2" r="1.2" fill="#d36a55"/>';
    case "salchicha":return '<circle r="5.6" fill="#8c4b2a"/><circle cx="1.5" cy="-1" r="1.2" fill="#6e361c"/>';
    case "habanero":return '<ellipse rx="4.2" ry="2.3" fill="#e8742a"/>';
    case "manzana":return '<path d="M-6 0Q0 8 6 0z" fill="#e9d49a" stroke="#c0a25a" stroke-width="1"/>';
    case "gorgon":return '<circle r="3.6" fill="#9fb2c9"/>';
    case "fontina":return '<circle r="4.6" fill="#f2dc9a"/>';
    case "arugula":return '<ellipse rx="8" ry="2.6" fill="#3d7a2c"/>';
   }return "";
  }
  function half(id,side){
   var p=byId[id],R=rng(hash(id+side)),pts=[],marks=[];
   var t=[["moz",p.b==="r"?10:0]].concat(p.t);
   t.forEach(function(it){
     for(var n=0;n<it[1];n++){
       for(var tries=0;tries<60;tries++){
         var a=R()*Math.PI*2,rr=Math.sqrt(R())*112,x=150+Math.cos(a)*rr,y=150+Math.sin(a)*rr;
         if(side==="l"?x>140:x<160)continue;
         var ok=true,md=it[0]==="moz"?14:11;
         for(var j=0;j<pts.length;j++){var dx=pts[j][0]-x,dy=pts[j][1]-y;if(dx*dx+dy*dy<md*md){ok=false;break;}}
         if(ok){pts.push([x,y]);marks.push('<g transform="translate('+x.toFixed(1)+' '+y.toFixed(1)+') rotate('+Math.round(R()*180)+')">'+shape(it[0])+'</g>');break;}
       }
     }
   });
   var base=p.b==="r"?"#c4452b":"#efe2bd";
   return '<g class="pz-half" clip-path="url(#pz-c'+side+')"><circle cx="150" cy="150" r="126" fill="'+base+'"/>'+marks.join("")+'</g>';
  }
  function draw(){
   svg.innerHTML='<defs><clipPath id="pz-cl"><rect x="0" y="0" width="150" height="300"/></clipPath><clipPath id="pz-cr"><rect x="150" y="0" width="150" height="300"/></clipPath></defs>'+
    '<circle cx="150" cy="150" r="148" fill="#0c0a06"/><circle cx="150" cy="150" r="140" fill="#cf9244"/><circle cx="150" cy="150" r="133" fill="none" stroke="#b57428" stroke-width="3"/>'+
    half(st.l,"l")+half(st.r,"r")+
    '<line x1="150" y1="12" x2="150" y2="288" stroke="#14110b" stroke-width="2.5" stroke-dasharray="3 7" stroke-linecap="round"/>'+
    '<path d="M150 150 L'+(st.slot==="l"?"20":"280")+' 150" stroke="none"/>'+
    '<path d="'+(st.slot==="l"?"M150 14A136 136 0 0 0 150 286":"M150 14A136 136 0 0 1 150 286")+'" fill="none" stroke="#f4ebd7" stroke-width="3" stroke-linecap="round" opacity=".9"/>';
  }
  function price(){
   var a=byId[st.l],b=byId[st.r];if(a.p===null||b.p===null)return null;
   var t=(st.l===st.r?230:245);st.x.forEach(function(i){t+=X[i][1];});return t;
  }
  function names(){return st.l===st.r?byId[st.l].n:byId[st.l].n+" y "+byId[st.r].n;}
  function msg(){
   var m="Hola Moloko, quiero una pizza de 14 pulgadas "+(st.l===st.r?byId[st.l].n:"mitad "+byId[st.l].n+" y mitad "+byId[st.r].n)+".";
   if(st.x.length)m+=" Extras: "+st.x.map(function(i){return X[i][0].toLowerCase();}).join(", ")+".";
   var p=price();m+=p===null?" ¿Me pasan el precio, por favor?":" Según la carta son $"+p+".";
   return m+" ¿Es para llevar o a domicilio?";
  }
  function paint(){
   $("pz-nl").textContent=byId[st.l].n;$("pz-nr").textContent=byId[st.r].n;
   Array.prototype.forEach.call(document.querySelectorAll(".pz-slot"),function(s){s.classList.toggle("is-active",s.getAttribute("data-slot")===st.slot);});
   var p=price(),el=$("pz-price");
   el.textContent=p===null?"Pregunta el precio":"$"+p;el.classList.toggle("ask",p===null);
   $("pz-lab").textContent=st.l===st.r?"Pizza entera":"Mitad y mitad";
   $("pz-mini-n").textContent=names();$("pz-mini-p").textContent=p===null?"Pregunta el precio":"$"+p;
   $("pz-send").href=window.MK.waUrl(msg());
   Array.prototype.forEach.call(document.querySelectorAll(".pz-row"),function(r){
     var id=r.getAttribute("data-id"),on=[];if(st.l===id)on.push("Izq.");if(st.r===id)on.push("Der.");
     var t=r.querySelector(".pz-on");t.textContent=on.length?"En tu pizza · "+on.join(" y "):"";t.hidden=!on.length;
   });
   Array.prototype.forEach.call(document.querySelectorAll(".pz-extras button"),function(b,i){b.setAttribute("aria-pressed",st.x.indexOf(i)>-1?"true":"false");});
  }
  function render(){draw();paint();}
  function buildList(){
   var h="",last="";
   P.forEach(function(p){
    var grp=p.sub==="blanca"?"Pizza blanca":"Pizzas · 14 pulgadas";
    if(grp!==last){h+='<li class="pz-sub">'+grp+'</li>';last=grp;}
    h+='<li class="pz-row" data-id="'+p.id+'"><h3>'+p.n+(p.tag?' <span class="pz-tag">'+p.tag+'</span>':'')+'</h3><span class="pz-pr'+(p.p===null?' ask':'')+'">'+(p.p===null?'Pregunta el precio':'$'+p.p)+'</span><p>'+p.d+'</p><span class="pz-add"><button type="button" data-add="'+p.id+'">Agregar</button></span><span class="pz-on" hidden style="grid-column:1/2;font:700 11px/1 var(--fb);letter-spacing:.12em;text-transform:uppercase;color:var(--leaf-t)"></span></li>';
   });
   h+='<li class="pz-note">Salsa blanca: crema y vino blanco. Pizza Andrea y 4 quesos: pregunta por ellas, no vienen en esta carta.</li>';
   $("pz-list").innerHTML=h;
   $("pz-extras").innerHTML=X.map(function(x,i){return '<button type="button" data-x="'+i+'" aria-pressed="false">'+x[0]+' +$'+x[1]+'</button>';}).join("");
  }
  buildList();
  document.addEventListener("click",function(e){
   var a=e.target.closest("[data-add]");
   if(a){st[st.slot]=a.getAttribute("data-add");st.slot=st.slot==="l"?"r":"l";render();return;}
   var s=e.target.closest(".pz-slot");if(s){st.slot=s.getAttribute("data-slot");render();return;}
   var x=e.target.closest("[data-x]");if(x){var i=+x.getAttribute("data-x"),k=st.x.indexOf(i);if(k>-1)st.x.splice(k,1);else st.x.push(i);paint();return;}
  });
  svg.addEventListener("click",function(e){var r=svg.getBoundingClientRect();st.slot=(e.clientX-r.left)<r.width/2?"l":"r";render();});
  render();
  if("IntersectionObserver" in window){
   var mini=$("pz-mini"),sec=document.getElementById("pizza"),vis={s:false,b:false};
   function mm(){mini.classList.toggle("show",vis.s&&!vis.b);}
   new IntersectionObserver(function(e){vis.s=e[0].isIntersecting;mm();},{threshold:0.05}).observe(sec);
   new IntersectionObserver(function(e){vis.b=e[0].isIntersecting;mm();},{threshold:0.35}).observe($("pz-board"));
  }
})();
