(function(){
  var svg=document.getElementById("arch");if(!svg)return;
  var NS="http://www.w3.org/2000/svg";
  var TIPOS=[["central",36],["lateral",28],["colmillo",30],["premolar",30]];
  var MODOS={chuecos:["#5fe0e6","C"],separados:["#ffd166","S"],manchados:["#d9a066","M"],rotos:["#ff8a80","R"]};
  var modo="chuecos",marks={},H=56;
  function el(n,a){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);return e}
  function shape(w){var h=H/2,x=w/2;return "M"+(-x)+","+(-h+9)+" Q"+(-x)+","+(-h)+" "+(-x+9)+","+(-h)+" L"+(x-9)+","+(-h)+" Q"+x+","+(-h)+" "+x+","+(-h+9)+" L"+x+","+(h-w*.32)+" Q"+x+","+h+" "+w*.2+","+h+" L"+(-w*.2)+","+h+" Q"+(-x)+","+h+" "+(-x)+","+(h-w*.32)+" Z"}
  var teeth=[];
  [-1,1].forEach(function(side){var off=2;TIPOS.forEach(function(t){var w=t[1],cx=side*(off+w/2);off+=w+3;
    [["superior",1],["inferior",-1]].forEach(function(a){
      var edge=a[1]>0?140-.0016*cx*cx:160+.0016*cx*cx;
      var cy=a[1]>0?edge-H/2:edge+H/2;
      var ang=Math.atan(-.0032*cx)*180/Math.PI;
      teeth.push({id:t[0]+a[0]+side,name:t[0]+" "+a[0]+" "+(side<0?"derecho":"izquierdo"),w:w,x:200+cx,y:cy,ang:ang,flip:a[1]<0,mk:null});
    })})});
  var defs=el("defs",{});defs.innerHTML='<linearGradient id="tgr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#eef7f6"/><stop offset="1" stop-color="#c7dcdc"/></linearGradient><linearGradient id="ggr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9808c"/><stop offset="1" stop-color="#a94f5f"/></linearGradient>';svg.appendChild(defs);
  function arc(f){var d="";for(var c=-158;c<=158;c+=4){d+=(c===-158?"M":"L")+(200+c)+","+f(c).toFixed(1)+" "}return d}
  svg.appendChild(el("path",{"class":"gum",d:arc(function(c){return 140-.0016*c*c-H+4})}));
  svg.appendChild(el("path",{"class":"gum",d:arc(function(c){return 160+.0016*c*c+H-4})}));
  var g0=el("g",{});svg.appendChild(g0);
  teeth.forEach(function(t){
    var g=el("g",{"class":"tooth",tabindex:"0",role:"button","aria-pressed":"false","aria-label":t.name});
    var tr="translate("+t.x.toFixed(1)+","+t.y.toFixed(1)+")"+(t.flip?" scale(1,-1)":"")+" rotate("+(t.flip?t.ang:t.ang).toFixed(1)+")";
    var gi=el("g",{transform:tr});var gg=el("g",{"class":"tg"});
    gg.appendChild(el("path",{d:shape(t.w)}));gg.appendChild(el("path",{"class":"shine",d:"M"+(-t.w/2+7)+","+(-H/2+12)+" Q"+(-t.w/2+6)+",0 "+(-t.w/2+9)+","+(H/2-14)}));
    var tx=el("text",{"text-anchor":"middle",y:t.flip?-5:5,transform:t.flip?"scale(1,-1)":""});gg.appendChild(tx);
    gi.appendChild(gg);g.appendChild(gi);g0.appendChild(g);t.g=g;t.tx=tx;
    function toggle(){
      if(t.mk===modo){t.mk=null}else{t.mk=modo}
      paint(t);g.classList.add("pop");setTimeout(function(){g.classList.remove("pop")},220);update();
    }
    g.addEventListener("click",function(){svg.parentNode.classList.add("used");toggle()});
    g.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();toggle()}});
  });
  function paint(t){
    if(t.mk){t.g.classList.add("on");t.g.style.setProperty("--c",MODOS[t.mk][0]);t.tx.textContent=MODOS[t.mk][1];t.g.setAttribute("aria-pressed","true")}
    else{t.g.classList.remove("on");t.tx.textContent="";t.g.setAttribute("aria-pressed","false")}
  }
  var live=document.getElementById("smile-live"),wa=document.getElementById("smile-wa"),base="Hola Dr. Ilich, quiero agendar una valoración.";
  function update(){
    var by={},n=0;teeth.forEach(function(t){if(t.mk){(by[t.mk]=by[t.mk]||[]).push(t.name);n++}});
    var parts=[];Object.keys(MODOS).forEach(function(k){if(by[k])parts.push(k.charAt(0).toUpperCase()+k.slice(1)+": "+by[k].join(", ")+".")});
    if(!n){live.textContent="Toca un diente para marcarlo.";wa.href="https://wa.me/524492047733?text="+encodeURIComponent(base);return}
    live.textContent="Marcaste "+n+(n===1?" diente":" dientes")+". "+parts.join(" ");
    wa.href="https://wa.me/524492047733?text="+encodeURIComponent("Hola Dr. Ilich, quiero una valoración. Marqué en su página: "+parts.join(" ")+" ¿Qué horario tienen?");
  }
  Array.prototype.forEach.call(document.querySelectorAll(".mode"),function(b){b.addEventListener("click",function(){
    modo=b.getAttribute("data-mode");Array.prototype.forEach.call(document.querySelectorAll(".mode"),function(x){var on=x===b;x.classList.toggle("is-on",on);x.setAttribute("aria-checked",on)})})});
  document.getElementById("smile-clear").addEventListener("click",function(){teeth.forEach(function(t){t.mk=null;paint(t)});update()});
})();
