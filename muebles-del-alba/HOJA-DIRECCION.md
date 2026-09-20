# HOJA DE DIRECCION: Muebles del Alba
Muestra web KREVO. Escrita el 20 sep 2026. Manda sobre cualquier texto viejo de este sitio.
Todo lo de aqui sale de `research/` (hechos.md, catalogo.md, resenas.md, colores.md, FOTOS.md, VENDE.md).
El que construye NO inventa nada. Lo que no este aqui, no va a la pagina: se anota en `PENDIENTE-DUENO.md`.

---

## 1. EL TRABAJO

Que el visitante escoja muebles con nombre, acabado y precio, arme su paquete y mande el WhatsApp ya escrito, para que el vendedor conteste "si lo tengo, hoy te lo llevo" y cierre el mismo dia.

No es presentar la muebleria. Es subir el ticket de un mueble de $6,390 a una casa completa de $15,450 a $25,190, que es lo que ellos ya venden en paquetes.

---

## 2. LA PROMESA

> **Escoges entre mas de 1400 m2 de exhibicion sobre la salida a Calvillo, lo apartas con $100 y te llega el mismo dia.**

Los tres datos son suyos y nadie mas los puede decir juntos:
- "MAS DE 1400 m2 DE EXHIBICION" (su lona de fachada y la del techo, fotos 20 y 23).
- "Sistema de apartado a 6 meses, puedes apartar con 100 pesos" (su web, Quienes somos).
- Entrega el mismo dia: leonel ruiz pidio un lunes en la manana y le llego 3 horas despues; Jose de Jesus Leos Martinez dice "a las 2 horas o menos" (resenas.md).

Frase corta de marca, la suya, para titulos: **"Los que saben de muebles."**
Frase de refuerzo, tambien suya: **"Oferta real. Sin precios inflados."** (viene en todas sus fichas).

---

## 3. EL MOMENTO FIRMA

**"Amanece sobre 1400 m2."** Se llama Muebles del Alba y su logo es un sol que sale detras de un sillon. La pagina lo hace literal una sola vez, sobre su propio piso de exhibicion.

- **Donde:** seccion 3, a pantalla completa.
- **Foto real:** `research/fotos/19-tiktok-exhibicion-panoramica.jpg`, recortada en y 470 a 1440 (queda 1080x970). Ese recorte quita el subtitulo quemado de arriba y el logo de abajo, y deja la nave con las hileras de comedores y salas, SIN gente. Es la unica foto de interior sin personas ni munecos: las 02 y 03 traen trabajadores y munecos de Halloween, no se usan.
- **Que pasa:** al entrar la seccion, un arco de fondo plano (la silueta del logo) crece desde el centro con `clip-path` y abre la foto de 42% a 100% del ancho. Al mismo tiempo la foto pasa de un grado frio y bajo (`filter: saturate(.55) brightness(.72) contrast(1.05)`, velo azulado encima) a su grado normal calido, y los 7 rayos del sol del logo se dibujan detras del titular con `stroke-dashoffset`.
- **Como se dispara:** `scrub` corto ligado al scroll, tramo de `+=60%`, SIN pin (ni en celular ni en compu). Reversible: si sube, vuelve a amanecer al reves. Total 1.2 s, `--ease-out`.
- **Texto que cae encima, en dos tiempos:** "Lo que ves aqui," / "te lo llevas hoy." (segunda linea en rojo de marca). Debajo, el dato gigante **1400 m2** en la condensada negra, con la palabra "de exhibicion" chica al lado.
- **Cierre de la escena:** un solo link con flecha, "Como llegar", que baja a la seccion 6. Aqui NO va boton verde.
- **Blindaje:** el estado final (arco abierto, foto normal, texto visible) es el CSS base. El temporizador de 1.6 s lo fuerza si falla GSAP.

---

## 4. EL COMPONENTE FIRMA

**"El interruptor de acabado."** No esta en `COMPONENTES-USADOS.md` y sale de como esta armado su catalogo: cada modelo existe en los mismos tres acabados y ellos ya tienen una ficha por acabado.

