(function(){
  "use strict";
  var root=document.getElementById("mesa"); if(!root) return;
  var cards=root.querySelectorAll(".card");
  var platos=root.querySelector(".platos"), mantel=root.querySelector(".mantel");
  var dicta=root.querySelector(".dicta"), lineasEl=root.querySelector(".lineas"), frase=root.querySelector(".frase");
  var ll=root.querySelector("[data-ll]");
  var modo="aquí", lines=[]; // {key,label,short,img,n,id}
  var sel={size:"mediano",carne:"maciza"};
  var SIZE={infantil:"infantil",chico:"chico",mediano:"mediano",grande:"grande"};

  function cap(s){return s.charAt(0).toUpperCase()+s.slice(1);}
  function find(k){for(var i=0;i<lines.length;i++) if(lines[i].key===k) return lines[i]; return null;}
  function total(id){var t=0;lines.forEach(function(l){if(l.id===id) t+=l.n;});return t;}

  function add(card){
    var id=card.getAttribute("data-id"), name=card.getAttribute("data-name"), img=card.getAttribute("data-img");
    var key=id, label=name, short=name;
    if(id==="pozole"){
      key="pozole-"+sel.size+"-"+sel.carne;
      label="Pozole "+SIZE[sel.size]+" de "+sel.carne;
      short="Pozole "+SIZE[sel.size]+" · "+sel.carne;
    }
    var l=find(key);
    if(l){l.n++; l.fresh=false;} else {lines.push({key:key,label:label,short:short,img:img,n:1,id:id,fresh:true});}
    render();
  }
  function change(key,d){
    var l=find(key); if(!l) return;
    l.n+=d; l.fresh=false;
    if(l.n<=0) lines.splice(lines.indexOf(l),1);
    render();
  }
  function frasePedido(){
    var parts=lines.map(function(l){return l.n+" × "+l.label.toLowerCase();});
    return "Quiero pedir "+(modo==="aquí"?"para comer aquí":"para llevar")+": "+parts.join(", ")+".";
  }
  function render(){
    var has=lines.length>0;
    mantel.classList.toggle("llena",has);
    dicta.hidden=!has;
    platos.innerHTML="";
    lines.forEach(function(l){
      var f=document.createElement("figure"); f.className="plato"; f.style.margin="0";
      if(!l.fresh) f.style.animation="none";
      f.style.transform="rotate("+(((lines.indexOf(l)*7)%9)-4)+"deg)";
      f.innerHTML='<img src="img/'+l.img+'-480.webp" alt="" width="88" height="88"><b>'+l.n+'</b><span>'+l.short+'</span>';
      platos.appendChild(f);
      l.fresh=false;
    });
    lineasEl.innerHTML="";
    lines.forEach(function(l){
      var li=document.createElement("li");
      li.innerHTML='<span>'+l.n+' × '+l.label+'</span><button type="button" aria-label="Quitar uno">−</button><button type="button" aria-label="Agregar uno">+</button>';
      var bs=li.querySelectorAll("button");
      bs[0].addEventListener("click",function(){change(l.key,-1);});
      bs[1].addEventListener("click",function(){change(l.key,1);});
      lineasEl.appendChild(li);
    });
    frase.textContent=has?frasePedido():"";
    ll.textContent=has?"Llamar y dictar mi pedido":"Llamar para pedir";
    cards.forEach(function(c){
      var n=total(c.getAttribute("data-id")), b=c.querySelector("[data-n]");
      if(b) b.textContent=n?"× "+n:"";
    });
  }
  cards.forEach(function(c){
    c.querySelector(".add").addEventListener("click",function(){add(c);});
    c.querySelectorAll(".chips").forEach(function(g){
      g.addEventListener("click",function(e){
        var b=e.target.closest("button"); if(!b) return;
        sel[g.getAttribute("data-group")]=b.getAttribute("data-v");
        g.querySelectorAll("button").forEach(function(x){x.setAttribute("aria-pressed",x===b?"true":"false");});
      });
    });
  });
  root.querySelectorAll(".modo button").forEach(function(b){
    b.addEventListener("click",function(){
      modo=b.getAttribute("data-m");
      root.querySelectorAll(".modo button").forEach(function(x){x.setAttribute("aria-pressed",x===b?"true":"false");});
      render();
    });
  });
  root.querySelector(".vaciar").addEventListener("click",function(){lines=[];render();});
  var cb=root.querySelector(".copiar");
  cb.addEventListener("click",function(){
    var txt=frasePedido();
    function ok(){cb.textContent="Copiado";setTimeout(function(){cb.textContent="Copiar pedido";},1400);}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(ok,fallback);} else fallback();
    function fallback(){
      var ta=document.createElement("textarea");ta.value=txt;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();
      try{document.execCommand("copy");ok();}catch(e){}
      document.body.removeChild(ta);
    }
  });
  render();
})();
