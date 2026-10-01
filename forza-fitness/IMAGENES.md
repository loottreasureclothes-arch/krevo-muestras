# Forza Fitness Club · Imágenes (30 sep 2026, corrección 2)

**Serie de marca (corrección 2):** todas las fotos del gimnasio llevan el mismo tratamiento, como su cartel Reloaded: blanco y negro con curva en S (+15 a 18 % de contraste en medios), grano fino de 3.2 % (puesto después de reducir a cada ancho) y **solo el rojo de verdad conservado** (mancuernas, columnas del rack, letras y barra del pasillo, la palabra FORZA de la caja). El rojo se detecta en la foto ANTES de aclararla (tono 338° a 18°, saturación > 0.34 a 0.42, G < 0.5 a 0.68·R según la foto), se limpia con apertura morfológica y se descartan islas chicas, y se suaviza el borde. En maps-01 el rojo solo cuenta debajo de y = 1050 (así la lona coral, el cartel de frutas y el short rojo de un socio quedan grises) y se excluye a mano un trapo rojo del piso. Scripts: `scratchpad/r2fix-forza-fitness/grade.py` + `imgs2.py`. Solo PIL, OpenCV y Real-ESRGAN x4 (sin IA generativa).

| Archivo en img/ (corrección 2) | Origen | Proceso | Dónde va |
|---|---|---|---|
| hero-960/1600/2048.webp | maps-01 limpio (sin forzafc.com.mx) | serie B/N + rojo; lona gris | Hero compu (velo .6 arriba, foto subida 80 px para que FORZA quede arriba del título) |
| hero-m-480/960/1600.webp (1600x1740) | maps-01, recorte x 170-1166, y 453-1536 | Real-ESRGAN x4 → 1600, serie B/N + rojo | Hero celular/tableta: letras FORZA arriba y mancuernas rojas arriba del título |
| fierro-800/1400/2000.webp (2000x634) | maps-01, recorte x 830-1840, y 1080-1400 | Real-ESRGAN x4 → 2000, serie B/N + rojo | Tira inclinada arriba del casillero del cierre |
| rack-*, rack-m-* | maps-04 | denoise suave, gamma .55, serie B/N + rojo de las columnas | Club (rayo) |
| pasillo-480/960.webp (960x1200, 4:5) | maps-02, recorte x 0-1100, y 520-1895 (sin la flama de arriba) | Real-ESRGAN x4 → 1200, gamma .6, serie B/N + rojo de letras, barra y barandal | Colosio, casillero con marco 4:5 (70 % de ancho en celular) |
| funcional-480/960.webp | maps-03, recorte x 150-1400, y 0-1550 | gamma .68, serie B/N (no tiene rojo de marca: queda toda gris) | Horario, al alto de la lista "Y además" |

Tabla anterior (corrección 1), como referencia:


Todas salen de `research/fotos/` (fotos públicas del negocio). Sin IA, sin stock. Procesadas solo con PIL y OpenCV; webp calidad 76 a 80 con srcset 480 / 960 / 1600 (hero 960 / 1600 / 2048).

| Archivo en img/ | Origen | Proceso | Dónde va |
|---|---|---|---|
| hero-960/1600/2048.webp | maps-01.jpg (Google Maps, 2048x1536) | OpenCV inpaint para borrar "forzafc.com.mx" de la lona (dominio muerto); contraste +6 % | Hero (compu) |
| hero-m-480/960.webp | maps-01.jpg, recorte vertical x 860 a 1874 | igual que arriba | Hero (celular) |
| rack-480/960/1600.webp | maps-04.jpg (1600x1600, oscura) | gamma 0.62, balance de color (menos cian), contraste +12 % | Club (compu) |
| rack-m-480/960.webp | maps-04.jpg, recorte vertical x 200 a 1200 | igual | Club (celular) |
| funcional-480/960.webp | maps-03.jpg, recorte 1250x1550 | gamma 0.66, saturación 0.78 | Horario, foto lateral (paralelogramo). Tiene algo de desenfoque de movimiento; se muestra chica |
| reloaded-480/960/1600.webp | fb-01.jpg (cartel propio "Reloaded · Always Forza") | sin cambios | Planes, arte de fondo con máscara |
| og.jpg (1200x630) | maps-01 con velo + rayo del logo (vector trazado del logo) + "Sin excusas. Solo resultados." | PIL, fuente Avenir Next Condensed Heavy Italic (la web usa Barlow Condensed) | og:image |
| favicon-32.png, apple-touch-icon.png | logo-facebook.jpg (recorte central) | PIL | favicon |

- El rayo del header, del club y de los divisores es un SVG propio trazado con OpenCV del logo real (logo-facebook.jpg); no es un archivo de imagen.
- Descartadas a propósito: maps-05 (caras de socios), maps-06 ("no hay agua"), maps-02 (oscura y vertical) y todas las `ig-*` (gráficos con texto). ig-01 solo se usó como fuente de datos del horario.
