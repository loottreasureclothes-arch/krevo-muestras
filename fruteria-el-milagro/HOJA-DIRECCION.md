# HOJA DE DIRECCIÓN: Frutería El Milagro

Aguascalientes. 20 sep 2026. Se aprueba ANTES de construir.
Base: `research/hechos.md`, `research/menu-precios.md`, `research/resenas.md`, `research/colores.md`, `research/VENDE.md`, `research/FOTOS.md`, y las 3 imágenes reales de `research/fotos/` (vistas una por una).

---

## AVISO 1: LAS FOTOS QUE HAY SON TRES, Y NINGUNA VA A SANGRE

Léelo antes de maquetar. Esto manda sobre cualquier costumbre de otras muestras.

| Archivo | Qué es | Medida real | Uso ÚNICO en la página |
|---|---|---|---|
| `fachada-tienda-real-google-maps.jpg` | Fachada real: medallón del logo sobre el toldo rojo con "FRUTERÍA EL MILAGRO", anaqueles con fruta, huacales de jitomate y uva en la banqueta, cartelitos verdes de precio escritos a mano | 1402 x 1122, pero **sólo sirve recortada** | Sección 1 (hero + momento firma), en marco |
| `interior-exhibidores-real-google-maps.jpg` | Interior real: anaquel blanco con cítricos y verdura, mesa con piñas, sandía, papaya, col y pimientos, póster propio en la pared | 1402 x 1122, **sólo recortada** | Sección 4, en marco |
| `logo-fruteria-el-milagro-sin-recuadro.jpg` | Logo oficial de su perfil de Facebook, limpio, fondo blanco | 1254 x 1254 | Header, momento firma, cierre, favicon y og |

**No hay una cuarta foto.** No hay foto de producto suelto, ni de paquete armado, ni del dueño, ni del mostrador. Los 10 archivos de `research/fotos/graficos-precios-referencia-NO-USAR-COMO-FOTO/` son flyers con texto quemado, logos pegados y marca de agua del propio negocio: **no entran a la página de ninguna forma** (ni de fondo, ni difuminados, ni recortados, ni como textura). Ya están transcritos en `menu-precios.md`; no hace falta ni abrirlos.

### Recortes exactos (píxeles del original; el constructor los aplica tal cual)

- **Fachada:** `crop(304, 6, 1098, 904)` → **794 x 898**. Ese recorte deja el medallón COMPLETO y el toldo rojo con "FRUTERÍA EL MILAGRO" COMPLETO, y saca fuera: el banner morado tipo vela, el recuadro verde de WhatsApp, el sello rojo "SERVICIO A DOMICILIO", la franja verde de abajo con los cuatro claims y el letrero del negocio vecino. Los cartelitos verdes de $22 y $24 que quedan dentro son cartones físicos de la tienda: esos sí van, son de ellos.
- **Interior:** `crop(395, 30, 1180, 614)` → **785 x 584**. Deja el póster de pared "FRUTERÍA EL MILAGRO" completo y saca el logo pegado, el recuadro de WhatsApp, el sello rojo, la franja verde, el círculo amarillo y las cajas de cartón con marca de proveedor.

### Consecuencia de tamaño (regla dura de esta página)

794 px y 785 px de ancho real significan que, a 390 @2x, esas fotos **no pueden pasar de 390 px CSS de ancho**. Por lo tanto:

> **Esta página no lleva ninguna foto a sangre y ninguna foto de 60 svh.** Las dos fotos reales van en marco (paspartú crema de 10 px + filete rojo de 1 px), topadas a 390 px CSS en celular y a 560 px en compu con `image-rendering` normal. El protagonista visual grande es **el logo** (1254 px, sí aguanta), no una fotografía.

Esto es deliberado y hay que defenderlo ante el inspector: la regla "una foto grande por sección" es un tope, no una cuota, y la regla "si la original es chica va en recuadro, no a sangre" gana. Una foto de 794 px estirada a pantalla completa se ve borrosa y tumba la entrega.

## AVISO 2: HOMÓNIMOS

Este negocio es **Frutería El Milagro, Av./Prolongación Tecuexe #201, Local 2, Lomas del Chapulín, C.P. 20263, Aguascalientes**. NO son este negocio ni aportan un solo dato: la Frutería El Milagro de Tijuana, la de Zapotlanejo, la de Cd. Juárez (Chihuahua), la de Cagua (Venezuela), la Carnicería El Milagro de Av. Arqueros, Cebollas Seleccionadas El Milagro S.A. de C.V., ni la ficha de Luis Navarro Sotomayor #301 que Google marca como cerrada permanentemente. Si el constructor encuentra un dato de "El Milagro" que no esté en `research/`, no lo usa.

