# CORRECCION-2 (inspector HD, 3 oct 2026)
## Fotos HD
0 subidas: todos los originales pasan de 1,200 px (ver IMAGENES.md). Limpieza: 3 webp sin usar fuera.
## Problemas más visibles
1. Compu: platos de la carta a 104 px, la comida no vende y la comanda flota en un hueco crema.
2. Celular: fotos de platillo a 84 px, chicas para un sitio de desayunos.
3. Compu: espejo chico (210 px) debajo del 4.5 gigante.
4. Compu: hero a 60vw se sirve a 1284 px (1.5x en retina); el original no da más y la regla no permite Real-ESRGAN arriba de 1,200 px.
5. Celular y compu: sucursales puro texto, sin fachada ni foto del Norte.
6. img/ cargaba 528 KB de hero-d (f01) que nadie pintaba.
## Resultado
1. Arreglado: platos de 136 px con doble aro, nombres a 28 px, descripción 16 px; hueco 64 px.
2. Arreglado: 96 px en celular, sizes real por breakpoint.
3. Arreglado: espejo a 280 px (el webp de 640 alcanza al 2x).
4. No arreglado: falta foto propia de más resolución (PENDIENTES: fachada/equipo).
5. No arreglado: no hay fachada ni foto del Norte en research.
6. Arreglado: borrados.
Verificación: m 6,892 px, d 6,335 px, alertas [] en ambos, wa 3, cargas fallidas 0, wa.me/524495376787 intacto. Sin git.
