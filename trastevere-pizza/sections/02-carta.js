(function(){
"use strict";
var S=window.TT;S.cart={}; /* id|sz -> {n,sz,p,q} */
document.addEventListener("click",function(e){
  var b=e.target.closest&&e.target.closest(".chip");if(!b)return;
  var k=b.dataset.id+"|"+b.dataset.sz;
  var it=S.cart[k]||(S.cart[k]={id:b.dataset.id,n:b.dataset.n,sz:b.dataset.sz,p:+b.dataset.p,q:0});
  it.q=Math.min(it.q+1,9);S.emit();
});
S.add=function(id,n,sz,p){var k=id+"|"+sz;var it=S.cart[k]||(S.cart[k]={id:id,n:n,sz:sz,p:p,q:0});it.q=Math.min(it.q+1,9);S.emit()};
S.step=function(k,d){var it=S.cart[k];if(!it)return;it.q+=d;if(it.q<=0)delete S.cart[k];S.emit()};
S.total=function(){var t=0,c=0;for(var k in S.cart){t+=S.cart[k].p*S.cart[k].q;c+=S.cart[k].q}return{t:t,c:c}};
S.on(function(){
  var chips=document.querySelectorAll(".chip");
  for(var i=0;i<chips.length;i++){var c=chips[i],it=S.cart[c.dataset.id+"|"+c.dataset.sz],q=it?it.q:0;
    c.classList.toggle("on",q>0);c.querySelector(".chip-q").textContent=q||"";}
  var n=document.getElementById("carta-count"),tt=S.total();
  if(n){n.textContent=tt.c||"";n.classList.toggle("on",tt.c>0)}
});
})();
