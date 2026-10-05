(function(){
  var root=document.getElementById("llv"); if(!root) return;
  var st={room:"Cama matrimonial",pers:2,noch:1,via:"en camión",fecha:""};
  var $=function(s){return root.querySelector(s)};
  var img=$("#llv-img"),line=$("#llv-line"),body=$("#tk-body"),ok=$("#llv-ok"),inp=$("#f-fecha");
  function fmt(iso){ if(!iso) return ""; var p=iso.split("-"); var d=new Date(+p[0],+p[1]-1,+p[2]);
    var dias=["dom","lun","mar","mié","jue","vie","sáb"],ms=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
    return dias[d.getDay()]+" "+d.getDate()+" "+ms[d.getMonth()]; }
  function resumen(){
    var f=st.fecha?fmt(st.fecha):"fecha por confirmar";
    return "Cuarto: "+st.room+". "+st.pers+(st.pers===1?" persona":" personas")+". Llegada: "+f+". "+st.noch+(st.noch===1?" noche":" noches")+". Llego "+st.via+".";
  }
  function paint(){
    $("#o-pers").textContent=st.pers+(st.pers===1?" persona":" personas");
    $("#o-noch").textContent=st.noch+(st.noch===1?" noche":" noches");
    line.textContent=st.room+" · "+st.pers+" p. · "+st.noch+" n.";
    body.textContent=resumen();
  }
  var d=new Date(); var iso=d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2);
  inp.min=iso;
  function pick(group,attr,cb){
    Array.prototype.forEach.call(group.querySelectorAll(".chip"),function(b){
      b.addEventListener("click",function(){
        Array.prototype.forEach.call(group.querySelectorAll(".chip"),function(x){x.classList.remove("is-on");x.setAttribute("aria-checked","false")});
        b.classList.add("is-on");b.setAttribute("aria-checked","true");cb(b);paint();
      });
    });
  }
  var groups=root.querySelectorAll(".chips");
  pick(groups[0],"room",function(b){st.room=b.getAttribute("data-room");var src=b.getAttribute("data-img");
    img.classList.add("sw");setTimeout(function(){img.src=src;img.classList.remove("sw")},180);});
  pick(groups[1],"via",function(b){st.via=b.getAttribute("data-via")});
  Array.prototype.forEach.call(root.querySelectorAll(".step"),function(s){
    var k=s.getAttribute("data-step"),mn=+s.getAttribute("data-min"),mx=+s.getAttribute("data-max");
    Array.prototype.forEach.call(s.querySelectorAll("button"),function(b){
      b.addEventListener("click",function(){st[k]=Math.max(mn,Math.min(mx,st[k]+(+b.getAttribute("data-d"))));paint();});
    });
  });
  inp.addEventListener("change",function(){st.fecha=inp.value;paint();});
  $("#llv-copy").addEventListener("click",function(){
    var t="Hola, quiero apartar en Hotel Argentina. "+resumen()+" Tarifa: pregunto el precio.";
    function done(m){ok.textContent=m;setTimeout(function(){ok.textContent=""},3500)}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){done("Resumen copiado. Pégalo en tu mensaje.")},function(){fb()});}else fb();
    function fb(){var ta=document.createElement("textarea");ta.value=t;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();try{document.execCommand("copy");done("Resumen copiado. Pégalo en tu mensaje.")}catch(e){done("Dícteselo al recepcionista: "+t)}document.body.removeChild(ta);}
  });
  var wl=document.getElementById("llv-wa");
  function wam(){
    var t=st.fecha?"Hola, quiero reservar en Hotel Argentina. "+resumen()+" ¿Cuál es la tarifa?":"Hola, quiero reservar una habitación en Hotel Argentina. ¿Qué fechas tienen disponibles?";
    return "https://wa.me/524495237440?text="+encodeURIComponent(t);
  }
  var _p=paint; paint=function(){_p();if(wl)wl.href=wam()};
  paint();
})();
