# Corrección 1 (pulidor, 5 oct 2026)
Problemas más visibles, en orden:
1. Galería: en "La entrada" se ven caras de clientes en la mesa del fondo.
2. Tableta 820: la carta en 2 columnas dejaba el título una palabra por renglón y los platos apretados.
3. Tableta 820: Visítanos con horario partido en 2 renglones y botones rotos en 3 líneas.
4. Compu 1440: "Tortilla al comal" iba a sangre con una foto de 980 px (estirada 1.47x).
5. Voz de investigador en la carta ("Lo que más mencionan en Google", "aplauden las reseñas", "Una reseña dice...", "los precios los das tú").
6. Agua de horchata con una "H" de relleno en lugar de imagen.
7. Reseñas que pelean con la página (Lupita: "la tortilla no es a mano"; Alicia: "porciones chicas") y 8 tarjetas dejaban fila coja en compu.
8. La ventanilla: "dícteselo" (usted) contra el tú de toda la página; mensaje con mayúsculas a media frase. Compu: hueco a la derecha de la última foto de la galería.

Prueba anti-genérico: pasa (hero con sello 4,6 y mantel amarillo, papelito de comanda propio, 8 secciones, 0 verdes, sin contadores).

Resultado:
1. Arreglado: interior del pasillo desenfocado limpio (PIL, sin pixelar), 1152/960/480 regenerados.
2. Arreglado: de 820 a 1099 la carta va en una columna con el título arriba.
3. Arreglado: mapa y horario lado a lado bajo el título, horas sin cortar, botones a lo ancho.
4. Arreglado: desde 1100 la foto ocupa máx. 62% (≤ 980 px) a la izquierda y el título a la derecha; el momento de círculo se conserva.
5. Arreglado: textos con voz del negocio ("La de la casa, servida desde las 9:30", "Mejor trae efectivo para pagar").
6. Arreglado: vaso de horchata dibujado en CSS con canela y popote.
7. Arreglado: quedan 6 reseñas reales (Google) con nombre y estrellas, 4,6 con 1,197 y "Ver todas en Google".
8. Arreglado: "díctaselo", platillos en minúscula dentro del mensaje; última foto de la galería a todo lo ancho en compu.
Probado con Playwright: agregar, +/−, quitar en el papel, ¿para cuántos? 6+, copiar (portapapeles correcto), vaciar vuelve a "Elige arriba", sin errores de consola.
