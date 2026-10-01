# Imágenes (todas reales; cero IA generativa, cero stock; solo PIL)

Origen: `research/fotos/`. Procesadas con PIL (recorte, redimensión, webp). Nada pasó por Real-ESRGAN.

| Archivo en img/ | Origen | Dónde se usa | Notas |
|---|---|---|---|
| hero-d-480/960/1360.webp | dnc-atrio-lobby-1360x1020.jpg | Hero (compu) | nativo 1360, sin ampliar |
| hero-m-480/765.webp | mismo, recorte vertical x150-915 | Hero (celular) | `<picture>` con dirección de arte |
| retrato-264/528.webp | retrato-doctor-doctoralia-528x530.jpg | Credenciales (216 a 264 px) y hero de compu (150 px) | NUNCA a más de 264 px; no se usó la versión x4 |
| cmv-fachada-480/790.webp | cmv-fachada-dia-1600x961.jpg recortada x520-1310, y40-880 | Consultorios (CMV) | queda fuera el rótulo "ventus SPA", la camioneta y los autos con placas |
| cmv-letrero-255/510.webp | cmv-letrero-doctor-900x1600.jpg recortada a su placa | Consultorios (CMV, chica) | se quitó la placa oscura ajena que asomaba |
| dnc-consultorio-480/960/1600.webp | dnc-consultorio-vacio-1600x1200.jpg | Consultorios (DNC) | rotulada "Un consultorio de la unidad" (falta confirmar cuál es el suyo) |
| dnc-entrada-s-240/480.webp | dnc-entrada-1200x1600.jpg (reducida) | Consultorios (DNC, chica) | |
| dnc-noche-480/960/1600.webp | dnc-fachada-noche-1600x1200.jpg | Cierre | el rótulo "Farmacia D" queda fuera de cuadro por el recorte; título sobre la zona oscura |
| pie-recepcion-480/720.webp | dnc-recepcion-pasillo-1600x1200.jpg recortada x880-1600, y100-640 | Pie | sin la escalera de tijera ni las bolsas |
| t-cmv.webp, t-dnc.webp | recortes cuadrados de la fachada CMV y de la fachada noche DNC | Fotos chicas de "¿En cuál consultorio?" | 192 px |
| logo.png, favicon-32.png, apple-touch-icon.png | logo-facebook.jpg (recorte 1100x1100) | Header, pie, favicon | fondo carbón #252525 se funde con el mosaico |
| og.jpg | PIL: hueso + atrio en hoja + logo + Jost | og:image 1200x630 | Jost bajada de Google Fonts a la carpeta de trabajo |

NO usadas (prohibidas por la hoja): _no-usar-maps-03, retrato x4, ig-*, banner-cmv-propio, banner-dnc-propio, maps-01, maps-05, research/_videos/. Tampoco maps-02 ni maps-04.

Fotos que venden: sin `loading="lazy"` el hero y la fachada CMV; las demás van lazy sin clip-path ni reveal encima.
