# Everclean Ags · Hoja de dirección (20 sep 2026)

Manda sobre cualquier costumbre de las otras muestras. Todo dato duro sale de `research/`. Lo que no esté ahí, no va a la página: se anota en `PENDIENTE-DUENO.md`.

Aviso de arranque para quien construye: **limpio-suprime es del mismo giro y es del socio.** De ahí se copia SOLO la mecánica (`build.py`, `template.html`, `site.js`, blindaje, hamburguesa, flotante). El look tiene que ser el contrario: ellos son burbujas, círculos, verde petróleo y lino; nosotros somos rectángulos, arco y costura, azul marino y cian. **No se abre ni se edita nada dentro de `limpio-suprime/`.**

---

## 1. EL TRABAJO

Que el visitante junte en una lista las piezas que quiere lavar (sala, colchón, sillas, tapete, auto, carriola, cama de perro) y **aparte la visita a domicilio por WhatsApp a UN solo número: 449 192 5369**, sin haber tenido que preguntar "¿ustedes hacen X?" ni "¿a cuál número le marco?".

Todo lo que no empuje a eso, sobra. La página existe porque hoy el cliente tiene que adivinar entre 3 números publicados y escribir a mano lo que quiere lavar (`VENDE.md` punto 2).

## 2. LA PROMESA

> **"Trabajamos los domingos. Y el domicilio es gratis."**

Las dos mitades son texto literal de ellos: "¡Trabajamos los Domingos!" (publicación de Instagram, mayo 2025, `hechos.md`) y "Servicio a domicilio GRATIS" (sello rojo repetido en sus flyers, `servicios-precios.md`). El de al lado no la puede decir: Deep Clean, Powe Clean e Hidro Clean no publican ninguna de las dos.

Soporte de la promesa (también literal de su flyer, `relleno_flyer-servicios-contacto_fb.jpg`): "Personal capacitado y confiable" y "Productos de limpieza ecológicos". Esas dos frases van una sola vez, en la sección 6, entre comillas.

**Prohibido decir**: años de experiencia, número de clientes, "líderes", "empresa familiar", estrellas de Google. Nada de eso existe.

## 3. EL MOMENTO FIRMA

**"El par que embona"**, en la sección 3 (`30-pruebas`).

Qué pasa: sus fotos reales son físicamente dípticos, dos fotos pegadas por una plantilla. La página **las despega y las vuelve a juntar frente al visitante**. La mitad "antes" entra desde la izquierda y la mitad "después" desde la derecha, las dos llegan al mismo marco y **embonan** con un golpe seco; en la costura queda prendida una línea cian de 1.5 px que se apaga a los 400 ms y deja la costura fina permanente. Debajo, un pie chico: "Sala seccional. Antes y después, foto de ellos."

Con qué foto: **`catalogo_sofa-seccional-antes-despues_fb.jpg`** (414x414, el sofá en L, el mismo mueble en las dos mitades). Se corta en dos piezas y se recortan los textos quemados:
- mitad ANTES: `y 0-207`, recortando la etiqueta "ANTES" de la esquina superior izquierda.
- mitad DESPUÉS: `y 207-414`, recortando la etiqueta "DESPUÉS" de la izquierda y el logotipo de la derecha.

Cómo se dispara: IntersectionObserver con `rootMargin: 0 0 -25% 0` sobre el marco. Timeline GSAP de **0.9 s** (`--ease-out`, `cubic-bezier(.23,1,.32,1)`), las dos mitades entran con `transform: translateX(±14%)` + `opacity`, nada más. **Reversible**: al salir de pantalla vuelven a separarse; al volver a entrar, embonan otra vez. **Sin pin, sin scrub, sin scroll eterno.** Blindaje obligatorio: el CSS base ya tiene las dos mitades embonadas y visibles; el `setTimeout(1600)` fuerza el estado final aunque GSAP no cargue.

Se repite 2 veces más en la misma sección, escalonado 180 ms, con los otros dos pares reales (silla de metal y sillas turquesa). Tres embones en total en toda la página y en ninguna otra sección.

## 4. EL COMPONENTE FIRMA

**"El par que embona"** (mismo mecanismo de arriba, registrado como componente).

No está en `COMPONENTES-USADOS.md`: no es el antes/después de barra que arrastras de closetdoor, no es la pasada del jalador de limpio-suprime, no es tercia, no es lupa, no es rotador. Sale del negocio de verdad: **el 100% del material que Everclean tiene son fotos partidas a la mitad**, y el gesto de la página es juntarlas.

