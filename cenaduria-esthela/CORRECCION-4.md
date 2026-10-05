# CORRECCION-4 Cenaduría Esthela (REVISOR FINAL, 4 oct 2026)

## Encimes (encimes.mjs)
Antes: m 3, t 2, d 4 (9 en total). Después: 0 en m, t y d.
- Hero "Esta noche, / cena en Esthela.": las dos líneas se pisaban (Young Serif con line-height .94). Ahora 1.14, fuente 50-92 px, margen 18/22 px; en compu también pisaba el eyebrow y el párrafo.
- Comedor "Mesas / para todos.": mismo caso (line-height .95 -> 1.14).
- Opiniones: el 4.5 gigante (line-height .8) pisaba "Lo dicen en la mesa". Ahora line-height 1.12 y gap 22 px.
- FUERA (3 por vista): tarjeta Nº 646/647/648 del carrusel de reseñas asomando a la derecha a propósito (scroll-snap). Falso positivo, confirmado en recorte.

## Que no se vea corta ni sencilla
- Alto celular 8,907 -> 10,201 px; 8 -> 9 secciones (tableta 9,025; compu 8,570).
- Nueva sección 07-pedir (banda crema) "Tres pasos y a cenar.": numerales gigantes 1-2-3 (escoge, arranca la hoja, llama y léela) + caja burdeos "Para que no batalles" con datos reales de research (horario mar-vie 6 pm / sáb-dom 2 pm, chamorro solo fin de semana, medias órdenes cuestan más, lunes cerrado) + botón Ir a la carta. Compu: pasos 7/12 + caja 5/12.
- Opiniones: línea "Lo que más se nombra en esas 4,535 opiniones: pozole, sopes de lengua, flautas y la tradición de la casa" (temas de la ficha de Google en research).
- Comedor: subtítulo "Lugar amplio, sillas de madera y piso de barro" ahora visible en celular, foto más alta.
- Menú: entrada "Cómo pedir"; links del menú un poco más chicos para que quepan 6.
- Lugar/pendientes renumerados a 08 y 09.

## Datos y botones
- "$0" del talón vacío ahora dice "por sumar" (sin $0 en toda la página).
- 0 wa.me: no hay WhatsApp publicado; todo termina en tel:+524499180751 (hero, menú, talón, lugar, flotante). Sin cambio.
- Header: "Abierto hasta 11:45 pm" con pm pegado al número.

## Verificado
encimes.mjs 0/0/0; krevo-shot m y d con alertas []; 9 reseñas con nombre y fuente; mapa de Google embebido; galería 6 fotos; pie completo. Hoja final mirada.
