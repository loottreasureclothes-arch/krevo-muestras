# Corrección 1 · El Palacio del Ropón (pulidor, 1 oct 2026)

## Los 10 problemas más visibles (en orden, vistos como cliente a 390, 820 y 1440)
1. **Tienda: la fachada salía con el letrero cortado** ("L PALACIO DEL ROPÓN": la E fuera del escudo) y era un cuadro de video subido, suave. El letrero tiene que verse completo.
2. **Huecos de más de 90 px entre secciones**: en compu 146, 194, 180 y 220 px (hero→galería, paquete→momento, momento→tienda, tienda→cierre); en celular 104 a 173 px.
3. **Momento firma: el título se partía feo**: en compu en 4 renglones ("Un día / especial merece / un traje que / esté a la altura."), en celular "un traje que / esté a la altura.".
4. **Hero en compu: título en 3 renglones** con "de bebé" solo y "exclusiva." colgando.
5. **Paquete en compu: hueco de ~300 px bajo la foto** en la columna izquierda (la foto se queda arriba y la columna derecha sigue y sigue).
6. **Cartela del pedido en compu: hueco grande en la columna derecha** entre "Corona hasta tres..." y el botón verde.
7. **Galería: el retrato I (Petit Sophia) tan cerrado que se lee como encaje abstracto**, no como vestido; es el primer retrato que ve la clienta en celular.
8. **Galería: colchón de más entre los filtros y los retratos** (~100 px en compu y tableta).
9. **"Todo listo para completar" con renglones en voz rara**: "Nombre de quien es la tienda", "Corregir el horario de su ficha de Google Maps".
10. **Paquete: la cartela "Príncipe Azul · con kit de vela..." se monta sobre la foto** que justo enseña el kit.

## Qué arreglé
1. **Fachada nueva** (`img/tienda-440/880.webp`): sale de `maps-01` (foto real de Maps, no cuadro de video), recortada justo debajo del renglón de Glamour (no queda ni una orilla del panel rosa ni de su dirección) hasta la banqueta. El letrero "EL PALACIO DEL ROPÓN · Bautizos y Ropa de Bebé Exclusiva" entra COMPLETO. Un letrerito azul ajeno en la pared izquierda se tapó limpio con el muro de arriba. Real-ESRGAN x4 sobre el recorte de 500 px, mezclado 50 % con el original subido con LANCZOS y grano fino. Alt actualizado.
2. **Huecos**: rellenos de sección bajados (celular 44, compu 56; hero de compu sin `min-height` forzado; galería, paquete, momento, tienda y cierre ajustados; el escenario del momento sube con margen negativo proporcional porque arriba solo había aire para la corona). Lo que mide más de 90 px ahora es relleno interno de cartelas marfil o el cambio de banda a la oscura (la corona necesita ese espacio para caer); visualmente ningún hueco pasa de ~85 px.
3. **Título del momento**: en compu en dos renglones ("Un día especial merece / un traje que esté a la altura.").
4. **Hero de compu**: título a 64-86 px sin tope de caracteres: "Bautizos y ropa / de bebé exclusiva." en dos renglones.
5. **Paquete en compu**: título a lo ancho arriba, foto junto a las tres cifras, primera comunión con sus dos chicas en franja abajo con filete, y "Quiero el paquete" bajo el texto. Sin hueco.
6. **Cartela del pedido en compu**: el botón verde sube justo debajo de "Tu corte".
7. **Retrato I Petit Sophia**: recorte nuevo de `video-13` más abierto (escote, mangas, corpiño y flores con perlas): se lee como vestido.
8. **Galería**: quitado el margen extra entre filtros y retratos (se deja el colchón de 54 px que usa la corona al caer).
9. **"Todo listo"**: "Nombre de la dueña o dueño" y "El horario corregido en Google Maps".
10. **Cartela del paquete**: bajada al pie del escudo para que tape menos la foto. La línea de la galería en compu ya no se parte en "con / ellas.".

## Qué no arreglé
- Las fotos de producto siguen siendo cuadros de video (suaves a 300-440 px); van medianas en escudo. Se necesitan fotos fijas en alta (ya está en PENDIENTES).
- La foto del paquete (`video-26`) corta la cabeza del maniquí: así viene el cuadro.
- En celular el título del momento queda "un traje que / esté a la altura." (no cabe en una línea a 390 px).

## Verificación
- krevo-shot m: alto 8,101 px, `alertas: []`; krevo-shot d: `alertas: []`. Consola limpia, sin 404, sin scroll horizontal.
- Flujo probado: coronar Petit Sophia y Príncipe Azul + fichas + fecha + nombre → listón "Tu corte · 2 coronadas", resumen del cierre "Tu corte: Petit Sophia y Príncipe Azul. Bautizo, 15 de noviembre." y wa.me/524491790170 con el mensaje completo.
