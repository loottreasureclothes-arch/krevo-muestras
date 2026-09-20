# HOJA DE DIRECCIÓN: Stand Up Diseño (Aguascalientes)

Dirección de arte KREVO. 20 sep 2026. El que construye NO decide nada de lo que está aquí.
Negocio: **Stand Up / Stand Up Diseño**, Av. Tecnológico 401, Col. Solidaridad 1, Ags.
WhatsApp **449 457 9759** (confirmado en `research/hechos.md` §0: es el mismo negocio que se investigó, no el tocayo de comedia ni el de Tlalnepantla).

---

## 0. LO QUE DE VERDAD HAY DE FOTOS (léelo antes que nada)

Vi con Read las 15 imágenes de `research/fotos/`. El inventario real es MUCHO más pobre de lo que sugiere `FOTOS.md`:

| Archivo | Qué es de verdad | Píxeles útiles | Se puede |
|---|---|---|---|
| `logo-standup-transparente-web.png` | Logo oficial, PNG transparente limpio, con bajada "Proyección de Marcas, Diseñando Espacios." | 1043 × 642 | SÍ, sin tocar |
| `real-stand-newmi-universidad-web-hero.png` | Stand de Newmi Universidad **recortado sobre blanco** (no hay persona atendiendo, `FOTOS.md` se equivoca ahí). Sirve como OBJETO recortado | el stand ocupa ~640 × 490 dentro del lienzo | SÍ, como objeto recortado sobre lienzo oscuro. NO a sangre |
| `render-portada-lapisa-todoterreno-fb-cover.jpg` | Portada de Facebook: **render 3D** de un stand para Lapisa Agrícola / Todo Terreno + lema quemado con errata ("TUMARCA") + teléfono quemado | el render limpio mide ~960 × 415 | SÍ, **solo el recorte del render**, etiquetado "Propuesta 3D" |
| Las 11 de `real-stand-*-ebesa2025.jpg` | **NO son fotos: son tarjetas de post de redes.** Fondo borroso, marco de color, texto quemado (nombre del cliente + "EBESA 2025" + ciudad), logo Stand Up y el WhatsApp en letras gigantes abajo | la foto real va metida en un recuadrito de ~285 × 315 (las de 512×640) o ~240 × 245 (las de 414×414) | Solo recortando el recuadro interior. Quedan CHICAS |

**Consecuencia dura para el que construye:** esta página NO puede tener una foto a sangre de 60 svh salvo el objeto recortado del hero. Ninguna foto de EBESA aguanta más de ~165 px de ancho en celular. Por eso la página se sostiene con **planos dibujados, tipografía y el objeto recortado**, no con fotos grandes. No se rellena con IA, no se rellena con los renders genéricos de su galería (son cajas blancas vacías, `servicios-precios.md`).

---

## 1. EL TRABAJO

Que el expositor que ya pagó su metro cuadrado en una feria de Aguascalientes mande el WhatsApp con su **medida y su fecha** para que Stand Up le cotice y le monte el stand.

No es presentar el negocio. No es "conocer la empresa". Es que llegue el mensaje "necesito un 3×3 esquina para EBESA, 4 de octubre".

---

## 2. LA PROMESA

> **Los stands de Venofye, Elixderm, Dabalash y otros seis expositores de EBESA 2025 se diseñaron, se armaron y se montaron aquí, en Av. Tecnológico 401.**

Sale de `hechos.md` §5 y de `FOTOS.md`: diez clientes reales identificados con nombre y apellido en la feria EBESA 2025 (Expo Belleza Salud Aguascalientes, 9ª edición, Salón de Locomotoras, 4 y 5 de octubre de 2025). El de al lado no puede decir esa lista de nombres ni esa dirección.

Línea de apoyo, tal cual la escribe el negocio (portada de Facebook): *"Espacios que hablan por tu marca."* Se usa una sola vez, en el cierre. **No se corrige la errata del render, se corrige en el texto de la página.**

---

## 3. EL MOMENTO FIRMA

**"Del plano al 3D."** Va en la sección 3.

