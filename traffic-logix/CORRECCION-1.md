# CORRECCION-1 · traffic-logix (GTLO) · 30 sep 2026

Aplica REVISION-1 (15 cambios) más las 7 decisiones del orquestador. `index.html` se arma con `python3 build.py`; no se editó a mano.
Verificado con krevo-shot m y d: **0 alertas** en los dos. Alto en celular: **8,106 px** (antes 8,479). Compu: 6,660 px. Fuentes: solo Overpass y Overpass Mono. 4 enlaces de WhatsApp, 3 verdes en página + flotante (1 por sección).
Capturas y hojas: `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/gtlo-fix/` (`hoja-celular.jpg`, `hoja-compu.jpg`, `final-m/`, `final-d/`, convoy a mitad `cv-m-*.png` y `cv-t820-*.png`, cotizador `p-*-m.png`, `a-*-m.png`).

## Aplicado

| # | Qué | Cómo quedó |
|---|---|---|
| 1 | Fuera la Suburban | `wix_suburban_ejecutivo` ya no se usa en ningún lado (era foto de prensa del fabricante). Ejecutivo lleva una banda de detalle real (cofre de una unidad GTLO con su logo, de `wix_hiace_detalle_logo`) y el pie amarillo "Foto de su unidad ejecutiva: pendiente de GTLO." Agregado a PENDIENTES. |
| 2 | Título del cierre | Sin elección: **"Falta rotular / tu ruta."**; con elección: **"Tu ruta / ya está rotulada."** Se quitó el renglón repetido. La señal nunca sale en blanco: sin elección muestra el ejemplo atenuado PERSONAL EMPRESARIAL ↗ 45 PASAJEROS · L A V con la etiqueta amarilla "EJEMPLO", y un renglón "Elige tu servicio arriba y aquí queda rotulada tu ruta." |
| 3 | Parches de placas | Rehechos desde las originales: la placa se tapa con un marco negro del mismo tamaño y forma (como portaplacas vacío), bordes suaves de 1 px. Nada pixeleado ni gris. El logo de la fachada del hero se quitó con `cv2.inpaint`. En flotilla (fb_01) no hace falta: las placas salen de canto y no se leen. |
| 4 | Aeropuerto honesto | fb_09 recortada a la Sprinter 152 con la puerta abierta: fuera el techo del estadio, su pantalla y toda la gente. Pie: "Sprinter lista para abordar." alt sin lugar. |
| 5 | Convoy sin choques | Las unidades avanzan todas hacia la derecha y la de atrás siempre trae más distancia que la de adelante: los huecos solo se cierran al frenar, nunca se atraviesan (medido a 390 y 820 en 5 puntos del recorrido). Rótulos con opacidad 0 hasta que la fila se detiene. Reversible, sin pin. |
| 5b | Celular | Una sola fila de 3 que entra de izquierda a derecha (la banda recorta con overflow), ya no rejilla 2x2. |
| 6 | Siluetas | Convoy de **3 unidades** (decisión: es lo que se ve rotulado en sus fotos): Toyota Hiace con trompa corta y parabrisas inclinado, Nissan Urvan cuadrada de frente casi vertical, Mercedes Sprinter alta con techo elevado, costura de techo y moldura baja. A escala entre sí (columnas proporcionales al largo real), trazo uniforme con `vector-effect`, rines de 5 brazos. |
| 7 | Señal en celular | Compacta (≈115 px), con fondo propio de borde a borde (ya no asoman chips detrás de la viga) y se suelta (deja de ser sticky) cuando un campo de texto, número, fecha u hora tiene foco; vuelve al salir. Probado: con foco en Origen, `is-typing=true`, la señal pasa a `relative` y el campo queda libre. Se quitó `.pt-spacer` (hueco de 150 px). |
| 8 | Hero | Celular: la foto entera bajo el pórtico (Urvan 116 completa y la fila 125/123 atrás), título sobre el asfalto de la foto. Compu: se usa la original de 1440 sin Real-ESRGAN (ya no se ve plástica). Etiqueta UNIDAD 116 movida a la izquierda para no tapar la fila. |
| 9 | Sello KM | Dentro de la barra del pórtico (junto a COTIZAR), ya no cuelga. En celular el header queda logo + KM + COTIZAR + menú; "ABIERTO 24 H" solo desde 600 px (en celular el 24 H ya está en el hero y en el menú). Logo del header en compu más grande (pórtico de 72 px, compacto 60). |
| 10 | Columna derecha (compu) | Bajo la señal cuelga del pórtico una foto real chica que cambia con el servicio elegido (flotilla por defecto; personal, aeropuerto, turismo, ejecutivo) con su pie en mono. |
| 11 | Huecos | Padding entre cotizador y flotilla y antes de "Base en La Estación" bajado casi a la mitad. |
| 12 | Texto Ejecutivo | "Para personal ejecutivo. Unidades monitoreadas por GPS las 24 horas." (research). |
| 13 | Pin del mapa | Se ve en celular (final-m/m-07). No se cambió nada: era carga lenta del embed. |
| 14 | Separadores | En el código ya había espacios normales; el hueco raro era el punto medio de Overpass. Ahora va en `<span class="sep">` con margen simétrico (menú y pie). El mensaje de WhatsApp cierra con punto tras el nombre. |
| 15 | Alt de Turismo | Sin "de Aguascalientes": "en carretera frente a una sierra". |
| R8 | Accesibilidad | La señal ya no lleva `role="img"` junto a `aria-live`; ahora `aria-live` + `aria-atomic` con texto oculto "Tu ruta:". |

