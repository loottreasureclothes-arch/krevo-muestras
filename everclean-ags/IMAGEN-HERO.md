# Encargo de la foto del banner — Everclean (para el orquestador)

El hueco ya está listo en la página. Solo hay que reemplazar dos archivos; **no se toca HTML ni CSS**.

| Archivo | Medida | Encuadre |
|---|---|---|
| `img/hero/hero-m.webp` | 900 × 1200 px (vertical 3:4) | Celular |
| `img/hero/hero-d.webp` | 1600 × 900 px (apaisado 16:9) | Compu |

## Qué hay hoy (provisional)

Las dos son **su foto real** de Instagram (`research/fotos/hero-candidato_limpieza-vapor-sofa_ig.jpg`,
un cuadro de video de 368×368 px con franjas negras y el logo quemado en la esquina). Se recortó el
área útil (209 × 368 px), se subió con Real-ESRGAN `-s 4` y se bajó con PIL. **Sirve para no dejar el
hueco vacío, pero a 1440 px se ve suave**: es el punto más flojo de la página.

## Qué se necesita

Una foto nítida **de su servicio real**, hecha imagen a imagen **partiendo de esa misma foto suya**.
No inventar local, equipo ni uniforme que no existan.

**Qué tiene que verse, en orden de importancia:**

1. **Una persona lavando a vapor un sillón dentro de una casa** — es lo que hacen y es la foto que
   ya tienen. La boquilla del vapor apoyada sobre la tela, el vapor visible saliendo, la manguera
   gris del equipo entrando en cuadro.
2. **El mueble en primer plano**, ocupando la mitad baja del encuadre, con la textura de la tela
   legible (no una mancha blanca).
3. **Luz de ventana**, interior de casa normal de Aguascalientes. Nada de estudio ni de revista.
4. La persona **de medio cuerpo o solo brazos**, con ropa de trabajo oscura (así viene en su foto).
   Sin caras reconocibles.

**Qué NO debe verse:** texto quemado, logos (ni el suyo ni ajenos), marcas de agua, gente de fondo,
franjas negras de video, ni productos de limpieza de marca.

## Encuadre

- **`hero-m.webp` (vertical):** el vapor y la boquilla arriba, entre el 25% y el 45% de la altura.
  El tercio de abajo se lo come el degradado marino y el titular de 4 renglones — ahí no puede haber
  nada importante.
- **`hero-d.webp` (apaisado):** **la mitad izquierda tiene que ser aire** (pared, sombra o tela
  lisa): ahí cae el titular y el velo marino que entra desde la izquierda. La acción (vapor, brazo,
  mueble) va del centro a la derecha.

## Referencias de sus propias fotos (todas en `research/fotos/`)

- `hero-candidato_limpieza-vapor-sofa_ig.jpg` — **la base.** El gesto exacto que hay que conservar.
- `hero-candidato_limpieza-exterior-sofa_ig.jpg` — la manguera del equipo y el tipo de sillón.
- `catalogo_sofa-seccional-antes-despues_fb.jpg` — el color beige de los muebles que lavan.

## Después de reemplazar

- Se queda la etiqueta **"Imagen ilustrativa"** que ya está puesta en el hero
  (`.s-hero-ilustrativa` en `sections/10-hero.html`): es obligatoria en cuanto la foto pase por IA.
  Hoy ya está puesta a propósito, para que nadie tenga que acordarse de agregarla.
- El pie dice *"Las fotos son de Everclean, mejoradas en resolución."* — sigue siendo cierto si la
  foto sale de la suya. Si se generara algo que NO parta de su foto, hay que cambiar ese renglón.
- Correr `python3 build.py` no hace falta (solo cambian archivos de `img/`), pero conviene volver a
  pasar `krevo-shot` en `m`, `t` (893 px) y `d` para ver que el titular siga legible encima.
