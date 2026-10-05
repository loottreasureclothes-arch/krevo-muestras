# CORRECCION-4 - El Artesano (revisor final, 5 oct 2026)

Encimes (encimes.mjs, antes):
- Celular: 0 encimes, 0 cortados, 2 "fuera" = tarjetas del carrusel de reseñas que viven fuera de pantalla a propósito (se desliza). Falso positivo, confirmado en la captura.
- Tableta: igual, 2 "fuera" del mismo carrusel. Falso positivo.
- Compu: 0 / 0 / 0.

Revisado a ojo (celular a tamaño real y compu): sin títulos tapados por el header, sin botones partidos, sin sellos encima de botones o del mapa. El hero lleva el título encimado a propósito sobre el pie del arco (diseño), se lee bien.

Agregado:
- Sección "El patio" no terminaba en acción: ahora cierra con una línea ("Mesas en el patio y en el salón, en Plaza Tres Arcos.") y botón "Horario y mapa →" (sections/04-patio.css nuevo).

Verificado:
- 9 secciones; celular ~10,400 px; compu ~8,000 px.
- Bloques obligatorios: hero con 2 botones, azulejos (firma) con WhatsApp armado, carta con precios reales y "Pregunta el precio", 9 reseñas con nombre y fuente + 4.4 / 1,770 + "Ver todas en Google", galería de 6 fotos, mapa embebido con horario y "Abierto ahora", Todo listo para completar, pie con Facebook, teléfono, dirección y horario.
- WhatsApp: 6 enlaces wa.me/524499159386 con mensaje armado (decodificados). Sin "$0".

Pendiente fuerte antes de mandar: confirmar que 449 915 9386 tenga WhatsApp (ver PENDIENTES.md).
