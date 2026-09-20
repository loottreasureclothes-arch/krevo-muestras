# HOJA DE DIRECCION: Los Abolengos (Aguascalientes)

Director: orquestador Opus, 20 sep 2026. Manda sobre cualquier texto viejo.
Carpeta: `krevo-muestras/los-abolengos/`. Fotos verificadas una por una con Read.

---

## 1. EL TRABAJO

Que el visitante mande por WhatsApp, ANTES de la 1:00 pm, un mensaje con hora y numero de personas: "aparto mesa" o "recojo mi pedido". Nada mas. Si una seccion no empuja ese mensaje, se borra.

Por que ese y no "presentar el restaurante": abren 5 horas al dia (8:00 a 1:00, los 7 dias) y su problema #1 en resenas es que se llenan, se tardan y se les acaban platillos. Cada mesa que llega sin avisar les cuesta dinero y estrellas; cada desayuno de grupo sin menu cerrado por adelantado es un Pepe Yerbes mas ("su menu se habia agotado el dia del evento"). La pagina es la agenda que hoy no tienen.

---

## 2. LA PROMESA

> **"Cinco horas al dia, en la casona blanca de Alameda 810: enfrijoladas Allende, cafe de olla y pan horneado en casa. De 8:00 a 1:00."**

El de al lado no la puede decir: la calle es suya (Av. Alameda 810, frente a la Alameda), el horario corto es suyo, los nombres de platillo son de su carta (Enfrijoladas Allende $160, Cafe de olla $50) y la panaderia propia es suya (pan de nata y almendra completo $195).

**El horario corto se vende como lujo, no como disculpa.** Voz: "Solo abrimos por la manana." Nunca "cerramos temprano", nunca "lamentamos".

---

## 3. EL MOMENTO FIRMA: la mesa que se pone

**Que pasa.** Las 7 fotos del propietario (15 a 21) estan tiradas CENITALES sobre la misma mesa de madera casi negra con mantel de palma. Eso es un plano fijo regalado: la mesa no se mueve, lo que cambia son los platos.

- Seccion 3. Fondo = esa madera oscura a sangre (`--deep`, textura sacada del borde de `21-mesa-desayuno-tres-platos.jpg`). Arranca vacia.
- Al entrar la seccion, aterrizan en orden, uno cada 220 ms: `15-salsa-roja-y-enfrijoladas-con-cafe.jpg` (recortado al plato de enfrijoladas y a la taza), `18-sopes-deshebrada.jpg`, `20-jugo-plato-fruta.jpg` y `26-canasta-pan-casa.jpg` (esta ultima es de 864 px: va en recuadro con marco de 1 px, como charola, NO a sangre).
- Cada plato entra con `opacity` + `scale(.94 a 1)` + su sombra de contacto, y suelta al lado un renglon fino con nombre y precio REALES: "Enfrijoladas Allende $160", "Cafe de olla $50", "Sopes $150", "Plato de fruta $58", "Pan de la casa $35".
- Total 4 platos: entrada completa **0.95 s**, salida 0.6 s. **Reversible** al subir. **Sin pin.** En celular es la misma coreografia, sin pin y con los platos a 2 columnas.
- Termina con un renglon a dos tonos y el CTA: "Asi se pone tu mesa a las 9:00." + boton **APARTAR MESA** (color de marca) que abre la hoja con la hora ya puesta.

**Cuidado con los nombres.** El plato rojo de la izquierda de la foto 15 NO se puede nombrar (no hay fuente de cual es): se recorta fuera o entra sin rotulo. Solo se rotula lo que la carta confirma.

---

## 4. EL COMPONENTE FIRMA: la franja de la manana (8:00 a 1:00)

No esta en `COMPONENTES-USADOS.md` y sale del unico hecho duro del negocio: solo existen entre las 8 y la 1.

- Riel horizontal fino que corre 8:00 - 9:00 - 10:00 - 11:00 - 12:00 - 1:00, con el punto rombo del logo ("·") como marca de cada hora. Alto total 56 px en celular.
- Vive **dentro del hero** (debajo del titulo) y se repite **compacto dentro del header** al bajar de 40 px.
- Se llena en color de marca desde las 8:00 hasta la hora actual del visitante. Debajo, un solo renglon: "Faltan 2 h 40 para que cierre la cocina."
- Es **herramienta, no adorno**: tocar una hora la selecciona, se pinta, y esa hora entra al mensaje de WhatsApp ("Llegamos a las 10:30").
- Fuera de horario: la franja se muestra completa en gris tierra y dice "Manana abrimos a las 8:00"; el boton cambia a **APARTAR PARA MANANA**. Nunca se queda en blanco ni oculta el CTA.
- Solo usa el horario publicado (8:00 a 1:00, Google Maps + bio FB + bio IG). No inventa cupo, ni "quedan X lugares", ni contadores.

