# CORRECCION-1 (pulidor, 5 oct 2026)
Problemas más visibles, en orden:
1. "$300" con letra chica inventada ("cambia según temporada, menú y servicios"): no estaba literal en research.
2. Alto en celular 10,977 px, pegado al tope de 11,000.
3. Opiniones de 2,142 px en celular: tarjetas largas que se sienten como pared de texto.
4. Componente firma: nota "sin servicios extra" y rango desde 40 invitados (el salón dice 140 a 450).
5. En compu, "Velo." quedaba cortado por el arco que se abre (palabras fuera del recorte).
6. "Abierto ahora" sin decir que solo se conoce el lunes.
7. Calificación Google 4.5 pintada con 5 estrellas llenas.
8. Eyebrow "Lo dicen sus novias" con reseña de un novio (Manuel).
Prueba anti-genérico: pasa (arco propio de su fachada, firma "Arma tu fecha" con mesas dibujadas, 0 verdes, sin contadores ni rejilla de íconos, sin palabras prohibidas).

Resultado:
1. Arreglado: leído literal en bodas.com.mx ("costo por invitado desde $300 hasta $380"), anotado en hechos.md; la página dice "por invitado, de $300 a $380; pregunta qué trae cada uno".
2. Arreglado: 10,461 px sin tocar y 10,563 px con el componente usado (450 invitados, fecha, copiar).
3. Arreglado: fragmentos literales más cortos y tarjetas más compactas, 1,790 px; siguen 6 reseñas con nombre y fuente bodas.com.mx.
4. Arreglado: rango 140 a 450, nota "Menú $X a $Y" con 300 y 380 por invitado, resumen sin la frase inventada; la rejilla de mesas reserva su alto.
5. Arreglado: las palabras siguen al borde del arco con --p.
6. Arreglado: el lunes dice "Hoy lunes: abierto/cerrado"; otros días "Horario de hoy sin confirmar: llama antes de ir".
7. Arreglado: quinta estrella a la mitad.
8. Arreglado: "Lo dicen sus parejas".
No arreglado: el mapa sale gris en la captura local (iframe de Google sin red en el navegador de prueba); el código del iframe es correcto.
