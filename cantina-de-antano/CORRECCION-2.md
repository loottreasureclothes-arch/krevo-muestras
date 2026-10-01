# La Cantina de Antaño · Corrección 2 (30 sep 2026)

Aplica REVISION-2.md en orden con las decisiones del orquestador. Todo sale de `python3 gen.py && python3 build.py`; index.html no se tocó a mano. Precios y nombres de la carta sin cambios (112 renglones, mismos ids). Fotos solo con PIL y Real-ESRGAN x4; script: `scratchpad/r2fix-cantina-de-antano/imgs2.py`.

## Aplicado
1. **Época de Oro en lobby card.** Nuevo recorte de `maps-interior-barra-02.jpg` (x 975-1548, y 625-950): pared de retratos en blanco y negro (Pedro Infante, las actrices), caballito de carrusel y filo verde de la barra. Fuera quedan techo, soga, "Dije en caso Saaabe", la mesera, el monitor y las cabezas. Real-ESRGAN x4 (`epoca-c-640/1280/1840`). Va en tarjeta crema con doble filete oro, máx. 920 px; en celular 4:3 a lo ancho menos 20 px. El título queda arriba, sobre café, sin velo. Pie: "Retratos de la Época de Oro en la pared, sucursal Colosio". Las fotos viejas `epoca-*` y `epoca-m-*` se pasaron al scratchpad.
2. **Hero.** El H1 mide 39.8 px en celular (antes 33.5) y 98 px a 1440. Los H2 bajan a 32 px y 72 px, así que el H1 queda 24 % y 36 % más grande. Sin manchas: se quitaron los parches de desenfoque. Ahora la franja del fondo (meseros y la pareja de la mesa del fondo) lleva un desenfoque parejo con borde muy suave, aplicado después de subir x4, y se lee como profundidad de campo. En compu el velo izquierdo sube a .85 hasta el 30 % y .55 al 50 %.
3. **El reparto con su papel.** Ingredientes transcritos de `sitio-carta-especialidades.jpg` y anotados con su fuente en `research/hechos.md`: Pedro Infante, Cantinflas, Jorge Negrete, Miroslava, María Félix y Mezcalada. Van en Lora itálica de 14 px crema al 72 %. Sangría no trae ingredientes en su carta y va sin ellos. Nombres en una sola línea (`nowrap`, 19 px en celular). Sara García lleva su descripción de la misma hoja ("ginebra, Baileys, Kahlúa y leche"), sin que cambie su id.
4. **Carta en compu.** A ≥860 px cada panel con foto (Botanas, Carnes, Cervezas y Destilados) es una rejilla 340 px + lista. La foto va vertical 4:5 con marco, `sticky` a 150 px, y la lista a 2 columnas. Fotos verticales nuevas: `p-mesa-v`, `p-tabla-v`, `p-tarro-v` y `p-botellas-v`. El "La carta, completa." se queda (decisión 1).
5. **Pie con "Fin."** Sello de 160 px, "Fin." en Abril de 64 px (76 px en compu) entre doble filete oro y el lema a dos tonos. Las 4 cantinas van compactas: nombre y teléfono en una línea, la calle en una línea de 14 px y sin horarios; en compu, rejilla de 2 × 2. Correo y redes en una fila. El pie pasa de 1,185 px a 943 px en celular.
6. **Tipografía.**
   - Special Elite queda solo en datos y en ningún lado mide menos de 14 px (medido con JS: 0 casos).
   - Pasan a Lora itálica de 15 px: notas, letra chica del 2x1, "Lo rojo es el 2x1", la nota de sucursales, la nota de la carta, pies de foto largos, la lista de "Todo listo", los avisos de la ficha y el crédito de KREVO.
   - Se agregó `text-wrap:pretty` a los párrafos (los `.tt` ya traían `balance`) y `&nbsp;` en "Ver la carta".
   - El pie de la parrillada va en dos renglones: "Parrillada norteña" / "2 personas $588 · 4 personas $1,026".
   - "Salón privado / para 120 personas." va a dos tonos.
