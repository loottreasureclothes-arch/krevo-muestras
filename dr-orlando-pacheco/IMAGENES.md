# Imágenes (todas reales; cero IA generativa, cero stock; solo PIL)

Origen: `research/fotos/`. Procesadas con PIL/numpy (recorte, redimensión, webp y un retoque local). Nada pasó por Real-ESRGAN ni por IA generativa.

**Corrección 1 (1 oct 2026):** el mostrador de la cafetería del atrio traía el letrero ajeno "BISTRO GARDEN". Se borraron solo esas letras rellenando con los mismos listones verticales de madera (interpolación vertical por columna, PIL/numpy, área 55x56 px del original). El original en `research/fotos/` queda intacto.

| Archivo en img/ | Origen | Dónde se usa | Notas |
|---|---|---|---|
| hero-d-480/960/1360.webp | dnc-atrio-lobby-1360x1020.jpg con el letrero "BISTRO GARDEN" retocado | Hero (compu) | nativo 1360, sin ampliar |
| hero-m-480/920.webp | mismo retocado, recorte apaisado x120-1040, y0-820 (tragaluz, olivo y pino) | Hero (celular, caja de 330 px) | `<picture>` con dirección de arte; sustituye a hero-m-765 (ya sin uso) |
| retrato-264/528.webp | retrato-doctor-doctoralia-528x530.jpg | Credenciales (216 a 264 px), hero de celular (88-92 px) y hero de compu (120-136 px) | NUNCA a más de 264 px; no se usó la versión x4 |
| cmv-fachada-480/790.webp | cmv-fachada-dia-1600x961.jpg recortada x520-1310, y40-880 | Consultorios (CMV) | queda fuera el rótulo "ventus SPA", la camioneta y los autos con placas |
| cmv-letrero-255/510.webp | cmv-letrero-doctor-900x1600.jpg recortada a su placa | Consultorios (CMV, chica) | se quitó la placa oscura ajena que asomaba |
| dnc-consultorio-480/960/1600.webp | dnc-consultorio-vacio-1600x1200.jpg | Consultorios (DNC) | rotulada "Un consultorio de la unidad" (falta confirmar cuál es el suyo) |
| dnc-entrada-s-240/480.webp | dnc-entrada-1200x1600.jpg (reducida) | Consultorios (DNC, chica) | |
| cierre-noche-480/840/1260.webp | dnc-fachada-noche-1600x1200.jpg recortada x340-1600, y0-1170 | Cierre | fuera el letrero circular "FARMACIA DI" y el cartel de la izquierda; sustituye a dnc-noche-* (ya sin uso) |
| pie-recepcion-480/720.webp | dnc-recepcion-pasillo-1600x1200.jpg recortada | YA NO SE USA | la franja del pie se veía borrosa a 1440 y se quitó en la corrección 1 |
| t-cmv.webp, t-dnc.webp | recortes cuadrados de la fachada CMV y de la fachada noche DNC | Fotos chicas de "¿En cuál consultorio?" | 192 px |
| logo.png, favicon-32.png, apple-touch-icon.png | logo-facebook.jpg (recorte 1100x1100) | Header, pie, favicon | fondo carbón #252525 se funde con el mosaico |
| og.jpg | PIL: hueso + atrio en hoja + logo + Jost; corrección 1: letrero "BISTRO GARDEN" retocado igual que el hero | og:image 1200x630 | Jost bajada de Google Fonts a la carpeta de trabajo |

NO usadas (prohibidas por la hoja): _no-usar-maps-03, retrato x4, ig-*, banner-cmv-propio, banner-dnc-propio, maps-01, maps-05, research/_videos/. Tampoco maps-02 ni maps-04.

Fotos que venden: sin `loading="lazy"` el hero y la fachada CMV; las demás van lazy sin clip-path ni reveal encima.
