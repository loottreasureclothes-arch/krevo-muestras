# CORRECCION-1 (pulidor, 5 oct 2026)

## Los 8 problemas más visibles (en orden)
1. Componente firma "La hora de Bananas" afirma qué se sirve a qué hora (Desayuno 9-12, Comida, Tarde con pizzas, Noche bar): no está en research.
2. El reloj no se siente vivo: arranca fijo en 13:00 y su tope es 22 aunque la escala dice 23:00.
3. Los antojos del reloj son botones sin razón: no dicen por qué se piden (hay reseñas reales que lo dicen).
4. Lede del componente con voz de suposición ("mira qué se pide").
5. Galería dice "Se platica sin gritar", lo contradice la reseña de Andy Rey (música a todo volumen); cambiar por lo que sí dicen (luz baja, música de los 80 y 90).
6. Citas y reseñas con metadatos en inglés ("5 stars", "3 years ago") en una página en español.
7. "Todo listo para completar" se ve pobre: lista sola sobre vino, sin nada de su mundo.
8. CTA de la michelada con redacción torpe ("Pedir una michelada, llama").

Prueba anti-genérico: 1 no (fachada amarilla, letrero, árbol de metal), 2 no, 3 no (letrero real y estado abierto), 4 no (0 verdes), 5 no, 6 no ("La hora de Bananas" no está en componentes.py), 7 no, 8: 8 secciones y ~10.9k px por pedido del dueño (9k-11k). Pasa.

## Resultado
1. Arreglado: el reloj ya no dice qué se sirve a qué hora; momentos Abrimos / Mediodía / Tarde / Noche hablan del lugar (fachada, tragaluz y árbol, rincón vino, puerta) dentro del horario real 9:00 a 23:00.
2. Arreglado: el rango llega a 23, arranca en la hora actual de Ags si está abierto; fotos con entrada suave (scale + opacity, 0.8 s).
3. Arreglado: "Lo que más piden" (hamburguesas, michelada, postres) con estrella en el destacado y cita real con nombre (Andy Rey, Juan Antonio Tapia Escobedo, Mariel Medina, Hugo Hernandez).
4. Arreglado: lede "Abiertos de 9:00 a 23:00, martes a domingo. Mueve la hora, mira el lugar y arma tu pedido."
5. Arreglado: galería dice "luz baja para platicar" (GPA Honest Reviews).
6. Arreglado: metadatos en español ("5 estrellas en Google", "hace 3 años"); las citas en inglés quedan literales.
7. Arreglado: foto del retrato enmarcado junto a la lista (sin sumar alto en celular).
8. Arreglado: "Llamar y pedir micheladas".
Alto celular 10,937 px (paddings recortados para caber); encimes 0/0/0 en m, t y d; alertas [] en m y d.
