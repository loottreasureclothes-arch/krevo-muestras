# Corrección del 20 sep 2026 (tarde) — Ólux American Style · secret mode

Lo que pidió Emanuel por voz, muy molesto:

> "Olux, te dije que le cambiaras la foto del banner, no está padre. Te dije que la hicieras como
> tienda en línea, como un catálogo. Está de la verga."

Las dos cosas se atendieron. Lo primero fue conseguir fotos de producto: **sin fotos no hay tienda**,
y hasta hoy la muestra no tenía ni una.

---

## 1. Las fotos (esto fue lo primero y lo más largo)

Su tienda en línea **secretmodelegante.com** está caída, pero quedó archivada. De ahí se sacó:

| Qué | Cuánto | Nota |
|---|---|---|
| Fichas con nombre, precio, tallas y colores | **172 de 172** | En `research/catalogo-172.json` |
| Fotos de producto reales | **14** | Subidas x4 con Real-ESRGAN local, en `img/prod/` |
| Banners de categoría suyos | **3** | En `img/cat/`, sin el "COMPRAR" quemado que traían |

**No se llegó a las 24 piezas con foto que pedía el encargo, y no se puede con lo que hay.** El
archivo de internet guardó el HTML de las 172 fichas pero **no sus imágenes**: bajarlas devuelve 404,
probado una por una. Las 14 que existen son las del carrusel y los banners de su portada. Las otras
160 tienen que salir del dueño.

**Cómo se casó cada foto con su producto, sin adivinar:** cada ficha archivada trae su `og:image`,
que es el archivo exacto de su foto principal. Comparando nombres de archivo, **6 parejas quedaron
probadas al 100 %**. De ahí salió que ellos le meten el precio y la talla al nombre del archivo
(`IMG_4528-2200-T6` resultó ser el vestido de $2,200 talla 6), y con esa clave ya verificada se
cerraron **3 parejas más**, cada una respaldada además por su propio catálogo. Las **3 restantes**
(dos lentes Guess y la playera Tommy Jeans) no se pudieron amarrar a un precio y van con
**"Pregunta el precio"**. Todo el detalle, con la tabla de pruebas, en `research/FOTOS-PRODUCTO.md`.

**Cero imágenes de IA. Cero créditos gastados.**

## 2. La página ahora es una tienda

El orden es exactamente el que dictó (slider arriba, productos con precio por sección, otro banner,
otro tipo de producto, y así):

1. **Portada** con el hueco del banner listo.
2. **Slider de destacados** — 6 piezas con foto, nombre, precio y "Encargar".
3. **01 · Carteras, mochilas y lentes** — rejilla foto + nombre + precio + "Encargar".
4. **Banda** con una foto suya de detalle (tejido Tommy).
5. **02 · Calzado** — lista de precios con talla (ver punto 5).
6. **Banner de categorías** — sus tres banners reales: Dama · Accesorios · Niñas y niños.
7. **03 · Ropa de dama** — rejilla, las 4 con foto y precio reales.
8. **Banda** "Envíos a toda la República".
9. **04 · Cremas Victoria's Secret** — 2 con foto + el panel de las 25 fragancias a $290.
10. **Ver el catálogo completo (172 piezas)** → `catalogo.html`.

**Cada pieza manda su propio WhatsApp**, como lo pidió, con `<a href="wa.me/...?text=">` real escrito
en el HTML (nada de `window.open`, que el navegador de Instagram bloquea):

> `Hola, te encargo el Vestido Tommy Hilfiger corte cintura baja de $1,690.`

Y el **"Mi encargo"** del header junta varias piezas en un solo mensaje con su total. Probado:
2 vestidos + 1 cartera → contador 3, total $5,970, mensaje con una línea por pieza. Con una pieza sin
precio el total dice "Te lo confirmamos por WhatsApp". **Nunca sale "$0".**

**`catalogo.html` nuevo:** las 172 piezas con su precio, con índice arriba para saltar:
Niñas y niños 23 · Dama 59 · Calzado 36 · Carteras, mochilas y lentes 24 · Caballero 3 ·
Cremas Victoria's Secret 25 · Más piezas 2. Los "Ver los N" de la portada salen de ese mismo
reparto, así que nunca van a decir un número que no cuadre con lo que hay.

## 3. El banner principal

Queda el hueco `img/hero/banner-m.webp` y `banner-d.webp` con una **provisional**: el recorte de su
exhibidor real de tenis, ya **sin el texto quemado** del sticker de Instagram. El encargo completo
para la foto definitiva está en **`IMAGEN-HERO.md`**: qué fotos suyas usar de referencia, qué debe
verse, y el encuadre (vertical con el 45 % de abajo libre en celular, apaisado con la mitad
izquierda oscura en compu, para que el titular se lea).

