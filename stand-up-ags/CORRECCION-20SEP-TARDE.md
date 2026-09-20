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
