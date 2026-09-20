# Fotos rehechas con IA a partir de sus fotos reales (19 sep 2026)

gpt_image_2_5, 1 crédito cada una (3 en total), subidas x4 con Real-ESRGAN. Van con etiqueta "Imagen ilustrativa".

| Archivo | Referencia real | Job |
|---|---|---|
| ribeye-m (2:3) | img/hd/ribeye-mesa | b6280ff9 |
| ribeye-d (3:2) | img/hd/ribeye-mesa | 042df2ba |
| terraza-noche | img/hd/mesa-terraza | 8f90f146 |

## Dónde se usan (19 sep, revisión 10/10)

| Archivo | Dónde | Etiqueta |
|---|---|---|
| ribeye-m (1400x2083) | hero en celular (sombra limpia abajo para el título) | "Imagen ilustrativa" arriba a la derecha |
| ribeye-d (2200x1478) | hero en compu (sombra limpia a la izquierda) | misma etiqueta |
| terraza-noche (2200x1478) | foto grande de "Noches de terraza" (base + canopy) | "Imagen ilustrativa" |

`img/og.jpg` (1200x630, 177 KB) sale de `ribeye-d.webp` con PIL: es el que se ve al compartir por WhatsApp.
El hero ya NO lleva video: se borraron `img/hero/*.mp4` y los pósters (traían la palabra "SANTA"
quemada, dobles exposiciones y una toma de día con coches).
`img/hd/mesa-completa-*.webp` se recortó 17 % por arriba para quitarle la marca de agua "SANTA" cortada.