---

## 5. HEADER Y FORMAS PROPIAS

**De donde sale:** de su placa. La fachada (`01-fachada-entrada-logo.jpg`) tiene una **placa rectangular de metal cafe montada en muro de canteria**, con el arbol calado y "· LOS · / ABOLENGOS / COCINA Y TRADICION" en serif de mayusculas muy espaciadas. Ese es el sitio entero: placas rectas, cero curvas.

**Header (nadie mas lo tiene asi):**
- Arriba del hero flota una **placa**: barra rectangular, `border-radius: 0`, fondo `rgba(27,21,18,.55)` con blur, y un **filete de 1 px** en `--brand-ink` por dentro, a 6 px del borde (el grabado de la placa real).
- Izquierda: el arbol (`brand/tree-cream.webp`) a 28 px + "· LOS · ABOLENGOS" en serif, 13 px, mayusculas, `letter-spacing: .24em`.
- Derecha: **una sola accion**, "APARTAR", en color de marca, fina, rectangular, mayusculas espaciadas. Nada de verde en el header. Hamburguesa con la palabra "CARTA" al lado.
- **Al pasar 40 px se compacta:** la palabra "ABOLENGOS" se va, queda solo el arbol, la placa se rellena solida `--deep` y **al centro aparece la franja de la manana en version mini** ("8:00 — 1:00 · faltan 2 h 40"). Alto 56 px celular / 64 px compu.

**Lenguaje de formas:**
- Radios: **0 px en todo** (botones, tarjetas, recuadros, hoja). Este sitio no tiene una sola esquina redonda.
- Marco de foto: filete de 1 px `--brand-ink` metido 8 px hacia adentro de la imagen (marco de placa). Toda foto chica o de cliente va asi; solo las del propietario (2048) van a sangre.
- Divisor entre secciones: **no hay lineas de color ni cortinas**. Se separa con el rombo del logo repetido tres veces (· · ·) en `--brand-ink` a 11 px, centrado, y un cambio de fondo con degradado de 80 px.
- Motivo grafico unico: el punto rombo "·" del logo. Sirve de bullet en la carta, de marca de hora en la franja y de divisor. **Nada de cinta de medir.**

**Color (hexadecimales, de `research/colores.md` y de sus propias fotos):**

| Token | Hex | De donde |
|---|---|---|
| `--deep` (lienzo) | `#1B1512` | la madera casi negra de su mesa (fotos 15 a 21) |
| `--deep-2` (banda) | `#241C17` | la misma madera, un paso arriba |
| `--paper` (solo para leer: carta y formulario) | `#F7EBDD` | crema de su carta digital de FB |
| `--brand` (botones, ultima linea de titulos) | `#CBBB9F` | beige arena del fondo del logo |
| `--brand-ink` (filetes, divisores, texto fino) | `#978771` | cafe tierra del arbol y las letras |
| `--olivo` (una sola vez) | `#5F6A26` | version verde del logo y el toldo de la terraza |
| `--wa` / `--wa-ink` | `#25D366` / `#0B3D1F` | WhatsApp |

Lienzo oscuro dominante. `--paper` SOLO en la banda de la carta y en la hoja del pedido. Nada de blanco plano, nada de naranja, nada de rojo de UI.

**Tipografia:** titulos en **Fraunces** 300/400 (serif editorial, va con su logo). Eyebrows y categorias de la carta: el mismo serif a 11 px, mayusculas, `letter-spacing: .22em`. Texto: **Instrument Sans** 400/500. Precios en `tabular-nums`. Prohibido Inter, Poppins, Montserrat.

---

## 6. LAS SECCIONES (7, tope 8,600 px en celular)

### 1. HERO — "Abrimos cinco horas" (~860 px)
**Razon de venta:** sin el reloj arriba, el visitante no entiende que tiene que apurarse. El apuro es lo que manda el mensaje.
**Foto grande:** `21-mesa-desayuno-tres-platos.jpg` a sangre, 100 svh, velo direccional `rgba(10,6,3,…)` solo del lado del texto.
**Titulo (cae, dos tonos, ultima linea en `--brand`):**
> Abrimos cinco horas.
> De 8:00 a la 1:00.
> **Aparta la tuya.**