Qué pasa, cuadro por cuadro:
1. Entra en pantalla, sobre el lienzo navy, un **plano en planta dibujado en SVG** de un 6×3 Cabecera: rectángulo de 6 × 3 a escala real sobre una retícula de módulos de 1 m, con la cota "6.00" arriba y "3.00" al costado en `tabular-nums`, y la pared de cabecera marcada con trazo lleno verde `#51913D` de 1.5 px. Etiqueta chica arriba: `01 / PLANTA · 6×3 CABECERA`.
2. Al seguir bajando, el plano **se inclina y se levanta**: el rectángulo pasa de planta a volumen (rotación en X de 0 a 62 grados más una extrusión de las paredes con `scaleY` desde la base). Sin pin. Ligado al scroll con `scrub: .5`, tramo corto, **reversible**: si subes, el volumen se vuelve a acostar en planta.
3. Cuando el volumen queda de pie, hace **cross-fade de 320 ms** con el recorte limpio de **`render-portada-lapisa-todoterreno-fb-cover.jpg`** (solo el render del stand de Lapisa Agrícola / Todo Terreno, recorte aproximado x 470 a 1430, y 130 a 545; **fuera el lema quemado y fuera el teléfono quemado**). El render entra dentro del marco de placa (ver §5), con la etiqueta honesta `PROPUESTA 3D · LAPISA AGRÍCOLA` pegada abajo a la izquierda.
4. Debajo, tres palabras y el link: **"Así lo ves antes."** + link de contorno con flecha `VER LAS MEDIDAS`.

Duración total del tramo animado: **1.2 s máximo**. Sin pin, sin scroll eterno. Blindaje: el CSS base deja el render y el texto YA visibles; la animación solo se enciende con `@media (scripting: enabled) and (prefers-reduced-motion: no-preference)` más el `setTimeout(1600)` del kit. **No quites la red de seguridad.**

Por qué vende: es literalmente lo que compra el cliente de un stand, ver cómo va a quedar antes de pagarlo. Y es lo único que este negocio tiene en grande y limpio.

---

## 4. EL COMPONENTE FIRMA

### "Planta que se levanta" (catálogo de planos a escala sobre el piso de la feria)

**No está en `COMPONENTES-USADOS.md`** (ahí hay cámara walk-in, cinta métrica, antes/después, rotador collage, menú de mesa, secuencia de tarde, letrero que se enciende, dos rollos, wizard de kilo, cotizador de 3 pasos, pase de abordar, jalador de vidrio y piso de mosaicos). Ninguno es éste.

Qué es: el catálogo no tiene fotos, tiene **planos**. Cada una de las 15 medidas reales de su propio catálogo se dibuja en SVG como planta a escala sobre una retícula de módulos de 1 m (el piso de la feria):

- **Cajón** = tres paredes cerradas, un lado abierto.
- **Esquina** = dos paredes, esquina abierta.
- **Cabecera** = una pared o isla, tres lados abiertos.
- El trazo lleno verde marca pared; el trazo punteado marca lado abierto. Un solo grosor: 1.5 px.
- Todas las plantas del catálogo comparten la MISMA escala, así que un 6×3 se ve el doble de largo que un 3×3 y se entiende de un vistazo.

Al tocar una tarjeta, la planta **se levanta en volumen** (la misma mecánica del momento firma, 420 ms, reversible al soltar) y aparece la cota en metros. Es la única tarjeta del sitio que se mueve.

De dónde sale: del oficio. Ellos venden metros cuadrados de piso convertidos en paredes. Y del logo: "Stand up" es literalmente ponerse de pie, que es lo que hace la planta.

---

## 5. HEADER Y FORMAS PROPIAS

### Color (de `research/colores.md`, medidos con cuentagotas sobre el logo y la portada)

| Token | Hex | Origen |
|---|---|---|
| `--deep` (lienzo de toda la página) | `#122533` | azul marino del lema en la portada de Facebook |
| `--deep-2` (bandas más hondas, pie) | `#0C1822` | derivado, un paso más oscuro del mismo navy |
| `--brand` (verde de marca: navegación, "+ Agregar", trazos, cotas) | `#51913D` | verde del logo oficial |
| `--brand-dim` (hover, líneas al 22 %) | `#2E5A25` | verde secundario del degradado del logo |
| `--paper` (banda tipo placa, solo para leer: reseñas y formulario) | `#EFF2EC` | derivado del blanco `#FFFFFF` de sus fichas, con tinte verde. **Nunca `#fff` plano** |
| `--wa` / `--wa-ink` | `#25d366` / `#0b3d1f` | solo WhatsApp |

