# Corrección 4 (revisor final, 5 oct 2026)
## Encimes
- Antes: 1 real en m, t y d: el "4.9" gigante de Reseñas invadía el eyebrow "Lo que dicen en Google" (caja de texto de la fuente más alta que su line-height .85).
- Arreglo: `.rev .big{margin-top:.31em;font-size:clamp(120px,38vw,200px)}`. Después: 0 encimes, 0 cortados, 0 fuera en m (11,476 px), t (10,482) y d (9,772).
## Datos y botones
- Había 25 links `wa.me/?text=` SIN número (prohibido). El dueño publicó su teléfono en una respuesta de Google Maps ("márcame al 4491859239"). Todos los botones ahora son Llamar `tel:+524491859239` en rojo de marca (sin verdes, porque no hay WhatsApp confirmado). build.py: si `WA` está vacío, `{{wa:...}}` sale como tel:; al poner el número de WhatsApp vuelven los wa.me con mensaje (hay que regresar las clases btn-call a btn-wa y los textos).
- Flotante: ahora botón de llamar rojo con borde crema. Pie con "Tel. 449 185 9239". JSON-LD con telephone. og:description sin "WhatsApp".
- Cuatro cuartos: el botón dice "Llamar y pedirla" y la pista "Al llamar, di tu cuarto favorito".
## Agregado
- Reseñas: bloque "Lo que más repiten en Google" con las 3 frases del resumen de reseñas de Google Maps (literales).
- Salón en compu/tableta: encabezado a 2 columnas alineado con el collage; "Cómo llegar" alineado. Columna del 4.9 pegajosa (sticky) en compu para no dejar hueco.
## Sigue faltando
- Solo 2 reseñas con nombre + 1 visitante + 3 frases del resumen: Maps sin sesión solo muestra 3 reseñas (una es queja), Restaurant Guru pide captcha, TripAdvisor sin ficha. No se inventó nada.
