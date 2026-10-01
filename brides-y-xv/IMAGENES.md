# Brides & XV · Imágenes (origen y tratamiento)

Todo sale de `research/fotos/` (fotos públicas del negocio, Google Maps de usuario y cuadros de sus TikTok). Sin IA generativa ni stock. Herramientas: PIL y OpenCV (scripts en `_work/`, ignorada por git). Salida en `img/` en webp con srcset.

| Archivo(s) en img/ | Origen | Tratamiento | Dónde |
|---|---|---|---|
| hero-m-480/730, hero-d-640/900 | maps-03 (1200x1600, Google Maps) | Todo lo que estaba arriba del rótulo (los pósters de modelos de catálogo) se pinta con el negro de la página (#100D0F, polígono con borde suave) y queda el rótulo emergiendo; cv2.inpaint (TELEA) con máscara por color sobre las 3 personas chicas del interior; recorte x 60 a 790 (celular) y 60 a 960 (compu), y 600 a 1590 | Hero |
| p01-448/672 | tt-novia-03 (cuadro de video x4) | Recorte por la izquierda para dejar fuera la etiqueta del fabricante (x 0 a 940, y 40 a 1293). Pulidor: CLAHE ligero, unsharp y grano fino | Percha 01 |
| p02-448/672 | tt-aparador-28 | Pulidor: recorte x 0 a 1110, y 930 a 2410 (desde la espalda baja: sin cabeza, pelo ni tiara), CLAHE ligero, unsharp y grano fino | Percha 02 |
| p03-448 | ig-09 (512x640) | Recorte sin la franja de texto de la clave (se reescribe en HTML) | Percha 03 |
| p04-448/672 | tt-tour-13 | Recorte al vestido (y 430 a 2350) | Percha 04 |
| p05-448/672 | tt-tour-08 | Recorte x 115 a 895, y 920 a 1960: fuera el rótulo CHARLY y la gente del pasillo | Percha 05 |
| p06-448 | ig-07 (480x640) | Recorte sin la franja de texto de la clave | Percha 06 |
| brillo-720/1100/1440 | tt-novia-02 (cuadro de video x4) | Recorte y 80 a 1600; la etiqueta del fabricante y su cordón se retocaron con cv2.inpaint. Pulidor: recorte extra y 300 a 1520 (fuera el cuello del maniquí), CLAHE ligero (mezcla 50 %) y curva que sube el blanco con un pelo cálido (`_work/pulido.py brillo`) | Momento firma |
| brillo-mask.png | La MISMA foto (brillo, ya pulida) | 3 % de píxeles más luminosos (percentil 97) a 720 px, dilatados 1 px y con desenfoque de 1.5 px, blanco sobre transparente; se enciende solo dentro de la banda de luz | Momento firma |
| bordado-520/780/1040 | tt-tour-13 | Recorte al bordado dorado (x 170 a 1210, y 760 a 2200) | Collage de la sección 3 |
| cola-520/780/1040 | tt-aparador-26 | Recorte y 500 a 2300 | Collage de la sección 3 |
| tienda-480/780/1110 | tt-tour-03 | Pulidor: recorte x 0 a 1110, y 640 a 1880 (solo la parte nítida: techo, puerta y vestidos; fuera el póster de arriba, la persona del fondo y el piso movido), curva suave, unsharp y grano fino | La tienda |
| pared-480/780/980 | tt-aparador-12 | Recorte x 0 a 980, y 0 a 1620: se queda la pared "BRIDES & XV" y el vestido de la izquierda; fuera la mujer de perfil | La tienda |
| visit-640/1095 | maps-01 (1200x1600, Google Maps) | Recorte x 95 a 1190, y 828 a 1440 (fuera pósters y banner ajeno de arriba); el vidrio sobre la puerta (con póster) se pinta con el color de la banda de la página; persona del interior borrada con inpaint | Visítanos |
| remate-480/780/1200 | tt-novia-10 | Recorte x 0 a 1200, y 320 a 2560 | Cierre |
| logo-full.png, logo-title.png | logo-fb.jpg (930x913) | Alfa por luminancia (letras blancas y línea magenta #C31B7B conservada), recorte del logo completo y de "BRIDES & XV" solo; sin redibujar | Hero, pie, header |
| favicon-32.png, apple-touch-icon.png | logo-fb.jpg | "XV" del logo real con su línea magenta sobre negro | Pestaña |
| og.jpg (1200x630) | remate + logo | PIL: fondo #100D0F, novia a la derecha en marco de cola, logo completo y "Tu prueba de vestido, completamente gratis." en Gilda Display con la segunda parte en #DE3F95 | Vista previa |

Prohibidas y no usadas: fb-01/02/03, ig-01/02/03/05/10 (clientas con cara), ig-08 (flyer vencido), ig-04 (vestido de niña), tt-navidad-06/08/09, tt-novia-08 (rótulo ajeno VV), calv-01 (equipo sin permiso), y los pósters de modelos de catálogo que aparecen dentro de maps-01 y maps-03 (quedan fuera por el recorte). No se sacaron cuadros nuevos de research/_videos/.

Ajuste final: en compu la foto del remate (tt-novia-10) se muestra a 520 px de ancho en marco de cola (regla de cuadros de video), con sizes="(min-width: 820px) 520px, 100vw".
