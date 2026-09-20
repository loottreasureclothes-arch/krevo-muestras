from PIL import Image
GEN = "/Users/emmanuelcruzsalas/Prospeccion-Web-Ags/krevo-muestras/everclean-ags/gen"
IMG = "/Users/emmanuelcruzsalas/Prospeccion-Web-Ags/krevo-muestras/everclean-ags/img"
logo = Image.open(f"{GEN}/logo-src.png").convert("RGB")
w,h = logo.size
icon = logo.crop((int(w*0.20), int(h*0.06), int(w*0.84), int(h*0.55)))
bg = Image.new("RGB", (600,600), (0,0,45))
ic = icon.resize((500, int(500*icon.size[1]/icon.size[0])), Image.LANCZOS)
bg.paste(ic, ((600-ic.size[0])//2, (600-ic.size[1])//2))
for size, name in [(32,"favicon-32.png"),(180,"apple-touch-icon.png"),(512,"og-icon.png")]:
    bg.resize((size,size), Image.LANCZOS).save(f"{IMG}/{name}")
