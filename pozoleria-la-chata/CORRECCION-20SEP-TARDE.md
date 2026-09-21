# Corrección — 20 sep 2026, tarde

Corrector Opus. Se editaron `template.html`, `sections/`, `site.css`/`site.js` y se armó con `python3 build.py`
(nunca `index.html` a mano). Revisado con krevo-shot a **390, 893 y 1440 px**: **0 alertas** en los tres anchos
(sin scroll horizontal, sin errores de consola, sin 404, sin bloques invisibles, sin botones chicos).

---

## 1. El encargo de Emanuel: banner delgado, sin foto, con su logotipo

**Antes:** portada de pantalla completa con la foto del letrero en paspartú.
**Ahora** (`sections/10-hero.html` + `sections/10-hero.css`):

- **Banner delgado en verde de marca** (degradado `#014a24 → #013a1d` con un brillo suave arriba a la
  izquierda), con raya crema al pie que lo separa de la carta. En celular mide **~420 px de alto** de los
  844 de pantalla: **la foto de la carta y el titular "Rojo o verde" ya se asoman en la primera pantalla.**
- **Su logotipo real, grande y nítido.** Se rehízo desde `research/fotos/logo-la-chata-facebook.jpg` (720 px):
  Real-ESRGAN `x4plus` → 2880 px, se le **quitó el fondo blanco** (relleno desde las esquinas + erosión de
  3 px y pluma de 1.2, sin aureola) y se recortó al logo. Quedaron `img/brand/logo-hero.webp` (640 px, 86 KB)
  y `img/brand/logo-hero-m.webp` (360 px, 43 KB), con `srcset`/`sizes` y precarga. Es su logo real, **no
  lleva etiqueta "Imagen ilustrativa"**.
- **Frase:** "Sábados y domingos / hay pozole." a dos tonos (la primera línea al 72 %, la segunda en crema
  sólido). Respaldada en `research/hechos.md` (Google Maps y el post de Facebook: sábado y domingo).
- **Renglón chico con el horario exacto de hechos.md:** "Jesús R. Macías 602, esquina 20 de Noviembre.
  De 3:30 a 10:00 pm." (se usa el 3:30 de Facebook, que es el más reciente y de primera mano).
- **Dos botones de marca**, los dos en crema sobre el verde (el verde lleno se sigue reservando a WhatsApp
  y al flotante): **"Ver la carta"** → `#carta`, y **"Cómo llegar"** → Google Maps con la dirección textual
  de `hechos.md` (`maps.google.com/?q=Jesús R. Macías 602, esquina 20 de Noviembre, Col. Gremial, 20030
  Aguascalientes`), en pestaña nueva.
- En compu el grupo va **centrado** (logo a la izquierda, texto a la derecha) para que no quede el lado
  derecho vacío; el banner mide ~378 px de alto a 1440.
- La fila entra desde **700 px**, no 900, para que a 893 px no se vea como columna de celular.
- Se cambió la precarga de `img/hero/hero-*.webp` a `img/brand/logo-hero*.webp`.

## 2. Lo que marcó el inspector de la mañana

