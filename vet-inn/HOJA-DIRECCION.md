# HOJA DE DIRECCION · Vet Inn Aguascalientes

Director de arte: KREVO. Fecha: 20 sep 2026.
Esta hoja manda sobre cualquier idea suelta. El que construye no inventa nada que no esté aquí o en `research/`.
Se compara directo contra la página que el socio hizo para Capuchino Centro Veterinario. Header, color y componente firma son distintos a los de él a propósito.

---

## 1. EL TRABAJO

Que la persona que tiene a su perro o a su gato malo **ahora** escriba al WhatsApp 449 220 2495 con el nombre de su mascota y lo que le pasa, y quede citada. Nada más. Todo lo que no empuje ese mensaje, sobra.

Segundo trabajo, gratis: que Vet Inn exista en Google con algo propio (su dominio se cayó, hoy solo tienen Facebook).

---

## 2. LA PROMESA

> **En Vet Inn la gente no pregunta por la clínica: pregunta por Alicia y por Luis. Llevan en Olivares Santana 311 desde el 16 de febrero de 2012, y una clienta cuenta que a una torsión gástrica de madrugada Alicia contestó de inmediato.**

De dónde sale, dato por dato:
- "Alicia" y "Luis" por nombre: reseñas de Veronica González y Stephanie Ratzek (`research/resenas.md`).
- 16 de febrero de 2012: fecha de fundación de Facebook (`research/hechos.md`).
- Olivares Santana 311, El Dorado, dentro de MH Mega Health: Google Maps + Facebook.
- La madrugada y la torsión gástrica: reseña textual de Stephanie Ratzek, 5 estrellas.

La veterinaria de al lado no puede decir ninguna de las cuatro. Por eso sirve.

**Candado legal y de honestidad (no se negocia):**
- Alicia y Luis se nombran **solo de pila**. Nada de apellidos, cédula profesional ni títulos puestos por nosotros. Si en la página aparece "la Doctora" o "Médicos Veterinarios", es **dentro de una cita textual entrecomillada de la reseña**, nunca en voz de la página.
- La página **no promete** urgencias 24 h, hospitalización, ni atención a peces/reptiles/aves. El horario publicado es el de Google (L-V 12:00–20:00, sáb 11:00–16:00, dom cerrado) y lo de la madrugada se cuenta **como lo cuenta la clienta**, entrecomillado y con su nombre.

---

## 3. EL MOMENTO FIRMA · "La luz de las doce"

**Sección:** 3 (Era pasada la medianoche).
**Foto real:** `research/fotos/vacuna-aplicacion-anaquel-farmacia-maps.jpg` (498×1024, vertical). Es la única toma nocturna de interior real que tenemos: luz fría de la clínica, mesa de acero, anaquel de medicamentos con su letrero escrito a mano "MEDICOS", dos pares de manos sosteniendo a un gatito negro sobre una toalla amarilla. Sin caras. **Va a Real-ESRGAN ×4** (queda en ~1992 px) antes de usarse a sangre.

**Qué pasa:** la foto entra ocupando el 100 % del ancho a 74 svh, casi apagada bajo un velo café oscuro `rgba(10,6,3,.78)`. Al entrar la sección, el velo **se retira de arriba hacia abajo** con `clip-path: inset()` ligado al scroll (`scrub: .5`), como si alguien encendiera la luz de la clínica, hasta quedar en `.12`. En el mismo recorrido, y con 90 ms de retraso entre renglones, cae la reseña textual de **Stephanie Ratzek** encima del tercio bajo de la foto, con sus 5 estrellitas y su nombre. Al final del recorrido aparece el único botón verde de la sección: **ESCRIBIR AHORA**.

**Reglas del movimiento:**
- Recorrido total del velo ≤ 1.2 s de animación equivalente. Reversible: si el usuario sube, el velo vuelve.
- Compu: pin máximo `+=90%`, con barra de progreso de 2 px en el color de marca. **Celular: sin pin**, solo `scrub: .6` mientras la sección cruza la pantalla.
- El velo **nunca llega a negro ni a 0**: mínimo `.12` para que el texto blanco siga leyéndose, máximo `.78`.
- Blindaje: el CSS base ya trae el estado final (foto visible al `.12`, reseña visible, botón visible). Se esconde solo dentro de `@media (scripting: enabled) and (prefers-reduced-motion: no-preference)` y con `setTimeout(1600)` que fuerza el final. Si falla GSAP, la sección se ve completa.
- Nada de cortina de color. Nada de pin eterno.