**Bajada (una linea):** "Casona blanca frente a la Alameda, con valet parking. Alameda 810."
**Debajo:** la franja de la manana (componente firma). CTA primario **VER LA CARTA** (marca) y secundario de contorno **APARTAR MESA**. Cero verde aqui.

### 2. LA CARTA A LA VISTA (~2,400 px)
**Razon de venta:** es la tienda. Hoy su carta es texto y esta encerrada en un QR de mesa; con foto y precio a la vista sube el ticket con guarniciones ($35 a $65), jugos ($43 a $58) y pan ($35). Sin esto, la pagina no cobra nada.
**Foto grande:** `27-chilaquiles-arrachera.jpg` a sangre arriba (60 svh) con pie encimado: "Chilaquiles Alameda con fajitas de arrachera · $160". Es el platillo mas mencionado en Google (16 menciones).
**Estructura:** chips de categoria pegados arriba (HUEVOS · CHILAQUILES Y ENCHILADAS · ESPECIALIDADES · PARA COMPARTIR · PANADERIA · BEBIDAS) sobre banda `--paper`. Tarjetas uniformes a 2 columnas en celular, 3 en 1440: foto, nombre, precio real y **+ Agregar en color de marca** (NUNCA verde).
**Tarjetas con foto real (nombre y precio tal cual la carta abr 2025):**
- Chilaquiles Alameda $140 / con fajitas de arrachera $160 — `27`
- Enfrijoladas Allende $160 — `16`
- Tamachile $160 — `22`
- Sopes $150 — `18`
- Omelette, elige relleno, desde $140 — `17`
- Molletes $110 / con chorizo, chicharron o deshebrada $140 — `23`
- Baguett del Granero $110 — `19`
- Plato de fruta $58 + Jugo Catrina $48 — `20`
- Concha de la casa $35 — `24`
**El resto va como carta tipografica** (nombre a la izquierda, precio a la derecha, bullet de rombo): huevos, menudo, birria, huarache, pastel azteca, guarniciones, licuados, cafe. Sin foto inventada y sin boton por renglon: **un solo CTA por grupo**.
**Nunca "$0".** Si algo no trae precio: "Pregunta el precio" y en el total "te lo confirmamos por WhatsApp".
Se pueden reaprovechar `sections/40-menu.*` y `41-pedido.*` de la sesion pausada SOLO si se repintan con estos tokens, el Agregar en color de marca y sin ningun "$0".

### 3. MOMENTO FIRMA: la mesa que se pone (~1,000 px)
**Razon de venta:** aqui se ve lo que llega a la mesa de verdad, fotografiado por ellos, y el cierre cae con la hora ya elegida. Es el unico bloque que puede convertir a alguien que solo venia mirando.
**Fotos:** `15`, `18`, `20` a sangre sobre la madera; `26-canasta-pan-casa.jpg` en recuadro con marco (es de 864 px).
**Texto clave:** "Asi se pone tu mesa a las 9:00." + **APARTAR MESA**.
Ver detalle completo en el punto 3 de esta hoja.

### 4. EL PAN DE LA CASA (~780 px)
**Razon de venta:** es un producto que se vende SIN ocupar mesa (pan de nata y almendra completo $195, conchas $35). Cuatro resenas hablan del pan recien hecho. Hoy no se puede apartar por ningun lado.
**Foto grande:** `24-concha-casa-cafe.jpg` a sangre. Vale doble: es el unico cuadro donde **el logo real esta impreso en la mesa de madera** (arbol + "ABOLENGOS · COCINA Y TRADICION"). Encuadrar para que el logo se lea completo, sin cortar: ese es el momento de logo de la pagina.
**Texto clave (pausa tipografica, sin eyebrow ni parrafo):**
> Panaderia propia.
> **Desde las 8:00.**
Renglon fino: "Pan de nata y almendra completo $195 · Conchas $35."
Cierre: link con flecha "Apartar pan para recoger →" (color de marca, NO boton verde).

