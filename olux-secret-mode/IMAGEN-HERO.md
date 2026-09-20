# Encargo del banner principal — Ólux American Style · secret mode

Para el ORQUESTADOR. Yo (el corrector) NO genero imagen: dejé el hueco listo y esta hoja.

## El hueco ya está puesto

| Archivo | Medida | Qué trae hoy |
|---|---|---|
| `img/hero/banner-m.webp` | 900 × 812 | **Provisional.** Recorte de su exhibidor real de tenis, ya sin el texto quemado del sticker de Instagram. |
| `img/hero/banner-d.webp` | 1440 × 1300 | **Provisional.** El mismo recorte, en apaisado. |

El HTML del hero (`sections/10-hero.html`) ya apunta a esos dos archivos con un `<picture>`
(`banner-m` abajo de 900 px, `banner-d` de 900 px para arriba). **Reemplaza los dos archivos con el
mismo nombre y la misma medida y ya queda** — no hay que tocar HTML ni CSS.

## Por qué hay que cambiarlo

Emanuel, 20 sep por voz: *"te dije que le cambiaras la foto del banner, no está padre."* La portada
anterior era la fachada con el letrero (ya la había rechazado). La provisional de hoy es su
mercancía real, que es mejor, pero sigue siendo una foto de celular tomada de lado, con los tenis
cortados arriba y abajo y sin aire para el titular.

## Qué quiero que se vea

**Una boutique de marcas americanas, vista desde adentro.** Ni fachada, ni modelo, ni bodegón de
estudio: el interior de la tienda, tal como es, pero bien iluminado y ordenado.

- Anaqueles y exhibidores con **tenis, carteras y ropa colgada**, como en sus fotos reales.
- Luz cálida de tienda, piso claro, muebles blancos (así es su local).
- Sensación de **surtido**: que se note que hay mucho, que es lo que dicen sus reseñas
  ("muy buen surtido y precio", Juan Ascencio).
- Sin gente de frente, sin caras reconocibles, sin logotipos de marca legibles en primer plano.
- **Sin una sola letra en la imagen** (el titular lo pone el HTML encima).

## De qué fotos reales hay que partir (imagen a imagen, nunca inventar el local)

Todas están en la carpeta, son de ellos y ya las verifiqué:

1. `research/fotos/interior-exhibidor-tenis-google.jpg` — **la principal.** Su exhibidor real de
   tenis, tres repisas llenas (Tommy, Guess, Calvin Klein). Es el corazón del encargo.
   Ojo: el original trae quemado el sticker de Instagram *"Visitando tu Boutique · Ubicados en
   Aguascalientes · Envíos a toda la República"*. Ya lo recorté en la provisional; parte del recorte
   limpio, no del original.
2. `img/prod/*-760.webp` — 12 fotos reales de producto que rescaté hoy de su propia tienda en línea
   (carteras Michael Kors, lentes Guess, chamarras Guess, vestidos, cremas Victoria's Secret). Son
   la prueba de qué marcas y qué tipo de pieza manejan: sirven de referencia de surtido y de color.
3. `img/cat/mujer-640.webp`, `accesorios-640.webp`, `ninos-640.webp` — sus tres banners de categoría
   reales (los que ellos mismos usaban en secretmodelegante.com). Dan el tono de marca: fondo claro,
   luz de día, rosa suave.
4. `research/fotos/fachada-tanyveth-secret-mode-google.jpg` — solo como referencia del **color del
   local** (azulejo carbón `#2D2D37`, cantera clara). No la uses como banner: esa ya la rechazó.

## Encuadre (esto es lo que más se rompe)

- **Celular `banner-m.webp`: 900 × 812**, vertical-ish. El titular cae abajo a la izquierda. Deja el
  **45 % de abajo** sin detalle importante (ahí van el título, el párrafo y los dos botones), y no
  pongas nada que valga la pena en la franja de arriba: el header se come los primeros 84 px.
- **Compu `banner-d.webp`: 1440 × 1300**, apaisado. El titular ocupa la **mitad izquierda**: esa
  mitad tiene que quedar en tono oscuro o medio-oscuro y sin detalle fino, para que el texto crema se
  lea. El surtido (anaqueles, carteras) que caiga del **centro a la derecha**.
- Nada de viñeta negra dura ni de velo gris plano: el velo ya lo pone el CSS.

## Reglas que no se negocian

- Es imagen hecha con IA → la página tiene que enseñar la etiqueta chica **"Imagen ilustrativa"**
  sobre el hero. El marcador ya está en el HTML (`.os-hero-ia`), hoy está oculto con la clase
  `is-real` en la sección porque la provisional es foto real. **Al meter la de IA hay que quitar
  `is-real` de `<section class="os-hero ... is-real">` en `sections/10-hero.html` y volver a correr
  `python3 build.py`.**
- No inventes fachada, letrero, vitrina de calle ni sucursal: el local es el de Tanyveth 105-B y no
  hay más fotos suyas que las de arriba.
- No metas logotipos de marca legibles (Tommy, Guess, Michael Kors) en primer plano.
- Peso: ≤ 1.5 MB en celular, ≤ 2.5 MB en compu. Si sale grande, Real-ESRGAN x4 y bajar con PIL.

## Si además alcanza (opcional, por orden de utilidad)

1. **Un banner por categoría** para las bandas de en medio, partiendo de sus tres banners reales:
   `img/cat/mujer-640.webp`, `accesorios-640.webp`, `ninos-640.webp`. Hoy se usan tal cual (reales,
   sin el texto quemado "COMPRAR" que traían); si se regeneran, misma escena, más resolución.
2. **Foto de la sección Calzado.** Es el único bloque de la tienda sin foto propia de pieza: hoy va
   con su exhibidor real. Una foto limpia de 3 o 4 pares sobre fondo claro lo levantaría.
