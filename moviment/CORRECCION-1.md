# MoviMent · Corrección 1 (pulidor, 1 oct 2026)

## Los 10 problemas más visibles (en orden)
1. Tres puertas: las fotos de Nutrición y Psicología se veían lavadas (neblina blanca) y casi iguales entre sí (las dos: escritorio negro + sillón verde). La puerta de Nutrición no se distinguía.
2. Hero en celular: la mitad de arriba de la foto del tanque era muro blanco liso; el agua y la escalera quedaban chicas.
3. Fichas de "¿Quién viene?" con una letra suelta (Y, H, P, M, O) en el cuadro: parecía formulario genérico.
4. Ludoteca: en celular el recorte enseñaba sobre todo muro y el minisplit; en compu la foto (640 px de origen) se pintaba a ~470 px y se veía blanda a 2x.
5. Letrero iluminado a todo el ancho del celular: cuadro de reel estirado, se veía borroso.
6. Ícono de Instagram del pie no era el logotipo oficial (una cámara deforme).
7. Foto del remate (pasillo índigo con el logo) blanda y sin contraste.
8. Momento firma en celular: la foto de la grúa es 636 px de alto y su mitad de arriba es muro gris.
9. Opiniones en celular: la tarjeta corta queda con un hueco interno (todas igualan al alto de la más larga).
10. Collage "Por dentro" en compu: hueco abajo a la derecha de las dos fotos chicas.

## Qué arreglé
1. Puertas: nuevos recortes 5:7 desde los cuadros originales: Nutrición = librero + escritorio (x 0 a 760, y 60 a 1124); Psicología = sillón verde + palmera del jardín (x 120 a 880, y 420 a 1484). Autocontraste (1.5 % / 0.6 %), color +12 %, máscara de enfoque suave. Ya no se parecen. Alt de Nutrición corregido.
2. Hero celular: recorte 4:5 de maps-03 (x 380 a 1180, y 180 a 1180) y caja `aspect-ratio:4/5` (máx. 62svh). El agua y la escalera mandan, el título cae sobre el agua y el CTA queda arriba del pliegue. La página bajó de 8,695 a 8,592 px.
3. Fichas: el cuadro ahora es un mosaico de 2x2 venecitas (tres azules del tanque + morado del sello); al elegir se vuelve espuma y gira 45°. Mismo lenguaje que la cenefa. El texto de la ficha queda solo en la etiqueta (sin "Yo · Yo").
4. Ludoteca: celular con `object-position: 50% 82%` (casitas al frente); compu con `ludoteca-1280.webp` (Real-ESRGAN x4 sobre el recorte de 640 px, mezclado 50 % con LANCZOS + grano fino) en srcset. El recorte sigue sin la niña.
5. Letrero: ancho `min(80%, 420px)`, sizes ajustado, autocontraste y enfoque suave.
6. Instagram: glifo oficial (SVG) en el pie.
7. Pasillo: autocontraste, color +8 %, enfoque suave (840 y 540).

## Qué NO arreglé (y por qué)
8. Grúa: las dos capas (base con inpaint y colgador) están calibradas a coordenadas de esa foto; recortarla rompe el cálculo del cable. Se deja: el muro también es donde baja el colgador.
9. Tarjetas de opiniones del mismo alto: es lo correcto en una tira con scroll-snap; no se toca.
10. Hueco del collage en compu: menor; no se reacomodó para no mover el momento de confianza.
- Las fotos de reel (pasillo, letrero, consultorios) siguen siendo cuadros de video: blandas por movimiento. En PENDIENTES ya se piden tomas nítidas al dueño.

## Verificación
- krevo-shot m: alto 8,592 px, `alertas: []`. krevo-shot d: `alertas: []`.
- Flujo del componente probado por CDP (Yo + Mi hijo o hija, Psicología para el hijo, Fisioterapia para mí, tarde). wa.me decodificado: "Hola MoviMent, quiero agendar una valoración. Psicología: para mi hijo o hija. Fisioterapia: para mí. Nos acomoda: lunes a viernes, tarde." El remate repite el mismo href.
- Hojas de contacto: scratchpad `tuberia/moviment-pulidor/hoja-m.jpg` y `hoja-d.jpg`.