Una sola temperatura: fría, corporativa. **No aplican los tonos tierra, ámbar ni crema del resto del catálogo KREVO** (lo dice `colores.md`: es marca B2B de eventos).

### Tipografía

- Títulos: **Archivo variable, `wdth` 118 a 125, `wght` 800**, mayúsculas, `letter-spacing` 0 a .01em. Extendida negra, que es lo que la skill manda para industria y montaje, y no compite con el logo redondeado.
- Texto: **Instrument Sans** 400/500.
- Medidas, cotas y metros: siempre `font-variant-numeric: tabular-nums`.
- Acento redondeado tipo Baloo 2 / Quicksand: **solo** en las etiquetas de medida de las plantas (11 px), para guiñarle al logo. En ningún párrafo.
- Prohibida Inter, Poppins, Montserrat. Nada manuscrito ni sticker: le vende a otras marcas.

### Header (propio de este sitio, no se parece a ninguna otra muestra)

- Altura 64 px en celular, 72 px en compu. **Transparente sobre el hero**, sólido `#122533` con blur al pasar 40 px.
- **Logo a la izquierda, 132 px de ancho**, versión transparente completa con su bajada. Nunca recortado.
- A la derecha, una sola acción de texto: `MEDIDAS` en mayúsculas espaciadas (.14em), color `--brand`, sin caja. Junto a ella, la hamburguesa dibujada como **tres barras de anchos distintos** (100 %, 72 %, 100 %), que es la silueta de un panel Octanorm con su entrepaño. Sin círculo, sin caja.
- **Hairline verde de 1 px** al 30 % pegada al borde inferior del header, a todo lo ancho. Es la línea del piso.
- **Cómo se compacta al bajar:** a los 40 px el header baja de 64 a 48 px y el logo completo hace cross-fade (200 ms) al **solo círculo verde del "up"** recortado del logo, alineado a la izquierda. Al mismo tiempo la hairline crece a 2 px y se vuelve barra de avance de lectura. Lectura: el logo "se queda de pie" aunque todo lo demás se encoja.
- Menú: panel completo en celular, con los links numerados `01` a `06` en Archivo 800 y las 15 medidas como submenú en dos columnas de 44 px. Pie del panel con WhatsApp y Llamar. Foco atrapado, `Escape`, `history.pushState`.
- **En el header NO hay botón verde.**

### Lenguaje de formas

- **Radio 0 en todo lo estructural** (tarjetas, marcos, campos, chips, botones de navegación): un stand es de paneles rectos. Única excepción con curva: el **botón flotante de WhatsApp, círculo perfecto**, que cita el círculo del "up" del logo. Un solo círculo en toda la página.
- **Marco de placa de expositor** para cualquier foto: paspartú sólido `--paper` de 10 px + línea exterior de 1 px `rgba(81,145,61,.35)`. Toda foto va enmarcada. **Ninguna foto va a sangre.**
- **Divisores:** hairline de 1 px `#51913D` al 22 %, con 24 px de aire arriba y abajo. **Jamás una banda de color entre secciones.**
- **Retícula de módulo de 1 m** como único motivo gráfico de la página: líneas de 1 px al 8 % de opacidad, presente de fondo en el hero, en el catálogo y en el momento firma. Un solo grosor de trazo en todo el sitio: 1 a 1.5 px.
- Cotas: línea de 1 px con topes en T en los extremos y el número en tabular. Es cota de plano, **NO es cinta métrica**.

---

## 6. LAS SECCIONES (6, y ninguna más)

### 1. HERO: "Te lo entregamos de pie"

