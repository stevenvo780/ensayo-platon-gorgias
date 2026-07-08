/**
 * Presentación — 13 slides, fieles a _legacy/presentacion.html.
 * Cada slide: { id, kicker, title (JSX), body (JSX) }.
 * Griego politónico correcto.
 *
 * `title` y `body` son JSX para conservar cursivas, griego y énfasis.
 * `gk` marca términos griegos; `em`/`strong` conservan el original.
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
          En el <em>Gorgias</em> (462b–466a), Sócrates niega que la retórica sea{' '}
          {gk('τέχνη')}: la llama «adulación» ({gk('κολακεία')}) y «práctica
          empírica» ({gk('ἐμπειρία')}) —como la cocina, da placer sin conocer el
          bien—.
        </p>
        <p className="deck-sub">
          La distinción es <strong className="hl">epistemológica</strong>: una{' '}
          {gk('τέχνη')} tiene objeto propio, procede con razón ({gk('λόγον ἔχει')}
          ), conoce sus causas ({gk('αἰτίαι')}) y se orienta al bien. Una{' '}
          {gk('ἐμπειρία')} repite lo que agrada sin poder decir la causa.
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
          ¿Puede mostrarse, dentro del marco epistemológico del propio Sócrates,
          que la retórica es {gk('τέχνη')} y no {gk('ἐμπειρία')} —por su objeto
          propio, sus principios racionales, su conocimiento de causas y su
          orientación al bien—?
        </p>
        <ul className="deck-points">
          <li>
            <strong>Acepto</strong> la jerarquía socrática: las {gk('τέχναι')} son
            superiores a las {gk('ἐμπειρίαι')}. <strong>Disputo</strong> que la
            retórica pertenezca a las segundas.
          </li>
          <li>
            La verifico frente a los <strong>cuatro criterios</strong> que el
            propio Sócrates fija, con la <em>Retórica</em> de Aristóteles.
          </li>
          <li>
            Dos anacronismos <em>declarados y acotados</em>: la teoría de la
            argumentación (solo principios racionales) y Cialdini (solo
            conocimiento de causas).
          </li>
        </ul>
      </>
    ),
  },

  // 4 · Los tres interlocutores
  {
    id: 'tres-interlocutores',
    kicker: '§1 · El problema en el diálogo',
    title: <>Tres interlocutores, un mismo poder</>,
    body: (
      <ul className="deck-points">
        <li>
          <strong>Gorgias</strong> — la retórica como «el mayor bien»: poder sin
          ser experto. Sócrates lo atrapa: produce «creencia sin el saber», no
          ciencia.
        </li>
        <li>
          <strong>Polo</strong> — el poder desnudo: el tirano hace «lo que le
          parece». Pero no lo que <em>quiere</em>: cometer injusticia es peor que
          padecerla.
        </li>
        <li>
          <strong>Calicles</strong> — {gk('φύσις')} contra {gk('νόμος')}, el placer
          sin freno: el <strong>riesgo democrático</strong> en estado puro. Retengo
          el riesgo, no su tesis.
        </li>
      </ul>
    ),
  },

  // 5 · §2 arbitraria
  {
    id: 'clasificacion-arbitraria',
    kicker: '§2 · La clasificación es arbitraria',
    title: <>Dos movimientos no probados</>,
    body: (
      <ul className="deck-points">
        <li>
          <strong>Reduce el objeto</strong> a «lo justo y lo injusto» —un solo
          género, el judicial— e ignora el deliberativo y el epidíctico.
        </li>
        <li>
          <strong>Niega principios racionales sin probarlo</strong>: que{' '}
          <em>algunos</em> oradores persuadan sin saber no implica que la retórica{' '}
          <em>como tal</em> carezca de principios. Es una{' '}
          <strong>falacia de composición</strong>.
        </li>
      </ul>
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
          La división no es estipulativa: se deduce de los tres tipos de oyente (
          <em>Retórica</em> I, 1358a–b).
        </p>
        <ul className="deck-points">
          <li>
            <strong>Deliberativo</strong> — lo conveniente, mira al futuro de la
            ciudad.
          </li>
          <li>
            <strong>Judicial</strong> — lo justo y lo injusto en un hecho pasado.
          </li>
          <li>
            <strong>Epidíctico</strong> — lo bello y lo feo, por elogio y censura.
          </li>
        </ul>
        <p className="deck-sub">
          Sócrates tomó <em>uno</em> por el todo. El objeto excede la justicia.{' '}
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
          Un arte que clasifica sus pruebas y enseña a construir entimemas —«cuerpo
          de la prueba» ({gk('σῶμα τῆς πίστεως')})— no persuade por azar.
        </p>
        <ul className="deck-points">
          <li>
            <strong>Perelman</strong> — el <em>auditorio universal</em>: racional es
            lo que aceptaría todo ser razonable, no el público que se halaga.
          </li>
          <li>
            <strong>Toulmin</strong> — dato, garantía, respaldo: el <em>backing</em>{' '}
            es la prueba de que la retórica da cuenta de su proceder.
          </li>
        </ul>
        <p className="deck-sub">
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
          El libro II de la <em>Retórica</em> es un tratado causal de las pasiones:
          la ira es «un deseo de venganza…» (II, 1378a) —quien tiene la definición
          sabe <em>por qué</em> surge—.
        </p>
        <p className="deck-sub">
          <strong>Cialdini</strong> —anacronismo <em>declarado y acotado</em>— da
          contenido empírico a esas {gk('αἰτίαι')}: seis principios cuyo mecanismo
          se mide y se replica. Aristóteles ya los tematizaba —autoridad en el{' '}
          {gk('ἦθος')}, {gk('χάρις')} como reciprocidad—; Cialdini <em>cuantifica</em>{' '}
          lo que él describía.{' '}
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
      <div className="deck-chain">
        <div className="deck-step">
          <span className="deck-step__q">(a)</span>
          <span>
            ¿Orientarse al bien sin conocerlo? — La {gk('τέχνη')} no es la{' '}
            {gk('φρόνησις')} (EN VI, 1140a–b): conoce su <strong>fin propio</strong>{' '}
            y los medios, no el Bien. Ninguna {gk('τέχνη')} exigiría más.
          </span>
        </div>
        <div className="deck-step">
          <span className="deck-step__q">(b)</span>
          <span>
            ¿Entonces = justicia? — No: distinto <strong>objeto formal</strong>.
            Produce <strong>discursos persuasivos</strong> sobre lo conveniente, lo
            justo y lo bello, no almas justas.
          </span>
        </div>
      </div>
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
          <strong>La objeción:</strong> si su orientación al bien la volviera
          incapaz de daño, la retórica sería inocua y dejaría de ser un riesgo —una{' '}
          <em>trampa simétrica</em>—.
        </p>
        <p className="deck-sub">
          <strong>La respuesta:</strong> la orientación es del <strong>arte</strong>{' '}
          (su {gk('τέλος')}); el uso, del <strong>agente</strong> (su {gk('ἦθος')}).
          Y solo un arte que conoce de veras las {gk('αἰτίαι')} puede{' '}
          <strong className="hl">manipular con método</strong>: el peligro no
          refuta que sea {gk('τέχνη')} —lo <em>prueba</em>—.
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
            Aplico el criterio de Sócrates con el rigor que él reclama —examinando
            la cosa, no la caricatura—.
          </span>
        </p>
        <ul className="deck-points">
          <li>
            Si el <em>Gorgias</em> censura un <em>uso</em> y no la disciplina, ¿qué
            educación del orador se sigue?
          </li>
          <li>
            ¿Basta la posibilidad del mal uso para mantener la vigilancia
            democrática sobre la retórica?
          </li>
        </ul>
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
