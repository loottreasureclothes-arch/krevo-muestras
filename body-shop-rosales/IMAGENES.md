# Imágenes de Body Shop Rosales: origen y tratamiento

Todo sale de `research/fotos/` (fotos propias del taller publicadas en su Facebook). Cero IA generativa, cero Real-ESRGAN (todas miden 1,266 a 1,280 px, no se tocan). Se convierten a webp (calidad 82) con srcset 480 / 960 / tamaño real. Script de tratamiento: ver "Cómo se hizo" abajo.

| Archivo en `img/fotos/` | Origen | Dónde se usa | Tratamiento |
|---|---|---|---|
| `hero-*.webp` | `fb-19-cabina-enmascarado-pintura.png` | Hero (celular: recorte vertical por `object-fit`; compu: marco de cinta 7/12) y og:image | Recorte de 110 px a la izquierda para sacar el letrero ajeno "roberlo". Sin placas. |
| `choque-*.webp` | `fb-47-dano-motor-taller.png` | Taller, foto grande ("CHOQUE FRONTAL") | Sin cambios. Sin placas legibles. |
| `masilla-*.webp` | `fb-04-jeep-trasera.jpg` | Taller, chica ("MASILLA EN EL COSTADO") | Recorte de 130 px a la derecha (persona y cables al fondo). Placa ya cubierta con su logo. |
| `base-*.webp` | `fb-33-sentra-pintando.png` | Taller, chica ("BASE EN COFRE Y DEFENSA") | Recorte de 112 px a la izquierda: sale el volante de "Crédito Coppel" (marca ajena) que la hoja no había visto. |
| `jetta-*.webp` | `fb-14-jetta-rojo.png` | Taller, chica ("ROJO, YA PINTADO") | Recorte de 80 px a la derecha (mancha gris de la placa). Letrero de PPG (marca ajena) tapado con 3 tiras de cinta de enmascarar pintadas con PIL; mancha gris sobre el otro auto tapada con una tira más. |
| `rojo-*.webp` | `fb-29-polo-rojo.png` | Destapa (foto de color ROJO) | Marco de placa con texto ajeno tapado con una tira de cinta chica. La placa es el logo del taller. |
| `azul-*.webp` | `fb-27-taller-interior.png` | Destapa (foto de color AZUL) | Recorte de 78 px a la izquierda: sale la placa difuminada del VW verde. Placa del Nissan ya es el logo. |
| `plata-*.webp` | `fb-59-camaro.png` | Destapa (foto de color PLATA) | Mancha gris de la placa retocada con `cv2.inpaint` (Telea). Revisada a ojo: no se nota. |
| `brillo-*.webp` | `fb-64-charger-defensa.png` | Clientes, momento firma "El brillo pasa" | Sin cambios. Celular: recorte 4:5 con `object-position`. Sin placas. El velo y la banda de luz son `<div>` encima, nunca filtro sobre la foto. |
| `entrada-*.webp` | `fb-20-fachada-mitsubishi.png` | Cómo llegar ("LA ENTRADA") | Recorte de 78 px a la izquierda (mancha gris de la placa). Se ve su letrero HOJALATERÍA y la lona de Rosales. |
| `remate-*.webp` | `fb-06-enmascarado-gris.jpg` | Cierre, remate ("LEALTAD Y COMPROMISO"; en compu máx. 1,040 px, 16:9) | El papel de periódico dejaba leer "Crédito Coppel": cubierto (corrección 1) con UNA tira de cinta de 190x70 px a -28°, pintada con PIL/numpy y sombreada con la luminancia de la foto para que las arrugas y brillos del plástico pasen encima (no desenfoque, no pixelado). Script: `remate.py` en el scratchpad del pulidor. Conserva su logo grande abajo a la derecha. |

## Logo, favicon y og
- `img/logo-aro.png` (300 px) y `img/logo-aro-120.png`: recorte con máscara elíptica suave del aro del logo de `research/fotos/logo-recorte-portada.png` (600x455, el aro salía estirado a lo ancho en esa captura de la portada; se llevó a círculo para que coincida con el de su lona). No se redibujó nada. Anillo de cinta de 3 px alrededor en CSS para esconder cualquier halo. Pendiente: logo limpio en alta.
- `img/favicon-32.png` y `img/apple-touch-icon.png`: la letra "R" en Racing Sans One, crema, sobre círculo `#B1080A` con aro marino de 2 px. Es una letra, no el logo.
- `img/og.jpg` (1200x630): hecha con PIL. Papel kraft con grano, `hero-960` recortada en marco de cinta a la derecha, "Devolvemos la vida a tu auto." en Racing Sans One (marino, "a tu auto." en rojo), el aro del logo chico y "Body Shop Rosales · Aguascalientes" en rótulo de cinta.

## Colores medidos con PIL (mediana de píxeles de pintura limpia, sin reflejos)
| Muestra | Foto | Medido | Se usa |
|---|---|---|---|
| Rojo | `fb-29` (cofre y defensa) | `#902626` | `#902626` |
| Azul | `fb-27` (cofre y costado) | `#1D305D` | `#1D305D` |
| Plata | `fb-59` (cofre) | `#BAC5D4` | `#BAC5D4` |
| Otro color | (gris base de `fb-19` y `fb-33`) | n/a | `#8C8F92` |
| Papel de enmascarar | `fb-19` (papel a media luz) | `#BAA998` (la cámara lo apaga) | `#D9C29B` de la hoja |
| Cinta amarilla | `fb-19` | `#D3C28D` (apagado) | `#E4D68A` de la hoja |

## Prohibidas y no usadas
`NOUSAR-flyer-03-IA-si-tu-carro.png`, `maps-01-flyer-posible-IA.jpg`, `flyer-40-hojalateria-es-arte.png`, `flyer-02-...`, `flyer-09-...`, `portada-facebook.png`, `logo-perfil-fb.jpg`, rifa, colecta, camioneta de botanas, fotos de equipo de cerca: no se usan. Sobran sin usar: `fb-05`, `fb-17`, `fb-26`, `fb-55`, `fb-56`, `maps-03`.

## Cómo se hizo
Los recortes, parches de cinta e inpaint salen de un script de PIL/OpenCV en el scratchpad del constructor (`prep.py`); las salidas ya están en `img/fotos/`.
