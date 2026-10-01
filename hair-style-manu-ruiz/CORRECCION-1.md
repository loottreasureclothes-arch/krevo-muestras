# CORRECCION-1 · hair-style-manu-ruiz · corrector (1 oct 2026)

Base: REVISION-1.md (7.5) + decisiones del orquestador (mandan). Todo se arma con `python3 _work/gen.py` (carta, ficha y balayage) y `python3 build.py`. Fotos nuevas con `python3 _work/imgs3.py`. Nada de IA generativa; las `ig-*` no se tocaron.

## Cambios aplicados (los 15 de la revisión + las 8 decisiones)
1. **Balayage (momento firma)** `_work/gen.py`, `_work/40-opiniones.src.html`, `sections/40-opiniones.css/.js`.
   - Campo propio `.mr-bal-field` de max(560px, 72svh) en celular (608 px a 390x844) y 560 a 760 px en compu. El 5.0 va arriba, sobre la raíz oscura; **las tres opiniones van DEBAJO del campo**, ya no lo tapan.
   - Se lee como cabello: 96 hebras de base castaña (no se aclaran, como la base de un balayage real) + 155 hebras en **14 mechones** (3 gruesas de 2.4 a 4 px al centro + 7 a 9 finas alrededor) que siguen una **onda larga compartida** y se juntan y se separan a lo largo del largo; puntas a distintas alturas; 20 brillos con un degradado fijo; algunas finas toman el degradado del mechón vecino para que no queden franjas. **Un degradado por mechón** (14), cada uno con su desfase.
   - **Termina sí o sí:** 1.6 s después de asomarse el campo, se completa en 600 ms (ease-out) aunque la visitante esté quieta a media banda (probado: quieta en 55 % → a los 2.7 s está en 100 %). Si el navegador no da cuadros, un respaldo a los 760 ms lo deja terminado. Después, si regresa hacia arriba, se oscurece siguiendo el scroll y al volver a bajar se aclara con el scroll; al salir el campo de la pantalla se re-arma. Reduced-motion: terminado.
   - En compu el mismo dibujo se repite espejado con `<use>` (2 copias de 760 a 1179 px, 3 desde 1180) para que tenga la misma densidad que en celular y no se vea como fideos estirados.
   - **5.0** a `clamp(150px,42vw,240px)` en celular (164 px) y hasta 280 px en compu, con "28 opiniones de Visage Beauty Salon en Google" debajo.
