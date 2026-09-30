# Corrección 1 · Épica (30 sep 2026)

Sobre `REVISION-1.md` (7.3/10) y las decisiones del orquestador. Flujo respetado: `python3 gen/sala.py` + `python3 build.py`; `index.html` no se tocó a mano. Respaldo previo en el scratchpad (`epica-fix/backup/`).

## Aplicado

1. **Funciones pasadas.**
   - Cartelera: título "Así se vivió / septiembre.". Cada tarjeta lleva `data-fechas`. `20-cartelera.js` compara contra la fecha real del visitante.
     - Si todas las fechas pasaron: sello de goma "YA SE PRESENTÓ" sobre el poster y sin link.
     - Si alguna sigue vigente: no hay sello, las fechas pasadas se tachan y vuelve "Apartar →", que elige en la sala el día y la fecha exacta de esa función.
   - Nota bajo el riel: "La cartelera de octubre se actualiza con el equipo de Épica.".
   - Sala: las 8 fichas de obras pasaron a la **programación semanal real** (MIÉ Stand-up · JUE Teatro experimental y arte urbano · VIE Teatro · SÁB Teatro · DOM Teatro infantil y música).
     - Cada ficha muestra la próxima fecha y "Pregunta el precio". El día de hoy solo cuenta antes de las 16:00, que es cuando abren.
     - Al elegir un día salen las 2 próximas fechas para escoger.
     - Nunca arma una fecha pasada: si `localStorage` trae una vieja, la recalcula.
   - No se inventó ningún título de obra de octubre.
2. **Cierre.** Se quitó el recuadro punteado. En su lugar hay un abanico de 3 posters reales (Mariquita, Off Shakespeare, La Pau Durán) montados a -4°, 2° y 6°, con el sello rojo "ELIGE TU FUNCIÓN" que baja a la sala. Cuando ya eligió, el sello dice la fecha y el tipo de función (p. ej. "MIÉ 7 OCT / Stand-up").
3. **Plano encendido** (`gen/sala.py`).
   - Mesas `#3a2a1c` con borde dorado sólido de 1.5.
   - Sillas crema con forma de silla de plano (asiento + respaldo), cada una girada hacia su mesa.
   - Leyenda "libre / tuya" y una sola pista "Toca una silla", que se apaga al primer toque.
   - Filas rehechas: 38 lugares en 5 filas (3, 4, 3, [4-2-4] y 4 mesas). El script comprueba que ninguna área de toque se encima con otra.
   - Área de toque de 44 px o más: el círculo mide r=22.5 y en celular el plano toma los márgenes laterales. Medido: 45.9 px a 375 y unos 47.7 px a 390.
4. **Detalles de estilo.**
   - Fraunces se carga con el eje WONK y va en `"WONK" 0` en `.ep-lead` y en las críticas: ya se lee "Marcela Morán y Arte Escénico El Ombligo".
   - Instagram con el glifo oficial (cuadro redondeado, círculo y punto).
   - "HOY EN ÉPICA" mira la hora: antes de las 16:00 "Abrimos a las 16:00"; de 16:00 a 23:59 "Abiertos hasta las 00:00" (mié a dom); lunes y martes "Descansamos, nos vemos el miércoles.".
   - Franja "Volvimos" en compu: el título queda centrado en vertical y ya no deja el hueco arriba a la izquierda.
   - Dorado fuera de los textos: el chip HOY pasa a papel crema girado como sello; los pasos, las fechas de las fichas, "Falta elegir…", los títulos del pie, los números de "Todo listo", el borde del pie y el foco pasan a crema o rojo. El dorado queda solo en los foquitos, las luces divisoras, las estrellas y el borde de las mesas (este último por decisión 3 del orquestador).
   - Poesía Eviterna: "Presentación de libro. Presenta Arlette Luévano." (cotejado con ig-11).
   - Telón: bambalina fija arriba, con pliegues horizontales y festón, visible bajo el header, y luz cálida en la abertura mientras se abre. Las palabras del hero caen desde 1,050 ms. Tomó menos de 30 min.
5. **Resto de la lista.**
   - Estado vacío: "Elige cuántos" y "ADMITE ___". Se usó la raya de formulario en vez de "—" porque krevo-shot marca el guion largo.
   - Precio del boleto: "Te lo confirmamos por WhatsApp", o "Pregunta el precio" cuando ya eligió.
   - Riel: "1 / 8" en Courier en celular, que se actualiza con el swipe, y posters alineados por abajo en compu.
   - "Todo listo / para completar." a dos tonos con punto; en compu va a 2 columnas (encabezado a la izquierda, lista a la derecha).
   - "Llamar 449 157 7858" (`tel:`) en el menú y en el pie.
   - Sin JS se esconde el WhatsApp flotante (`noscript`) para que no tape el CTA del hero.
   - Arreglo extra: una regla de `40-fenix.css` escondía TODAS las luces divisoras en compu. Ahora solo esconde las de Fénix; el cierre recupera su separación y el cartel de Allende sus luces.

## No aplicado (y por qué)

- **#5 Póster del cierre según la fecha:** ya no hay póster por función (decisión 2); el sello muestra el tipo de función y la fecha.
- **#3 parpadeo dorado de 3 sillas al entrar:** el orquestador pidió una sola pista ("Toca una silla"); otro efecto sería movimiento por ponerlo.
- **#9 link "Apartar para hoy →" en el hero:** el hero ya tiene "APARTAR LUGARES →"; un segundo link repetiría el CTA, y después de las 16:00 la ficha del día apunta a la semana siguiente, así que "hoy" mentiría.
- **Fleco dorado de la bambalina (#8):** va sin dorado porque la hoja lo limita a luces y estrellas; el festón es del mismo rojo, más oscuro.
- **Mensaje sugerido por el inspector ("¿Qué obra presentan?"):** se usó el formato del orquestador (`…para el stand-up del mié 7 oct. Lugares de referencia: … Nombre: …`).

## Verificación

- krevo-shot `m`: 8,469 px, **0 alertas** (sin scroll horizontal, 0 errores de consola, 0 recursos rotos, 0 invisibles). `d`: 6,973 px, **0 alertas**. Fuentes: Manrope, Fraunces y Courier Prime.
- Flujo con clics reales (375 px): MIÉ → C2, C3, C4 → "Ana". URL decodificada, idéntica en la sala y en el cierre:
  `https://wa.me/524491577858?text=Hola Épica, quiero apartar 3 lugares para el stand-up del mié 7 oct. Lugares de referencia: C2, C3, C4. Nombre: Ana`
  - `ep_boleto` = `{"dia":"mie","iso":"2026-10-07","seats":["C2","C3","C4"],"name":"Ana"}`.
  - Sello del cierre: "MIÉ 7 OCT / Stand-up".
- Simulación de una función vigente (La Herencia con una fecha del 15 oct): sin sello, la fecha del 24 sep tachada y "Apartar" que elige JUE 15 OCT. Pedir `setDia('mie','2026-09-23')` cae en el 7 oct.
- Capturas: `…/scratchpad/epica-fix/m/`, `…/d/`. Hojas de contacto: `msheet0.png`, `msheet1.png` y `dsheet0.png`, `dsheet1.png` en `…/scratchpad/epica-fix/`.
