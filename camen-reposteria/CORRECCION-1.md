# Corrección 1 (pulidor, 3 oct 2026)

## Los 8 más visibles (en orden)
1. Componente firma plano: el pastel de tres leches (default) se pierde en el plato crema, sin volumen ni rebanada; no se siente que se parte.
2. Hero celular: "años" queda huérfano en la tercera línea del título.
3. Hero compu: "hoy," solo en su renglón, título en 4 líneas que se ve roto.
4. Pie en compu: todo pegado a la izquierda, mitad derecha vacía (celular estirado).
5. Hueco de más de 90 px entre los horarios y "Todo listo" (compu y celular).
6. El flotante de WhatsApp tapa los horarios en Sucursales (celular).
7. Américas en compu: tarjeta vacía con solo el botón al fondo.
8. "$401 precio en Uber Eats" no dice de qué sucursal es, aunque elijas otra.

Prueba anti-genérico: 1 no (su letrero, su festón, sus 11 sabores), 2 no, 3 no (hora en vivo + letrero propio), 4 no (3 verdes), 5 no, 6 no (El corte), 7 no, 8 no (6 secciones). Pasa.

## Resultado
1. Arreglado: plato vino con filo crema, costado del pastel con volumen, betún en contraste y una rebanada servida que sale con rebote al elegir.
2. Arreglado: "26&nbsp;años" junto; el título queda en 3 líneas limpias.
3. Arreglado: en compu "Horneamos hoy," en un renglón (nowrap desde 1100 px, tamaño ajustado).
4. Arreglado: pie de compu en 2 columnas (título | lista, aviso, redes, legal).
5. Arreglado: espacio entre horarios y "Todo listo" bajado a ~84 px (celular) y ~104 px antes en compu, ahora 48+56.
6. Arreglado: el flotante se esconde en Sucursales (ya hay botones de llamar).
7. Arreglado: Américas en vino, centrada y con título grande; ya no se ve vacía.
8. Arreglado: "$401 en Uber Eats, sucursal Zaragoza".
No arreglado: en tableta (820) el título del hero sigue en 4 líneas; WhatsApp real de la dueña sigue pendiente (ver PENDIENTES).
Verificación: alertas [] en m y d, celular 7,251 px, wa.me decodificado OK.
