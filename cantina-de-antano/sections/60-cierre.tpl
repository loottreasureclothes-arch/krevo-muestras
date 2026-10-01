<section class="cierre" id="mesa" data-hide-wa aria-labelledby="mesa-t">
  <div class="tira" aria-hidden="true"></div>
  <div class="wrap cierre-in">
    <h2 class="tt" id="mesa-t" data-drop><span class="ln">Tu mesa,</span><span class="ln">en primera fila.</span></h2>

    <form class="ficha lobby on-crema" id="ficha" novalidate>
      <fieldset class="modo">
        <legend class="sr">Qué necesitas</legend>
        <label class="seg"><input type="radio" name="modo" value="mesa" checked><span>Apartar mesa</span></label>
        <label class="seg"><input type="radio" name="modo" value="evento"><span>Cotizar evento</span></label>
      </fieldset>

      <fieldset class="f-suc">
        <legend class="f-l">Sucursal</legend>
        <label class="opt"><input type="radio" name="suc" value="colosio" checked><span>Colosio</span></label>
        <label class="opt"><input type="radio" name="suc" value="anita"><span>Sta. Anita</span></label>
        <label class="opt"><input type="radio" name="suc" value="nacozari"><span>Nacozari</span></label>
        <label class="opt"><input type="radio" name="suc" value="jpani"><span>J. Pani</span></label>
      </fieldset>

      <div class="f-row">
        <span class="f-l" id="l-pers">Personas</span>
        <div class="qs" role="group" aria-labelledby="l-pers">
          <button type="button" data-pers="-1" aria-label="Una persona menos">&minus;</button>
          <output id="f-pers" aria-live="polite">4</output>
          <button type="button" data-pers="1" aria-label="Una persona más">+</button>
        </div>
      </div>

      <div class="f-row f-when" id="f-when">
        <fieldset class="f-dia">
          <legend class="f-l">Día</legend>
          <label class="opt opt--s"><input type="radio" name="dia" value="hoy" checked><span>Hoy</span></label>
          <label class="opt opt--s"><input type="radio" name="dia" value="manana"><span>Mañana</span></label>
        </fieldset>
        <label class="f-hora"><span class="f-l">Hora</span>
          <select id="f-hora" name="hora"><!--HORAS--></select>
        </label>
      </div>

      <label class="f-nom"><span class="f-l">Nombre <i>(opcional)</i></span>
        <input id="f-nombre" name="nombre" type="text" autocomplete="given-name" maxlength="40" placeholder="Para quién apartamos">
      </label>

      <p class="f-hint" id="f-hint" aria-live="polite"></p>

      <div class="f-mesa">
        <h3 class="f-l">Lo que pensamos pedir</h3>
        <ul class="f-lines" id="f-lines"></ul>
        <p class="f-vacio" id="f-vacio">Aún no agregas nada. Es opcional. <a href="#carta">Ver&nbsp;la&nbsp;carta</a></p>
        <p class="f-tot mq" id="f-tot" hidden><span>Total aproximado</span><b id="f-total">$0</b></p>
        <p class="f-note" id="f-tnote" hidden>Se confirma en la cantina.</p>
      </div>

      <a class="btn btn--wa" id="mesa-wa" href="https://wa.me/524491721073?text=Hola%20La%20Cantina%20de%20Anta%C3%B1o%2C%20quiero%20apartar%20mesa." target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg><span id="mesa-wa-t">Apartar mesa por WhatsApp</span></a>
      <p class="f-note">Se abre tu WhatsApp con el mensaje ya escrito. Tú lo mandas.</p>
    </form>

    <div class="listo" id="listo" data-reveal>
      <h3 class="tt tt--s" data-drop><span class="ln">Todo listo</span><span class="ln">para completar.</span></h3>
      <ul class="check">
        <li>WhatsApp de atención confirmado</li>
        <li>Carta vigente con fecha</li>
        <li>Fotos profesionales de platillos, cocteles y música en vivo</li>
        <li>Promos del mes (la de tacos 2x1 fue de septiembre)</li>
        <li>Cómo quieren recibir reservas por sucursal</li>
        <li>Link de cobro para anticipos de eventos</li>
        <li>Dominio propio (hoy solo tienen un Google Sites de imágenes)</li>
      </ul>
      <p class="listo-n">Tarjeta en línea: te mandamos el link.</p>
      <p class="listo-n">Pásanoslo por el mismo chat donde te llegó esta muestra.</p>
    </div>
  </div>
</section>
