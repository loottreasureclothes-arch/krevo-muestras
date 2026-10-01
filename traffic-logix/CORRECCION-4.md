# CORRECCION-4 · traffic-logix (GTLO) · 30 sep 2026

Última pasada puntual sobre los 3 problemas del juez. `index.html` se armó con `python3 build.py` después de cada cambio y no se editó a mano.

Verificado con krevo-shot m y d: **0 alertas** en los dos. No hay consola, 404, scroll horizontal, botones chicos, guiones largos ni emojis. Fuentes: solo Overpass y Overpass Mono. Hay 4 enlaces de WhatsApp.
- Alto en celular: **6,459 px** (tope 9,000).
- Compu: 7,505 px.
- A 820 px: sin scroll horizontal (820 = 820).

Capturas en `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/r4fix-traffic-logix/`:
- `hoja-celular.jpg`, `hoja-compu.jpg` y `hoja-820.jpg`.
- `final-m/` y `final-d/`, con su report.json.
- `z/`: `before-m.jpg` (antes), `c1-sheet.jpg` (la señal se suelta, 5 posiciones), `c2-d.jpg` y `c2-m.jpg` (convoy en 5 posiciones de scroll), `cv-d-3.png` (convoy a 1440), `c3-ej.jpg` (Ejecutivo a 390, 820, 1024 y 1440).
- `bak/`: respaldo de sections, site.*, template e IMAGENES de antes, más las fotos `ejecutivo-*.webp` que salieron de img/.

## Aplicado

| # | Qué | Cómo quedó |
|---|---|---|
| 1 | Señal pegada en celular | La señal y el formulario van ahora en un contenedor propio (`.sn-stick`). El botón verde y "Te confirmamos precio y disponibilidad por WhatsApp." quedan fuera, así que la señal ya no los alcanza. Además, el contenedor termina un alto de señal antes que el formulario: margen negativo igual a `--sth`, que es el alto real de la señal medido con ResizeObserver, y el botón recupera ese alto con `margin-top`. Por eso la señal se suelta con "Tus datos" (Empresa y Tu nombre) ya a la vista y nada se encima. En compu `.sn-stick` es `display:contents` y el acomodo de 2 columnas no cambia. Probado en 5 posiciones (`z/c1-sheet.jpg`). |
| 1b | Flotante de WhatsApp sobre "Tu nombre" | La sección `#senal` lleva `data-hide-wa`. El flotante se esconde en toda la sección del cotizador (body `wa-off`) y vuelve al salir. |
| 2 | "Siempre impecables" con fuerza | Las placas-foto del convoy crecieron de unos 230 a **min(74vw, 330 px)** en celular y de 260 a **clamp(340 px, 31vw, 470 px)** en compu (446 px a 1440). Llevan fotos nuevas de 880 px en srcset (Real-ESRGAN x4 y mezcla, ver IMAGENES.md), así que ya no se ven suaves. El movimiento está ligado al scroll en celular y en compu, sin pin y reversible: la fila entera cruza de derecha a izquierda y frena con la última unidad alineada. Mientras rueda, las placas vienen separadas un 26 % de su ancho y se cierran en formación al frenar. El carril amarillo de abajo corre con ellas a media velocidad. Arriba quedan el título, los números económicos (UNIDAD 126 a 152) y el modelo. La foto grande de la Hiace con la bandera sigue debajo sin cambios. Con movimiento reducido o sin JS, la fila se recorre con el dedo. |
| 3 | Tarjeta Ejecutivo | No hay foto propia de una unidad ejecutiva: la Suburban del Wix es de prensa y en fb_03 sale cortada y a 414 px. Por eso la tarjeta se volvió **tipográfica**: una señal informativa blanca con remaches y filete, la pestaña amarilla "SALIDA 24 H", "EJECUTIVO" grande con la flecha de salida y dos renglones mono, "MONITOREO GPS 24 H" y "PUNTUALIDAD" (los dos vienen de "Te ofrecemos" del Wix). La señal cuelga de dos postes sobre asfalto con el carril. Ya no hay foto del cofre. El texto se mide con unidades de contenedor (`cqi`) y no se desborda a 390, 820, 1024 ni 1440. El cotizador en compu, con Ejecutivo elegido, muestra bajo la señal la foto de la fila con "UNIDADES MONITOREADAS POR GPS 24 H". |

Un arreglo de paso: el pie de la foto bajo la señal (compu) no se actualizaba cuando dos servicios usaban la misma foto. Ahora se refresca siempre.

## WhatsApp (sin cambios en la lógica)
Ejecutivo, 3 pasajeros, 12 oct 05:30, Aguascalientes → Aeropuerto GDL, Nissan Planta, Ana:
`https://wa.me/524494683835?text=Hola GTLO, quiero cotizar transporte ejecutivo para 3 pasajeros, el 12 de octubre a las 05:30, de Aguascalientes a Aeropuerto GDL. Empresa: Nissan Planta. Mi nombre: Ana.`

## No aplicado / notas
- En compu la señal del cotizador casi no se pega: es la pieza más alta de su rejilla (686 px con la foto), así que no le queda recorrido. Ya era así antes y no se pidió cambiarlo.
- En el estado final del convoy (cuando ya frenó) se ven completas 121, 114 y 152. La 126 y la 123 se ven mientras la fila rueda: en compu caben unas 3 placas de 446 px.
- Las fotos del convoy salen de originales de 414 a 640 px. Van en marco de señal, nunca a sangre, y a un máximo de 470 px.
- Sin IA generativa, sin stock y sin datos fuera de research/. No se tocaron el hero, los servicios Personal, Aeropuerto y Turismo, la cita, el cierre ni la base.

## Archivos tocados
`sections/20-servicios.html/.css`, `sections/30-senal.html/.css`, `sections/40-flotilla.html/.css`, `site.js` (alto de la señal, pie de foto y convoy), `img/cv-*-880.webp` (nuevas), `img/ejecutivo-*.webp` (fuera), `IMAGENES.md`.
