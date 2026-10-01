# Corrección 3 · Brillantes Inicios (30 sep 2026)

Aplica los 5 cambios de `REVISION-3.md`, en orden. Flujo: `python3 _build/fotos2.py && python3 _build/gen.py && python3 build.py`. `index.html` no se tocó a mano. Ningún dato cotejado cambió (reseñas, teléfonos, horario, requisitos y dirección).

## Aplicados
1. **Dónde en compu sin hueco.** En `sections/50-donde.css` (desde 860 px, el corte que ya usa la sección) las áreas quedan `"fach head" "fach info" "map info" "map foot"`. Redes y la línea del directorio IMSS suben a la columna derecha, alineadas abajo con el mapa. "CÓMO LLEGAR" salió del bloque del mapa y ahora va en la ficha, bajo el verde (`.bi-donde-acts`). En celular queda igual de orden (ficha con los dos botones y luego el mapa). Las dos columnas terminan parejas.
2. **Post del IG.** Sale `post-01` y entra `ig-06` ("¿Sueles olvidar esta libretita?", con la Cartilla Nacional de Salud) como primer post, recortado arriba de la franja (y 20-532) y en webp 480. Cambios en `_build/fotos2.py` y `_build/gen.py`. Los 3 posts se leen a 390 px y uno amarra con la cartilla.
3. **Cierre sin instrucciones.** `#bi-cierre-doc` dice "Cerro de Aconcagua 101-C · de lunes a viernes, 7:00 a 17:00". Cada mitad va en un span que no se parte desde 340 px, así el corte cae en el "·". También cambié `sections/60-cierre.js`, porque el JS reescribía el texto viejo cuando no hay nada marcado. Ahora guarda el HTML original y lo repone. Con documentos marcados sigue diciendo "Llevas N de 7 documentos. Se suman a tu mensaje."
4. **Cartilla más corta en celular (hasta 600 px).**
   - Ayuda corta en la misma línea del documento, tras " · " ("de admisión · Ya llenada"). Va en `nowrap`, así que si no cabe baja completa a su renglón. Un JS chico (`20-cartilla.js`) quita el punto cuando bajó, para que ningún renglón empiece con "·". Aplica a CURP, Cartilla y Examen.
   - La ayuda larga del acta y la de STIGI van a media línea (13 px en 14 px, 2 por renglón).
   - Avisos del pie: un renglón por punto con etiqueta ("Edad", "Plazo", "Datos"). Arriba llevan el rótulo "SEGÚN EL IMSS" y abajo la fuente, sin perder datos (NSS = número de seguridad social, con `abbr`). "Datos" ocupa 2 renglones porque son 5 datos.
   - Medido a 390 px: lista de documentos de 448 a 392 px y avisos de 252 a 196 px. La página baja de 7,760 a 7,635 px.
   - **No llega a los ~400 px que estimó el juez.** Cada documento tiene casilla de 44 px (mínimo táctil), lo que fija 56 px por renglón doble (7 x 56 = 392). Bajarlo más pedía casillas chicas o romper la libreta. Cada texto sigue sobre su raya (revisado en captura a 2x).
5. **Hero con más calidez.** La maestra que saluda sube a la esquina superior derecha, encimada sobre la recepción. Ocupa 44 % del ancho en celular y 260 px en compu, con pie en Fredoka "Así te reciben". "La recepción" se queda. La cinta de la foto chica se movió a la izquierda para no chocar con la pestaña del sol. En celular la primera pantalla muestra a la persona saludando, el título, el 4.8 y "VER REQUISITOS".

## No aplicados
Ninguno quedó fuera. La única variante es el punto 4: baja ~125 px en vez de ~400 (ver arriba por qué).

## Verificación
- krevo-shot `m`: alto **7,635 px**, alertas **[]**, consola vacía, sin scroll horizontal. krevo-shot `d`: alto **6,736 px**, alertas **[]**. Solo Nunito y Fredoka. 0 guiones largos.
- WhatsApp (script a 390): con 3 marcados, `https://wa.me/524491927631?text=Hola Brillantes Inicios, quiero inscribir a mi bebé. Ya tengo: 3 de 7 documentos. ¿Cuándo puedo visitarlos?`. Con 7, edad y nombre: `...Edad: 8 meses. Ya tengo: 7 de 7 documentos. ¿Cuándo puedo visitarlos? Mi nombre: Ana`. Salen el sello en la hoja y en el cierre y las 7 estrellitas. Al desmarcar uno queda en 6 de 7 y los sellos se quitan. Sin errores de JS.
- 820 px: scrollWidth 820, alto 8,585 px. Solo se sale el sello oculto, que ya recorta `overflow-x:clip`.
- Verdes: cartilla, Dónde y cierre (1 por sección) más el flotante, sin cambio.
- Hojas de contacto: `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/r3fix-brillantes-inicios/fin/hoja-celular.jpg`, `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/r3fix-brillantes-inicios/fin/hoja-compu.jpg` y `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/r3fix-brillantes-inicios/w820/hoja-820.jpg`.
