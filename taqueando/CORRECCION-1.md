# Taqueando · Corrección 1 (pulidor, 1 oct 2026)

## Los 10 problemas más visibles (en orden)
1. El lema en contorno (los dos divisores y lo impreso en la hoja de charola) se ve roto: los trazos internos de la letra se enciman en las E, la B y el ®. Parece error de fuente.
2. Links secundarios sobre negro ("Ver la carta" del hero y del cierre, "Ver las 1,234 en Google"): letra papel encima del resaltador amarillo, casi no se lee.
3. Momento firma a medias: hojas de reseña que ya se ven completas se quedan con el resaltador partido ("gran var|iedad", "de sa|lsas"); la regla de 1.6 s solo corría una vez al entrar la sección.
4. Charola vacía en celular: hoja de 470 px con una sola línea, hueco que no vende y empuja el botón verde a la siguiente pantalla.
5. La línea "AHORA SÍ." / "Taco sin cheve no chabe." de la charola sale cortada por arriba (el marcador se recorta) y deja un hueco de 36 px aun apagada.
6. Compu (1440): el botón verde de la charola queda abajo de la hoja con ~120 px vacíos; la columna de decisiones termina antes y la hoja vacía mide 360 px.
7. Compu y tableta: en el remate, la banda "EL LETRERO" se encima sobre la palabra "TACO" del título.
8. Tableta (820) y compu: en la carta la foto se queda arriba y deja una columna vacía de ~900 px junto a la lista; en sucursales la columna de Sur queda casi vacía con las redes flotando.
9. Tarjetas de sucursal: la etiqueta "POR PERSONA" se parte en dos renglones y "CASI 9 AÑOS" se repite como etiqueta y como texto.
10. Hero en celular: "Centro, Norte y / Sur." deja "Sur." solo en un renglón, y el doblez verde limón en la esquina de la foto a sangre parece un pedazo suelto.

## Qué se arregló
1. Lema en contorno: ahora es relleno del color del fondo con contorno por sombras (divisores y hoja de charola); ya no se ven los trazos internos de la letra.
2. Links secundarios sobre negro: el resaltador pasa a una banda de 3 px debajo de la letra; en papel se queda el resaltador de 6 px detrás.
3. El resaltador: cada hoja que se ve completa 1.6 s queda en 1 (cruce de 350 ms con `@property --p`); si la hoja sale de la pantalla vuelve a mandar el scroll (reversible). Verificado: las tres frases quedan completas en celular y compu.
4. Charola vacía: ahora dice "Toca el + de un taco o empieza aquí:" con cuatro discos reales (pastor, bistec, arrachera, chorizo) con su + que agregan directo; sin JS se ve "Escríbenos tu pedido por WhatsApp" y el botón verde.
5. "AHORA SÍ." / "Taco sin cheve no chabe." / "Tú sabrás.": ficha amarilla inclinada sin recorte, y no ocupa espacio cuando está apagada. La suma lleva papel detrás para que no se mezcle con lo impreso.
6. Compu: el botón verde y "Te confirmamos..." viven en la columna de decisiones, abajo del nombre; la hoja ocupa las dos filas. Sin hueco.
7. Remate: la banda "EL LETRERO" ya va arriba del título en compu y tableta, sin encimarse.
8. Sucursales: en compu (1100+) la columna 3 lleva Sur, el 2x1 y las redes; en tableta Sur y 2x1 van lado a lado y las redes abajo. La foto de la carta ya era sticky (lo que se veía era la captura de página completa).
9. Etiquetas de sucursal en un renglón ("POR PERSONA"); "CASI 9 AÑOS" cambia a "HISTORIA".
10. Hero: la línea "Tacos en Aguascalientes. Centro, Norte y Sur." balanceada (sin "Sur." huérfano) y el doblez de la foto a sangre en color papel.

## Verificación
- krevo-shot m: alto 8,832 px, `alertas: []`. krevo-shot d: alto 5,806 px, `alertas: []`.
- Flujo de la charola probado (agregar desde la carta y desde los discos rápidos, con queso, cheve, Centro, nombre): wa.me/524492018515 con "Hola Taqueando, quiero pedir: 1 de bistec, 2 de arrachera, 1 de pastor, 1 de El Regio y 1 de sabanita de rib eye. Los quiero con queso. Para tomar: cheve. Sucursal: Centro. Mi nombre: Ana."
- Tableta 820 revisada (sucursales y carta).

## Qué no se arregló
- Los discos de taco siguen siendo recortes de la foto de su carta (blandos a 92 px en compu); se sustituyen cuando el dueño mande fotos por taco.
- Lo impreso de la hoja de charola sigue detrás de los discos (es el papel de charola, a propósito).
