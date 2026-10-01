# Imágenes · Mascotitlán (30 sep 2026)

Colores medidos con PIL: verde fachada (mediana de las franjas verdes de gmaps-01) #2C9C65; filete del techo #20744A; pared baja #20744A a #2C9C65. Se usó #1D8149 (entre ambos, 4.8:1 con el blanco cal para texto en botones). Rosa del logo (gmaps-15, mediana de los pixeles rosa): #E21270 (226,18,112). Verde del camaleón: #79B030 (no se usa).

| Archivo | Origen | Recorte | Tallas |
|---|---|---|---|
| hero-m | gmaps-18 | x 290-1190 (retrato, celular) | 480, 900 |
| hero-d | gmaps-18 | x 0-1480 (sin el pájaro ni el letrero VISA del borde derecho) | 480, 960, 1480 |
| betta-a | gmaps-03 | y 60-1560 | 480, 960, 1200 |
| betta-b | gmaps-05 | alrededor del pez | 480, 900 |
| betta-c | gmaps-08 | recorte centrado | 480, 960 |
| pasillo-terrarios | gmaps-16 | y 300-1600 (sin las jaulas de arriba); letrero REPTILES de la tienda visible | 480, 960, 1200 |
| ficha-peces | gmaps-04 | sin el reflejo de la tapa | 480, 908 |
| pasillo-alimento | gmaps-02 | x 880-1600 (sin las personas del fondo) | 480, 720 |
| ficha-alimento | gmaps-02 | solo costales (x 1120-1600) | 480 |
| pasillo-anaqueles | gmaps-17 | x 0-545 (sin las dos personas) | 480, 545 |
| rascador-rojo / rascador-gris | fb-rascadores-collage | cuadros individuales, sin texto ni precios | 480, 754 |
| rascador-blanco | fb-rascador-blanco | completa (sin texto) | 480, 750 |
| ficha-exoticos | ig-DdHsn5GTlJ (su collage) | completa | 480, 960, 1536 |
| fachada | gmaps-01 | x 130-1125 (sin el bar vecino); placas de los 2 autos cubiertas con un parche del color de la cajuela (interpolación entre bordes + grano), script `_work/patch_fachada.py` | 480, 995 |
| logo | gmaps-15 | Real-ESRGAN x4plus mezclado 50 % con LANCZOS x4, bajado a 320/480 (se pinta a 150-180 px) | 320, 480 |
| og.jpg | gmaps-18 | 1200x630, velo verde noche y título en Chivo 900 (PIL) | |
| favicon-32.png, apple-touch-icon.png | PIL | tres escalones: dos verdes y la cima rosa sobre blanco cal | |

Notas: las fotos grandes ya medían más de 1,200 px; solo el logo pasó por Real-ESRGAN. La fachada y gmaps-02/17 son más chicas que 1,600 px después del recorte, por eso no hay variante 1600 (no se estiran). Cada `sizes` sirve la talla que de verdad se pinta (los retratos recortados con object-fit declaran el ancho pintado, no el del contenedor). Ninguna foto que vende lleva `loading="lazy"`; solo el logo (chico) y el iframe del mapa.
Prohibidas y no usadas: tt-*, gmaps-06, 09 a 14, fb-portada, collages de cachorros, imágenes IA/plantilla, cartel de la expo, imagen de vacunas con marcas. Nada de IA generativa.
Foto "Pasillo de acuarios y terrarios" (gmaps-16): la hoja decía "calle de los peces", pero lo que se ve son terrarios y acuarios, por eso la placa lo describe así.
