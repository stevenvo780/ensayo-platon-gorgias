import { motion } from 'framer-motion';
import { LogoMark } from '../components/Logo.jsx';
import './materiales.css';

/* ---------------------------------------------------------------
   MaterialesPage — el proyecto como referencia descargable.
   Cada categoría es una tarjeta con una rejilla de archivos.
   Archivos servidos como estáticos desde /public/materiales/.
   Los binarios (PDF/DOCX) se descargan; los .md abren en pestaña.
   --------------------------------------------------------------- */

const BASE = '/materiales/';

/* type → badge (etiqueta corta + clase de color) */
const TYPE = {
  pdf: { label: 'PDF', cls: 'is-pdf' },
  docx: { label: 'DOCX', cls: 'is-docx' },
  md: { label: 'MD', cls: 'is-md' },
};

/**
 * Cada archivo:
 *  { title, desc, type, file, href?, download? }
 *  - `href` explícito para el PDF (vive en la raíz de /public).
 *  - binarios (pdf/docx) → download; .md → target _blank.
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
    id: 'estudio',
    kicker: '02',
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
    kicker: '03',
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
    id: 'notas',
    kicker: '04',
    title: 'Notas de clase',
    lead: 'Apuntes tomados en el seminario sobre el tramo final del diálogo.',
    files: [
      {
        title: 'Clase 08 · Gorgias 486e–527e',
        desc: 'Notas del cierre del diálogo: réplica a Calicles, cuidado del alma y el mito.',
        type: 'md',
        file: 'Clase_08_Gorgias_486e-527e.md',
      },
    ],
  },
  {
    id: 'curso',
    kicker: '05',
    title: 'Curso',
    lead: 'Documentos de planificación del seminario sobre Fedón y Gorgias.',
    files: [
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
];

function fileProps(f) {
  const href = f.href ?? BASE + f.file;
  const isMd = f.type === 'md';
  if (isMd) {
    return { href, target: '_blank', rel: 'noopener' };
  }
  return { href, download: f.download ?? f.file };
}

function FileCard({ f }) {
  const badge = TYPE[f.type] ?? TYPE.md;
  const isMd = f.type === 'md';
  const props = fileProps(f);
  return (
    <a className="mat-file" {...props}>
      <span className={'mat-file__badge ' + badge.cls}>{badge.label}</span>
      <span className="mat-file__body">
        <span className="mat-file__title">{f.title}</span>
        <span className="mat-file__desc">{f.desc}</span>
      </span>
      <span className="mat-file__action" aria-hidden="true">
        {isMd ? 'Abrir ↗' : 'Descargar ↓'}
      </span>
    </a>
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
          <h1>El proyecto como referencia</h1>
          <p className="mat-hero__subtitle">
            Todo el trabajo detrás del ensayo, abierto y descargable: el ensayo en
            sus formatos, la guía de estudio del <em>Gorgias</em>, el aparato formal
            y las notas de clase.
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
            <div className="mat-grid">
              {s.files.map((f) => (
                <FileCard key={f.file ?? f.href} f={f} />
              ))}
            </div>
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
