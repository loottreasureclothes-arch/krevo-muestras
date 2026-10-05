# CORRECCION-1 (pulidor, 5 oct 2026)

## Problemas más visibles (en orden)
1. 10 bloques (9 secciones + pie): el cliente pide 9 contando el pie.
2. Sección "dato $195" floja: un número sacado de una sola reseña, repite la foto f17 de la baraja.
3. Logo: aguacate genérico (fruta partida) que no se parece al aguacate floral real de su letrero y su menú.
4. Sello del hero sin su aguacate (heredaba color crema sobre fondo crema, invisible).
5. Título del hero parafraseado: el menú dice literal "El auténtico BRUNCH es tu ritual MATUTINO".
6. Verificar precios contra research (bebidas de maps-19) y que no haya "$0".
7. Verificar que todo botón sea Llamar (tel:) y cero wa.me.
8. Verificar encimes en m/t/d tras los cambios.

Prueba anti-genérico: 1 no (sello de San Marcos, aguacate floral, baraja con sus fotos); 2 no; 3 no; 4 no (0 verdes); 5 no; 6 no; 7 no; 8: 8 secciones + pie, 10,016 px en celular (pedido del cliente: 9,000 a 11,000).

## Resultado
1. Arreglado: 05-dato quitado (respaldo en /tmp/tuberia/towate-brunch-pul/quitado/); 9 bloques contando el pie.
2. Arreglado: el $195 queda citado literal dentro de la reseña de Luisa Zenal ("gasté sólo $195 antes de propina").
3. Arreglado: el aguacate SÍ es su marca real; se redibujó como silueta con flor calada y hojas, más cercano a su logo.
4. Arreglado: color propio en el sello.
5. Arreglado: h1 "El auténtico brunch es tu ritual matutino" (también og:title).
6. Arreglado/verificado: los 12 precios coinciden con hechos.md; frappé sigue en "Pregunta el precio"; total vacío = "Elige arriba".
7. Verificado: 8 enlaces tel:, 0 wa.me.
8. Verificado: m 0, t 0, d 0 encimes.
