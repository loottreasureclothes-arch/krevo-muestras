# JAS INOX · Corrección 2 (30 sep 2026)

Apliqué REVISION-2.md completa, con las 6 decisiones del orquestador. `index.html` sale de `python3 build.py`. Las fotos nuevas salen de `gen/fix_assets.py r2`: recorte con PIL y Real-ESRGAN x4 (`-s 4`). No usé IA generativa ni fotos de stock.

## Resultado

| Medida | Antes | Ahora |
|---|---|---|
| Alto en celular (390) | 8,894 px | **8,389 px** (tope 9,000) |
| Alto en compu (1440) | 6,894 px | 7,232 px |
| Alto a 820 px | | 8,209 px, sin scroll horizontal |
| Alertas del report (`m` y `d`) | 0 | **0** |

- **Fuentes:** Anton, IBM Plex Sans e IBM Plex Mono.
- **Links de WhatsApp:** 6 `<a>` reales a wa.me.

**Alto por sección a 390:** hero 826 · catálogo 1,478 · banda 397 · cotizador 1,609 · ruta 862 · taller 1,231 · cierre 1,079 · pie 779.

**Cotizador probado por código (CDP).** Estas son las URLs de WhatsApp decodificadas:
- **Al abrir, sin tocar nada** (cotizador y cierre mandan lo mismo): `https://wa.me/524494415822?text=Hola JAS INOX, quiero cotizar: Mesa de trabajo de 180 x 70 x 90 cm (largo, ancho y alto).`
- **Carrito, largo 150, con uso, ciudad y nombre:** `...quiero cotizar: Carrito de 150 x 60 x 90 cm (largo, ancho y alto), con rodajas. Para: taquería. Ciudad: León. Mi nombre: Ana.`
- **Con "Otro":** `...quiero cotizar: Tanque de 500 litros de 150 x 60 x 90 cm (largo, ancho y alto). Para: taquería. Ciudad: León. Mi nombre: Ana.`
- **Al recargar:** conserva el tipo, las medidas y el título del cierre.
- **El dibujo del cierre** es idéntico al del cotizador en los 4 estados (mismo `innerHTML`).

**Capturas:** `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/r2fix-jas-inox/`
- Hojas de contacto: `m-contact.jpg`, `d-contact.jpg` y `w820-sheet.jpg`.
- Carpetas `m/` y `d/`, cada una con su `report.json`.
- La página completa a 820 está en `w820-full.png`. Es un pegado de capturas, así que el header fijo sale repetido.

## Cambios aplicados (número de la revisión)

1. **Cierre que remata.**
   - Se quitaron "Falta elegir el tipo." y el link "Elegir el tipo". El cierre ya no lleva cota.
   - **Al abrir:** título **"Tu mesa, / a un mensaje."**.
   - **Ya armada:** "Tu {pieza} / ya tiene medidas." La pieza puede ser mesa, carrito, campana, estante o, para "Otro", pieza. Así sale el nombre de la pieza elegida y se conserva el "ya tiene medidas".
   - **La ficha** lleva una copia viva del isométrico como **FIG. 09 · Tu pieza**. Se copia el `<g>` que redibuja `30-medida.js` con un MutationObserver, sin tocar el cotizador.
   - Debajo va el nombre en Anton y una línea en Plex Mono: "180 × 70 × 90 cm · ajústala arriba".
   - El botón verde manda el mensaje del cotizador también en el estado de arranque.
   - En compu, título, ficha y dibujo llenan la columna izquierda.
2. **Ruta.**
   - **Celular:** el mapa queda igual. Debajo va la pareja FIG. 05 y FIG. 06 en 4:5, de 169 px de ancho cada una. `.ruta-foot` va a todo lo ancho con `padding-right: 72px`.
   - **Compu:** rejilla de 12 columnas, con el mapa en 7 (ancho `min(100%, 66svh)` para que quepa en una pantalla de 900) y la pareja apilada y escalonada en 5.
   - **Tableta:** mapa y pareja lado a lado.
   - **FIG. 05 recortada de nuevo** (`carga2`): fuera la nuca, las manos y la gorra. Quedan el emplaye, la caja del tráiler y el cielo, y se entiende.
   - Se quitó la cota "1,900 km".
3. **Taller.**
   - Foto nueva **FIG. 07 · Frente del taller**: panel de arriba de ig-07, la barra frente al letrero con la Virgen. Va en recuadro con marco, de 352 px en celular.
   - **El título "Polux 114, Col. C.T.M." va como pie grande sobre la foto.** En compu la foto va a la derecha y la cita a la izquierda. Ya no queda la mitad vacía.
   - **Cita nueva, literal** con corte por puntos suspensivos: «…fabricante de material en acero inoxidable y aluminio… abasteciendo del mismo material a diferentes comercializadoras y empresas…». Corté antes de "abasteciendo" para no enseñar el "a sí mismo" del original.
   - Se quitó `ul.socials` de esta sección. Queda solo "Cómo llegar".
   - El mapa del iframe se recorre a FIG. 08.
