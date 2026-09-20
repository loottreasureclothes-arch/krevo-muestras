# Por qué se movieron aquí (turno 1, FUNDACIÓN, 20 sep 2026)

`25-menu.*`, `26-pedido.*` y `60-reserva.*` son de la sesión pausada. Se sacaron de
`sections/` (build.py solo arma lo que está en `sections/*.html` directo) porque:

- Usan las clases `dp-*` del **site.css viejo**, que era 100% de la marca de la feria
  (Doña Petra, rosa/amarillo) — ya no existen esas clases; el site.css nuevo es de Petra
  (azul noche / beige / rosa talavera, clases `pt-*`).
- `60-reserva.html` trae sucursales **"Colosio" y "Américas"** — eso NO es de Petra.
  Es una contaminación de otro negocio. Bórralo, no lo edites por encima.
- `26-pedido.js` sí trae un motor de carrito reusable (cantidades, total, WhatsApp) que
  vale la pena mirar para el pedido/mesero (HOJA-DIRECCION §11), pero hay que
  reescribirlo sobre `pt-*` y los datos reales de la carta (`research/menu-precios.md`),
  no copiarlo tal cual.

Motor que SÍ sirve y ya vive en el sitio nuevo (`../../site.js`):
- `window.PETRA` con `houses.jardin` / `houses.maravillas`, `status(id)`, `setHouse(id)`,
  el evento `petra:house` y `waUrl()` / `openWa()`. Úsalo para la sección 6 (Dos casas),
  el pedido y "Mostrar a mi mesero".
