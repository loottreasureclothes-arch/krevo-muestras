# Corrección 1 (pulidor, 5 oct 2026)

## Los 8 problemas más visibles, en orden
1. Hero con letrero de Corona (marca ajena) en la torre naranja, y el título encimado sobre ese letrero; og.jpg con la misma foto.
2. Calificación 4,5 pintada con 5 estrellas llenas (aria "5 de 5"), en hero y en reseñas.
3. Componente firma en celular: el recado (ticket) queda hasta abajo de 8 platillos; al tocar Agregar no se ve que algo pasó.
4. "El lugar": el pie de foto "Techo de palapa" repetía el título "Techo de paja" justo arriba.
5. Galería repetía 3 fotos de la carta (salsa amarilla, salsa verde, tostada de mango) teniendo fotos propias sin usar.
6. Alto en celular 10,954 px, al borde del límite de 11,000.
7. Título del hero poco legible sobre cielo y paja tras el recorte (velo muy suave a media foto).
8. Componente firma sin probar con clics (vacío, recado, Llamar, Copiar).
Prueba anti-genérico: pasa (header de letrero colgante, formas de palapa, ticket de recado propio; 0 verdes, sin contadores ni rejilla de íconos, 9 secciones).

## Resultado
1. Arreglado: fachada recortada desde maps-07 (solo palapa, jardín y banqueta, sin Corona ni placas), webp 480/960/1536 y og.jpg rehecho con PIL.
2. Arreglado: estrella media (símbolo i-star-half) y aria "4,5 de 5 estrellas".
3. Arreglado: barra fija en celular "N platillos en tu recado · Ver recado" que aparece al agregar, lleva al ticket y se esconde al verlo o al salir de la sección (no choca con el flotante).
4. Arreglado: pie de foto ahora "A la sombra".
5. Arreglado: galería con ceviche en copa y tostada de mariscos (antes sin usar); solo repite la salsa verde.
6. Arreglado: 10,735 px (foto de palapa 1:1, reseñas y lista de cocina más compactas).
7. Arreglado: velo del hero más oscuro desde la mitad de la foto.
8. Arreglado: probado con Playwright: vacío "Elige arriba", 6 personas + sábado + 2 ceviche + 1 molcajete arma "Hola, buenas tardes. Quiero mesa para 6 personas el sábado. Quisiera: 2 Tostada de ceviche, 1 Molcajete de camarones. ¿Cuánto sería?", Copiar copia ese texto, Llamar = tel:+524499635657, al vaciar vuelve "Elige arriba", mínimo 1 persona, 0 errores JS.
No arreglado: el letrero "Cascadas" del negocio ya no sale en el hero (la única foto de él trae Corona); pendiente foto propia.
