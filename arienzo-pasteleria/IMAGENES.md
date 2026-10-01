# Arienzo · Imágenes (origen y tratamiento)
Todas son fotos reales de research/fotos/ (Maps, Instagram, Facebook). Nada de IA ni stock. Sin Real-ESRGAN (ninguna se subió). Script: _work/imgs.py, _work/clean8.py, _work/og.py. Todas en webp con srcset salvo las chicas.

| Archivo | Origen | Tratamiento | Dónde |
|---|---|---|---|
| img/conchas-{480,960,1600}.webp | maps-07 (1600x1067) | Redimensión LANCZOS; recorte por CSS dentro de la ventana de escudo (object-position 50% 66%) | Hero |
| img/vitrina2-{480,960,1280}.webp (pulidor, reemplaza a vitrina-*) | maps-08 limpia (`_work/maps08-clean-full.png`) | Recorte x 215-1495, y 55-832 (los cinco pasteles completos, sin piso ni la palabra "Pastel"); balance cálido +3.5 % R, -4 % B, contraste 1.07, color 1.06. Script `_work/pulido_vitrina.py` | Sección pasteles (LA VITRINA) |
| img/vitrina-{480,960,1440}.webp (ya sin uso) | maps-08 (1600x899) | Se taparon 4 sellos de "oferta" con OpenCV (máscara por color + inpaint Telea + grano) y se recortó la franja de abajo con la palabra "Pastel" y el borde con papeles (x 60-1500, y 0-835) | Sección pasteles (LA VITRINA) |
| img/fachada-{480,960,1200}.webp | maps-05 (1200x1600) | Solo redimensión; sin placas ni caras legibles | Dónde (EL LOCAL) |
| img/interior-{414,828}.webp | fb-01 (828x831) | Recorte de la franja y 205-640 px (sin el logo de arriba ni el rótulo "Cafetería") | Dónde (POR DENTRO) |
| img/pan-muerto-{480,960,1080}.webp | ig-01-1080 | Solo redimensión; se pinta a máximo 520 px css | Cierre (remate) |
| img/concha-{320,640}.webp | ig-04 (640x480) | Solo redimensión; se pinta a máximo 340 px css | Plato firmado (ASÍ SALE EN SU MESA) |
| img/q-pasteles2.webp (pulidor, reemplaza a q-pasteles) | maps-08 limpia | Recorte x 1015-1480, y 318-832: pastel de chocolate y de almendra; mismo balance cálido; 424 px | Cuartel PASTELES |
| img/q-pasteles.webp (ya sin uso) | maps-08 limpia | Recorte de las tortas blancas y la gelatina amarilla (sin sellos) | Cuartel PASTELES |
| img/q-postres.webp | maps-04 | Solo el muffin (x 280-1140, y 640-1140; sin el texto "Suc. Interceptor" ni las manos); el fondo borroso se extendió hacia arriba con el mismo bokeh desenfocado para que cupiera en el cuartel | Cuartel POSTRES |
| img/q-pan.webp | ig-04 | Recorte de la concha rellena (sin la firma) | Cuartel PAN |
| img/q-cafeteria.webp | ig-05 | Recorte x 135-515, y 175-640: sándwich, capuchino y servilleta; queda fuera la gente del fondo | Cuartel CAFETERÍA |
| img/logo-escudo.webp | logo-fb (2000x2000) | Recorte del escudo con cupcake (371-1743, 143-1714) a 400x458 | Header, escusón, pie |
| img/favicon-32.png, favicon-96.png, apple-touch-icon.png | logo-fb | Recorte cuadrado del escudo | Favicon |
| img/og.jpg | maps-07 + tipografías de la hoja | PIL 1200x630: chocolate, ventana de escudo con filete dorado, Prata y Epilogue | og:image |
