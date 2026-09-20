# FEEDBACK 2 (Emanuel, 20 sep 2026, por voz)

"El diseno esta bien." El acomodo de tienda le gusto. Faltan tres cosas y son las que mas importan.

## Arreglar
1. **BUSCADOR.** "Nomas ponle buscar. El buscador en Muebles Alba, pues no tiene buscador. Que onda con eso, padrino?"
   Una tienda sin buscador no es tienda. Campo de busqueda visible (en el header y arriba del catalogo), que filtre por nombre y por tipo mientras escribes, sin recargar. Si no hay resultados, decirlo y ofrecer preguntar por WhatsApp.
2. **PAGINA DE CATALOGO COMPLETA.** "Catalogo, y no los manda a... o sea, muestra bien poquito catalogo. La cagas ahi. No mostrar bien el catalogo. Es como una tienda en linea. Donde esta la otra pagina de catalogo?"
   Crear `catalogo.html`: TODAS las piezas (los 76 muebles), con su buscador, sus chips de categoria, precio, precio tachado y "+". Mismo header y mismos colores. El renglon "Catalogo" del menu y el boton "Ver los 76 muebles del piso" llevan AHI, no a un ancla de la principal. En la principal se queda la muestra por categoria como esta hoy.
3. **Cambiar las fotos mas feas.** "Estan bien pinches feas las fotos. Hay que cambiar las que esten mas culeras, porque si hay unas fotos bien putas, feas."
   Haz una lista de las peores (borrosas, oscuras, chuecas, con fondo sucio) en un archivo FOTOS-FEAS.md con el nombre del archivo y que tiene de malo. El orquestador las regenera partiendo de esas mismas fotos y te las deja en img/.
4. **Menos animacion.** Ver la nota global.

## Lo que ya esta bien (no tocar)
- El acomodo de banner, productos, banner, productos. Los cuadritos de color. Los precios tachados. "Lo que ves aqui, te lo llevas hoy."

---

# NOTA GLOBAL 2 (Emanuel + su socio, 20 sep 2026)

**1. Menos animacion.** "Dice mi compa que no hay que meterle tanta animacion, para que no se traben y esten ligeras."
Regla: **si una animacion no se nota, se borra.** Se quedan solo las que ensenan algo del negocio. Emanuel puso el ejemplo de lo que SI vale: el letrero de iPrint que se enciende con el scroll ("eso si esta bien chido"). Todo lo demas que sea un fade o un desplazamiento chiquito que el ojo ni registra, fuera. Menos JavaScript corriendo en el scroll = pagina mas ligera y sin tirones.

**2. Secciones y paginas aparte, no todo apretado en la principal.** El socio: "la seccion principal no es como que tengas ahi todo; tienes que hacer secciones aparte para que aparezcan todos y se vea mejor."
Ya se hizo con las paginas de menu de los restaurantes. Ahora aplica igual a los catalogos grandes: si el negocio tiene muchas piezas, la principal ensena una muestra y **hay una pagina propia con TODO**.

**3. Fotos.** Emanuel sobre Everclean: "Donde hay fotos? Ya no estas generando fotos, ya no estas haciendo nada."
Se vuelve a generar imagen, PERO siempre **partiendo de la foto real del negocio** (imagen a imagen, para limpiarla y subirle la calidad), nunca inventando producto, local ni servicio que no exista. El pie de pagina dice que las fotos son suyas mejoradas en resolucion.
