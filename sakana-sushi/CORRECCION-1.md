# CORRECCION-1 Sakana Sushi (pulidor, 3 oct 2026)

## Los 8 problemas más visibles (en orden)
1. La caja vacía se ve muerta: 12 huecos beige iguales y "Cerrar la caja" como bloque café apagado; no invita a tocar.
2. Huecos entre secciones de más de 90 px (compu ~210 px, celular ~136 px) en fondo oscuro igual.
3. Caja en celular: hueco de ~100 px entre "Tu caja está vacía" y "Suma".
4. `[data-reveal]` sin seguro: lo de abajo solo aparece al hacer scroll, no a los 1.6 s pase lo que pase.
5. Fotos que venden con `loading="lazy"` (las dos de caja para llevar y la sopa udon).
6. Voz de investigador: "Lo que se lee en Google Maps", "lo que más piden en Maps".
7. "Todo listo para completar" en compu: una columna angosta con media pantalla vacía.
8. Opiniones en celular: foto de udon de 240 px pegada a la izquierda con hueco vacío a la derecha.

Prueba anti-genérico: 1 no (caja de unicel, placa 319, banderolas de su menú), 2 no, 3 no (placa de su calle), 4 no (0 verdes), 5 no, 6 no, 7 no, 8 no (7 secciones, 7,448 px). Pasa.

## Resultado
1. Arreglado: huecos punteados, primer hueco libre es un "+" naranja que lleva a la carta, "Cerrar la caja" apagado con borde fino.
2. Arreglado: secciones a 44/44 px en celular y 48/40 px en compu (entre secciones ≤ 92 px, antes ~210).
3. Arreglado: lista vacía oculta y gap de la caja a 16 px en celular.
4. Arreglado: seguro en site.js que marca todo `[data-reveal]` visible a los 1.6 s.
5. Arreglado: caja1, caja2 y udon ya cargan sin lazy.
6. Arreglado: "Quien ya pidió en Sakana" y "lo que más se pide en la casa".
7. Arreglado: "Todo listo" en compu a 2 columnas (título y nota a la izquierda, lista a la derecha).
8. Arreglado: udon en celular en 2 columnas con su pie al lado.
No arreglado (fuera de alcance): fotos de clientes de calidad regular; WhatsApp, horario por día, IG/FB y logo siguen en PENDIENTES.
Verificación: m 7,047 px y d 5,883 px, alertas: [] en ambos; 0 wa.me (sin WhatsApp confirmado, la caja termina en tel: + Copiar, componente intacto).
