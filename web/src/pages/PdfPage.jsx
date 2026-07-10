import './pdf.css';

/**
 * PdfPage — réplica del formato de entrega del profesor.
 * Times New Roman 12, interlineado 1.5, @page A4 margin 2.54cm, justificado,
 * título centrado, subtítulos en negrita. Botón flotante «Imprimir / Guardar
 * como PDF» (window.print()) oculto en @media print.
 *
 * Se enruta FUERA del Layout compartido: sin header ni footer (chrome), para
 * que la impresión salga limpia. Contenido = ensayo canónico v6.3 (<=5 páginas).
 */
export default function PdfPage() {
  return (
    <div className="pdf-root">
      <div className="pdf-actions">
        <a
          className="dl-btn"
          href="/ensayo-gorgias.pdf"
          download="Ensayo_Retorica_Gorgias_StevenVallejo.pdf"
        >
          ↓ Descargar PDF
        </a>
        <button className="print-btn" type="button" onClick={() => window.print()}>
          Imprimir
        </button>
      </div>

      <article className="pdf-article">
        <h1 className="titulo">
          La retórica como τέχνη y no ἐμπειρία: verificación aristotélica de los
          cuatro criterios socráticos del <em>Gorgias</em> (462b–466a)
        </h1>
        <hr className="sep" />

        <h2 className="subtitulo">Introducción</h2>
        <p>
          El <em>Gorgias</em> contiene la confrontación más extensa de Platón con
          la retórica como práctica política y educativa. En la Atenas democrática
          la palabra era casi la única vía de acción política: atacar la retórica
          era atacar la política misma. Sobre ese trasfondo, Sócrates define la
          retórica como «adulación» (κολακεία) y «práctica empírica» (ἐμπειρία),
          nunca como arte (τέχνη) (462b–466a). La distinción es epistemológica y
          teleológica: una τέχνη tiene (1) un objeto propio, (2) procede con razón y
          da cuenta de sus principios (λόγον ἔχει), (3) conoce sus causas (αἰτίαι) y
          (4) orienta su acción al bien (ἀγαθόν) de su objeto; una ἐμπειρία repite lo
          que produce placer sin poder decir su causa (465a).
        </p>
        <p>
          Defiendo una hipótesis que no abandona ese marco:{' '}
          <strong>
            acepto la jerarquía socrática —las τέχναι son superiores a las
            ἐμπειρίαι—, pero disputo que la retórica pertenezca a las segundas
          </strong>
          . El eje es la <em>Retórica</em> de Aristóteles, la refuerzo con dos
          anacronismos <em>declarados y acotados</em>: la teoría de la
          argumentación, <strong>solo</strong> para los principios racionales, y
          Cialdini, <strong>solo</strong> para el conocimiento de causas.
        </p>
        <p>
          <strong>Pregunta central:</strong> ¿puede mostrarse, dentro del marco
          epistemológico del propio Sócrates, que la retórica satisface los cuatro
          criterios de τέχνη y no es una ἐμπειρία?
        </p>
        <hr className="sep" />

        <h2 className="subtitulo">El problema y la clasificación del <em>Gorgias</em></h2>
        <p>
          <strong>Gorgias</strong> (447a–461b) define la retórica como arte de la
          persuasión y la proclama «el mayor bien», pues da poder sin ser experto
          en cada materia (452d–456a). Sócrates le arranca que produce «creencia
          sin el saber», no «ciencia» (454e). La refutación es elegante, pero
          descansa sobre una concesión que Sócrates generaliza: que la retórica{' '}
          <em>versa sobre la justicia</em>.
        </p>
        <p>
          <strong>Polo</strong> (461b–481b) abandona el arte y se queda con el
          poder desnudo. <strong>Calicles</strong> (481b–527e) radicaliza: opone
          φύσις a νόμος; en su boca la retórica es el instrumento con que el fuerte
          somete la asamblea a su apetito: el riesgo democrático en estado puro.
          Frente a él, Sócrates establece que el bien del alma es su orden (κόσμος):
          del orden resultan «la justicia y la moderación» (σωφροσύνη, 504d), de
          suerte que «un alma moderada es buena» (506e–507a), y el placer sin freno
          de Calicles es lo <em>des</em>-ordenado (508a).
        </p>
        <p>
          Sócrates clasifica la retórica como ἐμπειρία equiparándola a la cocina:
          como la culinaria simula a la medicina dando placer sin salud, la
          retórica simula a la justicia: es «un simulacro de una parte de la
          política» (463d) que «no se ocupa del bien» (464d).
        </p>
        <p>
          <strong>
            Primero, reduce el objeto de la retórica a «lo justo y lo injusto».
          </strong>
        </p>
        <p>
          <strong>
            Segundo, niega a la retórica principios racionales sin probarlo.
          </strong>{' '}
          La tesis de que es «irracional» (ἄλογον) y no puede «decir la causa»
          (465a) se apoya <em>únicamente</em> en que el orador persuade sin
          conocer la materia (459a–c). Pero eso describe un <em>uso posible</em>,
          no la naturaleza de la retórica: es una generalización indebida.
        </p>
        <hr className="sep" />

        <h2 className="subtitulo">
          Verificación de los cuatro requisitos de τέχνη
        </h2>
        <p>
          Una τέχνη exige, ante todo, un objeto propio que la distinga de las
          demás. Aristóteles: la retórica se divide en tres géneros, y la división
          se deduce de los tres tipos de oyente (<em>Retórica</em> I, 1358a–b). El
          deliberativo (συμβουλευτικόν) versa sobre lo conveniente; el judicial
          (δικανικόν), sobre lo justo y lo injusto; el epidíctico (ἐπιδεικτικόν),
          sobre lo bello y lo feo (<em>Retórica</em> I, 1358b). Sócrates toma uno
          solo —el judicial (454b–455a)— por el todo: la falacia de tomar la parte
          por el conjunto. La retórica no es ni el saber universal que Gorgias
          presumía (456a–c) ni la sola justicia, sino el arte que «considera en cada
          caso lo que es apto para persuadir» (<em>Retórica</em> I, 1355b). Primer
          criterio satisfecho.
        </p>
        <p>
          Aristóteles distingue tres pruebas técnicas (<em>Retórica</em> I,
          1356a): el ἦθος, el πάθος, y el λόγος, que persuade mediante el
          argumento. Suma los τόποι, y el entimema que llama «cuerpo de la prueba»
          (σῶμα τῆς πίστεως, <em>Retórica</em> I, 1354a). Perelman y
          Olbrechts-Tyteca (<em>La nueva retórica</em>, 1958) ilustran que la
          argumentación tiene racionalidad propia y no arbitraria: su{' '}
          <strong>auditorio universal</strong> —lo aceptable por todo ser
          razonable, no por el público que se halaga— es el criterio de esa
          racionalidad. Toulmin (<em>Los usos del argumento</em>, 1958) responde al
          cargo de informalidad lógica del entimema: su <em>backing</em> (respaldo)
          es cómo la retórica <strong>da razón</strong> de la garantía —el λόγον
          διδόναι que Sócrates reclama—. Segundo criterio satisfecho.
        </p>
        <p>
          El tercer criterio —el que Sócrates niega con más énfasis al decir que
          la retórica no puede «decir la causa» (465a)— exige conocer las αἰτίαι de
          lo que se produce. Quien las expone es Aristóteles: el libro II de la{' '}
          <em>Retórica</em> es un tratado causal de las pasiones —qué es cada una,
          ante quién y por qué se siente— que da <em>razón</em> de cada efecto; por
          eso es saber de causas y no la ἐμπειρία que Sócrates denuncia. Cialdini
          (<em>Influence</em>, 1984) no funda ese conocimiento: solo{' '}
          <em>cuantifica</em> con método experimental algunos efectos que
          Aristóteles ya explicaba causalmente. Tercer criterio satisfecho.
        </p>
        <hr className="sep" />

        <h2 className="subtitulo">Orientación al bien: el criterio decisivo</h2>
        <p>
          Sócrates sostiene que la retórica «pone su punto de mira en el placer sin
          el bien» (464d–465a). Pero, a diferencia de la cocina, no procura el
          placer <em>sorteando</em> el juicio, sino el asentimiento{' '}
          <em>mediante</em> λόγος dirigido a él: su fin propio no es la
          gratificación ciega, sino la <strong>convicción razonada</strong>, un
          bien del alma que la adulación no toca. ¿Y qué separa esa convicción de la{' '}
          <em>manipulada</em>, que también usa palabras? El auditorio que juzga: la
          retórica-τέχνη se dirige a un oyente capaz de sopesar razones y disentir
          —el «auditorio universal» de Perelman como ideal regulativo—, mientras la
          adulación explota resortes que sortean ese juicio. Enfrento la objeción en
          su forma fuerte, como una cadena de tres preguntas.
        </p>
        <p>
          <strong>
            (a) ¿Cómo puede la retórica orientarse al bien si no lo conoce?
          </strong>{' '}
          Aristóteles distingue la τέχνη de la φρόνησις (<em>Ética a Nicómaco</em>{' '}
          VI, 1140a–b); y porque la técnica no es la φρόνησις, puede emplearse mal:
          el dominio del arte no incluye la rectitud del fin. La retórica no
          establece qué es lo conveniente o lo justo —eso toca a la política y la
          ética, de las que toma sus premisas (<em>Retórica</em> I, 1356a)—; dado
          un fin, inscrito en sus tres géneros (deliberar, juzgar, alabar,{' '}
          <em>Retórica</em> I, 1358b),{' '}
          <strong>conoce los medios para persuadir respecto de él</strong>. Preciso
          aquí el cuarto criterio: exigir que la retórica{' '}
          <em>posea la ciencia del Bien moral</em> es pedirle lo que ninguna τέχνη
          productiva cumple —la medicina conoce la salud, bien del cuerpo, pero no
          la virtud—; basta que se ordene a su fin propio. Exigírselo solo a la
          retórica sería la arbitrariedad que ya denuncié.
        </p>
        <p>
          <strong>
            (b) Si conoce el fin, ¿en qué se diferencia de la justicia?
          </strong>{' '}
          La diferencia es de <em>objeto formal</em>: la justicia —en el esquema
          del diálogo (464b–c)— produce el orden del alma y hace <em>justo</em> al
          sujeto; la retórica no produce almas justas, sino{' '}
          <strong>
            discursos persuasivos sobre lo conveniente, lo justo y lo bello
          </strong>{' '}
          —converge con la justicia en parte de su materia (lo justo, en lo
          judicial) sin agotarse en ella (§2)—: conoce los medios para persuadir
          respecto del fin, pero no <em>es</em> la virtud que lo realiza.
        </p>
        <hr className="sep" />

        <h2 className="subtitulo">Objeción y respuesta</h2>
        <p>
          <strong>
            (c) ¿Entonces el retórico nunca podría actuar injustamente? Y si
            nunca, ¿no deja de ser la retórica un riesgo para la democracia?
          </strong>{' '}
          La pregunta descansa en el <strong>intelectualismo socrático</strong>{' '}
          (460a–c): quien conoce lo justo nunca obrará mal. (a) y (b) mostraron que
          conoce los <strong>medios</strong> para persuadir respecto de un fin, no
          la φρόνησις ni la justicia. Conocer los medios{' '}
          <strong>no garantiza el buen uso del arte</strong>, porque ninguna τέχνη
          lo garantiza: los medios sirven a fines opuestos según la voluntad del
          agente —su carácter (ἦθος)—, no según su técnica.
        </p>
        <p>
          De aquí la salida, que disuelve la disyuntiva sin negar ninguno de sus
          cuernos: la retórica <strong>se orienta a su fin</strong> y,{' '}
          <strong>a la vez, puede usarse injustamente</strong>, porque la
          orientación es del <em>arte</em> (su τέλος) y el uso, del <em>agente</em>{' '}
          (su elección). Que el retórico pueda manipular al pueblo no prueba que la
          retórica no sea arte, sino lo contrario: solo quien conoce de veras las
          causas del asentimiento puede manipular <em>con método</em>. Ese peligro
          sistemático es, paradójicamente, consecuencia de que la retórica es τέχνη.
        </p>
        <hr className="sep" />

        <h2 className="subtitulo">Conclusión</h2>
        <p>
          La clasificación de la retórica como ἐμπειρία reduce su objeto a lo
          justo, ignora los géneros deliberativo y epidíctico y le niega principios
          racionales sin demostración. Verificada frente a los cuatro criterios que
          el propio Sócrates establece, los satisface: tiene{' '}
          <strong>objeto propio</strong> (los tres géneros del discurso);{' '}
          <strong>principios técnicos</strong> —ἦθος, πάθος, λόγος y τόποι—, conoce
          sus <strong>causas</strong>, y —en la versión defendible del cuarto
          criterio, la que ninguna τέχνη cumple en su forma fuerte— se{' '}
          <strong>orienta a su fin propio</strong> sin confundirse con la justicia.
          La retórica es, pues, τέχνη y no ἐμπειρία. No abandono el marco de
          Sócrates: lo aplico con el rigor que él reclama, examinando la cosa y no
          la caricatura de sus adversarios.
        </p>
        <hr className="sep" />

        <h2 className="subtitulo">Bibliografía</h2>
        <p>
          <strong>Fuentes primarias</strong>
        </p>
        <ul className="bibliografia">
          <li>
            Aristóteles. (1985). <em>Ética a Nicómaco</em> (J. Pallí Bonet, Trad.).
            Madrid: Gredos.
          </li>
          <li>
            Aristóteles. (1990). <em>Retórica</em> (Q. Racionero, Trad.). Madrid:
            Gredos.
          </li>
          <li>
            Platón. (1983). <em>Gorgias</em> (J. Calonge, Trad.). Madrid: Gredos.
          </li>
        </ul>
        <p>
          <strong>Fuentes secundarias</strong>
        </p>
        <ul className="bibliografia">
          <li>
            Cialdini, R. B. (1984).{' '}
            <em>Influence: The Psychology of Persuasion</em>. Nueva York: William
            Morrow.
          </li>
          <li>
            Perelman, Ch. &amp; Olbrechts-Tyteca, L. (1958).{' '}
            <em>Traité de l&rsquo;argumentation: La nouvelle rhétorique</em>. París:
            PUF. [Trad. esp.: <em>Tratado de la argumentación. La nueva retórica</em>.
            Madrid: Gredos, 1989.]
          </li>
          <li>
            Toulmin, S. E. (1958). <em>The Uses of Argument</em>. Cambridge:
            Cambridge University Press. [Trad. esp.:{' '}
            <em>Los usos de la argumentación</em>. Barcelona: Península, 2007.]
          </li>
        </ul>
        <hr className="sep" />

        <p>
          <em>
            Ensayo final para el curso de Platón. Fecha de entrega: 17 de julio de
            2026.
          </em>
        </p>
      </article>
    </div>
  );
}
