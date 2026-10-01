# Kinesthetics: corrección 1 (pulidor, 1 oct 2026)

Capturas: `scratchpad/tuberia/kinesthetics-pulidor/` (m, d, t820.png, frase-lleno.png, lema-mid.png).
Estado inicial: alertas [] en m y d, 8,615 px en celular, componente firma funcional (wa.me decodificado correcto).

## Los 10 problemas más visibles (en orden)
1. Hero en celular: la foto del terapeuta va al 62 % del ancho y deja una columna muerta a la izquierda; la única foto que emociona se ve chica (la hoja pide 78 %).
2. Proceso: "Atención personalizada con el Kinesiólogo Christopher González." va pegado a la foto chica del terapeuta: se lee como pie de foto (la hoja lo prohíbe; no sabemos quién es quién).
3. Belleza: la foto (reel-spa-05) es una textura plana de rayas; no se entiende que es un aparato sobre el cuerpo.
4. Tableta 820: el remate se aprieta en una columna de 288 px: "Falta tu frase. / Empieza / por / el área." en 5 renglones y el botón verde partido en dos líneas.
5. Compu: hueco de ~140 px entre el final de un área y la palabra siguiente del lema (110 px de margen + 40 px).
6. Áreas en celular: fotos al 58 % (la hoja pide 64 %): se ven chicas y el lado vacío pesa.
7. Frase en celular: ~80 px de papel vacío al final del componente.
8. Compu: la misma foto (reel-terapeuta-01) sale dos veces (chica en la frase y grande en el remate).
9. Header en compu: la firma a 30 px se ve tímida junto al botón AGENDAR.
10. Momento firma: el cambio contraído/suelto es sutil en celular (268 a 321 px de ancho); se lee, pero no pega fuerte.

## Qué se arregló
1. Hero celular: foto al 78 % (antes 62 %); ya no queda la columna muerta.
2. Proceso: la línea de Christopher González salió de junto a la foto; ahora cierra la lista de los 4 pasos en Spectral itálica, con un filete arriba. Junto a la foto chica queda "Agenda tu valoración. / PREVIA CITA." y el botón ARMAR MI FRASE.
3. Belleza: foto nueva de `reel-spa-04` (recorte 0, 180, 1080x1350): se ve la pared de la cabina, los cables y el cinturón envolviendo el cuerpo; sin la marca de agua de abajo.
4. Tableta 820: el remate pasa a foto de 290 px + 44 px de hueco; el título queda en 3 renglones y el botón verde en una línea (`white-space: nowrap`).
5. Compu: el hueco entre áreas del lema baja de 110 a 64 px y el de la palabra a su área de 40 a 32 px.
6. Áreas en celular: fotos al 64 % (lo que pide la hoja).
7. Frase en celular: padding de abajo de 80 a 56 px.
8. Compu: la foto chica de la frase ya no repite la del remate; ahora es `reel-terapeuta-02` (el terapeuta inclinado, "escuchando"; la paciente queda fuera salvo una sombra de pelo sin rasgos).
9. Header en compu: firma de 38 a 46 px (40 px compacta).
10. Momento firma: la palabra contraída también aprieta el espacio entre letras (-0.045em a +0.005em), así el gesto de soltarse se nota más.

## Verificación
- krevo-shot m y d: `alertas: []`, sin consola, sin 404, sin scroll horizontal.
- Alto en celular: 8,839 px vacío; 8,906 px con la frase llena (tope 9,000).
- Componente: área, motivo, tiempo, turno y nombre llenos dan "Tu frase está lista." y el wa.me decodificado: "Hola Kinesthetics. Vengo por kinesiología, fisioterapia y quiropráctica. Me trae un dolor de espalda baja, desde hace unas semanas. Me acomoda entre semana, de 4 a 9. Me llamo Ana. Quiero agendar mi valoración."

## Qué no se arregló
- Las fotos siguen siendo cuadros de video suaves (es lo que hay; se piden fotos horizontales en "Todo listo para completar").
- El alto en celular quedó cerca del tope (8,906 px con la frase llena): no hay espacio para agregar nada más.
