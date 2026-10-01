# Fedgar: imágenes (todas propias de su sitio, sin IA)

Fuente: `research/fotos/` (descargadas de fedgar.com.mx). Proceso con PIL y OpenCV (sin Higgsfield, sin Real-ESRGAN: las grandes ya miden más de 1,200 px). Salida en `img/` como webp 480/960/1600 (menos si la fuente es chica).

| Archivo en img/ | Origen | Uso | Tratamiento |
|---|---|---|---|
| cisne-01, cisne-hero | web-cisne-01 | Hero (cartel) | Hero móvil/tablet: recorte vertical de la fachada |
| cisne-det | web-cisne-01 | Lámina CISNE (grande) | Recorte 4:5 de la mitad derecha |
| cisne-02, cisne-03 | web-cisne-02/03 (640 px) | Láminas CISNE (chicas) | Solo en tamaño chico |
| ambar-01/02/03 | web-ambar-01/02/03 | Lámina AMBAR | ambar-01 recortada 4:5 (fuera número de casa y poste) |
| manantial-01/02/03 | web-manantial-01/02/03 | Lámina MANANTIAL | Placas del auto tapadas con parche liso; número de casa (178) borrado con inpaint; emblema KIA de la cajuela borrado (corrección 1) |
| ppglz-01/02/03 | web-ppglz-01/02/03 | Lámina PPGLZ | Dígitos (145) de la placa borrados: queda la placa en blanco |
| tapia-01/03 | web-tapia-01/03 | Lámina TAPIA | |
| tapia-02 | web-tapia-02-RENDER | Lámina TAPIA (chica) | Etiqueta visible "Render" |
| naves-01/02 | web-naves-01/02 | Lámina NAVES; naves-01 también en el díptico (EN OBRA) | |
| naves-03 | web-naves-03 | Arco que se abre en compu (sección Despacho) | 960/1600/2000 |
| arco-v | web-naves-03 | Arco que se abre en celular | Recorte vertical propio 1104x1836 centrado en la armadura (480/960/1104) |
| naves-02-v | web-naves-02 | Díptico del despacho (TERMINADA) | Recorte vertical 964x1205 con la puerta roja |
| oficinas-pano | web-oficinas-02 | Banda panorámica entre despacho y cita | Ala derecha 1708x680, deja fuera el letrero FRESNILLO |
| idx-* | la foto grande de cada lámina | Índice de 8 arquitos | 120x156 |
| oficinas-01/02 | web-oficinas-02 (panorámica) | Lámina OFICINAS | Recortes laterales que dejan fuera el letrero FRESNILLO |
| oficinas-03 | web-oficinas-03 | Lámina OFICINAS (chica) | Recorte izquierdo, sin la torre rotulada |
| locales-01/02 | web-locales-03 / web-locales-02 | Lámina LOCALES | Solo recortes sin marca OXXO ni la rotulación de la maquinaria |
| casa-01, casa-v | web-casa-exterior-01 | Cierre (compu / celular) | Re-tratada desde la fuente: número 214 borrado y placa de la camioneta en blanco; casa-v = recorte vertical 900x1058 |
| logo-cantera(-xl), logo-negro | logo-web-01 | Header, pie, cajetín | Invertido a cantera / negro con alfa |
| favicon-32, apple-touch-icon, og.jpg | logo + cisne-01 | Meta | og.jpg 1200x630 con PIL (Syne) |

No se usó nada de `_NO-USAR-stock-o-ajenas/`, ni `web-infra-*`, `web-home-*`, `web-hist-*`, `web-stock-*`, ni logotipos de clientes (los clientes van solo como texto).
Las claves de obra (ED-01, NV-01...) y el emparejado foto-nombre salen del orden de su página /edificación: razonablemente seguro, no confirmado por ellos.
