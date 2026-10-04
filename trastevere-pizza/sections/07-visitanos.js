(function(){
"use strict";
var S=window.TT;
function mx(){
  var p=new Intl.DateTimeFormat("en-US",{timeZone:"America/Mexico_City",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date());
  var o={};p.forEach(function(x){o[x.type]=x.value});
  var d={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[o.weekday];var h=(+o.hour%24)+(+o.minute)/60;return{d:d,h:h}
}
function t(s){var a=s.split(":");return +a[0]+(+a[1])/60}
function status(k){
  var n=mx(),rows=document.querySelectorAll('.hrs[data-suc="'+k+'"] .hr'),open=false,today=null;
  rows.forEach(function(r){
    var days=r.dataset.days.split(",").map(Number),o=t(r.dataset.open),c=t(r.dataset.close);
    if(days.indexOf(n.d)>-1){today=r;if(n.h>=o&&n.h<c)open=true}
    if(days.indexOf((n.d+6)%7)>-1&&c>24&&n.h<c-24)open=true;
  });
  return{open:open,row:today};
}
function paint(){
  ["plaza","meridian"].forEach(function(k){
    var s=status(k);
    document.querySelectorAll('[data-open="'+k+'"]').forEach(function(el){
      if(el.classList.contains("open-now")){el.textContent=s.open?"Abierto ahora":"Cerrado ahora";el.classList.toggle("yes",s.open);el.classList.toggle("no",!s.open)}
      else el.textContent=s.open?"Abierto ahora":"Cerrado ahora"});
    document.querySelectorAll('.hrs[data-suc="'+k+'"] .hr').forEach(function(r){r.classList.remove("today")});
    if(s.row)s.row.classList.add("today");
  });
}
paint();setInterval(paint,60000);
})();