Como funciona:
- Cada tarjeta del catalogo trae, abajo de la foto, de dos a tres cuadritos de 22 px con el acabado real de ESE modelo: chocolate, nogal, gris, cafe o capuchino, segun lo que exista en `catalogo-img/`.
- Al tocar un cuadrito, la foto de la tarjeta cambia en el mismo lugar con un cruce de 220 ms (sin brincar, sin cambiar la altura de la tarjeta) y el nombre del acabado aparece en la linea del precio.
- El acabado elegido viaja al mensaje de WhatsApp y a "Mi casa": "Hola, quiero la Sala Irlanda 3-2-1 en gris, $8,590. Me la apartan?".
- **Regla dura:** si de ese modelo solo hay una foto, NO se ponen cuadritos. Nunca se recolorea una foto ni se inventa un acabado.

Por que vende: la primera pregunta en una muebleria es "lo tienes en chocolate?". Contestarla antes de que la hagan es lo que separa esta pagina de un catalogo en PDF, y es el argumento de la suscripcion mensual (el dueno cambia fotos, acabados y precios).

---

## 5. HEADER Y FORMAS PROPIAS

### De donde salen
Su logo es un sillon con un sol saliendo, dentro de un **arco de fondo plano**. Su fachada es una **viga roja** atravesada sobre la entrada con el nombre en blanco. Sus fichas de producto son **papel claro con un liston rojo arriba y una barra carbon abajo** con el telefono y el sello "OFERTA REAL". De ahi salen todas las formas de esta pagina y de ninguna otra muestra.

### Colores (de `colores.md`, en hexadecimal)
| Token | Hex | Uso |
|---|---|---|
| `--brand` | **#E0001C** | rojo de marca: viga del header, botones de navegar y de agregar, segunda linea de los titulos, liston de la ficha |
| `--brand-dk` | **#B80018** | hover y pressed del rojo |
| `--deep` | **#1E252B** | lienzo de toda la pagina (hermano oscuro de su carbon) |
| `--deep-2` | **#283038** | su carbon real: barra de precio de la ficha, bandas, pie |
| `--paper` | **#F2EFEA** | solo la loza de la ficha de producto, la hoja de "Mi casa" y el bloque "Todo listo para completar" |
| `--ink` | **#F4F1EE** | texto sobre oscuro |
| `--ink-2` | **#111111** | texto sobre papel |

Un solo acento. El amarillo lima de sus lonas NO se usa. Nada de fondo blanco plano, nada de #000 ni #fff puros.

### Header
- Celular 56 px, compu 64 px. **Solido desde el primer pixel**, no transparente: es una viga roja `--brand` de lado a lado, como la de su entrada, con una linea blanca de 3 px pegada abajo (el filo del porton).
- Logo blanco horizontal (`research/logo.png`) a la IZQUIERDA, 26 px de alto.
- A la derecha, una sola accion en texto blanco, mayusculas con `letter-spacing:.14em`: **CATALOGO**. Junto, la hamburguesa con la palabra "Menu". Sin boton verde en el header.
- **Como se compacta (propio de este sitio):** al pasar 40 px, la viga baja a 48 px y el logotipo horizontal se cambia por el icono circular del sol con el sillon (`logo-icono.png`), como si el sol se metiera en su circulo. Cruce de 200 ms.
- Panel de menu: hoja completa en celular sobre `--deep`, links numerados 01 a 05 (Catalogo, Paquetes, Exhibicion, Como llegar, Contacto), horario abajo y WhatsApp al pie del panel.

### Lenguaje de formas
- **La ficha del Alba (tarjeta de producto):** rectangulo de radio 0. Liston rojo de 4 px arriba, foto sobre loza `--paper`, y abajo barra `--deep-2` con el precio en `tabular-nums` y el boton "+" cuadrado en rojo. Es su propia ficha traducida a web.
- **Marco de arco:** las fotos protagonistas (hero en celular, exhibicion, dron) van dentro de un arco de fondo plano (`border-radius: 200px 200px 0 0`, recortado a la caja). Las fotos de producto NO llevan arco: van rectas, como en sus fichas.
- **Divisor:** linea de 1 px de `rgba(244,241,238,.16)` interrumpida al centro por un sol de 22 px con 7 rayitas, calcado del logo. Es el unico motivo grafico de la pagina, un solo grosor de trazo (1.5 px).
- **Botones:** rectangulares (radio 2 px), finos, mayusculas con `letter-spacing:.12em`, 48 px de alto. Primario relleno `--brand`; secundario de contorno blanco; terciario texto con flecha. **Verde `#25d366` con tinta `#0b3d1f` SOLO** en lo que de verdad manda WhatsApp y en el flotante. Maximo 1 verde por seccion.
- **Tipografia:** titulos en **Archivo** variable, `wdth 70`, `wght 900`, mayusculas o caja alta corta; cuerpo en **Instrument Sans** 400/500; precios en `tabular-nums`. Nada de Inter, Poppins ni Montserrat.

