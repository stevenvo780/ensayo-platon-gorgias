import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { slides } from '../content/slides.jsx';
import HaloBloom from '../components/diagrams/HaloBloom.jsx';
import './presentation.css';

/* Geometría del monograma (réplica de Logo.jsx) para animar el trazo. */
const LEAVES = [
  [40, 75, -38],
  [33.5, 70, -48],
  [28, 63.5, -58],
  [24, 56, -68],
  [21.5, 48, -78],
];

/** Monograma τ que se dibuja (trazo) al entrar la portada. */
function AnimatedLogoMark({ size = 128, reduce }) {
  const draw = (i) => ({
    hidden: { pathLength: 0, opacity: 0 },
    show: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.1, ease: 'easeInOut', delay: 0.15 + i * 0.18 },
        opacity: { duration: 0.25, delay: 0.15 + i * 0.18 },
      },
    },
  });
  const leaf = (i) => ({
    hidden: { opacity: 0, scale: 0.4 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: 0.9 + i * 0.05, ease: 'easeOut' },
    },
  });

  if (reduce) {
    // Sin movimiento: estado final directo.
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="50" cy="50" r="33.5" fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity="0.7" />
        <g fill="none" stroke="currentColor" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M34,38 H66" />
          <path d="M50,38 V60 Q50,66 56,65" />
        </g>
        <g fill="var(--gold)">
          {[false, true].map((mirror) =>
            LEAVES.map(([cx, cy, rot], i) => {
              const x = mirror ? 100 - cx : cx;
              const r = mirror ? -rot : rot;
              return (
                <ellipse key={`${mirror}-${i}`} cx={x} cy={cy} rx="3.4" ry="1.7"
                  transform={`rotate(${r} ${x} ${cy})`} />
              );
            })
          )}
        </g>
      </svg>
    );
  }

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      initial="hidden"
      animate="show"
    >
      <motion.circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1.6" variants={draw(0)} />
      <motion.circle cx="50" cy="50" r="33.5" fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity="0.7" variants={draw(1)} />
      <motion.path d="M34,38 H66" fill="none" stroke="currentColor" strokeWidth="4.6" strokeLinecap="round" variants={draw(2)} />
      <motion.path d="M50,38 V60 Q50,66 56,65" fill="none" stroke="currentColor" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" variants={draw(3)} />
      <g fill="var(--gold)" stroke="none">
        {[false, true].map((mirror) =>
          LEAVES.map(([cx, cy, rot], i) => {
            const x = mirror ? 100 - cx : cx;
            const r = mirror ? -rot : rot;
            return (
              <motion.ellipse
                key={`${mirror}-${i}`}
                cx={x}
                cy={cy}
                rx="3.4"
                ry="1.7"
                transform={`rotate(${r} ${x} ${cy})`}
                variants={leaf(i + (mirror ? 5 : 0))}
              />
            );
          })
        )}
      </g>
    </motion.svg>
  );
}

const clamp = (n, total) => Math.max(0, Math.min(total - 1, n));

function readHash(total) {
  const m = /^#d(\d+)$/.exec(window.location.hash || '');
  if (!m) return 0;
  return clamp(parseInt(m[1], 10) - 1, total);
}

/**
 * PresentationPage — deck de 13 diapositivas con framer-motion.
 *
 * Animaciones:
 *  - Transición de slide direccional (fade + desplazamiento según avance/retroceso).
 *  - Stagger reveal de los ítems de cada slide (CSS, se reinicia por montaje).
 *  - Monograma que se dibuja (trazo) en la portada.
 *  - Énfasis cinético en los términos griegos (.gk, subrayado dorado que crece).
 *  - Barra de progreso animada, navegación por puntos, contador.
 *
 * Controles: ← → · espacio · Home/End · F (pantalla completa) · swipe táctil ·
 * clic en puntos · deep-link por hash (#d3). Respeta prefers-reduced-motion.
 */
