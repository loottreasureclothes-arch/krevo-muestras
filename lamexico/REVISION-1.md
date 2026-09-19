# REVISIÓN 1: La México Gran Cantina (inspector)

Revisado el 18 sep 2026 en http://localhost:8770/lamexico/ con Chrome headless (perfil propio), a 390x844 y a 1440x900. Hice capturas cada 700 px, a mitad de las animaciones (hero, slider), probé el swipe, las 6 pestañas del menú y el formulario, y comparé contra `research/`.

**Calificación global: 7.2 / 10.** Funciona bien, los datos están limpios y la tipografía tiene carácter. Todavía no se ve de $5,000 USD. Lo que la baja es el recorte de la michelada del hero, el slider con fondos rosa pastel y la sombra despegada, y que le faltan favicon e imagen og.

## Calificación por punto

| # | Punto | Nota | Evidencia |
|---|---|---|---|
| 1 | Primer impacto | 7 | El título "La gran cantina." en Fraunces se lee fuerte y hay CTA verde arriba. Pero la michelada es un recorte IA con la base mal cortada: el vidrio se ve posterizado, con halo y rebaba (`insp-d-hero-base.png`). En compu, al hacer scroll se ve un borde diagonal a la izquierda del tarro (`insp-d-edge.png`). Los datos 4.3★, "Desde 2013" y el horario no se ven hasta hacer scroll: el hero mide 864 px en un celular de 844. El fondo #2a0b10 casi se lee negro, no como rojo cálido de la marca. |
| 2 | Animaciones | 8 | La caída del hero dura 0.9 s, los reveals 700 ms y el slider unos 0.8 s. Todas se disparan solas. No hay pin (0 `.pin-spacer`) ni scroll eterno. A los 0.35 s el tarro cae encima del título todavía vacío (`m-hero-t035.png`), pero se acomoda bien. |
| 3 | Slider | 6.5 | El swipe con touch funciona (01→02), igual que los puntos y las flechas. Los fondos #f6dfd9 y #f3d9cc son rosa bebé, no de cantina. La sombra de contacto CSS queda flotando unos 100 px debajo del plato de tacos, que ya trae su propia sombra, así que se ve doble y despegada (`d-slider-mid.png`). La caja no tiene radio (0 px) y todo lo demás usa 18 px. Son objetos de estudio sobre color plano, no escenas. |
| 4 | Celular | 7.5 | Sin scroll horizontal (scrollWidth 390). El slider mide 637 px, el 75 % de la pantalla, y el título de la slide queda abajo del pliegue (`insp-m-sheet0.png`). Botones de menos de 44 px: header "Reservar" 92x38, links del footer de 24 px de alto, "Ver reseñas en Google" de 28 px y los puntos del slider de 31 px. |
| 5 | Funcional | 8.5 | WhatsApp con el glifo oficial y mensaje escrito, tel:+524494384900, Maps con la dirección real, horario y menú con pestañas. El formulario valida vacío y arma bien: "Hola, quiero reservar una mesa en La México Gran Cantina (Colosio). Nombre: Juan Pérez / Personas: 6 / Día: martes, 22 de septiembre / Hora: 9:30 p. m.". Pero la hora se puede poner a cualquier hora, aunque abren de 1 pm a 1 am. Único error de red: 404 en `/favicon.ico`. |
| 6 | Datos | 9 | Revisé contra `menu.md` los 43 precios, uno por uno, y todos coinciden. También coinciden la dirección, el teléfono, el horario, el 4.3 con 2,590 opiniones, las promos y la referencia de Canta Corazón. Las diferencias están en la lista de cambios (#10). |
| 7 | Estilo | 7.5 | El fondo es crema #faf6f0, como pidió Emanuel. Todos los botones de reservar y WhatsApp son verde #25D366. El rojo #C10B28 solo va en detalles (raya bajo los títulos, viñetas, estrella). No hay guiones largos, no se usa Inter y no hay emojis. Aparte del rojo aparece el dorado #b4843c en la raya de "Promos de la casa". Sobran huecos: entre reseñas y visita hay unos 150 px vacíos, y la sección de reseñas se ve pelona. |
| 8 | Detalles finos | 5.5 | No hay favicon ni `og:image`/`og:title`, así que la tarjeta en WhatsApp sale fea. El header sólido sobre el hero tinto se ve gris lila, sucio (`d-hero-scroll-end.png`). "Reservar" sale dos veces en el nav de compu. La tarjeta de galería `ig_terceras` es un flyer con texto encima ("Esta tercia mata pokar"). En compu el menú a 2 columnas parte nombres ("Chicharrón de Rib / Eye") y aplasta las líneas punteadas. |

## Cambios priorizados (los que más suben la calidad van arriba)

1. **Hero, recorte de la michelada** (`.lm-hero .k-ho-img.lm-cut`, `brand/michelada_cut.webp`). Hay que volver a recortar el tarro con un alfa limpio y sin posterizado en la base. Por ejemplo, regenerarlo sobre fondo tinto directo o recortarlo con remove_background y suavizar el borde 1 px. Quitar la máscara de degradado inferior, porque es la que ensucia la base. Debe quedar sin halo ni borde diagonal visible al girar.
2. **Hero, lo principal arriba sin scroll** (`.k-ho-facts` en celular). Los 3 datos (4.3★ 2,590 opiniones · 1 pm a 1 am · Desde 2013) tienen que verse en la primera pantalla de 390x844. Para lograrlo: bajar `.k-ho-stage` a unos 38svh en celular, o poner los facts en una fila justo debajo de los botones. El hero no debe pasar de 100svh.
3. **Hero, color** (`--wine` / `.lm-hero`). Subir el tinto a un rojo vino más cálido y visible, tipo #5a0f1c a #7a1224 con el radial #C10B28 más presente, para que se lea "rojo de la marca" y no "negro de cine". La banda de promos y el footer siguen el mismo tono.
4. **Slider, fondos** (`.k-slide[data-bg]`). Quitar los rosas pastel #f6dfd9 y #f3d9cc. Usar tonos de cantina: crema arena #efe3d0, barro #e8d2bd, verde agave apagado #dfe3d3 y maíz #f1e2c2. Idea mejor, por la regla de Emanuel de "fotos con ambiente": poner detrás del objeto una foto de ambiente real desenfocada y oscurecida (barra `ta_00`, salón `ta_0c`).
5. **Slider, sombra despegada** (sombra de contacto del kit en `.k-slide-media`, `slider.css`). En `data-mode="object"`, pegar la elipse a la base del objeto (bottom del img, no del contenedor) o quitarla, porque las fotos IA ya traen sombra. Hoy se ve doble y flotando unos 100 px abajo.
6. **Slider, forma y alto** (`.k-slider-viewport`). Ponerle `border-radius: var(--radius)` y `overflow:hidden`. En celular, limitar la imagen a unos 40svh para que el título y el CTA de la slide quepan en la misma pantalla que el objeto (hoy 637 px).
7. **og y favicon** (`<head>`). Agregar `og:title`, `og:description`, `og:image` 1200x630 (michelada sobre tinto con el logo), `og:url`, `twitter:card`, más `<link rel="icon">` con el toro o la "M" en PNG/SVG y `apple-touch-icon`. Hoy hay un 404 en favicon.ico.
8. **Reseñas** (`#resenas`). Agregar 3 tarjetas `.lm-quote` (el CSS ya existe) con citas reales de `datos.md`: "Música viva, mariachis, buen ambiente, buena atención, precios adecuados", "Muy buen ambiente y atención de los meseros, la comida estuvo muy rica." y "Servicio excelente, buenas opciones para beber..." (esta es de la sucursal Américas: ponerlo o usar la del 2x1 en jueves), con la fuente "Reseña en Google". Llena el hueco y da prueba social.
9. **Galería** (`#lm-cards`). Cambiar `fotos/ig_terceras.webp` por una foto sin texto de flyer, por ejemplo `ig_bebida_modelo` o `ig_tacos_mesa`. El texto "Esta tercia mata pokar" se ve a captura de Instagram y trae falta de ortografía.
10. **Datos** (menú y visita).
    - Cambiar "Vaso michelado" por "Vaso michelada", como dice `menu.md`.
    - En `.lm-hours-note`, "Pregunta la cartelera por WhatsApp" da a entender que hay una cartelera fija, y los días de música no se encontraron. Dejarlo en "Música en vivo. Pregunta por WhatsApp qué días."
    - Riesgo: `fotos/ta_0c_tall.webp`, la foto grande de "Fiesta brava", es de Tripadvisor 2019 y probablemente de la ubicación vieja. Si el cliente la ve, puede decir "ese no es mi local". Conviene avisarle a Emanuel.
    - Riesgo: el WhatsApp 449 120 1728 no está publicado en ninguna fuente, solo viene del brief.
11. **Tamaños táctiles en celular.**
    - `.k-header .k-cta`: 44 px de alto como mínimo.
    - `.lm-foot-links a` y `.lm-link`: padding vertical hasta 44 px.
    - `.k-dot`: área de toque de 44 px (con pseudo-elemento).
12. **Formulario, hora** (`input[name=hora]`). Cambiarlo por un `<select>` con horas de 1:00 pm a 12:30 am cada 30 min. Así nadie reserva a las 9 am y se ve más pulido que el reloj nativo con "--:-- ----".
13. **Header sólido sobre el tinto** (`.k-header.is-solid`). Hoy el blanco 85% sobre tinto se ve gris lila. Usar crema #faf6f0 al 92% o, mientras está sobre el hero, un tinto al 80% con blur y texto claro.
14. **Menú en compu** (`.k-menu-panel ul` a 2 columnas). Pasar a 1 columna más ancha o subir el ancho mínimo para que "Chicharrón de Rib Eye" y "Aguachile Tradicional" no se partan en dos líneas y las líneas punteadas no queden de 10 px.
15. **Nav duplicado** (`.k-nav a[href="#reserva"]`). Quitar "Reservar" del nav, porque ya está el botón verde a la derecha. Cambiar el dorado de `.lm-dark .lm-h2::after` por el rojo o por crema, para no tener un segundo acento.

## Capturas clave

Carpeta: `/private/tmp/claude-501/-Users-emmanuelcruzsalas/908f2c84-948e-4d5c-8dec-4d6bd1c308ae/scratchpad/lm/`

- Hero celular: `m-hero-t035.png` (a mitad de la caída), `m-hero-final.png`, `m-hero-scroll-end.png`
- Hero compu: `d-hero-final.png`, `d-hero-scroll-end.png`, `insp-d-hero-base.png` (base mal recortada), `insp-d-edge.png` (borde diagonal)
- Slider: `d-slider-mid.png` (sombra despegada), `m-slide1.png` a `m-slide3.png`, `insp-m-sheet4.png`
- Recorrido completo: `insp-m-sheet0..3.png` (celular), `insp-d-sheet0..5.png` (compu)
- Menú: `m-menu0..5.png`, `d-menu0..5.png`
- Formulario: `m-form-empty.png`, `m-form-filled.png`; métricas en `m-results.json` y `m-info.json`