---

## 6. LAS SECCIONES

Siete, en este orden. Presupuesto de alto en celular a 390 px entre parentesis. Tope total: 9,000 px.

### 1. Hero: la entrada (820 px)
**Razon de venta:** el que llega de Google o de TikTok no sabe si son formales ni donde estan. Su porton rojo con el letrero completo lo resuelve en dos segundos y la promo real le da la prisa.
**Foto grande:** `fotos/01-fachada-letrero-gran-exhibicion.jpg`, recortada desde x=700 hasta el borde derecho (asi se van el Pemex, el letrero SALCE y el anuncio de alcohol; queda entero el porton "MUEBLES DEL ALBA . GRAN EXHIBICION . VEN A CONOCERNOS" y la lona del 10%). En celular va dentro del marco de arco a 46svh; en compu a sangre 16:9 con el titulo abajo a la izquierda sobre el pavimento, con velo direccional.
**Textos exactos:**
- Eyebrow: `BLVD. ADOLFO RUIZ CORTINES, SALIDA A CALVILLO`
- Titulo (dos tonos, la ultima linea en rojo): `Los que saben` / `de muebles.`
- Linea: `Mas de 1400 m2 de exhibicion. Lo apartas con $100 y te llega el mismo dia.`
- Botones: `VER CATALOGO` (rojo, baja a la seccion 2) y `COMO LLEGAR` (contorno). Sin verde.
**Debajo, pegada al hero,** una cinta carbon de 44 px con la promo real, textual: `10% de descuento en toda la tienda. Solo de contado en efectivo, hasta el 1 de octubre de 2026.` No es una seccion: es el filo del hero.

### 2. El catalogo a la vista (2,600 px)
**Razon de venta:** hoy el precio vive dentro de una imagen de Google Sites y hay que abrir 14 paginas. Sin precio a la vista el visitante se va a comparar y no vuelve. Esta es la seccion que trae el dinero.
**Foto grande:** `fotos/09-producto-sala-esquinera-gris-taburete.jpg` (1512x1152, la mejor que tienen) como banda de apertura a 60svh, con el titulo encima a la izquierda.
**Titulo:** `Todo el piso,` / `con su precio.` (segunda linea en rojo). Sin parrafo y sin boton al final.
**Como se arma:**
- Chips de categoria pegados arriba al hacer scroll, filtran en su lugar: Salas, Esquineras, Comedores, Sillas, Recamaras, Roperos, Alacenas, Porta pantallas, Mesas de centro, Bases, Colchones, Cajoneras y tocadores.
- Rejilla de 2 columnas en celular, 4 en 1440. Cada pieza es "la ficha del Alba": foto, nombre propio, precio normal tachado, precio de oferta grande, cuadritos de acabado y el boton "+" rojo.
- Precios: los de `catalogo.md`, tal cual. Ejemplos que deben verse: Sala Irlanda de $9,450 a **$8,590**; Esquinera Fer de $5,490 a **$4,990**; Comedor Alemania 4 sillas de $4,100 a **$3,690**; Comedor Paris 6 sillas de $11,000 a **$9,990**; Recamara Individual Madrid de $7,050 a **$6,390**; Ropero Rusia de $3,650 a **$3,290**; Porta pantallas Tokio de $1,900 a **$1,690**; Colchon Matrimonial Espuma de $1,750 a **$1,590**.
- **Nunca $0.** La Zapatera Clasica y el Pie de cama Baul traen dos precios distintos en su propia web: esas dos tarjetas dicen `Pregunta el precio` y el total dice `te lo confirmamos por WhatsApp`. La alacena mas barata es **$2,590**: no se usa el "desde $2,450" de su portada.
- Fotos limpias que sustituyen al recorte de ficha (usalas en la tarjeta de ese modelo): 07 sala 3-2-1, 09 esquinera, 10 silla Paris, 12 porta TV Tokio, 13 recamara nogal, 14 tocador Vanity, 15 ropero, 16 mesas de centro, 17 alacena Frutero. El resto se recorta de su ficha en `catalogo-img/`: solo la franja del mueble, entre el liston rojo de arriba y la tarjeta de especificaciones (en las fichas de 1080x1080 es mas o menos y 255 a 700).
- La tarjeta del **Tocador Vanity** lleva pegada abajo del nombre la linea textual de su ficha: `No incluye focos`. La foto los muestra prendidos.
- Linea fina al pie de la rejilla, texto suyo: `Personalizacion de color por solo $150. Mas de 90 colores para elegir.` y `Al comprar 4 sillas, aprovecha un descuento especial.`
- **Un solo verde en toda la seccion**, y va en la barra fija de abajo: `Mi casa . 3` en rojo cuando hay piezas, y dentro de la hoja el boton verde `ENVIAR POR WHATSAPP`. Los "+" son rojos.
- La marca de agua "MUEBLES DEL ALBA" de sus fotos es SU propia marca: se queda, no se borra, no se tapa con texto y no se le pone ningun titulo encima.