---

## 1. EL TRABAJO

Que el que abre la página escoja uno de los ocho paquetes armados, vea escrito todo lo que trae y su precio cerrado, y lo mande por WhatsApp para que se lo lleven a su casa.

No es presentar la frutería. No es contar su historia (no la hay). Hoy un cliente nuevo tiene que escribirle al WhatsApp sólo para preguntar qué trae el paquete de $160, y la respuesta vive enterrada en un flyer publicado en un grupo de compra-venta de Facebook. La página existe para matar ese paso: el contenido completo de cada paquete, a la vista, con precio real, y el pedido escrito en un toque.

## 2. LA PROMESA

> **"Ocho paquetes ya armados, de cien a quinientos pesos, con la lista completa de lo que trae cada uno escrita, y te los llevamos a tu casa desde Tecuexe 201, Local 2, en Lomas del Chapulín."**

Sale entera de `menu-precios.md` (los ocho paquetes con precio cerrado, de $100 a $500, y su contenido textual, transcritos de sus propios flyers) y de `hechos.md` (la dirección de los posts de Facebook, el servicio a domicilio). El de al lado no la puede decir: la frutería promedio de colonia vende al peso en el mostrador y no tiene un solo paquete de precio cerrado publicado.

Dato de apoyo, real y verificable, para el hero y la sección 4: **5.0 en Google con 3 opiniones**. Se dice así, con el número de opiniones a la vista. Nunca "cientos de clientes felices".

Segundo dato de apoyo, real: **el sábado abren a las 7:00 de la mañana** (Google Maps, horario por día). Es el único de sus horarios que dice algo del negocio (abren antes que nadie el día de la compra fuerte). Va una sola vez, en la sección 3.

## 3. EL MOMENTO FIRMA: "El logo baja al toldo"

**Qué pasa.** El medallón del logo, que en el hero está enorme sobre el lienzo verde, se encoge y aterriza exactamente donde ya vive en la vida real: sobre el toldo rojo de su fachada. Es un corte de coincidencia entre el logo dibujado y el letrero de la calle. Enseña dos cosas de un golpe: cómo se llaman y dónde están.

- **Dónde:** dentro de la Sección 1 (hero). No es una sección aparte y no empuja el catálogo hacia abajo.
- **Con qué archivos reales:** `research/fotos/logo-fruteria-el-milagro-sin-recuadro.jpg` (el medallón, en `<img>`, fondo blanco recortado a círculo) y `research/fotos/fachada-tienda-real-google-maps.jpg` con el recorte `(304, 6, 1098, 904)`.
- **Cómo se dispara:** scrub de scroll, **sin pin**, sobre un tramo de **46 svh**. Progreso 0 a 1:
  - 0.00 a 0.70: el medallón pasa de **72 vw** (tope 420 px) centrado a **39.7 % del ancho del marco de la foto**, y se traslada al punto de la foto donde está el logo real: **centro en x = 57.6 %, y = 14.7 % del marco**. Sólo `transform`.
  - 0.15 a 0.55: el marco con la fachada entra de `opacity 0` a `1` y de `scale(.94)` a `1`.
  - 0.70 a 0.82: el medallón CSS se desvanece (`opacity 1 → 0`) y queda el logo que ya trae la foto. Ahí está el truco: los dos logos quedan encimados en el mismo lugar y el cambio no se nota.
  - 0.82 a 1.00: cae el renglón crema **"Tecuexe 201, Local 2. Lomas del Chapulín."**
- **Duración equivalente:** 1.1 s. **Reversible** al subir. Sin pin, sin scroll eterno.
- **`prefers-reduced-motion` y JS caído:** estado final directo, foto en su marco, medallón chico arriba del marco, renglón de la dirección visible. El blindaje de 1.6 s del kit no se toca.
- **El medallón no vuelve a aparecer grande** hasta el cierre (Sección 6). No se repite en medio.

## 4. EL COMPONENTE FIRMA: "El pizarrón de la banqueta"

No está en `COMPONENTES-USADOS.md` y no se parece a nada de las 22 muestras anteriores. Sale del negocio, no de una lista: en `fachada-tienda-real-google-maps.jpg`, parado en la banqueta junto a la puerta, hay un **pizarrón de caballete, pizarra negra con marco de madera, escrito con gis**. Ese pizarrón es el carrito de la página.