---

## 4. EL COMPONENTE FIRMA · "La placa de Canela"

No está en `COMPONENTES-USADOS.md`. Sale del negocio, no de una lista: toda mascota que entra a una veterinaria trae **placa en el collar**, y la propia tarjeta de Vet Inn publica una fila de **seis siluetas de animales** (perro, gato, pez, ave, serpiente, roedor) en `logo-vetinn-tarjeta-completa-facebook.jpg`.

**Qué es:** una placa de collar, de verdad, que el visitante llena en el hero y que lo acompaña toda la página.

1. **En el hero**, debajo de los botones, dos cosas en un solo renglón de 48 px: un campo sin caja, con raya de 1 px en color de marca, que dice **"¿Cómo se llama?"**; y abajo **"¿Quién viene?"** con la **fila de los seis**: las seis siluetas trazadas como SVG de un solo grosor (1.25 px), todas del mismo color (hairline `#87A9C4` al 40 %); la que tocas se rellena sólida en `#BAC562`.
2. Al escribir el nombre y tocar una silueta, se **dibuja la placa**: rectángulo redondeado de 14 px con el **agujero circular arriba a la izquierda**, la silueta elegida y el nombre. Animación de 420 ms `expo.out`, una sola vez.
3. **La placa manda en toda la página**: el título de la sección 2 pasa de "Lo que le podemos revisar a tu mascota." a **"Lo que le podemos revisar a Canela."**; la barra fija inferior dice **"La placa de Canela · 3 servicios"**; la hoja del carrito se encabeza con la placa; y el mensaje de WhatsApp arranca con **"Hola, es por Canela (gato). Quiero preguntar por: ..."**.
4. Se guarda en `sessionStorage` dentro de try/catch. Sin nombre, todo funciona igual con "tu mascota" y sin silueta.

**Por qué es este y no otro:** el desarme de la competencia dice que "nombre de tu mascota" vale más que cualquier animación. El socio lo escondió en un formulario hasta abajo. Nosotros lo ponemos en la primera pantalla y lo convertimos en el objeto que atraviesa la página. Es lo único de la muestra que no se puede copiar sin copiar el negocio.

**Ojo:** la fila de los seis **no promete** que atiendan a los seis. Solo mete la especie al mensaje. Preguntar no es prometer. Va confirmación en PENDIENTE-DUENO.

---

## 5. HEADER Y FORMAS PROPIAS

### De dónde sale el lenguaje
De la placa del collar (agujero para el llavero) y del piso de mosaico que se ve en casi todas sus fotos. Un solo motivo gráfico: **el agujero de la placa** (círculo de 6 px con hairline de 1.25 px).

### Header (propio de este sitio, no se parece a ninguna otra muestra)
- Alto 60 px en celular, 68 px en compu. **Transparente sobre el hero.**
- **Izquierda:** el wordmark **VETINN.** reconstruido en SVG (ver abajo), 96 px de ancho.
- **Derecha:** una sola acción en color de marca, **contorno de 1 px, rectangular (radio 2 px), mayúsculas con `letter-spacing:.14em`**: `ESCRIBIR`. Junto a ella la palabra **MENÚ** como texto con la hamburguesa. **Cero verde en el header.**
- **Al pasar 40 px:** el header se compacta a 48 px, el fondo pasa a `--deep` sólido con blur, y aparece abajo una **línea punteada de 1 px con guiones de 6 px** (la retícula del mosaico), no una línea sólida. El wordmark se encoge a la sigla **V.** con el punto en `#BAC562`.
- Menú: panel completo en celular, tablero desde la derecha en compu, links numerados 01–06, foco atrapado, `Escape`, pie con WhatsApp y Llamar.

