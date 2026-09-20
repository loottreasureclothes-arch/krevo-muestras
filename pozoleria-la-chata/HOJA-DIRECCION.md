# HOJA DE DIRECCION: La Chata Pozoleria
Aguascalientes. 20 sep 2026. Aprobada por Emanuel antes de construir.
Base: `research/hechos.md`, `research/menu-precios.md`, `research/resenas.md`, `research/colores.md`, `research/VENDE.md`, `research/FOTOS.md`.

## AVISO DE IDENTIDAD (leelo antes de escribir una sola linea)
`research/hechos.md` ya aclaro el lio de los tocayos. Este sitio es **La Chata Pozoleria**, Jesus R. Macias 602 esquina 20 de Noviembre, Col. Gremial, 4.6 estrellas con 159 opiniones, Facebook `/PozoleriaLaChata`, WhatsApp 449 256 3283.
**Cenaduria La Chata (Calle Libertad 909) es OTRO negocio, otro dueno, otro rating.** Tambien son otros: Tamales La Chata (4.7 / 403), Pozoleria Aguascalientes de Villas San Antonio (3.8 / 44), La Chata de Yautepec y Pozoleria La Chata de Ciudad Neza. **Ningun dato, rating, resena, direccion ni foto de esos negocios entra aqui.** Si el constructor encuentra un dato suelto de "La Chata" que no este en `research/`, no lo usa.

---

## 1. EL TRABAJO
Que el que abre la pagina un sabado o domingo mande su pedido de pozole por WhatsApp para llevar, o se pare en la esquina de Jesus R. Macias antes de las 10 de la noche: la pagina existe para llenar las 13 horas de venta que el negocio tiene a la semana.

No es presentarlos. No es contar su historia. Abren dos dias, cobran solo efectivo y Google publica una hora equivocada (3:00 cuando ellos abren 3:30): cada visita perdida por esa confusion vale el doble que en un negocio de diario. La pagina quita la duda de dia, hora y calle en tres segundos, pone la carta completa a la vista y cierra en un toque por WhatsApp.

## 2. LA PROMESA
> **"Sabado y domingo, de 3:30 a 10 de la noche, en la esquina de Jesus R. Macias y 20 de Noviembre. Cuatro punto seis en Google, 159 opiniones, y once antojitos atras del pozole."**

Sale entera de `hechos.md` (direccion, horario de su propio Facebook al reabrir, 4.6 / 159 de Google Maps) y de `menu-precios.md` (los 11 platillos). El de al lado no la puede decir: no tiene esa esquina, ni esas 159 opiniones, ni abre nada mas dos dias.

Frase de remate del propio negocio (Facebook, seccion Detalles, textual): **"Ven y disfruta el sabor de la tradicion."** Se usa UNA sola vez, en el cierre. Nunca como titulo de seccion.

## 3. EL MOMENTO FIRMA: "El medallon se sirve"
**Que pasa.** En el logo, La Chata trae una cazuela en las manos. El momento convierte ese medallon en la cazuela de verdad.

- **Donde:** arriba de la Seccion 2 (La carta), pegado al hero. Es el puente hero a catalogo, no una seccion aparte.
- **Con que foto real:** `research/fotos/logo-la-chata-facebook.jpg` (720 x 720, nitido) y `research/fotos/pozole-rojo-limon-facebook.jpg` (414 x 414, la mas limpia del set segun FOTOS.md).
- **Como se dispara:** scrub de scroll, **sin pin**, sobre un tramo de 40 svh. Progreso 0 a 1: el aro verde del medallon gira 10 grados y el disco blanco interior se abre con `clip-path: circle()` del centro hacia afuera hasta que queda la foto del pozole rojo. A 0.75 del progreso caen el nombre "Pozole rojo" y el renglon "Pregunta el precio". Equivalente a 1.1 s. Reversible al subir. `prefers-reduced-motion`: estado final directo, foto puesta.
- **Tamano obligatorio:** el circulo se queda en **200 px CSS fijos** en celular y en compu. La foto mide 414 px reales; a mas de 207 px CSS se ve borrosa a 390 @2x. No se estira, no va a sangre, no se usa de fondo.
- **Donde aterriza:** dentro del marco de la primera tarjeta de la carta, que abarca las dos columnas. El pozole rojo NO se repite despues en la pagina: esa tarjeta es su unico lugar.

