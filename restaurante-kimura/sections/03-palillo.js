(function(){
  var root=document.querySelector("[data-pal]");if(!root)return;
  var stage=root.querySelector(".pal-stage"),r=root.querySelector(".pal-range"),t=root.querySelector(".pal-t"),d=root.querySelector(".pal-d"),b=root.querySelector("[data-pal-wa]");
  var Z={caldo:["Caldo caliente","Miso Ramen, Tonkotsu o Karey Udon.","Hola Kimura, hoy se me antoja caldo caliente. ¿Qué me recomiendan: Miso Ramen, Ramen Tonkotsu o Karey Udon?"],
  mixto:["Un poco de cada","Un tazón caliente y rollos al centro.","Hola Kimura, hoy quiero un poco de cada: un ramen caliente y rollos para compartir. ¿Qué me arman?"],
  rollos:["Rollos","Beef roll con pasta tampico, Salmoncito hot o California roll. Con 2x1 y 3x2.","Hola Kimura, hoy se me antoja sushi. ¿Qué rollos tienen en 2x1 o 3x2? Me interesan el Beef roll con pasta tampico, el Salmoncito hot y el California roll."]};
  var last="";
  function set(){
    var p=+r.value;stage.style.setProperty("--p",p+"%");
    /* el palillo a la derecha deja ver más caldo (foto de arriba); a la izquierda, rollos */
    var z=p>=62?"caldo":(p<=38?"rollos":"mixto");
    if(z===last)return;last=z;
    t.textContent=Z[z][0];d.textContent=Z[z][1];b.setAttribute("data-wa",Z[z][2]);
    b.href=(window.KimuraWa?window.KimuraWa(Z[z][2]):"https://wa.me/524493939746?text="+encodeURIComponent(Z[z][2]));
  }
  r.addEventListener("input",set);set();
})();