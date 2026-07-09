import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LogoMark } from '../components/Logo.jsx';
import './materiales.css';

/* ---------------------------------------------------------------
   MaterialesPage — el proyecto COMPLETO como referencia auditable.
   Todo el .md del repositorio, organizado por capas metodológicas.
   Archivos servidos como estáticos desde /public/materiales/ (espejo
   generado por `make materiales`). Los .md abren en el visor de
   lectura (/lectura/:slug); los binarios (PDF/DOCX) se descargan.
   --------------------------------------------------------------- */

const BASE = '/materiales/';

/* type → badge (etiqueta corta + clase de color) */
const TYPE = {
  pdf: { label: 'PDF', cls: 'is-pdf' },
  docx: { label: 'DOCX', cls: 'is-docx' },
  md: { label: 'MD', cls: 'is-md' },
};

/* Autores y fuentes: cada resumen es un .md en /materiales/autores/.
   Abren en el visor de lectura (/lectura/autores/:slug). */
const AUTHORS = [
  {
    slug: 'platon-gorgias',
    name: 'Platón',
    line: 'El Gorgias: la retórica como ἐμπειρία y κολακεία, no como τέχνη.',
  },
  {
    slug: 'socrates',
    name: 'Sócrates',
    line: 'El personaje: exige objeto, razón y causa; intelectualismo moral.',
  },
  {
    slug: 'gorgias',
    name: 'Gorgias',
    line: 'El sofista: la retórica como poder omnímodo y herramienta neutral.',
  },
  {
    slug: 'polo',
    name: 'Polo',
    line: 'Poder aparente vs. real: cometer injusticia es peor que sufrirla.',
  },
  {
    slug: 'calicles',
    name: 'Calicles',
    line: 'Naturaleza contra convención, hedonismo y el reto a la filosofía.',
  },
  {
    slug: 'aristoteles',
    name: 'Aristóteles',
    line: 'El eje: géneros, ἦθος/πάθος/λόγος y el entimema como prueba.',
  },
  {
    slug: 'perelman-olbrechts-tyteca',
    name: 'Perelman y Olbrechts-Tyteca',
    line: 'La nueva retórica: el auditorio universal y la razón argumentativa.',
  },
  {
    slug: 'toulmin',
    name: 'Stephen Toulmin',
    line: 'La anatomía del argumento: dato, garantía, respaldo, refutación.',
  },
  {
    slug: 'cialdini',
    name: 'Robert Cialdini',
    line: 'Los seis principios: las causas psicológicas de la persuasión.',
  },
];

/**
 * Cada sección: { id, kicker, title, lead, files? , authors? }
 *  - `files`: array de { title, desc, type, file, href?, download? }
 *     · `href` explícito para el PDF (vive en la raíz de /public).
 *     · binarios (pdf/docx) → download; .md → visor de lectura.
 *  - `authors`: rejilla especial de fichas de autor.
 * Orden = recorrido metodológico: producto → método → estudio →
 * aparato → defensa → versiones → institucional → fuentes → repo.
 */
