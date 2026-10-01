import html, os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
_t=open('_build/template.src.html').read().replace('<!--SYMS-->', open('_build/syms.html').read().rstrip('\n'))
open('template.html','w').write(_t)
def title(lines, tag='h2', cls='', idd=''):
    """lines: list of (text, extra_class). Cada palabra va en span.w con --i."""
    out=[]; i=0
    for text, ex in lines:
        ws=[]
        for w in text.split(' '):
            ws.append(f'<span class="w" style="--i:{i}">{html.escape(w)}</span>'); i+=1
        out.append(f'<span class="bi-ln{(" "+ex) if ex else ""}">'+' '.join(ws)+'</span>')
    a=f' id="{idd}"' if idd else ''
    return f'<{tag}{a} class="bi-title {cls}" data-reveal>'+''.join(out)+f'</{tag}>'

GMAPS='https://maps.google.com/?cid=11383600013015527303'
DIR='https://www.google.com/maps/dir/?api=1&amp;destination=Brillantes+Inicios+Guarder%C3%ADa+IMSS+Ciudad+Industrial%2C+Cerro+de+Aconcagua+101-C%2C+Aguascalientes'
# Sello circular de maestra (azul, con el sol y "¡Listo!"), filo de tinta con feTurbulence. Sale al llegar a 7 de 7.
SEAL='''<span class="bi-seal" aria-hidden="true"><svg viewBox="0 0 120 120"><use href="#i-seal"/></svg></span>'''
STARS='<div class="bi-divider" aria-hidden="true">'+'<svg viewBox="0 0 24 24"><use href="#i-star"/></svg>'*5+'</div>'

# ------------ 10 hero
hero=f'''<section class="bi-hero bi-dark bi-doodle" id="top" aria-label="Brillantes Inicios">
  <div class="bi-wrap bi-hero-in">
    <div class="bi-hero-pics">
      <figure class="bi-foto bi-hero-main" style="--rot:-2deg;--tape:-5deg">
        <img src="img/recepcion-1000.webp" srcset="img/recepcion-480.webp 480w, img/recepcion-1000.webp 1000w" sizes="(max-width: 899px) 78vw, 520px" width="1000" height="1000" alt="Recepción de Brillantes Inicios: mostrador de madera y el logo dorado en la pared" fetchpriority="high" decoding="async">
        <figcaption>La recepción</figcaption>
      </figure>
      <figure class="bi-foto bi-hero-small" style="--rot:4deg;--tape:9deg">
        <img src="img/maestra-360.webp" srcset="img/maestra-360.webp 360w, img/maestra-720.webp 720w" sizes="(max-width: 899px) 36vw, 220px" width="720" height="950" alt="Personal de Brillantes Inicios con uniforme lila saluda desde el pasillo" decoding="async">
      </figure>
    </div>
    <div class="bi-hero-copy">
      <p class="bi-mark"><svg viewBox="0 0 48 48" aria-hidden="true"><use href="#i-sun"/></svg>Brillantes Inicios</p>
      {title([("Guardería gratis",""),("con tu IMSS.",""),("En Ciudad","t2"),("Industrial.","t2")],'h1','bi-title--xl')}
      <p class="bi-hero-line" data-reveal>Cerro de Aconcagua 101-C<br>Lunes a viernes de 7:00 a 17:00</p>
      <a class="bi-hero-proof" href="#opiniones" data-reveal><svg aria-hidden="true" viewBox="0 0 24 24"><use href="#i-star"/></svg><b>4.8</b> en Google · 45 opiniones</a>
      <div class="bi-hero-cta" data-reveal>
        <a class="bi-btn bi-btn--blue" href="#cartilla">Ver requisitos</a>
        <a class="bi-link" href="{DIR}" target="_blank" rel="noopener">Cómo llegar<svg aria-hidden="true"><use href="#i-arrow"/></svg></a>
      </div>
    </div>
  </div>
</section>'''
open('sections/10-hero.html','w').write(hero+'\n')

