(function(){
  var qs=document.querySelectorAll(".pq-q");
  [].forEach.call(qs,function(b){b.addEventListener("click",function(){
    var abre=b.getAttribute("aria-expanded")!=="true";
    [].forEach.call(qs,function(o){o.setAttribute("aria-expanded","false");document.getElementById(o.getAttribute("aria-controls")).hidden=true});
    if(abre){b.setAttribute("aria-expanded","true");document.getElementById(b.getAttribute("aria-controls")).hidden=false}
  })});
})();
