# Que Conchas! · Hoja de dirección (1 oct 2026)

Manda sobre cualquier costumbre de otras muestras. Todo dato duro sale de `research/hechos.md`, `research/FOTOS.md` y `research/colores.md`. Lo que no esté ahí, no va. OJO: ya existen Tania Repostería (platón giratorio), Pastelería León y Panadería Miky. Esta es **rosa concha y café tostado, letra de panadería suave y gruesa, y todo con forma de CONCHA (el círculo rayado en gajos de su logo)**. Nada de marrón rústico de panadería artesanal, nada de pizarrón con gis, nada de trigo dibujado, nada de platos giratorios.

## El TRABAJO de la página
Que alguien que quiere sorprender a otra persona o se antojó pida en 1 toque: **qué toca este mes o qué relleno quiere → para cuándo → WhatsApp** al 449 206 3798 (`https://wa.me/524492063798?text=...`; confirmado: está en su bio de Instagram, en sus publicaciones y en TikTok). No tienen local: es cocina con recoger y entrega a domicilio. Hoy no tienen página y sus menús viven en historias de Instagram que solo ve quien tiene cuenta.

## La promesa (solo ellos la pueden decir)
**"Conchas rellenas, y un antojo distinto cada mes."** Seis años ("En Que Conchas cumplimos 6 años", agosto 2026). Conchas rellenas todo el año y un especial por temporada que ellos mismos anuncian: rosca de reyes rellena en enero, roles de canela con 3 leches y conchas de corazón en febrero, kit para decorar conchitas en Día del Niño, desayunos sorpresa en Día de las Madres y del Padre, concha elote en septiembre, pan de muerto relleno en octubre y noviembre.

## Identidad
- Lienzo **crema `#FAF4F4`** con bandas **rosa claro `#EED5D6`**. Color de marca **rosa concha `#DFAAA9`** (fondos de concha, bandas) y **café tostado `#806257`** (texto, botones de navegar con texto crema, segunda línea de titulares). Tinta **café oscuro `#3B2A24`**. Una banda café tostado en toda la página (rellenos). Nada de naranja, rojo ni negro.
- Botones de navegar: café tostado sólido, muy redondeados arriba y rectos abajo (media concha: `border-radius: 28px 28px 6px 6px`), texto crema en mayúsculas ("VER QUÉ TOCA", "VER RELLENOS"). Secundario: texto café con subrayado ondulado rosa. **VERDE `#25D366` SOLO** en "Pedir por WhatsApp" y el flotante. Máximo 1 verde por sección.
- Tipografías (Google Fonts, nada de Inter): títulos **Young Serif** (grande, interlineado 1.0); cuerpo y etiquetas **DM Sans** 400/500/700. Nada de Fredoka, Nunito, Pacifico, Fraunces ni Playfair.
- Logo real: `logo-fb-720.jpg` (círculo rosa, dos conchas, "Que Conchas!" en letra de mano café). Úsalo tal cual a 56 px en header y más grande en el pie (súbelo con Real-ESRGAN x4 mezclado 50 % con el original si se ve blando). No redibujar. Favicon: el logo.

## Lenguaje de formas propio: LA CONCHA
- **El círculo rayado**: las fotos de producto van en círculo o en "media concha" (arco arriba, recto abajo) con un filete café de 2 px; los contenedores importantes llevan arriba un borde de **gajos de concha** (curvas paralelas que nacen de un punto, SVG, rosa sobre crema).
- Divisores: una fila de 7 conchitas mini en SVG (círculo con 4 rayas curvas), rosa y café alternadas.
- Etiquetas de foto: **banderita de pan** (rectángulo crema con palillo, como las que se clavan en el pan): "PAN DE MUERTO RELLENO", "ROL DE CANELA CON 3 LECHES".
- Prohibido: trigo, rodillos, gorros de chef, corazones regados, confeti, emojis.

## Header propio: HOY TOCA
- Barra crema de 60 px con borde inferior de gajos rosa. Izquierda: logo real. Centro (en celular, segunda línea de 26 px que se queda fija): **"Hoy toca: Pan de muerto relleno"**, calculado con el mes real del visitante (hora de America/Mexico_City) según el calendario de abajo; es enlace a `#calendario`. Derecha: botón café "PEDIR" (a `#pedido`) + hamburguesa.
- Hamburguesa a pantalla completa rosa claro con ligas en Young Serif café: Qué toca · Rellenos · Desayunos sorpresa · Cómo pedir · WhatsApp (verde).