# ------------ 20 cartilla
docs=[('acta','Acta de nacimiento','Original o copia certificada, y una copia simple'),
('curp','CURP del niño o niña','Solo si el acta no la trae'),
('salud','Cartilla Nacional de Salud','El original'),
('examen','Solicitud de examen médico de admisión','Ya llenada'),
('id','Identificación oficial con foto','De la persona trabajadora asegurada'),
('solicitud','Solicitud de inscripción a guardería del IMSS',''),
('platica','Constancia de plática de nuevo ingreso','')]
lis=''
for id_,t,s in docs:
    small=f'<small>{s}</small>' if s else ''
    lis+=f'''
        <li><label class="bi-doc"><input type="checkbox" data-doc="{id_}"><span class="bi-box" aria-hidden="true"><svg viewBox="0 0 44 44"><path class="bi-tick" d="M10 24C13 27 16 30.5 19 33.5C24 26 29 18.5 35 11.5"/></svg></span><span class="bi-doc-t"><b>{t}</b>{small}</span><svg class="bi-sticker" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-star"/></svg></label></li>'''
cart=f'''<section class="bi-sec bi-dark bi-doodle bi-cartilla" id="cartilla" data-hide-wa aria-labelledby="cartilla-h">
  <div class="bi-wrap">
    <div class="bi-cart-side">
      {title([("7 papeles",""),("y un clic en STIGI.","t2")],'h2','','cartilla-h')}
      <div class="bi-cart-meter" aria-hidden="true">
        <p class="bi-cart-n"><b id="bi-side-n">0</b><span>de 7</span></p>
        <p class="bi-cart-lbl" id="bi-side-txt">documentos listos</p>
        <span class="bi-cart-bar"><i id="bi-side-bar"></i></span>
        <p class="bi-cart-tip">Marca lo que ya tienes y tu mensaje de WhatsApp se arma solo.</p>
      </div>
    </div>
    <div class="bi-sheet bi-cart-sheet" data-reveal>
      {SEAL}
      <p class="bi-count" aria-live="polite"><span id="bi-count-txt">Te faltan 7 documentos</span></p>
      <ol class="bi-steps">
        <li class="bi-step">
          <h3><span class="bi-num">1</span>Reúne tus documentos</h3>
          <p class="bi-hint">Marca los que ya tienes.</p>
          <ul class="bi-docs">{lis}
          </ul>
        </li>
        <li class="bi-step">
          <h3><span class="bi-num">2</span>Inscribe en STIGI</h3>
          <p class="bi-hint">Es el sitio del IMSS. Se abre en otra pestaña.</p>
          <a class="bi-btn bi-btn--blue" href="https://stigi.imss.gob.mx" target="_blank" rel="noopener">Inscribir en STIGI<svg aria-hidden="true"><use href="#i-ext"/></svg></a>
        </li>
        <li class="bi-step">
          <h3><span class="bi-num">3</span>Agenda tu visita</h3>
          <div class="bi-fields">
            <label class="bi-field"><span>Edad de tu bebé</span><input type="text" id="bi-edad" autocomplete="off" maxlength="30" placeholder="Por ejemplo: 8 meses"></label>
            <label class="bi-field"><span>Tu nombre</span><input type="text" id="bi-nombre" autocomplete="name" maxlength="60" placeholder="Como te digamos"></label>
          </div>
          <p class="bi-preview" id="bi-preview"></p>
          <a class="bi-btn bi-btn--wa" data-wa-cartilla href="https://wa.me/524491927631?text=Hola%20Brillantes%20Inicios%2C%20quiero%20inscribir%20a%20mi%20beb%C3%A9.%20%C2%BFCu%C3%A1ndo%20puedo%20visitarlos%3F" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg><span>Agendar visita</span><span class="bi-vh"> por WhatsApp</span></a>
        </li>
      </ol>
      <ul class="bi-notes">
        <li>Según el IMSS: niños desde 43 días de nacidos hasta que cumplan 4 años.</li>
        <li>Cuando la guardería te acepta, tienes 7 días hábiles para concluir el trámite.</li>
        <li>También te piden datos: número de seguridad social, domicilio, teléfonos, correo y datos de tu trabajo.</li>
        <li class="bi-src">Fuente: <a href="https://www.imss.gob.mx/tramites/imss01006" target="_blank" rel="noopener">imss.gob.mx/tramites/imss01006</a></li>
      </ul>
    </div>
  </div>
</section>'''
open('sections/20-cartilla.html','w').write(cart+'\n')

