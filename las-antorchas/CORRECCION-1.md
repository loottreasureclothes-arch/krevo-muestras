# Corrección 1 Las Antorchas (pulidor, 3 oct 2026)
## Los 8 más visibles
1. Hero celular no es cartel: la foto mide 330 px (menos de la mitad de pantalla) y el letrero se ve chico.
2. Compu: platos en 2x2 escalonado; la fila de chilaquiles queda sola en otra pantalla con media pantalla vacía.
3. Compu hero: título partido en 4 líneas en columna angosta ("Mesa / puesta / en Madero / 240").
4. Compu carta: título roto en "Bebidas / y / enchiladas".
5. Tableta 820: es el celular estirado (todo el 2 columnas arranca en 900 px).
6. Antorchas apagadas con velo .62: fotos de Maps ya oscuras se ven sucias; no se entiende que se tocan.
7. Dato 15,376: etiqueta pegada al número en celular; en compu las fotos del collage chicas y rojo vacío.
8. Fotos que venden (comedor a sangre y collage) con loading=lazy.
Prueba anti-genérico: 1 no (letrero, toldo festoneado, Madero 240), 2 no, 3 no (letrero que se enciende), 4 no (3 verdes), 5-8 no. Pasa.
## Resultado
1. Arreglado: foto del hero a 64svh (cartel), título montado sobre la foto.
2. Arreglado: en compu (1100+) los 4 platos van en una fila, encabezado a dos columnas arriba.
3. Arreglado: hero de compu a 1.05/.95 y h1 a 5.2vw; queda en 2 líneas.
4. Arreglado: carta con columna de título más ancha; "Bebidas y / enchiladas" en 2 líneas.
5. Arreglado: todos los cortes a 2 columnas bajan de 900 a 760 px (tableta 820 con diseño propio).
6. Arreglado: velo de antorcha apagada de .62 a .42 y llama más grande y clara con sombra.
7. Arreglado: etiqueta separada del número (gap 16 px); collage centrado a 1fr 1fr en compu.
8. Arreglado: quitado loading=lazy de comedor y collage.
No arreglado: letrero de la fachada sale cortado en la L (límite de la foto de Maps); fotos de celular oscuras (falta foto real del dueño).
Verificado: m 4,962 px y d 5,015 px, alertas [] en ambos, wa.me intacto (524499189633).
