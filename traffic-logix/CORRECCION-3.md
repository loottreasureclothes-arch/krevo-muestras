# CORRECCION-3 · traffic-logix (GTLO) · 30 sep 2026

Se aplicaron los 5 cambios de REVISION-3, en orden, más el extra del convoy. `index.html` se armó con `python3 build.py` después de cada cambio; no se editó a mano.

Verificado con krevo-shot m y d: **0 alertas** en los dos. No hay consola, 404, scroll horizontal ni invisibles. Fuentes: solo Overpass y Overpass Mono. Hay 4 enlaces de WhatsApp.
- Alto en celular: **6,395 px** al cargar (unos 6,640 ya con todo abajo); antes medía 8,360 y el tope es 9,000.
- Compu: 7,353 px.
- A 820 px: sin scroll horizontal.

Capturas: `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/r3fix-traffic-logix/`
- `hoja-celular.jpg`, `hoja-compu.jpg` y `hoja-820.jpg`.
- `final-m/` y `final-d/`, con su report.json.
- `z/`: zooms de cada cambio (`c1-zoom.png`, `c2-sheet.jpg`, `c3-sheet2.jpg`, `c4-sheet.jpg`, `c5-sheet.jpg`, `d-sheet.jpg` y `d-cv.png`).
- `bak/`: respaldo de sections, site.* y template de antes.

## Aplicado

| # | Qué | Cómo quedó |
|---|---|---|
| 1 | El filete ya no cruza la foto | Se quitó `.sv-card::after{z-index:2}`. La foto entra a la señal: `.sv-ph{margin:6px 6px 0}`. El filete (de 3 a 5 px) la rodea como ventana, con 1 px de asfalto entre los dos. Usé 6 px y no 5 porque con 5 el filete se pegaba a los cielos claros y se perdía; con 6 se lee como marco. Comprobado con un zoom a la esquina (`z/c1-zoom.png`). |
| 2 | Servicios en celular como carrusel | Por debajo de 820 px es un carrusel con swipe y scroll-snap. Cada tarjeta mide `min(84vw,460px)` y la siguiente se asoma. Debajo va el contador "01 / 04" en Overpass Mono, con el número en amarillo, y 4 guiones de carril (el activo en amarillo y más largo). Los dos cambian con el swipe y en la última marcan "04". Probado: a 02 y a 04. La sección baja de unos 1,900 a **713 px**. En compu sigue en 2 columnas. El indicador es decorativo (`aria-hidden`), así que no suma botones chicos. |
| 3 | La señal vacía se ve rotulada | Los fantasmas van al 50 % con un subrayado punteado de 2 px en amarillo oscuro (`--am-d`, porque el amarillo claro no se ve sobre el panel blanco). En vacío no hay brillo reflejante: aparece cuando ya se eligió servicio. Lleva la pestaña amarilla EJEMPLO arriba a la izquierda (`.pt-ej`, que se mudó a 30-senal.css), y la flecha de salida queda al 70 %. El "clac" no se tocó. |
| 4 | El cierre remata sobre la 126 | Orden nuevo: (1) "Todo listo para completar", con el contenido intacto; (2) solo con elección, "Tu ruta / ya está rotulada." con la señal rotulada; (3) la banda de la 126 con "¿A dónde / vamos?", el botón verde "Cotizar por WhatsApp" (`.js-waruta`), el link "Cambiar mi ruta" y la placa KM 100 al final. Sin elección ya no salen ni la señal ejemplo ni `.cr-empty` (se borraron). La banda se pasó del pie (template) a `sections/60-cierre.*`, así que el verde cuenta para la sección: sigue habiendo 1 verde por sección. En celular, el botón monta sobre el desvanecido de la foto; en compu va dentro del marco de 800 px, abajo, con KM 100 a la derecha. |
| 5 | Base compacta y mapa de asfalto | El mapa lleva `filter:invert(.9) hue-rotate(180deg) saturate(.6) contrast(.95)` y el pin sigue rojizo. Va en una señal oscura (`sg--dk`), no en el bloque blanco. En celular mide 240 px. La foto de la 123 (140 px) va al lado de la dirección. TEL y MAIL con gap de 10 px, sin bajar de 44 px de toque. La señal quedó en unos 470 px más 240 de mapa. |
| Extra | Convoy en compu | Desde 1280 px, las placas miden 260 px con desfase vertical alterno (las pares bajan 28 px, o sea ±14) dentro de una fila de 1,360 px. Se lee como convoy (`z/d-cv.png`). El movimiento ligado al scroll no cambió. |

## WhatsApp (URL de prueba decodificada, celular 390)
Aeropuerto, 6 pasajeros, 12 oct 05:30, Aguascalientes → Aeropuerto GDL, Nissan Planta, Ana. Botón del cierre:
`https://wa.me/524494683835?text=Hola GTLO, quiero cotizar traslado al aeropuerto para 6 pasajeros, el 12 de octubre a las 05:30, de Aguascalientes a Aeropuerto GDL. Empresa: Nissan Planta. Mi nombre: Ana.`

Es el mismo mensaje de CORRECCION-2. Sin elección: `...?text=Hola GTLO, quiero cotizar transporte.` La lógica de `message()` y `waUrl()` no se tocó.

## Decisiones propias (y por qué)
- **Título de la banda con elección: "¿Nos / vamos?"**. Sin elección dice "¿A dónde / vamos?". Si arriba ya dice "Tu ruta ya está rotulada." con el destino, volver a preguntar "¿A dónde?" se lee raro. Es texto de llamado, no un dato.
- **El lema ya no se repite en el remate.** Queda solo en el hero, como pidió el juez.

## No aplicado
- Nada de los 5 cambios quedó fuera.
- No se tocó lo de "Qué NO tocar": el hero, el pórtico, la cita a sangre, las 4 filas, el convoy en celular, la lógica del cotizador, la foto de noche y el contenido de Todo listo.
- La señal pegada (sticky) del cotizador en celular sigue tapando el botón verde un momento al salir de la sección. Es el comportamiento de antes y no se pidió cambiarlo.
- Sin fotos nuevas, sin IA, sin stock y sin datos fuera de research/.

## Archivos tocados
`sections/20-servicios.*`, `sections/30-senal.*`, `sections/40-flotilla.css`, `sections/50-base.*`, `sections/60-cierre.*`, `site.css` (las reglas `.rm` se mudaron a 60-cierre.css), `site.js` (carrusel, `is-empty` y nuevo render del cierre), `template.html` (el pie ya no lleva la banda), `IMAGENES.md`.
