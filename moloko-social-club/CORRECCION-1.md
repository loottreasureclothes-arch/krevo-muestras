# CORRECCION-1 - Moloko Social Club (pulidor, 3 oct 2026)
## Problemas mas visibles
1. Fotos no en HD: tabla, interior y terraza servidas a 1600 max; interior y pizza sin version grande en srcset.
2. Pizza del collage cargaba la de 480 (se veia blanda en compu y retina).
3. Voz de investigador en 04 ("Google lo cuenta asi" + numeros entre parentesis).
4. Titulo BARRIL/MEZCAL/MOJITO en compu demasiado grande, no cabe en una pantalla.
5. Seccion de pizza en celular muy larga (carta completa abajo del disco).
6. Logo provisional "M" (falta su logo).
7. Sin resenas con nombre (pendiente del dueno).
8. Cierre "Todo listo" en compu con mucho vacio a la izquierda.
## Resultado
1. Arreglado: todas las fotos regeneradas desde el original a resolucion completa (2048), webp q90 + enfoque fino; srcset con 1600 y full.
2. Arreglado: collage usa pizza 960/1600 (la reescalada con Real-ESRGAN).
3. Arreglado: "4.5 en Google con 5,456 resenas. Despues de la musica, lo que mas se nombra: la cerveza artesanal y los 4 quesos."
4. Arreglado: en compu el titulo baja a clamp(96px, 9.4vw, 150px).
5. No arreglado: la carta es el producto; se deja (6,756 px, dentro del limite).
6. No arreglado: depende del dueno (PENDIENTES).
7. No arreglado: depende del dueno (PENDIENTES).
8. No arreglado: menor, se deja.
Verificado: alertas [] en m y d, celular 6,756 px, wa.me/524495835385 intacto en las 4 salidas.
