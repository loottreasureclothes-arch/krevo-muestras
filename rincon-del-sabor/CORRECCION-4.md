# CORRECCION-4 (revisor final Fable, 4 oct 2026)
Pedido de Emanuel: letras empalmadas y páginas cortas; dejarla lista para mandar.

## Encimes que había (encimes.mjs)
- Celular 6, tableta 11, compu 8. Causa única: Anton tiene caja de 1.51 em, así que con line-height .9 y márgenes de 4-8 px el texto del título se montaba sobre el vecino.
  - Hero: eyebrow "Cenaduría · Aguascalientes" bajo el sello "$65" (celular); h1 a 150 px en tableta se salía por arriba bajo el header fijo; "en el Rincón." sobre el subtítulo; dentro del sello, "$65" sobre "todos los días" y "el junior".
  - Pozole: "ROJO" gigante sobre "Hoy es domingo…" y "Pozole rojo, el de todos los días."
  - Reseñas (tableta): "Y su" sobre el 4.3.
- Arreglo (site.css): h1 del hero a 17.4vw (2 líneas en celular), line-height .95 y márgenes en em; en tableta clamp(90,14vw,120); en compu clamp(96,7.4vw,108) para que "EN EL RINCÓN." quepa en 560 px. Sello: line-height 1.2 y margen .2em. ROJO: line-height 1.02 y márgenes .22/.26em. 4.3: line-height 1 y padding-top 60 en reseñas.
- Ahora: 0 encimes, 0 cortados en m, t y d. Los 2 "FUERA" por tamaño son las papeletas del carrusel de reseñas que siguen a la derecha a propósito (confirmado en m-09).

## Otros arreglos
- Órdenes para el pozole a una columna en celular (antes "Orden de cueros" partía en 3 renglones en dos columnas apretadas).
- Comanda: el total ya no muestra "$0" vacío; aparece cuando hay algo pedido.

## Verificado
- wa.me: 5 links, todos a 524493319024 con mensaje decodificado ("Hola, quiero pedir en El Rincón del Sabor." ×4 y "Hola, quiero un pozole rojo.").
- krevo-shot m y d: alertas []. Alto celular 10,730 px, 9 secciones, 6 reseñas con nombre y fuente, mapa embebido por sucursal, galería de 5, pie completo.
- Hoja final mirada: hero en celular y tableta limpios, sin texto bajo el sello ni bajo el header.
- Sigue pendiente lo de PENDIENTES.md (WhatsApp real, logo en alta, precios vigentes).

Nota: el krevo-shot m/d con alertas [] es el de la corrida posterior al arreglo de encimes (alto 10,717). Los dos ajustes finales (órdenes a una columna, total oculto cuando la comanda está vacía) se verificaron con encimes.mjs sobre el build final (0/0/0, alto celular 10,730); la segunda corrida de krevo-shot se trabó por la Mac saturada con otras páginas y la maté (solo mi PID).
