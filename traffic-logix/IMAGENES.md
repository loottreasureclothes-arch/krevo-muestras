# IMAGENES (GTLO)

Todas son fotos reales del negocio (Wix, Facebook). Cero IA, cero stock del Wix (se descartaron wix_carretera_stock, wix_aeropuerto_stock y wix_playa_stock). Real-ESRGAN x4 (nunca x2) solo en las tres grandes y luego bajadas con PIL a 1600.

| Archivo en img/ | Origen | Uso | Tratamiento |
|---|---|---|---|
| hero-480/960/1440.webp | research/fotos/wix_nissan_urvan_flotilla.jpg (1440 px) | Hero (sin lazy, fetchpriority alto). En celular va la foto ENTERA bajo el pórtico (Urvan 116 completa y la fila 125/123) | SIN reescalar (la versión Real-ESRGAN se veía plástica en compu). Placa tapada con un marco negro del mismo tamaño (como portaplacas vacío); logo de la fachada quitado con cv2.inpaint |
| personal-480/960.webp | wix_fila_vans_hiace_urvan.jpeg (1194 px) | Servicio Personal empresarial | Solo redimensionada; etiqueta UNIDAD 114 (se lee en la foto) |
| aeropuerto-480/960/1200.webp | fb_09.jpg (1600 px) | Servicio Aeropuerto, pie "Sprinter lista para abordar." | Recorte (258,452)-(1238,1150): solo la Sprinter 152 con la puerta abierta; fuera el estadio, su pantalla y la gente. Placa tapada con marco negro. Real-ESRGAN x4, bajada con PIL a 1200 y mezclada 35% con la original para que no se vea plástica. NO se dice que sea un aeropuerto |
| turismo-480/900.webp | wix_urvan_sierra.jpeg (900 px) | Servicio Turismo | Placa y marco de agencia tapados con marco negro del mismo tamaño |
| ejecutivo-480/960/1200.webp | wix_hiace_detalle_logo.jpg (1356 px) | Servicio Ejecutivo, pie "Foto de su unidad ejecutiva: pendiente de GTLO." | Recorte 4:3 del cofre con el logo GTLO (banda de detalle real). Real-ESRGAN x4 + mezcla 35%. La Suburban del Wix (wix_suburban_ejecutivo.png) se QUITÓ: es foto de prensa del fabricante, no de GTLO |
| flotilla-480/960/1600.webp | fb_01.jpg (1262 px) | Foto grande de "Siempre impecables." y foto por defecto bajo la señal en compu | Real-ESRGAN x4 + mezcla 35% con la original; sin parches (las placas salen de canto y no se leen) |
| logo.png | wix_logo_gtlo.jpg (2200x1700) | Header, pie, og | Fondo blanco quitado con PIL (alfa suave); se usa sobre señal blanca porque el texto del logo es casi negro |
| favicon-32.png, apple-touch-icon.png | emblema del logo | Favicon | Recorte del emblema sobre señal blanca |
| og.jpg (1200x630) | hero + logo | Tarjeta de WhatsApp/Facebook | PIL: urvan con flotilla, logo y "Transportarte es nuestra especialidad." |

Reglas de carga: ninguna foto que vende lleva loading="lazy"; todas con srcset y sizes; ninguna dentro de un reveal con clip-path (los reveals son opacity/transform).
