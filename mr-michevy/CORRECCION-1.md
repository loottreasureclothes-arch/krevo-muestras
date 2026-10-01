# Mr. MICHEvy · CORRECCIÓN 1 (1 oct 2026)

Aplica `REVISION-1.md` (7.3) y las decisiones del orquestador. Scripts y capturas: scratchpad `michevy-fix/` (llega.py, fotos.py, export.py, flow.mjs, sweep.mjs, glass.mjs, vp.mjs; hojas `hoja-m.jpg` y `hoja-d.jpg`).

## Qué cambié
1. **Así llega, así queda** (`20-barra.*`, `img/llega-*`, `img/queda-*`)
   - La foto del techo del auto se volteó en horizontal: los dos logos ya leen "mr. MICHEvy". Se borró limpio (inpaint OpenCV) la palabra "DUSTER" del riel y se recortó a la barra: la caja llena el cuadro, casi sin cielo ni cables.
   - Marco del barrido pasa de 4:5 a 1:1 (ahorra ~90 px en celular). "Así queda" se recortó para que su logo caiga en el mismo punto que la caja de "así llega"; el aro nace ahí (47 % 55 %).
   - Remate nuevo: a los 1.6 s de asomarse, o si el visitante se queda quieto 1.6 s a media sección, el aro termina solo en "así queda" (~500 ms). Si sube, el aro vuelve a ligarse al scroll y baja; quieto otra vez, se resuelve. Probado: p 0.3 quieto → a los 2.3 s `circle(272px)` y rótulo "Así queda". Sigue con rAF, sin pin, clip-path en el contenedor.
2. **El vaso, copiado de su vaso real** (`30-vaso.html/.js/.css`)
   - Líquido café ladrillo (#8A3519 → #360E07) con línea de clamato en la superficie y sombreado de volumen; hielos translúcidos con canto claro y brillo; banda GRUESA de chile (≈30 unidades, 18 % del ancho) con borde de abajo irregular y ~1,250 granos de forma y tono desiguales (rojos, pocos naranjas, semillas raras), también en el labio de atrás; pajilla enchilada con grano y punta de tamarindo; calcomanía del logo real a ~45 % del ancho, sin el disco dorado extra; brillo de vidrio, aros de la base y sombra.
   - El escarchado aparece recorriendo el borde de izquierda a derecha (máscara con stroke-dashoffset, 500 ms). La pajilla cabe dentro del SVG (overflow oculto): ya no se corta con el header.
   - Celular: el vaso va pegado ABAJO (sticky bottom) mientras contestas, mide 185 px (22 % de 844, menos de un tercio) y al terminar se asienta en su lugar entre "¿Dónde?" y "Tu nombre": ya no tapa la pregunta de arriba ni deja franja vacía al final. `scroll-margin-bottom` en los pasos para que el foco no quede debajo.
   - Compu: vaso de 270 px a la izquierda, pegado arriba; resumen a 16-19 px (dt 13 px).
   - La lógica no se tocó (niveles, baja al borrar, sessionStorage, cierre). "Empresa" ahora manda "Evento: empresa."
3. **Fotos**
   - Cierre: magenta corregido en LAB, nitidez (CLAHE + unsharp), recorte sin el "NO!", y va EN MARCO 970:748 con esquina mordida, ya no a sangre; la frase a mano va debajo.
   - Eventos: nuevo recorte de `rancho-sirviendo-micheladas` 4:5: él trabajando, sin la copa del árbol ni la ayudante.
   - Barra: la foto de frente se cambió por `barra-logo-angulo-cielo` recortada (cubierta de madera y logo, sin la botella con marca, sin el poste y con poco piso). La mesa sucia se quitó: ahora es un acercamiento del borde de chile de su vaso con la calcomanía "Condimentos hechos por él".
   - Vasos de boda: +0.4 EV en sombras y menos grano. Tajín: recorte del 17 % derecho (fuera la etiqueta con QR y el "@").
   - Hero: recorte arriba (sin tapas amarilla y dorada) y velo en la esquina de las botellas; ya no se reconocen.
4. **Hero de celular**: alto de foto = 100svh − 405 px y título ligado a svh. "COTIZAR MI EVENTO" completo: abajo en 810 (844), 615 (667) y 694 (360x740).
5. **Frase del header** sin "…": `font-size:min(21px,5.05vw)` y sin ellipsis; la larga mide 356 de 356 a 390 y 326 de 326 a 360. En compu la letra baja con el ancho.
6. **Pie**: íconos de WhatsApp, TikTok e Instagram (logotipo oficial, ya no la camarita) a 44 px.
7. **Compu**: ligas a la vista en el header a partir de 1200 px (La barra · Eventos · A domicilio + Cotizar). A 1240 y 1440 la frase cabe.
8. **Letra mínima**: calcomanías de 11.5 px o más (96-104 px de diámetro), dato del hero 11-12 px, miniatura "Así llega" 11.5 px, aro de likes 11.5 px.
9. El botón verde del cierre ahora trae su href con los datos del vaso desde que se pinta (antes solo al tocarlo).

## Qué no hice y por qué
- **Calcomanía de fiesta en el hero (opcional 15)**: no. El hero ya lleva el aro de 43.8 mil y la calcomanía "BODA · 200 PREPARADOS" ya está en eventos; repetirla ensucia el cartel.
- **"La caja fuera del círculo hasta p 0.4"** (revisión 1): manda el orquestador; el aro nace en la barra y la caja de "así llega" está en el mismo punto, así se lee como la misma barra que se arma.
- **Foto de vasos de boda grande**: sigue chica (230 px); el origen no da para más.
- No toqué copy, títulos, paleta, la cuenta de verdes (3 + flotante), ni "Todo listo para completar".

## Verificación
- krevo-shot m: `alertas: []`, alto 8,211 px. krevo-shot d: `alertas: []`, alto 6,754 px. Sin scroll horizontal a 360, 390, 820, 1240 y 1440.
- Flujo (Boda, 200, 15 nov 2026, Salón + "Jesús María", Ana) en 390 y 1440: vaso lleno, "Vaso lleno. Listo para cotizar." URL decodificada:
  `https://wa.me/524495520336?text=Hola Mr. MICHEvy, quiero cotizar la barra de micheladas. Evento: boda. Invitados: 200. Fecha: 15 de noviembre de 2026. Lugar: salón, Jesús María. Mi nombre: Ana` (el cierre trae la misma).
- Hojas: `michevy-fix/hoja-m.jpg` y `michevy-fix/hoja-d.jpg`.