| # | Qué decía | Cómo quedó |
|---|---|---|
| 1 | El hero salía **invisible de 1.6 a 2.25 s** (el `setTimeout(1600)` era el único disparador) | El banner **ya no lleva `data-reveal`: nace visible**. Además `site.js → initRevealSafety()` se arregló de raíz: el IntersectionObserver ahora muestra **al verse** (`io.unobserve(e.target); show(e.target)`), lo que ya está dentro de la primera pantalla se revela **de golpe al cargar**, y el plazo de 1.6 s quedó solo como red de seguridad para lo que esté a la vista. Comprobado con capturas a **400, 700, 1000, 1600, 2600 y 4000 ms**: a los 400 ms ya se ven logo, titular, renglón y los dos botones (`vt/m-vt-400.png`). |
| 2 | La tarjeta firma **"Pozole rojo" salía hueca a 1440** (solo el medallón chico y un "+" flotando) | De 900 px para arriba el **nombre y "Pregunta el precio" se leen desde el inicio** (`html.chata-js [data-momento-text] { opacity: 1 }` dentro del `@media (min-width: 900px)`), el medallón subió a **264 px** y el cuerpo ahora ocupa el ancho de la tarjeta, con el "+" pegado a la derecha. El scrub del medallón sigue siendo lo único que se mueve. |
| 3 | Las **dos fotos a sangre se veían borrosas** en compu | De 900 px para arriba **ya no van a sangre**: van en el mismo paspartú crema con borde verde, **topadas a 1100 px** y centradas. Y se **rehicieron los dos archivos de compu** con Real-ESRGAN x4 desde los originales de `research/fotos/` y bajados con PIL, así que ahora se **reducen** en vez de ampliarse: `img/carta/carta-d.webp` 1400×860 (70 KB, encuadre nuevo: pozole + tostadas + segundo plato, **fuera el celular y fuera la marca ajena del original**) e `img/mesa/mesa-d.webp` 1600×900 (108 KB, el plato completo, sin acercamiento). |
| 4 | La reseña de **Montserrat Muma estaba editada** y se presentaba como textual | Se cambió por **otra reseña real y completa**: **Guillermo Campos Calvillo**, 5★, textual palabra por palabra de `research/resenas.md`. De paso: la de **Victor Manuel** ahora va **completa** (le faltaba "Tardo un poco el servicio, pero valió la pena la espera ;)") y los nombres van **tal como los firmaron** en Google ("Luis Andres", "Victor"), sin acentos que ellos no escribieron. |
| 5 | El **mapa dejaba un rectángulo crema vacío** en la primera visita | El hueco ahora tiene **relleno oscuro con su esquina escrita** (pin + "Jesús R. Macías y 20 de Noviembre / Col. Gremial, Aguascalientes"), y el `iframe` va con fondo transparente encima, así que el relleno se ve hasta que Maps pinta. Comprobado con caché frío a 120, 400, 1200 y 3000 ms (`mapa/m-mapa-*.png`). |

**Extra de dato (no estaba en el encargo, pero era una afirmación que la investigación no aguanta):**
en "Cómo llegar", el renglón de pago pasó de "Solo efectivo" a **"Solo efectivo, según lo que reportan sus
clientes en Google"** — en `research/hechos.md` es un dato de reseñas, no confirmado por el negocio.

## 3. Lo que NO se tocó

Todo lo demás quedó igual, como pidió Emanuel: la carta con los 11 platillos y su carrito, el 4.6 con las
159 opiniones, el reloj de la esquina, "Cómo llegar", "Todo listo para completar", el pie y el flotante de
WhatsApp (siguen siendo 5 `wa.me` reales con mensaje prellenado).

## 4. Lo que quedó pendiente y por qué

1. **La foto del letrero real ya no sale en la página.** Emanuel pidió el banner "sin foto real, su puro
   logotipo", y mover esa foto a otra sección se salía del encargo. Los archivos siguen en `img/hero/`
   (ya no los usa nadie) y la foto se sigue usando como `og:image`. **Si se quiere recuperar**, el lugar
   natural es "Cómo llegar", junto al mapa, con el pie "Su letrero, en su esquina de siempre".
2. **"Plato hidrocálido"** sigue en la carta con su "+". En `research/menu-precios.md` está marcado como
   PENDIENTE-DUEÑO ("confirmar si sigue en el menú"). El inspector pedía moverlo a "Todo listo para
   completar" o ponerle nota; no venía en el encargo, así que se dejó. **Decisión de Emanuel.**
3. **El cuadrito rojo de "hoy"** en el reloj de la esquina sigue igual (el inspector lo veía poco claro).
   Fuera del encargo.
4. **Aire muerto arriba de "Estamos sirviendo" a 1440** y los renglones de la carta muy estirados a 1440:
   detectados, fuera del encargo.
5. **Precios reales, fotos propias de cada antojito y link de cobro**: siguen siendo cosa del dueño; están
   listados en "Todo listo para completar".

## 5. Evidencia

