# Corrección 1 (PULIDOR, 5 oct 2026)
Problemas más visibles, en orden:
1. Boleta de la lotería: el sello "¡Lotería! Línea completa" se veía con la boleta vacía (CSS display ganaba a [hidden]).
2. Carta: "cebolla" en el pozole rojo no está en research.
3. Platos de la lotería y carta: revisar que los 9 estén nombrados en research.
4. Sopes, flautas, huaraches y chimichangas sin foto (cartas tipográficas con inicial).
5. Sin WhatsApp publicado: todo debe ser Llamar (tel:+524492584516), sin wa.me.
6. Alto de celular dentro de 9,000 a 11,000 px.
7. Encimes en m, t y d.
8. Nunca "$0": boleta vacía = "Elige arriba", sin precio = "Pregunta el precio".
Prueba anti-genérico: pasa (lotería propia, puerta chica, greca de mesas, 0 verdes, 9 secciones con pie).

## Resultado
1. Arreglado: `.lt-stamp[hidden],.lt-empty[hidden]{display:none}`; probado: vacío sin sello, línea 1-2-3 con sello.
2. Arreglado: "Con rábano y limón."
3. Verificado: pozole rojo/verde, enchiladas, carne asada con nopales, tostadas (fotos de Maps); sopes y flautas (Gustavo Islas Guerra), huaraches (Benilde Leon), chimichangas (Guillermo Nieto - Reyes, Fer Sanchez). Ninguno cambiado.
4. No arreglado: no hay fotos de esos platos en research (queda en PENDIENTES).
5. Verificado: 0 wa.me, 8 tel:.
6. Verificado: 10,159 px en celular.
7. Verificado: 0 encimes en m, t y d.
8. Verificado: 0 "$0" en index.html y JS.
