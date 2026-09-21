# Corrección del 20 sep 2026 (tarde) — Stand Up Ags

Encargo de Emanuel, por voz:

> "Stand Up está fatal por las fotos del principio. Que el inicio sea un banner,
> y más corto. Que el banner sea un stand, de gente vendiendo, generado por IA.
> Y esta pinche foto hay que quitarla porque está fatalísima."

Se hizo todo, salvo generar la imagen de IA (esa la hace el orquestador; el
hueco y el encargo por escrito quedaron listos).

---

## 1. El hero ya es un banner, y más corto

**Antes:** sección de pantalla completa (`min-height: 100svh`) con el render
recortado de Newmi Universidad flotando sobre el azul marino. En celular eran
844 px de alto y abajo no asomaba nada.

**Ahora:** banner a sangre con foto de fondo.

| | Antes | Ahora |
|---|---|---|
| Alto en celular (390×844) | 844 px (100svh) | **523 px (62svh)** |
| Alto en compu (1440×900) | 900 px | **540 px** |
| Alto en 893×802 | 802 px | **497 px** |
| Alto total de la página en celular | 6,618 px | **5,909 px** |

Qué trae el banner:
- Foto a sangre (`.s-hero-foto`, `<picture>` que escoge vertical en celular y
  apaisada en compu) con velo en degradado para que el titular se lea. En compu
  el velo carga a la izquierda, donde va el texto, y deja el stand a la vista en
  la derecha.
- El mismo titular, sin cambiarle una letra: "TE RENTAN 3 × 3 DE PISO VACÍO. /
  TE LO ENTREGAMOS DE PIE.", a dos tonos, con su máscara por línea (sin GSAP).
- Los mismos dos botones: "Ver las 15 medidas" (color de marca) y "Ver 10 stands
  de EBESA 2025" (contorno). Cero verde WhatsApp en esta sección.
- Etiqueta chica **"Imagen ilustrativa"** en la esquina de arriba a la derecha
  (abajo la tapaba el WhatsApp flotante; arriba a la izquierda, el logo).
- El renglón de abajo se acortó a "Diseño, renta y montaje de stands para ferias."
  La dirección ya venía en el eyebrow de arriba, se decía dos veces.

**Nada de aire muerto debajo:** en los tres anchos, EBESA ya asoma con su
eyebrow, su titular y las primeras fotos dentro de la primera pantalla
(320 px visibles en celular, 305 en 893, 360 en compu).

Archivos: `sections/01-hero.html`, `sections/01-hero.css`, `template.html`
(el `<link rel="preload">` ahora apunta a los dos banners, uno por `media`).
`sections/01-hero.js` no se tocó: la máscara del titular sigue igual.

### Foto provisional del banner
- `img/hero/banner-m.webp` — 780 × 1000, 44 KB
- `img/hero/banner-d.webp` — 1920 × 820, 75 KB

Salen de `img/ebesa/papas-barber-1200.webp` (foto real suya de EBESA 2025),
subida x4 con Real-ESRGAN local y recortada con PIL. **Cero créditos.** Se
escogió esa porque es la única foto real suya con formato horizontal, con el
pabellón a la vista y sin ninguna marca de cliente legible.

**El encargo de la foto de IA quedó escrito en `IMAGEN-HERO.md`**: prompt,
medidas exactas, tope de peso, encuadre (vertical para celular con el texto
abajo, apaisado para compu con aire a la izquierda) y las cinco fotos reales de
`research/fotos/` que van de referencia. Solo hay que reemplazar los dos
archivos: no se toca ni HTML ni CSS.

---

## 2. Se fue la foto grande de Fajas Colombianas

**Antes:** `#ebesa` abría con una foto de 520 px de Fajas Colombianas (maniquíes
en lencería, stand vacío) y a la derecha una rejilla de 3×3 con los otros nueve.

