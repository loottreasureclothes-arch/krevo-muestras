# Corrección 4 · Brillantes Inicios (30 sep 2026)

Última pasada puntual sobre lo que marcó el juez. Flujo: `python3 _build/soles.py && python3 _build/gen.py && python3 build.py`. `index.html` no se tocó a mano. Ningún dato cotejado cambió.

## Aplicados
1. **Foto de la sala (30-salas).** Ya no va grande. `_build/soles.py` tiene una función nueva, `salas()`. Recorta el maestro x4 de ig-07 en x 525-1350, y 100-1205: la maestra, las dos cunitas junto a ella y las sillas altas. Así sale la mancha del logo borrado (abajo a la izquierda) y quedan fuera las otras 5 caritas. Pasa de 7 soles a **2 soles chicos**, con rayos cortos y delgados, y cada uno tapa la carita entera. Lleva un unsharp suave y grano fino para que no se vea plástica. Sale en `img/salas-480.webp` y `img/salas-825.webp`.
   - Va como primera foto pegada de la pared (marco blanco, cinta y pie "Un día normal con peques"). Mide 80 % del ancho y máximo 320 px en celular, y máximo 340 px en compu. En compu queda en fila con "Mesitas" y "Menús", con la cita debajo. Salió el rótulo encimado "01 SALA" y su degradado.
2. **Cartilla en celular (20-cartilla).** Se quitó la media línea (13 px en 14 px): la ayuda del acta y la de STIGI ahora van en renglones normales de 28 px. Así cada línea cae en su raya y el subtítulo del paso 2 ya no queda apretado. El contador "Te faltan N documentos" subió 2 px (antes bajaba 11 px). Con eso sus dos líneas se asientan sobre las rayas, revisado en captura a 2x; antes flotaban entre dos rayas. Los nombres y ayudas llevan `text-wrap:pretty` para que los renglones largos no queden disparejos. Se borró de `site.css` la regla `.bi-half`, que ya no se usa.
3. **Cierre (60-cierre).** Salió la tira "De su Instagram" con los 3 pósters de texto. Sus webp se movieron a `_build/src/retirado/`. En compu el cierre queda en dos columnas: frase de Martha y botón verde a la izquierda, "Todo listo" a la derecha.
4. **Redes solo en el pie.** Salieron los iconos de Dónde (50-donde). La línea del directorio IMSS sube a la ficha, bajo los botones. En compu el mapa baja a 310 px de alto para que las dos columnas terminen casi parejas (66 px de diferencia).
5. **Hero en compu más lleno.** El wrap del hero sube a 1,320 px, la foto de la recepción a 88 % (máximo 620 px; es de 1,000 px reales) y la maestra a 300 px. Las columnas quedan en .92fr / 1.08fr. En celular no cambia.

## No aplicados
Ninguno.

## Verificación
- krevo-shot `m`: alto **7,488 px** (antes 7,635), alertas **[]**, consola vacía, scrollWidth 390. krevo-shot `d`: alto **5,737 px**, alertas **[]**. Solo Nunito y Fredoka, 0 guiones largos.
- WhatsApp: con 3 marcados, los botones de la cartilla y del cierre dicen "Ya tengo: 3 de 7 documentos" y el cierre muestra "Llevas 3 de 7 documentos". Con 7, sale el sello y "Ya tienes todo". Botones como `<a href="https://wa.me/...">`. Verdes: cartilla, Dónde y cierre (1 por sección) más el flotante.
- 820 px: scrollWidth 820, alto 7,872 px. Solo se salen el sello oculto (ya recortado) y el carrusel de reseñas, que es así a propósito.
- Hojas: `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/r4fix-brillantes-inicios/fin/hoja-celular.jpg`, `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/r4fix-brillantes-inicios/fin/hoja-compu.jpg`, `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/r4fix-brillantes-inicios/w820/hoja-820.jpg`.
