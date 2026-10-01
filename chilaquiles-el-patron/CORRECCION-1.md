# CORRECCIÓN 1 · Chilaquiles El Patrón (pulidor, 1 oct 2026)

## Los 10 problemas más visibles (en orden)
1. Hero (primera pantalla en celular): el lema «Aquí se desayuna como en casa» sale en Rubik negrita en vez de Sedgwick (la regla `.ep-link` le pisa la fuente a `.ep-hand`), se parte en dos renglones y su flecha queda debajo del botón flotante.
2. Redes en el cierre y el pie: íconos dentro de círculos (aros prohibidos por la hoja) y el glifo de Instagram deforme (se ve como una cámara rellena).
3. Carta: la banda negra de avisos («No se cobran cuentas por separado»...) sin relleno; el texto pega con los bordes. Causa: el reset `ul[class]{padding:0}` le gana a `.ep-avisos` (mismo bug en la tabla sin JS del componente).
4. Componente: las leyendas "¿Cómo lo quieres? A domicilio, con costo extra" y "Café de olla precio por confirmar" se parten a media frase y dejan "extra" huérfano.
5. Compu 1440: las decisiones del componente van apretadas en 4 columnas ("Sin salsa" baja sola, leyenda partida) y debajo de la foto queda un hueco rojo vacío mientras las tarjetas bajan.
6. Compu 1440: en "Elige tu salsa" la foto flota a media altura junto a ROJA; la columna derecha queda vacía junto al título y VERDE.
7. Compu 1440: el título del hero ("chilaquiles") se sale de su columna y casi toca la placa roja de la foto (sin aire entre texto y foto).
8. Pie: el nombre se parte feo "Chilaquiles El / Patrón".
9. Salsas: "Va bien con huevo y frijol." es una opinión que no está en research (voz inventada).
10. Componente (compu y tableta): la nota fija y el botón verde quedan bien, pero la foto del panel en compu no acompaña al bajar por las tarjetas (se pierde la relación foto-combo).

## Qué se arregló
1. Lema del hero en Sedgwick Ave de verdad (`.ep-link.ep-hand`), en un solo renglón (17 a 22 px) y sin chocar con el flotante.
2. Redes: fichas de papel con esquina mordida (sin círculos) y glifo de Instagram limpio (cuadro redondeado + lente + punto), en cierre y pie.
3. Avisos de la carta con su relleno (`ul.ep-avisos`); mismo arreglo en la tabla sin JS (`ul.ep-table`).
4. Leyendas del componente: la aclaración ("A domicilio, con costo extra", "precio por confirmar") va en su propio renglón.
5. Compu: decisiones del componente en rejilla 2x2 (Salsa | Cómo lo quieres / Café | Nombre).
6. Compu: foto de las dos salsas arriba de la columna y pegajosa (sticky) mientras bajan los tres renglones.
7. Compu: título del hero a clamp(84px, 8.4vw, 130px); ya no invade la columna de la foto.
8. Pie: "Chilaquiles / El Patrón" en dos renglones limpios.
9. Salsa verde: "La verde de la casa." (antes una opinión inventada).
10. Compu: la foto del componente es pegajosa y acompaña las tarjetas al bajar.
Extra: quitado `loading="lazy"` de todas las fotos (enchiladas, hotcakes, salsas, comedor, mural); solo el iframe del mapa lo conserva.

## Verificado
- krevo-shot m: 8,737 px, alertas []; krevo-shot d: 6,980 px, alertas []. Sin errores de consola ni 404. Fuentes: Rubik, Passion One, Sedgwick Ave.
- Flujo del componente intacto: $120, Enchiladas con jugo, verde, paso por él, café, Ana: la ficha del header pasa a "TU DESAYUNO + CAFÉ DE OLLA $113"; el cierre dice "Tu desayuno ya está anotado." y ambos botones verdes llevan el mismo mensaje.
- wa.me decodificado: https://wa.me/524492644264?text=Hola Chilaquiles El Patrón, traigo $120 para desayunar. Quiero: Enchiladas con jugo natural. Salsa: verde. Paso por él. Más un café de olla. Mi nombre: Ana

## Qué no se arregló
- En compu el hero deja aire amarillo abajo y la foto queda en ~460 px (no se agrandó para no apretar el título).
- La foto de las enchiladas (maps-11) trae arriba su taza negra con letrero propio; se deja porque es del negocio.
- El recorte de las dos salsas se ve algo suave (viene de un recorte chico subido); se pinta a 440 px máximo.