**Ahora:** ninguna foto va en grande. Las diez de EBESA 2025 van todas del mismo
tamaño, con tope de **232 px de ancho** cada una, porque las originales son de
Instagram a 414 px y más grandes se ven sucias. Fajas Colombianas se quedó como
una más de la tira, así siguen siendo diez y el titular "DIEZ STANDS… SALIERON
DE AQUÍ" sigue siendo cierto.

- Menos de 900 px: tira que se desliza, con snap y la pista "Desliza: son 10
  montajes reales". Cero JavaScript.
- Desde 900 px: **rejilla de 5 × 2 a todo lo ancho**. Ahí estaba el hueco que
  dejaba la foto grande; ahora no queda ninguno. Diez fotos solo cuadran en 1, 2,
  5 o 10 columnas: con 3 o 4 el último renglón se queda cojo, por eso no hay paso
  intermedio y abajo de 900 se queda la tira.
- `max-width: 1240px` en la rejilla para que ni en pantallas de 1800 px una foto
  pase de ~236 px.

De paso, dos cosas que estaban mal desde antes:
- La tira arrancaba pegada al filo de la pantalla (el `scroll-snap` alinea con el
  borde del scrollport, no con el del contenido). Se arregló con
  `scroll-padding-inline: var(--k-gutter)`.
- Los `sizes` pedían imágenes de 46vw para huecos de 232 px. Ahora piden 232 px.

Archivos: `sections/02-ebesa.html`, `sections/02-ebesa.css`.

---

## 3. Lo que NO se tocó (y sigue funcionando)

- Catálogo con las 15 medidas, los chips que filtran y el stand que se levanta.
- El menú que filtra por medida.
- El formulario de "Tu feria tiene fecha" con `<a href="https://wa.me/...">` real.
- La sección firma "Del plano al 3D", sin GSAP.
- Visítanos, "Lo que necesitamos de ti", pie y redes.
- Todos los datos: nada inventado, nada de precios. Sigue "Pregunta el precio".

---

## Verificación

`node krevo-shot.mjs http://localhost:8770/stand-up-ags/ <carpeta> m|t|d`
con `t = 893 × 802` agregado al preset.

| Ancho | Alertas | Scroll horizontal | Consola | 404 | Botones < 44 px |
|---|---|---|---|---|---|
| 390 × 844 (celular) | **0** | no | limpia | 0 | 0 |
| 893 × 802 | **0** | no | limpia | 0 | 0 |
| 1440 × 900 (compu) | **0** | no | limpia | 0 | 0 |

Hojas de contacto miradas una por una (celular, 893 y compu):
`/private/tmp/claude-501/-Users-emmanuelcruzsalas/908f2c84-948e-4d5c-8dec-4d6bd1c308ae/scratchpad/corr/stand-up-ags/hoja-final-m.png`,
`hoja-final-t.png`, `hoja-final-d.png`. Capturas sueltas en `r4-m/`, `r4-t/`, `r4-d/`.
Nada encimado, cortado, vacío ni en blanco en los tres anchos, ni al bajar ni al
volver arriba.

---

## Lo que NO se pudo, y por qué

1. **La foto de IA del banner no se generó.** No era de este puesto: el encargo
   dice que la genera el orquestador. Quedó la provisional (foto real suya) y el
   encargo completo en `IMAGEN-HERO.md`.
2. **La etiqueta "Imagen ilustrativa" ya está puesta aunque hoy la foto sea
   real.** Se dejó a propósito para que no se olvide cuando entre la de IA, y
   porque la provisional se usa como ilustración genérica de un piso de feria, no
   como "este es un trabajo nuestro" (el recorte no deja ver ninguna marca). Si
   el orquestador decidiera dejar la foto real de forma definitiva, hay que
   quitar el `<p class="s-hero-ilus">` de `sections/01-hero.html` y ponerle un
   pie con el nombre del cliente.
