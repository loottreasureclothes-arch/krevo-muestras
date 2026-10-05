(function(){
  "use strict";
  var WA="524495420025";
  var bal=document.getElementById("bal"); if(!bal) return;
  var rng=document.getElementById("bal-rng"), kg=document.getElementById("bal-kg"),
      pesaT=document.getElementById("bal-pesa-t"), plato=document.getElementById("bal-plato"),
      llevas=document.getElementById("bal-t-llevas"), precio=document.getElementById("bal-t-precio"),
      nota=document.getElementById("bal-t-nota"), wa=document.getElementById("bal-wa");
  var STOPS=[
    {n:"Elige arriba",corto:"",s:0.0,
     precio:"Elige arriba",nota:"Mueve la pesa para empezar."},
    {n:"¼ kg de carnitas",corto:"¼ kg",s:0.62,precio:"Pregunta el precio",nota:"El cuarto no trae paquete. Te dicen el precio al contestar."},
    {n:"½ kg de carnitas",corto:"½ kg",s:0.82,precio:"$195",nota:"Paquete del cartel: ½ guacamole, ½ nopalitos y 3 refrescos o aguas.",paq:"Paquete de ½ kilo ($195)"},
    {n:"1 kg de carnitas",corto:"1 kg",s:1.0,precio:"$380",nota:"Paquete del cartel: guacamole, nopalitos y 6 refrescos o aguas.",paq:"Paquete de 1 kilo ($380)"},
    {n:"2 kg de carnitas",corto:"2 kg",s:1.18,precio:"Pregunta el precio",nota:"Para dos kilos te dicen el precio al contestar."}
  ];
  var modo="Para llevar", extras=[];
  function msg(i){
    var st=STOPS[i], p=["Hola Los Casitos, quiero hacer un pedido."];
    if(i>0){
      p.push("Quiero "+st.n+" ("+modo.toLowerCase()+")"+(st.paq?", el "+st.paq:"")+".");
    }else{
      p.push("Todavía no sé cuánto. ¿Qué me recomiendan? ("+modo.toLowerCase()+").");
    }
    if(extras.length) p.push("Con: "+extras.join(", ")+".");
    p.push("¿Cuánto tardan?");
    return p.join(" ");
  }
  function paint(i,animar){
    var st=STOPS[i];
    kg.textContent=st.n==="Elige arriba"?"Elige arriba":st.corto;
    pesaT.textContent=st.corto||"0";
    plato.style.transform="scale("+(st.s||0.55)+")"; plato.style.opacity=st.s?1:.28;
    llevas.textContent=i? st.n+(extras.length?" + "+extras.length+(extras.length===1?" extra":" extras"):"") : "Elige arriba";
    precio.textContent=st.precio;
    nota.textContent=st.nota+(extras.length&&i?" Los extras se cotizan al contestar.":"");
    rng.setAttribute("aria-valuetext",st.n);
    wa.href="https://wa.me/"+WA+"?text="+encodeURIComponent(msg(i));
    if(animar){ bal.classList.remove("pesando"); void bal.offsetWidth; bal.classList.add("pesando"); }
  }
  rng.addEventListener("input",function(){ paint(+rng.value,true); });
  Array.prototype.forEach.call(bal.querySelectorAll("[data-modo]"),function(b){
    b.addEventListener("click",function(){
      modo=b.getAttribute("data-modo");
      Array.prototype.forEach.call(bal.querySelectorAll("[data-modo]"),function(x){x.setAttribute("aria-checked",x===b?"true":"false");});
      paint(+rng.value,false);
    });
  });
  Array.prototype.forEach.call(bal.querySelectorAll("[data-extra]"),function(b){
    b.addEventListener("click",function(){
      var v=b.getAttribute("data-extra"), on=b.getAttribute("aria-pressed")!=="true";
      b.setAttribute("aria-pressed",on?"true":"false");
      extras=extras.filter(function(x){return x!==v;}); if(on) extras.push(v);
      paint(+rng.value,false);
    });
  });
  paint(0,false);
})();
