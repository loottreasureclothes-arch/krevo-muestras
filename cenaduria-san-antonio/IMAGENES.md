# Cenaduría San Antonio · IMAGENES (1 oct 2026)

Todas son fotos de clientes en Google Maps (no del negocio), sin IA ni stock. Cada una lleva su plaquita "FOTO DE UN CLIENTE" y el permiso va a PENDIENTES.md. Ninguna pasó por Real-ESRGAN (las usadas miden más de 1,200 px, salvo el letrero). Procesado: PIL, recorte + LANCZOS + WebP.

| Archivo en `img/` | Origen (`research/fotos/`) | Tratamiento | Dónde |
|---|---|---|---|
| hero-m-480/800.webp | maps-fachada-01 | recorte (340,150)-(1180,790) (corrección 1: menos cielo y cables, letrero más grande); solo arriba de y=790; contraste +6 %, color +8 % | hero celular |
| hero-d-800/1140.webp | maps-fachada-01 | recorte (190,90)-(1330,790) (corrección 1), mismo límite; sin personas; contraste +6 %, color +8 % | hero compu |
| letrero-450.webp | maps-fachada-01 | recorte del letrero (395,235)-(1130,530) con el cielo quitado por máscara; nunca redibujado | header (40 px) y pie (150 px) |
| plato-480/960/1080.webp | maps-resena-14 | recorte (520,0)-(1600,720) para tapar el papel de mesa con un precio viejo ($250) que contradice la carta; 3:2 | carta, cuadro grande |
| enchiladas-400/600.webp | maps-resena-16 | recorte (120,0)-(1110,1320), 3:4 (corrección 1: fuera los precios viejos del papel de mesa); "CUENTA POR MESA" se queda | carta, cuadro chico |
| pozole-tostadas-480/800.webp | maps-pozole-tostadas-04 | tal cual, 4:3 | carta, cuadro chico |
| tamal-480/960/1600.webp | maps-tamal-10 | tal cual, 4:3 | sección 3 |
| pozole-v-300/600.webp | maps-resena-12 | recorte (0,380)-(715,1274), 4:5 | opiniones, cuadro chico |
| atole-360/600.webp | maps-resena-13 | recorte (0,470)-(720,1370), 4:5; no se nombra el sabor | horario, cuadro chico |
| pozole-grande-480/960/1600.webp | maps-pozole-07 | recorte desde y=200 para dejar fuera el torso de un tercero; 16:10 con object-fit | cierre |
| favicon-32.png, apple-touch-icon.png | maps-fachada-01 | cabeza de la mascota del letrero, recorte (690,248)-(830,345) a cuadrado | head |
| og.jpg | maps-fachada-01 | 1200x630 con PIL: franja de la fachada con el letrero a la izquierda y banda verde hondo con "Una sola cenaduría. Desde 1971." en Shrikhand | og:image |

No usadas a propósito: maps-platillo-03-MARCA-AJENA, NOUSAR-fb-*, maps-menu-01 (solo referencia de precios), maps-resena-02/03/07 (Coca-Cola), maps-resena-15, maps-interior-08 (comensales de cerca).