3. **El catálogo sigue con planos verdes y sin foto por medida.** Es lo que pidió
   la revisión externa (punto 3), pero el encargo de hoy dice expresamente no
   tocar el catálogo, y además no existe una foto real por cada una de las 15
   medidas: eso ya está pedido en "Lo que necesitamos de ti".
4. **`img/hero/hero-m.webp` y `hero-d.webp` se quedaron en la carpeta** aunque ya
   no los use nadie. Son el render de Newmi; se dejaron por si el orquestador los
   quiere para otra cosa. Se pueden borrar sin romper nada.

---

# RONDA 2 (20 sep 2026, tarde-noche)

Lista de trabajo: `~/Prospeccion-Web-Ags/revisiones-externas/stand-up-ags-tarde.md`
(inspección externa de la tarde, 8.5 / 10, "publicable hoy: NO").
Más la decisión nueva de Emanuel sobre Fajas Colombianas.

**Estado al cerrar: 0 alertas en 390, 893 y 1440**, seis corridas seguidas de
`krevo-shot` (dos vueltas × tres anchos). Sin scroll horizontal en 360, 390,
768, 893, 900, 1024, 1199, 1200, 1440, 1600 y 1920. Consola limpia, cero 404,
cero botones abajo de 44 px (también con la hoja de cotización abierta).

| Ancho | Antes | Ahora |
|---|---|---|
| Alto de la página a 1440 | 6,314 px | **5,675 px** |
| Alto de la página a 893 | 6,498 px | 6,720 px |
| Alto de la página a 390 | 5,909 px | 5,946 px |

## Lo urgente

### 1. El menú de celular no se podía cerrar — **HECHO**

Eran tres cosas, no una:

- `#cd-menu` (z-index 70) tapaba el header (z-index 50) y con él la hamburguesa.
  Ahora, **con el menú abierto el header sube a z-index 80**: la hamburguesa, ya
  en forma de X, queda encima y cierra. (`body.cd-menu-open .su-header` en
  `site.css`.) "MEDIDAS" se apaga mientras el menú está abierto, porque el propio
  menú ya trae "Las 15 medidas"; y si tocan el logo, el menú se cierra en vez de
  navegar por debajo (`site.js`, listener nuevo en el header).
- **Botón "Cerrar" de 114 × 44 px dentro del panel**, arriba a la derecha, en los
  170 px que estaban vacíos. Es el primero que recibe el foco al abrir y entra en
  la trampa de foco del Tab (`template.html` + `.su-menu-cerrar` en `site.css`).
- **El velo ya existe de verdad.** El panel iba con `inset: 0` y cubría los 844 px
  de alto: no había nada afuera que tocar. Ahora baja desde arriba con
  `max-height: calc(100svh - 96px)` y deja una banda de velo abajo; tocarla
  cierra. El flotante de WhatsApp se esconde mientras el menú está abierto, para
  que no se vea tocable dentro de esa banda.

Probado con CDP de verdad, no de vista, en 390, 893 y 1440 (`menu.mjs`):
abrir con la hamburguesa → cerrar con "Cerrar" → abrir → cerrar tocando el velo →
abrir → cerrar con la hamburguesa. Los seis pasos pasan en los tres anchos, con
`document.elementFromPoint` sobre la hamburguesa devolviendo la hamburguesa con
el menú abierto. Capturas: `menu-final/menu-1-abierto.png`,
`menu-2-cerrado-boton.png`, `menu-4-cerrado-velo.png`,
`menu-6-cerrado-hamburguesa.png`.

### 2. Fajas Colombianas fuera (decisión de Emanuel) — **HECHO**

- El `<li>` salió de `.s-ebesa-tira` y **los dos archivos se borraron**
  (`img/ebesa/fajas-colombianas-600.webp` y `-1200.webp`). En `img/ebesa/`
  quedan 18 archivos, 9 fotos.