**Ojo al meterla:** si la nueva es de IA, hay que quitar la clase `is-real` de
`<section class="os-hero ... is-real">` en `sections/10-hero.html` para que aparezca la etiqueta
**"Imagen ilustrativa"**, y volver a correr `python3 build.py`. El marcador ya está puesto.

## 4. Lo demás que se arregló

- **El dato mal leído:** decía "Descuentos desde $499 hasta $999". El research dice **precios**.
  Ahora: "Piezas desde $499 hasta $999 pagando en efectivo."
- **Fuera la foto con el logo quemado** (la navideña de "Dos nombres, dos locales"): traía el logo
  impreso en un recuadro blanco encima, tapaba el letrero real y era de temporada. Se borró el
  archivo y el paso que lo generaba.
- **Fuera el rAF pegado al scroll del hero** (ya no existe `10-hero.js`). Una foto fija y ya.
- **Horario:** decía "en las dos sucursales". De Plaza San Rafael no hay horario verificado. Ahora
  dice "Tanyveth: lunes a viernes…" y lo otro pasó a pendientes.
- **Reseñas:** las cuatro tienen ya su distintivo (Oscar con sus estrellas, que el desglose de la
  ficha respalda; Dey con "Recomienda", porque Facebook no usa estrellas). El "4.5" ya no se toca con
  su pie, y el título dejó de repetir el dato: ahora dice "Lo que dicen las que ya vinieron".
- **El flotante de WhatsApp ya no tapa botones:** se esconde sobre la tienda, el catálogo, `#pago` y
  `#cierre`, que es donde hay botones verdes o "Encargar".
- **Contraste del hero en compu:** velo más sólido del lado izquierdo, donde cae el titular.
- Cuadritos de "Todo listo para completar" en tinta (iban azules sobre la banda crema) y cifras de
  caja en `#pago` (el "3" de "3 o 6 meses" bajaba como descendente).

## 5. Lo que NO se pudo, y por qué

- **Las 160 fotos de producto que faltan.** El archivo de internet no las tiene. Es el punto 2 de
  `PENDIENTE-DUENO.md` y lo que más levantaría la página.
- **Calzado se quedó sin una sola foto de pieza.** En su catálogo hay 60 pares con precio y talla
  reales (36 de adulto y el resto de niña y niño), pero ninguna foto se salvó. Por eso ese bloque va
  como **lista de precios** y no como rejilla: cuatro recuadros de "Foto pendiente" en fila se veían
  rotos; la lista se ve intencional, cabe más y da el mismo dato.
- **Tres precios están leídos del nombre de sus archivos**, no de la ficha (el vestido rojo $1,690,
  el camisero $1,590 y la cartera Michael Kors $2,590). Los tres cuadran con su catálogo por
  separado, pero conviene que el dueño los confirme: van en `PENDIENTE-DUENO.md` punto 8.
- **160 de 172 fichas salen con la etiqueta "Foto pendiente"** y el nombre de su marca. Es honesto,
  pero se nota.

## 6. Cómo se verificó

`krevo-shot` en los tres anchos, sobre las dos páginas, mirando todas las capturas:

| Página | 390 px | 893 px | 1440 px |
|---|---|---|---|
| `index.html` | 8,978 px · **0 alertas** | 8,135 px · **0 alertas** | 9,698 px · **0 alertas** |
| `catalogo.html` | 28,834 px · **0 alertas** | 16,628 px · **0 alertas** | 20,680 px · **0 alertas** |

La principal quedó **debajo del tope de 9,000 px en celular**. Sin scroll horizontal, sin errores de
consola, sin 404, sin bloques invisibles, sin botones menores a 44 px. Primera carga en celular:
**195 KB**. Verdes en toda la página: **3** más el flotante.

## 7. Cómo se vuelve a armar

```
python3 build_tienda.py   # tienda + catalogo.html desde research/catalogo-172.json
python3 build.py          # index.html desde template.html + sections/
```

`sections/20-tienda.html` y `catalogo.html` **se generan**: no se editan a mano, se cambia
`build_tienda.py`. `build_img.py` regenera los derivados de `img/` desde `research/fotos/`.

---

# RONDA 2 — sobre `revisiones-externas/olux-secret-mode-tarde.md` (20 sep 2026, 17:40)

El inspector externo la calificó **7.4 / 10 — no se puede mandar**. Su lista, punto por punto.

## Bloqueantes

### 1. A 390 px el header se salía de pantalla — **HECHO**
Medido otra vez con CDP en los cuatro estados. Ahora, con ventana de 390 px, **nada pasa de 374**:

