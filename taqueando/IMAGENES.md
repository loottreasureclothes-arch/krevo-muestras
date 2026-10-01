# Taqueando · Imágenes (origen y tratamiento)
Todas salen de `research/fotos/` (Google Maps, Facebook e Instagram del negocio). Nada de IA ni stock. Sin Real-ESRGAN (las grandes miden más de 1,200 px; las chicas se usan chicas). Permiso pendiente con el dueño.

| Archivo en img/ | Origen | Tratamiento | Uso |
|---|---|---|---|
| hero-480/960/1400.webp | maps-norte-07.jpg (1600x1200) | recorte 16:9 desde y 330 (deja fuera la camisa del comensal), webp | Hero |
| carta-480/960/1200.webp | maps-centro-17.jpg (1200x1600) | recorte 12:13, webp | Sección carta |
| taco-*.webp (11) | maps-centro-16.jpg (la carta de tacos) | disco recortado de 160 px (radio útil 78 px, sin las calcomanías), webp | Discos de la carta, la charola (también los 4 discos de "empieza aquí" de la charola vacía: pastor, bistec, arrachera, chorizo), el header y el cierre |
| salsas-480/1000.webp | maps-centro-04.jpg | recorte x 0-1000, y 380-1600 (sin la mano del comensal), webp | Opiniones |
| centro-480/960.webp | maps-centro-01.jpg (960x540) | solo mediana, nunca a sangre en compu | Tarjeta Centro |
| norte-480/960/1200.webp | maps-centro-19.jpg (= maps-norte-05) | franja y 270-780 (sin rostros ni el sticker de otra marca) | Tarjeta Norte |
| fachada-480/960/1020.webp | maps-centro-13.jpg | recorte x 0-1020 (sin el letrero de la farmacia) | Cierre |
| logo-blanco / logo-negro (.png, .webp) | logo-fb.jpg (960x960) | luminosidad convertida a alfa, sin retocar trazos | Header, pie, favicon |
| favicon-32.png, apple-touch-icon.png | logo negro sobre cuadrado #FCFF07 | PIL | Pestaña |
| og.jpg (1200x630) | hero-1400 + logo blanco | PIL con Unbounded 800 (ttf local): fondo negro, foto en marco de hoja, "CHABE." sobre resaltador | Tarjeta de WhatsApp |

No usadas por regla: ROMO (centro-02), centro-06/07/08/12/14/15/18/20 a 23, norte-14/15, las cartas como diseño y el flyer.

Corrección 1 (pulidor, 1 oct 2026): no se agregó ni se cambió ninguna imagen; solo se reutilizan los discos de taco en el estado vacío de la charola.
