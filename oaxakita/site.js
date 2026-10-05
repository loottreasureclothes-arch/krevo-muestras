(function(){
  "use strict";
  var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var doc=document.documentElement,body=document.body;
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* menu */
  var btn=$("#hd-btn");
  function setMenu(o){body.classList.toggle("menu-open",o);btn.setAttribute("aria-expanded",o)}
  btn.addEventListener("click",function(){setMenu(!body.classList.contains("menu-open"))});
  $$("#hd-menu a").forEach(function(a){a.addEventListener("click",function(){setMenu(false)})});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")setMenu(false)});

  /* abierto ahora (hora de Aguascalientes) */
  var H={0:[8,21],1:[8,23],2:[8,23],3:[8,23],4:[8,23],5:[8,23],6:[8,23]};
  function now(){
    try{
      var p=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date());
      var o={};p.forEach(function(x){o[x.type]=x.value});
      var d={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[o.weekday];
      return {d:d,h:(parseInt(o.hour,10)%24)+parseInt(o.minute,10)/60};
    }catch(e){var n=new Date();return {d:n.getDay(),h:n.getHours()+n.getMinutes()/60}}
  }
  function paintOpen(){
    var n=now(),r=H[n.d],open=n.h>=r[0]&&n.h<r[1];
    var b=$("[data-open-now-badge]");
    if(b){b.classList.toggle("is-open",open);b.textContent=open?"Abierto ahora · hasta las "+r[1]+":00":"Cerrado ahora · abre "+(n.h<r[0]?"hoy":"mañana")+" a las 8:00"}
    var hn=$("[data-open-now]");
    if(hn){hn.innerHTML=open?"<b>Abierto ahora</b> · hasta las "+r[1]+":00":"Cerrado ahora · abre a las 8:00"}
    $$("#hours li").forEach(function(li){li.classList.toggle("today",+li.getAttribute("data-day")===n.d)});
  }
  paintOpen();

  /* carta: pestañas */
  var tabs=$$(".tab");
  function selTab(k,focus){
    tabs.forEach(function(t){var on=t.getAttribute("data-tab")===k;t.setAttribute("aria-selected",on);t.tabIndex=on?0:-1;if(on&&focus)t.focus()});
    $$(".panel").forEach(function(p){p.hidden=p.id!=="p-"+k});
  }
  tabs.forEach(function(t,i){
    t.addEventListener("click",function(){selTab(t.getAttribute("data-tab"))});
    t.addEventListener("keydown",function(e){
      var j=e.key==="ArrowRight"?i+1:e.key==="ArrowLeft"?i-1:-1;
      if(j>=0&&j<tabs.length){e.preventDefault();selTab(tabs[j].getAttribute("data-tab"),true)}
    });
  });
  var tabBar=$(".tabs");
  function tabEnd(){if(tabBar)tabBar.classList.toggle("at-end",tabBar.scrollLeft+tabBar.clientWidth>=tabBar.scrollWidth-8)}
  if(tabBar){tabBar.addEventListener("scroll",tabEnd,{passive:true});window.addEventListener("resize",tabEnd);tabEnd()}
  tabs.forEach(function(t){t.addEventListener("click",function(){if(t.scrollIntoView&&tabBar.scrollWidth>tabBar.clientWidth){tabBar.scrollTo({left:t.offsetLeft-tabBar.clientWidth/2+t.offsetWidth/2})}})});
  $$("[data-goto]").forEach(function(a){a.addEventListener("click",function(){selTab(a.getAttribute("data-goto"))})});

  /* pedido */
  var KEY="oaxakita-pedido",cart=[];
  try{cart=JSON.parse(localStorage.getItem(KEY)||"[]");if(!Array.isArray(cart))cart=[]}catch(e){cart=[]}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(cart))}catch(e){}}
  function money(n){return "$"+n.toLocaleString("es-MX")}
  function total(){return cart.reduce(function(s,i){return s+i.price*i.qty},0)}
  function addItem(id,name,price,qty){
    var f=cart.filter(function(i){return i.id===id})[0];
    if(f)f.qty+=qty;else cart.push({id:id,name:name,price:price,qty:qty});
    save();render();
  }
  function orderText(){
    var l=cart.map(function(i){return i.qty+" x "+i.name+" ("+money(i.price*i.qty)+")"});
    return "Hola, quiero pedir en Oaxakita: "+l.join("; ")+". Total: "+money(total())+".";
  }
  var tkList=$("#tkList"),tkEmpty=$("#tkEmpty"),tkTotal=$("#tkTotal"),tkCopy=$("#tkCopy"),tkClear=$("#tkClear"),tkOk=$("#tkOk");
  function render(){
    var n=cart.reduce(function(s,i){return s+i.qty},0);
    $$("[data-cart-count]").forEach(function(e){e.textContent=n});
    var hp=$("#hd-pedido");if(hp)hp.hidden=n===0;
    tkList.innerHTML="";
    cart.forEach(function(i,ix){
      var li=document.createElement("li");
      li.innerHTML='<span class="n"></span><span class="p"></span><div class="c"><button type="button" data-d="-1" aria-label="Quitar uno">−</button><output></output><button type="button" data-d="1" aria-label="Agregar uno">+</button><button type="button" class="rm" data-rm="1">Quitar</button></div>';
      li.querySelector(".n").textContent=i.name;
      li.querySelector(".p").textContent=money(i.price*i.qty);
      li.querySelector("output").textContent=i.qty;
      li.addEventListener("click",function(e){
        var t=e.target.closest("button");if(!t)return;
        if(t.getAttribute("data-rm")){cart.splice(ix,1)}
        else{i.qty+=parseInt(t.getAttribute("data-d"),10);if(i.qty<1)cart.splice(ix,1)}
        save();render();
      });
      tkList.appendChild(li);
    });
    var has=cart.length>0;
    tkEmpty.hidden=has;
    tkTotal.textContent=has?money(total()):"Elige arriba";
    tkCopy.disabled=!has;tkClear.hidden=!has;
  }
  $$("[data-add]").forEach(function(b){
    b.addEventListener("click",function(){
      addItem(b.getAttribute("data-id"),b.getAttribute("data-name"),+b.getAttribute("data-price"),1);
      var t=b.textContent;b.textContent="Agregado";b.classList.add("ok");
      setTimeout(function(){b.textContent=t;b.classList.remove("ok")},1200);
    });
  });
  tkClear.addEventListener("click",function(){cart=[];save();render();tkOk.textContent=""});
  tkCopy.addEventListener("click",function(){
    var t=orderText();
    function done(){tkOk.textContent="Pedido copiado. Llama y dicta, o léelo tal cual."}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,function(){fallback(t,done)})}else fallback(t,done);
  });
  function fallback(t,cb){var a=document.createElement("textarea");a.value=t;a.style.cssText="position:fixed;opacity:0";document.body.appendChild(a);a.select();try{document.execCommand("copy");cb()}catch(e){tkOk.textContent=t}document.body.removeChild(a)}

  /* constructor de tlayuda */
  var plate=$("#plate"),cap=$("#plate-cap"),chk=$("#chapChk"),qv=$("#qVal"),qty=1,add=$("#tlAdd");
  var plateImg=$(".plate-img");
  function cur(){return $('input[name=tl]:checked')}
  function upd(){
    var r=cur();
    plate.classList.toggle("has-chap",chk.checked);
    plate.setAttribute("data-state",r?"picked":"idle");
    add.disabled=!r;
    if(!r){cap.textContent="Elige arriba";return}
    var p=+r.getAttribute("data-price")+(chk.checked?25:0);
    cap.textContent="Tlayuda "+r.value+(chk.checked?" con chapulines":"")+" · "+money(p*qty);
  }
  $$('input[name=tl]').forEach(function(r){r.addEventListener("change",upd)});
  chk.addEventListener("change",upd);
  $("#qMinus").addEventListener("click",function(){qty=Math.max(1,qty-1);qv.textContent=qty;upd()});
  $("#qPlus").addEventListener("click",function(){qty=Math.min(20,qty+1);qv.textContent=qty;upd()});
  add.addEventListener("click",function(){
    var r=cur();if(!r)return;
    var ch=chk.checked,p=+r.getAttribute("data-price")+(ch?25:0);
    addItem("tl-"+r.value+(ch?"-c":""),"Tlayuda "+r.value+(ch?" con chapulines":""),p,qty);
    var t=add.textContent;add.textContent="Agregado";setTimeout(function(){add.textContent=t},1200);
    qty=1;qv.textContent=1;upd();
    var tk=$("#ticket");if(tk&&tk.scrollIntoView&&window.innerWidth<760)tk.scrollIntoView({block:"center"});
  });
  upd();render();

  /* flotante */
  var offZones=$$("#visitanos .btns,.foot");
  function fabCheck(){
    var fab=$("#fab"),vh=window.innerHeight,hit=offZones.some(function(z){var r=z.getBoundingClientRect();return r.top<vh-20&&r.bottom>vh-100});
    fab.classList.toggle("off",hit);
  }
  window.addEventListener("scroll",fabCheck,{passive:true});window.addEventListener("resize",fabCheck);fabCheck();

  /* reveal + momento firma (ventana que se abre en arco) */
  if(!reduce&&"IntersectionObserver" in window){
    doc.classList.add("rv");
    var els=$$("[data-reveal]"),bleed=$("#bleed");
    if(bleed)els.push(bleed);
    els.forEach(function(e){e.classList.add("pre")});
    var io=new IntersectionObserver(function(en){en.forEach(function(x){
      if(x.target.id==="bleed"){x.target.classList.toggle("pre",!x.isIntersecting||x.intersectionRatio<.35)}
      else if(x.isIntersecting){x.target.classList.add("in")}
    })},{threshold:[0,.35],rootMargin:"0px 0px -6% 0px"});
    els.forEach(function(e){io.observe(e)});
    setTimeout(function(){els.forEach(function(e){var r=e.getBoundingClientRect();if(r.top<window.innerHeight&&r.bottom>0){e.classList.add("in");e.classList.remove("pre")}})},1600);
  }
})();
