# Corrección 3 · Épica (30 sep 2026)

Sobre `REVISION-3.md` (8.4/10). Flujo respetado: `python3 gen/sala.py` y `python3 build.py` después de cada cambio; `index.html` no se tocó a mano. Respaldo previo: `…/scratchpad/r3fix-epica-teatro-cafe/backup/`. Sin imágenes nuevas, sin datos nuevos.

## Aplicado (los 5, en orden)

1. **La cartelera abre con "Esta semana".** Título "Cartelera / de la semana.". La primera tarjeta del riel es papel crema "Esta semana / en Épica." con 5 renglones Courier: la fecha real arriba (en rojo) y la función abajo, más "Apartar →". Fechas y orden los calcula `30-sala.js` con la misma regla que las fichas: hoy cuenta hasta las 20:30. A las 20:41 de hoy salen JUE 1, VIE 2, SÁB 3, DOM 4 y MIÉ 7. Cada renglón lleva `data-ep-dia` y `data-ep-iso` y baja a `#sala` con esa función ya elegida. La tarjeta ocupa todo el alto (poster + datos) y cierra con un talón "16:00 a 00:00 · Allende 333".
   - Septiembre va después, con una etiqueta vertical en Courier rojo "ASÍ SE VIVIÓ SEPTIEMBRE →" entre la tarjeta viva y el primer poster. En celular asoma en la primera vista, a la derecha de la tarjeta.
   - Se quitó la tarjeta de octubre del final, porque la viva la reemplaza. Siguen siendo 9 tarjetas y el contador "1 / 9" empieza en la viva. El contador ahora se calcula por la tarjeta más cercana, así la etiqueta no lo descuadra.
   - Distinto al juez: el renglón del jueves dice "Teatro experimental", como en su ejemplo. La sala y el cartel de Allende siguen con el nombre completo.
2. **"Volvimos." con la foto en marco.** La escena de Jean de Blues ya no va a sangre: está en el marco de la casa (crema de 6 px, esquina cortada, giro de -1.5°) a 300 px en celular, 440 px en 720 y 520 px a la derecha en compu. Lleva el pie Courier "Jean de Blues · septiembre 2026", igual que el hero. El título va debajo, sobre negro, sin el `margin-top: -84px`. En compu se quitó el degradado y el borde rectangular de `d-04`.
   - No se usó el poster completo `p-jean-20` como alternativa. Ya está en la cartelera y trae el teléfono 449 286 5967, que está sin confirmar (PENDIENTES). Enmarcada a 300 px, la escena usa unos 1.6 px de pantalla por px real, contra unos 3.6 de antes.
3. **Críticas en riel (celular).** Las 3 críticas van en un riel con `scroll-snap` al 86 % del ancho y asoma la siguiente. Cada tarjeta tiene filete rojo arriba y conserva las comillas rojas, las versalitas y las estrellas doradas. Abajo queda "4.6 en Google · 297 opiniones →". La bio pasó a 1 solo párrafo: la primera frase en crema seminegrita y el resto en gris.
   - En compu la columna izquierda se ve como antes (frase en itálica Fraunces y el resto debajo). Las críticas en lista no cambiaron.
   - Distinto: en celular el párrafo mide 5 renglones, no 3. Para bajarlo a 3 había que quitar un dato cotejado ("Sala de 38 a 80 lugares" o "Grotowski"), y se prefirió no tocarlo. El tramo sin imagen bajó de unas 1.5 pantallas a menos de media.
4. **Fichas de la sala como talones (celular).** Las 5 van en una tira horizontal con `scroll-snap`, de 92 px de alto como mínimo y 128 a 204 px de ancho. Llevan la fecha en rojo arriba y el nombre en Fraunces 18 px. La elegida va con fondo rojo.
   - El aviso de HOY sale como renglón aparte ("Hoy: pregúntanos si aún quedan lugares.") para que los talones no crezcan. Se armó en `gen/sala.py`.
   - Si la función llega desde la cartelera, la tira se recorre sola hasta el talón elegido, sin mover la página.
   - Se arreglaron 2 detalles que salieron al probar: el navegador se quedaba pegado al último talón después de ordenar, y la rejilla se ensanchaba con la tira.
   - El plano ya aparece en la primera pantalla de la sección. La sala bajó de 1,700 a 1,537 px. Para llegar a 1,350 habría que achicar el plano o el boleto, que el juez pide no tocar.
   - En 720 o más quedan las fichas en rejilla, como estaban.
5. **Menos negro muerto (celular).** `--sec-y` pasó a 52 px debajo de 720 y se recortaron los rellenos de cartelera, sala, Fénix, Allende y cierre. Los huecos medidos a 390 quedaron así:
   - Del CTA del hero a "Cartelera": 74 px.
   - De la nota bajo "1 / 9" a "Aparta tu lugar.": 78 px.
   - De "297 opiniones" a "Allende 333": 76 px.
   - De la dirección a "¿Cuál función…": 76 px.
   - Del boleto a la foto de Fénix: 76 px.
   - Antes medían entre 125 y 130 px.

## No tocado
El telón, la marquesina y los foquitos, el hero, el plano y el boleto, el cartel de taquilla, el mapa, el cierre en dos estados, la bambalina, "Todo listo" y la disciplina de color. Siguen 5 wa.me, máximo 1 verde por sección, y en las secciones nuevas no hay verde. No se cambió ningún precio, horario, reseña ni teléfono.

## Verificación
- krevo-shot `m`: **7,146 px** (antes 8,004), 0 alertas, 5 wa.me, Manrope, Fraunces y Courier Prime. krevo-shot `d`: 6,739 px, 0 alertas.
- Flujo a 390: renglón "VIE 2" de la tarjeta viva → sala con VIE elegido → C2, C3, C4 → nombre "Ana". La URL decodificada es idéntica en la sala y el cierre: `https://wa.me/524491577858?text=Hola Épica, quiero apartar 3 lugares para el teatro del vie 2 oct. Lugares de referencia: C2, C3, C4. Nombre: Ana`. El renglón "DOM 4" deja elegido el domingo y recorre la tira hasta su talón.
- La tarjeta viva se revisó a 360, 390, 820 y 1440 sin encimes. A 820 el riel, la sala y Fénix se ven bien (`hoja-820.jpg`).
- Hojas en `…/scratchpad/r3fix-epica-teatro-cafe/`: `hoja-celular.jpg`, `hoja-compu.jpg`, `hoja-820.jpg` y `s/kcards.jpg`.