Ese objeto queda FUERA del recorte del hero a propósito: no se enseña como foto, se reconstruye en CSS y se vuelve la herramienta.

1. **La pestaña.** Barra fija al borde derecho, a media altura: 40 px de ancho, pizarra `#101007`, filete de 3 px café madera `#6B4A28`, texto vertical con gis **"MI PIZARRÓN · 2"**. Aparece sólo cuando hay algo agregado. Al tocarla abre la hoja.
2. **La hoja.** Sube desde abajo. Panel de pizarra con marco de madera de 6 px y un filo crema de 1 px por dentro. Cada paquete agregado se **escribe** con letra de gis (Caveat), un renglón por paquete, con el precio a la derecha en números de gis y una raya de gis de 1 px debajo. Al final: **"TOTAL $460"** en gis grande, y debajo, en gis chico, **"Envío: te lo confirmamos por WhatsApp."** (honesto: sus flyers se contradicen, ver PENDIENTE).
3. **Borrar.** Cada renglón trae a la derecha un borrador de 18 px (rectángulo de trazo de 1 px). Al tocarlo, el renglón se borra con un barrido de `clip-path` de 180 ms de izquierda a derecha, como el gis. Es la única animación de salida de la página.
4. **El cierre.** Botón **verde WhatsApp** "MANDAR MI PIZARRÓN", 52 px de alto, texto `#0b3d1f`, con el glifo oficial. El mensaje sale armado: "Hola, quiero pedir a domicilio: Paquete de Fruta $160, Paquete Verdura $250. Total $410. ¿Cuánto sale el envío a mi colonia?".
5. **Blindaje.** Si el JS no corre: la pestaña no aparece, la hoja no existe, y **cada renglón del catálogo conserva su propio link directo `wa.me`** con el nombre del paquete. Nunca queda un carrito vacío ni un botón muerto.
6. **Por qué no se repite con nada.** vet-inn arma una placa que renombra secciones; la-chata prende un reloj; doña Petra cambia de casa; muebles del Alba cambia el acabado de una foto; Tania gira un platón. Aquí la unidad es **el pedido escrito a mano en el pizarrón de su banqueta**.

La letra manuscrita (Caveat) existe **solamente dentro del pizarrón**. En ningún otro lugar de la página hay letra manuscrita.

## 5. HEADER Y FORMAS PROPIAS

**De dónde sale.** De su fachada real: un **toldo rojo corrido** con el nombre en blanco, mayúsculas muy espaciadas, con la orilla blanca picuda, y encima, montado a la mitad, el **medallón blanco redondo**. Todo el sitio habla ese idioma: bandas rojas rectas, un solo elemento redondo (el medallón) y cartelitos de precio como los cartones verdes escritos a mano que tienen en el piso.

### Header (propio de este sitio)

- Alto total **62 px** en celular: una franja transparente de 14 px arriba y, debajo, la **banda roja `#F90100` de 48 px** a todo lo ancho, con un filete crema de 2 px en su borde inferior (la orilla blanca del toldo).
- **El medallón del logo, 52 px, montado sobre el borde superior de la banda**, a 16 px de la izquierda: su mitad de arriba sobresale hacia el lienzo. Es literalmente cómo está en la calle.
- En la banda, centrado: **"FRUTERÍA EL MILAGRO"** en blanco, 19 px, peso 800, `letter-spacing: .2em`.
- A la derecha, dentro de la banda: una sola acción de texto, **"PAQUETES"**, 14 px, peso 700, en verde carbón `#08210E` sobre el rojo (5.6:1), con subrayado de 1 px; y la hamburguesa con la palabra **"MENÚ"** (área táctil de 44 px). **Cero botones verdes en el header.**
- **Al pasar 40 px: el toldo se recoge.** La franja de 14 px colapsa a 0, la banda baja a 42 px, el medallón se encoge a 34 px y entra completo dentro de la banda, y aparece una sombra baja. 220 ms, `--ease-out`. Ese movimiento no se usa en ninguna otra parte.

### Lenguaje de formas

