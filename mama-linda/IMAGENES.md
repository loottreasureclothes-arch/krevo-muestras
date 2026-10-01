# MamaLinda · Imágenes (origen y tratamiento)
Todas salen de `research/fotos/`. Script: `_work/imgs.py` (solo PIL y numpy). Nada de IA generativa.

| Archivo en img/ | Origen | Tratamiento | Uso |
|---|---|---|---|
| fachada-480/960/1600.webp | maps-01-portada.jpg (1600x1600, fachada nocturna con el letrero completo) | solo redimensionado, calidad 82 | Hero |
| ensalada-480/960.webp | vid-03-ensalada.jpg (cuadro de reel 1080x1920) | recorte 4:5 | Momento "A tu ritmo" |
| pizza-480/960.webp | vid-05-pizza-armado.jpg | recorte 4:5 | Momento "A tu ritmo" |
| lasana-480/960.webp | ig-post-01-sep29 (512x640) | Real-ESRGAN x4 mezclado 50 % con el original subido con LANCZOS, grano fino, 1080x1350 | Momento "A tu ritmo" |
| papas-480/960.webp | vid-02-papas.jpg | recorte 4:5 | Momento "A tu ritmo" |
| penne-480/960.webp | ig-post-03-sep23 (512x640) | igual que lasaña | Momento "A tu ritmo" |
| hermelinda-288/575.webp | maps-09-propietario.jpg (recorte del marco con el retrato, x 330-905, y 125-700) | recorte, calidad 86; se muestra a 252 px | El cartel (pendiente permiso) |
| sala-480/960/1200.webp | maps-05-recientes.jpg | se recorta arriba de y=1090 para quitar a una persona del personal en una mesa | Opiniones |
| mural-480/960/1200.webp | maps-07-comida.jpg (foto de cliente en Google, con etiqueta "Foto: Google Maps") | solo redimensionado | Remate del cierre |
| logo-disc(-2x).webp | logo-fb.jpg (recorte circular del monograma ML) | recorte, 96 y 192 px | Header |
| logo-full.webp | logo-fb.jpg | 336 px | Pie |
| favicon-32.png, apple-touch-icon.png | logo-fb.jpg (centro con el monograma) | recorte | Favicon |
| og.jpg | maps-01 a 630x630 + texto con Libre Baskerville y Cabin | PIL | og:image 1200x630 |

Documentos usados solo para sacar datos (no se muestran): maps-02-menu.jpg (carta de pizzas), maps-09-propietario.jpg (precios y cartel).
No usadas a propósito: ig-post-02/04/05 (caras o flyers con letras y promos), maps-06 y maps-08 (caras), vid-01 (filtro naranja), vid-04 (cara del cocinero sin permiso), maps-03 y maps-04 (oscuras, con flash).

Pulidor (1 oct 2026): sin cambios de fotos en la segunda mitad de la pasada. El queso, los trazos y los números del momento firma son SVG y CSS (nada de IA).