const SECTIONS = [
  {
    id: 'ensayo',
    kicker: '01',
    title: 'El ensayo',
    lead: 'El trabajo final en sus tres formatos: PDF de entrega, editable y fuente.',
    files: [
      {
        title: 'Ensayo — PDF (formato de entrega)',
        desc: 'Versión definitiva maquetada: TNR 12, interlineado 1.5, ≤ 5 páginas.',
        type: 'pdf',
        href: '/ensayo-gorgias.pdf',
        download: 'Ensayo_Gorgias_Steven_Vallejo.pdf',
      },
      {
        title: 'Ensayo — Word (.docx)',
        desc: 'Documento editable, mismo contenido que el PDF, para anotar o revisar.',
        type: 'docx',
        file: 'Ensayo_Final.docx',
      },
      {
        title: 'Ensayo — Markdown',
        desc: 'Fuente en texto plano del ensayo: la base desde la que se generan PDF y DOCX.',
        type: 'md',
        file: 'Ensayo_Final.md',
      },
    ],
  },
  {
    id: 'metodo',
    kicker: '02',
    title: 'Método y proceso',
    lead: 'Cómo se produjo y se auditó el ensayo: la metodología, la bitácora completa, la crítica adversarial y los planes de trabajo. La transparencia del proceso es parte del trabajo.',
    files: [
      {
        title: 'Metodología — 7 lentes de auditoría',
        desc: 'El proceso de trabajo y verificación de punta a punta, y la batería adversarial de siete lentes.',
        type: 'md',
        file: 'metodologia.md',
      },
      {
        title: 'Bitácora del ensayo',
        desc: 'Registro completo: versiones, decisiones, críticas, auditorías e iteraciones de diseño.',
        type: 'md',
        file: 'bitacora.md',
      },
      {
        title: 'Crítica profunda',
        desc: 'Teardown adversarial del ensayo con hallazgos, severidad y reparaciones propuestas.',
        type: 'md',
        file: 'critica.md',
      },
      {
        title: 'Evaluación y pendientes',
        desc: 'Lectura calibrada a la nota y la defensa: qué está listo, qué falta y qué cuidar.',
        type: 'md',
        file: 'evaluacion.md',
      },
      {
        title: 'Plan operativo v6',
        desc: 'Mapa de trabajo para llevar la base del autor al formato estricto de ≤ 5 páginas.',
        type: 'md',
        file: 'plan-v6.md',
      },
      {
        title: 'Propuesta de corte v6',
        desc: 'Recorte propuesto del ensayo (solo-borrado) como andamiaje de reescritura a mano.',
        type: 'md',
        file: 'propuesta-corte-v6.md',
      },
      {
        title: 'Diseño del proyecto (spec)',
        desc: 'Especificación de la capa extendida: derivaciones formales, aparato, mapas y build.',
        type: 'md',
        file: 'diseno-spec.md',
      },
      {
        title: 'Plan de implementación',
        desc: 'Plan de ejecución de la capa extendida y la arquitectura del repositorio.',
        type: 'md',
        file: 'plan-implementacion.md',
      },
    ],
  },
  {
    id: 'estudio',
    kicker: '03',
    title: 'Estudio del Gorgias',
    lead: 'Guía de lectura del diálogo: visión general, los tres interlocutores y los conceptos clave.',
    files: [
      {
        title: 'Guía de estudio — índice',
        desc: 'Mapa de la serie: cómo están organizadas las siete guías y qué cubre cada una.',
        type: 'md',
        file: '00_README.md',
      },
      {
        title: '1 · Visión general del Gorgias',
        desc: 'Estructura del diálogo, personajes y el problema de fondo: ¿qué es la retórica?',
        type: 'md',
        file: '01_vision_general_del_gorgias.md',
      },
      {
        title: '2 · Gorgias: retórica y persuasión',
        desc: 'El primer acto: la retórica como «el mayor bien» y la refutación socrática.',
        type: 'md',
        file: '02_gorgias_retórica_y_persuasión.md',
      },
      {
        title: '3 · Polo: poder, injusticia y castigo',
        desc: 'El segundo acto: la tesis de que sufrir injusticia es mejor que cometerla.',
        type: 'md',
        file: '03_polo_poder_injusticia_y_castigo.md',
      },
      {
        title: '4 · Calicles: naturaleza, convención y placer',
        desc: 'El tercer acto: ley del más fuerte, hedonismo y el reto a la vida filosófica.',
        type: 'md',
        file: '04_calicles_naturaleza_convencion_y_placer.md',
      },
      {
        title: '5 · Sócrates: justicia y cuidado del alma',
        desc: 'La respuesta socrática: política verdadera, orden del alma y el mito final.',
        type: 'md',
        file: '05_socrates_politica_justicia_y_cuidado_del_alma.md',
      },
      {
        title: '6 · Conceptos clave',
        desc: 'Glosario razonado: τέχνη, ἐμπειρία, κολακεία, σωφροσύνη y demás nociones.',
        type: 'md',
        file: '06_conceptos_clave.md',
      },
      {
        title: '7 · Análisis general en tres actos',
        desc: 'Lectura de conjunto del diálogo como una progresión dramática y argumental.',
        type: 'md',
        file: '07_analisis_general_tres_actos.md',
      },
    ],
  },
  {
    id: 'aparato',
    kicker: '04',
    title: 'Aparato formal y mapas',
    lead: 'El andamiaje del ensayo: derivaciones lógicas, aparato erudito y el mapa del argumento.',
    files: [
      {
        title: 'Derivaciones formales',
        desc: 'Los cinco argumentos del ensayo formalizados paso a paso (st-lang).',
        type: 'md',
        file: 'derivaciones.md',
      },
      {
        title: 'Aparato: Dodds y Guthrie',
        desc: 'Notas de comentario apoyadas en la bibliografía secundaria de referencia.',
        type: 'md',
        file: 'dodds-guthrie.md',
      },
      {
        title: 'Mapa del argumento',
        desc: 'Esquema de la marcha argumental: premisas, pasos y conclusión.',
        type: 'md',
        file: 'argumento.md',
      },
      {
        title: 'Guía del aparato (docs)',
        desc: 'Índice de la carpeta docs/: cómo se relacionan derivaciones, aparato y mapas.',
        type: 'md',
        file: 'docs-README.md',
      },
    ],
  },
  {
    id: 'defensa',
    kicker: '05',
    title: 'Defensa y contexto',
    lead: 'Preparación de la sustentación oral y la investigación previa que la sostiene.',
    files: [
      {
        title: 'Defensa oral — Q&A',
        desc: 'Diez preguntas probables del profesor: dónde responde el ensayo y notas para hablar.',
        type: 'md',
        file: 'defensa-oral-qa.md',
      },
      {
        title: 'Autores y contexto',
        desc: 'Guía de lectura por autor: qué aporta cada uno y dónde entra en el argumento.',
        type: 'md',
        file: 'autores-y-contexto.md',
      },
      {
        title: 'Fragmentos: retórica, poder y Gorgias',
        desc: 'Investigación previa: pasajes y fragmentos sobre retórica y poder en el diálogo.',
        type: 'md',
        file: 'fragmentos-retorica-poder.md',
      },
    ],
  },
  {
    id: 'iteraciones',
    kicker: '06',
    title: 'Iteraciones del ensayo',
    lead: 'El historial completo con ciclos de crítica: cada versión responde a una crítica —del profesor, de una lente adversarial o del autor— y deja abierta la siguiente, con evidencia (citas, conteos, loci). Del anteproyecto (Nota 5,0) a la versión vigente.',
    files: [
      {
        title: 'Índice — el arco completo',
        desc: 'Visión de conjunto: el hilo conductor de las 8 iteraciones y cómo cada una responde a una crítica.',
        type: 'md',
        file: 'iteraciones/README.md',
      },
      {
        title: '0 · Anteproyecto',
        desc: 'Nota 5,0 del profesor + las dos recomendaciones que marcan toda la ruta.',
        type: 'md',
        file: 'iteraciones/0-anteproyecto.md',
      },
      {
        title: '1 · v2 · Destilación',
        desc: '«Mucho tema para 5 páginas» → de 7 autores a 3, cada uno a un criterio.',
        type: 'md',
        file: 'iteraciones/1-destilacion-v2.md',
      },
      {
        title: '2 · v3 · Canónica',
        desc: 'Tres reparos: equilibrio de secciones, contraste Perelman↔Toulmin, Calicles anclado.',
        type: 'md',
        file: 'iteraciones/2-canonica-v3.md',
      },
      {
        title: '3 · v4 · Pre-entrega',
        desc: 'Revisión multi-lente + verificación de citas: marco más honesto y preciso.',
        type: 'md',
        file: 'iteraciones/3-pre-entrega-v4.md',
      },
      {
        title: '4 · v5 · Adversarial',
        desc: 'Cinco lentes; la paridad con la cocina → tesis modal y retirada de Cialdini.',
        type: 'md',
        file: 'iteraciones/4-adversarial-v5.md',
      },
      {
        title: '5 · v6 · Entrega',
        desc: 'Volver a la voz del autor + recorte a ≤ 5 páginas (solo-borrado).',
        type: 'md',
        file: 'iteraciones/5-entrega-v6.md',
      },
      {
        title: '6 · v6.1 · Flancos',
        desc: 'La recomendación fuerte del profesor: asentimiento razonado; Cialdini cuantifica.',
        type: 'md',
        file: 'iteraciones/6-flancos-v6-1.md',
      },
      {
        title: '7 · v6.2 · Auditoría',
        desc: 'Auditoría de 7 lentes → seis hallazgos (H1–H6) reparados.',
        type: 'md',
        file: 'iteraciones/7-auditoria-v6-2.md',
      },
      {
        title: 'Snapshot · Base original del autor',
        desc: 'Texto completo del planteamiento original de Steven (referencia de la iteración 5).',
        type: 'md',
        file: 'base-original-steven.md',
      },
      {
        title: 'Snapshot · v5 (archivada)',
        desc: 'Texto completo de la revisión adversarial del 6-jul (referencia de la iteración 4).',
        type: 'md',
        file: 'v5-revision.md',
      },
    ],
  },
  {
    id: 'notas',
    kicker: '07',
    title: 'Notas de clase y curso',
    lead: 'Apuntes del seminario y los documentos de planificación del curso.',
    files: [
      {
        title: 'Clase 08 · Gorgias 486e–527e',
        desc: 'Notas del cierre del diálogo: réplica a Calicles, cuidado del alma y el mito.',
        type: 'md',
        file: 'Clase_08_Gorgias_486e-527e.md',
      },
      {
        title: 'Plan de trabajo — Fedón y Gorgias',
        desc: 'Cronograma y objetivos del seminario a lo largo de las sesiones.',
        type: 'md',
        file: 'curso-plan-de-trabajo.md',
      },
      {
        title: 'Temas — borrador',
        desc: 'Lista preliminar de temas y ejes de trabajo del curso.',
        type: 'md',
        file: 'curso-temas-borrador.md',
      },
    ],
  },
  {
    id: 'autores',
    kicker: '08',
    title: 'Autores y fuentes',
    lead: 'Los interlocutores del Gorgias y los teóricos modernos de la argumentación, en resúmenes con citas verificables.',
    authors: AUTHORS,
  },
  {
    id: 'repo',
    kicker: '09',
    title: 'Repositorio',
    lead: 'La documentación técnica del proyecto y de su sitio web.',
    files: [
      {
        title: 'README del repositorio',
        desc: 'Panorama del proyecto: tesis, estructura de carpetas y targets de build.',
        type: 'md',
        file: 'repo-readme.md',
      },
      {
        title: 'Diseño de la web',
        desc: 'El sistema de diseño del sitio: tipografía, color, tema claro/oscuro y componentes.',
        type: 'md',
        file: 'web-design.md',
      },
    ],
  },
];

