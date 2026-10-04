# CORRECCION-1 (pulidor, 4 oct 2026)
Problemas más visibles, en orden:
1. Hero en celular: el título no era el más grande de la página (la foto de "Con las manos" le ganaba).
2. Charola vacía sin gracia: el ticket en blanco no invitaba a tocar; en compu el título se partía en 4 líneas.
3. Huecos de 110 px arriba y abajo de cada sección en compu (más de 90 px).
4. Carta en compu: la columna derecha terminaba en un renglón suelto y dejaba un hueco.
5. Fotos que venden (mesa y miniaturas de la carta) cargaban con lazy.
6. Bebidas y pannini sin acción clara (solo "pregunta el precio" sin botón).
7. Momento firma (mantel) revisar que se resuelva antes de 1.6 s.
8. Alto en celular rozando el máximo (10,928 px).
Prueba anti-genérico: pasa (letrero 4.4 propio, charola única, 0 contadores, 5 verdes, 9 secciones; ningún sí en 5-8).

## Resultado
1. Arreglado: título del hero a 11.4vw, el más grande; "Con las manos" bajó a 10.6vw.
2. Arreglado: charola vacía trae 4 favoritos de un toque (Clásica, Viva Mex, Hot dog, Papas) con precio; título en compu a 3 líneas.
3. Arreglado: secciones en compu de 110 a 84 px.
4. Parcial: el cierre de la columna derecha ahora es un bloque punteado con Llamar; el desbalance de columnas sigue un poco.
5. Arreglado: mesa y miniaturas de la carta sin lazy.
6. Arreglado: bebidas/pannini con botón Llamar 449 918 8874 (44 px).
7. Verificado: mantel 0.9 s + 0.15 s, foto 1.1 s; resuelto antes de 1.6 s.
8. Arreglado: celular 10,967 px, compu 8,292 px, alertas [] en ambos.