4. **Catálogo.**
   - Fuera la tarjeta REF. 05 "Tarja con gabinete". Las tarjetas quedan numeradas de REF. 01 a REF. 06.
   - "tarjas con gabinete" pasa a ser el primer link de "También fabricamos".
   - `.cat-more` va a todo lo ancho, con línea acero arriba y abajo y Anton de 1.3 rem.
   - La rejilla va así según el ancho:
     - Celular: 2 columnas.
     - De 700 a 999 px: 3 columnas.
     - De 1000 a 1199 px: 3 columnas.
     - Desde 1200 px: 6 columnas. Las tarjetas quedan chicas y nítidas.
   - `.card:active` cambia el marco a acero y mueve la flecha 4 px.
   - Bajada nueva: "Piezas que ya salieron de Polux 114. Toca Cotizar y llega con el tipo puesto."
5. **Pie.**
   - Arriba va la tira "Índice de piezas": 6 miniaturas reales en 4:5, numeradas de 01 a 06 en Plex Mono.
   - Las miniaturas son el carrito, el remolque, las redilas, el tráiler, la campana y la barra. En celular caben las 6 sin scroll.
   - Cada miniatura lleva a su sección real: catálogo, ruta o taller.
   - Bajo el logo dice "Acero inoxidable a tu medida." en Plex Mono.
   - Íconos SVG de teléfono y sobre de 22 px en lugar de "Tel." y "@".
6. **Hero.**
   - **Compu:** el texto arranca en la retícula de `.wrap` (x = 128). La foto se sangra solo a la derecha, mide `100svh` menos la barra y tiene marco a la izquierda y abajo. Ya no queda la franja vacía.
   - **Compu:** el título (7.1vw) cruza unos 40 px sobre la orilla de la foto.
   - **Celular:** foto de 52 svh con `object-position: 50% 90%`. La barra queda completa, con sus rodajas, arriba del kicker. El texto ya no le tapa las patas.
7. **Patrón cota → título roto.** Quedan cotas solo en Catálogo y Cotizador.
   - El título de la Ruta va dentro del mapa, como cajetín de plano arriba a la derecha.
   - El de Taller va sobre la foto.
   - El del Cierre va pegado a la ficha.
8. **Mapa embebido:** `overflow: hidden` y el iframe sube 110 px. Ya no se ve la tarjeta "La Estrella, 20150". Se queda el pie "pin por confirmar".
9. **Micro.**
   - "(9 páginas)" va con `nowrap`.
   - La línea de soldadura arranca después del logo, así que el diamante ya no pisa "INOX".
   - En celulares de menos de 760 px de alto, el dibujo pegado mide máximo 30 svh.
   - "Sergio Alonso Arias Medellin" va en Plex Sans de 15 px.

**Extras:**
- **Cotizador en compu:** el dibujo pegado se montaba sobre el resumen y el botón verde al bajar. Ahora se pega dentro de su propia columna (filas 1 a 3). Es solo CSS: la lógica, las figuras, las cotas, el mensaje y el `localStorage` no cambiaron.
- **`site.js`:** el reveal se dispara al asomar (umbral 1.0 en lugar de 0.92). Así ningún título queda a medias al pie de la pantalla. Una pasada intermedia de `d` marcó 1 INVISIBLE, y ya quedó en 0.
- **Tableta (600 a 959 px):** hero más alto para que entre el letrero. El taller va en 2 columnas desde 640 px, para que la foto no se estire.

## No aplicado o aplicado distinto (y por qué)

- **El cierre es FIG. 09, no FIG. 08.** La foto nueva del taller es FIG. 07 y el mapa embebido pasó a FIG. 08, así que la numeración sigue corrida.
- **Cuándo dice "ya tiene medidas".** La revisión pedía "Tu cotización / ya tiene medidas." para la pieza armada. Lo cambié por "Tu {pieza} / ya tiene medidas." para cumplir la decisión 2 del orquestador (el nombre de la pieza elegida). Sin tocar nada dice "Tu mesa, / a un mensaje.".
- **Las miniaturas del pie no van todas a `#catalogo`.** El tráiler y la barra no están en el catálogo, así que llevan a Ruta y a Taller. No van del 01 al 07 porque son 6.
- **Pareja de la ruta en compu.** No van apiladas a lo ancho de las 5 columnas: a 480 px de ancho, una foto de origen de 200 px se vería borrosa. Van al 64 % (máximo 300 px), escalonadas.
- **Mapa de compu.** Mide `min(100%, 66svh)` de ancho y no los 690 px completos, para que su alto quepa en una pantalla de 900.
- **Hero de celular.** El cielo solo se recorta un poco. La foto es vertical, así que para cortar más habría que estirarla y se vería más suave. La barra y el letrero quedan completos.
- **Banda:** no se tocó. Sobró margen de alto (8,389 px).
- **Tope de calidad sin el dueño:** todas las fotos siguen saliendo de paneles de Instagram de 166 a 283 px. Por eso van chicas. Las fotos en alta siguen en PENDIENTES.
