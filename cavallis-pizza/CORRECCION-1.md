# Corrección 1 Cavalli's Pizza (pulidor)
## Los 8 más visibles
1. Compu: la carta son 3 arcos gigantes, la sección mide 3 pantallas y "Tu pedido" queda hasta abajo, lejos de los platos.
2. Compu: el título "Dos sabores" queda solo arriba y el cortador una pantalla abajo (hueco > 90 px).
3. Compu: "Techo de flores." se pierde sobre las flores rosas, no se lee.
4. "Todo listo": voz de investigador ("los botones usan el 449... de Maps, sin confirmar").
5. Compu: "Todo listo" en una sola columna con media pantalla vacía.
6. Fotos que venden (carta y cortador) con loading="lazy": en celular tardan en salir al bajar rápido.
7. Compu: el pie queda pegado a la izquierda con todo el ancho vacío.
8. Cortador en compu: el texto de ayuda queda lejos de los controles; la pizza no se lee como "tócame".
Prueba anti-genérico: 1 no (cortador mitad y mitad con sus pizzas, techo de flores, arco), 2 no, 3 no (pizza circular que gira), 4 no (5 verdes), 5-8 no. Pasa.

## Resultado
- Arreglado 1: compu ≥1100 en 2 columnas (título + Tu pedido a la izquierda, 6 platos en 3 columnas a la derecha, título a 54 px).
- Arreglado 2: el título "Dos sabores" se movió junto a los controles; pizza a la izquierda ocupando las 2 filas.
- Arreglado 3: degradado lateral oscuro en compu detrás de "Techo de flores."
- Arreglado 4: "Su WhatsApp de pedidos", sin notas internas.
- Arreglado 5: "Todo listo" en 2 columnas en compu.
- Arreglado 6: sin loading="lazy" en carta y cortador.
- Arreglado 7: pie en 2 columnas en compu, Facebook a la derecha.
- Arreglado 8: anillo que late 4 veces en el cuchillo para que se note que se toca.
- No arreglado: WhatsApp sin confirmar, precios y fotos propias (dependen del dueño, ya en PENDIENTES).
Verificado: alertas [] en m y d; celular 7,706 px; 5 wa.me con texto armado.
