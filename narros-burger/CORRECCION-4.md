# CORRECCION-4 (revisor final, 4 oct 2026)

## Encimes que había (encimes.mjs)
- Celular: la barra pegajosa "Ver comanda" (roja, abajo) se encimaba con el título "Arma tu comanda." al entrar a la sección (2 encimes). ARREGLADO: la barra arranca oculta y solo aparece cuando la lista de platillos está a la vista y el ticket todavía no (clase `bar-on` por scroll).
- Celular: "FUNDICIÓN." del momento firma salía cortado (19vw no cabía en 390). ARREGLADO: 16.4vw.
- Tableta (820): el menú en línea ("Armar comanda") se encimaba con el logotipo "BURGER". ARREGLADO: en tableta sigue el panel rojo con hamburguesa; el menú en línea solo desde 1100 px.
- Tableta: 2 tickets de reseñas se salían de la pantalla (rejilla de 4 columnas con texto que no cabía). ARREGLADO: 2 columnas en 820-1099, 4 desde 1100, con `minmax(0,1fr)`.
- Falso positivo que queda: en celular `encimes.mjs` marca "FUERA" el 2o ticket de reseñas; es el carrusel horizontal (se desliza), confirmado en el recorte.
- Resultado: 0 encimes y 0 cortados en celular, tableta y compu.

## Qué agregué para que no se vea corta (antes 8,717 px, 8 secciones)
- 04-estados: tres listas más con precios reales de la carta de Rappi: De pollo (Tolteca, Zapoteca, Maya, Mixteca, Huichol), Hot dogs (Bulldog, Bullterry, Cocker, Chow Chow, Pastor) y Tortas y más; cierre "42 hamburguesas en la carta".
- 06-pedir (nueva): "Aquí, para llevar o hasta tu puerta." con 3 pasos (arma la comanda, mándala por WhatsApp, comes aquí o pasas por ella; domicilio también por Rappi y DiDi Food), datos reales (tarjeta o efectivo, estacionamiento en la calle, $100 a $200 por persona) y la foto del combo con aros (rap_bg, del dueño en Rappi) en marco de cuadros. Compu: foto a la izquierda, pasos a la derecha.
- Menú: "Cómo pedir" en orden de página.
- Resultado: celular 10,899 px, 9 secciones; compu 11,111 px; alertas [] en m y d.

## Verificado
- 6 wa.me, todos a 524493529241 (teléfono de Maps, sigue sin confirmar como WhatsApp en PENDIENTES). Sin "$0". 8 reseñas con nombre, estrellas y fuente. Mapa embebido por sucursal, horario por día con "Abierto ahora".
