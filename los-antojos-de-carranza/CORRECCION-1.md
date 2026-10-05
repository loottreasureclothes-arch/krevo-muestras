# CORRECCION-1 (PULIDOR, 5 oct 2026)

Problemas más visibles, en orden:
1. Carta: "Chilaquiles verdes con huevo: con crema y queso encima" no está en research (FOTOS 01 solo dice "chilaquiles verdes con huevo").
2. Carta: "Huevo con jamón: con chilaquiles y frijoles al lado"; FOTOS 16 dice solo "huevo con jamón y chilaquiles".
3. Cordón: banderita "Licuado del patio" es un nombre de platillo inventado; FOTOS 07 dice "platos y licuados en patio".
4. Alts que afirman de más: "Chilaquiles divorciados con huevo, fruta y café" (FOTOS 02 = chilaquiles+fruta+café), "Enchiladas con queso", "plato de barro", "churros con azúcar sobre servilleta", "talavera", "mesas de herrería", "letrero en relieve", "cazuela" en foto 06.
5. Voz de investigador en la carta: "según cuentan sus clientes", "cuenta una reseña de Google", nota "Estos platillos salen de fotos y reseñas".
6. Visítanos: "dicen los clientes" (voz de investigador).
7. Alto en celular 10,915 px, pegado al tope de 11,000: no se puede crecer el hero a 2/3 de pantalla sin pasarse.
8. Hero de celular: foto en arco ~280 px, no llega a 2/3 de pantalla (el título manda).

Prueba anti-genérico: 1 no (fachada con letrero, papel picado, calle Elizondo); 2 no; 3 no (arco + banderas propias); 4 no (0 verdes, sin WhatsApp); 5 no; 6 no (cordón de papel picado); 7 no; 8: 8 secciones, alto 10.9k (exigencia del cliente 9,000 a 11,000 manda). Pasa.

Verificación de nombres de platillo contra research/:
- Chilaquiles divorciados: reseñas jc_O y claudio zamora (verde y rojo, con pollo y frijoles). OK.
- Chilaquiles verdes con huevo: FOTOS 01. OK.
- Huevo con jamón: FOTOS 16. OK.
- Enchiladas Aguascalientes'n: reseña Kuna Kurosaki. Enchiladas (cordón): FOTOS 09. OK.
- Bistec con enchiladas rojas / arrachera con enchiladas mixtas: reseña Mike Jones. OK.
- Hotcakes: reseña Carol Martínez ("Pfannkuchen ... reichlich und sehr lecker") y hechos.md. OK.
- Churros: reseñas jc_O, Elhergon Flores, Jasmien Truyers (se cobran aparte) y FOTOS 13. OK.
- Desayuno en paquete con café refill y fruta: Elhergon Flores y Carol Martínez. OK.
- Frijoles con queso: FOTOS 23. OK.
- Licuados: FOTOS 07 (antes "Licuado del patio", cambiado).

Resultado:
1. Arreglado: ahora "Salsa verde y huevo."
2. Arreglado: "Con chilaquiles al lado."
3. Arreglado: "Licuados" (HTML y JS del pedido copiado).
4. Arreglado: alts reducidos a lo que dice FOTOS.md.
5. Arreglado: "Con fruta y café de refill.", "Abundantes y muy ricos.", nota "El precio de cada platillo se pregunta al llamar: 449 994 1977."
6. Arreglado: "Hay estacionamientos muy cerca."
7. Arreglado: el alto bajó a ~10,890 px; se respeta el tope de 11,000.
8. No arreglado: crecer la foto del hero pasaría el tope de 11,000 px; se deja el arco con el título grande.
