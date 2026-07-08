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
  { id: 'seccion1', label: '§1 El problema' },
  { id: 'seccion2', label: '§2 Clasificación arbitraria' },
  { id: 'seccion3', label: '§3 Verificación' },
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
          política —ῥήτωρ designa por igual al orador y al político—, de modo que
          atacar la retórica era atacar la política misma. Sobre ese trasfondo,
          Sócrates define la retórica como «adulación» (κολακεία) y «práctica
          empírica» (ἐμπειρία), nunca como arte (τέχνη) <Ref>(462b–466a)</Ref>. La
          distinción es estrictamente epistemológica: una τέχνη tiene (1) un
          objeto propio, (2) procede con razón y da cuenta de sus principios
          (λόγον ἔχει), (3) conoce sus causas (αἰτίαι) y (4) orienta su acción al
          bien (ἀγαθόν) de su objeto; una ἐμπειρία repite lo que produce placer
          sin tener «ningún fundamento por el que ofrecer las cosas que ella
          ofrece» <Ref>(465a)</Ref>, esto es, sin poder decir la causa.
        </p>
        <p>
          Defiendo una hipótesis que no abandona ese marco, sino que lo toma en
          serio:{' '}
          <strong>
            acepto la jerarquía socrática —las τέχναι son superiores a las
            ἐμπειρίαι—, pero disputo que la retórica pertenezca a las segundas
          </strong>
          . Por <em>defensa analítica</em> entiendo verificar la retórica frente
          a los cuatro criterios que el propio Sócrates fija, sin introducir
          ontología nueva ni categorías ajenas a Platón. El eje es la{' '}
          <em>Retórica</em> de Aristóteles, que da de la disciplina la teoría
          sistemática que Sócrates presupone inexistente; la refuerzo con dos
          anacronismos <em>declarados y acotados</em>: la teoría de la
          argumentación, <strong>solo</strong> para los principios racionales, y
          Cialdini, <strong>solo</strong> para el conocimiento de causas. Ninguno
          toca la orientación al bien, cuestión normativa que ninguna ciencia
          descriptiva puede zanjar.
        </p>
        <div className="pull-quote">
          <strong>Pregunta central:</strong> ¿puede mostrarse, dentro del marco
          epistemológico del propio Sócrates, que la retórica es τέχνη y no
          ἐμπειρία, en virtud de su objeto propio, sus principios racionales, su
          conocimiento de causas y su orientación al bien?
        </div>
        <p>
          Procedo en tres movimientos: reconstruyo el problema en los tres
          interlocutores, muestro que la clasificación de{' '}
          <Ref>462b–466a</Ref> es arbitraria y verifico los cuatro requisitos,
          deteniéndome en el último, donde la objeción socrática es más fuerte.
        </p>
      </section>

      {/* SECCIÓN 1 */}
      <section id="seccion1">
        <h2>§1. El problema: retórica, poder y alma en los tres interlocutores</h2>
        <div className="section-divider" />
        <p>
          <strong>Gorgias</strong> <Ref>(447a–461b)</Ref> define la retórica como
          arte de la persuasión y la proclama «el mayor bien», pues da poder sin
          ser experto en cada materia <Ref>(452d–456a)</Ref>. Sócrates le arranca
          que produce «creencia sin el saber», no «ciencia» <Ref>(454e)</Ref>; y
          cuando Gorgias añade que enseña a usarla con justicia, lo atrapa: quien
          aprende lo justo es justo, luego el discípulo no podría obrar mal{' '}
          <Ref>(460a–c)</Ref>. La refutación es elegante, pero —lo veremos—
          descansa sobre una premisa de contrabando: que la retórica{' '}
          <em>versa sobre la justicia</em>.
        </p>
        <p>
          <strong>Polo</strong> <Ref>(461b–481b)</Ref> abandona el arte y se queda
          con el poder desnudo: el retórico y el tirano hacen «lo que les parece»
          (δοκεῖ) y son los más felices. Sócrates replica que no hacen lo que{' '}
          <em>quieren</em> (βούλεται), y que cometer injusticia es peor que
          padecerla.
        </p>
        <p>
          <strong>Calicles</strong> <Ref>(481b–527e)</Ref> radicaliza: opone
          φύσις a νόμος y cifra la vida buena en el placer sin freno; en su boca la
          retórica es el instrumento con que el fuerte somete la asamblea a su
          apetito: el riesgo democrático en estado puro. Frente a él, Sócrates
          establece —y no solo afirma— que el bien del alma es su orden (κόσμος):
          como todo artesano impone a su materia un orden y una proporción, «una
          casa con orden [...] es buena, pero sin orden es mala» <Ref>(504a)</Ref>;
          del orden del alma resultan «la justicia y la moderación» (σωφροσύνη,{' '}
          <Ref>504d</Ref>), de suerte que «un alma moderada es buena»{' '}
          <Ref>(506e–507a)</Ref> y el placer sin freno de Calicles es,
          literalmente, lo <em>des</em>-ordenado <Ref>(508a)</Ref>. La conclusión
          no se presupone: se sigue de la equiparación de la virtud con el orden
          que él mismo concedió. Retendré ese riesgo —no la tesis de Calicles—
          para el §3.4: la retórica-τέχνη puede, en el agente injusto, ser el
          peligro que él celebra.
        </p>
        <p>
          Acepto, con Sócrates, que el cinismo de Polo y el desenfreno de Calicles
          son indefendibles; pero ninguna de esas tesis normativas es la retórica:
          son usos de la palabra, no su esencia. Mi defensa no rescata al hombre,
          sino el arte que tergiversa.
        </p>
      </section>

      {/* SECCIÓN 2 */}
      <section id="seccion2">
        <h2>§2. La clasificación de 462b–466a es arbitraria</h2>
        <div className="section-divider" />
        <p>
          Sócrates clasifica la retórica como ἐμπειρία equiparándola a la cocina:
          como la culinaria simula a la medicina dando placer sin salud, la
          retórica simula a la justicia dando placer al pueblo sin hacerlo mejor;
          es «un simulacro de una parte de la política» <Ref>(463d)</Ref> que «no
          se ocupa del bien» <Ref>(464d)</Ref>. Impecable, pero descansa sobre dos
          movimientos no probados que el resto del ensayo desmonta.
        </p>
        <p>
          <strong>
            Primero, reduce el objeto de la retórica a «lo justo y lo injusto».
          </strong>{' '}
          Al forzar a Gorgias a precisar sobre qué persuade, fija el campo en «lo
          justo y lo injusto en los tribunales y las asambleas»{' '}
          <Ref>(454b–455a)</Ref>, equiparando la retórica entera con un solo
          género, el judicial. El propio texto lo desmiente: el Gorgias que cita a
          Temístocles y a Pericles aconsejando sobre murallas, puertos y arsenales{' '}
          <Ref>(455d–e)</Ref> describe un discurso <em>deliberativo</em> sobre el
          bien de la ciudad, no un alegato sobre la justicia. La reducción
          sostiene la analogía con «la justicia, medicina del alma»; el §3.1
          mostrará por qué es arbitraria.
        </p>
        <p>
          <strong>
            Segundo, niega a la retórica principios racionales sin probarlo.
          </strong>{' '}
          La tesis de que es «irracional» (ἄλογον) y no puede «decir la causa»{' '}
          <Ref>(465a)</Ref> se apoya <em>únicamente</em> en que el orador persuade
          sin conocer la materia <Ref>(459a–c)</Ref>. Pero eso describe un{' '}
          <em>uso posible</em>, no la naturaleza de la retórica: que algunos
          oradores persuadan sin saber no implica que la retórica{' '}
          <em>como tal</em> carezca de principios; es una falacia de composición.
          Y, retirada la reducción del objeto, se disuelve también la refutación de
          Gorgias: el orador cae en contradicción no por ser retórico, sino por la
          pretensión —suya, no de la retórica— de enseñar <em>justicia</em>.
        </p>
      </section>

      {/* SECCIÓN 3 */}
      <section id="seccion3">
        <h2>§3. Verificación de los cuatro requisitos de τέχνη</h2>
        <div className="section-divider" />

        <h4>3.1 · Objeto propio: los tres géneros del discurso</h4>
        <p>
          Una τέχνη exige, ante todo, un objeto propio que la distinga de las
          demás. Sócrates niega a la retórica un objeto distinto del de la
          justicia, pero por reducción (§2), no por examen del campo. Aristóteles,
          en cambio, lo fija con precisión clasificatoria: la retórica se divide en
          tres géneros, y la división no es estipulativa, sino que se deduce de los
          tres tipos de oyente —el que decide sobre el futuro, el que juzga sobre
          el pasado y el mero espectador— (<em>Retórica</em> I,{' '}
          <Ref>1358a–b</Ref>). El deliberativo (συμβουλευτικόν) versa sobre lo
          conveniente y mira al futuro de la ciudad; el judicial (δικανικόν), sobre
          lo justo y lo injusto en un hecho pasado; el epidíctico (ἐπιδεικτικόν),
          sobre lo bello y lo feo, mediante elogio y censura (<em>Retórica</em> I,{' '}
          <Ref>1358b</Ref>).
        </p>
        <p>
          Esta tripartición revela <em>por qué</em> la clasificación socrática es
          arbitraria. Sócrates toma uno solo de los géneros —el judicial{' '}
          <Ref>(454b–455a)</Ref>— y lo hace pasar por el todo: la falacia de tomar
          la parte por el conjunto, como quien definiera la medicina por la sola
          cirugía. La división aristotélica, en cambio, descansa en un principio no
          arbitrario —la posición del oyente ante el tiempo— y exhibe los dos
          géneros omitidos, y con ellos un objeto que excede al de la justicia: lo
          conveniente y lo bello no son especies de lo justo. La retórica no es ni
          el saber universal que Gorgias presumía <Ref>(456a–c)</Ref> ni la sola
          justicia, sino el arte que «considera en cada caso lo que es apto para
          persuadir» (<em>Retórica</em> I, <Ref>1355b</Ref>).{' '}
          <strong>Primer criterio satisfecho.</strong>
        </p>

        <h4>3.2 · Principios racionales: ἦθος, πάθος, λόγος y τόποι</h4>
        <p>
          El segundo criterio exige proceder con razón y dar cuenta de lo que se
          hace (λόγον διδόναι); la <em>Retórica</em> es exactamente eso.
          Aristóteles distingue tres pruebas técnicas (<em>Retórica</em> I,{' '}
          <Ref>1356a</Ref>): el ἦθος, que persuade por el carácter creíble del
          orador; el πάθος, que dispone emocionalmente al auditorio; y el λόγος,
          que persuade mediante el argumento. Suma los τόποι, esquemas aplicables a
          cualquier materia, y el entimema —silogismo retórico de premisas
          probables—, que llama «cuerpo de la prueba» (σῶμα τῆς πίστεως,{' '}
          <em>Retórica</em> I, <Ref>1354a</Ref>). Un arte que clasifica sus medios
          y enseña a construir argumentos no persuade por azar.
        </p>
        <p>
          Aquí —y <em>solo</em> aquí— introduzco el primer anacronismo. Perelman y
          Olbrechts-Tyteca, en <em>La nueva retórica</em> (1958), muestran que la
          argumentación posee una racionalidad propia, irreductible a la lógica
          formal y no por ello arbitraria. Su <strong>auditorio universal</strong>{' '}
          ofrece un criterio: un argumento es racional en la medida en que podría
          aceptarlo todo ser razonable, no solo el público al que se halaga. No es
          un público empírico, sino un <strong>ideal regulativo</strong> que
          distingue la razón compartida de la complacencia: un patrón de validez
          que no depende del aplauso.
        </p>
        <p>
          Conviene, para no apoyar el criterio en una sola voz, contrastar a
          Perelman con otra de la teoría de la argumentación. Si Perelman aporta un
          patrón de validez, Toulmin (<em>Los usos del argumento</em>, 1958) aporta
          una <em>anatomía</em>: el argumento práctico tiene estructura analizable
          —dato, garantía (<em>warrant</em>) y respaldo (<em>backing</em>)—, donde
          el <em>backing</em> es la respuesta articulada a «¿por qué de ahí se
          sigue esto?»: la prueba misma de que la retórica puede dar cuenta de su
          proceder (λόγον διδόναι). Que el dato sea contingente y la garantía
          revisable no la vuelve irracional —blanco común de ambos contra el
          ἄλογον socrático—: esa garantía no es sino la premisa callada del
          entimema aristotélico. <strong>Segundo criterio satisfecho.</strong>
        </p>

        <h4>3.3 · Conocimiento de causas: las αἰτίαι de la persuasión</h4>
        <p>
          El tercer criterio —el que Sócrates niega con más énfasis al decir que la
          retórica no puede «decir la causa» <Ref>(465a)</Ref>— exige conocer las
          αἰτίαι de lo que se produce. El libro II de la <em>Retórica</em> es un
          tratado causal de las pasiones: cada πάθος se define por la disposición
          del sujeto, su objeto y sus circunstancias. La ira, por caso, es «un
          deseo de venganza acompañado de dolor, por un desprecio manifiesto e
          injustificado» (<em>Retórica</em> II, <Ref>1378a</Ref>); quien tiene esa
          definición sabe <em>por qué</em> surge y <em>cómo</em> suscitarla o
          calmarla. Lo mismo vale para el argumento, cuyo mecanismo —entimema y
          ejemplo, probabilidad (εἰκός) y signo (σημεῖον)— Aristóteles explica, no
          solo constata.
        </p>
        <p>
          Refuerzo este punto —y <em>solo</em> este— con Cialdini, que da contenido
          empírico a esas αἰτίαι. En <em>Influence</em> (1984) sistematiza seis
          principios de persuasión (reciprocidad, coherencia, prueba social,
          autoridad, simpatía y escasez) e identifica el <em>mecanismo</em> causal
          de cada uno: opera como un atajo cognitivo —el sujeto responde a un
          disparador fijo que suele correlacionar con una buena decisión— y esa
          regularidad se mide en experimentos controlados que predicen la tasa de
          asentimiento. La αἰτία deja así de ser conjetura: es una causa que se
          manipula, se mide y se replica —exactamente lo que el «no puede decir la
          causa» de <Ref>465a</Ref> le niega—. El anacronismo queda acotado por el
          propio Aristóteles, cuyo libro II ya tematiza causalmente algunos de esos
          resortes —la autoridad en el ἦθος, el favor (χάρις) como reciprocidad—:
          Cialdini no los crea, sino que cuantifica lo que Aristóteles describía. Y
          lo confino al conocimiento de causas: saber <em>por qué</em> alguien se
          deja persuadir nada dice sobre si <em>debe</em> persuadírselo.{' '}
          <strong>Tercer criterio satisfecho.</strong>
        </p>

        <h4>3.4 · Orientación al bien: el criterio decisivo</h4>
        <p>
          Es el criterio más exigente y el núcleo del ensayo. Sócrates sostiene que
          la retórica «pone su punto de mira en el placer sin el bien»{' '}
          <Ref>(464d–465a)</Ref>. Lo enfrento en su forma fuerte, como una cadena
          de tres preguntas.
        </p>
        <div className="pull-quote">
          <strong>
            (a) ¿Cómo puede la retórica orientarse al bien si no lo conoce?
          </strong>{' '}
          La pregunta supone que «orientarse al bien» es{' '}
          <em>poseer la ciencia normativa que determina qué es lo justo</em>; pero
          el criterio no exige tanto, y ninguna τέχνη lo cumpliría así.
        </div>
        <p>
          Aristóteles distingue la τέχνη —ordenada a producir algo distinto de sí—
          de la φρόνησις, sabiduría práctica del bien en la acción (
          <em>Ética a Nicómaco</em> VI, <Ref>1140a–b</Ref>); y porque la técnica no
          es la φρόνησις, puede emplearse mal: el dominio del arte no incluye la
          rectitud del fin. Cada arte se ordena a un <strong>fin propio</strong> del
          que sí da cuenta —la medicina, de la salud—. La retórica no establece qué
          es lo conveniente o lo justo —eso toca a la política y la ética, de las
          que toma sus premisas (<em>Retórica</em> I, <Ref>1356a</Ref>)—; dado un
          fin, inscrito en sus tres géneros (deliberar, juzgar, educar el carácter,{' '}
          <em>Retórica</em> I, <Ref>1358b</Ref>),{' '}
          <strong>conoce los medios para persuadir respecto de él</strong>. No el
          bien mismo, pues, sino{' '}
          <strong>su fin propio y los medios que a él conducen</strong>.
        </p>
        <div className="pull-quote">
          <strong>
            (b) Si conoce el fin, ¿en qué se diferencia de la justicia?
          </strong>{' '}
          La diferencia es de <em>objeto formal</em>: la justicia —en el esquema
          del diálogo <Ref>(464b–c)</Ref>— produce el orden del alma y hace{' '}
          <em>justo</em> al sujeto.
        </div>
        <p>
          La retórica no produce almas justas, sino{' '}
          <strong>
            discursos persuasivos sobre lo conveniente, lo justo y lo bello
          </strong>
          : conoce los medios para persuadir respecto del fin, pero no <em>es</em>{' '}
          la virtud que lo realiza. Converge con la justicia en su materia —lo
          justo, en lo judicial— sin coincidir en su naturaleza. Al contragolpe más
          duro —que esa persuasión sería <em>apariencia sin saber</em>{' '}
          <Ref>(454e–455a)</Ref>, πίστις y no ἐπιστήμη— ya respondieron los
          criterios segundo y tercero: lo que la separa de la cocina-ἐμπειρία es que
          procede por principios racionales (λόγον ἔχει) y conoce las αἰτίαι del
          asentimiento. No es simulacro ciego.
        </p>
        <div className="pull-quote">
          <strong>
            (c) ¿Entonces el retórico nunca podría actuar injustamente? Y si nunca,
            ¿no deja de ser la retórica un riesgo para la democracia?
          </strong>{' '}
          Es una <em>trampa simétrica</em>: afirmar que su orientación al bien la
          vuelve incapaz de daño la volvería inocua, contra la premisa del
          comienzo.
        </div>
        <p>
          No caigo en ella. La pregunta descansa en el{' '}
          <strong>intelectualismo socrático</strong> <Ref>(460a–c)</Ref>: quien
          conoce lo justo nunca obrará mal. No necesito negar esa doctrina, pues ni
          se aplica al caso: la inferencia solo vale si lo que el retórico conoce{' '}
          <em>es</em> la virtud que realiza el bien, pero (a) y (b) mostraron que
          conoce los <strong>medios</strong> para persuadir respecto de un fin, no
          la φρόνησις ni la justicia. Falta su antecedente. Conocer los medios{' '}
          <strong>no garantiza el buen uso del arte</strong>, porque ninguna τέχνη
          lo garantiza: el médico que conoce la salud conoce con ello el veneno, y
          los medios sirven a fines opuestos según la voluntad del agente —su
          carácter (ἦθος)—, no según su técnica.
        </p>
        <p>
          De aquí la salida, que disuelve la disyuntiva sin negar ninguno de sus
          cuernos: la retórica <strong>se orienta a su fin</strong> y,{' '}
          <strong>a la vez, puede usarse injustamente</strong>, porque la
          orientación es del <em>arte</em> (su τέλος) y el uso, del <em>agente</em>{' '}
          (su elección). Que el retórico pueda manipular al pueblo no prueba que la
          retórica no sea arte, sino lo contrario: solo un arte que conoce de veras
          las causas del asentimiento puede ser peligroso, pues la mera ἐμπειρία,
          ciega a ellas, no podría manipular con método. El peligro de la retórica
          es, paradójicamente, consecuencia de que es τέχνη. La objeción del cuarto
          criterio descansaba en dos presuposiciones —exigir que la sola posesión
          asegure el buen uso e identificar su objeto con el de la justicia—;
          retiradas ambas, queda satisfecho.
        </p>
      </section>

      {/* MAPAS + RIGOR (inyectados por EssayPage entre §3 y la conclusión) */}
      {extras}

      {/* CONCLUSIÓN */}
      <section id="conclusion">
        <h2>Conclusión</h2>
        <div className="section-divider" />
        <p>
          La clasificación de la retórica como ἐμπειρία reduce su objeto a lo
          justo, ignora los géneros deliberativo y epidíctico y le niega principios
          racionales sin demostración. Verificada frente a los cuatro criterios que
          el propio Sócrates establece, los satisface:
        </p>
        <ul className="essay-list">
          <li>
            tiene <strong>objeto propio</strong> (los tres géneros del discurso);
          </li>
          <li>
            <strong>principios racionales</strong> —ἦθος, πάθος, λόγος y τόποι—,
            cuya racionalidad confirman el auditorio universal de Perelman y el{' '}
            <em>layout</em> de Toulmin;
          </li>
          <li>
            conoce sus <strong>causas</strong>, las αἰτίαι de las pasiones y los
            argumentos, corroboradas por Cialdini;
          </li>
          <li>
            y se <strong>orienta a su fin propio</strong> —deliberar, juzgar y
            educar bien— sin confundirse con la justicia.
          </li>
        </ul>
        <p>
          Ese cuarto criterio es el aporte distintivo: la retórica se ordena a su
          fin bueno y, a la vez, no asegura su buen uso, de modo que conserva la
          posibilidad del mal uso que la mantiene como poder real —y como riesgo—
          en la ciudad. La retórica es, pues,{' '}
          <strong>τέχνη y no ἐμπειρία</strong>. No abandono el marco de Sócrates: lo
          aplico con el rigor que él reclama, examinando la cosa y no la caricatura
          que de ella trazan sus adversarios.
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