### Logo
- **Se usa el logo 2** (wordmark azul y verde con siluetas de gato/perro dentro de las letras y el pajarito sobre la "i"), redibujado como **SVG limpio trazado** de `logo2-wordmark-recorte-anuncio-uaa.jpg`, sin el borde rojo del anuncio ajeno y sin cortes. **El JPG no se publica como imagen.**
- **El logo 1 (sol/globo) no se usa en ninguna parte** de la página. Solo su fila de seis siluetas alimenta el componente firma.
- Duda anotada en PENDIENTE-DUENO: cuál es el logo vigente y el archivo vector original.

### Formas
| Elemento | Valor |
|---|---|
| Radio de tarjetas y marcos de foto | 14 px, con el **agujero de placa** (círculo de 6 px) arriba a la izquierda; dentro del agujero va el número de sección |
| Radio de botones | 2 px, rectangulares, mayúsculas espaciadas `.14em` |
| Marco de foto chica | 6 px de aire en color papel + hairline de 1 px `#87A9C4` al 35 % |
| Divisor | línea de 1 px con un círculo de 6 px en la punta izquierda (el aro de la placa) |
| Rejilla | 2 columnas en celular, gutter 16 px; 1,320 px de contenedor en compu |

### Color (hex de `research/colores.md`, logo 2)
| Token | Hex | Uso |
|---|---|---|
| `--deep` | `#14202B` | Lienzo dominante. Azul pizarra sacado de oscurecer el `#87A9C4` del logo. Nunca `#000`. |
| `--deep-2` | `#1B2C3A` | Banda de contraste dentro del lienzo oscuro |
| `--paper` | `#F2EFE6` | Solo bandas de lectura: catálogo y "todo listo para completar" |
| `--brand` | `#BAC562` | Verde oliva real del logo 2 ("INN."): navegación, números de sección, **última línea de los títulos**, contorno de botones |
| `--brand-2` | `#87A9C4` | Azul grisáceo real del logo 2 ("VET"): **relleno del botón "+ Agregar"**, hairlines, siluetas apagadas |
| `--wa` | `#25d366` / tinta `#0b3d1f` | Solo lo que de verdad manda WhatsApp |

**Candado de verdes:** el oliva `#BAC562` **nunca va relleno** (solo contorno y texto), para que nadie lo confunda con el verde de WhatsApp. El único botón relleno que no es WhatsApp es el **"+ Agregar" en `#87A9C4` (azul)**. Verdes en toda la página: **4**. Son: flotante, "ESCRIBIR AHORA" (sec. 3), "ENVIAR POR WHATSAPP" (hoja del carrito), "ESCRIBIR AL 449 220 2495" (cierre). Tope de la regla: 8.

### Tipografía (dos familias, ninguna prohibida)
- Títulos: **Fraunces** variable, peso 800–900, `SOFT` alto y `WONK` encendido. Gorda y cálida, no clínica. No es la Manrope/Nunito del socio.
- Texto: **Instrument Sans** 400/500.
- Escala: hero celular `clamp(40px,11.5vw,60px)`, compu `clamp(64px,6vw,112px)`; titulares `max-width:12ch`, `text-wrap:balance`, un `span` con `nowrap` por renglón. Eyebrows 11 px mayúsculas `.14em`.
- Nada de Inter, Poppins ni Montserrat.

---

## 6. LAS SECCIONES (6)

Presupuesto de alto en celular a 390 px: **≈ 8,700 px**. Tope duro 9,000. Si una sección se pasa, se recorta esa sección, no se quita otra.

---

### 01 · HERO · "No preguntan por la clínica" · ~860 px
**Razón de venta:** en tres segundos deja claro que aquí atienden dos personas con nombre, desde 2012, en una calle concreta, y pone la placa en las manos del visitante antes que nada.
**Foto grande:** `research/fotos/gato-mesa-exploracion-maps.jpg` (498×1024 → **Real-ESRGAN ×4**). A sangre, 100 svh, velo direccional café oscuro solo en el tercio bajo donde va el texto. Es un gato exótico blanco de frente, sobre la mesa de acero, con el piso de mosaico de la clínica atrás: un paciente que te está mirando. Entrada "desde blur", 1.1 s `power2.out`, después de `img.decode()`.
**Texto real:**
- Título a dos tonos, tres renglones:
  `No preguntan por la clínica.` / `Preguntan por Alicia` / **`y por Luis.`** (última línea en `--brand`)
