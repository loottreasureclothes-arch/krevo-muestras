# FEEDBACK 1 (Emanuel, 20 sep 2026, por voz)

Veredicto: **RECHAZADA.** "Vet Inn si esta de la chingada, guey. Esta muy fea, la verdad."

## Lo que pidio
1. **Copiarle la plantilla a la veterinaria del socio.** "Mejor copiale a mi compa, copiale la plantilla de su veterinaria." Referencia completa y desarmada en
   `~/Prospeccion-Web-Ags/skills-web/krevo-web-cinematica/referencia/competencia-socio-capuchino.md`
   y la pagina en vivo: https://elbenshxc.github.io/Capuchinocentroveterinario/
   Esta vez NO es "inspirate": es acercarse a esa estructura y ese nivel de terminado.
2. **Los servicios NO son productos.** "Consultas, pension, todo eso, como si fuera un producto, y es un pinche servicio, no mames. Y luego un mas en Cirugias, pregunta el precio, Cirugias, pregunta el precio." Fuera las tarjetas de producto con "+ Agregar" y fuera el carrito de servicios.
3. **En su lugar, una solicitud de cita.** "Que le aparezca algo asi como de que: necesita cirugia, vacuna, pum, datos de tu mascota, y precio o algo asi." O sea: eliges el servicio, pones los datos de tu mascota, y de ahi sale la solicitud por WhatsApp. Como el formulario del compa, que pide el nombre de la mascota.
4. **Las fotos estan gachas.** Hay que levantarlas: mejor recorte, mejor tono, mas grandes. Las que no den el ancho, fuera.
5. **El titular no lo convencio.** "Como que no preguntan por la clinica, preguntan por Alicia y por Luis? Que pedo con eso." No lo prohibio, pero hay que bajarle el peso: que no sea lo unico que sostiene la primera pantalla.

## Lo que SI hizo bien y se conserva
"Estuvo bien que no falsearas": no inventar precios. Todo sigue sin precio hasta que el dueno los de.

---

# NOTA GLOBAL (aplica a TODAS las muestras)

**1. El menu hamburguesa.** Emanuel: "Es que como que no las haces funcionales de la hamburguesa, guey. No te manda para ninguna pagina."
Hoy los enlaces del menu son anclas que bajan dentro de la MISMA pagina. El espera que lo lleven a una pagina.
- Como minimo: que cada renglon del menu se vea y se sienta como navegacion de verdad (estado activo, cierre del panel, el scroll cae en el lugar correcto sin que el header tape el titulo).
- En RESTAURANTES: "Carta" / "Menu" abre **su propia pagina** (`menu.html`), no un ancla.

**2. Pagina de menu aparte, en todos los restaurantes.** Emanuel, sobre Tierra Santa: "Cuando te metas a menu, debes de mandarlos como a otra landing page de puro menu, para que se vea mas chido. Y que sea una landing page especifica para menu, y echarle mas ganas. Asi en todos los restaurantes."
Aplica a: tierra-santa, los-arroyo, pizza-y-fuego, la-cochera, dona-petra, los-abolengos, pozoleria-la-chata, susheria-galerias, lamexico.
La pagina de menu lleva el mismo header y los mismos colores, la carta completa por categorias, el pedido, y un boton de regreso claro.

**3. Peso y carga.** No es GitHub: el HTML llega en 0.24 s. Es el peso de las fotos. En toda muestra: `loading="lazy"` y `decoding="async"` en todo lo que no se ve en el primer pantallazo, tamanos servidos para 390 px, y borrar de `img/` lo que la pagina no referencia.
