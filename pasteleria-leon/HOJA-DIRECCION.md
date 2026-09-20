# Hoja de dirección — Pastelería León (20 sep 2026)

Fuente de TODO lo que aparece en la página: `research/hechos.md`, `research/VENDE.md`,
`research/menu-precios.md`, `research/resenas.md`, `research/colores.md`, `research/FOTOS.md`.
Nada fuera de ahí. Precio desconocido = "Pregunta el precio", nunca $0.

**Regla del cliente (VENDE.md):** en esta página NUNCA aparece la palabra IA, chatbot ni
asistente. Aquí contesta una persona. Todo el texto de contacto suena a "escríbele a la
pastelería", nunca a automatización. Tampoco hay mensualidades, suscripciones, planes ni
link de cobro.

---

## 1. El TRABAJO de la página (una frase)

**Que quien ya decidió festejar algo vea que aquí SÍ pueden hacer el pastel que trae en la
cabeza, y mande el encargo por WhatsApp con la fecha y la ocasión ya escritas.**

Hoy no tienen a dónde mandar a nadie: el dominio se les cayó y el único canal es teléfono a
ciegas ("Pedidos: 916-78-59"). La página es el catálogo que no tienen.

## 2. A quién le habla

A la mamá, la hermana o la novia que organiza la fiesta familiar en Aguascalientes y está a
7 a 15 días del evento: cumpleaños infantil, bautizo, primera comunión, confirmación,
aniversario o boda. No es compra de impulso ni de paso: es un encargo que se cotiza. Por eso
la página no cierra con "compra", cierra con **"encarga y te cotizan por WhatsApp"**.

Su miedo real: "¿me van a entregar bien y a tiempo?". Su única reseña de 1★ es justo por
mala comunicación en la entrega. Por eso cada botón promete confirmación antes de cobrar.

## 3. La promesa que solo este negocio puede decir

> **Desde 1993 escribimos el nombre del festejado a mano en el betún.**

Verificada dos veces sin contradicción: bio de Instagram ("Desde 1993") y reseña real de
Google de Marina Covarrubias ("siempre compramos con ellos desde hace 33 años"). Y las fotos
lo prueban: Oliver, Fer, Matías, Karen y Fernando, "Mamita" — todos escritos a mano.

## 4. Las 7 secciones (son 6 + pie). Tope: ~9,000 px en celular

| # | id | Qué es | Razón de venta | Foto grande |
|---|---|---|---|---|
| 1 | `#hero` | Banner a sangre + titular que cae + un verde (WhatsApp) + "VER LA CARTA" | Ponerlo en alto en 3 s y dar salida inmediata al catálogo | `img/hero/hero-m.webp` / `hero-d.webp` (provisional desde foto 11 y 05; la definitiva la genera el orquestador) |
| 2 | `#catalogo` | **Producto a la vista justo después del hero**: 6 pasteles reales, por ocasión, con "Pregunta el precio" y "+ Agregar". Link "Ver la carta completa" a `menu.html` | Es el catálogo que no tienen. Responde "¿pueden hacer algo así?" antes de llamar | 08, 13, 17, 11, 10, 03 |
| 3 | `#tufoto` | **Componente firma: "Tu foto en el pastel"** (ver §6) | Es el upsell real de la casa, salido de su reseña de 5★ | 18 (pastel blanco liso, el lienzo) |
| 4 | `#confianza` | UN número gigante (**33**) + las 2 reseñas textuales de 5★ completas con nombre y estrellas + los agregados reales (4.5★, 44-51 reseñas de Google; 98% recomienda en Facebook) | Nadie arriesga el pastel del bautizo con un desconocido. La antigüedad es su mejor argumento y está verificada | 02 (vitrina real del local, en marco) |
| 5 | `#visitanos` | Fachada real + dirección + horario por día + los teléfonos del rótulo + link a Maps | Cierra la venta del que prefiere ir o llamar. Y es lo que Google necesita para volver a encontrarlos | 01 (fachada completa con rótulo) |
| 6 | `#listo` | "Lo que necesitamos de ti" (fotos, precios confirmados, dudas de operación) | Vende el siguiente paso sin pedir dinero | — |
| — | pie | Logo grande, horario, redes reales (Facebook e Instagram en SVG de 44 px), crédito KREVO | | logo |

