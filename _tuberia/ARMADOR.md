# ARMADOR (Sonnet): dirige y construye en una sola pasada

Lee SOLO esto, en este orden: `CANON.md` (misma carpeta), `research/hechos.md`, `research/resenas.md`, `research/FOTOS.md`, `research/colores.md`, y mira `research/fotos/_hoja.jpg` UNA vez. Corre `python3 _tuberia/componentes.py` para saber qué componentes ya se usaron. No leas otros sitios ni otros documentos.

## 1. Hoja corta (máximo 2 KB) en `<sitio>/HOJA-CORTA.md`
Decide, no enumeres opciones:
- Trabajo de la página: la acción en 1 toque y el wa.me exacto (confirmado o a PENDIENTES).
- La promesa: una frase con SUS datos o palabras.
- Identidad: lienzo, color de marca medido, dos tipografías de `_tuberia/FUENTES-INDICE.md` (que no sean de la última muestra), la forma de su mundo para contenedores y fotos, el header propio.
- Componente firma (qué hace, con qué fotos o datos, mensaje de WhatsApp literal) y momento firma (una línea).
- 8 secciones + pie (con TODOS los BLOQUES OBLIGATORIOS del CANON): `NN-slug` | foto grande | título a dos tonos literal.
- Fotos prohibidas y PENDIENTE-DUEÑO.

## 2. Construir
- `mkdir -p sections img fonts`; `cp` de `./hodo-tu-proximo-viaje/` SOLO `build.py` y `site.js` (mecánica: hamburguesa, flotante de WhatsApp con logo SVG, reveal con 1.6 s, anclas, `data-hide-wa`). No leas ni copies `site.css` ni `template.html` de hodo: escribe los tuyos desde la hoja. Si necesitas saber cómo se llama un gancho de `site.js`, usa `grep -n`.
- Escribe cada sección de una vez, completa. `python3 build.py` después de cada 2 secciones.
- Imágenes: PIL a webp 480/960/1600 (o la talla real máxima). Una foto grande por sección.
- og:image 1200x630 con PIL y la tipografía de la hoja; favicon-32 y apple-touch-icon.
- `PENDIENTES.md` (al final, una línea para COMPONENTES-USADOS.md: `| slug | componente | fecha |`) e `IMAGENES.md` corto.
- `.gitignore` con `_work/`, `backup/`, `research/_videos/`.

## 3. Verificar (barato)
- krevo-shot `m` y `d` con `| tail -3` hasta `alertas: []`; alto en celular entre 8,000 y 11,000 px y todos los BLOQUES OBLIGATORIOS (mapa embebido, 6+ reseñas, botones).
- `python3 _tuberia/hoja.py <scratch>/s <scratch>/hoja.jpg` y mírala UNA vez. Arregla lo que se vea mal y repite máximo una vez más (máximo 3 imágenes vistas en todo el paso 2 y 3, sin contar `_hoja.jpg`).
- Prueba el componente firma y decodifica la URL de wa.me (python `urllib.parse.unquote`).

Devuelve solo el JSON: slug, alto_celular_px, verdes, wa_url, alertas, hoja, no_pude.