| Estado | Logo | Chapa | Ver la tienda | Hamburguesa |
|---|---|---|---|---|
| Arriba, carrito vacío | 6–87 | oculta | 182–316 | 330–374 |
| Arriba, con 3 piezas | 6–87 | 196–316 | oculta | 330–374 |
| Scrolleado, con 3 piezas | 6–73 | 196–316 | oculta | 330–374 |

Qué se cambió en `site.css`: `.os-apartar` pasa a `flex: 0 1 auto; min-width: 0`, y abajo de 560 px
se esconde el letrero completo (`.os-sm` **y** `.os-head-part`). Y en cuanto hay algo en el encargo,
abajo de 560 se esconde **"Ver la tienda"**: con el encargo empezado ese botón ya no sirve, y su
lugar lo toma la chapa, que es la que abre la hoja. Es la salida "buena" que proponía el inspector.

### 2. La chapa "Mi encargo" medía 28 px y partía su texto — **HECHO**
`.os-cart-bar`: `height: 44px; min-height: 44px; padding: 0 12px; white-space: nowrap`. Medido:
44 px de alto, "Mi encargo · 3" en un solo renglón.

### 3. "02 · Calzado" eran 36 pares sin una sola foto — **HECHO**
Primero se volvió a buscar, sin dar por buena la pasada de la mañana (queda anotado en
`research/FOTOS-PRODUCTO.md`): índice CDX de **todas** las imágenes del dominio → 24 URLs, las
mismas; índice de **todo** `wp-content/uploads/*` → 25 registros, ni un `IMG_` de calzado; ficha
archivada de `tenis-michael-kors` → su `og:image` existe y apunta a `IMG_8698.jpg`, pero la foto da
**404** en tamaño completo, en 277×300 y en 100×100. **No hay foto de calzado y no la va a haber
por ese camino.**

Lo que sí es suyo y sí existe: **su exhibidor real de tenis** (foto de Google Maps). De ahí salen
tres recortes cerrados a pares concretos, fuera de las dos franjas con el sticker de Instagram
quemado, subidos x4 con **Real-ESRGAN local** (`img/calzado/par-1|2|3-380|760.webp`). Cero IA, cero
créditos.

La sección quedó con el orden que pidió el encargo: **primero los tenis de verdad** (tres fotos),
luego el renglón honesto **"Sin foto todavía: pregúntanos y te la mandamos por WhatsApp"**, y hasta
abajo la rejilla igual que las otras tres secciones, con cuatro pares de cuatro marcas distintas y
su precio real (Tommy $2,190 · Michael Kors $4,200 · Calvin Klein $1,890 · Guess $1,890) y el enlace
a los 36. Ya no es una lista de texto. Los recortes **no se pegan a ninguna ficha**: decir "este es
el Tenis Guess de $1,890" sobre un recorte del anaquel sería inventar.

### 4. El flotante verde tapaba texto en "Todo listo para completar" — **HECHO**
`data-hide-wa` en `#completar`. Y se encontró **otro** que el inspector no vio: a 6,000 px de scroll
el flotante se comía el renglón *"Es el mismo local."* del título de `#nombres`; esa sección también
lleva ya `data-hide-wa`. Reverificado barriendo la página entera de 600 en 600 px a 390 y a 893, y
también el catálogo: **cero solapes** del flotante con texto, botones o el crédito del pie.

### 5. "secret mode" dejaba basura en el header al bajar — **HECHO**
Se quitó la regla `.is-solid .os-sm-t { max-width: 0; opacity: 0 }`. El letrero ya no se apaga: o se
ven los tres (parteaguas, "secret mode" y el subrayado de neón) o no se ve ninguno — abajo de 560 px
se van los tres juntos. Ya no quedan el "+" y el guioncito flotando solos.

### 6. El slider arrancaba pegado al filo — **HECHO**
`scroll-padding-inline: var(--k-gutter)` en `.os-t-slider`. Medido: la primera tarjeta arranca en
**L16** a 390, **L24** a 893 y **L40** a 1440, igual que el resto de la página.

## Lo que pedía para llegar a 10

### 7. El slider no tenía puntos ni flechas — **HECHO**
Seis puntos siempre visibles y dos flechas de 44×44 que solo aparecen donde hay mouse de verdad
(`hover: hover and pointer: fine`). Los puntos van **por avance**, no por "cuál es la primera
tarjeta": en compu caben 4 de las 6 en pantalla, así que el riel nunca llega a la tarjeta 6 y los
últimos puntos no se prendían nunca. Probado con CDP a 1440: dos clicks seguidos avanzan dos
tarjetas (destino propio, no `scrollBy`, que se come el segundo click), al llegar al tope se prende
el sexto punto y la flecha de siguiente se deshabilita. A 390, llevando el riel al final, también
se prende el sexto.

