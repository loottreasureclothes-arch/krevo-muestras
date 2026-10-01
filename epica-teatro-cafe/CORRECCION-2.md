# Corrección 2 · Épica (30 sep 2026)

Sobre `REVISION-2.md` (7.6/10) y las 7 decisiones del orquestador. Flujo respetado: `python3 gen/escenas.py` (nuevo), `python3 gen/sala.py` y `python3 build.py`; `index.html` no se tocó a mano. Respaldo previo: `…/scratchpad/r2fix-epica-teatro-cafe/backup/`.

## Aplicado (los 12, en orden)

1. **Hero con escena real.** `gen/escenas.py` recorta la escena de Off Shakespeare (ig-10 x4: dos actores, mesita, maleta roja) sin "$250" ni teléfonos; el "19 de Sep" que quedaba en la esquina se borró con `cv2.inpaint` (relleno local del telón, sin IA). `img/escena-off-shakespeare-{800,1280,1750}.webp`.
   - Celular: la escena llena el 60 % de arriba, degradado solo hacia el negro de abajo; el título cae sobre negro. Pie "Off Shakespeare · septiembre 2026" en Courier crema al 60 %.
   - Compu (900+): escena a la derecha (50 %, máx. 700 px) en marco crema de 6 px con esquina cortada, girada 1.5°; detrás asoman 3 posters chicos al 25 % recortados a su parte de arriba. En el hero ya no se lee ningún teléfono.
   - El telón y la bambalina no se tocaron.
2. **"Volvimos." con la luz del escenario.** Recorte de Jean de Blues (cenital azul + foco rojo, sin letras) `img/escena-jean-*.webp`, `brightness(.8)`, sin velo rojo. Celular: foto a sangre arriba y el título cae sobre el negro. Compu: foto a la derecha (62 %) y el título a la izquierda sobre negro.
3. **Cierre en dos estados reales.**
   - Sin función: "¿Cuál función / te toca?" y solo el abanico con el sello "ELIGE TU FUNCIÓN" (link a la sala). Se fueron el boleto vacío, "Falta elegir función." y "Elegir función →".
   - Con función: "Tu boleto / ya casi está.", boleto lleno y UN botón verde (mismo mensaje que la sala). Sin lugares, el renglón dice "Te los confirmamos por WhatsApp" en vez de otro llamado.
   - El abanico cambia por día: VIE/SÁB → Off Shakespeare 26, La Herencia, Gigoló 25; DOM → Mariquita, La Pau Durán, Jean 27; MIÉ/JUE → el mixto. Posters a 4:5 para que el abanico quede parejo.
