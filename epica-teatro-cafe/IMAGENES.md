# Imágenes (todas reales, cero IA; solo PIL y Real-ESRGAN x4 bajado con PIL)
Script: gen/imagenes.py (las PNG x4 viven en el scratchpad de la sesión).
| Archivo(s) | Origen | Dónde se usa | Proceso |
|---|---|---|---|
| img/logo.png | recorte de research/fotos/ig-01.jpg (esquina sup. izq.) | header, pie | Real-ESRGAN x4, alfa por canal mínimo (logo crema sobre transparente), sin el subtítulo borroso |
| favicon-32.png, apple-touch-icon.png | la "É" del logo | pestaña, iOS | recolor rojo #c81a27 sobre #0b0a0a |
| p-off-shakespeare-19 (ig-10) | poster | cartelera, boleto, muro hero | x4, webp 480/960/1600 |
| p-off-shakespeare-26 (ig-02) | poster | muro hero (compu), collage Fénix | x4, webp 480/960/1600 |
| p-herencia (ig-04) | poster | cartelera, muro, collage | x4, webp 480/960/1600 |
| p-gigolo-25 (ig-03) | poster | cartelera, muro | x4, webp 480/960/1440 |
| p-gigolo-18 (ig-12) | poster | collage Fénix, muro | x4, webp |
| p-jean-20 (ig-07) | poster | cartelera, muro | x4, webp |
| p-jean-27-poesia (ig-01) | poster | cartelera (Noche de poesía), muro | x4, webp |
| p-mariquita (ig-08), p-pau-duran (ig-09), p-poesia-eviterna (ig-11) | posters | cartelera, muro | x4, webp |
| escena-off-shakespeare-{800,1280,1750}.webp | recorte de la escena real de ig-10 (Off Shakespeare 19 sep): actores, mesita y maleta roja, sin texto. El "19 de Sep" se borró con cv2.inpaint (relleno local, sin IA) | hero. Corrección 4: ya NO va a sangre en celular; va en marco crema de 6 px, esquina cortada, giro -1.5° (354 px a 390, máx 560 px en tableta), igual que en compu | gen/escenas.py. Corrección 4: 45 % Real-ESRGAN x4 + 55 % poster original subido con LANCZOS + grano fino (sigma 2.2), para que las caras no se vean de plástico |
| escena-jean-{800,1280,1536}.webp | recorte del escenario real de ig-07 (Jean de Blues): cenital azul y foco rojo, sin las letras | "Volvimos." (Corrección 3: ya NO a sangre; en marco crema de 6 px, esquina cortada, giro -1.5°: 300 px en celular, 440 en 720, 520 en compu; pie "Jean de Blues · septiembre 2026") | gen/escenas.py desde la PNG x4 (el archivo no cambió) |
| og.jpg | muro de 6 posters oscurecido + logo + texto (Georgia y Courier del sistema) | og:image 1200x630 | PIL |
Posters en cartelera (Corrección 4): van bajo el rótulo "Así se vivió septiembre", chicos (42 % del ancho en celular, 5 por fila en compu), completos con marco crema de 4 px; ya no llevan sello "Ya se presentó" ni fechas tachadas. El abanico de 3 posters del cierre se quitó. En el hero van oscurecidos como muro (nunca solos a sangre). Desde la Corrección 3 ninguna foto de la página va a sangre en "Volvimos.": la escena va enmarcada. Desde la Corrección 4 tampoco el hero va a sangre. Ninguna foto lleva loading="lazy" salvo 4 del muro que solo se ven en compu.
