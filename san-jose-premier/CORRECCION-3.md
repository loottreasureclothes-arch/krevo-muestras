# CORRECCIÓN 3 · Constructora San José Premier (corrector de tercera pasada, 30 sep 2026)

Base: `REVISION-3.md` (5 cambios, aplicados en orden). Todo se editó en `sections/`, `site.css`, `template.html` e `img/`; `index.html` sale de `python3 build.py`. Sin IA generativa ni stock; no se tocaron precios, medidas, teléfonos, direcciones ni requisitos.

## Aplicados
1. **Casa completa en el hero de compu.** El `<img>` del hero ahora va dentro de `<picture>` con `<source media="(min-width: 900px)" srcset="hero-fachada-960 960w, hero-fachada-1600 1600w" sizes="50vw">`. En celular sigue `hero-tt21` (no cambió nada). En compu, `object-position: 50% 30%`: se ve la casa de dos plantas de arriba abajo (bloque de piedra, ventanales, puerta y escalones). Hay dos preloads con `media`: uno de celular (tt-21) y otro de compu (fachada). El alt quedó genérico ("bloque de piedra gris con ventanal, muros blancos y cielo azul") porque son dos casas distintas según el ancho.
2. **Una sola voz.** Quedaron las 5 frases como pidió el juez: "La casa de nuestro video más visto: 276 mil vistas.", "Plano y render en nuestro Facebook.", "Terreno de 7 x 20.25 m. Plano en nuestro Facebook.", "Grabamos la obra: 36 videos en TikTok, uno con 276 mil vistas." y "Ver los videos". Las cifras (36 y 276 mil) son las mismas de la hoja. Siguen en voz de KREVO, como debe ser, "hoy usamos cuadros de sus videos" (Todo listo) y la nota del pie. Los mensajes de WhatsApp ("sus casas") se quedan, porque los manda el cliente.
3. **Ficha Terrenos con la aérea buena.** Es `terrenos-fracc-{480,960,1600}`, del mismo video v08, seg. 12, en 2:1. Pie: "Los últimos terrenos, desde el dron" (DM Sans 600, 12 px, sobre un velo corto). También va en el cierre cuando se elige Terreno. **Variante:** el recorte va de 2 a 30 % del alto, no hasta el 48 %. Un 2:1 a lo ancho de un cuadro vertical solo cubre el 28 % del alto. Si se bajaba hasta el 48 %, el cuadro quedaba en techos de obra y bodegas, y si se alargaba para meter los lotes ya no era 2:1. Se eligió la franja con campos, árboles y filas de casas blancas, sin cascajo ni el techo en obra.
4. **Cierre sin elegir que vende con fotos.** Se quitó la silueta. Ahora hay dos fotos reales en 4:5 lado a lado, con marco recto y travesaño `.sj-win`, cada una un `<button>`:
   - `una-planta-tt30`, rótulo "UNA PLANTA · 88.91 m²".
   - `dos-plantas-frente`, rótulo "DOS PLANTAS · 130.36 m²".
   - En celular la medida baja a un segundo renglón en dorado. Los m² van en minúscula.
   - Al tocar una foto se llama `SJ.set("modelo", "una" | "dos")`. El título pasa a "Tu casa / ya tiene plano.", la ficha se llena en el mismo lugar con la foto 16:9 del modelo, el botón cambia a "Cambiar modelo" y el mensaje de WhatsApp se actualiza.
   - Además, el interruptor de Modelos se mueve al mismo modelo, así que su ficha queda marcada `is-saved`.
   - Se quedan "Falta elegir / modelo." y el único verde de la sección.
5. **Remate del pie y lista más corta.**
   - **Banda del dron.** En celular va con `object-position: 50% 88%`: sierra arriba, campos y la fila de casas blancas abajo. Se dejó el 88 % y no el 78 %, porque con el 78 % las casas quedaban tapadas por el velo. En compu va al 92 %, porque con el 78 % solo se veía campo oscuro, sin sierra ni casas. El velo ahora empieza en el 65 % (cubre el 35 % de abajo). **Variante en compu:** el lema cae sobre techos blancos, así que ahí el velo empieza en el 62 % y la sombra del lema es más firme. Así se lee. Sigue sin velo en la parte de arriba.
   - **"Todo listo para completar"** (menos de 900 px): filas de 15 px con 10 px de padding y sin hueco entre ellas. La marca de ladrillo pasa a 18 x 8. **Se ahorran 38 px, no ~300.** La lista mide 411 px (antes 449), y bajar 300 px pedía quitar renglones. No se quitó ninguno, porque son la lista del dueño que manda la hoja.

## No aplicados
- Ninguno quedó sin hacer. Lo que cambió respecto a lo pedido (el alto del recorte de Terrenos, la posición del dron y los ~300 px) se explica arriba.

## Verificación
- **krevo-shot celular:** 8,788 px, 0 alertas, solo DM Sans y DM Serif Display, consola limpia, sin 404 ni scroll horizontal. Después de elegir modelo, crédito y nombre: 8,891 px (tope 9,000).
- **krevo-shot compu (1440):** 7,823 px y 0 alertas. **820 px:** 9,769 px (es tableta; el tope es de celular). En ese ancho el cierre enseña las dos fotos grandes y sin cortes.
- **Flujo (390 px).** Al elegir Dos plantas, "Me interesa", Infonavit y "Laura Pérez", el formulario y el cierre dan la misma URL:
  `https://wa.me/524491552309?text=Hola San José Premier, me interesa una casa de dos plantas (130.36 m² de construcción). Compro con: Infonavit. Me gustaría agendar una visita. Mi nombre: Laura Pérez`
- **Foto "Dos plantas" del cierre:** `data-show="dos"`, el título cambia a "Tu casa ya tiene plano.", el interruptor queda en 2, la ficha queda en `is-saved` y el botón dice "Cambiar modelo".
- **Capturas** en `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/r3fix-san-jose-premier/`:
  - Hojas: `hoja-celular.jpg` y `hoja-compu.jpg`.
  - Capturas sueltas: `m/`, `d/` y `w820/` (con su hoja `hoja-820.jpg`).
  - Flujo: `t/hoja-flujo.jpg`.
  - Pruebas de la banda: `q/bands.jpg`.
- Sin git commit ni push.