- **La rejilla de compu quedó de 3 × 3, cuadrada, sin renglón cojo** (antes 5 × 2
  con diez). `max-width: 756px` para que ninguna foto pase de ~243 px: son fotos
  de Instagram de 414 px de origen. Medido: 202 px a 1200, 206 a 1440, 188 a
  1600, 243 a 1920. En celular y 893 sigue la tira que se desliza.
- **El nombre se conserva** en un renglón chico bajo la tira:
  "También armamos: Fajas Colombianas." Por eso el titular sigue diciendo
  **"DIEZ STANDS DE EBESA 2025 SALIERON DE AQUÍ"** y sigue siendo cierto: son
  diez clientes (los diez de `research/VENDE.md` y `research/FOTOS.md`), nueve con
  foto y el décimo por nombre.
- La pista de deslizar pasó de "son 10 montajes reales" a **"nueve fotos de
  EBESA 2025"**, para que no contradiga al titular. El `aria-label` de la lista
  dice "Nueve de los diez stands de EBESA 2025".

## Los otros puntos del inspector

| # | Punto | Estado |
|---|---|---|
| 1 | Menú de celular no se puede cerrar | **HECHO** (arriba) |
| 2 | Cambiar la foto del banner por la de IA | **HECHO por el orquestador**; yo no toqué `banner-m.webp` ni `banner-d.webp`. Verificadas a ojo en 390, 893 y 1440: stand armado con dos personas atendiendo a dos visitantes. Se actualizó el `alt`, que seguía describiendo el stand vacío de la provisional |
| 3 | Preguntar por Fajas Colombianas | **HECHO**: Emanuel ya decidió, sale (arriba) |
| 4 | Chips del catálogo a 44 px | **HECHO**: `.s-cat-chip` de 40 → 44 px. De paso, dos que el inspector no vio porque revisó con la hoja cerrada: la X de la hoja de cotización (40 → 44) y los botones +/− de cantidad (28 → 44). Ahora hay **cero** elementos tocables abajo de 44 px, también con la hoja abierta |
| 5 | Hueco muerto a 1440 | **HECHO**, por los dos lados. (a) `--sec-y` de 116 → 82 px desde 900: los 232 px de nada entre las reseñas y el titular del catálogo quedaron en 164. (b) Desde 1200 px, **`#ebesa` y `#catalogo` van a dos columnas**: el titular a la izquierda y, a la derecha, la rejilla de 3 × 3 en EBESA y los chips + el renglón de "15 medidas en total" en el catálogo. Ya no queda media pantalla vacía. Las reseñas subieron a la columna izquierda, bajo el titular. La página a 1440 bajó 639 px |
| 6 | El flotante pisa el titular del cierre | **HECHO**: `data-hide-wa` en el `<footer>` entero, así no tapa "ESPACIOS QUE HABLAN POR TU MARCA" ni el crédito de KREVO. Verificado en `g-m/m-06.png`, `m-07.png` y `g-d/d-06.png` |
| 7 | Etiqueta "Imagen ilustrativa" muy tenue | **HECHO**: de 9 px / 0.6 de tinta / fondo 0.42, a **10.5 px / 0.86 / fondo 0.62**. Se lee en los tres anchos |
| 8 | Detalle del banner a 893 | **HECHO**: el `<source>` y los dos `<link rel="preload">` bajaron de 900 a **760 px**, así que las tabletas ya usan la apaisada en vez de recortar la vertical de 780 × 1000 en una caja de 893 × 497. Entre 760 y 899 el encuadre se carga a `62% 50%`, que es donde está la gente |

## Tres cosas más que salieron al revisar (no estaban en la lista)

1. **Scroll horizontal de 35 px a 768 px** (iPad de pie), en "Tu feria tiene
   fecha". El split de dos columnas arrancaba en 760 px y ahí no cabe: el titular
   no parte renglón y pide 457 px de min-content, más 48 de canal, más 278 del
   botón "MANDAR POR WHATSAPP", contra 728 px de caja. El split ahora empieza en
   900 px. Probado a 360, 390, 768, 893, 900, 1024, 1199, 1200, 1440, 1600 y
   1920: `window.scrollX` se queda en 0 en todos.