### 8. Guion largo en el mensaje del carrito — **HECHO**
`x1 — $1,690` pasó a `x1: $1,690`. Mensaje verificado con 3 piezas:
`Hola, vi la tienda en la página y te encargo: • … x1: $1,690 … Total: $7,870`.

### 9. La reseña de Dey Luevano se cortaba a media frase — **HECHO**
Ahora cierra donde ella cierra la idea y con puntos suspensivos, textual de
`research/resenas.md`: *"…me encantaron los productos, el que compre está hermosa la mochila…"*.

### 10. Los dos "Cómo llegar" a distinta altura — **HECHO**
`.os-nom-local` es columna flex y el último párrafo empuja. Medido a 1440: los dos botones arrancan
en el mismo pixel (top 8,683).

### 11. 769 KB de imágenes que no usaba nadie — **HECHO**
Borradas `img/aparador/` (4 archivos) y `img/hero/tienda-m.webp` + `tienda-d.webp`. `build_img.py`
ya no las genera y dice por qué. Primera carga en celular: **209 KB**.

### 12. La principal estaba a 22 px del tope de 9,000 en celular — **HECHO**
Bajó a **8,860 px**, con 140 px de margen, y eso ya incluye la sección de calzado nueva (que pesa
más que la lista vieja). Se recortó aire, no contenido: `--sec-y` 50 → 46, `.os-t-block` padding-top
20 → 12, las dos bandas de 4:2.9 a 4:2, los tres banners de categoría de 3:4.6 a 3:3.6, y las
tarjetas del slider de 70vw a 60vw.

## De pilón (no estaba en la lista, salió al medir)

- Los botones **−/+** de cada pieza dentro de la hoja del encargo medían 40×44. Ahora 44×44.
  A 390, 893 y 1440 ya **no queda ni un tocable por debajo de 44 px** en las dos páginas.

## NO SE PUDO

- **Las fotos pieza por pieza de las 160 fichas** (las 36 de calzado incluidas). No existen: el
  archivo de internet guardó el HTML de las fichas pero no sus imágenes, y hoy se reverificó por
  tres caminos distintos (ver punto 3 y `research/FOTOS-PRODUCTO.md`). Por eso la meta de
  "24 piezas con foto real" se queda en 12. Tienen que salir del dueño: es el punto 2 de
  `PENDIENTE-DUENO.md`.
- **Confirmar los 3 precios leídos del nombre del archivo** (vestido Tommy rojo $1,690, camisero
  $1,590, cartera Michael Kors $2,590). Es dato del dueño, no código.

## ALERTA para el orquestador (no la toqué a propósito)

`img/hero/banner-m.webp` y `banner-d.webp` se reemplazaron a las 17:20 por la portada definitiva
(interior de boutique). **`sections/10-hero.html` sigue con la clase `is-real` en la sección**, que
es la que esconde la etiqueta **"Imagen ilustrativa"**. `IMAGEN-HERO.md` lo deja escrito como regla
dura: *si la que se mete es hecha con IA, hay que quitar `is-real` y volver a correr
`python3 build.py`*. No me consta cómo se hizo esa foto y no invento datos, así que la dejé como
estaba: **si es de IA, hay que quitar `is-real`** (una línea, `sections/10-hero.html:11`).

## Cómo se verificó esta ronda

`krevo-shot` en **390 (celular real, dpr 2), 893 y 1440**, sobre `index.html` y `catalogo.html`, y
todas las capturas miradas en hojas de contacto. Además, pruebas con CDP de lo que se tocó: los
cuatro estados del header, la chapa, la hoja del encargo con 3 piezas y su mensaje, el menú, el
slider (puntos, flechas y topes), el barrido del flotante contra todo el texto, y el rastreo de
tocables menores a 44 px.

| Página | 390 px | 893 px | 1440 px |
|---|---|---|---|
| `index.html` | 8,860 px · **0 alertas** | 8,520 px · **0 alertas** | 10,179 px · **0 alertas** |
| `catalogo.html` | 28,602 px · **0 alertas** | 16,558 px · **0 alertas** | 20,666 px · **0 alertas** |

Sin scroll horizontal, sin errores de consola, sin 404, sin bloques invisibles, sin Inter, sin
guiones largos a la vista, sin emojis. 26 enlaces de WhatsApp en la principal, **todos** al mismo
número real `524491371706`. Verdes: 3 en la principal más el flotante, 1 en el catálogo.
