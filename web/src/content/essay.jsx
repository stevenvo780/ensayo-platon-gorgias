/**
 * Contenido del ensayo — fiel a _legacy/index.html.
 * Griego politónico correcto (U+03AD, U+1F00…, etc.).
 *
 * Exporta:
 *   - <Ref>  … componente para las citas estéfano, p.ej. <Ref>(462b–466a)</Ref>
 *   - essayMeta  … título, subtítulo y metadatos del hero
 *   - tocItems   … índice de secciones
 *   - mermaidDiagrams … las dos definiciones `graph TD` (strings)
 *   - stArguments … los 5 argumentos formales (st-lang)
 *   - stScript   … fuente completa de derivaciones.st
 *   - <EssayContent /> … el <article> completo como JSX
 */

/* --- Cita estéfano / Bekker --- */
export function Ref({ children }) {
  return <span className="ref">{children}</span>;
}

/* --- Metadatos del hero --- */
export const essayMeta = {
  title: 'La retórica como τέχνη y no ἐμπειρία',
  subtitle:
    'Verificación aristotélica de los cuatro criterios socráticos del Gorgias (462b–466a)',
  author: 'Steven Vallejo',
  course: 'Seminario Gorgias y Fedón · Prof. Juan Camilo Toro',
  date: '17 de julio de 2026',
};

/* --- Índice --- */
export const tocItems = [
  { id: 'introduccion', label: 'Introducción' },
  { id: 'problema', label: 'El problema y la clasificación' },
  { id: 'verificacion', label: 'Verificación de los cuatro requisitos' },
  { id: 'orientacion', label: 'Orientación al bien' },
  { id: 'objecion', label: 'Objeción y respuesta' },
  { id: 'mapas', label: 'Mapas del argumento' },
  { id: 'rigor', label: 'Rigor formal' },
  { id: 'conclusion', label: 'Conclusión' },
  { id: 'bibliografia', label: 'Bibliografía' },
];

/* --- Diagramas Mermaid (definiciones crudas) --- */
export const mermaidDiagrams = {
  criterios: `graph TD
  T["¿Retórica = τέχνη o ἐμπειρία?"] --> C1["1· Objeto propio"]
  T --> C2["2· Principios racionales<br/>(λόγον ἔχει)"]
  T --> C3["3· Conocimiento de causas<br/>(αἰτίαι)"]
  T --> C4["4· Orientación al bien<br/>(ἀγαθόν)"]
  C1 --> C1a["3 géneros: deliberativo/<br/>judicial/epidíctico<br/>(Retórica I 1358a–b) ✓"]
  C2 --> C2a["ἦθος·πάθος·λόγος·τόποι<br/>entimema<br/>+ Perelman/Toulmin ✓"]
  C3 --> C3a["Libro II: causas de<br/>las pasiones (αἰτίαι)<br/>+ Cialdini ✓"]
  C4 --> C4a["Fin propio ≠ φρόνησις:<br/>asentimiento razonado<br/>(§3.4) ✓"]
  C1a --> V["∴ retórica es τέχνη"]
  C2a --> V
  C3a --> V
  C4a --> V`,
  cadena: `graph TD
  Q["Sócrates: mira al placer sin el bien<br/>(464d–465a)"]
  Q --> A["(a) ¿Orientarse al bien<br/>sin conocerlo?"]
  A --> A1["τέχνη ≠ φρόνησις<br/>(EN VI 1140a–b):<br/>conoce fin propio y medios,<br/>no el Bien"]
  A1 --> B["(b) ¿Entonces = justicia?"]
  B --> B1["Objeto formal distinto:<br/>produce discursos persuasivos,<br/>no almas justas"]
  B1 --> C["(c) ¿Nunca obra mal?<br/>¿No es riesgo?"]
  C --> C1["Orientación = del arte (τέλος)<br/>Uso = del agente (ἦθος)"]
  C1 --> R["∴ El peligro PRUEBA τέχνη:<br/>solo quien sabe αἰτίαι<br/>manipula con método"]`,
};

