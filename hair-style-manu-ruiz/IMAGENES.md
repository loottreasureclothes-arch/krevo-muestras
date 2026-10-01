# Imágenes (todas reales; sin IA generativa, sin Higgsfield)
Salida en `img/` (webp 480/780/1080). Pipeline: `_work/imgs.py`, `_work/imgs2.py`, `_work/og.py`, medición `_work/measure.py`, generador `_work/gen.py`.

## Mechones de la carta: colores MEDIDOS con PIL (media del 30 al 90 % de luminancia en 3 zonas del cabello de cada foto)
| # | Tono | Foto | Raíz | Medio | Punta |
|---|---|---|---|---|---|
| 1 | Rubio ceniza | ig-manu-2026-07-30-rubio-ceniza.jpg | #9E9180 | #ACA397 | #AE9C8A |
| 2 | Rubio dorado | ig-manu-2026-08-09.jpg | #483A2F | #997E66 | #9D6E4E |
| 3 | Rubio sobre castaño | ig-manu-2026-08-23.jpg | #665F5C | #8F7F73 | #A48D7A |
| 4 | Castaño | ig-manu-2026-08-25-moreno.jpg | #3B3534 | #5B5355 | #685153 |
| 5 | Rubio miel | ig-manu-2026-09-02.jpg | #8E745B | #C4A082 | #A57B5C |
| 6 | Caramelo | ig-manu-2026-09-24.jpg | #5F4A40 | #A58775 | #9A7660 |
| 7 | Cobrizo | ig-visage-2026-09-10.jpg | #584638 | #845F45 | #865B40 |
| 8 | Castaño cobrizo | ig-visage-pelo-castano-cobrizo.jpg | #5A433A | #96624E | #795043 |
| 9 | Castaño ceniza | ig-visage-pelo-gris-ceniza-mano.jpg | #5D5052 | #7A7273 | #5C5151 |

## Otras
- `manu-*.webp`: video-manu-sonriendo-b-MEJOR recortado (sin el pelo de la clienta), 50 % Real-ESRGAN + 50 % original (bajado a 476 px y subido con LANCZOS) + grano fino. Se muestra a 358 px (celular) y 440 px (compu).
- `salon-*.webp`: video-salon-interior-espejo-focos recortado 3:4, misma mezcla; se muestra chico (150 a 220 px).
- `tira-pie.webp`: recorte de textura de cabello de ig-visage-pelo-castano-cobrizo para rematar el pie.
- `bob-*`, `recogido-*`: ig originales sin escalar.
- `og.jpg` 1200x630 (PIL, Instrument Serif), `favicon-32.png`, `apple-touch-icon.png` (M itálica crema sobre castaño), `hebras.svg` (divisor de 60 hebras).
- No usadas (prohibidas): retrato-manu-tiktok-avatar, maps-visage-rotulo-pared-mano-manicura, research/_videos.