- Una línea debajo: `Clínica, acuario y pet shop en Olivares Santana 311, El Dorado. Abierta desde el 16 de febrero de 2012.`
- CTA primario, **color de marca contorno**: `VER SERVICIOS` (ancla a la 02). Secundario texto con flecha: `Cómo llegar`. **Sin verde.**
- Componente firma abajo: `¿Cómo se llama?` [campo] · `¿Quién viene?` [fila de los seis].

---

### 02 · SERVICIOS A LA VISTA · "Lo que le podemos revisar a Canela." · ~2,350 px
**Razón de venta:** es el catálogo tipo tienda justo después del hero (regla 3). El visitante ve TODO lo que hacen sin abrir nada, agrega lo que le interesa y eso arma el mensaje. Es lo que el socio no tiene: él puso un catálogo de NUPEC, marca ajena y sin precios.
**Foto grande:** `research/fotos/gatos-cachorros-transportadora-maps.jpg` (1024×576, la más nítida que hay). A sangre 60 svh arriba de la sección, con pie encimado numerado: `02 / SERVICIOS · Cuatro que llegaron juntos.` Debajo empieza la banda `--paper`.
**Fotos chicas (3, todas en recuadro con marco):**
- `doberman-mesa-clinica-facebook.jpg` (414×414) → tarjeta **Consultas**
- `gatos-durmiendo-juntos-maps.jpg` (1024×498) → tarjeta **Pensión**
- `estudio-sangre-perro-reel-facebook.jpg` (352×330, máximo 150 px de ancho en pantalla) → tarjeta **Estudios de laboratorio**
**Estructura:**
- Título: `Lo que le podemos revisar a Canela.` (sin nombre: `...a tu mascota.`). Sin eyebrow, sin párrafo.
- **4 tarjetas con foto** (2 columnas en celular): Consultas · Pensión · Estudios de laboratorio · **Cachorros y mascotas** (`cachorro-carita-mano-maps.jpg`, 768×1024). Cada una: foto en marco, nombre, **`Pregunta el precio`** en `tabular-nums` apagado, y **`+ Agregar`** relleno en `#87A9C4`.
- **8 renglones de carta tipográfica** debajo, sin foto porque no existe una digna: Cirugías · Vacunas · Desparasitación · Estética canina · Alimento · Accesorios · Asesoría especializada · Acuario. Nombre a la izquierda, `Pregunta el precio` a la derecha, `+` al final. Todos con el agujero de placa como viñeta.
- **Nunca "$0", nunca "desde $".** Total de la hoja: `Te lo confirmamos por WhatsApp.`
- Barra fija inferior (56 px + `env(safe-area-inset-bottom)`) en `--brand-2`: `La placa de Canela · 3 servicios` → abre la hoja.
**Hoja del carrito (solo el carrito y el cierre viven aquí):** encabezada por la placa; lista de lo agregado; campos `Tu nombre` y `¿Qué le pasa?`; línea honesta **`Desde aquí no se cobra nada. Solo se manda el mensaje.`**; botón verde `ENVIAR POR WHATSAPP`. La hoja se monta en `<body>`, `history.pushState` al abrir, `window.open` con caída a `location.href` y link "¿No se abrió WhatsApp?".

---

### 03 · MOMENTO FIRMA · "Era pasada la medianoche." · ~1,420 px
**Razón de venta:** es la razón por la que alguien los elige sobre el de al lado. No lo decimos nosotros: lo dice una clienta con nombre y 5 estrellas.
**Foto grande:** `research/fotos/vacuna-aplicacion-anaquel-farmacia-maps.jpg` (×4). Ver punto 3.
**Texto real:**
- Título a dos tonos: `Era pasada la medianoche.` / **`Y contestó.`**
- Cita textual, entrecomillada, de `resenas.md`: *"Nuestra niña sufrió una torsión gástrica (bloat) y Alicia estuvo disponible de inmediato, aunque era en plena madrugada."* · **Stephanie Ratzek**, ★★★★★.
- Renglón honesto debajo, letra chica: `El horario de la clínica es lunes a viernes de 12:00 a 20:00 y sábado de 11:00 a 16:00. Lo de la madrugada lo cuenta ella, no nosotros.`
- Botón verde único: `ESCRIBIR AHORA`.
- Sin eyebrow, sin párrafo, sin botón secundario.

