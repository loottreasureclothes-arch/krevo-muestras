(function(){
  var t=document.getElementById("rs-track");if(!t)return;
  var bs=document.querySelectorAll(".rs-b");
  for(var i=0;i<bs.length;i++)bs[i].addEventListener("click",function(){
    var c=t.querySelector(".rs-c");var w=c?c.getBoundingClientRect().width+14:300;
    t.scrollBy({left:w*parseInt(this.getAttribute("data-dir"),10),behavior:"auto"});
  });
})();