**Página aparte: `menu.html` — "La carta completa".** Mismo header y mismo pie, carrito
compartido. TODOS los diseños reales agrupados por ocasión, cada uno con su "+ Agregar":
Cumpleaños, Boda, Bautizo, Primera comunión, Confirmación, Aniversario, Ratones de chocolate.
Sin un solo precio inventado.

### Lo que NO va
- Precios. No hay ni uno publicado por ellos (`menu-precios.md`). Todo es "Pregunta el precio".
- Los pasteles de personaje con derechos (Barbie 06, Harry Potter 07, Paw Patrol 19, Pato
  Lucas 04). Son reales y sí los hacen, pero llevan marca ajena quemada en la foto.
- La reseña de 1★. No se publica, pero su queja SÍ se contesta: cada botón dice que te
  confirman fecha, hora y costo por WhatsApp antes de cobrar.
- "Los sábados solo efectivo". Aparece en agregadores, no en boca del negocio. Va como
  pregunta en `#listo`, no como dato.
- Mensualidades, suscripciones, planes, link de cobro, la palabra IA.
- Contadores en fila, rejilla de tarjetas con ícono, cinta de medir, cortinas de color.

## 5. Header y lenguaje de formas PROPIOS

**El motivo gráfico único es el FESTÓN DE BETÚN**: el borde de conchitas que ellos pipean en
la base de todos sus pasteles (se ve en 08, 09, 15, 16, 17, 18). Nadie más en
`COMPONENTES-USADOS.md` lo trae.

- **Header:** franja crema (el gris claro de su rótulo pintado) con el **borde inferior en
  festón** dibujado con `radial-gradient` repetido — el header literalmente termina en
  betún. León del logo a la izquierda a 38 px + palabra "PASTELERÍA LEÓN"; a la derecha
  "LA CARTA" (link rojo, mayúsculas espaciadas) y la hamburguesa. Al bajar de 40 px se
  compacta a 54 px y el festón se queda. No es la placa de Los Abolengos ni la barra de
  nadie más.
- **Marcos de foto:** cada foto grande va en un marco con el festón arriba, como si la foto
  estuviera montada sobre un pastel. Sirve además para las fotos que no aguantan ir a sangre.
- **Radios:** 0 px en botones (rectangulares, mayúsculas espaciadas, finos). Las fotos del
  catálogo llevan las dos esquinas de abajo redondeadas a 0 y el festón arriba.
- **Divisor entre secciones:** una tira de festón de 14 px en `--dorado` al 22 %. Nada de
  cortinas de color.

## 6. El componente firma: "Tu foto en el pastel"

No está en `COMPONENTES-USADOS.md`. Sale literal de su reseña de 5★ de Vicky Lozano:

> "Para el aniversario de bodas de mis papás me elaboraron un pastel casero marmoleado que
> decoraron con una imagen de su boda que quedó increíble..."

**Qué hace:** sobre la foto real de su pastel blanco liso (18) hay un disco de betún vacío
con el festón pipeado alrededor y la leyenda "Aquí va tu foto". El visitante toca **ELEGIR MI
FOTO**, escoge una del carrete de su propio celular y la foto aparece dentro del disco, con
el grano suave del papel comestible. Debajo, escribe el nombre del festejado y el nombre se
**escribe solo, de izquierda a derecha, con letra de betún** (script, `stroke-dasharray`
sobre un trazo SVG, 900 ms, una vez, reversible). El botón verde de abajo manda el WhatsApp
con el nombre y la ocasión ya escritos y la línea "te mando la foto por aquí".

- La foto NUNCA sale del celular del visitante: se lee con `FileReader` y se dibuja en la
  página. No se sube a ningún lado. Se dice así en la letra chica.
- Sin JS, sin foto elegida o con `prefers-reduced-motion`: se ve el pastel real con el disco
  y el nombre YA escrito. Nunca un hueco en blanco.
- Es lo único animado de la página además de los títulos que caen.

## 7. Titulares (con su voz, a dos tonos, la última línea en dorado)

