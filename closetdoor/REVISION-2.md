# REVISIÓN 2 · Closet&Door (inspector, memoria separada)

Página: http://localhost:8770/closetdoor/ (index.html 22:06, site.css 22:04)
Herramientas: Chrome headless por CDP con perfil propio, a 390x844 @2x con touch y a 1440x900. Probé swipe real con eventos touch, el barrido del antes/después, el cotizador (leí el URL que arma), el foco con teclado y el hover.
Respeto las DECISIONES DE EMANUEL del CHECKLIST: el café nogal, los botones verdes, las fotos de escena, "Remodela tu espacio", "Remodelaciones", "Otra vista", "Lo que hemos fabricado" y "¿Quiénes somos?". Nada de eso cuenta como error.

## Calificación global: **7.5 / 10**. Contra un sitio de agencia de $5,000 USD: **6 / 10**

Técnicamente está limpio: 0 errores de consola, 0 respuestas 404 en local, 1.08 MB en 26 peticiones y sin scroll horizontal (scrollWidth 390). Lo que lo separa de uno de $5k ya no son bugs. Es el oficio: el slider no sigue al dedo, las mismas 3 fotos se repiten 2 o 3 veces, los 6 títulos de sección tienen el mismo molde y el hero en la compu tiene aire muerto.

| # | Punto | Nota | Evidencia |
|---|---|---|---|
| 1 | Primer impacto | 7 | En celular, el título, los chips, el CTA verde, la foto y los facts caben en 844px, con la cinta abajo (`m01_hero`). Se ve cálido y con marca. En la compu el título mide unos 100px de alto en un lienzo de 1440, y entre los botones y los facts queda un hueco de ~120px (`d01_hero`). "ESPACIO." en #ec4a40 sobre #5a3a24 da un contraste de 2.7:1, por debajo del 3:1 que pide el texto grande. |
| 2 | Animaciones | 8 | Todas se disparan solas y duran menos de 1.5 s. No hay pin ni scrub. A los 150 ms la foto del hero ya se ve y el título todavía no (`m00a_150`); a los 800 ms todo está completo (`m00c_800`). Se corrigió el "hero vacío" de la R1. El único riesgo: el hero arranca cuando la foto termina de decodificar, no cuando cargan las fuentes. Con red lenta, Archivo puede llegar a media máscara y el título cambiaría de ancho. |
| 3 | Slider | 7 | El swipe funciona (01→02) y el wipe con clip-path está bien hecho (`sw1_mid250`). Pero al arrastrar, el marco de la foto no se mueve: solo la imagen se corre un 22% por dentro (`sw0_dragging`), así que no se siente que tú lo empujas. No se asoma la siguiente foto. Después del swipe el punto activo ya se nota (barra más ancha y gris oscuro), pero pierde el rojo de marca. |
| 4 | Celular | 8 | Imágenes a media pantalla y nada encimado. Toques de menos de 44px: los chips del hero `.cd-hero-list a` miden 38px y `.k-logo` 36px. El contador "01 / 06" del slider queda debajo del botón flotante de WhatsApp cuando el slider llega al fondo de la pantalla (`m02_y700`, esquina inferior derecha). En celular no hay menú: solo "Cotizar". |
| 5 | Funcional | 8 | El cotizador vacío dice "Falta el mueble, tu colonia y tu nombre." Lleno arma `wa.me/524494463411?text=Hola%20Closet%26Door%2C%20soy%20Luis.%20Quiero%20cotizar%3A%20Oficina.%0AMedidas%20aprox.%3A%203%20m.%0AColonia%3A%20Jardines.`, que es correcto. El WA flotante lleva el glifo oficial y mensaje prellenado. Funcionan tel: y Maps con la dirección real. **No hay horario**; está bien omitirlo, pero hay que pedírselo a Emanuel. Al enviar no aparece ninguna confirmación en la página. |
| 6 | Datos | 8 | Todo sale de los datos permitidos. Dos cosas por confirmar: `facebook.com/ClosetAndDoor` no viene en research (krevo.json solo trae un grupo de FB como fuente, y Facebook responde 200 a cualquier URL). La etiqueta "Proyecto real" contradice el pie "Fotos ilustrativas" si esa foto no es suya. Ortografía bien. No hay guiones largos (verificado en innerText). |
| 7 | Estilo | 7 | Archivo con wdth + Instrument Sans, sin Inter y sin emojis. Hay dos rojos distintos: `--brand #c81e24` en fondo claro y `#ec4a40` en madera. Los 6 H2 usan el mismo molde (condensada mayúscula negra + segundo renglón rojo con punto), y a la tercera sección ya no sorprende. |
| 8 | Detalles finos | 7 | Ya tiene favicon, apple-touch-icon, og:title/description/image 1200x630 y twitter card (corregido de la R1). Pero `og:image` apunta a `loottreasureclothes-arch.github.io/.../og.jpg`, que hoy da **404**: el repo no tiene commits. Funcionará cuando se suba, así que hay que probarlo con el depurador de Facebook. Radios consistentes (18px) y foco visible en rojo. El hover de las cards es solo un zoom de 1.04 que casi no se nota (`d_hover_card`). |

