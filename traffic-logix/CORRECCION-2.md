# CORRECCION-2 · traffic-logix (GTLO) · 30 sep 2026

Aplica los 12 cambios de REVISION-2, en orden, más las 6 decisiones del orquestador. `index.html` se arma con `python3 build.py`; no se editó a mano.
Verificado con krevo-shot m y d: **0 alertas** en los dos (sin consola, sin 404, sin scroll horizontal, sin invisibles). Alto en celular: **8,360 px** (antes 8,106; tope 9,000). Compu: 7,796 px. Fuentes: solo Overpass y Overpass Mono. 4 enlaces de WhatsApp (3 verdes en página + flotante, máximo 1 por sección).
Capturas y hojas: `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/r2fix-traffic-logix/` (`hoja-celular.jpg`, `hoja-compu.jpg`, `hoja-820.jpg`, `hoja-cotizador.jpg`, `final-m/`, `final-d/`, `out-sheet.jpg` con las 6 fotos nuevas, `img-old/` respaldo de las imágenes anteriores).

## Aplicado

| # | Qué | Cómo quedó |
|---|---|---|
| 1 | El convoy con fotos reales | Fuera los 3 SVG. Cinco placas-foto 4:3 en marco de señal blanca de 8 px con filete, cada una con su número económico, que confirmé abriendo cada foto: **UNIDAD 126** (fb_02, Sprinter de noche), **123** (fb_06, Hiace por detrás), **121** (ig_2022-06-22, recorte a la del frente), **114** (ig_2022-06-21a; el 4 sale cortado en la orilla, anotado en PENDIENTES) y **152** (recorte más cerrado de la Sprinter ya tratada). Modelo debajo en amarillo (MERCEDES SPRINTER, TOYOTA HIACE, NISSAN URVAN). Fotos chicas: 230 px en celular y ~220 px en compu (nunca a todo el ancho). Movimiento ligado al scroll, reversible y sin pin: en celular la fila completa pasa de derecha a izquierda y termina con la 152 alineada; en compu cada placa llega por la derecha y frena en su lugar, sin encimarse. Sin JS o con movimiento reducido la fila se recorre con el dedo. |
| 2 | Hero de celular como cartel | La foto ocupa `min(134vw,64svh)` bajo el pórtico (la foto termina a 2/3 de la pantalla), encuadrada en la Urvan 116 con su logo. El título monta sobre su último tercio. Sin velo de color: máscara que desvanece la foto sobre el mismo asfalto con grano, así que ya no hay raya de corte (celular ni compu). h1 47.6 px contra h2 36.7 px en celular (antes 37.4 contra 42.9). Sin el hueco bajo "Cotizar mi ruta". `sizes` y preload a 180vw. |
| 3 | La cita a sangre | fb_01 (la Hiace con la bandera) a todo el ancho: 120vw en celular y 90svh en compu. Encima, en el cielo: 5 estrellas, "sus camiones siempre los tiene impecables" en Overpass 900 blanco (hasta 72 px), "Erik Mendozasantos, en Google" y el link "4.9 · 11 opiniones". Fuera la caja `.fl-q`. |
| 4 | La señal con cuerpo | Viga de armadura de 13 a 16 px con celosía diagonal; panel con esquinas de 10 px, 4 remaches, brillo reflejante y pestaña amarilla **24 H**. En compu los postes bajan hasta el piso de la columna, por fuera de la foto. Nunca vacía: renglones fantasma al 25 % (PERSONAL EMPRESARIAL / 45 PASAJEROS / L A V · 3 TURNOS; para otros servicios 6 PASAJEROS / 12 OCT · 05:30 / AGS → GDL) que se vuelven sólidos con el "clac" al elegir; los fantasmas van con `aria-hidden`. Ya no existe "ELIGE SERVICIO". Pasajeros arranca vacío con "¿Cuántos?". Foto por defecto bajo la señal (compu): ig_2022-03-06, fila de unidades en la calle (ya no se repite fb_01). En compu el botón verde quedó en la columna del formulario, pegado a él. |
| 5 | Cierre | Sin elección: **"¿A dónde / vamos?"**; con elección: **"Tu ruta / ya está rotulada."**. Señal de ejemplo con panel blanco al 100 % y solo el texto en gris #9a9a94, con pestañas EJEMPLO y 24 H. Nada de opacidad sobre el panel. |
| 6 | Remate y pie | Antes del pie, la 126 por la carretera rumbo a la sierra (wix_van_carretera_126): a sangre en celular y en marco de señal de 800 px máximo en compu, con el lema "Transportarte es / nuestra especialidad." y la placa "KM 100". Pie en una línea: logo, 449 468 3835 en Overpass normal, redes con SVG de 44 px y la línea de KREVO. Sin dirección repetida (está en Base). |
| 7 | Ejecutivo (decisión 6 del orquestador) | Se queda el cofre con su logo (foto real suya) con pie neutro **"UNIDAD CON RÓTULO GTLO"**; alt sin "pendiente". El pendiente pasó al renglón 06 de "Todo listo para completar": "Fotos de interiores, de sus operadores y de su unidad ejecutiva." |
| 8 | Tarjetas | Foto hasta la orilla de la señal (sin marco dentro de marco), 16:11; pie en mono MAYÚSCULA de 11 px sobre la foto abajo a la derecha, junto a la placa. Fuera el cuadro `.exit`: un solo llamado (COTIZAR). `:active` con escala .985 y borde amarillo. |
| 9 | Base con prueba de 24 h | Foto chica (200 px celular, 280 compu) en marco de señal con la Hiace 123 al anochecer y faros encendidos (ig_2022-06-07), placa UNIDAD 123 y pie "Unidad 123, al anochecer." (no afirma lugar). |
| 10 | Viudas y punto medio | `text-wrap:pretty` en todo `p` y `li`. El punto medio ahora es un punto CSS de 5 px con margen fijo de 9 px a cada lado (el glifo de Overpass no tiene avance y por eso se cargaba); verificado con captura del menú. |
| 11 | Estados al tocar | `:active` (escala .97, 120 ms) en fichas, días, turnos, − y +, links con flecha, redes, hamburguesa y menú; `:focus-visible` con anillo amarillo de 2 px a 2 px. Pasó de 3 a 10+ reglas. |
| 12 | Ritmo vertical | Una escala de padding de sección: celular 56/40, compu 96/72 (señal 96/56 porque su columna derecha ya baja con los postes). |

