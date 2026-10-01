# La Cantina de Antaño · Imágenes (corrección 1, 30 sep 2026)

Todas reales, de research/fotos (Google Sites propio, Instagram de Colosio y fotos públicas de Maps). Cero IA, cero stock. Procesadas con PIL y Real-ESRGAN x4 (bajadas con PIL) en los recortes chicos. Script: `scratchpad/cantina-fix/imgs.py`.

Grado (se bajó el sepia por decisión del orquestador): fachadas de noche a color real con +0.6 EV y un toque cálido (se ve el neón verde de Colosio y Nacozari y el rosa de J. Pani); comida a color real con ajuste cálido leve; interiores con grado cálido suave (desaturar ~18 %, tinte café ligero, +0.2 EV). Ninguna foto queda casi negra.

| Archivo en img/ | Origen | Uso | Tratamiento |
|---|---|---|---|
| hero-m-480/960 | maps-interior-salon.jpg (recorte vertical x 470-1250) | Hero en celular | Caras de clientes desenfocadas, Real-ESRGAN x4, grado interior |
| hero-d-960/1600 | maps-interior-salon.jpg (recorte x 0-1300, sin los comensales de la derecha) | Hero en compu | Igual |
| epoca-480/960/1600, epoca-m-480/960 | maps-interior-barra-02.jpg (barra, caballito, fotos de estrellas en la pared; sin la fila de clientes de abajo) | Sección Época de Oro | Cara de la mesera desenfocada, Real-ESRGAN x4, grado interior |
| fajitas-480/960/1600 | maps-parrillada-fajitas.jpg | Carta, foto grande | Color real |
| p-mesa | maps-botanas-mesa.jpg (solo la mesa, sin la persona) | Panel Botanas | Real +0.45 EV (foto nocturna) |
| p-tabla | maps-parrillada-tabla.jpg | Panel Carnes, pie "De la parrilla" | Color real |
| p-tarro | ig-02.jpg (esquina con tarro y vaso preparado, sin el logo ni el texto) | Panel Cervezas, pie "Para acompañar" | Real-ESRGAN x4 |
| p-botellas | maps-interior-barra-02.jpg (botellero) | Panel Destilados | Real-ESRGAN x4, grado interior |
| fr-jpani, fr-fajitas, fr-mesa, fr-barra, fr-nacozari, fr-tampi, fr-colosio (400x300) | fachadas, parrillada, botanas, botellero, sitio-fachada-nacozari-02, ig-02 (Tampiqueña sin el texto), Colosio | Tira de fotogramas | Mismo grado por tipo |
| f-colosio, f-nacozari, f-jpani, f-anita (480/960) | fachadas del Google Sites | Tarjetas de sucursal | Color real; Sta. Anita recortada al letrero (sin el texto quemado) con Real-ESRGAN x4 |
| logo-96/192/384 | logo-fb-lacantinaags.jpg | Header, sello del hero, pie | Sin cambios |
| og.jpg | salón + logo | Tarjeta de WhatsApp | Sin cambios |

Ya no se usan (movidas al scratchpad del corrector): ventana-*, torre-* (borrosa), salon-*.
Pendiente: fotos profesionales de platillos, cocteles y música en vivo.

## Corrección 2 (script `scratchpad/r2fix-cantina-de-antano/imgs2.py`)
| Archivo | Origen | Uso | Tratamiento |
|---|---|---|---|
| epoca-c-640/1280/1840 | maps-interior-barra-02.jpg (x 975-1548, y 625-950: pared de retratos y caballito, sin soga, techo, mesera ni cabezas) | Lobby card de Época de Oro | Real-ESRGAN x4, grado interior |
| hero-m, hero-d (rehechas) | maps-interior-salon.jpg, mismos recortes | Hero | Sin parches; desenfoque parejo de la franja del fondo después de subir x4 |
| p-mesa-v, p-tabla-v, p-tarro-v, p-botellas-v (680x850) | botanas-mesa, parrillada-tabla, tarro (ig-02) y botellero (barra-02) | Columna fija de la carta a ≥860 | Mismo grado por tipo |
| f-colosio (rehecha) | sitio-fachada-colosio-noche.jpg recortada a 3:2 sin cielo negro | Tarjeta Colosio | Grado noche |

## Corrección 3 (script `scratchpad/r3fix-cantina-de-antano/imgs3.py`)
| Archivo | Origen | Uso | Tratamiento |
|---|---|---|---|
| epoca-c-640, epoca-c-1146 (rehechas) | maps-interior-barra-02.jpg (x 975-1548, y 615-876: se quita abajo el marco con el busto fantasma) | Lobby card de Época de Oro, máx. 620 px | Grado interior, subida solo x2 con Lanczos + UnsharpMask(1.2, 60). SIN Real-ESRGAN (derretía las caras chicas) |
| hero-d-960/1600 (rehechas) | maps-interior-salon.jpg, mismo recorte | Hero en compu | Mismo desenfoque parejo de la franja del fondo y luz al 70 % dentro de esa franja: los meseros quedan como sombra. hero-m no se tocó |

Ya no se usan (movidas a `scratchpad/r3fix-cantina-de-antano/old-img/`): epoca-c-1280, epoca-c-1840.

## Corrección 4 (script `scratchpad/r4fix-cantina-de-antano/imgs4.py`)
Caras: desenfoque LOCAL y chico en cada cara (personal de la barra y las 2 clientas del fondo), ya no una franja borrosa. Las clientas de la derecha quedan fuera de todos los recortes.
| Archivo | Origen | Uso | Tratamiento |
|---|---|---|---|
| epoca-s-640/1146 (NUEVAS) | maps-interior-salon.jpg (x 110-990, y 215-800: barra con botellero, caballito, retrato de charro en la barra, techo con objetos y el pasillo) | Lobby card de Época de Oro, máx. 620 px | Real-ESRGAN x4 (foto nítida), sepia: color al 20 %, tinte café, +0.18 EV |
| hero-m-480/960 (rehechas, 960x1646) | maps-interior-salon.jpg (x 100-660, y 240-1200) | Hero en celular | Barra, caballito, botellero y mesas; sin franja borrosa; Real-ESRGAN x4, grado interior |
| hero-d-960/1600 (rehechas) | maps-interior-salon.jpg (x 0-1300, y 60-1200, mismo recorte) | Hero en compu | Sin franja ni luz al 70 %: solo caras chicas desenfocadas; Real-ESRGAN x4, grado interior |
| f-colosio, f-nacozari, f-jpani, f-anita, fr-colosio, fr-nacozari, fr-jpani | mismas fuentes y recortes | Tarjetas de sucursal y tira de fotogramas | "Noche calma": OpenCV fastNlMeans (quita grano), saturación al 55-60 %, verdes neón al 50 % y movidos hacia el oro, rosas al ~40 % y movidos hacia el rojo, tinte café leve. J. Pani y Sta. Anita sin subir exposición |

Ya no se usan (movidas a `scratchpad/r4fix-cantina-de-antano/old-img/`): epoca-c-640, epoca-c-1146 (barra-02, borrosa y chueca).
