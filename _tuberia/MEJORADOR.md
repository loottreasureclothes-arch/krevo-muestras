# MEJORADOR (Opus): completar una página ya publicada que quedó corta

Emanuel (4 oct 2026): "se ven muy cortitas; falta el Google Maps, faltan reseñas, faltan botones; no traen la calidad de antes". Tu trabajo: que la página quede COMPLETA con todos los BLOQUES OBLIGATORIOS del CANON, sin perder su identidad (colores, tipografías, componente firma).

Lee SOLO: `CANON.md` (misma carpeta; sobre todo "BLOQUES OBLIGATORIOS"), `<sitio>/HOJA-CORTA.md`, `research/hechos.md`, `research/resenas.md`, `research/FOTOS.md`, `PENDIENTES.md`. Mira `research/fotos/_hoja.jpg` (o `fotos/maps/_hoja-maps.jpg`) una vez.

## 1. Juntar lo que falta (máximo 12 minutos)
- **Reseñas**: si `resenas.md` tiene menos de 6 con nombre, completa hasta 8 a 10 de fuentes públicas sin sesión: Restaurant Guru (`curl -sL "https://restaurantguru.com/search?q=<nombre>+Aguascalientes"` y la página del negocio), TripAdvisor, Yelp, Facebook recomendaciones públicas, o el panel de Maps con el navegador (TU pestaña con `tabs_create` y su `tabId` en cada llamada; si no carga, no insistas). Filtra el HTML con python; nunca lo vuelques entero. Solo reseñas positivas o neutras, literales, con nombre, estrellas y fuente. Guárdalas en `resenas.md`.
- **Horario por día, dirección exacta y link de la ficha de Maps**: de `hechos.md`; si falta el link, búscalo (`https://www.google.com/maps/search/<nombre+dirección>`).
- **Fotos para galería**: usa las de research que todavía no están en la página (4 a 8).

## 2. Agregar a la página (en su mismo estilo)
- **Reseñas**: sección propia (o rehacer la que hay) con la calificación y número de opiniones de Google grandes, 6 a 9 reseñas en un diseño con oficio (carrusel con swipe o muro, no tarjetas iguales con ícono), estrellas, nombre y fuente, y botón "Ver todas en Google" a la ficha.
- **Visítanos**: mapa de Google embebido `<iframe src="https://www.google.com/maps?q=<nombre+dirección+Aguascalientes>&output=embed" loading="lazy" title="Mapa">` dentro de un marco con la forma de la página; dirección, horario por día con "Abierto ahora / Cierra a las X" calculado con la hora de Aguascalientes; botones Cómo llegar (link a la ficha de Maps), Llamar (`tel:`) y WhatsApp. Si hay varias sucursales, una pestaña por sucursal con su mapa.
- **Galería o recorrido** del lugar con 4 a 8 fotos (collage de anchos desiguales o carrusel), si no la tiene.
- **Botones**: hero con 2 acciones; cada sección cierra con una acción clara (máximo 1 verde por sección, las demás en color de marca o link con flecha); pie con teléfono, dirección, horario y redes reales (SVG 44 px).
- Si con eso queda en menos de 8,000 px en celular, agrega UNA sección más que venda con datos reales (historia/años, promociones reales, para eventos o grupos, preguntas frecuentes con datos de research).
- Todo en `sections/` + `python3 build.py`. Ediciones chicas en lo que ya está bien.

## 3. Verificar
krevo-shot `m` y `d` (`| tail -3`) con `alertas: []` (la alerta de carga del iframe del mapa se ignora), alto en celular entre 8,000 y 11,000 px, mapa visible, 6+ reseñas, wa.me decodificado. UNA hoja con `python3 _tuberia/hoja.py <scratch>/s <scratch>/hoja.jpg`, mírala; arregla lo que se vea mal. Máximo 4 imágenes vistas. Anota en `CORRECCION-3.md` qué agregaste. Sin git.

Devuelve solo el JSON: slug, nota (0-10, juez duro), resenas (número en la página), mapa (true/false), alto_celular_px, alertas, agregado (lista corta).
