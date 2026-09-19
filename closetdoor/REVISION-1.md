# REVISIÓN 1 · Closet&Door (inspector)

Página: http://localhost:8770/closetdoor/
Aviso: el constructor reescribió la página A MITAD de la revisión.
- **v1** (21:47): hero con closet que cae (heroobjeto), slider modo objeto, fondo blanco.
- **v2** (21:55–21:58, estable desde 21:58): hero café madera "Remodela tu espacio" con foto, slider modo foto de 6 slides, banda "¿Quiénes somos?" café, botones verdes.

**Se califica la v2**, que es la que está en vivo. Donde la v1 era mejor, lo digo.

Herramientas: Chrome headless 153 vía CDP (390x844 @2x con touch y 1440x900) + pestaña propia del Browser pane para confirmar.

## Calificación global: **6 / 10**

Funciona bien: WhatsApp, cotizador, llamar, Maps, swipe y cero errores de JS. Pero la v2 rompe tres reglas del brief (fondo blanco, un solo acento, fotos en tarjeta nunca arriba) y agrega un dato que no nos dieron ("Remodelaciones"). La v1 estaba más cerca de lo que busca Emanuel (objeto protagonista estilo lata CIAO).

| # | Punto | Nota | Evidencia |
|---|---|---|---|
| 1 | Primer impacto | 6 | El título se lee y hay CTA arriba. Pero el hero es una foto en tarjeta sobre textura café: no hay objeto protagonista y se siente como plantilla de inmobiliaria. En la compu, "TU" queda solo en su renglón (REMODELA / TU / ESPACIO.). La v1 (closet cayendo) pegaba más. |
| 2 | Animaciones | 7 | Todas duran menos de 1.5 s y se disparan solas. Sin pin y sin scrub. La máscara del título y el wipe del slider se ven limpios. Durante 0.3 s el hero se ve vacío, solo madera (m00, d00). |
| 3 | Slider | 6 | El swipe funciona (probado con touch: 01→02). El wipe con clip-path está bien, pero es un carrusel de fotos cualquiera. Le sobra el slide 6 "Otra vista" (es la misma cocina). Después de hacer swipe no queda marcado el punto activo: en "02 / 06" todos los puntos quedan grises. Durante el arrastre la foto pierde la esquina redonda del lado derecho. |
| 4 | Celular | 7 | Sin scroll horizontal (scrollWidth 390). Las fotos ocupan media pantalla. Botones chicos: `.k-cta` del header mide 38px de alto, `.k-dot` 31px y los links del footer 24px. |
| 5 | Funcional | 8 | El WA flotante lleva el glifo oficial, #25D366 y mensaje prellenado. Cotizador probado: sin llenar dice "Falta el mueble, tu colonia y tu nombre." y lleno arma `wa.me/524494463411?text=Hola%20Closet%26Door%2C%20soy%20Ana.%20Quiero%20cotizar%3A%20Vestidor.%0AMedidas...%0AColonia...` (correcto). tel: y Maps con la dirección real funcionan. **No hay horario**: está bien omitirlo porque no nos lo dieron, pero hay que pedírselo a Emanuel. Sin 404 salvo favicon. |
| 6 | Datos | 5 | Hay invenciones o afirmaciones sin respaldo (ver cambio 3). Ortografía bien. |
| 7 | Estilo | 5 | Fondo café madera en el hero y en "Quiénes somos" (la regla 1 pide fondo blanco). Usa 3 colores: rojo marca, verde WhatsApp en TODOS los CTA y café. Sin guiones largos, sin Inter (Archivo + Instrument Sans) y sin emojis. |
| 8 | Detalles finos | 5 | Sin favicon (404 /favicon.ico). Sin og:title, og:description ni og:image, así que la tarjeta al mandar el link por WhatsApp sale pelona. `theme-color` es café. El antes/después en compu mide unos 1300px de ancho y es más alto que la pantalla de 900px. |

## Las dos cosas reportadas

1. **Recuadro alrededor del mueble con multiply (v1, slider modo objeto).** Confirmado, pero NO es más claro: es 1 nivel **más oscuro**. El fondo de las fotos es 254, no 255, así que multiply da 243,239,233 contra el fondo 244,240,234. A simple vista casi no se nota (ΔE < 0.5), pero con contraste subido se ve la caja completa y la sombra horneada corta en seco en el borde de abajo (`slide_contrast.png`). No es un problema de aislamiento: el JS anima opacity y filter en el mismo `img`, y eso no rompe el blend. Arreglo: sacar closet/isla/puerta con fondo 255 puro (niveles) o en webp con transparencia. En la v2 ya no aplica porque el slider es modo foto.
2. **`data-reveal="clip"` que no aparece en Chrome.** **No lo reproduje.** En `_kit/demo-kit.html` los dos títulos con clip terminan `is-in` y `inset(0px)` en Chrome 153 headless y en Chrome 152 del pane, y lo mismo pasó con una figura con imagen y un div inyectados. Sí encontré la fragilidad de fondo: el IntersectionObserver de Chrome mide el área YA recortada del propio elemento (con clip al 50% reporta ratio 0.50). Con clip al 100% depende del caso "intersección de área cero" y en una de mis pruebas sintéticas nunca disparó. Arreglo seguro en kit.js: observar un envoltorio (o el padre) y poner la máscara en el hijo, como ya hace `.cd-clip` en site.js. Esta página no usa `data-reveal="clip"`, así que hoy no le afecta.

