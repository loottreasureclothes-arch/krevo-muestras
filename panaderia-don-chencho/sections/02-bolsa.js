(function(){
  var P=[
    ["conchas","Conchas blancas"],["cuernos","Cuernos y conchas"],["roscas","Roscas de ajonjolí"],
    ["ajonjoli","Pan de ajonjolí"],["pastel-rosa","Pastel rosa de charola"],["biscocho","Biscocho"],["chocolate","Postre de chocolate"]
  ];
  var q=P.map(function(){return 0}),num=null,grid=document.getElementById("bGrid");
  if(!grid)return;
  var COL=["#d9a441","#e7b866","#b87333","#d98088","#f0d9a8","#8c5a2b"];
  var g=document.getElementById("bBread"),NS="http://www.w3.org/2000/svg",pos=[[70,66],[110,58],[150,66],[90,48],[130,46],[110,34],[60,52],[160,52],[88,30],[134,28],[110,18],[75,36]];
  var circles=pos.map(function(p,i){var c=document.createElementNS(NS,"ellipse");c.setAttribute("cx",p[0]);c.setAttribute("cy",p[1]+16);c.setAttribute("rx",24);c.setAttribute("ry",18);c.setAttribute("fill",COL[i%COL.length]);c.setAttribute("stroke","#8c5a2b");c.setAttribute("stroke-width","2");c.setAttribute("class","bd");g.appendChild(c);return c});
  P.forEach(function(p,i){
    var li=document.createElement("li");li.className="b-card";li.dataset.i=i;
    li.innerHTML='<div class="b-ph"><img src="img/'+p[0]+'-480.webp" srcset="img/'+p[0]+'-480.webp 480w, img/'+p[0]+(p[0]==="cuernos"?'-720.webp 720w':'-960.webp 960w')+'" sizes="(min-width:820px) 220px, 44vw" width="480" height="480" alt="'+p[1]+'"><span class="b-n">0</span></div><h3 class="b-name">'+p[1]+'</h3><p class="b-price">Pregunta el precio</p><div class="b-ctl"><button class="b-add" type="button" aria-label="Agregar '+p[1]+'">Agregar</button><div class="b-step"><button type="button" class="m" aria-label="Quitar uno">−</button><output>0</output><button type="button" class="p" aria-label="Agregar uno más">+</button></div></div>';
    grid.appendChild(li);
  });
  function hora(){var d=new Date(),h=d.getHours(),m=d.getMinutes(),s=h<12?"a. m.":"p. m.";h=h%12||12;return h+":"+(m<10?"0":"")+m+" "+s}
  function render(){
    var total=0,items=[];
    q.forEach(function(n,i){total+=n;if(n)items.push([n,P[i][1]]);
      var c=grid.children[i];c.classList.toggle("has",n>0);c.querySelector(".b-n").textContent=n;c.querySelector("output").textContent=n});
    circles.forEach(function(c,i){c.classList.toggle("on",i<total)});
    document.getElementById("bNum").textContent=total+(total===1?" pieza":" piezas");
    var bar=document.getElementById("bBar");bar.hidden=total===0;document.getElementById("bBarT").textContent=total+(total===1?" pieza":" piezas");
    var L=document.getElementById("tList");
    L.innerHTML=items.length?items.map(function(x){return "<li><span>"+x[1]+"</span><b>×"+x[0]+"</b></li>"}).join(""):'<li class="t-empty">Tu bolsa está vacía. Toca Agregar.</li>';
    if(total&&num===null)num=100+Math.floor(Math.random()*899);
    if(!total)num=null;
    document.getElementById("tN").textContent=num===null?"---":String(num);
    document.getElementById("tH").textContent=hora();
    var s=document.getElementById("bSend"),t=document.getElementById("bSendT");
    if(total){
      var msg="Hola, quiero pasar por pan a Galeana Sur 420. Mi bolsa: "+items.map(function(x){return x[0]+"× "+x[1]}).join(", ")+". Paso a las "+hora()+" (talón "+num+").";
      s.href=DC.url(msg);t.textContent="Mandar mi bolsa por WhatsApp";
    }else{
      s.href=DC.url("Hola, quiero pasar por pan a Galeana Sur 420. ¿Qué tienen recién hecho ahorita?");t.textContent="Pregunta qué hay ahorita";
    }
    var tk=document.getElementById("bTalon");tk.classList.remove("print");void tk.offsetWidth;tk.classList.add("print");
  }
  grid.addEventListener("click",function(e){
    var b=e.target.closest("button");if(!b)return;
    var i=+b.closest(".b-card").dataset.i;
    if(b.classList.contains("m"))q[i]=Math.max(0,q[i]-1);else q[i]=Math.min(12,q[i]+1);
    var tot=q.reduce(function(a,b){return a+b},0);if(tot>12){q[i]--}
    render();
  });
  render();
  setInterval(function(){document.getElementById("tH").textContent=hora()},30000);
})();
