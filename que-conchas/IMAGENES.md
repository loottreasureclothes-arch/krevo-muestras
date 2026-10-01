# Imágenes · Que Conchas! (todo viene de research/fotos/, sin IA generativa ni stock)

Tratamientos hechos con PIL, OpenCV y Real-ESRGAN. Todo en `img/` como webp.

| Archivo(s) en img/ | Origen | Tratamiento | Dónde se usa |
|---|---|---|---|
| hero-pan-640/960/1400.webp | ig-20-pan-muerto-lotus-a (2649x3254) | Recorte del pan con GrabCut (el frasco y la caja Biscoff quedan fuera), huecos rellenados, máscara suavizada; PNG con alfa → webp 640/960/1400 | Hero (octubre y noviembre), ficha de oct/nov, og.jpg |
| mes-ene-480/900.webp | ig-01 | Recorte 4:5 de la parte alta (queda fuera la tarjeta ajena del centro) | Ficha de enero, hero de enero |
| mes-feb-480/900.webp, cierre-640/1200.webp | ig-04 | Recorte 4:5 | Ficha de febrero; foto grande del cierre |
| mes-abr-480/900.webp | ig-07 | Recorte 4:5 | Ficha de abril |
| mes-may-480/900.webp, des-ig11-640/1200.webp | ig-11 | Recorte 4:5 | Ficha de mayo; foto grande de desayunos |
| mes-jun-480/900.webp | ig-11 | Recorte 4:5 de la parte alta (globo y moño, sin letreros de "MAMÁ"); no hay foto del Día del Padre | Ficha de junio |
| mes-ago-480/900.webp | ig-16 | Recorte 4:5 | Ficha de agosto, círculo de rellenos |
| mes-sep-480/900.webp | ig-18 | Recorte 4:5 | Ficha de septiembre |
| mes-todo-480/900.webp | fb-01 (736x802) | Real-ESRGAN x4 (realesrgan-x4plus) mezclado 50 % con LANCZOS y grano fino, recorte 4:5 | Ficha de marzo, julio y diciembre; círculo de rellenos |
| rel-ig17-480.webp | ig-17 | Tal cual (720x960) | Círculo de rellenos |
| des-ig13-480/640.webp | ig-13 | Tal cual (3:4), se muestra en 4:5 | Rejilla de desayunos (banderita "Personalizado") |
| des-ig03-480/640.webp | ig-03 | Tal cual (vertical) | Collage de desayunos |
| foot-ig07-240.webp | ig-07 | Recorte cuadrado de la concha con duyas (sin el sticker grande), LANCZOS | Pie de página (cambiada en la corrección 1; foot-ig09-240.webp ya no se usa) |
| logo-112.webp, logo-360.webp, favicon-32.png, apple-touch-icon.png | logo-fb-720 | Recorte circular exacto (sin esquinas blancas); no se redibujó ni se subió | Header, pie, favicon |
| og.jpg (1200x630) | ig-20 recortada + logo | PIL con Young Serif y DM Sans | Tarjeta de WhatsApp / Facebook |

No se usaron (según la hoja): fb-02 a fb-06, fb-07, fb-08, ig-10 (persona), ig-14, ig-15, ig-19, ig-24, ig-25, ig-02, ig-05, ig-06, ig-08, ig-12, ig-21 a ig-23.
Fotos que venden: ninguna lleva loading="lazy" (solo el logo y la foto del pie).

Dibujos: la concha que se abre (sección 30) es SVG vectorial hecho a mano (degradados, surcos, azúcar); no es foto ni IA.