## 4. EL COMPONENTE FIRMA: "El reloj de la esquina" (dos dias prendidos)
No esta en `COMPONENTES-USADOS.md` y no se parece a nada de las 12 muestras anteriores. Sale del negocio, no de una lista: **su problema real es que solo abren sabado y domingo y que Google publica otra hora.**

Es la Seccion 3, en banda de marca, sin foto. Tiene tres partes:

1. **La tira de la semana:** los 7 dias en condensada mayuscula. Lunes a viernes en gris al 35 % con una linea de 1 px encima (tachados). Sabado y domingo en blanco sobre verde `#016230`, con "3:30 a 10:00 pm" debajo en rojo `#E12E2F`. El dia de hoy trae un cuadrito rojo de 6 px arriba.
2. **El renglon vivo** (JS con `America/Mexico_City`, dos estados y nada mas):
   - Abierto: "Abierto ahora. Cierran a las 10:00." Titulo: "Estamos sirviendo." / "Hasta las 10."
   - Cerrado: "Hoy no abrimos." Titulo: "Hoy no abrimos." / "El sabado si." (el segundo renglon dice el proximo dia real: sabado o domingo).
3. **El boton** en color de marca, "APARTAR MI PEDIDO", que abre la hoja del carrito. El dia que calculo el reloj entra ya escrito en el mensaje de WhatsApp: "Hola, quiero apartar mi pedido para el sabado." El **unico** boton verde de ese flujo es el de enviar, y vive dentro de la hoja.

Blindaje: si el JS falla, la tira y el horario quedan visibles con el texto fijo "Sabado y domingo, 3:30 a 10:00 pm" y el boton sigue sirviendo. El reloj nunca inventa una hora: solo compara contra 3:30 y 10:00 de sabado y domingo.

## 5. HEADER Y FORMAS PROPIAS
**De donde salen:** de su letrero real (`letrero-exterior-facebook.jpg`). Es una **placa blanca rectangular, de esquinas rectas, colgada de un poste**, con el medallon verde encima y una franja tricolor finita en la orilla del banner. Todo el sitio habla ese idioma: placas blancas sobre fondo verde oscuro, y un solo elemento redondo, el medallon.

**Header (propio de este sitio, no se parece a ninguna otra muestra).**
- No es una barra de ancho completo. Es una **placa** de 210 px de ancho por 46 px de alto, crema `#F4EFE4`, borde de 1 px verde, radio 2 px, pegada arriba a la izquierda con 16 px de margen, como el letrero colgado del poste.
- Dentro de la placa: el medallon del logo a 34 px a la izquierda y "LA CHATA" en condensada mayuscula espaciada a la derecha.
- Fuera de la placa, a la derecha de la pantalla: una sola accion de texto, "CARTA", en verde de marca con subrayado de 1 px, y la hamburguesa con la palabra "MENU" (44 px de area tactil). **Sin boton verde en el header.**
- Al pasar 40 px: la placa se compacta a 38 px de alto, el medallon baja a 26 px y **se dibuja debajo una raya tricolor de 3 px** (verde `#016230`, blanco, rojo `#E12E2F`), como la orilla de su banner. Esa raya aparece UNA sola vez en toda la pagina, aqui. En ningun otro lado se usan verde y rojo al mismo peso.

**Lenguaje de formas.**
- Radio: **2 px** en todo (placas, tarjetas, botones). Nada redondeado, salvo el medallon y los platos.
- Marcos de foto: paspartu crema de 8 px y borde de 1 px verde al 60 %. Toda foto que no sea a sangre va asi.
- Divisores: una linea de 1 px verde al 30 %, ancho completo. **Prohibidas las cortinas de color entre secciones.**
- Motivo grafico unico: el circulo del medallon (aro de 1.5 px). Los platos de pozole se recortan redondos; nada mas es redondo.
- Botones: rectangulares, 2 px de radio, 48 px de alto, mayusculas con `letter-spacing: .12em`, finos. Navegar y agregar en **verde de marca `#016230`**; contorno para el secundario; texto con flecha para el terciario. **Verde WhatsApp `#25d366` solo en: enviar el pedido dentro de la hoja, "PREGUNTAR POR WHATSAPP" en Como llegar, y el flotante.** Tres verdes en toda la pagina.

