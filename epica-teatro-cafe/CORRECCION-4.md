# Corrección 4 · Épica (30 sep 2026)

Última pasada puntual sobre los 3 problemas del juez y las indicaciones del orquestador. Flujo respetado: `python3 gen/escenas.py`, `python3 gen/sala.py` y `python3 build.py` después de cada cambio; `index.html` no se tocó a mano. Respaldo previo: `…/scratchpad/r4fix-epica-teatro-cafe/backup/`. Sin imágenes nuevas, sin IA, sin datos nuevos: todo precio sale de `research/hechos.md`.

## 1. La cartelera ya no abre con funciones pasadas
- El título de la sección ahora es **"Esta semana / en Épica."** y abajo va el programa vivo, en papel crema: JUE 1, VIE 2, SÁB 3, DOM 4 y MIÉ 7, con la fecha real que calcula `30-sala.js`. Cada renglón lleva **"Apartar →"** y baja a la sala con esa función elegida.
- Cada renglón trae el precio de referencia de los carteles de septiembre:
  - jue, vie y sáb: "En sep: $250 con 1 bebida".
  - dom: "En sep: niños $50 · adultos $100".
  - mié: "Precio por WhatsApp", porque el stand-up no tiene precio publicado.
- El boleto de la sala ya no dice solo "te lo confirmamos". Al elegir día muestra la misma referencia más "Se confirma por WhatsApp". El mensaje de WhatsApp no cambió.
- Los 8 carteles van abajo, bajo su propio rótulo Courier **"ASÍ SE VIVIÓ SEPTIEMBRE"**, más chicos: 42 % del ancho en celular (2 a la vista) y 5 por fila en compu.
  - Se quitaron el sello rojo "YA SE PRESENTÓ" y las fechas tachadas: el rótulo ya lo dice.
  - El contador quedó en "1 / 8", con la nota "Carteles de su Instagram, del 18 al 27 de septiembre…".
- Al lado del programa (debajo en celular) va **"En la mesa, / antes del telón."** con "Espresso Grotowski" y "Platillos con nombre de autores y personajes", los dos con "Pregunta el precio", más "Mesas con nombre de obra y meseros que son actores". Así la comida y el café ya se ven en la página, sin inventar precios.
- Sin verde en la cartelera.

## 2. Hero sin caras de plástico
- `gen/escenas.py` mezcla 45 % del x4 de Real-ESRGAN con 55 % del poster original subido con LANCZOS, y le pone grano fino. Las caras ya no se ven enceradas.
- La escena ya no va a sangre en celular (era un recorte de 437 px a unas 3 veces su tamaño). Ahora va en el marco de la casa: crema de 6 px, esquina cortada y giro de -1.5°. Mide 354 px a 390 (unas 1.6 veces su tamaño real), con el pie "Off Shakespeare · septiembre 2026" debajo. En compu no cambió.
- En celular el hero ya no ocupa el 100 % del alto de pantalla: mide lo que su contenido, y "Esta semana / en Épica." asoma al pie de la primera pantalla.
- **No arreglado:** no hay fotos de comida, café, sala ni fachada en `research/`, y no se puede usar IA ni stock. Sigue en PENDIENTES y en "Todo listo para completar".

## 3. Compu sin huecos ni vuelta repetida
- `--sec-y` pasó de 104 a 66 px desde 720. Huecos medidos a 1440 entre secciones: unos 120 px (antes unos 200).
  - Cartelera → sala: 122 px.
  - Sala → Fénix: 124 px.
  - Fénix → Allende: 118 px.
  - Allende → cierre: 132 px.
- En el cierre se quitaron el abanico de posters y "ELIGE TU FUNCIÓN". Queda un solo remate, en 2 estados:
  - Sin función: **"¿Vienes / esta semana?"**, una línea y el botón verde con el mensaje general.
  - Con función: "Tu boleto / ya casi está.", el boleto y el botón verde, con el mismo mensaje que la sala.
  - En compu va en una sola fila: el título a la izquierda y el botón a la derecha.

## Verificación
- krevo-shot `m`: **7,571 px**, 0 alertas, 5 wa.me, Manrope, Fraunces y Courier Prime. krevo-shot `d`: 6,473 px, 0 alertas.
- Flujo a 390: renglón VIE de "Esta semana" → sala con VIE 2 OCT → C2, C3, C4 → "Ana". La URL decodificada es idéntica en la sala y el cierre: `https://wa.me/524491577858?text=Hola Épica, quiero apartar 3 lugares para el teatro del vie 2 oct. Lugares de referencia: C2, C3, C4. Nombre: Ana`.
- Verde: 1 en la sala y 1 en el cierre, 0 en las demás secciones. Sin guiones largos y sin scroll horizontal.
- 820 revisado (`hoja-820.jpg`): programa y carta en 2 columnas sin encimes.
- Hojas en `…/scratchpad/r4fix-epica-teatro-cafe/`: `hoja-celular.jpg`, `hoja-compu.jpg`, `hoja-820.jpg`, `zhero.png` (caras del hero a 390 @2x).
