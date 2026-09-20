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
