# CORRECCIÓN 2 · Constructora San José Premier (corrector de segunda vuelta, 30 sep 2026)

Base: `REVISION-2.md` (12 cambios) + 7 decisiones del orquestador. Todo se editó en `sections/`, `site.css`, `template.html` e `img/`; `index.html` sale de `python3 build.py`. Sin IA generativa ni stock: las fotos nuevas son portadas o cuadros de sus videos públicos de TikTok (detalle en `IMAGENES.md`).

## Aplicados
1. **Hero con tt-21.** `hero-tt21-*`: mitad limpia de la portada (cantera con veta, ventanal con barandal de vidrio, cielo azul y el muro de ladrillo del vecino). Sin letras ni chip encima de la foto: se quitó el pie "Casa de dos plantas terminada · cuadro de su video". El velo solo cubre el 40 % de abajo, así que el cielo se queda azul. En celular la foto va en 5:4 a lo ancho y el título empieza donde termina la foto. En compu ocupa la mitad derecha y se ven el bloque de cantera, el barandal y la ventana. El subtítulo va en dos renglones fijos: "Constructora desde 2000" y "Infonavit, Fovissste o hipotecario". Se actualizaron el preload y `og.jpg`, que ahora usa tt-21.
2. **Ladrillo: plano → ladrillo → casa de verdad.** Antes de empezar se ve la casa como plano en línea gris piedra: contorno, pretil, bloque de piedra punteado, ventanas con travesaño y puerta. Ya no queda el hueco. Las hiladas siguen igual: ligadas al scroll, reversibles y sin pin. Al terminar, la clase `is-done` hace un cruce de 400 ms a la foto real de la fachada (`lad-final`, recortada al 1.37:1 del muro). Tiene histéresis, para que no parpadee, y es reversible (probado: entra en "e" y sale al volver a "b"). Se quitó el vector "aplanado". Con reduced-motion o sin JS se ve la foto. Se recortó el `padding-top` de la sección de 56 a 22 px.
3. **Interiores en tira deslizable.** Son 6 fotos grandes: Escalera, Cocina, Sala, Recámara, Baño y Patio de lavado. Miden 72vw en celular (máximo 340 px) y 260 px en compu, en 4:5, con scroll-snap y sin travesaño. Los rótulos son neutros, en DM Sans 600 de 13 px en mayúsculas, sin "principal" ni "completo". Lleva el renglón "Así queda por dentro." y la indicación "Desliza". En compu va a todo lo ancho debajo del bloque Ladrillo: se ven 4 y se asoma la quinta.
4. **Ficha "Una planta" con tt-30**, la casa de su video más visto. El pie dice "La casa de su video más visto: 276 mil vistas." No se dice que sea la Granada; quedó anotado en PENDIENTES. En celular la foto de la ficha pasa a 5:4 (antes 5:5.3): los dos estados siguen midiendo lo mismo y el interruptor no brinca. El patio de concreto (`casa-una-planta`) salió de la página.
5. **Bosques.** La foto grande es el cuadro 015 de v05, de y 470 hacia abajo: se ve el parque y la fila de casas blancas. Pie: "Bosques Providencia desde el dron". Velo solo en el 40 % de abajo. Abajo va el renglón "Ya tiene:" con 3 fotos en 4:5 (Cancha, Aparatos de ejercicio y Andador), sacadas de su video "Esto es lo nuevo en Bosques Providencia".
6. **Cierre con la foto de lo elegido.** Es una foto de 16:9 arriba de la ficha que cambia con un cruce de 250 ms: Una planta → tt-30, Dos plantas → dos-plantas-frente, Excedente → excedente-patio y Terreno → terreno-sur. Sin elegir, se ven las dos casas en línea. El botón verde de la ficha dice "Mandar por WhatsApp" y cabe en un renglón. "Elegir modelo" pasó a contorno y cambia a "Cambiar modelo" cuando ya hay elección.
7. **Pie que remata con el dron.** Banda a sangre (256 px en celular, 420 en compu) con el cuadro 014 de v09: cielo, sierra, campos y casas blancas. Encima va el lema "Casas al sur / de Aguascalientes." con la segunda línea en dorado, y el pie "Vista con dron". El contacto quedó compacto en 2 columnas (Teléfonos | Escríbenos y redes) y las direcciones van en un renglón cada una. Abajo, el logo y una sola nota: "Muestra de diseño hecha por KREVO. Fotos tomadas de los videos públicos de la constructora."
8. **Pies de foto limpios.** Ya no queda ningún "cuadro de su video" ni "Cuadros de sus videos" (verificado con grep en index.html). Son de 12 px, sin caja gris, con `text-shadow` sobre un velo corto.
9. **Frases de sus videos, confirmadas antes de usarlas.** Las anoté en `research/hechos.md` (sección nueva, con la URL de cada video y su segundo). Son texto en pantalla en los cuadros 005-015 de v08 (7648858278222433556), 010-013 de v09 (7658892646030511380) y 010-014 de v04 (7644034241335971093, identificado por su duración de 90 s).
   - Lede de Modelos: "La Granada, de una planta, o la casa de dos plantas en 7 x 20.25 m." Así no se lee como "Granada de dos plantas".
   - Ficha Terrenos: "Te podemos vender el terreno o construirte cualquiera de nuestros modelos. Estos terrenos están a 5 minutos del centro comercial Villa Asunción." La foto de esa ficha es del mismo video v08.
   - Ficha Excedente: "Excedente de terreno listo para tus reuniones."
   - Letrero: "Este es nuestro letrero." (ver No aplicados). En PENDIENTES quedó "dónde está el letrero SNjp".
