from PIL import Image
import os
R='research/fotos/maps/'
def out(name, src, box=None, widths=(480,960,1600)):
    im=Image.open(R+src).convert('RGB')
    if box:
        W,H=im.size; im=im.crop((int(box[0]*W),int(box[1]*H),int(box[2]*W),int(box[3]*H)))
    for w in widths:
        if w>im.width and w!=widths[0]: continue
        r=im.resize((w,round(im.height*w/im.width)),Image.LANCZOS) if w<=im.width else im
        r.save(f'img/{name}-{w}.webp','WEBP',quality=80,method=6)
    print(name, im.size)
out('hero','maps-01.jpg')
out('fruta','maps-11.jpg')
out('pizarra','maps-06.jpg',(0,0,1,0.78))
out('salon','maps-10.jpg',(0,0,0.64,1))
out('lateral','maps-12.jpg')
out('sticker','maps-17.jpg',(0.08,0.04,0.92,0.68))
out('zarza','maps-16.jpg')
