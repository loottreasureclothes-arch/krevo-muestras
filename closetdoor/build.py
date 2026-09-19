#!/usr/bin/env python3
"""Arma index.html: template.html + sections/NN-*.html (en orden) + sus .css/.js.
Corre: python3 build.py   (idempotente; cualquier agente puede correrlo)"""
import glob,os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
t=open('template.html').read()
html=sorted(glob.glob('sections/*.html'))
body=''.join(open(f).read().rstrip('\n')+'\n\n' for f in html)
css=''.join(f'<link rel="stylesheet" href="{f}">\n' for f in sorted(glob.glob('sections/*.css')))
js=''.join(f'<script src="{f}" defer></script>\n' for f in sorted(glob.glob('sections/*.js')))
out=t.replace('<!--SECTIONS-->\n',body).replace('<!--SECTION_CSS-->',css.rstrip('\n')).replace('<!--SECTION_JS-->',js.rstrip('\n'))
tmp='index.html.tmp'; open(tmp,'w').write(out); os.replace(tmp,'index.html')
print('index.html armado con',len(html),'secciones')