# ------------ 30 salas
salas=f'''<section class="bi-sec bi-deep bi-salas" id="salas" aria-labelledby="salas-h">
  <div class="bi-wrap">
    {title([("Cunitas, sillas altas",""),("y su maestra.","t2")],'h2','','salas-h')}
  </div>
  <figure class="bi-salas-hero">
    <img src="img/hero-960.webp" srcset="img/hero-480.webp 480w, img/hero-960.webp 960w, img/hero-1600.webp 1600w" sizes="(max-width: 760px) 100vw, 780px" width="1600" height="1339" alt="Sala de la guardería con cunitas, sillas altas y una maestra con uniforme lila; las caritas de los bebés van tapadas con el sol de Brillantes" loading="lazy" decoding="async">
    <figcaption class="bi-wrap"><b>01</b><span>SALA</span><em>Un día normal con peques</em></figcaption>
  </figure>
  <div class="bi-wrap bi-salas-pics">
    <figure class="bi-foto bi-foto--b" style="--rot:1.8deg;--tape:3deg" data-reveal>
      <img src="img/salon-480.webp" srcset="img/salon-480.webp 480w, img/salon-900.webp 900w" sizes="(max-width: 760px) 78vw, 360px" width="900" height="667" alt="Salón con mesitas y sillitas de colores" loading="lazy" decoding="async">
      <figcaption>Mesitas y sillitas de colores</figcaption>
    </figure>
    <figure class="bi-foto bi-foto--a" style="--rot:-2.4deg" data-reveal>
      <img src="img/fruta-480.webp" srcset="img/fruta-480.webp 480w, img/fruta-960.webp 960w" sizes="(max-width: 760px) 84vw, 360px" width="960" height="910" alt="Vasitos con sandía, jícama y pepino picados" loading="eager" decoding="async">
      <figcaption>Menús saludables y balanceados</figcaption>
    </figure>
    <blockquote class="bi-quote" data-reveal>
      <p>“Alimentación balanceada y súper estricta en horarios.”</p>
      <footer>Anahi Leyva, opinión en Google</footer>
    </blockquote>
  </div>
</section>'''
open('sections/30-salas.html','w').write(salas+'\n')

# ------------ 40 opiniones
def stars_svg(n=5):
    return ''.join('<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-star"/></svg>' for _ in range(n))
def big_star(fill):
    return f'<span class="bi-star"><svg class="bg" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-star"/></svg><span class="fill" style="width:{fill}%"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-star"/></svg></span></span>'
revs=[('Anahi Leyva','Excelente guardería, tengo a mis dos bebés en salas diferentes y 10/10, salen contentos… Alimentación balanceada y súper estricta en horarios… he notado un gran avance','-1.1deg'),
('Flor Gonzalez','Mi bebé había tenido experiencia en otras, pero no lograba adaptarse; aquí se adaptó en aproximadamente un mes. Nos han apoyado mucho para que acepte una mayor variedad de alimentos','.9deg'),
('Martha Yadira Barrios Marin','Súper recomendada… ahora está feliz, ya sonríe cuando llegamos… las maestras son un amor; la directora muy accesible y amable','-.7deg')]
HL={'Anahi Leyva':'salen contentos','Flor Gonzalez':'se adaptó en aproximadamente un mes','Martha Yadira Barrios Marin':'las maestras son un amor'}
rv=''
for n,q,rot in revs:
    q=html.escape(q).replace(HL[n],f'<mark class="bi-hl">{HL[n]}</mark>',1)
    rv+=f'''
      <li class="bi-sheet bi-rev" style="--rot:{rot}" data-reveal>
        <p class="bi-rev-stars" role="img" aria-label="5 de 5 estrellas">{stars_svg()}</p>
        <blockquote>“{q}”</blockquote>
        <p class="bi-rev-name">{n}</p>
      </li>'''