### 5. DESAYUNOS DE GRUPO (~1,300 px)
**Razon de venta:** es el ticket grande (jubilaciones, cumpleanos, 10 de mayo, desayunos de trabajo) y arregla su peor resena: menu cerrado y confirmado por adelantado = cocina preparada. Elizabeth Nino ya lo dijo: "todo perfecto (siempre y cuando hagas reservacion)".
**Foto grande:** `12-evento-mesa-montada.jpg` a sangre, **recortada para dejar fuera la TV** (se le ve la marca). Apoyo chico en recuadro: `10-terraza-sombrillas.jpg`.
**Texto clave:**
> Mesa larga, mantel negro.
> **Menu cerrado desde hoy.**
Tres renglones de hecho real (nada de paquetes con precio inventado): "Salon privado con mesa redonda." / "Terraza con sombrillas." / "Valet parking." Formulario compacto en banda `--paper`: personas, fecha, hora dentro de 8:00 a 1:00, salon o terraza, platillos de la carta. Un solo boton: **PEDIR COTIZACION DE GRUPO** (color de marca) que arma el mensaje.
**PENDIENTE-DUENO:** capacidades, anticipo y precio de paquete. Mientras no lleguen, no se escribe ninguna cifra de evento.

### 6. LO QUE DICEN Y COMO LLEGAR (~1,400 px)
**Razon de venta:** las 829 opiniones viven en Google, no en su pagina. Aqui pagan; y el mapa mas el telefono cierran al que ya decidio.
**Foto grande:** `01-fachada-entrada-logo.jpg`, **recortada** para que la placa con el arbol quede COMPLETA y las dos personas de espaldas queden fuera. Es su letrero real.
**Estrellas SOLO reales, con nombre** (de `research/resenas.md`, los que traen calificacion explicita):
- Juana Gutierrez "Juanita Pina" 5/5: el pastel azteca y la costra de queso.
- ROMEO ENCISO SANCHEZ 5/5: recomienda las Enfrijoladas Allende; "desde que te recibe el valet parking".
- Tania Indra 5/5: "el cafe de olla mas rico que he probado".
- Rafael Carrasco 5/5: el tamal relleno de chile poblano; reuniones de trabajo.
Debajo, un solo renglon de dato verdadero: "4.5 en Google · 829 opiniones." **Prohibido "1,200+"** (eso suma plataformas).
**Visitanos:** Av. Alameda 810, Col. del Trabajo, 20180. Todos los dias 8:00 a 1:00. Valet parking. Mapa, COMO LLEGAR (marca), LLAMAR (marca) y **un solo boton verde: WHATSAPP 449 805 0420**.

### 7. TODO LISTO PARA COMPLETAR + PIE (~600 px)
**Razon de venta:** es la siguiente venta (suscripcion mensual). Le dice al dueno exactamente que falta para que la pagina cobre.
Lista corta: carta vigente confirmada, precios de paquete de grupo, foto del pan de nata completo y del valet, link de cobro con tarjeta, dias de musica en vivo.
Renglon fijo que se queda: "Tarjeta en linea: te mandamos el link."
**Pie:** arbol grande del logo (mas del 60% del ancho), Facebook e Instagram REALES con logotipo SVG de 44 px (`Los Abolengos Restaurante` y `@los_abolengos`), telefono, horario, direccion. Cierre a dos tonos: "Te esperamos temprano. / **De 8:00 a la 1:00.**"

### La hoja (sheet)
Solo el carrito y el cierre: platillos con cantidad, hora tomada de la franja, personas, terraza o salon, nombre, total REAL sumado, "Tarjeta en linea: te mandamos el link" y el boton **VERDE** ENVIAR POR WHATSAPP. Mas el flotante verde. Maximo 3 verdes en todo el sitio.

---

## 7. EL RITMO (que secciones NO llevan eyebrow-titulo-parrafo-boton)

| # | Seccion | Patron |
|---|---|---|
| 1 | Hero | Titulo + franja + 2 CTA. **Sin eyebrow, sin parrafo.** |
| 2 | La carta | Eyebrow + titulo + chips + rejilla de producto. (Patron 1 de 2 permitidos) |
| 3 | Momento firma | **Solo madera, platos que caen y rotulos finos.** Sin eyebrow, sin parrafo, sin boton hasta el ultimo renglon. |
| 4 | El pan | **Foto a sangre + 3 palabras + precio + link con flecha.** Pausa tipografica pura. |
| 5 | Grupos | Eyebrow + titulo + 3 renglones + formulario. (Patron 2 de 2) |
| 6 | Resenas y visitanos | **Citas con nombre y estrellas + mapa.** Sin eyebrow, sin parrafo de relleno. |
| 7 | Todo listo | Lista + pie. **Sin eyebrow.** |

