# Colegio CEPIA · Imágenes

Todo es de ellos (research/fotos). Nada de IA generativa ni stock. Procesado con PIL y Real-ESRGAN (x4plus, `-s 4`, luego bajado con PIL a 480/960/1600 px en webp, calidad 80).

## Privacidad de menores (Corrección 1: recortar en vez de difuminar)
- Ya no hay ninguna foto con desenfoque. Se sacaron cuadros nuevos de `research/_videos/` con ffmpeg (1 por segundo y luego 4 a 6 por segundo en los momentos útiles) y se eligieron tomas sin niños, o recortadas por debajo de las cabezas.
- Prohibidas y NO usadas: `vid-salon-01`, todas las `fbmini-*`, `maps-03` y `maps-04` (otra escuela), `fb-banner-inscripciones`, cuadros de reels con IA o LEGO, el patio de juegos con un Mickey pintado (marca ajena) y la maestra del reel de inglés (persona identificable sin permiso).
- Retiradas de la página (respaldo en `scratchpad/cepia-fix/retirados/`): `entrada-preescolar`, `patio-bicis` y `patio-lineas` (todas tenían caras desenfocadas).
- Sin foto de cerca de ningún niño. Para mostrar caras de verdad se necesita autorización de padres (PENDIENTES).

## Archivos en img/
| Archivo (480/960/1600 webp) | Origen | Dónde |
|---|---|---|
| hero-fachada | maps-02 (1152 px, x4 con Real-ESRGAN) | Hero (cartel) |
| inicial-salon | maps-01 (1600 px nativa, sin escalar) | Niveles: Inicial |
| preescolar-casitas | reel 1639146580663744 (Pascua) en el segundo 84.75, recorte 570x427 sin la persona de la orilla derecha, x4 | Niveles: Preescolar |
| pasillo-primaria | reel 1065127556028401 en el segundo 24.75, recorte 720x540 arriba del subtítulo y sin el salón con alumnos, x4 | Niveles: Primaria |
| patio-secundaria | reel 1065127556028401 en el segundo 19.5, tercio de abajo (720x540: pants, conos y líneas; sin cabezas), x4 | Niveles: Secundaria |
| openhouse | fb-banner-openhouse (1920 px, arte propio del colegio) | Open House |
| entrada-arboles | reel 1065127556028401 en el segundo 32.8, recorte 462x760 sin el cartel de "Junio" ni el subtítulo, x4 | Open House, estado "después del 29" |
| entrada-reja | vid-entrada-01, x4 | Tira del plantel |
| patio-techado | reel 2767521240271769 (Feria de Ciencias) en el segundo 3.5, recorte vertical sin la fila de papás ni los niños del puesto, x4 | Tira del plantel |
| reja-adentro | vid-reja-01 recortada (x 72-676, y 0-1180) sin los brazos de las orillas, x4 | Tira del plantel |
| aerea | vid-aerea-01, x4 | Cierre |
| logo.png | logo-fb.jpg x4, convertido a naranja con transparencia (alpha por luminancia), 260 px; conserva el recorte original | Header y pie, sobre disco de papel |
| favicon-32.png, apple-touch-icon.png | solo la figura del logo (la persona) sobre papel / pizarrón | Pestaña |
| og.jpg (1200x630) | maps-02 con velo pizarrón + "Vienen a crecer en grande." en Bitter 800 (PIL) | Tarjeta de WhatsApp |

Los cuadros de 720 px de video suben a 2880 px con Real-ESRGAN y se ven suaves de cerca; por eso van en tira, en marcos o con ancho limitado, nunca a sangre en compu (en celular la tira y los niveles ocupan 72 % a 100 % del ancho).
Fuentes originales y archivos intermedios (PNG de 20 a 30 MB) NO están en la carpeta; quedaron fuera del repo.
