# Corrección 4 (revisor final, 5 oct 2026)

## Encimes
Antes: 33 (celular 3, tableta 16, compu 14). Después: 0 en celular, tableta y compu (encimes.mjs).
Causa: Anton tiene una caja de letra de 1.5em y los títulos van a line-height .96, así que la caja de cada título se montaba en el antetítulo de arriba y en el párrafo o botón de abajo.
- Antetítulo × título (carta, plato, reseñas, el lugar, visítanos, completar) y placa × H1 del hero: `h1,h2{padding-top:.1em}`.
- Título × párrafo/botón (hero, "Humo." × Cómo llegar): margen inferior `max(14px,.26em)` en h1/h2 y en `.brasa h2`.
- "4.7" gigante × título y × sucursales: número a line-height 1 con aire medido; en tableta y compu el 4.7 pasa a la derecha del título.
- "PM" × "Se prende": margen inferior del 4PM de .18em.

## Otros arreglos
- Hero en celular: la placa "Av. Ferrocarril 901 · Aguascalientes" se partía en dos renglones; ahora va en una línea.
- Plato: aire entre la indicación y "Carne para el taco 1"; extras apagados más visibles (se veían como mancha); el plato se queda fijo en tableta y compu mientras eliges (antes dejaba un hueco grande abajo).
- "Todo listo para completar" a dos columnas en tableta y compu (antes media pantalla vacía).

## Verificación
Celular 11,039 px, tableta 9,296, compu 8,661. krevo-shot m y d con alertas: []. 8 reseñas reales con nombre, estrellas y fuente; mapa embebido; galería de 8; botones en cada sección.
Pendiente igual que antes: WhatsApp sin confirmar (usa el 449 546 0014 de la ficha de Ferrocarril), precios y fotos propias (ver PENDIENTES.md).
