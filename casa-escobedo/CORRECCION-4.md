# CORRECCION-4 Casa Escobedo (revisor final, 4 oct 2026)

## Encimes (encimes.mjs)
Antes: celular 4, tableta 4, compu 3 (+1 "fuera" en celular y tableta).
- "145" encimado con "invitados a tu mesa" (03-patio): el número con line-height .82 dejaba los glifos de Gloock fuera de su caja. Ahora line-height 1.3 con margen -.04em; medido con rangos de texto, ya no se tocan.
- Tres preguntas del acordeón encimadas con la respuesta de la pregunta anterior cerrada (07-preguntas): Chrome seguía dando caja a los párrafos de los `details` cerrados. Ahora `details:not([open])>p{display:none}`.
Después: 0 encimes en celular, tableta y compu. Queda 1 "fuera" en celular/tableta: las estrellas de la segunda tarjeta del carrusel de reseñas, que asoma a propósito por el borde derecho (falso positivo, confirmado en captura).

## Para que no se vea sencilla ni con huecos
- 02-mesa: bloque "lo que cuentan de la mesa" con 3 datos reales de reseñas de Google (carnes a su término, ingredientes frescos del día, bak' bak' favorito) y nota "Cocina mexicana. Así lo cuentan en Google quienes ya comieron aquí". En compu las fotos chicas pasan a la columna derecha bajo la carta: se quitó un hueco de ~480 px que había entre la nota y el botón.
- 07-preguntas: bloque "Así se aparta" en 3 pasos (escribir fecha e invitados, venir a conocer el patio mar-sáb desde la 1:00 p.m., apartar y armar menú/barra/decoración). En compu llena el hueco de ~300 px que quedaba bajo el título.

## Verificación final
- encimes.mjs: 0 / 0 / 0 encimes reales (m / t / d).
- krevo-shot m y d: alertas: [], 6 wa.me con número 524495290113 y mensaje armado, 2 tel:.
- Alto celular: 10,352 px (antes 9,734). 9 secciones. 6 reseñas con nombre y fuente + 4.4 / 1,119 en Google con botón a la ficha. Mapa embebido. Sin "$0". Sin git.
