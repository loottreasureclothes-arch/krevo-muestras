#!/usr/bin/env python3
"""Arma index.html desde template.html + sections/NN-*.html (+ .css/.js). Idempotente. Agrega ?v=<mtime> a CSS y JS."""
import glob,os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
V=lambda f:f'{f}?v={int(os.path.getmtime(f))}'
t=open('template.html').read()
body=''.join(open(f).read().rstrip('\n')+'\n\n' for f in sorted(glob.glob('sections/*.html')))
css=''.join(f'<link rel="stylesheet" href="{V(f)}">\n' for f in sorted(glob.glob('sections/*.css')))
js=''.join(f'<script src="{V(f)}" defer></script>\n' for f in sorted(glob.glob('sections/*.js')))
out=t.replace('<!--SECTIONS-->\n',body).replace('<!--SECTION_CSS-->',css.rstrip('\n')).replace('<!--SECTION_JS-->',js.rstrip('\n'))
for f in ['site.css','site.js','../_kit/kit.css','../_kit/kit.js']:
    if os.path.exists(f): out=out.replace(f'"{f}"',f'"{V(f)}"')
open('index.html.tmp','w').write(out); os.replace('index.html.tmp','index.html')
print('index.html armado con',len(glob.glob('sections/*.html')),'secciones')