7. **Renglones de la carta.** El "+" se ve de 34 px con filete de 1 px, pero el botón mide 44 px, así que no hay alerta de toque. El renglón mide 52 px y el gramaje va en la misma línea que el nombre, en Lora itálica.
8. **Reloj con acabado de objeto.** Aro con veta (dos degradados y 3 anillos al 15 %), bisel oro de 2 px, brillo de vidrio arriba a la izquierda, perno de latón con degradado y sombra de pared más grande. El texto vivo va en una placa crema con doble filete. La lógica del reloj no se tocó.
9. **La botella de la casa.** Lobby card arriba de Destilados: "Mezcal La Cantina Reserva", "100 % agave espadín, Oaxaca. Su marca propia.", Copa $124 + y Botella 1 L $1,285 +, con los mismos ids que ya tenía en la carta.
10. **Remates.**
    - "Elegir esta" es un tercer botón de ancho completo y los botones bajan al fondo de la tarjeta: las 4 rematan igual (17 px en todas).
    - La nota de sucursales queda pegada a la tira, sin banda extra.
    - El padding de `.dos` baja a 28 px en celular.
11. **Títulos.** "Tu mesa, / en primera fila." "La carta, completa." se queda (decisión 1).
12. **Colosio y 820 px.**
    - Fachada de Colosio recortada a 3:2 sin el cielo negro.
    - A ≥700 px el reloj va junto al texto (el título ocupa toda la fila hasta 859 px) y la carta va a 2 columnas.
    - La parrillada sale 16:9 junto al título.

## No aplicado (y por qué)
- **Época en 3:2 exacto:** el recorte limpio (sin soga, monitor ni cabezas) da 573 × 325 (unos 7:4). En compu se muestra en su proporción y en celular a 4:3. Forzar 3:2 metía la soga o las cabezas.
- **Hero "quitar con el encuadre":** los meseros están en el punto de fuga del salón y no hay recorte que los saque sin perder la barra. Se usó la opción de la decisión 4: desenfoque parejo de toda la franja.
- **Pie de unos 750 px:** quedó en 943 px. El sello de 160 px y el "Fin." de 64 px se respetaron tal cual los pide la revisión. Aun así, la página entera quedó 220 px más corta que antes.
- **Botones en Lora de 12 px** (chips, "Llamar"): no son Special Elite. Son versalitas espaciadas de botón; `.btn--sm` subió de 11 a 12 px.

## Verificación
- krevo-shot m: **0 alertas**, alto 8,285 px (Botanas), fuentes Lora, Special Elite y Abril, 3 WhatsApp, sin errores de consola ni 404.
- krevo-shot d: **0 alertas**, alto 6,656 px.
- Alto por categoría en celular: Cocteles 8,693 (la más larga) · Cervezas 8,308 · Botanas y Carnes 8,285 · Destilados 7,794 · resto menos de 7,450. Todas bajo 9,000.
- Flujo de Mi mesa (flow.mjs): barra "Mi mesa · 4 $2,742", aviso de Nacozari cerrado a las 11 p.m., Mañana lo quita y DÍA/HORA quedan alineados (0 px). Mensaje: `Hola La Cantina de Antaño, quiero apartar mesa en Nacozari para 6 personas mañana a las 11:00 p.m. Pensamos pedir: 2 x Parrillada norteña 4 personas, 2 x Cubeta de 6 Corona/Light/Victoria/Pacífico, Refresco. Nombre: Ana`. La parrillada sale x2 porque el script la toca dos veces.
- Flujo nuevo (Mezcalada del reparto, Sara García, botella de la casa, Elegir J. Pani): barra "Mi mesa · 3 $1,635", botón "Tu cantina". Mensaje: `Hola La Cantina de Antaño, quiero apartar mesa en J. Pani para 4 personas hoy a las 8:00 p.m. Pensamos pedir: Mezcalada La Cantina, Sara García, Mezcal La Cantina Reserva 1 L (botella). Nombre: Luis`.
- Hojas: `scratchpad/r2fix-cantina-de-antano/hoja-celular.jpg`, `hoja-compu.jpg`, `t820-hoja.jpg`, `x-rd.jpg` (El reparto y Destilados a 390) y `d-bot.jpg` (Botanas a 1440).

## Ojo
- La foto de Época ya es nítida a 920 px, pero sigue siendo de celular (luz de neón y reflejos). El tope sigue siendo material del dueño: cocteles, platillos y música en vivo.
- `p-mesa-v` sale de un recorte de 480 px del original: a 340 px se ve bien, pero no es para más grande.
