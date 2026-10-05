# CORRECCION-4 El Capi (revisor final, 5 oct 2026)

## Encimes
- Antes: 6 en celular, 9 en tableta, 10 en compu. Causa: Anton tiene caja de 1.5em y los títulos iban con interlineado de 0.82 a 0.98, así que la caja del texto pisaba el eyebrow, el subtítulo y el renglón de abajo (hero, Menú, Tu burro, 4.3, Mega Burro/nota).
- Arreglo: aire con padding (no margin, porque se colapsaba) en el hero (Mega Burro / 40 cm / texto), `.eyebrow + h2`, `h3 + .note`; el 4.3 ahora va en fila con su columna al lado (eyebrow, estrellas, 604 opiniones) en vez de apilado.
- Después: 0 en celular, tableta y compu. krevo-shot m y d: alertas [].

## Agregado
- Sección nueva 06 "Aquí, en tu auto o en tu casa": 4 formas reales de pedir (mesa, desde el auto, Uber Eats/Rappi sin contacto, WhatsApp armado desde el menú) y placa de promos ("promos algunos días", de reseña y de Google) con WhatsApp. Link "Cómo pedir" en el menú. Quedan 8 secciones.
- Reseñas: barras reales de Google (350/146/59/21/28) y "lo que más mencionan" con los temas que marca Google (costra de queso, pastor, hígado, asada, quesadillas, cerveza). Píldoras cambiadas a sellos rectangulares; el estado "Abierto" igual.
- Tableta (820): ahora usa el diseño de 2 columnas (corte en 780 px); reseñas a una columna entre 780 y 1099 para que las comandas no se aprieten. Alto tableta 9,341.
- Compu: el 4.3 se queda pegado arriba (sticky) para no dejar hueco amarillo; menos aire entre hero y menú.
- Celular: foto de la carta más baja (54svh) y galería sin la panorámica (en compu sí va) para bajar el alto: 11,158 px.

## Sigue pendiente
- Reseñas con nombre: solo 3 (Maps sin sesión no da más, Restaurant Guru bloquea). No se inventó ninguna; está en "Todo listo".
- WhatsApp 449 264 5075 no confirmado como WhatsApp (es el teléfono de Maps).
