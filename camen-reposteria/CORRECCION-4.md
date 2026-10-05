# Corrección 4 (revisor final, 4 oct 2026)

## Encimes
- Antes (enc.json 21:41): 2 encimes reales en celular, 3 en tableta y 3 en compu: "Hecho" sobre "a diario." (título de la sección 04) y el "4.7" gigante sobre "en Google, con 196 opiniones" (sección 05).
- Arreglo: interlineado del título de 04 a 1 y del 4.7 a 1.14 con margen al párrafo; quedaron en 0 encimes, 0 cortados en celular (390), tableta (820) y compu (1440).
- "Fuera" que reporta en celular: la segunda tarjeta del carrusel de opiniones (rvw-b, Venus Becerra). Es un carrusel horizontal con scroll-snap, la tarjeta está fuera de pantalla a propósito. Confirmado en el recorte: falso positivo.

## Agregado o afinado en esta pasada
- Ticket de fiesta: ya no muestra "$0" en reposo; dice "Marca lo que lleves" y cambia a la suma real al marcar extras.
- Botones "Llamar" y "Cómo llegar" de Visítanos: ya no se parten en dos renglones a 390 px.
- Opiniones: hueco de abajo recortado (padding 70 → 52 px) para que no quede banda vacía antes de la galería.

## Verificación
- encimes.mjs: 0 encimes reales en m, t y d.
- krevo-shot m y d: alertas []. Celular 11,091 px, tableta 10,579 px, compu 9,931 px. 9 secciones + pie.
- 6 reseñas con nombre y fuente, 4.7 (196) Google + 4.5 Fundición + 4.9 Uber Eats, botón "Ver todas en Google".
- Mapa de Google embebido (Zaragoza y Fundición; Américas sin ficha, con aviso y teléfono).
- wa.me decodificados: todos al 449 912 1601 con mensaje armado (el WhatsApp real sigue PENDIENTE de la dueña; es el fijo publicado de Matriz). tel: Zaragoza, Fundición y Américas.
- Recortes a tamaño real de celular mirados (16 pantallas en 4 hojas) y hoja de compu.
