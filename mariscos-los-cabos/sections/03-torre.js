(function(){
  var P=[
    {k:"curt",n:"Camarón curtido",c:"#f2a48b",d:"#d9765c",l:"camarón curtido"},
    {k:"coc",n:"Camarón cocido",c:"#ec7a45",d:"#c4491f",l:"camarón cocido"},
    {k:"pul",n:"Pulpo",c:"#94607f",d:"#5f3550",l:"pulpo"},
    {k:"cal",n:"Callo de hacha",c:"#f6ebd4",d:"#d9c6a0",l:"callo de hacha"},
    {k:"atu",n:"Atún",c:"#bb2a42",d:"#7e1428",l:"atún"},
    {k:"mar",n:"Marlín",c:"#f1b99d",d:"#d08a6c",l:"marlín"},
    {k:"pes",n:"Pescado",c:"#efe7d3",d:"#cbbf9f",l:"pescado"}];
  var S=[{n:"Clamato y chiltepín",l:"clamato y chiltepín"},{n:"Ceniza de tortilla y salsas negras",l:"ceniza de tortilla y salsas negras"},{n:"Serrano y cilantro",l:"serrano y cilantro"}];
  var sel=["curt","pul","atu"],salsa=0,last=null;
  var svg=document.getElementById("lc-svg"),prot=document.getElementById("lc-prot"),sal=document.getElementById("lc-salsa"),sum=document.getElementById("lc-sum"),cnt=document.getElementById("lc-count"),wa=document.getElementById("lc-torre-wa");
  if(!svg||!prot)return;
  function join(a){return a.length<2?a.join(""):a.slice(0,-1).join(", ")+" y "+a[a.length-1];}
  function find(k){for(var i=0;i<P.length;i++)if(P[i].k===k)return P[i];}
  function dots(x,y,w,h,col,seed){var o="";for(var i=0;i<9;i++){var rx=x+8+((seed*37+i*53)%(w-16)),ry=y+5+((seed*17+i*29)%Math.max(4,h-10));o+='<circle cx="'+rx+'" cy="'+ry+'" r="'+(1.6+(i%3)*.7)+'" fill="'+col+'" opacity=".55"/>';}return o;}
  function layer(p,x,yt,w,h,seed){
    // monticulo: base recta, lados que se abomban, copete irregular
    var b=yt+h, top="", n=7;
    for(var i=0;i<=n;i++){var px=x+4+(w-8)*i/n, py=yt+2+((seed*13+i*7)%5)-(i%2?3:0);top+=(i?" L":"M")+px.toFixed(1)+" "+py.toFixed(1);}
    var d=top+" C"+(x+w+3)+" "+(yt+6)+" "+(x+w+2)+" "+(b-4)+" "+(x+w-6)+" "+b+" L"+(x+6)+" "+b+" C"+(x-2)+" "+(b-4)+" "+(x-3)+" "+(yt+6)+" "+(x+4)+" "+(yt+2)+"Z";
    var o='<path d="'+d+'" fill="'+p.c+'"/><path d="'+d+'" fill="none" stroke="'+p.d+'" stroke-width="1.6" opacity=".7"/>';
    o+='<path d="M'+(x+8)+' '+(b-5)+' H'+(x+w-8)+'" stroke="#0a1638" stroke-width="3" opacity=".18" stroke-linecap="round"/>';
    for(var j=0;j<8;j++){
      var cx=x+14+((seed*31+j*41)%(w-28)), cy=yt+8+((seed*11+j*19)%Math.max(6,h-16)), r=(seed+j)%3;
      if(p.k==="curt"||p.k==="coc"){o+='<path d="M'+(cx-6)+' '+cy+' a6 6 0 1 0 6 -6" fill="none" stroke="'+p.d+'" stroke-width="3.2" stroke-linecap="round" transform="rotate('+(j*47%360)+' '+cx+' '+cy+')"/>';}
      else if(p.k==="cal"){o+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(4+r)+'" fill="'+p.d+'" opacity=".8"/><circle cx="'+(cx-1)+'" cy="'+(cy-1)+'" r="'+(1.5+r*.5)+'" fill="#fff" opacity=".6"/>';}
      else if(p.k==="pul"){o+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(5+r)+'" fill="'+p.d+'"/><circle cx="'+cx+'" cy="'+cy+'" r="'+(2+r*.5)+'" fill="'+p.c+'"/>';}
      else{o+='<rect x="'+(cx-5)+'" y="'+(cy-5)+'" width="'+(9+r)+'" height="'+(9+r)+'" rx="2" fill="'+p.d+'" opacity=".85" transform="rotate('+(j*29%40-20)+' '+cx+' '+cy+')"/>';}
    }
    return o+'<path d="'+top+'" fill="none" stroke="#fff" stroke-width="2" opacity=".25" stroke-linecap="round"/>';
  }
  function render(){
    var X=70,W=120,y=282,o="";
    o+='<ellipse cx="130" cy="304" rx="122" ry="22" fill="#f5ecdc"/><ellipse cx="130" cy="304" rx="122" ry="22" fill="none" stroke="#2a56c0" stroke-width="5"/><ellipse cx="130" cy="301" rx="96" ry="15" fill="#e7dcc6"/>';
    o+='<ellipse cx="130" cy="289" rx="82" ry="12" fill="#b9833b"/><ellipse cx="130" cy="285" rx="82" ry="12" fill="#e0aa5e"/><ellipse cx="130" cy="285" rx="60" ry="7" fill="#c98f44" opacity=".5"/>';
    var bh=sel.length>3?36:40;
    sel.forEach(function(k,i){
      var p=find(k),yt=y-bh*(i+1),yb=yt+bh;
      o+='<g class="lc-band'+(k===last?" lc-new":"")+'">'+layer(p,X,yt,W,bh,i+k.charCodeAt(0))+'</g>';
    });
    var t=y-bh*sel.length;
    // pepino
    o+='<g class="lc-band"><rect x="'+(X+4)+'" y="'+(t-14)+'" width="'+(W-8)+'" height="14" rx="6" fill="#4d9a45"/>';
    for(var i=0;i<6;i++)o+='<rect x="'+(X+14+i*18)+'" y="'+(t-12)+'" width="9" height="10" rx="4" fill="#bfe08a" opacity=".75"/>';
    o+='</g>';
    t-=14;
    // cebolla morada
    o+='<g class="lc-band"><rect x="'+(X+2)+'" y="'+(t-11)+'" width="'+(W-4)+'" height="11" rx="5" fill="#8b3a8f"/>';
    for(i=0;i<5;i++)o+='<rect x="'+(X+10+i*22)+'" y="'+(t-9)+'" width="14" height="3" rx="1.5" fill="#e6b8e4" opacity=".8"/>';
    o+='</g>';
    t-=11;
    // aguacate en abanico (medias lunas)
    o+='<g class="lc-band">';
    [-34,-17,0,17,34].forEach(function(dx,j){var cx=130+dx,cy=t-6-(2-Math.abs(j-2))*3;o+='<g transform="rotate('+(dx*.9)+' '+cx+' '+(cy+8)+')"><ellipse cx="'+cx+'" cy="'+cy+'" rx="11" ry="20" fill="#3f6b22"/><ellipse cx="'+cx+'" cy="'+(cy+1)+'" rx="8.5" ry="17" fill="#b9d36a"/><ellipse cx="'+cx+'" cy="'+(cy-4)+'" rx="5" ry="9" fill="#e4ef9e"/></g>';});
    o+='</g>';
    t-=16;
    // perejil frito
    o+='<g class="lc-band" stroke="#2d6a2b" stroke-width="3" stroke-linecap="round" fill="none"><path d="M116 '+(t-14)+' l-10 -12 m4 4 l-6 2 M125 '+(t-20)+' l-3 -15 m1 6 l-5 -3 M135 '+(t-20)+' l3 -15 m-1 6 l5 -3 M144 '+(t-14)+' l10 -11 m-4 4 l6 2 M130 '+(t-22)+' l0 -13"/></g>';
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
