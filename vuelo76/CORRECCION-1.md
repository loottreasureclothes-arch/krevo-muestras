# Corrección 1 (PULIDOR, 5 oct 2026)

## Problemas más visibles (en orden)
1. Componente firma "La mesa de metal" se leía igual que otras mesas de la tanda (birrieria-ricky, cenaduria-el-sopecito): caja genérica con tres círculos vacíos.
2. La rejilla de la mesa era una trama tenue, no la rejilla de rombos de metal de su terraza (maps-11, g-crepa).
3. Los platos eran blancos/crema; los suyos son turquesa (g-crepa).
4. La comanda era texto plano, sin nada del mundo Vuelo76 (vuelo, puerta 107, terraza).
5. En compu, el título de "Tu mesa" quedaba desparramado en filas altas junto a la caja.
6. "Crepa de helado con papas" no coincide con research (FOTOS: "crepa con helado y papas").
7. Alts con detalles que no están en research (azúcar glass, pan de semillas, frappé de chocolate, refris y botellas).
8. Título "Arma tu mesa antes de llegar" intercambiable con cualquier restaurante.

Prueba anti-genérico: 1 no (rejilla, platos turquesa, pase Vuelo 76 / Puerta 107, letrero 24:00), 2 no, 3 no (Puerta 107 + letrero), 4 no (0 verdes), 5 no, 6 no (ya no repite la mesa de otros), 7 no, 8 no (8 secciones, 10,661 px pedido explícito del cliente 9,000 a 11,000). Pasa.

## Resultado
1. Arreglado: ahora es "Tu mesa de rejilla, puerta 107": cabecera de pase de abordar (Vuelo 76 / Puerta 107 / Asiento Terraza / Platos) y boleto troquelado "Pase a la mesa".
2. Arreglado: rejilla de rombos de metal oscuro con canto turquesa.
3. Arreglado: platos con borde turquesa claro como los de sus fotos.
4. Arreglado: pedido como boleto crema con muescas; el texto copiado dice "Pase a la mesa, Vuelo76 (puerta 107): ...".
5. Arreglado: filas de la rejilla en compu ajustadas (auto auto auto 1fr).
6. Arreglado en carta, alt y JS.
7. Arreglado: alts reducidos a lo que dice FOTOS.md.
8. Arreglado: título nuevo con su puerta y su rejilla.
No arreglado: precios (no hay en research, sigue "Pregunta el precio"); redes sin confirmar.
