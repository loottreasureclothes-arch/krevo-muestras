# JAS INOX · Corrección 4 (30 sep 2026)

Arreglé los 3 puntos del juez. `index.html` sale de `python3 build.py`. Las fotos salen de `python3 gen/fix_assets.py r4` y el mapa de `python3 gen/mx_map_ne.py`. Todo es local: PIL, OpenCV, Real-ESRGAN `-s 4` y Natural Earth bajado con curl. No usé IA generativa ni fotos de stock, y no cambié ningún dato cotejado.

## Resultado

| Medida | Antes | Ahora |
|---|---|---|
| Alto en celular (390) | 8,356 px | **8,125 px** (tope 9,000) |
| Alto en compu (1440) | 7,678 px | **6,968 px** |
| Alto a 820 px | 8,329 px | 8,377 px, sin scroll horizontal |
| Alertas del report (`m` y `d`) | 0 | **0**: sin consola, 404, scroll horizontal, guiones largos ni emojis |

- **Fuentes:** Anton, IBM Plex Sans e IBM Plex Mono.
- **WhatsApp:** siguen los 6 `<a href="https://wa.me/...">` reales. Los verdes por sección no cambian: cotizador 1, cierre 1 y el flotante.

## Cambios

1. **Hero y fotos**
   - **FIG. 01 (`10-hero.html`, `10-hero.css`):** abajo de 960 px la etiqueta se pasó a la esquina de abajo a la izquierda, sobre la banqueta, en versión corta: "FIG. 01 · Barra con vidrio". El letrero real JAS INOX de la fachada ya queda libre. En compu la etiqueta ya estaba abajo y no cambia.
   - **Tableta (600 a 959 px):** la foto mide `min(76svh, 880px)` con `object-position: 50% 45%`. A 820 px entran el letrero arriba y las rodajas abajo. Antes, el letrero se cortaba.
   - **Taller sin barra repetida (`50-taller.*`):** quité FIG. 07 (frente.webp). "Polux 114, Col. C.T.M." ahora es un título normal a dos tonos, con su cota "El taller · Aguascalientes". En compu la cita del catálogo va a su lado.
   - **Menos cera (`gen/fix_assets.py r4`):** las 12 fotos x4 llevan 42 % de textura original (antes 22 %), un realce más suave y grano fino monocromo a la resolución final. Las 4 del catálogo que venían de `make_assets.py` (su x4 se había borrado) se rehicieron desde el mismo recorte. Detalle en IMAGENES.md.
2. **Huecos negros en compu**
   - **Ruta (era el hueco bajo el cotizador y el de junto al mapa):** el mapa ahora es horizontal (800 × 570) y ocupa 6 de 12 columnas. La pareja FIG. 05/06 ocupa las otras 6, arranca arriba al ras del mapa y el pie "Ver proyectos" cierra al ras de su borde de abajo. Mapa y columna miden igual: 438 px.
   - **Taller:** sin la foto ya no queda el hueco a la izquierda de FIG. 07. Título y cita van lado a lado, y abajo siguen la ficha y el mapa.
   - **Cierre:** el título "Tu mesa, a un mensaje." va arriba a todo lo ancho. La ficha y "Todo listo para completar" van lado a lado con el mismo alto: el dibujo se topa en 250 px y las 2 líneas finales bajan al ras de la ficha.
   - **En celular no cambió el orden de nada.**
3. **Mapa de la ruta (`gen/mx_map_ne.py`, `40-ruta.*`)**
   - **Contorno:** es México completo, sacado de Natural Earth 1:50m (`ne_50m_admin_0_countries`, dominio público). Lleva Baja California bien formada, Yucatán y las islas grandes, con proyección equirectangular y Douglas-Peucker (`cv2.approxPolyDP`, 0.45 px).
   - **Título:** "Fabricamos aquí. / Entregamos donde necesites." quedó fuera del trazo, arriba del mapa, como en las otras secciones.
   - **"1,900 km" en azul:** sigue en el Pacífico, abajo a la izquierda.
   - **FIG. 04:** pasó arriba a la derecha, sobre el Golfo y EE.UU. vacíos.
   - **Línea de scroll:** sigue igual. Es el mismo corredor del Pacífico, reversible y sin pin.

## Verificación

**Carpeta:** `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/r4fix-jas-inox/`
- **Hojas de contacto:** `m-contact.jpg`, `d-contact.jpg` y `w820-sheet.jpg`.
- **Captura del hero en celular:** `hero-m.png`.
- **Reportes:** `m/m-report.json` y `d/d-report.json`, sin alertas.

## Lo que queda (sin cambio)

- **Las fotos siguen siendo paneles de Instagram de 160 a 283 px.** El grano quita el aspecto pintado, pero no inventa detalle. Para pasar de ahí hacen falta las fotos en alta del dueño (PENDIENTES.md).
- **La miniatura 06 del pie (th-barra) sigue siendo la barra.** Es un índice de 96 px, no una foto grande.