## Componente firma (anotar en COMPONENTES-USADOS.md): LA CONCHA DEL AÑO
Sección `20-calendario`. Una **concha grande vista desde arriba cuyos 12 gajos son los 12 meses** (SVG: círculo partido en 12 gajos curvos como el rayado de una concha, iniciales de mes en cada gajo). El gajo del mes actual llega encendido en café con la banderita "HOY TOCA". Al tocar un gajo (o deslizar la tira de meses que va debajo en celular) cambia la ficha de al lado: foto real en círculo, nombre del especial y SU frase literal entre comillas:
- ENE · Rosca de reyes rellena · `ig-01` · "Rosca rellena Nevada" como variante («Diseñada para quienes aman la parte nevada de la rosca»).
- FEB · Roles de canela con 3 leches y conchas de corazón · `ig-04` o `ig-05` · «Vive la experiencia con su delicioso 3 leches». También la concha rellena de tamal por la Candelaria.
- ABR · Kit para decorar conchitas · `ig-07` o `ig-08` · «incluye todo lo necesario para que los peques dejen volar su creatividad… ¡y después se lo coman!»
- MAY · Desayunos sorpresa de Día de las Madres · `ig-11` · «Pedidos abiertos para este 10 de mayo / Cupo limitado».
- JUN · Desayunos sorpresa de Día del Padre · `ig-13` (detalle) · «Regálale ese momento donde abra la puerta, ve la sorpresa y entienda que alguien pensó en él.»
- AGO · Aniversario · `ig-16` (la concha con "6 años") · «En Que Conchas cumplimos 6 años».
- SEP · Concha elote · `ig-18` · «Septiembre sabe a México! CONCHA ELOTE».
- OCT y NOV · Pan de muerto relleno · `ig-20` (recortada sin el empaque de marca ajena) · «Comenzamos con la temporada de pan de muerto relleno».
- MAR, JUL y DIC · sin especial publicado: la ficha dice "Conchas rellenas todo el año" con `fb-01` (subida con Real-ESRGAN y mezclada) y el link a rellenos. No inventes especiales.
Cada ficha lleva el link café "Pedir este" que lo guarda (sessionStorage) y baja a `#pedido`. Si el especial no es del mes actual, la ficha avisa "Vuelve en <mes>. Pregunta si ya hay pedidos." Sin JS: lista de meses con su especial.

## Momento firma: LA CONCHA SE ABRE
Sección `30-rellenos`, banda café tostado. Una concha grande en SVG vista de lado (domo con su rayado de azúcar) que **se parte en dos con el scroll**: la tapa sube y gira unos grados, y del centro va saliendo el relleno, que cambia de color mientras los nombres de los rellenos aparecen uno por uno a un lado, en Young Serif crema: Arroz con leche · Fresas con crema · Oreo · Gansito · Lotus · Tamal. rAF, reversible, sin pin, sin GSAP. Con reduced-motion o a los 1.6 s: abierta, con los seis nombres. Debajo: «Es una locura todos los rellenos que tenemos para ti, atrévete a probarlos todos» (cita literal) y fotos reales chicas en círculo: `fb-01` (fresas con crema, chocolate y oreo), `ig-17`, `ig-16`. Al tocar un relleno se marca y entra al pedido. "Tamaños y precios: pregúntalos."
Los nombres de marca de los rellenos van como ellos los escriben; en las fotos, los empaques de marcas ajenas se recortan.

## Secciones (6 + footer; tope 9,000 px en celular)

