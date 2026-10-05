# CORRECCION-4 Casa Miguel (revisor final, 4 oct 2026)

## Encimes y cortes (encimes.mjs)
- Antes: compu 2 encimes reales (eyebrow "Restaurante mexicano · Plaza Palmas" contra el H1 del hero; eyebrow "Con las lámparas prendidas" contra "Salón. Barra." en el salón). Alfa Slab One dibuja más alto que su caja de línea; se dio aire: `.cm-hero-eb{margin-bottom:clamp(14px,3vw,30px)}` y `.cm-salon-t .t2{margin-top:clamp(14px,3vw,30px)}`.
- A ojo en celular (no lo detectaba el script): botones AGREGAR de la lista de la carta se salían por la derecha ("AGREGA"), y el estado del header se partía en dos renglones feos ("ABRE MAÑAN / 8 A"). Arreglado: columnas `100px minmax(0,1fr) auto`, gap 12, h3 22 px y botón con padding 12; header `white-space:nowrap` con textos cortos ("Abierto hoy" / "Abre 8 am"). En Visítanos el renglón de estado quedó "Cerrado · abre mañana 8 am".
- Al agregar las secciones nuevas salieron 5 encimes en t y d: el "$199" gigante contra sus rótulos (margen `.2em` arriba y `.18em` abajo) y las respuestas de preguntas cerradas (`details:not([open])>p{display:none}`).
- Después: 0 encimes, 0 cortados en m, t y d. Quedan 2 "FUERA" en celular: son las tarjetas 2 y 3 del carrusel de reseñas, fuera de pantalla a propósito (scroll-snap); confirmado en la captura.

## Qué se agregó (estaba corta: 8,321 px y 7 secciones)
- 025-desayunos: banda cobre con "$199" gigante en plato rojo, los 6 platos del Paquete 1 en catálogo tipográfico numerado, extras +$10 (jugo combinado / café de olla), botón verde "Pide tu desayuno" (wa.me armado) y link "Mejor aparto mesa". Todo sale de la foto de la carta en research/hechos.md.
- 055-preguntas: 6 preguntas reales (para llevar, terraza, gasto por persona $200-300 de Google, horario, grupos, música en vivo) en acordeón con oficio, cierre "Pregúntanos por WhatsApp".
- Menú del header con 6 entradas (se agregó Desayunos).

## Verificación final
- encimes.mjs: m 10,478 px / t 9,622 / d 9,286, 0 encimes reales.
- krevo-shot m y d: alertas [], 10 wa.me (todos a 524491827393 con mensaje; el de "Mandar mi mesa" lo arma el JS), tel: +524491532717.
- 9 secciones + pie, 6 reseñas con nombre y fuente, mapa embebido, galería de 5 fotos, botones en cada sección (máximo 1 verde por sección).
- Sin "$0", sin voz de investigador, sin datos nuevos fuera de research.
