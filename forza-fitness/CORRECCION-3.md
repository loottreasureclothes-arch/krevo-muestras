# Forza Fitness Club · Corrección 3 (30 sep 2026)

Se aplicaron los 5 cambios de REVISION-3, en orden. Solo se editó `sections/`, `template.html`, `img/` e `IMAGENES.md`, y se armó con `python3 build.py` después de cada cambio (index.html no se tocó a mano). Respaldo de lo anterior y scripts en `scratchpad/r3fix-forza-fitness/` (`backup/`, `imgs3.py`, `grade.py`, `q.mjs`). Las 3 fotos viejas del hero de compu quedaron en `scratchpad/r3fix-forza-fitness/img-retiradas/`.

## Aplicado
1. **Pulso de la próxima clase** (`30-horario.css`): la celda `.is-next` ya no usa `fzPulse` (no baja opacidad). Fondo rojo pleno y texto blanco al 100 % todo el tiempo; lo que late es un halo `box-shadow` de 0 a 6 px que se desvanece (1.2 s). La celda va con `z-index` para que el halo pase encima de las vecinas, y el contenedor con scroll de la tabla ganó 8 px de aire (con margen negativo, así la tabla no se mueve) para que el halo no se recorte en las orillas. Con reduced-motion sigue quieta. Verificado en 3 fases de la animación: "Luis Fer" blanco y legible en todas.
2. **Hero de compu (≥1024)** (`10-hero.css`, `10-hero.html`, `template.html`):
   - La foto empieza en `left: 0`, con el paralelogramo `polygon(0 0, 100% 0, 100% calc(100% - var(--cut)), 0 100%)`. Ya no hay tercio negro vacío.
   - La lona: el `translateY(-200px)` probado no alcanzaba (seguían "MADE OF" y "Come to beat yourself" arriba), así que se usó la variante que la revisión deja: foto propia de compu `hero-d-960/1600/1930` recortada de maps-01 limpio desde y = 705 (abajo de la lona) y hasta x = 1930 (sin el reloj de pared), con la misma serie B/N y rojo. La lona ya no entra en ninguna pantalla de compu (probado a 1024, 1440 y 1920). Mandan la pared FORZA, el piso y las hileras de mancuernas rojas.
   - Velo: el lateral de la revisión (negro pleno a .85 en el 28 %) dejaba las letras FORZA de la pared casi invisibles. Se usó la variante que cumple la intención: velo lateral .78 → .5 (28 %) → .12 (55 %) → 0, más una mancha oscura elíptica detrás del título y el fundido a negro de abajo. Resultado: "FORZA" de la pared se lee arriba a la izquierda y el título lee limpio sobre la pared. "RESULTADOS." ya no se monta en ningún filo.
3. **Pasillo sin Real-ESRGAN** (`img/pasillo-*`, `50-colosio.css`, `50-colosio.html`): regenerado desde `research/fotos/maps-02.jpg`, mismo recorte (x 0 a 1100, y 520 a 1895), denoise muy suave, serie B/N con rojo y grano, y solo Lanczos hacia abajo (960 y 480). Las letras y el block se ven de foto, ya no pintados. En celular la foto mide 58 % del ancho (unos 208 px) y el par foto + "ALWAYS FORZA" va centrado; `sizes` ajustado a 54vw. En compu sigue en su columna 4:5.
4. **Neblina del rack** (`img/rack-*`, `img/rack-m-*`, `40-club.css`, `40-club.html`): rack regenerado desde maps-04 sin el 16 % de arriba (la franja del destello y la neblina gris), mismo tratamiento. Además, el velo de arriba de la escena sube de .35 a .55 (con .32 al 16 %). En compu se ajustó `object-position: 38% 27%` para mostrar el mismo encuadre que antes. El rayo queda sobre barra, discos y columnas rojas, sin humo.
5. **Hueco del hero en celular** (`10-hero.css`, `20-planes.css`): `padding-bottom` del hero a 8 px y `.fz-planes` a `padding-top: 0` en celular (desde 720 px se queda en 56). El arte Reloaded entra pegado al link "Ver horario de CrossFit".

## No aplicado o distinto
- Cambio 2, `translateY(-200px)`: se probó y no sacaba la lona. Se aplicó la variante de la misma revisión (regenerar la foto de compu recortando la lona).
- Cambio 2, velo lateral literal: apagaba la pared FORZA. Se dejó un velo más ligero arriba y oscuro detrás del título (ver arriba).
- Cambio 4: se hicieron las dos cosas (recorte y velo), porque el recorte del 12 % dejaba una cola de neblina.
- La hoja de dirección pedía el pulso de la celda por opacidad (1 ↔ .6). Se cambió por halo porque así lo pide el juez y la intención (que la celda pulse) se conserva sin apagar el texto.
- No se tocó: el tablero ni sus datos, el flujo a WhatsApp, el header y su barra de carga, la paleta, las fuentes, las reseñas, precios, horarios, teléfono, "Todo listo para completar", "ALWAYS FORZA", og.jpg y los 4 verdes.

## Verificación
- krevo-shot `m`: alto 8,043 px (tope 9,000), 4 WhatsApp, 0 alertas, sin errores de consola, sin 404, sin scroll horizontal.
- krevo-shot `d`: alto 7,449 px, 4 WhatsApp, 0 alertas.
- 820 px: 7,843 px, sin scroll horizontal. 1024 y 1920: hero sin lona y sin vacío.
- Flujo (Plan Gold + CrossFit mié 6:00 pm), igual en el menú, `#fz-send`, `#fz-send2` y el flotante, todos `<a href="https://wa.me/...">` en verde:
  `https://wa.me/524491538877?text=Hola Forza Fitness Club, quiero pedir mi inscripción. Me interesa el Plan Gold (desde $999.90 al mes). Clase: CrossFit mié 6:00 pm con Diego Sánchez.`
- Hojas: `scratchpad/r3fix-forza-fitness/hoja-celular.jpg`, `hoja-compu.jpg` y `hoja-820.jpg`; halo en 3 fases: `halo.png`.

## Lo que sigue limitando la nota
Igual que dice la revisión: no hay fotos de gente entrenando, fachada, coaches ni guardería. Eso solo lo resuelve material del dueño.
