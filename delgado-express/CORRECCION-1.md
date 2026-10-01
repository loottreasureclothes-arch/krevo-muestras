# Delgado Express · CORRECCION 1 (30 sep 2026)

Sobre `REVISION-1.md` (7.3) y las decisiones del orquestador. Todo con fotos reales y herramientas locales (PIL, OpenCV, Real-ESRGAN `-s 4`). Sin IA generativa ni stock. Sin maps-04 a 07. El correcaminos solo sale en recortes de sus fotos.

## Verificación final
- krevo-shot `m`: **8,540 px** de alto (tope 9,000), **0 alertas**, 4 wa.me. krevo-shot `d`: 6,582 px, **0 alertas**. Sin scroll horizontal a 820 px y 1440 px.
- Calcomanía del header por sección (prueba en Chrome headless): `top 068 · flota 057 (016 al llegar a la foto de la 208) · cotizar 016 · opiniones 247 · patio AGS · cierre 057 · pie 016`.
- Puertas: cada hoja mide 170 x 406 px en celular (1:2.4). Cerradas con la caja al 75 % de la pantalla, a medias al 47 % (p = 0.51) y abiertas al 18 %. Son reversibles: al volver a entrar, p = 0.05. Si la caja queda quieta en pantalla, a los 1.9 s p = 1. Entrando por `#opiniones`, a los 1.9 s p = 1. Con reduced-motion están abiertas.
- Carta porte: el origen ya trae "Aguascalientes, Ags.". El sello cae al poner destino y carga, y el folio queda `30·SEP·26`. El sello del cierre no tapa la fecha (comprobado, sin traslape). El cierre usa la misma URL. Así queda el mensaje de WhatsApp, con `%0A` entre renglones:
  ```
  Hola Delgado Express, quiero cotizar un flete.
  Origen: Aguascalientes, Ags.
  Destino: Monterrey, N.L.
  Carga: tarimas de alimento, caja completa.
  Fecha de carga: 12 de octubre.
  Empresa: Alimentos Prueba.
  Mi nombre: Juan
  ```