4. **Marquesina y pie.** Los foquitos se van prendiendo al bajar (arriba del todo siguen todos prendidos por la secuencia de entrada) y al llegar al pie quedan completos con un brillo más fuerte. Pie: bambalina fija de 48 px (56 en compu) con festón, logo centrado, "COMIDA + TEATRO + CAFÉ" y la línea "MIÉ A DOM · 16:00 A 00:00 · ALLENDE 333"; luego 3 columnas: Contacto · Dónde (dirección + Cómo llegar) · Síguelos.
5. **Fichas de la sala.** Orden cronológico real desde hoy (hoy a las 20:12: HOY · MIÉ 30 SEP · JUE 1 · VIE 2 · SÁB 3 · DOM 4), todas alineadas arriba con el mismo alto mínimo, fecha en rojo y nombre en Fraunces 22 px. "Pregunta el precio" sale una sola vez como nota: "Precio y hora de cada función: te los confirmamos por WhatsApp.". El precio del boleto dice siempre "Te lo confirmamos por WhatsApp".
6. **Tipografía.** Títulos con `"WONK" 0` y sin ligados/swash (`liga`, `dlig`, `hlig`, `swsh`, `salt` en 0). Primera línea de Fénix en `"opsz" 60` (el 4 de "24"/"2024" ya no se ve roto). Extra: a `opsz 144` la f de Fraunces se pegaba a la letra de al lado ("Off" se leía "Ofi", "función" también), así que las tarjetas de la cartelera y "¿Cuál función" van en `opsz 72`. Verificado a 2x: `scratchpad/r2fix-epica-teatro-cafe/tipo-sheet.png` y `tipo-sheet2.png`.
7. **Plano de teatro.** `gen/sala.py`: 5 filas en arcos concéntricos (centro arriba del escenario), mesas alineadas con el arco, sillas tipo butaca (asiento + respaldo y brazos curvos, más chicas que la mesa) giradas hacia su mesa, luz cálida difuminada del escenario sobre las 2 primeras filas, anillo rojo en la mesa al elegir. Sigue con 38 lugares, áreas de toque de 47.7 px a 390 sin encimarse (el script lo comprueba). Plano a 600 px en 720-1023 y 620 px en 1440.
8. **Cartelera.** El sello "YA SE PRESENTÓ" salió del arte: va chico junto a las fechas, que ahora se tachan. Novena tarjeta en papel crema: "Octubre / se aparta en la sala." con los días y "Apartar →" a la sala (contador "1 / 9"). En compu caben 3 tarjetas completas y la cuarta asoma (~30 %); en 820, 2 completas y la tercera asoma.
9. **Mapa a tono.** `grayscale(1) invert(.92) contrast(.9) brightness(.95)` dentro del marco crema y pin propio rojo con "Épica" al centro (`pointer-events: none`). Los negocios ajenos quedan en gris.
10. **Allende sin repetir.** La programación pasó a cartel de taquilla compacto: papel crema girado 1°, Courier, cabeza "MIÉRCOLES A DOMINGO · 16:00 A 00:00" y 5 renglones de 28 px.
11. **820 diseñada.** Sala: fichas en 3 columnas, plano grande al centro y boleto centrado (máx. 560). Cierre: abanico y boleto centrados uno sobre otro. Hero y Fénix con foto a lo ancho. 1024+: sala en 2 columnas (plano pegajoso a la derecha).
12. **HOY en la sala.** La ficha del día dice "HOY" y se puede apartar mientras no empiece la función: mié a dom antes de las 20:30 (decisión 5 del orquestador, en vez de las 21:00 del inspector). Bajo la ficha: "Pregúntanos si aún quedan lugares.". Después de las 20:30 salta a la semana siguiente. El header muestra "HOY: Stand-up" cuando eligen hoy.

## No aplicado / distinto (y por qué)

- **Corte de las 21:00:** se usó 20:30, que es la regla del orquestador.
- **Línea del hero después de las 20:30:** sigue "Stand-up. Abiertos hasta las 00:00." porque es verdad; no se puso "función en curso" porque no sabemos la hora de inicio.
- **Mapa:** el embed de Google no deja quitar los negocios ajenos; quedan en gris y el pin propio manda.
- **Fotos:** siguen saliendo de posters (dos recortes de escena reales). Para pasar de unos 8.8 hacen falta las fotos del dueño (renglón 04 de "Todo listo" y `PENDIENTES.md`).

## Verificación

- krevo-shot `m`: **7,969 px**, 0 alertas, 5 wa.me, fuentes Manrope, Fraunces y Courier Prime. `d`: 6,895 px, 0 alertas.
- Flujo (390, clics reales; VIE → C2, C3, C4 → "Ana"), URL decodificada idéntica en la sala y el cierre:
  `https://wa.me/524491577858?text=Hola Épica, quiero apartar 3 lugares para el teatro del vie 2 oct. Lugares de referencia: C2, C3, C4. Nombre: Ana`
  - Cierre: "Tu boleto ya casi está.", abanico off-shakespeare-26, herencia, gigolo-25; sello "VIE 2 OCT / Teatro".
- Hoy con reloj simulado: mié 19:00 → `…para el stand-up de hoy mié 30 sep…` y header "HOY: Stand-up". Mié 20:45 → fichas empiezan en JUE 1 OCT y el mensaje va al mié 7 oct. Dom 4 oct 12:00 → `…teatro infantil y música de hoy dom 4 oct…` y abanico de domingo.
- Hojas: `…/scratchpad/r2fix-epica-teatro-cafe/msheet0.png`, `msheet1.png` (celular), `dsheet0.png`, `dsheet1.png` (1440), `w820-sheet.png` (820), `flow-sheet.png`, `misc-sheet.png`, `tipo-sheet.png`.
