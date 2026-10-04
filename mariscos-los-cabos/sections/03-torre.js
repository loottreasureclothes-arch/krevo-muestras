(function(){
  var P=[
    {k:"curt",n:"Camarón curtido",c:"#f3b39b",d:"#d46a52",l:"camarón curtido"},
    {k:"coc",n:"Camarón cocido",c:"#ef8a5a",d:"#c94e22",l:"camarón cocido"},
    {k:"pul",n:"Pulpo",c:"#b86a73",d:"#7a2e3a",l:"pulpo"},
    {k:"cal",n:"Callo de hacha",c:"#f3e6cc",d:"#d8bf93",l:"callo de hacha"},
    {k:"atu",n:"Atún",c:"#c3414c",d:"#861b27",l:"atún"},
    {k:"mar",n:"Marlín",c:"#e9b08f",d:"#b9735a",l:"marlín"},
    {k:"pes",n:"Pescado",c:"#efe5cf",d:"#c9b48c",l:"pescado"}];
  var S=[{n:"Clamato y chiltepín",l:"clamato y chiltepín"},{n:"Ceniza de tortilla y salsas negras",l:"ceniza de tortilla y salsas negras"},{n:"Serrano y cilantro",l:"serrano y cilantro"}];
  var sel=["curt","pul","atu"],salsa=0,last=null;
  var svg=document.getElementById("lc-svg"),prot=document.getElementById("lc-prot"),sal=document.getElementById("lc-salsa"),sum=document.getElementById("lc-sum"),cnt=document.getElementById("lc-count"),wa=document.getElementById("lc-torre-wa");
  if(!svg||!prot)return;
  function join(a){return a.length<2?a.join(""):a.slice(0,-1).join(", ")+" y "+a[a.length-1];}
  function find(k){for(var i=0;i<P.length;i++)if(P[i].k===k)return P[i];}
  function layer(p,x,yt,w,h,seed){
    // monticulo de trozos: base recta, lados abombados, copete irregular
    var b=yt+h, top="", n=7;
    for(var i=0;i<=n;i++){var px=x+4+(w-8)*i/n, py=yt+3+((seed*13+i*7)%6)-(i%2?3:0);top+=(i?" L":"M")+px.toFixed(1)+" "+py.toFixed(1);}
    var d=top+" C"+(x+w+4)+" "+(yt+6)+" "+(x+w+3)+" "+(b-4)+" "+(x+w-6)+" "+b+" L"+(x+6)+" "+b+" C"+(x-3)+" "+(b-4)+" "+(x-4)+" "+(yt+6)+" "+(x+4)+" "+(yt+3)+"Z";
    var o='<path d="'+d+'" fill="'+p.c+'"/><path d="'+d+'" fill="none" stroke="'+p.d+'" stroke-width="1.4" opacity=".8"/>';
    o+='<path d="M'+(x+8)+' '+(b-4)+' H'+(x+w-8)+'" stroke="#0a1638" stroke-width="4" opacity=".22" stroke-linecap="round"/>';
    for(var j=0;j<6;j++){
      var cx=x+16+((seed*31+j*47)%(w-32)), cy=yt+10+((seed*11+j*23)%Math.max(6,h-18)), r=(seed+j)%3;
      if(p.k==="curt"||p.k==="coc"){
        // camarones en C con rayitas
        o+='<g transform="rotate('+(j*53%360)+' '+cx+' '+cy+')"><path d="M'+(cx-7)+' '+(cy+2)+' a7 7 0 1 1 9 -7" fill="none" stroke="'+p.d+'" stroke-width="4.2" stroke-linecap="round"/><path d="M'+(cx-7)+' '+(cy+2)+' a7 7 0 1 1 9 -7" fill="none" stroke="#fff" stroke-width="1.2" opacity=".5" stroke-dasharray="2 3"/></g>';
      }else if(p.k==="cal"){
        o+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(5+r)+'" fill="#fff8ea" opacity=".95"/><circle cx="'+cx+'" cy="'+cy+'" r="'+(5+r)+'" fill="none" stroke="'+p.d+'" stroke-width="1.5"/>';
      }else if(p.k==="pul"){
        // rodajas de tentaculo con ventosa
        o+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(6+r)+'" fill="'+p.d+'"/><circle cx="'+cx+'" cy="'+cy+'" r="'+(3.2+r*.5)+'" fill="#f0d9cf"/><circle cx="'+cx+'" cy="'+cy+'" r="'+(1.3)+'" fill="'+p.d+'"/>';
      }else{
        // cubos de atun / marlin / pescado
        o+='<rect x="'+(cx-6)+'" y="'+(cy-6)+'" width="'+(11+r)+'" height="'+(11+r)+'" rx="2.5" fill="'+p.d+'" transform="rotate('+(j*29%40-20)+' '+cx+' '+cy+')"/><rect x="'+(cx-4)+'" y="'+(cy-4)+'" width="'+(5+r)+'" height="'+(3)+'" rx="1" fill="#fff" opacity=".28" transform="rotate('+(j*29%40-20)+' '+cx+' '+cy+')"/>';
      }
    }
    return o;
  }
  function render(){
    var X=70,W=120,y=282,o="";
    // plato y tostada
    o+='<ellipse cx="130" cy="310" rx="118" ry="8" fill="#000" opacity=".25"/>';
    o+='<ellipse cx="130" cy="304" rx="122" ry="22" fill="#f5ecdc"/><ellipse cx="130" cy="304" rx="122" ry="22" fill="none" stroke="#2a56c0" stroke-width="5"/><ellipse cx="130" cy="301" rx="96" ry="15" fill="#e7dcc6"/>';
    o+='<ellipse cx="130" cy="289" rx="84" ry="12" fill="#a8702c"/><ellipse cx="130" cy="285" rx="84" ry="12" fill="#e2ab5b"/>';
    for(var q=0;q<9;q++){o+='<ellipse cx="'+(62+q*17)+'" cy="'+(282+(q%3)*2)+'" rx="4" ry="2" fill="#b7772f" opacity=".55"/>';}
    o+='<path d="M48 286 Q130 300 212 286" fill="none" stroke="#8a5a20" stroke-width="1.5" opacity=".6"/>';
    var bh=sel.length>3?34:38;
    sel.forEach(function(k,i){
      var p=find(k),yt=y-bh*(i+1);
      o+='<g class="lc-band'+(k===last?" lc-new":"")+'">'+layer(p,X,yt,W,bh,i+k.charCodeAt(0))+'</g>';
    });
    var t=y-bh*sel.length;
    // pepino en rodajas
    o+='<g class="lc-band">';
    for(var i=0;i<6;i++){var cx=X+12+i*19.5,cy=t-7+(i%2?2:0);o+='<circle cx="'+cx+'" cy="'+cy+'" r="9.5" fill="#6aa84f"/><circle cx="'+cx+'" cy="'+cy+'" r="7" fill="#dcedb7"/><circle cx="'+cx+'" cy="'+cy+'" r="2.6" fill="#b9d58c"/>';}
    o+='</g>';
    t-=15;
    // aros de cebolla morada
    o+='<g class="lc-band" fill="none" stroke-linecap="round">';
    [-42,-14,14,42].forEach(function(dx,j){var cx=130+dx,cy=t-4+(j%2?1:0);o+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="14" ry="5" stroke="#8b2f8e" stroke-width="3.2"/><ellipse cx="'+cx+'" cy="'+cy+'" rx="14" ry="5" stroke="#ecc3ea" stroke-width="1.1"/>';});
    o+='</g>';
    t-=10;
    // aguacate: rebanadas acostadas en abanico
    o+='<g class="lc-band">';
    [-36,-18,0,18,36].forEach(function(dx,j){var cx=130+dx,cy=t-5-(2-Math.abs(j-2))*2;o+='<g transform="rotate('+(dx*.85)+' '+cx+' '+(cy+10)+')"><ellipse cx="'+cx+'" cy="'+cy+'" rx="10.5" ry="15" fill="#2f4f17"/><ellipse cx="'+cx+'" cy="'+(cy+.5)+'" rx="8.5" ry="13" fill="#b9cf6e"/><ellipse cx="'+cx+'" cy="'+(cy+1)+'" rx="4.5" ry="8" fill="#e5ebae"/><ellipse cx="'+cx+'" cy="'+(cy+3)+'" rx="2" ry="3.5" fill="#8c5a2b" opacity=".7"/></g>';});
    o+='</g>';
    t-=16;
    // perejil frito: ramitas con hojas
    o+='<g class="lc-band"><g stroke="#2d6a2b" stroke-width="2.4" stroke-linecap="round" fill="none"><path d="M118 '+(t-10)+' l-9 -11 M124 '+(t-14)+' l-3 -14 M136 '+(t-14)+' l3 -14 M142 '+(t-10)+' l9 -11 M130 '+(t-16)+' l0 -12"/></g>';
    [[109,t-21],[121,t-28],[139,t-28],[151,t-21],[130,t-28],[114,t-16],[146,t-16]].forEach(function(c,j){o+='<circle cx="'+c[0]+'" cy="'+c[1]+'" r="'+(3.4+(j%2)*.8)+'" fill="'+(j%2?"#4f8f3c":"#2d6a2b")+'"/>';});
    o+='</g>';
    svg.innerHTML=o;
    // chips
    prot.innerHTML="";
    P.forEach(function(p){
      var on=sel.indexOf(p.k)>-1,b=document.createElement("button");
      b.type="button";b.className="lc-chip";b.setAttribute("aria-pressed",on?"true":"false");
      b.innerHTML='<i style="background:'+p.c+'"></i>'+p.n+(on?"<sup>"+(sel.indexOf(p.k)+1)+"</sup>":"");
      if(!on&&sel.length>=4)b.disabled=true;
      b.addEventListener("click",function(){
        var ix=sel.indexOf(p.k);
        if(ix>-1){sel.splice(ix,1);last=null;}else if(sel.length<4){sel.push(p.k);last=p.k;}
        render();var nb=prot.children[P.indexOf(p)];if(nb&&!nb.disabled)nb.focus({preventScroll:true});
      });
      prot.appendChild(b);
    });
    cnt.textContent=sel.length+" de 4";
    sal.innerHTML="";sal.setAttribute("role","radiogroup");sal.setAttribute("aria-label","Salsa");
    S.forEach(function(s,i){
      var b=document.createElement("button");b.type="button";b.className="lc-chip";b.setAttribute("role","radio");b.setAttribute("aria-checked",i===salsa?"true":"false");b.textContent=s.n;
      b.addEventListener("click",function(){salsa=i;last=null;render();sal.children[i].focus({preventScroll:true});});
      sal.appendChild(b);
    });
    var names=sel.map(function(k){return find(k).l;}),m;
    if(!names.length){sum.innerHTML="Elige tus mariscos y la torre se arma sola.";m="Hola Mariscos Los Cabos, vi su página. Quiero una torre. ¿Cuánto sale y en qué sucursal la recojo?";}
    else{sum.innerHTML="Torre de <b>"+join(names)+"</b> con salsa de "+S[salsa].l+".";m="Hola Mariscos Los Cabos, vi su página. Quiero una torre de "+join(names)+" con salsa de "+S[salsa].l+". ¿Cuánto sale y en qué sucursal la recojo?";}
    wa.setAttribute("data-wa",m);wa.href=window.Cabos?window.Cabos.waUrl(m):wa.href;
    last=null;
  }
  render();
})();
