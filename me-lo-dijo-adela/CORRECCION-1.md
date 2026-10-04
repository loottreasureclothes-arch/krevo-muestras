# CORRECCION-1 (pulidor, 3 oct 2026)
## Problemas mas visibles (en orden)
1. Compu: el hero usaba la misma foto (f01) que "El lugar"; se repetia la foto grande.
2. Celular: el boton flotante de WhatsApp tapaba los botones "Agregar" de la carta.
3. Compu: los platos de la carta en 2 columnas apretadas (nombres en 3 renglones, fotos chicas).
4. Compu: columna de texto del hero chica y floja frente a la foto.
5. Fotos que venden (hero compu y foto del lugar) con loading="lazy".
6. Sucursales en celular: dos bloques de puro texto seguidos, sin foto.
7. Opiniones en compu: el espejo queda chico debajo del 4.5.
8. El muro calado cerrado se asoma como fila de puntos al final de la carta antes de abrirse.
Prueba anti-genérico: pasa (comanda con nombres propios, muro calado, 3 verdes, 6 secciones, 6,791 px).
## Resultado
1. Arreglado: hero de compu usa f16 (rotulo Adela y vitrina); f01 queda solo en "El lugar".
2. Arreglado: la seccion carta completa esconde el flotante (data-hide-wa); la comanda trae su propio verde.
3. Arreglado: en compu una columna con platos de 104 px y nombres de 24 px.
4. Arreglado: subtitulo a 25 px, mas aire y eyebrow mas grande.
5. Arreglado: sin lazy en hero y foto del lugar.
6. No arreglado: no hay fachada ni foto de la sucursal Norte (PENDIENTES).
7. No arreglado: detalle menor, se deja.
8. No arreglado: es el momento firma en estado cerrado; se resuelve al entrar.
