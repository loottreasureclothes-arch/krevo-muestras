#!/usr/bin/env python3
"""Arma index.html (y pone el href real de wa.me a cada data-wa) desde template.html + sections/NN-*.{html,css,js} (una sola pagina).
Corre: python3 build.py   (idempotente)"""
import glob, os, re, urllib.parse
WA = '5214492897006'
os.chdir(os.path.dirname(os.path.abspath(__file__)))
T = open('template.html').read()

def V(f):
    return f'{f}?v={int(os.path.getmtime(f))}'  # rompe la cache del celular en cada cambio

html = sorted(glob.glob('sections/*.html'))
body = ''.join(open(f).read().rstrip('\n') + '\n\n' for f in html)
css = ''.join(f'<link rel="stylesheet" href="{V(f)}">\n' for f in sorted(glob.glob('sections/*.css')))
js = ''.join(f'<script src="{V(f)}" defer></script>\n' for f in sorted(glob.glob('sections/*.js')))

out = T.replace('<!--SECTIONS-->\n', body).replace('<!--SECTION_CSS-->', css.rstrip('\n')).replace('<!--SECTION_JS-->', js.rstrip('\n'))
for f in ['site.css', 'site.js']:
    if os.path.exists(f):
        out = out.replace(f'"{f}"', f'"{V(f)}"')

def _wa(m):
    msg = m.group(2)
    href = 'https://wa.me/%s?text=%s' % (WA, urllib.parse.quote(msg.replace('&amp;', '&'), safe=''))
    return '<a %shref="%s" data-wa="%s"%s>' % (m.group(1), href, m.group(2), m.group(3))
out = re.sub(r'<a ([^>]*?)data-wa="([^"]*)"([^>]*)>', _wa, out)

tmp = 'index.html.tmp'
open(tmp, 'w').write(out)
os.replace(tmp, 'index.html')
print('index.html armado con', len(html), 'secciones')
