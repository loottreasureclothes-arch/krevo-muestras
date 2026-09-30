# JAS INOX · Corrección 1 (30 sep 2026)

Apliqué REVISION-1.md de arriba hacia abajo con las precisiones del orquestador. `index.html` sale de `python3 build.py`. Las fotos salen de `gen/fix_assets.py prep up emit`: recorte con PIL, `cv2.inpaint` solo sobre el texto y Real-ESRGAN x4 (`-s 4`). No usé IA generativa.

## Resultado

| Medida | Antes | Ahora |
|---|---|---|
| Alto en celular | 8,460 px | **8,894 px** (tope 9,000) |
| Alto en compu | | 6,894 px |
| Alertas del report (m y d) | | **0** |

- **Fuentes:** Anton, IBM Plex Sans e IBM Plex Mono.
- **Links de WhatsApp:** 6 `<a>` reales a wa.me.
- **Scroll horizontal a 820 px:** no hay.

**Capturas:** `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/jas-fix/`
- Hojas de contacto: `m-contact.png` y `d-contact.png`.
- Carpetas `m/` y `d/`, cada una con su `report.json`.
- Pruebas en `t/`:
  - `sheet1` a `sheet3`: ruta, catálogo, banda y estados del cotizador.
  - `fig-rack-s`: rack de 300 × 120 × 200.
  - `w820`.

**Cotizador probado por código.** Esta es la URL de WhatsApp decodificada:
`https://wa.me/524494415822?text=Hola JAS INOX, quiero cotizar: Mesa con tarja de 200 x 60 x 80 cm (largo, ancho y alto), con entrepaño, respaldo y rodajas. Para: restaurante. Ciudad: León. Mi nombre: Ana.`
- **Con "Otro":** `...quiero cotizar: Tanque de 500 litros de 300 x 120 x 110 cm (largo, ancho y alto).`
- **Al abrir, sin tocar nada:** `...quiero cotizar: Mesa de trabajo de 180 x 70 x 90 cm (largo, ancho y alto).`
- **Al recargar:** conserva el tipo, las medidas y el título del cierre.

## Cambios aplicados (número de la revisión)

1. **Fotos limpias.** Ya no hay marcas de agua de Instagram ni texto quemado.
   - **REF. 04 tarja:** panel limpio de ig-12. El "JAS" fantasma sobre la puerta se quitó con inpaint. Queda un reflejo suave.
   - **REF. 03 cajones:** el inpaint dejaba mancha sobre puertas y cajón, así que la RECORTÉ al tramo central.
   - **FIG. 06 Tijuana:** borré "TIJUANA", el pin y las rayitas rellenando el cielo con un degradado ajustado a los pixeles vecinos. El inpaint TELEA dejaba bandas. También recorté el letrero del edificio.
   - Borré de `img/` las versiones viejas con marca de agua.
2. **Ruta con foto que vende.** FIG. 05 "Carga en Aguascalientes" es el panel de ig-05 con la pieza de JAS emplayada entrando al tráiler. Va a lo ancho, a 52 svh en celular.
   - Quité con inpaint la marca "JAS INOX" del emplaye y el "CLARK" del montacargas. La etiqueta de Instagram quedó fuera por recorte.
   - FIG. 06 Tijuana queda como la foto chica, junto al pie.
3. **Mapa como momento firma.** Es un contorno nuevo trazado con coordenadas reales (`gen/mx_map.py`, sin datos externos), enfocado en el noroeste.
   - Mide 3:4 y ocupa 56 svh en celular.
   - Contador en Plex Mono de 0 a 1,900 km, ligado al mismo `p` de la línea y reversible. Va en el océano, lejos del contorno.
   - Etiquetas "TIJUANA" y "AGS." con fondo carbón y fuera de las líneas. "Aguascalientes" completo va en el rótulo del contador.
   - La línea sigue el corredor del Pacífico. El pie dice "Ruta de referencia".
4. **Cotizador arranca armado.** Abre con "Mesa de trabajo", las 4 opciones activas y el resumen "Mesa de trabajo · 180 × 70 × 90 cm".
5. **Dibujo pegado arriba en celular.** Queda sticky bajo la barra, con fondo carbón, mientras se mueven medidas y opciones.
6. **Cotas completas.** Reservé márgenes fijos en el viewBox para los textos de cota y para el pie FIG. Probé rack de 300 × 120 × 200, rack de 60 × 40 × 200, mesa de 300 × 40 × 110, mesa de 60 × 120 × 70, campana de 300 × 120 × 110 y "Otro": todas las cotas salen completas.
7. **Catálogo sin rejilla de íconos.** Quité las 3 tarjetas "Foto pendiente" y sus 3 chips, que ya filtraban a vacío.
   - En la celda 8 de la rejilla va un renglón de texto: "También fabricamos: racks y estantes, barandales, lockers y cajoneras. Pregunta el precio." Cada nombre es un link que preselecciona el tipo en el cotizador.
   - REF. 05 ahora es "Tarja con gabinete", un panel de ig-12, en lugar de la mesa larga en diagonal.
   - Numeración REF. 01 a 07. En compu la rejilla es de 4 columnas.