/* slug de lectura para un .md: explícito (`slug`) o derivado del nombre. */
function mdSlug(f) {
  return f.slug ?? (f.file ? f.file.replace(/\.md$/i, '') : '');
}

function FileCard({ f }) {
  const badge = TYPE[f.type] ?? TYPE.md;
  const isMd = f.type === 'md';

  /* Los .md abren en el VISOR de lectura (/lectura/:slug) con un enlace
     secundario para descargar el crudo. Los binarios (PDF/DOCX) se
     descargan directamente. */
  if (isMd) {
    const slug = mdSlug(f);
    const rawHref = f.href ?? BASE + (f.file ?? slug + '.md');
    return (
      <div className="mat-file mat-file--md">
        <span className={'mat-file__badge ' + badge.cls}>{badge.label}</span>
        <span className="mat-file__body">
          <Link
            to={'/lectura/' + slug}
            className="mat-file__title mat-file__stretch"
          >
            {f.title}
          </Link>
          <span className="mat-file__desc">{f.desc}</span>
          <a
            className="mat-file__dl"
            href={rawHref}
            download={(f.download ?? (f.file || slug + '.md')).split('/').pop()}
          >
            descargar .md ↓
          </a>
        </span>
        <span className="mat-file__action" aria-hidden="true">
          Leer →
        </span>
      </div>
    );
  }

  const href = f.href ?? BASE + f.file;
  return (
    <a className="mat-file" href={href} download={f.download ?? f.file}>
      <span className={'mat-file__badge ' + badge.cls}>{badge.label}</span>
      <span className="mat-file__body">
        <span className="mat-file__title">{f.title}</span>
        <span className="mat-file__desc">{f.desc}</span>
      </span>
      <span className="mat-file__action" aria-hidden="true">
        Descargar ↓
      </span>
    </a>
  );
}