- **Radio 0 en todo**: bandas, marcos, botones, renglones, hoja del pizarrón. Esquinas rectas.
- **Un solo elemento redondo**: el medallón del logo y el botón "+" de agregar (círculo de 34 px). Nada más.
- **Marcos de foto**: paspartú crema `#F4F1E6` de 10 px + filete rojo `#F90100` de 1 px. **Toda** foto de la página va así. Ninguna a sangre.
- **Cartelito de precio**: el precio de cada paquete va en un rectángulo recto con filete rojo de 1 px, inclinado **3 grados**, como los cartones escritos a mano de sus fotos. Es etiqueta, **no es botón**: no se toca, no cambia de color, no tiene hover.
- **Divisores**: línea de 1 px crema al 22 %, ancho completo. **Prohibidas las cortinas de color entre secciones.**
- **Motivo gráfico único**: el filete de 1 px. Un solo grosor en toda la página.
- **Botones**: rectangulares, radio 0, 48 px de alto, mayúsculas con `letter-spacing: .12em`, peso 700. Navegar y agregar en **rojo `#F90100` con texto `#08210E`**. Secundario de contorno crema. Terciario, texto con flecha. **Verde WhatsApp `#25d366` sólo en tres lugares de toda la página**: "PEDIR POR WHATSAPP" de la Sección 3, "MANDAR MI PIZARRÓN" dentro de la hoja, y el flotante. Tres verdes contados.

### Color (hexadecimal, de `research/colores.md`)

| Token | Hex | De dónde sale y para qué |
|---|---|---|
| `--deep` | `#08210E` | Lienzo dominante. Es el verde `#013E14` del logo oficial bajado en luminosidad. Nunca `#000`, nunca fondo blanco. |
| `--deep-2` | `#0C2A13` | Banda alterna y fondo de renglón del catálogo. |
| `--brand` | `#F90100` | **Rojo real del toldo**, muestreado de la foto de fachada (`colores.md` lo marca como el color físico del negocio, más confiable que cualquier flyer). Header, botones de navegar, el "+", precios, subrayados. |
| `--paper` | `#F4F1E6` | Crema. Texto sobre oscuro, paspartús, banda de lectura de la Sección 3. |
| `--slate` | `#101007` | Sólo el pizarrón (componente firma). |
| `--wa` | `#25d366`, texto `#0b3d1f` | Sólo WhatsApp. |

Nada de amarillo ni naranja como color de diseño: el póster de su pared sale anaranjado dentro de la foto de interior, y eso es la foto, no un token.

### Tipografía (dos familias, más el gis)

- **Títulos**: **Archivo** variable condensada, `wdth 68`, peso 880, mayúsculas. Es la que aguanta el tono de cartel de frutería sin caer en plantilla de oferta.
- **Texto y renglones del catálogo**: **Instrument Sans** 400/500.
- **Precios**: Archivo, `font-variant-numeric: tabular-nums`.
- **Gis**: **Caveat**, sólo dentro del pizarrón.
- Prohibidas Inter, Poppins y Montserrat.

---

## 6. LAS SECCIONES (seis; tope de 9,000 px en celular)

Presupuesto de alto en celular anotado por sección. Total previsto: **7,900 px**.

### Sección 1 · "El logo baja al toldo" (hero + momento firma) · 1,150 px

- **Razón de venta:** en tres segundos el visitante sabe cómo se llaman, que venden paquetes cerrados con precio, dónde está la tienda y cómo se ve por fuera. Es la única sección donde la marca manda sobre el producto, y dura una pantalla.
- **Foto asignada:** `fachada-tienda-real-google-maps.jpg`, recorte `(304, 6, 1098, 904)`, en marco, tope 390 px CSS en celular. **No a sangre.**
- **Texto clave:**
  - Título (dos tonos, la última línea en rojo `#F90100`):
    **"Ocho paquetes ya armados."**
    **"De cien a quinientos pesos."**
  - Renglón único, crema: **"Frutas, verduras y despensa. Te los llevamos a tu casa."**
  - Dato real, chico, bajo el título: **"5.0 en Google con 3 opiniones."**
  - Renglón que cae al final del momento firma: **"Tecuexe 201, Local 2. Lomas del Chapulín."**
  - Botones: **"VER LOS PAQUETES"** (rojo, ancla a la Sección 2) y **"CÓMO LLEGAR"** (contorno crema, a Google Maps). **Cero verde aquí.**

### Sección 2 · "Los paquetes" (catálogo a la vista; es la que trae el dinero) · 2,200 px

