# Encargo de la foto de banner — Pastelería León

Para el ORQUESTADOR. Esta sesión NO generó ninguna imagen con IA: el hero de hoy es una
**foto real provisional** (la 05, el pastel de tres pisos con el carruaje sobre la pared de
ladrillo con luces), recortada para quitarle el dibujito del sitio que republica las fotos
de Google, subida con Real-ESRGAN x4 y guardada en:

- `img/hero/hero-m.webp` — 780 × 1000 (vertical, celular)
- `img/hero/hero-d.webp` — 1600 × 900 (apaisado, compu)

Cuando la foto de IA esté lista, se guarda **con esos mismos nombres y esas mismas medidas**
y la página no necesita ningún cambio de código.

## Fotos reales de referencia (rutas exactas)

| Para qué | Ruta |
|---|---|
| El pastel: forma, betún trabajado, flores naturales | `research/fotos/11-pastel-boda-3-pisos-flores-naturales-blanco.jpg` |
| El ambiente: mesa de fiesta, luces cálidas colgando, ladrillo | `research/fotos/05-pastel-3-pisos-azul-carruaje-cenicienta.jpg` |
| Su escritura a mano con duya (el detalle de la casa) | `research/fotos/18-pastel-cumpleanos-fer-abejitas.jpg` |
| Paleta de marca (rojo, dorado, azul del rótulo y del logo) | `research/fotos/01-fachada-local-heroe-nacozari-letrero.jpg` y `research/logo.png` |

OJO: las fotos de `research/fotos/` traen en una esquina el dibujito de un mesero de
caricatura (marca de agua del sitio que las rehospeda). **No es parte del pastel.** Si se
usan como referencia, recórtalo antes.

## Qué debe verse

- **Un pastel de ellos, de verdad**: blanco o crema, de dos o tres pisos, con el betún
  trabajado a mano (festón de conchitas en la base, como en las fotos 08, 09, 17 y 18) y
  flores naturales o de fondant. Pastelería fina de barrio, hecha a mano; no pastel de
  revista europea ni de estudio de stock.
- **Mesa de celebración familiar**, con luz cálida y cercana: focos de serie colgando, mantel,
  algún cupcake alrededor. Como en la foto 05.
- La paleta de la imagen tiene que convivir con el rojo `#D2241E`, el dorado `#E8B400` y el
  chocolate oscuro `#2A0E0C` del sitio.

## Qué NO debe verse

- Nada de personajes con derechos (Barbie, Paw Patrol, Harry Potter, Pato Lucas). Sí los
  hacen, pero no van en el banner.
- Nada de texto quemado en la imagen: el titular lo pone el HTML encima.
- Nada que sugiera IA, chatbot ni asistente. Y nada de precios, mensualidades ni cobros.
- Nada que no vendan: solo pasteles, cupcakes y los ratones de chocolate.

## Encuadre

**Celular — `img/hero/hero-m.webp`, 780 × 1000 (vertical).**
El pastel completo, centrado, ocupando del 55 % al 70 % del alto. Cabeza del pastel a la
altura del tercio superior. Aire arriba (la pared con las luces) porque ahí no va texto: el
titular vive en la banda de chocolate que va DEBAJO de la foto, no encima. El borde de abajo
se recorta con un festón, así que los últimos 20 px del alto no deben llevar nada importante.

**Compu — `img/hero/hero-d.webp`, 1600 × 900 (apaisado).**
El pastel a la DERECHA (centrado alrededor del 66 % del ancho) y el tercio izquierdo con
fondo tranquilo y oscuro (pared, penumbra, bokeh de luces) porque ahí va el titular
"Tu pastel lleva su nombre. / Escrito a mano desde 1993." a dos tonos. Nada de detalle fino
entre el 0 % y el 40 % del ancho. El velo del CSS ya oscurece ese lado, así que la foto no
necesita traerlo quemado.

**Comprobación antes de dar por buena la imagen:** con el titular encima tiene que leerse a
390, 893 y 1440 px de ancho, y el pastel tiene que seguir viéndose entero en los tres.
