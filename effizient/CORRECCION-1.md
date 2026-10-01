# Effizient · Corrección 1 (pulidor, 1 oct 2026)

## Los 10 problemas más visibles (en orden, vistos como cliente a 390, 820 y 1440)
1. Goniómetro sin marcar: la lectura dice "[cuña] / 10 Mueve el brazo" (se ve rota) y el brazo en reposo parece marcar 1; no se entiende que el brazo se gira.
2. Goniómetro chico en compu y tableta (unos 300 px; la hoja pide 420): el instrumento firma se pierde junto a la ficha.
3. Huella de pedigrafía: manchas sueltas (talón, franja y metatarsos sin unirse); se lee como dibujo de clip-art, no como una pisada impresa.
4. Remate "Tu cita, a un mensaje": la foto del corazón trae el logo blanco quemado abajo a la izquierda (logo repetido junto al bordado).
5. Opiniones en compu: hueco muerto de unos 250 px bajo los permisos a la derecha; la foto chica cuelga sola debajo.
6. Header en compu: la placa del logo es diminuta (40 px), "EFFIZIENT" casi no se lee a 1440.
7. Cita en celular: la foto reescalada del goniómetro (suave) es grande y se mete entre el título y la ficha, empujando el instrumento hacia abajo.
8. Pisada en tableta 820: la columna de texto de la hoja queda apretada y "Análisis Biomecánico" se parte en dos renglones.
9. Remate en celular: el título va encima de la foto y tapa los dedos del corazón.
10. Hero en compu: la etiqueta "CLÍNICA DE TERAPIA FÍSICA..." va pegada a la "N" del título.

## Qué arreglé
1. Goniómetro sin marcar: ya no sale "/ 10" con la cuña suelta; la lectura dice "Arrastra el brazo o toca un número" en azul playera, hay una flecha punteada sobre el brazo que indica el giro (se va al marcar) y, al entrar la sección en vista, el brazo hace un amago de resorte (sube a 50° y regresa, una vez; nada con reduced-motion). Se blindó el temporizador de respaldo para que un amago viejo no brinque el brazo. `gen/dial.py` regenera el SVG con la flecha.
2. Goniómetro más grande: 400 px en tableta y 440 px en compu (antes 330), con el `range` y la escala a 420.
3. Huella rehecha en `gen/foot.py`: talón, apoyo lateral y metatarsos se unen con unión suave de presión (la tinta se corre de uno al otro como pisada real), dedos sueltos; 986 puntos, misma impresión de talón a dedos en 1.2 s.
4. Foto del corazón (`corazon-*`): logo blanco quemado abajo a la izquierda y el pedazo cortado del estampado de la manga tapados con `cv2.inpaint` sobre tela negra, con grano fino; nada pixelado.
5. Opiniones en compu: foto grande a 4:5 y la chica montada abajo a la derecha en absoluto, columnas centradas; ya no queda hueco muerto.
6. Placa del logo del header: 54 px de alto con logo de 40 px en compu (44/31 px al compactarse), y logo de 30 px en celular.
7. Foto del goniómetro en celular: de 62 % a 50 % del ancho (máx. 210 px), estorba menos y se ve menos suave.
8. Pisada en tableta (780 a 1059 px): columnas 4/7, hoja con menos relleno y columnas internas 0.85/1.15; ya no se parte "Análisis Biomecánico".
9. Remate: "Tu cita, a un mensaje." ahora va abajo, sobre la tela oscura y el degradado, sin tapar el corazón (celular y compu).
10. Hero en compu: la etiqueta respira 26 px antes del título.

## Qué no arreglé
- La foto del goniómetro (`ig-30`) sigue siendo una reescala suave; solo se achicó. Hace falta una foto nítida del escritorio (va en "fotos del interior sin pacientes").
- La carrera del 26 de septiembre ya pasó: el bloque "Tres años" se queda como memoria (decisión del dueño, ya está en PENDIENTES).

## Verificación
- krevo-shot m: alto 8,709 px, `alertas: []`, sin consola ni 404. krevo-shot d: alto 7,351 px, `alertas: []`. Tableta 820 revisada con copia del script en el scratchpad.
- Flujo del componente probado con clics reales (Rodilla, Box, pedigrafía, toque en el 6, nombre Ana): `Hola Effizient, quiero agendar una cita. Zona: rodilla. Molestia hoy: 6 de 10 (me limita). Entreno: box. También me interesa: estudio de pedigrafía y plantillas. Mi nombre: Ana`. El remate repite el mismo mensaje.