- **Razón de venta:** es la página. Ocho paquetes con precio cerrado y **la lista completa de lo que trae cada uno escrita a la vista**, que es exactamente lo que hoy obliga al cliente a escribir por WhatsApp. Va pegada al hero, sin nada en medio.
- **Foto asignada:** **ninguna**. No existe foto de ningún paquete. **Por lo tanto no hay recuadro vacío, ni caja gris, ni silueta, ni ícono de fruta:** va lista tipográfica, igual que quedó en `pozoleria-la-chata`.
- **Forma de cada renglón** (uno por paquete, altura ~230 px en celular):
  - Nombre en Archivo condensada mayúsculas, 26 px.
  - Debajo, el contenido real en Instrument Sans 13 px, crema al 72 %, separado por puntos medios.
  - A la derecha, el **cartelito de precio** inclinado 3 grados, y junto a él el **"+" en círculo rojo de 34 px**.
  - Línea de 1 px crema al 22 % entre renglón y renglón.
- **Encabezados de grupo** (Archivo 12 px, rojo, `letter-spacing: .16em`, con raya de 1 px): **FRUTA · VERDURA Y DESPENSA · TODO EN UNO**.
- **Contenido exacto (de `menu-precios.md`, sin tocar una palabra ni una cifra):**

  **FRUTA**
  1. **PAQUETE DE FRUTA · $160**: 1 kg plátano · 1 kg mango · ½ kg uva · ½ kg guayaba · 1 papaya · 1 piña. Regalo: chamoy y tajín en polvo. Renglón extra en gris: *"También lo arman con una charola de fresa en vez del mango."*
  2. **PAQUETE DE FRUTA · $200**: 1 kg plátano · 1 kg manzana verde · 1 melón · ½ melón · ½ kg uva · ½ kg guayaba · 1 papaya · 1 piña. Regalo: chamoy y tajín.

  **VERDURA Y DESPENSA**
  3. **PAQUETE VERDURA · $250**: ¾ kg jitomate · 1 kg cebolla · ½ kg tomatillo verde · ½ kg papa · ½ kg zanahoria · ½ kg calabacita · ½ kg limón · ¼ kg chile serrano · 1 kg huevo · 1 cabeza de ajo · 1 pasta La Moderna. Regalo: cilantro.
  4. **LA DESPENSA FRESCA · $340**: 1 kg jitomate · ¼ kg chile serrano · ½ kg aguacate · 1 kg tomatillo · 1 kg cebolla · 1 cabeza de ajo · 1 lechuga · ½ kg calabaza · ½ kg zanahoria · ½ kg chayote · 1 kg papa · ½ kg poblano · 1 cartera de huevo · 1 pasta La Moderna · 1 cajita de consomé.
  5. **PAQUETE DESPENSAS · $220**: 1 kg huevo · 1 kg arroz · 1 kg azúcar · 1 kg frijol pinto · 1 litro de aceite Nutrioli · 3 pastas La Moderna · 2 cajitas de consomé · 2 cubos Knorr · $20 de jamaica. Regalo: bolsita de condimento.
  6. **PAQUETE BÁSICO · $100**: ½ kg arroz · ½ kg frijol · ½ kg azúcar · 1 kg sal · 1 aceite Nutrioli de 850 ml · laurel · comino.

  **TODO EN UNO**
  7. **TODO EN UNO · $300**: 1 kg huevo · 1 kg jitomate · 1 kg tomate verde · 1 kg papa · 1 kg limón · 1 kg cebolla · 1 kg zanahoria · 1 kg calabaza · ¼ kg chile serrano · 1 kg plátano · 1 kg pepino · 1 kg mango. Regalo: bolsa de chamoy en polvo.
  8. **TODO EN UNO · $500**: 1 kg huevo · 1 kg jitomate · 1 kg tomate · 1 kg papa · 1 kg limón · 1 kg cebolla · 1 kg zanahoria · 1 kg calabaza · ¼ kg chile serrano · 1 kg plátano · 1 kg pepino · 1 kg mango · 1 papaya · 1 piña · 1 kg guayaba · 1 kg uva · 1 melón · 1 kg arroz · 1 kg naranja · 1 charola de fresa. Regalo: tajín, chamoy, pimienta y clavo en bolsita.

- **Cierre de la sección**, una sola línea, link de texto con flecha (nada de botón): **"¿Lo quieres suelto? Pregunta el precio del día por WhatsApp."** Porque no existe ni un precio por kilo publicado y **no se inventa ninguno**.
- **Sin párrafo, sin eyebrow, sin botón verde.** El único título es: **"Todo lo que trae cada uno."** / **"Escrito, no adivinado."** (segunda línea en rojo).

### Sección 3 · "Pídelo y te llega" · 900 px

