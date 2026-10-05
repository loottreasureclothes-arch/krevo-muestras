# Corrección 4 (revisor final, 4 oct 2026)

## Encimes (encimes.mjs)
Antes: celular 6, tableta 11, compu 4. Después: 0 / 0 / 0.
- "Neón. Piedra. Plantas." (04): las tres palabras iban con line-height .86 y sus cajas se montaban (en tableta "Plantas." subía sobre "Neón."). Ahora line-height 1.02 (1.04 en compu) y tamaño clamp un poco menor; se agregó la etiqueta "Una noche en Burdo" arriba a la izquierda.
- "4.7" (05): en tableta y compu el número a 50vw se salía de su columna y se montaba sobre el título y las reseñas. Ahora clamp(140px,16vw,300px) en ≥820 y 46vw en celular.
- Preguntas (07): el acordeón `<details>` cerrado dejaba las respuestas con caja encima de la pregunta siguiente. Se cambió por lista fija pregunta/respuesta (todo visible, sin toques).

## Agregado para que no se vea corta ni sencilla
- Reseñas: de 2 a 6 reales con nombre y fuente (Carolina, Victor Villanueva, Regina Portilla, Diana Enciso, Jok 4★, Adriana Guerra Avila; Google, 4 de Maps y 3 vía Restaurant Guru). Contador actualizado a 1,684 y barra "1,380 le dieron 5 estrellas". En compu quedan en rejilla de 2 columnas escalonadas; en celular tira con swipe.
- Carta: cada platillo trae una línea de qué lleva (sacada de las fotos y de las reseñas: arrachera con chorizo, cebolla y jalapeño; arúgula y balsámico; cocteles = 44 reseñas).
- Preguntas: "¿Qué piden más?" ahora incluye tuétanos (reseña de Victor).
- research/resenas.md: reseñas nuevas completas, conteo por estrellas, Facebook 4.9/397 según Restaurant Guru, TripAdvisor 0.

## Verificado
- wa.me: 4 variantes, todas con 524494605315 y mensaje armado; 2 botones tel:. Sin "$0", sin guion largo, sin "según su ficha".
- Alto celular 10,767 px (tableta 11,003; compu 10,808). 8 secciones + pie con Todo listo para completar.
- Mapa de Google embebido, 7 fotos en recorrido, 6 reseñas, horario por día con "Abierto ahora".
- Pendiente del dueño: WhatsApp sin confirmar, horario real, precios, logo, redes.
