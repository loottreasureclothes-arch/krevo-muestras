# Arienzo · Corrección 1 (pulidor, 1 oct 2026)

## Los 10 problemas más visibles (en orden)
1. Hero en celular: el título se encima sobre el marco dorado de la foto (la línea dorada corta "recién") y los botones quedan bajo el pliegue.
2. Foto LA VITRINA (pasteles): se ve pura rejilla y estante, el pastel de chocolate sale cortado y la foto luce opaca y verdosa.
3. "Todo listo para completar": la última línea ("...donde te llegó esta muestra.") queda mochada por la punta del escudo (celular y compu).
4. Ícono de Instagram del pie deforme: no se reconoce (trazo mal hecho).
5. Foto "ASÍ SALE EN SU MESA" (momento firma) chiquita (175 px) y la etiqueta le tapa un tercio.
6. Cuartel PASTELES del escudo: casi pura rejilla; el cuartel que más vende es el menos antojable.
7. Hueco de ~80 px entre la ficha del escudo y el botón verde en celular (alto reservado vacío).
8. Mapa: la punta del escudo deja el mapa fuera del filete dorado (abajo no hay borde).
9. Título "Pastel para 6, 10, / 14 o 20 personas.": la pata de la "p" de "para" se mete en el "20" de abajo (interlineado 1.02).
10. Tableta a 820 y compu: el hero ocupaba 100svh con ~250 px de chocolate vacío arriba; la ficha del escudo dejaba un hueco reservado antes del botón.

## Qué se arregló
1. Hero: el título ya no se encima sobre la foto (margen 20 px en vez de -84 px), título un poco más chico (13.4vw) y foto más apaisada (358/318, conchas al 74 %); la etiqueta CONCHAS pasa arriba. Ahora VER QUÉ HORNEAN se ve en la primera pantalla del celular.
2. Vitrina: nuevo recorte de maps-08 ya limpia (`img/vitrina2-{480,960,1280}.webp`, x 215-1495, y 55-832) con los cinco pasteles, el de chocolate y el de almendra completos; balance cálido (+3.5 % rojo, -4 % azul), contraste 1.07, color 1.06. Caja más apaisada (358/262 celular, 540/430 compu).
3. "Todo listo": la punta de las notas ahora mide 30 px fijos (`--shield-short` con calc) y la caja tiene 58 px abajo; la última línea se lee completa en celular y compu. Las reseñas y el mapa quedan con la misma punta.
4. Ícono de Instagram del pie redibujado limpio (cuadro redondeado, lente y punto, de trazo).
5. "ASÍ SALE EN SU MESA": la foto pasa de 175 a 320 px en celular (el contenedor estaba encogido); la etiqueta ya no tapa un tercio.
6. Cuartel PASTELES: ahora es el pastel de chocolate y el de almendra (`img/q-pasteles2.webp`), con el mismo balance cálido.
7. Ficha del escudo: el alto reservado solo aplica cuando hay un cuartel elegido (`:has(.esc-svg[data-sel])`); sin elegir, el botón verde queda pegado al texto.
8. Mapa: el marco dorado ahora rodea también la punta (padding 3 px parejo).
9. Interlineado de títulos de sección a 1.08: ya no chocan las patas de una línea con la siguiente.
10. Hero en tableta/compu: alto máximo 920 px (sin hueco gigante en 820x1180).

Verificado: krevo-shot m y d con `alertas: []`; celular 8,658 px; tableta 820 revisada con copia del script en el scratchpad; flujo del escudo, pastel y cierre probado con Chrome headless (mensajes de wa.me decodificados correctos).

## Qué no se arregló
- La vitrina de Maps es una foto de celular de baja resolución con rejillas: no hay otra foto de pasteles terminados sin letras (ya está en PENDIENTES: fotos de pasteles terminados).
- El texto "Condiciones" de Google se corta en la punta del mapa (es del embed).
- Quedan en `img/` los archivos viejos `vitrina-*.webp` y `q-pasteles.webp` sin uso (se pueden borrar al publicar).
