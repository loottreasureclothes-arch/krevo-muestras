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