## Qué se corrigió de la ronda 1 (solo lo que sigue siendo válido)

| R1 | Estado |
|---|---|
| Hero vacío 0 a 0.3 s | **Corregido.** La foto arranca a opacity 0.9 y scale 0.96. |
| "TU" solo en su renglón en la compu | **Corregido.** Quedan 2 renglones, con `.cd-nw`. |
| Antes/después más alto que la pantalla en la compu | **Corregido.** `max-height: 72svh` y 16:9. |
| Favicon, og y twitter card | **Corregido** en el código. Falta que la URL de og exista (deploy). |
| `theme-color` | Sigue café #5a3a24. Con el hero café **está bien** (decisión de Emanuel). |
| Punto activo del slider tras el swipe | **A medias.** Ya se distingue (más ancho y oscuro), pero no en rojo. |
| Toques de 44px | **A medias.** Los puntos y los links del footer ya cumplen; los chips del hero (38px) y el logo (36px) no. |
| Facebook sin verificar | **Pendiente.** |
| Horario | **Pendiente** (hay que pedírselo a Emanuel). |
| Fondo blanco, verde, café, Remodelaciones, Otra vista, "Lo que hemos fabricado" | No aplica: son decisiones de Emanuel. |

## Cambios priorizados (de más a menos impacto en la calidad percibida)

