# Pendiente del dueño — Ólux American Style / secret mode

**Lo primero, antes de publicar:**
1. **¿Qué nombre va al frente?** Ólux American Style (el de Google con reseñas y el de sus 34 mil seguidores) o secret mode (el del letrero nuevo y su tienda en línea). Mientras no conteste, la página los trae a los dos, dividido y honesto.

**Fotos (lo que más falta, y con mucho):**
2. **Fotos de la mercancía, pieza por pieza, fondo liso.** De su tienda en línea caída se rescataron las 172 fichas con precio, pero solo **12 fotos de producto** — el archivo de internet no guardó las demás. Hoy 160 de 172 piezas salen con la etiqueta "Foto pendiente". Es lo que más levantaría la página.
3. Fotos del interior sin overlays de Instagram ni texto encima.
4. Foto de la fachada de Plaza San Rafael (no existe ninguna en internet).
5. Foto de la fachada de Tanyveth sin decoración navideña y sin marca de agua.
6. El logo en vector (.ai/.eps/.svg) o PNG transparente. Hoy solo hay el JPG con fondo negro: para la página le quitamos el negro a mano (`build_img.py`), y por eso en el header sale nada más el renglón de "Ólux" — el renglón chico "AMERICAN STYLE" a 26 px de alto queda ilegible. Con el vector sale el lockup completo.
6b. Una foto de la fachada tomada de FRENTE y de día, sin cables ni postes cruzando el cielo. La que existe (la navideña) los trae y no se pueden quitar sin cortarle el logo.

**Datos:**
7. Precios de hoy en tienda física. Los de la página son los últimos que ellos publicaron (catálogo en línea de enero 2026) y hay que confirmarlos o cambiarlos.
8. **Confirmar tres precios que se leyeron del nombre de sus propios archivos de foto**, no de la ficha: Vestido Tommy Hilfiger corte cintura baja **$1,690**, Vestido Tommy Hilfiger camisero **$1,590** y Cartera Michael Kors **$2,590**. Los tres cuadran con su catálogo, pero conviene que los diga él. (Detalle en `research/FOTOS-PRODUCTO.md`.)
8b. Precio de los **Lentes de sol Guess** de las dos fotos: su catálogo trae tres modelos ($1,990, $1,990 y $2,250) y no se sabe cuál es cuál. Hoy salen como "Pregunta el precio".
8c. En la foto de la **playera Tommy Jeans** salen dos piezas (playera y bucket hat): ¿cuál se anuncia y a qué precio?
9. Costo de envío a otras ciudades.
10. ¿El apartado a 2 meses y los 3/6 MSI aplican igual en las dos sucursales?
11. CP de Tanyveth: Google dice 20250, Facebook dice 20255.
12. Teléfono de la sucursal Plaza San Rafael (hoy Google le pone el mismo 449 137 1706) y su horario, si es distinto.
13. Confirmar el WhatsApp wa.me/524491371706 (probar que abra la conversación correcta).
14. ¿Van a reactivar secretmodelegante.com? Si no, esta página pasa a ser su catálogo y entra la suscripción mensual de KREVO (operación, precios, pasarela de pago).
15. Link de cobro / pasarela para la tarjeta en línea.
16. Las otras 13 reseñas de Google cuyo texto no se pudo sacar en esta pasada, si quiere que salgan más.
17. Confirmar los nombres de los tres departamentos de las ventanas (hoy: CARTERAS Y MOCHILAS · CALZADO · ROPA). Son los grupos del catálogo, no un letrero suyo: si adentro de cada aparador hay otra cosa, se cambia.
18. ¿Qué van a hacer con la sucursal de Plaza San Rafael en Google? Hoy aparece con el mismo teléfono que Tanyveth y sin ninguna opinión, y así lo dice la página.

**Lo que no se pudo dejar al 100 % y por qué (ronda de correcciones, 20 sep 2026):**

- **La banda de los tres aparadores mide 213 px de alto en celular, no 300.** Su fachada es ancha y baja: para que quepan las TRES ventanas completas a 390 px de ancho, la banda no puede ser más alta sin recortarle una ventana. Subió de 130 a 213 px (+64 %) alargando el recorte hacia el azulejo de arriba y la banqueta de abajo. Con una foto de la fachada tomada más de frente (punto 6b) se podría cerrar más y ganar altura.
- **La foto navideña sigue con cables y cielo.** Se le cortaron los coches, la banqueta y el edificio vecino de la derecha; los cables cruzan justo por encima del logo y quitarlos implicaría cortarle el recuadro "Ólux American Style", que no se toca (punto 6b).

**Ronda de correcciones 2 (FEEDBACK-2, 20 sep 2026):**

- **Foto del aparador de carteras y mochilas: no existe.** La ventana que le toca en la fachada real
  (la de la izquierda) es la puerta de vidrio de la entrada; a la hora y el ángulo en que se tomó la
  foto solo refleja la calle y un coche, cero producto visible. Por eso ese bloque del catálogo se
  quedó sin foto (marcador honesto: "Fotografía de este aparador: pendiente del dueño"). Falta una
  foto de las carteras y mochilas en exhibición, de frente y sin reflejos, para completarlo.
- **La foto de portada cambió** (Emanuel: "no me gusta la foto de portada"). Ya no es la fachada con
  el letrero — se dejó abajo, en el aparador y en "Dos nombres, dos locales", donde sí gustó — sino
  su exhibidor real de tenis (la misma foto que ya se usaba en el catálogo), ampliado con el mismo
  método de reescalado que ya traía el sitio (no es imagen de IA). Si de todos modos no convence,
  la foto que sí resolvería esto de raíz es una del INTERIOR completo de la tienda, de frente, bien
  iluminada y sin overlays de Instagram — no existe ninguna así en `research/fotos/` todavía.

*(Copiado de HOJA-DIRECCION.md §9, más lo que salió del catálogo, el pedido y "Dos nombres, dos locales".)*

**Ronda de correcciones 3 (20 sep 2026, tarde — la página se volvió tienda):**

- **Se rescataron las 172 fichas de su catálogo** (nombre, precio, tallas, colores) del archivo de
  internet, y **12 fotos de producto reales**. Con eso la página dejó de ser un folleto y es una
  tienda: slider arriba, piezas con precio por sección, banners de por medio y `catalogo.html` con
  las 172. Cada pieza manda su propio WhatsApp ("Hola, te encargo el Vestido Tommy Hilfiger corte
  cintura baja de $1,690.").
- **No se llegó a 24 piezas con foto y no se puede con lo que hay.** El archivo de internet solo
  conservó 14 imágenes de producto del dominio; el resto de las fotos de las fichas devuelve 404. Se
  probó una por una. Las 160 restantes tienen que salir del dueño (punto 2).
- **Calzado se quedó sin una sola foto de pieza.** Son 60 pares con precio y talla reales, así que
  ese bloque va como lista de precios y no como rejilla de recuadros vacíos. Falta una foto de 3 o 4
  pares sobre fondo claro.
- **El banner principal sigue siendo provisional.** Es el recorte de su exhibidor de tenis, ya sin
  el texto quemado del sticker de Instagram. El encargo de la foto definitiva está escrito en
  `IMAGEN-HERO.md`; lo que de verdad lo resolvería es una foto del interior completo de la tienda,
  de frente y bien iluminada, que hoy no existe.
- **Se quitó la foto navideña** de "Dos nombres, dos locales": traía el logo quemado en un recuadro
  blanco encima y tapaba el letrero real. La sección se explica sola con la placa partida.