### 3. Momento firma: amanece sobre 1400 m2 (760 px)
**Razon de venta:** el que compra mueble tiene miedo de "te lo entrego en tres semanas". Ver el piso lleno es la prueba de que hay existencia, y la existencia es lo que permite la entrega de hoy. Es el argumento contra la competencia, y sus dos videos mas vistos (67,100 y 48,900) son justo de esto.
**Foto grande:** `fotos/19-tiktok-exhibicion-panoramica.jpg` recortada (y 470 a 1440).
**Textos:** `Lo que ves aqui,` / `te lo llevas hoy.` mas el dato gigante `1400 m2` con "de exhibicion" chico al lado. Link con flecha: `Como llegar`. Mecanica en el punto 3 de esta hoja.

### 4. Paquetes: arma tu casa (1,500 px)
**Razon de venta:** aqui esta el dinero grande. Ellos ya venden paquetes de $9,990 a $25,190 con ahorros de $1,610 a $3,990, pero hoy son solo seis imagenes sueltas. Puesto como tienda, el ticket pasa de un mueble a una casa.
**Foto grande:** `fotos/13-producto-recamara-nogal-cabecera-capitoneada.jpg` (trae sus cojines rojos con el logo: es el momento de marca dentro del objeto).
**Titulo:** `Pa' que te animes.` (asi se llama su seccion) y debajo, chico, su linea textual: `Arma tu paquete a tu gusto y te damos un descuento adicional sobre el total.`
**Los seis paquetes reales, con nombre y precios de `catalogo.md`:** Pa' que te duermas $11,600 a **$9,990**; Pa' que te independices $13,550 a **$11,690**; Pa' que te alcance $17,900 a **$15,450**; Capitoneado $21,700 a **$18,690**; Plus $23,150 a **$19,990**; Deluxe $29,180 a **$25,190**. Cada uno lista sus piezas con el texto real y un boton `AGREGAR A MI CASA` en rojo.
**Prohibido** pegar la imagen del paquete de `catalogo-img/paquetes-*.jpg`: son carteles con el precio quemado. Las piezas se muestran recortadas de sus fichas y el texto va en HTML.
**El descuento adicional no se calcula**: no sabemos la regla. La hoja de "Mi casa" dice `El descuento adicional te lo confirmamos por WhatsApp`.

### 5. Lo pidio un lunes (820 px)
**Razon de venta:** justo antes de mandar el mensaje hay que quitar el miedo a la entrega y al enganche. Se quita con sus resenas reales y sus tres promesas escritas.
**Sin foto grande.** Es la pausa tipografica de la pagina: una cita gigante sobre carbon, con su autor.
**Cita gigante, textual de `resenas.md`:** `Nos llego 3 horas despues cuando otras tardan dias.` y abajo, chico: `leonel ruiz, 5 estrellas, Local Guide`.
**Debajo, las cuatro resenas reales** con nombre, estrellitas y antiguedad: Jose de Jesus Leos Martinez, Angelica Sanchez, leonel ruiz y Rafael Hernandez. Estrellas solo aqui, solo de estas cuatro. Se puede escribir `4.7 en Google` porque es su calificacion real. **Nada de filas de contadores ni numeros inventados.**
**Tres renglones con sus promesas textuales:** `Entrega expres sin costo dentro de la ciudad de Aguascalientes.` / `Sistema de apartado a 6 meses: apartas con $100.` / `3 meses de garantia a cualquier defecto de fabrica.`

