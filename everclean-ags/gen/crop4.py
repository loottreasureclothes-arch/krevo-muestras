from PIL import Image
SRC = "/Users/emmanuelcruzsalas/Prospeccion-Web-Ags/krevo-muestras/everclean-ags/research/fotos"
GEN = "/Users/emmanuelcruzsalas/Prospeccion-Web-Ags/krevo-muestras/everclean-ags/gen"
hero = Image.open(f"{SRC}/hero-candidato_limpieza-vapor-sofa_ig.jpg").convert("RGB")
hero_c = hero.crop((95, 0, 286, 368))
hero_c.save(f"{GEN}/hero-src.png")
print(hero_c.size)