**Razón de venta:** en 3 segundos deja claro que venden el stand armado, con su medida y su dirección, y manda al catálogo.
**Foto grande:** `real-stand-newmi-universidad-web-hero.png`, recortado al stand (aprox. 640 × 490), fondo blanco eliminado, **como objeto recortado flotando sobre el lienzo navy**, con sombra de contacto suave en el piso de retícula. Ocupa 78 % del ancho en celular. NO a sangre, NO en marco: es un recorte.
**Texto clave:**

- H1 a dos tonos, tres renglones, cada renglón en su `span` con `nowrap`:
  `TE RENTAN 3 × 3` / `DE PISO VACÍO.` / **`TE LO ENTREGAMOS DE PIE.`** (último renglón en `--brand`)
- Línea de apoyo (máximo 14 palabras): `Diseño, renta y montaje de stands. Av. Tecnológico 401, Aguascalientes.`
- Eyebrow (la rayita se DIBUJA en CSS con un `::before` de 18 px y 1 px de alto en `--brand`, nunca con un guion largo tecleado): `AGUASCALIENTES · DESDE AV. TECNOLÓGICO 401`
- CTA primario en `--brand`, rectangular, mayúsculas espaciadas: `VER LAS 15 MEDIDAS`
- CTA secundario de contorno: `LO DE EBESA 2025`
- **Sin verde en esta sección.**

Motion: el objeto recortado entra desde abajo 24 px con opacidad, 700 ms `expo.out`, una vez; el H1 por máscara, 60 ms por palabra. Nada más.

---

### 2. EL CATÁLOGO A LA VISTA: "Las 15 medidas que arman"

**Razón de venta:** es el producto. Justo después del hero, sin esconderse detrás de ningún botón. El visitante elige medida y forma, lo agrega y lo manda por WhatsApp. Aquí nace el mensaje.
**Foto grande:** **NINGUNA. No existe una sola foto real de ninguna de estas medidas** (la galería de su propio sitio son renders genéricos vacíos, `servicios-precios.md`). El visual de esta sección son **las plantas SVG a escala**, no fotos. No se inventa ni se rellena.
**Texto clave:**

- Título a dos tonos: `NO VENDEMOS METROS.` / **`VENDEMOS PAREDES.`**
- Chips de filtro pegados arriba, rectangulares, sin píldora: `3×2` · `3×3` · `6×3` · `ESPECIALES`
- Rejilla de 2 columnas en celular, 3 en 1440. Las **15 tarjetas con el nombre EXACTO de su catálogo**, sin tocarle una letra:
  3×2 Cajón Octanorm · 3×2 Esquina Octanorm · 3×3 Cabecera Custom · 3×3 Cabecera Octanorm · 3×3 Cajón Custom · 3×3 Cajón Octanorm · 3×3 Esquina Custom · 3×3 Esquina Octanorm · 6×3 Cabecera Custom · 6×3 Cabecera Octanorm · 6×3 Cajón Custom · 6×3 Cajón Octanorm · 6×3 Esquina Custom · 6×3 Esquina Octanorm · Medidas Especiales
- Cada tarjeta: planta SVG a escala + nombre + sello de sistema (`OCTANORM` o `CUSTOM`) + **`Pregunta el precio`** (jamás "$0", jamás una cifra) + botón `+ AGREGAR` en `--brand`.
- Barra fija al agregar: `Mi cotización · 3` en `--brand`.
- **Hoja (sheet):** solo el carrito y el cierre. Lista de lo agregado, campo de fecha de feria, campo de nombre de la feria, total que dice literal **"te lo confirmamos por WhatsApp"**, y **un solo botón verde** `ENVIAR MI COTIZACIÓN` que arma el mensaje.

Motion: al tocar una tarjeta, la planta se levanta en volumen 420 ms, reversible. Nada más se mueve.

---

### 3. MOMENTO FIRMA: "Del plano al 3D"

**Razón de venta:** quita el miedo de comprar algo que todavía no existe. Es lo que convierte una cotización en un anticipo.
**Foto grande:** `render-portada-lapisa-todoterreno-fb-cover.jpg`, **recorte limpio del render** (aprox. x 470 a 1430, y 130 a 545), dentro del marco de placa, con la etiqueta visible `PROPUESTA 3D · LAPISA AGRÍCOLA`. Sin el lema quemado, sin el teléfono quemado.
**Texto clave:**

