# CORRECCION-4 Mariscos Los Cabos (revisor final, 5 oct 2026)

## Encimes
- Antes (enc2, 4 oct 23:07): celular 7, tableta 22, compu 3. Todos en las preguntas frecuentes (respuestas cerradas de <details> que se contaban encimadas sobre la siguiente pregunta) y el botón de abajo. Se corrigió en 08-pedir.css (respuesta oculta de verdad cuando la pregunta está cerrada y espacio propio para el botón).
- Ahora: 0 encimes y 0 cortados en celular, tableta y compu.
- "Fuera" que quedan en celular: la tarjeta 02 del carrusel de reseñas, fuera de pantalla a propósito (se ve asomada en el recorte). Falso positivo.

## Agregado en esta vuelta
- 05-carta "Tostadas y lo demás": carta tipográfica con precios reales de Uber Eats (atún $75, pulpo $115, desde $68, aguachile negro $227, gobernador $86) y lo demás con "Pregunta el precio"; dato gigante 73 (reseñas que hablan de tostadas); botón verde.
- 08-pedir "Pide en tres pasos": 3 pasos + 5 preguntas frecuentes con datos reales (domicilio por apps, $200 a $300, terraza, horario, direcciones) + WhatsApp y Llamar.
- Ajustes de CSS en 01-hero, 04-tres, 06-galeria, 07-opiniones y 09-visitanos para tableta y compu.

## Verificación
- encimes.mjs: m 11,114 px, t 9,472 px, d 8,897 px, 0 encimes.
- krevo-shot m y d: alertas [].
- 6 mensajes wa.me decodificados, todos al 52 449 918 1146 (teléfono de Maps; WhatsApp sin confirmar, sigue en PENDIENTES).
- 9 secciones, 6 reseñas con nombre y fuente, mapa embebido, galería de 6 fotos, pie completo. Sin "$0" ni guiones largos.

## Segunda revisión (5 oct 2026, 03:20)
- Rebuild + encimes.mjs: m 11,114 / t 9,472 / d 8,897 px, 0 encimes y 0 cortados; los 3 "fuera" de celular son la tarjeta 02 del carrusel de reseñas (falso positivo, confirmado en recorte).
- krevo-shot m y d: alertas []. Recortes de celular a tamaño real revisados sección por sección: sin títulos tapados ni letras encimadas. En la compu el mapa sale vacío solo porque el iframe no cargó en la captura.
- No hizo falta tocar nada.