Regla dura del componente: **no se arrastra, no tiene manija, no tiene barra.** Si alguien le pone un `input type=range` encima, se convirtió en el componente de closetdoor y truena la prueba.

Después de que Emanuel apruebe esta hoja, se agrega el renglón a `COMPONENTES-USADOS.md`: `| everclean-ags | El par que embona (las dos mitades de su foto real se juntan y dejan costura) | 20 sep 2026 |`. Esta hoja no lo escribe.

## 5. HEADER Y FORMAS PROPIAS

### De dónde sale
El logotipo de Everclean es **una ola / swoosh azul que va de marino a cian, con 3 destellos de 4 puntas**. Ese arco es el único motivo gráfico de la página. Lo demás es rectangular y recto, a propósito: el opuesto exacto de las burbujas de limpio-suprime.

### Header: "LA OLA QUE SE PLANCHA"
- Banda de 64 px (56 en celular) en marino sólido `#00002D`. **Su borde inferior no es recto: es un arco suave** (SVG `path` de una sola curva, caída de 14 px al centro), la misma ola del logo.
- Izquierda: el logotipo real dentro de un **chip blanco rectangular** de 128x40 px (radio 0). Va en chip porque el archivo que hay es JPG sobre fondo gris claro y no se puede poner directo sobre marino. Se pide el original.
- Derecha: **un solo botón**, fino, rectangular, en color de marca cian: `COTIZAR` (mayúsculas, `letter-spacing: .14em`, 12 px, alto 40 px, radio 0, borde 1 px). **Nada verde en el header.** Junto a él, la hamburguesa con la palabra `MENÚ`.
- **Cómo se compacta**: al pasar 40 px de scroll la banda baja de 64 a 48 px y **el arco se plancha**: la curva se vuelve una línea recta cian de 2 px (la costura). Transición 240 ms `--ease-out`, reversible al subir. Ese es todo el truco del header y no aparece en ninguna otra muestra.
- En compu, al centro, links en texto simple: `QUÉ LAVAMOS` · `PRUEBAS` · `APARTAR VISITA`.
- Menú: panel completo marino con los 9 tipos de pieza; tocar uno agrega esa pieza a "Mi visita" y baja al catálogo.

### Lenguaje de formas: ARCO Y COSTURA
- **Radios: 0 en todo.** Botones, tarjetas, marcos, chips, campos: esquinas rectas. El único elemento curvo de la página es el arco de la ola (header, un divisor y el pie).
- **Marco de foto (así se ven TODAS las fotos)**: montura marino claro de 10 px + **costura cian de 1 px metida 6 px hacia adentro** + etiqueta abajo a la izquierda con el nombre de la pieza en mayúsculas espaciadas de 11 px. Nunca foto a sangre, nunca foto sin marco.
- **Divisor**: el arco de la ola en SVG, trazo 1.5 px cian, 40 px de caída, una sola vez entre la sección 4 y la 5. En los demás cortes, nada: el cambio de fondo hace el trabajo.
- Un solo grosor de trazo en toda la página: **1.5 px**.
- Los 3 destellos de 4 puntas del logo: se usan **una sola vez**, en el momento en que embona el primer par. No se riegan por la página.

### Color (hexadecimal, de `colores.md`)
| Token | Hex | Para qué |
|---|---|---|
| `--tinta` | `#00002D` | Marino exacto del logo. Header, pie, texto sobre claro. |
| `--lienzo` | `#041233` | El mismo marino levantado, fondo general de la página. **Nada de blanco plano.** |
| `--marca` | `#1E96C3` | Cian del logo. Botones de navegar, costuras, segunda línea de los títulos. |
| `--bandera` | `#37648F` | Azul de sus flyers. Monturas de foto, bordes, superficies de tarjeta. |
| `--papel` | `#EEF3F7` | Banda clara tipo papel, SOLO en el bloque de apartar visita (sección 5) y en el carrito. |
| `--wa` | `#25D366` | Verde WhatsApp. Solo 2 usos en toda la página: el botón de enviar y el flotante. |

Una sola temperatura: fría. Nada de rosa ni magenta: eso venía de la plantilla del flyer, no es color de marca (`colores.md`).

