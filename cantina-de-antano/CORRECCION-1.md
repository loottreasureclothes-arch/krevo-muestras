# La Cantina de Antaño · Corrección 1 (30 sep 2026)

Aplica REVISION-1.md de arriba hacia abajo con las decisiones del orquestador. Todo sale de `python3 gen.py && python3 build.py`; index.html no se tocó a mano. Precios y nombres de la carta sin cambios.

## Aplicado
1. **Hero que emociona.** Foto del salón (misma idea de la og.jpg): profundidad, cortinas rojas, mesas de madera, techo de objetos. Recorte vertical propio para celular (hero-m) y otro para compu sin los comensales de la derecha (hero-d), ambos con Real-ESRGAN x4. Sello circular "25 Años Contigo" con filete oro doble: 110 px arriba del título en celular, 160 px en la esquina inferior derecha en compu, entra con giro corto. Velo solo en la mitad de abajo (en compu además un velo a la izquierda para leer el título). Ya no hay techo con TV de futbol.
2. **Torre borrosa fuera.** En Botanas va la mesa real (maps-botanas-mesa recortada a la mesa, sin la persona), banda 2:1 nítida, máximo 560 px en compu.
3. **Fotos en paneles cortos** (banda 2:1 con pie en Special Elite): Carnes "De la parrilla" (maps-parrillada-tabla; pie neutro porque no se confirma que sea arrachera), Cervezas "Para acompañar" (tarro y vaso preparado de su Instagram, sin logo ni texto), Destilados "El botellero" (barra-02). Alto máximo no sube: sigue mandando Cocteles.
4. **Tira de fotogramas** entre el 2x1 y la carta: celuloide casi negro con perforaciones crema y 7 fotos reales (J. Pani, parrillada, botanas en mesa, botellero, Nacozari de noche, Tampiqueña sin texto, Colosio). Avanza con el scroll (reversible) y se desliza con el dedo; al tocarla deja de moverse sola. Perforaciones corren con `--cx`.
5. **Sepia bajado** (decisión 1): fachadas de noche a color real +0.6 EV (neón verde de Colosio y Nacozari, rosa de J. Pani), comida a color real, interiores cálido suave. Ver IMAGENES.md.
6. **El reparto** como créditos: "La Cantina de Antaño presenta" arriba, lista centrada (máx. 600 px), los créditos suben 40 px + opacidad ligados al scroll, y "y la participación especial de" antes de Sangría de cantina $127.
7. **Letra chica del 2x1:** "No aplica en coctelería ni en vasos, refrescos, jugos, cubetas y cigarros."
8. **Reloj primero en celular:** título, reloj (280 px), línea viva, letra chica y carrito. En compu: título y texto a la izquierda, reloj a la derecha.
9. **Huecos recortados:** Época (foto 60svh en celular, menos padding entre título y reseñas) y nota de sucursales (padding de la sección y la nota). Paga la tira de fotogramas.
10. **Refrescos, café y Red Bull** en su propio chip "Sin alcohol" al final de la carta (decisión 6). El chip "Cervezas" conserva su nombre porque ya solo trae cerveza. Notas: "Cubetas y vasos no aplican al 2x1." / "Refrescos y jugos no aplican al 2x1."
11. **Header celuloide:** perforaciones crema de 12x7 px rx 2 sobre banda casi negra de 8 px (también en las tiras divisorias y en El reparto). Header compacto con fondo sólido #24100a, sin fantasma de texto.
12. **Sin FOUT:** preload del woff2 latino de Abril Fatface y Abril cargada aparte con `display=block`. Las capturas de celular y compu salieron con Abril, Lora y Special Elite.
13. **Ficha de mesa:** con "Hoy", si la hora ya pasó se propone la siguiente media hora (después de las 11 p.m. pasa a "Mañana"), y si alguien elige una hora pasada sale "Esa hora ya pasó. Elige una más tarde o mañana." "Mañana" a 15 px con aire. "DÍA" y "HORA" en la misma línea (diferencia medida: 0 px).
14. **Compu:** sin franja café entre el hero y la tira (el padding pasó adentro de `.dos-in`).
15. **Zoey Ail** con "(…)" al inicio y al final, porque se recortó.

Época de Oro ahora usa maps-interior-barra-02 (barra, caballito de carrusel y fotos de estrellas del cine en la pared) con la cara de la mesera desenfocada y recorte propio para celular; el salón pasó al hero.

## No aplicado (y por qué)
- **Renombrar el chip a "Cervezas y refrescos" (cambio 10):** la decisión 6 pide separar refrescos en su chip "Sin alcohol"; se hizo eso.
- **"Sangría... sin 2x1" marcando renglones en la carta (alternativa del cambio 7):** se usó la letra chica literal de su carta.
- **Foto de Tampiqueña o Arrachera con precio en el pie:** no se puede confirmar qué corte es en las fotos de clientes; pies neutros.
- **Retratos de actrices en la pared/pantallas:** se quedan (decisión 5: es su decoración real en una foto real).
- **Widget de hora en vivo "gastado":** el reloj es el componente firma de la hoja; no se cambió.
- **og.jpg:** se dejó igual (es la referencia que sí emociona).

## Verificación
- krevo-shot m: 0 alertas, alto 8,654 px (Botanas abierta). Alto por categoría en celular: Cocteles 8,915 (la más larga) · Cervezas 8,673 · Botanas 8,654 · Carnes 8,638 · Destilados 7,999 · resto menos de 7,800. Todas bajo 9,000.
- krevo-shot d: 0 alertas, alto 7,115 px, fuentes reales cargadas.
- Flujo probado con JS: Carnes +, Cervezas + x2, Sin alcohol +, barra "Mi mesa", Elegir Nacozari, personas +2, 11:00 p.m. hoy (aviso "Nacozari ya cerró"), Mañana (jueves, abre hasta las 2 a.m., aviso desaparece), nombre Ana. Mensaje: `Hola La Cantina de Antaño, quiero apartar mesa en Nacozari para 6 personas mañana a las 11:00 p.m. Pensamos pedir: 2 x Parrillada norteña 4 personas, 2 x Cubeta de 6 Corona/Light/Victoria/Pacífico, Refresco. Nombre: Ana` (la parrillada salió x2 porque el script de prueba la tocó dos veces).
- Hora inicial: `?hora=21:30` propone 10:00 p.m. hoy; `?hora=23:40` pasa a mañana 8:00 p.m.; `?hora=15:00` deja 8:00 p.m.
- Hojas de contacto: `scratchpad/cantina-fix/hoja-celular.jpg` y `hoja-compu.jpg`.

## Ojo
- En compu la foto de Época (barra-02, foto de celular subida con Real-ESRGAN) se ve algo suave a 1440 px. Sirve de muestra; lo arreglan las fotos profesionales pendientes.
- Los desenfoques de caras del salón se notan como manchas chicas al fondo del hero.
