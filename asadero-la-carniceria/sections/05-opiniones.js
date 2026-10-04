(function(){
  var t=document.getElementById("tk-track"); if(!t) return;
  Array.prototype.forEach.call(document.querySelectorAll(".tk-btn"),function(b){
    b.addEventListener("click",function(){
      var c=t.querySelector(".tk"); var w=c?c.getBoundingClientRect().width+16:300;
      t.scrollBy({left:w*Number(b.getAttribute("data-dir")),behavior:"smooth"});
    });
  });
})();
