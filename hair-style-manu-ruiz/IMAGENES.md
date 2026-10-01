# Imágenes (todas reales; sin IA generativa, sin Higgsfield)
Salida en `img/` (webp 480/780/1080). Pipeline: `_work/imgs.py`, `_work/imgs2.py`, `_work/imgs3.py` (corrección 1: retrato y salón; manda sobre imgs2 para `manu-*` y `salon-*`, no correr imgs2 después), `_work/og.py`, medición `_work/measure.py` + `_work/measure2.py` (4.º color), generador `_work/gen.py`.

## Mechones de la carta: colores MEDIDOS con PIL (media del 30 al 90 % de luminancia en 3 zonas del cabello de cada foto)
4.º color "Luz de punta" (corrección 1, `_work/measure2.py`): media de los píxeles entre el percentil 80 y 90 de luminancia en la mitad baja del medio + la zona de punta (mismas columnas). Se usa porque en las 9 fotos sale de 17 a 46 puntos de luminancia más claro que la punta medida (si no, se repetiría la punta). El mechón se pinta raíz 0 % · medio 46 % · punta 76 % · luz 100 %, más un brillo diagonal al 29 % del alto.

| # | Tono | Foto | Raíz | Medio | Punta | Luz de punta | Crédito en la carta |
|---|---|---|---|---|---|---|---|
| 1 | Rubio ceniza | ig-manu-2026-07-30-rubio-ceniza.jpg | #9E9180 | #ACA397 | #AE9C8A | #BDAE9D | De @manuruiz_asesor |
| 2 | Rubio dorado | ig-manu-2026-08-09.jpg | #483A2F | #997E66 | #9D6E4E | #C69F7E | De @manuruiz_asesor |
| 3 | Rubio sobre castaño | ig-manu-2026-08-23.jpg | #665F5C | #8F7F73 | #A48D7A | #B6A18E | De @manuruiz_asesor |
| 4 | Castaño | ig-manu-2026-08-25-moreno.jpg | #3B3534 | #5B5355 | #685153 | #836768 | De @manuruiz_asesor |
| 5 | Rubio miel | ig-manu-2026-09-02.jpg | #8E745B | #C4A082 | #A57B5C | #BC9677 | De @manuruiz_asesor |
| 6 | Caramelo | ig-manu-2026-09-24.jpg | #5F4A40 | #A58775 | #9A7660 | #AE8B76 | De @manuruiz_asesor (la carta arranca aquí) |
| 7 | Cobrizo | ig-visage-2026-09-10.jpg | #584638 | #845F45 | #865B40 | #9C6F52 | Visage con Manu |
| 8 | Castaño cobrizo | ig-visage-pelo-castano-cobrizo.jpg | #5A433A | #96624E | #795043 | #996B5C | Del Instagram de @visagesalon_ags |
| 9 | Castaño ceniza | ig-visage-pelo-gris-ceniza-mano.jpg | #5D5052 | #7A7273 | #5C5151 | #8B7B78 | Del Instagram de @visagesalon_ags |

## Corrección 2: textura de cada mechón (`img/mechon-<slug>.webp`, 176x600 con alfa)
`_work/mechones.py` (PIL, sin IA): ~470 hebras finas dibujadas a 4x y bajadas con LANCZOS, cada una con brillo propio, sombra de volumen en los bordes, brillo cálido (el mismo color de la luz de punta, no gris) a ~30 % y ~64 % del alto y puntas de largo desigual. Paleta: parte de los colores medidos de la tabla de arriba (se guardan en `tones.json` -> `med`) y se corrigió el matiz hacia el rango real del cabello (los medidos salían grises o lilas por la luz blanca del salón), se subió la saturación, se oscureció la raíz y se aclaró y calentó la punta, revisando cada foto. Los colores corregidos quedan en `tones.json` (`root/mid/tip/light`) y los usa también el mini mechón del header, la ficha y el cierre. Se usa en la carta y en los mechoncitos de la ficha de cita.

## Otras
- `manu-*.webp` (520/780/1000, 4:3 horizontal, corrección 1): recorte x 0-1570, y 0-1180 de video-manu-sonriendo-b-MEJOR (completo, con su melena de puntas claras y la pared como aire; corta antes de la cabeza de la clienta, que empieza en y 1230). Mezcla 50 % Real-ESRGAN + 50 % del CUADRO ORIGINAL del video (TikTok 7572610379650501906, cuadro 4800 de 576x1024, localizado con matchTemplate de OpenCV, coincidencia 0.999, zona x 90, y 0 a escala 1/4; guardado en `_work/manu-cuadro-4800.png`) subido con LANCZOS, más grano fino en cada tamaño. Corrección 2: en celular va en recuadro con marco de 280 px (foto a 262 px, grapa espresso arriba), ya no a todo el ancho; en compu hasta 400 px. Etiqueta de muestra "Manu Ruiz".
- `salon-*.webp` (480/780/1000, 1:1, corrección 1): video-salon-interior-espejo-focos recortado x 120-1560, y 740-2180 (espejo de focos completo, tocador y planta; sin el cabello de la clienta, que está abajo a la derecha desde y 2480). Mezcla 50 % Real-ESRGAN + 50 % simulado a 1/4 y subido con LANCZOS, más grano. Se pinta a todo el ancho de la columna en 6:5 (358x298 en celular), con etiqueta "En el salón".
- `tira-pie.webp`: YA NO SE USA (corrección 2: se veía estirada y con artefactos). El pie remata con `hebras-pie.svg` (generado por `_work/gen.py`): tile de 600x140 con ~300 hebras que cuelgan de una línea espresso, raíz oscura y puntas miel.
- `bob-*`, `recogido-*`: ig originales sin escalar.
- `og.jpg` 1200x630 (PIL, Instrument Serif), `favicon-32.png`, `apple-touch-icon.png` (M itálica crema sobre castaño), `hebras.svg` (divisor de 60 hebras).
- Balayage (sin imagen, SVG en `sections/40-opiniones.html` generado por `_work/gen.py`): 96 hebras de base castaña que no se aclaran + 155 hebras en 14 mechones (3 gruesas de 2.4 a 4 px por mechón y finas alrededor, onda larga compartida que se junta y se separa) + 20 brillos. Un degradado por mechón. En compu el mismo dibujo se repite espejado con `<use>` (2 copias de 760 a 1179 px, 3 desde 1180).
- No usadas (prohibidas): retrato-manu-tiktok-avatar, maps-visage-rotulo-pared-mano-manicura, research/_videos.
