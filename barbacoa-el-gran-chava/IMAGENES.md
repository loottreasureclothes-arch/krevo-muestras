# Imágenes (todas reales, de `research/fotos/`; ninguna con IA; solo la fachada pasó por Real-ESRGAN)
Script: `_work/prep.py` (PIL, webp con srcset). Recortes en coordenadas x0,y0,x1,y1.

| Archivo en `img/` | Origen | Recorte / tratamiento | Uso |
|---|---|---|---|
| hero-480/960/1600.webp | maps-11 (Google Maps, cliente) | 0,80,1600,900 | Hero, arco grande |
| barbacoa-480/960.webp | maps-04 | 380,440,1600,1200 | Platillo oval de la báscula (barbacoa) |
| birria-480/960.webp | fb-08 (gráfico de su Facebook) | 420,540,1700,1340; sin teléfonos, sin "Disfruta desde casa", sin logo | Platillo oval (birria) |
| horno-480/916.webp | fb-06 | 960,1130,1876,1690: manos con guante, mandil, pala, boca del horno y humo. Sin cara, lentes ni cubrebocas; sin texto ni teléfonos | Momento firma (compu) |
| horno-m-480/896.webp | fb-06 | 980,1180,1876,1705 + enfoque suave (versión celular; sin cara, sin texto ni el trazo gráfico de la esquina) | Momento firma (celular) |
| maciza-480/960/1600.webp | fb-01 | 0,600,1875,1490; sin el texto "Selección de maciza" ni la barra de teléfonos | Opiniones, arco mediano |
| lugar-480/960/1600.webp | maps-05 | 0,560,1600,1200: mesas y sillas equipales; sin personas | Dónde, arco grande |
| fachada-480/960/1400.webp | maps-01 | 195,195,890,345: solo el letrero azul; sin autos, placas ni personas. Real-ESRGAN x4 mezclado 50 % con LANCZOS + grano fino | Dónde, marco recto con filete |
| cierre-480/916.webp | fb-07 | 960,790,1876,1640: mano con guante y pierna de borrego; sin cara, sin texto ni teléfonos | Remate del cierre, arco grande |
| logo-96/140/288/320.png, favicon-32.png, apple-touch-icon.png | logo-fb.jpg (684 px) | Máscara circular exacta del aro plateado (centro 337,339, radio 331), fondo gris fuera | Header 44 px, pie 140 px, favicon |
| og.jpg (1200x630) | maps-04 | Arco a la derecha sobre pizarra; textos con Teko 700 y Epilogue (.ttf locales) | og:image |

No se usó: maps-03, 06, 07, 12 (marcas ajenas o gente), maps-08 (autos y personas), maps-02 (solo fuente de precios), fb-03, fb-04, fb-05, ni nada de `research/_ajenas/`.
Las fotos de Maps son de clientes: pedir permiso o fotos propias (ver PENDIENTES.md).