- **Razón de venta:** es la sección del trabajo de la página. Quita las dos dudas que frenan un pedido a domicilio (a qué número escribo y a qué hora atienden) y es donde vive el único botón verde del recorrido.
- **Foto asignada:** ninguna. Banda de lectura crema `#F4F1E6` con texto `#08210E`, la única de la página.
- **Texto clave:**
  - Eyebrow: **"A DOMICILIO"**.
  - Título: **"Escoges, mandas, te llega."** / **"Sin salir de WhatsApp."** (segunda línea en rojo).
  - Tres pasos en renglones numerados 01, 02, 03, de una línea cada uno: **"Escoge tu paquete aquí arriba." · "Mándalo por WhatsApp al 449 215 1585 o al 449 580 4982." · "Te lo llevamos a tu casa."**
  - Aviso honesto, en chico: **"El costo del envío te lo confirmamos por WhatsApp."** (Nunca $30, nunca "gratis": sus propios flyers se contradicen.)
  - Horario, tres renglones estáticos: **"Lunes a viernes, 8:30 a 6:00." · "Sábado, 7:00 de la mañana a 4:30." · "Domingo, cerrado."** Con una frase suya al lado: **"El sábado abrimos a las siete."**
  - Botón **verde** (1 de 3 en toda la página): **"PEDIR POR WHATSAPP"**.
  - Link de texto con flecha, abajo: **"¿Mayoreo? Pregunta por WhatsApp."**
- Es la **única** sección de la página con el patrón eyebrow, título, párrafo, botón.

### Sección 4 · "Así está la tienda hoy" · 1,450 px

- **Razón de venta:** prueba. Hoy el negocio no tiene ni una cara ni una foto limpia en internet; esta sección enseña el anaquel real surtido y pone las tres reseñas de Google textuales, con nombre y estrellas. Es lo que convierte a un desconocido en alguien que sí manda un pedido de $340.
- **Foto asignada:** `interior-exhibidores-real-google-maps.jpg`, recorte `(395, 30, 1180, 614)`, en marco, tope 390 px CSS en celular. **No a sangre.**
- **Texto clave:**
  - Título encimado al pie del marco, numerado como pie de foto: **"01 / ADENTRO · Anaquel, mesa y huacales de esta semana."**
  - Renglón de dato real: **"5.0 en Google. 3 opiniones."** Una sola línea. **Nada de fila de contadores.**
  - Las tres reseñas reales de `resenas.md`, textuales, con nombre y cinco estrellitas, en bloques de cita sobre el lienzo oscuro (no tarjetas con ícono):
    - **José Estrada**, 5 estrellas: "La frutería del maxi, 100% calidad, puro Vidy talent, vayan a comprar niños está increíble"
    - **Ramon Zazueta**, 5 estrellas: "La calidad y los precios son mega guay chavalos, vayan y compren, ahí compra toda la family Vidy talent"
    - **lagrasa exe**, 5 estrellas: "La mejor calidad en cualquier producto, una excelente atención y tienen cualquier producto que les solicites"
  - Respuesta real del dueño bajo la de Ramon, en chico: **"Gracias un placer."**
- **Sin párrafo, sin botón.** Sólo el título numerado, la foto en marco, el dato y las tres citas.

### Sección 5 · "Tecuexe 201, Local 2" · 900 px

- **Razón de venta:** cerrar al que prefiere ir por su fruta, y quitarle la duda de la dirección (Google Maps no trae el número de calle y ellos no tienen sitio web; la página es hoy el único lugar donde la dirección completa está escrita).
- **Foto asignada:** ninguna. Marco vacío **no**: va un bloque de dirección grande en Archivo condensada sobre el lienzo, con el Plus Code en chico.
- **Texto clave:**
  - Título: **"Av. Tecuexe 201, Local 2."** / **"Lomas del Chapulín."** (segunda línea en rojo).
  - Renglones: **"Aguascalientes, C.P. 20263."** · **"Plus Code VQ63+MW."**
  - Los dos WhatsApp, uno debajo del otro, en Archivo grande, cada uno como link `wa.me`: **449 215 1585** y **449 580 4982**.
  - Botón: **"CÓMO LLEGAR"** (rojo, link a Google Maps con las coordenadas 21.8617493, -102.2451417). **Sin mapa embebido** que pueda no cargar.
- Sin párrafo. Eyebrow **"VISÍTANOS"**, título y bloque de datos.

### Sección 6 · "Todo listo para completar" y cierre · 1,300 px