/* --- Argumentos formales (st-lang) --- */
export const stArguments = [
  {
    id: 'A1',
    title: 'A1 · Refutación de Gorgias',
    formula: '∀x( Aj(x) → J(x) )\n∀x( J(x) → ¬I(x) )\n⊢ ∀x( Aj(x) → ¬I(x) )',
    valid: true,
    validityLabel: '✓ Válido',
    tag: 'st-lang · classical.first_order',
    code: `logic classical.first_order
axiom p1 : forall x ( Aj(x) -> J(x) )
axiom p2 : forall x ( J(x) -> !I(x) )
derive forall x ( Aj(x) -> !I(x) ) from {p1, p2}
// esperado: derivable (valido)`,
    desc: (
      <>
        Encadenamiento de condicionales universales. El ensayo ataca la{' '}
        <strong>premisa oculta</strong> P0 (retórica versa sobre justicia), no la
        lógica del argumento. Sin P0, la cadena no aplica a la retórica.
      </>
    ),
  },
  {
    id: 'A2',
    title: 'A2 · Premisa esencialista',
    formula: '∃x(R(x)∧S(x))\n⊬ ∀y(R(y) → ¬Principios(y))',
    valid: false,
    validityLabel: '✗ No se sigue',
    tag: 'st-lang · classical.first_order',
    code: `logic classical.first_order
let obs   = exists x ( R(x) & S(x) )
let concl = forall y ( R(y) -> !Prin(y) )
check valid ( obs -> concl )
countermodel ( obs -> concl )
// esperado: NO valido (hay contramodelo)`,
    desc: (
      <>
        De «algún orador persuade sin saber» no se deduce «la retórica carece de
        principios», salvo que se presuponga que persuadir sin saber es su{' '}
        <strong>esencia</strong> —la premisa que Sócrates no demuestra—. Falacia
        de composición.
      </>
    ),
  },
  {
    id: 'A3',
    title: 'A3 · τέχνη como predicado',
    formula: 'τέχνη(x) ↔\n  Obj(x) ∧ Prin(x) ∧\n  Caus(x) ∧ Orient(x)',
    valid: true,
    validityLabel: '✓ Válido',
    tag: 'st-lang · classical.first_order',
    code: `logic classical.first_order
axiom def_techne : forall x ( Techne(x) <-> ( Obj(x) & Prin(x) & Caus(x) & Orient(x) ) )
axiom v_obj    : Obj(ret)
axiom v_prin   : Prin(ret)
axiom v_caus   : Caus(ret)
axiom v_orient : Orient(ret)
derive Techne(ret) from {def_techne, v_obj, v_prin, v_caus, v_orient}
// esperado: derivable (valido)`,
    desc: (
      <>
        Marco formal del §3 completo. Los cuatro conyuntos son necesarios y
        suficientes. El ensayo verifica cada uno en §3.1–§3.4; su conjunción
        establece la conclusión.
      </>
    ),
  },
  {
    id: 'A4',
    title: 'A4 · Trampa simétrica',
    formula: 'Orient(r) → ¬◇Daño(r)\n[FALSO RAZONAMIENTO]',
    valid: false,
    validityLabel: '✗ Inválido',
    tag: 'st-lang · modal.k',
    code: `logic modal.k
let paso = Orient_r -> !<>Dano_r
check valid ( paso )
countermodel ( paso )
// esperado: NO valido (hay contramodelo)`,
    desc: (
      <>
        Confunde el τέλος del arte con la conducta del agente. Una τέχνη
        orientada al bien puede ser mal usada. Revela un malentendido sobre
        responsabilidad moral.
      </>
    ),
  },
  {
    id: 'A5',
    title: 'A5 · Disolución arte/agente',
    formula: 'Orient(r) ∧ ◇MalUso(r)\n[SIN CONTRADICCIÓN]',
    valid: true,
    validityLabel: '✓ Consistente',
    tag: 'st-lang · classical.first_order',
    code: `logic classical.first_order
let orient = Orient(r)
let maluso = exists a ( Agente(a) & Usa(a, r) & Mal(a, r) )
check satisfiable ( orient & maluso )
// esperado: satisfacible (sin contradiccion)`,
    desc: (
      <>
        Sujetos distintos (arte vs. agente) evitan contradicción. Corolario: la{' '}
        <strong>manipulación metódica requiere saber de causas</strong> → el
        peligro <em>prueba</em> que es τέχνη, no lo refuta.
      </>
    ),
  },
];

