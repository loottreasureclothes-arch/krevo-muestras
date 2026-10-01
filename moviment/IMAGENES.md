# MoviMent: imágenes (origen y tratamiento)
Todo es propio de MoviMent (Google Maps subidas por el negocio, su Facebook y cuadros de sus reels). Cero stock, cero IA generativa. Real-ESRGAN solo en ludoteca-1280 (recorte de 640 px, mezclado 50 % con el original); las demás de Maps ya son nítidas y las de reel son blandas por el movimiento. Webp con srcset a la talla real que se pinta; ninguna foto que vende lleva `loading="lazy"`.

| Archivo(s) en img/ | Origen en research/fotos/ | Tratamiento | Dónde |
|---|---|---|---|
| hero-d-960/1600.webp | maps-03.jpg (1600x1200) | tal cual, a webp | Hero compu, 4:3 |
| hero-m-480/800.webp | maps-03.jpg | recorte 4:5 (x 380 a 1180, y 180 a 1180): menos muro, más agua y escalera (corrección 1) | Hero celular |
| sello-120/320.webp, sello-512.png, favicon-32.png, apple-touch-icon.png | logo-fb-perfil.jpg (1792) | máscara circular con PIL al borde del morado, sin redibujar nada | Header 44 px, hero 104/150 px, pie 160 px, favicons |
| puerta-fisio-360/720.webp | maps-04.jpg | recorte vertical 5:7 | Puerta Fisioterapia |
| puerta-nutri-360/720.webp | reel-tour-consultorio-escritorio.jpg | recorte 5:7 del librero y escritorio (x 0 a 760, y 60 a 1124), autocontraste, color +12 %, enfoque suave (algo movida; se pide foto nueva) | Puerta Nutrición |
| puerta-psico-360/720.webp | reel-tour-consultorio-psico.jpg | recorte 5:7 del sillón verde y la palmera (x 120 a 880, y 420 a 1484), autocontraste, color +12 %, enfoque suave | Puerta Psicología |
| grua-540/1080.webp | reel-tanque-grua-02.jpg (1080x1920) | `cv2.inpaint` sobre el muro liso para borrar el colgador rojo y su gancho (zona x 465 a 635, y 500 a 675); el brazo, el malacate y la polea se quedan | Momento firma, capa base |
| grua-colgador.webp | reel-tanque-grua-02.jpg | colgador rojo recortado con alfa (167x175), se mueve con CSS sobre un cable de 1.5 px | Momento firma, capa móvil |
| chorros-440.webp | reel-tour-tanque-chorros.jpg | recorte a 440 px de ancho | Foto chica del tanque ("Los chorros del tanque") |
| dentro-960/1600.webp | maps-01.jpg | recorte 16:10 | "Villa Jardín, por dentro" |
| ludoteca-640.webp | maps-05.jpg | recorte x 0 a 640, y 8 a 880: quita a la NIÑA de espaldas (x ~680 a 745) y las barras negras de la captura; verificado a ojo, no queda ni un pedazo. ludoteca-1280.webp: Real-ESRGAN x4 sobre ese recorte, mezclado 50 % con LANCZOS + grano fino (para compu) | Ludoteca |
| ludoteca-peluches-440.webp | reel-tour-ludoteca-02.jpg | recorte a 440 px | Collage chica |
| equipo-440.webp | reel-equipo-fisioterapeutas.jpg | recorte a 440 px; va CHICA (permiso pendiente, ver PENDIENTES.md) | Collage chica |
| letrero-540/1040.webp | reel-tour-letrero-iluminado.jpg | franja del muro con el letrero (y ~690 a 1110), sin cielo quemado ni cajones de estacionamiento; autocontraste y enfoque suave; se pinta a máx. 420 px / 80 % | Visita |
| pasillo-540/840.webp | reel-tour-pasillo.jpg | recorte 4:5, autocontraste, color +8 %, enfoque suave | Remate con el lema |
| og.jpg (1200x630) | maps-03.jpg + logo | PIL: lienzo índigo #1D1B33, disco del sello a 150 px, titular en Urbanist 300/700 (bajada de Google Fonts), foto del tanque a la derecha con cenefa de venecita | og:image y twitter:image |
| (CSS) 00-venecita.css | agua y mosaico del tanque (maps-03, reel-tanque-grua-02) | cenefa de cuadritos en 4 tonos medidos con PIL + un morado del sello cada nueve; la genera `gen_vn.py` | Divisores, bordes de foto, header, botones |

Descartadas por la hoja de dirección: maps-02 y maps-06 (duplicados), reel-gimnasio-vacio (persona), reel-tour-ludoteca-01 (marco de puerta), reel-tanque-escalera y reel-tanque-borde (flojas), reel-tour-fachada-letrero (inauguración, logo cortado), fb-portada-ludoteca-letras (letras encimadas), logo-lema-tu-salud-en-armonia (typo "salúd"), todo _graficos/ (stock y modelos) y todo _videos/ (pacientes, niños e invitados).
