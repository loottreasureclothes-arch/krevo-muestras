# Cenaduría San Antonio · CORRECCIÓN 1 (pulidor, 1 oct 2026)

## Los 10 problemas más visibles (en orden, vistos como cliente a 390, 820 y 1440)
1. El cartel del atole ("HOY DESCANSAN") colgaba del toldo en TODA la página y tapaba títulos, direcciones y fotos ("Los jueves, cerrado", "Aguascalientes", plaquitas de foto).
2. Primera foto: la mitad del cuadro era cielo y cables de luz; el letrero se veía chico.
3. Componente firma pobre: los 6 tamales cerrados parecían cajas o huacales (rectángulos), no tamales en hoja.
4. Foto de enchiladas: el papel de mesa dejaba leer precios viejos ($135, $200, $240) que contradicen la carta.
5. El 4.4 del momento firma iba en letra de cuerpo (Albert Sans), sin peso; no remataba las pilas de platos.
6. La cuenta vacía decía "Aprox. ..... Aún sin renglones" (se leía torpe).
7. Entre horario y cierre no había riel: dos secciones menta pegadas y un hueco de unos 85 px.
8. Pie: "Una sola cenaduría. Desde 1971." sin el segundo tono.
9. Compu y tableta: hueco grande bajo el hero (84 px de relleno + riel).
10. Al abrir un tamal en el nuevo tamaño, el papelito cortaba el sabor ("Rompop", "almendr").

## Qué se arregló
1. Al bajar, el cartel del atole se mete DENTRO del toldo (centrado entre letrero y MENÚ, 34 px); arriba del todo sigue colgado con sus hilos. Ya no tapa nada.
2. Hero recortado de nuevo de `maps-fachada-01`: celular (340,150)-(1180,790), compu (190,90)-(1330,790); nunca debajo de y=790. Contraste +6 %, color +8 %, nitidez suave. Letrero grande y toldos, menos cables.
3. Tamales redibujados en SVG: hoja de maíz con cuerpo de almohada, puntas amarradas que abren en abanico, fibras curvas, volumen con degradado, cuerdas en los cuellos y giro distinto en cada uno (charola real). El abrir como libro, los lugares y la cuenta siguen igual.
4. Enchiladas recortadas (120,0)-(1110,1320): fuera los precios viejos; se queda "CUENTA POR MESA".
5. 4.4 en Shrikhand a 78-96 px (celular) y 88-112 px (compu).
6. Total vacío: "Por armar".
7. Riel con zócalo al final de horario; relleno ajustado.
8. "Desde 1971." en lima en el pie.
9. Hero de compu con 60 px abajo.
10. Papelito del tamal abierto más ancho que la masa (122 %) y letra de 12 px: el sabor se lee completo.

## Qué NO se arregló
- La fuente de títulos sigue siendo Shrikhand (Caprasimo no está en tools/fuentes; ya anotado en PENDIENTES).
- El mapa embebido de Google muestra nombres de negocios vecinos (incluido un competidor): es el mapa en vivo, no se controla.
- Las fotos son de clientes (calidad de celular); sin fotos propias no se puede subir más el nivel.

## Verificación
- krevo-shot m: 8,810 px, `alertas: []`. krevo-shot d: 6,065 px, `alertas: []`. Sin scroll horizontal a 390 ni a 820.
- Flujo: 2 platillos + piñón con cereza + nuez arma la cuenta y el botón queda en
  `https://wa.me/524499166522?text=Hola Cenaduría San Antonio, quiero pedir para llevar: 2 Platillos Hidrocálidos (tamal de piñón con cereza y tamal de nuez). ¿A qué hora puedo pasar?`
