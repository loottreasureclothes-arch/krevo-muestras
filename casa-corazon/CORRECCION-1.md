# Corrección 1: Casa Corazón (pulidor)
Problemas más visibles, en orden:
1. Hueco de ~100 px entre la carta y la tabla en celular.
2. Casillas sin foto con una letra suelta (C, B, C, C, T): se veían vacías.
3. Carta en compu en 3x2 con fotos enormes: sección de casi 2 pantallas.
4. Terraza en celular abre con puro cielo.
5. Fotos que venden (terraza y casillas) con loading="lazy" y casillas cargando la de 1600 px.
6. Cierre se desinfla: "Todo listo" y pie sin remate.
7. Datos fuera de research: ninguno encontrado (4.1, 2,698, horario, $100-300 coinciden).
8. Prueba anti-genérico: pasa (tabla de lotería propia, letrero colgante, 7 secciones, 4 verdes, sin contadores).

Resultado:
- 1 arreglado: padding carta 24 / tabla 32 arriba.
- 2 arreglado: casillas tipo carta de lotería ("El clericot", "Los boneless"...) con filete ámbar y brillo neón.
- 3 arreglado: carta en compu a 6 columnas escalonadas, una pantalla.
- 4 no arreglado del todo: la foto es vertical y casi del mismo formato; object-position abajo ayuda poco. Falta foto de terraza horizontal.
- 5 arreglado: sin lazy, casillas con srcset y sizes.
- 6 arreglado: remate "Nos vemos / en la terraza." grande en el pie.
- 7 sin cambios necesarios.
- 8 sin cambios necesarios.
