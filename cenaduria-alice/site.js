(function(){
  "use strict";
  var TEL="+524492584516";
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};

  /* menu */
  function initMenu(){
    var b=$(".hd-btn"),m=$("#hd-menu");if(!b||!m)return;
    function set(o){b.setAttribute("aria-expanded",o?"true":"false");if(o)m.removeAttribute("hidden");else m.setAttribute("hidden","")}
    if(window.matchMedia("(min-width:900px)").matches)m.removeAttribute("hidden");
    b.addEventListener("click",function(){set(b.getAttribute("aria-expanded")!=="true")});
    m.addEventListener("click",function(e){if(e.target.closest("a")&&!window.matchMedia("(min-width:900px)").matches)set(false)});
    document.addEventListener("keydown",function(e){if(e.key==="Escape")set(false)});
  }

  /* visibilidad por sondeo (sin IntersectionObserver) */
  function watch(list,frac,cb){
    var pend=list.slice(),raf=null;
    function tick(){raf=null;var vh=innerHeight;for(var i=pend.length-1;i>=0;i--){var r=pend[i].getBoundingClientRect();if(r.top<vh*frac&&r.bottom>0){var el=pend.splice(i,1)[0];cb(el)}}if(pend.length)sch()}
    function sch(){if(!raf)raf=requestAnimationFrame(tick)}
    sch();addEventListener("scroll",sch,{passive:true});addEventListener("resize",sch);
    setTimeout(function(){pend.splice(0).forEach(cb)},4000);
  }
  function initReveal(){
    var els=$$("[data-reveal]");function show(el){el.classList.add("is-in")}
    if(reduce){els.forEach(show);return}
    watch(els,.92,function(el){setTimeout(function(){show(el)},40);});
    /* seguro: a los 1.6 s de entrar, visible pase lo que pase */
    watch(els,.92,function(el){setTimeout(function(){show(el)},1600)});
  }

  /* flotante de llamar se esconde donde ya hay botones grandes */
  function initFab(){
    var z=$$("#visitanos,#pie");if(!z.length)return;var raf=null;
    function up(){raf=null;var on=false;z.forEach(function(e){var r=e.getBoundingClientRect();if(r.top<innerHeight*.75&&r.bottom>0)on=true});document.body.classList.toggle("fab-off",on)}
    function sch(){if(!raf)raf=requestAnimationFrame(up)}
    sch();addEventListener("scroll",sch,{passive:true});addEventListener("resize",sch);
  }

  /* horario y "Abierto ahora" (hora de Aguascalientes) */
  var H=[[1110,1395],null,[1110,1395],[1110,1395],[1110,1395],[1140,1410],[1140,1410]]; /* dom..sab; lun cerrado */
  H=[[1110,1395],null,[1110,1395],[1110,1395],[1110,1395],[1140,1410],[1140,1410]];
  var DIAS=["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
  function hm(n){var h=Math.floor(n/60),m=n%60;return h+":"+(m<10?"0":"")+m}
  function ahora(){
    try{
      var p=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"2-digit",minute:"2-digit",hour12:false}).formatToParts(new Date()),o={};
      p.forEach(function(x){o[x.type]=x.value});
      var d=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(o.weekday);var h=parseInt(o.hour,10)%24;
      return {d:d,t:h*60+parseInt(o.minute,10)};
    }catch(e){var n=new Date();return {d:n.getDay(),t:n.getHours()*60+n.getMinutes()}}
  }
  function estado(){
    var n=ahora(),h=H[n.d],open=h&&n.t>=h[0]&&n.t<h[1],txt;
    if(open)txt={open:true,t:"Abierto ahora · cierra a las "+hm(h[1])};
    else if(h&&n.t<h[0])txt={open:false,t:"Cerrado ahora · abre hoy a las "+hm(h[0])};
    else{var k=1;while(k<8&&!H[(n.d+k)%7])k++;var nd=(n.d+k)%7;txt={open:false,t:"Cerrado ahora · abre "+(k===1?"mañana":"el "+DIAS[nd])+" a las "+hm(H[nd][0])}}
    return txt;
  }
  function initHorario(){
    var e=estado();
    $$("[data-estado]").forEach(function(el){el.textContent=e.t;el.classList.toggle("is-open",e.open)});
    var n=ahora();$$("[data-dia]").forEach(function(li){if(parseInt(li.getAttribute("data-dia"),10)===n.d){li.classList.add("hoy");li.setAttribute("aria-current","date")}});
  }

  /* la puerta chica: el arco se abre al entrar, reversible */
  function initPuerta(){
    var el=$(".puerta");if(!el)return;
    function chk(){var r=el.getBoundingClientRect(),vh=innerHeight;if(r.top<vh*.75&&r.bottom>vh*.1)el.classList.add("is-open");else if(r.top>vh||r.bottom<0)el.classList.remove("is-open")}
    if(reduce){el.classList.add("is-open");return}
    var raf=null;function sch(){if(!raf)raf=requestAnimationFrame(function(){raf=null;chk()})}
    sch();addEventListener("scroll",sch,{passive:true});addEventListener("resize",sch);
    setTimeout(function(){el.classList.add("is-open")},1600+200);
    /* seguro: si nada la ha abierto a los 4 s, queda abierta */
    setTimeout(function(){if(el.getBoundingClientRect().top<innerHeight)el.classList.add("is-open")},4000);
  }

  /* la lotería de la cena */
  function initLoteria(){
    var root=$("#loteria");if(!root)return;
    var cards=$$(".lt-card",root),ticket=$(".lt-lines",root),empty=$(".lt-empty",root),stamp=$(".lt-stamp",root),copy=$(".lt-copy",root),say=$(".lt-say",root),callBtn=$(".lt-call",root);
    var N=cards.map(function(){return 0});
    var LINES=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    function name(i){return cards[i].getAttribute("data-name")}
    function lista(){var o=[];N.forEach(function(n,i){if(n)o.push(n+" "+name(i).toLowerCase())});return o}
    function wa(){return "https://wa.me/524492584516?text="+encodeURIComponent(l0().length?msg():"Hola, Cenaduría ALICE. Quiero cenar.")}
    function l0(){return lista()}
    function msg(){var l=lista();return "Hola, Cenaduría ALICE. Quiero cenar: "+l.join(", ")+". ¿Me dicen el precio?"}
    function paint(i){
      var c=cards[i],b=$(".lt-beans",c);b.innerHTML="";
      for(var k=0;k<N[i];k++){var s=document.createElement("span");s.className="lt-bean";s.style.setProperty("--k",k);b.appendChild(s)}
      c.setAttribute("aria-pressed",N[i]?"true":"false");c.classList.toggle("on",N[i]>0);
      c.setAttribute("aria-label",name(i)+", "+N[i]+(N[i]===1?" plato":" platos")+". Toca para cambiar");
    }
    function sync(){
      var l=lista();ticket.innerHTML="";
      N.forEach(function(n,i){if(n){var li=document.createElement("li");li.innerHTML="<b></b><span></span>";li.firstChild.textContent=n+" ×";li.lastChild.textContent=name(i);ticket.appendChild(li)}});
      empty.hidden=l.length>0;if(callBtn)callBtn.href=wa();copy.disabled=!l.length;copy.setAttribute("aria-disabled",l.length?"false":"true");
      var win=LINES.some(function(L){return L.every(function(i){return N[i]>0})});
      stamp.hidden=!win;
      say.textContent="";
    }
    cards.forEach(function(c,i){
      c.addEventListener("click",function(){N[i]=(N[i]+1)%4;paint(i);sync();if(N[i]){c.classList.remove("drop");void c.offsetWidth;c.classList.add("drop")}});
    });
    copy.addEventListener("click",function(){
      if(!lista().length)return;var t=msg();
      function ok(){say.textContent="Copiado. Pégalo cuando contesten."}
      if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(ok,function(){fb(t,ok)});else fb(t,ok);
    });
    function fb(t,ok){var a=document.createElement("textarea");a.value=t;a.setAttribute("readonly","");a.style.cssText="position:fixed;opacity:0";document.body.appendChild(a);a.select();try{document.execCommand("copy");ok()}catch(e){say.textContent="No pude copiar. Escríbelo en el chat."}a.remove()}
    cards.forEach(function(_,i){paint(i)});sync();
  }

  function init(){initMenu();initReveal();initFab();initHorario();initPuerta();initLoteria()}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