Carpeta: `/private/tmp/claude-501/-Users-emmanuelcruzsalas/908f2c84-948e-4d5c-8dec-4d6bd1c308ae/scratchpad/corr/pozoleria-la-chata/`

| Archivo | Qué prueba |
|---|---|
| `final-m.png`, `final-t.png`, `final-d.png` | Hojas de contacto de la página entera a 390, 893 y 1440 |
| `vt-m.png` | El banner ya visible a los 400 ms (antes salía en blanco 1.6–2.2 s) |
| `mapa-sheet2.png` | El relleno del mapa con caché frío, sin rectángulo vacío |
| `r5/*-report.json` | 0 alertas en los tres anchos |

---

# RONDA 2 — revisión externa de la tarde (mismo día, corrector Opus aparte)

Lista de trabajo: `~/Prospeccion-Web-Ags/revisiones-externas/pozoleria-la-chata-tarde.md` (8.3 global).
Se editaron `template.html`, `sections/` y `site.css`/`site.js` y se armó con `python3 build.py`
(nunca `index.html` a mano). **El banner delgado con el logotipo NO se tocó**: ya lo aprobó Emanuel.

Verificado con krevo-shot a **390, 700, 768, 893 y 1440**: **0 alertas** en todos (sin scroll
horizontal, sin errores de consola, sin 404, sin bloques invisibles tras 1.9 s, sin botones
menores a 44 px). Carrito, menú, anclas y los 5 `wa.me` probados en vivo con CDP.

| # | Lo que pidió el inspector | Estado |
|---|---|---|
| 1 | GRAVE: el flotante tapa el crédito del pie a 390 | **HECHO** |
| 2 | GRAVE: media tarjeta en negro junto a "Pozole verde" (390 y 893) | **HECHO** |
| 3 | ALTA: de 700 a 899 las dos fotos siguen a sangre y borrosas | **HECHO** |
| 4 | ALTA: la tarjeta firma con 45 % de aire muerto a 1440 | **HECHO** |
| 5 | ALTA: el medallón chiquito queda como mancha sobre el pozole | **HECHO** |
| 6 | MEDIA: punteadas raídas en la carta a 390 | **HECHO** |
| 7 | MEDIA: nombre y precio de la tarjeta firma dependen del temporizador | **HECHO** |
| 8 | MEDIA: el teléfono de "Cómo llegar" mide 98x21 px | **HECHO** |
| 9 | BAJA: "Solo efectivo en el local." sin matizar en el reloj | **HECHO** |
| 10 | BAJA: días cerrados ilegibles y el "hoy" no se entiende | **HECHO** |
| — | "Plato hidrocálido" (PENDIENTE-DUEÑO) | **NO SE TOCA**: decisión de Emanuel, el propio inspector no lo cuenta como error |
| — | Las fotos "siguen suaves" | **NO SE PUDO por código**: es la calidad del original |

## 1. El flotante ya no tapa nada que importe — HECHO
- **Aire abajo en el pie:** `site.css → .chata-foot` pasó de `28px` a **`104px`** de relleno inferior
  en celular (112 px de 700 px para arriba). Medido con CDP al fondo de la página: el crédito
  termina en 740 px y el flotante empieza en 791 px y la barra del pedido en 780 px. **Cero encime.**
- **Mecánica `data-hide-wa` (nueva en este sitio):** `site.js → initHideWa()` compara el rectángulo
  del flotante (que es `fixed`, así que no cambia aunque esté oculto: no hay parpadeo) contra los
  bloques marcados y le pone `.is-tapando`. Se esconde con **`visibility`**, no con `opacity`,
  porque la animación de entrada del flotante lleva `fill: both` y pisaría la opacidad.
- **Bloques marcados:** la carta entera (`.s-carta-in`, los 11 "+"), el reloj (`.s-reloj-in`, tira de
  días y "Apartar mi pedido"), "Cómo llegar" (`.s-llegar-copy`, el teléfono tocable y los 3 botones)
  y el crédito del pie (`.chata-foot-note`).