**Color (hexadecimal, de `research/colores.md`, muestreado del logo real).**
| Token | Hex | Uso |
|---|---|---|
| `--deep` | `#0C1E13` | Lienzo dominante. Verde carbon, oscurecido del verde del logo. Nunca `#000`. |
| `--brand` | `#016230` | Verde bandera del logo: bandas, botones de navegar y agregar, aro del medallon. |
| `--accent` | `#E12E2F` | Rojo del logo: precios, "Pregunta el precio", el cuadrito del dia de hoy, raya del eyebrow. Solo acento, nunca a la par del verde. |
| `--paper` | `#F4EFE4` | Papel crema: placa del header, renglones de la carta, hoja del carrito. Nunca `#fff` de fondo. |
| `--ink` | `#0C1E13` | Texto sobre papel. |
| `--wa` | `#25d366` con texto `#0b3d1f` | Solo WhatsApp. |

**Tipografia:** titulos en condensada negra mayuscula (Archivo `wdth` 70 peso 850; alterna Oswald 700), que es el espiritu del rotulo de su letrero. Cuerpo en DM Sans 400/500. Dos familias y ya. **Nada de Inter, Poppins ni Montserrat.** Nada de tipografia caricatura: la caricatura ya la pone la mascota.

---

## 6. LAS SECCIONES (6)

### 1. La esquina (hero)
- **Razon de venta:** contesta en tres segundos las dos preguntas que hoy le cuestan dinero (que dia abren y donde esta) y empuja a la carta. Es la correccion publica del horario que Google trae mal.
- **Foto grande:** `letrero-exterior-facebook.jpg`, **en placa con marco, NO a sangre**. Recorte obligatorio: solo el cajon blanco del letrero con el logo completo, mas la palma y el cielo. **Se corta el banner de abajo**, que trae el horario viejo de la inauguracion (viernes y sabado 7:00 a 12:00, domingo desde las 2:00) y ya no es cierto. El letrero queda completo, sin cortar. La placa ocupa 62 % del ancho en celular y 58 svh de alto, sobre lienzo `--deep`.
- **Texto clave:**
  - Eyebrow: `COL. GREMIAL / AGUASCALIENTES`
  - H1 a dos tonos: **"Sabado y domingo,"** / **"hay pozole."** (el segundo renglon en `--brand`)
  - Una linea: "Jesus R. Macias 602, esquina 20 de Noviembre. De 3:30 a 10 de la noche."
  - Botones: `VER LA CARTA` (verde de marca) y `COMO LLEGAR` (contorno). Cero verde WhatsApp aqui, solo el flotante.
- **Sin video de hero.** Las fotos no alcanzan ni dan para un loop decente: no se usa `hero_video.py`.

