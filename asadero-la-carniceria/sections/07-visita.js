(function(){
  /* Horario de Maps (minutos desde las 0:00, hora de Aguascalientes). Lunes abre 1:30 segun Maps. */
  var H={0:[480,1200],1:[90,1380],2:[480,1380],3:[480,1380],4:[480,1380],5:[480,1440],6:[480,1440]};
  var el=document.getElementById("vis-now"); if(!el) return;
  var lbl=el.querySelector("span");
  function fmt(m){var h=Math.floor(m/60)%24,mm=m%60,ap=h<12?"a.m.":"p.m.",h12=h%12||12;return h12+(mm?":"+(mm<10?"0":"")+mm:"")+" "+ap;}
  function now(){
    try{var p=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hourCycle:"h23"}).formatToParts(new Date()),o={};p.forEach(function(x){o[x.type]=x.value});
      return {d:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(o.weekday),m:(+o.hour)*60+(+o.minute)};}
    catch(e){var d=new Date();return {d:d.getDay(),m:d.getHours()*60+d.getMinutes()};}
  }
  function upd(){
    var n=now(),h=H[n.d];
    Array.prototype.forEach.call(document.querySelectorAll(".vis-hrs tr"),function(r){r.classList.toggle("is-today",+r.getAttribute("data-d")===n.d)});
    if(n.m>=h[0]&&n.m<h[1]){el.className="vis-now is-open";lbl.textContent="Abierto ahora · cierra a las "+fmt(h[1]);}
    else{var nd=n.m<h[0]?n.d:(n.d+1)%7;var o=H[nd][0];el.className="vis-now is-closed";lbl.textContent="Cerrado · abre "+(nd===n.d?"hoy":"mañana")+(o===90?"":" a las "+fmt(o));}
  }
  upd(); setInterval(upd,60000);
})();
