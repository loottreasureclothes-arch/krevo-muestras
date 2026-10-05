# CORRECCION-1 (pulidor, 5 oct 2026)
Problemas más visibles, en orden:
1. Reseñas de Trip.com mostradas en inglés sin traducir.
2. Desayuno: "Sin costo para adultos según Trip.com" (afirma desayuno incluido, por confirmar, y voz de investigador).
3. Galería en compu: foto principal de 600 px pintada a ~600x450 con la de 480 (sizes mal) y estirada 1.25x; última fila con una foto sola.
4. Cuartos en compu: fotos de 480 estiradas 1.14x por un sizes de 300px.
5. Hero en celular a 1x: foto de 480 estirada 1.13x (cover alto).
6. Plano: la vista elegida usaba foto de 480 estirada a 590 en compu.
7. Reseña de Lili citaba "temperatura del agua perfecta" (sugiere alberca climatizada, por confirmar).
8. Eventos afirmaba "salón" sin capacidad; completar no pedía alberca climatizada ni desayuno incluido.
Prueba anti-genérico: pasa (plano del patio propio, hero en arco con su calle, sin contadores, sin verdes, 9 secciones).

Resultado:
1. Arreglado: Antonio, Lili y Susana traducidas fiel y marcadas "Traducida del inglés"; 10/10 tal cual, estrellas = valor/2.
2. Arreglado: "Pregunta si el desayuno va en tu tarifa"; cita traducida y marcada.
3. Arreglado: rejilla de compu a 900 px, arco principal 2x2 (escala 1.0), sizes correcto.
4. Arreglado: sizes (min-width:760px) 560px; carga la de 640.
5. Arreglado: sizes 130vw en celular, carga la de 940.
6. Arreglado: vista usa jardin-640 / alberca-639 y max 640 px.
7. Arreglado: otro fragmento fiel de la misma reseña (comida, cuarto, aire).
8. Arreglado: "Pregunta por el salón, su capacidad y tus fechas"; completar agrega alberca climatizada y desayuno incluido.
Verificado: encimes 0 en m/t/d, alertas [] en m y d, alto celular 10,028 px, ninguna foto estirada en t ni d (solo eventos a sangre en celular), sin wa.me ni verde.
