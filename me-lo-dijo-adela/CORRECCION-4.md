# CORRECCION-4 (revisor final, 4 oct 2026)

## Encimes que había (encimes.mjs)
- Celular y tableta: el eyebrow "La carta" pegado a las ascendentes del título "Toca un nombre," y "Para cerrar la página" sobre "Todo listo" (el eyebrow no tenía margen abajo). Arreglo: `.eyebrow{margin-bottom:16px}` global en site.css (hero lo deja en 0 porque ya usa gap); se quitaron los márgenes sueltos de reco/opi/vis.
- Compu: el "4.5" gigante (line-height .8) se metía sobre "465 opiniones en Google…". Arreglo: line-height .92 y estrellas con 22 px de aire.
- Al meter preguntas con `<details>`, el detector leía las respuestas cerradas; se ocultan explícitas con `.faq-i:not([open])>p{display:none}`.
- Resultado: 0 encimes, 0 cortados, 0 fuera en m, t y d.

## Qué se agregó (estaba corta: 7 secciones, 9,300 px)
- Sección nueva 07-pedir "Lo que más nos piden": ranking tipográfico con número grande y barra proporcional (19 sándwich, 16 platillos, 15 chilaquiles, 11 waffles, 8 café de olla: temas de las 465 reseñas de Google del Centro, de research/hechos.md); "Para pedir, tres toques" (carta → cómo y dónde → WhatsApp armado); 6 preguntas reales (domicilio, horario, gasto por persona, sin carne, Centro vs Norte, por qué todo tiene nombre) con datos de hechos.md; cierre con "Armar mi comanda" (marca) y "Llámanos" (tel:). Sin verde (la sección anterior ya lo trae).
- Menú: entrada "Para pedir".
- Aire entre Visítanos y la nueva sección recortado en compu (hueco de 260 px → ~200).

## Verificación
- encimes.mjs: m/t/d 0 encimes.
- krevo-shot m y d: alertas [] (ver JSON final abajo en el reporte del revisor).
- wa.me decodificados: "Hola Adela, quiero pedir una comanda." y "…pedir en la sucursal Centro." (número 524495376787, sigue SIN confirmar como WhatsApp: PENDIENTES.md).
- 8 secciones + pie. 6 reseñas con nombre, estrellas y fuente. Mapa embebido en Centro y Norte.