---

### 04 · 2012 · "Siguen en la misma calle." · ~1,480 px
**Razón de venta:** trayectoria comprobable y prueba social real. Aquí se quema el miedo de "¿y si es una veterinaria improvisada?".
**Foto grande:** ninguna a sangre. Esta es la **pausa tipográfica** de la página.
**Tratamiento:** el número **2012** gigante (`clamp(96px,34vw,260px)`, Fraunces 900) con la foto `research/fotos/pug-cachorro-recien-nacido-guante-maps.jpg` (1024×576) metida **dentro de los números** con `background-clip: text`. La foto solo se ve por los huecos de las cifras: la parte clínica cruda queda fuera de cuadro y lo que se lee es "llevan trece años recibiendo camadas". Contador del 2012 solo si arranca con la sección, 0.9 s `power3.out`, una vez.
**Texto real:**
- `Abrieron el 16 de febrero de 2012.` / **`Siguen en la misma calle.`**
- Tres reseñas textuales en tarjetas de `--deep-2`, cada una con nombre real y sus estrellitas: **Adriana Canales** ★★★★★, **Cristopher Garcia Rodríguez** ★★★★★, **Javier Saucedo Retes** ★★★★★. Copiadas tal cual de `research/resenas.md`, recortadas solo por el final y con puntos suspensivos.
- Una sola línea de cifras, en renglón corrido, **no en fila de contadores**: `4.8 en Google con 134 opiniones. 98% de recomendación en Facebook.`
- **Marcador honesto** en recuadro con marco, donde iría el retrato del equipo: `Aquí va la foto de Alicia y Luis. Ya existe, la tenemos. Falta que ustedes nos digan que sí.` (Las dos fotos marcadas CONFIRMAR-caras **no se publican**.)
- Sin botón.

---

### 05 · DÓNDE ESTAMOS · "Olivares Santana 311." · ~1,300 px
**Razón de venta:** quitar la última fricción. Está dentro de una plaza médica, no en la banqueta: si no lo explicas, la gente da vueltas y se va.
**Foto grande:** `research/fotos/sala-espera-pastor-aleman-reel-facebook.jpg` (480×640). **En recuadro con marco al 62 % del ancho, NO a sangre** (la original es chica). Pie: `La sala de espera.` Es la única toma del lugar que existe.
**Texto real:**
- `Está dentro de MH Mega Health.` / **`Olivares Santana 311.`**
- Mapa real de Google embebido con la **tarjeta-placa encimada** (radio 14 px + agujero): nombre, dirección completa `Prof. Enrique Olivares Santana 311, El Dorado 1ra Secc., C.P. 20235`, Plus Code `VM6V+42`, y botón de marca contorno `CÓMO LLEGAR ↗`.
- **Horarios en renglones con divisores**, cada renglón con el aro de la placa a la izquierda: `Lunes a viernes 12:00–20:00` · `Sábado 11:00–16:00` · `Domingo cerrado`. **Texto plano, sin reloj vivo, sin riel de horas, sin contar cuánto falta para que cierren** (eso ya se usó en otras muestras).
- Teléfono: `449 220 2495`, botón de marca contorno `LLAMAR`.
- **Marcador honesto** donde iría la fachada: `Fotografía de fachada pendiente: se la pedimos al dueño. No ponemos la de otro negocio.`

---

