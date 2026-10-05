# Corrección 4 (revisor final, 5 oct 2026)

## Encimes
- Antes: celular 10, tableta 15, compu 13. Casi todos venían de Saira Condensed, que trae un alto de letra enorme: con interlineado de .86 las cajas de texto se pisaban (etiqueta contra título, "Parrillada para 2" contra "desde $340", "Total" contra "$670", "4.1" contra el título de opiniones, "pa' toda la mesa" contra el subtítulo).
- Arreglo: ascent/descent/line-gap override en los @font-face de Saira (92 % / 24 % / 0), aire entre etiqueta y título, margen de .18em arriba del título grande del hero, separación en el ticket y en el total de la tabla.
- Después: 0 encimes en celular, tableta y compu. Quedan 2 "fuera" por medida: son las comandas del carrusel de opiniones que se asoman a propósito en la orilla (falso positivo).
- La etiqueta "Asadero Bar · Aguascalientes" del hero se perdía sobre la foto: ahora va en color luz con sombra.

## Tableta
- La tableta (820) era el celular estirado (12,677 px). El diseño de 2 columnas ahora arranca en 800 px.
- Se corrigió lo que se desbordaba a 820: botones del hero partidos debajo de la foto, ticket, botones y datos del salón, título y horario de Visítanos. Ancho de página = ancho de pantalla en 820 y 1000.

## Agregado
- El salón (Mariachi en vivo) tenía solo foto y un renglón: se le pusieron datos reales ($200 a $600 por persona, cumpleaños y grupos, familia o negocios) y el botón de WhatsApp "¿Qué noche toca?" junto a Cómo llegar.

## Cierre
- Alto en celular 9,652 px; 8 secciones; 9 reseñas reales; mapa, galería y pie completos; alertas [] en celular, tableta y compu.
- La foto del mariachi sigue recortada de la cintura para abajo (sin caras). Si el dueño manda una con permiso, mejora mucho esa sección.