1. **Slider que sigue al dedo (`_kit/slider.js`, `dragTo`, modo photo).** Durante el arrastre, mover el `.k-slide-media` completo 1:1 con el dedo (translateX = dx) y asomar la siguiente foto desde el borde derecho, a unos 24px con opacity 0.6. Que el texto de la slide actual se desvanezca con el arrastre (opacity 1 - |r|·1.5). Al soltar: si pasa del umbral o de la velocidad, completar con el wipe actual desde la posición donde quedó; si no, regresar con resorte de 480ms. Así se siente un Stories o Airbnb, no un carrusel de plantilla.
2. **No repetir fotos.** `cocina_despues.webp` sale 3 veces (slide 2, "después" del BA y card 1); `vestidor.webp` y `puertas.webp` salen 2 veces. En `.cd-cards` usar las que no salen en ningún lado: `isla.webp`, `closet.webp`, `puerta.webp` y `oficina.webp`, o `cocina_vista2` recortada distinta. Una agencia de $5k nunca repite una imagen en la misma página.
3. **Hero de compu con más peso (`.cd-hero-title` y `.cd-hero-in` en ≥900px).** Subir el título a `clamp(96px, 9.5vw, 168px)` para que ocupe 60 a 65% de la columna. Quitar el hueco entre los botones y los facts con `grid-template-rows: auto auto` y `align-content: center`. La foto debe sangrar hasta el borde derecho y el de abajo, sin tarjeta flotante. Agregar un parallax corto de una vez (la imagen se mueve 24px al primer scroll, 600ms), sin scrub.
4. **Contraste y un solo rojo.** Cambiar `.cd-wood em` y `.cd-hero-facts li:first-child b` a un rojo más claro que dé ≥3:1 sobre #5a3a24 (por ejemplo #ff6a5c, que da unos 3.4:1), o poner "ESPACIO." en crema subrayado con una línea roja de 6px. Tener un solo token `--brand-on-wood` y no usar dos rojos sueltos.
5. **Variar el ritmo de los títulos de sección.** Hoy los 6 H2 son iguales. Propuesta: "Misma cocina. Otra vida." se queda así. "Lo que hemos fabricado" a 1 renglón chico (40px) con un contador "04" grande al lado. "Tres pasos" como número gigante "3" de 200px en rojo con el texto a su lado. "Visítanos." en crema sobre banda café corta. La idea es que cada sección tenga una sorpresa tipográfica distinta.
6. **Microinteracciones de botones (`.k-btn`, `.cd-green`, `.cd-card-cta`).** En hover de compu, que el ícono de WA o la flecha se desplace 3px y el fondo haga un barrido de izquierda a derecha (clip-path, 280ms). Al tocar en celular, mantener el scale .97 y sumar un brillo radial desde el punto del toque (ripple sutil de 300ms, en crema al 25%). En las cards: el zoom sube a 1.06 y aparece un velo de abajo con "Cotizar →". Así hay "algo que se mueve en cada gesto", como pide el brief.
7. **Confirmación del cotizador (`site.js` → `initForm`).** Después del `window.open`, cambiar el botón a "Listo, revisa tu WhatsApp" (con un SVG de palomita, no emoji) por 3 s, con morph de ancho. Hoy parece que no pasó nada si el navegador bloquea la pestaña. Como respaldo, si `window.open` regresa null, hacer `location.href = url`.
8. **Chips de selección con estado (`.cd-chips input:checked + span`).** Agregar una palomita que entre con scale 0.9→1 y clip, y una transición de color de 200ms (hoy cambia de golpe a café).
9. **Contador del slider contra el WA flotante.** En <700px, pasar `.k-count` a la izquierda junto a los puntos, o darle `padding-right: 76px` a la barra de controles del slider, para que nunca quede debajo de `.k-wa`.
10. **Toques de 44px:** `.cd-hero-list a` a `min-height: 44px` en celular, y `.k-logo` con padding vertical para llegar a 44px.
11. **Menú en celular.** Hoy `.k-nav` se oculta y no hay sustituto. Poner un botón "Menú" de 44px junto a "Cotizar" que abra una hoja con los 4 destinos: entrada con clip-path desde arriba en 420ms y los links escalonados 50ms.
12. **Hero sincronizado con las fuentes (`initHero`).** Esperar a `Promise.all([img.decode(), document.fonts.ready])`, con el mismo timeout de 1200ms, antes de poner `is-go`. Así el título no cambia de ancho a media máscara con red lenta.
13. **Sección Visítanos más rica.** Agregar un mapa estático estilizado (una imagen en tonos crema con un pin rojo) que abra Maps, y el horario en cuanto Emanuel lo dé. Hoy es texto y dos botones sobre blanco, y se siente como el final de una plantilla.
14. **Transiciones entre bandas.** Los cortes madera→blanco→crema→madera son rectos. Hacer que la foto de "¿Quiénes somos?" se monte 60px sobre la banda crema anterior (margin-top negativo con z-index), o usar una línea de veta de 1px en el borde, para que las bandas se sientan diseñadas y no apiladas.
15. **Datos por cerrar con Emanuel:** (a) el URL real de Facebook, o quitar el link; (b) si `proyecto_real.webp` es un trabajo suyo, y si no, quitar la etiqueta "Proyecto real"; (c) el horario; (d) después del deploy, probar la tarjeta og en developers.facebook.com/tools/debug.

## Capturas clave

Carpeta: `/private/tmp/claude-501/-Users-emmanuelcruzsalas/908f2c84-948e-4d5c-8dec-4d6bd1c308ae/scratchpad/insp2/shots/`
- Celular: `s_m0.png` (hero a los 150, 400 y 800 ms y al terminar), `s_m1.png`, `s_m2.png` (el resto de la página cada 700px). El contador tapado por el WA está en `m02_y700.png`.
- Swipe: `s_swipe.png` (arrastrando, 250ms, 500ms y al final).
- Antes/después con barrido y cotizador lleno: `s_ba.png`. Error del form: `f0_err.png`.
- Compu: `s_d0.png`, `s_d1.png`, `s_d2.png`. Hover de card: `d_hover_card.png`.
