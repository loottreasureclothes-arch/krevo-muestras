#!/usr/bin/env python3
"""Lista corta de componentes firma ya usados (una línea por sitio, ~1 KB) para no leer COMPONENTES-USADOS.md completo."""
import re
import os
p = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'COMPONENTES-USADOS.md')
vistos = {}
for l in open(p, encoding='utf-8'):
    if not l.startswith('|') or '---' in l or 'Componente firma' in l:
        continue
    c = [x.strip() for x in l.strip().strip('|').split('|')]
    if len(c) < 2:
        continue
    nombre = re.split(r'[:(.;]', c[1])[0].strip()[:70]
    vistos[c[0]] = nombre
for s, n in vistos.items():
    print(f'{s}: {n}')
