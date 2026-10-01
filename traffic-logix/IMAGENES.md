# IMAGENES (GTLO)

Todas son fotos reales del negocio (Wix, Facebook). Cero IA, cero stock del Wix (se descartaron wix_carretera_stock, wix_aeropuerto_stock y wix_playa_stock). Real-ESRGAN x4 (nunca x2) solo en las tres grandes y luego bajadas con PIL a 1600.

| Archivo en img/ | Origen | Uso | Tratamiento |
|---|---|---|---|
| hero-480/960/1440.webp | research/fotos/wix_nissan_urvan_flotilla.jpg (1440 px) | Hero (sin lazy, fetchpriority alto). En celular va la foto ENTERA bajo el pórtico (Urvan 116 completa y la fila 125/123) | SIN reescalar (la versión Real-ESRGAN se veía plástica en compu). Placa tapada con un marco negro del mismo tamaño (como portaplacas vacío); logo de la fachada quitado con cv2.inpaint |
| personal-480/960.webp | wix_fila_vans_hiace_urvan.jpeg (1194 px) | Servicio Personal empresarial | Solo redimensionada; etiqueta UNIDAD 114 (se lee en la foto) |
| aeropuerto-480/960/1200.webp | fb_09.jpg (1600 px) | Servicio Aeropuerto, pie "Sprinter lista para abordar." | Recorte (258,452)-(1238,1150): solo la Sprinter 152 con la puerta abierta; fuera el estadio, su pantalla y la gente. Placa tapada con marco negro. Real-ESRGAN x4, bajada con PIL a 1200 y mezclada 35% con la original para que no se vea plástica. NO se dice que sea un aeropuerto |
| turismo-480/900.webp | wix_urvan_sierra.jpeg (900 px) | Servicio Turismo | Placa y marco de agencia tapados con marco negro del mismo tamaño |
| ejecutivo-480/960/1200.webp | wix_hiace_detalle_logo.jpg (1356 px) | Servicio Ejecutivo, pie neutro "UNIDAD CON RÓTULO GTLO" (el pendiente de la foto ejecutiva va solo en "Todo listo para completar") | Recorte 4:3 del cofre con el logo GTLO (banda de detalle real). Real-ESRGAN x4 + mezcla 35%. La Suburban del Wix (wix_suburban_ejecutivo.png) se QUITÓ: es foto de prensa del fabricante, no de GTLO |
| flotilla-480/960/1600.webp | fb_01.jpg (1262 px) | Foto a todo el ancho con la reseña de Erik encima ("Siempre impecables."). Ya NO es la foto por defecto bajo la señal | Real-ESRGAN x4 + mezcla 35% con la original; sin parches (las placas salen de canto y no se leen) |
| cv-126/123/121/114/152-520.webp | fb_02 (Sprinter 126 de noche), fb_06 (Hiace 123), ig_2022-06-22 (Urvan 121, recorte a la del frente), ig_2022-06-21a (Urvan 114), aeropuerto-1200 (Sprinter 152, recorte más cerrado) | El convoy: 5 placas-foto 4:3 de 230 px (celular) / ~220 px (compu). Fotos chicas, nunca a todo el ancho | Placas tapadas con marco negro; Real-ESRGAN x4 + mezcla 35% con la original, bajadas a 520 px. Números confirmados abriendo cada foto |
| noche-400/640.webp | ig_2022-06-07.jpg (640 px) | Base: foto chica (200 px celular, 280 compu) en marco de señal, pie "Unidad 123, al anochecer." | Placa tapada; Real-ESRGAN x4 + mezcla 35% |
| carretera-800/1600.webp | wix_van_carretera_126.jpg (799 px) | Banda de remate antes del pie: a sangre en celular, en marco de señal de 800 px máx. en compu, con el lema y "KM 100" | Placa tapada; Real-ESRGAN x4 + mezcla 35% |
| fila-480/960.webp | ig_2022-03-06.jpg (640 px) | Foto por defecto bajo la señal (solo compu): fila de unidades en la calle | Recorte 4:3; Real-ESRGAN x4 + mezcla 35%; placas ilegibles a ese tamaño |
| logo.png | wix_logo_gtlo.jpg (2200x1700) | Header, pie, og | Fondo blanco quitado con PIL (alfa suave); se usa sobre señal blanca porque el texto del logo es casi negro |
| favicon-32.png, apple-touch-icon.png | emblema del logo | Favicon | Recorte del emblema sobre señal blanca |
| og.jpg (1200x630) | hero + logo | Tarjeta de WhatsApp/Facebook | PIL: urvan con flotilla, logo y "Transportarte es nuestra especialidad." |

Reglas de carga: ninguna foto que vende lleva loading="lazy"; todas con srcset y sizes; ninguna dentro de un reveal con clip-path (los reveals son opacity/transform).