### Tipografía
- Títulos: **Archivo** variable, `wdth` 120 a 125, peso 800 a 900, mayúsculas y caja mixta. Es la extendida negra que pide la skill para taller e industria y es lo más parecido al logotipo.
- Texto: **Instrument Sans** 400/500.
- **Prohibidas**: Inter, Montserrat y Poppins (aunque `colores.md` las mencione como parecido visual, la skill las veta).
- Escala hero celular `clamp(40px, 11.5vw, 60px)`, compu `clamp(64px, 6vw, 108px)`. Máximo 3 tamaños por pantalla.

---

## 6. LAS SECCIONES

7 secciones y pie. **Presupuesto duro en celular a 390 px: 8,900 px.** Si una sección se pasa, se recorta esa sección, no se recorta otra.

### 1 · `10-hero` (850 px)
**Razón de venta**: enganchar en 3 segundos con el único hecho que ningún competidor publica, y dejar el catálogo a un toque.

**Foto grande**: `hero-candidato_limpieza-vapor-sofa_ig.jpg`, recortada `x 95-368` (tira el logotipo marca de agua de la esquina) y pasada por Real-ESRGAN x4. Va en marco, sobre el marino, ocupando un bloque de 60 svh con la foto tope 370 px CSS de ancho. Se ve el vapor saliendo de la boquilla: eso es lo que venden.

**Texto**:
- Eyebrow: `AGUASCALIENTES · A DOMICILIO`
- Título (cae y pega, dos tonos, la última línea en cian):
  `Trabajamos los domingos.`
  `Y el domicilio es gratis.`
- Una línea: `Limpieza a vapor de salas, colchones, sillas, tapetes e interiores de auto. Llegamos a tu casa.`
- Botón 1 (cian, fino, rectangular): `VER QUÉ LAVAMOS`
- Botón 2 (texto con flecha): `Apartar visita`
- **Cero verde aquí.** Solo el flotante.

### 2 · `20-catalogo` (2,200 px) · EL CATÁLOGO A LA VISTA
**Razón de venta**: es el pleito que gana el negocio. Nadie más publica que lava carriolas, camas de perro e interiores de auto (`VENDE.md`). El visitante tiene que ver las 9 piezas sin tocar nada y poder agregarlas.

Va **pegado al hero**, estilo tienda: 2 columnas en celular, 3 en compu. Cada tarjeta: foto en marco, nombre, renglón de precio y un `+` **en cian** (no verde).

**Nunca `$0`.** Como no existe un solo precio público (`servicios-precios.md`), **todas** las tarjetas dicen `Pregunta el precio` en el renglón de precio, y el total del carrito dice `Te lo confirmamos por WhatsApp`.

**Fila A, las 3 que sí tienen foto real:**
| Pieza | Archivo | Recorte |
|---|---|---|
| Salas y sillones | `catalogo_sofa-seccional-antes-despues_fb.jpg` | mitad inferior (después), sin etiqueta ni logotipo |
| Colchones | `catalogo_colchon-limpio-despues_fb.jpg` | `y 70-330`, tira el logotipo de arriba y el "Cambios visibles" de abajo |
| Sillas | `catalogo_silla-metal-antes-despues_ig.jpg` | cuadrante superior derecho (la silla limpia), sin la etiqueta "Después" ni la caja del logotipo |

**Fila B, las 6 que no tienen foto**: van como renglones tipográficos grandes con su `+`, sin foto falsa y sin foto de IA. Cada renglón lleva un sello honesto chico: `Foto original pendiente`.
`Sofá cama` · `Tapetes y alfombras` · `Reposet / Love seat` · `Interiores de auto` · `Carriolas` · `Cama para perro`

Total: **9 piezas**, exactamente las 9 confirmadas en `servicios-precios.md`. Ni una más. El cuadrante de sillas turquesa de `catalogo_collage-sillas-antes-despues_ig.jpg` no abre tarjeta propia (no es un servicio aparte): se usa en la sección 3.

**Texto**:
- Título: `Nueve cosas` / `que lavamos a vapor.` (segunda línea cian)
- Sin eyebrow, sin párrafo, sin botón verde.
- Barra fija abajo cuando hay algo agregado: `MI VISITA · 3` en cian.

### 3 · `30-pruebas` (1,400 px) · MOMENTO FIRMA
**Razón de venta**: en limpieza no se vende la promesa, se vende la prueba. Es lo único que contesta "¿de verdad se le va la mancha a mi mueble?".