- Barrido automático cada 120 px de scroll: a **1440 el flotante no se encima con NADA**; a 390 solo
  queda pasando por encima de las reseñas de "La mesa de barro" y del lema del cierre, texto de
  lectura sin botones y solo mientras se desliza. Se dejó a propósito: esconderlo también ahí lo
  haría prender y apagar cinco veces en un scroll, que se ve peor que el roce.

## 2. Ya no hay media tarjeta vacía — HECHO
`sections/20-carta.css`, reescrito con celular primero:
- **Abajo de 700 px la rejilla es de UNA columna** y cada tarjeta es un renglón: foto cuadrada a la
  izquierda (`min(40%, 240px)`) y a la derecha nombre, dato y precio. No queda ninguna celda suelta.
- **De 700 px para arriba** la rejilla es de 3: la tarjeta firma ocupa 2 y "Pozole verde" la tercera,
  así que la fila cierra exacta. Medido: a 893 las dos tarjetas miden 289 px de alto; a 1440, 372.

## 3. El paspartú de las fotos ahora entra desde 700 px — HECHO
El arreglo vivía en `@media (min-width: 900px)` y dejaba un hueco de 200 px de pantalla.
Se bajó el punto de quiebre a **700 px** en `sections/20-carta.css` y `sections/30-mesa.css`, y
—esto faltaba— también en el `<source media="...">` de las dos `<picture>`, para que a 893 se sirva
`carta-d.webp` (1400x860) y `mesa-d.webp` (1600x900) y no la versión chica estirada. A 893 las dos
fotos van en el paspartú crema topado a 1100 px: se reducen, no se amplían.

## 4. La tarjeta firma quedó llena — HECHO
- Las dos tarjetas de la fila **miden lo mismo por construcción**: la foto de "Pozole verde"
  (`flex: 1 1 auto`) crece hasta emparejar el alto del medallón, en vez de dejar una franja negra.
- El **medallón llena la tarjeta**: `min(46%, 340px)`, cuadrado de verdad (338 px a 1440, 246 px a 893).
- El cuerpo de la tarjeta va centrado como un solo bloque: nombre en grande
  (`clamp(22px, 2.3vw, 30px)`), el dato y el precio.
- **El "+" ya no flota solo:** la misma **línea punteada** de los renglones de la carta une
  "Pregunta el precio" con el "+" (209 px de punteada a 1440, 101 px a 893). Una sola gramática en
  toda la sección. En celular no se pinta, porque ahí daría un rabito de 26 px.
- Se le agregó un renglón **real y con fuente** bajo el nombre: "En Google, su menú lo marca como
  popular" (`research/menu-precios.md`: Google Maps marca Pozole Rojo como "Popular" en
  "Menú y platos destacados"). No es relleno inventado: es la razón de que esa tarjeta mande.

## 5. El medallón ya no deja manchita — HECHO
`sections/20-carta.js`: el disco termina en **`scale(0)`** (antes `Math.max(0.02, ...)`) y el último
tercio se va también **en opacidad** (`opacity = s / 0.3`), así que no queda un disquito de 18 px
flotando sobre el plato. Lo mismo en `prefers-reduced-motion`:
`.s-carta-medal-disc { transform: scale(0) !important; opacity: 0 !important; }`.

## 6. Las punteadas de la carta a 390 — HECHO
El renglón de celular ahora es una rejilla de dos líneas: **nombre + punteada larga + "+"** arriba y
**"Pregunta el precio"** abajo (`grid-template-areas: "name fill add" / "price price add"`, con la
punteada en `minmax(30px, 1fr)`). La línea corre completa del nombre al "+" en todos los renglones;
se acabaron los rabitos de 40 px. De 700 px para arriba el renglón vuelve a una sola línea.

## 7. Ningún texto depende ya del reloj — HECHO
Se borró de raíz el revelado de `[data-momento-text]`: se quitó la regla de `opacity: 0` del CSS,
su override del `@media (min-width: 900px)`, el `classList.toggle(... p >= 0.75)` y el
`setTimeout(..., 1600)` de `sections/20-carta.js`. El nombre y "Pregunta el precio" **nacen visibles
en cualquier ancho**; el scrub solo abre el medallón.