- Etiqueta de escena: `01 / PLANTA · 6×3 CABECERA` → cambia en su lugar a `02 / PROPUESTA 3D`
- Tres palabras bajo el marco: **`Así lo ves antes.`**
- Link de contorno con flecha: `VER LAS MEDIDAS`
- **Sin párrafo. Sin botón verde.**

Ver §3 para la mecánica exacta.

---

### 4. EBESA 2025: "Quién abrió con nosotros"

**Razón de venta:** la prueba. Diez marcas con nombre, una feria con fecha y lugar verificables, y dos reseñas reales que dicen justo lo que un expositor con fecha encima necesita oír.
**Foto grande:** **NO hay ninguna que aguante tamaño grande.** Van **tres fotos chicas y nada más** (el tope de la regla), las de mejor resolución, recortadas SOLO al recuadro interior de la tarjeta (fuera el texto quemado, fuera el logo sobrepuesto, fuera la franja del WhatsApp), cada una en marco de placa, a máximo **165 px de ancho en celular** y pasadas antes por `~/Prospeccion-Web-Ags/tools/realesrgan` a ×2:

1. `real-stand-venofye-ebesa2025-b.jpg` (recorte interior aprox. x 105 a 390, y 250 a 565)
2. `real-stand-chemisette-ebesa2025.jpg` (mismo criterio)
3. `real-stand-xelha-haircare-ebesa2025.jpg` (mismo criterio)

Si al ver la hoja de contacto a 390 @2x alguna se ve suave, se baja a 140 px. **No se sube ninguna de las 414 × 414.**

**Texto clave:**

- Eyebrow (misma rayita de CSS, nunca guion largo tecleado): `SALÓN DE LOCOMOTORAS · 4 Y 5 DE OCTUBRE DE 2025`
- Título a dos tonos: `DIEZ STANDS DE EBESA 2025` / **`SALIERON DE AQUÍ.`**
- **Pase de lista tipográfico** (catálogo tipográfico, los diez nombres en Archivo 800, uno por renglón, sin foto, sin ícono, sin tarjeta): Venofye · Elixderm · Dabalash · Chemisette · Xel-Há Hair Care · Fajas Colombianas · Natural Slim · Natural Yee · Extensiones Díaz · Papas Barber
- Banda `--paper` con **las reseñas reales de Google** (`resenas.md`), nombre y estrellitas, textual, sin contador inventado. Rótulo: `4.8 en Google · 6 opiniones`. Van estas dos:
  - **Gabriela Pedroza** ★★★★★ · *"Excelente atención y muy buena calidad en todos sus servicios... entregas a tiempo!"*
  - **eunis** ★★★★★ · *"Excelente servicio, entregas a tiempo, respetuosos, con una energía positiva, súper creativos y amables"*
- **Sin párrafo propio. Sin botón verde.**

---

### 5. LA FECHA: "Tu feria ya tiene día"

**Razón de venta:** es el cierre real de este giro. Una feria tiene fecha fija y el expositor que la trae encima manda el mensaje ahí mismo. Captura lo único que Stand Up necesita para cotizar: medida, fecha y giro.
**Foto grande:** ninguna. Banda `--paper` tipo placa, para leer y escribir.
**Texto clave:**

- Título a dos tonos, corto: `TU FERIA TIENE FECHA.` / **`NOSOTROS TAMBIÉN.`**
- Tres campos rectangulares y nada más: `Medida` (se precarga con lo que ya agregó del catálogo) · `Fecha de montaje` · `Nombre de la feria o del evento`
- **Un solo botón verde** `MANDAR POR WHATSAPP` con el glifo oficial, que arma el mensaje al 449 457 9759.
- Bajo el botón, en 13 px: `Lun a vie, 9:00 a 18:00 h.` (horario verificado, `hechos.md`)
- **Sin eyebrow, sin párrafo.**

---

### 6. VISÍTANOS, TODO LISTO PARA COMPLETAR Y CIERRE