**Foto grande**: `catalogo_sofa-seccional-antes-despues_fb.jpg` partida en sus dos mitades reales (ver punto 3). Debajo, los otros dos pares, más chicos: `catalogo_silla-metal-antes-despues_ig.jpg` y `catalogo_collage-sillas-antes-despues_ig.jpg` (un cuadrante).

**Texto**:
- Título: `Esta sala no se cambió.` / `Se lavó.` (segunda línea cian)
- Pie por par, 6 palabras máximo: `Sala seccional. Foto de ellos, sin retoque.`
- **Sin eyebrow, sin párrafo, sin botón.** Solo los embones.

### 4 · `40-colchon` (900 px) · PAUSA TIPOGRÁFICA
**Razón de venta**: nombrar el miedo concreto que hace que alguien levante el teléfono. La foto del colchón manchado es el activo más fuerte que tienen.

**Foto grande**: `relleno_colchon-manchas-antes_ig.jpg`, recortada `y 170-640` (tira el sticker de ojos de caricatura y la palabra "Antes"). En marco, tope 180 px CSS de ancho: es de 360 px de origen y no aguanta más.

**Texto**:
- Título gigante: `Esa mancha del colchón.` / `Se va.` (segunda línea cian)
- **Sin eyebrow, sin párrafo, sin botón.** Un link con flecha: `Agregar colchón a mi visita`.

Después de esta sección va el único divisor de arco de la página.

### 5 · `50-visita` (1,500 px) · LA HERRAMIENTA
**Razón de venta**: EL TRABAJO. Aquí se convierte.

Banda clara `--papel` (única de la página, para poder leer y escribir). Compacta, sin pasos numerados gigantes:
1. Resumen de lo que agregó, editable (cantidades con `-` y `+` en cian). Si no agregó nada, arranca con un renglón vacío que dice `Elige arriba lo que quieres lavar`.
2. `¿En qué colonia o zona?` campo corto.
3. `¿Qué día?` fila de botones finos cian: `Entre semana` · `Sábado` · **`Domingo`** (marcado con la costura cian, porque es su diferenciador real).
4. Renglón de total: `Total: te lo confirmamos por WhatsApp`.
5. **Botón VERDE, el único de la página junto al flotante**: `MANDAR MI VISITA POR WHATSAPP`, alto 52 px, radio 0, glifo oficial, texto `#0b3d1f`.

Mensaje que arma (a `https://wa.me/524491925369?text=`):
`Hola Everclean, quiero apartar una visita a domicilio. Piezas: 1 sala seccional, 4 sillas de comedor, 1 colchón matrimonial. Zona: ___. Día: domingo. ¿Me pasan el precio?`

**Foto grande**: `hero-candidato_limpieza-exterior-sofa_ig.jpg` (360x640, Real-ESRGAN x4), en marco al lado del bloque en compu y arriba en celular. Es el sillón lavado en el patio de un cliente: eso es "vamos a tu casa".

**Texto**: Título `Junta todo` / `en una sola visita.` (segunda línea cian). Una línea: `Servicio a domicilio gratis.` Carrito en hoja (sheet) solo para editar cantidades.

### 6 · `60-recomiendan` (800 px)
**Razón de venta**: la única prueba social real que existe, sin inventarle nada.

**Sin estrellas.** Facebook no califica con estrellas 1 a 5, califica con "recomienda sí/no" (`resenas.md`). Poner estrellitas aquí sería inventar. Va así:
- Título: `Seis opiniones en Facebook.` / `Las seis recomiendan.` (segunda línea cian)
- Cita en bloque, en cian, tipografía grande: `"Muy buen servicio, puntualidad, amabilidad y sobre todo calidad en el servicio."` Firma: `Ccy Lop · Facebook · 14 de octubre de 2024`. (Va como cita textual entre comillas. **Nunca como título ni subtítulo**, porque trae palabras vetadas.)
- Debajo, 3 renglones cortos con sus frases literales del flyer, sin íconos y sin tarjetas: `Personal capacitado y confiable.` · `Productos de limpieza ecológicos.` · `Servicio a domicilio gratis.`
- **Sin eyebrow, sin botón.** Sin contadores, sin rejilla de tarjetas con ícono.

**Foto**: ninguna. Es la pausa.

### 7 · `70-completar` (700 px)
**Razón de venta**: vende el siguiente paso. Le enseña al dueño que la página ya está de pie y qué falta de su lado.

