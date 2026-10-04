# Corrección 1 Tikin Xic (pulidor, 3 oct 2026)
## Problemas más visibles (en orden)
1. 8 secciones (hero, piden, plato, fuertes, riel, voces, llegar, listo): pasa del máximo de 7.
2. Riel vacío mostraba "Total de la carta $0".
3. Riel en compu: controles en una columna de 620 px con media pantalla vacía.
4. "Todo listo" en compu: una columna a la izquierda y hueco a la derecha.
5. Hero de celular: foto a 55 % de la pantalla, no se sentía cartel.
6. Botones del hero en compu chicos para 1440.
7. Total con solo piezas sin precio también caía en "$0".
8. Componente firma sin verificar tras los cambios (wa.me).
Prueba anti-genérico: falla la 8 (más de 7 secciones) antes; después ninguna.

## Resultado
- 1 arreglado: "Todo listo" va como tarjeta dentro de "Cómo llegar" (7 secciones).
- 2 arreglado: dice "Sin platos" en tono apagado.
- 3 arreglado: en compu, pedido a la izquierda y total + botón a la derecha.
- 4 arreglado: tarjeta a 2 columnas (título y frase / lista).
- 5 arreglado: foto del hero a 62 svh.
- 6 arreglado: botones del hero 58 px en compu.
- 7 arreglado: dice "Por confirmar" si nada trae precio.
- 8 arreglado: probado, 3 piezas, "para llevar", total $342 y mensaje armado correcto.
- No arreglado: WhatsApp sin confirmar y carta de tacos/tostadas sin precios (siguen en PENDIENTES, dependen del dueño).
