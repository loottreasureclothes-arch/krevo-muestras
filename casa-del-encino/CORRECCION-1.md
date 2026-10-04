# Corrección 1 (pulidor)
## Problemas más visibles (en orden)
1. Primera pantalla del celular cortaba el título: "no se apura." y el botón quedaban fuera.
2. Fotos de platillos solo en 480/960 px: se veían suaves en celular de alta densidad y en compu.
3. Azulejos sin señal de que se tocan (solo el texto de la bandeja lo decía).
4. "Pregunta el precio" se partía en 2 líneas dentro de cada azulejo en celular.
5. Encabezado de la carta en compu partido: etiqueta a la izquierda abajo y título a la derecha arriba.
6. Fotos del horario y del salón con loading="lazy" (fotos que venden).
7. Carta muy larga en celular (12 platillos con mucho aire).
8. Placa de la calle ocupaba espacio debajo de la foto en vez de vivir en la fachada.
Prueba anti-genérico: pasa (hero con su placa de calle y talavera, componente azulejo propio, 4 verdes, 7 secciones, 7,300 px).

## Resultado
1. Arreglado: foto del hero a 55svh y placa sobre la fachada; título completo + botón en la primera pantalla.
2. Arreglado: regeneradas desde los originales de Maps (sin IA) 480/960/1600 a calidad 86 con enfoque fino; salón 2048 y fachada 1920 para compu; srcset actualizado.
3. Arreglado: esquina crema con flecha de voltear en cada azulejo (gira al pasar el mouse).
4. Arreglado: precio en una línea (10 px en celular, 12 px en compu).
5. Arreglado: etiqueta arriba y título debajo, alineados a la izquierda.
6. Arreglado: quitado lazy en salón, postre y jugo.
7. Arreglado parcial: renglones y descripciones más compactos (alto celular 7,600 a 7,300 px).
8. Arreglado: placa en la esquina inferior de la foto, en celular y compu.
No arreglado: el hero de celular sigue siendo el recorte de una foto de 1080 px de alto (ya pasado por Real-ESRGAN); no hay original más grande.