- Título: `Falta poco para abrirla.` / `Esto necesitamos.` (segunda línea cian)
- Lista corta, sin tarjetas: su tabla de precios por pieza, el número de WhatsApp bueno de los 3, las fotos originales de tapete, carriola, cama de perro, sofá cama e interior de auto, el logotipo en PNG o SVG, y el link de cobro con tarjeta.
- Un botón cian, fino: `MANDAR LO QUE FALTA` (abre WhatsApp al mismo número, con mensaje distinto).
- Renglón de honestidad al pie de la sección: `Muestra de diseño. Todas las fotos son de Everclean, tomadas de su Instagram y su Facebook.`

### Pie
- **Momento de logotipo**: el logo real en chip blanco de 280 px de ancho (el archivo de 610 px lo aguanta), con el arco de la ola debajo. Es el único momento en que el logo llena la pantalla.
- Un solo teléfono: **449 192 5369**, con `Llamar` y `WhatsApp`.
- Correo real: `everclean.aguascalientes@gmail.com`.
- **Redes reales, logotipo SVG de 44 px**: Instagram `instagram.com/everclean.ags` y Facebook `facebook.com/everclean1`.
- `Aguascalientes, Ags.` **Sin dirección, sin mapa y sin horario**: no existen confirmados.

---

## 7. EL RITMO

Nunca dos secciones seguidas con eyebrow, título, párrafo y botón. Marcado sección por sección:

| # | ¿Lleva el patrón? | Qué lleva en su lugar |
|---|---|---|
| 1 hero | Parecido, pero es el hero | Eyebrow + título 2 tonos + 1 línea + 1 botón cian + 1 link |
| 2 catálogo | **NO** | Sin eyebrow, sin párrafo. Rejilla de tienda + renglones tipográficos |
| 3 pruebas | **NO** | Sin eyebrow, sin párrafo, sin botón. Puro embone + pies de 6 palabras |
| 4 colchón | **NO** | Solo foto en marco + 4 palabras + link con flecha |
| 5 visita | Sí (es la herramienta) | Título + 1 línea + formulario + 1 botón verde |
| 6 recomiendan | **NO** | Cita en bloque + 3 renglones. Sin botón |
| 7 completar | Sí, corto | Título + lista + 1 botón cian |

Conteo de verdes en toda la página: **2** (el de mandar la visita y el flotante). Cian: navegar y agregar.

Fotos: **1 foto grande por sección** (1, 3, 4, 5), **máximo 3 chicas** por sección (2 y 3). Secciones 6 y 7 sin foto.

**Topes de ancho de foto (nadie los pasa; son de 360 a 640 px de origen):**
| Archivo | Origen | Celular @2x | Compu |
|---|---|---|---|
| `hero-candidato_limpieza-vapor-sofa` (x4) | 368 | 370 px | 520 px |
| `hero-candidato_limpieza-exterior-sofa` (x4) | 360 | 360 px | 480 px |
| `catalogo_sofa-seccional` (x4) | 414 | 414 px | 560 px |
| `catalogo_silla-metal` | 640 | 320 px | 320 px |
| `catalogo_collage-sillas` | 640 | 320 px | 320 px |
| `catalogo_colchon-limpio` | 414 | 207 px | 207 px |
| `relleno_colchon-manchas-antes` | 360 | 180 px | 180 px |
| `logo_everclean_extraido-flyer` | 610 | 280 px | 305 px |

Real-ESRGAN x4 **solo en esas 3 fotos clave**. Se cuenta como que duplica, no que cuadruplica: si al verla a 390 @2x se ve de plástico, se regresa al tamaño nativo y se achica el marco.

**Movimiento**: títulos que caen 40 px por renglón y pegan (700 a 900 ms). El embone, 0.9 s, 3 veces, solo en la sección 3. El planchado del arco del header, 240 ms. Nada más. Un beat por escena, nada pasa de 1.2 s.

---

## 8. LO QUE NO VA