Pies de foto en mono en las 4 tarjetas (uno por tarjeta, mismo ritmo).

## Pruebas del cotizador (celular 390, URLs reales decodificadas)
- Sin elección: `Hola GTLO, quiero cotizar transporte.`
- Personal (45, L a V, 3 turnos, Nissan Planta, Ana): `https://wa.me/524494683835?text=Hola GTLO, quiero cotizar transporte de personal para 45 pasajeros, de lunes a viernes, turnos matutino, vespertino y nocturno. Empresa: Nissan Planta. Mi nombre: Ana.` Señal: PERSONAL EMPRESARIAL | 45 PASAJEROS | L A V · 3 TURNOS. Cierre: "Tu ruta ya está rotulada." con la misma señal (sin etiqueta Ejemplo) y el mismo mensaje.
- Aeropuerto (6, 12 oct 05:30, Aguascalientes → Aeropuerto GDL): `https://wa.me/524494683835?text=Hola GTLO, quiero cotizar traslado al aeropuerto para 6 pasajeros, el 12 de octubre a las 05:30, de Aguascalientes a Aeropuerto GDL. Empresa: Nissan Planta. Mi nombre: Ana.` Campos de personal ocultos, fecha/ruta visibles; foto bajo la señal cambia a la Sprinter.

## No aplicado (y por qué)
- **Suburban como silueta o como "Unidad ejecutiva" en el convoy:** no. La única prueba de que tengan Suburban era la foto de prensa; una silueta de SUV insinuaría una unidad que no está demostrada. El convoy baja a 3.
- **fb_03 (Hiace y Suburban frente a hotel) para Ejecutivo:** no. La SUV sale cortada al borde y no se ve que sea suya; además es de 414 px.
- **"Hiace de noche de Instagram en marco chico":** no hizo falta; la banda de detalle del cofre se ve mejor y es más grande.
- **Hoja de dirección "cuatro siluetas" y foto `wix_suburban_ejecutivo` para Ejecutivo:** se contradice con la decisión 1 del orquestador y con la regla de fotos de Emanuel (solo fotos de ESE negocio); manda la decisión.
- Sin número de unidades, capacidades, clientes, permisos ni fotos de stock (igual que antes).

## Archivos tocados
`sections/10-hero.*`, `sections/20-servicios.*`, `sections/30-senal.*`, `sections/40-flotilla.*`, `sections/50-base.css`, `sections/60-cierre.*`, `site.css`, `site.js`, `template.html`, `img/` (hero-1440/960/480, aeropuerto-1200/960/480, ejecutivo-1200/960/480, turismo-900/480, flotilla-1600/960/480; se borraron hero-1600 y aeropuerto-1600), `IMAGENES.md`, `PENDIENTES.md`, `COMPONENTES-USADOS.md`. Las imágenes anteriores quedaron respaldadas en `gtlo-fix/img-old/`.
