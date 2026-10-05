# Corrección 4 Tikin Xic (revisor final, Fable 5, 4 oct 2026)

## Encimes (encimes.mjs, antes → después)
- Antes: celular 1, tableta 0, compu 2 (3 reales en total).
  - Celular y=5733: el «4.8» gigante (line-height .8) pisaba el eyebrow "Lo que dice la mesa". → `.dato` con margen inferior 34 px + padding 10 px.
  - Compu y=205: eyebrow "Cocina de mar · Aguascalientes" × h1 "Mar fresco," (la caja de glifos de Young Serif sube más que la línea). → `.eb` margen inferior 14 → 20 px en celular y 26 px en compu/tableta (site.css).
  - Compu y=3481: eyebrow "Platos fuertes" × h2 "De $171". → mismo arreglo del `.eb`.
  - Apareció uno nuevo en compu y=9052 tras mover márgenes: em "para completar." × "Pásanoslo por el mismo chat…" (sin margen entre título y párrafo en la rejilla). → `.listo-p` margen superior 8 px (celular) y 26 px (compu).
- Después: 0 encimes, 0 cortados, 0 fuera en celular (390), tableta (820) y compu (1440).

## Visto a ojo (recortes a tamaño real en celular)
- Botón "Llamar 449 347 5594" se partía en dos renglones en celular dentro de la rejilla de Visítanos. → Texto "Llamar" (el número sigue en el hero, pie y tel:) y `white-space:nowrap` en los botones del mapa.
- Hero, riel vacío, 4.8 + reseñas, horario con el día de hoy, mapa en marco de madera y "Todo listo" se ven bien; sin textos sobre foto sin contraste ni sellos encima de botones.

## Sustancia (no se tocó, ya cumplía)
- Alto en celular 10,644 px; 8 secciones + cierre "Todo listo" + pie. 9 reseñas con nombre, estrellas y fuente (Google, TripAdvisor), 4.8/613 con botón a Google. Mapa embebido, horario por día con estado calculado, botones Cómo llegar / Llamar / WhatsApp. Galería de 7 fotos. Carta con precios reales y "Pregunta el precio" donde no hay. Sin "$0", sin voz de investigador.
- wa.me decodificados: 524493475594 con "Hola Tikin, quiero hacer un pedido." y "Hola Tikin, ¿tienen mesa hoy?"; el riel arma su propio mensaje con total. tel:+524493475594.

## Pendiente del dueño (sigue en PENDIENTES.md)
- Confirmar que el 449 347 5594 es el WhatsApp de pedidos; carta de tacos/tostadas/ceviches con precios; fachada, equipo y logo en alta.