Nunca hay dos con el patron completo seguidas: 2 y 5 estan separadas por el momento firma y por el pan.

---

## 8. LO QUE NO VA (explicito, en esta pagina)

- **Nada de Higgsfield, imagenes de IA ni video de IA.** Prohibidas las promos de Facebook `raw_fb/fb03..fb21, fb26, fb27` (el propio Facebook las marca "Contenido de IA") y las fotos de 512 px con bigote "Imagen de referencia" de `raw_gmaps` (085, 086, 088, 094, 101, 108, 109, 113, 116, 117, 128, 129, 131, 150, 151, 155, 156, 186, 190, 204, 205, 206, 210, 236, 240, 241): son stock de app de delivery.
- **Fotos vetadas:** `11-terraza-vista-alameda.jpg` (lona con texto cortado "¡ABRIMO…" y sombrilla de otra marca), `03-salon-principal-candiles-arcos.jpg` y `07-barra-cafe-panaderia.jpg` sin recortar (pendon "422 Residencial", refrigerador de otra marca, empleado al fondo), `02-fachada-calle-estacionamiento.jpg` (marcas de coches legibles y el letrero cortado), `09-salon-privado-mesa-redonda.jpg` (borrosa y con una persona), `13` y `14` (numeros y letrero de "Feliz cumpleanos" quemados). `28` y `29` son de 720 px: solo en recuadro chico o no van.
- **"1,200+ resenas"**, "mas de mil opiniones" o cualquier suma de plataformas. En Google son 829.
- **Uber Eats** (ni logo ni su 4.8): el negocio de la pagina es justamente pedir directo.
- **Musica en vivo** anunciada con dias u horario: no hay fuente. Tampoco carta de tapas, jamon iberico, bar por la tarde ni precios de 2021.
- **Paquetes de evento con precio, anticipo, capacidad o minimo:** no existen todavia.
- Cinta de medir. Cortinas de color entre secciones. Fila de contadores. Rejilla de tarjetas iguales con icono. Pildoras. Emojis como iconos. Guiones largos. Inter. Naranja. Pin largo o scroll eterno.
- Palabras prohibidas en titulos y subtitulos: calidad, servicio, tu mejor opcion, experiencia unica, todo en un lugar, sin vueltas, lo hacemos posible. Tampoco "cerramos temprano" ni disculpas por el horario.
- Mas de 3 botones verdes en toda la pagina. Verde en el header, en el "+" de Agregar o en los CTA de navegar.
- Ningun "$0" y ningun total calculado con precios que no esten en `menu-precios.md`.
- No cerrar `http://localhost:8770/` ni matar Chromes ajenos. No tocar `_kit/`, `closetdoor/`, `lamexico/`, `grupo-v/`, `la-gloria-sma/` ni las otras muestras.

---

## 9. PENDIENTE-DUENO

Se anota tambien en `los-abolengos/PENDIENTE-DUENO.md`. Nada de esto se inventa en la pagina.

1. Horario real: la pagina dice 8:00 a 1:00 (Google Maps, bio FB, bio IG). Sus posts de septiembre dicen 8:00 a 1:30. ¿Cual queda?
2. Dias y horario de la musica en vivo (Google la lista, nadie la anuncia).
3. ¿El valet parking tiene costo?
4. Capacidad del salon privado y de la terraza. ¿Anticipo o minimo para grupos? ¿Con cuanta anticipacion se cierra el menu?
5. Precios de paquete de desayuno de grupo.
6. ¿Sigue vigente la carta de abril 2025 con esos precios?
7. ¿Se toman pedidos para recoger por WhatsApp? ¿Con cuanto tiempo?
8. ¿Sigue activo el 449 554 4323 de Instagram?
9. Ano de apertura y cual es la "historia del estado" de su lema. ¿Sigue existiendo algo del "Meson de la tapa"?
10. ¿El pan de nata de cortesia al llegar es politica de la casa? (hoy solo lo dicen resenas)
11. Fotos que faltan: pan de nata y almendra completo recien salido, el valet, la fachada sin gente, el salon principal sin el pendon de "422 Residencial".
12. Link de cobro con tarjeta para activar el pedido en linea.
13. Confirmar que la vajilla y el mantel de palma de las fotos 15 a 21 siguen iguales.
