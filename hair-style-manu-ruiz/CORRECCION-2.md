# CORRECCION-2 · hair-style-manu-ruiz · corrector (1 oct 2026)

Pasada corta: los 6 puntos del juez independiente (8.2). No hubo REVISION-2.md. Todo se arma con `python3 _work/mechones.py` (texturas), `python3 _work/gen.py` y `python3 build.py`. NO se corrió `_work/imgs2.py`. Nada de IA generativa.

## Cambios aplicados
1. **Carta de color, mechones** (`_work/mechones.py`, `_work/tones.json`, `_work/gen.py`, `site.css`): cada mechón ahora es una textura de ~470 hebras (`img/mechon-<slug>.webp`, 176x600 con alfa) con raíz más oscura, punta más clara y cálida, brillo cálido propio, sombra de volumen en los bordes y puntas desiguales. Ya no son barras planas con rayas. Paleta: los colores medidos se conservan en `tones.json` (`med`); se corrigió el matiz hacia el del cabello (salían grises/lilas por la luz blanca), se subió saturación y brillo. Se quitó la banda gris que dejaba el brillo de la versión anterior.
2. **Carta en celular** (`sections/20-carta.css/.js`, `gen.py`): UNA fila de nombres, derechos, sin sombra (la sombra y el giro pasaron a un envoltorio `.mr-sw` que solo lleva el mechón), centrados bajo cada mechón; en celular los mechones ya no se giran. Mechón de 58 px con 10 px de aire. Si un nombre no cabe completo en la tira (el asomo del swipe), se esconde: el asomo corta el mechón, nunca el texto. En compu (≥1100) el abanico conserva su giro y cada nombre se corre a la punta de su mechón.
3. **Ficha de cita, "1 · Tono"** (`sections/50-cita.css`, `gen.py`): cada mechoncito con su textura y su nombre abajo; el elegido con marco castaño de 2 px más filete interior y fondo papel.
4. **Retrato de Manu en celular** (`sections/30-manu.*`): recuadro con marco papel de 280 px (foto a 262 px), grapa espresso con remaches miel arriba, sombra suave, justo encima de la bio. `sizes` ajustado. En compu igual, hasta 400 px.
5. **Cierre en compu** (`sections/60-cierre.*`): dos columnas sin encimar. Título "Falta elegir / tu tono." (60 a 118 px), "Elegir en la carta" y el verde a la izquierda; foto Rubio miel 3:4 (máximo 520 px) a la derecha, sin velo, con su etiqueta "Rubio miel · De @manuruiz_asesor". Celular sin cambios (la etiqueta se oculta ahí).
6. **Remate del pie**: se quitó `tira-pie.webp`. Ahora es una fila de hebras SVG (`img/hebras-pie.svg`, generada en `gen.py`): ~300 hebras que cuelgan de una línea espresso, raíz oscura y puntas miel. De paso el crédito de KREVO quedó alineado con la columna en compu.

## No aplicado
- Nada de los 6 quedó fuera. El "junto a la bio" se resolvió apilado (recuadro arriba, bio abajo): a 390 px no caben lado a lado un retrato de 280 px y la bio a 25 px.

## Verificación (scratchpad `hair-style-manu-ruiz-corrector2/`)
- krevo-shot celular: 8,845 px, `alertas: []`; compu: 7,127 px, `alertas: []`. Sin errores de consola ni 404. Hojas: `hoja-m.jpg`, `hoja-d.jpg`. Revisado también a 360 y 820 px.
- Flujo: Cobrizo → "Quiero este tono" (header "Cobrizo") → Color → La próxima → Ana. URL decodificada: `https://wa.me/524492570525?text=Hola Visage, quiero cita con Manu Ruiz. Tono que me gustó: Cobrizo. Servicio: Color. Cuándo: La próxima semana. Mi nombre: Ana.`
