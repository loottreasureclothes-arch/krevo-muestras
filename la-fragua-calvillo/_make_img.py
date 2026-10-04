from PIL import Image, ImageDraw, ImageFont
import os
R='research/fotos/presa/'
def mk(name, src, crop=None, widths=(480,960,1600), q=80):
    im=Image.open(R+src).convert('RGB')
    if crop: im=im.crop(crop)
    for w in widths:
        if w>im.width and w!=widths[0]: 
            continue
        w2=min(w,im.width)
        h=round(im.height*w2/im.width)
        im.resize((w2,h),Image.LANCZOS).save(f'img/{name}-{w}.webp','WEBP',quality=q,method=6)
    print(name, im.size)
mk('hero-p','maps-01.jpg',(380,0,1350,1080),(480,960))
mk('hero-l','maps-01.jpg',None)
mk('aguachile','maps-02.jpg',(0,300,1536,1836),(480,960))
mk('torre','maps-29.jpg',None,(480,960))
mk('mojarra','maps-04.jpg',(0,500,1536,1950),(480,960))
mk('alambres','maps-14.jpg',None,(480,960))
mk('michelada','maps-05.jpg',(0,200,1536,1736),(480,960))
mk('taquitos','maps-08.jpg',None,(480,))
mk('flan','maps-12.jpg',None,(480,960))
mk('pay','maps-13.jpg',None,(480,960))
mk('presa','maps-18.jpg',None)
mk('atardecer','maps-19.jpg',None)
mk('terraza','maps-11.jpg',None)
mk('mesa','maps-10.jpg',(0,0,2048,1340))
mk('portal','maps-23.jpg',None,(480,960))
mk('jardin','maps-24.jpg',None,(480,960))
mk('casa','maps-25.jpg',None,(480,960))
mk('letrero','maps-22.jpg',(0,450,1536,1350),(480,960,1600))
# favicon / apple touch / og
G=ImageFont.truetype('../../tools/fuentes/gloock/latin-normal-400.ttf',10)
def font(sz): return ImageFont.truetype('../../tools/fuentes/gloock/latin-normal-400.ttf',sz)
INK=(29,22,18); TEJA=(226,137,92); CREMA=(233,220,195)
def icon(sz):
    im=Image.new('RGB',(sz,sz),INK); d=ImageDraw.Draw(im)
    m=sz*0.18
    d.pieslice((m,m,sz-m,sz-m*0+sz*0.0+ (sz-2*m)),180,360,fill=TEJA)
    d.rectangle((m,sz/2,sz-m,sz-m),fill=TEJA)
    d.pieslice((m*2.1,m*2.1,sz-m*2.1,sz-m*2.1+ (sz-2*m*2.1)*0),180,360,fill=INK)
    d.rectangle((m*2.1,sz/2,sz-m*2.1,sz-m*1.0-sz*0.0),fill=INK)
    return im
icon(32).save('img/favicon-32.png'); icon(180).save('img/apple-touch-icon.png')
og=Image.new('RGB',(1200,630),INK)
ph=Image.open('img/hero-l-1600.webp').convert('RGB'); ph=ph.resize((1200,675)).crop((0,0,1200,630))
# photo right half in an arch
pw,pho=520,630
p=Image.open(R+'maps-01.jpg').convert('RGB').crop((380,0,1350,1080)).resize((pw,round(1080*pw/970)))
p=p.crop((0,0,pw,pho))
mask=Image.new('L',(pw,pho),0); md=ImageDraw.Draw(mask); md.rectangle((0,pw//2,pw,pho),fill=255); md.pieslice((0,0,pw,pw),180,360,fill=255); md.pieslice((0,0,pw,pw),0,180,fill=255)
og.paste(p,(680,0),mask)
d=ImageDraw.Draw(og)
d.text((60,150),'LA FRAGUA',font=font(104),fill=CREMA)
d.text((60,275),'Mariscos frente',font=font(54),fill=CREMA)
d.text((60,340),'a la presa.',font=font(54),fill=TEJA)
d.text((60,470),'Calvillo, Aguascalientes',font=font(32),fill=(190,175,150))
d.text((60,520),'4.6 en Google · 3,193 opiniones',font=font(28),fill=(190,175,150))
og.save('img/og.jpg',quality=88)