### 06 · TODO LISTO PARA COMPLETAR + CIERRE · ~1,290 px
**Razón de venta:** le vende al dueño el siguiente paso (es una muestra) y cierra al visitante con la frase que ellos mismos ya usan.
**Foto grande:** ninguna. Cierre tipográfico sobre `--deep`.
**Texto real:**
- Banda `--paper`: `Todo listo para completar.` / **`Falta lo suyo.`** Lista con el aro de placa: precios de consulta, vacuna, cirugía, estética, estudios y pensión · foto de la fachada · logo en vector · permiso para publicar las fotos del equipo · link de cobro en línea · usuario de Instagram si existe. Una línea: `Tarjeta en línea: te mandamos el link.`
- Cierre sobre `--deep`: el wordmark **VETINN.** a más del 60 % del ancho (el momento de logo a escala de la página), y debajo su propia frase, atribuida: `"Es bueno ser grande, pero más grande es ser bueno."` con el pie chico `Lo dice su propia tarjeta.` Si hay placa: `Nos vemos, Canela.`
- Botón verde: `ESCRIBIR AL 449 220 2495`.
- Pie: **solo las redes que existen de verdad**, con logotipo SVG de 44 px: **Facebook** (`facebook.com/vetinn.aguascalientes`, con el arroba real) y **WhatsApp**. Nada de Instagram ni TikTok: no se confirmó que existan.
- **og:image absoluto** apuntando a la versión 1200×630 de `gatos-cachorros-transportadora-maps.jpg`. Title y meta description propios. Favicon con el punto del wordmark.

---

## 7. EL RITMO

El patrón **eyebrow → título → párrafo → botón** solo se permite en la **01** y en la **05**, y no van seguidas. Las demás rompen a propósito:

| Sección | Qué la rompe |
|---|---|
| **02** | Sin eyebrow y **sin un solo párrafo**: foto a sangre con pie numerado, la fila de los seis, y de ahí directo a tarjetas y carta tipográfica. |
| **03** | Sin eyebrow y sin párrafo: foto, cita textual que cae renglón por renglón, un botón. |
| **04** | **Pausa tipográfica**: número gigante con foto dentro, tres citas y una línea de cifras. **Sin botón.** |
| **06** | Lista honesta + cierre de logo grande con la frase de la casa. Sin eyebrow. |

Nunca más de dos escenas de imagen seguidas sin una pausa tipográfica: 01 y 02 son imagen, 03 es imagen, y **04 es la pausa**. 05 vuelve a imagen chica y 06 cierra en texto.

---

## 8. LO QUE NO VA

**De la página del socio (si se parece, truena):**
- Cinta que corre con estrellitas entre secciones.
- Iconos de trazo fino **cada uno de distinto color**. Aquí las seis siluetas son de un solo grosor y de un solo color; el color solo marca el estado seleccionado.
- Botón de cada producto en el color de su empaque.
- Retrato recortado sobre fondo oscuro con **aro de círculos concéntricos** atrás.
- Redes en bloques gigantes repartidos; aquí van en el pie, 44 px, y solo las reales.
- Fila de 3 datos tipo `24 h · 100% Recomendado · Centro`.
- FAQ en acordeón con "+", pasos numerados 01 02 03 en la solicitud.
- Su línea textual "No se realiza ningún cobro desde esta página": la nuestra es `Desde aquí no se cobra nada. Solo se manda el mensaje.`
- **Sus errores, ninguno:** nada de 12,249 px (tope 8,700), nada de 10 botones verdes (van 4), nada de bloque invisible (blindaje de 1.6 s obligatorio), nada de faltar og:image, nada de catálogo de marca ajena sin precios, nada de blanco sobre blanco.

**De componentes ya usados en otras muestras:**
- Reloj vivo, riel de horas o tira de días que se prenden (pozolería La Chata, Los Abolengos).
- Antes/después, cinta métrica, tercia/coverflow, lupa, rotador collage, pase de abordar, platón giratorio, planta que se extruye.

**De datos:**
- Ningún precio, ningún "$0", ningún "desde $", ningún "a partir de".
- Ninguna cifra, año, servicio, horario o reseña que no esté en `research/`.
- Apellidos, cédula profesional o títulos de Alicia y Luis puestos por nosotros.
- Promesas de 24 horas, urgencias garantizadas, hospitalización, o atención a peces, aves y reptiles.
- El segundo teléfono 449 218 67 08 (no sabemos qué es).
- El dominio viejo vetinn.com.mx (está caído).

