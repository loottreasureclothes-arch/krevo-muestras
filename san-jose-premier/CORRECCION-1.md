# CORRECCIÓN 1 · Constructora San José Premier (corrector, 30 sep 2026)

Base: `REVISION-1.md` (15 cambios) + precisiones del orquestador. Todo se editó en `sections/`, `site.css`, `template.html` e `img/`; `index.html` sale de `python3 build.py`. Sin IA generativa: todas las fotos nuevas son cuadros de sus videos de TikTok (recorte + Real-ESRGAN x4 + PIL), anotados en `IMAGENES.md`.

## Aplicados

1. **Hero con fachada.** Nueva `img/hero-fachada-*`: la fachada de dos plantas del og (v03, cuadro 001, cortada antes de la letra). En celular la foto va completa a lo ancho (alto `min(70svh, 104vw)`) y el título cae sobre el velo de abajo; se ve la casa entera, no el patio. Pie honesto: "Casa de dos plantas terminada · cuadro de su video". Preload del template actualizado.
2. **Galería de 3 interiores** en `30-ladrillo`, debajo de la foto de obra: escalera (v03-008), sala con muro de piedra (v01-028) y baño (v02-024). Renglón "Así queda por dentro." y pie "Escalera, sala y baño. Cuadros de sus videos." Sin manos, caras ni letras.
3. **Modelos en marino.** La sección pasa a `--navy`, título blanco cal con "o dos." en dorado; las fichas quedan en blanco cal. El interruptor lleva filete dorado y el renglón "Guardada para tu mensaje" va en blanco cal.
4. **Silueta de Una planta.** El segundo piso queda dibujado en punteado azul con la etiqueta "TOCA DOS PLANTAS"; tocar la silueta cambia a Dos plantas. Con Dos plantas el piso sólido sube igual que antes (250 ms) y el punteado se apaga. La ficha sigue midiendo 870 px en los dos estados.
5. **Ladrillo que se ve construir.** El avance ya no depende de 0.58 de pantalla: arranca cuando la casa asoma por abajo y termina antes de llegar al header, así toda la obra pasa con la casa completa a la vista (560 px de scroll en celular, antes ~380). El título "Construimos con ladrillo." está en `opacity: 0` hasta que cae (se quitó el fantasma al 6 %).
6. **Fachada final con su cara real.** El SVG `#sj-final` ahora tiene el bloque de piedra gris que sobresale del pretil con veta, el ventanal hundido con travesaño y barandal de vidrio, ventana de arriba con travesaño, planta baja con dos ventanas y puerta, cristal azul marino con reflejo (no negro), la franja gris oscura del costado y una hilada de ladrillo asomando en la base. Se recortó el `viewBox` (quita ~70 px de hueco entre "LADRILLO POR LADRILLO" y la casa) y el `clipPath` sigue los huecos nuevos.
7. **Travesaño de ventanal** centrado al 50 % y a 35 % de opacidad. Se quitó en las fotos de las fichas chicas (patio y dron) y en el letrero, donde cortaba letras; queda en la galería de interiores.
8. **Foto de Terrenos.** Nueva `terreno-sur-*` (v08-terrenos, cuadro 006): terreno parejo junto a las casas blancas y la calle, cortado arriba de la letra y del montón de cascajo. Ya no sale obra negra.
9. **Minis:** "Pregunta precio y disponibilidad" en un renglón; se quitó la nota repetida de Terrenos.
10. **"Desde 2000"** sale una sola vez por pantalla en compu: se quitó el eyebrow del hero (quedan la placa y el subtítulo).
11. **Obra de ladrillo blanda:** de 600 px para arriba va en marco de máximo 520 px (5:4), no a todo lo ancho. No había un cuadro más nítido sin la persona: v06-015 tiene a la mujer encima de la planta baja.
12. **"Todavía no sé"** igual en el modelo y en el crédito.
13. **Alt** de la ficha Una planta: "Casa de una planta terminada: patio con marquesina y cancel de aluminio". El hero tiene su alt nuevo de fachada.
14. **Ícono de Instagram oficial** (cuadro redondeado, círculo y punto en trazo) en el `<symbol id="i-ig">` del template; se usa en "Busca el letrero" y en el pie.
15. **Dos "Modelos" azules:** en celular el botón MODELOS del header se esconde mientras la página está arriba y aparece al compactar. El hero se queda con VER MODELOS.

Extra (petición del orquestador, "la misma casa no puede salir 3 veces"): la ficha "Casa con terreno excedente" cambió a `excedente-patio-*` (v04, el video del "excedente de terreno listo", otra casa), y la ficha Dos plantas usa otro cuadro (`dos-plantas-frente-*`, v03 cuadro 002) para que no repita la foto del hero. En las primeras pantallas: hero = casa de dos plantas, ficha = casa de una planta, excedente = otra casa.

## No aplicados (y por qué)

- **Opcional "Falta elegir modelo." → "Elige tu casa."**: la hoja de dirección fija ese texto y el inspector lo marca como decisión de Emanuel, no error. Se queda.
- **Hero con dron (alternativa)**: se eligió la fachada porque dice "constructora" de inmediato y es la del og; el dron no consta que sean todas sus casas.
- **Que la obra dure una pantalla completa**: con la casa de 214 px de alto en celular, el único tramo en que se ve completa mide ~560 px (viewport menos casa menos header). Alargarlo más haría que las primeras hiladas se pongan fuera de pantalla o que la fachada final se termine debajo del header; sin pin (prohibido) es lo máximo que se ve. En compu son ~470 px.
- `terreno-excedente-*` y `terrenos-aerea-*` quedan en `img/` sin uso (no borré archivos).

## Verificación

- krevo-shot celular: **8,468 px** (8,641 tras elegir modelo y aparecer "Guardada"), 0 alertas, sin scroll horizontal, consola limpia, 0 404, 0 botones chicos, 0 guiones largos, 0 emojis, solo DM Sans y DM Serif Display. Compu: 6,513 px, 0 alertas. A 820 px: 9,136 px, sin scroll horizontal.
- Flujo (390 px): Dos plantas → Me interesa → Infonavit → "Laura Pérez". URL decodificada: `https://wa.me/524491552309?text=Hola San José Premier, me interesa una casa de dos plantas (130.36 m² de construcción). Compro con: Infonavit. Me gustaría agendar una visita. Mi nombre: Laura Pérez`. El botón del cierre lleva la misma URL y el título cambia a "Tu casa ya tiene plano."
- Ladrillo: título en opacidad 0 al 20, 50 y 80 % del avance; fachada a 0.5 al 80 %; fachada y título completos al 90 %; reversible.
- Capturas en `/private/tmp/claude-501/-Users-emmanuelcruzsalas/b9faa90f-ee10-4c60-bbac-8709a2bea114/scratchpad/sanjose-fix/`: `m/`, `d/`, `w820/`, `t/` (ficha), `t2/` (etapas del ladrillo), `t3/` (flujo); hojas `hoja-celular.jpg`, `hoja-compu.jpg`, `hoja-820.jpg`, `hoja-t2.jpg`.
- Sin git commit ni push.
