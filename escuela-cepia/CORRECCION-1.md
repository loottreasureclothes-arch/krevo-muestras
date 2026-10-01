# Colegio CEPIA · Corrección 1 (30 sep 2026)

Sobre `REVISION-1.md` (7.8). Todo se editó en `sections/`, `template.html`, `site.css` y `site.js`; `index.html` sale de `python3 build.py`.
Capturas y scripts: `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/cepia-fix/` (`m/`, `d/`, `m-sheet.jpg`, `d-sheet.jpg`, `w820-sheet.jpg`, `fotos-usadas.jpg`, `oh.jpg` / `t10-oh.png` con el Open House pasado, `r2.jpg` con la marca y 2 hijos).

## Cambios aplicados (los 15, en orden)
1. **Fotos sin manchas, recortadas y no difuminadas.** Saqué cuadros nuevos de los reels (1 por segundo y luego 4 a 6 por segundo en los momentos buenos) y elegí tomas sin niños o recortadas por debajo de las cabezas. Preescolar: las casitas de juego bajo el corredor (reel de Pascua). Primaria: el pasillo de mochilas en un cuadro sin el salón con alumnos a la vista. Secundaria: el tercio de abajo del patio (pants, conos, líneas de la cancha), sin una sola cabeza. Tira del plantel: 3 fotos (entrada, patio techado el día de la Feria de Ciencias, reja desde adentro, ahora recortada sin brazos en las orillas). `patio-bicis`, `patio-lineas` y `entrada-preescolar` salieron de la página. Ya no hay ninguna foto con desenfoque.
2. **Niveles con título propio:** "Del tapete azul / al francés." La promesa "Vienen a crecer en grande." queda solo en el hero.
3. **La marca en la pared se ve:** trazo de lápiz grueso (SVG de borde irregular, grafito con brillo) que cruza el marco y sale sobre la foto, con etiqueta escrita con gis en Bitter itálica. Salta de rayita en rayita con transición según el nivel que pasa (reversible, sin pin). Si hay `cepia_grado`, la etiqueta dice el grado del hijo ("3° de primaria", en amarillo) y en cada nivel de sus hijos queda pintada una marca con su grado. Escucha `cepia:grado`, así que se actualiza en vivo.
4. **Riel de marco de puerta:** madera `#8a6a45` con veta vertical sutil, canto en sombra y rayitas a lápiz. Ya no tiene renglones.
5. **Pizarrón del día en celular y a 820:** la fecha con gis va bajo "Colegio CEPIA" y, al compactar, toma el lugar del nombre. Abajo de 380 px se abrevia el día ("Mié."). El botón INFORMES se angostó para que quepa todo a 360 y 390.
6. **Niveles a 1440:** foto al ~58 % del ancho de la pantalla (columnas 68/32 dentro de un contenedor de 1440), pegada al marco. El texto alterna arriba y abajo. Los niveles que la marca no alcanza quedan a opacidad .62 sobre el verde, sin desaturar.
7. **Hero de compu:** H1 a 7 rem, fachada en su marco al 57 % del ancho y a todo el alto del primer pantallazo, con línea de cancha por debajo.
8. **"Todo listo para completar"** escrito en pizarrón con marco de madera, renglones de gis y una rayita de gis amarilla como viñeta. Ya no hay casillas.
9. **Errata del pie:** "Colegio CEPIA, desde 1990." lleva espacio y el `span` es de bloque (sin `<br>`).
10. **Hueco del pizarrón:** `min-height` de 5.2 em a 2.6 em. Crece solo con 2 o más hijos.
11. **Open House:** sin JS dice "Jueves 29 de octubre." y el JS lo cambia por la cuenta. En el estado "después", el marco muestra una foto nueva de su acceso con árboles (`entrada-arboles`), distinta de la tira de abajo, en lugar de quedar en puro texto.
12. **Ficha:** "Asociación civil / Desde 1990 en Aguascalientes".
13. **Cierre y pie:** en compu, la aérea llena su columna (16:11) con el lema encima a dos tonos. En el pie, el logo va a 80 px y la línea de cancha de 3 trazos queda arriba del aviso de KREVO.
14. **Grados repetidos:** el mensaje de WhatsApp dice "2 hijos en 3° de primaria" y el pizarrón del cierre "3° de primaria (2 hijos)". Escoltas: "Cambio de escoltas de preescolar y primaria".
15. **Limpieza:** `20-grado.js` y `20-grado.css` de la raíz, y las 3 fotos retiradas, se movieron a `scratchpad/cepia-fix/retirados/` (no se borraron). `?hoy=` sigue funcionando y no se menciona en ningún texto visible (`innerText` sin "hoy=").

## Lo que NO cambié y por qué
- **Alternar foto izquierda/derecha en Niveles a 1440:** no lo hice. Un marco de puerta es un solo lado y la queja era que "el riel queda lejos de las fotos". Si alternaba, la mitad de las fotos se iba al otro extremo. En su lugar, la foto crece al 58 % pegada al marco y el texto alterna arriba y abajo.
- **El cálculo del grado, sus mensajes, `cepia_grado`, los `href` reales y `tel:`, la paleta, las letras, el hero de celular, el cartel del Open House, la ficha con horario en vivo y `inicial-salon`:** sin cambios, como pedía la revisión. Solo se agregó la agrupación de grados repetidos encima del mensaje.
- **Fotos de salón de primaria o secundaria:** no hay ninguna sin niños de medio plano. La maestra del reel con el globo terráqueo (inglés) se descartó por ser una persona identificable sin permiso.

## Verificación
- `krevo-shot` celular: alto **8,208 px**, 0 alertas, 0 errores de consola, 0 respuestas 4xx/5xx, sin scroll horizontal, 0 invisibles al volver arriba. Compu: 7,694 px, 0 alertas.
- WhatsApp con 2 hijos (15/06/2022 y 10/03/2018, nombre Ana): `https://wa.me/524499787180?text=Hola Colegio CEPIA, quiero informes para 2° de preescolar y 3° de primaria, ciclo 2026-2027. ¿Cuándo puedo conocer el colegio? Mi nombre: Ana`. Con un tercer hijo de 2018: "…para 2° de preescolar y 2 hijos en 3° de primaria…". Fronteras `calc`: 31/12/2014 = 1° de secundaria, 01/01/2011 = terminó, 29/02/2023 = inválida.
- Privacidad: revisé foto por foto (`fotos-usadas.jpg`, 11 imágenes). No hay ninguna cara de menor. Los únicos alumnos son piernas en `patio-secundaria`.
