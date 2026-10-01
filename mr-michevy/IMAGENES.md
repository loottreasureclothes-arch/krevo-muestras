# Mr. MICHEvy · IMAGENES

Todas salen de cuadros de sus videos públicos (`research/fotos/`, `research/_videos/`). Nada de IA generativa ni stock. Procesado con PIL, ffmpeg, OpenCV y las subidas ya hechas con Real-ESRGAN (no se corrió ninguna nueva). Scripts: scratchpad `michevy-shots/` (find.py, find2.py, prep1-4.py, export.py, og.py).

| Archivo en `img/` | Origen | Tratamiento | Uso y tamaño máximo |
|---|---|---|---|
| hero-480/720/1080.webp | vaso-con-logo-sobre-barra (x4 Real-ESRGAN, 1440 px) | Se encontró el cuadro original (video 7485560656138079543, 720x1280) por template matching; mezcla 50 % subida + 50 % original LANCZOS + grano fino; recorte x 165-1320 para sacar la botella con marca de la izquierda; borde izquierdo suave | Hero: 100 vw en celular (390), 460 px en compu |
| tajin-480/720/1080.webp | michelada-escarchada-tajin-mano (x4) | Misma mezcla 50/50 con su cuadro original (video 7539227938143735058) + grano | Domicilio: máx 400 px en compu, 270 en celular |
| llega-480/768.webp | boda-traslado-barra-techo-auto | Recorte 4:5 que saca el texto de la marca del auto (parte baja) | Barrido, 520 px máx |
| queda-480/768.webp | rancho-barra-con-hielera | Recorte 4:5 sobre la barra: sin la hielera Corona, sin personas | Barrido, 520 px máx |
| frente-480/720/1080.webp | barra-logo-de-frente | Tal cual | Mediana, 360 px |
| mesa-480/720.webp | mesa-ingredientes-tarros-chiles | Recorte inferior (quita botellas con marca de salsas del estante alto) | Chica con calcomanía |
| sirviendo-480/750.webp | rancho-sirviendo-micheladas | Recorte 4:5 sin la ayudante ni garrafón con marca | Eventos, 400 px máx |
| vasos-480/720/1080.webp | boda-despachadores-vasos-escarchados | Recorte inferior: solo vasos con hielo y borde de chile (quita la etiqueta de salsa del despachador) | Chica, 230 px |
| feria-430.webp | feria-michelada-fest-carpa | Solo el letrero azul "Michelada Fest / Mr. MICHEvy" (la carpa de refresco y la gente quedan fuera; el intento de inpaint se descartó por feo) | Chica |
| caja-480/720/1080.webp | reparto-caja-logo-tapa-verde | Recorte inferior: caja con logo, sin placa ni casas | Mediana, 240 px |
| garnish-480/720/1080.webp | michelada-preparada-garnish | Tal cual | Cierre, cover a todo el ancho |
| logo-96/256/512.webp, favicon-32.png, apple-touch-icon.png | logo-fb.jpg (2048 px) | Recorte circular con alfa; apple-touch sobre negro cálido | Header 44 px, pie 120 px, sticker del vaso |
| og.jpg | PIL (Bricolage 800 semi-condensada) | 1200x630: vaso a la derecha, título con 2a frase dorada, escarchado arriba | Meta og:image |
| escarchado.svg / escarchado-s.svg | generado (granitos rojo chile, densidad desigual) | SVG de puntos | Filo del header, divisores, botones |
