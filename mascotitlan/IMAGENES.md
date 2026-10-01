# Imágenes · Mascotitlán (30 sep 2026, corrección 1: 1 oct 2026)

Colores medidos con PIL: verde fachada (mediana de las franjas verdes de gmaps-01) #2C9C65; filete del techo #20744A; pared baja #20744A a #2C9C65. Se usó #1D8149 (entre ambos, 4.8:1 con el blanco cal para texto en botones). Rosa del logo (gmaps-15, mediana de los pixeles rosa): #E21270 (226,18,112). Verde del camaleón: #79B030 (no se usa).

| Archivo | Origen | Recorte | Tallas |
|---|---|---|---|
| hero-m | gmaps-18 corregida (balance de blancos con el techo como gris neutro, niveles 0.2/99.8 %, gamma 1.12, curva suave, +7 % saturación; caras de los 2 clientes desenfocadas, gaussiano 9 px en óvalos, cuerpos 1.8 px) | x 290-1190 (retrato, celular) | 480, 900 |
| hero-d | gmaps-18 corregida (igual que hero-m) | x 0-1480 (sin el pájaro ni el letrero VISA del borde derecho) | 480, 960, 1480 |
| betta-a | gmaps-03, balance suave + niveles | x 0-1000, y 130-1090 (sin el pez albino de abajo ni la hoja seca; el betta queda al centro) | 480, 960, 1000 |
| betta-b | gmaps-05, limpieza suave de color | alrededor del pez | 480, 900 |
| betta-c | gmaps-08, balance de blancos con el agua del fondo como gris (quita el velo amarillo), niveles 1.5/99.8 % gamma 0.86 (quita neblina), curva y +12 % saturación | recorte centrado | 480, 960, 1040 |
| pasillo-terrarios | gmaps-16, limpieza de color | y 300-734 a todo lo ancho: terrarios, acuarios y su letrero REPTILES; queda FUERA el gabinete de acero del centro (empieza en y 738) y las bolsas del piso | 480, 960, 1200 |
| ficha-peces | gmaps-04, limpieza suave | sin el reflejo de la tapa | 480, 908 |
| pasillo-alimento | gmaps-02 con balance (techo neutro) y niveles | x 880-1600 (sin las personas del fondo) | 480, 720 |
| ficha-alimento / ficha-alimento-sq | gmaps-02 corregida (la foto grande del pasillo, ya no la de 480 px) | 4:3 x 880-1600, y 400-940 (celular); 1:1 x 960-1600, y 330-970 (compu, con `<picture>`) | 480, 720 / 480, 640 |
| pasillo-anaqueles | gmaps-17, balance + niveles + 10 % saturación | x 0-545 (sin las dos personas) | 480, 545 |
| rascador-rojo / rascador-gris | fb-rascadores-collage | cuadros individuales, sin texto ni precios | 480, 754 |
| rascador-blanco | fb-rascador-blanco | completa (sin texto) | 480, 750 |
| ficha-exoticos | ig-DdHsn5GTlJ (su collage) | completa | 480, 960, 1536 |
| fachada | gmaps-01 ORIGINAL (ya sin parche), limpieza suave | x 130-1125, y 0-604: RECORTADA arriba de las placas (empiezan en y 616); quedan lona, letrero, cortina y puerta abierta | 480, 995 |
| logo | gmaps-15 | Real-ESRGAN x4plus mezclado 50 % con LANCZOS x4, bajado a 320/480 (se pinta a 150-180 px) | 320, 480 |
| og.jpg | gmaps-18 corregida y con caras desenfocadas | 1200x630, velo verde noche y título en Chivo 900 (PIL) | |
| favicon-32.png, apple-touch-icon.png | PIL | tres escalones: dos verdes y la cima rosa sobre blanco cal | |

Scripts de la corrección 1: `_work/fix_imgs.py` (usa `_work/fotolib.py`; corre `python3 _work/fix_imgs.py [hero alimento terrarios bettaa bettab bettac peces anaqueles fachada]` desde `_work/`, solo PIL/OpenCV/numpy) y `_work/gen_papel.py` (genera el SVG del papel picado dentro de `sections/50-opiniones.html`). `_work/patch_fachada.py` y `_work/fachada-limpia.png` ya no se usan (el parche se notaba). `img/betta-a-1200.webp` quedó de la versión anterior y no se usa.

Notas: las fotos grandes ya medían más de 1,200 px; solo el logo pasó por Real-ESRGAN. La fachada y gmaps-02/17 son más chicas que 1,600 px después del recorte, por eso no hay variante 1600 (no se estiran). Cada `sizes` sirve la talla que de verdad se pinta (los retratos recortados con object-fit declaran el ancho pintado, no el del contenedor). Ninguna foto que vende lleva `loading="lazy"`; solo el logo (chico) y el iframe del mapa.
Prohibidas y no usadas: tt-*, gmaps-06, 09 a 14, fb-portada, collages de cachorros, imágenes IA/plantilla, cartel de la expo, imagen de vacunas con marcas. Nada de IA generativa.
Foto "Pasillo de acuarios y terrarios" (gmaps-16): la hoja decía "calle de los peces", pero lo que se ve son terrarios y acuarios, por eso la placa lo describe así.
