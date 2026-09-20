from PIL import Image, ImageDraw, ImageFont
GEN = "/Users/emmanuelcruzsalas/Prospeccion-Web-Ags/krevo-muestras/everclean-ags/gen"
IMG = "/Users/emmanuelcruzsalas/Prospeccion-Web-Ags/krevo-muestras/everclean-ags/img"

canvas = Image.new("RGB", (1200,630), (4,18,51))
hero = Image.open(f"{GEN}/hero-x4.png").convert("RGB")
# cover derecho 600x630
hw, hh = hero.size
scale = max(600/hw, 630/hh)
hero_r = hero.resize((int(hw*scale), int(hh*scale)), Image.LANCZOS)
x0 = (hero_r.width-600)//2
y0 = (hero_r.height-630)//2
hero_c = hero_r.crop((x0,y0,x0+600,y0+630))
canvas.paste(hero_c, (600,0))

logo = Image.open(f"{IMG}/logo/logo-header.webp").convert("RGB")
lw = 180
logo_r = logo.resize((lw, int(lw*logo.size[1]/logo.size[0])), Image.LANCZOS)
canvas.paste(logo_r, (60,60))

draw = ImageDraw.Draw(canvas)
try:
    f1 = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 46)
    f2 = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 26)
except Exception:
    f1 = ImageFont.load_default()
    f2 = f1
draw.text((60,255), "Trabajamos los domingos.", font=f1, fill=(238,243,247))
draw.text((60,310), "Y el domicilio es gratis.", font=f1, fill=(30,150,195))
draw.text((60,385), "Limpieza a vapor a domicilio en Aguascalientes.", font=f2, fill=(200,215,230))
canvas.save(f"{IMG}/og.jpg", quality=88)
print("og.jpg", canvas.size)