1. **Nada de `limpio-suprime`**: ni burbujas, ni círculos, ni jalador, ni vidrio empañado, ni piso de mosaicos, ni verde petróleo, ni lino, ni amarillo, ni Gabarito, ni Figtree, ni radio 28. Si se parece, truena.
2. **Nada de barra de arrastrar antes/después** (es de closetdoor). El par embona solo, no se jala.
3. **`catalogo_collage-sala-loveseat-antes-despues_ig.jpg` queda DESCARTADA por completo.** Tiene la marca de agua **"PixVerse.ai"** visible en el cuadro de arriba a la derecha: es el mismo video de IA que `FOTOS.md` ya había excluido, sobrevivió dentro de ese collage. No se usa ni recortada.
4. **`catalogo_collage-sillas-comedor-antes-despues_fb.jpg` no se usa**: es el mismo collage que `catalogo_collage-sillas-antes-despues_ig.jpg` pero a 417 px en lugar de 640. Se queda el de 640.
5. **`relleno_infografia-servicios_ig.jpg` y `relleno_flyer-servicios-contacto_fb.jpg` no van en la página.** Son piezas de marketing con texto quemado; sirven solo de referencia de marca y de fuente de datos.
6. **Higgsfield, imágenes de IA y video de IA: no.** Tampoco `hero_video.py`: las fotos son de 360 a 640 px y un loop se vería borroso. Hero fijo.
7. **Ningún `$0` y ningún precio aproximado.** No hay un solo precio público. Siempre `Pregunta el precio`.
8. **Los 3 teléfonos no se publican.** Uno solo: 449 192 5369. Los otros dos se preguntan.
9. **Nada de estrellas, contadores, ni fila de datos** (4.8, 241 reseñas, años, clientes atendidos). No existen.
10. **Nada de Google Maps, dirección, "visítanos" ni horario semanal.** No tienen ficha de Google ni publican calle (`hechos.md`).
11. **Nada de "empresa familiar", "desde 2020", ni el nombre de Daniela Ortiz Briones.** Es una pista de LinkedIn sin confirmar.
12. **Nada de material de `everclean.com.ar`, de Culiacán, de CDMX ni de Colima.** Son tocayos, no este negocio.
13. Nada de cinta de medir, nada de cortinas de color entre secciones, nada de pin ni scroll eterno, nada de píldoras, nada de emojis como íconos, nada de guiones largos, nada de naranja.
14. Prohibido en títulos y subtítulos: calidad, servicio, tu mejor opción, experiencia única, todo en un lugar, sin vueltas, lo hacemos posible. (La reseña de Ccy Lop trae dos de esas palabras: va entre comillas como cita, nunca como título.)
15. Ninguna foto a sangre y ninguna foto sin marco. Todas son chicas.

---

## 9. PENDIENTE-DUEÑO

Va tal cual a `everclean-ags/PENDIENTE-DUENO.md`:

1. **Tabla de precios real por pieza**: sala 2 y 3 plazas, seccional, colchón individual, matrimonial, queen y king, silla de comedor, tapete por m2, reposet, love seat, sofá cama, interior de auto, carriola, cama de perro. ¿Cobra por pieza, por m2 o tarifa de visita?
2. **Cuál de los 3 números es el WhatsApp activo**: 449 192 5369, 449 118 67 53 o 449 118 09 33. Hoy los tres están publicados por ellos mismos.
3. **El "servicio a domicilio gratis": ¿siempre o es promoción?** Y hasta qué zonas de Aguascalientes llegan sin cobrar.
4. **Fotos originales, en grande y sin texto encima** de: tapete o alfombra, carriola, cama de perro, sofá cama, interior de auto y reposet. Hoy no existe ninguna. Las que hay son de 360 a 640 px bajadas de Instagram.
5. **El logotipo original en PNG o SVG con fondo transparente.** El que hay salió recortado de un flyer y se ve suave al ampliarlo.
6. **Horario real por día.** Facebook dice "Siempre abierto" e Instagram dice "Trabajamos los domingos": no se puede publicar un horario con eso.
7. **Capturas de las 5 opiniones restantes de Facebook** (o acceso de administrador). Solo 1 de las 6 se puede leer sin iniciar sesión.
8. **Dirección o al menos la zona desde donde salen**, para poder abrir su ficha de Google Business. Hoy no aparecen en Google y sus competidores sí (Deep Clean 4.8 con 241 reseñas).
9. **Link de cobro con tarjeta** (Mercado Pago, Clip o el que use), para el carrito.
10. **Quién es el dueño o responsable** y si Daniela Ortiz Briones sigue en el negocio.
11. **Año en que abrieron.**
12. Avisarle que el video del sofá beige y la imagen del 10 de mayo son de inteligencia artificial y que uno de sus collages trae la marca de agua de PixVerse: eso le resta credibilidad justo donde más la necesita.