## Cambios priorizados (de más a menos impacto)

1. **Regresar a fondo blanco y a objeto protagonista.** Quitar `.cd-wood` de `.cd-hero` y de `#nosotros`. Volver al hero de la v1 (`k-hero-obj` con el closet que cae y los facts), que cumple "un objeto protagonista" y la regla 8 (nada de foto en tarjetita arriba). Si Emanuel quiere calidez, que sea un gris cálido #f5f2ed en una sola banda, nunca madera oscura.
2. **Un solo acento.** Todos los `.cd-green` (header, hero, slider, cards, form) pasan a rojo marca `--brand #c81e24` o a tinta #111. El verde #25D366 se queda solo en `.k-wa` y, si acaso, en el ícono del botón de enviar.
3. **Quitar lo que no nos dieron:**
   - "Remodelaciones / Remodelar / remodelación": aparece en la lista del hero, la cinta, el slide 4, los chips del form y la meta description. No está en los datos.
   - "Lo que hemos fabricado" pasa a "Lo que fabricamos": las fotos son ilustrativas y no trabajos suyos.
   - "Aplican restricciones": quitarlo, no nos lo dieron.
   - Verificar `facebook.com/ClosetAndDoor` o quitar el link.
   - En el antes/después, "Misma cocina. Otra vida." sugiere un trabajo real: cambiarlo por copy genérico o poner "Imagen ilustrativa".
4. **Slider.** Borrar el slide "Otra vista". Dejar 4 o 5 (Closets, Cocinas, Puertas, Muebles/Oficina). Arreglar que se marque el `.k-dot` activo cuando el autoplay está en pausa (hoy solo se pinta la barrita de progreso). Mejor todavía: volver a `data-mode="object"` con los recortes de la v1 ya corregidos a 255, porque se siente más a lata CIAO que un carrusel de fotos.
5. **Tarjeta de WhatsApp y favicon.** Agregar `og:title`, `og:description` y `og:image` (1200x630 con el closet sobre blanco más el logo). Agregar favicon (se puede sacar del "&" del logo). Poner `theme-color` #ffffff.
6. **Toques de 44px o más:** `.k-cta` a 44px de alto en celular, `.cd-foot-links a` con min-height 44px, y `.k-dot` con área táctil de 44px (padding).
7. **Título del hero en compu:** evitar "TU" solo en su renglón (`text-wrap: balance`, ajustar el max-width o usar un `&nbsp;` en "Remodela tu"). Mejor todavía: volver al lema real "Lo imaginas. Lo fabricamos.".
8. **Antes/después en compu:** limitar `.cd-ba-frame` a `max-width: 1100px; max-height: 72vh`, centrado y con --radius, para que quepa completo en 900px de alto.
9. **Hero vacío al cargar (0 a 0.3 s):** que la foto u objeto arranque desde opacity 0.9 o scale 0.96 en lugar de invisible, para que no se vea solo madera y título a medias.
10. **Horario:** pedirle el horario a Emanuel. Hoy se omite, que es lo correcto, pero el brief lo pide como funcional.

## Capturas clave

Carpeta: `/private/tmp/claude-501/-Users-emmanuelcruzsalas/908f2c84-948e-4d5c-8dec-4d6bd1c308ae/scratchpad/insp/`
- v2 celular: `shots/grid_m0.png`, `grid_m1.png`, `grid_m2.png` (m00 = hero a mitad de la animación, m01 al terminar, m04 a m11 cada 700px).
- v2 compu: `shots/gd0.png`, `gd1.png`, `gd2.png`.
- v2 slider a mitad del swipe: `shots/g_slider.png`. Antes/después con el barrido: `shots/g_ba.png`. Error del form: `shots/f0_err.png`.
- v1 (closet que cae + slider objeto): `v1/grid_m0.png`, `v1/grid_m1.png`, `v1/g_slider.png`.
- Recuadro de multiply: `shots/crop_slide.png` y `shots/slide_contrast.png` (contraste x10).
