# CORRECCION-4 (revisor final, 5 oct 2026)
## Encimes
- Antes: 7 en celular, 6 en tableta y 6 en compu. En TODAS las secciones el eyebrow se pegaba encima del título.
- Causa: el JS de aparición agregaba la clase `in` y chocaba con `.in{margin:0 auto}` (contenedor), así que se borraba el margen bajo el eyebrow. El primer nombre que probé (`rv`) chocaba con las tarjetas de reseña, así que se cambió a `is-shown` (site.js y site.css).
- Después: 0 encimes en m (390), t (820) y d (1440). El único FUERA es la 2a tarjeta del carrusel de reseñas del celular, que se sale a propósito (se desliza). Es falso positivo.
## Otros
- La hora ahora dice "9 a.m." en vez de "9:00 a.m.". Así el aviso de abierto o cerrado ya no deja "A.M." solo en otro renglón, y el ticket y el WhatsApp se leen más corto.
## Verificación
- Celular 11,060 px, tableta 10,499 px, compu 10,122 px. 9 secciones más el pie. 7 reseñas con nombre y fuente, 4.6 de Google con 1,414 opiniones y botón a la ficha. Mapa embebido, galería, componente firma. krevo-shot m y d con alertas [].
- wa.me/524959560095 decodificado: "Hola, Rosa Mexicano. Quiero reservar una mesa." Es el teléfono publicado en Maps. Que tenga WhatsApp sigue sin confirmar (PENDIENTES), y al lado siempre está Llamar.