export default function PresentationPage() {
  const total = slides.length;
  const reduce = useReducedMotion();
  const deckRef = useRef(null);
  const touch = useRef({ x: 0, y: 0, active: false });

  const [[i, dir], setState] = useState(() => [
    typeof window !== 'undefined' ? readHash(total) : 0,
    0,
  ]);
  const [isFs, setIsFs] = useState(false);
  const [showIndex, setShowIndex] = useState(false);

  const goTo = useCallback(
    (n, forced) =>
      setState(([prev]) => {
        const target = clamp(n, total);
        const d = forced ?? (target === prev ? 0 : target > prev ? 1 : -1);
        return [target, d];
      }),
    [total]
  );
  const next = useCallback(() => setState(([p]) => [clamp(p + 1, total), 1]), [total]);
  const prev = useCallback(() => setState(([p]) => [clamp(p - 1, total), -1]), [total]);

  /* Sincroniza el hash (#dN, 1-based) sin provocar saltos de scroll. */
  useEffect(() => {
    const desired = `#d${i + 1}`;
    if (window.location.hash !== desired) {
      window.history.replaceState(null, '', desired);
    }
  }, [i]);

  /* Navegación con teclado + pantalla completa + índice. */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (showIndex) {
          e.preventDefault();
          setShowIndex(false);
        }
        return;
      }
      if (e.key === 'i' || e.key === 'I') {
        e.preventDefault();
        setShowIndex((s) => !s);
        return;
      }
      // Con el índice abierto, las flechas navegan la lista pero dejamos
      // que Enter/clic elijan; el resto de atajos siguen activos.
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        setShowIndex(false);
        next();
      } else if (['ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        setShowIndex(false);
        prev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goTo(0, -1);
      } else if (e.key === 'End') {
        e.preventDefault();
        goTo(total - 1, 1);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, goTo, total, showIndex]);

  /* Escucha cambios de hash externos (atrás/adelante del navegador). */
  useEffect(() => {
    const onHash = () => setState(([p]) => {
      const t = readHash(total);
      return [t, t > p ? 1 : t < p ? -1 : 0];
    });
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [total]);

  /* Refleja el estado real de pantalla completa. */
  useEffect(() => {
    const onFs = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = deckRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  /* Swipe táctil horizontal. */
  const onTouchStart = (e) => {
    const t = e.changedTouches[0];
    touch.current = { x: t.clientX, y: t.clientY, active: true };
  };
  const onTouchEnd = (e) => {
    if (!touch.current.active) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    touch.current.active = false;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? next() : prev();
    }
  };

  const slide = slides[i];
  const pct = total > 1 ? (i / (total - 1)) * 100 : 0;

  const variants = {
    enter: (d) => ({ opacity: 0, x: reduce ? 0 : d * 90 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: reduce ? 0 : d * -90 }),
  };

  return (
    <div className={'deck' + (isFs ? ' is-fs' : '')} ref={deckRef}>
      <motion.div
        className="deck-progress"
        animate={{ width: `${pct}%` }}
        transition={{ duration: reduce ? 0 : 0.5, ease: 'easeOut' }}
      />

      <div className="deck-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.section
            key={slide.id}
            className={
              'deck-slide' +
              (slide.variant ? ` is-${slide.variant}` : '') +
              (slide.diagram ? ' has-figure' : '')
            }
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduce ? 0.001 : 0.45, ease: [0.22, 0.7, 0.2, 1] }}
          >
            {(() => {
              const content = (
                <div className="deck-content">
                  {slide.variant === 'cover' && (
                    <motion.div
                      className="deck-cover-mark"
                      initial={reduce ? false : { opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="deck-cover-halo">
                        <HaloBloom spread={300} />
                        <span className="deck-cover-logo">
                          <AnimatedLogoMark size={124} reduce={reduce} />
                        </span>
                      </span>
                    </motion.div>
                  )}
                  {slide.kicker && <div className="deck-kicker">{slide.kicker}</div>}
                  {slide.title &&
                    (slide.variant === 'cover' ? (
                      <h1 className="deck-h1">{slide.title}</h1>
                    ) : (
                      <h2 className="deck-h2">{slide.title}</h2>
                    ))}
                  {slide.body}
                </div>
              );

              if (!slide.diagram) return content;
              return (
                <div className="deck-layout">
                  {content}
                  <div className="deck-figure">{slide.diagram}</div>
                </div>
              );
            })()}
          </motion.section>
        </AnimatePresence>
      </div>

      {/* Controles */}
      <div className="deck-hud">
        <button type="button" onClick={prev} aria-label="Anterior" disabled={i === 0}>
          ←
        </button>
        <span className="deck-counter">
          <span className="deck-counter__cur">{String(i + 1).padStart(2, '0')}</span>
          <span className="deck-counter__sep">/</span>
          <span className="deck-counter__tot">{String(total).padStart(2, '0')}</span>
        </span>
        <button type="button" onClick={next} aria-label="Siguiente" disabled={i === total - 1}>
          →
        </button>
        <button
          type="button"
          className="deck-ix"
          onClick={() => setShowIndex((s) => !s)}
          aria-label="Índice de diapositivas"
          aria-expanded={showIndex}
          title="Índice (I)"
        >
          ▦
        </button>
        <button
          type="button"
          className="deck-fs"
          onClick={toggleFullscreen}
          aria-label={isFs ? 'Salir de pantalla completa' : 'Pantalla completa'}
          title="Pantalla completa (F)"
        >
          {isFs ? '⤡' : '⤢'}
        </button>
      </div>

      {/* Puntos */}
      <div className="deck-dots" role="tablist" aria-label="Diapositivas">
        {slides.map((s, k) => (
          <button
            key={s.id}
            className={'deck-dot' + (k === i ? ' on' : '')}
            onClick={() => goTo(k)}
            aria-label={`Ir a la diapositiva ${k + 1}`}
            aria-selected={k === i}
            role="tab"
          />
        ))}
      </div>

      <div className="deck-hint">← → · espacio · F · I (índice)</div>

      {/* Overlay de índice: rejilla para saltar a cualquier diapositiva */}
      <AnimatePresence>
        {showIndex && (
          <motion.div
            className="deck-index"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setShowIndex(false)}
            role="dialog"
            aria-label="Índice de diapositivas"
          >
            <div className="deck-index__grid" onClick={(e) => e.stopPropagation()}>
              {slides.map((s, k) => (
                <button
                  key={s.id}
                  className={'deck-index__card' + (k === i ? ' on' : '')}
                  onClick={() => {
                    goTo(k);
                    setShowIndex(false);
                  }}
                >
                  <span className="deck-index__n">{String(k + 1).padStart(2, '0')}</span>
                  <span className="deck-index__k">{s.kicker || '—'}</span>
                </button>
              ))}
            </div>
            <div className="deck-index__hint">Esc · I para cerrar</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
