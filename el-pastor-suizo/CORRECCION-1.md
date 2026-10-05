# CORRECCION-1 · el-pastor-suizo (pulidor)
Problemas más visibles, en orden:
1. Alto en celular pegado al límite (10,820 px en 390x844; 10,982 px con el trompo usado): pasaba de 10,700.
2. Hero de celular estirado: la caja de 390x547 usaba hero-480 (480x270), o sea 2x de ampliación.
3. Datos sin respaldo en research: "Con tres tortillas de harina", "Pastor Suizo, con tocino y queso", quesadilla "tortilla de harina", "Los auténticos tacos al pastor" en el pie, y Combos 2 y 3 "o agua fresca".
4. Precios del PDF de mayo 2024 sin fecha; el trompo no decía "Confirma al pedir".
5. Resumen del pedido del trompo crecía sin límite y alargaba la página.
6. Galería de compu: trompo 300 px y foto 700 px mostrados un 3 % por encima de su tamaño real.
7. Preload del hero con imagesizes 100vw, distinto al nuevo sizes (bajaba otra imagen).
8. Mensaje de WhatsApp decía "Total" como si fuera precio cerrado.
Prueba anti-genérico: pasa (trompo propio, hero con su esquina, 6 verdes + flotante, sin contadores ni palabras prohibidas).

## Resultado
1. Arreglado: secciones de celular 44/40 px de padding, filas más compactas, mapa de 290 px, hero tope 700. Ahora 10,428 a 10,463 px (10,469 con el trompo lleno).
2. Arreglado: sizes del celular en 960px (siempre baja hero-950) y foto de 390x504; escala 0.94.
3. Arreglado: cambiado por textos de hechos.md ("También de chorizo o cerdo", "Especialidad Pastor Suizo", "Tacos al pastor de trompo", combos tal cual el PDF).
4. Arreglado: "Precios de la carta de mayo 2024. Confirma al pedir." en carta y trompo; combos "Promos de mayo 2024".
5. Arreglado: el resumen se corta a 3 líneas (el WhatsApp sigue llevando todo el pedido).
6. Arreglado: galería de compu con tope de 1220 px; ninguna foto pasa de escala 1.0.
7. Arreglado: imagesizes igual al sizes del hero.
8. Arreglado: "Total según la carta: $X".
No arreglado: el mapa se ve en blanco en las capturas sin red (en el navegador real carga); fotos fuente de 700 a 950 px (pedir nuevas, ya en PENDIENTES).