- **Razón de venta:** es la venta del siguiente paso de KREVO. Le dice al dueño, en su propia página, exactamente qué nos tiene que mandar para que esto deje de ser una muestra y pase a ser su tienda.
- **Foto asignada:** ninguna. Cierre con el **logo al 76 % del ancho** (`logo-fruteria-el-milagro-sin-recuadro.jpg`, 1254 px, sí aguanta).
- **Texto clave:**
  - Título: **"Lo que falta para encenderla."** / **"Nos lo mandas y queda."** (segunda línea en rojo).
  - Lista de seis renglones con casilla de trazo de 1 px, sin íconos: **"Fotos de la tienda sin banner encima."** · **"Una foto de cada paquete ya armado."** · **"La lista de precios por kilo del día."** · **"Cuánto cuesta el envío y a qué colonias llegan."** · **"Precios y pedido mínimo de mayoreo."** · **"El link de cobro para pagar con tarjeta."**
  - Remate del cierre, tres palabras: **"Aquí está tu frutería."**
  - **Pie:** Facebook real (`facebook.com/p/Fruteria-El-Milagro-61590402163792/`) y WhatsApp, con logotipo **SVG de 44 px** cada uno. **Instagram no va**: su banner invita a seguirlos pero no existe cuenta verificada (queda en PENDIENTE).
  - SEO: `<title>` "Frutería en Aguascalientes | Frutería El Milagro"; meta description de 155 caracteres o menos con giro, colonia y acción; JSON-LD `LocalBusiness` sólo con nombre, dirección, los dos teléfonos, horario real y Facebook; `og:image` con el logo sobre el lienzo verde.

---

## 7. EL RITMO

- **Sección 3 es la ÚNICA** con el patrón eyebrow, título, párrafo, botón. Nunca hay dos seguidas con ese patrón porque entre la 3 y la 5 está la 4, y la 5 no lleva párrafo ni eyebrow con párrafo.
- **Sección 1**: logo gigante y movimiento de scroll. Sin eyebrow, sin párrafo.
- **Sección 2**: lista tipográfica pura. **Sin eyebrow, sin párrafo y sin botón verde.**
- **Sección 4**: pie de foto numerado, dato de una línea y citas textuales. **Sin eyebrow, sin párrafo, sin botón.**
- **Sección 5**: eyebrow, título y bloque de datos en tipografía grande. **Sin párrafo.**
- **Sección 6**: título, lista con casillas y logo grande. **Sin párrafo.**
- Alternancia de lienzo: 1 oscuro · 2 oscuro con renglones en `--deep-2` · 3 **crema** · 4 oscuro · 5 oscuro con tipografía gigante · 6 oscuro con el logo. Una sola banda clara en toda la página, y es la de leer.
- Conteo de verdes WhatsApp en toda la página: **3** (Sección 3, hoja del pizarrón, flotante). Todo lo demás es rojo de marca, contorno o texto con flecha.

## 8. LO QUE NO VA

1. **Ninguna foto a sangre y ninguna de 60 svh.** Las dos fotos reales miden 794 y 785 px de ancho; van en marco y topadas a 390 px CSS en celular.
2. **Ningún flyer** de `graficos-precios-referencia-NO-USAR-COMO-FOTO/`: ni de fondo, ni difuminado, ni recortado, ni de textura. Traen texto quemado y marca de agua del propio negocio.
3. **Nada de Higgsfield, imagen de IA, video de IA ni foto de stock de fruta.** Ni marcada como ilustrativa.
4. **Ningún recuadro vacío, caja gris, silueta ni ícono de fruta** donde falte foto de producto. Ahí va lista tipográfica.
5. **Ningún precio por kilo, ningún "desde $X", ningún costo de envío.** Los flyers se contradicen entre $30 y gratis arriba de $100. Se dice "te lo confirmamos por WhatsApp".
6. **Ningún reloj en vivo, tira de días ni riel de horas.** Son de `pozoleria-la-chata`, `los-abolengos` y `la-cochera`. El horario va en tres renglones estáticos.
7. **Ninguna cortina o persiana de lámina que sube**: es el componente firma de `la-cochera`.
8. **Ninguna cortina de color entre secciones** y ningún efecto puesto por ponerlo.
9. **Nada de cinta de medir**: no miden nada.
10. **Ninguna fila de contadores, ninguna rejilla de tarjetas iguales con ícono, ninguna píldora, ningún emoji como ícono, ningún guion largo.**
11. **Prohibidas en títulos y subtítulos**: calidad, servicio, tu mejor opción, experiencia única, todo en un lugar, sin vueltas, lo hacemos posible. Ojo: su lema impreso dice "calidad" y por eso **el lema sólo puede aparecer dentro de la imagen del logo**, nunca escrito como texto HTML.
12. **Nada de años, historia, fundadores, "desde 19xx", nombre del dueño ni foto de equipo.** No hay un solo dato.
13. **Ningún dato de los homónimos** de Tijuana, Zapotlanejo, Cd. Juárez, Cagua, la Carnicería El Milagro ni la ficha cerrada de Luis Navarro Sotomayor.
14. **Nada de Instagram ni TikTok en el pie**: no existe cuenta verificada.
15. **Nada de "Paquete Regreso a Clases $250"** en la página: es de temporada de agosto y no está confirmado que siga. Queda en PENDIENTE.
16. **Nada de naranja ni amarillo como color de diseño**, aunque el póster de su pared salga anaranjado dentro de la foto.
17. **Ningún mapa embebido** que pueda quedarse en blanco: link a Maps con coordenadas y el Plus Code escrito.
18. **Ninguna sección de blog, valores, misión, "por qué elegirnos" ni FAQ inventado.**
19. **Nunca "$0"**: los ocho paquetes tienen precio real, y lo suelto dice "Pregunta el precio".
20. **Ningún botón verde fuera de los tres contados.**

