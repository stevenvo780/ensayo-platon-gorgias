/**
 * Presentación — 13 slides. Sin andamiaje de índice (nada de «§1», «Criterio N»):
 * cada diapositiva es un título y UN solo bloque de prosa que fluye. Alineada
 * con el manuscrito v6.3. `title` y `body` son JSX (cursivas, griego, énfasis).
 */

import {
  TechneVsEmpeiria,
  FourCriteriaOrbit,
  ThreeGenres,
  EthosPathosLogos,
  CausalMechanism,
  ChainABC,
  ArtVsAgent,
} from '../components/diagrams/index.js';

const gk = (t) => <span className="gk">{t}</span>;

export const slides = [
  // 1 · Portada
  {
    id: 'portada',
    kicker: 'Seminario Gorgias y Fedón · Prof. Juan Camilo Toro',
    title: (
      <>
        La retórica como {gk('τέχνη')}
        <br />y no {gk('ἐμπειρία')}
      </>
    ),
    variant: 'cover',
    body: (
      <>
        <div className="deck-divider" />
        <p className="deck-sub">
          Verificación aristotélica de los cuatro criterios socráticos del{' '}
          <em>Gorgias</em> (462b–466a).
        </p>
        <div className="deck-meta">
          Steven Vallejo
          <br />
          Entrega: 17 de julio de 2026
        </div>
      </>
    ),
  },

  // 2 · El problema
  {
    id: 'el-problema',
    title: <>Sócrates: la retórica es adulación, no arte</>,
    diagram: <TechneVsEmpeiria />,
    body: (
      <p className="deck-lead">
        En el <em>Gorgias</em> (462b–466a), Sócrates le niega a la retórica el rango
        de arte ({gk('τέχνη')}): la llama adulación ({gk('κολακεία')}) y práctica
        empírica ({gk('ἐμπειρία')}), y la compara con la cocina, que agrada al cuerpo
        sin conocer lo que de verdad le conviene. La distinción, para él, es
        epistemológica y también teleológica, porque un arte tiene un objeto propio,
        procede con razón y da cuenta de sus principios ({gk('λόγον ἔχει')}), conoce
        sus causas ({gk('αἰτίαι')}) y se orienta al bien de aquello sobre lo que
        actúa, mientras que una mera práctica repite lo que agrada sin poder decir
        por qué funciona.
      </p>
    ),
  },

  // 3 · Pregunta + tesis
  {
    id: 'pregunta-tesis',
    title: <>¿Puede mostrarse que es {gk('τέχνη')}?</>,
    body: (
      <p className="deck-lead">
        Mi pregunta es si puede mostrarse, sin salir del marco epistemológico del
        propio Sócrates, que la retórica es un arte y no una simple rutina, es decir,
        si satisface su objeto propio, sus principios racionales, su conocimiento de
        causas y su orientación al bien. Acepto la jerarquía socrática, según la cual
        los verdaderos artes valen más que las meras prácticas, pero disputo que la
        retórica caiga entre estas últimas, y para verlo la someto a los cuatro
        criterios que el propio Sócrates fija, con la <em>Retórica</em> de Aristóteles
        como eje. Me apoyo, además, en dos anacronismos que declaro y acoto: la teoría
        moderna de la argumentación, solo para los principios racionales, y Cialdini,
        solo para el conocimiento de causas.
      </p>
    ),
  },

  // 4 · Los tres interlocutores
  {
    id: 'tres-interlocutores',
    title: <>Tres interlocutores, un mismo poder</>,
    body: (
      <p className="deck-lead">
        El diálogo avanza por tres interlocutores que defienden un mismo poder con
        crudeza creciente. Gorgias proclama la retórica como el mayor de los bienes,
        capaz de dar poder sin ser experto en nada, y Sócrates lo atrapa enseguida,
        porque lo que ese poder produce es creencia sin saber, no ciencia. Polo se
        queda entonces con el poder desnudo, el del tirano que hace lo que le parece,
        pero Sócrates le muestra que no hace lo que de verdad quiere, porque cometer
        injusticia es peor que padecerla. Y Calicles lleva la posición al límite,
        opone la naturaleza ({gk('φύσις')}) a la ley ({gk('νόμος')}) y reivindica el
        placer sin freno: es el riesgo democrático en estado puro, del que retengo el
        riesgo pero no la tesis.
      </p>
    ),
  },

  // 5 · La clasificación es arbitraria
  {
    id: 'clasificacion-arbitraria',
    title: <>Dos movimientos que no prueba</>,
    body: (
      <p className="deck-lead">
        La clasificación de Sócrates descansa en dos movimientos que en ningún
        momento demuestra. Primero reduce el objeto de la retórica a lo justo y lo
        injusto, esto es, a un solo género, el judicial, e ignora el deliberativo y el
        epidíctico. Después le niega principios racionales sin probarlo, pues del
        hecho de que algunos oradores persuadan sin saber no se sigue que la retórica
        como tal carezca de principios: es una generalización indebida, que toma un
        uso posible por la naturaleza misma de la cosa.
      </p>
    ),
  },

  // 6 · Los 4 criterios
  {
    id: 'cuatro-criterios',
    title: <>Los cuatro requisitos de {gk('τέχνη')}</>,
    diagram: <FourCriteriaOrbit />,
    body: (
      <p className="deck-lead">
        Del diálogo se siguen cuatro rasgos que separan un arte de una rutina, y
        verifico la retórica contra cada uno: que tenga un objeto propio, que proceda
        por principios racionales ({gk('λόγον ἔχει')}), que conozca las causas
        ({gk('αἰτίαι')}) de lo que produce y que se oriente al bien. Los tres primeros
        preparan el terreno; el cuarto, la orientación al bien, es el decisivo, y en
        él se juega toda la refutación.
      </p>
    ),
  },

  // 7 · Criterio 1
  {
    id: 'criterio-1',
    title: <>El objeto propio: los tres géneros</>,
    diagram: <ThreeGenres />,
    body: (
      <p className="deck-lead">
        El primer requisito de un arte es un objeto propio que lo distinga de los
        demás, y Aristóteles muestra que la retórica lo tiene, porque su división en
        tres géneros no es estipulativa, sino que se deduce de la posición del oyente
        ante el tiempo (<em>Retórica</em> I, 1358a–b). El discurso deliberativo versa
        sobre lo conveniente y mira al futuro de la ciudad; el judicial, sobre lo
        justo y lo injusto de un hecho pasado; y el epidíctico, sobre lo bello y lo
        feo, por elogio y censura. Sócrates tomó uno solo de los tres, el judicial, y
        lo hizo pasar por el todo, pero el objeto de la retórica excede con mucho la
        justicia, de modo que el primer criterio queda satisfecho.
      </p>
    ),
  },

  // 8 · Criterio 2
  {
    id: 'criterio-2',
    title: <>Los principios racionales</>,
    diagram: <EthosPathosLogos />,
    body: (
      <p className="deck-lead">
        Un arte que clasifica sus pruebas —el {gk('ἦθος')}, el {gk('πάθος')} y el{' '}
        {gk('λόγος')}— y enseña a construir entimemas, lo que Aristóteles llama el
        cuerpo de la prueba ({gk('σῶμα τῆς πίστεως')}), no persuade por azar. La teoría
        moderna de la argumentación lo ilustra, pues Perelman describe un auditorio
        universal por el que lo racional es lo que aceptaría cualquier ser razonable y
        no el público al que se halaga, y Toulmin, al distinguir el dato, la garantía y
        el respaldo, encuentra en ese respaldo la forma en que la retórica da cuenta de
        su proceder, el {gk('λόγον διδόναι')} que el propio Sócrates reclama. Segundo
        criterio satisfecho.
      </p>
    ),
  },

  // 9 · Criterio 3 + Cialdini
  {
    id: 'criterio-3',
    title: <>El conocimiento de las causas</>,
    diagram: <CausalMechanism />,
    body: (
      <p className="deck-lead">
        Este es el criterio que Sócrates niega con más fuerza, al sostener que la
        retórica no puede decir la causa de lo que produce. Pero el libro II de la{' '}
        <em>Retórica</em> es justamente un tratado causal de las pasiones, porque
        define qué es la ira, ante quién y por qué se siente (II, 1378a), y quien tiene
        la definición sabe por qué surge el efecto. Cialdini, el anacronismo que
        declaro y acoto, no funda ese saber: solo cuantifica con método experimental
        algunos efectos que Aristóteles ya había explicado causalmente. Tercer
        criterio satisfecho.
      </p>
    ),
  },

  // 10 · Criterio 4 — el decisivo
  {
    id: 'criterio-4-ab',
    title: (
      <>
        La orientación al bien: {gk('τέχνη')} ≠ {gk('φρόνησις')}
      </>
    ),
    diagram: <ChainABC />,
    body: (
      <p className="deck-lead">
        El cuarto criterio es el decisivo, y es donde la objeción de Sócrates aprieta
        más. Pregunta primero cómo podría la retórica orientarse al bien si no lo
        conoce, y respondo que un arte no es la prudencia ({gk('φρόνησις')}): conoce su
        fin propio y los medios que a él conducen, no la ciencia del Bien. Eso mismo
        vale para la medicina, que conoce la salud, bien del cuerpo, pero no la virtud,
        y no por ello deja de ser arte. Si se objeta entonces que conocer el fin la
        confunde con la justicia, la diferencia está en el objeto formal, porque la
        retórica no produce almas justas, sino discursos persuasivos sobre lo
        conveniente, lo justo y lo bello.
      </p>
    ),
  },

  // 11 · Objeción y respuesta
  {
    id: 'objecion-respuesta',
    title: <>¿No obra mal nunca? ¿No es un riesgo?</>,
    diagram: <ArtVsAgent />,
    body: (
      <p className="deck-lead">
        La última pregunta es la más aguda: si su orientación al bien volviera al
        retórico incapaz de dañar, la retórica sería inocua y dejaría de ser un riesgo
        para la democracia. Es una trampa simétrica, y no la muerdo, porque la
        orientación pertenece al arte y es su fin ({gk('τέλος')}), mientras que el uso
        pertenece al agente y a su carácter ({gk('ἦθος')}). Que el retórico pueda
        manipular al pueblo no prueba que la retórica no sea un arte, sino todo lo
        contrario, porque solo quien conoce de veras las causas del asentimiento puede
        manipular con método. Ese peligro es, paradójicamente, la prueba de que la
        retórica es un arte.
      </p>
    ),
  },

  // 12 · Conclusión + preguntas abiertas
  {
    id: 'conclusion',
    variant: 'quote',
    title: null,
    diagram: <FourCriteriaOrbit allLit />,
    body: (
      <>
        <p className="deck-quote">
          «La retórica es, pues, {gk('τέχνη')} y no {gk('ἐμπειρία')}.»
          <span className="deck-quote__src">
            Aplico el criterio de Sócrates con el rigor que él reclama, examinando la
            cosa y no la caricatura que de ella trazan sus adversarios.
          </span>
        </p>
        <p className="deck-lead">
          Quedan, eso sí, dos preguntas abiertas: si el <em>Gorgias</em> censura un{' '}
          <em>uso</em> y no la disciplina, ¿qué educación del orador se sigue de ello?,
          y ¿basta la mera posibilidad del mal uso para justificar la vigilancia
          democrática sobre la retórica?
        </p>
      </>
    ),
  },

  // 13 · Cierre
  {
    id: 'gracias',
    kicker: 'Gracias',
    variant: 'cover',
    title: <>¿Preguntas?</>,
    body: (
      <>
        <div className="deck-divider" />
        <p className="deck-sub">
          Steven Vallejo · Seminario <em>Gorgias</em> y <em>Fedón</em>
        </p>
      </>
    ),
  },
];

export default slides;