/* --- Fuente completa de derivaciones.st (para descarga) --- */
export const stScript = `// Derivaciones formales del Gorgias — Steven Vallejo
// Requiere @stevenvo780/st-lang >= 4.15.4  (npm i -g @stevenvo780/st-lang)

// --- A1 · Refutacion de Gorgias ---
logic classical.first_order
axiom p1 : forall x ( Aj(x) -> J(x) )
axiom p2 : forall x ( J(x) -> !I(x) )
derive forall x ( Aj(x) -> !I(x) ) from {p1, p2}

// --- A2 · Premisa esencialista (falacia de composicion) ---
let obs   = exists x ( R(x) & S(x) )
let concl = forall y ( R(y) -> !Prin(y) )
check valid ( obs -> concl )
countermodel ( obs -> concl )

// --- A3 · techne como predicado ---
axiom def_techne : forall x ( Techne(x) <-> ( Obj(x) & Prin(x) & Caus(x) & Orient(x) ) )
axiom v_obj : Obj(ret)
axiom v_prin : Prin(ret)
axiom v_caus : Caus(ret)
axiom v_orient : Orient(ret)
derive Techne(ret) from {def_techne, v_obj, v_prin, v_caus, v_orient}

// --- A4 · Trampa simetrica (modal) ---
logic modal.k
let paso = Orient_r -> !<>Dano_r
check valid ( paso )
countermodel ( paso )

// --- A5 · Disolucion arte/agente ---
logic classical.first_order
let orient = Orient(r)
let maluso = exists a ( Agente(a) & Usa(a, r) & Mal(a, r) )
check satisfiable ( orient & maluso )`;

/* --- Enlaces st-lang --- */
export const stLinks = {
  npm: 'https://www.npmjs.com/package/@stevenvo780/st-lang',
  docs: 'https://agora.elenxos.com/docs/st',
  version: '4.15.4',
};

/* ============================================================
   Cuerpo del ensayo como JSX (fiel al artículo original).
   ============================================================ */
