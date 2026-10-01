# Imágenes de Food Party (1 oct 2026)

Todo es material propio del negocio (Facebook, Instagram, sus videos de TikTok). Nada de IA generativa ni stock. Procesado solo con PIL (recorte, grano fino, WebP). No se usó Real-ESRGAN en esta etapa: los cuadros de TikTok de 2304 x 4096 ya venían subidos 4x desde la investigación y no se volvieron a subir.

Grano fino (ruido gaussiano de 2.2) en los recortes de TikTok para que no se vean de plástico. Ninguna foto lleva `loading="lazy"`.

| Archivo(s) en `img/` | Origen | Tratamiento |
|---|---|---|
| `hero-480/960/1440.webp` | `research/fotos/ig-terraza-01.jpg` (1440 x 1440, Instagram) | Completa, sin recorte ni grano. Se pinta en charola; en celular a 50 svh y en compu a sangre. Entra desde blur tras `img.decode()`. |
| `plato-1-*.webp` fettuccine con hierbas | `tt-noche-buffet-15.jpg` | Recorte cuadrado de la charola. |
| `plato-2-*.webp` ensalada con fresa y betabel | `tt-noche-buffet-46.jpg` | Recorte cuadrado; el guante con pinzas puede quedar. |
| `plato-3-*.webp` verduras al vapor | `fb-03.jpg` (1200 x 1324) | (Corrección 1) Recorte cuadrado de 480 px (360,690)-(840,1170) cerrado al brócoli y la zanahoria; 720 = Real-ESRGAN x4 mezclado 50 % con LANCZOS + grano 2.0. Antes repetía la terraza del hero. |
| `plato-4-*.webp` guisado en salsa roja | `tt-compila-salones-19.jpg` | Recorte cuadrado de las charolas rojas del frente. |
| `plato-5-*.webp` arroz amarillo | `tt-noche-chef-11.jpg` (1080 x 1920, nativo) | Recorte de las charolas, SIN el cocinero. |
| `plato-6-*.webp` ensalada de col morada | `tt-compila-salones-05.jpg` | Recorte de la charola de la izquierda. |
| `por-1..6.webp` porciones del plato | `plato-1/2/4/6-720`, `fb-03`, `tt-noche-chef-11` | (Corrección 1) Recortes 320 x 254 solo de comida (sin cantos de charola), grano 1.6; `background-size: cover` con `border-radius` irregular y sombra interior. |
| `dest-1-*.webp` Terraza | `ig-terraza-02.jpg` (1440 x 1440) | Recorte 4:5 al lado derecho (charolas y mesa negra). FUERA el mural y rótulo ajeno "Terraza Set", el refrigerador con marca y el señor armando la mesa. |
| `dest-2-*.webp` Jardín | `tt-compila-salones-36.jpg` | Recorte 4:5. |
| `dest-3-*.webp` Quinta con alberca | `tt-compila-salones-38.jpg` | Recorte 4:5. |
| `dest-4-*.webp` Salón | `tt-compila-salones-28.jpg` | Recorte 4:5. Un mesero queda lejos y chico al fondo. |
| `dest-5-*.webp` De noche | `tt-noche-buffet-18.jpg` | Recorte 4:5; el cocinero con cubrebocas queda al fondo, sin la cara completa. |
| `dest-6-*.webp` Expo Boda y Eventos 2026 | `tt-expo-stand-16.jpg` | Recorte 4:5 de las charolas del stand con sus letreros de cartón. Sin personas. |
| `equipo-480/900.webp` | `tt-noche-chef-14.jpg` (1080 x 1920, nativo) | Recorte 4:5 recortado a cuadrado en pantalla. Cocinero de uniforme negro con cubrebocas. Pendiente permiso del dueño. |
| `cierre-480/900.webp` | `tt-compila-salones-10.jpg` | Recorte 4:5 del buffet largo (sin personas). Cuadro subido 4x: (Corrección 1) se muestra mediano, 300 px en celular, 360 en tableta y 420 en compu. |
| `cien-1000.webp` | `fb-05.jpg` (franja de charolas, y=600 a 800) | Solo comida y mantel, sin invitados; más brillo (1.25) y color (1.2). Va dentro de las letras del "100 %" con `background-clip: text`. |
| `logo-circulo.png`, `logo-circulo-96.png` | `logo-fb.jpg` | Recorte circular (centro 782,785, radio 598) con canal alfa. Sin el tenedor y la cuchara. Va en el header con un aro crema de 2 px. |
| `logo-completo.png` | `logo-fb.jpg` | Logo completo (con tenedor y cuchara) con fondo transparente (alfa a partir de lo oscuro). Va en el pie sobre un disco crema. |
| `favicon-32.png`, `apple-touch-icon.png` | `logo-fb.jpg` | El círculo del logo a 32 px; en el apple-touch a 148 px sobre crema (180 x 180). |
| `og.jpg` (1200 x 630) | PIL | Fondo crema `#F6F1E7`, a la derecha `ig-terraza-01` en una charola con ceja de acero, a la izquierda el logo a 140 px y "Sabor a tu evento." en Gloock (tu evento. en caramelo), abajo "Buffets y banquetes · Aguascalientes" en Hanken Grotesk. |

NO usadas (prohibidas por la hoja de dirección): `fb-04`, `fb-06`, `fb-07`, `fb-portada`, todos los flyers, `tt-expo-stand-05`, `-13`, `tt-compila-salon-musica-24`, `tt-salon-negro-08` y `-21`, y `research/_videos/`.
