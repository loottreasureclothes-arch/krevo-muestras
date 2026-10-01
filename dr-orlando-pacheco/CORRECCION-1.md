# CORRECCIÓN 1 · dr-orlando-pacheco (1 oct 2026)

Sobre REVISION-1.md (7.5) y las decisiones del orquestador. Todo se editó en `sections/`, `site.css`, `site.js` y `template.html`; `index.html` sale de `python3 build.py`.
Capturas: `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/pacheco-fix/` (`hoja-celular.jpg`, `hoja-compu.jpg`, `hoja-360.jpg`, `hoja-820.jpg`, `m/`, `d/`).

## Resultado de la verificación
- krevo-shot m: **alertas []**, alto **8,470 px** (antes 8,674). krevo-shot d: **alertas []**, alto 7,087.
- Alto a 320 px: **8,650** (antes 9,070-9,194). A 360: 8,497. A 820: 6,892.
- Hilo a 360, 390, 820 y 1440: cada frase subrayada en **1 renglón**, subrayado a 0.6-1.1 px del texto, **0 cruces** sobre texto (prueba `cross: {}`), sin pin.
- Movimiento reducido: desfase **0** en 6 posiciones de scroll, incluso después de bajar y subir. Sin reducido: a 0.5 s va a medias (709) y a 1.7 s está completo (0 px).
- Flujo: nada preseleccionado (0 y 0). Incontinencia urinaria → "Primera visita de uroginecología $800 · Precio publicado por él en Doctoralia." "Prefiero decírselo en consulta" quita el motivo y el resumen dice "No se manda (en consulta)". sessionStorage 0, localStorage 0, sin cookie, URL sin cambios.
- URLs wa.me decodificadas:
  - fija: `https://wa.me/524491070751?text=Hola Dr. Pacheco, quiero agendar una consulta.`
  - dinámica: `https://wa.me/524491070751?text=Hola Dr. Pacheco, quiero una consulta. Motivo: incontinencia urinaria. Consultorio: Corporativo Médico del Valle. Cuándo: la próxima semana. Mi nombre: Ana.`

