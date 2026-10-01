# Imágenes (todas de research/fotos/, sin IA ni stock; ninguna pasó por Real-ESRGAN)
Ajuste común (PIL): +6 % contraste y temperatura ligeramente cálida; webp con srcset.

| Archivo en img/ | Origen | Tratamiento |
|---|---|---|
| hero-480/960 | maps-sur-10.jpg | entera, 960x1280; cuadro grande, máx 420 px en compu |
| c1-* (Francés negro con florecitas) | maps-sur-05.jpg | recorte 1200x1500 (4:5) |
| c2-* (Colores y caritas) | maps-colosio-01.jpg | recorte 4:5 de 1280x1600, sin caras |
| c3-* (Almendra blanca con brillo) | maps-colosio-02.jpg | recorte 531x664, sirve hasta 531 px |
| c4-* (Perlas y flores) | maps-sur-08.jpg | recorte de manos 560x700 (arriba del 55 %): fuera la lámpara, su panel y el sticker |
| sillones-* | maps-sur-04.jpg | recorte 4:5 (x 144-1200, y 250-1570): fuera la figura del fondo y el techo (pulidor) |
| copa-385/192 | maps-sur-01.jpg | YA NO SE USA (pulidor: se veía sucia y no se entendía); archivos quedan en img/ sin referencia |
| fachada-* | maps-sur-02.jpg | franja 960x410 (y 150-560): letrero, candil y puerta; fuera techo y gente; +10 % contraste y enfoque suave (pulidor) |
| cabina-* y cabina-m-* | fb-01.jpg | vertical para compu; recorte 5:4 para celular |
| portada-* | fb-portada.png | arte de marca sin tocar |
| marmol.webp | ig-03.jpg | franja inferior sin pinzas, desaturada, borrosa, espejada 2x2, 14 % sobre #E4E1DC con grano |
| logo.png, favicon-32, apple-touch-icon, icon-512 | logo-fb.jpg | fondo exterior transparente por flood fill desde las esquinas; el panel blanco se queda |
| og.jpg | maps-sur-10 + PIL | 1200x630, Prata y Lexend de tools/fuentes |

No usadas: maps-sur-03, 06, 07, ig-02, logo-ig, _descartadas.