### 6. Ven a la exhibicion (1,250 px)
**Razon de venta:** su video mas visto (67,100) es "no ubicas donde estamos?". Si no llegan, no compran. Aqui va el unico verde de la seccion, para agendar la visita con el mueble que quieren ver.
**Foto grande:** `fotos/23-dron-techo-tienda.jpg` (720x1280) dentro del marco de arco, vertical, NO a sangre porque es chica. Se ve la lona completa `MUEBLES DEL ALBA . MAS DE 1400 m2 DE EXHIBICION`, sin texto quemado.
**Titulo:** `A un costado` / `del Rio San Pedro.` (segunda linea en rojo).
**Datos textuales:** `Av. Adolfo Ruiz Cortinez 4-A, sobre Lopez Mateos, rumbo a salida a Calvillo, a un costado del Rio San Pedro.` y su referencia de TikTok: `Frente al ex salon del Alba.`
**Horario en renglones:** Lunes a viernes 10:00 a 19:45 / Sabado 10:00 a 19:00 / Domingo 11:00 a 16:00. Con una nota chica: `Confirmanos por WhatsApp antes de venir.` (el horario de cada dia esta por confirmar con el dueno).
**Botones:** `ABRIR EN MAPS` en rojo (maps.app.goo.gl/HFFrFwkFvdcXpCWi9) y **el verde** `AGENDAR MI VISITA`, que manda: "Hola, quiero pasar a ver ___ en la exhibicion. Que dia me recomiendan?".
**Dato de Google Maps que si se puede poner, chico:** entrada, estacionamiento y sanitarios accesibles para silla de ruedas.

### 7. Cierre, lo que falta y pie (1,050 px)
**Razon de venta:** el cierre sella la marca y el bloque de pendientes vende el siguiente paso del trato (que el dueno mande precios, fotos y link de cobro para prender la tienda).
**Sin foto:** banda roja `--brand` con el logotipo blanco ocupando mas del 60% del ancho y la frase `Los que saben de muebles.` Debajo, en banda papel, **"Todo listo para completar"** con lo que necesitamos del dueno (lista del punto 9).
**Redes reales, logotipo SVG de 44 px:** Facebook (facebook.com/MUEBLESDELALBA), Instagram (@mueblesdelalba), TikTok (@muebles.del.alba), YouTube y WhatsApp (wa.me/524491236034). Solo esas.
**Pie:** carbon, telefono 449 123 6034, direccion, horario y el sello suyo `Oferta real. Sin precios inflados.`

**Suma del presupuesto: 8,800 px.** Si se pasa, se recorta la rejilla del catalogo a 10 tarjetas visibles por chip, no se quita ninguna seccion.

---

## 7. EL RITMO

Ninguna pareja de secciones seguidas repite el patron eyebrow, titulo, parrafo, boton.

| Seccion | Patron | Como se rompe |
|---|---|---|
| 1. Hero | Si (unica vez arriba) | Termina en cinta de promo, no en parrafo |
| 2. Catalogo | **NO** | Foto a sangre con tres palabras, chips pegados y rejilla de fichas. Sin parrafo, sin boton de cierre |
| 3. Momento firma | **NO** | Foto a pantalla, cuatro palabras, dato gigante y link con flecha |
| 4. Paquetes | **NO** | Titulo corto y seis tarjetas. Sin eyebrow y sin parrafo |
| 5. Lo pidio un lunes | **NO** | Pausa tipografica: cita gigante, resenas y tres renglones. Sin foto |
| 6. Ven a la exhibicion | Si | Es la unica abajo, y lleva foto en arco y horario en renglones |
| 7. Cierre | **NO** | Logotipo grande, banda papel y redes |

