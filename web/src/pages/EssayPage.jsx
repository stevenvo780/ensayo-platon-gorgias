import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  essayMeta,
  tocItems,
  EssayContent,
  stArguments,
  stScript,
  stLinks,
} from '../content/essay.jsx';
import { LogoMark } from '../components/Logo.jsx';
import './essay.css';

const gk = (t) => <span className="gk">{t}</span>;

/* ---------------------------------------------------------------
   Mapas del argumento — versiones nativas (SVG/CSS), reemplazan la
   antigua definición cruda de Mermaid. Se ven bien en claro/oscuro
   y aparecen con reveal on scroll.
   --------------------------------------------------------------- */

const CRITERIOS = [
  {
    n: '01',
    label: 'Objeto propio',
    result: (
      <>Tres géneros: deliberativo · judicial · epidíctico (<em>Retórica</em> I, 1358a–b)</>
    ),
  },
  {
    n: '02',
    label: <>Principios racionales <span className="map-gk">{gk('λόγον ἔχει')}</span></>,
    result: (
      <>{gk('ἦθος · πάθος · λόγος · τόποι')}, el entimema + Perelman / Toulmin</>
    ),
  },
  {
    n: '03',
    label: <>Conocimiento de causas <span className="map-gk">{gk('αἰτίαι')}</span></>,
    result: <>Libro II: causas de las pasiones + Cialdini</>,
  },
  {
    n: '04',
    label: <>Orientación al bien <span className="map-gk">{gk('ἀγαθόν')}</span></>,
    result: (
      <>Fin propio ≠ {gk('φρόνησις')}: asentimiento razonado (§3.4)</>
    ),
  },
];

function CriteriaMap() {
  return (
    <div className="argmap argmap--criteria" aria-hidden="true">
      <div className="argmap__root">¿Retórica = {gk('τέχνη')} o {gk('ἐμπειρία')}?</div>
      <div className="argmap__branches">
        {CRITERIOS.map((c) => (
          <div className="argmap__col" key={c.n}>
            <div className="argmap__crit">
              <span className="argmap__n">{c.n}</span>
              <span className="argmap__label">{c.label}</span>
            </div>
            <span className="argmap__link" />
            <div className="argmap__result">{c.result}</div>
          </div>
        ))}
      </div>
      <div className="argmap__converge">∴ la retórica es {gk('τέχνη')}</div>
    </div>
  );
}

const CADENA = [
  { q: '(a)', question: '¿Orientarse al bien sin conocerlo?', answer: (
      <>{gk('τέχνη')} ≠ {gk('φρόνησις')} (<em>EN</em> VI, 1140a–b): conoce su fin propio y los medios, no el Bien.</>
    ) },
  { q: '(b)', question: '¿Entonces = justicia?', answer: (
      <>Objeto formal distinto: produce discursos persuasivos, no almas justas.</>
    ) },
  { q: '(c)', question: '¿Nunca obra mal? ¿No es un riesgo?', answer: (
      <>Orientación = del arte ({gk('τέλος')}); uso = del agente ({gk('ἦθος')}).</>
    ) },
];

function ChainMap() {
  return (
    <div className="argmap argmap--chain" aria-hidden="true">
      <div className="argmap__seed">
        Sócrates: «mira al placer sin el bien» (464d–465a)
      </div>
      {CADENA.map((s) => (
        <div className="argmap__step" key={s.q}>
          <div className="argmap__q">
            <span className="argmap__qtag">{s.q}</span> {s.question}
          </div>
          <div className="argmap__a">{s.answer}</div>
        </div>
      ))}
      <div className="argmap__closing">
        ∴ El peligro <strong>prueba</strong> que es {gk('τέχνη')}: solo quien conoce las {gk('αἰτίαι')} manipula con método.
      </div>
    </div>
  );
}

/**
 * EssayPage — el ensayo completo: hero con marca, índice pegajoso (con
 * seguimiento de sección activa), artículo con tipografía editorial,
 * mapas del argumento nativos y la sección de rigor formal (st-lang).
 * Reveal on scroll suave y cabecera animada con framer-motion.
 */
