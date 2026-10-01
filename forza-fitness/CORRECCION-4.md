# Forza Fitness Club · Corrección 4 (30 sep 2026, última pasada puntual)

Solo se editó `sections/`, `img/` e `IMAGENES.md`; index.html se armó con `python3 build.py` después de cada cambio. Respaldo de lo anterior en `scratchpad/r4fix-forza-fitness/backup/`; scripts `imgs4.py`, `punch.py`, `grade.py`; imágenes retiradas en `img-retiradas/`.

## Aplicado
1. **Fotos más claras, ninguna repetida**
   - Rack (sección del rayo): rehecho desde maps-04 (mismo recorte sin el 16 % de arriba) con Real-ESRGAN x4 (`-s 4`) bajado a 1600 y mezclado 55/45 con el original, más niveles (negro 5 %, blanco 97 %), CLAHE en la L de LAB (respeta el rojo) y unsharp suave. Discos, barra y block se leen; el velo de arriba bajó de .55 a .45 y el del centro de .22 a .12.
   - Zona funcional: nueva `funcional-w` horizontal (maps-03, estante de balones, cajones y trineo, sin la columna movida de la izquierda), mismo tratamiento. Ya no va como foto chica suelta: vive dentro del casillero "Y además" (ver 3). En tableta y compu se queda en columna de 260 / 360 / 400 px (no crece a todo el ancho).
   - Pasillo "#605 · Adentro": mismo recorte, SIN Real-ESRGAN, con niveles + CLAHE suave + unsharp. Ya no se ve lodoso; tamaño igual (58 % en celular, columna en compu).
   - Tira de mancuernas antes del cierre: QUITADA (repetía el hero). La reemplaza el divisor del rayo (`.fz-div--cierre`). fierro-* y funcional-480/960 salieron de img/.
2. **Voz y planes**
   - Lead: "Precios publicados; confirmamos el vigente al inscribirte." (primera persona de Forza).
   - Título: "Elige tu / plan."
   - "Otros paquetes" sin botón Elegir: link grande "Pregunta / el precio" con flecha (rojo, sin verde) que elige ese plan y baja al cierre (`#cierre`). Probado: el cierre dice "Tu plan ya está listo." con Plan "Otros paquetes" y el WhatsApp queda "...Me interesa saber el precio de otros paquetes."
3. **Detalles**
   - Punto de "Abierto ahora" (hero y Colosio): rojo vivo relleno con brillo y una onda que sale (`fzPing`, 1.4 s). Cerrado sigue en contorno gris. Con reduced-motion, quieto.
   - Compu (≥1024): el arte Reloaded baja a 46 % de ancho y .5 de opacidad, solo detrás del título; los casilleros crecen (360 px de alto, nombre 58 px, precio 64 px) y la rejilla sube a 1,320 px de ancho desde 1280. "Lo que trae el club" a 30 px itálica 800.
   - "Y además" ahora es casillero `#031 · Más clases` con el mismo lenguaje del tablero: foto de la zona funcional + 8 casillas grafito con filo rojo (2 columnas en celular y compu, sin íconos) + etiqueta "Horario pregúntanos." con marco rojo.
   - "Todo listo para completar", punto 01: ahora pide "Fotos con gente entrenando: una clase de CrossFit en el box, la fachada, la guardería y los coaches".

## No arreglado
- **Nadie entrenando**: no existe una foto pública usable con gente entrenando (maps-05 tiene caras de socios; las de maps-01 están paradas y lejos; sin IA ni stock). Se pide al dueño en "Todo listo para completar".
- Las fotos siguen siendo de Google Maps: más claras, pero no son de sesión profesional.

## Verificación
- krevo-shot `m`: alto 8,181 px (tope 9,000), 4 WhatsApp, 0 alertas.
- krevo-shot `d`: alto 7,644 px, 4 WhatsApp, 0 alertas.
- 820 px: 7,687 px, sin scroll horizontal. 1440: sin scroll horizontal.
- Verdes por sección: inicio 0, planes 0, horario 1, club 0, colosio 0, cierre 1 (+ flotante).
- Flujo Plan Gold + CrossFit mié 6:00 pm, igual en el menú, `#fz-send`, `#fz-send2` y el flotante:
  `https://wa.me/524491538877?text=Hola Forza Fitness Club, quiero pedir mi inscripción. Me interesa el Plan Gold (desde $999.90 al mes). Clase: CrossFit mié 6:00 pm con Diego Sánchez.`
- Hojas: `scratchpad/r4fix-forza-fitness/hoja-celular.jpg`, `hoja-compu.jpg`, `hoja-820.jpg`.
