import random
OUT='/Users/emmanuelcruzsalas/Prospeccion-Web-Ags/krevo-muestras/moviment/sections/00-venecita.css'
TONES=['#3C6B7F','#638C9D','#8EADBA','#BACFD9']; PUR='#5C5D9D'; N=27
random.seed(7)
def rows(nr):
    g=[]
    for r in range(nr):
        row=[]
        for i in range(N):
            if (i+ r*4)%9==4: row.append(PUR); continue
            while True:
                t=random.choice(TONES)
                if row and row[-1]==t: continue
                if r and g[r-1][i]==t: continue
                break
            row.append(t)
        g.append(row)
    return g
def tile(cell,gap,nr,g):
    w=N*cell; h=nr*cell
    s=f"<svg xmlns='http://www.w3.org/2000/svg' width='{w}' height='{h}' shape-rendering='crispEdges'>"
    for r in range(nr):
        for i in range(N):
            s+=f"<rect x='{i*cell}' y='{r*cell}' width='{cell-gap}' height='{cell-gap}' fill='{g[r][i].replace('#','%23')}'/>"
    s+="</svg>"
    return f'url("data:image/svg+xml,{s}")',w,h
g2=rows(2); g1=[g2[0]]
t={}
t['8-1']=tile(8,1.5,1,g1); t['8-2']=tile(8,1.5,2,g2)
t['6-1']=tile(6,1.2,1,g1); t['6-2']=tile(6,1.2,2,g2)
t['3-2']=tile(3,.9,2,g2); t['5-1']=tile(5,1,1,g1)
css="/* Venecita del tanque: cenefa medida (4 tonos del agua y un morado del sello cada nueve). Generado por gen_vn.py */\n:root{\n"
for k,(u,w,h) in t.items(): css+=f"  --vn{k}:{u};\n"
css+="}\n"
css+=f""".mv-vn,.mv-vn2,.mv-vnh{{display:block;width:100%;background-repeat:repeat-x;background-position:0 0;pointer-events:none}}
.mv-vn{{height:8px;background-image:var(--vn8-1);background-size:{t['8-1'][1]}px 8px}}
.mv-vn2{{height:16px;background-image:var(--vn8-2);background-size:{t['8-2'][1]}px 16px}}
.mv-vnh{{height:6px;background-image:var(--vn3-2);background-size:{t['3-2'][1]}px 6px}}
@media (max-width:640px){{
.mv-vn{{height:6px;background-image:var(--vn6-1);background-size:{t['6-1'][1]}px 6px}}
.mv-vn2{{height:12px;background-image:var(--vn6-2);background-size:{t['6-2'][1]}px 12px}}
}}
"""
open(OUT,'w').write(css); print(len(css))
