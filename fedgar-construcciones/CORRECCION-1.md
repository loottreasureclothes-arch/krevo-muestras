# Fedgar Construcciones · Corrección 1 (30 sep 2026)

Sobre `REVISION-1.md` (7.6/10) y las decisiones del orquestador. Todo con PIL/OpenCV y sus propias fotos; sin IA, sin Real-ESRGAN.
Capturas: `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/fedgar-fix/` (`m/` 390 @2x, `d/` 1440, `t820/` 820; hojas `m-hoja.jpg`, `d-hoja.jpg`, `h820.jpg`, `flujo-hoja.jpg`, `dz-hoja.jpg`).

## Resultado medido
- Celular 390: **7,814 px** (antes 7,247; tope 9,000), 0 alertas. Compu 1440: 7,506 px, 0 alertas. 820: 7,723 px, sin scroll horizontal. Consola limpia.
- Nitidez (archivo real contra caja pintada, con object-fit y el scale del arco): **ninguna foto se amplía más de 1.05x** a 390 @2x, 820 ni 1440 (antes: arco 2.75x, cierre 1.63x, láminas 1.19x, naves-02 1.58x).
- Fotos que se ven sin hojear (celular): **16** (antes 6): CISNE del hero, AMBAR grande + 2 chicas, 7 obras más en el índice de arquitos, nave del arco, díptico de naves (2), panorámica de oficinas y la casa del cierre.
- Flujo: flechas adelante/atrás (de 01 vuelve a 08), arquitos (salta a la 05 y marca RESIDENCIAS), chips, swipe táctil a los dos lados, las 8 láminas miden lo mismo (745 px). "Quiero algo así" en CISNE: select = CISNE, tipo = Residencia, aparece "LÁMINA ELEGIDA: CISNE" con su arquito a 211 px del borde alto y el select destella.
- WhatsApp (6 wa.me reales, verdes sin cambio): vacío → "Hola Fedgar, quiero cotizar una obra." · completo → "Hola Fedgar, quiero construir una residencia de unos 250 m². Ya tengo terreno. Todavía no tengo proyecto. Me gustó: CISNE. Ciudad: Aguascalientes. Mi nombre: Ana" (el botón del cierre manda el mismo).

## Cambios aplicados (en el orden de la revisión)
1. **Arco nítido y encuadrado** (`30-despacho.*`): recorte vertical propio de web-naves-03 (1104x1836, armadura verde azulada arriba) servido con `<picture>` debajo de 760 px (arco-v 480/960/1104); en compu la horizontal con `sizes="max(100vw, 160vh)"` (a 820 la caja es casi cuadrada y pedía la de 2000). object-position 50% 35%.
2. **Cierre nítido**: casa-exterior-01 re-tratada desde la fuente (214 borrado otra vez y **la placa de la camioneta, que seguía legible, en blanco**); recorte vertical 900x1058 para celular (casa-v) y 1881 para compu.
3. **Láminas que se hojean**: flechas redondas encima de los costados de la foto grande (a media foto en celular, medio afuera del papel en compu); el "01 / 08" se cambió por una fila de **8 arquitos** con la foto grande de cada obra (miniaturas idx-*.webp de 120x156, tocables, 40x54 px, la activa sube y lleva filo cantera); dos hojas cantera asoman detrás con 1° y -1.5°.
4. **Remate con foto**: "Tu lámina" + "Todo listo para completar" van primero sobre la banda; la página cierra con la casa a lo ancho y la Visión literal; el velo termina en el color del pie y el pie arranca 70 px encima de la foto con el arco del logo y FEDGAR grande (sólido). 1 verde en la sección.
5. **Despacho con obra**: díptico en arcos "NV-01 · EN OBRA" (naves-01, la cuadrilla en la armadura) y "NV-01 · TERMINADA" (naves-02, recorte vertical propio); y entre despacho y cita una **banda panorámica** de web-oficinas-02 (ala derecha, sin el letrero) con "OF-01 OFICINAS" y "Ver lámina 07 →" que salta a esa lámina. La banda es un `<figure>`, no sección: siguen 6 secciones + pie (build.py dice "7" porque cuenta archivos).
6. **Cajetín limpio**: sin "·"; celda vacía = renglón punteado de plano. En el cierre, sin nada elegido: **PROYECTO: EL TUYO · LÁMINA: 09** + marca, y el link dice "Llenar mi lámina"; al llenar, el resumen con LÁMINA 09 y "Cambiar mis datos".
7. **sizes de láminas**: grande `(min-width:760px) 600px`, chicas 480px, chica única 480px. Hero de compu `75vw` (template y preload).
8. **Mismo alto** en las 8 (grid + foot al fondo) y el tipo de LOCALES pasa a "Local comercial" (un renglón; mapeo del formulario actualizado).
9. **Chips en un renglón** debajo de 420 px (11 px, .06em, sin salto; scroll oculto de respaldo).
10. **Cifras legibles**: "30", "13" y "103" de los títulos en Figtree 700 (span .fg-num); se cargó Figtree 700.
11. **Trazo del header** dentro de la barra (abajo, 8 px), detrás del logo y del botón; botón de arco del header en celular con padding 14px y tracking .08em (sigue de 44 px).
12. **Mapa**: el iframe se recorre 64 px (100 px en compu) hacia arriba: la tarjeta con "Ver en Maps" ya no queda cortada por el arco; la atribución de Google de abajo queda completa.
13. **"Quiero algo así" visible**: línea "LÁMINA ELEGIDA: CISNE" con arquito de 40 px bajo "Cuéntanos tu obra." y destello de 1.4 s en el select.
14. **820 px**: encabezados a dos columnas desde 1040 (ya no se parte "ocho / láminas"); de 760 a 1039 el formulario va a una columna con el cajetín arriba del botón.
15. **Textos**: la Visión del despacho cierra "pasión…”"; "Clientes que aparecen hoy en fedgar.com.mx:". **Emblema KIA** borrado de manantial-01 y -03 (interpolación horizontal sobre la cajuela, revisado con acercamiento).

## No aplicado y por qué
- **Cambio 7, pasar locales-02 a la grande de LOCALES**: no. locales-02 es apaisada (960x557) y en el arco vertical de celular quedaría a 1.26x (hoy la 576 queda en 1.04x); un recorte vertical más grande de la fuente mete el letrero OXXO o agranda a los trabajadores. Con el sizes nuevo, locales-01 queda a 0.99x en 1440 y 1.04x en celular.
- **Fuera de las 15**: no toqué la cantidad de Space Mono, el hueco del hero en 1440 ni el titular del hero (la hoja dice no tocar el hero en celular). El "250" del campo de metros es placeholder (gris), como estaba.
- Nada de lo de "Qué NO tocar" cambió: paleta, arcos, mecánica de láminas (swipe, teclas, chips, cajetín letra por letra, salida de 280 ms), `Fedgar.message()`, reparto de verdes, blindaje anti-blanco, arco sin pin.
