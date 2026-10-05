(function () {
  var root = document.getElementById("recado"); if (!root) return;
  var DIAS = ["el lunes", "el martes", "el miércoles", "el jueves", "el viernes", "el sábado", "el domingo"];
  var dBtns = root.querySelectorAll(".vr-dias button"), rng = root.querySelector("#vr-rng"), out = root.querySelector("#vr-out"),
      nota = root.querySelector("#vr-nota"), sil = root.querySelectorAll(".sil"), nOut = root.querySelector("#vr-n"),
      nl = root.querySelector("#vr-nl"), rec = root.querySelector("#vr-rec"), copy = root.querySelector("#vr-copy"),
      pet = root.querySelector("#vr-pet");
  var st = { d: null, h: null, n: 0, pet: false };
  function hora(i) { var m = 540 + i * 30, h = Math.floor(m / 60), mm = m % 60; return h + ":" + (mm ? "30" : "00"); }
  function pinta() {
    dBtns.forEach(function (b, i) { b.setAttribute("aria-pressed", st.d === i ? "true" : "false"); });
    // domingo abre 9:30: el primer paso no existe
    var min = st.d === 6 ? 1 : 0;
    rng.min = min;
    if (st.h !== null && st.h < min) st.h = min;
    out.textContent = st.h === null ? "Elige arriba" : hora(st.h);
    out.className = st.h === null ? "vacio" : "";
    rng.className = "vr-rng" + (st.h === null ? " sin" : "");
    if (st.h !== null) rng.value = st.h;
    sil.forEach(function (s, i) { s.classList.toggle("on", i < st.n); });
    nOut.textContent = st.n;
    nl.textContent = st.n === 1 ? "persona" : "personas";
    pet.setAttribute("aria-pressed", st.pet ? "true" : "false");
    root.classList.toggle("pet", st.pet);
    var listo = st.d !== null && st.h !== null && st.n > 0, t = "Elige arriba";
    if (listo) {
      t = "Hola, buen día. Quisiera una mesa para " + st.n + (st.n === 1 ? " persona " : " personas ") + DIAS[st.d] +
        " a las " + hora(st.h) + (st.pet ? ", con mascota" : "") + ". ¿Hay lugar?";
    }
    rec.textContent = t; rec.className = "vr-rec" + (listo ? "" : " vacio");
    copy.disabled = !listo; copy.textContent = listo ? "Copiar el recado" : "Elige arriba";
    copy.dataset.t = listo ? t : "";
  }
  dBtns.forEach(function (b, i) { b.addEventListener("click", function () { st.d = i; pinta(); }); });
  rng.addEventListener("input", function () { st.h = +rng.value; pinta(); });
  rng.addEventListener("pointerup", function () { if (st.h === null) { st.h = Math.max(+rng.value, +rng.min); pinta(); } });
  rng.addEventListener("change", function () { st.h = +rng.value; pinta(); });
  sil.forEach(function (s, i) {
    function set() { st.n = (st.n === i + 1) ? i : i + 1; pinta(); }
    s.addEventListener("click", set);
    s.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); set(); } });
  });
  root.querySelector("#vr-mas").addEventListener("click", function () { st.n = Math.min(8, st.n + 1); pinta(); });
  root.querySelector("#vr-menos").addEventListener("click", function () { st.n = Math.max(0, st.n - 1); pinta(); });
  pet.addEventListener("click", function () { st.pet = !st.pet; pinta(); });
  copy.addEventListener("click", function () {
    var t = copy.dataset.t; if (!t) return;
    function ok() { copy.textContent = "Copiado"; setTimeout(pinta, 1400); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok, fb); else fb();
    function fb() { var a = document.createElement("textarea"); a.value = t; document.body.appendChild(a); a.select(); try { document.execCommand("copy"); } catch (e) {} a.remove(); ok(); }
  });
  pinta();
})();
