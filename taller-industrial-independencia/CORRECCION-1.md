# Corrección 1 (pulidor, 1 oct 2026)

## Los 10 problemas más visibles (en orden, vistos como cliente a 390, 820 y 1440)
1. Logo "TII" de la plaquita deslavado y sucio (lona fotografiada): se ve pálido en el header y peor en el pie, donde va grande.
2. Foto de la grúa (momento firma) quemada y deslavada: el interior de la nave casi blanco, la placa del 4.9 pierde fuerza encima.
3. Foto de la nave (sección Taller) opaca y con dominante café.
4. En el cierre, "Arma tu pieza primero" seguía visible junto al resumen "Tu pieza: ..." aunque ya se hubiera armado la pieza (`.ti-link` le ganaba a `hidden`).
5. Componente firma en celular: al bajar, los renglones de los pasos se cortaban pegados al borde de la bancada fija (texto partido justo debajo del panel).
6. Hueco de unos 104 px al final de la sección Taller en celular (después de "Pedir mantenimiento").
7. La viruta del título del hero en celular cruzaba encima de la barra de la mesa (se encimaba con las ranuras en T).
8. Plaquita del logo del pie a 56 px de alto: enseñaba de más lo sucio del recorte.
9. Bancada "sin tocar": la barra en bruto se ve plana (un rectángulo color cascarilla) hasta que se toca una operación.
10. En compu y tableta, el cierre deja aire a la derecha de la foto de la fachada (va a 10/12 como pide la hoja) y en 820 el hero queda con la foto chica.

## Qué se arregló
- 1: `img/logo-tii.png` con niveles y contraste (autocontraste suave, contraste 1.15, saturación 0.9, nitidez): letras más firmes, engrane sin volverse naranja. Mismo recorte, nada redibujado. Respaldo del anterior en el scratchpad del pulidor.
- 2: `grua-724/480.webp` rehechas desde `taller-07` con el mismo recorte (x 175 a 899): niveles, gamma 1.18, contraste y balance de gris parcial. El interior y la grúa amarilla ya se leen.
- 3: `nave-899/480.webp` rehechas desde `taller-08` (y 320 a 1600): balance de gris parcial, niveles y contraste.
- 4: `60-cierre.css`: `#ti-resumen-link[hidden] { display: none; }`. Con pieza armada solo queda "Tu pieza: barra de acero, tornear, fresar y barrenar, 2 a 10." y el verde.
- 5: `30-pieza.css`: en celular la bancada fija lleva una franja gris fresadora de 14 px con filo duro abajo (clip-path extendido), así el contenido pasa por debajo limpio. En compu sin cambio.
- 6: `20-taller.css`: padding inferior de la sección en celular de 56 a 30 px.
- 7: `10-hero.css`: el título sube 14 px sobre la foto (margin -106 px) y la viruta ya no pisa la barra de la mesa.
- 8: `site.css`: plaquita grande del pie de 56 a 46 px (logo a 36 px).

## Qué no se arregló
- 9: la barra en bruto se dejó como está: en cuanto se toca una operación (ya viene "Barra redonda" elegida) cambia de forma, suelta viruta y se tiñe; el flujo funciona y no hubo presupuesto para rehacer el SVG.
- 10: el cierre en compu sigue la hoja (fachada a 10/12); la tableta a 820 se ve ordenada pero con hero algo chico. No se tocó.
- El logo sigue siendo un recorte de lona: con el archivo original se reemplaza `img/logo-tii.png` (ya está en PENDIENTES).
- La foto de la nave enseña al frente un carro con una bolsa de plástico; no se puede quitar sin IA. Con fotos nuevas del dueño se cambia.

## Verificación
- krevo-shot m: alto 8,629 px, `alertas: []`, sin errores de consola ni 404, sin scroll horizontal.
- krevo-shot d: alto 7,546 px, `alertas: []`.
- wa.me del componente probado (barra, tornear, fresar, barrenar, acero, 2 a 10, pieza rota, línea parada, Luis):
  "Hola Taller Industrial Independencia, quiero cotizar una pieza. Sale de: barra redonda. Proceso: OP 10 tornear, OP 20 fresar, OP 30 barrenar. Material: acero. Cantidad: 2 a 10. Traigo: una pieza rota para reponer. Urgencia: tengo una línea parada. Mi nombre: Luis. Les mando fotos por aquí."
  El verde del cierre lleva el mismo mensaje. Camino de mantenimiento y hongo de paro probados.
- La placa del 4.9 queda asentada (aprox. 73 % del alto de la foto) y las dos opiniones visibles a los 1.6 s.