10. **Ritmo.**
    - El hero queda más corto y sin el chip.
    - `--sec-y` pasa de 52 a 48 en celular.
    - `int. 202` va con `nowrap` en Oficina y en el pie.
    - El flotante ya no tapa "Pregunta precio y disponibilidad": se agregó `padding-right: 64px` a menos de 600 px.
    - Las fotos de las fichas chicas pasan a 2:1 para pagar el alto.
11. **Hilada.** En el header compacto la línea es de 10 px con dos filas de 4 px en aparejo y junta de 2 px. Los ladrillos ya colocados van en dorado y los que faltan en gris piedra al 35 %. La hilada del pie va en dorado tenue.
12. **Estados al tocar.** La ficha guardada se marca entera: la franja pasa a dorado y la esquina en L sube a 3 px (clase `is-saved`). `.sj-btn--line:active` tiene fondo azul al 12 %.

## No aplicados o cambiados (y por qué)
- **"Este es su letrero." → "Este es nuestro letrero."** La página habla en primera persona ("Construimos con ladrillo", "Dinos con qué crédito compras"), y "su letrero" sonaría a que lo dice otra persona. Tampoco dice dónde está el letrero, porque no consta.
- **Rótulos "RECÁMARA PRINCIPAL" y "BAÑO COMPLETO".** Se dejaron neutros ("Recámara", "Baño") por la decisión 3 del orquestador y porque "completo" es una afirmación que no está confirmada.
- **Cancha:** el inspector pedía el recorte del cuadro 009 desde y 36 %, pero así el tablero se pierde. Se recortó desde y 470 (24 %), justo debajo de la letra, para que sí salga el tablero. El rótulo es "Cancha" y no "Cancha techada", para dejarlo neutro.
- **Foto grande de Bosques:** se usó el cuadro 015 y no el 016. El 016 recortado debajo de la letra solo enseña parque, domo y bodegas; el 015 sí enseña la fila de casas.
- **Pie de la banda del dron:** dice "Vista con dron" y no "...de su video", por la decisión 5 (una sola nota al pie). No dice "al sur" porque el cuadro no lo rotula.
- **Hero sin Real-ESRGAN**, como pidió la revisión. En compu se ve un poco blando porque el original mide 850 px de alto.
- **Tira de interiores a 72vw:** en celular cada foto mide 351 px de alto, no ~310. Se respetó el ancho que pidió el orquestador y el alto se compensó en otras partes.

## Verificación
- **krevo-shot celular:** **8,756 px**, 0 alertas, sin scroll horizontal, consola limpia, sin 404, solo DM Sans y DM Serif Display. Tras elegir Dos plantas, "Me interesa", Infonavit y nombre: **8,929 px** (tope 9,000).
- **Compu 1440:** 7,755 px, 0 alertas. **820 px:** 9,734 px (tableta; el tope es de celular).
- **Flujo (390 px).** URL decodificada, igual en el formulario y en el cierre: `https://wa.me/524491552309?text=Hola San José Premier, me interesa una casa de dos plantas (130.36 m² de construcción). Compro con: Infonavit. Me gustaría agendar una visita. Mi nombre: Laura Pérez`. El cierre cambia a "Tu casa ya tiene plano." con la foto de dos plantas, el botón dice "Cambiar modelo" y la ficha queda marcada `is-saved`. Al cambiar a Una planta, la foto del cierre cruza a tt-30.
- **Ladrillo:** con el plano visible (a-d) `#sj-final` está en opacidad 0 y oculto. En e y f queda `is-done` con opacidad 1. Al volver a b se quita `is-done`.
- **Capturas** en `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/r2fix-san-jose-premier/`:
  - Celular: `m/` y hoja `hoja-celular.jpg`.
  - Compu: `d/` y hoja `hoja-compu.jpg`.
  - 820 px: `w820/` y hoja `w820/hoja-820.jpg`.
  - Flujo y ladrillo: `t2/` y hoja `hoja-flujo-ladrillo.jpg`.
- Sin git commit ni push.
