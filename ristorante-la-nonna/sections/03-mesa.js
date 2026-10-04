(function(){
  var sel=["prosciutto","tiramisu"],pers=2;
  var $=function(i){return document.getElementById(i)};
  var sillas=$("sillas"),platos=$("platos-mesa"),mesa=$("mesa-mesa");
  if(!sillas)return;
  var WA="524492935602";
  function pos(angDeg,r){var a=angDeg*Math.PI/180;return{x:50+r*Math.sin(a),y:50-r*Math.cos(a)}}
  function dato(li){return{id:li.getAttribute("data-id"),nombre:li.getAttribute("data-nombre"),src:li.querySelector("img").getAttribute("src")}}
  var cat={};[].forEach.call(document.querySelectorAll(".plato"),function(li){cat[li.getAttribute("data-id")]=dato(li)});
  function layoutSillas(){
    var cur=[].slice.call(sillas.children);
    while(cur.length<pers){var s=document.createElement("i");s.className="silla nueva";sillas.appendChild(s);cur.push(s);(function(x){requestAnimationFrame(function(){requestAnimationFrame(function(){x.classList.remove("nueva")})})})(s)}
    while(cur.length>pers){sillas.removeChild(cur.pop())}
    cur.forEach(function(s,i){var ang=i*360/pers+(pers%2?0:180/pers);var p=pos(ang,43);s.style.left=p.x+"%";s.style.top=p.y+"%";s.style.setProperty("--a",ang+"deg")});
  }
  function layoutPlatos(){
    var have={};[].forEach.call(platos.children,function(b){have[b.getAttribute("data-id")]=b});
    Object.keys(have).forEach(function(id){if(sel.indexOf(id)<0)platos.removeChild(have[id])});
    sel.forEach(function(id,i){
      var b=have[id];
      if(!b){b=document.createElement("button");b.type="button";b.className="plato-m nuevo";b.setAttribute("data-id",id);b.setAttribute("aria-label","Quitar "+cat[id].nombre);var im=document.createElement("img");im.src=cat[id].src;im.alt="";b.appendChild(im);platos.appendChild(b);
        b.addEventListener("click",function(){toggle(id)});
        (function(x){requestAnimationFrame(function(){requestAnimationFrame(function(){x.classList.remove("nuevo")})})})(b)}
      var n=sel.length,p=n===1?{x:50,y:50}:pos(i*360/n+(n>2?0:90),n>5?27:23);
      b.style.setProperty("--x",p.x+"%");b.style.setProperty("--y",p.y+"%");
    });
    mesa.classList.toggle("mesa-llena",sel.length>0);
  }
  function lista(a){if(a.length<2)return a.join("");return a.slice(0,-1).join(", ")+" y "+a[a.length-1]}
  function mensaje(){
    var m="Hola La Nonna, quiero reservar mesa para "+pers+(pers===1?" persona":" personas")+", "+$("s-dia").value+" a las "+$("s-hora").value;
    if(sel.length)m+=" Queremos probar: "+lista(sel.map(function(id){return cat[id].nombre}))+".";
    return m;
  }
  function render(){
    layoutSillas();layoutPlatos();
    $("p-n").textContent=pers;
    var m=mensaje();$("mesa-msg").textContent=m;
    $("mesa-wa").href="https://wa.me/"+WA+"?text="+encodeURIComponent(m);
    $("carta-n").textContent="("+sel.length+")";
    [].forEach.call(document.querySelectorAll(".plato"),function(li){var on=sel.indexOf(li.getAttribute("data-id"))>=0,b=li.querySelector(".p-add");b.setAttribute("aria-pressed",on?"true":"false");b.textContent=on?"En la mesa":"Agregar"});
  }
  function toggle(id){var i=sel.indexOf(id);if(i>=0)sel.splice(i,1);else if(sel.length<8)sel.push(id);render()}
  [].forEach.call(document.querySelectorAll(".plato .p-add"),function(b){b.addEventListener("click",function(){toggle(b.parentNode.getAttribute("data-id"))})});
  $("p-menos").addEventListener("click",function(){if(pers>1){pers--;render()}});
  $("p-mas").addEventListener("click",function(){if(pers<10){pers++;render()}});
  $("s-dia").addEventListener("change",render);$("s-hora").addEventListener("change",render);
  render();
})();