op=f'''<section class="bi-sec bi-dark bi-doodle bi-ops" id="opiniones" aria-labelledby="ops-h">
  <div class="bi-wrap">
    {title([("Los papás dicen:",""),("salen contentos.","t2")],'h2','','ops-h')}
    <div class="bi-score" id="bi-score">
      <p class="bi-big" data-reveal aria-label="4.8 de 5">4.8</p>
      <div class="bi-bigstars" id="bi-bigstars" role="img" aria-label="4.8 de 5 estrellas">{big_star(100)}{big_star(100)}{big_star(100)}{big_star(100)}{big_star(80)}</div>
      <a class="bi-gmaps" href="{GMAPS}" target="_blank" rel="noopener">45 opiniones en Google</a>
    </div>
    <ul class="bi-revs" id="bi-revs" tabindex="0" aria-label="Opiniones de papás en Google">{rv}
    </ul>
    <p class="bi-revdots" aria-hidden="true"><i class="is-on"></i><i></i><i></i></p>
    <p class="bi-all"><a class="bi-link" href="{GMAPS}" target="_blank" rel="noopener">Ver las 45 en Google<svg aria-hidden="true"><use href="#i-arrow"/></svg></a></p>
    {STARS}
  </div>
</section>'''
open('sections/40-opiniones.html','w').write(op+'\n')

# ------------ 50 donde
soc=''.join(f'<li><a href="{u}" target="_blank" rel="noopener" aria-label="{n}"><svg aria-hidden="true"><use href="#{i}"/></svg></a></li>' for n,u,i in [
('Facebook','https://www.facebook.com/brillantesinicios','i-fb'),('Instagram','https://www.instagram.com/brillantes_inicios/','i-ig'),
('TikTok','https://www.tiktok.com/@brillantes.inicio','i-tt'),('YouTube','https://www.youtube.com/@BrillantesInicios','i-yt')])
donde=f'''<section class="bi-sec bi-deep bi-donde" id="donde" data-hide-wa aria-labelledby="donde-h">
  <div class="bi-wrap bi-donde-in">
    <div class="bi-donde-head">
      {title([("Cerro de Aconcagua",""),("101-C.","t2")],'h2','','donde-h')}
    </div>
    <figure class="bi-foto bi-fachada" style="--rot:-1.4deg;--tape:4deg" data-reveal>
      <img src="img/fachada-960.webp" srcset="img/fachada-480.webp 480w, img/fachada-960.webp 960w, img/fachada-1400.webp 1400w" sizes="(max-width: 859px) 92vw, 620px" width="1400" height="849" alt="Fachada de Brillantes Inicios: muro rojo con estrellas y el logo, mural y portón blanco" loading="lazy" decoding="async">
      <figcaption>Así se ve por fuera: el muro rojo con estrellas y el portón blanco</figcaption>
    </figure>
    <div class="bi-donde-info">
      <p class="bi-open" id="bi-open" data-reveal><i aria-hidden="true"></i><span id="bi-open-txt">Lunes a viernes de 7:00 a 17:00</span></p>
      <dl class="bi-hours" data-reveal>
        <div><dt>Lunes a viernes</dt><dd>7:00 a 17:00</dd></div>
        <div><dt>Sábado y domingo</dt><dd>Cerrado</dd></div>
      </dl>
      <ul class="bi-contact" data-reveal>
        <li><span>Teléfono</span><a href="tel:+524496241782">449 624 1782</a></li>
        <li><span>WhatsApp</span><a href="https://wa.me/524491927631?text=Hola%20Brillantes%20Inicios%2C%20quiero%20informaci%C3%B3n." data-wa target="_blank" rel="noopener">449 192 7631</a></li>
      </ul>
      <a class="bi-btn bi-btn--wa bi-donde-wa" data-wa href="https://wa.me/524491927631?text=Hola%20Brillantes%20Inicios%2C%20quiero%20informaci%C3%B3n." target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg>Escríbenos por WhatsApp</a>
    </div>
    <div class="bi-donde-map">
      <div class="bi-foto bi-map" style="--rot:1.2deg;--tape:-3deg" data-reveal>
        <iframe title="Mapa: Brillantes Inicios, Cerro de Aconcagua 101-C, Aguascalientes" src="https://www.google.com/maps?q=Brillantes+Inicios+Guarder%C3%ADa+IMSS+Ciudad+Industrial&amp;ll=21.8315435,-102.2956786&amp;z=16&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <a class="bi-btn bi-btn--blue" href="{DIR}" target="_blank" rel="noopener">Cómo llegar</a>
    </div>
    <div class="bi-donde-foot">
      <ul class="bi-social" aria-label="Redes de Brillantes Inicios">{soc}</ul>
      <p class="bi-dir">Guardería del esquema IMSS. Aparece en el directorio oficial de guarderías 2025.</p>
    </div>
  </div>
</section>'''
open('sections/50-donde.html','w').write(donde+'\n')

