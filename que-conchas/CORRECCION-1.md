# Corrección 1 · Que Conchas! (PULIDOR, 1 oct 2026)

## Los 10 problemas más visibles (vistos como cliente, en orden)
1. Momento firma "La concha se abre": el dibujo era clip-art (abanico rosa encima de un tazón beige); no se leía como concha.
2. Desayunos sorpresa (celular, tableta y compu): tres fotos encimadas, dos "Te amo MAMÁ" una sobre otra; el link "Pedir un desayuno sorpresa" apretado en dos renglones con doble ondulado.
3. Header "Hoy toca": el borde de gajos de 12 px se leía como garabatos "^" y el subrayado ondulado del link chocaba con él.
4. Compu 1440: ficha del calendario angosta, "Pan de / muerto / relleno" en 3 renglones.
5. Tableta 820: el hero dejaba un hueco de ~220 px antes del calendario (alto mínimo de pantalla en vertical).
6. Tableta 820: pie en 3 columnas angostas, la cita partida en 7 renglones.
7. Pie: la foto ig-09 a 96 px era puro sticker, no se entendía el producto.
8. Tableta 820: "Todo listo para completar" partido en "Todo / listo para / completar".
9. Desayunos en compu: la foto chica de abajo quedaba flotando a un lado del link (sin columna).
10. Concha que se abre: el relleno no salía del pan (sin escurrido) y el color no tenía volumen.

## Qué se arregló
1. Concha rehecha en SVG con oficio: base de pan con degradado dorado, cara cortada con migajón, tapa de pan con corteza de azúcar rosa, 10 surcos de concha con sombra y brillo, azúcar en puntitos, festón en el borde y sombra al piso. Mismo flujo rAF reversible, sin pin, abierta a los 1.6 s.
10. El relleno ahora es un domo con brillo que cambia de color y tres gotas que escurren al abrirse.
2 y 9. Desayunos en rejilla limpia: foto grande (ig-11) arriba, abajo San Valentín (ig-03) y el detalle (ig-13, banderita "Personalizado") lado a lado; link en un renglón debajo. En compu/tableta: grande a la izquierda, dos chicas a la derecha.
3. Borde de gajos del header rehecho (40x14, con filo rosa y sombra suave); link "Pan de muerto relleno" con subrayado liso.
4. Calendario en compu: columna de la ficha más ancha (0.82/1.18), foto de 250 px, título en 2 renglones.
5. Hero en tableta vertical sin alto mínimo.
6. Pie en tableta: marca a todo lo ancho (logo + lema + cita), contacto y redes en 2 columnas; a 1100+ vuelve a 3 columnas.
7. Foto del pie cambiada a recorte de ig-07 (concha con duyas), `foot-ig07-240.webp`.
8. "Todo listo" no se parte.

## Qué no se arregló
- La ficha de junio sigue con recorte de ig-11 (no hay foto del Día del Padre en research).
- Dos fotos de desayunos siguen siendo del Día de las Madres (ig-11 e ig-13): son las únicas permitidas aparte de ig-03.
- No se probó en iPhone real.

## Verificación
- krevo-shot m: alto 7,886 px, alertas []. krevo-shot d: alertas []. Tableta 820 (copia propia del script): alertas [].
- Flujo: rellenos Lotus + Fresas, fecha, entrega, desayuno y dedicatoria arman el wa.me correcto (ver abajo).
- wa.me decodificado: https://wa.me/524492063798?text=Hola Que Conchas, quiero pedir: un desayuno sorpresa. Para el 30 de octubre. Entrega a domicilio. Dedicatoria: Feliz cumpleaños, Ana. Mi nombre: Luis