## 9. PENDIENTE-DUEÑO

El constructor crea `fruteria-el-milagro/PENDIENTE-DUENO.md` con esta lista, tal cual:

1. **Número de calle.** Los posts de Facebook dicen Av./Prolongación Tecuexe **#201, Local 2**, Lomas del Chapulín, C.P. 20263, y esa es la que se usó en la página. **La ficha de Google Maps no muestra número de calle.** Confirmar que es correcta y corregirla en Google.
2. **Costo real del envío.** Unos flyers dicen servicio a domicilio gratis en compras mayores a $100 y el de La Despensa Fresca dice $30. La página no dice ninguno de los dos hasta que el dueño confirme cuál es el vigente.
3. **Zona de reparto** (qué colonias) y **horario de entregas**.
4. **Lista de precios por kilo del día** (mango, jitomate, limón, papa, huevo, aguacate...). Hoy no hay ni un precio suelto publicado en ningún lado y por eso la página sólo vende paquetes.
5. **¿Sigue vivo el Paquete Regreso a Clases de $250?** ¿Qué paquete de temporada va ahora, en septiembre? Se dejó fuera de la página.
6. **Fotos** (lo más urgente; hoy sólo existen dos fotos reales en todo internet y las dos traen banner y texto pegados encima):
   - Fachada e interior **sin ningún banner, logo ni texto sobrepuesto**.
   - **Una foto por paquete ya armado** (los ocho), con el contenido acomodado.
   - Fotos de producto suelto: una charola de fresa, un kilo de mango, un manojo de cilantro.
   - Una foto del dueño o de quien atiende. Hoy el negocio no tiene cara en internet.
7. **Logo.** Mandar el logo en PNG con fondo transparente y en alta (hoy sólo hay un JPG de 1254 px con fondo blanco) y **decidir UN solo logo y UN solo lema**: en sus flyers usan al menos cuatro versiones distintas.
8. **¿Hay Instagram?** El banner de la fachada invita a seguirlos con el ícono de Instagram, pero no se encontró cuenta pública. Si existe, mandar el link; si no, conviene abrirla.
9. **Formas de pago.** ¿Aceptan transferencia o tarjeta? ¿Hay link de cobro? Es lo que falta para que la muestra funcione como tienda.
10. **¿Cuál de los dos WhatsApp es el de pedidos** (449 215 1585 o 449 580 4982) **y cuál el de mayoreo?** Hoy los dos aparecen juntos en todos los flyers.
11. **Mayoreo.** Google los tiene clasificados como "Mayorista de frutas" y no hay un solo dato público de mayoreo: pedido mínimo, lista de precios, condiciones de entrega.
12. **¿Desde cuándo abrieron?** No hay año ni historia en ninguna fuente.
13. **Ficha duplicada en Google.** Existe una segunda ficha "Fruteria El Milagro" en Luis Navarro Sotomayor #301 marcada como cerrada permanentemente. Confirmar si es suya y pedir que la borren, porque le roba búsquedas a la buena.
14. **Teléfono en Google.** Su ficha de Maps no tiene número cargado ("Agregar número de teléfono del lugar"). Subir el de pedidos.
