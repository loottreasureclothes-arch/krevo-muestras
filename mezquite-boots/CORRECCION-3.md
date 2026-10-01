# Mezquite Boots · CORRECCIÓN 3 (1 oct 2026)

Base: los 6 problemas del juez (8.3), sin REVISION-3.md. Todo en `sections/` + `template.html` + `python3 build.py` (index.html nunca a mano). Respaldo del estado anterior en `backup/correccion-3/`.
Capturas: `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/tuberia/mezquite-boots-corrector3/` (m/, d/, hoja-m.jpg, hoja-d.jpg, s360.png, t360.png, s820.png, p820.png, p1440.png, s1440.png, flow390.png).

## Medidas finales
- Celular 390: **8,483 px** sin elegir nada; con Botas + Sombrero + 27 + Independencia + nombre (nota del cierre llena): **8,897 px**. Antes: 8,662 y 9,014.
- Compu 1440: 6,430 px. 360: sin scroll horizontal; teléfono y "Cómo llegar" en una sola fila.
- krevo-shot m y d: **alertas: []**, 0 botones chicos (antes había 1 en celular), 4 botones wa, solo Alfa Slab One + Zilla Slab, consola limpia, sin 404.
- Flujo: Botas (etiqueta) + Sombrero (zona) + 27 + Independencia + Juan → `https://wa.me/524491113361?text=Hola%20Mezquite%20Boots%2C%20busco%20botas%20y%20sombrero.%20Calzo%20del%2027.%20Voy%20a%20la%20sucursal%20Independencia.%20Mi%20nombre%3A%20Juan` = "Hola Mezquite Boots, busco botas y sombrero. Calzo del 27. Voy a la sucursal Independencia. Mi nombre: Juan". Los dos botones `data-wa-pinta` llevan la misma URL.

## Cambios aplicados
1. **Fachada limpia (remate y tarjeta Independencia)**: se rehízo desde el ORIGINAL maps-01 (`_work/clean04_fachada.py`). Encuadre = letrero completo + franja alta de las vitrinas: quedan fuera las placas Wyoming y Tombstone, la gente, las cajas con marca, las tarjetas VISA, la tienda vecina y los stickers de seguridad de la izquierda. El sticker LEDU del pilar se borró con relleno de la misma piedra (tono por inpaint + grano real de la piedra); los logos ajenos de la franja oscura del letrero con inpaint + grano. Cero barras negras y cero pixelado. El remate va a todo el ancho (en compu como banda panorámica con el lema; en celular 2.3:1 con la placa completa y las direcciones de la derecha). La tarjeta Independencia ya no usa la entrada con el 930: usa el lado izquierdo del letrero con su renglón "Av. Independencia # 930" resaltado. La fachada chica del hero (compu), que también traía las barras, se cambió por el mismo panorama limpio.
2. **Interior "ASÍ SE VE POR DENTRO"**: recorte de la mitad de abajo de maps-02 (botas en exhibidor, carteras de piel, cajas), SIN las playeras estampadas; logos de las 3 gorras de enfrente (incluida KENWORTH) y una caja con logo borrados sobre la tela lisa; color corregido (balance por gris, curva que baja medios, saturación -8 %), Real-ESRGAN x4 mezclado 50 % + grano (`_work/clean04_interior.py`, `_work/mix04.py`).
3. **Sucursales en celular compactas**: Jesús María, Pabellón y Villa Juárez ahora llevan nombre, "Dirección según su letrero", dirección en 2 renglones, una tira de SU letrero (maps-01) con el renglón de esa sucursal resaltado con pespunte y lo demás en penumbra, y una sola fila con un teléfono + "Cómo llegar". El horario común sale de las tarjetas a una línea "Las otras tres · Lun a Sáb 10:00 a 20:00, según su letrero". Cada tarjeta mide ~290 px en celular. En tableta van en renglón (texto | tira) y en compu en 3 columnas. "Elegir" queda solo de 700 px para arriba. Jesús María lleva su número propio (449 151 6134, banner); Pabellón y Villa Juárez el 449 111 3361.
4. **Placa del header y del pie**: compuesta en Alfa Slab One (rojo del letrero con contorno café negro) dentro de una placa de fierro cosida con pespunte crema y 4 remaches, panel de manta con textura suave de lámina; dibujada a 4x (`_work/placa4.py`), con 600w en el srcset. Nítida a 390 @2x.
5. **Alto con Botas**: fichas de número en 6 columnas (22 a 27 / 28 a 31 + "No sé"), dos renglones; más el ahorro de sucursales (mapa 170 px, menos espacio): 8,897 px en el peor caso.
6. **Compu 1440, Arma tu pinta**: el título y la línea de apoyo pasan a la columna derecha arriba de las fichas, la nota y el botón; el maniquí ocupa la izquierda desde arriba, alineado al margen. Ya no hay hueco junto al título. En tableta el título va a lo ancho encima de las dos columnas.
- Oficio extra: en la tarjeta Independencia (compu) el cuerpo va en dos columnas (dirección y teléfono | horario, estado en vivo y botones) junto al mapa; más aire bajo la etiqueta colgante; filas de teléfono alineadas en las tres tarjetas; 360 px sin que se rompa la fila.

## No aplicado y por qué
- No se usó Real-ESRGAN en el remate: el panorama mide 1,356 px y la regla prohíbe pasarlo por arriba de 1,200.
- No se tocaron textos de venta, mecánica del maniquí, bordado, cinto, verdes, "Todo listo" ni la paleta.

## No verificado
Celular físico; que 449 111 3361 reciba WhatsApp (sigue en PENDIENTES); que las tres sucursales del letrero sigan abiertas.
