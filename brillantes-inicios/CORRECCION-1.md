# Corrección 1 · Brillantes Inicios (30 sep 2026)

Aplica `REVISION-1.md` de arriba hacia abajo. Flujo respetado: los cambios de HTML van en `_build/gen.py` (que ahora también arma `template.html` desde `_build/template.src.html` + `_build/syms.html`), luego `python3 build.py`. `index.html` no se tocó a mano.
Rehacer todo: `python3 _build/soles.py && node _build/og-shot.mjs && python3 _build/gen.py && python3 build.py`.

## Aplicados
1. **Caritas de emoji por el sol de Brillantes** (hero y sala). Script nuevo `_build/soles.py` (PIL, sin IA). Parte de los maestros x4 sin tocar guardados en `_build/src/`. Pone un disco #ffc63a con filo dorado y 12 rayos cortos: 7 soles en el hero y 2 en la sala (en la sala con rayos más cortos). Todas las caras quedan tapadas. Detalle en IMAGENES.md.
2. **"Un día aquí" recortada distinto.** La original es chica (454 px), y Emanuel decidió que una foto así no va a sangre. Ahora va en marco blanco de foto pegada, con su proporción casi completa y girada -0.8°. El sol queda chico y mandan las manos y la mirada de la maestra. En compu el marco mide máx. 900 px.
3. **Fuera ig-08** (stock probable, con restos de letras). Sus webp se movieron a `_build/src/retirado/`. En la sala queda la foto de fruta, más grande (84 % en celular, 460 px en compu), junto a la cita real.
4. **Estrellas honestas.** `sections/40-opiniones.js` empieza a llenar cuando el 4.8 asoma y termina en 4.8 antes de que la fila de estrellas se vea entera. Lo probé cada 30 px de scroll a 390, 820 y 1440: la fila entera nunca se ve a medio llenar (0 casos). Sin JS o con movimiento reducido quedan fijas en 4.8.
5. **La pestaña del sol ya no tapa texto.** Al compactarse se esconde detrás de la barra (z-index) y solo asoma 8 px. El crayón de avance sigue encima.
6. **Respaldo de 1.6 s en `site.js`.** A los 1.6 s de cargar, 1.6 s después de cada scroll (con setTimeout, sin depender de rAF) y al volver a la pestaña (`visibilitychange`), todo `[data-reveal]` que esté en pantalla o arriba de ella se muestra. El rAF ya no corre en ciclo: solo con scroll y resize, y se apaga cuando no queda nada por revelar. El blindaje del template (4 s) sigue.
8. **Botón verde de la cartilla en un solo renglón.** Dice "AGENDAR VISITA", con el logo de WhatsApp, a 14 px. Para lectores de pantalla conserva "por WhatsApp" en un texto oculto. El del cierre sí cabe entero y se queda "Agendar visita por WhatsApp".
9. **Logotipos oficiales de redes a 44 px** en Dónde y en el footer. Instagram es el glifo oficial: cuadro redondeado de contorno, círculo y punto. Facebook es el círculo con la "f". TikTok y YouTube son los oficiales. Van sin caja, con área de toque de 52 px.
11. **Prueba de confianza en el hero.** Bajo la dirección va "★ 4.8 en Google · 45 opiniones", con link a #opiniones (estrella SVG, no emoji). En celular, "Cómo llegar" deja libre el lugar del botón flotante.
12. **Link a Google.** En compu, "Ver las 45 en Google" ahora va debajo de las reseñas (columna derecha). Ya no queda junto a "45 opiniones en Google".
13. **"Todo listo para completar" aclarado.** Lleva el renglón "Para la guardería: lo que nos falta para dejarla lista." y círculos numerados en lugar de casillas vacías.
14. **Columna izquierda de la cartilla en compu.** Bajo el título, un bloque pegajoso con el contador en vivo: "0 de 7 documentos listos", un número grande en amarillo, barra de avance y "Marca lo que ya tienes y tu mensaje de WhatsApp se arma solo."
15. **og.jpg nueva.** Se arma en `_build/og.html` con Fredoka y Nunito reales de Google Fonts (el navegador las carga, no hay archivo de fuente descargado) y se captura con `node _build/og-shot.mjs`. Lleva velo azul, sol, título a dos tonos y "★ 4.8 en Google · Cerro de Aconcagua 101-C". La maestra sale completa y las caras con sol.

Extra: a 820 px la foto de fruta se salía por la izquierda (margen de navegador de `<figure>` más columna `1fr`). Lo arreglé con `margin:0` y `minmax(0,1fr)`.

## No aplicados (y por qué)
- **7. Reordenar la cartilla** (pasar "Solicitud de inscripción" y "Constancia de plática" al paso 2 con "te las da STIGI o la guardería"). Revisé imss.gob.mx/tramites/imss01006 el 30 sep y la página NO dice quién da esos documentos ni en qué momento. Ponerlo sería inventar un dato. Además, la hoja de dirección pide literal "Ya tienes todo. Siguiente: inscribe en STIGI." Quedó como pregunta concreta en PENDIENTES 10.
- **10. Cambiar la cita de Anahi por la frase destacada de Google.** La hoja de dirección pide ese renglón en la sala como cita de Anahi con su nombre, y la hoja manda. Para que no se vea repetido, ahora la cita va junto a la foto de fruta, que es de lo que habla.
- **11, parte "quitar el eyebrow 'Brillantes Inicios' del hero".** La hoja dice "En hero el nombre va en Fredoka con un sol SVG propio". Se queda. La prueba de confianza sí se agregó.
- **Probar la tarjeta og en WhatsApp publicada.** No se puede sin publicar, y no hago push.
- Ajustes menores que no pidió la lista numerada: redes y teléfonos en Dónde y footer (los pide la hoja en los dos lugares), el fondo de garabatos repetido y el link "Fuente" de 18 px (es texto dentro de una nota, no botón).

## Verificación
- krevo-shot `m`: alto 7,210 px, **alertas: []**. krevo-shot `d`: alto 6,148 px, **alertas: []**.
- 820 px (sonda propia por CDP): scrollWidth 820, sin desbordes (solo el skip-link, que está fuera a propósito).
- Hojas de contacto: `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/brillantes-fix/hoja-m.png`, `hoja-d.png`, `hoja-820.png`. Estrellas: `stars-390.png`, `stars-820.png`, `stars-1440.png`.
