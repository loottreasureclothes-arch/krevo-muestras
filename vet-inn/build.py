#!/usr/bin/env python3
"""Arma index.html con template.html + sections/NN-*.{html,css,js} (en orden).
Corre: python3 build.py   (idempotente; cualquier agente puede correrlo)
Sitio de una sola pagina: no hay bloque 2 (pagina extra).

VET INN - turno 1 (FUNDACION) dejo hechas: 01-hero, 03-momento (momento firma
"La luz de las doce"), 06-cierre. FALTAN, las hace el turno 2 (construir):
  - sections/02-servicios.{html,css,js}  -> catalogo a la vista + hoja carrito
  - sections/04-2012.{html,css,js}       -> pausa tipografica "Siguen en la misma calle"
  - sections/05-donde-estamos.{html,css,js} -> mapa, horarios, telefono
Los numeros ya dejan el hueco en su lugar (glob ordena por nombre): al copiar
esos tres archivos a sections/ el build los intercala solo, no hay que tocar
este script. Ver PENDIENTE-DUENO.md y HOJA-DIRECCION.md antes de escribirlas.

Contrato de "La placa de Canela" (componente firma, vive en 01-hero.js):
  - sessionStorage['vetinn-placa'] = JSON {nombre, especie} (try/catch, puede
    no existir: entonces todo dice "tu mascota" y sin silueta).
  - Al llenarse dispara en window: new CustomEvent('vetinn:placa', {detail:{nombre,especie}})
  - Hay helper global window.vetinnPlaca() -> {nombre, especie} | null para
    que 02-servicios (titulo + barra fija + hoja del carrito) y el mensaje de
    WhatsApp la lean sin duplicar el parseo.
"""
import glob, os

os.chdir(os.path.dirname(os.path.abspath(__file__)))
T = open('template.html').read()


def assemble(t, folder):
    html = sorted(glob.glob(f'{folder}/*.html'))
    body = ''.join(open(f).read().rstrip('\n') + '\n\n' for f in html)
    V = lambda f: f'{f}?v={int(os.path.getmtime(f))}'  # rompe la cache del celular en cada cambio
    css = ''.join(f'<link rel="stylesheet" href="{V(f)}">\n' for f in sorted(glob.glob(f'{folder}/*.css')))
    js = ''.join(f'<script src="{V(f)}" defer></script>\n' for f in sorted(glob.glob(f'{folder}/*.js')))
    out = t.replace('<!--SECTIONS-->\n', body).replace('<!--SECTION_CSS-->', css.rstrip('\n')).replace('<!--SECTION_JS-->', js.rstrip('\n'))
    return out, len(html)


def bust(out):
    for f in ['site.css', 'site.js']:
        if os.path.exists(f):
            out = out.replace(f'"{f}"', f'"{f}?v={int(os.path.getmtime(f))}"')
    return out


def write(name, out):
    out = bust(out)
    tmp = name + '.tmp'
    open(tmp, 'w').write(out)
    os.replace(tmp, name)


out, n = assemble(T, 'sections')
write('index.html', out)
print('index.html armado con', n, 'secciones')
