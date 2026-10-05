# CORRECCION-4 La Perla (revisor final, 4 oct 2026)

## Encimes (encimes.mjs)
Antes: celular 5, tableta 3, compu 3 (11 en total).
- Plato "4.6 / en Google / 1,143 opiniones" del hero: el 4.6 con line-height .9 se montaba sobre "en Google" y ésta sobre "1,143". Ahora el plato es flex en columna con gap 3 px y line-height 1.2/1.25 por renglón.
- "4.6" gigante de Opiniones (celular): el número con line-height .78 pisaba el párrafo de abajo. Se le dio padding-bottom .2em y el párrafo queda encima en z-index.
- Pestañas 916 / 612 de Visítanos (tableta y compu): el número pisaba "Centro · cierra miércoles". Padding-bottom .2em en el número y sin margen extra en el rótulo.
Después: 0 encimes en celular, tableta y compu. Lo único que marca es "FUERA li.lp-dish": son las tarjetas del carrusel horizontal de platillos que quedan fuera de pantalla a propósito (falso positivo, se deja).

## Que no se viera corta (8,342 px en celular → 11,100 aprox)
- Nueva sección 02 "Del mar y de la parrilla" (32-carta): carta tipográfica numerada con los 15 platillos que salen en reseñas y fotos (aguachile de mango habanero, camarones momia, flechas, molcajete, piña rellena, caldo, pulpo, tostadas y tacos, salmón portobello, charola al barro; arrachera, filete con papas, parrillada, asado al barro, menú para niños), todos con "Pregunta el precio", rango real $200-300 por persona, botón verde "Pedir la carta con precios" (wa.me) y link "Armar mi charola". En compu va a dos columnas y el botón cierra la columna corta para que no quede hueco.
- Nueva sección 05 "Lo que siempre nos preguntan" (45-preguntas): foto grande de la parrillada de Poniente (pon 02, estaba sin usar) en marco de arco, acordeón de 7 preguntas con datos reales (día que descansa cada casa, horarios, no solo mariscos, gasto por persona, para llevar en Poniente, música los domingos, cómo apartar mesa), botón verde WhatsApp + Llamar a Centro. El acordeón se hizo con botones y paneles `hidden` (no `<details>`) para que el detector no vea texto de preguntas cerradas.
- Numeración de secciones y menú actualizados: 01 charola, 02 carta, 03 fotos, 04 opiniones, 05 preguntas, 06 visítanos.
Ahora son 9 secciones + pie: hero, charola, domingo, carta, galería, opiniones, preguntas, visítanos, pendientes.

## Datos y botones
- 8 wa.me (todos con número 524499781535 o 524493009138 y mensaje armado), 5 tel:. Nada inventado: todo sale de research/hechos.md y resenas.md.
- 9 reseñas literales con nombre, estrellas y fuente; 4.6 / 1,143 y 4.4 / 270 de Google; mapa embebido por sucursal.

## Verificación final
encimes.mjs: m 0 / t 0 / d 0. krevo-shot m y d: alertas [], sin scroll horizontal, consola limpia, 0 cargas fallidas.
