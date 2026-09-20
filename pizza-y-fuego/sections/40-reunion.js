/* 30 · Reunión: 3 pasos que arman el mensaje de WhatsApp */
(function () {
  var f = document.getElementById("ru-form"); if (!f) return;
  var steps = f.querySelectorAll(".ru-step"), dots = f.querySelectorAll(".ru-steps li");
  var back = f.querySelector(".ru-back"), next = f.querySelector(".ru-next"), send = f.querySelector(".ru-send"), fb = f.querySelector(".ru-fb");
  var otro = f.querySelector(".ru-otro"), i = 0, WA = "524498974488";
  function val(n) { var e = f.querySelector('input[name="' + n + '"]:checked'); return e ? e.value : ""; }
  function msg() {
    var n = val("ru-n"); if (n === "otro") n = (document.getElementById("ru-n-otro").value || "").trim() || "(por definir)";
    var que = Array.prototype.map.call(f.querySelectorAll('input[name="ru-que"]:checked'), function (e) { return e.value; });
    var s = document.getElementById("ru-sabores").value.trim(), fe = document.getElementById("ru-fecha").value, h = document.getElementById("ru-hora").value, nom = document.getElementById("ru-nombre").value.trim();
    var t = ["Hola Pizza y Fuego, quiero cotizar un pedido para una reunión.", "", "Personas: " + n, "Se antoja: " + (que.length ? que.join(", ") : "(me recomiendan)")];
    if (s) t.push("Sabores: " + s);
    t.push("Cuándo: " + (fe || "(fecha por definir)") + (h ? " a las " + h : ""), "Entrega: " + val("ru-como"));
    t.push("Pago: " + (val("ru-pago") || "Efectivo al recibir"));
    if (nom) t.push("Nombre: " + nom);
    return "https://wa.me/" + WA + "?text=" + encodeURIComponent(t.join("\n"));
  }
  function go(k) {
    i = Math.max(0, Math.min(steps.length - 1, k));
    Array.prototype.forEach.call(steps, function (s, j) { s.classList.toggle("is-on", j === i); });
    Array.prototype.forEach.call(dots, function (s, j) { s.classList.toggle("is-on", j <= i); });
    back.hidden = i === 0; next.hidden = i === steps.length - 1; send.hidden = i !== steps.length - 1;
    if (!send.hidden) send.href = msg();
  }
  f.addEventListener("change", function (e) {
    if (e.target.name === "ru-n") otro.hidden = e.target.value !== "otro";
    if (!send.hidden) send.href = msg();
  });
  f.addEventListener("input", function () { if (!send.hidden) send.href = msg(); });
  f.addEventListener("submit", function (e) { e.preventDefault(); });
  next.addEventListener("click", function () { go(i + 1); });
  back.addEventListener("click", function () { go(i - 1); });
  send.addEventListener("click", function () { send.href = msg(); fb.href = send.href; fb.hidden = false; });
  go(0);
})();