## Cambios aplicados (en orden de la revisión)
1. **Hero de celular con él dentro.** La tarjeta abre con su retrato en hoja de 92 px (88 px abajo de 380) + "DR. ORLANDO PACHECO" + "Uroginecología y obstetricia" (+ "Consulta previa cita en dos consultorios" donde cabe). Foto nueva apaisada del atrio (`hero-m-480/920`, de 330 px de alto) para que el doctor, el título y "AGENDAR CONSULTA" quepan en la primera pantalla de 390x844. Pie de foto visible también en celular: "Unidad Médica de Especialidades DNC" (pestaña arriba a la derecha; en compu abajo a la izquierda). **"BISTRO GARDEN" ya no existe en ninguna versión**: se retocaron las letras del mostrador rellenando con los mismos listones de madera (PIL/numpy, interpolación vertical; sin IA) en `hero-d-*`, `hero-m-*` y en `og.jpg`. En compu el retrato (136 px) y su nombre encabezan la columna de texto, con filete abajo, y la etiqueta cambió a "Aguascalientes · Dos consultorios" para no repetir "previa cita".
2. **Pie limpio.** Sin la franja borrosa de recepción. Arriba un filete salmón; logo + nombre a la izquierda y **redes con logotipo de 44 px** (Instagram, TikTok, Facebook @doctor.urogine) a la derecha; consultorios en una línea cada uno, contacto, cédulas + COFEPRIS en un renglón y legales en dos columnas. Las redes se quitaron de Consultorios (no duplicar).
3. **Hilo sin cruzar texto.** Al salir de cada frase corre horizontal por la misma línea base y solo en el margen baja. Los márgenes ahora son los de cada cita (en compu el hilo rodea la cita de 2/3 en vez de cruzar 1,100 px). `.pc-u { white-space: nowrap; font-size: min(1.12em, 5.6vw) }` y citas a `clamp(19px, 5.3vw, 21px)`: "explica perfectamente bien todo." cabe en un renglón a 360. Se corrigió un gancho que salía cuando la frase terminaba junto al margen de la cita.
4. **Reduced-motion:** `if (reduce || done)` al inicio de `update()` → siempre completo. **Blindaje 1.6 s:** en cuanto el hilo se asoma corre un reloj; a 1.2 s termina de dibujarse en 0.4 s y queda completo (regla de la hoja y del orquestador).
5. **Flotante de WhatsApp.** Ya no se esconde por sección: `data-hide-wa` vive solo en los botones verdes (consulta, barra "Urgencias y WhatsApp", tarjeta del cierre) y en el pie; se oculta en cuanto cualquiera asoma. Visible en hero, credenciales, opiniones y donde el verde no está a la vista.
6. **Botones en el salmón exacto del logo** `#C4785C` con texto carbón (4.52:1). Hover: carbón con letra salmón (su logo). Se quitó el ladrillo `#A9573B` y el café `#8F4528`. `--salmon-ink` pasa a `#B5644A` solo para títulos grandes sobre durazno, cifras de precio (36 px) y bordes; el texto chico que iba en ladrillo ahora es carbón/gris.
7. **Contraste sobre durazno:** "con número." y "para completar." en `#B5644A` = 3.46:1 (texto grande, pasa 3:1).
8. **"Toca tu motivo" duplicado:** borrado (la promesa de privacidad ya está junto al botón verde).
9. **Consulta a 1440:** chips de 17.5 px y 50 px de alto, hojas del mismo alto, precio de 36 px, "Prefiero decírselo en consulta" y la nota de precios en un mismo renglón con filete, pasos separados por línea.
10. **Opiniones a 1440:** bloque de 1,000 px centrado (título incluido), citas de 34 px al 66 %, trazo de 2 px, "Explica." de 96 px con los datos a su lado.
11. **Cierre sin "FARMACIA DI":** nuevo recorte `cierre-noche-480/840/1260` (x340-1600 del original, con más cielo) y degradado más hondo bajo el título; en celular carga la de 1260 (nítida).
12. **Hero de compu:** columnas 1fr / 1.05fr, foto de `min(68svh, 580px)` alineada con el contenedor; sin hueco muerto a la derecha.
13. **"5.0 en Doctoralia · 24 opiniones"** sin "con cita verificada".
14. **`.pc-cita`** en Newsreader itálica 20 px (la firma "De su perfil en Doctoralia" sigue en Jost).
15. **Mapas con pin al centro:** 180 px en celular, CMV con `q=21.8767498,-102.3137092` y DNC con `q=21.9063802,-102.3297375` (coordenadas de su propio link de Google Maps que ya usa "Cómo llegar").

Extra (decisiones del orquestador y oficio): **cédulas de especialista caro**: números en Jost 300 de 44 px (celular), 54 px (tableta) y 64 px (1440). Barra "Urgencias y WhatsApp" en compu ocupa la fila completa (etiqueta, verde, correo). Links del pie de 40 px mínimo en compu (alerta de krevo-shot resuelta).

## No aplicado y por qué
- **Reversibilidad total del hilo:** se mantiene mientras se dibuja (primer 1.2 s), pero una vez completo se queda completo. Es lo que pide "completo a los 1.6 s pase lo que pase"; sin eso, quien se queda quieto lo ve a medias.
- **Foto de recepción como columna en el pie:** se quitó en vez de achicarla; el cierre ya remata con la fachada nocturna grande justo arriba y una columna chica en el pie se veía de relleno.
- No se tocaron: mecánica de "Dilo sin escribirlo", tira de cédulas, tarjetas de cédula con "Verificar en el Registro Nacional de Profesionistas", cálculo del hilo con la posición real de cada frase, paleta, formas de hoja, recorte de la fachada CMV y su placa, las cinco citas y "Todo listo para completar".
- Archivos que ya no se usan y se dejaron en `img/` (no se borró nada): `hero-m-765.webp`, `dnc-noche-*.webp`, `pie-recepcion-*.webp`.
- Sigue fuera de esta carpeta: anotar la muestra en `COMPONENTES-USADOS.md` (orquestador).
