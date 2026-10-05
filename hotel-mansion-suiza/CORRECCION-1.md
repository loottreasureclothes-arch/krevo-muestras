# CORRECCION-1 (pulidor, 5 oct 2026)
Problemas más visibles, en orden:
1. Compu: foto del hero (960 px) estirada a 100svh de alto (~1.4x). Arreglado: hero de compu con la foto en su proporción 960/660, enmarcada (máx. ~720 px de ancho), y desde 1100 px; la tableta usa el cartel del celular (sin estirar).
2. Compu: título del hero partido "Duerme en / la / Mansión / Suiza". Arreglado: h1 de compu 60-84 px, queda en 2 líneas.
3. Compu: foto a sangre de la galería (pasillo, 960 px) estirada a 1440 px. Arreglado: en compu va centrada a 960 px máx. y alto máx. 660 px; sizes corregido.
4. Dato sin research: "Rotafolio" en la sala de juntas (no aparece en la foto ni en hechos). Arreglado: cambiado por "Estacionamiento propio gratis" (hechos.md).
5. Verde en "Recepción abierta ahora" (sin WhatsApp no va verde). Arreglado: ámbar de marca.
6. Hueco de ~180 px bajo el hero de compu. Arreglado: sin min-height 100svh, padding fijo.
7. Revisión de promesas: nada promete aire acondicionado, alberca, desayuno ni número de cuartos (solo aparecen en reseñas que dicen que NO hay clima). Sin cambio necesario.
8. Reseñas Trip.com en escala de 10 ("8/10 en Trip.com"), estrellas = valor/2 (8→4, 10→5, 6→3); Google 4,1 → 4 estrellas, sin número de opiniones y con "Ver todas en Google". Correcto, sin cambio.
Prueba anti-genérico: pasa (llave con llavero propio, gable de la fachada, 9 secciones dentro del rango del dueño, 0 verdes, sin contadores).
No arreglado: 3 de 6 reseñas mencionan que no hay aire acondicionado (son las únicas con nombre en research; se dejan por honestidad). El mapa embebido no carga en la captura sin red (en vivo sí). Fotos de origen son de 960 px (pendiente fotos más grandes del hotel).
Verificación: m 10,320 px, d 8,042 px, alertas [] en m y d; encimes 0 en m, t y d.