8. **Banda de foto** (`sections/25-banda`) entre catálogo y cotizador. Es ig-06: la pickup con redilas frente al taller, con su letrero real. Título que cae: "Sale rodando / del taller."
9. **Título del cierre según el estado.** Sin armar dice "Falta elegir / el tipo." y manda a WhatsApp un mensaje genérico. Armado dice "Tu cotización / ya tiene medidas." y manda el mismo mensaje que el cotizador.
   - "Armado" significa que la persona tocó tipo, medida u opción. La mesa de arranque no cuenta.
10. **Etiqueta y alt del hero:** "FIG. 01 · Barra exhibidora con vidrio".
11. **og.jpg de 1200x630.** Foto del hero (barra y letrero JAS INOX) a la derecha, velo solo a la izquierda, logo y "Acero inoxidable a tu medida.".
12. **Link del catálogo.** Se queda el mismo link, con el texto "Catálogo 2026 en Canva (79 páginas)" y `rel="noopener"`. En PENDIENTES anoté que a bots da 403 y que falta el link `/view`.
13. **Header de compu:** "Catálogo · A la medida · Taller" ahora son un `<nav>` con 3 anclas reales y subrayado acero al pasar el mouse.
14. **Datos:**
    - "1o. de Mayo 114" lleva `text-transform: none` en ese dato. Ya no se lee "10.".
    - El pie del mapa embebido dice "Polux 114 · pin por confirmar".
    - "Envío real, agosto 2026" pasó a "Envío real de Aguascalientes a Tijuana.". Quité la fecha porque es del post del mapa (ig-01), no de ig-05.
15. **Pulido:**
    - Pie de 760 a 1099 px en 2 columnas, horarios con `nowrap` y redes que envuelven. En celular las redes van en bloque 2x2.
    - En los deslizadores, los números mínimo y máximo quedan pegados a su barra (4 px) y con 18 px antes del siguiente rótulo.

**Extras:**
- La figura del hero se rehízo con 22 % de la textura original encima del x4 para quitar lo cerado. Lo mismo en todas las fotos nuevas.
- Figuras renumeradas del 01 al 07.
- "Para quién es" va en 2 columnas para no pasar de 9,000 px.
- Recortes de alto para caber:
  - `--sec` de 64 px en celular.
  - Mapa del taller de 230 px.
  - Renglones de ficha y de "Todo listo" más compactos.

## No aplicado o aplicado distinto (y por qué)

- **Banda "a sangre" solo en celular.** En compu va en recuadro con marco y el título al lado. La foto de origen es de 640 px, y la decisión de Emanuel dice: "si la original es chica, no va a sangre (recuadro con marco)". En celular sí va de orilla a orilla, igual que el hero.
- **Banda y foto grande de ruta más bajas de lo propuesto.** La banda quedó en 47 svh (se pedían 70) y la ruta en 52 svh (se pedían 60). Así el alto total queda bajo 9,000 px (8,894).
- **Mapa sin todo México.** Se ve solo el noroeste, con el este desvanecido. Así el mapa llena 56 svh en celular y la ruta se ve grande, y Yucatán ya no es una mancha.
- **Coordenadas del mapa embebido.** No puse coordenadas: no tenemos el pin verificado del taller y no se adivinan datos. Va el pie "pin por confirmar" y quedó en PENDIENTES.
- **"1º de Mayo".** Se queda "1o. de Mayo 114" tal como está en research. Solo se quitó el `text-transform` (así lo pidió el orquestador).
- **Link de WhatsApp "Mándenme el catálogo".** No lo puse: el orquestador pidió dejar el link de Canva con el texto nuevo.
- **Manchas de inpaint que quedan:**
  - Un reflejo suave en la puerta de REF. 04, sobre el acero.
  - Un emplaye algo más liso en FIG. 05.
  - A tamaño de tarjeta y de foto se leen como brillo del material. Donde el inpaint sí manchaba (cajones y la orilla izquierda de REF. 05), recorté.
- **Fotos de modelo con nitidez de 640 px.** El x4 no las hace nítidas de verdad. Siguen pendientes las fotos en alta del dueño.
