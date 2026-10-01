# CORRECCIÓN 4 · Constructora San José Premier (última pasada puntual, 30 sep 2026)

Todo se editó en `sections/`, `site.css`, `template.html` e `img/`; `index.html` sale de `python3 build.py`. Sin IA generativa ni stock. No se tocaron precios, medidas, teléfonos, direcciones ni requisitos.

## 1. Fotos suaves en compu
- **Hero (fachada de dos plantas).** Se revisaron los 120 cuadros de los primeros 2 s del video v03: el cuadro 001 ya era el más nítido. Se reexportó desde su x4 con contraste local suave, un poco de color y enfoque ligero, webp q88 (1600 pasó de 48 a 105 KB) y se agregó una versión de 2000 px para compu retina. Ya no se ve lavado.
- **Banda de dron del pie.** Se reexportó con el mismo realce suave. En compu ya **no va a sangre**: el cuadro de video es de 1080 px y a 1440 se estiraba. Ahora va en un marco de 620 px a la derecha, con filete dorado, y el remate queda sobre marino. En celular sigue a sangre (ahí no se estira).

## 2. Textos sobre fotos y titular repetido
- Los rótulos sobre foto ("Los últimos terrenos, desde el dron", "Bosques Providencia desde el dron", "La casa de nuestro video más visto...", "Obra en proceso", "Vista con dron") van en una **placa marino al 84 % con filete dorado a la izquierda**. Se leen sobre cualquier techo.
- **Bosques.** El velo empieza antes: 34 % → 55 % → 86 %, en vez de empezar al 58 %. La sombra del título es más firme. "Bosques" ya se lee sobre el parque.
- **Pie.** El remate ahora es "Constructora / desde 2000." (dato de la hoja). "Casas al sur de Aguascalientes." queda una sola vez en la página, en el hero.

## 3. Cierre y Modelos
- **Cierre sin elegir.** El título dice "Elige una planta / o dos.". Ya no hay tabla ni botón "Elegir modelo". Quedan las dos casas como dos botones grandes (rótulos de 56 px de alto con la medida en dorado) y el verde "Mandar por WhatsApp", que es el único verde de la sección.
- Al elegir, todo sigue como antes: "Tu casa / ya tiene plano.", la ficha, el interruptor de Modelos y el mensaje.
- Si falta el crédito, la fila dice "Lo vemos por WhatsApp", no "Falta elegir". En compu el título va en dos renglones (no se parte en tres).
- **Modelos en compu.** El párrafo queda pegado al título: columna automática más 34ch, con 56 px de separación. Antes estaba en media pantalla.
- **La Granada en compu** usa un recorte nuevo sin el cielo (`granada-d`, x4). Se ve la casa con su marco de piedra, la marquesina, el ventanal y la puerta. En celular no cambió.

## Verificación
- krevo-shot celular: **8,548 px, 0 alertas**, solo DM Sans y DM Serif Display.
- krevo-shot compu (1440): **7,689 px, 0 alertas**.
- 820 px: 9,535 px (tableta), sin scroll horizontal.
- Flujo a 390 px:
  - Al tocar "Dos plantas" en el cierre, el título cambia a "Tu casa ya tiene plano.", el interruptor pasa a 2 y aparece la tabla.
  - Con Infonavit, el mensaje sale así: `https://wa.me/524491552309?text=Hola San José Premier, me interesa una casa de dos plantas (130.36 m² de construcción). Compro con: Infonavit. Me gustaría agendar una visita.`
- Hojas en `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/r4fix-san-jose-premier/`:
  - `hoja-celular.jpg`, `hoja-compu.jpg` y `hoja-820.jpg`.
  - Antes y después del hero: `hero-antes-despues.jpg`.
- Sin git commit ni push.