2. **Alerta "INVISIBLES tras 1.9 s" en la firma.** Al cambiar los altos, una
   captura cayó justo donde el cross-fade de "Del plano al 3D" tiene el render
   con 3 % de tinta: se contaba como bloque grande en blanco aunque en pantalla
   se ve el plano. El corte del cross-fade pasó de 0 a 0.06 y el bloque apagado
   se marca `aria-hidden`. Seis corridas seguidas sin la alerta.
3. **El renglón de "15 medidas en total" subió** de debajo de la rejilla a junto
   a los chips: explica el filtro donde se usa. Por eso ya no dice "elige el
   tamaño **arriba**".

## Lo que no se tocó, y se volvió a probar

- **Carrito:** filtros (3×2 / 3×3 / 6×3 / Especiales) con las 15 medidas,
  "+ Agregar", contador, +/−, y el `<a href>` real:
  `https://wa.me/524494579759?text=Hola Stand Up, quiero cotizar:\n- 1x 3×3 Cabecera Custom\n- 1x 3×3 Cabecera Octanorm\nFeria: EBESA 2026\nFecha de montaje: 15 de octubre de 2026\nMe confirman el total por aquí, porfa.`
- **Formulario "Tu feria tiene fecha":** `<a href>` real, sin renglones vacíos:
  `...?text=Hola Stand Up, quiero cotizar un stand.\nMedida: 3×2 Cajón Octanorm\nFecha de montaje: 15 de octubre de 2026\nFeria o evento: EBESA 2026`
- Cero "$0" y cero precios inventados. Total: "te lo confirmamos por WhatsApp".
- Hero, firma, Visítanos, "Lo que necesitamos de ti", pie y redes: sin cambios de
  contenido.
- Nada de `_kit/`: todo el arreglo del menú vive en `site.css` y `site.js` de
  esta muestra.

## Archivos tocados

`template.html`, `site.css`, `site.js`,
`sections/01-hero.html`, `sections/01-hero.css`,
`sections/02-ebesa.html`, `sections/02-ebesa.css`,
`sections/03-catalogo.html`, `sections/03-catalogo.css`,
`sections/04-firma.js`, `sections/05-fecha.css`,
más `python3 build.py`. Borrados: `img/ebesa/fajas-colombianas-600.webp` y
`img/ebesa/fajas-colombianas-1200.webp`.

## Lo que NO se pudo

1. **El décimo stand ya no tiene foto en la página.** Es lo que pidió Emanuel
   (la de Fajas Colombianas era la única que había de ese cliente y la llamó
   "fatalísima"). Queda como renglón de texto. Si algún día manda otra foto de
   ese montaje, vuelve a la tira y la rejilla pasa a 5 × 2 sin tocar nada más.
2. **El catálogo sigue con planos verdes y sin foto por medida.** No existe foto
   real de cada una de las 15; ya está pedido en "Lo que necesitamos de ti".
3. **`img/hero/hero-m.webp` y `hero-d.webp` siguen ahí sin usarse** (el render
   viejo de Newmi). Se pueden borrar sin romper nada; no los toqué porque no
   eran de esta lista.

## Capturas

Carpeta base: `/private/tmp/claude-501/-Users-emmanuelcruzsalas/908f2c84-948e-4d5c-8dec-4d6bd1c308ae/scratchpad/corr2/stand-up-ags/`

- Hojas de contacto: `hoja-final-m.png`, `hoja-final-t.png`, `hoja-final-d.png`
- Capturas sueltas: `g-m/`, `g-t/`, `g-d/`
- Menú: `menu-final/` (los cuatro pasos) · Carrito: `carrito2-m/carrito-abierto.png`
- 360 px y 768 px: `v360/`, `v768/`
