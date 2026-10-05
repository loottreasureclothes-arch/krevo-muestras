# Corrección 4 (revisor final, 4 oct 2026) Rincón Maya

## Encimes
Antes: 0 en celular, 2 en tableta y 2 en compu (el 4.5 gigante de reseñas, con line-height .8, se montaba sobre las estrellas y sobre "4,246 opiniones en Google"; se veía apretado en la hoja de compu).
Arreglo (05-opiniones.css): line-height .9 en celular y 1 en tableta/compu, más aire entre número, estrellas y conteo; en compu el número crece (hasta 300 px), estrellas de 36 px y barras más anchas (640 px) para que la cabecera no deje hueco a la derecha.
Al agregar texto a la casona salió 1 encime nuevo en t y d (el descendente del título contra el párrafo); se resolvió con margin-top 34 px en ≥760.
Después: 0 encimes, 0 cortados, 0 fuera en m (390), t (820) y d (1440).

## Qué se agregó (la sección más pobre era la casona: solo foto y título)
- 04-casona: párrafo con datos reales ("Casona de la plaza del Encino. Desayuno, comida y cena, de $100 a $200 por persona.", de la reseña de TripAdvisor y del rango de Maps), botón "Cómo llegar" (a Visítanos) y link "Ver el lugar" (a galería). Sección más alta (min 560 px) y velo más largo para leer sobre la foto.
Nada inventado; todo sale de research/hechos.md y research/resenas.md.

## Verificación
- encimes.mjs: m 0 / t 0 / d 0 (alto celular 9,807 px, tableta 9,149, compu 9,526).
- krevo-shot m: alertas []. krevo-shot d: las 13 capturas salieron limpias pero el script se quedó colgado al final (la Mac tenía ~45 Chromes headless de otras sesiones) y no escribió d-report.json; la corrida d anterior a estos cambios dio alertas []. 7 wa.me, todos a 524499167574 con mensaje armado (decodificado: "Hola Rincón Maya, quiero el Paquete Tulum.").
- 9 secciones, 8 reseñas con nombre y fuente, mapa embebido, "Todo listo para completar" sin wa.me, sin "$0", sin voz de investigador.
- Sigue en PENDIENTES: WhatsApp confirmado, precios del menú, logo, redes (no se localizaron; el pie no lleva logos de redes).