### 2. La carta (catalogo a la vista, estilo tienda)
- **Razon de venta:** es la seccion que trae el dinero y la que hoy no existe en ningun lado: ni Facebook, ni Google Maps, ni los directorios publican una carta. Pone los 11 platillos a la vista, con "Agregar", y de paso desactiva la queja publica de "doble carta con precios distintos".
- **Foto grande:** `pozoles-mesa-tostadas-google-maps.jpg` a sangre, 62 svh, abriendo la seccion con el titulo encima. **Recorte obligatorio: se queda solo la mitad izquierda baja (aprox. x 0 a 700, y 180 a 900).** Eso saca de cuadro la servilletera y la botella de Coca-Cola (marca ajena) y el celular que esta sobre la mesa. Pasarla por Real-ESRGAN x2 antes de recortar.
- **Fotos chicas (3, el maximo):** `pozole-rojo-limon-facebook.jpg` (tarjeta de dos columnas, circulo de 200 px, es el momento firma), `pozole-verde-facebook.jpg` y `tostada-camaron-google-maps.jpg`, cada una en tarjeta de 172 px CSS de ancho. **Ninguna de las dos de Facebook pasa de 207 px CSS: miden 414 px reales.**
- **La rejilla:** 2 columnas en celular, 3 en compu. Tarjetas iguales: foto (o marcador), nombre, precio y "+". Los 11 platillos de `menu-precios.md`, en este orden: Pozole rojo, Pozole verde, Tostadas, Enchiladas rojas, Enchiladas verdes, Sopes, Tacos dorados, Flautas, Pambazos, Quesadillas, Plato hidrocalido.
- **Precios:** no existe ni uno publico. **Todos dicen `Pregunta el precio` en rojo `--accent`. Nunca "$0".** El total del carrito dice "Te lo confirmamos por WhatsApp". Debajo de la rejilla, un renglon con el unico dato real de precio que hay: "Entre $100 y $200 por persona, segun lo que reportan 9 clientes en Google."
- **Marcador honesto** en las 8 tarjetas sin foto, dentro del marco, sin foto de relleno: "Foto original: se la pedimos a La Chata." Nada de IA, nada de stock, nada de repetir las mismas cuatro fotos.
- **Texto clave:** H2 a dos tonos: **"Rojo o verde."** / **"Y nueve antojitos mas."** (segundo renglon en `--brand`).
- **Cero botones verdes WhatsApp en esta seccion.** El "+" va en verde de marca.

### 3. El reloj de la esquina (componente firma)
- **Razon de venta:** convierte las 13 horas de fin de semana en un pedido apartado y corrige de frente la confusion de horario que hoy manda gente a una puerta cerrada. Es la herramienta que justifica la suscripcion mensual.
- **Foto:** ninguna. Banda de marca, tipografica.
- **Texto clave:** titulo vivo a dos tonos, **"Hoy no abrimos."** / **"El sabado si."** (o "Estamos sirviendo." / "Hasta las 10."). Tira de 7 dias. Boton `APARTAR MI PEDIDO` en verde de marca, que abre la hoja del carrito; el verde WhatsApp vive dentro de la hoja, en "ENVIAR MI PEDIDO".
- Nota fija debajo, chiquita: "Solo efectivo en el local."

### 4. La mesa de barro (prueba real)
- **Razon de venta:** contesta "sabe bien?" con las 159 opiniones que ya tienen, que es lo unico que ningun competidor nuevo puede copiar. Tambien avisa lo del efectivo antes de que el cliente salga de su casa.
- **Foto grande:** `tostada-camaron-google-maps.jpg` a sangre, 62 svh, con el pie encimado abajo a la izquierda. Real-ESRGAN x2 antes de montarla (mide 1200 x 900 y a sangre en 390 @2x se queda corta).
- **Texto clave:** eyebrow `GOOGLE / 159 OPINIONES`. Dato gigante **4.6** con las 5 estrellas reales. H2 a dos tonos: **"Cuatro punto seis."** / **"Las tostadas son caseras."** (segundo renglon en `--brand`).
- **Tres resenas textuales de `research/resenas.md`, con nombre y estrellitas, sin editar el texto** y sin emojis:
  1. Luis Andres Esquivel Ortega, 5 estrellas: "Un lugar muy acogedor donde el pozole es el protagonista, la verdad esta muy rico, muy bien servido y definitivamente esas tostadas caseras estan de 10, ampliamente recomendado."
  2. Victor Manuel, 5 estrellas: "Muy ricos los pozoles rojo y verde, muy buenas porciones, tambien probe los tacos dorados y estaban deliciosos."
  3. Montserrat Muma, 4 estrellas: "Antojitos mexicanos 10/10. Lugar muy tranquilo, no hay musica ni tv, nada de eso. Creo que solo aceptan efectivo."
- **Nada de contadores animados de numeros inventados.** El 4.6 y el 159 son reales y son los unicos numeros de la pagina.

