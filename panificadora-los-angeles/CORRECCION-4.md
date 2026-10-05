# CORRECCION-4 Panificadora Los Ángeles (revisor final, 4 oct 2026)

## Encimes (encimes.mjs)
Antes: m 6 | t 7 | d 6. Después: 0 / 0 / 0.
- Hero h1 «Pan de alta fibra,» × «y olor a toda la calle.»: Young Serif trae caja de 1.41 em y el título iba a 1.02 de interlínea. Arreglo: interlínea 1.08 y métricas reales en el @font-face (ascent-override 85 %, descent-override 25 %, line-gap 0) para que la caja mida lo que mide la tinta.
- «4.7» gigante × «565 opiniones» (tableta y compu): misma causa (interlínea .85); se resuelve con las métricas del @font-face, sin mover nada.
- Preguntas: el texto de las preguntas cerradas (`details` sin `open`) seguía midiendo encima de la siguiente pregunta. Arreglo: `.faq details:not([open])>p{display:none}`.
- Visto a ojo: el flotante de WhatsApp tapaba «Arma tu bolsa» en el hero y los «Agregar» de la columna derecha del menú. Arreglo: `data-hide-wa` en los botones del hero y en la rejilla de productos, y la zona de ocultar ahora aplica con cualquier parte visible (antes solo si entraba al 85 % de la pantalla).

## Agregado
- Pie de foto en la rosca: «Rosca de reyes nevada, también sin azúcar» (de la reseña de Isa).
- Reseñas: busqué otra vez (Gastroranking, Tourmake, Restaurant Guru): ninguna suelta reseñas con nombre. Quedan 3 con nombre y estrellas + 4 frases destacadas de Maps marcadas como tales. Sigue en PENDIENTES.

## Verificación
encimes 0/0/0 (m, t, d); krevo-shot m y d con `alertas: []`; alto celular 10,135 px; 9 secciones; mapa embebido, horario por día con abierto/cerrado, 6 wa.me con número 524499159943 y mensaje armado (número de Maps, WhatsApp sin confirmar: PENDIENTES).
