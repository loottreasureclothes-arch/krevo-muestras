/* La mesa que se pone sola: estado de pedido compartido con la carta + mensaje de WhatsApp */
(function(){
  "use strict";
  var DIAS=["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
  var st={modo:"mesa",n:2,zona:"en el salón",dia:null,hora:null};
  var pedido=[]; /* [{id,nombre,qty}] */
  var $=function(i){return document.getElementById(i)};
  var sit,cNum,cTxt,cuenta,selHora,msg,wa,ped,sec;
  function ps(n){return n<=4?23:n<=6?21:n<=8?18.5:n<=10?16:14}
  function rr(n){return n<=2?25:n<=6?27.5:n<=8?29:30}
  function pintaLugares(){
    var n=st.n,have=sit.querySelectorAll(".cm-lugar");
    while(have.length<n){var d=document.createElement("div");d.className="cm-lugar nuevo";d.innerHTML='<span class="cm-silla"></span><span class="cm-pl"><i></i></span>';sit.insertBefore(d,$("cm-centro"));have=sit.querySelectorAll(".cm-lugar");}
    while(have.length>n){have[have.length-1].remove();have=sit.querySelectorAll(".cm-lugar");}
    sit.style.setProperty("--r",rr(n)+"%");
    for(var i=0;i<have.length;i++){
      have[i].style.setProperty("--a",(i*360/n)+"deg");
      have[i].style.setProperty("--ps",ps(n)+"%");
      have[i].querySelector(".cm-silla").style.width=(n>8?11:15)+"%";
      have[i].querySelector(".cm-silla").style.marginLeft=(n>8?-5.5:-7.5)+"%";
    }
    cNum.textContent=n;cTxt.textContent=n===1?"persona":"personas";cuenta.textContent=n;
    $("cm-menos").disabled=n<=1;$("cm-mas").disabled=n>=12;
  }
  function fmtH(h){var hh=Math.floor(h),mm=(h-hh)?"30":"00",ap=hh>=12?"pm":"am",h12=hh>12?hh-12:(hh===0?12:hh);return h12+":"+mm+" "+ap}
  function diaReal(k){var n=CM.hoy();return k==="hoy"?n.dow:k==="manana"?(n.dow+1)%7:k;}
  function slots(k){
    var d=diaReal(k),hr=CM.horario(d),out=[],n=CM.hoy();
    var fin=st.modo==="llevar"?hr.c-.5:hr.c-1;
    for(var h=hr.a;h<=fin;h+=.5){if(k==="hoy"&&h<n.h+.5)continue;out.push(h);}
    return out;
  }
  function opcionesDia(){
    var n=CM.hoy(),res=[];
    if(slots("hoy").length)res.push({k:"hoy",t:"Hoy"});
    res.push({k:"manana",t:"Mañana"});
    var usados={};usados[n.dow]=1;usados[(n.dow+1)%7]=1;
    [6,0].forEach(function(d){if(!usados[d])res.push({k:d,t:d===6?"Sábado":"Domingo"});});
    return res;
  }
  function pintaDias(){
    var box=$("cm-dia"),ops=opcionesDia();
    if(!st.dia||!ops.some(function(o){return o.k===st.dia}))st.dia=ops[0].k;
    box.innerHTML="";
    ops.forEach(function(o){var b=document.createElement("button");b.type="button";b.setAttribute("role","radio");b.textContent=o.t;b.dataset.k=o.k;var on=o.k===st.dia;b.className=on?"is-on":"";b.setAttribute("aria-checked",on);box.appendChild(b);});
  }
  function pintaHoras(){
    var s=slots(st.dia);
    if(!s.length){st.dia="manana";pintaDias();s=slots("manana");}
    var prev=st.hora;
    selHora.innerHTML="";
    s.forEach(function(h){var o=document.createElement("option");o.value=h;o.textContent=fmtH(h);selHora.appendChild(o);});
    var pick=s.indexOf(prev)>=0?prev:(st.modo==="llevar"?s[Math.min(s.length-1,Math.max(0,s.findIndex(function(h){return h>=14})))]:(s.filter(function(h){return h>=14})[0]||s[0]));
    st.hora=pick;selHora.value=pick;
  }
  function diaTxt(){
    var k=st.dia,d=diaReal(k);
    return k==="hoy"?"hoy ("+DIAS[d]+")":k==="manana"?"mañana ("+DIAS[d]+")":"el "+DIAS[d];
  }
  function lista(){return pedido.map(function(p){return p.qty+" x "+p.nombre}).join(", ");}
  function mensaje(){
    var m;
    if(st.modo==="mesa"){
      m="Hola Casa Miguel, quiero apartar mesa para "+st.n+(st.n===1?" persona ":" personas ")+st.zona+", "+diaTxt()+" a las "+fmtH(st.hora)+".";
      if(pedido.length)m+=" Antes de llegar quiero pedir: "+lista()+".";
    }else{
      m="Hola Casa Miguel, quiero pedir para llevar"+(pedido.length?": "+lista()+".":".")+" Paso por él "+diaTxt()+" a las "+fmtH(st.hora)+".";
    }
    return m+" Me confirman por favor.";
  }
  function pintaMsg(){
    var m=mensaje();msg.textContent=m;
    wa.href=CM.waUrl(m);
    wa.textContent=st.modo==="mesa"?"Mandar mi mesa":"Mandar mi pedido";
  }
  function pintaPedido(){
    ped.innerHTML="";
    if(!pedido.length){var li=document.createElement("li");li.className="vacio";li.textContent="Agrega platillos desde la carta para pedirlos de una vez.";ped.appendChild(li);}
    pedido.forEach(function(p){var li=document.createElement("li");li.innerHTML="<b>"+p.qty+"</b> "+p.nombre+' <button type="button" aria-label="Quitar '+p.nombre+'" data-q="'+p.id+'">×</button>';ped.appendChild(li);});
    /* carta */
    [].forEach.call(document.querySelectorAll(".cm-plato"),function(a){
      var id=a.dataset.id,box=a.querySelector("[data-ag]"),item=pedido.filter(function(p){return p.id===id})[0];
      box.innerHTML=item?'<div class="cm-step"><button type="button" data-d="-1" data-id="'+id+'" aria-label="Quitar uno">−</button><output>'+item.qty+'</output><button type="button" data-d="1" data-id="'+id+'" aria-label="Agregar otro">+</button></div>':'<button type="button" data-d="1" data-id="'+id+'">Agregar</button>';
    });
    var v=$("cm-ver-mesa");if(v)v.hidden=!pedido.length;
  }
  function cambia(id,nombre,d){
    var it=pedido.filter(function(p){return p.id===id})[0];
    if(!it&&d>0)pedido.push({id:id,nombre:nombre,qty:1});
    else if(it){it.qty+=d;if(it.qty<=0)pedido.splice(pedido.indexOf(it),1);}
    pintaPedido();pintaMsg();
  }
  function setModo(m){
    st.modo=m;sec.classList.toggle("is-llevar",m==="llevar");
    [].forEach.call(document.querySelectorAll(".cm-modo button"),function(b){var on=b.dataset.modo===m;b.classList.toggle("is-on",on);b.setAttribute("aria-selected",on);});
    [].forEach.call(document.querySelectorAll("[data-solo]"),function(c){c.hidden=c.dataset.solo!==m;});
    $("cm-hora-l").textContent=m==="mesa"?"A qué hora llegan":"A qué hora pasas";
    pintaDias();pintaHoras();pintaMsg();
  }
  function init(){
    sec=$("mesa");if(!sec)return;
    sit=$("cm-sitios");cNum=$("cm-n");cTxt=$("cm-n-t");cuenta=$("cm-cuenta-n");selHora=$("cm-hora");msg=$("cm-msg");wa=$("cm-wa");ped=$("cm-pedido");
    pintaLugares();
    [].forEach.call(sit.querySelectorAll(".cm-lugar"),function(l){l.classList.remove("nuevo");});
    setModo("mesa");pintaPedido();
    $("cm-mas").addEventListener("click",function(){if(st.n<12){st.n++;pintaLugares();pintaMsg();}});
    $("cm-menos").addEventListener("click",function(){if(st.n>1){st.n--;pintaLugares();pintaMsg();}});
    $("cm-zona").addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;st.zona=b.dataset.v;[].forEach.call($("cm-zona").children,function(x){var on=x===b;x.classList.toggle("is-on",on);x.setAttribute("aria-checked",on);});pintaMsg();});
    $("cm-dia").addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;var k=b.dataset.k;st.dia=(k==="hoy"||k==="manana")?k:parseInt(k,10);pintaDias();pintaHoras();pintaMsg();});
    selHora.addEventListener("change",function(){st.hora=parseFloat(selHora.value);pintaMsg();});
    document.querySelector(".cm-modo").addEventListener("click",function(e){var b=e.target.closest("button");if(b)setModo(b.dataset.modo);});
    ped.addEventListener("click",function(e){var b=e.target.closest("button[data-q]");if(!b)return;var i=pedido.findIndex(function(p){return p.id===b.dataset.q});if(i>=0)pedido.splice(i,1);pintaPedido();pintaMsg();});
    document.addEventListener("click",function(e){
      var b=e.target.closest(".cm-ag button");if(!b)return;
      var a=b.closest(".cm-plato");cambia(a.dataset.id,a.dataset.nombre,parseInt(b.dataset.d,10));
    });
    /* cada minuto se revisa que la hora elegida siga vigente */
    setInterval(function(){pintaDias();pintaHoras();pintaMsg();},60000);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
