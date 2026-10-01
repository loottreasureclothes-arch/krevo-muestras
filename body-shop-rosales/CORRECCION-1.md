# Corrección 1 · Body Shop Rosales (pulidor, 1 oct 2026)

Capturas de partida: krevo-shot m (7,827 px, alertas []) y d (6,544 px, alertas []).

## Los 10 problemas más visibles (en orden)
1. **Destapa: parece formulario.** Las 8 piezas son botones apilados con casilla de formulario al lado de un auto chico (190 px a 390). No se siente como destapar el papel; se siente como llenar una lista. En compu sobra aire a la derecha de la lista.
2. **El auto dibujado se ve pobre**: llantas como círculos que salen del cuerpo como orejas, sin volumen, sin piso de cabina. Pinta de clip-art.
3. **No se entiende que el auto se toca**: todo tapado y quieto; solo la etiqueta "Toca el papel".
4. **Remate (fb-06)**: el parche de cinta que tapa "Crédito Coppel" se ve como un bulto amarillo raro sobre el cofre; en compu la foto va casi a 1,200 px de ancho y el logo queda gigante.
5. **"Todo listo para completar" en un solo tono** (regla: títulos a dos tonos).
6. **Servicios en celular**: 8 tiras altas una debajo de otra (~460 px de puras tiras iguales); se siente lista larga.
7. **Botones de piezas sin estado de color**: al destapar, el botón se pone marino, no del color de la pintura; no conecta con el auto.
8. **"Cómo llegar" en compu**: el mapa queda chico y bajo, la foto domina; aceptable, se revisa.
9. **Banda de luz del brillo**: en la captura a medio camino queda un destello en la esquina; se resuelve sola a los 1.6 s (correcto, no se toca).
10. **Hero celular**: el marco de cinta de la foto asoma por los lados de la nota del título; se lee como cinta pegada (aceptable, no se toca).

## Qué se arregló
1. **Destapa sin pinta de formulario**: el auto ahora vive en una **cabina** (piso de rejilla oscuro, luz al centro y dos lámparas a los lados) y en celular va centrado y más grande; las 8 piezas dejaron de ser casillas apiladas: son **tiras de cinta** en 2 columnas (rasgadas, un poco torcidas) y al destapar una pieza la tira se **pinta del color elegido** (gris base, rojo, azul o plata; texto crema u oscuro según contraste). En compu las tiras van en columna junto al auto.
2. **Auto con volumen**: rines metidos bajo la carrocería (ya no salen como orejas), proporción más ancha (232/420), y un degradado de volumen encima de papel y pintura.
3. **Se entiende que se toca**: la cinta del cofre y la defensa delantera late (amarillo a crema, más gruesa) hasta el primer toque; con movimiento reducido no late.
4. **Remate fb-06**: el parche de 3 tiras planas se rehízo desde el original como UNA tira de cinta sombreada con la luz de la foto (las arrugas y brillos del plástico se ven encima), siguiendo el ángulo del periódico; "Crédito Coppel" sigue tapado. En compu la foto queda a 1,040 px máximo y 16:9.
5. **"Todo listo / para completar"** ahora a dos tonos (segunda parte roja).
6. **Servicios en celular**: tiras más compactas y del ancho de su texto (se ven como trozos de cinta, no como renglones de tabla).
7. (con 1) estado de color en las tiras de piezas.
8. Cómo llegar en compu: revisado, se deja (mapa y foto conviven bien a 1440 y 820).
9. Brillo: revisado, se resuelve a los 1.6 s; no se tocó.
10. Hero: no se tocó (se lee como cinta pegada).

## Qué NO se arregló
- El dibujo del auto sigue siendo a línea sencilla (sin vidrios ni faros detallados); mejoró, pero no es ilustración fina.
- Tableta 820: el hero deja aire a la derecha del título; aceptable.
- Fotos de 1266 px: no hay originales en mayor resolución (pedir en PENDIENTES).

## Verificación
- krevo-shot m: 8,051 px, alertas []. krevo-shot d: 6,496 px, alertas []. Tableta 820 revisada (6,170 px, sin scroll horizontal).
- Flujo probado (cofre, costado izquierdo, defensa trasera, rojo, golpe, pulido, "Jetta 2016"): `Hola Body Shop Rosales, quiero cotizar pintura de cofre, defensa trasera y costado izquierdo, en rojo, con golpe y pulido y encerado. Mi auto: Jetta 2016. ¿Me cotizan gratis?` (igual en el cierre). Sin errores de consola.
