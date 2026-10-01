# Mr. MICHEvy · IMAGENES

Todas salen de cuadros de sus videos públicos (`research/fotos/`, `research/_videos/`). Nada de IA generativa ni stock. Procesado con PIL, ffmpeg, OpenCV y las subidas ya hechas con Real-ESRGAN (no se corrió ninguna nueva). Scripts: scratchpad `michevy-shots/` (find.py, find2.py, prep1-4.py, export.py, og.py) y, en la CORRECCIÓN 1, `michevy-fix/` (llega.py, fotos.py, export.py).

| Archivo en `img/` | Origen | Tratamiento | Uso y tamaño máximo |
|---|---|---|---|
| hero-480/720/1080.webp | vaso-con-logo-sobre-barra (x4 Real-ESRGAN, 1440 px) | Mezcla 50/50 con su cuadro original + grano (de la 1a ronda); CORRECCIÓN 1: recorte x 165-1320, y 230-1792 (fuera las tapas de botellas) y velo negro cálido en la esquina superior izquierda (botellas irreconocibles); borde izquierdo suave | Hero: alto 100svh − 405 px en celular, 460 px en compu |
| tajin-480/720/1080.webp | michelada-escarchada-tajin-mano (x4) | Mezcla 50/50 con su cuadro original + grano; CORRECCIÓN 1: recorte del 17 % derecho (sin la etiqueta con QR ni el "@") | Domicilio: máx 400 px en compu |
| llega-480/768.webp | boda-traslado-barra-techo-auto | CORRECCIÓN 1: volteada en horizontal (el cuadro venía en espejo; los logos ya leen bien), "DUSTER" borrado con inpaint OpenCV, recorte 1:1 x 108-808 y 336-1036 (la caja llena el cuadro) | Barrido 1:1, 520 px máx |
| queda-480/768.webp | rancho-barra-con-hielera | CORRECCIÓN 1: recorte 1:1 x 362-1074, y 603-1315: sin la hielera Corona ni personas; su logo cae en el mismo punto que la caja de "llega" (47 % 55 %) | Barrido 1:1, 520 px máx |
| frente-480/750.webp | barra-logo-angulo-cielo (antes barra-logo-de-frente) | CORRECCIÓN 1: recorte x 280-1030, y 80-1018: cubierta de madera y logo; fuera la botella con marca, el poste y casi todo el piso | Mediana, 330 px |
| chile-480/720/1000.webp | vaso-con-logo-sobre-barra (mezcla) | CORRECCIÓN 1: sustituye a la mesa de ingredientes (se veía sucia): acercamiento del borde de chile, x 180-1180, y 408-778 | Tira chica con calcomanía "Condimentos hechos por él", 340 px |
| sirviendo-480/660.webp | rancho-sirviendo-micheladas | CORRECCIÓN 1: recorte 4:5 x 380-1040, y 760-1585: él trabajando, sin la copa del árbol ni la ayudante; CLAHE suave y nitidez | Eventos, 400 px máx |
| vasos-480/720/1080.webp | boda-despachadores-vasos-escarchados | Recorte inferior (1a ronda); CORRECCIÓN 1: denoise suave, sombras +0.4 EV, grano fino | Chica, 230 px |
| feria-430.webp | feria-michelada-fest-carpa | Solo el letrero azul "Michelada Fest / Mr. MICHEvy" (la carpa de refresco y la gente quedan fuera; el intento de inpaint se descartó por feo) | Chica |
| caja-480/720/1080.webp | reparto-caja-logo-tapa-verde | Recorte inferior: caja con logo, sin placa ni casas | Mediana, 240 px |
| garnish-480/720/970.webp | michelada-preparada-garnish | CORRECCIÓN 1: magenta corregido en LAB (a −14, b +4), CLAHE 1.6, unsharp; recorte x 110-1080, y 96-844 (fuera el "NO!") | Cierre EN MARCO 970:748, máx 540 px; ya no a sangre |
| logo-96/256/512.webp, favicon-32.png, apple-touch-icon.png | logo-fb.jpg (2048 px) | Recorte circular con alfa; apple-touch sobre negro cálido | Header 44 px, pie 120 px, sticker del vaso |
| og.jpg | PIL (Bricolage 800 semi-condensada) | 1200x630: vaso a la derecha, título con 2a frase dorada, escarchado arriba | Meta og:image |
| escarchado.svg / escarchado-s.svg | generado (granitos rojo chile, densidad desigual) | SVG de puntos | Filo del header, divisores, botones |
