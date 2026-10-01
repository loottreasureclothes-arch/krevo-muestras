# Forza Fitness Club · Corrección 2 (30 sep 2026)

Se aplicaron los 12 cambios de REVISION-2 en orden, editando solo `sections/`, `template.html`, `site.css`, `img/` e `IMAGENES.md`, y armando con `python3 build.py` (index.html no se tocó a mano). Respaldo de lo anterior y scripts en `scratchpad/r2fix-forza-fitness/` (`backup/`, `grade.py`, `imgs2.py`).

## Aplicado
1. **Serie de marca B/N con el rojo de verdad** (PIL + OpenCV, Real-ESRGAN x4 en los recortes chicos): hero, hero-m, rack, rack-m, pasillo, funcional y la tira nueva `fierro-*`. Curva en S, grano 3.2 % y rojo conservado solo en mancuernas, columnas del rack, letras, barra y barandal del pasillo, y la palabra FORZA de la caja. Cambio contra la regla de la revisión: la regla al pie de la letra (tono ≤ 6°, G < 0.35·R) apagaba también las mancuernas (tono ~7°, G/R ~0.47) y las letras del pasillo (G/R ~0.6). Por eso la regla se ajustó por foto y en maps-01 se limita a lo que está debajo de y = 1050. Así la lona coral, el cartel de frutas y el short rojo de un socio quedan grises. Un trapo rojo del piso se excluye a mano. El rojo se detecta antes de aclarar la foto, porque si no se vuelve rosa. Verificado a ojo: las mancuernas siguen rojas y el coral queda gris. La zona funcional no tiene rojo de marca, así que queda toda gris.
2. **Hero:**
   - El casillero #605 ahora es una tira de un renglón: punto en vivo + "COLOSIO 605 · Lun a vie 5:00 am a 10:00 pm".
   - Celular y tableta: foto nueva de maps-01 (x 170 a 1166, y 453 a 1536) en flujo bajo el header, con las letras FORZA arriba y las hileras de mancuernas rojas arriba del título, fuera del velo.
   - Compu: velo .62/.55 en el primer 40 %, con la lona ya gris de fondo. `object-position` no movía nada porque la caja y la foto miden 4:3 las dos, así que la foto sube 80 px. Ahora las letras FORZA quedan arriba de "SIN EXCUSAS." y no debajo.
3. **Rayo:**
   - Mientras carga, contorno rojo .5. Lleno, sin contorno.
   - Relleno en degradado #ff2b2b → #e20a14 → #b1241a.
   - Destello único de 250 ms (brillo 1.4 → 1) al llenarse.
   - Titular en opacidad 0 hasta que se llena. Luego entra palabra por palabra, como los demás.
   - Blindaje: si el titular lleva 0.9 s a la vista sin que el rayo se llene, entra igual (así no hay alerta INVISIBLES).
4. **Pasillo:**
   - Recorte sin la flama de arriba (y desde 520), 4:5 y con Real-ESRGAN.
   - Va en un casillero con marco "#605 · Adentro", en paralelogramo, al 70 % del ancho en celular. A un lado, "ALWAYS FORZA" (su lema) en contorno rojo vertical.
   - En compu, 4:5 en la columna izquierda. Ya no va a sangre.
5. **Cierre y pie:**
   - Tira inclinada de 180 px (210 en compu) con las hileras de mancuernas arriba del casillero "Tu casillero".
   - Pie con "ALWAYS FORZA" de borde a borde: Barlow Condensed 800 itálica, trazo rojo sin relleno. Medido de 18 a 372 px en un ancho de 390, sin scroll horizontal.
6. **Flotante:** `data-hide-wa` en el casillero de horario de Colosio y en la lista de reseñas.
7. **Números de casillero en planes:** se agregó `.fz-plan > .fz-num, .fz-plan > .fz-vent { grid-column: auto }`. Medido: #014, #021, #033, #001 y #605 quedan todos a 17 px del borde exterior (16 px + el borde).
8. **Letra en compu (≥1024):**
   - Lead de planes 18 px y subtítulos de plan 17 px.
   - Precio 44 px.
   - Reseñas a 20 px, con notas más grandes y giro de ±1.5° alternado.
   - Celdas del tablero de 64 px de alto, con el nombre en 2 renglones a 15 px.
   - Pies y etiquetas de 14 a 16 px.
9. **Cortes:**
   - En la ficha, el estado va en 2 renglones limpios ("ABIERTO AHORA" y abajo "CIERRA A LAS 10:00 PM"), sin punto colgado. La hora va con nowrap.
   - High School: "3x4 meses" en su propio renglón.
   - Botón verde del cierre en un renglón alineado a la izquierda: "Pedir por WhatsApp" abajo de 400 px y el texto largo desde 400 px, con aria-label completo.
   - "Aún no eliges clase." ahora es el chip "CLASE: SIN ELEGIR" en el pie del tablero. Al elegir dice "CLASE: CROSSFIT MIÉ 6:00 PM" con borde rojo.
10. **Título de planes:** "Elige tu / casillero."
11. **Hover en compu:** la tarjeta de plan sube 2 px con borde rojo, la nota de reseña se endereza a 0° y sube, y la celda del tablero pasa a grafito más claro (#4a4d50). Todo dentro de `@media (hover: hover)`.
12. **Zona funcional:** la foto toma el alto de la lista "Y además" y queda alineada arriba. En compu mide entre 300 y 340 px de ancho.

Además:
- En el cierre, la clase elegida se reparte en 2 renglones parejos (text-wrap: balance), así "Sánchez" ya no queda solo.
- La "L" de ALWAYS va con el espacio ajustado.

## No aplicado o distinto
- Regla de color literal del cambio 1: se ajustó, por lo explicado arriba. Si se aplicaba al pie de la letra, el rojo de las mancuernas se perdía.
- `object-position: 60% 30%` en el hero de compu: no sirve con 4:3 contra 4:3. Se usó el desplazamiento de 80 px.
- Titular del rayo "solo al llenarse": se agregó la entrada forzada a los 0.9 s a la vista, para no dejar un bloque invisible.
- No se tocó: el tablero de CrossFit ni sus datos, el header, la paleta, las fuentes, las 3 reseñas (orden y texto), el arte Reloaded, ningún dato (precios, horarios, teléfono, reseñas), "Todo listo para completar" ni og.jpg.
- Pendiente menor que se vio y no se tocó: en celular, el flotante de WhatsApp tapa un momento el botón "Elegir" de High School al pasar por planes. La revisión no lo pedía, y esconder el flotante en toda la tienda le quita presencia.

## Verificación
- krevo-shot `m`: alto 8,157 px (tope 9,000), 4 verdes, sin alertas.
- krevo-shot `d`: alto 7,449 px, sin alertas.
- 820 px: 7,865 px, sin scroll horizontal.
- Flujo (Plan Gold + CrossFit mié 6:00 pm), igual en el flotante, `#fz-send` y `#fz-send2`:
  `https://wa.me/524491538877?text=Hola Forza Fitness Club, quiero pedir mi inscripción. Me interesa el Plan Gold (desde $999.90 al mes). Clase: CrossFit mié 6:00 pm con Diego Sánchez.`
- Hojas: `scratchpad/r2fix-forza-fitness/fin/sheet-m-0..2.png`, `fin/sheet-d-0..3.png`, `t/sheet-0..1.png` (820), `bolt-m-sheet.png` (rayo a la mitad y lleno), `f-sheet.png` (flujo, cierre y pie), `sheet-imgs-a2.png` y `sheet-imgs-b2.png` (la serie de fotos).
