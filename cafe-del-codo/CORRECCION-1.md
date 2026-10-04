# CORRECCION 1 - Café del Codo (pulidor, 3 oct 2026)

## Los 8 más visibles (en orden)
1. Componente firma invisible: la charola no existía hasta tocar "Agregar"; no se entendía que se arma.
2. Fotos en baja calidad (latte, crepa, churro de 9-60 KB, con artefactos); pedido de subirlas a HD.
3. Compu: "Para acompañar" dejaba la ensalada sola con media fila vacía (hueco grande).
4. Momento firma: el patio de noche entraba casi negro (brillo .5 sobre foto ya oscura).
5. Fotos que venden con loading="lazy" (prohibido).
6. Celular: el botón de WhatsApp del hero quedaba debajo del primer pantallazo.
7. Noche y waffle eran fotos chicas (< 1,200 px) sin escalar.
8. gen.py desalineado con los nuevos tamaños de imagen.
Prueba anti-genérico: pasa (0 sí en 1-8).

## Resultado
- 1 ARREGLADO: charola fija visible desde que entras a la carta, con 3 huecos punteados, "Tu charola", contador y rebote al agregar; WhatsApp armado verificado.
- 2 ARREGLADO: todas las fotos rehechas desde el original de Maps, webp calidad 88 + enfoque fino (mesa con el mismo recorte, encontrado por coincidencia 0.997).
- 3 ARREGLADO: en compu "Para acompañar" va en 5 columnas parejas.
- 4 ARREGLADO: estado apagado a .62 y foto de noche aclarada 18 %.
- 5 ARREGLADO: sin lazy en ninguna foto.
- 6 ARREGLADO: arco del hero a 56svh; el botón verde entra en el primer pantallazo.
- 7 ARREGLADO: noche (1600 px) y waffle (1200 px) con Real-ESRGAN mezclado 50 % + grano fino.
- 8 ARREGLADO: gen.py con los tamaños nuevos y sin lazy.
- NO ARREGLADO: la foto de "Pasa por tu mesa" (crepas) se parece a la crepa de la carta; no hay otra foto buena del local sin render ni texto.
