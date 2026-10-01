# Mezquite Boots · CORRECCIÓN 1 (1 oct 2026)

Base: REVISION-1.md (7.5) + decisiones del orquestador. Todo se editó en `sections/`, `site.css`, `template.html` y se armó con `python3 build.py` (index.html nunca a mano).
Capturas: `scratchpad/mezquite-fix/` (m/, d/, hoja-celular.jpg, hoja-compu.jpg, hoja-820.jpg, bd-mid.png, bd-full.png, hero-mid*.png, flow390.jpg, head-all.png).

## Medidas finales
- Celular 390x844: **8,651 px** (antes 8,762; tope 9,000). Compu 1440: 6,703 px. 820: 9,736 px (una columna en pinta y opiniones, sin huecos).
- krevo-shot m y d: **0 alertas** (sin scroll horizontal, consola limpia, 0 404, 0 invisibles, 0 botones chicos, solo Alfa Slab + Zilla).
- Flujo probado: Botas (etiqueta) + Sombrero (zona) → aparece "¿Qué número calzas?" → 27 → Independencia → Juan. URL: `https://wa.me/524491113361?text=Hola%20Mezquite%20Boots%2C%20busco%20botas%20y%20sombrero.%20Calzo%20del%2027.%20Voy%20a%20la%20sucursal%20Independencia.%20Mi%20nombre%3A%20Juan` = "Hola Mezquite Boots, busco botas y sombrero. Calzo del 27. Voy a la sucursal Independencia. Mi nombre: Juan". El cierre repite lo mismo ("Tu pinta ya está anotada."), persiste al recargar, y "Preguntar por estas" mete "botas café con suela roja" y baja a #pinta (54 px).