## 8. El teléfono ya mide 44 px — HECHO
`sections/60-visitanos.css`: `display: inline-block; padding-block: 12px; margin-block: -10px`
(el margen negativo deja el renglón con el mismo aire) y el subrayado pasó de `border-bottom` a
`text-decoration` para que quede pegado al texto y no hasta abajo del relleno.
Barrido de tamaños a 390, 699, 700, 768, 893, 1024 y 1440: **cero elementos tocables abajo de 44 px**.

## 9. "Solo efectivo" con el mismo matiz en toda la página — HECHO
`sections/40-reloj.html` y la hoja del pedido (`template.html`) ahora dicen lo mismo que "Cómo
llegar": **"Solo efectivo, según lo que reportan sus clientes en Google."** (`research/hechos.md`:
es dato de reseñas, no confirmado por el negocio).

## 10. El reloj se entiende — HECHO
`sections/40-reloj.css`:
- Los días cerrados suben de crema al 42 % a **72 %**, el tachado de 42 % a 62 % y el fondo de la
  ficha de .06 a .09: ya se leen L-M-M-J-V.
- El cuadrito rojo de 6 px se cambió por **la palabra HOY** arriba de la letra más el **borde
  completo de la ficha en rojo de marca** (`box-shadow: inset 0 0 0 1.5px var(--accent)`). En el día
  abierto el HOY va en crema para que se lea sobre el verde.

## Extra que salió en la verificación (no venía en la lista)
**El mapa enseñaba su hoja en blanco a 893.** Con caché frío, Google Maps pintaba su fondo gris
encima del relleno oscuro y quedaba un recuadro vacío. Se le quitó el `loading="lazy"` al `iframe`
(carga desde el principio, cinco pantallas antes de que alguien llegue) y ahora aparece con
`opacity` hasta su propio `load` (`onload` → `.is-listo`), con respaldo `html:not(.chata-js)` por si
no hay JS. Mientras tanto se ve el relleno oscuro con el pin y la esquina escrita, nunca un hueco.

## Lo que NO se pudo arreglar con código
1. **Las dos fotos grandes siguen suaves.** Ya se sirven sin ampliar (se reducen desde 1400x860 y
   1600x900, rehechas con Real-ESRGAN en la ronda anterior). Lo que queda es la calidad del original
   de Facebook. Se arregla con fotos del dueño, no con código.
2. **"Plato hidrocálido"** sigue en la carta con su "+": `research/menu-precios.md` lo marca
   PENDIENTE-DUEÑO. Es decisión de Emanuel, no un defecto.
3. **Precios reales, fotos propias de cada antojito y link de cobro**: siguen en "Todo listo para
   completar"; son cosa del dueño.

## Evidencia de la ronda 2
Carpeta: `/private/tmp/claude-501/-Users-emmanuelcruzsalas/908f2c84-948e-4d5c-8dec-4d6bd1c308ae/scratchpad/corr2/pozoleria-la-chata/`

| Archivo | Qué prueba |
|---|---|
| `final2/hoja-m.png`, `final2/hoja-t.png`, `final2/hoja-d.png` | Hojas de contacto a 390, 893 y 1440, 0 alertas |
| `r3/hoja-s.png`, `r3/hoja-u.png` | El ancho intermedio: 700 y 768 px, ya con paspartú |
| `z2-d-card.png`, `z2-t-card.png`, `z2-m-card.png` | La tarjeta firma llena, sin manchita y con su punteada |
| `z-lista-m.png` | Las punteadas de la carta, completas a 390 |
| `z3-reloj-m.png` | El reloj con HOY y los días cerrados legibles |
| `z-map-t.png` | El mapa pintado a 893 (ya sin recuadro en blanco) |
| `final2/*-report.json` | 0 alertas en los tres anchos |
| `probe.mjs`, `q-int.js`, `q-touch.js`, `q-tapa.js`, `q-cards.js` | Pruebas en vivo: carrito, menú, anclas, `wa.me`, tamaños de toque, encimes del flotante y medidas de las tarjetas |
| `krevo-shot.mjs` | Copia con los presets `t` (893x802), `s` (700) y `u` (768) |
