# CORRECCION-1 Casa Miguel (pulidor, 3 oct 2026)
## Problemas más visibles (en orden)
1. Hero celular: la cartela "Plato de la casa / Chile en nogada" encimada sobre el toro y el logo del plato.
2. Compu: huecos de 104-110 px arriba y abajo de carta, mesa, voces y visita (banda roja vacía bajo las opiniones).
3. "Taco de camarón" no está en research (la foto es camarón; IG habla de cóctel). Nombre inventado.
4. Fotos de la carta (las que venden) con loading="lazy".
5. Momento firma: el salón solo estaba apagado antes de 1.6 s globales, así que casi nunca se veía encenderse; además animaba filter.
6. Mesa en compu: plato chico y columna de controles angosta (botón 340 px, select 280 px).
7. Header compu: wordmark de 19 px y cuernos de 34 px, se pierden a 1440.
8. Dato "18 años" viene de una nota de 2024; en 2026 se lee viejo.
Prueba anti-genérico: 0 sí (hero con letrero de su calle y su plato; mesa redonda propia; 5 verdes; 6 secciones; 7,069 px).
## Resultado
- 1 arreglado: cartela solo en compu/tableta.
- 2 arreglado: paddings de compu a 84/80-88 px.
- 3 arreglado: ahora "Camarones" (carta, alt y mensaje de WhatsApp).
- 4 arreglado: sin lazy en fotos de la carta.
- 5 arreglado: el salón entra apagado al llegar y se prende en 0.9 s con capa de opacidad (sin filter), reversible.
- 6 arreglado: plato 560 px, botón 420 px, select 340 px, mensaje 17 px.
- 7 arreglado: wordmark 26 px y cuernos 50 px en >= 820.
- 8 no arreglado: se deja "18 años" (único dato con fuente); pedir año de apertura al dueño.
