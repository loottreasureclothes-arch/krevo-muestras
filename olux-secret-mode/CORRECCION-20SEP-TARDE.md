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