Maximo dos verdes en toda la pagina (el de "Enviar por WhatsApp" en la hoja de Mi casa y el de "Agendar mi visita") mas el flotante. Todo lo demas es rojo de marca o link con flecha.

---

## 8. LO QUE NO VA

- Cinta de medir, reglas, cotas: no miden nada, revenden mueble armado.
- Cortinas de color entre secciones. Ningun cuadro rojo que barra la pantalla.
- Pin eterno, scroll secuestrado, mas de un momento ligado al scroll.
- Higgsfield, imagenes de IA, video de IA, fondos generados. Prohibido tambien usar `catalogo-img/demostraciones-*.jpg`: su propia web dice que esos fondos son generados por IA.
- La foto `04-calle-edificio-letrero.jpg` (trae la marca "Contenido generado por IA" de Google y letreros ajenos: Pemex, Farmacias Similares, Plaza San Gabriel). La `06-fachada-google-maps.jpg` por lo mismo. La `05-acceso-lateral-bodega.jpg` y la `22-dron-atardecer-ciudad.jpg` por marca ajena y texto quemado. Las `02` y `03` por la gente y los munecos. La `20` porque el letrero sale cortado y trae subtitulo quemado.
- Fotos a sangre cuando la original mide menos de 1,200 px de ancho (11, 18, 22, 23): esas van en marco.
- Titulos o subtitulos con: calidad, servicio, tu mejor opcion, experiencia unica, todo en un lugar, sin vueltas, lo hacemos posible.
- Contadores inventados, "mas de 1,000 clientes felices", "+685 familias". Solo 4.7 en Google y las cuatro resenas con nombre.
- Precios inventados o redondeados, "desde $0", totales calculados con el descuento de paquete.
- Decir que aceptan tarjeta, meses sin intereses o credito. No esta verificado. La pagina solo dice lo de contado en efectivo para el 10%.
- Decir que tienen sucursal en Juan Pablo II. Su WhatsApp Business trae esa direccion y no cuadra: no se publica hasta preguntarle.
- Guiones largos, fuente Inter, emojis como iconos, pildoras, naranja, rejillas de tarjetas iguales con icono, fondo blanco plano.
- Mas de 8 botones verdes (aqui son 2 mas el flotante), y ningun verde en el header ni en el hero.
- Tapar o borrar la marca de agua de sus fotos de producto, o poner titulos encima de ella.
- Cerrar el servidor local http://localhost:8770/ o matar Chromes que no abriste tu.

---

## 9. PENDIENTE-DUENO

Va en `PENDIENTE-DUENO.md` del sitio y en la seccion 7 "Todo listo para completar".

1. Ano exacto en que abrieron (hoy solo dicen "mas de 30 anos").
2. La direccion de Blvd. Juan Pablo II 3 de su WhatsApp Business: es otra sucursal, bodega o error?
3. Formas de pago: tarjeta, meses sin intereses, credito? Hoy el 10% solo aplica de contado en efectivo.
4. La regla del descuento adicional de paquete: porcentaje fijo? desde cuantas piezas?
5. Precio por pieza suelta de las salas (sofa, loveseat, individual) para prender "Arma tu sala".
6. Foto del muestrario de las 5 telas y de los mas de 90 colores.
7. Que esta en existencia hoy, para poder marcar "entrega el mismo dia" solo cuando sea cierto.
8. Horario confirmado de cada dia (solo esta verificado el sabado, por Google Maps).
9. Precio bueno de la Zapatera Clasica y del Pie de cama Baul: su web trae dos distintos ($2,450 contra $2,390 y $2,390 contra $2,290).
10. La alacena mas barata: $2,450 de la portada o $2,590 de la ficha?
11. En la foto 08 del comedor Paris se cuentan 8 sillas y el archivo dice 6. Confirmar antes de colgarla de un modelo con precio.
12. Confirmar el acabado de las fotos 15 (ropero, se ve negro y dice chocolate) y 16 (mesas Hongo, igual).
13. Link de cobro o pasarela, si quieren cobrar en linea.
14. Fotos que faltan: entregas, el camion de reparto, el equipo, y detalle de telas en alta resolucion.
15. Seguidores y contenido de Instagram y Facebook (no se pudieron leer sin sesion).
16. Nombre de la fuente de su logotipo.
