#!/usr/bin/env python3
"""Arma index.html con template.html + sections/NN-*.{html,css,js} (en orden).
Corre: python3 build.py   (idempotente; cualquier agente puede correrlo)
Sitio de una sola pagina: no hay bloque 2 (pagina extra) como en closetdoor."""
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