### 5. Como llegar
- **Razon de venta:** aterriza al que ya decidio. Un solo telefono, un solo horario, un solo mapa. Hoy tiene que cruzar Google con Facebook para saber a que hora y a que numero hablar.
- **Foto:** ninguna (ya se gastaron las 5 reales y no se rellena). Va el mapa real de Google Maps y el medallon del logo.
- **Texto clave:** H2 a dos tonos: **"Jesus R. Macias 602."** / **"Esquina con 20 de Noviembre."** Datos en renglones: "Col. Gremial, C.P. 20030, Aguascalientes", "Sabado y domingo, 3:30 a 10:00 pm", "449 256 3283", "Solo efectivo", "Para comer aqui o para llevar", codigo plus "VPV7+39".
- **Un boton verde WhatsApp:** `PREGUNTAR POR WHATSAPP` con mensaje ya escrito. Al lado, `ABRIR EN MAPS` y `LLAMAR` en contorno.

### 6. Todo listo para completar, y el cierre
- **Razon de venta:** es la venta del siguiente paso de KREVO (precios, fotos, link de cobro) y el cierre de marca.
- **Foto:** ninguna. El logo `logo-la-chata-facebook.jpg` a mas del 60 % del ancho sobre `--deep`, una sola vez, aqui.
- **Texto clave:** bloque "Todo listo para completar", con lo que falta del dueno en tres renglones cortos (precios de la carta, fotos originales de cada antojito, link de cobro con tarjeta). Cierre con el lema textual de su Facebook: **"Ven y disfruta el sabor de la tradicion."**
- **Pie:** Facebook real `facebook.com/PozoleriaLaChata` con logotipo SVG de 44 px, mas WhatsApp y Google Maps con el mismo tamano. **Nada de Instagram ni TikTok: no existen en el research.**

---

## 7. EL RITMO
Solo la **Seccion 1** y la **Seccion 5** usan algo parecido a eyebrow, titulo, linea y boton. **No son consecutivas.**

**NO llevan ese patron (y no se les debe agregar):**
- **Seccion 2:** foto a sangre con el titulo encima, momento firma y rejilla de tienda. Sin parrafo, sin boton verde.
- **Seccion 3:** herramienta pura. Sin eyebrow, sin parrafo. Titulo vivo, tira de dias, un boton.
- **Seccion 4:** foto a sangre, dato gigante y tres citas. Sin parrafo, sin boton.
- **Seccion 6:** logo grande, tres renglones de lo que falta, lema y pie. Sin eyebrow, sin parrafo.

Botones verdes WhatsApp en toda la pagina: **3** (enviar pedido en la hoja, preguntar en Seccion 5, flotante). Maximo 1 por seccion, cumplido.

