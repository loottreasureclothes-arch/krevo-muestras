# Encargo de la foto del banner (la hace el ORQUESTADOR, con IA)

Escrito por el corrector el 20 sep 2026 (tarde). El hueco ya está listo en la
página: hoy trae una foto **provisional** recortada de una foto real suya. Solo
hay que reemplazar los dos archivos; no se toca ni HTML ni CSS.

## Qué archivos reemplazar (mismos nombres, mismas medidas)

| Archivo | Medida exacta | Dónde se usa | Peso hoy |
|---|---|---|---|
| `img/hero/banner-m.webp` | **780 × 1000 px** (vertical, 0.78) | celular y tableta, hasta 899 px de ancho | 44 KB |
| `img/hero/banner-d.webp` | **1920 × 820 px** (apaisado, 2.34) | compu, desde 900 px | 75 KB |

Tope de peso: 150 KB el de celular, 260 KB el de compu (webp, calidad ~75).
La foto se monta con `object-fit: cover`, así que el encuadre no se estira:
lo que sobre se recorta por los lados.

## Qué debe verse (esto es lo que pidió Emanuel por voz)

> "Que el banner sea un stand, de gente vendiendo, generado por IA."

Prompt base:

> **Stand de feria de 3×3 armado, con su marca genérica SIN texto legible, dos o
> tres personas atendiendo y vendiendo a visitantes, pabellón de exposición real
> de fondo, luz de recinto ferial.**

Reglas duras para el prompt y para aceptar el resultado:

- **Nada de texto legible.** Ni en la cenefa, ni en los pendones, ni en los
  gafetes. Un logotipo abstracto sin letras está bien; una palabra que se lea,
  no. Si sale texto, se descarta la imagen o se recorta fuera.
- **Ninguna marca real** (ni de sus clientes ni ajena).
- **Gente vendiendo, no posando.** Alguien del stand explicándole algo a uno o
  dos visitantes. Caras completas y manos bien formadas o, si no, encuadre que
  las deje de tres cuartos o de espaldas.
- **Pabellón de verdad detrás**: estructura de techo, naves con otros stands
  fuera de foco, piso pulido. Que se note que es una feria y no un estudio.
- **Sistema Octanorm**: paneles blancos con perfilería de aluminio, cenefa
  arriba, mostrador. Es lo que ellos rentan (ver `research/servicios-precios.md`).
- Luz de recinto ferial: fría de arriba, con las luminarias del stand cálidas.
  Nada de atardecer ni de estudio.

## Encuadre (esto es lo que más se rompe)

- **`banner-d.webp` (apaisado, compu):** el titular va **a la izquierda** y ocupa
  más o menos el 45% del ancho. Deja ese tercio izquierdo **con aire** (piso,
  pared lisa, fondo) y pon el stand y la gente **del centro a la derecha**. La
  línea del horizonte, a media altura o un poco abajo.
- **`banner-m.webp` (vertical, celular):** el titular y los dos botones se apoyan
  **abajo**, y se comen más o menos el 55% de abajo de la foto. El stand y la
  gente van **en la mitad de arriba**; abajo, piso o fondo sin detalle
  importante. Lo que pongas en el tercio de abajo no se va a ver.
- Las dos son **la misma escena** desde el mismo ángulo, no dos fotos distintas.
- No dejes nada importante en las esquinas: el `cover` recorta ahí.

## Fotos reales de referencia (de `research/fotos/`)

Pásale estas al generador para que el stand se parezca a lo que ellos montan:

| Archivo | Para qué sirve de referencia |
|---|---|
| `real-stand-papas-barber-ebesa2025.jpg` | **La principal.** Es la que está de provisional. Nave con estructura de techo, piso pulido, stand blanco con vitrina. El ambiente de pabellón que se busca. |
| `real-stand-elixderm-ebesa2025.jpg` | Stand más vestido: mostrador curvo con luz, pendones, techo del recinto a la vista. Referencia de iluminación. |
| `real-stand-natural-slim-ebesa2025.jpg` | Octanorm puro: cenefa, paneles blancos, mesa y sillas para atender. Referencia de la estructura. |
| `real-stand-xelha-haircare-ebesa2025.jpg` | Mostrador redondeado y cenefa. Referencia de acabados. |
| `render-portada-lapisa-todoterreno-fb-cover.jpg` | Su propio render de propuesta: referencia de cómo les gusta presentarse. **No** copiar su texto. |

## Lo que ya está resuelto en la página (no hay que tocarlo)

- La etiqueta **"Imagen ilustrativa"** ya está puesta y a la vista, en la esquina
  de arriba a la derecha del banner (`.s-hero-ilus` en `sections/01-hero.css`).
  Queda correcta en cuanto entre la imagen de IA.
- El `<picture>` ya escoge sola la versión de celular o de compu, y el
  `<link rel="preload">` del `template.html` ya apunta a los dos archivos.
- El velo oscuro y el degradado (para que se lea el titular) van por CSS, no en
  la imagen: **entrega la foto limpia, sin oscurecer y sin texto.**
- Alto del banner: 62svh en celular, 540 px en compu. Ya está topado.

## Qué es la provisional de hoy (para que se sepa qué se está reemplazando)

Recorte de `img/ebesa/papas-barber-1200.webp` (foto real suya de EBESA 2025,
Papas Barber), subida x4 con Real-ESRGAN local y recortada con PIL. Se eligió
porque es la única de sus fotos reales con formato horizontal, con el pabellón
a la vista y **sin ninguna marca de cliente legible**. Cero créditos gastados.
