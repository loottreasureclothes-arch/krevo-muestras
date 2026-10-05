/* Firma: El arco de globos. Pintas un arco, eliges edad, tema y fecha; sale un WhatsApp ya armado. */
(function(){
  "use strict";
  var WA="5214492642606";
  var svg=document.getElementById("arco-svg");if(!svg)return;
  var NS="http://www.w3.org/2000/svg";
  var COLORS=[{k:"verde",n:"verde",c:"#2f9e63"},{k:"turquesa",n:"turquesa",c:"#35b6c4"},{k:"rosa",n:"rosa",c:"#ff8fa8"},{k:"amarillo",n:"amarillo",c:"#ffd24a"},{k:"morado",n:"morado",c:"#9b7be0"}];
  var TEMAS=["Fortnite","Selva","Otro"];
  var N=22,cx=180,cy=203,balloons=[],cur=0,tema="",age=5;
  /* estado inicial: verdes y turquesas alternados, como el arco de sus fotos */
  var state=[];for(var i=0;i<N;i++)state.push(i%3===2?1:0);
  function el(t,a){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);return e}
  /* postes */
  svg.appendChild(el("rect",{x:26,y:cy,width:6,height:16,rx:2,fill:"#c9d6cf"}));
  svg.appendChild(el("rect",{x:328,y:cy,width:6,height:16,rx:2,fill:"#c9d6cf"}));
  for(i=0;i<N;i++){
    var a=Math.PI*(1-i/(N-1)),r=(i%2?128:150);
    var x=cx+Math.cos(a)*r,y=cy-Math.sin(a)*r*0.98;
    var g=el("g",{transform:"rotate("+((a*180/Math.PI)-90).toFixed(0)+" "+x.toFixed(1)+" "+y.toFixed(1)+")"});
    var b=el("ellipse",{cx:x.toFixed(1),cy:y.toFixed(1),rx:15,ry:18.5,"class":"b","data-i":i,fill:COLORS[state[i]].c});
    var h=el("ellipse",{cx:(x-5).toFixed(1),cy:(y-7).toFixed(1),rx:3.2,ry:5.5,fill:"#fff","fill-opacity":".45","pointer-events":"none"});
    g.appendChild(b);g.appendChild(h);svg.appendChild(g);balloons.push(b);
  }
  var cc=document.getElementById("arco-colors"),ct=document.getElementById("arco-temas");
  function radio(box,items,on,fmt){
    items.forEach(function(it,idx){
      var b=document.createElement("button");b.type="button";b.className="chip";b.setAttribute("role","radio");b.setAttribute("aria-checked","false");
      b.innerHTML=fmt(it);b.addEventListener("click",function(){on(it,idx,b)});box.appendChild(b);
    });
  }
  radio(cc,COLORS,function(it,idx,b){cur=idx;mark(cc,idx);resumen()},function(c){return '<i style="background:'+c.c+'"></i>'+c.n.charAt(0).toUpperCase()+c.n.slice(1)});
  radio(ct,TEMAS,function(it,idx,b){tema=(tema===it?"":it);mark(ct,tema?idx:-1);resumen()},function(t){return t});
  function mark(box,idx){[].forEach.call(box.children,function(b,i){b.setAttribute("aria-checked",i===idx?"true":"false")})}
  mark(cc,0);mark(ct,-1);
  function paint(b){
    var i=+b.getAttribute("data-i");if(state[i]===cur)return;
    state[i]=cur;b.setAttribute("fill",COLORS[cur].c);b.classList.add("pop");
    setTimeout(function(){b.classList.remove("pop")},260);resumen();
  }
  var down=false;
  svg.addEventListener("pointerdown",function(e){down=true;var t=e.target.closest&&e.target.closest(".b");if(t)paint(t)});
  svg.addEventListener("pointermove",function(e){if(!down)return;var t=document.elementFromPoint(e.clientX,e.clientY);if(t&&t.classList&&t.classList.contains("b"))paint(t)});
  ["pointerup","pointercancel","pointerleave"].forEach(function(ev){svg.addEventListener(ev,function(){down=false})});
  var ageBtn=document.getElementById("arco-age"),ageN=document.getElementById("arco-agen");
  ageBtn.addEventListener("click",function(){age=age>=15?1:age+1;ageN.textContent=age;ageBtn.classList.remove("tick");void ageBtn.offsetWidth;ageBtn.classList.add("tick");resumen()});
  var nom=document.getElementById("arco-nombre"),fec=document.getElementById("arco-fecha"),res=document.getElementById("arco-resumen"),send=document.getElementById("arco-send");
  var MES=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  try{var d=new Date();fec.min=d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2)}catch(e){}
  function fecha(){var v=fec.value;if(!v)return"";var p=v.split("-");if(p.length!==3)return"";return parseInt(p[2],10)+" de "+MES[parseInt(p[1],10)-1]+" de "+p[0]}
  function conteo(){
    var c=COLORS.map(function(){return 0});state.forEach(function(s){c[s]++});
    return COLORS.map(function(k,i){return c[i]?c[i]+" "+k.n:""}).filter(Boolean).join(", ");
  }
  function msg(){
    var n=nom.value.trim(),f=fecha();
    var m="Hola Allegro, quiero cotizar una fiesta infantil. ";
    m+=(n?"Festejado(a): "+n+", cumple "+age+(age===1?" año. ":" años. "):"Cumple "+age+(age===1?" año. ":" años. "));
    if(tema&&tema!=="Otro")m+="Tema: "+tema+". ";
    m+=f?"Fecha que me gusta: "+f+". ":"Todavía no tengo fecha. ";
    m+="Mi arco de globos ("+N+"): "+conteo()+". ¿Tienen libre esa fecha y qué paquete me recomiendan?";
    return m;
  }
  function resumen(){
    var f=fecha(),n=nom.value.trim();
    res.textContent=(n?n+", ":"")+age+(age===1?" año":" años")+(tema?" · "+tema:"")+" · "+(f||"fecha por elegir")+". Arco: "+conteo()+".";
    send.href="https://wa.me/"+WA+"?text="+encodeURIComponent(msg());
  }
  nom.addEventListener("input",resumen);fec.addEventListener("input",resumen);fec.addEventListener("change",resumen);
  resumen();
})();
