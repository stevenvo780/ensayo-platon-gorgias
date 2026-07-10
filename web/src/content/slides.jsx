/**
 * Presentación — 13 slides. Prosa natural y hilada (no viñetas telegráficas):
 * cada slide se lee como lo diría un ponente. Alineada con el manuscrito v6.3.
 * `title` y `body` son JSX para conservar cursivas, griego y énfasis.
 * `gk` marca términos griegos.
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
    kicker: 'El problema',
    title: <>Sócrates: la retórica es adulación, no arte</>,
    diagram: <TechneVsEmpeiria />,
    body: (
      <>
        <p className="deck-lead">
          En el <em>Gorgias</em> (462b–466a), Sócrates le niega a la retórica el
          rango de arte ({gk('τέχνη')}). La llama adulación ({gk('κολακεία')}) y
          práctica empírica ({gk('ἐμπειρία')}), y la compara con la cocina, que
          agrada al cuerpo sin conocer lo que de verdad le conviene.
        </p>
        <p className="deck-sub">
          La distinción es <strong className="hl">epistemológica y teleológica</strong>:
          un arte tiene un objeto propio, procede con razón y da cuenta de sus
          principios ({gk('λόγον ἔχει')}), conoce sus causas ({gk('αἰτίαι')}) y se
          orienta al bien de aquello sobre lo que actúa. Una mera práctica, en
          cambio, repite lo que agrada sin poder decir por qué funciona.
        </p>
      </>
    ),
  },

  // 3 · Pregunta + tesis
  {
    id: 'pregunta-tesis',
    kicker: 'Pregunta y tesis',
    title: <>¿Puede mostrarse que es {gk('τέχνη')}?</>,
    body: (
      <>
        <p className="deck-lead">
          Mi pregunta es si puede mostrarse, sin salir del marco epistemológico del
          propio Sócrates, que la retórica es un arte y no una simple rutina: si
          satisface su objeto propio, sus principios racionales, su conocimiento de
          causas y su orientación al bien.
        </p>
        <p className="deck-sub">
          Acepto la jerarquía socrática, según la cual los verdaderos artes valen
          más que las meras prácticas, pero disputo que la retórica caiga entre estas
          últimas. Para verlo la someto a los cuatro criterios que el propio Sócrates
          fija, con la <em>Retórica</em> de Aristóteles como eje. Me apoyo, además, en
          dos anacronismos que declaro y acoto: la teoría moderna de la argumentación,
          solo para los principios racionales, y Cialdini, solo para el conocimiento
          de causas.
        </p>
      </>
    ),
  },

  // 4 · Los tres interlocutores
  {
    id: 'tres-interlocutores',
    kicker: '§1 · El problema en el diálogo',
    title: <>Tres interlocutores, un mismo poder</>,
    body: (
      <>
        <p className="deck-lead">
          El diálogo avanza por tres interlocutores que defienden un mismo poder con
          crudeza creciente. Gorgias proclama la retórica como el mayor de los bienes,
          capaz de dar poder sin ser experto en nada; Sócrates lo atrapa enseguida,
          pues lo que ese poder produce es creencia sin saber, no ciencia.
        </p>
        <p className="deck-sub">
          Polo se queda entonces con el poder desnudo —el tirano hace lo que le
          parece—, pero Sócrates le muestra que no hace lo que de verdad quiere,
          porque cometer injusticia es peor que padecerla. Calicles lleva la posición
          al límite, opone la naturaleza ({gk('φύσις')}) a la ley ({gk('νόμος')}) y
          reivindica el placer sin freno: es el <strong>riesgo democrático</strong> en
          estado puro. De él retengo el riesgo, no la tesis.
        </p>
      </>
    ),
  },

  // 5 · §2 arbitraria
  {
    id: 'clasificacion-arbitraria',
    kicker: '§2 · La clasificación es arbitraria',
    title: <>Dos movimientos que no prueba</>,
    body: (
      <>
        <p className="deck-lead">
          La clasificación de Sócrates descansa en dos movimientos que en ningún
          momento demuestra. Primero reduce el objeto de la retórica a lo justo y lo
          injusto, es decir, a un solo género —el judicial—, e ignora el deliberativo
          y el epidíctico.
        </p>
        <p className="deck-sub">
          Después le niega principios racionales sin probarlo: del hecho de que{' '}
          <em>algunos</em> oradores persuadan sin saber no se sigue que la retórica{' '}
          <em>como tal</em> carezca de principios. Es una{' '}
          <strong className="hl">generalización indebida</strong>, que toma un uso
          posible por la naturaleza misma de la cosa.
        </p>
      </>
    ),
  },

  // 6 · Los 4 criterios
  {
    id: 'cuatro-criterios',
    kicker: '§3 · Verificación',
    title: <>Los cuatro requisitos de {gk('τέχνη')}</>,
    variant: 'grid',
    diagram: <FourCriteriaOrbit />,
    body: (
      <>
        <p className="deck-lead">
          Del diálogo se siguen cuatro rasgos que separan un arte de una rutina.
          Verifico la retórica contra cada uno de ellos.
        </p>
        <div className="deck-grid4">
          <div className="deck-card">
            <div className="deck-card__n">01</div>
            <div className="deck-card__t">Objeto propio</div>
            <div className="deck-card__d">Los tres géneros del discurso.</div>
          </div>
          <div className="deck-card">
            <div className="deck-card__n">02</div>
            <div className="deck-card__t">Principios racionales</div>
            <div className="deck-card__d">{gk('λόγον ἔχει')} — ethos, pathos, logos.</div>
          </div>
          <div className="deck-card">
            <div className="deck-card__n">03</div>
            <div className="deck-card__t">Conocimiento de causas</div>
            <div className="deck-card__d">Las {gk('αἰτίαι')} de la persuasión.</div>
          </div>
          <div className="deck-card">
            <div className="deck-card__n">04</div>
            <div className="deck-card__t">Orientación al bien</div>
            <div className="deck-card__d">El criterio decisivo.</div>
          </div>
        </div>
      </>
    ),
  },

  // 7 · Criterio 1
  {
    id: 'criterio-1',
    kicker: 'Criterio 1 · Objeto propio',
    title: <>Los tres géneros del discurso</>,
    diagram: <ThreeGenres />,
    body: (
      <>
        <p className="deck-lead">
          El primer requisito de un arte es un objeto propio que lo distinga de los
          demás, y Aristóteles muestra que la retórica lo tiene. Su división en tres
          géneros no es estipulativa: se deduce de la posición del oyente ante el
          tiempo (<em>Retórica</em> I, 1358a–b).
        </p>
        <p className="deck-sub">
          El discurso deliberativo versa sobre lo conveniente y mira al futuro de la
          ciudad; el judicial, sobre lo justo y lo injusto de un hecho pasado; y el
          epidíctico, sobre lo bello y lo feo, por elogio y censura. Sócrates tomó uno
          solo de los tres, el judicial, y lo hizo pasar por el todo; pero el objeto
          de la retórica excede con mucho la justicia.{' '}
          <strong className="hl">Primer criterio satisfecho.</strong>
        </p>
      </>
    ),
  },

  // 8 · Criterio 2
  {
    id: 'criterio-2',
    kicker: 'Criterio 2 · Principios racionales',
    title: <>{gk('ἦθος · πάθος · λόγος · τόποι')}</>,
    diagram: <EthosPathosLogos />,
    body: (
      <>
        <p className="deck-lead">
          Un arte que clasifica sus pruebas y enseña a construir entimemas, lo que
          Aristóteles llama el cuerpo de la prueba ({gk('σῶμα τῆς πίστεως')}), no
          persuade por azar.
        </p>
        <p className="deck-sub">
          La teoría moderna de la argumentación lo ilustra. Perelman describe un
          auditorio universal por el que lo racional es lo que aceptaría cualquier ser
          razonable, no el público al que se halaga; y Toulmin, al distinguir el dato,
          la garantía y el respaldo, encuentra en el respaldo la forma en que la
          retórica da cuenta de su proceder, el {gk('λόγον διδόναι')} que el propio
          Sócrates reclama.{' '}
          <strong className="hl">Segundo criterio satisfecho.</strong>
        </p>
      </>
    ),
  },

  // 9 · Criterio 3 + Cialdini
  {
    id: 'criterio-3',
    kicker: 'Criterio 3 · Conocimiento de causas',
    title: <>Las {gk('αἰτίαι')} de la persuasión</>,
    diagram: <CausalMechanism />,
    body: (
      <>
        <p className="deck-lead">
          Este es el criterio que Sócrates niega con más fuerza: que la retórica no
          puede decir la causa de lo que produce. Pero el libro II de la{' '}
          <em>Retórica</em> es justamente un tratado causal de las pasiones —define
          qué es la ira, ante quién y por qué se siente (II, 1378a)—, y quien tiene la
          definición sabe por qué surge el efecto.
        </p>
        <p className="deck-sub">
          Cialdini, el anacronismo que declaro y acoto, no funda ese saber: solo
          cuantifica con método experimental algunos efectos que Aristóteles ya había
          explicado causalmente.{' '}
          <strong className="hl">Tercer criterio satisfecho.</strong>
        </p>
      </>
    ),
  },

  // 10 · Criterio 4 (a)(b)
  {
    id: 'criterio-4-ab',
    kicker: 'Criterio 4 · Orientación al bien — el decisivo',
    title: (
      <>
        {gk('τέχνη')} ≠ {gk('φρόνησις')}
      </>
    ),
    diagram: <ChainABC />,
    body: (
      <>
        <p className="deck-lead">
          El cuarto criterio es el decisivo, y es donde la objeción de Sócrates aprieta
          más. Pregunta primero cómo podría la retórica orientarse al bien si no lo
          conoce. Respondo que un arte no es la prudencia ({gk('φρόνησις')}): conoce su
          fin propio y los medios que a él conducen, no la ciencia del Bien. Eso mismo
          vale para la medicina, que conoce la salud, bien del cuerpo, pero no la
          virtud, y no por ello deja de ser arte.
        </p>
        <p className="deck-sub">
          Si se objeta entonces que conocer el fin la confunde con la justicia, la
          diferencia está en el objeto formal: la retórica no produce almas justas,
          sino discursos persuasivos sobre lo conveniente, lo justo y lo bello.
        </p>
      </>
    ),
  },

  // 11 · Objeción y respuesta — (c)
  {
    id: 'objecion-respuesta',
    kicker: 'Objeción y respuesta',
    title: <>(c) ¿Nunca obra mal? ¿No es un riesgo?</>,
    diagram: <ArtVsAgent />,
    body: (
      <>
        <p className="deck-lead">
          La última pregunta es la más aguda: si su orientación al bien volviera al
          retórico incapaz de dañar, la retórica sería inocua y dejaría de ser un
          riesgo para la democracia. Es una trampa simétrica, y no la muerdo.
        </p>
        <p className="deck-sub">
          La orientación pertenece al <strong>arte</strong> y es su fin ({gk('τέλος')});
          el uso pertenece al <strong>agente</strong> y a su carácter ({gk('ἦθος')}).
          Que el retórico pueda manipular al pueblo no prueba que la retórica no sea un
          arte, sino todo lo contrario: solo quien conoce de veras las causas del
          asentimiento puede <strong className="hl">manipular con método</strong>. Ese
          peligro es, paradójicamente, la prueba de que la retórica es un arte.
        </p>
      </>
    ),
  },

  // 12 · Conclusión + preguntas abiertas
  {
    id: 'conclusion',
    kicker: 'Conclusión',
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
        <p className="deck-sub">
          Quedan, eso sí, dos preguntas abiertas. Si el <em>Gorgias</em> censura un{' '}
          <em>uso</em> y no la disciplina, ¿qué educación del orador se sigue de ello?
          Y ¿basta la mera posibilidad del mal uso para justificar la vigilancia
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
