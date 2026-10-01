# Delgado Express · IMAGENES (todo real, sin IA, sin stock)

Actualizado en CORRECCION-1 (30 sep 2026). Hecho con PIL, OpenCV (inpaint e interpolación) y Real-ESRGAN x4plus (`-s 4`, luego reducción con PIL), exportado a webp.
Scripts reproducibles en el scratchpad de la sesión: `delgado-fix/imgs1.py` (parches, enderezado, recortes) e `imgs2.py` (exporta a img/).

| Archivo en img/ | Origen (research/fotos/) | Proceso | Dónde se usa |
|---|---|---|---|
| hero-m-{480,960,1200}.webp | fb-02 | sin cambios (cabina 068) | hero celular |
| hero-d-{480,960,1600}.webp | fb-02 | sin cambios | hero tablet y compu |
| kenworth-{480,960,1600}.webp | fb-04 | placa borrada con interpolación vertical que sigue los reflejos de la defensa cromada (sin recuadro) | flota (compu) |
| kenworth-m-{480,960,1200}.webp | fb-04 | mismo parche, recorte 4:5 (x 170 a 1399) | flota celular, a sangre |
| unidad057-{480,960,1600}.webp | maps-01 | sin cambios (solo se ve un brazo en la ventana) | flota, placa "Tracto 057 · Caja 247" |
| unidad208-{480,960,1504}.webp | fb-07 | recorte 16:9 (0,574)-(1504,1420): cabina 016 completa, sin el letrero ni las franjas de PEMEX; placa delantera y número de serie de la caja borrados | flota, placa "Tracto 016 · Caja 208" |
| caja-noche-{480,960,1280}.webp | fb-03 | placa borrada (inpaint), enderezada -12° (recorte 944x531 sin esquinas), Real-ESRGAN x4 mezclado 62/38 con bicúbica para no verse plástica | flota |
| patio-fila-{480,960,1280}.webp | fb-01 | 3 placas borradas (inpaint), enderezada -21° (recorte 864x432), Real-ESRGAN x4 mezclado 62/38 | flota |
| caja247-{480,960}.webp | maps-01 | recorte de la caja 247 (x 1302-1722, y 326-792): "DELGADO Express", 247 y 53'; Real-ESRGAN x4 | opiniones |
| puerta057-{480,960}.webp | maps-01 | recorte de la puerta 057 (x 838-1262, y 404-834) sin ventana ni bloque RFC; calcomanía CONATRAM con año borrada; Real-ESRGAN x4 | cierre (marco cromo) |
| patio-{480,960,1240}.webp | maps-03 | panorámica 21:9 (x 480-1720, y 630-1161) con la fila de cajas al tercio de abajo | patio |
| pie-208-{480,960,1600}.webp | fb-07 | mismo parche, recorte ancho (0,574)-(2048,1400) | pie, con velo azul noche |
| og.jpg | fb-02 + Archivo | Chrome headless 1200x630, degradado continuo azul noche (sin franja gris ni escalón) | head |
| favicon-32.png, apple-touch-icon.png | Archivo | PIL (sin cambios) | head |

Retiradas de img/ (copiadas a `delgado-fix/img-retiradas/` del scratchpad): rotulo-020-* (fb-08 de 315 px reescalada), rotulo-cabina-* (fb-06 suave), pie-rueda-* (repetía fb-02), patio-1200, patio-fila-1100.
Prohibidas y NO usadas: maps-04 (Julio Delgado e Hijos), maps-05 (tractocamión verde sin atribuir), maps-06 (vans), maps-07 (Transportes del Bajío). fb-08 y fb-06 ya no se usan.
Ninguna foto lleva lazy-load; las del hero tienen fetchpriority=high y preload.
