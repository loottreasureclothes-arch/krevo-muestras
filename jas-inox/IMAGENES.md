# JAS INOX: imágenes (todo local, sin IA generativa)

Proceso: recorte con PIL del panel limpio de cada collage de Instagram (sin logo de fondo blanco ni caras) -> Real-ESRGAN x4 (`realesrgan-x4plus -s 4`, corrido desde tools/realesrgan) -> webp con srcset (480/960 y el ancho nativo si es menor a 960). Script: `gen/make_assets.py`. Originales: `research/fotos/`.

| Archivo img/ | Origen y recorte | Dónde |
|---|---|---|
| hero-480/960/1132 | ig-07, panel inferior (45,285)-(328,627), x4 (corrección 1: rehecha con 22 % de textura original para quitar lo "cerado") | Hero, FIG. 01 |
| carrito-a | ig-03, panel inferior izquierdo (0,320)-(256,640) | Catálogo REF. 01 |
| carrito-c | ig-04, panel inferior derecho (256,320)-(512,640) | Catálogo REF. 02 |
| cajones-480/656 | ig-12, fila 2 derecha, SOLO el tramo central (340,262)-(504,406): el inpaint de las 2 marcas sobre puertas y cajón dejaba mancha, así que se recortó; la cola de la marca de la pared va con inpaint | Catálogo REF. 03 |
| tarja-480/664 | ig-12, panel superior derecho (434,24)-(600,212); "JAS" fantasma de la puerta con cv2.inpaint | Catálogo REF. 04 |
| tarja-gab-456 | ig-12, panel inferior izquierdo (74,428)-(188,618); "JAS" del costado con inpaint, la otra marca fuera por recorte | Catálogo REF. 05 (sustituye a mesa-larga en diagonal) |
| campana | ig-10, esquina superior derecha (120,0)-(361,275), sin la persona | Catálogo REF. 06 |
| redilas-b | ig-06, panel superior derecho | Catálogo REF. 07 |
| carga-480/868 | ig-05, panel superior izquierdo (3,4)-(220,312): la pieza de JAS emplayada entrando al tráiler; marca "JAS INOX" del emplaye y "CLARK" del montacargas con inpaint; fuera la etiqueta "JAS INOX" por recorte | Ruta, FIG. 05 grande |
| truck-tj-480/820 | ig-05, panel inferior derecho (268,374)-(473,640): "TIJUANA", pin y rayitas borrados rellenando el cielo con un degradado ajustado a los pixeles vecinos (sin IA) | Ruta, FIG. 06 |
| banda-480/928 | ig-06, panel superior izquierdo (0,2)-(232,318): pickup con redilas frente al taller y su letrero real | Banda FIG. 02 |
| logo-cromo.png | research/logo-fb.jpg sin fondo blanco; cara cromo, extrusión acero medio, INOX en acero claro (legible sobre carbón) | Header, footer |
| favicon-32, apple-touch-icon | la "J" del logo sobre carbón | head |
| og.jpg 1200x630 | foto del hero (barra + letrero JAS INOX) a la derecha, velo solo a la izquierda, logo + "Acero inoxidable a tu medida." | og:image |

Descartadas: ig-01 (mapa con texto quemado, se redibujó como SVG), ig-02 (tarjeta, solo datos), ig-09 (cara del dueño/cliente), ig-11 (logo cortado y borroso; se usa el logo limpio), ig-10 completa (persona).
Racks, barandales y lockers ya no llevan marcador: van en un renglón de texto "También fabricamos: ..." dentro de la rejilla.
Script de la corrección 1: `gen/fix_assets.py prep up emit` (recortes + cv2.inpaint -> Real-ESRGAN x4 -> webp y og). Borradas las versiones viejas con marca de agua (mesa-larga, truck-ags, tarja-748, cajones-960, truck-tj-960).
Las fotos a 390 @2x: hero y tarjetas salen de x4 (nativos 1024 a 1372 px); algo suaves por ser de origen 640 px, se pide foto en alta al dueño.

Corrección 2 (`gen/fix_assets.py r2`):
| carga2-480/828 | ig-05, panel superior izquierdo, recortado a (3,4)-(210,222): fuera la nuca del trabajador, las manos del montacargas y la gorra; mismo inpaint de la marca del emplaye y "CLARK" | Ruta, FIG. 05 (pareja chica 4:5) |
| frente-480/960/1112 | ig-07, panel de arriba (48,14)-(326,247): la barra frente al letrero JAS INOX con la Virgen en la pared; sin inpaint | Taller, FIG. 07 |
| th-*.webp 144x180 | miniaturas 4:5 de carrito-a, carrito-c, redilas-b, truck-tj, campana y frente | Tira del pie |
Ya no se usan (se quedan en img/ por si se regresa): carga-480/868 y tarja-gab-456.

Corrección 3 (`gen/fix_assets.py r3`):
| carga3-480/776 | ig-05, panel inferior izquierdo (5,372)-(199,638): dos muebles de inoxidable emplayados con su forma a la vista. Arranca debajo de la etiqueta "JAS INOX" que cruza el collage; la marca "JAS" del emplaye de la izquierda con cv2.inpaint, la de la derecha y la orilla blanca del collage quedan fuera por recorte | Ruta, FIG. 05 · Ags. · Listas para salir |
| banda-b-480/640 | ig-06, panel superior derecho, DETALLE 4:5 (338,85)-(498,285) de la torre de redilas vista de atrás; "JAS" del costado con inpaint. No es el panel completo porque ese ya es REF. 06 del catálogo, justo arriba | Banda (solo compu), FIG. 02b |
| banda-c-480/960 | ig-06, panel inferior izquierdo (0,323)-(254,640): la pickup de lado frente a la casa; sin inpaint | Banda (solo compu), FIG. 02c |
| tarja-top-480/664 | la misma tarja x4, solo el 75 % de arriba (cubierta, tarja y puertas; fuera el piso con la mancha del inpaint) | Catálogo REF. 04 |
Ya no se usan (se quedan en img/): carga2-480/828 y tarja-480/664.

Corrección 4 (`gen/fix_assets.py r4`): menos "cera" en todas las fotos x4.
| todas las x4 publicadas (hero, carrito-a, carrito-c, cajones, tarja-top, campana, redilas-b, banda, banda-b, banda-c, carga3, truck-tj) | mismo recorte de siempre; ahora 42 % de textura original (Lanczos del recorte) sobre el x4, realce más suave (UnsharpMask 30 %) y grano fino monocromo a la resolución final (sigma 4.2 en 960, 3.2 en 480). Sin IA | mismos nombres de archivo, el HTML no cambia |
| carrito-a, carrito-c, campana, redilas-b | su x4 de make_assets.py ya no existía: se rehízo desde el mismo recorte (hallado con cv2.matchTemplate contra la webp publicada, score > 0.99): ig-03 (0,320)-(256,640), ig-04 (256,320)-(512,640), ig-10 (120,0)-(361,275), ig-06 (256,0)-(512,320); Real-ESRGAN x4 `-s 4` | Catálogo |
Ya no se usa en la página: frente-480/960/1112 (FIG. 07 repetía la barra del hero). Se queda en img/ y sigue siendo la miniatura 06 del pie (th-barra).
Mapa de la ruta: ya no es trazo a mano. `gen/mx_map_ne.py` lo genera de Natural Earth 1:50m (dominio público, `gen/ne50-mexico.json`).