export default function EssayPage() {
  const [activeId, setActiveId] = useState(tocItems[0].id);
  const [tocOpen, setTocOpen] = useState(false);
  const articleRef = useRef(null);

  /* Reveal on scroll + seguimiento de la sección activa para el índice. */
  useEffect(() => {
    const root = articleRef.current;
    if (!root) return;
    const sections = Array.from(root.querySelectorAll('section[id]'));

    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            revealObs.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    const activeObs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    sections.forEach((s) => {
      revealObs.observe(s);
      activeObs.observe(s);
    });
    return () => {
      revealObs.disconnect();
      activeObs.disconnect();
    };
  }, []);

  return (
    <div className="essay">
      {/* HERO */}
      <section className="essay-hero">
        <motion.div
          className="essay-hero__inner"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.div
            className="essay-hero__mark"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
          >
            <LogoMark size={76} />
          </motion.div>
          <h1>{essayMeta.title}</h1>
          <p className="essay-hero__subtitle">{essayMeta.subtitle}</p>
          <div className="essay-hero__divider" />
          <div className="essay-hero__meta">
            <p><strong>Autor:</strong> {essayMeta.author}</p>
            <p><strong>Curso:</strong> {essayMeta.course}</p>
            <p><strong>Entrega:</strong> {essayMeta.date}</p>
          </div>
          <div className="essay-hero__cta">
            <Link className="essay-btn essay-btn--solid" to="/presentacion">
              Ver presentación
            </Link>
            <Link className="essay-btn" to="/materiales">
              Materiales
            </Link>
            <Link className="essay-btn" to="/pdf">
              Formato PDF
            </Link>
          </div>
        </motion.div>
      </section>

      <div className="essay-wrap">
        {/* ÍNDICE — colapsable en móvil (botón), pegajoso en escritorio */}
        <aside className={'essay-toc' + (tocOpen ? ' is-open' : '')}>
          <button
            type="button"
            className="essay-toc__toggle"
            onClick={() => setTocOpen((o) => !o)}
            aria-expanded={tocOpen}
            aria-controls="essay-toc-list"
          >
            Contenidos
            <span className="essay-toc__chev" aria-hidden="true">
              ▾
            </span>
          </button>
          <div className="essay-toc__panel" id="essay-toc-list">
            <div className="essay-toc__panel-inner">
              <ul>
                {tocItems.map((it) => (
                  <li key={it.id}>
                    <a
                      href={`#${it.id}`}
                      className={activeId === it.id ? 'is-active' : undefined}
                      onClick={() => setTocOpen(false)}
                    >
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="essay-toc__foot">
                <Link to="/presentacion">Presentación →</Link>
                <Link to="/materiales">Materiales →</Link>
                <Link to="/pdf">PDF →</Link>
              </div>
            </div>
          </div>
        </aside>

        {/* ARTÍCULO */}
        <article className="essay-article" ref={articleRef}>
          <EssayContent extras={<EssayExtras />} />
        </article>
      </div>
    </div>
  );
}

/**
 * ArgumentCard — una card de derivación con ejecución en vivo.
 * El botón «Ejecutar» envía el fuente ST a la función serverless /api/st
 * (que corre @stevenvo780/st-lang en Vercel) y muestra la salida real.
 */
function ArgumentCard({ arg }) {
  const [state, setState] = useState('idle'); // idle | running | done | error
  const [output, setOutput] = useState(null); // { ok, stdout, error }

  async function run() {
    setState('running');
    setOutput(null);
    try {
      const res = await fetch('/api/st', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: arg.code }),
      });
      const data = await res.json();
      if (!res.ok || data.ok === false) {
        setOutput({
          ok: false,
          text: data.error || data.stderr || `HTTP ${res.status}`,
        });
        setState('error');
      } else {
        setOutput({ ok: data.ok, text: data.stdout || '(sin salida)' });
        setState('done');
      }
    } catch (err) {
      setOutput({ ok: false, text: 'No se pudo contactar /api/st: ' + err.message });
      setState('error');
    }
  }

  return (
    <div className="argument-card">
      <h4>{arg.title}</h4>
      <code>{arg.formula}</code>
      <p className={'validity ' + (arg.valid ? 'valid' : 'invalid')}>
        {arg.validityLabel}
      </p>
      <span className="st-lang-tag">{arg.tag}</span>
      <pre className="st-block">{arg.code}</pre>

      <div className="st-run">
        <button
          type="button"
          className="st-run__btn"
          onClick={run}
          disabled={state === 'running'}
        >
          {state === 'running' ? 'Ejecutando…' : '▶ Ejecutar'}
        </button>
        {state !== 'idle' && state !== 'running' && (
          <span
            className={'st-run__badge st-run__badge--' + (output && output.ok ? 'ok' : 'err')}
          >
            {output && output.ok ? '✓ ejecutado' : '✗ error'}
          </span>
        )}
      </div>
      {output && (
        <pre className={'st-output' + (output.ok ? '' : ' st-output--err')}>
          {output.text}
        </pre>
      )}

      <p className="argument-desc">{arg.desc}</p>
    </div>
  );
}

/* Secciones inyectadas entre §3 y la conclusión: mapas + rigor formal. */
function EssayExtras() {
  const stFile = 'data:text/plain;charset=utf-8,' + encodeURIComponent(stScript);
  return (
    <>
      {/* MAPAS DEL ARGUMENTO */}
      <section id="mapas" className="essay-diagrams">
        <h2>Mapas del argumento</h2>
        <div className="section-divider" />
        <h4>Diagrama 1 · Verificación de los cuatro criterios de {gk('τέχνη')}</h4>
        <CriteriaMap />
        <h4>Diagrama 2 · La cadena de §3.4 (orientación al bien)</h4>
        <ChainMap />
      </section>

      {/* RIGOR FORMAL */}
      <section id="rigor">
            <h2>Rigor formal: derivaciones</h2>
            <div className="section-divider" />
            <p>
              Cinco argumentos formales que sustentan la arquitectura del ensayo.
              Las derivaciones pueden consultarse sin leer el cuerpo principal.
            </p>
            <p className="st-credit">
              Formalización en <strong>st-lang</strong>, paquete del autor —{' '}
              <a href={stLinks.npm} target="_blank" rel="noopener">
                @stevenvo780/st-lang
              </a>{' '}
              ·{' '}
              <a href={stLinks.docs} target="_blank" rel="noopener">
                documentación
              </a>
              . Cada card lleva su fórmula-resumen y el fuente ejecutable en ST.
            </p>

            <div className="formal-grid">
              {stArguments.map((arg) => (
                <ArgumentCard arg={arg} key={arg.id} />
              ))}
            </div>

            <div className="st-cta">
              <p>
                Estas derivaciones están escritas en <strong>ST (st-lang)</strong>.
                Para verificarlas por tu cuenta (requiere Node ≥18):
              </p>
              <code>
                {`npm i -g @stevenvo780/st-lang@${stLinks.version} && st run derivaciones.st`}
              </code>
              <p>
                <a download="derivaciones.st" href={stFile}>
                  Descargar derivaciones.st
                </a>
              </p>
            </div>
      </section>
    </>
  );
}
