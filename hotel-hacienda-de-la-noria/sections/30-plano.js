(function(){
  var root=document.getElementById("armar");if(!root)return;
  var mapa=document.querySelector(".mapa");
  var S={zona:"",tipo:"",noches:1,dia:""};
  var ROOMS={
    "jardin-pareja":["Estándar, 1 cama king, vista al jardín","Para dos, mirando el jardín."],
    "jardin-familia":["Estándar cuádruple, 2 camas dobles, vista al jardín","Hasta cuatro, mirando el jardín."],
    "alberca-pareja":["Superior, 1 cama king, junto a la alberca","Para dos, a unos pasos del agua."],
    "alberca-familia":["Junior cuádruple, 2 camas dobles, vista a la alberca","Hasta cuatro, con la alberca enfrente."]};
  var FOTO={jardin:["img/jardin-640.webp","Jardín con fuente del hotel"],alberca:["img/alberca-639.webp","Alberca con sombrillas"]};
  var vista=document.getElementById("vista"),txt=document.getElementById("res-txt"),call=document.getElementById("res-call"),
      nv=document.getElementById("n-val"),ok=document.getElementById("res-ok"),diasEl=document.getElementById("dias");
  var DN=["dom","lun","mar","mié","jue","vie","sáb"],DL=["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
      MN=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  var hoy=new Date();hoy.setHours(0,0,0,0);
  var fechas={};
  for(var i=0;i<14;i++){
    var f=new Date(hoy);f.setDate(hoy.getDate()+i);var key=f.toISOString().slice(0,10);
    var txtF=(i===0?"hoy, ":"")+DL[f.getDay()]+" "+f.getDate()+" de "+MN[f.getMonth()];
    fechas[key]=txtF;
    var b=document.createElement("button");b.type="button";b.className="dia";b.setAttribute("aria-pressed","false");b.setAttribute("data-dia",key);
    b.innerHTML=DN[f.getDay()]+"<b>"+f.getDate()+"</b>"+MN[f.getMonth()];
    diasEl.appendChild(b);
  }
  function pinta(){
    mapa.setAttribute("data-z",S.zona);
    [].forEach.call(root.querySelectorAll(".opt"),function(o){o.setAttribute("aria-pressed",String(S[o.getAttribute("data-k")]===o.getAttribute("data-v")))});
    [].forEach.call(diasEl.children,function(o){o.setAttribute("aria-pressed",String(o.getAttribute("data-dia")===S.dia))});
    nv.textContent=S.noches+(S.noches===1?" noche":" noches");
    var r=ROOMS[S.zona+"-"+S.tipo];
    if(S.zona){
      var fz=FOTO[S.zona];
      vista.innerHTML='<img src="'+fz[0]+'" alt="'+fz[1]+'" width="640" height="360"><h3>'+(r?r[0]:(S.zona==="jardin"?"Vista al jardín":"Junto a la alberca"))+'</h3><p>'+(r?r[1]:"Ahora elige quiénes van.")+'</p>';
    }else vista.innerHTML='<p class="vista-vacio">Elige arriba</p>';
    var listo=r&&S.dia;
    if(listo){
      var msg="Hola, quiero cuarto "+r[0].toLowerCase()+", "+nv.textContent+", llegada "+fechas[S.dia]+". ¿Cuál es la tarifa?";
      txt.textContent=msg;S.msg=msg;
    }else{txt.textContent="Elige arriba";S.msg="";}
    ok.textContent="";
  }
  root.addEventListener("click",function(e){
    var o=e.target.closest(".opt");if(o){S[o.getAttribute("data-k")]=o.getAttribute("data-v");pinta();return}
    var dd=e.target.closest(".dia");if(dd){S.dia=dd.getAttribute("data-dia");pinta()}
  });
  document.getElementById("n-menos").addEventListener("click",function(){S.noches=Math.max(1,S.noches-1);pinta()});
  document.getElementById("n-mas").addEventListener("click",function(){S.noches=Math.min(14,S.noches+1);pinta()});
  [].forEach.call(mapa.querySelectorAll(".pl-zona"),function(z){z.addEventListener("click",function(){S.zona=z.getAttribute("data-zona");pinta()})});
  document.getElementById("res-copy").addEventListener("click",function(){
    if(!S.msg){ok.textContent="Elige arriba para armar tu resumen.";return}
    function listo(){ok.textContent="Copiado. Pégalo cuando llames."}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(S.msg).then(listo,function(){ok.textContent="No se pudo copiar; selecciona el texto."})}
    else{var t=document.createElement("textarea");t.value=S.msg;document.body.appendChild(t);t.select();try{document.execCommand("copy");listo()}catch(x){ok.textContent="No se pudo copiar."}t.remove()}
  });
  pinta();
})();