- Hero: **"Tu pastel lleva su nombre."** / *"Escrito a mano desde 1993."*
- Catálogo: **"Esto ya salió de aquí."** / *"Con el nombre de alguien encima."*
- Firma: **"Tráenos la foto."** / *"Va encima del pastel."*
- Confianza: **"33"** / **"años haciendo el pastel de otras familias."**
- Visítanos: **"Héroe de Nacozari Sur 763."** / *"El del león en la patineta."*
- Listo: **"Falta poquito."**
- Pie: **"Te esperamos."** / *"Pedidos de lunes a domingo."*

Prohibidas y no usadas: calidad, servicio, tu mejor opción, experiencia única, todo en un
lugar, sin vueltas, lo hacemos posible.

## 8. Color y tipografía

Medidos con PIL sobre su logo real (`research/colores.md`). Lienzo **oscuro**, nunca blanco.

| Token | Hex | Uso |
|---|---|---|
| `--deep` | `#2A0E0C` | Lienzo dominante: chocolate casi negro, cálido |
| `--deep-2` | `#3A1512` | Bandas alternas |
| `--rojo` | `#D2241E` | Color de marca: botones de navegar, festón, filetes |
| `--rojo-claro` | `#F2736C` | El rojo cuando va sobre oscuro y tiene que leerse |
| `--dorado` | `#E8B400` | Segunda línea de los títulos, estrellas, el 33 |
| `--crema` | `#FBF6EC` | Bandas de papel SOLO para leer: la carta, la hoja del pedido, el header |
| `--azul` | `#87C3E1` | El azul de su patineta. Una sola vez en toda la página |
| `--wa` | `#25D366` | Solo lo que de verdad manda WhatsApp, más el flotante |

**Tipografía (nunca Inter, Poppins ni Montserrat):**
- Títulos: **Gabarito** 600/800 — redondeada con carácter, va con el león caricaturesco.
- Cuerpo: **Karla** 400/500.
- Acento manuscrito, UNA sola vez (el nombre en el pastel): **Grand Hotel** — es la letra de
  repostería, el eco de "Feliz Cumpleaños Fer" pintado a mano.

Botones: verde SOLO WhatsApp (uno por sección, más el flotante). Navegar y "+ Agregar" en
rojo de marca, rectangulares, 44 px mínimo, mayúsculas espaciadas.

## 9. Prueba anti-genérico (8 preguntas, contestadas)

1. **Tapando el logo, ¿podría ser de otra pastelería?** No. Trae su fachada completa con el
   rótulo y los teléfonos pintados, su calle, el año 1993, sus pasteles con los nombres de
   sus clientes reales y su festón de betún como motivo.
2. **¿3 o más secciones seguidas con eyebrow → título → párrafo → botón?** No. El ritmo es:
   hero a sangre → rejilla de producto → componente firma interactivo → banda con UN número
   gigante y reseñas → tablero de visita con foto de fachada → papel de "lo que falta".
3. **¿El hero es foto + velo + título + 2 botones sin nada propio?** No: la dirección real va
   de eyebrow y el titular es el hecho verificado de 1993.
4. **¿Más de 8 botones verdes?** No. Son 4 en toda la página (hero, firma, hoja del carrito,
   visítanos) más el flotante.
5. **¿Fila de contadores o rejilla de tarjetas iguales con ícono?** No. Un solo número
   gigante (33) y cero íconos decorativos.
6. **¿Falta el componente firma o se repite?** No: "Tu foto en el pastel" no existe en
   `COMPONENTES-USADOS.md`.
7. **¿Algún título con palabra prohibida?** No (ver §7).
8. **¿Pasa de 7 secciones o de 9,000 px en celular?** No: 6 secciones + pie.

## 10. PENDIENTE-DUEÑO (va tal cual en `#listo`)

- Precios o rangos por tamaño de pastel, por docena de cupcakes y de los ratones de chocolate.
- Con cuántos días de anticipación hay que encargar.
- Costo y zona de la entrega a domicilio.
- Si los sábados siguen siendo solo efectivo.
- Cuál de los teléfonos es fijo y cuál WhatsApp (449 464 1263 vs el 916-78-59 del rótulo).
- Fotos propias en buena luz: se necesitan por lo menos 6 más, sin el dibujito del sitio que
  las rehospeda.