**De imágenes:**
- `collage-equipo-clinica-CONFIRMAR-caras-facebook.jpg` y `equipo-recepcion-cachorros-CONFIRMAR-caras-maps.jpg`: **no se publican** hasta que el dueño autorice. En su lugar va el marcador honesto de la sección 04.
- Ninguna foto de fachada: no existe. No se inventa, no se toma prestada de otro negocio, no se genera.
- **Higgsfield, imágenes de IA y video de IA: prohibidos.** Tampoco hero_video.py: las fotos son pocas y dos necesitan escalado; el hero va con una sola foto fija y entrada desde blur.
- El logo 1 (sol/globo) y el JPG recortado del logo 2 no se publican como imagen.
- Quedan **sin usar** y no se rellena nada con ellas: `gatito-piso-primerplano-maps.jpg` (oscura y suave) y `cachorro-negro-rescate-reel-facebook.jpg` (no se confirma que sea dentro de la clínica).

**De estilo:**
- Guiones largos, Inter, Poppins, Montserrat, emojis como iconos, píldoras, naranja.
- Cortinas de color entre secciones. Fondo blanco plano. Fila de contadores.
- Palabras prohibidas en títulos y subtítulos: calidad, servicio, tu mejor opción, experiencia única, todo en un lugar, sin vueltas, lo hacemos posible.
- Pin en celular; pin de más de `+=90%` en compu; cualquier animación de más de 1.2 s.
- Más de 7 secciones, más de 9,000 px, más de 8 botones verdes.

---

## 9. PENDIENTE-DUENO

Va en `vet-inn/PENDIENTE-DUENO.md` y se le manda al dueño tal cual.

**Precios (todo sale como "Pregunta el precio" hasta que nos los den):**
1. Consulta
2. Vacunas (por vacuna o por cuadro completo)
3. Desparasitación
4. Cirugías (esterilización y las más comunes)
5. Estética canina (baño, corte)
6. Pensión (por noche)
7. Estudios de laboratorio (sangre y los demás)
8. Asesoría especializada
9. ¿Quieres precios en la página o prefieres que todo diga "Pregunta el precio"?

**Fotos:**
10. **Foto de la fachada** del local y del acceso dentro de MH Mega Health. No existe en ningún canal y no vamos a poner la de otro negocio.
11. **Permiso por escrito** para publicar las dos fotos donde se ven caras del personal y de una clienta (`collage-equipo-clinica-CONFIRMAR-caras-facebook.jpg` y `equipo-recepcion-cachorros-CONFIRMAR-caras-maps.jpg`). Mientras no lo den, esas fotos no salen.
12. Una foto de Alicia y Luis, de frente, con su autorización, para la sección de los trece años.
13. Fotos que faltan y nos harían falta: vacunación en horizontal, estética (baño o corte), instalaciones de pensión, sala de espera y recepción completas, el acuario.

**Marca:**
14. ¿Cuál es el logo vigente: el del sol/globo o el wordmark azul y verde "VETINN." de las siluetas? Nosotros usamos el **wordmark nuevo**; confírmalo.
15. Manda el **archivo original del logo en vector o PNG con fondo transparente**. El que tenemos es un recorte de un anuncio de la UAA y está en baja resolución.
16. ¿Seguimos usando la fila de seis animales (perro, gato, pez, ave, reptil, roedor) de su tarjeta? ¿De verdad atienden a los seis en clínica, o los últimos cuatro son del pet shop y del acuario?

**Datos:**
17. ¿El 449 218 67 08 es WhatsApp, fijo u otra sucursal? Mientras no sepamos, no lo publicamos.
18. Nombres completos de Alicia y Luis y su cédula profesional, si quieren que aparezcan. Hoy solo ponemos el nombre de pila porque es lo que dicen las reseñas.
19. ¿Aceptan que la página hable de atención fuera de horario? ¿Hay un número de urgencias? Hoy solo citamos textualmente lo que escribió una clienta.
20. ¿Hospitalizan? Varias reseñas describen internamientos y transfusiones, pero no está confirmado por ustedes, así que no aparece.
21. ¿Venden mascotas hoy y de qué especies? Está en su tarjeta pero no lo pusimos.
22. Historia de la clínica en dos o tres renglones, con sus palabras. Hoy la página solo dice la fecha de fundación.
23. ¿Existe Instagram o TikTok? No los encontramos y por eso no van en el pie.
24. **Link de cobro en línea** (tarjeta) para activar "te mandamos el link".
25. El dominio **vetinn.com.mx está caído**. ¿Lo recuperamos o registramos uno nuevo?