/* Tarjeta de autor: nombre + una línea; abre su resumen en el visor. */
function AuthorCard({ a }) {
  return (
    <Link to={'/lectura/autores/' + a.slug} className="mat-author">
      <span className="mat-author__name">{a.name}</span>
      <span className="mat-author__line">{a.line}</span>
      <span className="mat-author__action" aria-hidden="true">
        Leer resumen →
      </span>
    </Link>
  );
}

export default function MaterialesPage() {
  return (
    <div className="mat">
      {/* HERO */}
      <section className="mat-hero">
        <motion.div
          className="mat-hero__inner"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.div
            className="mat-hero__mark"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
          >
            <LogoMark size={64} />
          </motion.div>
          <p className="mat-hero__kicker">Materiales</p>
          <h1>El proyecto completo, abierto</h1>
          <p className="mat-hero__subtitle">
            Todo el trabajo detrás del ensayo, ordenado por capas del método y
            auditable de principio a fin: el ensayo, el <strong>proceso</strong>{' '}
            (metodología, bitácora, crítica y auditorías), la guía de estudio del{' '}
            <em>Gorgias</em>, el aparato formal, la defensa oral y las versiones.
          </p>
          <div className="mat-hero__divider" />
        </motion.div>
      </section>

      {/* SECCIONES */}
      <div className="mat-wrap">
        {SECTIONS.map((s) => (
          <motion.section
            key={s.id}
            id={s.id}
            className="mat-section"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <header className="mat-section__head">
              <span className="mat-section__kicker">{s.kicker}</span>
              <div>
                <h2>{s.title}</h2>
                <p className="mat-section__lead">{s.lead}</p>
              </div>
            </header>
            {s.authors ? (
              <div className="mat-grid mat-grid--authors">
                {s.authors.map((a) => (
                  <AuthorCard key={a.slug} a={a} />
                ))}
              </div>
            ) : (
              <div className="mat-grid">
                {s.files.map((f) => (
                  <FileCard key={f.file ?? f.href} f={f} />
                ))}
              </div>
            )}
          </motion.section>
        ))}

        <p className="mat-note">
          Fuente primaria: Platón, <em>Gorgias</em>, trad. J. Calonge (Gredos, 1983)
          — no redistribuida por derechos de autor.
        </p>
      </div>
    </div>
  );
}
