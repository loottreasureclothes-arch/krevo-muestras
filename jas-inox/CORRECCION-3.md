# JAS INOX · Corrección 3 (30 sep 2026)

Apliqué los 5 cambios de REVISION-3.md, en orden. `index.html` sale de `python3 build.py`. Las fotos nuevas salen de `python3 gen/fix_assets.py r3`: recorte con PIL, cv2.inpaint y Real-ESRGAN x4 (`-s 4`), bajadas con PIL. No usé IA generativa, fotos de stock ni datos nuevos. No toqué precios, horarios, teléfonos, reseñas ni requisitos.

## Resultado

| Medida | Antes | Ahora |
|---|---|---|
| Alto en celular (390) | 8,389 px | **8,356 px** (tope 9,000) |
| Alto en compu (1440) | 7,232 px | 7,678 px (el catálogo pasa a 3 columnas) |
| Alto a 820 px | 8,209 px | 8,329 px, sin scroll horizontal |
| Alertas del report (`m` y `d`) | 0 | **0**: sin scroll horizontal, consola, 404, botones chicos, guiones largos ni emojis |

- **Fuentes:** Anton, IBM Plex Sans e IBM Plex Mono.
- **WhatsApp:** 6 `<a href="https://wa.me/...">` reales y 2 `tel:`. Verdes por sección: cotizador 1 y cierre 1, más el flotante. La banda, la ruta y el catálogo siguen en 0.
- **Flujo probado por CDP (1440):**
  - Al abrir: `https://wa.me/524494415822?text=Hola JAS INOX, quiero cotizar: Mesa de trabajo de 180 x 70 x 90 cm (largo, ancho y alto).`
  - Después de tocar "Cotizar redilas" en la banda, el cotizador y el cierre mandan: `...quiero cotizar: Redilas para pickup de 180 x 70 x 90 cm (largo, ancho y alto).`

**Capturas:** `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/r3fix-jas-inox/`
- Hojas de contacto: `m-contact.jpg`, `d-contact.jpg` y `w820-sheet.jpg`.
- Carpetas `m/` y `d/`, cada una con su `report.json`.
- `med-check.png`: el cotizador en celular con "03 Opciones" a la vista.

## Cambios aplicados

1. **Banda en compu sin media pantalla vacía** (`25-banda.html`, `25-banda.css`, `20-catalogo.js`, `gen/fix_assets.py`).
   - `.banda` va con `align-items: center`.
   - La columna izquierda lleva el título, una pareja 4:5 de unos 210 px cada una y el link con flecha "Cotizar redilas".
   - La pareja va escalonada: FIG. 02b (de atrás) arriba a la derecha y FIG. 02c (de lado) abajo a la izquierda. Usa el mismo marco con corte y la misma etiqueta FIG.
   - El link lleva `data-tipo="otro" data-otro="Redilas para pickup"`. Como la banda está fuera de `#catalogo`, en `20-catalogo.js` le agregué a la banda el mismo manejador de clic. Preselecciona igual que REF. 06.
   - **En celular no cambia nada:** la pareja y el link llevan `display: none` y `loading="lazy"`, así que el celular no los descarga.
2. **FIG. 05 que se entienda** (`40-ruta.html`, `gen/fix_assets.py`). `carga2` se cambió por `carga3`: el panel inferior izquierdo de ig-05, con los dos muebles emplayados y su forma a la vista.
   - El recorte arranca debajo de la etiqueta "JAS INOX".
   - La marca "JAS" del emplaye se quitó con inpaint.
   - Pie: "FIG. 05 · Ags. · Listas para salir".
   - El alt ya no dice que entra a un tráiler.
3. **Ruta en compu sin escalón** (`40-ruta.css`).
   - La pareja va lado a lado (`1fr 1fr`, unos 228 px cada una), sin `width: 64%` y sin `justify-self: end`.
   - `.ruta-side` va con `align-content: end`, así que la pareja y `.ruta-foot` quedan alineadas con el borde de abajo del mapa.
   - Las etiquetas FIG. de la pareja van a 9.5 px para que "Listas para salir" no se corte.
4. **REF. 04 sin la mancha del piso** (`20-catalogo.html`, `gen/fix_assets.py`). Con `object-position: 50% 20%` el piso seguía asomando, porque en una tarjeta cuadrada la foto casi no tiene recorrido vertical. Por eso usé el plan B del juez: `tarja-top`, con el 75 % de arriba de la foto (cubierta, tarja y puertas) y `object-position: 50% 20%`.
   - **Opcional aplicado:** desde 1200 px el catálogo va en 3 columnas en lugar de 6, con foto 4:3 para que la tienda no se alargue de más. Así las tarjetas ya no son miniaturas, y las fotos x4 aguantan esos ~380 px. Los `sizes` de las tarjetas subieron a 380px.
5. **Cotizador en celular** (`30-medida.css`). El tope de alto del dibujo pegado ahora aplica en todos los celulares, no solo en los de menos de 760 px de alto.
   - **Lo pedido no bastaba:** 30svh no cambiaba nada en un celular de 844 px de alto, porque el dibujo ya medía unos 250 px por su ancho. Lo bajé a **26svh** (307 × 219 px).
   - **Medido por CDP:** con "03 Opciones" justo debajo del dibujo, el rótulo y las 4 casillas se ven completos, y también el resumen con el botón verde (`med-check.png`).

## Lo que no hice igual (y por qué)

- **FIG. 02b no es el panel completo de atrás.** Ese panel ya es la foto de REF. 06 del catálogo, que en compu sale en la misma pantalla que la banda: se vería la misma foto dos veces a 20 cm. Usé un detalle 4:5 de la torre de redilas del mismo panel. Cumple la intención (verla de atrás) sin repetir la tarjeta.
- **Pies 02b y 02c:** "De atrás" y "De lado". No dicen más porque no hay más datos en `research/`.
- **FIG. 05:** el juez las llama vitrinas. Por la foto no se puede asegurar qué pieza es (parecen estaciones de trabajo con respaldo), así que el alt dice "dos muebles de acero inoxidable emplayados". El pie es el que pidió el juez.
- **Ruta en compu:** al alinear la pareja abajo, la columna derecha queda libre arriba, junto al cajetín del título del mapa. Es un solo espacio limpio, no los 2 huecos entre fotos de antes. No lo rellené para no inventar contenido.

## Tope y pendientes (sin cambio)

- Todas las fotos siguen saliendo de paneles de Instagram de 160 a 283 px. Pasar de ~9 depende de las fotos en alta del dueño y del pin y la dirección confirmados (PENDIENTES.md).
- **Visto a 820 px:** la banda sigue en modo celular (foto a lo ancho de la pantalla, de un panel de 232 px). No la toqué porque REVISION-3 pide no cambiar el celular y el juez no la marcó. Si se quiere, el modo compu de la banda se puede bajar a 760 px.