# ------------ 60 cierre
todo=['Logo en alta','Fotos en alta de salas, cocina y patio','Edades y capacidad por sala','Nombre de la directora','Si aceptan pago particular','Link de cobro, si aplica']
tl=''.join(f'<li>{t}</li>' for t in todo)
IG='https://www.instagram.com/brillantes_inicios/'
posts=[('01','-4deg','-6deg','Post: No hay niños difíciles, hay niños que necesitan más empatía y paciencia'),
('04','2deg','5deg','Post: ¿Te quedaste sin ideas para el lunch?'),
('02','-1deg','-3deg','Post: Alerta de lenguaje que debes conocer, y cuándo consultar al especialista')]
pp=''.join(f'''
        <li><a class="bi-foto bi-post" style="--rot:{r};--tape:{t}" href="{IG}" target="_blank" rel="noopener" data-reveal><img src="img/post-{n}-480.webp" width="480" height="480" alt="{a}" loading="lazy" decoding="async"><span>@brillantes_inicios</span></a></li>''' for n,r,t,a in posts)
cierre=f'''<section class="bi-sec bi-dark bi-doodle bi-cierre" id="cierre" data-hide-wa aria-labelledby="cierre-h">
  <div class="bi-wrap">
    <div class="bi-cierre-main">
      {title([("“Ya sonríe",""),("cuando llegamos.”","t2")],'h2','','cierre-h')}
      <p class="bi-cierre-who" data-reveal><span class="bi-rev-stars" aria-label="5 de 5 estrellas">{stars_svg()}</span>Martha Yadira Barrios Marin · mamá, opinión en Google</p>
      <p class="bi-cierre-doc" id="bi-cierre-doc" data-reveal>Marca lo que ya tienes en la cartilla y se suma a tu mensaje.</p>
      <div class="bi-cierre-act">
        <a class="bi-btn bi-btn--wa bi-cierre-wa" data-wa-cartilla href="https://wa.me/524491927631?text=Hola%20Brillantes%20Inicios%2C%20quiero%20inscribir%20a%20mi%20beb%C3%A9.%20%C2%BFCu%C3%A1ndo%20puedo%20visitarlos%3F" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg>Agendar visita por WhatsApp</a>
        {SEAL}
      </div>
    </div>
    <div class="bi-ig">
      <p class="bi-ig-h"><svg aria-hidden="true"><use href="#i-ig"/></svg>De su Instagram: lo que les comparten a los papás</p>
      <ul class="bi-posts">{pp}
      </ul>
    </div>
    <div class="bi-sheet bi-todo" data-reveal>
      <h3>Todo listo para completar</h3>
      <p class="bi-todo-who">Para la guardería: lo que nos falta para dejarla lista.</p>
      <ol>{tl}</ol>
      <p>Tarjeta en línea: te mandamos el link.</p>
      <p class="bi-todo-send">Pásanoslo por el mismo chat donde te llegó esta muestra.</p>
    </div>
  </div>
</section>'''
open('sections/60-cierre.html','w').write(cierre+'\n')
print('ok')
