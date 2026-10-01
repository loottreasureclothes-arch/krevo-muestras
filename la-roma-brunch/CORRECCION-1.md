# La Roma Brunch · Corrección 1 (pulidor, 1 oct 2026)

## Los 10 problemas más visibles (en orden, vistos como cliente a 390, 820 y 1440)
1. Remate del cierre (`norte-05`): arriba al centro se ve el torso con playera verde de un cliente y la foto se ve blanda.
2. Momento firma RO · MA: la "A" de MA muestra el borde blanco del plato, no comida; MA casi no se lee como waffle.
3. Citas en celular: la placa ocupa todo el ancho y no asoma la siguiente (la columna de la rejilla se estira a 114vw por las letras gigantes), no se entiende que se desliza.
4. Cierre sin platos ("FALTA PONER LA MESA.") se desinfla: un título y un link de texto, nada que tocar ni ver.
5. Icono de Instagram roto (mancha, coordenadas mezcladas en el path) en "Cinco" y en el pie.
6. Pie: la etiqueta "HORARIO" queda encima de "BRUNCH · AGUASCALIENTES" (rótulo cruzado) en celular y compu.
7. Fachada `sant-01`: el desenfoque de las personas del fondo se ve como mancha rectangular dura.
8. Collage del lugar en celular: la placa "AMÉRICAS / PLANTAS" se cuelga sobre la cita y la cita queda pegada al collage.
9. Tableta 820: revisar collage, mesa y "Cinco" (sin diseño propio entre 600 y 900).
10. Mesa vacía en celular: los cuatro lugares punteados con numerales se ven grises y apagados (aros punteados a 0.5 de opacidad); el componente firma no invita a tocar.

## Qué se arregló
1. Remate `norte-05`: recorte nuevo sin el cliente de arriba (1173x658 desde x 54, y 62, a 1280x718 con LANCZOS y enfoque suave). Ya no se ve a nadie.
2. RO · MA: `ma.webp` rehecho desde `americas-11` (940x595 centrado en el waffle con fruta y chocolate); la M y la A ya son puro waffle, sin borde de plato.
3. Citas: la rejilla de la sección queda en `minmax(0, 1fr)` y cada cita al 84 %: ya asoma la siguiente en celular y se entiende que se desliza.
4. Cierre sin platos: ahora trae "Cuatro lugares libres. Empieza por estos:" con cuatro platos redondos reales (Chilaquiles de la Ramos, Enchiladas suizas, Waffle de frutos rojos, Capuchino RO MA) que llevan a la carta, botón de placa "IR A LA CARTA" y botón verde "Pedir por WhatsApp" con el mensaje genérico (1 verde en la sección; el estado con platos sigue igual).
5. Icono de Instagram rehecho (cuadro redondeado, lente y punto), en "Cinco" y en el pie.
6. Pie: "Brunch · Aguascalientes" pasa bajo la placa del logo; "Horario" queda solo con su horario.
7. Fachada `sant-01`: el interior lleva foco suave (como profundidad de campo tras el cristal) y las personas un desenfoque fuerte con borde difuminado; ya no se ve un parche rectangular. Letrero RO MA y puertas limpios.
8. Collage: la cita baja a 72 px del collage y ya no choca con la placa "AMÉRICAS / PLANTAS".
9. Tableta 820: "Cinco" ya no aprieta las placas en una columna angosta (fachada arriba 16:9 y sucursales a dos columnas entre 600 y 999 px; dos columnas lado a lado desde 1,000).
10. Mesa vacía: los cuatro lugares son platos de presentación (aro sólido, filete interior y fondo crema tenue) con numerales más claros, en vez de aros punteados grises.
Para no pasar de 9,000 px: la foto de la barra baja a 16:10 en celular y la fachada a 16:9.

## Qué no se arregló
- Las fotos siguen siendo las de Google Maps (blandas en `norte-05` y `americas-04`); hacen falta originales del dueño.
- Fuentes Libre Franklin y Forum siguen sustituidas por Work Sans y Cinzel (no están bajadas; sin internet).
- Con 4 platos puestos la página crece ~300 px y pasa de 9,000 (el tope se mide con la mesa vacía, como ya estaba anotado).

## Verificación
krevo-shot m: alto 8,963 px, `alertas: []`. krevo-shot d: `alertas: []`. Flujo de la mesa probado en Chrome headless (Chilaquiles de la Ramos + Waffle de frutos rojos + Capuchino, Norte, Ana): SUMA $330 y wa.me decodificado "Hola La Roma Brunch, quiero pedir: Chilaquiles de la Ramos, Waffle de frutos rojos y Capuchino con sello RO MA. Sucursal: Norte. Mi nombre: Ana".