## Pruebas del cotizador (celular 390, URLs reales decodificadas)
- Sin elección: `https://wa.me/524494683835?text=Hola GTLO, quiero cotizar transporte.`
- Personal (45, L a V, 3 turnos, Nissan Planta, Ana): `https://wa.me/524494683835?text=Hola GTLO, quiero cotizar transporte de personal para 45 pasajeros, de lunes a viernes, turnos matutino, vespertino y nocturno. Empresa: Nissan Planta. Mi nombre: Ana.` Señal: PERSONAL EMPRESARIAL | 45 PASAJEROS | L A V · 3 TURNOS (sólidos). Cierre: "Tu ruta ya está rotulada." con el mismo mensaje.
- Aeropuerto (6, 12 oct 05:30, Aguascalientes → Aeropuerto GDL): `https://wa.me/524494683835?text=Hola GTLO, quiero cotizar traslado al aeropuerto para 6 pasajeros, el 12 de octubre a las 05:30, de Aguascalientes a Aeropuerto GDL. Empresa: Nissan Planta. Mi nombre: Ana.` Señal: AEROPUERTO | 6 PASAJEROS | 12 OCT · 05:30 | AGUASCALIENTES → AEROPUERTO GDL. Campos de personal ocultos, fecha/ruta visibles.
Mismos mensajes que en CORRECCION-1: la lógica no se tocó (solo cómo se pinta la señal vacía).

## No aplicado (y por qué)
- **Hiace 123 al anochecer en Ejecutivo (REVISION 7):** el orquestador permite cofre o unidad de noche; se dejó el cofre para no repetir foto, y la de noche fue a Base (cambio 9), que era la única sección sin foto. Por eso en el convoy la 123 es fb_06.
- **126 del convoy con la foto de dron (REVISION 1):** esa foto va en la banda de remate (cambio 6 y decisión 5); en el convoy la 126 es fb_02 (la misma unidad, otra foto), para no repetir imagen.
- **fb_02 en Base (REVISION 9):** ya está en el convoy; Base usa la Hiace 123 de noche, que prueba el 24 h igual.
- **ig_2022-06-22 bajo la señal (REVISION 4):** su recorte ya es la 121 del convoy; bajo la señal va ig_2022-03-06 (otra foto de fila, sin repetir).
- **Placas de 250/300 px:** 230 px en celular y ~220 en compu, para que en compu quepan las 5 en fila sin usar fotos de 640 px más grandes (decisión 1: chicas).
- **h1 `clamp(46px,12.6vw,…)`:** quedó `clamp(44px,12.2vw,64px)` porque "Transportarte" a 12.6vw se salía del ancho a 390.
- La 152 aparece dos veces (tarjeta Aeropuerto y convoy), con recortes distintos: es la única foto con ese número y el orquestador la pidió.
- El bloque amarillo "Todo listo" no se tocó (está en la lista de qué no tocar).
- Sin número de unidades, capacidades, clientes ni permisos; sin fotos de stock ni IA. Placas tapadas con marco negro en todas las fotos nuevas; no hay caras ni marcas ajenas en los recortes.

## Archivos tocados
`sections/10-hero.*`, `sections/20-servicios.*`, `sections/30-senal.*`, `sections/40-flotilla.*`, `sections/50-base.*`, `sections/60-cierre.*`, `site.css`, `site.js`, `template.html`, `img/` (nuevas: cv-126/123/121/114/152-520, noche-400/640, carretera-800/1600, fila-480/960), `IMAGENES.md`, `PENDIENTES.md`, `COMPONENTES-USADOS.md`.