**Razón de venta:** cierra la confianza (dirección física real, horario, mapa) y le vende al dueño el siguiente paso del trato.
**Foto grande:** ninguna disponible. **No hay ni una foto de la fachada, del taller, ni del equipo** (`FOTOS.md`). En su lugar va el **momento de logo**: `logo-standup-transparente-web.png` a más del 60 % del ancho de pantalla sobre el navy, completo con su bajada. En el hueco de la fachada va un **marcador honesto**: recuadro con marco y la leyenda `Fotografía de la fachada de Av. Tecnológico 401: se solicitará al cliente.` Sin imagen de relleno, sin IA.
**Texto clave:**

- Bloque Visítanos: `Av. Tecnológico #401, Col. Solidaridad 1, Aguascalientes, Ags.` · `Lun a vie, 9:00 a 18:00 h.` · link `CÓMO LLEGAR` (Google Maps, plus code VQ92+WR) · link `LLAMAR`. Botones de navegación en `--brand`, no verdes.
- Banda `--paper` **"Todo listo para completar"**, con la lista de lo que falta del dueño (ver §9), encabezada: `Lo que necesitamos de ti para publicarla.`
- Cierre: logo grande + la frase que ellos mismos escriben, una sola vez en toda la página: **`Espacios que hablan por tu marca.`**
- Pie: redes reales con **logotipo SVG de 44 px**: Facebook `facebook.com/StandUpAguascalientes`, Instagram `@standupdiseno`, WhatsApp `449 457 9759`, correo `impresos@standupdiseno.com`, sitio `standupdiseno.com`.
- Flotante: círculo verde de WhatsApp, siempre.

---

## 7. EL RITMO

**Alto total en celular: menos de 9,000 px. Seis secciones, ni una más.**

Secciones que **NO** llevan el patrón eyebrow → título → párrafo → botón:

- **Sección 2 (catálogo):** chips + rejilla de plantas. Sin párrafo. Un solo CTA por grupo, más el "+ Agregar" por tarjeta.
- **Sección 3 (momento firma):** solo la etiqueta de escena, tres palabras y un link con flecha. Sin eyebrow, sin párrafo, sin botón.
- **Sección 4 (EBESA):** pase de lista tipográfico + citas reales. Sin párrafo propio, sin botón.
- **Sección 5 (la fecha):** banda de formulario. Sin eyebrow, sin párrafo.

Solo las secciones **1** y **6** se acercan al patrón, y **nunca van seguidas**. Entre ellas hay cuatro secciones de otro ritmo. Máximo dos escenas de imagen seguidas: entre la 3 (render) y la 4 (tres fotitos) entra el pase de lista tipográfico como pausa.

**Botones verdes en toda la página: exactamente 3.** El de la hoja del carrito, el de la sección 5, y el flotante. Todo lo demás navega en `--brand` o es link con flecha.

---

## 8. LO QUE NO VA