## Cambios aplicados (orden de la revisión)
1. **Bordado** rehecho (`_work/gen_bordado2.py` → `40-opiniones.html`): caña simétrica en espejo copiada del bordado de fb-05: banda de 3 hileras con pico al centro y triángulos de satín colgando, flama central de dos curvas en S que se cruzan (lente ancha abajo con relleno de satín, lente angosta arriba), 3 triángulos por lado y una voluta a cada lado que nace de la base de la flama. 439 puntadas sueltas crema/rojo, se cosen simétricas (izquierda y derecha a la vez). El **4.9 va debajo, grande** (82 px celular, 104 compu) con estrellas y "88 opiniones en Google"; aparece desde el 60 %. JS nuevo: avance por scroll + reloj que lo completa a los 1.6 s desde que cualquier parte se asoma (probado: con 25 % a la vista llega a 439/439 a los 1.7 s); lo que se ve avanza continuo (máx. todo el bordado en 0.6 s, sin brincos); ya completo, un scroll de 4 px o subir 200 px no lo descose; solo se reinicia si sube arriba del inicio. Aspecto 400x272 (antes 400x440): ahorra alto.
2. **Remate con maps-01** (`60-cierre`): fachada de noche con el letrero completo, 16:9 a todo el ancho; la cita del lema va debajo (celular) o a la derecha sobre cuero (compu), sin tapar el letrero. maps-03 se quitó.
3. **Sucursales con su letrero** (decisión 2): las tres con dirección + "frente a..." + "· según su letrero", Lun a Sáb 10:00 a 20:00, 449 111 3361 (Jesús María además 449 151 6134) y su "Cómo llegar" rojo a Google Maps con esa dirección; Independencia suma "Fracc. Circunvalación Nte." y su Maps apunta a la dirección. JSON-LD con las tres como `department`. "Todo listo" ahora pide "Confirmar dirección y horario de cada sucursal".
4. **Título** de sucursales: "De Independencia / a Villa Juárez." (2 renglones; la versión con las cuatro sumaba 4 renglones en celular).
5. **Cinto** (decisión 4): placa a 105 px celular / 122 compu (header de compu 64 px), punta de correa con pico y pespunte, PREGUNTAR estampado, 5 ojillos de 9 px con aro metálico pegados a la hebilla, hebilla SVG de marco abierto (se ve el cuero dentro) con aguja que cruza el marco hasta el primer ojillo. Ojillo de la sección actual en rojo, los pasados en crema.
6. **Nota**: un solo renglón por fila (punteado), sin las rayas del fondo; valor apoyado en la línea; NOTA pegado al primer renglón. Igual en la nota del cierre. Arreglado el renglón vacío que quedaba más alto.
7. **Arma tu pinta**: 961 px o más, columnas 1.15fr/.85fr y maniquí hasta 620 px (≈ 82 vh); de 700 a 960, una columna (adiós hueco de 800 px a 820).
8. **Huecos**: celular de ~112 a ~84 px; compu de 160 a 198 a ~90 a 100 px (incluye el zigzag).
9. **Pie a 820**: rejilla 2x2 entre 760 y 1099, teléfonos, dirección y horas sin partir (teléfono en un renglón).
10. **Hero a 820**: de 700 a 1099 el cartel del celular en grande: bota alta arriba (430 a 560 px), tarjeta cosida montada y título a 3 renglones de 58 a 84 px; sin huecos arriba ni abajo.
11. **Marcas ajenas** (decisión 5, `_work/clean01.py`): en maps-01 se borraron los logos Tombstone, Wyoming y West Town de la franja del letrero, el letrero colgante Wyoming (letras fuera, placa lisa), la placa TOMBSTONE (negra lisa) y tres tarjetitas VISA. El letrero de Mezquite Boots intacto. Se usa en remate, hero (compu) y tarjeta Independencia (recorte nuevo de la entrada con el 930).
12. **Rojo sobre cuero** (decisión 6): `--rojo-cl` pasa de #F2573A a #D63B1F (rojo del letrero) en "surtido y precio.", estrellas, cordones y links.
13. **Etiquetas del maniquí**: las de la derecha se anclan por `right` y las de la izquierda por `left` (crecen hacia adentro; probado: las 5 dentro del marco a 390 y 820 con palomita); zona camisa a left 30 % / ancho 40 %; letrerito "Aceptamos pagos" quitado de la foto.
14. **Interior** sin velo lechoso: niveles por percentil + curva suave, sin subir saturación.
15. **Momento al cargar**: el subrayado del título se cose en 26 pasos con una aguja de luz que lo recorre (420 a 1180 ms) y luego la etiqueta "Bota café bordada" se mece una vez (1.15 s).
Extra: en 700 a 960 opiniones va en una columna (antes el bordado quedaba en 320 px y "88 opiniones" se partía).

## No aplicado y por qué
- **Foto en el pie** (parte del cambio 9): el remate de maps-01 a todo el ancho queda pegado justo encima del pie; otra tira de foto ahí repetiría la misma fachada y gastaría alto del celular.
- **"Horario: pregúntalo"** (estaba en "qué no tocar"): lo reemplaza la decisión 2 del orquestador (horario del letrero en las cuatro, domingo solo Independencia).
- **maps-03 en la tarjeta Independencia**: no se usó; su fachada (un piso, toldo naranja) no se parece a la de Av. Independencia 930 y no hay forma de saber de qué sucursal es. La tarjeta usa un recorte de maps-01.
- Contraste: #D63B1F sobre cuero se lee pero es más bajo que el naranja anterior; es lo que pide la decisión 6.

## Qué no se tocó
Mecánica de Arma tu pinta y su mensaje, paleta y letras, pespuntes y zigzag, carrusel de botas, las tres reseñas y "Ver las 88", hilo rojo, estado en vivo y mapa, "Todo listo", los 4 verdes, los `tel:` y el flotante.

## No verificado
Celular físico y swipe real; 360 px solo en el header (cabe, 0 scroll horizontal); que 449 111 3361 reciba WhatsApp.