2. **Retrato** `_work/imgs3.py`, `sections/30-manu.*`: recortado de nuevo en horizontal 4:3 (x 0-1570, y 0-1180) completo, con su melena de puntas claras y aire de pared, sin la cabeza de la clienta. Mezcla 50 % Real-ESRGAN con el **cuadro original real del video** (lo localicé con OpenCV: TikTok 7572610379650501906, cuadro 4800, coincidencia 0.999) subido con LANCZOS, más grano fino. Celular a todo el ancho sin `object-position` que corte (358x269); compu máximo 400 px. Etiqueta de muestra "Manu Ruiz".
3. **Mechones** `_work/gen.py`, `_work/measure2.py`, `site.css`, `sections/20-carta.css`: 4.º color "luz de punta" medido (percentil 80-90 de luminancia de la punta; el Rubio dorado ahora termina en #C69F7E en lugar de café) + brillo diagonal al 29 % del alto. En celular se enciman 6 px con giro alterno de ±3° como muestrario; en compu (≥1100 px) abanico abierto encimado con giro de -8.8° a 8.8°. **Nombre de cada tono** bajo su punta en Albert Sans de 10/11 px, en dos alturas alternas para que no choquen; el elegido sale en cobrizo. De 760 a 1099 px se queda la tira con swipe (el abanico no cabía con nombres).
4. **La carta arranca en Caramelo** (`20-carta.js`, `fetchpriority="high"` en su foto) y en celular la tira arranca con Caramelo al centro (solo mueve la tira). El hero se queda con el Rubio dorado.
5. **Título y créditos** (decisión 1): "Elige tu tono. / *Trabajos reales del salón.*" (pasado también a `_work/20-carta.src.html` para que el generador no lo pise). Créditos `.mr-tag-cr`: 6 "De @manuruiz_asesor", Cobrizo "Visage con Manu" (conserva «colores más otoñales»), Castaño cobrizo y Castaño ceniza "Del Instagram de @visagesalon_ags". Se quedan las 9.
6. **"Toca un mechón para ver su foto."** arriba de la tira, bajo el título, con filete miel.
7. **Hueco en la columna de Manu** (≥760): la columna izquierda es un solo bloque (`.mr-manu-side`: retrato, bio, 10.2 mil y redes) y en compu va `sticky`, así "10.2 mil" queda pegado bajo la bio y el retrato acompaña la lista.
8. **Cierre en compu**: "Todo listo para completar" en su propia banda (título a la izquierda, lista en 2 columnas) y DESPUÉS el remate: foto de rubio miel 3:4 de 520 px al centro con velo crema abajo y "Falta elegir / *tu tono.*" de 72 a 128 px **encimado** sobre la foto, con el verde debajo. Celular sin cambios.
9. **Ícono de Instagram**: glifo oficial redibujado limpio (cuadro redondeado + círculo + punto) en `template.html`; se ve bien en Manu, menú y pie.
10. **Foto del salón** en "Dónde": a todo el ancho de la columna (358x298 en celular, 6:5), recorte nuevo con el espejo de focos completo, el tocador y la planta, etiqueta "En el salón", sin lazy.
11. **"Corte y color"**: quitado el pie "CORTE Y COLOR"; fotos del bob y del recogido a 128x171 también en celular.
12. **Fuente sin brinco**: Instrument Serif se pide aparte con `display=block` (Albert Sans sigue con `swap`).
13. **Ficha de cita más propia**: la vista previa del mensaje es una etiqueta de muestra con grapa espresso y remaches miel (adiós barra lateral), y las fichas de servicio y cuándo llevan la grapa completa arriba (se vuelve miel al elegir).
14. "Todo listo para completar" suma "Qué fotos de la carta son trabajos de Manu" (revisión f). PENDIENTES.md e IMAGENES.md actualizados.

## No aplicado y por qué
- **Tira del pie (`tira-pie.webp`) ligeramente blanda a 1440**: no la toqué; es la textura de cierre y está en "qué no tocar". Menor.
- **og:image**: no cambió (sigue siendo el Rubio dorado del hero).
- **Header "Tu tono"**, hero de celular, mecánica de la carta, mensaje de WhatsApp, horario en vivo, mapa y cierre de celular: intactos por la lista de "qué no tocar" (solo se agregó `--l` a los mini mechones de ficha y cierre; el del header no se tocó).
- Gestos en teléfono físico y og en el depurador de Facebook: no verificables aquí.

## Verificación (capturas en el scratchpad `manu-fix/`)
- krevo-shot celular: **8,843 px**, 0 alertas; compu: 7,127 px, 0 alertas. Sin errores de consola, sin 404, sin scroll horizontal, 0 bloques invisibles al volver arriba. Fuentes solo Albert Sans + Instrument Serif. 5 WhatsApp reales.
- Flujo con toques reales: Caramelo de arranque → toco Cobrizo (crédito "Visage con Manu") → "Quiero este tono" (header "Cobrizo", `mr_tono=cobrizo`, cita a 59 px) → Color → La próxima → Ana. URL decodificada: `https://wa.me/524492570525?text=Hola Visage, quiero cita con Manu Ruiz. Tono que me gustó: Cobrizo. Servicio: Color. Cuándo: La próxima semana. Mi nombre: Ana.` (igual en el cierre; flotante: "...vi la página de Manu Ruiz y quiero una cita. Tono que me gustó: Cobrizo.").
- Huecos de más de 90 px: solo paddings entre secciones (≤125 px); el de 290 px de la columna de Manu ya no existe.