1. **Ninguna foto a sangre.** Ninguna imagen de `research/fotos/` aguanta 390 @2x a ancho completo, salvo el objeto recortado del hero (que no es a sangre, es recorte sobre el lienzo).
2. **Las 11 tarjetas de EBESA tal como vienen.** Traen texto quemado, logo sobrepuesto y el WhatsApp en letras gigantes. Solo se usa el recuadro interior, y solo de tres de ellas.
3. **Ninguna de las fotos de 414 × 414.** Se ven borrosas a cualquier tamaño útil.
4. **Higgsfield, imagen de IA, video de IA.** Cero, sin excepción.
5. **`hero_video.py`.** No hay material que aguante un loop: las fotos son chicas y llevan marca de agua.
6. **Los renders de su galería (`standupdiseno.com/GALERIA`).** Son cajas blancas genéricas vacías, sin cliente. No prueban nada.
7. **Cinta de medir.** Este negocio mide, pero la cinta ya es el componente firma de Closet&Door. Aquí se mide con **cota de plano**.
8. **Cortina de color entre secciones.** Los cortes son hairline verde al 22 %, nada más.
9. **Fila de contadores** ("10 clientes · 12 años · 140 expositores"). Los 140 expositores y los 7,000 visitantes son de la feria, no del negocio, y no se le cuelgan.
10. **El "2013".** Sale de un directorio de LinkedIn, no de la empresa. **No aparece en la página** hasta que el dueño lo confirme.
11. **Cualquier precio, rango o "desde $X".** No existe ni uno público. Siempre "Pregunta el precio" y "te lo confirmamos por WhatsApp".
12. **Reseñas de Facebook.** El "94 % de 8 opiniones" no se puede leer ni citar. No va.
13. **La errata "TUMARCA"** del render. En la página el lema se escribe bien: "Espacios que hablan por tu marca."
14. **Rejilla de tarjetas iguales con ícono**, contadores, píldoras, emojis como íconos, guiones largos, Inter, Poppins, Montserrat, fondo blanco plano, fondo negro puro.
15. **Palabras prohibidas en títulos y subtítulos:** calidad, servicio, tu mejor opción, experiencia única, todo en un lugar, sin vueltas, lo hacemos posible.
16. **Sección "Quiénes somos" con cara humana.** No hay una sola foto del dueño ni del equipo. No se inventa, se pide.
17. **Decir que el stand de Newmi es una foto de montaje.** Es un recorte sobre blanco y no está confirmado si es foto o render: se usa como objeto, sin afirmarlo.
18. **Tocar `_kit/`, `closetdoor/`, `lamexico/`, `grupo-v/`, `la-gloria-sma/` ni ninguna otra muestra.** Y **no se cierra** `http://localhost:8770/`.

---

## 9. PENDIENTE-DUEÑO

Va en `stand-up-ags/PENDIENTE-DUENO.md`. Encabezar con el punto 0.

0. **Identidad confirmada, no hay cruce:** el WhatsApp de la ficha, **449 457 9759, sí es de este negocio**, Stand Up / Stand Up Diseño de Av. Tecnológico 401, Aguascalientes (coincide en su web, la portada de Facebook y LinkedIn). **La muestra va para este mismo negocio que se investigó.** Los tocayos quedan descartados: "Stand Up Comedy Aguascalientes" (show de comedia, sin relación) y **"Stand Up Innovación & Diseño, S.A. de C.V."** de Tlalnepantla, Estado de México (mismo giro, nombre casi idéntico, otra ciudad).
1. ¿Tiene alguna relación con "Stand Up Innovación & Diseño S.A. de C.V." de Tlalnepantla (franquicia, mismo dueño), o es pura coincidencia de nombre?
2. **Fotos originales sin comprimir y sin marca de agua de los stands de EBESA 2025.** Es lo más urgente: hoy solo existen las tarjetas de redes de 414 px y la página no puede enseñar el trabajo en grande.
3. **Foto real de cada medida** (3×2 cajón, 3×3 esquina, 6×3 cabecera). Hoy el catálogo va con planos dibujados porque no hay ni una foto por medida.
4. **Foto de la fachada de Av. Tecnológico 401**, con el letrero completo.
5. **Foto del taller y del equipo montando**, y una del dueño. No existe ninguna cara detrás del logo.
6. ¿La imagen del stand de **Newmi Universidad** es foto de un montaje real o render 3D? Cambia cómo se rotula en el hero. Y si es foto, la original en grande.
7. **Año de fundación.** El "2013" solo lo dice LinkedIn. ¿Es correcto?
8. **Nombre del dueño o fundador** y la historia del negocio, aunque sean tres renglones.
9. **Código postal correcto:** 20196 (su web y Google Maps) o 20190 (Facebook).
10. ¿Venden **impresión** como servicio aparte? El correo es `impresos@standupdiseno.com` pero no aparece en sus servicios.
11. **Rango de precio o precio de arranque** de al menos las medidas más pedidas, aunque sea "desde". Hoy no hay ni una cifra pública y el catálogo va todo con "Pregunta el precio".
12. **Tiempos reales**: ¿con cuántos días de anticipación necesitan el pedido antes de la feria? Es el dato que más ayuda al botón de la sección 5.
13. ¿Cubren ferias **fuera de Aguascalientes**?
14. **Link de cobro o anticipo** (tarjeta en línea), para activar el e-commerce de la muestra.
15. **Nombre exacto de la tipografía del logo.** No viene en ningún metadato.
