# La Roma Brunch · Imágenes (origen y tratamiento)

Todas son fotos de Google Maps (a `=s1600`), subidas por clientes y por la cuenta del negocio, guardadas en `research/fotos/`. Cero IA, cero stock. Todo se hizo con PIL (`gen_img.py` vive en el scratchpad); ningún archivo pasó por Real-ESRGAN (todos miden 1,200 px o más salvo `americas-04`, que solo va chica). Salida en `img/` como WebP (calidad 78 a 88).

| Archivo(s) en `img/` | Origen | Tratamiento | Dónde |
|---|---|---|---|
| `logo.webp`, `logo-s.webp` | `logo-fb.jpg` (750x750) | Recorte de la placa completa con su filete exterior y su arena (x 132 a 617, y 61 a 686), sin redibujar ni quitar fondo; `-s` a 160 px | Header colgante (52 px), mesa (cubremantel), pie (150 px) |
| `favicon-32.png`, `apple-touch-icon.png` | placa del logo | Placa recortada centrada sobre cuadrado arena `#D2BFB6` | Pestaña y pantalla de inicio |
| `og.jpg` | `centro-11` | 1200x630: foto en placa de doble filete a la derecha, "Hicimos del brunch un imperio." en Josefin 700 (última línea arena) sobre `#1B4B56` | og:image |
| `hero-480/900.webp` | `centro-11` (1600x1200) | Recorte vertical 3:4 de 900x1200 centrado en la torre de waffles | Hero |
| `sello.webp` | `centro-07` (1600x1600) | Reducida a 440 px | Placa chica del hero (máx. 220 px) |
| `p-chilaquiles`, `p-suizas`, `p-enmoladas`, `p-waffle-frutos`, `p-red-velvet`, `p-paquete2`, `p-bowl`, `p-capuchino` (.webp, 320x320) | `centro-04`, `americas-02`, `americas-03`, `centro-11`, `norte-06`, `centro-12`, `centro-10`, `norte-08` | Recorte cuadrado centrado en el plato (desplazado a ojo en las verticales), reducido a 320 px | Carta (miniatura redonda), mesa, cinta del header, cierre |
| `ro.webp`, `ma.webp` | `sant-03` (chilaquiles rojos con huevo), `americas-11` (waffle de fruta y chocolate) | `ro`: recorte horizontal 1200x700 reducido a 1000 px. `ma` (corrección 1): recorte 940x595 desde (0, 700) centrado en el waffle, sin borde de plato, enfoque suave; se pintan DENTRO de las letras RO y MA con `<pattern>` de SVG y trazo grueso | Momento firma RO · MA |
| `barra-480/960/1600.webp` | `centro-01` (1600x1205) | Sin recorte, tres tallas | Collage del lugar (letrero "LA ROMA" completo) |
| `terraza-480/960/1280.webp` | `norte-07` (1280x720) | Sin recorte | Collage del lugar |
| `plantas-400.webp` | `americas-04` (900x1600) | Reducida a 400 px de ancho; se pinta a 118 a 200 px | Collage del lugar (chica) |
| `fachada-480/960/1200.webp` | `sant-01` (1200x1600) | Corrección 1: interior tras el cristal con foco suave (radio 3.2, máscara difuminada 28 px) y las personas sentadas y el personal con desenfoque fuerte (radio 13, elipse difuminada 30 px), sin parche rectangular; el letrero RO MA y la puerta quedan limpios | Sección "Cinco" |
| `mesa-norte-480/960/1280.webp` | `norte-05` (1280x720) | Corrección 1: recorte 1173x658 desde (54, 62) para quitar al cliente sentado arriba, llevado a 1280x718 con LANCZOS, enfoque suave y +4 % de contraste; en compu máx. 1,100 px | Remate del cierre |

No usadas (según la hoja): `centro-05`, `centro-08`, `centro-14`, `americas-05/06/07`, `sant-07`, las cinco cartas `menu-*` (solo sirvieron para leer precios) y todo lo de TikTok.

Script de la corrección 1: `fix_img.py` en el scratchpad del pulidor (solo PIL, sin IA ni Real-ESRGAN).
