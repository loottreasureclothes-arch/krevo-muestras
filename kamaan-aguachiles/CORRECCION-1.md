# Corrección 1 (pulidor) Kamaan Aguachiles

## 8 problemas más visibles (en orden)
1. Foto grande de "Micheladas con ostión" borrosa (maps-18, nitidez 20) en celular y compu.
2. Tableta 820 = celular estirado (12,641 px, una columna): cortes en 900 px.
3. Huecos de ~200 px entre secciones en compu (paddings 104/112 encadenados).
4. Hero dice "abierto desde las 11:00" fijo, aunque esté cerrado.
5. Voz de investigador en la carta: "Destacado en Google Maps".
6. "El más vendido" (hero, carta y salsa) no está en research.
7. Fotos que venden (carta) con loading="lazy".
8. Misma foto de michelada en carta y en la sección michelada (al cambiar la foto).
Prueba anti-genérico: pasa (placa de menú con sombra dura, olas de su carta, cesta de salsas con ticket, "Mucho flow" de su pared; 9 secciones, 7 verdes).

## Resultado
1. Arreglado: sección michelada con maps-17 (nítida, 1536 px); carta usa maps-18 en chico.
2. Arreglado: cortes a 768 px + ajuste de hero y títulos para 768-1099; tableta 8,157 px, 0 fuera.
3. Arreglado: paddings de compu a 72-80 px.
4. Arreglado: "diario desde las 11:00".
5. Arreglado: "De los favoritos de la mesa."
6. Arreglado: "Receta de la casa" (su descripción del menú). Si el dueño confirma que es el más vendido, se regresa.
7. Arreglado: sin lazy en la carta ni en la michelada.
8. Arreglado: cada foto de michelada aparece una sola vez.
No arreglado: el botón flotante de WhatsApp tapa un renglón de reseña al pasar en celular (normal del flotante).

Verificación: m 10,647 px y d 8,129 px, alertas [], encimes 0 en m/t/d, 6 reseñas + Ver todas en Google, mapa embebido, ticket wa.me/524496351125 decodificado ok.
