# Corrección 1 (pulidor, 1 oct 2026)

## Los 10 problemas más visibles (antes de corregir, en orden)
1. La báscula arrancaba en "0 g / Elige un tamaño" con la aguja tirada sobre la base y un platillo lleno encima: el componente firma se veía muerto y contradictorio; la nota decía "SIN ELEGIR" y el cierre "FALTA PONER TU PLATO".
2. Momento firma en celular: la foto del horno empezaba con un corte duro a media cita («...generación en generación» quedaba partida entre la banda pizarra y la foto).
3. Los topes de la báscula (130, 150, 170 g) eran rayitas de oro de 6 px que parecían basura; no se distinguía el tope elegido.
4. Foto de su fachada: chica (330 px), blanda, con un arco aplastado raro y la placa "SU FACHADA" encima del letrero; en compu quedaba huérfana bajo los botones.
5. Al preseleccionar el plato, la mini barra de la nota se encimaba sobre el hero y luego tapaba el botón verde "Pedir por WhatsApp".
6. La mini barra partía su texto en dos renglones y chocaba con el botón flotante.
7. Placa "HECHAS A MANO" partida en dos renglones con la mordida chueca.
8. Pie: "AGUASCALIENTES ·" con el punto colgando al final del renglón.
9. Tableta (820): la nota quedaba apretada a ~300 px y el plato se partía en 4 renglones.
10. En la nota y el cierre, "(150 g)" se cortaba entre "150" y "g".

## Qué se arregló
1. La báscula arranca con el plato MEDIANO de barbacoa (150 g, $155, de su carta) si no hay nota guardada; al asomar, la aguja sube de 0 a 150 (0.7 s) y el platillo se asienta. Nota, mini barra, cierre ("TU PLATO YA ESTÁ EN LA NOTA") y WhatsApp quedan llenos desde el inicio. Con nota guardada se respeta lo guardado (incluido quitar el plato).
2. `30-horno` en celular: nueva foto `horno-m` (fb-06 980,1180,1876,1705: mandil, guante, pala y humo; sin cara, sin texto ni el trazo gráfico de abajo), velo en degradado sin cortes; el texto se lee sobre pizarra y se funde con la foto.
3. Dial: banda de oro de 124 a 175 g y tres topes gruesos; el tope elegido se pinta en rojo brasa.
4. Fachada: Real-ESRGAN x4 mezclado 50 % con LANCZOS y grano fino (`fachada-480/960/1400.webp`), marco recto con filete de oro a todo el ancho de la columna, placa debajo; en compu va bajo la foto del comedor.
5. Mini barra: solo aparece ya dentro de la báscula y se esconde mientras la nota y el botón verde están a la vista.
6. Mini barra en un renglón ("1 PIEZA · $155  VER NOTA"), con espacio para el flotante.
7. "HECHAS A MANO" en un renglón.
8. Pie: "Barbacoa y birria / Aguascalientes / EST. 1961" (oro).
9. Tableta: báscula y carta a dos columnas iguales.
10. Espacio duro en "150 g".

## Qué no se arregló
- Las fotos de Maps (hero maps-11, comedor maps-05) y la del horno se ven algo blandas a 2x: es el límite de las originales; se piden fotos propias en PENDIENTES.
- Las papeletas de reseñas en celular son carrusel horizontal (asoma la segunda): se dejó así.
- El mapa embebido depende de internet.
- En compu el hero deja aire bajo los botones antes de la arcada.

## Verificación
- krevo-shot m: alto 8,651 px, `alertas: []`. krevo-shot d: `alertas: []`.
- WhatsApp decodificado (estado inicial): `https://wa.me/524494731508?text=Hola, ¿me pueden preparar esto para llevar? 1 plato mediano de barbacoa (150 g). Total según su carta: $155.`