## Cambios aplicados (los 15)
1. **Flota a la vista.** Se quitó el carrusel. En celular, el Kenworth va a sangre en 4:5 (recorte propio `kenworth-m`). Debajo, apiladas a todo el ancho: 057 en 4:3, la de noche en 16:9, la fila en 2:1 y la 208 en 16:9 con la cabina 016 completa. En compu queda 1 grande + 4.
2. **Header propio y honesto.** La placa blanca en mono se cambió por una **calcomanía de puerta**: número en Archivo ancha 900, blanco con contorno azul noche sobre rojo, sin la etiqueta "UNIDAD". Muestra el número de la unidad que está en pantalla. El fondo del header es sólido aun compacto. Desde 1024 px lleva nav de texto (La flota · Cotizar · Opiniones · Patio). Se corrigieron 068 y 016 en HOJA y PENDIENTES.
3. **Parches invisibles.** fb-04: la placa se borró con interpolación vertical que sigue los reflejos del cromo, sin recuadro. fb-01 (3 placas), fb-03 y fb-07 (placa y número de serie de la caja): inpaint de OpenCV.
4. **Enderezadas.** fb-01 a -21° y fb-03 a -12°; en fb-03 se dejó menos giro para no perder la parrilla ni los faros. Se recortaron sin esquinas negras y se pasaron por Real-ESRGAN x4, mezclado con bicúbica para que no se vean plásticas.
5. **Cierre con foto buena.** La puerta 020 (fb-08) se cambió por el recorte de la puerta **057** de maps-01, sin ventana ni bloque RFC; se borró la calcomanía CONATRAM, que trae año. En celular va a todo el ancho en 4:3 con marco cromo y placa "Tracto 057", debajo del botón.
6. **Pie que remata.** fb-07 panorámica (tracto 016 con caja 208), de 270 px en celular y 460 px en compu, con velo azul noche abajo y "DELGADO EXPRESS" encima. Ya no repite la foto del hero.
7. **Puertas de caja seca.** Tapan solo el bloque del 5.0. Tienen cabezal con tres plafones rojos, postes y travesaño; en cada hoja, 4 bisagras, 2 barras de cierre con levas arriba y abajo y su manija, empaque oscuro al centro, cinta reflejante roja y blanca vertical en el canto, franja abajo, remaches y un poco de suciedad abajo. Se quedan "247" y "53'". El seguro abre a los 1.6 s de estar a la vista pase lo que pase; se rearma cuando la caja sale de pantalla. Sin pin.
8. **Sello del cierre.** Va arriba a la derecha junto al folio, al 75 % del tamaño. Ya no tapa datos.
9. **Foto de opiniones.** Se usa el recorte nítido de la caja 247 de maps-01 ("DELGADO Express", 247 y 53'), que casa con el 247 de la puerta.
10. **Patio.** maps-03 recortada en panorámica 21:9, con la fila de cajas al tercio de abajo; ya no es puro piso de grava.
11. **Título del patio.** Ahora dice "EL PATIO, EN / AGUASCALIENTES.", sin el "EN" huérfano.
12. **Carta porte.** El origen tiene `value` real y el cierre lo toma como dato capturado aunque no haya `dx_carta`. El mensaje usa `join("\n")`. Las fichas de "Cuánta carga" ahora son radio con punto rojo.
13. **Título de opiniones.** Ahora dice "DOCE OPINIONES. / TODAS DE CINCO.", que es real: las 12 son de 5 estrellas. La propuesta "Las doce de cinco" partía en 3 renglones a 390 px.
14. **Compu.** El header lleva nav de texto y fondo sólido. El hueco negro de abajo a la izquierda del hero se llenó con una ficha real (449 976 4042 con `tel:`, horario y "Carretera a Villa Hidalgo"); solo aparece desde 1000 px. "Llena tu carta porte." quedaba con viuda ("PORTE.") a 1440 px: se ajustó el tamaño.
15. **og.jpg.** Hecha de nuevo a 1200x630 con degradado continuo, sin franja gris ni escalón.

Además: en el pie, el horario va sin cortes ("Dom" ya no queda separado de "cerrado").

## Qué no se aplicó o cambió respecto a la orden, y por qué
- **Patio con "208" y cierre con "020" (lista del orquestador).** En la foto del patio (maps-03) no se lee ningún número, así que la calcomanía dice **AGS**, la base, para no mostrar una unidad que no está en pantalla. El cierre ahora enseña la puerta 057 (decisión 4 y cambio 5), así que dice **057**. La 020 (fb-08, de 315 px) salió de la página.
- **025 en la fila (fb-01).** Se lee en la original, pero a 390 px no se distingue, así que no se usa en la calcomanía.
- **Carta porte "016".** En esa sección no hay foto. Se dejó 016 como pidió el orquestador, y la 208 (tracto 016) es la última foto de la flota, justo arriba.
- No se tocó nada de la lista "Qué NO tocar": mecánica de la carta, los 4 verdes, wa.me y tel:, paleta, letras, cinta divisoria, hero, horario en vivo, mapa, lema y "Todo listo para completar".

## Hojas para revisar (scratchpad `delgado-fix/`)
- Celular: `m/m-hoja-0.jpg`, `m-hoja-1.jpg` y `m-hoja-2.jpg` (`m/m-report.json`).
- Compu: `d/d-hoja-0.jpg`, `d-hoja-1.jpg` y `d-hoja-2.jpg` (`d/d-report.json`). 820 px: `t820/hoja-0.jpg` y `hoja-1.jpg`.
- Puertas: `t/m-door-hoja-0.jpg` (cerradas, a medias, abiertas y cerradas al centro).
- Carta y cierre llenos: `t/carta-hoja-0.jpg`.
