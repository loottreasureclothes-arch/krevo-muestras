# Effizient: origen y tratamiento de cada imagen

Todas son del propio negocio (research/fotos/). Nada de IA generativa ni stock. Procesado con PIL y OpenCV; los scripts de trabajo quedaron en el scratchpad de la tubería. Formatos webp con srcset a la talla real; ninguna foto lleva `loading="lazy"` (solo el logo del pie y el mapa).

| Archivo en img/ | Origen | Tratamiento | Tallas |
|---|---|---|---|
| hero-m-*, hero-d-* | maps-01.jpg (fachada de la ficha de Google, 1600x1201) | Celular: recorte 4:5 (x 540 a 1500, alto completo) que deja el letrero COMPLETO. Compu y tableta: foto entera | 480/960 y 960/1600 |
| pistola-* | ig-36 (pistola de masaje) | Se corta abajo (a 1850 px) y un degradado marino cubre el cabello del paciente; solo asoma su espalda | 480/768/1152 |
| ventosas-* | ig-55 (ventosas con fuego) | Se corta abajo (a 1450 px) para que no se vea el cabello de la paciente; degradado marino corto | 480/810/1080 |
| disco-* | ig-32 (disco de equilibrio) | Logo de Nike del calcetín, del tenis y del tenis borroso del fondo tapado con `cv2.inpaint` (Telea) sobre máscara por contraste, nunca pixelado | 480/768/1152 |
| gonio-* | ig-30 (escritorio con goniómetro), reescala x4 de 540 px | Recorte sin cara (x 0 a 1600, y 2160 a 3840 de la x4) y se baja a 400 px, su resolución real. Solo se muestra chica (300 px en compu, 46 % en celular) | 300/400 (corrección 1: en celular se muestra al 50 % del ancho, máx. 210 px) |
| pedi1-*, pedi2-* | fb-06 y fb-07 (estudio de pedigrafía), reescalas x4 de 640 px | Se bajan a su resolución real. Máximo 420 px en compu. La marca de agua "Effizient" es de ellos y se queda | 420/640 |
| recepcion-* | ig-22 (terapeuta en recepción) | Sin cambios | 480/768/1152 |
| gimnasio-* | ig-28 (terapeuta junto a la bicicleta) | Sin cambios | 480/810 |
| playera-* | ig-13 (playera oficial 3er aniversario) | Se corta arriba (desde 300 px) para quitar las franjas blancas de los hombros y la barbilla | 480/960/1440 |
| corazon-* | ig-59 (manos en corazón sobre el logo bordado) | Corrección 1: el logo blanco quemado abajo a la izquierda y el pedazo cortado del estampado de la manga se taparon con `cv2.inpaint` (Telea y Navier-Stokes) sobre la tela negra, con grano fino; nunca pixelado | 640/1280/2048 |
| logo.png, logo-light.png | logo-fb.jpg | Fondo blanco y corredor gigante desvanecido quitados con máscara por luminosidad (alfa de la tinta negra y color real del corredor, la estela `#506E88`, la línea azul claro y la ®); recorte al contorno. `logo-light` pasa las letras negras a `#EEF3F9` conservando alfa. No se redibuja ni se cambia la tipografía | 800 |
| favicon-32.png, apple-touch-icon.png | logo.png | Corredor con su estela (sin letras) sobre cuadrado papel hielo | 32/180 |
| og.jpg | maps-01 + Cinzel y Saira (Google Fonts) | 1200x630: panel azul playera con "No te acostumbres a vivir con dolor." (segunda mitad en cielo) y la fachada con el letrero completo a la derecha | 1200x630 |

No se usó ninguna foto de la carrera (FITME), de pacientes con cara ni nada de `_flyers-no-usar/`. Tampoco `fb-portada-01`, `ig-23`, `ig-46`, `ig-47`, `ig-52` ni `ig-57`.