export function EssayContent({ extras = null }) {
  return (
    <>
      {/* INTRODUCCIÓN */}
      <section id="introduccion">
        <h2>Introducción</h2>
        <div className="section-divider" />
        <p className="drop-cap">
          El <em>Gorgias</em> contiene la confrontación más extensa de Platón con
          la retórica como práctica política y educativa. En la Atenas
          democrática del siglo V la palabra era casi la única vía de acción
          política, de modo que atacar la retórica era atacar la política misma.
          Sobre ese trasfondo, Sócrates define la retórica como «adulación»
          (κολακεία) y «práctica empírica» (ἐμπειρία), nunca como arte (τέχνη){' '}
          <Ref>(462b–466a)</Ref>. La distinción es estrictamente epistemológica:
          una τέχνη tiene (1) un objeto propio, (2) procede con razón y da cuenta
          de sus principios (λόγον ἔχει), (3) conoce sus causas (αἰτίαι) y (4)
          orienta su acción al bien (ἀγαθόν) de su objeto; una ἐμπειρία repite lo
          que produce placer sin tener «ningún fundamento por el que ofrecer las
          cosas que ella ofrece» <Ref>(465a)</Ref>, esto es, sin poder decir la
          causa.
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
        <div className="pull-quote">
          <strong>Pregunta central:</strong> ¿puede mostrarse, dentro del marco
          epistemológico del propio Sócrates, que la retórica es τέχνη y no
          ἐμπειρία, en virtud de su objeto propio, sus principios racionales, su
          conocimiento de causas y su orientación al bien?
        </div>
      </section>

      {/* EL PROBLEMA Y LA CLASIFICACIÓN */}
      <section id="problema">
        <h2>El problema y la clasificación del <em>Gorgias</em></h2>
        <div className="section-divider" />
        <p>
          <strong>Gorgias</strong> <Ref>(447a–461b)</Ref> define la retórica como
          arte de la persuasión y la proclama «el mayor bien», pues da poder sin
          ser experto en cada materia <Ref>(452d–456a)</Ref>. Sócrates le arranca
          que produce «creencia sin el saber», no «ciencia» <Ref>(454e)</Ref>. La
          refutación es elegante, pero descansa sobre una premisa de contrabando:
          que la retórica <em>versa sobre la justicia</em>.
        </p>
        <p>
          <strong>Polo</strong> <Ref>(461b–481b)</Ref> abandona el arte y se queda
          con el poder desnudo. <strong>Calicles</strong> <Ref>(481b–527e)</Ref>{' '}
          radicaliza: opone φύσις a νόμος; en su boca la retórica es el instrumento
          con que el fuerte somete la asamblea a su apetito: el riesgo democrático
          en estado puro. Frente a él, Sócrates establece que el bien del alma es
          su orden (κόσμος): «una casa con orden [...] es buena, pero sin orden es
          mala» <Ref>(504a)</Ref>; del orden del alma resultan «la justicia y la
          moderación» (σωφροσύνη, <Ref>504d</Ref>), de suerte que «un alma moderada
          es buena» <Ref>(506e–507a)</Ref> y el placer sin freno de Calicles es,
          literalmente, lo <em>des</em>-ordenado <Ref>(508a)</Ref>.
        </p>
        <p>
          Sócrates clasifica la retórica como ἐμπειρία equiparándola a la cocina:
          como la culinaria simula a la medicina dando placer sin salud, la
          retórica simula a la justicia: es «un simulacro de una parte de la
          política» <Ref>(463d)</Ref> que «no se ocupa del bien» <Ref>(464d)</Ref>.
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
          La tesis de que es «irracional» (ἄλογον) y no puede «decir la causa»{' '}
          <Ref>(465a)</Ref> se apoya <em>únicamente</em> en que el orador persuade
          sin conocer la materia <Ref>(459a–c)</Ref>. Pero eso describe un{' '}
          <em>uso posible</em>, no la naturaleza de la retórica: es una falacia de
          composición.
        </p>
      </section>

      {/* VERIFICACIÓN DE LOS CUATRO REQUISITOS */}
      <section id="verificacion">
        <h2>Verificación de los cuatro requisitos de τέχνη</h2>
        <div className="section-divider" />
        <p>
          Una τέχνη exige, ante todo, un objeto propio que la distinga de las
          demás. Aristóteles: la retórica se divide en tres géneros, y la división
          se deduce de los tres tipos de oyente (<em>Retórica</em> I,{' '}
          <Ref>1358a–b</Ref>). El deliberativo (συμβουλευτικόν) versa sobre lo
          conveniente y mira al futuro de la ciudad; el judicial (δικανικόν), sobre
          lo justo y lo injusto en un hecho pasado; el epidíctico (ἐπιδεικτικόν),
          sobre lo bello y lo feo, mediante elogio y censura (<em>Retórica</em> I,{' '}
          <Ref>1358b</Ref>). Sócrates toma uno solo de los géneros —el judicial{' '}
          <Ref>(454b–455a)</Ref>— y lo hace pasar por el todo: la falacia de tomar
          la parte por el conjunto. La retórica no es ni el saber universal que
          Gorgias presumía <Ref>(456a–c)</Ref> ni la sola justicia, sino el arte
          que «considera en cada caso lo que es apto para persuadir» (
          <em>Retórica</em> I, <Ref>1355b</Ref>).{' '}
          <strong>Primer criterio satisfecho.</strong>
        </p>
        <p>
          Aristóteles distingue tres pruebas técnicas (<em>Retórica</em> I,{' '}
          <Ref>1356a</Ref>): el ἦθος, el πάθος, y el λόγος, que persuade mediante
          el argumento. Suma los τόποι, y el entimema que llama «cuerpo de la
          prueba» (σῶμα τῆς πίστεως, <em>Retórica</em> I, <Ref>1354a</Ref>).
          Perelman y Olbrechts-Tyteca, en <em>La nueva retórica</em> (1958),
          muestran que la argumentación posee una racionalidad propia, irreductible
          a la lógica formal y no por ello arbitraria. Su{' '}
          <strong>auditorio universal</strong> ofrece un criterio: un argumento es
          racional en la medida en que podría aceptarlo todo ser razonable, no solo
          el público al que se halaga. Toulmin (<em>Los usos del argumento</em>,
          1958) aporta una <em>anatomía</em>: el argumento práctico tiene
          estructura analizable —dato, garantía (<em>warrant</em>) y respaldo (
          <em>backing</em>)—. <strong>Segundo criterio satisfecho.</strong>
        </p>
        <p>
          El tercer criterio —el que Sócrates niega con más énfasis al decir que la
          retórica no puede «decir la causa» <Ref>(465a)</Ref>— exige conocer las
          αἰτίαι de lo que se produce. El libro II de la <em>Retórica</em> es un
          tratado causal de las pasiones. En <em>Influence</em> (1984) sistematiza
          seis principios de persuasión e identifica el <em>mecanismo</em> causal
          de cada uno: Cialdini no los crea, sino que cuantifica lo que Aristóteles
          describía. <strong>Tercer criterio satisfecho.</strong>
        </p>
      </section>

      {/* ORIENTACIÓN AL BIEN */}
      <section id="orientacion">
        <h2>Orientación al bien: el criterio decisivo</h2>
        <div className="section-divider" />
        <p>
          Sócrates sostiene que la retórica «pone su punto de mira en el placer sin
          el bien» <Ref>(464d–465a)</Ref>. Lo enfrento en su forma fuerte, como una
          cadena de tres preguntas.
        </p>
        <div className="pull-quote">
          <strong>
            (a) ¿Cómo puede la retórica orientarse al bien si no lo conoce?
          </strong>
        </div>
        <p>
          Aristóteles distingue la τέχνη de la φρόνησις (<em>Ética a Nicómaco</em>{' '}
          VI, <Ref>1140a–b</Ref>); y porque la técnica no es la φρόνησις, puede
          emplearse mal: el dominio del arte no incluye la rectitud del fin. La
          retórica no establece qué es lo conveniente o lo justo —eso toca a la
          política y la ética, de las que toma sus premisas (<em>Retórica</em> I,{' '}
          <Ref>1356a</Ref>)—; dado un fin, inscrito en sus tres géneros (deliberar,
          juzgar, educar el carácter, <em>Retórica</em> I, <Ref>1358b</Ref>),{' '}
          <strong>conoce los medios para persuadir respecto de él</strong>.
        </p>
        <div className="pull-quote">
          <strong>
            (b) Si conoce el fin, ¿en qué se diferencia de la justicia?
          </strong>
        </div>
        <p>
          La diferencia es de <em>objeto formal</em>: la justicia —en el esquema
          del diálogo <Ref>(464b–c)</Ref>— produce el orden del alma y hace{' '}
          <em>justo</em> al sujeto; la retórica no produce almas justas, sino{' '}
          <strong>
            discursos persuasivos sobre lo conveniente, lo justo y lo bello
          </strong>
          : conoce los medios para persuadir respecto del fin, pero no <em>es</em>{' '}
          la virtud que lo realiza.
        </p>
      </section>

      {/* OBJECIÓN Y RESPUESTA */}
      <section id="objecion">
        <h2>Objeción y respuesta</h2>
        <div className="section-divider" />
        <div className="pull-quote">
          <strong>
            (c) ¿Entonces el retórico nunca podría actuar injustamente? Y si nunca,
            ¿no deja de ser la retórica un riesgo para la democracia?
          </strong>
        </div>
        <p>
          La pregunta descansa en el{' '}
          <strong>intelectualismo socrático</strong> <Ref>(460a–c)</Ref>: quien
          conoce lo justo nunca obrará mal. (a) y (b) mostraron que conoce los{' '}
          <strong>medios</strong> para persuadir respecto de un fin, no la φρόνησις
          ni la justicia. Conocer los medios{' '}
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
          retórica no sea arte, sino lo contrario: solo un arte que conoce de veras
          las causas del asentimiento puede ser peligroso. El peligro de la
          retórica es, paradójicamente, consecuencia de que es τέχνη.
        </p>
      </section>

      {/* MAPAS + RIGOR (inyectados por EssayPage entre el cuerpo y la conclusión) */}
      {extras}

      {/* CONCLUSIÓN */}
      <section id="conclusion">
        <h2>Conclusión</h2>
        <div className="section-divider" />
        <p>
          La clasificación de la retórica como ἐμπειρία reduce su objeto a lo
          justo, ignora los géneros deliberativo y epidíctico y le niega principios
          racionales sin demostración. Verificada frente a los cuatro criterios que
          el propio Sócrates establece, los satisface: tiene{' '}
          <strong>objeto propio</strong> (los tres géneros del discurso);{' '}
          <strong>principios racionales</strong> —ἦθος, πάθος, λόγος y τόποι—,
          conoce sus <strong>causas</strong>, y se{' '}
          <strong>orienta a su fin propio</strong> sin confundirse con la justicia.
          La retórica es, pues, <strong>τέχνη y no ἐμπειρία</strong>. No abandono el
          marco de Sócrates: lo aplico con el rigor que él reclama, examinando la
          cosa y no la caricatura que de ella trazan sus adversarios.
        </p>
      </section>

      {/* BIBLIOGRAFÍA */}
      <section id="bibliografia" className="bibliography-section">
        <h2>Bibliografía</h2>
        <div className="section-divider" />
        <h3>Fuentes primarias</h3>
        <ul>
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
        <h3>Fuentes secundarias</h3>
        <ul>
          <li>
            Cialdini, R. B. (1984).{' '}
            <em>Influence: The Psychology of Persuasion</em>. Nueva York: William
            Morrow.
          </li>
          <li>
            Perelman, Ch. &amp; Olbrechts-Tyteca, L. (1958).{' '}
            <em>Traité de l&rsquo;argumentation: La nouvelle rhétorique</em>. París:
            PUF. [Trad. esp.:{' '}
            <em>Tratado de la argumentación. La nueva retórica</em>. Madrid:
            Gredos, 1989.]
          </li>
          <li>
            Toulmin, S. E. (1958). <em>The Uses of Argument</em>. Cambridge:
            Cambridge University Press. [Trad. esp.:{' '}
            <em>Los usos de la argumentación</em>. Barcelona: Península, 2007.]
          </li>
        </ul>
      </section>
    </>
  );
}
