# Corrección 1 · Mascotitlán (1 oct 2026)

Sobre REVISION-1.md (7.4) y las decisiones del orquestador. Todo se editó en `sections/`, `template.html`, `site.css` y `site.js`, y se armó con `python3 build.py` (index.html no se tocó a mano). Fotos solo con PIL/OpenCV, sin IA. Capturas y scripts: `scratchpad/mascotitlan-fix/` (hojas `hoja-m.jpg`, `hoja-d.jpg`, `prev/f820.jpg`).

## Resultado
- krevo-shot celular: **8,686 px** (antes 8,731), 0 alertas, solo Chivo y Chivo Mono, 5 WhatsApp. Compu: 6,916 px, 0 alertas. 820 px: sin scroll horizontal.
- Flujo: ALIMENTO + ESTÉTICA, Perro, nombre Ana → `https://wa.me/524495666644?text=Hola Mascotitlán, busco alimento y estética. Es para mi perro. Mi nombre: Ana`. El cierre repite la lista y la misma URL; persiste tras recargar. Los 5 href estáticos ya dicen "Hola Mascotitlán, quiero preguntar por algo para mi mascota.".
- Papel picado: a los 2.5 s sin bajar ya está `is-hung`.

## Cambios aplicados (los 15 de la revisión, en orden)
1. **Mascotitán → Mascotitlán** en los 5 `href` estáticos (menú, pirámide, cierre, pie, flotante): `Mascotitl%C3%A1n`.
2. **Pirámide con oficio** (`20-piramide.html/.css`): una sola pirámide de 4 niveles con retranqueo parejo (7.5 % por lado, ~27 px en celular), bloques pegados con junta de 2 px (sin muescas propias), canto oscuro bajo cada nivel y cara lateral derecha 6 px más oscura, base noche, escalinata central (3 rayas por nivel en los niveles 3 y 2 y el remate sobre "Accesorios"), y "Otra cosa" como templo noche con filete cempasúchil y crestería escalonada en la cima. Marca de abierto: triángulo cempasúchil (abajo en celular, apuntando a la ficha a la derecha en compu); se quitó la tira blanca. La lógica de `20-piramide.js` no se tocó.
3. **Hero**: foto gmaps-18 con balance de blancos (techo como gris), niveles y curva suave; caras de los dos clientes desenfocadas (también en og.jpg). Velo más ligero arriba, su logo de pirámide chico (120 px) sobre placa cal con esquina escalonada en la foto, título más grande (62 px en celular, 109 px en compu). En compu: foto con esquina escalonada y un bloque verde escalonado detrás para dar volumen; escalones inactivos del header en verde 25 %.
4. **Ficha de alimento**: la foto grande del pasillo (gmaps-02 corregida), 720x540 en celular y 640x640 en compu con `<picture>`.
5. **Papel picado de verdad** (`_work/gen_papel.py` genera el SVG): banderas de 60 px en celular (6) y hasta 132 px en compu (9); hoja calada completa (fila de triángulos arriba y abajo, rombos a los lados, marco calado con puentes, florecitas de esquina con cortes radiales y motivo central: pirámide, flor geométrica, pez, greca y sol), doblez más oscuro sobre el cordón, orillas de zigzag, festón y flecos, transparencia .93. `site.js`: se cuelgan al entrar y, pase lo que pase, a los 1.6 s; si se colgaron fuera de vista, al asomarse les da un golpe de viento (no desaparecen). Se conserva la caída una por una y el vaivén ligado al scroll.
6. **Fichas de solo texto**: altura automática, fondo noche con greca arriba, etiqueta en mono cempasúchil, cita grande y una pirámide rosa chica. Ya no es la losa verde vacía.
7. **Voz del negocio**: "Así lo dice nuestra lona. Entrega a domicilio: pregúntanos tu zona."; aves: "Así lo dice nuestro Instagram."; placa "Exóticos de la tienda".
8. **Fachada**: sin parche; recortada en y 604 (las placas empiezan en y 616). Queda lona, letrero, cortina y puerta.
9. **Fotos**: terrarios recortado arriba de los gabinetes de acero (se ven terrarios, acuarios y su letrero REPTILES; fuera las jaulas y las bolsas del piso), betta-a recortado sin el pez albino ni la hoja seca, betta-c sin el velo amarillo (balance con el agua como gris, menos neblina), limpieza suave de color en pasillos, ficha de peces, betta-b y fachada.
10. **820 px**: la columna de rascadores ya no se sale (rejilla con `minmax(0,1fr)`); usuarios de redes sin partir (`nowrap`); la lona en renglones donde cada palabra lleva su "·" pegado; entre 820 y 1099 px el "TODO PARA TUS MASCOTAS" baja bajo la lista.
11. **Cita de la pensión completa** con 5 estrellitas rosas en ficha cal: «Gracias por la pensión de los peces betta que compré, ahora vamos por hembras betta.»
12. **Visítanos en compu**: dos columnas (fachada, horario, Todo listo / tu lista, mapa, redes, remate), sin el hueco bajo el horario; mapa de 360 px. En celular el orden no cambia (`display: contents` + `order`).
13. **Menú abierto**: PREGUNTAR y la pirámide del header se esconden; "Cerrar" ya no tapa el lema.
14. **DESPARASITANDO** (solo la ortografía; se dejan sus mayúsculas).
15. **Remate de Opiniones**: padding inferior 24 px en celular y 40 px en compu.

## No aplicado o distinto
- **Terrarios**: no usé la mitad izquierda vertical (solo 520 px de ancho, se vería borrosa); usé la franja de arriba a todo lo ancho, que deja fuera las jaulas y conserva el letrero de la tienda.
- **Hero**: los cuerpos de los dos clientes siguen ahí (solo desenfocados, caras irreconocibles); no se pueden recortar sin perder el retrato de 900 px.
- **Escalinata**: atraviesa los niveles 3 y 2 y remata en la parte de arriba de "Accesorios"; no baja por todo el bloque de la base para no tapar su nombre.
- **"VACUNANDO Y DESPARASITANDO"** se deja en mayúsculas como en su post (solo se corrigió la ortografía).
- **Mapa en compu y a 820** sale en blanco en headless por `loading="lazy"` (es el iframe de Google); en navegador real carga.
- Paleta, tipografías, secciones, conteo de verdes, opiniones, 4.2 chico y pie: sin tocar, como pide la revisión.
- `img/betta-a-1200.webp` y `_work/fachada-limpia.png` quedaron de la versión anterior y ya no se usan.