## 8. LO QUE NO VA
1. **Ningun dato de Cenaduria La Chata (Libertad 909), Tamales La Chata, Pozoleria Aguascalientes, La Chata de Yautepec ni La Chata de Ciudad Neza.** Ni sus ratings (4.4, 3.1, 3.8, 4.7), ni sus resenas, ni sus direcciones, ni sus fotos.
2. **Ningun precio por platillo.** No existe carta publica. Nunca "$0" ni precios "desde". Solo "Pregunta el precio" y "Te lo confirmamos por WhatsApp".
3. **El horario viejo del banner** (viernes y sabado 7:00 a 12:00, domingo desde las 2:00) y **el 3:00 pm de Google**. Va 3:30 a 10:00 pm, sabado y domingo, que es lo que ellos mismos publicaron al reabrir. Por eso se recorta el banner de la foto del letrero.
4. **El telefono 449 215 7236** (el de Facebook) hasta que el dueno confirme. Va solo 449 256 3283.
5. **Ano de fundacion, "desde 19xx", "X anos de tradicion", nombre del dueno o de la cocinera, numero de empleados, recetas, ingredientes.** No hay un solo dato de eso en el research.
6. **Servicios que no estan confirmados:** entrega a domicilio, pago con tarjeta, reservaciones, estacionamiento, terraza, musica en vivo, cazuela u olla por litro para fiesta, cualquier paquete. Lo unico confirmado es "comer aqui y para llevar" y "solo efectivo".
7. **Platillos fuera de los 11 de `menu-precios.md`.** Y si la foto de la tostada resulta ser otra cosa, se le pregunta al dueno; no se le inventa nombre.
8. **Las resenas negativas en la pagina:** Luis Ibarra (1 estrella) y Pablo Rivera (2 estrellas) no se publican, se le reportan al dueno. La de JOSE EDUARDO SILVA no se toca: es de otro negocio mal indexado por Google.
9. **La Coca-Cola, el celular sobre la mesa y cualquier texto quemado.** Si el recorte no los saca, la foto no va.
10. **Nada de IA:** ni Higgsfield, ni imagen generada, ni video de IA, ni fotos de stock, ni renders. Las 5 fotos reales son las 5 fotos reales. Lo que falta se marca "Foto original: se la pedimos a La Chata" y se pide en PENDIENTE-DUENO.
11. **Sin `hero_video.py`.** Las fotos no dan para un loop.
12. **Sin cinta de medir, sin cortinas de color entre secciones, sin pildoras, sin emojis como iconos, sin guiones largos, sin Inter, sin Poppins, sin Montserrat, sin fila de contadores, sin rejilla de tarjetas con icono, sin pin eterno.**
13. **Palabras prohibidas en titulos y subtitulos:** calidad, servicio, tu mejor opcion, experiencia unica, todo en un lugar, sin vueltas, lo hacemos posible. Tampoco "Nuestro menu", "Sobre nosotros" ni "Contactanos" como titulo.
14. **Nada de estirar fotos:** `pozole-rojo-limon` y `pozole-verde` miden 414 px y no pasan de 207 px CSS. Si algo se ve borroso a 390 @2x, se quita y se pide.
15. **Mas de 6 secciones o mas de 9,000 px en celular.** El calculo de esta hoja da alrededor de 7,900 px.

## 9. PENDIENTE-DUENO
Va tal cual en `pozoleria-la-chata/PENDIENTE-DUENO.md` y se resume en la Seccion 6.
1. **Precios reales de los 11 platillos** (pozole rojo y verde chico y grande, orden de tostadas, enchiladas rojas y verdes, sopes, tacos dorados, flautas, pambazos, quesadillas, plato hidrocalido).
2. **Horario exacto: abren a las 3:00 o a las 3:30?** Google Maps dice 3:00, su Facebook dice 3:30. Se publico 3:30. Confirmar tambien si abren algun dia entre semana o en fiestas.
3. **Cual telefono contestan:** 449 256 3283 (Google Maps y WhatsApp) o 449 215 7236 (Facebook).
4. **Fotos que faltan** (con las 6 que hay no alcanza): fachada completa del local de dia, el interior con las mesas, pozole rojo y verde en alta (las de Facebook son de 414 px), y una foto de cada antojito sin foto: tostadas, enchiladas rojas, enchiladas verdes, sopes, tacos dorados, flautas, pambazos, quesadillas y el plato hidrocalido.
5. **Logo en alta:** vector o PNG de 2000 px o mas. Hoy solo hay un JPG de 720 px.
6. **Que platillo es exactamente el de la foto `tostada-camaron-google-maps.jpg`?** Hay camaron en la carta?
7. **Sigue el "plato hidrocalido" y que trae?**
8. **Toman pedidos por WhatsApp para llevar? Con cuanta anticipacion? Hay cazuela u olla grande para llevar?** Hoy solo esta confirmado "para llevar", nada mas.
9. **Sigue siendo solo efectivo? Quieren link de cobro con tarjeta?** KREVO lo conecta.
10. **Tienen Instagram o TikTok?** Hoy solo esta confirmado Facebook `/PozoleriaLaChata`.
11. **La queja publica de "doble carta con precios distintos"** (Luis Ibarra, 1 estrella en Google): una carta fija y publica la desactiva. Quieren responderla?
12. **Confirmar que no los confundan con Cenaduria La Chata de Calle Libertad 909**, que es otro negocio.
