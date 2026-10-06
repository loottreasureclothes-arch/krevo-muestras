(function(){
  var box=document.getElementById("open-now");if(!box)return;
  var now;try{var f=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date());var o={};f.forEach(function(p){o[p.type]=p.value;});
    var days={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};now={d:days[o.weekday],m:(+o.hour%24)*60+(+o.minute)};}catch(e){return;}
  if(now.d==null||isNaN(now.m))return;
  var close=(now.d>=1&&now.d<=4)?17*60+30:18*60,open=11*60;
  var li=document.querySelector('#hours li[data-d="'+now.d+'"]');if(li)li.classList.add("today");
  var on=now.m>=open&&now.m<close,t=document.getElementById("open-txt");
  box.dataset.state=on?"on":"off";
  function hm(m){return Math.floor(m/60)+":"+("0"+m%60).slice(-2);}
  t.textContent=on?"Abierto ahora · cierra "+hm(close):(now.m<open?"Cerrado ahora · abre 11:00":"Cerrado ahora · abre mañana 11:00");
})();
