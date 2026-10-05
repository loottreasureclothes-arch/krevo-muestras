# Corrección 4: La Casa del Chilaquil (revisor final, 4 oct 2026)

## Encimes (encimes.mjs, antes → después)
- Antes: celular 3 encimes, tableta 2, compu 2 (7 en total) + 1 "fuera".
  - Eyebrow «Lo cuentan en la mesa» encimado con el título «Lo dicen» (m, t, d).
  - Eyebrow «Dos casas en Aguascalientes» encimado con «Pásale a» (m, t, d).
  - «en el Encino.» (em del título) encimado con el dato gigante «4.4» (solo celular).
- Arreglo: `.cc-eyebrow` ahora trae `margin-bottom:12px` en todo el sitio (site.css); el 4.4 baja con `margin-top:22px`, `line-height:.9` y la rejilla de opiniones con `row-gap:26px` (50-opiniones.css).
- Después: 0 encimes y 0 cortados en celular (390), tableta (820) y compu (1440).
- "FUERA p «Muy rica la comida…»": es la segunda tarjeta del carrusel de reseñas que asoma a propósito por el borde derecho (scroll-snap). Falso positivo, se deja.

## Agregado
- 2 reseñas reales nuevas de Google (Encino, panel "Todas las reseñas" sin sesión): Diana FP (5) y Cristian Link Jesus (4). Ahora son 7 con nombre, estrellas y fuente; contador del carrusel 1 / 7. Guardadas en research/resenas.md.
- Hero: la línea de datos ahora dice "Encino y Universidad, Aguascalientes · Todos los días, 8:30 a 13:00 · 4.4 en Google · 563 opiniones" (antes solo la dirección de Encino).

## Verificado
- wa.me: 5 mensajes distintos, todos al 52 449 377 0498, decodificados.
- Pestaña Universidad de Visítanos capturada aparte: dirección, horario, fachada, nota del WhatsApp, botones WhatsApp / Llamar 449 238 8290 / Cómo llegar, sin encimes.
- Alto en celular 9,446 px; 8 secciones + pie.