| # | Slug | Razón de venta | Qué pasa | Foto grande |
|---|---|---|---|---|
| 1 | `10-hero` | El antojo, de inmediato | Cartel: `ig-20-pan-muerto-lotus-a.jpg` recortada al pan (sin el empaque) en media concha grande, sobre rosa claro. Título: **"Conchas rellenas, / y un antojo distinto cada mes."** (segunda línea café tostado). Línea: "Panes rellenos, ramos de pan y desayunos sorpresa · Aguascalientes · Recoger o entrega a domicilio". Dato: "6 años horneando". Botón café "VER QUÉ TOCA" + link "Pedir". Sin verde. La foto del hero cambia según el mes si hay foto de ese especial; por defecto la de pan de muerto. | ig-20 |
| 2 | `20-calendario` | "¿Quieres el de este mes?" | Componente firma. Título: **"La concha del año. / Toca un mes."** 0 verdes. | fichas |
| 3 | `30-rellenos` | El producto base | Momento firma. Título: **"Seis rellenos / para empezar."** 0 verdes. | concha SVG + fotos |
| 4 | `40-desayunos` | Regalo: el ticket alto | **"Desayunos sorpresa / y ramos de pan."** Fotos grandes `ig-11`, `ig-13`, `ig-03` (San Valentín) en media concha, y texto: "Detalles comestibles" (su bio), "Desayunos personalizados", «Entregas a domicilio 🚗 Aguascalientes» sin el emoji. NO usar las fotos con juguetes y botanas de marca (`fb-02` a `fb-06`) ni la de la señora (`ig-10`). Link "Pedir un desayuno sorpresa" que lo marca en el pedido. 0 verdes. | ig-11 |
| 5 | `50-pedido` | El trabajo de la página | `id="pedido"`. **"Haz tu pedido. / En un mensaje."** Nota de pedido en papel crema con borde de gajos: Qué quieres (lo elegido en el calendario o en rellenos; se puede cambiar: Conchas rellenas · El especial del mes · Desayuno sorpresa · Ramo de pan) · Para cuándo (`input date`, mínimo mañana) · Recoger o entrega a domicilio · Dedicatoria (texto opcional, solo si eligió desayuno o ramo) · Nombre. Botón verde "Pedir por WhatsApp": "Hola Que Conchas, quiero pedir: pan de muerto relleno. Para el 30 de octubre. Entrega a domicilio. Dedicatoria: Feliz cumpleaños, Ana. Mi nombre: Luis". Renglones vacíos se omiten. A un lado: horario literal de su bio: Lunes a viernes 9:45 a 12:45 y 4:30 a 8:30 · Sábado y domingo 10:00 a 12:00 y 4:30 a 8:30, con estado en vivo "Atendiendo ahora / Abrimos a las 4:30". "Sin local: cocina con recoger y entrega. La dirección para recoger te la damos al confirmar." Instagram, Facebook y TikTok con logotipo SVG 44 px. 1 verde. | nota |
| 6 | `60-cierre` | Último empujón + siguiente paso | Foto grande `ig-04` o `ig-21` recortada, con **"Tu antojo / ya está anotado."** (sin elegir: **"Falta elegir / tu antojo."**) + botón verde. Antes, **"Todo listo para completar"** (renglones con conchita): menú de rellenos con tamaños y precios (hoy vive en historias de Instagram) · precios de desayunos sorpresa y ramos · zonas y costo de entrega · con cuántos días se pide · formas de pago · dirección para recoger · nombre de quien hornea · link de cobro. "Tarjeta en línea: te mandamos el link." y "Pásanoslo por el mismo chat donde te llegó esta muestra." | ig-04 |
| F | footer | Contacto real | Rosa claro: logo grande, "Conchas & panes rellenos", WhatsApp, horario, redes, "Muestra de diseño hecha por KREVO con las fotos públicas de Que Conchas." | |

Ritmo: 1 cartel con pan en media concha · 2 concha de 12 gajos que cambia la ficha · 3 café con concha que se abre · 4 fotos grandes de desayunos · 5 nota de pedido · 6 foto con remate.

## Movimiento
Títulos que suben 12 px con desvanecido por línea (450 ms, una vez). Gajo que se enciende. Ficha con cruce de 240 ms. Concha que se abre con el scroll. Banderitas que se clavan (caen 10 px, una vez). Sin pin, sin cortinas, sin parallax, sin contadores, sin video.
Blindaje anti-blanco: `[data-reveal]` visible a los 1.6 s pase lo que pase; sin `scroll-behavior: smooth`; sin clip-path animado sobre img lazy; fotos que venden sin lazy.

## Fotos
- Reales y grandes (NO pasar por Real-ESRGAN): `ig-01`, `ig-04`, `ig-05`, `ig-07`, `ig-08`, `ig-09`, `ig-11`, `ig-13`, `ig-16`, `ig-18`, `ig-20` a `ig-23`, `ig-03`.
- Medianas: `ig-02`, `ig-06`, `ig-12`, `ig-17`; `fb-01` (736 px) solo chica o subida con Real-ESRGAN mezclado 50 % más grano.
- **Recortar:** empaques y frascos de marcas ajenas (en `ig-20` a `ig-23`), la tarjeta ajena de `ig-01`.
- PROHIBIDAS: `fb-02` a `fb-06` (juguetes y botanas de marca), `ig-10` (persona), `ig-14`, `ig-15`, `ig-19`, `ig-24`, `ig-25`, `fb-07`, `fb-08` (texto encimado, promos vencidas o baja resolución).
- Nada de IA generativa ni stock. og:image 1200x630 con PIL: pan de muerto a la derecha en media concha sobre rosa claro, "Conchas rellenas, y un antojo distinto cada mes." en Young Serif café.

## Lo que NO va
Precios, tamaños o gramos inventados, promos vencidas (2x1 de aniversario), dirección, "zona Centro", dueña con nombre, el lema de terceros ("pensamientos panosos"), especiales en meses sin publicación, reseñas o estrellas (no tienen), fotos con marcas de juguetes o botanas, la señora del Día de las Madres, "artesanal", "calidad" y "servicio" en títulos, contadores, rejilla de íconos.

## PENDIENTE-DUEÑO
Menú con precios · tamaños · zonas y costo de entrega · anticipación · pago · dirección para recoger · nombre · permiso para la foto de la señora · reseñas.
